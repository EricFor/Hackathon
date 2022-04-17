"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connect_1 = __importDefault(require("./connect"));
const express_1 = __importDefault(require("express"));
const api_1 = __importDefault(require("./api/api"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
// config({
//   path: `C:\\Users\\henry\\Desktop\\GitHub\\Hackathon\\server\\.env`
// }); 
// console.log(__dirname + "/../.env");
const PORT = 8000;
(async () => {
    const a = await (0, connect_1.default)();
    await a.synchronize();
    const app = (0, express_1.default)();
    // middlewares
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(express_1.default.json());
    app.use((0, cookie_parser_1.default)());
    app.use((0, cors_1.default)({
        origin: 'http://localhost:3000',
        credentials: true,
    }));
    app.use('/api', api_1.default);
    app.listen(PORT, () => {
        console.log(`listening on port, ${PORT}`);
    });
})();
