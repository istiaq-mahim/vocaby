
import React from 'react';
import type { LearnedWord } from '../types';

interface AccountViewProps {
  session: { user: { name: string; email: string; image?: string; isGuest?: boolean } };
  vocabulary: LearnedWord[];
  onSignOut: () => void;
  onOpenSettings: () => void;
}

const AccountView: React.FC<AccountViewProps> = ({ session, vocabulary, onSignOut, onOpenSettings }) => {
  const stats = {
    total: vocabulary.length,
    mastered: vocabulary.filter(w => (w.srsLevel || 0) >= 5).length,
    learning: vocabulary.filter(w => (w.srsLevel || 0) > 0 && (w.srsLevel || 0) < 5).length,
  };

  const level = Math.floor(stats.total / 50) + 1;
  const xp = stats.total % 50;
  const xpProgress = (xp / 50) * 100;

  return (
    <div className="space-y-10 animate-slide-up pb-10">
      
      {/* Profile Header */}
      <div className="p-1 glass rounded-4xl shadow-xl border border-slate-200 dark:border-slate-800 relative">
        <button 
          onClick={onOpenSettings}
          className="absolute top-6 right-6 p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-primary hover:text-white transition-all shadow-sm"
        >
          ⚙️
        </button>
        
        <div className="p-8 md:p-10 flex flex-col md:flex-row items-center gap-8">
            <div className="relative group">
                <div className="absolute inset-0 bg-primary/20 blur-2xl group-hover:bg-primary/40 transition-colors"></div>
                <div className="w-32 h-32 rounded-4xl card-gradient relative flex items-center justify-center text-white text-5xl font-black shadow-2xl border-4 border-white dark:border-slate-900 group-hover:rotate-3 transition-transform">
                    {session.user.name.charAt(0)}
                </div>
                <div className="absolute -bottom-2 -right-2 bg-white dark:bg-slate-800 px-3 py-1 rounded-full shadow-lg border dark:border-slate-700 text-xs font-black text-primary">LVL {level}</div>
            </div>
            
            <div className="text-center md:text-left flex-grow space-y-2">
                <div className="flex flex-col md:flex-row md:items-center gap-2 justify-center md:justify-start">
                  <h2 className="text-4xl font-display font-black tracking-tight">{session.user.name}</h2>
                  {session.user.isGuest && (
                    <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-[10px] font-black uppercase rounded-lg w-fit mx-auto md:mx-0">Guest Mode</span>
                  )}
                </div>
                <p className="text-slate-400 font-medium">{session.user.email}</p>
                
                <div className="pt-4 w-full max-w-sm space-y-2">
                    <div className="flex justify-between text-xs font-black uppercase tracking-widest text-slate-400">
                        <span>Level Progress</span>
                        <span>{xp} / 50 words to LVL {level + 1}</span>
                    </div>
                    <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden border dark:border-slate-700 p-0.5">
                        <div className="h-full card-gradient rounded-full transition-all duration-1000 ease-out shadow-inner" style={{ width: `${xpProgress}%` }}></div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Words Known" value={stats.total} color="primary" icon="📔" />
        <StatCard label="In Progress" value={stats.learning} color="amber" icon="🔥" />
        <StatCard label="Mastered" value={stats.mastered} color="green" icon="🎓" />
      </div>

      <div className="p-8 glass rounded-4xl border border-primary/10">
        <h3 className="text-xl font-display font-black mb-4">Account Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button 
              onClick={onOpenSettings}
              className="flex items-center gap-4 p-5 rounded-3xl bg-slate-100 dark:bg-slate-800 hover:bg-primary hover:text-white transition-all group border dark:border-slate-700"
            >
              <span className="text-2xl group-hover:scale-110 transition-transform">⚙️</span>
              <div className="text-left">
                <p className="font-bold">Preferences</p>
                <p className="text-[10px] opacity-60 font-medium">Notifications, Dark Mode</p>
              </div>
            </button>
            <button 
              onClick={onSignOut}
              className="flex items-center gap-4 p-5 rounded-3xl bg-red-50 dark:bg-red-900/10 hover:bg-red-500 hover:text-white transition-all group border border-red-100 dark:border-red-900/20"
            >
              <span className="text-2xl group-hover:rotate-12 transition-transform">🚪</span>
              <div className="text-left">
                <p className="font-bold">Logout</p>
                <p className="text-[10px] opacity-60 font-medium">Sign out from this device</p>
              </div>
            </button>
        </div>
      </div>
      
      {session.user.isGuest && (
        <div className="p-6 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/30 rounded-3xl text-amber-800 dark:text-amber-400">
          <p className="text-sm font-bold flex gap-2">
            <span>⚠️</span> 
            You are using Guest Mode. Sign in with Google to sync your progress across devices and save your learned words to the cloud.
          </p>
        </div>
      )}
    </div>
  );
};

const StatCard: React.FC<{label: string, value: number, color: string, icon: string}> = ({label, value, color, icon}) => (
    <div className="p-8 glass rounded-4xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all group">
        <div className="flex justify-between items-center mb-4">
            <span className="text-2xl">{icon}</span>
            <div className={`w-2 h-2 rounded-full bg-${color}-500 animate-pulse`}></div>
        </div>
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</p>
        <p className="text-4xl font-display font-black text-slate-900 dark:text-white mt-1 group-hover:scale-110 transition-transform origin-left">{value}</p>
    </div>
);

export default AccountView;
