
import React from 'react';
import type { Word, SynonymAntonym } from '../types';

interface WordCardProps {
  wordData: Word;
}

const WordCard: React.FC<WordCardProps> = ({ wordData }) => {
  const handlePronounce = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(wordData.word);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white capitalize">
            {wordData.word}
          </h2>
          <p className="text-lg font-semibold text-primary">
            {wordData.meaning_bangla}
          </p>
        </div>
        <button 
          onClick={handlePronounce}
          className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-700 flex items-center justify-center text-xl"
        >
          🔊
        </button>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Section title="Synonyms" items={wordData.synonyms} />
          <Section title="Antonyms" items={wordData.antonyms} />
        </div>

        <div className="pt-4 border-t border-gray-50 dark:border-gray-700">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Examples</h4>
          <ul className="space-y-2">
            {wordData.examples.slice(0, 3).map((ex, i) => (
              <li key={i} className="text-sm text-slate-600 dark:text-slate-300 italic">
                "{ex}"
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const Section: React.FC<{title: string, items: SynonymAntonym[]}> = ({title, items}) => {
  if (!items || items.length === 0) return null;
  return (
    <div>
      <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{title}</h4>
      <div className="flex flex-wrap gap-1">
        {items.slice(0, 3).map((item, i) => (
          <span key={i} className="text-xs font-medium px-2 py-1 bg-gray-50 dark:bg-gray-700 rounded-lg">
            {item.word}
          </span>
        ))}
      </div>
    </div>
  );
};

export default WordCard;
