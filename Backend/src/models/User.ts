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
    enum: ['superadmin', 'admin'],
    default: 'admin'
  },
  password: {
    type: String,
    required: true
  },
  token: {
    type: String
  }
})
type User = InferSchemaType<typeof userSchema>
const User = mongoose.model('User', userSchema, 'users')
const requiredFieldsUser: string[] = Object.keys(userSchema.obj).filter(key => {
  return userSchema.path(key).isRequired
})

export { User, requiredFieldsUser }
