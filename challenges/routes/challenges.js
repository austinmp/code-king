//routes/challenges.js
const router = require("express").Router(); 
const challengeManager = require(`../controllers/challenge-manager`);

/// Save a new challenge to db
router.post('/createChallenge', challengeManager.postChallenge);

// Get all challenges from db (front-end handles pagination)
router.get("/getChallengeSet", challengeManager.getChallengeSet);

/// Get all data for a specific challenge given database _id
router.get("/getChallenge", challengeManager.getChallenge);

// Get all test cases for a specfic challenge given a challenge id
router.get('/getChallengeParameters', challengeManager.getChallengeTestCases);

module.exports = router;
