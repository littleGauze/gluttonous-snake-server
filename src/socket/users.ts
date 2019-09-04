import Game from '../game'
import { Direction, GameKey } from '../types/index'
import { Snake } from '../objects/index'

export default (io: any, commonChannel: any): any => {
  const users = io.of('/users')

  users.on('connection', (socket: any) => {
    socket.on('control', (op: { direction?: Direction, skill?: GameKey }) => {
      const { token } = socket._user

      // find player and change the action
      const player = Game.players.find((p: Snake) => p.token === token)
      if (player) {
        if (op.direction !== undefined) {
          player.direction = op.direction
        } else if (op.skill === GameKey.SPACEBAR) {
          player.jump()
        }
      }
    })

    socket.on('chat', (msg: { text: string }) => {
      const date = new Date()
      const { name } = socket._user
      commonChannel.emit('chat', { name, msg: msg.text, date })
    })
  })

  return users
}
