
import React from 'react';
import type { LearnedWord } from '../types';

interface AccountViewProps {
  session: { user: { name: string; email: string; image?: string } };
  vocabulary: LearnedWord[];
}

const AccountView: React.FC<AccountViewProps> = ({ session, vocabulary }) => {
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
      <div className="p-1 glass rounded-4xl shadow-xl border border-slate-200 dark:border-slate-800">
        <div className="p-8 md:p-10 flex flex-col md:flex-row items-center gap-8">
            <div className="relative group">
                <div className="absolute inset-0 bg-primary/20 blur-2xl group-hover:bg-primary/40 transition-colors"></div>
                <div className="w-32 h-32 rounded-4xl card-gradient relative flex items-center justify-center text-white text-5xl font-black shadow-2xl border-4 border-white dark:border-slate-900 group-hover:rotate-3 transition-transform">
                    {session.user.name.charAt(0)}
                </div>
                <div className="absolute -bottom-2 -right-2 bg-white dark:bg-slate-800 px-3 py-1 rounded-full shadow-lg border dark:border-slate-700 text-xs font-black text-primary">LVL {level}</div>
            </div>
            
            <div className="text-center md:text-left flex-grow space-y-2">
                <h2 className="text-4xl font-display font-black tracking-tight">{session.user.name}</h2>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AchievementCard title="Early Bird" desc="Studied before 8 AM for 3 days" icon="🌅" achieved={true} />
        <AchievementCard title="Century Club" desc="Learn 100 unique words" icon="💯" achieved={stats.total >= 100} />
      </div>

      <button 
        onClick={() => window.location.href = '/api/auth/signout'}
        className="w-full p-6 glass hover:bg-red-50 dark:hover:bg-red-900/10 text-red-500 font-bold rounded-3xl transition-all border border-red-100 dark:border-red-900/20"
      >
        Sign Out & Secure Account
      </button>
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

const AchievementCard: React.FC<{title: string, desc: string, icon: string, achieved: boolean}> = ({title, desc, icon, achieved}) => (
    <div className={`p-6 rounded-4xl border transition-all flex items-center gap-5 ${achieved ? 'glass border-primary/20' : 'opacity-40 grayscale border-slate-200 dark:border-slate-800'}`}>
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-lg ${achieved ? 'card-gradient text-white' : 'bg-slate-200 dark:bg-slate-800'}`}>
            {icon}
        </div>
        <div>
            <h4 className="font-bold text-lg">{title}</h4>
            <p className="text-xs text-slate-400 font-medium">{desc}</p>
        </div>
        {achieved && <span className="ml-auto text-primary">✔</span>}
    </div>
);

export default AccountView;
