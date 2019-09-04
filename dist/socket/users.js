"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var game_1 = require("../game");
var index_1 = require("../types/index");
exports.default = (function (io, commonChannel) {
    var users = io.of('/users');
    users.on('connection', function (socket) {
        socket.on('control', function (op) {
            var token = socket._user.token;
            // find player and change the action
            var player = game_1.default.players.find(function (p) { return p.token === token; });
            if (player) {
                if (op.direction !== undefined) {
                    player.direction = op.direction;
                }
                else if (op.skill === index_1.GameKey.SPACEBAR) {
                    player.jump();
                }
            }
        });
        socket.on('chat', function (msg) {
            var date = new Date();
            var name = socket._user.name;
            commonChannel.emit('chat', { name: name, msg: msg.text, date: date });
        });
    });
    return users;
});
//# sourceMappingURL=users.js.map