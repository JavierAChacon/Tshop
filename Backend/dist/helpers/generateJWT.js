"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateJWT = (user) => {
    const { email } = user;
    return jsonwebtoken_1.default.sign({ email }, process.env.JWT_SECRET_KEY, {
        expiresIn: '30d'
    });
};
exports.default = generateJWT;
