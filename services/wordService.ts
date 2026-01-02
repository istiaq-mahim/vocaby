
import type { Word, LearningGoal } from '../types';
import { fetchCategorizedWords, generateStoryFromWords } from './geminiService';

const RESERVOIR_KEY_PREFIX = 'vocaby_res_v2_';
const DAILY_LOCK_KEY = 'vocaby_daily_lock_v2';
const MIN_RESERVOIR_SIZE = 100;
const FETCH_BATCH_SIZE = 50;

interface DailyLock {
  date: string;
  goal: LearningGoal;
  count: number;
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
      // Deduplicate by word (case-insensitive)
      const unique = Array.from(new Map(combined.map(w => [w.word.toLowerCase(), w])).values());
      localStorage.setItem(key, JSON.stringify(unique));
    } catch (e) {
      console.error("Reservoir refill failed", e);
    }
  }
};

/**
 * Gets the static words for today. 
 * If a session is already locked for today with the current goal and count, it returns it instantly.
 */
export const getDailySession = async (goal: LearningGoal, count: number): Promise<{ words: Word[], story: string }> => {
  const today = new Date().toISOString().split('T')[0];
  
  // 1. Check for valid existing lock
  const savedLock = localStorage.getItem(DAILY_LOCK_KEY);
  if (savedLock) {
    const lock: DailyLock = JSON.parse(savedLock);
    // Only return if date, goal AND requested word count match
    if (lock.date === today && lock.goal === goal && lock.count === count) {
      console.debug(`[DailyLock] Returning static session for ${today}`);
      return { words: lock.words, story: lock.story };
    }
  }

  // 2. No valid lock. Pick new words from reservoir (instant)
  const resKey = `${RESERVOIR_KEY_PREFIX}${goal}`;
  let reservoir: Word[] = JSON.parse(localStorage.getItem(resKey) || '[]');

  // 3. Initial fetch if reservoir is empty
  if (reservoir.length < count) {
    const freshBatch = await fetchCategorizedWords(Math.max(count, MIN_RESERVOIR_SIZE), goal);
    reservoir = [...reservoir, ...freshBatch];
  }

  // 4. Select words and slice them out of the reservoir
  const selected = reservoir.slice(0, count);
  const remaining = reservoir.slice(count);
  localStorage.setItem(resKey, JSON.stringify(remaining));

  // 5. Generate story context (AI call)
  const story = await generateStoryFromWords(selected.map(w => w.word));

  // 6. Hard-lock the session for the rest of today
  const newLock: DailyLock = {
    date: today,
    goal: goal,
    count: count,
    words: selected,
    story: story
  };
  localStorage.setItem(DAILY_LOCK_KEY, JSON.stringify(newLock));

  // 7. Silent background refill for future sessions
  refillReservoir(goal);

  return { words: selected, story };
};

export const clearDailyLock = () => {
  localStorage.removeItem(DAILY_LOCK_KEY);
};
