# Submission API Documentation
I'm using standard HTTP_status_codes(https://en.wikipedia.org/wiki/List_of_HTTP_status_codes) to indenticate status and errors. 

## Response Codes 
### Response Codes
```
200: Success
401: Unauthorized
404: Missing
```


## Create Submission (From Submission Testing service to Submission History Service)
**Matt send:** challengeId, userId, username, programmingLanguage, executionTime, didAllTestsPass\
**I return:** Status code 200 if OK or 404 if missing. 

**Request:**
```json
POST localhost:5050/createSubmission
```
**Successful Response:**
```json
res.status(200).json({
    status: "success",
    message: "Data received"
})
```
**Failed Responses:** \
```json
res.status(404).json({
    status: "failed",
    message: "File is missing or file can't be found"
})
```


## Submission for user (From Accounts service to Submission History Service)
**Gerry send:** userId\
**I return:** 10 most recent submissions for specified user, sorted by submission date (most recent first). Each submission includes challengeId, challengeName, dateSubmitted (Unix epoch seconds timestamp), didAllTestsPass. 

**Request:**
```json
GET localhost:5050/getUserSubmissions?userId=12345
```
**Successful Response:**
```json
res.status(200).json({
    status: "success",
    message: "Data sent",
    data: {
        results
    }
})
```

**Failed Responses:** \
```json
res.status(404).json({
    status: "failed",
    message: "ID is missing"
})
```

```json
res.status(401).json({
    status: "failed",
    message: "ID is mismatch"
})
```

## Highscore for challenge (From Challenges service to Submission History Service)
**Austin send:** challengeId and programmingLanguage \
**I return:** 10 fastest submissions for the specified challenge and programming language, sorted by execution time (fastest first). Each submission includes username, userId, dateSubmitted (Unix epoch seconds timestamp).

**Request:**
```json
GET localhost:5050/getChallengeHighscores?challengeId=12345&programmingLanguage=java
```
**Successful Response:**
```json
res.status(200).json({
    status: "success",
    message: "Data sent",
    data: {
        results
    }  
})
```

**Failed Responses:** \
```json
res.status(404).json({
    status: "failed",
    message: "ID or Language is missing"
})
```

```json
res.status(401).json({
    status: "failed",
    message: "ID or Language is mismatch"
})
```