"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Koa = require("koa");
var Router = require("koa-router");
var http = require("http");
var cors = require("koa-cors");
var socket_1 = require("./socket");
var game_1 = require("./game");
var app = new Koa();
var router = new Router();
var server = http.createServer(app.callback());
socket_1.default(server, game_1.default);
app.use(cors({
    origin: true
}));
app.use(router.routes());
server.listen(3001, function () {
    console.log('Server running on port 3000');
});
//# sourceMappingURL=app.js.map