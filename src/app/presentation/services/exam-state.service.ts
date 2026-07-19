import { GlossaryItem, ExamAnswers, ExamCategory, Question, ExamHistoryItem, ExamConfig } from '../../core/models/models';
import { toastController } from '@ionic/core';
import { LocalListeningRepository } from '../../data/repositories/local-listening.repository';
import { LocalGrammarRepository } from '../../data/repositories/local-grammar.repository';
import { LocalReadingRepository } from '../../data/repositories/local-reading.repository';
import { LocalVocabularyRepository } from '../../data/repositories/local-vocabulary.repository';
import { LocalWritingRepository } from '../../data/repositories/local-writing.repository';
import { LocalSpeakingRepository } from '../../data/repositories/local-speaking.repository';
import { first } from 'rxjs';

const STORAGE_KEY = 'english_exam_state';

interface LocalState {
  currentTab: ExamCategory;
  answers: ExamAnswers;
  playedSections: Record<number, boolean>;
  submitted: boolean;
  glossary: GlossaryItem[];
  elapsedSeconds: number;
  examHistory: ExamHistoryItem[];
}

import { Injectable, signal, computed, effect, NgZone, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ExamStateService {
  // Base State Signals
  readonly currentTab = signal<ExamCategory>(ExamCategory.LISTENING);
  readonly answers = signal<ExamAnswers>({
    listening: {},
    grammar: {},
    reading: {},
    vocabulary: {},
    writing: {},
    speaking: {},
  });
  readonly playedSections = signal<Record<number, boolean>>({});
  readonly submitted = signal<boolean>(false);
  readonly showResultsScreen = signal<boolean>(false);
  readonly glossary = signal<GlossaryItem[]>([]);
  readonly elapsedSeconds = signal<number>(0);
  readonly userLanguage = signal<string>('tr');
  readonly examHistory = signal<ExamHistoryItem[]>([]);
  readonly totalTimeSeconds = 3600; // 60 minutes limit

  // Active Session Mappings
  readonly activeConfig = signal<ExamConfig | null>(null);
  readonly activeQuestions = signal<Record<string, any[]>>({});

  // Loaded database questions for scoring statistics
  private allQuestions: {
    listening: Question[];
    grammar: Question[];
    reading: Question[];
    vocabulary: Question[];
    writing: Question[];
    speaking: Question[];
  } = { listening: [], grammar: [], reading: [], vocabulary: [], writing: [], speaking: [] };

  private listeningRepo = inject(LocalListeningRepository);
  private grammarRepo = inject(LocalGrammarRepository);
  private readingRepo = inject(LocalReadingRepository);
  private vocabularyRepo = inject(LocalVocabularyRepository);
  private writingRepo = inject(LocalWritingRepository);
  private speakingRepo = inject(LocalSpeakingRepository);

  // Timer reference
  private timerInterval: any;
  private zone = inject(NgZone);

  // Computed Properties
  readonly glossaryCount = computed(() => this.glossary().length);
  readonly timeRemaining = computed(() => Math.max(0, this.totalTimeSeconds - this.elapsedSeconds()));

  readonly formattedTime = computed(() => {
    const minutes = Math.floor(this.timeRemaining() / 60);
    const seconds = this.timeRemaining() % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  });

  // Dynamic Overall and Category Statistics
  readonly examStats = computed(() => {
    const userAnswers = this.answers();
    const stats: Record<string, { correct: number, incorrect: number, unanswered: number, total: number, score: number }> = {
      listening: { correct: 0, incorrect: 0, unanswered: 0, total: 0, score: 0 },
      grammar: { correct: 0, incorrect: 0, unanswered: 0, total: 0, score: 0 },
      reading: { correct: 0, incorrect: 0, unanswered: 0, total: 0, score: 0 },
      vocabulary: { correct: 0, incorrect: 0, unanswered: 0, total: 0, score: 0 },
      writing: { correct: 0, incorrect: 0, unanswered: 0, total: 0, score: 0 },
      speaking: { correct: 0, incorrect: 0, unanswered: 0, total: 0, score: 0 },
      overall: { correct: 0, incorrect: 0, unanswered: 0, total: 0, score: 0 }
    };

    const evaluateCategory = (cat: ExamCategory) => {
      const questionsList = this.allQuestions[cat] || [];
      const answersMap = userAnswers[cat as keyof ExamAnswers] || {};
      
      let correct = 0;
      let incorrect = 0;
      let unanswered = 0;

      questionsList.forEach(q => {
        let ans: any = undefined;
        // Search across all section IDs saved under this category
        Object.keys(answersMap).forEach(secId => {
          const secAns = answersMap[Number(secId)];
          if (secAns && secAns[q.id] !== undefined) {
            ans = secAns[q.id];
          }
        });

        if (ans === undefined || ans === null || ans === '' || (Array.isArray(ans) && ans.length === 0)) {
          unanswered++;
        } else {
          if (cat === ExamCategory.WRITING || cat === ExamCategory.SPEAKING) {
            if (ans && String(ans).trim().length > 5) {
              correct++;
            } else {
              incorrect++;
            }
          } else {
            const isOk = this.evaluateAnswer(q, ans);
            if (isOk) {
              correct++;
            } else {
              incorrect++;
            }
          }
        }
      });

      stats[cat] = {
        correct,
        incorrect,
        unanswered,
        total: questionsList.length,
        score: questionsList.length > 0 ? Math.round((correct / questionsList.length) * 100) : 0
      };
      
      stats['overall'].correct += correct;
      stats['overall'].incorrect += incorrect;
      stats['overall'].unanswered += unanswered;
      stats['overall'].total += questionsList.length;
    };

    Object.values(ExamCategory).forEach(cat => {
      evaluateCategory(cat);
    });

    stats['overall'].score = stats['overall'].total > 0 ? Math.round((stats['overall'].correct / stats['overall'].total) * 100) : 0;

    return stats;
  });

  private evaluateAnswer(question: Question, userAns: any): boolean {
    if (!userAns) return false;
    const correct = question.answer;

    if (Array.isArray(correct)) {
      if (!Array.isArray(userAns)) return false;
      if (correct.length !== userAns.length) return false;
      return correct.every(val => userAns.includes(val));
    }

    return String(userAns).trim().toLowerCase() === String(correct).trim().toLowerCase();
  }

  // Dynamic Session Score calculations
  readonly sessionStats = computed(() => {
    const config = this.activeConfig();
    const userAnswers = this.answers();
    const activeQs = this.activeQuestions();
    
    let correct = 0;
    let total = 0;

    if (config) {
      config.selectedSections.forEach((cat: string) => {
        const sectionsList = activeQs[cat] || [];
        const answersMap = userAnswers[cat as keyof ExamAnswers] || {};

        sectionsList.forEach((sec: any) => {
          const qs: Question[] = sec.questions || [];
          qs.forEach((q: Question) => {
            total++;
            let ans: any = undefined;
            // Search across section ID
            Object.keys(answersMap).forEach((secId: string) => {
              const secAns = answersMap[Number(secId)];
              if (secAns && secAns[q.id] !== undefined) {
                ans = secAns[q.id];
              }
            });

            if (q.type === 'writing' || q.type === 'speaking') {
              // Mock success: pass if response contains characters
              if (ans && String(ans).trim().length > 5) {
                correct++;
              }
            } else {
              if (ans !== undefined && this.evaluateAnswer(q, ans)) {
                correct++;
              }
            }
          });
        });
      });
    }

    return {
      correct,
      total,
      percentage: total > 0 ? Math.round((correct / total) * 100) : 0
    };
  });

  constructor() {
    this.loadStateFromStorage();
    this.startTimer();

    // Load database questions
    this.listeningRepo.getAll().subscribe(data => {
      const list: Question[] = [];
      data.forEach(s => list.push(...s.questions));
      this.allQuestions.listening = list;
    });
    this.grammarRepo.getAll().subscribe(data => {
      const list: Question[] = [];
      data.forEach(s => list.push(...s.questions));
      this.allQuestions.grammar = list;
    });
    this.readingRepo.getAll().subscribe(data => {
      const list: Question[] = [];
      data.forEach(s => list.push(...s.questions));
      this.allQuestions.reading = list;
    });
    this.vocabularyRepo.getAll().subscribe(data => {
      const list: Question[] = [];
      data.forEach(s => list.push(...s.questions));
      this.allQuestions.vocabulary = list;
    });
    this.writingRepo.getAll().subscribe(data => {
      const list: Question[] = [];
      data.forEach(s => list.push(...s.questions));
      this.allQuestions.writing = list;
    });
    this.speakingRepo.getAll().subscribe(data => {
      const list: Question[] = [];
      data.forEach(s => list.push(...s.questions));
      this.allQuestions.speaking = list;
    });

    // Effect to auto-save state to LocalStorage whenever changes happen
    effect(() => {
      const state: LocalState = {
        currentTab: this.currentTab(),
        answers: this.answers(),
        playedSections: this.playedSections(),
        submitted: this.submitted(),
        glossary: this.glossary(),
        elapsedSeconds: this.elapsedSeconds(),
        examHistory: this.examHistory(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    });
  }

  // --- Actions ---

  selectTab(tab: ExamCategory) {
    this.currentTab.set(tab);
  }

  saveAnswer(category: keyof ExamAnswers, sectionId: number, questionId: string, answer: string | string[]) {
    if (this.submitted()) return; // Lock inputs when submitted

    this.answers.update(prev => {
      const categoryAnswers = prev[category] || {};
      const sectionAnswers = categoryAnswers[sectionId] || {};
      return {
        ...prev,
        [category]: {
          ...categoryAnswers,
          [sectionId]: {
            ...sectionAnswers,
            [questionId]: answer,
          },
        },
      };
    });
  }

  markSectionPlayed(sectionId: number) {
    this.playedSections.update(prev => ({
      ...prev,
      [sectionId]: true,
    }));
  }

  submitExam() {
    this.submitted.set(true);
    this.stopTimer();
    this.showResultsScreen.set(true);

    const config = this.activeConfig();
    if (config) {
      const stats = this.sessionStats();
      const historyItem: ExamHistoryItem = {
        id: 'session_' + Date.now(),
        date: Date.now(),
        score: stats.correct,
        totalQuestions: stats.total,
        percentage: stats.percentage,
        durationSeconds: this.elapsedSeconds(),
        difficulty: config.difficulty,
        sections: config.selectedSections,
        answers: JSON.parse(JSON.stringify(this.answers())),
        questions: JSON.parse(JSON.stringify(this.activeQuestions()))
      };

      this.examHistory.update(prev => [historyItem, ...prev]);
    }
  }

  startNewExamSession(config: ExamConfig) {
    this.activeConfig.set(config);
    this.submitted.set(false);
    this.showResultsScreen.set(false);
    this.elapsedSeconds.set(0);
    this.playedSections.set({});
    
    this.answers.set({
      listening: {},
      grammar: {},
      reading: {},
      vocabulary: {},
      writing: {},
      speaking: {},
    });

    const active: Record<string, any[]> = {};

    const processCategory = (cat: string, repo: any) => {
      if (!config.selectedSections.includes(cat)) return;
      
      repo.getAll().pipe(first()).subscribe((sections: any[]) => {
        const clonedSections = JSON.parse(JSON.stringify(sections));
        clonedSections.forEach((sec: any) => {
          let qs: Question[] = sec.questions || [];
          // Shuffle questions
          qs = this.shuffleArray(qs);

          const limit = config.questionCounts[cat] || 10;
          sec.questions = qs.slice(0, limit);
        });

        active[cat] = clonedSections;
      });
    };

    processCategory('listening', this.listeningRepo);
    processCategory('grammar', this.grammarRepo);
    processCategory('reading', this.readingRepo);
    processCategory('vocabulary', this.vocabularyRepo);
    processCategory('writing', this.writingRepo);
    processCategory('speaking', this.speakingRepo);

    this.activeQuestions.set(active);
    this.currentTab.set(config.selectedSections[0] as ExamCategory);
    this.startTimer();
  }

  private shuffleArray(array: any[]): any[] {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  resetExam() {
    this.submitted.set(false);
    this.showResultsScreen.set(false);
    this.elapsedSeconds.set(0);
    this.playedSections.set({});
    this.answers.set({
      listening: {},
      grammar: {},
      reading: {},
      vocabulary: {},
      writing: {},
      speaking: {},
    });
    this.glossary.set([]);
    this.startTimer();
  }

  addToGlossary(word: string, context: string) {
    const trimmedWord = word.trim();
    if (!trimmedWord) return;

    // Avoid duplicate words
    const exists = this.glossary().some(
      item => item.word.toLowerCase() === trimmedWord.toLowerCase()
    );
    if (exists) {
      this.showToast(`"${trimmedWord}" is already in your glossary.`, 'warning');
      return;
    }

    this.glossary.update(prev => [
      ...prev,
      {
        word: trimmedWord,
        context: context.trim(),
        timestamp: Date.now(),
      },
    ]);

    this.showToast(`"${trimmedWord}" added to glossary.`, 'success');
  }

  removeFromGlossary(word: string) {
    this.glossary.update(prev => prev.filter(item => item.word !== word));
    this.showToast(`"${word}" removed from glossary.`, 'medium');
  }

  async showToast(message: string, color: 'success' | 'warning' | 'medium') {
    try {
      const toast = await toastController.create({
        message,
        duration: 2000,
        position: 'bottom',
        color,
        buttons: [{ text: 'Dismiss', role: 'cancel' }]
      });
      await toast.present();
    } catch (e) {
      console.warn('Toast fail:', e);
    }
  }

  // --- Internal Helpers ---

  private startTimer() {
    this.stopTimer();
    if (this.submitted()) return;

    this.zone.runOutsideAngular(() => {
      this.timerInterval = setInterval(() => {
        this.zone.run(() => {
          if (this.elapsedSeconds() >= this.totalTimeSeconds) {
            this.submitExam();
          } else {
            this.elapsedSeconds.update(prev => prev + 1);
          }
        });
      }, 1000);
    });
  }

  private stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  private loadStateFromStorage() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    try {
      const state: LocalState = JSON.parse(saved);
      if (state.currentTab) this.currentTab.set(state.currentTab);
      if (state.answers) this.answers.set(state.answers);
      if (state.playedSections) this.playedSections.set(state.playedSections);
      if (state.submitted) this.submitted.set(state.submitted);
      if (state.glossary) this.glossary.set(state.glossary);
      if (state.elapsedSeconds) this.elapsedSeconds.set(state.elapsedSeconds);
      if (state.examHistory) this.examHistory.set(state.examHistory);
    } catch (e) {
      console.error('Failed to parse saved state:', e);
    }
  }
}
