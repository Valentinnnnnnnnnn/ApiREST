import { Model, model, Document } from 'mongoose'
import { taskSchema, Task } from './task.model'
import { MongooseRepository } from '../generic/generic.repository'

export class TaskRepository extends MongooseRepository<Task & Document> {
  constructor() {
    super(model<Task>('Task', taskSchema) as unknown as Model<Task & Document>)
  }

  public async findByStatus(status: boolean): Promise<Task[]> {
    // Filtre par status
    return this.model.find({ completed: status }).exec()
  }

  public async findByPriorities(priorities: string[]): Promise<Task[]> {
    // Filtre par priorité
    return this.model.find({ priority: { $in: priorities } }).exec()
  }

  public async findByStatusAndPriorities(
    status: boolean,
    priorities: string[]
  ): 
  // Filtre par status et par priorité
  Promise<Task[]> {
    return this.model
      .find({ completed: status, priority: { $in: priorities } })
      .exec()
  }
}
