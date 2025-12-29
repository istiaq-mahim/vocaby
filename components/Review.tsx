
import React, { useState, useMemo, useCallback } from 'react';
import type { LearnedWord, Word } from '../types';
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

  const [sessionStarted, setSessionStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  
  const currentWord = wordsToReview[currentIndex];

  // Generate exactly 4 options for MCQ
  const options = useMemo(() => {
    if (!currentWord) return [];
    const correct = currentWord.meaning_bangla;
    
    // Get all other unique meanings in the system to use as distractors
    const pool = JSON.parse(localStorage.getItem('vocaby_word_pool') || '[]') as Word[];
    const allMeanings = Array.from(new Set([
      ...vocabulary.map(w => w.meaning_bangla),
      ...pool.map(p => p.meaning_bangla)
    ])).filter(m => m !== correct);
    
    // Shuffle and pick 3 wrong ones
    const wrong = allMeanings.sort(() => 0.5 - Math.random()).slice(0, 3);
    
    // If we don't have enough distractors, add some generic ones
    while (wrong.length < 3) {
      wrong.push(`Option ${wrong.length + 1}`);
    }

    return [correct, ...wrong].sort(() => 0.5 - Math.random());
  }, [currentWord, vocabulary]);
  
  const handleOptionSelect = (option: string) => {
    if (selectedOption) return; // Only allow one selection
    setSelectedOption(option);
    const correct = option === currentWord.meaning_bangla;
    setIsCorrect(correct);
    
    // Auto-reveal after a short delay for feedback
    setTimeout(() => {
      setIsRevealed(true);
    }, 800);
  };

  const handleNextWord = (rating: PerformanceRating) => {
    const newSrsData = calculateNextReview(currentWord, rating);
    updateWordSrs(currentWord, newSrsData);
    setIsRevealed(false);
    setSelectedOption(null);
    setIsCorrect(null);
    setCurrentIndex(prev => prev + 1);
  };
  
  if (wordsToReview.length === 0) {
    return (
      <div className="text-center p-12 bg-white dark:bg-gray-800 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 shadow-xl">
        <div className="text-5xl mb-4">🎉</div>
        <h1 className="text-2xl font-black mb-2">Inbox Zero!</h1>
        <p className="text-gray-500">You've reviewed all pending words for today.</p>
      </div>
    );
  }

  if (!sessionStarted) {
    return (
      <div className="animate-in space-y-6">
        <div className="bg-white dark:bg-gray-800 p-10 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 shadow-xl text-center">
          <div className="text-6xl mb-6">🎯</div>
          <h2 className="text-3xl font-black mb-2">Knowledge Check</h2>
          <p className="text-slate-500 mb-10 text-lg">
            Ready to test your memory on <strong>{wordsToReview.length}</strong> words?
          </p>
          <button 
            onClick={() => setSessionStarted(true)}
            className="w-full py-5 bg-primary text-white font-bold rounded-2xl text-xl hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-blue-500/20"
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  if (currentIndex >= wordsToReview.length) {
    return (
      <div className="text-center p-12 bg-white dark:bg-gray-800 rounded-[3rem] border border-gray-100 dark:border-gray-700 shadow-2xl animate-in">
        <div className="text-6xl mb-6">🏆</div>
        <h1 className="text-3xl font-black mb-2">Goal Achieved!</h1>
        <p className="text-slate-500 mb-10 text-lg">You've successfully completed your revision session.</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-12 py-4 bg-primary text-white font-bold rounded-2xl text-lg hover:scale-105 transition-all"
        >
          Finish Session
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center px-4">
        <h2 className="text-xl font-black text-slate-800 dark:text-white">Revision Mode</h2>
        <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Progress</span>
            <span className="text-sm font-black bg-blue-100 text-primary px-4 py-1.5 rounded-full">
            {currentIndex + 1} / {wordsToReview.length}
            </span>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-8 rounded-[3rem] border border-gray-100 dark:border-gray-700 shadow-xl text-center min-h-[450px] flex flex-col justify-center items-center animate-in relative overflow-hidden">
        {!isRevealed ? (
          <>
            <div className="mb-10">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.3em] mb-4">What does this mean?</p>
                <h3 className="text-5xl font-black text-slate-900 dark:text-white tracking-tight">{currentWord.word}</h3>
            </div>
            
            <div className="grid grid-cols-1 gap-3 w-full max-w-sm">
                {options.map((option, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleOptionSelect(option)}
                        disabled={!!selectedOption}
                        className={`py-4 px-6 rounded-2xl text-xl font-bold border-2 transition-all duration-300 bangla-text ${
                            selectedOption === option 
                                ? (option === currentWord.meaning_bangla ? 'bg-green-500 border-green-500 text-white shadow-lg' : 'bg-red-500 border-red-500 text-white shadow-lg')
                                : (selectedOption && option === currentWord.meaning_bangla ? 'bg-green-100 border-green-500 text-green-700' : 'bg-slate-50 border-slate-100 text-slate-700 hover:border-primary/50 hover:bg-white')
                        }`}
                    >
                        {option}
                    </button>
                ))}
            </div>
          </>
        ) : (
          <div className="w-full text-left space-y-8 animate-in">
            <div className={`p-4 rounded-2xl text-center font-bold mb-4 ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {isCorrect ? '✨ Correct! Memory strength increased.' : '📚 Reviewing: Let\'s look at the details.'}
            </div>
            
            <WordCard wordData={currentWord} />
            
            <div className="pt-6 border-t border-slate-50 dark:border-gray-700">
              <p className="text-center text-xs font-bold text-slate-400 mb-6 uppercase tracking-[0.2em]">Self-Rate Proficiency</p>
              <div className="grid grid-cols-3 gap-3">
                <button 
                  onClick={() => handleNextWord('hard')} 
                  className="flex flex-col items-center gap-2 p-5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-bold rounded-2xl border border-red-100 dark:border-red-900/30 hover:bg-red-100 transition-all hover:-translate-y-1"
                >
                  <span className="text-2xl">😫</span>
                  <span className="text-[10px] uppercase tracking-wider">Again</span>
                </button>
                <button 
                  onClick={() => handleNextWord('good')} 
                  className="flex flex-col items-center gap-2 p-5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-bold rounded-2xl border border-blue-100 dark:border-blue-900/30 hover:bg-blue-100 transition-all hover:-translate-y-1"
                >
                  <span className="text-2xl">😊</span>
                  <span className="text-[10px] uppercase tracking-wider">Good</span>
                </button>
                <button 
                  onClick={() => handleNextWord('easy')} 
                  className="flex flex-col items-center gap-2 p-5 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 font-bold rounded-2xl border border-green-100 dark:border-green-900/30 hover:bg-green-100 transition-all hover:-translate-y-1"
                >
                  <span className="text-2xl">🤩</span>
                  <span className="text-[10px] uppercase tracking-wider">Easy</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Review;
