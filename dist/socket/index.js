"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SocketIo = require("socket.io");
var adapter = require("socket.io-redis");
var config = require("config");
var store_1 = require("../libs/store");
var redis_1 = require("../libs/redis");
var common_1 = require("./common");
var sync_1 = require("./sync");
var users_1 = require("./users");
var auth_1 = require("../libs/auth");
exports.default = (function (server, Game) {
    var cfg = config.get('redis');
    var redisAdapter = adapter({
        host: cfg.host,
        port: cfg.port
    });
    var io = SocketIo(server, {
        transports: ['websocket', 'polling'],
        origins: [
            'http://localhost:8080',
            'https://littlegauze.github.io/',
            'http://snake.gauze.life',
            'http://snake',
            'http://gauze.life:8081',
            'http://gaze.life:*',
            'http://localhost:*'
        ]
    });
    // io.adapter(redisAdapter)
    redis_1.default(io, { store: store_1.default(cfg) });
    var commonChannel = common_1.default(io);
    sync_1.default(io, function (syncChannel, socket) {
        Game.syncStart(syncChannel, socket);
    });
    var usersChannel = users_1.default(io, commonChannel);
    usersChannel.use(auth_1.default(io));
});
//# sourceMappingURL=index.js.map