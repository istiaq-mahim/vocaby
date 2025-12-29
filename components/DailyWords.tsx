
import React, { useState, useEffect, useCallback } from 'react';
import { getDailyWords, clearDailyCache } from '../services/wordService';
import { generateStoryFromWords } from '../services/geminiService';
import WordCard from './WordCard';
import WordCardSkeleton from './WordCardSkeleton';
import StoryCard from './StoryCard';
import StoryCardSkeleton from './StoryCardSkeleton';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { Word, Settings } from '../types';
import { LAST_FETCH_DATE_KEY, DAILY_WORDS_KEY } from '../constants';
import { SparklesIcon } from './icons/SparklesIcon';
import { RepeatIcon } from './icons/RepeatIcon';

interface DailyWordsProps {
  settings: Settings;
  addWordsToVocabulary: (words: Word[]) => void;
}

const DailyWords: React.FC<DailyWordsProps> = ({ settings, addWordsToVocabulary }) => {
  const [dailyWords, setDailyWords] = useLocalStorage<Word[]>(DAILY_WORDS_KEY, []);
  const [error, setError] = useState<string | null>(null);
  const [lastFetchDate, setLastFetchDate] = useLocalStorage<string | null>(LAST_FETCH_DATE_KEY, null);
  
  const getTodayDateString = () => new Date().toISOString().split('T')[0];
  
  const [wordsLoading, setWordsLoading] = useState(false);
  const [story, setStory] = useState<string | null>(null);
  const [storyLoading, setStoryLoading] = useState(false);

  const loadWords = useCallback(async (isForced = false) => {
    setWordsLoading(true);
    setError(null);
    try {
      if (isForced) {
        clearDailyCache();
      }
      const words = await getDailyWords(settings.wordCount);
      setDailyWords(words);
      addWordsToVocabulary(words);
      setLastFetchDate(getTodayDateString());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      // If forced, we don't want to clear old words unless the fetch succeeds, 
      // but if it's the first load of the day, they might be empty anyway.
    } finally {
      setWordsLoading(false);
    }
  }, [settings.wordCount, addWordsToVocabulary, setLastFetchDate, setDailyWords]);
  
  useEffect(() => {
    const today = getTodayDateString();
    if (lastFetchDate !== today || dailyWords.length === 0) {
      loadWords();
    }
  }, [lastFetchDate, dailyWords.length, loadWords]);
  
  useEffect(() => {
    const fetchStory = async () => {
        if (dailyWords && dailyWords.length > 0) {
            setStoryLoading(true);
            setStory(null);
            const wordStrings = dailyWords.map(w => w.word);
            try {
              const generatedStory = await generateStoryFromWords(wordStrings);
              setStory(generatedStory);
            } catch (e) {
              console.error("Story generation failed", e);
            } finally {
              setStoryLoading(false);
            }
        } else {
            setStory(null);
            setStoryLoading(false);
        }
    };
    
    if (!wordsLoading) {
        fetchStory();
    }
  }, [dailyWords, wordsLoading]);

  const handleRefresh = () => {
    if (window.confirm("Do you want to clear current words and fetch new ones from AI?")) {
      loadWords(true);
    }
  };

  const isUsingStarterWords = dailyWords.length > 0 && dailyWords.every(w => !w.isAiGenerated);

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-start mb-1">
        <h1 className="text-3xl font-bold text-textDark dark:text-gray-100">Today's Words</h1>
        <button 
          onClick={handleRefresh}
          className="p-2 text-textLight dark:text-gray-400 hover:text-primary transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          title="Refresh words from AI"
          disabled={wordsLoading}
        >
          <RepeatIcon />
        </button>
      </div>
      
      <div className="flex items-center gap-2 mb-6">
        <p className="text-textLight dark:text-gray-400">
          {isUsingStarterWords ? "Showing starter words (AI offline)." : "Personalized AI-generated words."}
        </p>
        {!isUsingStarterWords && dailyWords.length > 0 && (
          <span className="flex items-center text-xs font-bold text-amber-500 bg-amber-50 dark:bg-amber-900/20 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-800">
            <SparklesIcon /> <span className="ml-1 uppercase tracking-tight">AI Generated</span>
          </span>
        )}
      </div>
      
      {wordsLoading && (
        <div className="space-y-4">
          {Array.from({ length: settings.wordCount > 0 ? settings.wordCount : 5 }).map((_, index) => (
            <WordCardSkeleton key={index} />
          ))}
        </div>
      )}

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-400 text-red-700 dark:text-red-400 px-4 py-3 rounded-xl relative mb-4" role="alert">
          <p className="font-bold">Fetch Error</p>
          <p className="text-sm">{error}</p>
          <p className="text-xs mt-2 opacity-75 italic">Check if your API_KEY is correct in Vercel settings and that you have redeployed.</p>
        </div>
      )}
      
      {!wordsLoading && (
         <>
            <div className="space-y-4">
                {dailyWords.map((word, index) => (
                    <div key={word.word} className="opacity-0 animate-fade-in-up" style={{ animationDelay: `${index * 100}ms`}}>
                    <WordCard wordData={word} />
                    </div>
                ))}
            </div>

            {dailyWords.length > 0 && storyLoading && <StoryCardSkeleton />}

            {dailyWords.length > 0 && !storyLoading && story && (
                <StoryCard story={story} words={dailyWords.map(w => w.word)} />
            )}
            
            {dailyWords.length === 0 && !wordsLoading && !error && (
              <div className="text-center p-12 bg-white dark:bg-gray-800 rounded-2xl">
                <p className="text-textLight">No words found. Try refreshing.</p>
                <button onClick={() => loadWords(true)} className="mt-4 text-primary font-bold">Try Again</button>
              </div>
            )}
        </>
      )}
    </div>
  );
};

export default DailyWords;
