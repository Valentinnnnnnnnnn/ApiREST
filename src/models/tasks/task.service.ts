import { TaskRepository } from './task.repository'
import { Task } from './task.model'
import { ValidationError } from '../../shared/utils/errors'

export class TaskService {
  private taskRepository: TaskRepository

  constructor() {
    this.taskRepository = new TaskRepository()
  }

  public async getAllTasks() {
    return this.taskRepository.getAll()
  }

  public async getTask(id: number) {
    return this.taskRepository.getById(id)
  }

  public async createTask(task: Task) {
    console.log('task', task)
    return this.taskRepository.create(task)
  }

  public async updateTask(task: Task) {
    if (!task.id || typeof task.id !== 'number') {
      throw new ValidationError('Invalid ID format')
    }
    return this.taskRepository.update(task.id, task)
  }

  public async deleteTask(id: number) {
    return this.taskRepository.delete(id)
  }

  public async toggleTaskComplete(id: number) {
    const task = await this.taskRepository.getById(id)
    if (!task) {
      throw new Error('Task not found')
    }
    task.completed = !task.completed
    return this.taskRepository.update(id, task)
  }
}