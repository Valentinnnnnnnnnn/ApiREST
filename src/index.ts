import { app } from './app'
import dotenv from 'dotenv'
import { connectDatabase } from './shared/config/database'

dotenv.config()

const PORT = process.env.PORT || 3000

// Try to connect to the database
try {
    connectDatabase()
} catch (error) {
    console.error("Error connecting to database:", error)
    process.exit(1)
}

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
}).on('error', (err) => {
    throw new Error(err.message)
})