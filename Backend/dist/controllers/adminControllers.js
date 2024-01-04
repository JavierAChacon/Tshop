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
exports.login = exports.updateLaptop = exports.deleteLaptop = exports.getLaptop = exports.getLaptops = exports.addLaptop = void 0;
const Laptop_1 = require("../models/Laptop");
const Admin_1 = require("../models/Admin");
const generateJwt_1 = __importDefault(require("../helpers/generateJwt"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const addLaptop = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newLaptop = Object.assign({}, req.body);
        if (req.file) {
            newLaptop.images = `${process.env.BASE_URL}:${process.env.PORT}/api/images/${req.file.filename}`;
        }
        else if (req.files && Array.isArray(req.files)) {
            newLaptop.images = req.files.map(file => `${process.env.BASE_URL}:${process.env.PORT}/api/images/${file.filename}`);
        }
        const missingFields = [];
        Laptop_1.requiredFieldsLaptop.forEach(field => {
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
const getLaptops = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const laptops = yield Laptop_1.Laptop.find().sort({ createdAt: -1 });
        if (!laptops) {
            res.status(404).json({
                error: 'Laptops not found'
            });
        }
        res.json({
            laptops
        });
    }
    catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});
exports.getLaptops = getLaptops;
const getLaptop = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const laptop = yield Laptop_1.Laptop.findById(req.params.id, { timestamps: false });
        if (!laptop) {
            return res.status(404).json({
                error: 'Laptop not found'
            });
        }
        return res.json({
            laptop
        });
    }
    catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});
exports.getLaptop = getLaptop;
const updateLaptop = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newLaptop = Object.assign({}, req.body);
        if (req.file) {
            newLaptop.images = `${process.env.BASE_URL}:${process.env.PORT}/api/images/${req.file.filename}`;
        }
        else if (req.files && Array.isArray(req.files)) {
            newLaptop.images = req.files.map(file => `${process.env.BASE_URL}:${process.env.PORT}/api/images/${file.filename}`);
        }
        const laptop = yield Laptop_1.Laptop.findByIdAndUpdate(req.params.id, newLaptop);
        return res.json({
            msg: 'Laptop edited successfully',
            laptop
        });
    }
    catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});
exports.updateLaptop = updateLaptop;
const deleteLaptop = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const laptop = yield Laptop_1.Laptop.findByIdAndDelete(req.params.id);
        return res.json({
            msg: 'Laptop deleted successfully',
            laptop
        });
    }
    catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});
exports.deleteLaptop = deleteLaptop;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const admin = yield Admin_1.Admin.findOne({ email });
        if (!admin) {
            res.status(404).json({
                error: 'User not found'
            });
        }
        else if (!(yield bcrypt_1.default.compare(password, admin.password))) {
            res.status(400).json({
                error: 'Incorrect password'
            });
        }
        else {
            res.json({ token: (0, generateJwt_1.default)(req.body) });
        }
    }
    catch (error) {
        res.json({
            error: error.message
        });
    }
});
exports.login = login;
