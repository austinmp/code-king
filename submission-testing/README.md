# Submission Testing service
This services runs tests on submitted solutions to check if they are correct.

# API Documentation
The API uses HTTP Request METHODS to communicate and HTTP [response codes](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes) to indicate status and errors.
All responses come in standard JSON.

## Response Codes 
### Response Codes
```
200: Success
400: Invalid request
404: Cannot be found
```

## Submit Solution
**You send:** the challenge ID, challenge name, user name, and programming language (in the query parameters), and the solution code (in the body).

**You get:** A submission ID and result of the tests.

### Request
```
POST 127.0.0.1:8000/submitSolution?challengeId=123&programmingLanguage=python3&challengeName=test%20challenge&userName=matt
Accept: application/json
Content-Type: text/plain
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ

def submission(array):
    array.sort()
    return array
```
### Successful Response
```
200 OK
Content-Type: application/json

{
    "submissionId": "346d7a92-116b-4318-8ecd-02eb886a39cc",
    "status": "PASSED"
}
```
`status` will be one of `"PASSED"`, `"FAILED"`, or `"ERRORED"`.  
### Failed Responses
#### Missing submission code 
```
400 Bad Request
Content-Type: application/json

{
    "message": "Code must be specified in request body."
}
```
#### Missing query parameter 
```
400 Bad Request
Content-Type: application/json

{
    "message": "<parameter> was not specified."
}
```

# Implementation details
The service creates a new Docker container for each submission.
The container will run all inputs specified in the testcases.
The container prints the output for each testcase to stdout, and the service compares them against the expected output.

# Build instructions
Prerequisites: [docker](https://docs.docker.com/engine/install/) and [docker-compose](https://docs.docker.com/compose/install/)
0. Checkout files with `git clone https://github.com/jitli98/CS497Project.git && cd CS497Project`
0. Build and run the service with `docker-compose up --build submission-testing`
