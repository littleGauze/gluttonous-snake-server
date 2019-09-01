"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var game_1 = require("../game");
var GUI = /** @class */ (function () {
    function GUI() {
    }
    GUI.init = function () {
        GUI.header = document.querySelector('header');
        GUI.score = document.querySelector('#score');
        GUI.lives = document.querySelector('#lives');
        GUI.build = document.querySelector('#build');
    };
    GUI.draw = function () {
        GUI.lives.innerText = game_1.default.isRunning
            ? "Lives: " + game_1.default.player.lives
            : 'Press Start';
        GUI.score.innerText = game_1.default.isRunning
            ? "Score: " + game_1.default.player.points
            : "Hi Score: " + game_1.default.hiScore;
    };
    return GUI;
}());
exports.default = GUI;
//# sourceMappingURL=gui.js.map