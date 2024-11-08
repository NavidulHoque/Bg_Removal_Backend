"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NODE_ENV = exports.FRONTEND_URL = exports.PORT = exports.MONGODB_URL = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.MONGODB_URL = process.env.MONGODB_URL;
exports.PORT = Number(process.env.PORT);
exports.FRONTEND_URL = process.env.FRONTEND_URL;
exports.NODE_ENV = process.env.NODE_ENV;
