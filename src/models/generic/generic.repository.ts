import { Model, Document } from 'mongoose'
import { IRepository } from './generic.model'
import { CustomError, ErrorType } from '../errors/error.model'

export abstract class MongooseRepository<T extends Document> implements IRepository<T> {
  protected constructor(protected readonly model: Model<T>) {}

  public async create(item: Partial<T>): Promise<T> {
    try {
        console.log('item', item)
        return await this.model.create(item)
    } catch (error) {
        throw new CustomError('Failed to create item', ErrorType.InternalServerError)
    }
  }

  public async getById(id: number): Promise<T | null> {
    try {
      const result = await this.model.findById(String(id)).exec()
      return result
    } catch (error) {
      throw new CustomError('Invalid ID format', ErrorType.BadRequest)
    }
  }

  public async getAll(): Promise<T[]> {
    try {
      return await this.model.find().exec()
    } catch (error) {
      throw new CustomError('Failed to retrieve items', ErrorType.InternalServerError)
    }
  }

  public async update(id: number, item: Partial<T>): Promise<T | null> {
    try {
      const result = await this.model.findByIdAndUpdate(id, item, { new: true }).exec()
      if (!result) {
        throw new CustomError('Item not found for update', ErrorType.NotFound)
      }
      return result
    } catch (error) {
      throw new CustomError('Invalid update request', ErrorType.BadRequest)
    }
  }

  public async delete(id: number): Promise<boolean> {
    try {
      const result = await this.model.findByIdAndDelete(String(id)).exec()
      if (!result) {
        throw new CustomError('Item not found for deletion', ErrorType.NotFound)
      }
      return true
    } catch (error) {
      throw new CustomError('Invalid delete request', ErrorType.BadRequest)
    }
  }
}
