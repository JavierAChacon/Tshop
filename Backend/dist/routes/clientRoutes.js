"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminControllers_1 = require("../controllers/adminControllers");
const router = (0, express_1.Router)();
router.get('/laptops', adminControllers_1.getLaptops);
exports.default = router;
