import { Router } from 'express'
import { TaskController } from './task.controller'

export const taskRouter = Router()

taskRouter.get('/', TaskController.getAllTasks)
taskRouter.post('/', TaskController.createTask)
taskRouter.get('/:id', TaskController.getTask)
taskRouter.put('/:id', TaskController.updateTask)
taskRouter.delete('/:id', TaskController.deleteTask)
taskRouter.put('/:id/toggle', TaskController.toggleTaskComplete)
