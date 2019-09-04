"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (io, commonChannel) {
    var users = io.of('/users');
    users.on('connection', function (socket) {
        console.log('users connection =====', socket.handshake);
        socket.on('control', function (msg) {
            console.log('chat channel got turn text ', msg);
        });
        socket.on('chat', function (msg) {
            var date = new Date();
            var name = socket._user.name;
            console.log('data ', { name: name, msg: msg.text, date: date });
            commonChannel.emit('chat', { name: name, msg: msg.text, date: date });
        });
    });
    return users;
});
//# sourceMappingURL=users.js.map