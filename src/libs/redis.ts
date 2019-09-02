import bluebird = require('bluebird')
import redis = require('redis')

bluebird.promisifyAll(redis)

const client = redis.createClient({
  host: process.env.REDIS_HOST || 'localhost',
  port: 6379,
  password: process.env.REDIS_PASS || 'password'
})

module.exports = client
