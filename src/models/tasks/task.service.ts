import { TaskRepository } from './task.repository'
import {  } from '../generic/generic.repository'

export class TaskService {
    private taskRepository: TaskRepository
  
    constructor() {
        this.taskRepository = new TaskRepository()
    }

    public async getAllTasks() {
        return this.taskRepository.getAll()
    }

    public async createTask(task: any) {
        console.log('task', task)
        return this.taskRepository.create(task)
    }

}