# Challenges Service
This service manages the creation of challenges and acts as a repository for the storage of all challenge details and their associated test cases. 

# API Documentation
The API uses HTTP Request METHODS to communicate and HTTP [response codes](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes) to indicate status and errors.
All responses come in standard JSON.

## Response Codes
```
200: OK
201: Created
400: Bad Request
404: Not Found
409: Conflict
500: Internal Server Error

```

## Get Challenge Set
**You send:** (OPTIONAL) The number of challenge objects (numChallenges) you would like to receive (in the query parameters). A default of 10 challenges will be returned if numChallenges is not specified.

**You get:** An array containing the specified number of challenge objects from the challenges database. Each challenge object returned has the following properties: name, description, difficulty, testCases, date (created) and id.

**Request:**
```
GET 127.0.0.1:5000/getChallengeSet?numChallenges=15
Accept: application/json
Content-Type: application/json
```

**Successful Response:**
```
200 OK
Content-Type: application/json
Body:
{
    "challenges": [
        {
            "difficulty": "Easy",
            "testCases": [
                {
                    "input": [
                        2
                    ],
                    "expectedOutput": [
                        2
                    ]
                }
            ],
            "date": "2020-11-05T01:53:56.898Z",
            "name": "test 1",
            "description": "this is test",
            "id": 2
        },
        {
            "difficulty": "Easy",
            "testCases": [
                {
                    "input": [
                        2,
                        6,
                        1,
                        8
                    ],
                    "expectedOutput": [
                        1,
                        2,
                        6,
                        8
                    ]
                },
                {
                    "input": [
                        1,
                        2,
                        3,
                        4
                    ],
                    "expectedOutput": [
                        1,
                        2,
                        3,
                        4
                    ]
                },
                {
                    "input": [],
                    "expectedOutput": []
                }
            ],
            "date": "2020-11-12T17:11:05.438Z",
            "name": "array sort",
            "description": "Sort the array",
            "id": 6
        },  ...
    ]
}
```

**Failed Responses:**
*Internal Database Error*
```
500 Internal Server Error
Content-Type: application/json
{
     "message": "Challenges service was unable to retrieve the challenge set"  
}
```

## Get Challenge Tests
**You send:** The challenge id (challengeId) of the challenge you would like to get the test cases for (in the query parameters).

**You get:** An array of test case objects for the specified challengeId. Each test case object as two properties: "input": an array containing all function inputs and "expectedOutput": an array containing all expected outputs after running the given challenge with the respective input.

**Request:**
```
GET 127.0.0.1:5000/getChallengeParameters?challengeId=4
Accept: application/json
Content-Type: application/json
```

**Successful Response:**
```
200 OK
Content-Type: application/json
Body:
{
    "testCases": [
        {
            "input": [
                323
            ],
            "expectedOutput": [
                22
            ]
        }
    ],
    "id": 4
}
```

**Failed Responses:** 
*Missing Challenge Id* 
```
400 Bad Request
Content-Type: application/json
{
    "message": "Please specify a challengeId in the query parameters"
}
```

*Invalid Challenge Id* 
```
404 Not Found
Content-Type: application/json
{
   "message": "Challenge with id:<challengeId> does not exist"
}
```

*Internal Database Error*
```
500 Internal Server Error
Content-Type: application/json
{
     "message": "Challenges service was unable to retrieve challenge tests"  
}
```

## Get Challenge Highscores
**You send:** The challenge id (challengeId) and the programming language (programmingLanguage) of the challenge you would like to get the highscores for (in the query parameters).

**You get:** An array of highscore objects the specified challengeId and programmingLanguage. Each highscore object contains the following properties userName, id (challengeId), challengeName, programmingLanguage, dateSubmitted, executionTime, and didAllTestsPass.

**Request:**
```
GET 127.0.0.1:5000/getHighscores?challengeId=5&programmingLanguage=java
Accept: application/json
Content-Type: application/json
```

**Successful Response:**
```
200 OK
Content-Type: application/json
Body:
{
    "submissions": [
        {
            "userID": 123,
            "userName": "Matt",
            "id": 5,
            "challengeName": "test",
            "programmingLanguage": "python3",
            "dateSubmitted": "2020-11-02 19:56:22",
            "executionTime": 5,
            "didAllTestsPass": 1
        },
        {
            "userID": 2,
            "userName": "Austin",
            "id": 5,
            "challengeName": "test2",
            "programmingLanguage": "python3",
            "dateSubmitted": "2020-11-02 22:33:04",
            "executionTime": 9,
            "didAllTestsPass": 1
        },
        {
            "userID": 3,
            "userName": "Thinh",
            "id": 5,
            "challengeName": "test",
            "programmingLanguage": "python3",
            "dateSubmitted": "2020-11-02 22:36:45",
            "executionTime": 20,
            "didAllTestsPass": 1
        }
    ]
}
```

**Failed Responses:** 
*Missing Challenge Id* 
```
400 Bad Request
Content-Type: application/json
{
    "message": "Please specify a challengeId in the query parameters"
}
```

*Missing Programming Language* 
```
400 Bad Request
Content-Type: application/json
{
    "message": "Please specify a programmingLanguage in the query parameters"
}
```

*Missing Challenge Id & Programming Language* 
```
400 Bad Request
Content-Type: application/json
{
    "message": "Please specify a challengeId and programmingLanguage in the query parameters"
}
```

*Invalid Challenge Id or Programming Language* 
```
404 Not Found
Content-Type: application/json
{
   "message": "The challengeId or programmingLanguage does not exist"
}
```

*Internal Database Error*
```
500 Internal Server Error
Content-Type: application/json
{
     "message": "Challenges service was unable to retrieve highscores"  
}
```

## Create Challenge
**You send:** A challenge name, description, diffictulty('Easy', 'Medium', or 'Hard'), and as many test cases as desired. Test cases have two parts: testInput and testExpected, both of these should be input as arrays containing the expected inputs/outputs.

If you would like to include more than one test case simply continue putting additional testInput and testExpected fields in the POST body, for example, to include two or more test cases you would do:
```
testInput: [1,2,3]
textExpted:[3,2,1]
testInput: [5,4,3]
textExpted:[3,4,5]
testInput...
testExpected...
```

**You get:** Confirmation that the challenge has been created successfully.

**Request:**
```
POST 127.0.0.1:5000/createChallenge
Accept: application/json
Content-Type: multipart/form-data
Body:
{
  name: 'README Example',
  description: 'Reverse the function input and return the result',
  difficulty: 'Easy',
  testInput: [ '[1,2,3]', '["hello"]' ],
  testExpected: [ '[3,2,1]', '["olleh"]' ]
}
```

**Successful Response:**
```
201 Created
Content-Type: application/json
Body:
{
   "message": "Challenge created successfully!"
}
```

**Failed Responses:** 
*Duplicate Challenge Found* 
```
409 Conflict
Content-Type: application/json
{
   "message": "A challenge with that name already exists"
}
```

*Internal Database Error*
```
500 Internal Server Error
Content-Type: application/json
{
     "message": "Challenges service encounted an error while saving challenge to database"
}
```





