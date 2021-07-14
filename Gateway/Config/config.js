const dotenv = require('dotenv');

dotenv.config({path: './config.env'});

config = {
    port: process.env.PORT,
    host: process.env.HOST,
}

module.exports = config;