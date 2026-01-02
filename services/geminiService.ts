
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
    reference: { type: Type.STRING, description: "Exam reference like BCS-43, Bank, CU-24, RU-21. Only for competitive track, leave empty otherwise." },
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
  required: ['word', 'meaning_bangla', 'synonyms', 'antonyms', 'examples'],
};

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const fetchCategorizedWords = async (count: number, goal: LearningGoal): Promise<Word[]> => {
  try {
    const ai = getAI();
    let trackInstructions = "";

    switch (goal) {
      case 'general':
        trackInstructions = "Basic to intermediate daily life English. Focus on common words used in everyday conversations, shopping, travel, and social interactions (e.g., 'appreciate', 'sincere', 'diligent'). Sentences should be simple and practical.";
        break;
      case 'competitive':
        trackInstructions = "Words specifically from previous Bangladesh Civil Service (BCS) exams (e.g., BCS-10, BCS-43), Bank Job exams, and University Admission tests (e.g., CU-24, RU-21). For each word, include the specific exam reference in the 'reference' field.";
        break;
      case 'ielts':
        trackInstructions = "Academic and high-level vocabulary necessary for scoring IELTS Band 7.5 or higher. Focus on words suitable for Writing Task 2 and Reading.";
        break;
    }

    const prompt = `Generate ${count} English vocabulary words for Bangladeshi students in the "${goal}" track.
    Context: ${trackInstructions}
    For each word, provide:
    1. Primary Bangla meaning.
    2. A specific exam reference tag (like BCS-43, Bank, DU-22) IF the track is 'competitive'.
    3. 3 Synonyms with Bangla meanings.
    4. 3 Antonyms with Bangla meanings.
    5. 3-4 example sentences where EACH sentence MUST have both an English version and its accurate Bangla translation.`;

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

export const fetchSingleWordDetails = async (word: string): Promise<Word> => {
  const ai = getAI();
  const prompt = `Provide detailed information for the English word: "${word}".
    Include:
    1. Primary Bangla meaning.
    2. 3 Synonyms with Bangla meanings.
    3. 3 Antonyms with Bangla meanings.
    4. 3-4 example sentences where EACH sentence MUST have both an English version and its accurate Bangla translation.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: wordSchema,
    },
  });

  if (!response.text) {
    throw new Error("No response from AI");
  }

  return JSON.parse(response.text.trim()) as Word;
};

export const generateStoryFromWords = async (words: string[]): Promise<string> => {
    try {
        const ai = getAI();
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: `Write a 100-word engaging story in English using these specific words: ${words.join(', ')}. Then, provide a 1-sentence Bangla summary of the story at the end.`,
        });
        return response.text.trim();
    } catch (error) {
        return "Your daily context story is being prepared...";
    }
};
