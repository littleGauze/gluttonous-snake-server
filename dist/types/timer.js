"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ClockType;
(function (ClockType) {
    ClockType[ClockType["TIMED"] = 0] = "TIMED";
    ClockType[ClockType["INFINITE"] = 1] = "INFINITE";
})(ClockType = exports.ClockType || (exports.ClockType = {}));
var ClockTick;
(function (ClockTick) {
    ClockTick[ClockTick["EVEN"] = 0] = "EVEN";
    ClockTick[ClockTick["ODD"] = 1] = "ODD";
})(ClockTick = exports.ClockTick || (exports.ClockTick = {}));
var Timer = /** @class */ (function () {
    function Timer(interval, duration, handler) {
        var _this = this;
        this.tick = ClockTick.EVEN;
        this.handler = function () { console.log('No clock event'); };
        this.onElapsed = function () {
            if (_this.isPaused)
                return;
            _this.tick = (_this.tick === ClockTick.EVEN) ? ClockTick.ODD : ClockTick.EVEN;
            _this.handler();
            if (_this.type === ClockType.TIMED) {
                _this.stop();
            }
        };
        this.interval = interval;
        this.handler = handler;
        this.type = (duration === 0) ? ClockType.INFINITE : ClockType.TIMED;
    }
    Timer.prototype.start = function () {
        this.isRunning = true;
        this.handle = (this.type === ClockType.INFINITE)
            ? setInterval(this.onElapsed.bind(this), this.interval)
            : setTimeout(this.onElapsed.bind(this), this.interval);
    };
    Timer.prototype.stop = function () {
        this.isRunning = false;
        return this.type === ClockType.INFINITE
            ? clearInterval(this.handle)
            : clearTimeout(this.handle);
    };
    Timer.prototype.pause = function () { this.isPaused = true; };
    Timer.prototype.resume = function () { this.isPaused = false; };
    return Timer;
}());
exports.Timer = Timer;
//# sourceMappingURL=timer.js.map