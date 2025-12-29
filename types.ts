
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

export interface Settings {
  wordCount: number;
  notificationHour: number;
  notificationMinute: number;
  darkMode: boolean;
  readingMode: boolean;
}

export enum View {
  DAILY = 'DAILY',
  REVIEW = 'REVIEW',
  MANUAL_ADD = 'MANUAL_ADD',
  VOCABULARY = 'VOCABULARY',
}

export interface LearningLog {
  [date: string]: {
    status: 'learned' | 'declined';
  };
}

export interface UserProgress {
  userId: string;
  lastFetchDate: string;
  wordsGeneratedToday: number;
  dailyLimit: number;
}
