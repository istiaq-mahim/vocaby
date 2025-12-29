
import { GoogleGenAI, Type } from "@google/genai";
import type { Word } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const synonymAntonymSchema = {
  type: Type.OBJECT,
  properties: {
    word: { type: Type.STRING, description: 'The English synonym/antonym.' },
    meaning: { type: Type.STRING, description: 'The corresponding Bangla meaning of the synonym/antonym.' },
  },
  required: ['word', 'meaning'],
};

const wordSchema = {
  type: Type.OBJECT,
  properties: {
    word: { type: Type.STRING, description: 'The English word.' },
    meaning_bangla: { type: Type.STRING, description: 'The primary meaning of the word in Bengali script.' },
    synonyms: { type: Type.ARRAY, items: synonymAntonymSchema, description: 'An array of at least 3 synonyms, each with its Bangla meaning. If none, provide an empty array.' },
    antonyms: { type: Type.ARRAY, items: synonymAntonymSchema, description: 'An array of at least 3 antonyms, each with its Bangla meaning. If none, provide an empty array.' },
    examples: { type: Type.ARRAY, items: { type: Type.STRING }, description: 'An array of exactly 5 simple English example sentences.' },
  },
  required: ['word', 'meaning_bangla', 'synonyms', 'antonyms', 'examples'],
};

export const fetchDailyWords = async (count: number): Promise<Word[]> => {
  try {
    const prompt = `You are an English teacher creating vocabulary flashcards for Bangladeshi students preparing for the IELTS exam. Please generate ${count} vocabulary words. The words should be of intermediate to advanced difficulty. For each word, provide its primary Bangla meaning. Also, for each synonym and antonym, provide its Bangla meaning.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: wordSchema,
        },
      },
    });

    const jsonText = response.text.trim();
    const words = JSON.parse(jsonText);
    
    // Basic validation
    if (!Array.isArray(words) || words.length === 0) {
        throw new Error("Invalid response format from Gemini API.");
    }

    return words as Word[];
  } catch (error) {
    console.error("Error fetching words from Gemini API:", error);
    throw new Error("Failed to fetch new words. Please try again later.");
  }
};

export const fetchSingleWordDetails = async (wordToFetch: string): Promise<Word> => {
    try {
        const prompt = `You are an English teacher creating a vocabulary flashcard for a Bangladeshi student preparing for the IELTS exam. Please generate the details for the word "${wordToFetch}". For the word, provide its primary Bangla meaning. Also, for each synonym and antonym, provide its Bangla meaning.`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: wordSchema, // Use the single word schema
            },
        });

        const jsonText = response.text.trim();
        const word = JSON.parse(jsonText);

        // Basic validation for a single object
        if (typeof word !== 'object' || word === null || !word.word) {
            throw new Error("Invalid response format from Gemini API for single word.");
        }

        return word as Word;
    } catch (error) {
        console.error(`Error fetching details for "${wordToFetch}" from Gemini API:`, error);
        throw new Error(`Failed to fetch details for "${wordToFetch}". Please check the spelling or try again later.`);
    }
};

export const generateStoryFromWords = async (words: string[]): Promise<string> => {
    try {
        const prompt = `You are an English teacher for Bangladeshi students. Write a short, simple, and engaging paragraph (around 50-70 words) that includes the following vocabulary words: ${words.join(', ')}. The story should be easy to understand for an English learner.`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        return response.text.trim();
    } catch (error) {
        console.error("Error generating story from Gemini API:", error);
        return "Sorry, we couldn't create a story for you right now. Please check your connection and try again.";
    }
};
