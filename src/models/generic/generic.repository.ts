import { Model, Document } from 'mongoose'
import { IRepository } from './generic.model'
import {
  NotFoundError,
} from '../../shared/utils/errors'

export abstract class MongooseRepository<T extends Document>
  implements IRepository<T>
{
  protected constructor(protected readonly model: Model<T>) {}

  public async create(item: Partial<T>): Promise<T> {
      return await this.model.create(item)
  }

  public async getById(id: string): Promise<T | null> {
      const result = await this.model.findById(String(id)).exec()
      return result
  }

  public async getAll(): Promise<T[]> {
    return await this.model.find().exec()
  }

  public async update(id: string, item: Partial<T>): Promise<T | null> {
      const result = await this.model
        .findByIdAndUpdate(id, item, { new: true })
        .exec()
      if (result === null) {
        throw new NotFoundError('Item not found')
      }
      return result
  }

  public async delete(id: string): Promise<boolean> {
      const result = await this.model.findByIdAndDelete(String(id)).exec()
      if (!result) {
        throw new NotFoundError('Item not found')
      }
      return true
  }
}
