
import React from 'react';

export const SkippedDayCard: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:border dark:border-gray-700 p-5 text-center">
      <p className="text-textLight dark:text-gray-400">You didn't learn any new words on this day.</p>
    </div>
  );
};
