
import type { Word } from '../types';

export const getDailyWords = async (count: number): Promise<Word[]> => {
    try {
        const response = await fetch('/api/words', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: 'user123', count })
        });

        const data = await response.json();
        
        if (data.error) throw new Error(data.error);
        
        return data.words.map((w: Word) => ({ ...w, isAiGenerated: true }));
    } catch (error) {
        console.error("Fetch failed, falling back to local simulation:", error);
        throw error;
    }
};

export const clearDailyCache = () => {
    // In Next.js with a DB, this would be a server action to reset a user's flag
    // For now, we clear local storage to trigger a re-fetch of the API
    localStorage.removeItem('vocaby_daily_words');
    localStorage.removeItem('vocaby_last_fetch_date');
};
