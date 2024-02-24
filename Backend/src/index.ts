import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
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

app.use(cors)

app.use(express.json())

const SERVER_PORT: number = process.env.SERVER_PORT

app.listen(SERVER_PORT, () => {
  console.log(`Listening on port: ${SERVER_PORT}`)
})
