// Required libs
import express from 'express';
import mysql from 'promise-mysql';
var fs = require('fs');
var multer = require('multer');
var path = require("path");
const bodyParser = require("body-parser");
const server = express();
var SqlString = require('sqlstring'); // To prevent SQL injection

// Use libs
server.use(express.json());
server.use(express.urlencoded({ extended: true })); 
server.use(bodyParser.text()); // for req.body
server.use(bodyParser.urlencoded({ extended: true })); // for req.body
// Using EJS as view engine
// server.set('view engine', 'ejs');

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Constructor
async function start() {
    await delay(5000);
    // Create connection
    const db = await mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: 'root',
        password: process.env.MYSQL_ROOT_PASSWORD,
        database: process.env.MYSQL_DATABASE
    });
    // To see if it is true
    console.log("DB connection is successful!");

    // Create submission
    server.post('/createSubmission', async (req, res) => {
        try {
            var data = {
                userID: req.body.userID,
                userName: req.body.userName,
                challengeId: req.body.challengeId,
                challengeName: req.body.challengeName,
                programmingLanguage: req.body.programmingLanguage,
                dateSubmitted: new Date().toISOString().slice(0, 19).replace('T', ' '),
                executionTime: req.body.executionTime,
                didAllTestsPass: req.body.didAllTestsPass
            };
            let sql = SqlString.format('INSERT INTO submissionTable SET ?', data);
            let result = await db.query(sql);
            res.status(200).json({
                status: "success",
                message: "Data inserted..."
            });
        }
        catch (error) {
            console.log("Insert Submimssion Table " + error);
            res.status(401).json({
                status: "failed",
                message: error
            });
        }
    });

    // Gerry's request
    // most recent first
    server.get('/getUserSubmissions', (req, res) => {
        if (typeof req.query.userId != "string" || req.query.userId == "") {
            res.status(404).json({
                status: "failed",
                message: "ID is missing"
            });
            return;
        }
        let sql = SqlString.format('SELECT * FROM submissionTable WHERE userId = ? ORDER BY dateSubmitted DESC LIMIT 10', [req.query.userId]);
        
        let query = db.query(sql, (error, results) => {
            if (error) {
                console.log("Select " + error);
            }
            else {
                res.status(200).json({
                    status: "success",
                    message: "Post fetched...",
                    data: {
                        "challengeId": results.map(item => item.challengeId),
                        "challengeName": results.map(item => item.challengeName),
                        "dateSubmitted": results.map(item => item.dateSubmitted.toISOString().slice(0, 19).replace('T', ' ')),
                        "didAllTestsPass": results.map(item => item.didAllTestsPass)
                    }
                });
                /**
                res.render('submissions', {
                    challengeId: challengeID = results.slice(-10).map(item => item.challengeId),
                    challengeName: challengeName = results.slice(-10).map(item => item.challengeName),
                    dateSubmitted: dateSubmittedG = results.slice(-10).map(item => item.dateSubmitted.toISOString().slice(0, 19).replace('T', ' ')),
                    didAllTestsPass: didAllTestsPass = results.slice(-10).map(item => item.didAllTestsPass)
                });
                **/
            }
        });
    });

    // Austin's request 
    // fastest first
    server.get('/getChallengeHighscores', (req, res) => {
        if (typeof req.query.challengeId != "string" || typeof req.query.programmingLanguage != "string" || req.query.challengeId == "" || req.query.programmingLanguage == "") {
            res.status(404).json({
                status: "failed",
                message: "ID or language is missing"
            });
            return;
        }
        let sql = SqlString.format('SELECT * FROM submissionTable WHERE challengeId = ? AND programmingLanguage = ? ORDER BY executionTime LIMIT 10', [req.query.challengeId, req.query.programmingLanguage]);
        let query = db.query(sql, (error, results) => {
            if (error) {
                console.log("Select " + error);
            }
            else {
                res.status(200).json({
                    status: "success",
                    message: "Post fetched...",
                    data: {
                        "userID": results.map(item => item.userID),
                        "userName": results.map(item => item.userName),
                        "challengeId": results.map(item => item.challengeId),
                        "challengeName": results.map(item => item.challengeName),
                        "programmingLanguage": results.map(item => item.programmingLanguage),
                        "dateSubmitted": results.map(item => item.dateSubmitted.toISOString().slice(0, 19).replace('T', ' ')),
                        "executionTime": results.map(item => item.executionTime),
                        "didAllTestsPass": results.map(item => item.didAllTestsPass)
                    }
                    
                });
                /**
                res.render('challenge', {
                    userName: userName = results.slice(-10).map(item => item.userName),
                    userId: userId = results.slice(-10).map(item => item.userID),
                    dateSubmitted: dateSubmittedA = results.slice(-10).map(item => item.dateSubmitted.toISOString().slice(0, 19).replace('T', ' '))
                });
                **/
            }
        });
    });

    // Server is now listening in port 5050
    server.listen(process.env.PORT || 5050, () => {
        console.log('Server started on port ' + process.env.PORT || 5050);
    });

}

