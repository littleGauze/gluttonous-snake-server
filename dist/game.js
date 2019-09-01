"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./types/index");
var index_2 = require("./objects/index");
var index_3 = require("./ux/index");
var GameDifficulty;
(function (GameDifficulty) {
    GameDifficulty[GameDifficulty["EASY"] = 300] = "EASY";
    GameDifficulty[GameDifficulty["MEDIUM"] = 150] = "MEDIUM";
    GameDifficulty[GameDifficulty["DIFFICULT"] = 50] = "DIFFICULT";
})(GameDifficulty || (GameDifficulty = {}));
var Game = /** @class */ (function () {
    function Game() {
    }
    Game.init = function (dataCallback) {
        Game.dataCallback = dataCallback;
        Game.ready(Game.dataCallback);
    };
    Game.ready = function (dataCallback) {
        index_3.Board.init();
        Game.player = new index_2.Snake({ X: 0, Y: 0 });
        Game.player.direction = index_1.Direction.RIGHT;
        Game.clock = new index_1.Timer(GameDifficulty.DIFFICULT, 0, Game.onClockTick(dataCallback));
    };
    Game.start = function () {
        if (Game.isRunning)
            return;
        if (Game.clock.isPaused) {
            Game.pause();
            return;
        }
        Game.isRunning = true;
        Game.clock.start();
    };
    Game.pause = function () {
        if (Game.clock.isPaused) {
            Game.isRunning = true;
            Game.clock.resume();
            return;
        }
        Game.clock.pause();
        Game.isRunning = false;
    };
    Game.reset = function () {
        Game.clock && Game.clock.stop(); // eslint-disable-line
        Game.isRunning = false;
        Game.ready(Game.dataCallback);
    };
    Game.onClockTick = function (callback) {
        return function () {
            index_3.Controls.processInput();
            Game.player.processTurn();
            if (Game.clock.tick === index_1.ClockTick.EVEN) {
                ++Game.coinCounter;
                if (Game.coinCounter >= 2) {
                    Game.coinCounter = 0;
                    if (!Math.floor(Math.random() + 0.5)) {
                        var probability = (index_2.Coin.coinsActive + 0.5) / 5;
                        if (!Math.floor(Math.random() + probability)) {
                            if (!Math.floor(Math.random() + 0.5)) {
                                var coin = index_2.Coin.createRandom();
                                index_3.Board.placeAtRandom(coin);
                            }
                            else if (!Math.floor(Math.random() + 0.6)) {
                                var speedUpCoin = new index_2.SpeedCoin(index_1.Speed.FAST);
                                index_3.Board.placeAtRandom(speedUpCoin);
                            }
                            else {
                                var speedDownCoin = new index_2.SpeedCoin(index_1.Speed.SLOW);
                                index_3.Board.placeAtRandom(speedDownCoin);
                            }
                        }
                    }
                }
            }
            callback(index_3.Board.getData());
        };
    };
    Game.hiScore = 0;
    Game.isRunning = false;
    Game.coinCounter = 0;
    return Game;
}());
exports.default = Game;
//# sourceMappingURL=game.js.map