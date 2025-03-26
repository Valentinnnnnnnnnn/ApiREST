import { asyncHandler } from '../../shared/utils/asyncHandler'
import { TaskService } from './task.service'

export class TaskController {
  public static getAllTasks = asyncHandler(async (req, res) => {
    const tasks = await new TaskService().getAllTasks()
    res.status(200).json(tasks)
  })

  public static getTask = asyncHandler(async (req, res) => {
    const tasks = await new TaskService().getTask(req.body)
    res.status(200).json(tasks)
  })

  public static createTask = asyncHandler(async (req, res) => {
    const task = await new TaskService().createTask(req.body)
    res.status(201).json(task)
  })

  public static updateTask = asyncHandler(async (req, res) => {
    const task = await new TaskService().updateTask(req.body)
    res.status(200).json(task)
  })

  public static deleteTask = asyncHandler(async (req, res) => {
    const task = await new TaskService().deleteTask(req.body)
    res.status(200).json(task)
  })

  public static toggleTaskComplete = asyncHandler(async (req, res) => {
    const task = await new TaskService().toggleTaskComplete(req.body)
    res.status(200).json(task)
  })
}
