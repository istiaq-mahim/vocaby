
import type { Word } from '../types';

export const getDailyWords = async (count: number): Promise<Word[]> => {
    try {
        const response = await fetch('/api/words', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: 'user123', count })
        });

        if (response.status === 401) {
            // This will trigger the app to show the Landing page
            throw new Error("UNAUTHORIZED");
        }

        const data = await response.json();
        
        if (data.error) throw new Error(data.error);
        
        return data.words.map((w: Word) => ({ ...w, isAiGenerated: true }));
    } catch (error) {
        console.error("Fetch failed:", error);
        throw error;
    }
};

export const clearDailyCache = () => {
    localStorage.removeItem('vocaby_daily_words');
    localStorage.removeItem('vocaby_last_fetch_date');
};
