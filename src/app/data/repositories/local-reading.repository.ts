import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IReadingRepository } from '../../core/repositories/reading.repository';
import { ReadingSection } from '../../core/models/models';
import { readingDataSource } from '../datasources/readingDataSource';

@Injectable({
  providedIn: 'root',
})
export class LocalReadingRepository implements IReadingRepository {
  getAll(): Observable<ReadingSection[]> {
    return of(readingDataSource);
  }

  getById(id: number): Observable<ReadingSection | undefined> {
    return this.getAll().pipe(
      map(sections => sections.find(s => s.id === id))
    );
  }
}
