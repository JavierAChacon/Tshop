import express from 'express'
import { multerMiddleware } from '../middlewares/multer'
import auth from '../middlewares/auth'
import {
  addLaptop,
  getLaptops,
  getLaptop,
  deleteLaptop,
  updateLaptop,
  login
} from '../controllers/adminControllers'

const router = express.Router()

router.post('/login', login)

router.route('/laptops').post(multerMiddleware, addLaptop).get(getLaptops)

router
  .route('/laptops/:id')
  .get(getLaptop)
  .put(multerMiddleware, updateLaptop)
  .delete(deleteLaptop)

//TODO: hacer controlador de forgot passsword

export default router
