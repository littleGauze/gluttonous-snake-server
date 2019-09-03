import SocketIo from './socket'
import Game from './game'

import Koa = require('koa')
import Router = require('koa-router')
import http = require('http')
import cors = require('koa-cors')
import session = require('koa-generic-session')
import sessionStore = require('koa-redis')
import koaBodyparser = require('koa-bodyparser')
import config = require('config')

const app = new Koa()
const router = new Router()

const cfg: any = config.get('redis')
app.keys = ['koa2', 'socketio', 'koa-session']

const sessionOpt = {
  store: sessionStore({
    host: cfg.host,
    port: cfg.port
  }),
  key: 'snake'
}
app.use(session(sessionOpt))
app.use(koaBodyparser())

const server = http.createServer(app.callback())
SocketIo(server, { Game, app, sessionOpt })

app.use(cors({
  origin: true
}))

router.get('/user', async (ctx, next) => {
  ctx.body = ctx.session.user
})

router.post('/auth', async (ctx, next) => {
  const { body } = ctx.request
  ctx.body = body
})

app.use(router.routes())

server.listen(3001, () => {
  console.log('Server running on port 3000')
})
