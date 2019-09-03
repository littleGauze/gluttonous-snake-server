"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SocketIo = require("socket.io");
var adapter = require("socket.io-redis");
var config = require("config");
var redis_1 = require("../libs/redis");
var common_1 = require("./common");
var sync_1 = require("./sync");
var user_1 = require("./user");
var auth_1 = require("../libs/auth");
exports.default = (function (server, _a) {
    var Game = _a.Game, app = _a.app, sessionOpt = _a.sessionOpt;
    var cfg = config.get('redis');
    var redisAdapter = adapter({
        host: cfg.host,
        port: cfg.port
    });
    var io = SocketIo(server, {
        transports: ['websocket', 'polling'],
        origins: ['http://localhost:8080']
    });
    io.adapter(redisAdapter);
    redis_1.default(io, { app: app, sessionOpt: sessionOpt });
    io.on('connection', function (socket) {
        // console.log(`${socket.id} connected --- `, socket.handshake)
    });
    common_1.default(io);
    sync_1.default(io, function (syncChannel, socket) {
        Game.addPlayer(syncChannel, socket);
    });
    var userChannel = user_1.default(io);
    userChannel.use(auth_1.default(io));
});
//# sourceMappingURL=index.js.map