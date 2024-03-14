import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import connection from './database/connection'
import laptopRoutes from './routes/laptopRoutes'
import stripeRoutes from './routes/stripeRoutes'
import { v2 as cloudinary } from 'cloudinary'

dotenv.config()

const BASE_URL = process.env.BASE_URL
const FRONTEND_URL = process.env.FRONTEND_URL
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
  secure: true
})

connection()
  .then(result => {
    console.log(result)
  })
  .catch(error => {
    console.log(error)
  })

const app = express()

const corsOptions = {
  origin: [BASE_URL, FRONTEND_URL]
}

app.use(cors(corsOptions))

app.use(express.json())

app.use('/api/stripe', stripeRoutes)

app.use('/api/laptops', laptopRoutes)

const SERVER_PORT: number = process.env.SERVER_PORT

app.listen(SERVER_PORT, () => {
  console.log('Listening on port:', SERVER_PORT)
})

export default app
