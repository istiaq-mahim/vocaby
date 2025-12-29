
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
  isAiGenerated?: boolean; // New field to track source
}

export interface LearnedWord extends Word {
  learnedOn: string; // YYYY-MM-DD format
  srsLevel: number; // New SRS property
  nextReview: string; // New SRS property, YYYY-MM-DD format
}

export interface Settings {
  wordCount: number;
  notificationHour: number;
  notificationMinute: number;
  darkMode: boolean;
  readingMode: boolean;
}

export enum View {
  DAILY = 'DAILY',
  REVIEW = 'REVIEW', // Added for spaced repetition
  MANUAL_ADD = 'MANUAL_ADD', // Added for manual word entry
  VOCABULARY = 'VOCABULARY',
}

export interface LearningLog {
  [date: string]: {
    status: 'learned' | 'declined';
  };
}
