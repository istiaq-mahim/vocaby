import React, { useState } from 'react';
import type { LearnedWord } from '../types';
import WordCard from './WordCard';
import { SkippedDayCard } from './SkippedDayCard';
import { ChevronDownIcon } from './icons/ChevronDownIcon';

interface DateGroupProps {
  date: string;
  words: LearnedWord[];
  isSkipped: boolean;
  formatDate: (dateString: string) => string;
  isInitiallyOpen: boolean;
}

const DateGroup: React.FC<DateGroupProps> = ({ date, words, isSkipped, formatDate, isInitiallyOpen }) => {
  const [isOpen, setIsOpen] = useState(isInitiallyOpen);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-none dark:border dark:border-gray-700 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 text-left"
        aria-expanded={isOpen}
        aria-controls={`words-for-${date}`}
      >
        <div>
            <h2 className="text-lg font-semibold text-textDark dark:text-gray-200">
            {formatDate(date)}
            </h2>
            {!isSkipped && (
                 <p className="text-sm text-textLight dark:text-gray-400">{words.length} word{words.length !== 1 ? 's' : ''} learned</p>
            )}
        </div>
        <ChevronDownIcon className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div
        id={`words-for-${date}`}
        className={`transition-[grid-template-rows] duration-500 ease-in-out grid ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden">
            <div className="p-4 pt-0 space-y-4">
                {isSkipped ? (
                    <SkippedDayCard />
                ) : (
                    words.map((word) => (
                    <div key={word.word}>
                        <WordCard wordData={word} />
                    </div>
                    ))
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default DateGroup;