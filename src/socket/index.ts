import SocketIo = require('socket.io')
import adapter = require('socket.io-redis')

import chat from './chat'
import sync from './sync'
import { Drawable } from '../types/index'

export default (server: any, Game: any): void => {
  const redisAdapter = adapter({
    host: process.env.REDIS_HOST || 'localhost',
    port: 6379
  })

  const io = SocketIo(server, {
    transports: ['websocket', 'polling'],
    origins: ['http://localhost:8080']
  })

  io.adapter(redisAdapter)

  io.on('connection', (socket: any): void => {
    console.log(`${socket.id} connected`)
    socket.emit('msg', 'welcome join us!')
  })

  chat(io)
  sync(io, (syncChannel: any, socket: any) => {
    Game.addPlayer(syncChannel, socket)
  })
}
