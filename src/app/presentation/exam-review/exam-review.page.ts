import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
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
  IonCard,
  IonCardContent,
  IonBadge,
  IonList,
  IonItem,
  IonAccordion,
  IonAccordionGroup,
} from '@ionic/angular/standalone';
import { ExamStateService } from '../services/exam-state.service';
import { addIcons } from 'ionicons';
import {
  arrowBackOutline,
  checkmarkCircleOutline,
  closeCircleOutline,
  timeOutline,
  bookOutline,
  globeOutline,
} from 'ionicons/icons';
import { ExamHistoryItem, ExamCategory, Question } from '../../core/models/models';

@Component({
  selector: 'app-exam-review',
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonIcon,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonCard,
    IonCardContent,
    IonBadge,
    IonList,
    IonItem,
    IonAccordion,
    IonAccordionGroup,
  ],
  templateUrl: './exam-review.page.html',
  styleUrls: ['./exam-review.page.scss'],
})
export class ExamReviewPage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  public stateService = inject(ExamStateService);

  // States
  historyItem = signal<ExamHistoryItem | null>(null);
  activeCategory = signal<ExamCategory>(ExamCategory.LISTENING);
  expandedSections = signal<string[]>([]);

  constructor() {
    addIcons({
      arrowBackOutline,
      checkmarkCircleOutline,
      closeCircleOutline,
      timeOutline,
      bookOutline,
      globeOutline,
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const match = this.stateService.examHistory().find(h => h.id === id);
      if (match) {
        this.historyItem.set(match);
        this.activeCategory.set(match.sections[0] as ExamCategory);
        this.expandedSections.set(this.getSectionIds());
        return;
      }
    }
    
    // Redirect if no match
    this.router.navigate(['/tabs/history']);
  }

  onSelectCategory(cat: any) {
    if (cat) {
      this.activeCategory.set(cat as ExamCategory);
      this.expandedSections.set(this.getSectionIds());
    }
  }

  onGoBack() {
    this.router.navigate(['/tabs/history']);
  }

  getSectionIds(): string[] {
    const list = this.historyItem()?.questions?.[this.activeCategory()];
    return list ? list.map((s: any) => s.id.toString()) : [];
  }

  onAccordionChange(event: any) {
    this.expandedSections.set(event.detail.value || []);
  }

  formatDuration(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  }

  // --- Answers Check Helpers ---

  getAnswer(category: string, sectionId: number, qId: string): any {
    const item = this.historyItem();
    if (!item) return undefined;
    const catAns = item.answers[category as keyof typeof item.answers] || {};
    const secAns = catAns[sectionId] || {};
    return secAns[qId];
  }

  isAnswerCorrect(category: string, sectionId: number, question: Question): boolean {
    const userAns = this.getAnswer(category, sectionId, question.id);
    if (userAns === undefined) return false;

    if (category === 'writing' || category === 'speaking') {
      return String(userAns).trim().length > 5;
    }

    const correct = question.answer;
    if (Array.isArray(correct)) {
      if (!Array.isArray(userAns)) return false;
      return correct.length === userAns.length && correct.every(v => userAns.includes(v));
    }

    return String(userAns).trim().toLowerCase() === String(correct).trim().toLowerCase();
  }

  isOptionSelected(category: string, sectionId: number, qId: string, option: any): boolean {
    const ans = this.getAnswer(category, sectionId, qId);
    if (ans === undefined) return false;
    if (Array.isArray(ans)) {
      return ans.includes(String(option));
    }
    return String(ans) === String(option);
  }

  isOptionCorrect(question: Question, option: any): boolean {
    const correct = question.answer;
    if (Array.isArray(correct)) {
      return correct.includes(String(option));
    }
    return String(correct) === String(option);
  }
}
