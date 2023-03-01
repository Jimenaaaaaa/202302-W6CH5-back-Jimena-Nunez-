export interface Repo<T> {
  query(): Promise<T[]>;
  queryId(_id: string): Promise<T>;
  search(query: { key: string; value: unknown }): Promise<T[]>;
  create(_dog: Partial<T>): Promise<T>;
  update(_dog: T): Promise<T>;
  erase(_id: string): Promise<void>;
}
