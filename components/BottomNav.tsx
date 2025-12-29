
import React from 'react';
import { View } from '../types';
import { BookIcon } from './icons/BookIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import { RepeatIcon } from './icons/RepeatIcon';

interface BottomNavProps {
  activeView: View;
  setActiveView: (view: View) => void;
  reviewCount: number;
}

const NavItem: React.FC<{
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
  badge?: number;
}> = ({ label, icon, isActive, onClick, badge }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center w-full h-full pt-2 pb-1 transition-all duration-200 relative ${
      isActive ? 'text-primary' : 'text-slate-400 dark:text-slate-500'
    }`}
  >
    <div className={`transition-transform duration-300 ${isActive ? 'scale-110 -translate-y-1' : ''}`}>
      {icon}
    </div>
    <span className={`text-[10px] font-black uppercase tracking-widest transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-60'}`}>
      {label}
    </span>
    {badge ? (
      <span className="absolute top-2 right-1/2 translate-x-4 bg-accent text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
        {badge}
      </span>
    ) : null}
    {isActive && (
      <div className="absolute bottom-1 w-1 h-1 bg-primary rounded-full"></div>
    )}
  </button>
);

const BottomNav: React.FC<BottomNavProps> = ({ activeView, setActiveView, reviewCount }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 h-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-t border-slate-100 dark:border-slate-800 z-40 md:hidden pb-safe">
      <div className="flex justify-around items-center h-full px-4">
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
          badge={reviewCount > 0 ? reviewCount : undefined}
        />
        <NavItem
          label="Journal"
          icon={<BookIcon />}
          isActive={activeView === View.VOCABULARY}
          onClick={() => setActiveView(View.VOCABULARY)}
        />
      </div>
    </nav>
  );
};

export default BottomNav;
