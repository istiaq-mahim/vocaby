
import React from 'react';
import { View } from '../types';

interface BottomNavProps {
  activeView: View;
  setActiveView: (view: View) => void;
  reviewCount: number;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeView, setActiveView, reviewCount }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 h-20 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-100 dark:border-slate-800 z-40 px-6 pb-safe">
      <div className="flex justify-between items-center h-full max-w-2xl mx-auto">
        <NavItem 
          icon={<SparkleIcon />} 
          isActive={activeView === View.DAILY} 
          onClick={() => setActiveView(View.DAILY)} 
        />
        <NavItem 
          icon={<RepeatIcon />} 
          isActive={activeView === View.REVIEW} 
          onClick={() => setActiveView(View.REVIEW)} 
          badge={reviewCount}
        />
        <NavItem 
          icon={<PlusIcon />} 
          isActive={activeView === View.MANUAL_ADD} 
          onClick={() => setActiveView(View.MANUAL_ADD)} 
        />
        <NavItem 
          icon={<JournalIcon />} 
          isActive={activeView === View.VOCABULARY} 
          onClick={() => setActiveView(View.VOCABULARY)} 
        />
        <NavItem 
          icon={<SettingsIcon />} 
          isActive={activeView === View.ACCOUNT} 
          onClick={() => setActiveView(View.ACCOUNT)} 
        />
      </div>
    </nav>
  );
};

const NavItem = ({ icon, isActive, onClick, badge }: any) => (
  <button onClick={onClick} className={`relative p-3 transition-all ${isActive ? 'text-primary' : 'text-slate-400'}`}>
    <div className={`transition-transform duration-300 ${isActive ? 'scale-125' : 'scale-100 hover:scale-110'}`}>
      {icon}
    </div>
    {badge > 0 && (
      <span className="absolute top-2 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[8px] font-bold text-white">
        {badge}
      </span>
    )}
  </button>
);

const SparkleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
);

const RepeatIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m17 2 4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>
);

const PlusIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
);

const JournalIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5V4a2 2 0 0 1 2-2h14v18H6a2 2 0 0 1-2-2.5z"/><path d="M6 18h14"/><path d="M8 6h8"/><path d="M8 10h8"/><path d="M8 14h4"/></svg>
);

const SettingsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
);

export default BottomNav;
