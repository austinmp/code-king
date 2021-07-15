//server.js
const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const formData = require('express-form-data');
const config = require('./config/config');
const cors = require('cors');
// const redisServer = require('./redis-server/server');

const port = config.port || 3000;
const app = express();

const router = express.Router();

// Body-parser middleware 
// router.use(bodyParser.json());

// router.use(bodyParser.urlencoded({extended:false}))

// Let router handle all requests with the routes defined in /routes/challenges
app.use(formData.parse());
app.use(express.json()); 
app.use(function (req, res, next) {
    //Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
      next();
    });
router.use("/", require("./routes/challenges"));
app.use(router);
app.use(cors());

// Serve static files from public directory
// app.use(express.static("public"));

// View engine setup.
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

// Start the server
app.listen(port,function() {console.log("server.js: Challenges server listening on port: " + port);});

// module.exports = redisServer;

