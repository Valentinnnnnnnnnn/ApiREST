import { Model, model, Document } from 'mongoose'
import { taskSchema, Task } from './task.model'
import { MongooseRepository } from '../generic/generic.repository'

export class TaskRepository extends MongooseRepository<Task & Document> {
  constructor() {
    super(model<Task>('Task', taskSchema) as unknown as Model<Task & Document>)
  }

  public async findByStatus(status: boolean): Promise<Task[]> {
    return this.model.find({ completed: status }).exec()
  }

  public async findByPriority(priority: string): Promise<Task[]> {
    return this.model.find({ priority }).exec()
  }
}
