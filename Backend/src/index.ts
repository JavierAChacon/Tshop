import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import connection from './database/connection'
import laptopRoutes from './routes/laptopRoutes'

dotenv.config()

connection()
  .then(result => {
    console.log(result)
  })
  .catch(error => {
    console.log(error)
  })

const app = express()

const BASE_URL = process.env.BASE_URL
const FRONTEND_URL = process.env.FRONTEND_URL

const corsOptions = {
  origin: [`${BASE_URL}/api/laptops`, FRONTEND_URL]
}

app.use(cors(corsOptions))

app.use(express.json())

app.use('/api/images', express.static('images'))

app.use('/api/laptops', laptopRoutes)

const SERVER_PORT: number = process.env.SERVER_PORT

app.listen(SERVER_PORT, () => {
  console.log('Listening on port:', SERVER_PORT)
})
