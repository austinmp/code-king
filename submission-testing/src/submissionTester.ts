import Dockerode from "dockerode";
import {Container} from "dockerode";
import {v4 as randomUuid} from "uuid";
import deepEquals from "deep-equal";
import fs from "fs";
import streams from "memory-streams";
import request from "request-promise";

const runnerImageContexts = new Map<string, string>();
runnerImageContexts.set("python3", "/runners/python3/");

const docker = new Dockerode();

// Build the image for each test runner.
runnerImageContexts.forEach(async (context: string, language: string) => {
	const imageTag = `runner-${language}:latest`;
	console.log(`Building image '${imageTag}'...`);

	try {
		let output = await docker.buildImage({
			context: context,
			src: fs.readdirSync(context)
		}, {
			t: imageTag
		});
		output.pipe(process.stdout);
	} catch (err) {
		console.error(`Error building runner image for '${language}': `, err);
	}
});

/**
 * Begins submission evaluation and returns the ID of the submission.
 */
export async function evaluateSubmission(code: string, language: string, challengeId: number, challengeName: string, userId: string, userName: string): Promise<SubmissionResult> {
	const parameters: any = JSON.parse(await request("http://challenges:3000/getChallengeParameters", {
		method: "GET",
		qs: {
			challengeId: challengeId
		}
	}));
	const testCases: TestCase[] = parameters.testCases;
	console.log(testCases);

	const submissionId = randomUuid();
	let submissionStatus: TestOutcome;

	try {
		const executionResults: ExecutionResults = await runTests(code, language, testCases, submissionId);
		const allTestsPassed = executionResults.tests.reduce((allPassed, result) => result.outcome === "PASSED" && allPassed, true);
		submissionStatus = allTestsPassed ? "PASSED" : "FAILED";

		await request("http://submission-history:5050/createSubmission", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			form: {
				userID: userId,
				userName: userName,
				challengeId: challengeId,
				challengeName: challengeName,
				programmingLanguage: language,
				executionTime: executionResults.executionTime,
				didAllTestsPass: allTestsPassed ? 1 : 0
			}
		});
	} catch (err) {
		submissionStatus = "ERRORED";
		console.error(err);
	}

	return {
		id: submissionId,
		status: submissionStatus
	}
}

/**
 * Runs the specified tests and returns the results. This function will update the submission status to "RUNNING" once
 * the container has started.
 */
export async function runTests(code: string, language: string, testCases: TestCase[], submissionId: string): Promise<ExecutionResults> {
	const testResults: TestCaseResult[] = [];

	let container: Container | null = null;
	const containerStream = new streams.WritableStream();

	try {
		const startTime = Date.now();
		container = await docker.run(
			`runner-${language}`,
			[code, JSON.stringify(testCases)],
			containerStream,
			{
				StopSignal: "SIGKILL",
				// TODO make test timeouts configurable per challenge?
				StopTimeout: 15,
				HostConfig: {
					AutoRemove: true
					// TODO set resource quotas.
				}
			}
		);
		const executionTime = Date.now() - startTime;

		const output = JSON.parse(containerStream.toString());
		for (let testIndex = 0; testIndex < output.length; testIndex++) {
			const testResult = output[testIndex];
			const testCase = testCases[testIndex];

			let outcome: TestOutcome;
			if (testResult.exitCode != 0) {
				outcome = "ERRORED";
			} else if (deepEquals(testResult.output, testCase.expectedOutput)) {
				outcome = "PASSED";
			} else {
				outcome = "FAILED";
			}

			testResults.push({
				input: testCase.input,
				expectedOutput: testCase.expectedOutput,
				output: testResult.output,
				outcome: outcome
			});
		}

		return {
			tests: testResults,
			executionTime: executionTime
		};
	} catch (err) {
		console.error("Output from errored execution was: ", containerStream.toString());
		throw new Error(`An error occurred while running the tests for submission '${submissionId}'`);
	}
}

export function isSupportedProgrammingLanguage(language: string): boolean {
	return runnerImageContexts.has(language);
}

type TestOutcome = "PASSED" | "FAILED" | "ERRORED";

interface SubmissionResult {
	id: string;
	status: TestOutcome;
}

interface TestCase {
	input: any;
	expectedOutput: any;
}

interface TestCaseResult extends TestCase {
	output: any;
	outcome: TestOutcome;
}

interface ExecutionResults {
	tests: TestCaseResult[];
	executionTime: number;
}
