const fetch = require('node-fetch');        // For sending HTTP requests
const challengesHost = 'http://localhost:'
const challengesPort = '3000'
// const challengesHost = 'http://challenges:'


/// Gets challenge set from challenges and returns them to the front end ///
exports.composeChallengeSetPageData = async function(req, res, next){
    console.log("Gateway: Received arequest for challenge set page data");
    var url = `${challengesHost}${challengesPort}/getChallengeSet`;
    fetch(url)      // Get challenge set from challenges service
        .then(result => result.json())
        .then(challengeSet => {
            if(!challengeSet.ok){
                console.log(`Gateway: failed to retrieve challenge set from 
                challenges service due to the following error: ${challengeSet.error}`);
                res.status(404).send({ error: 'Failed to retrieve challenge set!' });
            }
            res.json(challengeSet);
        })
        .catch( err => res.status(500).send({ error: err }));
}

/// Gets highscores set from challenges and returns them to the front end ///
exports.composeHighscoresPageData = async function(req, res, next){
    console.log("Gateway: Received arequest for challenge set page data");
    var challengeId = req.query.challengeId;
    var programmingLanguage = req.query.programmingLanguage;
    var url = `${challengesHost}${challengesPort}/getHighscores?challengeId=${challengeId}&programmingLanguage=${programmingLanguage}`;
    await fetch(url)      // Get highscores from challenges service for specified challenge
        .then(result => result.json())
        .then(highscores=> {
            if(!highscores.ok){
                console.log(`Gateway: failed to retrieve highscores set from 
                challenges service due to the following error: ${highscores.error}`);
                res.status(404).send({ error: 'Failed to retrieve highscores!' });
            }
            res.status(highscore.status).json(highscores);
        })
        .catch( err => res.status(500).send({ error: err }));
}



exports.postNewChallenge = async function(req, res, next){
    console.log("Gateway: got a post request");
    console.log(req.body);
    const url = `${challengesHost}${challengesPort}/createChallenge`;

    await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(req.body) // body data type must match "Content-Type" header
      })
      .then(result => result.json())
      .then(result => {
          if(!result.ok){
              res.status(result.status).send({ error: 'TO DO: ADD THE ERROR MESSAGE SENT FROM CHALLENGES' });
          }
          res.status(result.status).send("Challenge created successfully");
      })
      .catch( err => res.status(500).send({ error: err }));
}