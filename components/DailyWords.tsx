
import React, { useState, useEffect, useCallback } from 'react';
import { getDailyWords } from '../services/wordService';
import WordCard from './WordCard';
import WordCardSkeleton from './WordCardSkeleton';
import StoryCard from './StoryCard';
import type { Word, Settings } from '../types';

interface DailyWordsProps {
  settings: Settings;
  addWordsToVocabulary: (words: Word[]) => void;
}

const DailyWords: React.FC<DailyWordsProps> = ({ settings, addWordsToVocabulary }) => {
  const [dailyWords, setDailyWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(false);
  const [isNewGeneration, setIsNewGeneration] = useState(false);

  const fetchWords = useCallback(async () => {
    setLoading(true);
    try {
      const words = await getDailyWords(settings.wordCount);
      setDailyWords(words);
      addWordsToVocabulary(words);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [settings.wordCount, addWordsToVocabulary]);

  useEffect(() => {
    fetchWords();
  }, [fetchWords]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">Daily Focus</h1>
        <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green-500"></span>
            <p className="text-sm text-textLight dark:text-gray-400">
                You've received your {dailyWords.length} words for today. Focused learning helps retention!
            </p>
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
            <WordCardSkeleton />
            <WordCardSkeleton />
        </div>
      ) : (
        <div className="grid gap-4">
          {dailyWords.map((word, i) => (
            <div key={i} className="animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
                <WordCard wordData={word} />
            </div>
          ))}
          
          {dailyWords.length > 0 && (
             <StoryCard story="Learning consistent amounts daily is scientifically proven to build a better vocabulary for IELTS." words={[]} />
          )}
        </div>
      )}
    </div>
  );
};

export default DailyWords;
