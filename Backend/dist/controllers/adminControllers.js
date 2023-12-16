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
Object.defineProperty(exports, "__esModule", { value: true });
exports.addLaptop = void 0;
const Laptop_1 = require("../models/Laptop");
const addLaptop = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // validate missing fields
        const missingFields = [];
        Laptop_1.requiredFields.forEach(field => {
            if (!req.body[field] && typeof req.body[field] !== 'object') {
                missingFields.push(field);
            }
            else if (typeof req.body[field] === 'object') {
                Object.keys(req.body[field]).forEach(key => {
                    if (!req.body[field][key]) {
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
        yield new Laptop_1.Laptop(req.body).save();
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
