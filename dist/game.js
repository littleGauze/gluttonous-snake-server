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
    Game.init = function () {
        Game.ready();
    };
    Game.ready = function () {
        index_3.Board.init();
        var dataCallback = throttle(function (data) {
            Game.syncChannel && Game.syncChannel.emit('turn', { data: data });
        });
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
        Game.ready();
    };
    Game.addPlayer = function (sync, socket) {
        if (!Game.syncChannel) {
            Game.syncChannel = sync;
            Game.init();
            Game.start();
        }
        var player = new index_2.Snake(new index_1.Position(0, 0));
        player.direction = index_1.Direction.RIGHT;
        // if (!Game.players.find((p) => p.name === player.name)) {
        Game.players.push(player);
        // }
    };
    Game.onClockTick = function (callback) {
        return function () {
            Game.players.forEach(function (p) {
                // Controls.processInput(p)
                p.processTurn();
            });
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
    Game.players = [];
    Game.hiScore = 0;
    Game.isRunning = false;
    Game.coinCounter = 0;
    return Game;
}());
exports.default = Game;
// sync very 66ms, 15/second
function throttle(handle) {
    var interval = 2000;
    var lastSyncAt = Date.now();
    return function (data) {
        var now = Date.now();
        if (now - lastSyncAt > interval) {
            handle(data);
            lastSyncAt = now;
        }
    };
}
//# sourceMappingURL=game.js.map