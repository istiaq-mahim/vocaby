
import React, { useState, useEffect, useCallback } from 'react';
import { getDailyWords } from '../services/wordService';
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
  const [loading, setLoading] = useState(false);
  const [limitReached, setLimitReached] = useState(false);

  const fetchWords = useCallback(async () => {
    setLoading(true);
    try {
      // Pass the user object to differentiate between Guest and Auth'd sessions
      const words = await getDailyWords(settings.wordCount, user);
      setDailyWords(words);
      addWordsToVocabulary(words);
      if (words.length >= 10) setLimitReached(true);
    } catch (e) {
      console.error("Failed to generate words:", e);
      // Fallback: If everything fails, alert the user
      if (!user.isGuest) {
        alert("Authentication error. Try 'Continue as Guest' on the landing page if Google Login is not configured.");
      }
    } finally {
      setLoading(false);
    }
  }, [settings.wordCount, addWordsToVocabulary, user]);

  useEffect(() => {
    // If we have no words, try to fetch them automatically
    if (dailyWords.length === 0 && !loading) {
      // Small delay to ensure UI is ready
      const timer = setTimeout(() => {
        fetchWords();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const progress = Math.min((dailyWords.length / settings.wordCount) * 100, 100);

  return (
    <div className="space-y-10">
      
      {/* Motivational Header */}
      <div className="p-8 md:p-10 card-gradient rounded-4xl text-white shadow-2xl shadow-primary/30 relative overflow-hidden flex flex-col md:flex-row items-center gap-8 animate-slide-up">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
        
        <div className="flex-grow space-y-3 text-center md:text-left relative z-10">
            <h1 className="text-4xl md:text-5xl font-display font-black tracking-tighter">Daily Focus</h1>
            <p className="text-lg text-white/80 font-medium leading-relaxed">
               আজকের {settings.wordCount}টি শব্দ শেখার জন্য প্রস্তুত? 
               <span className="block text-sm opacity-60 mt-1">Consistency is the secret to IELTS success.</span>
            </p>
        </div>

        <div className="relative flex-shrink-0 z-10">
            <svg className="w-32 h-32 transform -rotate-90">
                <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-white/20" />
                <circle 
                    cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="10" fill="transparent" 
                    strokeDasharray={364.4}
                    strokeDashoffset={364.4 - (364.4 * progress) / 100}
                    className="text-white transition-all duration-1000 ease-out"
                    strokeLinecap="round"
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-black">{Math.round(progress)}%</span>
                <span className="text-[10px] font-bold uppercase opacity-70">Goal</span>
            </div>
        </div>
      </div>

      {loading ? (
        <div className="grid gap-6">
            <WordCardSkeleton />
            <WordCardSkeleton />
        </div>
      ) : (
        <div className="grid gap-8">
          {dailyWords.length > 0 ? (
            <>
              {dailyWords.map((word, i) => (
                <div key={i} className="animate-slide-up" style={{ animationDelay: `${i * 150}ms` }}>
                  <WordCard wordData={word} />
                </div>
              ))}
              
              <div className="pt-4">
                <StoryCard 
                    story="Mastering these words today sets a strong foundation for your writing and speaking tests. Try using them in your next practice essay." 
                    words={dailyWords.map(w => w.word)} 
                />
              </div>

              {limitReached && (
                <div className="p-10 glass rounded-4xl text-center border-2 border-primary/20 bg-primary/5">
                    <span className="text-5xl mb-4 block">🎯</span>
                    <h3 className="text-2xl font-display font-black text-primary">Daily Focus Achieved!</h3>
                    <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-md mx-auto">You've hit today's high-retention limit. Focus on mastering these words before learning more.</p>
                </div>
              )}
            </>
          ) : (
            <div className="p-20 text-center glass rounded-4xl border-2 border-dashed border-slate-200 dark:border-slate-800">
                <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-6">🗓️</div>
                <h3 className="text-2xl font-display font-bold">Waiting for your first words</h3>
                <p className="text-slate-400 mt-2 mb-8">Click below to generate your curated vocabulary list powered by AI.</p>
                <button 
                    onClick={fetchWords}
                    className="px-10 py-5 card-gradient text-white font-black text-lg rounded-2xl shadow-xl shadow-primary/30 hover:scale-105 transition-all flex items-center gap-3 mx-auto"
                >
                    ✨ Generate Today's Words
                </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DailyWords;
