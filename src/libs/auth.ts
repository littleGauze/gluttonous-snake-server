export default (io: any): any => async (socket: any, next: any): Promise<void> => {
  const { token } = socket.handshake.query
  console.log('token ====> ', token, socket.handshake)
  if (token) {
    const user = await io.redisStore.findUserByToken(token)
    console.log('get user by token ===> ', user)
    if (user) {
      socket._user = user
      next()
      return
    }
  }
  next(new Error('user unauthorize!!!'))
}
