'use strict'
const __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { default: mod }
}
Object.defineProperty(exports, '__esModule', { value: true })
const express_1 = __importDefault(require('express'))
const productControllers_1 = require('../controllers/productControllers')
const router = express_1.default.Router()
router.route('/')
router.route('/laptops').get(productControllers_1.getLaptops).post(productControllers_1.addLaptop)
router.route('/tvs')
router.route('/tablets')
router.route('/smartphones')
exports.default = router
