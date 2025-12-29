
import type { Word } from '../types';
import { fetchDailyWords } from './geminiService';
import { starterWords } from '../data/starterWords';

const WORD_POOL_KEY = 'vocaby_word_pool';
const RANDOM_OFFSET_KEY = 'vocaby_user_random_offset';

/**
 * Gets daily words from a local pool to ensure instant loading.
 * Shuffles the pool to provide a random selection for each request.
 */
export const getDailyWords = async (count: number, user: any): Promise<Word[]> => {
    // 1. Manage persistent user randomization offset (-1, 0, +1)
    let offset = localStorage.getItem(RANDOM_OFFSET_KEY);
    if (offset === null) {
      const newOffset = Math.floor(Math.random() * 3) - 1;
      localStorage.setItem(RANDOM_OFFSET_KEY, newOffset.toString());
      offset = newOffset.toString();
    }
    const adjustedCount = Math.max(3, count + parseInt(offset));

    // 2. Access local word pool
    let pool: Word[] = JSON.parse(localStorage.getItem(WORD_POOL_KEY) || '[]');
    
    // 3. Populate pool if empty using starter words
    if (pool.length < adjustedCount) {
        const usedWords = new Set(pool.map(w => w.word));
        const unusedStarters = starterWords.filter(w => !usedWords.has(w.word));
        pool = [...pool, ...unusedStarters];
    }

    // 4. Randomly select words from the pool to simulate different user experiences
    const selected: Word[] = [];
    const poolCopy = [...pool];
    
    for (let i = 0; i < Math.min(adjustedCount, poolCopy.length); i++) {
        const randomIndex = Math.floor(Math.random() * poolCopy.length);
        selected.push(poolCopy.splice(randomIndex, 1)[0]);
    }
    
    // 5. Update pool in storage (removing selected words)
    localStorage.setItem(WORD_POOL_KEY, JSON.stringify(poolCopy));

    // 6. Background Maintenance: Silent fetch of 30 new words when pool is low
    if (poolCopy.length < 15) {
        fetchDailyWords(30).then(newWords => {
            const currentPool: Word[] = JSON.parse(localStorage.getItem(WORD_POOL_KEY) || '[]');
            const updatedPool = [...currentPool, ...newWords];
            // Remove duplicates
            const uniquePool = Array.from(new Map(updatedPool.map(w => [w.word, w])).values());
            localStorage.setItem(WORD_POOL_KEY, JSON.stringify(uniquePool));
        }).catch(err => console.debug("Silent fetch failed, will retry on next check", err));
    }

    return selected.map(w => ({ ...w, isAiGenerated: true }));
};

export const clearDailyCache = () => {
    localStorage.removeItem('vocaby_daily_words');
    localStorage.removeItem('vocaby_last_fetch_date');
    localStorage.removeItem(WORD_POOL_KEY);
};
