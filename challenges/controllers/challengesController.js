//controllers/create-challenge-controller
const Challenge = require('../models/challenge');
const fetch = require('node-fetch');

const hostname = 'http://submission-history:';
const submissionPort = '5050';
const submissionHostname = 'http://submission-history:';
const testingPort = '8000';

const maxChallengesPerPage = 20;

/// RETURN TEST CASES FOR SPECIFIED CHALLENGE ///
exports.challengeParametersGet = async function(req, res, next) { 
    var challengeId = req.query.challengeId; 
    if(challengeId == null){
        res.status(400).json({ message: "Please specify a challengeId in the query parameters"});
    }
    console.log("Challenges: Received a request for test cases");
    await Challenge.find({"id": challengeId}, {_id:0, testCases:1, id:1}, function(err, result){
        if(err){
            res.status(500).json({ message: "Challenges service was unable to retrieve challenge tests"});
            return;
        } else {  
            if(result.length == 0){
                res.status(404).json({ message: `Challenge with id:${challengeId} does not exist`});
                return;
            }
            res.status(200).json(result[0]);
            return;
        } 
    });
}


/// RETURNS SPECIFIED NUMBER OF CHALLENGE OBJECTS ///
exports.getChallengeSet = async function(req, res, next){
    console.log("Challenges: Received a request for the challenge set");
    var numChallenges = req.query.numChallenges;

    // Default number of challenges to return if num challenges is not specified
    if(numChallenges == null){
        numChallenges=10;
    }

    // Fetch challenges from data base
    await Challenge.find({},{_id:0, __v: 0}, function(err, result) {    // excludes the _id and _v fields in the returned challenge objects
        if(err){
            res.status(500).json({ message: "Challenges service was unable to retrieve the challenge set"});
            return;
        } else {     
            res.status(200).json({challenges: result}); 
            return;
        }
    }) 
    .limit(numChallenges);
}

// RETURNS HIGHSCORE OBJECTS FOR SPECIFIED CHALLENGE ///
exports.getHighscores = async function(req, res, next){
    console.log("Challenges: Received a request for the challenge set");
    var challengeId = req.query.challengeId;
    var programmingLanguage = req.query.programmingLanguage;

    if(challengeId == null || programmingLanguage == null){
        if(challengeId == null && programmingLanguage == null){
            res.status(400).json({ message: `Please specify a challengeId and programmingLanguage in the query parameters`});
            return;
        }
        if(challengeId == null){
            res.status(400).json({ message: `Please specify a challengeId in the query parameters`});
            return;
        }
        if(programmingLanguage == null){
            res.status(400).json({ message: `Please specify a programmingLanguage in the query parameters`});
            return;
        }
    }

    // Get Highscores from Submission History Service
    var url = `${submissionHostname}${submissionPort}/getChallengeHighscores?challengeId=${challengeId}&programmingLanguage=${programmingLanguage}`;
    await fetch(url)                    // Send request
    .then(response => response.json())  // Parse response
    .then(data =>{
        if(data.status != 'success'){
            res.status(500).json({ message: "Challenges service was unable to retrieve highscores"});
            return;
        }
        console.log(data);
        var submissions = makeSubmissionObjects(data.data);  // Convert thinhs response to objects
        console.log(submissions);
        if(submissions.length == 0){
            res.status(404).json({ message: "The challengeId or programmingLanguage does not exist"});     
            return;
        }
        console.log("Recieved highscores from submissions service");
            res.status(200).json({"submissions":submissions});
            return;
    })                            
    .catch(err =>{
        console.log(err);
        res.status(500).json({ message: "Challenges service was unable to retrieve highscores"});
        return;
    }); 
}


