"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bluebird = require("bluebird");
var redis = require("redis");
bluebird.promisifyAll(redis);
var client = redis.createClient({
    host: process.env.REDIS_HOST || 'localhost',
    port: 6379,
    password: process.env.REDIS_PASS || 'password'
});
module.exports = client;
//# sourceMappingURL=redis.js.map