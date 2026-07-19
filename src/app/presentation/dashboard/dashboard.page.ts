import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon,
  IonBadge,
  IonList,
  IonItem,
  IonNote,
} from '@ionic/angular/standalone';
import { AuthService } from '../auth/auth.service';
import { ExamStateService } from '../services/exam-state.service';
import { addIcons } from 'ionicons';
import {
  bookOutline,
  sparklesOutline,
  trophyOutline,
  chevronForwardOutline,
  checkmarkCircle,
  trashOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonIcon,
    IonBadge,
    IonList,
    IonItem,
    IonNote,
  ],
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage {
  public authService = inject(AuthService);
  public stateService = inject(ExamStateService);
  private router = inject(Router);

  // Computeds
  readonly completedExamsCount = computed(() => this.stateService.examHistory().length);
  
  readonly averageScore = computed(() => {
    const history = this.stateService.examHistory();
    if (history.length === 0) return 0;
    const sum = history.reduce((acc, curr) => acc + curr.percentage, 0);
    return Math.round(sum / history.length);
  });

  constructor() {
    addIcons({
      bookOutline,
      sparklesOutline,
      trophyOutline,
      chevronForwardOutline,
      checkmarkCircle,
      trashOutline,
    });
  }

  onRemoveWord(word: string, event: Event) {
    event.stopPropagation();
    this.stateService.removeFromGlossary(word);
  }

  onLaunchQuickExam() {
    this.router.navigate(['/tabs/exams']);
  }
}
