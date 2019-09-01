"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameKey;
(function (GameKey) {
    GameKey[GameKey["UP"] = 38] = "UP";
    GameKey[GameKey["DOWN"] = 40] = "DOWN";
    GameKey[GameKey["LEFT"] = 37] = "LEFT";
    GameKey[GameKey["RIGHT"] = 39] = "RIGHT";
    GameKey[GameKey["SPACEBAR"] = 32] = "SPACEBAR";
    GameKey[GameKey["W"] = 87] = "W";
    GameKey[GameKey["S"] = 83] = "S";
    GameKey[GameKey["A"] = 65] = "A";
    GameKey[GameKey["D"] = 68] = "D";
})(GameKey = exports.GameKey || (exports.GameKey = {}));
var ControlKey;
(function (ControlKey) {
    ControlKey[ControlKey["START"] = 0] = "START";
    ControlKey[ControlKey["PAUSE"] = 1] = "PAUSE";
    ControlKey[ControlKey["RESET"] = 2] = "RESET";
})(ControlKey = exports.ControlKey || (exports.ControlKey = {}));
var ScreenEdge;
(function (ScreenEdge) {
    ScreenEdge[ScreenEdge["NORTH"] = 0] = "NORTH";
    ScreenEdge[ScreenEdge["SOUTH"] = 1] = "SOUTH";
    ScreenEdge[ScreenEdge["EAST"] = 2] = "EAST";
    ScreenEdge[ScreenEdge["WEST"] = 3] = "WEST";
})(ScreenEdge = exports.ScreenEdge || (exports.ScreenEdge = {}));
var Direction;
(function (Direction) {
    Direction[Direction["UP"] = 0] = "UP";
    Direction[Direction["DOWN"] = 1] = "DOWN";
    Direction[Direction["LEFT"] = 2] = "LEFT";
    Direction[Direction["RIGHT"] = 3] = "RIGHT";
    Direction[Direction["NONE"] = 4] = "NONE";
})(Direction = exports.Direction || (exports.Direction = {}));
var Speed;
(function (Speed) {
    Speed[Speed["SLOW"] = 0] = "SLOW";
    Speed[Speed["FAST"] = 1] = "FAST";
    Speed[Speed["NORMAL"] = 2] = "NORMAL";
})(Speed = exports.Speed || (exports.Speed = {}));
//# sourceMappingURL=enums.js.map