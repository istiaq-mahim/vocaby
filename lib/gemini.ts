
import { GoogleGenAI, Type } from "@google/genai";

const synonymAntonymSchema = {
  type: Type.OBJECT,
  properties: {
    word: { type: Type.STRING, description: 'The English synonym/antonym.' },
    meaning: { type: Type.STRING, description: 'The corresponding Bangla meaning.' },
  },
  required: ['word', 'meaning'],
};

// Added examplePairSchema to match Word interface in types.ts
const examplePairSchema = {
  type: Type.OBJECT,
  properties: {
    english: { type: Type.STRING },
    bangla: { type: Type.STRING },
  },
  required: ['english', 'bangla'],
};

const wordSchema = {
  type: Type.OBJECT,
  properties: {
    word: { type: Type.STRING },
    meaning_bangla: { type: Type.STRING },
    synonyms: { type: Type.ARRAY, items: synonymAntonymSchema },
    antonyms: { type: Type.ARRAY, items: synonymAntonymSchema },
    examples: { type: Type.ARRAY, items: examplePairSchema },
  },
  required: ['word', 'meaning_bangla', 'synonyms', 'antonyms', 'examples'],
};

// FIX: Initialize GoogleGenAI strictly using process.env.API_KEY as per the guidelines.
export const generateWordsAction = async (count: number) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Generate ${count} intermediate/advanced vocabulary words for IELTS students in Bangladesh. 
    Include Bangla meanings, synonyms/antonyms with Bangla meanings, and 3 example sentences with both English and Bangla translations.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: wordSchema,
      },
    },
  });

  return JSON.parse(response.text.trim());
};

// FIX: Initialize GoogleGenAI strictly using process.env.API_KEY as per the guidelines.
export const generateStoryAction = async (words: string[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Write a 60-word story for English learners using these words: ${words.join(', ')}.`,
  });
  return response.text.trim();
};
