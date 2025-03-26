import Express, { Application, ErrorRequestHandler, Request, Response } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { errorHandlerMiddleware } from './models/errors/error.middleware'
import { taskRouter } from './models/tasks/task.routes'
import { AppError } from './models/errors/error.model'

export const app: Application = Express()

app.use(Express.json()) // Parse JSON
app.use(cors()) // Enable CORS
app.use(helmet()) // Set security headers


// Auth
// app.use('/auth', authRouter)
app.use('/tasks', taskRouter) // Task routes

app.use(errorHandlerMiddleware(Request, response, AppError)) // Error handling middleware