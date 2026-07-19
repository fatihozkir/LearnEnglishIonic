import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IGrammarRepository } from '../../core/repositories/grammar.repository';
import { GrammarSection } from '../../core/models/models';
import { grammarDataSource } from '../datasources/grammarDataSource';

@Injectable({
  providedIn: 'root',
})
export class LocalGrammarRepository implements IGrammarRepository {
  getAll(): Observable<GrammarSection[]> {
    return of(grammarDataSource);
  }

  getById(id: number): Observable<GrammarSection | undefined> {
    return this.getAll().pipe(
      map(sections => sections.find(s => s.id === id))
    );
  }
}
