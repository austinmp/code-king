const router = require("express").Router(); 
const submissionManager = require(`../controllers/submission-manager`);

router.post('/createSubmission', submissionManager.postSubmission);

router.get('/getUserSubmissions', submissionManager.getUserSubmissions);

router.get('/getChallengeHighscores', submissionManager.getChallengeHighscores);

module.exports = router;