export default (io: any): any => {
  const common = io.of('/common')

  common.on('connection', (socket: any): void => {
    socket.on('authentication', async ({ name }: { name: string }, callback: any) => {
      const user = await io.redisStore.setUser(name)
      socket._user = user
      callback(user)
    })
  })

  return common
}
