import { Model, Document } from 'mongoose'
import { IRepository } from './generic.model'
import { ValidationError } from '../../shared/utils/errors'

export abstract class MongooseRepository<T extends Document>
  implements IRepository<T>
{
  protected constructor(protected readonly model: Model<T>) {}

  public async create(item: Partial<T>): Promise<T> {
    try {
      return await this.model.create(item)
    } catch (error) {
      throw new ValidationError('Invalid item format')
    }
  }

  public async getById(id: string): Promise<T | null> {
    try {
      const result = await this.model.findById(String(id)).exec()
      return result
    } catch (error) {
      throw new ValidationError('Invalid ID format')
    }
  }

  public async getAll(): Promise<T[]> {
    try {
      return await this.model.find().exec()
    } catch (error) {
      throw new ValidationError('Invalid ID format')
    }
  }

  public async update(id: string, item: Partial<T>): Promise<T | null> {
    try {
      const result = await this.model
        .findByIdAndUpdate(id, item, { new: true })
        .exec()
      if (!result) {
        throw new ValidationError('Invalid ID format')
      }
      return result
    } catch (error) {
      throw new ValidationError('Invalid ID format')
    }
  }

  public async delete(id: string): Promise<boolean> {
    try {
      const result = await this.model.findByIdAndDelete(String(id)).exec()
      if (!result) {
        throw new ValidationError('Invalid ID format')
      }
      return true
    } catch (error) {
      throw new ValidationError('Invalid ID format')
    }
  }
}
