import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import adminRoutes from './routes/adminRoutes'
import clientRoutes from './routes/clientRoutes'
import connection from './database/connection'
import { Client } from './models/Client'
dotenv.config()
connection()
  .then(result => {
    console.log(result)
  })
  .catch(error => {
    console.log(error)
  })
const app = express()
const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200
}
app.use('/api/images', express.static('images'))
app.use(cors(corsOptions))
app.use(express.json())
app.use('/api/admin', adminRoutes)
app.use('/api/client', clientRoutes)
const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log('Listening on port:', PORT)
})
