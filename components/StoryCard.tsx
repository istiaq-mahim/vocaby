
import React from 'react';

interface StoryCardProps {
  story: string;
  words: string[];
}

const highlightWords = (text: string, wordsToHighlight: string[]) => {
    if (!wordsToHighlight.length) return [text];
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
  // Check if story contains a Bangla summary (provided by Gemini)
  const parts = story.split('\n').filter(p => p.trim() !== '');
  const mainStory = parts.slice(0, -1).join('\n');
  const summary = parts[parts.length - 1];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] p-10 border border-slate-50 dark:border-gray-700 shadow-xl shadow-blue-500/5 transition-all group">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
          📖
        </div>
        <div>
          <h3 className="text-2xl font-black text-slate-800 dark:text-gray-100 tracking-tight">Context Story</h3>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-[0.2em]">Usage in practice</p>
        </div>
      </div>
      
      <p className="text-slate-600 dark:text-slate-300 leading-[2] text-xl font-medium mb-8">
        {highlightWords(mainStory || story, words)}
      </p>

      {mainStory && (
        <div className="pt-6 border-t border-slate-50 dark:border-gray-700">
           <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Quick Summary</p>
           <p className="text-lg font-bold text-slate-800 dark:text-white bangla-text">
             {summary}
           </p>
        </div>
      )}
    </div>
  );
};

export default StoryCard;
