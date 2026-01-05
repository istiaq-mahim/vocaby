
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
  const [loading, setLoading] = useState(true);

  // Load session whenever settings change
  const loadSession = useCallback(async () => {
    setLoading(true);
    try {
      const { words, story: generatedStory } = await getDailySession(
        settings.goal, 
        settings.wordCount, 
        settings.age
      );
      setDailyWords(words);
      setStory(generatedStory);
      addWordsToVocabulary(words);
    } catch (e) {
      console.error("Session load error:", e);
    } finally {
      setLoading(false);
    }
  }, [settings.goal, settings.wordCount, settings.age, addWordsToVocabulary]);

  useEffect(() => {
    loadSession();
  }, [loadSession]);

  const goalInfo = {
    ielts: { title: 'IELTS Mastery', tag: 'Academic Track' },
    competitive: { title: 'Exam Excellence', tag: 'BCS, Bank & Admission' },
    general: { title: 'Social Smart', tag: 'Situational English' }
  }[settings.goal];

  return (
    <div className="space-y-8 pb-10">
      <div className="mb-8 px-2 animate-in transition-all">
        <div className="flex justify-between items-end mb-2">
            <div>
              <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
                {goalInfo.title}
              </h1>
              <p className="text-xs text-slate-400 mt-1 font-bold uppercase tracking-wider">Hi, {settings.nickname} 👋</p>
            </div>
            <span className="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest border border-primary/20">
                {goalInfo.tag}
            </span>
        </div>
        <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">
            Category Session: <span className="text-primary font-bold">{settings.wordCount} new words</span>
        </p>
      </div>

      {loading ? (
        <div className="grid gap-6">
            <WordCardSkeleton />
            <WordCardSkeleton />
        </div>
      ) : (
        <div className="space-y-8">
          {dailyWords.map((word, i) => (
            <div key={`${word.word}-${settings.goal}-${i}`} className="animate-in" style={{ animationDelay: `${i * 100}ms` }}>
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
