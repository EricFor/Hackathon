"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const account_router_1 = __importDefault(require("./account/account.router"));
const user_1 = __importDefault(require("./user/user"));
const ApiRouter = (0, express_1.default)();
ApiRouter.use('/account', account_router_1.default);
ApiRouter.use('/user', user_1.default);
// ApiRouter.use((req, res, next) => {
//   // console.log(req);
//   next();
// });
exports.default = ApiRouter;
