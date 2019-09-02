"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SocketIo = require("socket.io");
var adapter = require("socket.io-redis");
var chat_1 = require("./chat");
var sync_1 = require("./sync");
exports.default = (function (server, Game) {
    var redisAdapter = adapter({
        host: process.env.REDIS_HOST || 'localhost',
        port: 6379
    });
    var io = SocketIo(server, {
        transports: ['websocket', 'polling'],
        origins: ['http://localhost:8080']
    });
    io.adapter(redisAdapter);
    io.on('connection', function (socket) {
        console.log(socket.id + " connected");
        socket.emit('msg', 'welcome join us!');
    });
    chat_1.default(io);
    sync_1.default(io, function (syncChannel, socket) {
        Game.addPlayer(syncChannel, socket);
    });
});
//# sourceMappingURL=index.js.map