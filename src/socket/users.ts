export default (io: any, commonChannel: any): any => {
  const users = io.of('/users')

  users.on('connection', (socket: any) => {
    console.log('users connection =====', socket.handshake)
    socket.on('control', (msg: any) => {
      console.log('chat channel got turn text ', msg)
    })

    socket.on('chat', (msg: { text: string }) => {
      const date = new Date()
      const { name } = socket._user
      console.log('data ', { name, msg: msg.text, date })
      commonChannel.emit('chat', { name, msg: msg.text, date })
    })
  })

  return users
}
