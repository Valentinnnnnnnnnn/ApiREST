import Express, {Application, Request, Response} from 'express'
import cors from 'cors'
import helmet from 'helmet'
import {errorMiddleware} from './models/errors/error.middleware'
import {taskRouter} from './models/tasks/task.routes'

export const app: Application = Express()

app.use(Express.json()) // Parse JSON
app.use(cors()) // Enable CORS
app.use(helmet()) // Set security headers

app.get('/', (req: Request, res: Response) => {
    res.status(200).json("Hello World!")
})

app.use('/tasks', taskRouter) // Task routes

app.use(errorMiddleware) // Error handling middleware