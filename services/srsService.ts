
import type { LearnedWord } from '../types';

export type PerformanceRating = 'hard' | 'good' | 'easy';

// Intervals in days for each SRS level after a 'good' rating
const srsIntervals: { [level: number]: number } = {
  0: 1,
  1: 3,
  2: 7,
  3: 14,
  4: 30,
  5: 90,
  6: 180,
};

const MAX_SRS_LEVEL = Object.keys(srsIntervals).length - 1;

/**
 * Calculates the next review date for a word based on user performance.
 * @param word The word that was just reviewed.
 * @param rating The user's self-assessed performance.
 * @returns An object with the updated srsLevel and nextReview date string.
 */
export const calculateNextReview = (
  word: LearnedWord,
  rating: PerformanceRating
): { srsLevel: number; nextReview: string } => {
  let srsLevel = word.srsLevel ?? 0;

  if (rating === 'hard') {
    // If rated 'hard', move back one level (but not below 0)
    srsLevel = Math.max(0, srsLevel - 1);
  } else {
    // For 'good' and 'easy', advance to the next level
    srsLevel = Math.min(MAX_SRS_LEVEL, srsLevel + 1);
  }
  
  // 'easy' rating gets a bonus, pushing the next review out further
  const easyBonus = rating === 'easy' ? Math.ceil(srsIntervals[srsLevel] * 0.3) : 0;
  
  const intervalDays = srsIntervals[srsLevel] + easyBonus;
  
  const nextReviewDate = new Date();
  nextReviewDate.setDate(nextReviewDate.getDate() + intervalDays);
  
  const nextReview = nextReviewDate.toISOString().split('T')[0];

  return { srsLevel, nextReview };
};
