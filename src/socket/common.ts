export default (io: any): any => {
  const common = io.of('/common')

  common.on('connection', (socket: any): void => {
    console.log(`${socket.id} common connected --- `, socket.handshake)
    socket.emit('chat', 'hello there...')
    socket.on('authentication', async ({ name }: { name: string }, callback: any) => {
      console.log('authentication ==== ', name)
      const user = await io.redisStore.setUser(name)
      socket._user = user
      callback(user)
    })
    socket.on('chat', (msg: string) => {
      console.log('server got msg ====> ', msg)
    })
  })

  return common
}
