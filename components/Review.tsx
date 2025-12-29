
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

  // Generate 4 randomized options for the MCQ
  const options = useMemo(() => {
    if (!currentWord) return [];
    const correct = currentWord.meaning_bangla;
    
    // Distractor pool from vocabulary and cached pool
    const pool = JSON.parse(localStorage.getItem('vocaby_word_pool') || '[]') as Word[];
    const allMeanings = Array.from(new Set([
      ...vocabulary.map(w => w.meaning_bangla),
      ...pool.map(p => p.meaning_bangla)
    ])).filter(m => m !== correct);
    
    // Pick 3 random wrong answers
    const wrong = allMeanings.sort(() => 0.5 - Math.random()).slice(0, 3);
    
    // Fallback distractors if system is too new
    while (wrong.length < 3) {
      wrong.push(`Option ${wrong.length + 1}`);
    }

    return [correct, ...wrong].sort(() => 0.5 - Math.random());
  }, [currentWord, vocabulary]);
  
  const handleOptionSelect = (option: string) => {
    if (selectedOption) return;
    setSelectedOption(option);
    const correct = option === currentWord.meaning_bangla;
    setIsCorrect(correct);
    
    // Auto-reveal the full card after a feedback delay
    setTimeout(() => {
      setIsRevealed(true);
    }, 1000);
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
      <div className="text-center p-12 bg-white dark:bg-gray-800 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 shadow-xl animate-in">
        <div className="text-6xl mb-6">🌟</div>
        <h1 className="text-3xl font-black mb-2 text-primary">All Clear!</h1>
        <p className="text-gray-500 text-lg leading-relaxed">You have reviewed all pending words for today. Great dedication!</p>
      </div>
    );
  }

  if (!sessionStarted) {
    return (
      <div className="animate-in space-y-6">
        <div className="bg-white dark:bg-gray-800 p-12 rounded-[3rem] border border-gray-100 dark:border-gray-700 shadow-2xl text-center">
          <div className="text-7xl mb-6">📚</div>
          <h2 className="text-3xl font-black mb-2">Ready to Review?</h2>
          <p className="text-slate-500 mb-10 text-lg">
            We have <strong>{wordsToReview.length}</strong> words to strengthen in your memory.
          </p>
          <button 
            onClick={() => setSessionStarted(true)}
            className="w-full py-5 bg-primary text-white font-black rounded-2xl text-xl hover:scale-[1.03] active:scale-95 transition-all shadow-xl shadow-blue-500/30"
          >
            Start Quiz Session
          </button>
        </div>
      </div>
    );
  }

  if (currentIndex >= wordsToReview.length) {
    return (
      <div className="text-center p-12 bg-white dark:bg-gray-800 rounded-[3rem] border border-gray-100 dark:border-gray-700 shadow-2xl animate-in">
        <div className="text-7xl mb-6">🏆</div>
        <h1 className="text-4xl font-black mb-2 text-primary">Session Over!</h1>
        <p className="text-slate-500 mb-10 text-lg">You've successfully mastered your daily revision target.</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-14 py-4 bg-primary text-white font-black rounded-2xl text-lg hover:scale-105 transition-all shadow-lg"
        >
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center px-4">
        <div>
            <h2 className="text-xl font-black text-slate-800 dark:text-white">Active Quiz</h2>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Select the correct Bangla meaning</p>
        </div>
        <div className="text-sm font-black bg-blue-100 text-primary px-5 py-2 rounded-full">
            {currentIndex + 1} / {wordsToReview.length}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-8 rounded-[3.5rem] border border-gray-100 dark:border-gray-700 shadow-2xl text-center min-h-[500px] flex flex-col justify-center items-center animate-in relative overflow-hidden">
        {!isRevealed ? (
          <>
            <div className="mb-12">
                <h3 className="text-6xl font-black text-slate-900 dark:text-white tracking-tighter mb-4">{currentWord.word}</h3>
                <div className="w-16 h-1 bg-primary/10 mx-auto rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 gap-4 w-full max-w-sm">
                {options.map((option, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleOptionSelect(option)}
                        disabled={!!selectedOption}
                        className={`py-5 px-6 rounded-2xl text-xl font-black border-2 transition-all duration-300 bangla-text shadow-sm ${
                            selectedOption === option 
                                ? (option === currentWord.meaning_bangla ? 'bg-green-500 border-green-500 text-white scale-105 shadow-xl' : 'bg-red-500 border-red-500 text-white scale-95 opacity-80')
                                : (selectedOption && option === currentWord.meaning_bangla ? 'bg-green-50 border-green-500 text-green-700' : 'bg-slate-50 border-slate-100 text-slate-700 hover:border-primary/50 hover:bg-white hover:shadow-md')
                        }`}
                    >
                        {option}
                    </button>
                ))}
            </div>
          </>
        ) : (
          <div className="w-full text-left space-y-8 animate-in">
            <div className={`p-4 rounded-3xl text-center font-black text-lg ${isCorrect ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
                {isCorrect ? '✨ Perfect! That\'s the right meaning.' : '📚 Don\'t worry! Repetition builds mastery.'}
            </div>
            
            <WordCard wordData={currentWord} />
            
            <div className="pt-8 border-t border-slate-50 dark:border-gray-700">
              <p className="text-center text-xs font-bold text-slate-400 mb-6 uppercase tracking-[0.3em]">Update Learning Level</p>
              <div className="grid grid-cols-3 gap-4">
                <button 
                  onClick={() => handleNextWord('hard')} 
                  className="flex flex-col items-center gap-2 p-6 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-black rounded-3xl border border-red-100 dark:border-red-900/30 hover:bg-red-100 transition-all hover:-translate-y-1 active:scale-95"
                >
                  <span className="text-3xl mb-1">😫</span>
                  <span className="text-[10px] uppercase tracking-wider">Forgot</span>
                </button>
                <button 
                  onClick={() => handleNextWord('good')} 
                  className="flex flex-col items-center gap-2 p-6 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-black rounded-3xl border border-blue-100 dark:border-blue-900/30 hover:bg-blue-100 transition-all hover:-translate-y-1 active:scale-95"
                >
                  <span className="text-3xl mb-1">😊</span>
                  <span className="text-[10px] uppercase tracking-wider">Okay</span>
                </button>
                <button 
                  onClick={() => handleNextWord('easy')} 
                  className="flex flex-col items-center gap-2 p-6 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 font-black rounded-3xl border border-green-100 dark:border-green-900/30 hover:bg-green-100 transition-all hover:-translate-y-1 active:scale-95"
                >
                  <span className="text-3xl mb-1">🤩</span>
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
