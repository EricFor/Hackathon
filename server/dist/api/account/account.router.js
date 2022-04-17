"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../../entities/User"));
const authenticate_1 = require("../../middlewares/authenticate");
const AccountRouter = (0, express_1.default)();
AccountRouter.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    const existingUser = await User_1.default.findOne({
        where: {
            username,
        },
    });
    if (existingUser)
        return res.status(400).send({ error: 'Existing user already exists with this username. ' });
    const newUser = User_1.default.create({
        username,
        password,
    });
    await newUser.save();
    res.status(200).send({ message: 'Successfully created user. ' });
});
AccountRouter.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User_1.default.findOne({
        where: {
            username,
        },
    });
    if (!user || user.password !== password)
        return res.status(404).send({ error: 'Invalid user. ' });
    const existingToken = authenticate_1.tokens.getTokenByID(user.id);
    if (existingToken) {
        res.cookie('session', existingToken);
        res.end();
        return;
    }
    const token = Math.random().toString(36).substring(2);
    authenticate_1.tokens.add(token, user.id);
    res.cookie('session', token);
    res.end();
});
exports.default = AccountRouter;
