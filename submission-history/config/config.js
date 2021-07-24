const dotenv = require('dotenv').config();

const config = {
    port: process.env.PORT,
    host: process.env.HOST,
    database: {
        url: process.env.DATABASE_URL,
        password: process.env.DATABASE_PASSWORD,
        name: process.env.DATABASE_NAME,
        collection: process.env.DATABASE_COLLECTION
    },
}

module.exports = config;
