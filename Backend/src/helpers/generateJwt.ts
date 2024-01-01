import jwt from 'jsonwebtoken'

interface LoginUser {
  email: string
  password: string
}

const generateJWT = (user: LoginUser): string => {
  const { email } = user
  return jwt.sign({ email }, process.env.JWT_SECRET_KEY, {
    expiresIn: '30d'
  })
}

export default generateJWT
