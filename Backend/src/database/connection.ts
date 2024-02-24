import mongoose from 'mongoose'

const connection = async (): Promise<string> => {
  const DB_URI: string = process.env.DB_URI
  try {
    await mongoose.connect(DB_URI)
    return 'Connected succesfully to DB'
  } catch (error) {
    return 'Failed to connect to DB'
  }
}

export default connection
