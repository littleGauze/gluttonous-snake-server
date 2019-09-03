import SocketIo = require('socket.io')
import adapter = require('socket.io-redis')
import config = require('config')
import redisStore from '../libs/redis'

import common from './common'
import sync from './sync'
import user from './user'
import auth from '../libs/auth'

export default (server: any, { Game, app, sessionOpt }: any): void => {
  const cfg: any = config.get('redis')
  const redisAdapter = adapter({
    host: cfg.host,
    port: cfg.port
  })

  const io = SocketIo(server, {
    transports: ['websocket', 'polling'],
    origins: ['http://localhost:8080']
  })

  io.adapter(redisAdapter)
  redisStore(io, { app, sessionOpt })

  io.on('connection', (socket: any): void => {
    // console.log(`${socket.id} connected --- `, socket.handshake)
  })

  common(io)
  sync(io, (syncChannel: any, socket: any) => {
    Game.addPlayer(syncChannel, socket)
  })

  const userChannel = user(io)
  userChannel.use(auth(io))
}
