
import React, { useState } from 'react';
import { fetchSingleWordDetails } from '../services/geminiService';
import WordCard from './WordCard';
import type { Word } from '../types';
import { SearchIcon } from './icons/SearchIcon';

interface ManualAddProps {
  addWordsToVocabulary: (words: Word[]) => void;
}

const ManualAdd: React.FC<ManualAddProps> = ({ addWordsToVocabulary }) => {
  const [wordInput, setWordInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fetchedWord, setFetchedWord] = useState<Word | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleFindWord = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wordInput.trim()) return;

    setIsLoading(true);
    setError(null);
    setFetchedWord(null);
    setSuccessMessage(null);

    try {
      const wordDetails = await fetchSingleWordDetails(wordInput.trim());
      setFetchedWord(wordDetails);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddWord = () => {
    if (!fetchedWord) return;
    addWordsToVocabulary([fetchedWord]);
    setSuccessMessage(`"${fetchedWord.word}" has been added to your vocabulary!`);
    setFetchedWord(null);
    setWordInput('');

    // Clear the success message after a few seconds
    setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-textDark dark:text-gray-100 mb-1">Add a New Word</h1>
      <p className="text-textLight dark:text-gray-400 mb-6">Enter an English word to look up and add to your list.</p>
      
      <form onSubmit={handleFindWord} className="relative mb-6">
        <input
          type="text"
          placeholder="e.g., Ephemeral"
          value={wordInput}
          onChange={(e) => setWordInput(e.target.value)}
          className="w-full pl-5 pr-28 py-3 rounded-full bg-white dark:bg-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white font-bold py-2 px-5 rounded-full hover:bg-blue-700 transition-colors disabled:bg-gray-400 dark:disabled:bg-gray-600 flex items-center"
          disabled={isLoading || !wordInput.trim()}
        >
          <SearchIcon />
          <span className="ml-2">Find</span>
        </button>
      </form>

      {isLoading && (
         <div className="flex flex-col items-center justify-center p-8">
            <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-primary mb-4"></div>
            <p className="text-textLight dark:text-gray-400">Looking up "{wordInput}"...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative animate-fade-in" role="alert">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg relative animate-fade-in" role="alert">
          {successMessage}
        </div>
      )}

      {fetchedWord && (
        <div className="mt-6 space-y-4 animate-fade-in-up">
          <WordCard wordData={fetchedWord} />
          <button
            onClick={handleAddWord}
            className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add to My Vocabulary
          </button>
        </div>
      )}

    </div>
  );
};

export default ManualAdd;
