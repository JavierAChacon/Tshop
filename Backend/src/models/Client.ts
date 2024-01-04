import mongoose, { Schema, InferSchemaType } from 'mongoose'

const clientSchema = new Schema({
  email: {
    type: String,
    trim: true,
    required: true
  },
  name: {
    type: String,
    trim: true,
    required: true
  },
  surname: {
    type: String,
    trim: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  token: {
    type: String
  }
})
type client = InferSchemaType<typeof clientSchema>

const Client = mongoose.model('Client', clientSchema, 'clients')

export { Client }
