
import React from 'react';
import type { Word, SynonymAntonym, ExamplePair } from '../types';

interface WordCardProps {
  wordData: Word;
}

const WordCard: React.FC<WordCardProps> = ({ wordData }) => {
  const handlePronounce = (e: React.MouseEvent) => {
    e.stopPropagation();
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(wordData.word);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-gray-700 word-card-hover cursor-pointer overflow-hidden relative">
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h2 className="text-4xl font-extrabold text-[#0052CC] dark:text-blue-400 capitalize tracking-tight">
              {wordData.word}
            </h2>
            {wordData.reference && (
              <span className="px-2 py-0.5 bg-accent/10 text-accent text-[10px] font-black rounded-lg border border-accent/20">
                {wordData.reference}
              </span>
            )}
          </div>
          <p className="text-2xl font-bold text-[#4F46E5] bangla-text">
            {wordData.meaning_bangla}
          </p>
        </div>
        <button 
          onClick={handlePronounce}
          className="w-12 h-12 rounded-full bg-slate-50 dark:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-primary hover:bg-blue-50 transition-all shadow-inner"
          aria-label="Listen to pronunciation"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
          </svg>
        </button>
      </div>

      <hr className="border-slate-50 dark:border-gray-700 mb-6" />

      <div className="space-y-6">
        <Section title="Synonyms" items={wordData.synonyms} />
        <Section title="Antonyms" items={wordData.antonyms} />
        
        <div className="pt-6 border-t border-slate-50 dark:border-gray-700">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Sentence Examples</h4>
          <div className="grid grid-cols-1 gap-6">
            {wordData.examples.map((ex: ExamplePair, i) => (
              <div key={i} className="flex gap-4 group items-start">
                <span className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-900/30 text-primary dark:text-blue-300 text-xs font-black mt-1">
                  {i + 1}
                </span>
                <div className="space-y-1">
                  <p className="text-slate-800 dark:text-slate-100 text-lg leading-relaxed font-semibold italic">
                    "{ex.english}"
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 text-sm bangla-text">
                    ({ex.bangla})
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Section: React.FC<{title: string, items: SynonymAntonym[]}> = ({title, items}) => {
  if (!items || items.length === 0) return null;
  return (
    <div>
      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-3">{title}</h4>
      <div className="flex flex-wrap gap-2">
        {items.map((item, i) => (
          <span key={i} className="px-4 py-2 bg-slate-50 dark:bg-gray-700 rounded-2xl text-sm font-medium border border-slate-100 dark:border-gray-600 flex items-center gap-2 transition-all">
            <span className="text-[#0052CC] dark:text-blue-300 font-black">{item.word}</span>
            <span className="text-slate-500 dark:text-gray-400 font-normal bangla-text text-xs">({item.meaning})</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default WordCard;
