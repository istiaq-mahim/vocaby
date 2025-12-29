import React from 'react';

const WordCardSkeleton: React.FC = () => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-none dark:border dark:border-gray-700 p-5 w-full">
    <div className="animate-pulse flex flex-col space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-2"></div>
          <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
        </div>
        <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-48"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-40"></div>
      </div>
      <div className="border-t dark:border-gray-700 pt-4 mt-2 space-y-4">
        <div>
          <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-20 mb-3"></div>
          <div className="flex flex-wrap gap-2">
            <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded-full w-28"></div>
            <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded-full w-32"></div>
            <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded-full w-24"></div>
          </div>
        </div>
        <div>
          <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-3"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default WordCardSkeleton;
