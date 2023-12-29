"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.addLaptop = void 0;
const User_1 = __importDefault(require("../models/User"));
const Laptop_1 = require("../models/Laptop");
const addLaptop = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newLaptop = Object.assign({}, req.body);
        if (req.file) {
            newLaptop.images = `${process.env.BASE_URL}/images/${req.file.filename}`;
        }
        else if (req.files && Array.isArray(req.files)) {
            newLaptop.images = req.files.map(file => `${process.env.BASE_URL}/images/${file.filename}`);
        }
        const missingFields = [];
        Laptop_1.requiredFields.forEach(field => {
            if (!newLaptop[field] && typeof newLaptop[field] !== 'object') {
                missingFields.push(field);
            }
            else if (Array.isArray(newLaptop[field]) &&
                newLaptop[field].length === 0) {
                missingFields.push(`${field} is empty`);
            }
            else if (typeof newLaptop[field] === 'object') {
                Object.keys(newLaptop[field]).forEach(key => {
                    if (!newLaptop[field][key]) {
                        missingFields.push(`${key} of ${field}`);
                    }
                });
            }
        });
        if (missingFields.length === 1) {
            return res.status(400).json({
                error: `The field ${missingFields[0]} is required`
            });
        }
        else if (missingFields.length === 2) {
            return res.status(400).json({
                error: `The fields ${missingFields.join(' and ')} are required`
            });
        }
        else if (missingFields.length > 2) {
            return res.status(400).json({
                error: `The fields ${missingFields.join(', ')} are required`
            });
        }
        yield new Laptop_1.Laptop(newLaptop).save();
        res.json({
            msg: 'Latop added successfully'
        });
    }
    catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
});
exports.addLaptop = addLaptop;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        new User_1.default(req.body).save;
    }
    catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
});
