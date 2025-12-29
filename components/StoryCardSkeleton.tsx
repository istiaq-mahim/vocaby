
import React from 'react';

const StoryCardSkeleton: React.FC = () => (
  <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-none dark:border dark:border-gray-700 p-5 w-full">
    <div className="animate-pulse flex flex-col space-y-3">
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-40 mb-2"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
    </div>
  </div>
);

export default StoryCardSkeleton;
