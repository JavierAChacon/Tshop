"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requiredFieldsLaptop = exports.Laptop = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const laptopSchema = new mongoose_1.Schema({
    stock: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    brand: {
        type: String,
        required: true,
        trim: true
    },
    OS: {
        type: String,
        required: true,
        trim: true
    },
    model: {
        type: String,
        required: true,
        trim: true
    },
    ram: {
        type: Number,
        required: true
    },
    processor: {
        brand: {
            type: String,
            required: true,
            trim: true
        },
        model: {
            type: String,
            required: true,
            trim: true
        }
    },
    screen: {
        size: {
            type: Number,
            required: true
        },
        resolution: {
            type: String,
            required: true,
            trim: true
        },
        touchScreen: {
            type: Boolean,
            default: false
        }
    },
    storage: {
        capacity: {
            type: String,
            required: true,
            trim: true
        },
        storageType: [
            {
                type: String,
                enum: ['HDD', 'SSD'],
                required: true
            }
        ]
    },
    graphicCard: {
        brand: {
            type: String,
            trim: true
        },
        model: {
            type: String,
            trim: true
        }
    },
    images: [{
            type: String,
            required: true
        }]
}, { timestamps: true });
const requiredFieldsLaptop = Object.keys(laptopSchema.obj);
exports.requiredFieldsLaptop = requiredFieldsLaptop;
const Laptop = mongoose_1.default.model('Laptop', laptopSchema, 'laptops');
exports.Laptop = Laptop;
