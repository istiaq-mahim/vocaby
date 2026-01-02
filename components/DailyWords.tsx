
import React, { useState, useEffect, useCallback } from 'react';
import { getDailySession } from '../services/wordService';
import WordCard from './WordCard';
import WordCardSkeleton from './WordCardSkeleton';
import StoryCard from './StoryCard';
import type { Word, Settings } from '../types';

interface DailyWordsProps {
  settings: Settings;
  addWordsToVocabulary: (words: Word[]) => void;
  user: { name: string; email: string; isGuest?: boolean };
}

const DailyWords: React.FC<DailyWordsProps> = ({ settings, addWordsToVocabulary }) => {
  const [dailyWords, setDailyWords] = useState<Word[]>([]);
  const [story, setStory] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const loadSession = useCallback(async () => {
    // Avoid re-loading if we already have it in state
    if (dailyWords.length > 0) return;

    setLoading(true);
    try {
      const { words, story: generatedStory } = await getDailySession(settings.goal, settings.wordCount);
      setDailyWords(words);
      setStory(generatedStory);
      
      // Persist to user's learned list if not already there
      addWordsToVocabulary(words);
    } catch (e) {
      console.error("Failed to load session:", e);
    } finally {
      setLoading(false);
    }
  }, [settings.goal, settings.wordCount, addWordsToVocabulary, dailyWords.length]);

  useEffect(() => {
    loadSession();
  }, [loadSession]);

  const goalTitle = settings.goal === 'ielts' ? 'IELTS Focus' : settings.goal === 'competitive' ? 'BCS & Job Prep' : 'General Practice';

  return (
    <div className="space-y-8 pb-10">
      <div className="mb-8 px-2">
        <div className="flex justify-between items-end mb-2">
            <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Today's List</h1>
            <span className="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest border border-primary/20">
                {goalTitle}
            </span>
        </div>
        <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">
            Mastering {settings.wordCount} words to reach your goal.
        </p>
      </div>

      {loading ? (
        <div className="grid gap-6">
            <WordCardSkeleton />
            <WordCardSkeleton />
            <div className="h-40 bg-white/50 dark:bg-gray-800/50 rounded-[2.5rem] animate-pulse"></div>
        </div>
      ) : (
        <div className="space-y-8">
          {dailyWords.map((word, i) => (
            <div key={`${word.word}-${i}`} className="animate-in" style={{ animationDelay: `${i * 50}ms` }}>
              <WordCard wordData={word} />
            </div>
          ))}
          
          {story && (
            <div className="animate-in" style={{ animationDelay: `${dailyWords.length * 50}ms` }}>
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
