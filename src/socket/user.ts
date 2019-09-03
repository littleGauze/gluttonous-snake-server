export default (io: any): any => {
  const user = io.of('/user')

  user.on('control', (msg: any) => {
    console.log('chat channel got turn text ', msg)
  })

  user.on('join', (msg: { name: string }) => {
    // log user in

  })

  return user
}
