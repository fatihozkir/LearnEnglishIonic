import { Injectable, inject, signal, computed } from '@angular/core';
import { LocalVocabularyRepository } from '../../data/repositories/local-vocabulary.repository';
import { VocabularySection } from '../../core/models/models';
import { first } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VocabularyViewModel {
  private repository = inject(LocalVocabularyRepository);

  // States
  readonly sections = signal<VocabularySection[]>([]);
  readonly selectedSectionId = signal<number | null>(null);

  // Computed
  readonly activeSection = computed(() => {
    const id = this.selectedSectionId();
    return id !== null ? this.sections().find(s => s.id === id) : undefined;
  });

  init() {
    this.repository.getAll().pipe(first()).subscribe(data => {
      this.sections.set(data);
      if (data.length > 0) {
        this.selectedSectionId.set(data[0].id);
      }
    });
  }

  selectSection(sectionId: number) {
    this.selectedSectionId.set(sectionId);
  }
}
