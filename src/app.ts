const Koa = require('koa')
const Router = require('koa-router')
const SocketIo = require('socket.io')
const http = require('http')
const cors = require('koa-cors')

const app = new Koa()
const router = new Router()

const server = http.createServer(app.callback())
router.get('/*', async (ctx: any) => {
  ctx.body = 'Hello, World!'
})

app.use(cors())
app.use(router.routes())

const io = SocketIo(server)
io.on('connection', (socket: any) => {
  console.log(`${socket.id} connected`)
  socket.emit('msg', 'welcome join us!')
})

server.listen(3001, () => {
  console.log('Server running on port 3000')
})
