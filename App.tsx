
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import DailyWords from './components/DailyWords';
import VocabularyList from './components/VocabularyList';
import BottomNav from './components/BottomNav';
import SettingsPanel from './components/SettingsPanel';
import AccountView from './components/AccountView';
import { View } from './types';
import type { Word, Settings, LearnedWord } from './types';
import Review from './components/Review';
import ManualAdd from './components/ManualAdd';
import { VOCABULARY_KEY, SETTINGS_KEY } from './constants';

const App: React.FC = () => {
  const [settings, setSettings] = useState<Settings>(() => {
    const saved = localStorage.getItem(SETTINGS_KEY);
    return saved ? JSON.parse(saved) : {
      wordCount: 5,
      notificationHour: 8,
      notificationMinute: 0,
      darkMode: false,
      readingMode: false
    };
  });
  
  const [vocabulary, setVocabulary] = useState<LearnedWord[]>(() => {
    const saved = localStorage.getItem(VOCABULARY_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const [activeView, setActiveView] = useState<View>(View.DAILY);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    if (settings.darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
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

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Simple Header */}
      <header className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 px-6 py-4 flex justify-between items-center sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg"></div>
          <h1 className="text-xl font-extrabold tracking-tight text-primary">VOCABY</h1>
        </div>
        <button 
          onClick={() => setActiveView(View.ACCOUNT)}
          className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-sm font-bold"
        >
          👤
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-4 max-w-2xl mx-auto w-full pb-24">
        <div className="animate-in">
          {activeView === View.DAILY && (
            <DailyWords 
              settings={settings} 
              addWordsToVocabulary={addWordsToVocabulary} 
              user={{ name: 'Student', email: 'local', isGuest: true }} 
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
              session={{ user: { name: 'Local Student', email: 'local-mode' } }} 
              vocabulary={vocabulary} 
              onSignOut={() => {}} 
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
          updateSettings={(s) => setSettings(prev => ({ ...prev, ...s }))} 
          onClose={() => setIsSettingsOpen(false)} 
        />
      )}
    </div>
  );
};

export default App;
