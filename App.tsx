
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import DailyWords from './components/DailyWords';
import VocabularyList from './components/VocabularyList';
import BottomNav from './components/BottomNav';
import SettingsPanel from './components/SettingsPanel';
import LandingPage from './components/LandingPage';
import AccountView from './components/AccountView';
import { View } from './types';
import type { Word, Settings, LearnedWord } from './types';
import Review from './components/Review';
import ManualAdd from './components/ManualAdd';

const App: React.FC = () => {
  const [session, setSession] = useState<{ user: { name: string; email: string; image?: string } } | null>(null);
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

  useEffect(() => {
    const checkAuth = async () => {
        try {
            const res = await fetch('/api/words'); 
            if (res.ok) {
                const data = await res.json();
                setSession({ user: { name: "IELTS Candidate", email: "candidate@vocaby.bd" } });
                const formatted = data.map((item: any) => ({
                    ...item.word_data,
                    srsLevel: item.srs_level,
                    nextReview: item.next_review,
                    learnedOn: item.learned_on || new Date().toISOString().split('T')[0]
                }));
                setVocabulary(formatted);
            } else {
                setActiveView(View.LANDING);
            }
        } catch (e) {
            setActiveView(View.LANDING);
        } finally {
            setIsReady(true);
        }
    };
    checkAuth();
  }, []);

  useEffect(() => {
    if (settings.darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [settings.darkMode]);

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

  const reviewCount = useMemo(() => {
      const today = new Date().toISOString().split('T')[0];
      return vocabulary.filter(word => (word.nextReview || '9999-12-31') <= today).length;
  }, [vocabulary]);

  if (!isReady) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950">
        <div className="flex flex-col items-center gap-6">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="font-display text-xl font-bold text-primary animate-pulse tracking-tight">Initializing Vocaby...</p>
        </div>
      </div>
    );
  }

  if (activeView === View.LANDING || !session) {
    return <LandingPage onLogin={() => window.location.href = '/api/auth/signin'} />;
  }

  return (
    <div className={`min-h-screen font-sans ${settings.darkMode ? 'dark text-slate-100' : 'text-slate-900'}`}>
      
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[5%] right-[-5%] w-[30%] h-[30%] bg-accent/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="flex flex-col md:flex-row min-h-screen max-w-screen-2xl mx-auto">
        
        {/* Sidebar (Desktop) */}
        <aside className="hidden md:flex md:w-80 p-8 flex-col shrink-0 sticky top-0 h-screen">
          <div className="mb-12 group">
            <h1 className="text-4xl font-display font-black text-primary tracking-tighter group-hover:scale-105 transition-transform origin-left">VOCABY</h1>
            <div className="h-1 w-12 bg-accent rounded-full mt-1"></div>
            <p className="text-xs font-semibold text-slate-400 mt-3 tracking-widest uppercase">IELTS Master Edition</p>
          </div>
          
          <nav className="flex flex-col gap-2 w-full">
            <SidebarBtn active={activeView === View.DAILY} onClick={() => setActiveView(View.DAILY)} icon="✨" label="Daily Learning" />
            <SidebarBtn 
                active={activeView === View.REVIEW} 
                onClick={() => setActiveView(View.REVIEW)} 
                icon="🔄" 
                label="Spaced Review" 
                badge={reviewCount} 
            />
            <SidebarBtn active={activeView === View.VOCABULARY} onClick={() => setActiveView(View.VOCABULARY)} icon="📚" label="My Journal" />
            <SidebarBtn active={activeView === View.ACCOUNT} onClick={() => setActiveView(View.ACCOUNT)} icon="👤" label="My Progress" />
          </nav>

          <div className="mt-auto space-y-4">
            <button onClick={() => setIsSettingsOpen(true)} className="flex items-center gap-3 w-full p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/50 hover:bg-slate-200 dark:hover:bg-slate-800 transition-all font-semibold">
                <span>⚙️</span> Settings
            </button>
            <div className="p-5 glass rounded-3xl border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl card-gradient flex items-center justify-center text-white font-bold text-xl shadow-lg">
                        {session.user.name.charAt(0)}
                    </div>
                    <div>
                        <p className="text-sm font-bold truncate">{session.user.name}</p>
                        <p className="text-[10px] opacity-50 truncate">{session.user.email}</p>
                    </div>
                </div>
            </div>
          </div>
        </aside>

        {/* Top Header (Mobile) */}
        <header className="md:hidden flex justify-between items-center p-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg sticky top-0 z-40 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg card-gradient shadow-md"></div>
                <h1 className="text-2xl font-display font-black text-primary tracking-tighter">VOCABY</h1>
            </div>
            <button onClick={() => setActiveView(View.ACCOUNT)} className="w-10 h-10 rounded-full border-2 border-primary/20 p-0.5 overflow-hidden">
                <div className="w-full h-full rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-primary">
                    {session.user.name.charAt(0)}
                </div>
            </button>
        </header>

        {/* Main Content */}
        <main className={`flex-grow p-4 md:p-12 pb-32 md:pb-12 ${settings.readingMode ? 'max-w-3xl mx-auto' : ''}`}>
          <div className="animate-slide-up">
            {activeView === View.DAILY && <DailyWords settings={settings} addWordsToVocabulary={addWordsToVocabulary} />}
            {activeView === View.REVIEW && <Review vocabulary={vocabulary} updateWordSrs={() => {}} />}
            {activeView === View.MANUAL_ADD && <ManualAdd addWordsToVocabulary={addWordsToVocabulary} />}
            {activeView === View.VOCABULARY && <VocabularyList vocabulary={vocabulary} learningLog={{}} />}
            {activeView === View.ACCOUNT && <AccountView session={session} vocabulary={vocabulary} />}
          </div>
        </main>
      </div>

      {/* Mobile Nav */}
      <BottomNav 
          activeView={activeView} 
          setActiveView={setActiveView} 
          onSettingsClick={() => setIsSettingsOpen(true)}
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

const SidebarBtn: React.FC<{active: boolean, onClick: () => void, icon: string, label: string, badge?: number}> = ({active, onClick, icon, label, badge}) => (
    <button 
        onClick={onClick} 
        className={`flex items-center gap-4 w-full p-4 rounded-2xl transition-all font-bold ${active ? 'bg-primary text-white shadow-xl shadow-primary/30 -translate-x-1' : 'hover:bg-primary/10 text-slate-500 dark:text-slate-400'}`}
    >
        <span className="text-xl">{icon}</span>
        <span className="flex-grow text-left">{label}</span>
        {badge && badge > 0 && <span className={`px-2 py-0.5 rounded-full text-[10px] ${active ? 'bg-white text-primary' : 'bg-accent text-white'}`}>{badge}</span>}
    </button>
);

export default App;
