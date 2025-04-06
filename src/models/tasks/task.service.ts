import { TaskRepository } from './task.repository'
import { Task, TaskFilters } from './task.model'
import { NotFoundError } from '../../shared/utils/errors'

export class TaskService {
  private taskRepository: TaskRepository

  constructor() {
    this.taskRepository = new TaskRepository()
  }

  public async getAllTasks(filters: TaskFilters) {
    if (filters.status !== undefined && filters.priority) {
      // Filtre par status et par priorité
      return await this.taskRepository.findByStatusAndPriorities(
        filters.status,
        filters.priority
      )
    } else if (filters.status !== undefined) {
      // Filtre uniquement par status
      return await this.taskRepository.findByStatus(filters.status)
    } else if (filters.priority && filters.priority.length > 0) {
      // Filtre uniquement par priorité
      return await this.taskRepository.findByPriorities(filters.priority)
    } else {
      // Aucun filtre appliqué
      return await this.taskRepository.getAll()
    }
  }

  public async getTask(id: string) {
    return this.taskRepository.getById(id)
  }

  public async createTask(task: Task) {
    return this.taskRepository.create(task)
  }

  public async updateTask(id: string, task: Task) {
    return this.taskRepository.update(id, task)
  }

  public async deleteTask(id: string) {
    return this.taskRepository.delete(id)
  }

  public async toggleTaskComplete(id: string) {
    const task = await this.taskRepository.getById(id)
    if (task === null) {
      throw new NotFoundError('Task not found')
    }
    task.completed = !task.completed
    task.updatedAt = new Date() // Set the updatedAt field to the current date
    return this.taskRepository.update(id, task)
  }
}
