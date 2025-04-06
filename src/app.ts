import Express, { Application } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { errorHandlerMiddleware } from './shared/middleware/error.middleware'
import { taskRouter } from './models/tasks/task.routes'
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './swagger.js'

export const app: Application = Express()
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use(Express.json()) // Parse JSON
app.use(cors()) // Enable CORS
app.use(helmet()) // Set security headers

app.use('/tasks', taskRouter) // Task routes

app.use(errorHandlerMiddleware) // Error handling middleware
