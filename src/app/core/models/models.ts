export enum ExamCategory {
  LISTENING = 'listening',
  GRAMMAR = 'grammar',
  READING = 'reading',
  VOCABULARY = 'vocabulary',
  WRITING = 'writing',
  SPEAKING = 'speaking'
}

export enum QuestionType {
  MULTIPLE_CHOICE = 'multiple-choice',
  TRUE_FALSE = 'true-false',
  MULTIPLE_SELECT = 'multiple-select',
  FILL_IN_BLANK = 'fill-in-blank',
  SHORT_ANSWER = 'short-answer',
  MATCHING = 'matching',
  ORDERING = 'ordering',
  WRITING = 'writing',
  SPEAKING = 'speaking'
}

export interface MatchingOption {
  left: string;
  right: string;
}

export interface Question {
  id: string;
  type: QuestionType;
  prompt: string;
  options?: (string | MatchingOption)[];
  answer: string | string[];
  explanation: string;
  localExplanations?: Record<string, string>;
}

export interface BaseSection {
  id: number;
  title: string;
  questions: Question[];
}

export interface ListeningSection extends BaseSection {
  videoId: string;
}

export interface GrammarSection extends BaseSection {}

export interface ReadingSection extends BaseSection {
  passage: string;
}

export interface VocabularySection extends BaseSection {}

export interface WritingSection extends BaseSection {}

export interface SpeakingSection extends BaseSection {}

export interface GlossaryItem {
  word: string;
  context: string;
  timestamp: number;
}

export interface ExamAnswers {
  listening: Record<number, Record<string, string | string[]>>;
  grammar: Record<number, Record<string, string | string[]>>;
  reading: Record<number, Record<string, string | string[]>>;
  vocabulary: Record<number, Record<string, string | string[]>>;
  writing: Record<number, Record<string, string | string[]>>;
  speaking: Record<number, Record<string, string | string[]>>;
}

export interface User {
  username: string;
  name: string;
  surname: string;
  dob: string;
  email: string;
  nativeLanguage: string;
  isLanguagePrimary?: boolean;
  isLanguageSecondary?: boolean;
  verified?: boolean;
  avatarUrl?: string;
  learningPreferences?: string[];
  questionCountsConfig?: Record<string, number>;
}

export interface ExamHistoryItem {
  id: string;
  date: number; // timestamp
  score: number;
  totalQuestions: number;
  percentage: number;
  durationSeconds: number;
  difficulty: 'easy' | 'medium' | 'hard';
  sections: string[];
  answers: ExamAnswers;
  questions: Record<string, any[]>;
}

export interface ExamConfig {
  difficulty: 'easy' | 'medium' | 'hard';
  selectedSections: string[];
  questionCounts: Record<string, number>;
}
