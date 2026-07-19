import { Injectable, inject, signal, computed } from '@angular/core';
import { LocalReadingRepository } from '../../data/repositories/local-reading.repository';
import { ReadingSection } from '../../core/models/models';
import { ExamStateService } from '../services/exam-state.service';
import { first } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReadingViewModel {
  private repository = inject(LocalReadingRepository);
  private stateService = inject(ExamStateService);

  // States
  readonly sections = signal<ReadingSection[]>([]);
  readonly selectedSectionId = signal<number | null>(null);
  
  // Selection tooltip state
  readonly selectedText = signal<string>('');
  readonly selectedContext = signal<string>('');
  readonly tooltipX = signal<number>(0);
  readonly tooltipY = signal<number>(0);
  readonly showTooltip = signal<boolean>(false);

  // Computed active section
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
    this.clearSelection();
  }

  handleSelectionChange() {
    const selection = window.getSelection();
    if (!selection) return;

    const text = selection.toString().trim();

    // Select short vocabulary phrase (max 4 words)
    if (text && text.length > 1 && text.split(/\s+/).length <= 4) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      const passageEl = document.querySelector('.reading-passage-viewport');
      if (passageEl && passageEl.contains(range.commonAncestorContainer)) {
        this.selectedText.set(text);
        this.tooltipX.set(rect.left + rect.width / 2);
        this.tooltipY.set(rect.top + window.scrollY - 38);
        
        // Cache sentence context at selection time
        const context = this.getSelectionContext(selection);
        this.selectedContext.set(context);

        this.showTooltip.set(true);
      }
    }
  }

  addSelectedToGlossary() {
    const word = this.selectedText();
    if (!word) return;

    const context = this.selectedContext();
    this.stateService.addToGlossary(word, context);
    this.clearSelection();
  }

  clearSelection() {
    this.showTooltip.set(false);
    this.selectedText.set('');
    this.selectedContext.set('');
    try {
      window.getSelection()?.removeAllRanges();
    } catch (e) {}
  }

  private getSelectionContext(selection: Selection): string {
    if (!selection || selection.rangeCount === 0) return '';

    const node = selection.anchorNode;
    if (!node || !node.textContent) return '';

    const text = node.textContent;
    const startOffset = selection.anchorOffset;
    
    let sentenceStart = 0;
    for (let i = startOffset; i >= 0; i--) {
      if (['.', '!', '?'].includes(text[i])) {
        sentenceStart = i + 1;
        break;
      }
    }

    let sentenceEnd = text.length;
    for (let i = startOffset; i < text.length; i++) {
      if (['.', '!', '?'].includes(text[i])) {
        sentenceEnd = i + 1;
        break;
      }
    }

    return text.substring(sentenceStart, sentenceEnd).trim();
  }
}
