import {Request, Response} from 'express'

const register = (req: Request, res: Response) => {
  const requiredFields = ['email', 'name', 'surname', 'password ']

}

export { register }