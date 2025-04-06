import { asyncHandler } from '../../shared/utils/asyncHandler'
import { TaskService } from './task.service'
import { BadRequestError } from '../../shared/utils/errors'
import { TaskFilters, Priority, CreateTaskDto } from './task.model'

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
    const { id } = req.params
    // Vérifie si l'id correspond aux attentes d'un ObjectId MongoDB
    const objectIdRegex = /^[a-fA-F0-9]{24}$/
    if (!objectIdRegex.test(id)) {
      throw new BadRequestError("L'identifiant de la tâche est invalide")
    }
    const task = await new TaskService().getTask(id)
    // Vérifie si la tâche existe
    if (!task) {
      throw new BadRequestError('Tâche introuvable')
    }
    res.status(200).json(task)
  })
  public static createTask = asyncHandler(async (req, res) => {
    const createTaskDto = req.body as CreateTaskDto

    // Check if title is provided and is a string
    if (!createTaskDto.title || typeof createTaskDto.title !== 'string') {
      throw new BadRequestError('"title" is required and must be a string')
    }

    // Check if priority is provided and is a valid enum value
    if (
      createTaskDto.priority &&
      !Object.values(Priority).includes(createTaskDto.priority)
    ) {
      throw new BadRequestError('"Priority" is invalid')
    }

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
