
import type { Word } from '../types';
import { fetchDailyWords } from './geminiService';

export const getDailyWords = async (count: number, user: any): Promise<Word[]> => {
    // Auth system removed - always fetch directly from Gemini using API_KEY
    try {
        const words = await fetchDailyWords(count);
        return words.map(w => ({ ...w, isAiGenerated: true }));
    } catch (error) {
        console.error("Word generation failed:", error);
        throw error;
    }
};

export const clearDailyCache = () => {
    localStorage.removeItem('vocaby_daily_words');
    localStorage.removeItem('vocaby_last_fetch_date');
};
