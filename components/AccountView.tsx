
import React from 'react';
import type { LearnedWord } from '../types';

interface AccountViewProps {
  session: any;
  vocabulary: LearnedWord[];
  onSignOut: () => void;
  onOpenSettings: () => void;
}

const AccountView: React.FC<AccountViewProps> = ({ vocabulary, onOpenSettings }) => {
  const stats = {
    total: vocabulary.length,
    mastered: vocabulary.filter(w => (w.srsLevel || 0) >= 5).length,
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
            S
          </div>
          <div>
            <h2 className="text-xl font-bold">Student</h2>
            <p className="text-sm text-gray-500 italic">Local Study Session</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-2xl text-center">
            <p className="text-2xl font-bold text-primary">{stats.total}</p>
            <p className="text-xs font-bold text-gray-400 uppercase">Words</p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-2xl text-center">
            <p className="text-2xl font-bold text-green-500">{stats.mastered}</p>
            <p className="text-xs font-bold text-gray-400 uppercase">Mastered</p>
          </div>
        </div>
      </div>

      <button 
        onClick={onOpenSettings}
        className="w-full p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 font-bold flex justify-between"
      >
        <span>⚙️ Settings</span>
        <span>→</span>
      </button>
    </div>
  );
};

export default AccountView;
