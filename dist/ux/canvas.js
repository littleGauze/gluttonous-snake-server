"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Canvas = /** @class */ (function () {
    function Canvas() {
    }
    Canvas.init = function (el) {
        el.height = Canvas.height;
        el.width = Canvas.width;
        Canvas.context = el.getContext('2d');
    };
    Canvas.fill = function (color) {
        Canvas.context.beginPath();
        Canvas.context.rect(0, 0, Canvas.width, Canvas.height);
        Canvas.context.fillStyle = color;
        Canvas.context.fill();
    };
    Canvas.fillRect = function (x, y, w, h, color) {
        Canvas.context.beginPath();
        Canvas.context.fillStyle = color;
        Canvas.context.fillRect(x, y, w, h);
    };
    Canvas.drawRect = function (x, y, w, h, color) {
        Canvas.context.beginPath();
        Canvas.context.lineWidth = 1;
        Canvas.context.strokeStyle = color;
        Canvas.context.rect(x, y, w, h);
        Canvas.context.stroke();
    };
    Canvas.width = 600;
    Canvas.height = 400;
    return Canvas;
}());
exports.default = Canvas;
//# sourceMappingURL=canvas.js.map