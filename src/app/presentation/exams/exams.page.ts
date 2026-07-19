import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonList,
  IonItem,
} from '@ionic/angular/standalone';
import { ExamStateService } from '../services/exam-state.service';
import { addIcons } from 'ionicons';
import { AuthService } from '../auth/auth.service';
import {
  playOutline,
  headsetOutline,
  sparklesOutline,
  bookOutline,
  textOutline,
  createOutline,
  micOutline,
  optionsOutline,
  checkmarkCircleOutline,
} from 'ionicons/icons';

interface SectionToggle {
  id: string;
  name: string;
  icon: string;
  selected: boolean;
  colorClass: string;
}

@Component({
  selector: 'app-exams-config',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonIcon,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonList,
    IonItem,
  ],
  templateUrl: './exams.page.html',
  styleUrls: ['./exams.page.scss'],
})
export class ExamsConfigPage {
  private stateService = inject(ExamStateService);
  private router = inject(Router);
  private authService = inject(AuthService);

  // States
  difficulty = signal<'easy' | 'medium' | 'hard'>('medium');

  sections = signal<SectionToggle[]>([
    { id: 'listening', name: 'Listening', icon: 'headset-outline', selected: true, colorClass: 'listening-card' },
    { id: 'grammar', name: 'Grammar', icon: 'sparkles-outline', selected: true, colorClass: 'grammar-card' },
    { id: 'reading', name: 'Reading', icon: 'book-outline', selected: true, colorClass: 'reading-card' },
    { id: 'vocabulary', name: 'Vocabulary', icon: 'text-outline', selected: true, colorClass: 'vocabulary-card' },
    { id: 'writing', name: 'Writing', icon: 'create-outline', selected: false, colorClass: 'writing-card' },
    { id: 'speaking', name: 'Speaking', icon: 'mic-outline', selected: false, colorClass: 'speaking-card' }
  ]);

  constructor() {
    addIcons({
      playOutline,
      headsetOutline,
      sparklesOutline,
      bookOutline,
      textOutline,
      createOutline,
      micOutline,
      optionsOutline,
      checkmarkCircleOutline,
    });
  }

  toggleSection(id: string) {
    this.sections.update(list =>
      list.map(s => (s.id === id ? { ...s, selected: !s.selected } : s))
    );
  }

  onDifficultyChange(event: any) {
    this.difficulty.set(event.detail.value);
  }

  onStartExam() {
    const selectedIds = this.sections()
      .filter(s => s.selected)
      .map(s => s.id);

    if (selectedIds.length === 0) {
      alert('Please select at least one exam section to practice.');
      return;
    }

    // Question counts loader based on difficulty levels
    const difficultyLevel = this.difficulty();
    let readingCount = 15;
    if (difficultyLevel === 'easy') readingCount = 10;
    if (difficultyLevel === 'hard') readingCount = 20;

    // Load defaults configuration
    const counts: Record<string, number> = {
      listening: 10,
      reading: readingCount,
      grammar: 10,
      vocabulary: 10,
      writing: 5,
      speaking: 5
    };

    // Override with user profile customized defaults if set
    const user = this.authService.currentUser();
    if (user && user.questionCountsConfig) {
      const config = user.questionCountsConfig;
      // Keep dynamic Reading difficulty scale unless overridden manually
      Object.keys(config).forEach(key => {
        if (key !== 'reading') {
          counts[key] = config[key as keyof typeof config];
        }
      });
    }

    // Initialize session inside state service
    this.stateService.startNewExamSession({
      difficulty: difficultyLevel,
      selectedSections: selectedIds,
      questionCounts: counts
    });

    // Route to the full-screen exam player workspace!
    this.router.navigate(['/exam-session']);
  }
}
