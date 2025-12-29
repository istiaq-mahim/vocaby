
import React from 'react';
import { View } from '../types';
import { BookIcon } from './icons/BookIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import { SettingsIcon } from './icons/SettingsIcon';
import { RepeatIcon } from './icons/RepeatIcon';
import { PlusIcon } from './icons/PlusIcon';

interface BottomNavProps {
  activeView: View;
  setActiveView: (view: View) => void;
  onSettingsClick: () => void;
  reviewCount: number;
}

const NavItem: React.FC<{
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, icon, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center w-full h-full pt-2 pb-1 transition-colors duration-200 ${
      isActive ? 'text-primary' : 'text-textLight dark:text-gray-400 hover:text-primary dark:hover:text-accent'
    }`}
    aria-label={label}
  >
    {icon}
    <span className="text-xs font-medium">{label}</span>
  </button>
);

const BottomNav: React.FC<BottomNavProps> = ({ activeView, setActiveView, onSettingsClick, reviewCount }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white dark:bg-gray-800 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] dark:shadow-[0_-2px_10px_rgba(0,0,0,0.2)] max-w-md mx-auto rounded-t-2xl">
      <div className="flex justify-around h-full">
        <NavItem
          label="Today's Words"
          icon={<SparklesIcon />}
          isActive={activeView === View.DAILY}
          onClick={() => setActiveView(View.DAILY)}
        />
        <div className="relative w-full">
            <NavItem
                label="Review"
                icon={<RepeatIcon />}
                isActive={activeView === View.REVIEW}
                onClick={() => setActiveView(View.REVIEW)}
            />
            {reviewCount > 0 && (
                <span className="absolute top-1 right-1/2 translate-x-5 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full pointer-events-none">
                    {reviewCount > 9 ? '9+' : reviewCount}
                </span>
            )}
        </div>
        <NavItem
          label="Add Word"
          icon={<PlusIcon />}
          isActive={activeView === View.MANUAL_ADD}
          onClick={() => setActiveView(View.MANUAL_ADD)}
        />
        <NavItem
          label="My Vocabulary"
          icon={<BookIcon />}
          isActive={activeView === View.VOCABULARY}
          onClick={() => setActiveView(View.VOCABULARY)}
        />
        <button
            onClick={onSettingsClick}
            className="flex flex-col items-center justify-center w-full pt-2 pb-1 text-textLight dark:text-gray-400 hover:text-primary dark:hover:text-accent transition-colors duration-200"
            aria-label="Settings"
        >
            <SettingsIcon />
            <span className="text-xs font-medium">Settings</span>
        </button>
      </div>
    </nav>
  );
};

export default BottomNav;