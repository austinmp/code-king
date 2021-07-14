const router = require("express").Router(); 
const controller = require("../Controllers/controller");

/// Return all data required for challengeSet page ///
router.get('/getChallengeSetPageData', controller.composeChallengeSetPageData);

/// Return all data required for highscores page ///
router.get('/getHighscoresPageData', controller.composeHighscoresPageData);

router.post('/createChallenge', controller.postNewChallenge);

module.exports = router;