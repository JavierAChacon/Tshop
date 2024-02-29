/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import { multerMiddleware } from '../middlewares/multer'
import {
  addLaptop,
  getLaptops,
  getLaptop,
  updateLaptop,
  deleteLaptop
} from '../controllers/laptopControllers'

const router = express.Router()

router.route('/').post(multerMiddleware, addLaptop).get(getLaptops)

router
  .route('/:id')
  .get(getLaptop)
  .put(multerMiddleware, updateLaptop)
  .delete(deleteLaptop)

export default router
