import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IListeningRepository } from '../../core/repositories/listening.repository';
import { ListeningSection } from '../../core/models/models';
import { listeningDataSource } from '../datasources/listeningDataSource';

@Injectable({
  providedIn: 'root',
})
export class LocalListeningRepository implements IListeningRepository {
  getAll(): Observable<ListeningSection[]> {
    return of(listeningDataSource);
  }

  getById(id: number): Observable<ListeningSection | undefined> {
    return this.getAll().pipe(
      map(sections => sections.find(s => s.id === id))
    );
  }
}
