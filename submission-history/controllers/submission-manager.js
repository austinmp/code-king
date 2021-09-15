const UserSubmissions = require('../models/user-submissions');

const MAX_HIGHSCORES_PER_PAGE = 10;

// Save a submission to db using username as primary key
async function postSubmission(req, res){
    try {
        const submission = {
            _id: req.body.challengeId, 
            ...req.body 
        }
        let user =  await UserSubmissions.findOne({ 'userName': req.body.userName }).exec();
        if(user){
            const isAlreadySubmitted = user.submissions.id(submission._id);
            // remove old submission before pushing new one
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

// Get all submissions for a user
async function getUserSubmissions(req, res){
    const userName = req.query.userName;
    if(!userName) return res.status(400).json({message : "userId was not specified in query parameters"});
    try {
        let submissions =[];
        const userSubmissions = await UserSubmissions.findOne({'userName': userName}, 'submissions').exec();
        if(userSubmissions) {
            submissions = userSubmissions.submissions;
        }
        return res.status(200).json({userSubmissions : submissions});
    } catch(err){
        console.error(err);
        return res.status(500).json({message : `Submissions service encounted an error while fetching submissions for user ${userName} : ${err}`}); 
    }
}

// Get the top highscores for a specific challenge (number of highscores returned = MAX_HIGHSCORES_PER_PAGE)
// To Do : Add a url query for variable number of highscores
async function getChallengeHighscores(req, res){
    const challengeId = req.query.challengeId;
    if(!challengeId) return res.status(400).json({message : "challengeId was not specified in query parameters"});
    try {
        const allUserSubmissions = await UserSubmissions.find({'submissions._id': challengeId}, { "submissions.$": 1 }).exec();
        const submissionObjects = allUserSubmissions.map(user => { return (user.submissions[0]) });
        const sortedSubmissions = submissionObjects.sort( (a,b)  => { return a.executionTime - b.executionTime });
        return res.status(200).json({highscores : sortedSubmissions.slice(0, MAX_HIGHSCORES_PER_PAGE)});
    } catch(err){
        return res.status(500).json({message : `Submissions service encounted an error while fetching highscores for challengeId ${challengeId} : ${err}`}); 
    }
}

module.exports = {
    postSubmission,
    getUserSubmissions,
    getChallengeHighscores
}