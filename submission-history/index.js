const express = require('express');
const db = require('./database/db');
const config = require('./config/config');
const formData = require('express-form-data');

const port = config.port || 5050;
const app = express();

const router = express.Router();
router.use("/", require('./routes/routes'));

app.use(formData.parse());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);


app.listen(port, () => {
    console.log(`Submissions server listening on port: ${port}`);
});

