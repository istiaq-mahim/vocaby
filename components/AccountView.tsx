
import React from 'react';
import type { LearnedWord, Settings } from '../types';

interface AccountViewProps {
  settings: Settings;
  vocabulary: LearnedWord[];
  onOpenSettings: () => void;
}

const AccountView: React.FC<AccountViewProps> = ({ settings, vocabulary, onOpenSettings }) => {
  const stats = {
    total: vocabulary.length,
    mastered: vocabulary.filter(w => (w.srsLevel || 0) >= 5).length,
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm relative overflow-hidden">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary text-2xl font-black border border-primary/20">
            {settings.nickname.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">{settings.nickname}</h2>
            <p className="text-sm text-slate-400 italic">{settings.age} years old • {settings.goal.toUpperCase()}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 dark:bg-gray-700 rounded-2xl text-center">
            <p className="text-2xl font-black text-primary">{stats.total}</p>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Learned</p>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-gray-700 rounded-2xl text-center">
            <p className="text-2xl font-black text-green-500">{stats.mastered}</p>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Mastered</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <button 
          onClick={onOpenSettings}
          className="w-full p-5 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 font-bold flex justify-between items-center group transition-all active:scale-95"
        >
          <span className="flex items-center gap-3">
            <span className="text-xl">⚙️</span> 
            <span className="dark:text-white">Settings & Preferences</span>
          </span>
          <span className="text-slate-400 group-hover:translate-x-1 transition-transform">→</span>
        </button>
      </div>

      <div className="p-6 bg-primary/5 rounded-3xl border border-primary/10">
        <h4 className="text-xs font-black text-primary uppercase tracking-widest mb-2">Local Data Only</h4>
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          Your learning history is currently saved on this device only. Clearing your browser data may remove your progress.
        </p>
      </div>
    </div>
  );
};

export default AccountView;
