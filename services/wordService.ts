
import { starterWords } from '../data/starterWords';
import { fetchDailyWords as fetchWordsFromGemini } from './geminiService';
import type { Word } from '../types';
import { DAILY_WORDS_KEY, LAST_FETCH_DATE_KEY } from '../constants';

const USED_STATIC_WORDS_INDICES_KEY = 'vocaby_used_static_indices';

const getUsedIndices = (): number[] => {
    try {
        const item = window.localStorage.getItem(USED_STATIC_WORDS_INDICES_KEY);
        return item ? JSON.parse(item) : [];
    } catch (error) {
        console.error("Error reading used static indices from localStorage", error);
        return [];
    }
};

const setUsedIndices = (indices: number[]): void => {
    try {
        window.localStorage.setItem(USED_STATIC_WORDS_INDICES_KEY, JSON.stringify(indices));
    } catch (error) {
        console.error("Error writing used static indices to localStorage", error);
    }
};

/**
 * Clears the daily cache to force a re-fetch from the API.
 */
export const clearDailyCache = () => {
    localStorage.removeItem(DAILY_WORDS_KEY);
    localStorage.removeItem(LAST_FETCH_DATE_KEY);
};

export const getDailyWords = async (count: number): Promise<Word[]> => {
    const apiKey = process.env.API_KEY || (import.meta as any).env?.VITE_API_KEY;

    // 1. Try to fetch from Gemini first to provide fresh AI content
    try {
        if (apiKey && apiKey !== "undefined" && apiKey.length > 5) {
            console.log("Gemini API Key detected. Fetching words...");
            const geminiWords = await fetchWordsFromGemini(count);
            return geminiWords.map(w => ({ ...w, isAiGenerated: true }));
        } else {
            console.warn("API_KEY is missing or invalid. Falling back to starter words.");
        }
    } catch (error) {
        console.error("Gemini API call failed:", error);
        // We still fall back, but we've logged the error for debugging.
    }

    // 2. Fallback to starter words
    const usedIndices = getUsedIndices();
    
    const availableStaticIndices = starterWords
        .map((_, index) => index)
        .filter(index => !usedIndices.includes(index))
        .sort(() => Math.random() - 0.5);

    if (availableStaticIndices.length > 0) {
        const indicesToUse = availableStaticIndices.slice(0, count);
        const wordsToReturn = indicesToUse.map(index => ({
            ...starterWords[index],
            isAiGenerated: false
        }));
        
        setUsedIndices([...usedIndices, ...indicesToUse]);
        return wordsToReturn;
    }

    throw new Error("No words available. Please check your internet connection or API key.");
};
