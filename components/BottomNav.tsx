
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
      isActive ? 'text-primary' : 'text-textLight dark:text-gray-400'
    }`}
  >
    {icon}
    <span className="text-[10px] font-bold uppercase tracking-tighter">{label}</span>
  </button>
);

const BottomNav: React.FC<BottomNavProps> = ({ activeView, setActiveView, onSettingsClick, reviewCount }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 z-40 md:hidden">
      <div className="flex justify-around h-full">
        <NavItem
          label="Today"
          icon={<SparklesIcon />}
          isActive={activeView === View.DAILY}
          onClick={() => setActiveView(View.DAILY)}
        />
        <NavItem
          label="Review"
          icon={<RepeatIcon />}
          isActive={activeView === View.REVIEW}
          onClick={() => setActiveView(View.REVIEW)}
        />
        <NavItem
          label="Journal"
          icon={<BookIcon />}
          isActive={activeView === View.VOCABULARY}
          onClick={() => setActiveView(View.VOCABULARY)}
        />
        <NavItem
          label="Settings"
          icon={<SettingsIcon />}
          isActive={false}
          onClick={onSettingsClick}
        />
      </div>
    </nav>
  );
};

export default BottomNav;
