"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var game_1 = require("../game");
var snakeSegment_1 = require("./snakeSegment");
var index_1 = require("../ux/index");
var index_2 = require("../types/index");
var Snake = /** @class */ (function (_super) {
    __extends(Snake, _super);
    function Snake(position) {
        var _this = _super.call(this, position) || this;
        _this.jumpDistance = 8;
        _this.skipNextTurn = false;
        _this.hitDetected = false;
        _this.isAlive = false;
        _this.speed = index_2.Speed.SLOW;
        _this.direction = index_2.Direction.NONE;
        _this.hiScore = 0;
        _this.points = 0;
        _this.lives = 999;
        _this.segments = [];
        _this.maxLength = Snake.defaultLength;
        _this.segments[0] = _this;
        _this.isAlive = true;
        _this.clazz = 'Snake';
        _this.name = 'nealli';
        _this.id = '1234';
        index_1.Board.placeObject(_this, position);
        return _this;
    }
    Snake.prototype.jump = function () {
        var position = index_2.Position.copy(this.position);
        switch (this.direction) {
            case index_2.Direction.UP:
                position.Y -= this.jumpDistance;
                break;
            case index_2.Direction.DOWN:
                position.Y += this.jumpDistance;
                break;
            case index_2.Direction.LEFT:
                position.X -= this.jumpDistance;
                break;
            case index_2.Direction.RIGHT:
                position.X += this.jumpDistance;
                break;
            default:
                console.log('unknown direction ', this.direction);
                break;
        }
        this.updateBoard(position);
    };
    Snake.prototype.onHitScreenEdge = function (edge) {
        // switch (edge) {
        //   case ScreenEdge.NORTH:
        //   case ScreenEdge.SOUTH:
        //   case ScreenEdge.EAST:
        //   case ScreenEdge.WEST:
        // }
    };
    Snake.prototype.die = function () {
        this.hitDetected = true;
        this.hiScore = this.points > this.hiScore ? this.points : this.hiScore;
        game_1.default.hiScore = this.hiScore > game_1.default.hiScore ? this.hiScore : game_1.default.hiScore;
        if (!this.lives) {
            this.isAlive = false;
            game_1.default.reset();
            return;
        }
        --this.lives;
        this.destroy();
        this.position = new index_2.Position(0, 0);
        this.direction = index_2.Direction.NONE;
    };
    Snake.prototype.setSpeed = function (speed) {
        this.speed = speed;
        this.skipNextTurn = (speed === index_2.Speed.SLOW);
    };
    Snake.prototype.processTurn = function () {
        if (!this.isAlive)
            return;
        // Skip every other clock tick unless moving fast
        if (this.speed !== index_2.Speed.FAST && game_1.default.clock.tick === index_2.ClockTick.ODD)
            return;
        // Skip 3 clock tick if moving slow
        if (this.speed === index_2.Speed.SLOW && game_1.default.clock.tick === index_2.ClockTick.EVEN) {
            this.skipNextTurn = !this.skipNextTurn;
            if (this.skipNextTurn)
                return;
        }
        this.hitDetected = false;
        var isMoving = true;
        var pos = index_2.Position.copy(this.position);
        switch (this.direction) {
            case index_2.Direction.UP:
                pos.Y -= 1;
                break;
            case index_2.Direction.DOWN:
                pos.Y += 1;
                break;
            case index_2.Direction.LEFT:
                pos.X -= 1;
                break;
            case index_2.Direction.RIGHT:
                pos.X += 1;
                break;
            default:
                // Direction.NONE
                isMoving = false;
                break;
        }
        if (isMoving) {
            if (pos.X < 0) {
                pos.X = index_1.Board.width - 1;
            }
            else if (pos.Y < 0) {
                pos.Y = index_1.Board.height - 1;
            }
            else if (pos.X === index_1.Board.width) {
                pos.X = 0;
            }
            else if (pos.Y === index_1.Board.height) {
                pos.Y = 0;
            }
            if (index_1.Board.grid[pos.X][pos.Y]) {
                var object = index_1.Board.grid[pos.X][pos.Y];
                object.handleCollision(this);
            }
            if (!this.isAlive) {
                this.destroy();
            }
            else if (!this.hitDetected) {
                this.updateBoard(pos);
            }
        }
    };
    Snake.prototype.updateBoard = function (pos) {
        var lastPosition = index_2.Position.copy(this.position);
        for (var i = 0, s = this.segments.length; i !== s; i++) {
            var segment = this.segments[i];
            var newPosition = (i === 0) ? pos : lastPosition;
            lastPosition = segment.position;
            index_1.Board.moveObject(segment, newPosition);
        }
        if (this.segments.length <= this.maxLength) {
            var newSegment = new snakeSegment_1.default(lastPosition);
            this.segments.push(newSegment);
            index_1.Board.placeObject(newSegment, lastPosition);
        }
    };
    Snake.prototype.destroy = function () {
        for (var i = 0, s = this.segments.length; i !== s; i++) {
            index_1.Board.removeObjectAt(this.segments[i].position);
        }
        this.segments = [this];
        this.maxLength = Snake.defaultLength;
    };
    Snake.prototype.toJSON = function () {
        return {
            id: this.id,
            clazz: this.clazz,
            name: this.name,
            colorIndex: this.colorIndex,
            maxLength: this.maxLength,
            isAlive: this.isAlive,
            speed: this.speed,
            direction: this.direction,
            segments: this.segments.slice(1).map(function (seg) { return seg.toJSON(); })
        };
    };
    Snake.defaultLength = 3;
    return Snake;
}(snakeSegment_1.default));
exports.default = Snake;
//# sourceMappingURL=snake.js.map