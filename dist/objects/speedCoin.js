"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../types/index");
var SpeedCoin = /** @class */ (function () {
    function SpeedCoin(speed) {
        this.clazz = 'SpeedCoin';
        this.speed = speed;
        this.color = SpeedCoin.colors[speed];
        this.index = SpeedCoin.itemsIndex;
        ++SpeedCoin.itemsIndex;
        ++SpeedCoin.itemsActive;
    }
    SpeedCoin.prototype.handleCollision = function (snake) {
        snake.setSpeed(this.speed);
        if (this.speed === index_1.Speed.FAST) {
            snake.points += 3;
            snake.maxLength += 3;
        }
        else {
            snake.points += 1;
            snake.maxLength += 1;
        }
        this.destroy();
    };
    SpeedCoin.prototype.destroy = function () {
        delete SpeedCoin.instances[this.index];
        --SpeedCoin.itemsActive;
    };
    SpeedCoin.prototype.toJSON = function () {
        return {
            clazz: this.clazz,
            index: this.index,
            color: this.color,
            speed: this.speed
        };
    };
    SpeedCoin.colors = ['#3366FF', '#FF1400'];
    SpeedCoin.instances = {};
    SpeedCoin.itemsIndex = 0;
    SpeedCoin.itemsActive = 0;
    return SpeedCoin;
}());
exports.default = SpeedCoin;
//# sourceMappingURL=speedCoin.js.map