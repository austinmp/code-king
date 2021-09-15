# Challenges Service

This service manages the creation of challenges and acts as a repository for the storage of all challenge details and their associated test cases.

## 📄 API Documentation

### Endpoints Overview

```
POST /challenges/createChallenge
POST /challenges/editChallenge/:challengeId
GET /challenges/getChallenge/:challengeId
GET /challenges/getChallengeSet
GET /challenges/getChallengeParameters/:challengeId
```

### Schemas

#### The Challenge Object

```
{
    name: {
        type: String, 
        required: true,
        maxlength: 128,
        unique: true,
        description: A short, descriptive title for the challenge.
    },
    description:{
        type: String, 
        required: true,
        maxlength: 512, 
        description: Detailed explanation of the challenge which mentions data type of function inputs/outputs.
    },
    difficulty: {
        type: String,
        required: true,
        enum: ['Easy', 'Medium', 'Hard'],
        description: The estimated difficulty of the challenge.
        
    },
    testCases: [
        type: Array,
        required: true,
        description: An array of individual test case objects.
        testCase : {
            input:{}, 
            expectedOutput:{},
            description: See "The Test Case Object" below.
        }
    ],
    date:{ 
        type: Date, 
        default: Date.now 
        description: The date in which the challenge was created or last edited.
    }
    id:{ 
        type: Number, 
        unique: true,
        description: A unique id which can be used to reference the challenge in future API calls.
    },
}
```

#### The Test Case Object
```
{
    input: {
        type: Array, 
        required: true,
        description:  An array containing all function paramter inputs, with a comma seperating each parameter.
    }
    expectedOutput:{
         type: Any, 
         required: true,
         description: The output a correct solution to the problem would generate, given the input defined.
    }
}
```

### Endpoints

#### Response Codes
```
200: OK
201: Created
400: Bad Request
404: Not Found 
409: Conflict
500: Internal Server Error
```

#### Create a Challenge

Creates a new challenge object in the database that other users can solve.
Note : The challenge will automatically be assigned a unique id and date upon creation.
```
POST challenges/createChallenge
Accept: application/json
body : {
  name: 'README Example',
  description: 'Reverse the function input and return the result',
  difficulty: 'Easy',
  testCases : [
    {
        input : ["hello"],
        expectedOutput : "olleh"
    },
    {
        input : [ [1,2,3] ],
        expectedOutput : [3,2,1]
    }
  ],
}

Responses:
     201 Created:
        body: {
           "message": "Challenge created successfully!"
        }
    409 Conflict:
        body: {
           "message": "A challenge with that name already exists"
        }
```

#### Edit a Challenge

Update the name, description, difficulty, or test cases of an existing challenge.
```
POST /challenges/editChallenge/:challengeId
Accept: application/json
body : {
  name: 'README Example With Extra Test Case',
  description: 'Reverse the function input and return the result',
  difficulty: 'Easy',
  testCases : [
    {
        input : ["hello"],
        expectedOutput : "olleh"
    },
    {
        input : ["world"],
        expectedOutput : "dlrow"
    }
    {
        input : [ [1,2,3] ],
        expectedOutput : [3,2,1]
    }
  ],
}

Responses:
     200 OK:
        body: {
          "newChallenge" : {updated challenge object}
        }
        
    400 Bad Request:
        body: {
           "message": " A valid challengeId must be provided in the query parameters."
        }
        
    409 Conflict:
        body: {
           "message": "A challenge with that name already exists"
        }
```

#### Get a Specific Challenge

Get all data for the challenge specified in query parameters, including test cases. 
```
GET /challenges/getChallenge/:challengeId
Content-Type: application/json

Responses:
    200 OK:
        body : {challenge Object}
        
    400 Bad Request:
        body: {
           "message": " A valid challengeId must be provided in the query parameters."
        }
```

#### Get All Challenges

Get all existing challenges, including their test cases.
```
GET /challenges/getChallengeSet
Content-Type: application/json

Responses:
    200 OK:
        body: {
            "challenges": [
                {challenge Object}, 
                {challenge Object}, 
                ...
            ],
        }
        
    500 Internal Server Error:
        body :{
             "message": "Challenges service was unable to retrieve the challenge set"  
        }
```

#### Get Challenge Test Cases

Get only the test cases for the challenge specified in the query parameters.
```
GET /challenges/getChallengeParameters/:challengeId
Content-Type: application/json

Responses :
    200 OK:
        body: {
            "testCases": [
                {
                    "input": [
                       1,2,3
                    ],
                    "expectedOutput": [
                       3,2,1
                    ]
                }
            ],
        }
        
    400 Bad Request:
        body: {
           "message": " A valid challengeId must be provided in the query parameters."
        }
```
