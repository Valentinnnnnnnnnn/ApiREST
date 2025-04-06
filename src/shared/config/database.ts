import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()
// TODO : use error models
// Check if MONGODB_URI environment variable is defined
const mongoURI = process.env.MONGODB_URI
if (!mongoURI) {
  throw new Error('MONGODB_URI environment variable not defined')
}

export const connectDatabase = async (): Promise<void> => {
  // Connect to MongoDB database
  try {
    await mongoose.connect(mongoURI)
    console.log('Connected to database')
  } catch (error) {
    console.error('Error connecting to database:', error)
    process.exit(1)
  }
}
