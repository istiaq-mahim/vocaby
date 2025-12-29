
import React, { useState, useMemo, useCallback } from 'react';
import type { LearnedWord } from '../types';
import WordCard from './WordCard';
import { calculateNextReview, PerformanceRating } from '../services/srsService';

interface ReviewProps {
  vocabulary: LearnedWord[];
  updateWordSrs: (word: LearnedWord, newSrsData: { srsLevel: number; nextReview: string }) => void;
}

const Review: React.FC<ReviewProps> = ({ vocabulary, updateWordSrs }) => {
  const getToday = () => new Date().toISOString().split('T')[0];

  const wordsToReview = useMemo(() => {
    const today = getToday();
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
  
  if (wordsToReview.length === 0 || currentIndex >= wordsToReview.length) {
    return (
      <div className="text-center p-12 bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700">
        <h1 className="text-2xl font-bold mb-2">Great job!</h1>
        <p className="text-gray-500">You've reviewed all pending words for today.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Review</h2>
        <span className="text-sm font-bold text-primary">{wordsToReview.length - currentIndex} Left</span>
      </div>

      <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl border border-gray-100 dark:border-gray-700 text-center min-h-[300px] flex flex-col justify-center items-center">
        {!isRevealed ? (
          <>
            <h3 className="text-4xl font-bold mb-6">{currentWord.word}</h3>
            <button 
              onClick={() => setIsRevealed(true)}
              className="px-6 py-2 bg-primary text-white font-bold rounded-xl"
            >
              Show Meaning
            </button>
          </>
        ) : (
          <div className="w-full text-left">
            <WordCard wordData={currentWord} />
            <div className="grid grid-cols-3 gap-3 mt-6">
              <button onClick={() => handleNextWord('hard')} className="p-3 bg-red-50 text-red-600 font-bold rounded-xl border border-red-100">Hard</button>
              <button onClick={() => handleNextWord('good')} className="p-3 bg-blue-50 text-blue-600 font-bold rounded-xl border border-blue-100">Good</button>
              <button onClick={() => handleNextWord('easy')} className="p-3 bg-green-50 text-green-600 font-bold rounded-xl border border-green-100">Easy</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Review;
