import { asyncHandler } from '../../shared/utils/asyncHandler'
import { TaskService } from './task.service'
import {
  BadRequestError,
  ValidationError,
  NotFoundError
} from '../../shared/utils/errors'
import {
  TaskFilters,
  Priority,
  CreateTaskDto,
  UpdateTaskDto,
  IdModel
} from './task.model'

export class TaskController {
  private static checkIdFormat(id: string) {
    // Vérifie si l'id correspond aux attentes d'un ObjectId MongoDB
    if (!IdModel.safeParse(id).success) {
      throw new BadRequestError('Invalid ID format')
    }
  }

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
    const { id } = req.params
    this.checkIdFormat(id)

    const task = await new TaskService().getTask(id)
    // Vérifie si la tâche existe
    if (!task) {
      throw new NotFoundError('Task not found')
    }
    res.status(200).json(task)
  })
  public static createTask = asyncHandler(async (req, res) => {
    const parsed = CreateTaskDto.safeParse(req.body)
    if (!parsed.success) {
      const message = parsed.error.errors
        .map((error) => `${error.path.join('.')}: ${error.message}`)
        .join(', ')
      throw new ValidationError(message)
    }
    req.body = parsed.data

    const task = await new TaskService().createTask(req.body)
    res.status(201).json(task)
  })

  public static updateTask = asyncHandler(async (req, res) => {
    const { id } = req.params
    this.checkIdFormat(id)

    const parsed = UpdateTaskDto.safeParse(req.body)
    if (!parsed.success) {
      const message = parsed.error.errors
        .map((error) => `${error.path.join('.')}: ${error.message}`)
        .join(', ')
      throw new ValidationError(message)
    }
    req.body = parsed.data
    req.body.updatedAt = new Date() // Set the updatedAt field to the current date

    const task = await new TaskService().updateTask(id, req.body)
    res.status(201).json(task)
  })

  public static deleteTask = asyncHandler(async (req, res) => {
    const { id } = req.params
    this.checkIdFormat(id)

    const task = await new TaskService().deleteTask(id)
    res.status(200).json(task)
  })

  public static toggleTaskComplete = asyncHandler(async (req, res) => {
    const { id } = req.params
    this.checkIdFormat(id)
    const task = await new TaskService().toggleTaskComplete(id)
    res.status(200).json(task)
  })
}
