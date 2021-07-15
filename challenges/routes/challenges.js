//routes/challenges.
const Challenge = require("../models/challenge");
const router = require("express").Router(); 
const createChallengeController = require(`../controllers/challengesController`);


/// POST NEWLY CREATED CHALLENGE TO DB ///
router.post('/createChallenge', createChallengeController.challengeCreatePost);

/// GET SPECIFIED CHALLENGE'S TESTS & OTHER PARAMETERS ///
// Example: /getChallengeParameters?challengeId=1234 ==> returns array of test objects for challenge with specified id
router.get('/getChallengeParameters', createChallengeController.challengeParametersGet);

/// GET SPECIFIED NUMBER OF CHALLENGES ///
// Example: /getChallengeSet?num=20 ==> retuns 20 challenges (default of 10)
router.get("/getChallengeSet", createChallengeController.getChallengeSet);

// GET SPECIFIED CHALLENGES HIGHSCORES ///
/// Example /getHighscores?challengeId=212&programmingLanguage=java
router.get("/getHighscores", createChallengeController.getHighscores);

/// DELETE ALL DOCUMENTS FROM DB ///
router.get("/delete", createChallengeController.deleteAllDocuments);


///========================== WILL MOVE TO GATEWAY ==========================///

/// GET CHALLENGE SET PAGE ///
// Need to add extra parameters to set which category of challenges to get
router.get('/challengeSet', createChallengeController.challengeSetPageGet);

/// GET CHALLENGE HIGHSCORES PAGE ///
/// /highscores?challengeId=212&programmingLanguage=java
router.get("/highscores", createChallengeController.highscoresPageGet);

///=========================================================================///

/// TEST ROUTE ///
// router.get("/test", createChallengeController.test);

module.exports = router;












/// ADD THESE ENDPOINTS FOR OTHER SERVICES /// 

// // GET /getUserSubmissions?userId=12345
// router.get("/getUserSubmissions", function(req, res){
//     console.log("Received a request for user submission");

//     // Extract the URL query parameters
//     var userId = req.query.userId;
   
//     var submissions = ["Algorithm 1", "DFS", "Prison Break", "Word Count"];
//     res.set('content-type', 'text/plain');
//     res.send(submissions);
// });

// // GET /getChallengeHighscores?challengeId=12345&programmingLanguage=java
// router.get("/getChallengeHighscores", function(req, res){
//     console.log("Received a request for challenge high scores");

//     // Extract the URL query parameters
//     var challengeId = req.query.challengeId;
//     var programmingLanguage = req.query.programmingLanguage;

//     var highscores = ["100", "92", "33", "44"];
//     res.set('content-type', 'text/plain');
//     res.send(highscores);
// });