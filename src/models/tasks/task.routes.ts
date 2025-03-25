import { Router } from 'express'
import { TaskController } from './task.controller'

export const taskRouter = Router()

taskRouter.get('/', TaskController.getAllTasks)
taskRouter.post('/', TaskController.createTask)