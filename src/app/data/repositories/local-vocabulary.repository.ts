import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IVocabularyRepository } from '../../core/repositories/vocabulary.repository';
import { VocabularySection } from '../../core/models/models';
import { vocabularyDataSource } from '../datasources/vocabularyDataSource';

@Injectable({
  providedIn: 'root',
})
export class LocalVocabularyRepository implements IVocabularyRepository {
  getAll(): Observable<VocabularySection[]> {
    return of(vocabularyDataSource);
  }

  getById(id: number): Observable<VocabularySection | undefined> {
    return this.getAll().pipe(
      map(sections => sections.find(s => s.id === id))
    );
  }
}
