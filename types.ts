
export interface SynonymAntonym {
  word: string;
  meaning: string;
}

export interface ExamplePair {
  english: string;
  bangla: string;
}

export interface Word {
  word: string;
  meaning_bangla: string;
  synonyms: SynonymAntonym[];
  antonyms: SynonymAntonym[];
  examples: ExamplePair[];
  reference?: string; // e.g., BCS-43, Bank, CU-24
  isAiGenerated?: boolean;
}

export interface LearnedWord extends Word {
  learnedOn: string;
  srsLevel: number;
  nextReview: string;
}

export type LearningGoal = 'general' | 'competitive' | 'ielts';

export interface Settings {
  wordCount: number;
  notificationHour: number;
  notificationMinute: number;
  darkMode: boolean;
  readingMode: boolean;
  goal: LearningGoal;
}

export interface LearningLog {
  [date: string]: {
    status: 'learned' | 'declined';
  };
}

export enum View {
  LANDING = 'LANDING',
  DAILY = 'DAILY',
  REVIEW = 'REVIEW',
  MANUAL_ADD = 'MANUAL_ADD',
  VOCABULARY = 'VOCABULARY',
  ACCOUNT = 'ACCOUNT',
}
