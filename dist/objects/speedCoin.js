"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SpeedCoin = /** @class */ (function () {
    function SpeedCoin(speed) {
        this.speed = speed;
        this.color = SpeedCoin.colors[speed];
        this.index = SpeedCoin.itemsIndex;
        ++SpeedCoin.itemsIndex;
        ++SpeedCoin.itemsActive;
    }
    SpeedCoin.prototype.handleCollision = function (snake) {
        snake.setSpeed(this.speed);
        this.destroy();
    };
    SpeedCoin.prototype.destroy = function () {
        delete SpeedCoin.instances[this.index];
        --SpeedCoin.itemsActive;
    };
    SpeedCoin.colors = ['#3366FF', '#FF1400'];
    SpeedCoin.instances = {};
    SpeedCoin.itemsIndex = 0;
    SpeedCoin.itemsActive = 0;
    return SpeedCoin;
}());
exports.default = SpeedCoin;
//# sourceMappingURL=speedCoin.js.map