"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = require("../middlewares/multer");
const adminControllers_1 = require("../controllers/adminControllers");
const router = express_1.default.Router();
router.post('/login', adminControllers_1.login);
router.route('/laptops').post(multer_1.multerMiddleware, adminControllers_1.addLaptop).get(adminControllers_1.getLaptops);
router
    .route('/laptops/:id')
    .get(adminControllers_1.getLaptop)
    .put(multer_1.multerMiddleware, adminControllers_1.updateLaptop)
    .delete(adminControllers_1.deleteLaptop);
//TODO: hacer controlador de forgot passsword
exports.default = router;
