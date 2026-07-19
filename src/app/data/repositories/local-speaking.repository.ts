import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SpeakingSection } from '../../core/models/models';
import { SpeakingRepository } from '../../core/repositories/speaking.repository';
import { speakingDataSource } from '../datasources/speakingDataSource';

@Injectable({
  providedIn: 'root',
})
export class LocalSpeakingRepository implements SpeakingRepository {
  getAll(): Observable<SpeakingSection[]> {
    return of(speakingDataSource);
  }

  getById(id: number): Observable<SpeakingSection | undefined> {
    const sec = speakingDataSource.find(s => s.id === id) || undefined;
    return of(sec);
  }
}
