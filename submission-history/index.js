const express = require('express');
const db = require('./database/db');
const config = require('./config/config');
const routes = require('./routes/routes');

const port = config.port || 5050;
const app = express();

app.use("/", routes);
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.text());

app.listen(port, () => {
    console.log(`Submissions server listening on port: ${port}`);
});

