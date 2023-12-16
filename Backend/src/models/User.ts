import mongoose, { Schema, InferSchemaType } from 'mongoose'

const userSchema = new Schema({
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
  role: {
    type: String,
    enum: ['superadmin', 'admin']
  }
})

const User = mongoose.model('User', userSchema, 'users')

export default User
