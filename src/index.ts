import { app } from './config/app'
import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
}).on('error', (err) => {
    throw new Error(err.message)
})