
import React from 'react';
import type { Word, SynonymAntonym } from '../types';

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
    <div className="bg-white dark:bg-gray-800 p-8 rounded-[2rem] shadow-sm border border-slate-100 dark:border-gray-700 word-card-hover cursor-pointer overflow-hidden relative">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-3xl font-extrabold text-[#0052CC] dark:text-blue-400 capitalize mb-1">
            {wordData.word}
          </h2>
          <p className="text-2xl font-bold text-[#4F46E5] mb-2">
            {wordData.meaning_bangla}
          </p>
          <div className="space-y-0.5">
            <p className="text-slate-400 text-sm font-medium">
              ইউবিকুইটাস <span className="text-slate-300 dark:text-gray-500">(Yoo-bi-kwee-tas)</span>
            </p>
            <p className="text-slate-400 text-xs italic">
              /juːˈbɪkwɪtəs/
            </p>
          </div>
        </div>
        <button 
          onClick={handlePronounce}
          className="w-12 h-12 rounded-full bg-slate-50 dark:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-primary hover:bg-blue-50 transition-all shadow-inner"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
          </svg>
        </button>
      </div>

      <hr className="border-slate-50 dark:border-gray-700 mb-6" />

      <div className="space-y-6">
        <Section title="Synonyms" items={wordData.synonyms} />
        <Section title="Antonyms" items={wordData.antonyms} />
      </div>
    </div>
  );
};

const Section: React.FC<{title: string, items: SynonymAntonym[]}> = ({title, items}) => {
  if (!items || items.length === 0) return null;
  return (
    <div>
      <h4 className="text-sm font-extrabold text-slate-800 dark:text-gray-200 mb-3">{title}</h4>
      <div className="flex flex-wrap gap-2">
        {items.map((item, i) => (
          <span key={i} className="px-4 py-2 bg-slate-50 dark:bg-gray-700 rounded-full text-sm font-medium border border-slate-100 dark:border-gray-600 flex items-center gap-1.5">
            <span className="text-slate-700 dark:text-gray-200">{item.word}</span>
            <span className="text-slate-400 dark:text-gray-500 font-normal">({item.meaning})</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default WordCard;
