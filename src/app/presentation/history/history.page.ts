import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonButton,
  IonIcon,
  IonBadge,
  IonLabel,
  IonNote,
} from '@ionic/angular/standalone';
import { ExamStateService } from '../services/exam-state.service';
import { addIcons } from 'ionicons';
import {
  timeOutline,
  sparklesOutline,
  trophyOutline,
  chevronForwardOutline,
  calendarOutline,
} from 'ionicons/icons';
import { ExamHistoryItem } from '../../core/models/models';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonButton,
    IonIcon,
    IonBadge,
    IonLabel,
    IonNote,
  ],
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage {
  public stateService = inject(ExamStateService);
  private router = inject(Router);

  constructor() {
    addIcons({
      timeOutline,
      sparklesOutline,
      trophyOutline,
      chevronForwardOutline,
      calendarOutline,
    });
  }

  formatDuration(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  }

  onSelectHistoryItem(item: ExamHistoryItem) {
    this.router.navigate(['/exam-review', item.id]);
  }

  onLaunchExam() {
    this.router.navigate(['/tabs/exams']);
  }
}
