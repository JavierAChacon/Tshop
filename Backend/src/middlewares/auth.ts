import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    jwt.verify(token as string, process.env.JWT_SECRET_KEY)
  } catch (error: any) {
    return res.status(500).json({
      error: 'Unauthorized access'
    })
  }
  next()
}

export default auth
