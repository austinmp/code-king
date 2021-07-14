import express from "express";
import {
	evaluateSubmission,
	isSupportedProgrammingLanguage
} from "./submissionTester";
import bodyParser from "body-parser";

const server = express();

server.use(bodyParser.text());

server.post("/submitSolution", async (req: express.Request, res: express.Response) => {
	const code: string = req.body;
	const requiredParameters = ["challengeId", "challengeName", "programmingLanguage"];
	for (const param of requiredParameters) {
		if (typeof req.query[param] != "string") {
			res.status(400).json({message: `Query parameter '${param}' was not specified.`});
			return;
		}
	}

	if (!code) {
		res.status(400).json({message: "Code must be specified in request body."});
		return;
	}

	const token_username = req.headers.username;

	const challengeId = Number.parseInt(req.query.challengeId as string);
	const challengeName = req.query.challengeName as string;
	const userId = token_username as string;
	const userName = token_username as string;
	const language = req.query.programmingLanguage as string;

	if (!isSupportedProgrammingLanguage(language)) {
		res.status(400).json({message: "Illegal programming language specified"});
		return;
	}

	if (!challengeId) {
		res.status(400).json({message: "Invalid challenge ID."});
		return;
	}

	if (!userId) {
		res.status(400).json({message: "Invalid user ID."});
		return;
	}

	const submissionResult = await evaluateSubmission(code, language, challengeId, challengeName, userId, userName);
	if (submissionResult.status === "ERRORED") {
		res.status(500).json(submissionResult);
	} else {
		res.status(200).json(submissionResult);
	}
});

server.listen(8080)
