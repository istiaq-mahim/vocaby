
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import DailyWords from './components/DailyWords';
import VocabularyList from './components/VocabularyList';
import BottomNav from './components/BottomNav';
import SettingsPanel from './components/SettingsPanel';
import AccountView from './components/AccountView';
import Onboarding from './components/Onboarding';
import { View } from './types';
import type { Word, Settings, LearnedWord } from './types';
import Review from './components/Review';
import ManualAdd from './components/ManualAdd';
import { VOCABULARY_KEY, SETTINGS_KEY } from './constants';

const App: React.FC = () => {
  const [settings, setSettings] = useState<Settings | null>(() => {
    const saved = localStorage.getItem(SETTINGS_KEY);
    return saved ? JSON.parse(saved) : null;
  });
  
  const [vocabulary, setVocabulary] = useState<LearnedWord[]>(() => {
    const saved = localStorage.getItem(VOCABULARY_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const [activeView, setActiveView] = useState<View>(View.DAILY);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    if (settings) {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
      if (settings.darkMode) document.documentElement.classList.add('dark');
      else document.documentElement.classList.remove('dark');
    }
  }, [settings]);

  useEffect(() => {
    localStorage.setItem(VOCABULARY_KEY, JSON.stringify(vocabulary));
  }, [vocabulary]);

  const addWordsToVocabulary = useCallback((newWords: Word[]) => {
    setVocabulary(prev => {
        const existing = new Set(prev.map(w => w.word.toLowerCase()));
        const unique = newWords
            .filter(nw => !existing.has(nw.word.toLowerCase()))
            .map(w => ({ 
              ...w, 
              srsLevel: 0, 
              learnedOn: new Date().toISOString().split('T')[0],
              nextReview: new Date().toISOString().split('T')[0] 
            }));
        return [...prev, ...unique as any];
    });
  }, []);

  const updateWordSrs = useCallback((word: LearnedWord, newSrsData: { srsLevel: number; nextReview: string }) => {
    setVocabulary(prev => prev.map(w => 
      w.word === word.word ? { ...w, ...newSrsData } : w
    ));
  }, []);

  const reviewCount = useMemo(() => {
      const today = new Date().toISOString().split('T')[0];
      return vocabulary.filter(word => (word.nextReview || '9999-12-31') <= today).length;
  }, [vocabulary]);

  const handleOnboardingComplete = (onboardingSettings: any) => {
    setSettings({
      ...onboardingSettings,
      darkMode: false,
      readingMode: false
    });
  };

  const handleUpdateSettings = (newPartialSettings: Partial<Settings>) => {
    setSettings(prev => prev ? ({ ...prev, ...newPartialSettings }) : null);
    
    if (newPartialSettings.goal !== undefined) {
      setActiveView(View.DAILY);
      setIsSettingsOpen(false);
    }
  };

  if (!settings) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header hidden on daily view to match design */}
      {activeView !== View.DAILY && (
        <header className="px-6 py-4 flex justify-between items-center sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-extrabold tracking-tight text-primary">VOCABY</h1>
          </div>
          <button 
            onClick={() => setActiveView(View.ACCOUNT)}
            className="w-10 h-10 rounded-2xl bg-white dark:bg-gray-700 flex items-center justify-center text-sm font-bold shadow-sm relative overflow-hidden"
          >
            <span className="text-slate-300">👤</span>
          </button>
        </header>
      )}

      {/* Main Content */}
      <main className={`flex-grow p-4 max-w-2xl mx-auto w-full pb-28 ${activeView === View.DAILY ? 'pt-10' : ''}`}>
        <div className="animate-in">
          {activeView === View.DAILY && (
            <DailyWords 
              settings={settings} 
              addWordsToVocabulary={addWordsToVocabulary} 
              user={{ name: settings.nickname }} 
            />
          )}
          {activeView === View.REVIEW && (
            <Review 
              vocabulary={vocabulary} 
              updateWordSrs={updateWordSrs} 
            />
          )}
          {activeView === View.VOCABULARY && (
            <VocabularyList 
              vocabulary={vocabulary} 
              learningLog={{}} 
            />
          )}
          {activeView === View.ACCOUNT && (
            <AccountView 
              settings={settings}
              vocabulary={vocabulary} 
              onOpenSettings={() => setIsSettingsOpen(true)} 
            />
          )}
          {activeView === View.MANUAL_ADD && (
            <ManualAdd addWordsToVocabulary={addWordsToVocabulary} />
          )}
        </div>
      </main>

      {/* Navigation */}
      <BottomNav 
        activeView={activeView} 
        setActiveView={setActiveView} 
        reviewCount={reviewCount} 
      />

      {isSettingsOpen && (
        <SettingsPanel 
          settings={settings} 
          updateSettings={handleUpdateSettings} 
          onClose={() => setIsSettingsOpen(false)} 
        />
      )}
    </div>
  );
};

export default App;
