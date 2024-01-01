"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth = (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
    }
    catch (error) {
        return res.status(500).json({
            error: 'Unauthorized access'
        });
    }
    next();
};
exports.default = auth;
