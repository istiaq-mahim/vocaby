
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Onboarding from './components/Onboarding';
import DailyWords from './components/DailyWords';
import VocabularyList from './components/VocabularyList';
import BottomNav from './components/BottomNav';
import SettingsPanel from './components/SettingsPanel';
import { useLocalStorage } from './hooks/useLocalStorage';
import { View } from './types';
import type { Word, Settings, LearnedWord, LearningLog } from './types';
import { SETTINGS_KEY, VOCABULARY_KEY, LEARNING_LOG_KEY, NOTIFICATION_STATE_KEY_PREFIX } from './constants';
import Review from './components/Review';
import ManualAdd from './components/ManualAdd';

const App: React.FC = () => {
  const [settings, setSettings] = useLocalStorage<Settings | null>(SETTINGS_KEY, null);
  const [vocabulary, setVocabulary] = useLocalStorage<LearnedWord[]>(VOCABULARY_KEY, []);
  const [learningLog, setLearningLog] = useLocalStorage<LearningLog>(LEARNING_LOG_KEY, {});
  const [activeView, setActiveView] = useState<View>(View.DAILY);
  const [isReady, setIsReady] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  const getToday = () => new Date().toISOString().split('T')[0];

  useEffect(() => {
    try {
      const storedSettings = localStorage.getItem(SETTINGS_KEY);
      if (storedSettings) {
        setSettings(JSON.parse(storedSettings));
      }
    } catch (err) {
      console.warn("Failed to parse settings from localStorage:", err);
    } finally {
      setIsReady(true);
    }
  }, [setSettings]);
  
  useEffect(() => {
    if (settings) {
      const root = document.documentElement;
      root.classList.toggle('dark', settings.darkMode);
      root.classList.toggle('reading-mode', settings.readingMode);
    }
  }, [settings]);

  const handleOnboardingComplete = (newSettings: Omit<Settings, 'darkMode' | 'readingMode'>) => {
    setSettings({
      ...newSettings,
      darkMode: false,
      readingMode: false,
    });
  };
  
  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings(prev => ({ ...prev!, ...newSettings }));
  };

  const addWordsToVocabulary = useCallback((newWords: Word[]) => {
    const today = getToday();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];

    const wordsToLearn: LearnedWord[] = newWords.map(word => ({
        ...word,
        learnedOn: today,
        srsLevel: 0,
        nextReview: tomorrowStr,
    }));

    setVocabulary(prev => {
        const existingWords = new Set(prev.map(w => w.word.toLowerCase()));
        const uniqueNewWords = wordsToLearn.filter(nw => !existingWords.has(nw.word.toLowerCase()));
        return [...prev, ...uniqueNewWords];
    });

    setLearningLog(prev => ({ ...prev, [today]: { status: 'learned' } }));
  }, [setVocabulary, setLearningLog]);
  
  const updateWordSrs = useCallback((wordToUpdate: LearnedWord, newSrsData: { srsLevel: number; nextReview: string }) => {
      setVocabulary(prev => 
          prev.map(word => 
              word.word.toLowerCase() === wordToUpdate.word.toLowerCase()
                  ? { ...word, ...newSrsData }
                  : word
          )
      );
  }, [setVocabulary]);

  const reviewCount = useMemo(() => {
      const today = getToday();
      return vocabulary.filter(word => (word.nextReview || '9999-12-31') <= today).length;
  }, [vocabulary]);

  const showNotification = useCallback((title: string, options: NotificationOptions) => {
    if (!('Notification' in window) || !navigator.serviceWorker.ready) {
      return;
    }
    if (Notification.permission === 'granted') {
      navigator.serviceWorker.ready.then(reg => {
        reg.showNotification(title, options);
      });
    }
  }, []);

  const showFollowUpNotification = useCallback(() => {
    const today = getToday();
    const stateKey = `${NOTIFICATION_STATE_KEY_PREFIX}${today}`;
    
    localStorage.setItem(stateKey, JSON.stringify({ count: 2 }));
    setLearningLog(prev => ({ ...prev, [today]: { status: 'declined' } }));
    
    showNotification("Just a final reminder!", {
        body: "A few minutes is all it takes to learn something new.",
        tag: 'daily-reminder-followup'
    });
  }, [setLearningLog, showNotification]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
        if (event.data?.type === 'notification-action') {
            const delay = event.data.action === 'busy' ? 90 * 60 * 1000 : 60 * 60 * 1000;
            setTimeout(showFollowUpNotification, delay);
        }
    };
    navigator.serviceWorker.addEventListener('message', handleMessage);
    return () => navigator.serviceWorker.removeEventListener('message', handleMessage);
  }, [showFollowUpNotification]);

  useEffect(() => {
    if (!settings) return;

    const checkTimeAndNotify = () => {
        if (Notification.permission !== 'granted') return;
        
        const now = new Date();
        const today = getToday();
        const stateKey = `${NOTIFICATION_STATE_KEY_PREFIX}${today}`;
        const notifStateString = localStorage.getItem(stateKey);
        let notifState = { count: 0 };
        try {
          if (notifStateString) notifState = JSON.parse(notifStateString);
        } catch (e) {}
        
        const notificationTimeToday = new Date(today);
        notificationTimeToday.setHours(settings.notificationHour);
        notificationTimeToday.setMinutes(settings.notificationMinute);
        
        if (now >= notificationTimeToday && notifState.count === 0) {
            showNotification("Are u free to learn?", {
                body: "Time for your daily vocabulary!",
                actions: [
                    { action: 'busy', title: 'Busy' },
                    { action: 'later', title: 'Later' },
                ],
                tag: 'daily-reminder',
                renotify: true,
            });
            localStorage.setItem(stateKey, JSON.stringify({ count: 1 }));
        }
    };

    checkTimeAndNotify();
    const interval = setInterval(checkTimeAndNotify, 60000);

    return () => clearInterval(interval);
  }, [settings, showNotification]);

  if (!isReady) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-transparent">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary"></div>
      </div>
    );
  }

  if (!settings) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="min-h-screen bg-transparent text-textDark dark:text-secondary font-sans flex flex-col">
      <main className="flex-grow pb-20">
        <div className="max-w-md mx-auto p-4">
          {activeView === View.DAILY && <DailyWords settings={settings} addWordsToVocabulary={addWordsToVocabulary} />}
          {activeView === View.REVIEW && <Review vocabulary={vocabulary} updateWordSrs={updateWordSrs} />}
          {activeView === View.MANUAL_ADD && <ManualAdd addWordsToVocabulary={addWordsToVocabulary} />}
          {activeView === View.VOCABULARY && <VocabularyList vocabulary={vocabulary} learningLog={learningLog} />}
        </div>
      </main>
      <BottomNav 
        activeView={activeView} 
        setActiveView={setActiveView} 
        onSettingsClick={() => setIsSettingsOpen(true)}
        reviewCount={reviewCount}
      />
      {isSettingsOpen && (
        <SettingsPanel 
            settings={settings} 
            updateSettings={updateSettings} 
            onClose={() => setIsSettingsOpen(false)} 
        />
      )}
    </div>
  );
};

export default App;
