import { Injectable, inject, signal, computed } from '@angular/core';
import { LocalGrammarRepository } from '../../data/repositories/local-grammar.repository';
import { GrammarSection } from '../../core/models/models';

@Injectable({
  providedIn: 'root',
})
export class GrammarViewModel {
  private repository = inject(LocalGrammarRepository);

  // States
  readonly sections = signal<GrammarSection[]>([]);
  readonly selectedSectionId = signal<number | null>(null);

  // Computed
  readonly activeSection = computed(() => {
    const id = this.selectedSectionId();
    return id !== null ? this.sections().find(s => s.id === id) : undefined;
  });

  init() {
    this.repository.getAll().subscribe(data => {
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
