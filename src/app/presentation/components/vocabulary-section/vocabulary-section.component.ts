import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonSegment,
  IonSegmentButton,
  IonLabel,
} from '@ionic/angular/standalone';
import { ExamStateService } from '../../services/exam-state.service';
import { VocabularyViewModel } from '../../viewmodels/vocabulary.viewmodel';
import { QuestionCardComponent } from '../question-card/question-card.component';
import { SectionHeaderComponent } from '../section-header/section-header.component';
import { ExamCategory } from '../../../core/models/models';

@Component({
  selector: 'app-vocabulary-section',
  standalone: true,
  imports: [
    CommonModule,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    QuestionCardComponent,
    SectionHeaderComponent,
  ],
  templateUrl: './vocabulary-section.component.html',
  styleUrls: ['./vocabulary-section.component.scss'],
})
export class VocabularySectionComponent implements OnInit {
  public viewModel = inject(VocabularyViewModel);
  public stateService = inject(ExamStateService);

  // Expose Enum to Template
  ExamCategory = ExamCategory;

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
