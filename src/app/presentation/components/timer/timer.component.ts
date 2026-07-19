import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonText, IonIcon } from '@ionic/angular/standalone';
import { ExamStateService } from '../../services/exam-state.service';
import { addIcons } from 'ionicons';
import { timeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [CommonModule, IonText, IonIcon],
  template: `
    <div class="timer-badge" [class.warning-pulse]="isWarningState()">
      <ion-icon name="time-outline"></ion-icon>
      <ion-text>
        <span>{{ stateService.formattedTime() }}</span>
      </ion-text>
    </div>
  `,
  styles: [`
    .timer-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      border-radius: 20px;
      background: var(--ion-color-step-100, #f1f5f9);
      border: 1px solid var(--ion-color-step-300, #cbd5e1);
      font-size: 0.95rem;
      font-weight: 700;
      font-feature-settings: "tnum"; /* Tabular numbers to prevent jitter */
      color: var(--ion-color-step-900, #1e293b);
      transition: all 0.3s ease;
    }

    ion-icon {
      font-size: 1.1rem;
      color: var(--ion-color-step-600, #64748b);
    }

    .warning-pulse {
      background: rgba(225, 29, 72, 0.1) !important;
      border-color: var(--ion-color-danger, #e11d48) !important;
      color: var(--ion-color-danger, #e11d48) !important;
      animation: pulse 1s infinite alternate;

      ion-icon {
        color: var(--ion-color-danger, #e11d48) !important;
      }
    }

    @keyframes pulse {
      0% {
        box-shadow: 0 0 0 0px rgba(225, 29, 72, 0.4);
      }
      100% {
        box-shadow: 0 0 0 8px rgba(225, 29, 72, 0);
      }
    }
  `]
})
export class TimerComponent {
  constructor(public stateService: ExamStateService) {
    addIcons({ timeOutline });
  }

  isWarningState(): boolean {
    const remaining = this.stateService.timeRemaining();
    const isSubmitted = this.stateService.submitted();
    // Warning state if less than 5 minutes (300 seconds) remain and exam is not yet submitted
    return remaining > 0 && remaining < 300 && !isSubmitted;
  }
}
