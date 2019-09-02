"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Position = /** @class */ (function () {
    function Position(x, y) {
        this.X = x;
        this.Y = y;
    }
    Position.copy = function (position) {
        return new Position(position.X, position.Y);
    };
    Position.prototype.toJSON = function () {
        return { X: this.X, Y: this.Y };
    };
    return Position;
}());
exports.Position = Position;
//# sourceMappingURL=position.js.map