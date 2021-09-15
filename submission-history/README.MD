# 📜 Submission History Service

When a user submits a solution to an algorithm challenge it is first tested for correctness by the Submission Testing service. Once the execution results are obtained, they are sent to the the Submission History service (this service), where a submission object is created and saved in a database.  The stored submission object contains the user's solution to a programming challenge (their code), information about whether all test cases passed, and the time it took to complete all test cases, among other things. Hence, this service can be used to determine, for any given user, whether a challenge is complete, incomplete, or attempted, as well as the fasted execution times for an given challenge.

The most recent version of this service (the one in this repository) was done by Austin Pinto. It was changed to use MongoDB, and to ease debugging, was restructured to communicate directly with the api gateway rather than relaying information through the Challenges service.  

The original submission history service was done by Thinh Pham and can be [seen here](https://github.com/jitli98/CS497Project/tree/master/submission-history).

## 📄 API Documentation

### 👀 Endpoints Overview

```
POST /submission-history/createSubmission
GET /submission-history/getUserSubmissions/:userName
GET /submission-history/getChallengeHighscores/:challengeId
```

### 📝 Schemas

#### 🔔 The Submission Object

```
{
    userName: {
        type: String,
        required: true,
        maxlength: 128,
        description: The user submitting a solution to a coding challenge.
    },
    challengeId: {
        type: Number,
        required: true,
        description: The id of the challenge being attempted.
    },
    challengeName: {
        type: String,
        required: true,
        maxlength: 128,
        description: The name of the challenge being attempted.
    },
    programmingLanguage: {
        type: String,
        required: true,
        maxlength: 128,
        description: The programming language used to solve the challenge.
    },
    executionTime: {
        type: Number,
        required: true,
        description: The time it took in milliseconds to complete all test cases.
    },
    didAllTestsPass:{
        type: Boolean,
        required: true,
        description: A solution is correct if it passes all test cases.
    },
    code: {
        type: String,
         description: The user's solution to the coding challenge.
    },
    dateSubmitted: {
        type: Date, 
    }
}
```

### 🏁 Endpoints

#### 📮 Response Codes

```
200: OK
201: Created
400: Bad Request
404: Not Found 
500: Internal Server Error
```

#### 🟡 Post a Submission

Creates a new submission object in the database if no previous submission exists. Otherwise, the most recent submission is saved in the database.

Note : The submission will automatically be assigned a date upon creation.

```
POST /submission-history/createSubmission
Accept: application/json
body : {
    "userName":"austin",
    "challengeId":23,
    "challengeName":"Reverse String",
    "programmingLanguage":"javascript",
    "executionTime":200,
    "code" :       
        "function solution(str) {
            let reverse = '';
            for(let i = str.length-1; i >= 0; i--){
                reverse += str[i]
            }
            return reverse;
        }"
    "didAllTestsPass":true
}

Responses:
     201 Created:
        body: {
           "message": "Submission created successfully!"
        }
        
    400 Bad Request:
        body: {
           "message": "<field> is missing or malformed"
        }
```

#### 🟢 Get a User's Submissions
Returns an array of submission objects for the user specified in query parameters. 

```
GET /submission-history/getUserSubmissions/:userName
Content-Type: application/json

Responses:
    200 OK:
        body : {
            userSubmissions: [
                {submission object},
                {submission object},
                ....
            ]
        }
        
    400 Bad Request:
        body: {
           "message": "userId was not specified in query parameters"
        }
```

#### 🟢 Get a Challenge's Highscores

Returns an array of submission objects for the challengeId specified in query parameters. The returned array contains the top ten fastest submissions for the specified challenge, sorted in ascending order by execution time.  

```
GET /submission-history/getChallengeHighscores/:challengeId
Content-Type: application/json

Responses:
    200 OK:
        body : {
            highscores: [
                {submission object},
                {submission object},
                ....
            ]
        }
        
    400 Bad Request:
        body: {
           "message": "challengeId was not specified in query parameters"
        }
```

## 👨‍💻 Author

Austin Pinto
