//server.js
const express = require("express");
const formData = require('express-form-data');
const config = require('./config/config.js');

const port = config.port || 3000;
const app = express();

const router = express.Router();
router.use("/", require("./routes/challenges"));


app.use(formData.parse());
app.use(express.json()); 
app.use(router);


app.listen(port,function() {console.log("server.js: Challenges server listening on port: " + port);});


