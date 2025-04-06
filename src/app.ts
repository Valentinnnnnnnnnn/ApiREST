import Express, { Application } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { errorHandlerMiddleware } from './shared/middleware/error.middleware'
import { taskRouter } from './models/tasks/task.routes'

export const app: Application = Express()

app.use(Express.json()) // Parse JSON
app.use(cors()) // Enable CORS
app.use(helmet()) // Set security headers

app.use('/tasks', taskRouter) // Task routes

app.use(errorHandlerMiddleware) // Error handling middleware