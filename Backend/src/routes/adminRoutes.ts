import express from 'express'
import multer from 'multer'
import { addLaptop } from '../controllers/adminControllers'

const router = express.Router()
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './images')
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname)
  }
})

const uploads = multer({ storage })

router.route('/laptops').post(uploads.array('images[]', 12), addLaptop)

router.post('/register')

export default router
