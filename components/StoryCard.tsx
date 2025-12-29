
import React from 'react';

interface StoryCardProps {
  story: string;
  words: string[];
}

const highlightWords = (text: string, wordsToHighlight: string[]) => {
    if (!wordsToHighlight.length) return [text];
    // Sort words by length descending to avoid partial matches on substrings
    const sortedWords = [...wordsToHighlight].sort((a, b) => b.length - a.length);
    const regex = new RegExp(`\\b(${sortedWords.join('|')})\\b`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => {
        const isMatch = wordsToHighlight.some(word => word.toLowerCase() === part.toLowerCase());
        return isMatch ? (
            <span key={index} className="px-1.5 py-0.5 mx-0.5 bg-blue-100 dark:bg-blue-900/40 text-[#0052CC] dark:text-blue-300 font-black rounded-md">
                {part}
            </span>
        ) : (
            part
        );
    });
};

const StoryCard: React.FC<StoryCardProps> = ({ story, words }) => {
  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-[2.5rem] p-10 border border-white dark:border-gray-700 shadow-xl shadow-blue-500/5 transition-all hover:bg-white dark:hover:bg-gray-800 group">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
          📖
        </div>
        <div>
          <h3 className="text-2xl font-black text-slate-800 dark:text-gray-100">Daily Story</h3>
          <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">Vocabulary in context</p>
        </div>
      </div>
      <p className="text-slate-600 dark:text-slate-300 leading-[2] text-xl font-medium">
        {highlightWords(story, words)}
      </p>
    </div>
  );
};

export default StoryCard;
