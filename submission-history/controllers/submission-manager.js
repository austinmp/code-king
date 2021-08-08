const fetch = require('node-fetch');
const UserSubmissions = require('../models/user-submissions');

const MAX_HIGHSCORES_PER_PAGE = 10;

//TO DO : Only save highest score submission for each user?

/// SAVE/UPDATE A SUBMISSION IN DATABASE ///
async function postSubmission(req, res){
    try {
        const submission = {
            _id: req.body.challengeId, 
            ...req.body 
        }
        let user =  await UserSubmissions.findOne({ 'userName': req.body.userName });
        if(user){
            const isAlreadySubmitted = user.submissions.id(submission._id);
            if(isAlreadySubmitted){
                user.submissions.id(submission._id).remove();
            }
            user.submissions.push(submission);
        } else {
            user = new UserSubmissions({
                _id: submission.userName,
                userName: submission.userName,
                submissions: [submission]
            });
        }
        await user.save();   
        return res.status(201).json({message :`Submission created successfully!`});
    } catch(err) {
        console.error(err);
        if(err.name == 'ValidationError'){
            return res.status(400).json({message : err.message}); 
        }
        return res.status(500).json({message : `Submissions service encounted an error while saving the challenge to the database : ${err}`});  
    }
}

async function getUserSubmissions(req, res){
    const userId = req.query.userId;
    if(!userId) return res.status(400).json({message : "userId was not specified in query parameters"});
    try {
        const userSubmissions = await submission.find({'userId': userId}).exec();
        return res.status(200).json({userSubmissions : userSubmissions});
    } catch(err){
        return res.status(500).json({message : `Submissions service encounted an error while fetching submissions for user ${userId} : ${err}`}); 
    }
}

async function getChallengeHighscores(req, res){
    const challengeId = req.query.challengeId;
    if(!challengeId) return res.status(400).json({message : "challengeId was not specified in query parameters"});
    try {
        const submissions = await submission.find({'challengeId' : challengeId})
        .sort({'executionTime': 1}) //lowest times first
        .exec();
        return res.status(200).json({highscores : submissions});
    } catch(err){
        return res.status(500).json({message : `Submissions service encounted an error while fetching highscores for challengeId ${challengeId} : ${err}`}); 
    }
}

module.exports = {
    postSubmission,
    getUserSubmissions,
    getChallengeHighscores
}