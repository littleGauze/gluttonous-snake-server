"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../ux/index");
var Coin = /** @class */ (function () {
    function Coin(value) {
        this.clazz = 'Coin';
        this.value = value;
        this.index = Coin.coinsIndex;
        ++Coin.coinsIndex;
        ++Coin.coinsActive;
    }
    Coin.createRandom = function () {
        return new Coin(1);
    };
    Coin.prototype.handleCollision = function (snake) {
        snake.points += this.value;
        snake.maxLength += 1;
        this.destroy();
    };
    Coin.prototype.destroy = function () {
        index_1.Board.removeObjectAt(this.position);
        delete Coin.instances[this.index];
        --Coin.coinsActive;
    };
    Coin.prototype.toJSON = function () {
        return {
            clazz: this.clazz,
            index: this.index,
            value: this.value
        };
    };
    Coin.values = [200, 600, 800, 1000, 2000];
    Coin.instances = {};
    Coin.coinsIndex = 0;
    Coin.coinsActive = 0;
    return Coin;
}());
exports.default = Coin;
//# sourceMappingURL=coin.js.map