"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (io) {
    var user = io.of('/user');
    user.on('control', function (msg) {
        console.log('chat channel got turn text ', msg);
    });
    user.on('join', function (msg) {
        // log user in
    });
    return user;
});
//# sourceMappingURL=user.js.map