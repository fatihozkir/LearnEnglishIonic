import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonSegment,
  IonSegmentButton,
  IonLabel,
} from '@ionic/angular/standalone';
import { ExamStateService } from '../../services/exam-state.service';
import { GrammarViewModel } from '../../viewmodels/grammar.viewmodel';
import { QuestionCardComponent } from '../question-card/question-card.component';
import { SectionHeaderComponent } from '../section-header/section-header.component';
import { ExamCategory } from '../../../core/models/models';

@Component({
  selector: 'app-grammar-section',
  standalone: true,
  imports: [
    CommonModule,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    QuestionCardComponent,
    SectionHeaderComponent,
  ],
  templateUrl: './grammar-section.component.html',
  styleUrls: ['./grammar-section.component.scss'],
})
export class GrammarSectionComponent implements OnInit {
  public viewModel = inject(GrammarViewModel);
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
