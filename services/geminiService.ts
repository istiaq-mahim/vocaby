
import { GoogleGenAI, Type } from "@google/genai";
import type { Word, LearningGoal } from '../types';

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
    reference: { type: Type.STRING, description: "Mandatory: For competitive, name the exam (e.g. BCS 45, DU 2023). For social, name the specific location/context (e.g. Market, Hospital, Office, Mosque, Transport)." },
    synonyms: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          word: { type: Type.STRING },
          meaning: { type: Type.STRING },
        },
        required: ['word', 'meaning'],
      },
    },
    antonyms: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          word: { type: Type.STRING },
          meaning: { type: Type.STRING },
        },
        required: ['word', 'meaning'],
      },
    },
    examples: { type: Type.ARRAY, items: examplePairSchema },
  },
  required: ['word', 'meaning_bangla', 'synonyms', 'antonyms', 'examples', 'reference'],
};

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const fetchCategorizedWords = async (count: number, goal: LearningGoal, age?: number): Promise<Word[]> => {
  try {
    const ai = getAI();
    let trackInstructions = "";

    switch (goal) {
      case 'general':
        trackInstructions = `Professional Situational English for daily life in Bangladesh. Target specific locations: Market (bargain, vendor, inventory), Hospital (diagnosis, ward, prognosis), Office (protocol, deadline, mandate), Transportation (commute, terminal, fare), Religious Places (congregation, ritual, reverence), and Social Visits (courtesy, hospitality, gratitude). 
        IMPORTANT: Tailor word selection and complexity for a ${age || 'adult'}-year-old learner. The language should be practical yet sophisticated enough for their age level.`;
        break;
      case 'competitive':
        trackInstructions = "Vocabulary from Bangladeshi Competitive Exams. Strictly include words from: BCS (10th to 45th), Bank Recruitment (SBL, JBL, BB), and University Admissions (Dhaka University, RU, CU, Medical). EVERY word must specify its historical exam source in the 'reference' field (e.g., 'BCS-44', 'Medical Admission 2022').";
        break;
      case 'ielts':
        trackInstructions = "Academic/Lexical resources for IELTS Band 8.0+. High-level analytical words for essay writing and reading comprehension.";
        break;
    }

    const prompt = `Generate ${count} high-quality English vocabulary words for Bangladeshi students in the "${goal}" track.
    Context: ${trackInstructions}
    
    JSON format requirements:
    - Accurate Bangla meanings for the word, synonyms, and antonyms.
    - 3-4 situational example sentences. Each MUST include both English and its precise Bangla translation.
    - The 'reference' field MUST describe the specific context or exam where the word is commonly used.`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: wordSchema,
        },
      },
    });

    return JSON.parse(response.text.trim()) as Word[];
  } catch (error) {
    console.error("Gemini Fetch Error:", error);
    return [];
  }
};

export const generateStoryFromWords = async (words: string[]): Promise<string> => {
    try {
        const ai = getAI();
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: `Write a 100-word situational story in English using: ${words.join(', ')}. Then, add a 1-sentence Bangla summary at the end.`,
        });
        return response.text.trim();
    } catch (error) {
        return "Contextual usage story is being updated...";
    }
};

export const fetchSingleWordDetails = async (word: string): Promise<Word> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Detailed analysis for: "${word}". Include Bangla meanings, synonyms, antonyms, and 3 English-Bangla examples.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: wordSchema,
    },
  });
  return JSON.parse(response.text.trim()) as Word;
};
