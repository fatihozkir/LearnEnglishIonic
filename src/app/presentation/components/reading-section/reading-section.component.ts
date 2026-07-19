import { Component, OnInit, inject, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonIcon,
  IonButton,
} from '@ionic/angular/standalone';
import { ExamStateService } from '../../services/exam-state.service';
import { ReadingViewModel } from '../../viewmodels/reading.viewmodel';
import { QuestionCardComponent } from '../question-card/question-card.component';
import { SectionHeaderComponent } from '../section-header/section-header.component';
import { addIcons } from 'ionicons';
import { bookOutline, addOutline } from 'ionicons/icons';
import { ExamCategory } from '../../../core/models/models';

@Component({
  selector: 'app-reading-section',
  standalone: true,
  imports: [
    CommonModule,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonIcon,
    IonButton,
    QuestionCardComponent,
    SectionHeaderComponent,
  ],
  templateUrl: './reading-section.component.html',
  styleUrls: ['./reading-section.component.scss'],
})
export class ReadingSectionComponent implements OnInit {
  public viewModel = inject(ReadingViewModel);
  public stateService = inject(ExamStateService);

  // Expose Enum to Template
  ExamCategory = ExamCategory;

  constructor() {
    addIcons({ bookOutline, addOutline });
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

  // --- Document Event Listeners (delegated to ViewModel) ---

  @HostListener('document:selectionchange')
  onSelectionChange() {
    this.viewModel.handleSelectionChange();
  }

  @HostListener('document:mousedown', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const tooltipEl = document.querySelector('.floating-tooltip');
    if (tooltipEl && tooltipEl.contains(event.target as Node)) {
      return; // Do not dismiss if clicking inside the tooltip
    }
    this.viewModel.clearSelection();
  }

  addSelectedToGlossary(event: MouseEvent) {
    event.stopPropagation();
    event.preventDefault();
    this.viewModel.addSelectedToGlossary();
  }
}
