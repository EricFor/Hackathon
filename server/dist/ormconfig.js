"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const Category_1 = __importDefault(require("./entities/Category"));
const Goal_1 = __importDefault(require("./entities/Goal"));
const User_1 = __importDefault(require("./entities/User"));
dotenv_1.default.config();
const config = {
    type: 'sqlite',
    database: `./database/data.sqlite`,
    entities: [User_1.default, Goal_1.default, Category_1.default],
    synchronize: true,
    logging: false,
    // cli: {
    //   entitiesDir: path.join(__dirname, `/entities/`),
    // },
};
exports.default = config;
