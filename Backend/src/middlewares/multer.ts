import multer, { MulterError } from 'multer'
import { Request, Response, NextFunction } from 'express'

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
      cb(
        new MulterError(
          'LIMIT_UNEXPECTED_FILE',
          'Only JPEG, JPG, or PNG files are allowed.'
        )
      )
    }
  }
}).array('images', 12)

const multerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  upload(req, res, (error: any) => {
    if (error instanceof MulterError) {
      res.status(400).json({ error: error.field })
    } else if (error) {
      res
        .status(500)
        .json({ error: 'An unknown error occurred when uploading.' })
    } else {
      next()
    }
  })
}

export { multerMiddleware }
