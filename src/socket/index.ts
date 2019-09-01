import SocketIo = require('socket.io')
import chat from './chat'
import sync from './sync'
import { Drawable } from '../types/index'

export default (server: any, Game: any): void => {
  const io = SocketIo(server, {
    transports: ['websocket', 'polling'],
    origins: ['http://localhost:8080']
  })

  io.on('connection', (socket: any): void => {
    console.log(`${socket.id} connected`)
    socket.emit('msg', 'welcome join us!')
  })

  chat(io)
  sync(io, (sync: any) => {
    Game.init((data: Drawable[][]) => {
      console.log(data)
      // sync.emit('turn', { data })
    })
    Game.start()
  })
}
