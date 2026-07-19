import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonButton,
  IonIcon,
  IonSegment,
  IonSegmentButton,
  IonLabel,
} from '@ionic/angular/standalone';
import { ExamStateService } from '../../services/exam-state.service';
import { ListeningViewModel } from '../../viewmodels/listening.viewmodel';
import { QuestionCardComponent } from '../question-card/question-card.component';
import { SectionHeaderComponent } from '../section-header/section-header.component';
import { addIcons } from 'ionicons';
import { playOutline, lockClosedOutline, volumeHighOutline, checkmarkCircleOutline } from 'ionicons/icons';
import { ExamCategory } from '../../../core/models/models';

@Component({
  selector: 'app-listening-section',
  standalone: true,
  imports: [
    CommonModule,
    IonButton,
    IonIcon,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    QuestionCardComponent,
    SectionHeaderComponent,
  ],
  templateUrl: './listening-section.component.html',
  styleUrls: ['./listening-section.component.scss'],
})
export class ListeningSectionComponent implements OnInit {
  public viewModel = inject(ListeningViewModel);
  public stateService = inject(ExamStateService);

  // Expose Enum to Template
  ExamCategory = ExamCategory;

  constructor() {
    addIcons({ playOutline, lockClosedOutline, volumeHighOutline, checkmarkCircleOutline });
  }

  ngOnInit() {
    this.viewModel.init();
  }

  onSectionChange(event: any) {
    const val = event.detail.value;
    if (val !== undefined && val !== null) {
      this.viewModel.selectSection(Number(val));
    }
  }
}
