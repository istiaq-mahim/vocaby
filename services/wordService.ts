
import type { Word } from '../types';
import { fetchDailyWords } from './geminiService';
import { starterWords } from '../data/starterWords';

const WORD_POOL_KEY = 'vocaby_word_pool';
const RANDOM_OFFSET_KEY = 'vocaby_user_random_offset';

export const getDailyWords = async (count: number, user: any): Promise<Word[]> => {
    // 1. Get or generate a persistent random offset for this user (-1, 0, or +1)
    let offset = localStorage.getItem(RANDOM_OFFSET_KEY);
    if (offset === null) {
      const newOffset = Math.floor(Math.random() * 3) - 1; // -1 to 1
      localStorage.setItem(RANDOM_OFFSET_KEY, newOffset.toString());
      offset = newOffset.toString();
    }
    
    const adjustedCount = Math.max(3, count + parseInt(offset));

    // 2. Try to get words from the local pool first (instant loading)
    let pool: Word[] = JSON.parse(localStorage.getItem(WORD_POOL_KEY) || '[]');
    
    // 3. If pool is empty or too small, ensure we have at least starter words
    if (pool.length < adjustedCount) {
        // Merge in starter words if pool is low and we haven't used them
        const usedWords = new Set(pool.map(w => w.word));
        const unusedStarters = starterWords.filter(w => !usedWords.has(w.word));
        pool = [...pool, ...unusedStarters];
    }

    // 4. Take requested amount from pool
    const selected = pool.splice(0, adjustedCount);
    localStorage.setItem(WORD_POOL_KEY, JSON.stringify(pool));

    // 5. Background Refresh: If pool is getting low (less than 15), fetch more from AI silently
    if (pool.length < 15) {
        fetchDailyWords(30).then(newWords => {
            const currentPool: Word[] = JSON.parse(localStorage.getItem(WORD_POOL_KEY) || '[]');
            const updatedPool = [...currentPool, ...newWords];
            // Filter duplicates
            const uniquePool = Array.from(new Map(updatedPool.map(w => [w.word, w])).values());
            localStorage.setItem(WORD_POOL_KEY, JSON.stringify(uniquePool));
        }).catch(err => console.error("Silent background fetch failed", err));
    }

    // Return the selected words immediately
    if (selected.length > 0) {
        return selected.map(w => ({ ...w, isAiGenerated: true }));
    }

    // Ultimate Fallback
    const fallback = await fetchDailyWords(adjustedCount);
    return fallback.map(w => ({ ...w, isAiGenerated: true }));
};

export const clearDailyCache = () => {
    localStorage.removeItem('vocaby_daily_words');
    localStorage.removeItem('vocaby_last_fetch_date');
    localStorage.removeItem(WORD_POOL_KEY);
};
