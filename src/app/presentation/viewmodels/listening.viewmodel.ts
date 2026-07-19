import { Injectable, inject, signal, computed } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { LocalListeningRepository } from '../../data/repositories/local-listening.repository';
import { ListeningSection } from '../../core/models/models';
import { ExamStateService } from '../services/exam-state.service';
import { first } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ListeningViewModel {
  private repository = inject(LocalListeningRepository);
  private sanitizer = inject(DomSanitizer);
  private stateService = inject(ExamStateService);

  // States
  readonly sections = signal<ListeningSection[]>([]);
  readonly selectedSectionId = signal<number | null>(null);
  readonly isPlaying = signal<boolean>(false);
  readonly showQuestions = signal<boolean>(false);
  readonly safeVideoUrl = signal<SafeResourceUrl | null>(null);

  // Computed
  readonly activeSection = computed(() => {
    const id = this.selectedSectionId();
    return id !== null ? this.sections().find(s => s.id === id) : undefined;
  });

  readonly isPlayed = computed(() => {
    const id = this.selectedSectionId();
    return id !== null ? !!this.stateService.playedSections()[id] : false;
  });

  init() {
    this.repository.getAll().pipe(first()).subscribe(data => {
      this.sections.set(data);
      if (data.length > 0) {
        this.selectedSectionId.set(data[0].id);
        this.syncLocalStates();
      }
    });
  }

  selectSection(sectionId: number) {
    if (this.isPlaying()) {
      this.stopPlayback();
    }
    this.selectedSectionId.set(sectionId);
    this.syncLocalStates();
  }

  startPlayback() {
    const section = this.activeSection();
    if (!section || this.isPlayed() || this.stateService.submitted()) return;

    this.stateService.markSectionPlayed(section.id);
    
    const url = `https://www.youtube.com/embed/${section.videoId}?autoplay=1&rel=0&modestbranding=1`;
    this.safeVideoUrl.set(this.sanitizer.bypassSecurityTrustResourceUrl(url));
    
    this.isPlaying.set(true);
    this.showQuestions.set(false);
  }

  finishListening() {
    this.stopPlayback();
    this.showQuestions.set(true);
  }

  stopPlayback() {
    this.isPlaying.set(false);
    this.safeVideoUrl.set(null);
  }

  private syncLocalStates() {
    const played = this.isPlayed();
    this.showQuestions.set(played);
    this.isPlaying.set(false);
    this.safeVideoUrl.set(null);
  }
}
