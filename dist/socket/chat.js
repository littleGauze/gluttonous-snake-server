"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (io) {
    var sync = io.of('/chat');
    sync.on('text', function (msg) {
        console.log('chat channel got turn text ', msg);
    });
});
//# sourceMappingURL=chat.js.map