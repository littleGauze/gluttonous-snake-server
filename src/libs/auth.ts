export default (io: any): any => async (socket: any, next: any): Promise<void> => {
  const { token } = socket.handshake.query
  if (token) {
    const user = await io.redisStore.findUserByToken(token)
    if (user) {
      socket.user = user
      next()
      return
    }
  }
  next(new Error('user unauthorize!!!'))
}
