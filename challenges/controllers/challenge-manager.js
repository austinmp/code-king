const Challenge = require('../models/challenge');

/// Save a new challenge to db
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
            ...newChallenge._doc
        });
    } catch(err){
        console.log(err);
        return res.status(500).json({ 
            message : "Challenges service encounted an error while saving the challenge to the database.",
            error   : `${err}`
        });  
    }
}    

// Get all challenges from db (front-end handles pagination)
async function getChallengeSet(req, res, next){
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

/// Get all data for a specific challenge given id
async function getChallenge(req, res, next){
    const challengeId = req.query.challengeId;
    if(!challengeId){
        return res.status(400).json({ message: "Bad Request: A valid challengeId must be provided in the query parameters"});
    } 
    try { 
        const challenge = await Challenge.findOne({ 'id': challengeId }).exec();
        if(!challenge || challenge.length === 0){
            return res.status(404).json({ message: `Challenge with id: ${challengeId} does not exist`});
        }   
        return res.status(200).json({...challenge._doc});
    } catch(err) {
        return res.status(500).json({ 
            message : `Challenges service was unable to retrieve the challenge with id: ${challengeId}`,
            error   : `${err}`
        });
    }
}

// Get all test cases for a specfic challenge given a challenge id
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

module.exports = {
    postChallenge,
    getChallengeSet,
    getChallenge,
    getChallengeTestCases,
}


