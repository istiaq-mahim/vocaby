
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
    const usedIndices = getUsedIndices();
    
    // Find indices of available static words
    const availableStaticIndices = starterWords
        .map((_, index) => index)
        .filter(index => !usedIndices.includes(index));

    if (availableStaticIndices.length > 0) {
        const indicesToUse = availableStaticIndices.slice(0, count);
        const wordsToReturn = indicesToUse.map(index => starterWords[index]);
        
        // Mark these indices as used
        setUsedIndices([...usedIndices, ...indicesToUse]);
        
        // If we don't have enough static words for a full daily set, fetch the rest from Gemini
        if (wordsToReturn.length < count) {
            const remainingCount = count - wordsToReturn.length;
            try {
                const geminiWords = await fetchWordsFromGemini(remainingCount);
                return [...wordsToReturn, ...geminiWords];
            } catch (error) {
                // If Gemini fails but we have some static words, it's better to return them than nothing.
                if (wordsToReturn.length > 0) {
                    console.warn("Gemini fetch failed, returning partial list from static words.");
                    return wordsToReturn;
                }
                // Re-throw if we have nothing to show the user
                throw error;
            }
        }
        
        return wordsToReturn;
    } else {
        // No static words left, fetch everything from Gemini
        return fetchWordsFromGemini(count);
    }
};
