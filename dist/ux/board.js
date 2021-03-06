"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../types/index");
var width = 600;
var height = 400;
var Board = /** @class */ (function () {
    function Board() {
    }
    Board.placeObject = function (object, position) {
        Board.grid[position.X][position.Y] = object;
        object.position = index_1.Position.copy(position);
    };
    Board.removeObjectAt = function (position) {
        if (position) {
            Board.grid[position.X][position.Y] = null;
        }
    };
    Board.moveObject = function (object, newPosition) {
        Board.removeObjectAt(object.position);
        Board.placeObject(object, newPosition);
    };
    Board.placeAtRandom = function (object) {
        var position = Board.generateRandomPosition();
        Board.moveObject(object, position);
    };
    Board.generateRandomPosition = function () {
        var position;
        while (!position) {
            var x = Math.floor(Math.random() * Board.width);
            var y = Math.floor(Math.random() * Board.height);
            if (!Board.grid[x][y]) {
                position = new index_1.Position(x, y);
                break;
            }
        }
        return position;
    };
    Board.init = function () {
        Board.height = height / Board.blockSize;
        Board.width = width / Board.blockSize;
        Board.grid = new Array(Board.width);
        for (var i = 0, j = Board.width; i !== j; i++) {
            Board.grid[i] = new Array(Board.height);
        }
    };
    Board.getData = function () {
        var data = {};
        for (var cx = 0; cx < Board.width; cx++) {
            for (var cy = 0; cy < Board.height; cy++) {
                var obj = Board.grid[cx][cy];
                if (obj) {
                    obj = obj.toJSON();
                    if (obj.clazz !== 'SnakeSegment') {
                        data[cx + "-" + cy] = obj;
                    }
                }
            }
        }
        return data;
    };
    Board.getRandomPointAndDirection = function () {
        var direction = [index_1.Direction.UP, index_1.Direction.DOWN, index_1.Direction.LEFT, index_1.Direction.RIGHT];
        var dir = Math.floor(Math.random() * direction.length);
        var point;
        switch (dir) {
            case index_1.Direction.UP:
                point = new index_1.Position(Math.floor(Math.random() * Board.width), Board.height);
                break;
            case index_1.Direction.DOWN:
                point = new index_1.Position(Math.floor(Math.random() * Board.width), 0);
                break;
            case index_1.Direction.LEFT:
                point = new index_1.Position(Board.width, Math.floor(Math.random() * Board.height));
                break;
            case index_1.Direction.RIGHT:
                point = new index_1.Position(0, Math.floor(Math.random() * Board.height));
                break;
        }
        return [dir, point];
    };
    Board.bgColor = '#fff';
    Board.gridColor = '#001F5C';
    Board.blockSize = 8;
    Board.height = 0;
    Board.width = 0;
    return Board;
}());
exports.default = Board;
//# sourceMappingURL=board.js.map