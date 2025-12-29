import React, { useState, useMemo } from 'react';
import type { LearnedWord, LearningLog } from '../types';
import WordCard from './WordCard';
import { SearchIcon } from './icons/SearchIcon';
import DateGroup from './DateGroup';
import ProgressStats from './ProgressStats';

interface VocabularyListProps {
  vocabulary: LearnedWord[];
  learningLog: LearningLog;
}

const VocabularyList: React.FC<VocabularyListProps> = ({ vocabulary, learningLog }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredVocabulary = useMemo(() => {
    if (!searchTerm) return []; // Only filter when there is a search term
    return vocabulary.filter(w =>
      w.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
      w.meaning_bangla.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, vocabulary]);

  const groupedVocabulary = useMemo(() => {
    const groups = vocabulary.reduce((acc, word) => {
      const date = word.learnedOn;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(word);
      return acc;
    }, {} as Record<string, LearnedWord[]>);
    return groups;
  }, [vocabulary]);

  const sortedDates = useMemo(() => {
    const learnedDates = new Set(Object.keys(groupedVocabulary));
    const logDates = new Set(Object.keys(learningLog));
    const allDates = Array.from(new Set([...learnedDates, ...logDates]));
    
    return allDates.sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
  }, [groupedVocabulary, learningLog]);

  const formatDate = (dateString: string) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const inputDate = new Date(dateString);

    if (inputDate.toDateString() === today.toDateString()) {
      return 'Today';
    }
    if (inputDate.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    }

    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return inputDate.toLocaleDateString('en-US', options);
  };

  const hasContent = vocabulary.length > 0 || Object.keys(learningLog).length > 0;
  
  return (
    <div>
      <h1 className="text-3xl font-bold text-textDark dark:text-gray-100 mb-1">My Vocabulary</h1>
      <p className="text-textLight dark:text-gray-400 mb-6">Your learning journal and progress.</p>
      
      <ProgressStats vocabulary={vocabulary} learningLog={learningLog} />
      
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search your vocabulary..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-full bg-white dark:bg-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <SearchIcon />
        </div>
      </div>

      {!hasContent ? (
        <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm dark:border dark:border-gray-700">
            <p className="text-textLight dark:text-gray-400">Your vocabulary list is empty. Start learning today to build your collection!</p>
        </div>
      ) : searchTerm ? (
        // Render search results as a flat list
        filteredVocabulary.length > 0 ? (
          <div className="space-y-4 animate-fade-in">
             <p className="text-sm text-textLight dark:text-gray-400 mb-2">{filteredVocabulary.length} result{filteredVocabulary.length !== 1 ? 's' : ''} found.</p>
            {filteredVocabulary.map((word, index) => (
              <div key={`${word.word}-${index}`}>
                <WordCard wordData={word} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm dark:border dark:border-gray-700 animate-fade-in">
            <p className="text-textLight dark:text-gray-400">No words found for "{searchTerm}".</p>
          </div>
        )
      ) : (
        // Render date groups
        <div className="space-y-4">
          {sortedDates.map((date, index) => {
            const wordsForDate = groupedVocabulary[date] || [];
            const isDeclined = learningLog[date]?.status === 'declined' && wordsForDate.length === 0;

            if (wordsForDate.length === 0 && !isDeclined) return null;

            return (
               <div key={date} className="opacity-0 animate-fade-in-up" style={{ animationDelay: `${index * 100}ms`}}>
                  <DateGroup
                    date={date}
                    words={wordsForDate}
                    isSkipped={isDeclined}
                    formatDate={formatDate}
                    isInitiallyOpen={index === 0} // Open the first group (Today/most recent) by default
                  />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default VocabularyList;