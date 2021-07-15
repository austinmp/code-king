const mongoose = require("mongoose");
const config = require('../config/config.js');

const db = config.database.url
    .replace('<password>', config.database.password)
    .replace('<database>', config.database.name);

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .catch(error => console.log("db.js error: " + error));

mongoose.connection.on('connected', function(){
    console.log(`Challenges service successfully connected to MongoDB ${config.database.collection} collection.`);
});

module.exports = mongoose;
