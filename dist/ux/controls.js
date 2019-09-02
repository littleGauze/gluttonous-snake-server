"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../types/index");
var Controls = /** @class */ (function () {
    function Controls() {
    }
    Controls.processInput = function (player) {
        if (!Controls.lastKey)
            return;
        switch (Controls.lastKey) {
            case index_1.ControlKey.START:
                break;
            case index_1.ControlKey.PAUSE:
                break;
            case index_1.ControlKey.RESET:
                break;
            case index_1.GameKey.W:
            case index_1.GameKey.UP:
                if (player.direction !== index_1.Direction.DOWN) {
                    player.direction = index_1.Direction.UP;
                }
                break;
            case index_1.GameKey.S:
            case index_1.GameKey.DOWN:
                if (player.direction !== index_1.Direction.UP) {
                    player.direction = index_1.Direction.DOWN;
                }
                break;
            case index_1.GameKey.A:
            case index_1.GameKey.LEFT:
                if (player.direction !== index_1.Direction.RIGHT) {
                    player.direction = index_1.Direction.LEFT;
                }
                break;
            case index_1.GameKey.D:
            case index_1.GameKey.RIGHT:
                if (player.direction !== index_1.Direction.LEFT) {
                    player.direction = index_1.Direction.RIGHT;
                }
                break;
            case index_1.GameKey.SPACEBAR:
                player.jump();
                break;
            default:
                break;
        }
        Controls.lastKey = null;
    };
    Controls.lastKey = null;
    Controls.onKeyUp = function (ev) { Controls.lastKey = ev.keyCode; };
    return Controls;
}());
exports.default = Controls;
//# sourceMappingURL=controls.js.map