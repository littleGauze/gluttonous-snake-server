export default (io: any): void => {
  const common = io.of('/common')

  common.on('connection', (socket: any): void => {
    console.log(`${socket.id} common connected --- `, socket.handshake)
    socket.emit('chat', 'welcome join the chat.')

    socket.on('authentication', async ({ name }: { name: string }, callback: any) => {
      const user = await io.redisStore.setUser(name)
      callback(user)
    })
  })
}
