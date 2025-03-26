export interface IRepository<T, ID = number> {
  create(item: T): Promise<T>
  getById(id: ID): Promise<T | null>
  getAll(): Promise<T[]>
  update(id: ID, item: Partial<T>): Promise<T | null>
  delete(id: ID): Promise<boolean>
}
