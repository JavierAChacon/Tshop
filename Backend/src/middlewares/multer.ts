import multer, { MulterError } from 'multer'
import type { Request, Response, NextFunction } from 'express'

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    const mimetype = file.mimetype.split('/')[1]
    cb(null, req.body.brand + Date.now() + '.' + mimetype)
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

export const multerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  upload(req, res, (error: unknown) => {
    if (error instanceof MulterError) {
      res.status(400).json(error)
    } else if (error !== undefined) {
      res.status(500).json(error)
    }
    next()
  })
}
