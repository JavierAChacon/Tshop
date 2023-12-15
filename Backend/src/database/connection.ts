import mongoose from 'mongoose'

const connection = async (): Promise<string> => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/tshop')
    return 'Connected succesfully to DB'
  } catch (error: any) {
    return error.message
  }
}

export default connection
