
import { starterWords } from '../data/starterWords';
import { fetchDailyWords as fetchWordsFromGemini } from './geminiService';
import type { Word } from '../types';

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

export const getDailyWords = async (count: number): Promise<Word[]> => {
    // 1. Try to fetch from Gemini first to provide fresh AI content
    try {
        if (process.env.API_KEY) {
            console.log("Attempting to fetch fresh words from Gemini...");
            const geminiWords = await fetchWordsFromGemini(count);
            return geminiWords;
        }
    } catch (error) {
        console.warn("Gemini API call failed, falling back to starter words.", error);
    }

    // 2. Fallback to starter words if Gemini fails or API_KEY is missing
    const usedIndices = getUsedIndices();
    
    // Find indices of available static words and randomize the selection so it doesn't feel "static"
    const availableStaticIndices = starterWords
        .map((_, index) => index)
        .filter(index => !usedIndices.includes(index))
        .sort(() => Math.random() - 0.5);

    if (availableStaticIndices.length > 0) {
        const indicesToUse = availableStaticIndices.slice(0, count);
        const wordsToReturn = indicesToUse.map(index => starterWords[index]);
        
        // Mark these indices as used
        setUsedIndices([...usedIndices, ...indicesToUse]);
        return wordsToReturn;
    }

    // 3. If even static words are exhausted and Gemini failed, we must throw
    throw new Error("No words available. Please check your internet connection or API key.");
};
