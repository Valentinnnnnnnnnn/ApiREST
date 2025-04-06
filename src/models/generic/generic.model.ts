export interface IRepository<T, ID = string> {
  create(item: T): Promise<T>
  getById(_id: ID): Promise<T | null>
  getAll(): Promise<T[]>
  update(_id: ID, item: Partial<T>): Promise<T | null>
  delete(_id: ID): Promise<boolean>
}
