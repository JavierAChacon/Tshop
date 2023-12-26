import express, { Request, Response, NextFunction } from 'express'
import multer, { MulterError } from 'multer'
import { addLaptop } from '../controllers/adminControllers'

const router = express.Router()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './images')
  },
  filename: function (req, file, cb) {
    const mimetype = file.mimetype.split('/')[1]
    cb(null, req.body.brand + req.body.model + Date.now() + '.' + mimetype)
  }
})

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) {
      cb(null, true)
    } else {
      cb(new MulterError('LIMIT_UNEXPECTED_FILE'))
    }
  }
}).array('images', 12)

const handleMulterError = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof MulterError) {
    return res.status(400).send(err.message)
  }
  next(err)
}

router.route('/laptops').post(upload, handleMulterError, addLaptop)

router.route('/laptops').post(upload, addLaptop)

router.post('/register')

export default router
