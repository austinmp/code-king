//server.js
const path = require('path');
const express = require("express");
const config = require('./Config/config');

const app = express();
var router = express.Router();

const port = config.port || 9000;
const hostname = config.host || '127.0.0.1';

/********* MIDDLEWARE **********/
app.use(express.json()); // middleware (modifies incoming request data)
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === "OPTIONS") {
      console.log('got options request');
      res.header('Access-Control-Allow-Origin', req.headers.origin);
    } else {
      res.header('Access-Control-Allow-Origin', '*');
    }
    next();
  });
// router.use(bodyParser.urlencoded({extended:false}));


/******** ROUTEHANDLERS ********/
router.use("/", require("./Routes/routes"));        // Let router handle all requests with the routes defined in /Routes
app.use(router);

/********* SERVER *********/
app.listen(port, hostname, () => {
    console.log(`Gateway server running at http://${hostname}:${port}/`);
});