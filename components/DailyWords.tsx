
import React, { useState, useEffect, useCallback } from 'react';
import { getDailyWords } from '../services/wordService';
import { generateStoryFromWords } from '../services/geminiService';
import WordCard from './WordCard';
import WordCardSkeleton from './WordCardSkeleton';
import StoryCard from './StoryCard';
import StoryCardSkeleton from './StoryCardSkeleton';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { Word, Settings } from '../types';
import { LAST_FETCH_DATE_KEY, DAILY_WORDS_KEY } from '../constants';

interface DailyWordsProps {
  settings: Settings;
  addWordsToVocabulary: (words: Word[]) => void;
}

const DailyWords: React.FC<DailyWordsProps> = ({ settings, addWordsToVocabulary }) => {
  const [dailyWords, setDailyWords] = useLocalStorage<Word[]>(DAILY_WORDS_KEY, []);
  const [error, setError] = useState<string | null>(null);
  const [lastFetchDate, setLastFetchDate] = useLocalStorage<string | null>(LAST_FETCH_DATE_KEY, null);
  
  const getTodayDateString = () => new Date().toISOString().split('T')[0];
  
  const [wordsLoading, setWordsLoading] = useState(() => lastFetchDate !== getTodayDateString());
  const [story, setStory] = useState<string | null>(null);
  const [storyLoading, setStoryLoading] = useState(false);

  const loadWords = useCallback(async () => {
    setWordsLoading(true);
    setError(null);
    try {
      const words = await getDailyWords(settings.wordCount);
      setDailyWords(words);
      addWordsToVocabulary(words);
      setLastFetchDate(getTodayDateString());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setDailyWords([]); // Clear stale words on error
    } finally {
      setWordsLoading(false);
    }
  }, [settings.wordCount, addWordsToVocabulary, setLastFetchDate, setDailyWords]);
  
  // Effect for fetching words if they are not cached for today
  useEffect(() => {
    const today = getTodayDateString();
    if (lastFetchDate !== today) {
      loadWords();
    }
  }, [lastFetchDate, loadWords]);
  
  // Effect for fetching the story, depends on dailyWords
  useEffect(() => {
    const fetchStory = async () => {
        if (dailyWords && dailyWords.length > 0) {
            setStoryLoading(true);
            setStory(null);
            const wordStrings = dailyWords.map(w => w.word);
            const generatedStory = await generateStoryFromWords(wordStrings);
            setStory(generatedStory);
            setStoryLoading(false);
        } else {
            setStory(null);
            setStoryLoading(false);
        }
    };
    
    if (!wordsLoading) {
        fetchStory();
    }
  }, [dailyWords, wordsLoading]);


  return (
    <div>
      <h1 className="text-3xl font-bold text-textDark dark:text-gray-100 mb-1">Today's Words</h1>
      <p className="text-textLight dark:text-gray-400 mb-6">Your daily dose of vocabulary to keep you going.</p>
      
      {wordsLoading && (
        <div className="space-y-4">
          {Array.from({ length: settings.wordCount > 0 ? settings.wordCount : 5 }).map((_, index) => (
            <WordCardSkeleton key={index} />
          ))}
        </div>
      )}
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">{error}</div>}
      
      {!wordsLoading && !error && (
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
        </>
      )}
    </div>
  );
};

export default DailyWords;
