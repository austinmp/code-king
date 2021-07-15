const redis = require("redis");


//configure redis client on port 6379
const redisServer = redis.createClient(6379, `challenges-redis`);



redisServer.on('connect', function() {
    console.log('Challenges connected to Redis container');
});



module.exports = redisServer;
