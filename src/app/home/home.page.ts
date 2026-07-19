import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonButton,
  IonIcon,
  IonBadge,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonMenu,
  IonList,
  IonItem,
  IonNote,
  IonMenuToggle,
  IonFooter,
  IonCard,
  IonCardContent,
  IonInput,
  IonTextarea,
} from '@ionic/angular/standalone';
import { ExamStateService } from '../presentation/services/exam-state.service';
import { AuthService } from '../presentation/auth/auth.service';
import { ExamCategory } from '../core/models/models';
import { ListeningSectionComponent } from '../presentation/components/listening-section/listening-section.component';
import { GrammarSectionComponent } from '../presentation/components/grammar-section/grammar-section.component';
import { ReadingSectionComponent } from '../presentation/components/reading-section/reading-section.component';
import { VocabularySectionComponent } from '../presentation/components/vocabulary-section/vocabulary-section.component';
import { TimerComponent } from '../presentation/components/timer/timer.component';
import { addIcons } from 'ionicons';
import {
  bookOutline,
  checkmarkDoneOutline,
  refreshOutline,
  trashOutline,
  menuOutline,
  trophyOutline,
  informationCircleOutline,
  logOutOutline,
  addOutline,
} from 'ionicons/icons';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonButton,
    IonIcon,
    IonBadge,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonMenu,
    IonList,
    IonItem,
    IonNote,
    IonMenuToggle,
    ListeningSectionComponent,
    GrammarSectionComponent,
    ReadingSectionComponent,
    VocabularySectionComponent,
    TimerComponent,
    IonFooter,
    IonCard,
    IonCardContent,
    IonInput,
    IonTextarea,
  ],
})
export class HomePage {
  public stateService = inject(ExamStateService);
  public authService = inject(AuthService);
  ExamCategory = ExamCategory;

  // Manual Glossary Entry States
  newWordText = '';
  newWordContext = '';

  constructor() {
    addIcons({
      bookOutline,
      checkmarkDoneOutline,
      refreshOutline,
      trashOutline,
      menuOutline,
      trophyOutline,
      informationCircleOutline,
      logOutOutline,
      addOutline,
    });
  }

  // --- Glossary Drawer Controllers ---

  addManualWord() {
    const word = this.newWordText.trim();
    if (!word) {
      this.stateService.showToast('Please enter a word first.', 'warning');
      return;
    }
    this.stateService.addToGlossary(word, this.newWordContext);
    this.newWordText = '';
    this.newWordContext = '';
  }

  removeFromGlossary(word: string, event: Event) {
    event.stopPropagation();
    this.stateService.removeFromGlossary(word);
  }

  // --- Submission calculations ---

  onSubmitClick() {
    this.stateService.submitExam();
  }

  onResetClick() {
    this.stateService.resetExam();
  }

  onTabChange(event: any) {
    const val = event.detail.value as ExamCategory;
    if (Object.values(ExamCategory).includes(val)) {
      this.stateService.selectTab(val);
    }
  }

  onLogoutClick() {
    this.authService.logout();
  }
}
