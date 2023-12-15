import express from 'express'
import dotenv from 'dotenv'
import productRoutes from './routes/productRoutes'
import connection from './database/connection'

dotenv.config()
connection()
  .then(result => {
    console.log(result)
  })
  .catch(error => {
    console.log(error)
  })
const app = express()
app.use('/api/products', productRoutes)
const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log('Listening on port:', PORT))
