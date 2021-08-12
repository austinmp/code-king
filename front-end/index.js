const express = require('express');
const path = require('path');
const app = express();
const dotenv = require('dotenv');

const port = process.env.PORT || 8010;
const host = process.env.HOST;

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// docker will open port 80 to outside requests, but route them to 8010 internally
app.listen(port, host, () => {
    console.log(`Front-end server running at http://${host}:${port}/`);
});

