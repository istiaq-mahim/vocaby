
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
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="glass group relative p-6 md:p-8 rounded-4xl border border-slate-200 dark:border-slate-800 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10">
      
      {/* Background Accent */}
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
        <span className="text-6xl font-black font-display uppercase tracking-tighter text-primary">{wordData.word.charAt(0)}</span>
      </div>

      <div className="flex justify-between items-start relative z-10">
        <div className="space-y-1">
            <div className="flex items-center gap-3">
                <h2 className="text-3xl md:text-4xl font-display font-black text-slate-900 dark:text-white capitalize tracking-tight group-hover:text-primary transition-colors">
                    {wordData.word}
                </h2>
                <button 
                    onClick={handlePronounce}
                    className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-sm"
                >
                    🔊
                </button>
            </div>
            <div className="flex items-center gap-2">
                <p className="text-xl font-bold text-primary dark:text-primary-light font-display">
                    {wordData.meaning_bangla}
                </p>
                <div className="h-1 w-8 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
            </div>
        </div>
        {wordData.isAiGenerated && (
            <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-[10px] font-black uppercase tracking-widest shadow-sm">AI Curated</span>
        )}
      </div>

      <div className="mt-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Section title="Synonyms" items={wordData.synonyms} type="synonym" />
            <Section title="Antonyms" items={wordData.antonyms} type="antonym" />
        </div>

        <div className="pt-6 border-t border-slate-100 dark:border-slate-800/50">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Contextual Usage (IELTS Prep)</h4>
            <div className="space-y-3">
                {wordData.examples.slice(0, 3).map((ex, i) => (
                    <div key={i} className="flex gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 text-sm leading-relaxed italic border border-transparent hover:border-primary/20 transition-all">
                        <span className="text-primary font-bold">0{i+1}</span>
                        <p className="text-slate-600 dark:text-slate-300">"{ex}"</p>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

const Section: React.FC<{title: string, items: SynonymAntonym[], type: 'synonym' | 'antonym'}> = ({title, items, type}) => {
    if (!items || items.length === 0) return null;
    return (
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-800/20 border border-slate-100 dark:border-slate-800 shadow-sm">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">{title}</h4>
            <div className="flex flex-wrap gap-2">
                {items.slice(0, 4).map((item, i) => (
                    <div key={i} className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${type === 'synonym' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-red-50 text-red-700 border-red-100'}`}>
                        {item.word} <span className="opacity-50 font-normal">({item.meaning})</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WordCard;
