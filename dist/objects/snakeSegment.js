"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SnakeSegment = /** @class */ (function () {
    function SnakeSegment(position) {
        this.colorIndex = -1;
        this.position = position;
    }
    SnakeSegment.prototype.getColor = function () {
        var len = SnakeSegment.colors.length;
        this.colorIndex++;
        return SnakeSegment.colors[this.colorIndex % len];
    };
    SnakeSegment.prototype.handleCollision = function (snake) {
        snake.die();
    };
    SnakeSegment.colors = [
        '#FF0000', '#FF9966',
        '#FFFA66', '#66FF66',
        '#66FFFD', '#6699FF',
        '#7966FF', '#F366FF'
    ];
    return SnakeSegment;
}());
exports.default = SnakeSegment;
//# sourceMappingURL=snakeSegment.js.map