/// SAVE A NEW CHALLENGE TO DB ///
exports.challengeCreatePost = async function(req, res, next){
    console.log(req.body);
    var challengeName = req.body.name

    // Check if a challenge with the same name already exists
    Challenge.exists({'name': challengeName}, function(err, isDuplicate){
        if(err){
            console.log("MONGODB ERROR");
            res.status(500).json({ message:"Challenges service encounted an error while saving challenge to database"});
            return;
        }

        if(isDuplicate){
            console.log(isDuplicate); 
            console.log("A challenge with that name already exists");
            res.status(409).json({ message: "A challenge with that name already exists"});
            return;
        } else {
            console.log(isDuplicate); 
            console.log("MADE IT HERE");
            // Create new db object from our model
            var newChallenge = new Challenge();
            newChallenge.name = challengeName;
            newChallenge.description = req.body.description;
            newChallenge.difficulty = req.body.difficulty;
        
            // Add test cases to our db object
            // Case 1: There are multiple test cases
            var testCaseSet = [];
            if ( req.body.testInput instanceof Array ) {
                for(var i in req.body.testInput){
                    var testCase = {};
                    testCase.input = JSON.parse(req.body.testInput[i]);
                    testCase.expectedOutput = JSON.parse(req.body.testExpected[i]);
                    testCaseSet.push(testCase);
                }   
            // Case 2: Only 1 test case
            } else {
                console.log(req.body.testInput);
                var testCase = {};
                testCase.input = JSON.parse(req.body.testInput);
                testCase.expectedOutput = JSON.parse(req.body.testExpected);
                testCaseSet.push(testCase);
            }
            newChallenge.testCases = testCaseSet;
        
        
            // Save challenge to database
            newChallenge.save(function(err, result){
                if(err){
                    console.log(err);
                    res.status(500).json({ message: "Challenges service encounted an error while saving challenge to database"});  
                    return;
                } else { 
                    res.status(201).json({ 
                        message: `Challenge created successfully! Challenge Id: ${newChallenge.id}`,
                        challengeId: newChallenge.id
                    });
                    return;
                }
            }); 
        }
    });

}

// async function saveChallenge(req, res, newChallenge){
//     await newChallenge.save(function(err, result){
//         if(err){
//             console.log(err);
//             res.status(500).json({ message: "Challenges service encounted an error while saving challenge to database"});  
//             return;
//         } else { 
//             res.status(201).json({ message: `Challenge created successfully!`});
//             return;
//         }
//     }); 
// }


/// DELETE ALL DOCUMENTS IN DB ///
exports.deleteAllDocuments = async function(req,res){
    await Challenge.deleteMany({}, function(){
        console.log("All documents deleted from database");
    });
}





///=========================RENDER HTML=======================================///

// RETURNS HTML PAGE CONTAINING HIGHSCORES FOR SPECIFIED CHALLENGE ///
exports.highscoresPageGet = async function(req, res, next){
    var challengeId = req.query.challengeId;
    var programmingLanguage = req.query.programmingLanguage;

    if(challengeId == null || programmingLanguage == null){
       res.send(500, { error: "Unable to get highscores because no challengeId or programming language was provided." });
    }

    // Get Highscores from Submission History Service
    var url = `${submissionHostname}${submissionPort}/getChallengeHighscores?challengeId=${challengeId}&programmingLanguage=${programmingLanguage}`;
    fetch(url)                          // Send request
    .then(response => response.json())  // Parse response
    .then(data => {                     // Data contains the text/body of response
        var submissions = makeSubmissionObjects(data);
        res.render("highscores", {"data":submissions});  
    })                            
    .catch(err => res.send(err));       // maybe change this to res.send(500, {error: err})); ? 
}

/// RETURNS AN HTML PAGE CONTAINING CHALLENGE SET  ///
exports.challengeSetPageGet = async function(req, res){
    // Fetch challenges from data base
    await Challenge.find({}, function(err, result) {
        if(err){
            res.send(err);
        } else {            
            res.render("challengeSet", {"result":result});
        }
    }) 
    .limit(maxChallengesPerPage);
}

function makeSubmissionObjects(data){
    var submissions = [];
    for(var i in data.userName){
        var submission = {};
        submission.userName = data.userName[i];
        submission.id = data.challengeId[i];
        submission.challengeName = data.challengeName[i];
        submission.programmingLanguage = data.programmingLanguage[i];
        submission.dateSubmitted = data.dateSubmitted[i];
        submission.executionTime = data.executionTime[i];
        submission.didAllTestsPass = data.didAllTestsPass[i];
        submissions.push(submission);
    }
    return submissions;
}



///==============================================================================///


//GET /getUserSubmissions?userId=12345
// get user submissions --> challenges will link to some other table of all people who have completed challenge
// user submissions will have some metrics stored with it, such as run time, memory usage, test cases past


// May need this later for error checking form data and updating html
    // check that name is valid and check that it does not already exist
    // var challenge = new Challenge(req.body);
    //     challenge.save(function(err, challenge){
    //         if(err){
    //             console.log('Error Inserting New Data');
    //             if (err.name == 'ValidationError') {
    //                 for (field in err.errors) {
    //                     console.log(err.errors[field].path); 
    //                 }
    //             }

    //             // could still set them to invalid and just change the message
    //         } else {
    //             // show a new page saying it worked
    //             res.status(201).json(challenge);
    //         }
    //     });