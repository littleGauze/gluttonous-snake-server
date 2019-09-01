"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var game_1 = require("../game");
var Console = /** @class */ (function () {
    function Console() {
    }
    Console.init = function () {
        Console.buttons.start = document.querySelector('#start');
        Console.buttons.pause = document.querySelector('#pause');
        Console.buttons.reset = document.querySelector('#reset');
        Console.buttons.start.onclick = function () { return game_1.default.start(); };
        Console.buttons.pause.onclick = function () { return game_1.default.pause(); };
        Console.buttons.reset.onclick = function () { return game_1.default.reset(); };
    };
    Console.buttons = {
        start: null,
        pause: null,
        reset: null
    };
    return Console;
}());
exports.default = Console;
//# sourceMappingURL=console.js.map