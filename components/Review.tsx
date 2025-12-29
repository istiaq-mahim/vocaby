
import React, { useState, useMemo, useCallback } from 'react';
import type { LearnedWord } from '../types';
import WordCard from './WordCard';
import { calculateNextReview, PerformanceRating } from '../services/srsService';
import { CheckCircleIcon } from './icons/CheckCircleIcon';

interface ReviewProps {
  vocabulary: LearnedWord[];
  updateWordSrs: (word: LearnedWord, newSrsData: { srsLevel: number; nextReview: string }) => void;
}

const Review: React.FC<ReviewProps> = ({ vocabulary, updateWordSrs }) => {
  const getToday = () => new Date().toISOString().split('T')[0];

  const wordsToReview = useMemo(() => {
    const today = getToday();
    // Filter for words due for review and shuffle them
    return vocabulary
      .filter(word => (word.nextReview || '9999-12-31') <= today)
      .sort(() => Math.random() - 0.5);
  }, [vocabulary]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  
  const currentWord = wordsToReview[currentIndex];
  
  const handleNextWord = useCallback((rating: PerformanceRating) => {
    if (!currentWord) return;

    const newSrsData = calculateNextReview(currentWord, rating);
    updateWordSrs(currentWord, newSrsData);
    
    setIsRevealed(false);
    setCurrentIndex(prev => prev + 1);
  }, [currentWord, updateWordSrs]);
  
  if (wordsToReview.length === 0) {
    return (
      <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm dark:border dark:border-gray-700 animate-fade-in">
        <h1 className="text-3xl font-bold text-textDark dark:text-gray-100 mb-2">All Caught Up!</h1>
        <p className="text-textLight dark:text-gray-400">You have no words to review today. Come back tomorrow or learn some new words!</p>
      </div>
    );
  }

  if (currentIndex >= wordsToReview.length) {
    return (
      <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm dark:border dark:border-gray-700 animate-fade-in flex flex-col items-center">
        <CheckCircleIcon />
        <h1 className="text-3xl font-bold text-textDark dark:text-gray-100 mt-4 mb-2">Review Complete!</h1>
        <p className="text-textLight dark:text-gray-400">Great job! You've reviewed all your words for today.</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-bold text-textDark dark:text-gray-100 mb-1">Review Session</h1>
      <p className="text-textLight dark:text-gray-400 mb-6">
        {wordsToReview.length - currentIndex} word{wordsToReview.length - currentIndex !== 1 ? 's' : ''} left to review.
      </p>

      <div className="space-y-4">
        {/* Flashcard */}
        {!isRevealed ? (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-none dark:border dark:border-gray-700 p-5 min-h-[200px] flex flex-col justify-center items-center">
                <h2 className="text-4xl font-bold text-primary capitalize">{currentWord.word}</h2>
                <button
                    onClick={() => setIsRevealed(true)}
                    className="mt-8 bg-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Show Meaning
                </button>
            </div>
        ) : (
            <div>
                <WordCard wordData={currentWord} />
                <div className="mt-4 grid grid-cols-3 gap-3">
                    <button
                        onClick={() => handleNextWord('hard')}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg transition-colors"
                    >
                        Hard
                    </button>
                    <button
                        onClick={() => handleNextWord('good')}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-colors"
                    >
                        Good
                    </button>
                    <button
                        onClick={() => handleNextWord('easy')}
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition-colors"
                    >
                        Easy
                    </button>
                </div>
                 <p className="text-xs text-center text-textLight dark:text-gray-500 mt-2">How well did you remember this word?</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default Review;
