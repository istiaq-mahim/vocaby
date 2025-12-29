
import React, { useState, useEffect, useCallback } from 'react';
import { getDailyWords } from '../services/wordService';
import { generateStoryFromWords } from '../services/geminiService';
import WordCard from './WordCard';
import WordCardSkeleton from './WordCardSkeleton';
import StoryCard from './StoryCard';
import type { Word, Settings } from '../types';

interface DailyWordsProps {
  settings: Settings;
  addWordsToVocabulary: (words: Word[]) => void;
  user: { name: string; email: string; isGuest?: boolean };
}

const DailyWords: React.FC<DailyWordsProps> = ({ settings, addWordsToVocabulary, user }) => {
  const [dailyWords, setDailyWords] = useState<Word[]>([]);
  const [story, setStory] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const fetchWords = useCallback(async () => {
    setLoading(true);
    try {
      const words = await getDailyWords(settings.wordCount, user);
      setDailyWords(words);
      addWordsToVocabulary(words);
      
      // Generate story after words are fetched
      const wordStrings = words.map(w => w.word);
      const generatedStory = await generateStoryFromWords(wordStrings);
      setStory(generatedStory);
      
    } catch (e) {
      console.error("Failed to generate content:", e);
    } finally {
      setLoading(false);
    }
  }, [settings.wordCount, addWordsToVocabulary, user]);

  useEffect(() => {
    if (dailyWords.length === 0 && !loading) {
      fetchWords();
    }
  }, []);

  return (
    <div className="space-y-8 pb-10">
      <div className="mb-6">
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2">Today's Words</h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg">Your daily dose of vocabulary to keep you going.</p>
      </div>

      {loading ? (
        <div className="grid gap-6">
            <WordCardSkeleton />
            <WordCardSkeleton />
        </div>
      ) : (
        <div className="space-y-6">
          {dailyWords.map((word, i) => (
            <div key={i} className="animate-in" style={{ animationDelay: `${i * 100}ms` }}>
              <WordCard wordData={word} />
            </div>
          ))}
          
          {story && (
            <div className="animate-in" style={{ animationDelay: `${dailyWords.length * 100}ms` }}>
              <StoryCard 
                story={story} 
                words={dailyWords.map(w => w.word)} 
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DailyWords;
