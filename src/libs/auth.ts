import Game from '../game'

export default (io: any): any => async (socket: any, next: any): Promise<void> => {
  const { token } = socket.handshake.query
  console.log('token ====> ', token)
  if (token) {
    const user = await io.redisStore.findUserByToken(token)
    if (user) {
      socket._user = user

      // add player
      Game.addPlayer(user)

      next()
      return
    }
  }
  next(new Error('user unauthorize!!!'))
}
