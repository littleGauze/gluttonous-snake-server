import SocketIo from './socket'
import Game from './game'

import Koa = require('koa')
import Router = require('koa-router')
import http = require('http')
import cors = require('koa-cors')

const app = new Koa()
const router = new Router()

const server = http.createServer(app.callback())
SocketIo(server, Game)

app.use(cors({
  origin: true
}))
app.use(router.routes())

server.listen(3001, () => {
  console.log('Server running on port 3000')
})
