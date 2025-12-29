
import React from 'react';

interface StoryCardProps {
  story: string;
  words: string[];
}

// A helper function to highlight words in the story
const highlightWords = (text: string, wordsToHighlight: string[]) => {
    if (!wordsToHighlight.length) return [text];
    
    // Create a regex to find all occurrences of the words, case-insensitive
    const regex = new RegExp(`\\b(${wordsToHighlight.join('|')})\\b`, 'gi');
    
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
        wordsToHighlight.some(word => word.toLowerCase() === part.toLowerCase())
            ? <strong key={index} className="text-primary dark:text-accent font-bold">{part}</strong>
            : part
    );
};

const StoryCard: React.FC<StoryCardProps> = ({ story, words }) => {
  return (
    <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-none dark:border dark:border-gray-700 p-5 transition-all duration-300 ease-in-out animate-fade-in-up">
      <h3 className="text-xl font-bold text-textDark dark:text-gray-100 mb-3">Words in Context</h3>
      <p className="text-textLight dark:text-gray-400 leading-relaxed">
        {highlightWords(story, words)}
      </p>
    </div>
  );
};

export default StoryCard;
