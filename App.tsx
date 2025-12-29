
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Onboarding from './components/Onboarding';
import DailyWords from './components/DailyWords';
import VocabularyList from './components/VocabularyList';
import BottomNav from './components/BottomNav';
import SettingsPanel from './components/SettingsPanel';
import { View } from './types';
import type { Word, Settings, LearnedWord, LearningLog } from './types';
import Review from './components/Review';
import ManualAdd from './components/ManualAdd';

// Use a session mock or replace with real session provider from NextAuth
const App: React.FC = () => {
  const [settings, setSettings] = useState<Settings>({
    wordCount: 5,
    notificationHour: 8,
    notificationMinute: 0,
    darkMode: false,
    readingMode: false
  });
  
  const [vocabulary, setVocabulary] = useState<LearnedWord[]>([]);
  const [activeView, setActiveView] = useState<View>(View.DAILY);
  const [isReady, setIsReady] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Sync with DB
  useEffect(() => {
    const syncData = async () => {
        try {
            const res = await fetch('/api/words');
            if (res.ok) {
                const data = await res.json();
                const formatted = data.map((item: any) => ({
                    ...item.word_data,
                    srsLevel: item.srs_level,
                    nextReview: item.next_review
                }));
                setVocabulary(formatted);
            }
        } catch (e) {
            console.error("Sync error", e);
        } finally {
            setIsReady(true);
        }
    };
    syncData();
  }, []);

  const addWordsToVocabulary = useCallback((newWords: Word[]) => {
    // Optimistic UI update
    setVocabulary(prev => {
        const existing = new Set(prev.map(w => w.word.toLowerCase()));
        const unique = newWords
            .filter(nw => !existing.has(nw.word.toLowerCase()))
            .map(w => ({ ...w, srsLevel: 0, nextReview: new Date().toISOString() }));
        return [...prev, ...unique as any];
    });
  }, []);

  const reviewCount = useMemo(() => {
      const today = new Date().toISOString().split('T')[0];
      return vocabulary.filter(word => (word.nextReview || '9999-12-31') <= today).length;
  }, [vocabulary]);

  // FIX: Define Tailwind classes as constants to replace the style jsx block causing TS errors.
  const navBtnBase = "flex items-center w-full px-4 py-3 rounded-xl text-left font-semibold text-textLight dark:text-gray-400 hover:bg-primary/10 hover:text-primary transition-all";
  const navBtnActive = "bg-primary text-white hover:bg-primary/90 hover:text-white shadow-lg shadow-primary/20";

  if (!isReady) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${settings.darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-slate-900'}`}>
      <div className="flex flex-col md:flex-row min-h-screen max-w-7xl mx-auto">
        
        {/* Desktop Sidebar / Mobile Top Bar */}
        <header className="md:w-64 md:border-r border-gray-200 dark:border-gray-800 p-6 flex md:flex-col justify-between items-center md:items-start shrink-0">
          <div>
            <h1 className="text-2xl font-black text-primary tracking-tighter">VOCABY</h1>
            <p className="text-xs text-textLight dark:text-gray-400 hidden md:block">Master English Daily</p>
          </div>
          
          <div className="hidden md:flex flex-col gap-2 mt-10 w-full">
            <button 
              onClick={() => setActiveView(View.DAILY)} 
              className={`${navBtnBase} ${activeView === View.DAILY ? navBtnActive : ''}`}
            >
              Daily Learning
            </button>
            <button 
              onClick={() => setActiveView(View.REVIEW)} 
              className={`${navBtnBase} ${activeView === View.REVIEW ? navBtnActive : ''}`}
            >
                Review
                {reviewCount > 0 && <span className="ml-auto bg-red-500 text-white text-[10px] px-1.5 rounded-full">{reviewCount}</span>}
            </button>
            <button 
              onClick={() => setActiveView(View.VOCABULARY)} 
              className={`${navBtnBase} ${activeView === View.VOCABULARY ? navBtnActive : ''}`}
            >
              My Journal
            </button>
            <button 
              onClick={() => setIsSettingsOpen(true)} 
              className={navBtnBase}
            >
              Settings
            </button>
          </div>

          <div className="flex items-center gap-2 md:mt-auto">
             <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">U</div>
             <span className="text-sm font-medium hidden md:block">User</span>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-grow p-4 md:p-10 pb-24 md:pb-10 overflow-y-auto">
          <div className="max-w-2xl mx-auto w-full">
            {activeView === View.DAILY && <DailyWords settings={settings} addWordsToVocabulary={addWordsToVocabulary} />}
            {activeView === View.REVIEW && <Review vocabulary={vocabulary} updateWordSrs={() => {}} />}
            {activeView === View.MANUAL_ADD && <ManualAdd addWordsToVocabulary={addWordsToVocabulary} />}
            {activeView === View.VOCABULARY && <VocabularyList vocabulary={vocabulary} learningLog={{}} />}
          </div>
        </main>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <BottomNav 
            activeView={activeView} 
            setActiveView={setActiveView} 
            onSettingsClick={() => setIsSettingsOpen(true)}
            reviewCount={reviewCount}
        />
      </div>

      {isSettingsOpen && (
        <SettingsPanel 
            settings={settings} 
            updateSettings={(s) => setSettings(prev => ({ ...prev, ...s }))} 
            onClose={() => setIsSettingsOpen(false)} 
        />
      )}
    </div>
  );
};

export default App;
