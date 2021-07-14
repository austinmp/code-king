#! /bin/bash
# Store the submission in a python file.
printf "$1\n" > /code/submission.py

TESTS=$2

# Manually put the output of each test into an array because it's easier than using jq.
echo "["

TEST_COUNT=$(echo "$TESTS" | jq length)
for i in $(seq 0 $(expr $TEST_COUNT - 1)); do
	# Extract the input from the testcase.
	export INPUT=$(echo "$TESTS" | jq --raw-output --monochrome-output ".[$i].input")
	OUTPUT=$(eval python /code/main.py 2>&1)
	EXIT_CODE=$?
	echo $OUTPUT | jq . &> /dev/null
	if [ "$?" == 0 ]; then
		# Print a JSON object containing the program output and exit code.
		jq --null-input --raw-output --monochrome-output --argjson exitCode $EXIT_CODE --argjson output "$OUTPUT" '. + {output: $output, exitCode: $exitCode}'
	else
		# Don't try to parse the program output as JSON if it's invalid.
		jq --null-input --raw-output --monochrome-output --argjson exitCode $EXIT_CODE --arg output "$OUTPUT" '. + {output: $output, exitCode: $exitCode}'
	fi

	if [ "$i" -lt "$(expr $TEST_COUNT - 1)" ]; then
		echo ","
	fi
done

echo "]"
