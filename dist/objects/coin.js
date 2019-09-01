"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../ux/index");
var Coin = /** @class */ (function () {
    function Coin(value) {
        this.value = value;
        this.index = Coin.coinsIndex;
        ++Coin.coinsIndex;
        ++Coin.coinsActive;
    }
    Coin.createRandom = function () {
        return new Coin(Coin.values[Math.floor(Math.random() * Coin.values.length)]);
    };
    Coin.prototype.handleCollision = function (snake) {
        snake.points += this.value;
        snake.maxLength += 2;
        this.destroy();
    };
    Coin.prototype.destroy = function () {
        index_1.Board.removeObjectAt(this.position);
        delete Coin.instances[this.index];
        --Coin.coinsActive;
    };
    Coin.values = [200, 600, 800, 1000, 2000];
    Coin.instances = {};
    Coin.coinsIndex = 0;
    Coin.coinsActive = 0;
    return Coin;
}());
exports.default = Coin;
//# sourceMappingURL=coin.js.map