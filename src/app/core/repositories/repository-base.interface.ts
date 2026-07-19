import { Observable } from 'rxjs';

export interface IRepositoryBase<T> {
  getAll(): Observable<T[]>;
  getById(id: number): Observable<T | undefined>;
}
