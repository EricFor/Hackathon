"use strict";
exports.__esModule = true;
exports.tokens = void 0;
var TokenStore = /** @class */ (function () {
    function TokenStore() {
        this.store = new Map();
    }
    TokenStore.prototype.add = function (token, uid) {
        if (this.store.has(token))
            throw new Error("Token already exists. ");
        this.store.set(token, uid);
    };
    TokenStore.prototype.hasToken = function (token) {
        return this.store.has(token);
    };
    TokenStore.prototype.getTokenByID = function (id) {
        for (var _i = 0, _a = this.store.entries(); _i < _a.length; _i++) {
            var _b = _a[_i], k = _b[0], v = _b[1];
            if (v === id)
                return k;
        }
    };
    TokenStore.prototype.getIDByToken = function (token) {
        return this.store.get(token);
    };
    TokenStore.prototype.remove = function (token) {
        this.store["delete"](token);
    };
    return TokenStore;
}());
exports.tokens = new TokenStore();
var authenticate = function (req, res, next) {
    var token = req.cookies.session;
    var id = exports.tokens.getIDByToken(token);
    if (!exports.tokens.hasToken(token) || !id)
        return res.status(401).send({ error: 'Invalid token' });
    req.userId = id;
    req.authToken = token;
    next();
};
exports["default"] = authenticate;
