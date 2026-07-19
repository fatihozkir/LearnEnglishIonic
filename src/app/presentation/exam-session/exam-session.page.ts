import { Component, inject, signal, computed, OnDestroy, OnInit } from '@angular/core';
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
  IonCard,
  IonCardContent,
  IonTextarea,
  IonBadge,
  IonList,
  IonItem,
  IonAccordion,
  IonAccordionGroup,
} from '@ionic/angular/standalone';
import { ExamStateService } from '../services/exam-state.service';
import { QuestionCardComponent } from '../components/question-card/question-card.component';
import { addIcons } from 'ionicons';
import {
  timeOutline,
  checkmarkCircleOutline,
  arrowForwardOutline,
  arrowBackOutline,
  micOutline,
  micOffOutline,
  sparklesOutline,
  headsetOutline,
  bookOutline,
  textOutline,
  createOutline,
  micSharp,
  analyticsOutline,
  trophyOutline,
  refreshOutline,
  closeOutline,
} from 'ionicons/icons';
import { ExamCategory, ExamAnswers } from '../../core/models/models';

@Component({
  selector: 'app-exam-session',
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
    IonCard,
    IonCardContent,
    IonTextarea,
    IonBadge,
    IonList,
    IonItem,
    IonAccordion,
    IonAccordionGroup,
    QuestionCardComponent,
  ],
  templateUrl: './exam-session.page.html',
  styleUrls: ['./exam-session.page.scss'],
})
export class ExamSessionPage implements OnInit, OnDestroy {
  public stateService = inject(ExamStateService);
  private router = inject(Router);

  // States
  activeCategory = signal<ExamCategory>(ExamCategory.LISTENING);
  expandedSections = signal<string[]>([]);

  // Voice record simulator
  isRecording = signal<boolean>(false);
  recordingSeconds = signal<number>(0);
  recordingInterval: any;
  activeRecordingId = signal<string | null>(null);

  // Sound Waveform Bars list (moving height factors)
  waveformBars = signal<number[]>([20, 40, 15, 60, 30, 80, 45, 90, 50, 70, 20, 60, 40, 15]);

  constructor() {
    addIcons({
      timeOutline,
      checkmarkCircleOutline,
      arrowForwardOutline,
      arrowBackOutline,
      micOutline,
      micOffOutline,
      sparklesOutline,
      headsetOutline,
      bookOutline,
      textOutline,
      createOutline,
      micSharp,
      analyticsOutline,
      trophyOutline,
      refreshOutline,
      closeOutline,
    });
  }

  ngOnInit() {
    const config = this.stateService.activeConfig();
    if (!config) {
      // Redirect to configs if no active session
      this.router.navigate(['/tabs/exams']);
      return;
    }
    this.activeCategory.set(config.selectedSections[0] as ExamCategory);
    this.expandedSections.set(this.getSectionIds());
  }

  ngOnDestroy() {
    this.stopVoiceSimulator();
  }

  getSectionIds(): string[] {
    const list = this.stateService.activeQuestions()[this.activeCategory()];
    return list ? list.map(s => s.id.toString()) : [];
  }

  onAccordionChange(event: any) {
    this.expandedSections.set(event.detail.value || []);
  }

  // --- Voice Recorder Simulator Action Helpers ---

  startVoiceSimulator(questionId: string) {
    this.activeRecordingId.set(questionId);
    this.isRecording.set(true);
    this.recordingSeconds.set(0);

    this.recordingInterval = setInterval(() => {
      this.recordingSeconds.update(s => s + 1);

      // Randomize waveform heights for premium live feedback animation
      this.waveformBars.update(bars =>
        bars.map(() => Math.floor(10 + Math.random() * 80))
      );
    }, 1000);
  }

  stopVoiceSimulator() {
    if (this.recordingInterval) {
      clearInterval(this.recordingInterval);
      this.recordingInterval = null;
    }
    this.isRecording.set(false);
  }

  saveVoiceRecord(sectionId: number, questionId: string) {
    this.stopVoiceSimulator();
    
    // Save simulated audio file text representation
    const duration = this.recordingSeconds();
    const mockAudioUrl = `mock_voice_record_${questionId}_${duration}s.wav`;
    
    this.stateService.saveAnswer('speaking', sectionId, questionId, mockAudioUrl);
    this.activeRecordingId.set(null);
  }

  discardVoiceRecord() {
    this.stopVoiceSimulator();
    this.activeRecordingId.set(null);
  }

  // Get active answers
  getUserAnswer(cat: string, sectionId: number, qId: string): string {
    const ansMap = this.stateService.answers()[cat as keyof ExamAnswers] || {};
    const secAns = ansMap[sectionId] || {};
    return (secAns[qId] as string) || '';
  }

  // Save Writing text area changes
  onWritingChange(event: any, sectionId: number, qId: string) {
    const val = event.detail.value || '';
    this.stateService.saveAnswer('writing', sectionId, qId, val);
  }

  // Word counter helper
  getWordCount(text: string): number {
    if (!text.trim()) return 0;
    return text.trim().split(/\s+/).length;
  }

  formatTime(totalSecs: number): string {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  onSelectCategory(cat: any) {
    if (cat) {
      this.activeCategory.set(cat as ExamCategory);
      this.expandedSections.set(this.getSectionIds());
    }
  }

  onSubmit() {
    if (confirm('Are you sure you want to finish and submit your exam?')) {
      this.stateService.submitExam();
    }
  }

  onCloseExam() {
    if (this.stateService.submitted()) {
      this.router.navigate(['/tabs/home']);
    } else {
      if (confirm('Exit exam session? Your current progress is saved, but the timer will pause.')) {
        this.router.navigate(['/tabs/home']);
      }
    }
  }

  onReviewAnswers() {
    // Hide results overlay card and trigger interactive review highlights!
    this.stateService.showResultsScreen.set(false);
  }
}
