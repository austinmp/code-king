const dotenv = require('dotenv');

dotenv.config({path: './config.env'});

config = {
    port: process.env.PORT,
    host: process.env.HOST,
    database: {
        url: process.env.DATABASE_URL,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD
    },
    salt_rounds: process.env.SALT_ROUND
}

module.exports = config;