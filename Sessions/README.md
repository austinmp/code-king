# To run Session Service
1. Install npm packages
```
npm install
```
2. Start the server
```
npm start
```


# Session API Documentation
The Sessions API has one endpoint: ```/token```

## Response Codes 
### Response Codes
Sessions returns the error responses of Accounts if that's the place where the error was:

```
200: Success
400: Bad request
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

## Token
**You send:** Login credentials (userId & passId) in the body.
**You get:** A cookie token for staying logged in

**Request:**
```json
POST 127.0.0.1:3000/token
Accept: application/json
Content-Type: application/json
Body
{
    "userId": "user12345",
    "passId": "password" 
}
```
**Successful Response:**
```json
200 OK
Content-Type: application/json
{
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ8.eyJpYXQiOjE2MDQyNTYfOTcsImV4cCI6MTYwNDI1NjQ5N30.rrOTWALyGF16H3W7j2xuRgNhUQH-CiZYszSfhyBx0Xg"
}
```

**Failed Responses:** \

Sessions returns the error responses of Accounts if that's the place where the error was.

*Username/password not provided.* 
```json
400 Unauthorized
Content-Type: application/json
{
    Body: "Bad request: userId or passId malformated"
}
```

