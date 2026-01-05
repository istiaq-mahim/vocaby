
import React from 'react';
import type { LearnedWord, Settings } from '../types';

interface AccountViewProps {
  session: any;
  settings: Settings;
  vocabulary: LearnedWord[];
  onSignOut: () => void;
  onOpenSettings: () => void;
  onOpenAuth: () => void;
}

const AccountView: React.FC<AccountViewProps> = ({ settings, vocabulary, onOpenSettings, onOpenAuth, onSignOut }) => {
  const stats = {
    total: vocabulary.length,
    mastered: vocabulary.filter(w => (w.srsLevel || 0) >= 5).length,
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm relative overflow-hidden">
        {settings.isLinked && (
          <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 bg-green-500/10 text-green-500 rounded-full border border-green-500/20 animate-pulse">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
            <span className="text-[10px] font-black uppercase tracking-widest">Backed Up</span>
          </div>
        )}
        
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

      {!settings.isLinked && (
        <button 
          onClick={onOpenAuth}
          className="w-full p-6 bg-slate-900 text-white rounded-[2rem] font-black shadow-xl shadow-slate-900/20 active:scale-95 transition-all flex items-center justify-center gap-4 group"
        >
          <div className="bg-white p-1.5 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
          </div>
          <span className="uppercase tracking-widest">backup now</span>
        </button>
      )}

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

        {settings.isLinked && (
          <button 
            onClick={onSignOut}
            className="w-full p-5 bg-slate-50 dark:bg-gray-700/50 rounded-2xl font-bold flex justify-center items-center text-slate-400 hover:text-rose-500 transition-all"
          >
            Sign Out & Stop Syncing
          </button>
        )}
      </div>

      <div className="p-6 bg-primary/5 rounded-3xl border border-primary/10">
        <h4 className="text-xs font-black text-primary uppercase tracking-widest mb-2">Secure Cloud Data</h4>
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          Your learning history is synchronized with Google's secure infrastructure. You can restore your progress on any new device simply by signing in.
        </p>
      </div>
    </div>
  );
};

export default AccountView;
