
import type { Word, LearningGoal } from '../types';
import { fetchCategorizedWords, generateStoryFromWords } from './geminiService';

const RESERVOIR_KEY_PREFIX = 'vocaby_res_pool_';
const DAILY_SESSION_PREFIX = 'vocaby_daily_v5_'; 
const MIN_RESERVOIR_SIZE = 50;

/**
 * Gets the daily session. 
 * If a session for this SPECIFIC goal and date exists, returns it instantly.
 * Otherwise, pulls from the reservoir instantly and generates a story.
 */
export const getDailySession = async (goal: LearningGoal, count: number, age?: number): Promise<{ words: Word[], story: string }> => {
  const today = new Date().toISOString().split('T')[0];
  const sessionKey = `${DAILY_SESSION_PREFIX}${today}_${goal}_${count}`;
  
  // 1. Instant check for this track today
  const savedSession = localStorage.getItem(sessionKey);
  if (savedSession) {
    console.debug(`[Sync] Loading cached session for ${goal}`);
    return JSON.parse(savedSession);
  }

  // 2. Fallback: Pull from Reservoir Pool
  const poolKey = `${RESERVOIR_KEY_PREFIX}${goal}`;
  let pool: Word[] = JSON.parse(localStorage.getItem(poolKey) || '[]');

  // If pool is empty or low, fetch emergency batch with age context
  if (pool.length < count) {
    console.debug(`[Sync] Pool for ${goal} empty, fetching emergency batch for age ${age || 'N/A'}...`);
    const freshBatch = await fetchCategorizedWords(Math.max(count, 20), goal, age);
    pool = [...pool, ...freshBatch];
  }

  const selected = pool.slice(0, count);
  const remaining = pool.slice(count);
  localStorage.setItem(poolKey, JSON.stringify(remaining));

  // 3. Story Generation
  const story = await generateStoryFromWords(selected.map(w => w.word));

  // 4. Lock for today
  const sessionData = { words: selected, story, date: today, goal, count };
  localStorage.setItem(sessionKey, JSON.stringify(sessionData));

  // 5. Silent background refill
  setTimeout(() => refillPoolIfLow(goal, age), 1000);

  return { words: selected, story };
};

const refillPoolIfLow = async (goal: LearningGoal, age?: number) => {
  const poolKey = `${RESERVOIR_KEY_PREFIX}${goal}`;
  const pool: Word[] = JSON.parse(localStorage.getItem(poolKey) || '[]');
  
  if (pool.length < MIN_RESERVOIR_SIZE) {
    try {
      const moreWords = await fetchCategorizedWords(30, goal, age);
      const updatedPool = [...pool, ...moreWords];
      const unique = Array.from(new Map(updatedPool.map(w => [w.word.toLowerCase(), w])).values());
      localStorage.setItem(poolKey, JSON.stringify(unique));
      console.debug(`[Background] Refilled ${goal} reservoir (age ${age}). Size: ${unique.length}`);
    } catch (e) {
      console.error("[Background] Refill failed", e);
    }
  }
};
