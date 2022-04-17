"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokens = void 0;
class TokenStore {
    store; // Map<token, uid>; i know, very insecure
    constructor() {
        this.store = new Map();
    }
    add(token, uid) {
        if (this.store.has(token))
            throw new Error(`Token already exists. `);
        this.store.set(token, uid);
    }
    hasToken(token) {
        return this.store.has(token);
    }
    getTokenByID(id) {
        for (const [k, v] of this.store.entries()) {
            if (v === id)
                return k;
        }
    }
    getIDByToken(token) {
        return this.store.get(token);
    }
    remove(token) {
        this.store.delete(token);
    }
}
exports.tokens = new TokenStore();
const authenticate = (req, res, next) => {
    const token = req.cookies.session;
    const id = exports.tokens.getIDByToken(token);
    if (!exports.tokens.hasToken(token) || !id)
        return res.status(401).send({ error: 'Invalid token' });
    req.userId = id;
    req.authToken = token;
    next();
};
exports.default = authenticate;
