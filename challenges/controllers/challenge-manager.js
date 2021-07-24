const fetch = require('node-fetch');
const Challenge = require('../models/challenge');

const MAX_CHALLENGES_PER_PAGE = 20;
const SUBMISSION_HISTORY_PORT= '5050';
const SUBMISSION_HISTORY_HOST = 'http://submission-history:';

/// SAVE A NEW CHALLENGE TO DB ///
async function postChallenge(req, res, next){
    
    try {
        const isDuplicateChallenge = await Challenge.exists({'name' : req.body.name});
        if(isDuplicateChallenge){
            return res.status(409).json({ message: "A challenge with that name already exists"});
        }

        const newChallenge = new Challenge({...req.body});
        await newChallenge.save();
        return res.status(201).json({ 
            message     : `Challenge created successfully! Challenge Id: ${newChallenge.id}`,
            ...newChallenge
        });

    } catch(err){
        console.log(err);
        return res.status(500).json({ 
            message : "Challenges service encounted an error while saving the challenge to the database.",
            error   : `${err}`
        });  
    }
}

// function isValidTestCases(input, expected){
//     let isValid = false;
//     try {
//         const testInputs = JSON.parse(input);
//         const testOutputs = JSON.parse(expected);  
//         if(Array.isArray(testInputs) && Array.isArray(testOutputs)){
//             if(testInputs.length === testOutputs.length){

//                 for(const i of testInputs ){
//                     if(!(Array.isArray(testInputs[i]) && Array.isArray(testOutputs[i]))) return false
//                 }


                // testInputs.every( testInput => )

                // testInputs.map( testInput => {
                //     if(!Array.isArray(testInput)) return false;
                // });

                // testOutputs.map(testOutput => {
                //     if(!Array.isArray(testOutput)) return false;
                // });
    
//                 isValid = true;
//             }
//         }
//         return isValid;
//     } catch(err) {
//         console.log('ERROR');
//         console.log(err);
//         return false;
//     }
// }
    

function getEnteredTestCases(req){
    let testCases = [];
    for(let test in req.body.testInput){
        let testCase = {
            input       : JSON.parse(req.body.testInput[test]),
            expected    : JSON.parse(req.body.testExpected[test])
        };
        testCases.push(testCase);
    }  
    return testCases;
}

/// GET SPECIFIED NUMBER OF CHALLENGE OBJECTS FROM DB ///
async function getChallengeSet(req, res, next){
    // let numChallenges = MAX_CHALLENGES_PER_PAGE;
    // let query = req.query.numChallenges;
    // if(query && Number.isSafeInteger(JSON.parse(query))) numChallenges = JSON.parse(query);
    try {
        const challenges = await Challenge.find({},{__v: 0}).exec();
        return res.status(200).json({challenges : challenges}); 
    } catch (err) {
        return res.status(500).json({ 
            message : "Challenges service was unable to retrieve the challenge set",
            error   : `${err}`
        });
    }
}

/// GET ALL DATA FOR A CHALLENGE GIVEN ITS DB _ID ///
async function getChallenge(req, res, next){
    const _id = req.query._id;
    if(!_id){
        return res.status(400).json({ message: "Bad Request: A valid challengeId must be provided in the query parameters"});
    } 
    try { 
        const challenge = await Challenge.findById(_id).exec();
        if(!challenge || challenge.length === 0){
            return res.status(404).json({ message: `Challenge with id:${_id} does not exist`});
        }   
        return res.status(200).json({...challenge._doc});
    } catch(err) {
        return res.status(500).json({ 
            message : `Challenges service was unable to retrieve the challenge with id:${_id}`,
            error   : `${err}`
        });
    }
}

/// GET TEST CASES FOR SPECIFIED CHALLENGE ///
async function getChallengeTestCases(req, res, next){
    const challengeId = req.query.challengeId;
    if(!challengeId){
        return res.status(400).json({ message: "Bad Request: A valid challengeId must be provided in the query parameters"});
    } 
    try { 
        const testCasesDBObject = await Challenge.find({"id": challengeId}, 'testCases').exec();
        if(testCasesDBObject.length === 0){
            return res.status(404).json({ message: `Challenge with id:${challengeId} does not exist`});
        }           
        return res.status(200).json({testCases : testCasesDBObject[0].testCases});
    } catch(err) {
        return res.status(500).json({ 
            message : "Challenges service was unable to retrieve challenge tests",
            error   : `${err}`
        });
    }
}

/// GET HIGHSCORES FOR SPECIFIED CHALLENGE FROM SUBMISSIONS SERVICE/// 
async function getHighscores(req, res, next){
    const challengeId = req.query.challengeId;
    const programmingLanguage = req.query.programmingLanguage;
    const url = `${SUBMISSION_HISTORY_HOST}${SUBMISSION_HISTORY_PORT}/getChallengeHighscores?challengeId=${challengeId}&programmingLanguage=${programmingLanguage}`;
    let statusCode = 500;
    if(!challengeId || !programmingLanguage){
        return res.status(400).json({ message: "Bad Request: A valid challengeId and programmingLanguage must be provided in the query parameters"});
    }
    try {
        const response = await fetch(url);
        if(!response.ok){
            statusCode = response.status;
            throw new Error(response.message);
        } 
        const highscores = await response.json();
        return res.status(200).json(highscores);
    } catch(err) {
        return res.status(statusCode).json({ 
            message : "Challenges service was unable to retrieve highscores",
            error   : `${err}`
        });
    }
}     

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

module.exports = {
    postChallenge,
    getChallengeSet,
    getChallenge,
    getChallengeTestCases,
    getHighscores
}