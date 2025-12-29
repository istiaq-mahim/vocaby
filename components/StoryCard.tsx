
import React from 'react';

interface StoryCardProps {
  story: string;
  words: string[];
}

const highlightWords = (text: string, wordsToHighlight: string[]) => {
    if (!wordsToHighlight.length) return [text];
    const regex = new RegExp(`\\b(${wordsToHighlight.join('|')})\\b`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, index) => 
        wordsToHighlight.some(word => word.toLowerCase() === part.toLowerCase())
            ? <strong key={index} className="text-primary font-bold">{part}</strong>
            : part
    );
};

const StoryCard: React.FC<StoryCardProps> = ({ story, words }) => {
  return (
    <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-[2rem] p-8 border border-white/50 dark:border-gray-700 shadow-xl shadow-blue-500/5 transition-all hover:bg-white dark:hover:bg-gray-800">
      <h3 className="text-2xl font-extrabold text-slate-800 dark:text-gray-100 mb-4 flex items-center gap-3">
        <span className="text-3xl">📖</span> Words in Context
      </h3>
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
        {highlightWords(story, words)}
      </p>
    </div>
  );
};

export default StoryCard;
