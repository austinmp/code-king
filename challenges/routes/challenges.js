//routes/challenges.js
const router = require("express").Router(); 
const challengeManager = require(`../controllers/challenge-manager`);

// save a new challenge to db
router.post('/createChallenge', challengeManager.postChallenge);

// save an updated version of an existing challenge to db
router.post('/editChallenge', challengeManager.postEditChallenge);

// get all challenges from db (front-end handles pagination)
router.get("/getChallengeSet", challengeManager.getChallengeSet);

// get all data for a specific challenge given challenge id
router.get("/getChallenge", challengeManager.getChallenge);

// get all test cases for a specfic challenge given a challenge id
router.get('/getChallengeParameters', challengeManager.getChallengeTestCases);

module.exports = router;
