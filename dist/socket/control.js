"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (io) {
    var sync = io.of('/control');
    sync.on('op', function (msg) {
        console.log('chat channel got turn text ', msg);
    });
});
//# sourceMappingURL=control.js.map