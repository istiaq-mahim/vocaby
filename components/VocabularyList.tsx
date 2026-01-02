
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
    if (!searchTerm) return []; 
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
    <div className="pb-10">
      <h1 className="text-4xl font-black text-slate-900 dark:text-gray-100 mb-1 tracking-tight">Vocabulary Hub</h1>
      <p className="text-slate-500 dark:text-gray-400 mb-8 font-medium">Your personal word collection.</p>
      
      <ProgressStats vocabulary={vocabulary} learningLog={learningLog} />
      
      <div className="relative mb-8">
        <input
          type="text"
          placeholder="Search words or meanings..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-4 rounded-[1.5rem] bg-white dark:bg-gray-800 dark:text-gray-200 border border-slate-100 dark:border-gray-700 focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all shadow-sm"
        />
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300">
            <SearchIcon />
        </div>
      </div>

      {!hasContent ? (
        <div className="text-center p-12 bg-white dark:bg-gray-800 rounded-[2.5rem] shadow-sm border border-slate-50 dark:border-gray-700">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-slate-500 font-medium">Your hub is empty. Learn your first set of words to start building your collection!</p>
        </div>
      ) : searchTerm ? (
        <div className="space-y-6 animate-in">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest px-2">{filteredVocabulary.length} result{filteredVocabulary.length !== 1 ? 's' : ''} found.</p>
            {filteredVocabulary.map((word, index) => (
              <div key={`${word.word}-${index}`}>
                <WordCard wordData={word} />
              </div>
            ))}
        </div>
      ) : (
        <div className="space-y-6">
          {sortedDates.map((date, index) => {
            const wordsForDate = groupedVocabulary[date] || [];
            const isDeclined = learningLog[date]?.status === 'declined' && wordsForDate.length === 0;

            if (wordsForDate.length === 0 && !isDeclined) return null;

            return (
               <div key={date} className="animate-in" style={{ animationDelay: `${index * 50}ms`}}>
                  <DateGroup
                    date={date}
                    words={wordsForDate}
                    isSkipped={isDeclined}
                    formatDate={formatDate}
                    isInitiallyOpen={index === 0}
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
