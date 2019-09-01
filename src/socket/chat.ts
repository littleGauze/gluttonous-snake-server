export default (io: any): void => {
  const sync = io.of('/chat')

  sync.on('text', (msg: any) => {
    console.log('chat channel got turn text ', msg)
  })
}
