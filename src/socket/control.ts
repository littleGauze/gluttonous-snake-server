export default (io: any): void => {
  const sync = io.of('/control')

  sync.on('op', (msg: any) => {
    console.log('chat channel got turn text ', msg)
  })
}
