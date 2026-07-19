import { Component, Input, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonCard,
  IonCardContent,
  IonRadioGroup,
  IonRadio,
  IonCheckbox,
  IonInput,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonList,
  IonText,
} from '@ionic/angular/standalone';
import { Question, QuestionType, ExamAnswers, ExamCategory } from '../../../core/models/models';
import { ExamStateService } from '../../services/exam-state.service';

@Component({
  selector: 'app-question-card',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonCard,
    IonCardContent,
    IonRadioGroup,
    IonRadio,
    IonCheckbox,
    IonInput,
    IonItem,
    IonSelect,
    IonSelectOption,
    IonList,
    IonText,
  ],
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss'],
})
export class QuestionCardComponent implements OnInit {
  @Input({ required: true }) question!: Question;
  @Input({ required: true }) sectionId!: number;
  @Input({ required: true }) category!: ExamCategory;

  QuestionType = QuestionType;

  // Local helper for matching question states
  matchingSelections: Record<string, string> = {};

  constructor(public stateService: ExamStateService) {}

  ngOnInit() {
    // If it's a matching question, initialize selection values from saved state if any
    if (this.question.type === QuestionType.MATCHING) {
      const saved = this.currentAnswer();
      if (Array.isArray(saved)) {
        saved.forEach(pair => {
          const parts = pair.split('-');
          if (parts.length >= 2) {
            const left = parts[0];
            const right = parts.slice(1).join('-');
            this.matchingSelections[left] = right;
          }
        });
      }
    }
  }

  // Get current answer from global state
  currentAnswer() {
    const allAnswers = this.stateService.answers();
    return allAnswers[this.category as keyof ExamAnswers]?.[this.sectionId]?.[this.question.id];
  }

  // Check if this option is selected (for checkboxes)
  isOptionChecked(optionLetter: string): boolean {
    const ans = this.currentAnswer();
    return Array.isArray(ans) ? ans.includes(optionLetter) : false;
  }

  // Handle updates to options selection
  onRadioChange(val: string) {
    this.stateService.saveAnswer(this.category as keyof ExamAnswers, this.sectionId, this.question.id, val);
  }

  onCheckboxChange(optionLetter: string, event: any) {
    const isChecked = event.detail.checked;
    let current = (this.currentAnswer() as string[]) || [];

    if (!Array.isArray(current)) {
      current = [];
    }

    if (isChecked) {
      if (!current.includes(optionLetter)) {
        current = [...current, optionLetter].sort();
      }
    } else {
      current = current.filter(x => x !== optionLetter);
    }

    this.stateService.saveAnswer(this.category as keyof ExamAnswers, this.sectionId, this.question.id, current);
  }

  onTextChange(val: string | null) {
    this.stateService.saveAnswer(this.category as keyof ExamAnswers, this.sectionId, this.question.id, val || '');
  }

  onInputText(event: any) {
    const val = event.target.value;
    this.onTextChange(val !== null && val !== undefined ? String(val) : '');
  }

  onMatchingChange(leftItem: string, event: any) {
    const rightItem = event.detail.value;
    this.matchingSelections[leftItem] = rightItem;

    // Convert selections dict to array of "left-right" strings
    const answerArray = Object.entries(this.matchingSelections)
      .filter(([_, right]) => !!right)
      .map(([left, right]) => `${left}-${right}`);

    this.stateService.saveAnswer(this.category as keyof ExamAnswers, this.sectionId, this.question.id, answerArray);
  }

  // Verification helpers after submission
  isSubmitted() {
    return this.stateService.submitted();
  }

  isCorrect(): boolean {
    const ans = this.currentAnswer();
    const correct = this.question.answer;

    if (!ans) return false;

    if (Array.isArray(correct)) {
      if (!Array.isArray(ans)) return false;
      // Sort and compare arrays
      const sortedAns = [...ans].sort();
      const sortedCorrect = [...correct].sort();
      return JSON.stringify(sortedAns) === JSON.stringify(sortedCorrect);
    }

    // String answers (ignore case and spaces for fill-in-blanks/short-answers)
    if (typeof ans === 'string' && typeof correct === 'string') {
      return ans.trim().toLowerCase() === correct.trim().toLowerCase();
    }

    return ans === correct;
  }

  // Utility to map choices index (0, 1, 2, 3) to letters (A, B, C, D)
  getOptionLetter(index: number): string {
    return String.fromCharCode(65 + index); // 65 is ASCII for 'A'
  }

  // Cast option helper for matching pairs
  getMatchingOption(opt: any): { left: string; right: string } {
    return opt as { left: string; right: string };
  }
}
