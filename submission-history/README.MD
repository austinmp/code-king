# 📜 Submission History Service

This service manages the creation of challenges and acts as a repository for the storage of all challenge details and their associated testases.
 
Original submission history service was done by Thinh pham and be seen here (link).

The most recent version has was migrated to use MongoDB and was designed to communicate directly with the front-end rather than with challenges service. 

## 📄 API Documentation

### Endpoints Overview

```
POST /submission-history/createSubmission
GET /submission-history/getUserSubmissions/:userName
GET /submission-history/getChallengeHighscores/:challengeId
```

### 📝 Schemas

#### 🔔 The Submission Object

When a user submits a solution to an algorithm challenge it is first tested for correctness by the submission-testing service. Once the execution results are obtained, they are sent to the the submission-history service (this service), where the submission object is created and saved in a database. Hence, the submission object can be used to determine, for any given user, whether a challenge is complete, incomplete, or attempted.  
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
