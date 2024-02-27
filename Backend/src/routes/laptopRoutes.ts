/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import { multerMiddleware } from '../middlewares/multer'
import {
  addLaptop,
  getLaptops
} from '../controllers/laptopControllers'

const router = express.Router()

router.route('/').post(multerMiddleware, addLaptop).get(getLaptops)

export default router
