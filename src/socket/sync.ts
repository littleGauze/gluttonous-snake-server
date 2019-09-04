export default (io: any, callback: Function): void => {
  const sync = io.of('/sync')

  sync.on('connect', (socket: any) => {
    callback(sync, socket)
  })
}
