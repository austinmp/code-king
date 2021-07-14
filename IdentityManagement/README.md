# To run Accounts Service
1. Install npm packages
```
npm install
```
2. Create a config.env file in this directory with the follow configurations.
```
HOST=
PORT=
SALT_ROUND=
DATABASE_URL=
DATABASE_PASSWORD=
```
3. Start the server
```
npm start
```


# Accounts API Documentation
The account API uses HTTP Request METHODS to communicate and HTTP [response codes](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes) to indenticate status and errors. All responses come in standard JSON. All requests must include a `content-type` of `application/json` and the body must be valid JSON.

## Response Codes 
### Response Codes
```
200: Success
401: Unauthorized
404: Cannot be found
```

### Example Error Message
```json
{
    "status": "fail",
    "message": "The username and password is incorrect",
}
```

## Login
**You send:** Login credentials(username&password) in the authorization header.\
**You get:** A confirmation that the credentials were correct and `username`. 

**Request:**
```json
GET 127.0.0.1:6000/login
Accept: application/json
Content-Type: application/json
Authorization
{
    "username": "user12345",
    "password": "password" 
}
```
**Successful Response:**
```json
200 OK
Content-Type: application/json
{
    "status": "success",
    "message": "Sucessfull login",
    "data": {
        "username": "user12345"
    }
}
```
**Failed Responses:** \
*Incorrect Username/Password* 
```json
401 Unauthorized
Content-Type: application/json
{
    "message": "invalid crendetials",
    "resolve": "The username or password is not correct."
}
```
*Username/password not provided.* 
```json
401 Unauthorized
Content-Type: application/json
{
    "status": "fail",
    "message": "Please provide username and password."
}
```


## Sign-up
**You send:** Login credentials(username&password) in the authorization header.\
**You get:** A confirmation that an account with the credentials provided was create and `username`. 

**Request:**
```json
POST 127.0.0.1:6000/signup
Accept: application/json
Content-Type: application/json
Authorization
{
    "username": "user12345",
    "password": "password" 
}
```
**Successful Response:**
```json
200 OK
Content-Type: application/json
{
    "status": "success",
    "message": "Account has been successfully created.",
    "data": {
        "username": "user12345"
    }
}
```

**Failed Responses:** \
*Username already exists* 
```json
401 Unauthorized
Content-Type: application/json
{
    "status": "fail",
    "message": "The username user12345 already exists. Try a different username."
}
```

*Username/password not provided.* 
```json
401 Unauthorized
Content-Type: application/json
{
    "status": "fail",
    "message": "Please provide username and password."
}
```

## Get User Profile Details
**You send:** Username(by the API Gateway) \
**You get:** Name, Profile Avatar, Score, 10 most recent submissions of the user, Number of accepted submissions, etc..

**Request:**
```json
GET 127.0.0.1:6000/userprofile
Accept: application/json
Content-Type: application/json
Body:
{
    "username": "user12345"
}
```
**Successful Response:**
```json
200 OK
Content-Type: application/json
{
    "status": "success",
    "message": "Account has been successfully created.",
    "data": {
        "username": "user12345",
        "score": 9999,
        "recentSubmissions": [
            null, null, null
        ],
        "numOfAcceptedSubmissions": 999
    }
}
```