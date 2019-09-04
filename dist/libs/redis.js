"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var shortid = require("shortid");
var EXPIRES = 3600 * 2;
exports.default = (function (io, _a) {
    var store = _a.store, opts = __rest(_a, ["store"]);
    var key = opts.key || 'snake:';
    var prefix = opts.prefix || 'user:';
    var api = {
        findUserByToken: function (token) {
            return __awaiter(this, void 0, void 0, function () {
                var sid, user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            sid = "" + key + prefix + token;
                            return [4 /*yield*/, store.get(sid)];
                        case 1:
                            user = _a.sent();
                            return [2 /*return*/, user || null];
                    }
                });
            });
        },
        setUser: function (name) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, token, expires, sid, user;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = generateTokenInfo(), token = _a.token, expires = _a.expires;
                            sid = "" + key + prefix + token;
                            user = { name: name, token: token, expires: expires };
                            return [4 /*yield*/, store.set(sid, JSON.stringify(user), expires)];
                        case 1:
                            _b.sent();
                            return [2 /*return*/, user];
                    }
                });
            });
        },
        deleteUserByToken: function (token) {
            return __awaiter(this, void 0, void 0, function () {
                var sid, res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            sid = "" + key + prefix + token;
                            return [4 /*yield*/, store.destroy(sid)];
                        case 1:
                            res = _a.sent();
                            return [2 /*return*/, !!res];
                    }
                });
            });
        },
    };
    io.redisStore = api;
    return api;
});
function generateTokenInfo() {
    var token = shortid.generate();
    var expires = EXPIRES;
    return { token: token, expires: expires };
}
//# sourceMappingURL=redis.js.map