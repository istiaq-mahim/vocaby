
import React from 'react';

interface BackupDisclaimerProps {
  onLink: () => void;
}

const BackupDisclaimer: React.FC<BackupDisclaimerProps> = ({ onLink }) => {
  return (
    <div className="mx-2 mb-6 animate-in">
      <button 
        onClick={onLink}
        className="w-full bg-rose-50 dark:bg-rose-900/20 border-2 border-rose-200 dark:border-rose-800/50 p-4 rounded-2xl flex items-center gap-4 text-left hover:bg-rose-100 dark:hover:bg-rose-900/30 transition-all group"
      >
        <div className="w-12 h-12 bg-rose-500 rounded-xl flex items-center justify-center text-white text-2xl shadow-lg shadow-rose-500/20 group-hover:scale-110 transition-transform">
          ⚠️
        </div>
        <div className="flex-1">
          <h4 className="font-black text-rose-700 dark:text-rose-300 text-sm uppercase tracking-tight">Cloud Backup Required</h4>
          <p className="text-rose-600/70 dark:text-rose-400/70 text-xs font-bold">Your data is stored locally. Link a Gmail account to secure your progress permanently.</p>
        </div>
        <span className="text-rose-400 font-black">→</span>
      </button>
    </div>
  );
};

export default BackupDisclaimer;
