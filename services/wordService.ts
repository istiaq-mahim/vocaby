
import type { Word, LearningGoal } from '../types';
import { fetchCategorizedWords, generateStoryFromWords } from './geminiService';

const RESERVOIR_KEY_PREFIX = 'vocaby_res_v2_';
const DAILY_LOCK_KEY = 'vocaby_daily_lock_v2';
const MIN_RESERVOIR_SIZE = 100;
const FETCH_BATCH_SIZE = 50;

interface DailyLock {
  date: string;
  goal: LearningGoal;
  words: Word[];
  story: string;
}

/**
 * Ensures the local pool has enough words. Fetches silently in background.
 */
const refillReservoir = async (goal: LearningGoal) => {
  const key = `${RESERVOIR_KEY_PREFIX}${goal}`;
  const reservoir: Word[] = JSON.parse(localStorage.getItem(key) || '[]');
  
  if (reservoir.length < MIN_RESERVOIR_SIZE) {
    console.debug(`[Reservoir] Refilling ${goal}... Current size: ${reservoir.length}`);
    try {
      const newWords = await fetchCategorizedWords(FETCH_BATCH_SIZE, goal);
      const current = JSON.parse(localStorage.getItem(key) || '[]');
      const combined = [...current, ...newWords];
      // Deduplicate
      const unique = Array.from(new Map(combined.map(w => [w.word.toLowerCase(), w])).values());
      localStorage.setItem(key, JSON.stringify(unique));
    } catch (e) {
      console.error("Reservoir refill failed", e);
    }
  }
};

/**
 * Gets the static words for today. If not yet picked, picks from reservoir and locks them.
 */
export const getDailySession = async (goal: LearningGoal, count: number): Promise<{ words: Word[], story: string }> => {
  const today = new Date().toISOString().split('T')[0];
  
  // 1. Check if we already have words locked for today
  const savedLock = localStorage.getItem(DAILY_LOCK_KEY);
  if (savedLock) {
    const lock: DailyLock = JSON.parse(savedLock);
    if (lock.date === today && lock.goal === goal) {
      return { words: lock.words, story: lock.story };
    }
  }

  // 2. Need to pick new words for today
  const resKey = `${RESERVOIR_KEY_PREFIX}${goal}`;
  let reservoir: Word[] = JSON.parse(localStorage.getItem(resKey) || '[]');

  // 3. Emergency fetch if reservoir is empty (e.g., first run)
  if (reservoir.length < count) {
    const freshBatch = await fetchCategorizedWords(Math.max(count, MIN_RESERVOIR_SIZE), goal);
    reservoir = [...reservoir, ...freshBatch];
  }

  // 4. Select words and update reservoir
  const selected = reservoir.slice(0, count);
  const remaining = reservoir.slice(count);
  localStorage.setItem(resKey, JSON.stringify(remaining));

  // 5. Generate story for these specific words
  const story = await generateStoryFromWords(selected.map(w => w.word));

  // 6. Lock the session for today
  const newLock: DailyLock = {
    date: today,
    goal: goal,
    words: selected,
    story: story
  };
  localStorage.setItem(DAILY_LOCK_KEY, JSON.stringify(newLock));

  // 7. Refill background for future days
  refillReservoir(goal);

  return { words: selected, story };
};

export const clearDailyLock = () => {
  localStorage.removeItem(DAILY_LOCK_KEY);
};