start();


// ===========================================================================================

//var data = fs.readFileSync('data.json');
//var words = JSON.parse(data);

/**
// Connect
db.connect().catch((err) => console.error(err))
db.connect((error) => {
if (error) {
    console.log("Connection " + error);
}
else {
    console.log("MySql Connected...");
}
});
**/

/**
// Create DB
server.get('/submission-history', (req, res) => {
    let sql = 'CREATE DATABASE submissionHistory';
     db.query(sql, (error, result) => {
        if (error) {
            console.log("Create Database " + error);
            res.status(401).json({
                status: "failed",
                message: error
            });
        }
        else {
            res.status(200).json({
                status: "success",
                message: "Submission History Database Created..."
            });
        }
    });
});
**/
/**
// Create table
server.get('/table', (req, res) => {
    let sql = 'CREATE TABLE submissionTable(submission int PRIMARY KEY AUTO_INCREMENT, userID INT(255), userName VARCHAR(255), challengeId INT(255), challengeName VARCHAR(255), programmingLanguage CHAR(255), dateSubmitted DATETIME ,executionTime INT, didAllTestsPass BOOL)';
     db.query(sql, (error, result) => {
        if (error) {
            console.log("Create table " + error);
            res.status(401).json({
                status: "failed",
                message: error
            });
        }
        else {
            res.status(200).json({
                status: "success",
                message: "Submission Table created..."
            });
        }
    });
});
**/

/**
// Insert local json file to mySQL
server.get('/insertSubmission', async (req, res) => {
try {
    for (let i = 0; i < words.length; i++) {
        let sql = `INSERT INTO submissionTable(userID, userName, challengeId, challengeName, programmingLanguage, dateSubmitted, executionTime, didAllTestsPass) VALUES(${words[i].userID}, "${words[i].userName}", ${words[i].challengeId}, ${JSON.stringify(words[i].challengeName)}, "${words[i].programmingLanguage}", "${words[i].dateSubmitted}", "${words[i].executionTime}", ${words[i].didAllTestsPass})`;
        let result = await db.query(sql);
    }
    res.status(200).json({
        status: "success",
        message: "Data inserted..."
    });
}
catch (error) {
    console.log("Insert Submimssion Table " + error);
    res.status(401).json({
        status: "failed",
        message: error
    });
}
});
**/

/**
// Update post
server.get('/updatepost/:id', (req, res) => {
    let newTitle = 'Updated Title';
    let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`;
    let query = db.query(sql, (error, result) => {
        if (error) {
            console.log("Update " + error);
        }
        console.log(result);
        res.send('Post updated...');
    });
});
**/

/**
// Delete post
server.get('/deletepost/:id', (req, res) => {
    let newTitle = 'Updated Title';
    let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
    let query = db.query(sql, (error, result) => {
        if (error) {
            console.log("Delete " + error);
        }
        console.log(result);
        res.send('Post deleted...');
    });
});
**/

// ===========================================================================================
