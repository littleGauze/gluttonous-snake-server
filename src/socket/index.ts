import SocketIo = require('socket.io')
import adapter = require('socket.io-redis')
import config = require('config')
import store from '../libs/store'
import redis from '../libs/redis'

import common from './common'
import sync from './sync'
import users from './users'
import auth from '../libs/auth'

export default (server: any, Game: any): void => {
  const cfg: any = config.get('redis')
  const redisAdapter = adapter({
    host: cfg.host,
    port: cfg.port
  })

  const io = SocketIo(server, {
    transports: ['websocket', 'polling'],
    origins: ['http://localhost:8080']
  })

  // io.adapter(redisAdapter)
  redis(io, { store: store(cfg) })

  const commonChannel = common(io)
  sync(io, (syncChannel: any, socket: any) => {
    Game.syncStart(syncChannel, socket)
  })

  const usersChannel = users(io, commonChannel)
  usersChannel.use(auth(io))
}
