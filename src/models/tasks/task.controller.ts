import { asyncHandler } from '../../shared/utils/asyncHandler'
import { TaskService } from './task.service'
import { BadRequestError } from '../../shared/utils/errors'
import { TaskFilters, Priority } from './task.model'

export class TaskController {
  public static getAllTasks = asyncHandler(async (req, res) => {
    const query = req.query
    const filters: TaskFilters = {} as TaskFilters
    
    // Check if the query parameters are valid
    if (query.status) {
      const statusQuery = query.status.toString().toLowerCase()
      if (statusQuery !== 'true' && statusQuery !== 'false') {
        throw new BadRequestError('Filter "status" is invalid')
      }
      filters.status = statusQuery === 'true'
    }

    if (query.priority) {
      const priorityQuery = query.priority.toString().toLowerCase()
      const allowedPriorities = Object.values(Priority)
      const priorities = priorityQuery.split(',').map((p) => p.trim())
      priorities.forEach((priority) => {
        if (!allowedPriorities.includes(priority as Priority)) {
          throw new BadRequestError('Filter "priority" is invalid')
        }
      })
      filters.priority = priorities as Priority[]
    }

    const tasks = await new TaskService().getAllTasks(filters)
    res.status(200).json(tasks)
  })

  public static getTask = asyncHandler(async (req, res) => {
    const task = await new TaskService().getTask(req.params.id);
    res.status(200).json(task)
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
    const task = await new TaskService().toggleTaskComplete(req.params.id)
    res.status(200).json(task)
  })
}
