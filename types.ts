
export interface SynonymAntonym {
  word: string;
  meaning: string;
}

export interface Word {
  word: string;
  meaning_bangla: string;
  synonyms: SynonymAntonym[];
  antonyms: SynonymAntonym[];
  examples: string[];
  isAiGenerated?: boolean;
}

export interface LearnedWord extends Word {
  learnedOn: string;
  srsLevel: number;
  nextReview: string;
}

// FIX: Added missing LearningLog and LearningLogEntry interfaces to resolve import errors.
export interface LearningLogEntry {
  status: 'learned' | 'declined';
}

export interface LearningLog {
  [date: string]: LearningLogEntry;
}

export interface Settings {
  wordCount: number;
  notificationHour: number;
  notificationMinute: number;
  darkMode: boolean;
  readingMode: boolean;
}

export enum View {
  LANDING = 'LANDING',
  DAILY = 'DAILY',
  REVIEW = 'REVIEW',
  MANUAL_ADD = 'MANUAL_ADD',
  VOCABULARY = 'VOCABULARY',
  ACCOUNT = 'ACCOUNT',
}

export interface UserProgress {
  userId: string;
  email: string;
  name: string;
  image?: string;
  lastFetchDate: string;
  wordsGeneratedToday: number;
  dailyLimit: number;
}
