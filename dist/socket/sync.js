"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (io, callback) {
    var sync = io.of('/sync');
    sync.on('connect', function (socket) {
        console.log('on sync connected ');
        callback(sync, socket);
    });
});
//# sourceMappingURL=sync.js.map