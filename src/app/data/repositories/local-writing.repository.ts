import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { WritingSection } from '../../core/models/models';
import { WritingRepository } from '../../core/repositories/writing.repository';
import { writingDataSource } from '../datasources/writingDataSource';

@Injectable({
  providedIn: 'root',
})
export class LocalWritingRepository implements WritingRepository {
  getAll(): Observable<WritingSection[]> {
    return of(writingDataSource);
  }

  getById(id: number): Observable<WritingSection | undefined> {
    const sec = writingDataSource.find(s => s.id === id) || undefined;
    return of(sec);
  }
}
