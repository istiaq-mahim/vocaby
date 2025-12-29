
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
    setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
    }, 300);
  }, [currentWord, updateWordSrs]);
  
  if (wordsToReview.length === 0) {
    return (
      <div className="text-center p-16 glass rounded-4xl border-2 border-slate-100 dark:border-slate-800 animate-slide-up">
        <span className="text-7xl block mb-6 animate-subtle-float">🎉</span>
        <h1 className="text-4xl font-display font-black tracking-tight mb-2">You're All Caught Up!</h1>
        <p className="text-slate-400 font-medium max-w-sm mx-auto">সবগুলো শব্দ রিভিশন করা শেষ! নতুন শব্দ শিখতে হোম পেজে ফিরে যান।</p>
      </div>
    );
  }

  if (currentIndex >= wordsToReview.length) {
    return (
      <div className="text-center p-16 glass rounded-4xl border-2 border-primary/20 animate-slide-up">
        <div className="w-24 h-24 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center text-4xl mx-auto mb-6 shadow-xl shadow-green-500/20">✔</div>
        <h1 className="text-4xl font-display font-black tracking-tight mb-2">Session Complete!</h1>
        <p className="text-slate-400 font-medium">আপনার দীর্ঘমেয়াদী স্মৃতি শক্তি বৃদ্ধি পাচ্ছে। এভাবেই চালিয়ে যান!</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10">
      <div className="flex justify-between items-end">
          <div className="space-y-1">
            <h1 className="text-4xl font-display font-black tracking-tight">SRS Review</h1>
            <p className="text-slate-400 font-medium font-display uppercase tracking-widest text-[10px]">Active Recall Session</p>
          </div>
          <div className="text-right">
              <span className="text-2xl font-black text-primary">{wordsToReview.length - currentIndex}</span>
              <span className="text-xs text-slate-400 block font-bold">REMAINING</span>
          </div>
      </div>

      <div className="relative">
        <div className={`flip-card w-full min-h-[400px] cursor-pointer ${isRevealed ? 'is-flipped' : ''}`} onClick={() => !isRevealed && setIsRevealed(true)}>
            <div className="flip-card-inner">
                {/* Front Side */}
                <div className="flip-card-front glass flex flex-col items-center justify-center p-10 border-2 border-primary/10 shadow-2xl">
                    <span className="text-sm font-black text-primary uppercase tracking-[0.3em] mb-4 opacity-50">What does this mean?</span>
                    <h2 className="text-5xl md:text-6xl font-display font-black tracking-tighter text-slate-900 dark:text-white capitalize">{currentWord.word}</h2>
                    <div className="mt-10 px-6 py-2 rounded-full bg-primary/5 text-primary text-xs font-bold animate-pulse-soft">Tap to Reveal Meaning</div>
                </div>
                {/* Back Side */}
                <div className="flip-card-back w-full h-full overflow-y-auto">
                    <WordCard wordData={currentWord} />
                </div>
            </div>
        </div>

        {isRevealed && (
            <div className="mt-8 animate-slide-up">
                <div className="grid grid-cols-3 gap-4">
                    <RatingBtn onClick={() => handleNextWord('hard')} label="Hard" color="red" sub="Try again soon" />
                    <RatingBtn onClick={() => handleNextWord('good')} label="Good" color="blue" sub="Standard review" />
                    <RatingBtn onClick={() => handleNextWord('easy')} label="Easy" color="green" sub="Show much later" />
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

const RatingBtn: React.FC<{label: string, color: string, sub: string, onClick: () => void}> = ({label, color, sub, onClick}) => (
    <button
        onClick={(e) => { e.stopPropagation(); onClick(); }}
        className={`flex flex-col items-center p-4 rounded-3xl transition-all border group hover:scale-105 ${color === 'red' ? 'bg-red-50 dark:bg-red-900/10 border-red-100 dark:border-red-900/30 text-red-600' : color === 'blue' ? 'bg-blue-50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-900/30 text-blue-600' : 'bg-green-50 dark:bg-green-900/10 border-green-100 dark:border-green-900/30 text-green-600'}`}
    >
        <span className="font-black text-lg">{label}</span>
        <span className="text-[8px] font-bold uppercase tracking-widest opacity-60 mt-1">{sub}</span>
    </button>
);

export default Review;
