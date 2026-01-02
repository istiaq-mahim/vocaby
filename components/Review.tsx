
import React, { useState, useMemo } from 'react';
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

  // Distractor logic: 1 correct + 3 random from any category pool or vocabulary
  const options = useMemo(() => {
    if (!currentWord) return [];
    const correct = currentWord.meaning_bangla;
    
    // Aggregate meanings for distractors
    const poolKeys = ['vocaby_pool_v2_ielts', 'vocaby_pool_v2_general', 'vocaby_pool_v2_competitive'];
    let allMeanings: string[] = vocabulary.map(v => v.meaning_bangla);
    
    poolKeys.forEach(key => {
        const pool: Word[] = JSON.parse(localStorage.getItem(key) || '[]');
        allMeanings = [...allMeanings, ...pool.map(p => p.meaning_bangla)];
    });

    const distractors = Array.from(new Set(allMeanings))
        .filter(m => m !== correct)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
    
    // Final check for enough distractors
    while (distractors.length < 3) {
      distractors.push(`Option ${distractors.length + 1}`);
    }

    return [correct, ...distractors].sort(() => 0.5 - Math.random());
  }, [currentWord, vocabulary]);
  
  const handleOptionSelect = (option: string) => {
    if (selectedOption) return;
    setSelectedOption(option);
    const correct = option === currentWord.meaning_bangla;
    setIsCorrect(correct);
    
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
      <div className="text-center p-12 bg-white dark:bg-gray-800 rounded-[3rem] border border-gray-100 dark:border-gray-700 shadow-xl animate-in">
        <div className="text-7xl mb-6">🎯</div>
        <h1 className="text-3xl font-black mb-2 text-primary">Great Job!</h1>
        <p className="text-gray-500 text-lg">No pending reviews. Come back tomorrow!</p>
      </div>
    );
  }

  if (!sessionStarted) {
    return (
      <div className="animate-in space-y-6">
        <div className="bg-white dark:bg-gray-800 p-12 rounded-[3.5rem] border border-gray-100 dark:border-gray-700 shadow-2xl text-center">
          <div className="text-8xl mb-8">🧠</div>
          <h2 className="text-4xl font-black mb-3">Recall Session</h2>
          <p className="text-slate-500 mb-12 text-xl">
            You have <strong>{wordsToReview.length}</strong> words due for practice.
          </p>
          <button 
            onClick={() => setSessionStarted(true)}
            className="w-full py-6 bg-primary text-white font-black rounded-3xl text-2xl hover:scale-[1.03] active:scale-95 transition-all shadow-xl shadow-blue-500/30"
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
        <div className="text-8xl mb-8">🏅</div>
        <h1 className="text-4xl font-black mb-4 text-primary">Well Done!</h1>
        <p className="text-slate-500 mb-12 text-xl">You've finished today's review session.</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-16 py-5 bg-primary text-white font-black rounded-[2rem] text-xl hover:scale-105 transition-all shadow-lg"
        >
          Finish
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center px-6">
        <h2 className="text-2xl font-black text-slate-800 dark:text-white">Revision</h2>
        <div className="text-sm font-black bg-blue-100 text-primary px-5 py-2 rounded-full">
            {currentIndex + 1} / {wordsToReview.length}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-10 rounded-[3.5rem] border border-gray-100 dark:border-gray-700 shadow-2xl text-center min-h-[550px] flex flex-col justify-center items-center animate-in relative overflow-hidden">
        {!isRevealed ? (
          <>
            <div className="mb-14">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.4em] mb-4">Select Meaning</p>
                <h3 className="text-6xl font-black text-slate-900 dark:text-white tracking-tighter">{currentWord.word}</h3>
            </div>
            
            <div className="grid grid-cols-1 gap-4 w-full max-w-sm">
                {options.map((option, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleOptionSelect(option)}
                        disabled={!!selectedOption}
                        className={`py-5 px-6 rounded-3xl text-2xl font-black border-2 transition-all duration-300 bangla-text shadow-sm ${
                            selectedOption === option 
                                ? (option === currentWord.meaning_bangla ? 'bg-green-500 border-green-500 text-white scale-105 shadow-xl' : 'bg-red-500 border-red-500 text-white scale-95 opacity-80')
                                : (selectedOption && option === currentWord.meaning_bangla ? 'bg-green-50 border-green-500 text-green-700' : 'bg-slate-50 border-slate-100 text-slate-700 hover:border-primary/50 hover:bg-white')
                        }`}
                    >
                        {option}
                    </button>
                ))}
            </div>
          </>
        ) : (
          <div className="w-full text-left space-y-8 animate-in">
            <div className={`p-5 rounded-[2rem] text-center font-black text-xl shadow-inner ${isCorrect ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                {isCorrect ? '✨ That is correct!' : '📚 Almost there! Review the card below.'}
            </div>
            
            <WordCard wordData={currentWord} />
            
            <div className="pt-10 border-t border-slate-50 dark:border-gray-700">
              <p className="text-center text-xs font-bold text-slate-400 mb-8 uppercase tracking-[0.3em]">How hard was this?</p>
              <div className="grid grid-cols-3 gap-4">
                <button 
                  onClick={() => handleNextWord('hard')} 
                  className="flex flex-col items-center gap-2 p-6 bg-slate-50 dark:bg-gray-700 text-red-500 font-black rounded-3xl border border-transparent hover:border-red-500 transition-all hover:-translate-y-1"
                >
                  <span className="text-4xl mb-1">😫</span>
                  <span className="text-[10px] uppercase tracking-wider">Difficult</span>
                </button>
                <button 
                  onClick={() => handleNextWord('good')} 
                  className="flex flex-col items-center gap-2 p-6 bg-slate-50 dark:bg-gray-700 text-blue-500 font-black rounded-3xl border border-transparent hover:border-blue-500 transition-all hover:-translate-y-1"
                >
                  <span className="text-4xl mb-1">😊</span>
                  <span className="text-[10px] uppercase tracking-wider">Good</span>
                </button>
                <button 
                  onClick={() => handleNextWord('easy')} 
                  className="flex flex-col items-center gap-2 p-6 bg-slate-50 dark:bg-gray-700 text-green-500 font-black rounded-3xl border border-transparent hover:border-green-500 transition-all hover:-translate-y-1"
                >
                  <span className="text-4xl mb-1">🤩</span>
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
