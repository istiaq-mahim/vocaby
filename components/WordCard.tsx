
import React from 'react';
import type { Word, SynonymAntonym } from '../types';
import { SpeakerIcon } from './icons/SpeakerIcon';

interface WordCardProps {
  wordData: Word;
}

const WordCard: React.FC<WordCardProps> = ({ wordData }) => {
  
  const handlePronounce = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(wordData.word);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Your browser does not support text-to-speech.");
    }
  };

  const renderList = (title: string, items: SynonymAntonym[] | undefined) => {
    if (!items || items.length === 0) return null;
    return (
      <div className="mt-3">
        <h4 className="font-semibold text-textDark dark:text-gray-200 mb-2">{title}</h4>
        <div className="flex flex-wrap gap-2">
          {items.map(item => (
            <div key={item.word} className="bg-secondary dark:bg-gray-700 px-3 py-1 rounded-full text-sm">
              <span className="text-textDark dark:text-gray-200 font-medium">{item.word}</span>
              <span className="text-textLight dark:text-gray-400 ml-1.5">({item.meaning})</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-none dark:border dark:border-gray-700 p-5 transition-all duration-300 ease-in-out hover:shadow-xl hover:transform hover:-translate-y-1">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h2 className="text-2xl font-bold text-primary capitalize">{wordData.word}</h2>
          <p className="text-lg text-accent">{wordData.meaning_bangla}</p>
        </div>
        <button onClick={handlePronounce} className="text-textLight dark:text-gray-400 hover:text-primary dark:hover:text-accent transition-colors p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 flex-shrink-0" aria-label={`Pronounce ${wordData.word}`}>
          <SpeakerIcon />
        </button>
      </div>
      
      <div className="border-t dark:border-gray-700 pt-2">
        {renderList('Synonyms', wordData.synonyms)}
        {renderList('Antonyms', wordData.antonyms)}

        <div className="mt-4">
            <h4 className="font-semibold text-textDark dark:text-gray-200 mb-2">Examples</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-textLight dark:text-gray-400">
                {wordData.examples.map((ex, index) => <li key={index}>{ex}</li>)}
            </ul>
        </div>
      </div>
    </div>
  );
};

export default WordCard;
