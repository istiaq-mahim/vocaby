
import type { Word } from '../types';
import { fetchDailyWords } from './geminiService';

export const getDailyWords = async (count: number, user: { isGuest?: boolean; email: string }): Promise<Word[]> => {
    // If user is a Guest, bypass the authenticated backend API and use Gemini directly from the browser
    if (user.isGuest) {
        console.log("Guest Mode: Generating words client-side...");
        try {
            const words = await fetchDailyWords(count);
            return words.map(w => ({ ...w, isAiGenerated: true }));
        } catch (error) {
            console.error("Client-side generation failed:", error);
            throw error;
        }
    }

    // Attempt to hit the backend for logged-in users
    try {
        const response = await fetch('/api/words', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: user.email, count })
        });

        if (response.status === 401) {
            throw new Error("UNAUTHORIZED");
        }

        const data = await response.json();
        
        if (data.error) throw new Error(data.error);
        
        return data.words.map((w: Word) => ({ ...w, isAiGenerated: true }));
    } catch (error) {
        console.warn("Backend fetch failed, falling back to client-side generation...", error);
        // Secondary fallback for authenticated users if their backend is down
        const words = await fetchDailyWords(count);
        return words.map(w => ({ ...w, isAiGenerated: true }));
    }
};

export const clearDailyCache = () => {
    localStorage.removeItem('vocaby_daily_words');
    localStorage.removeItem('vocaby_last_fetch_date');
};
