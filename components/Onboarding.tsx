
import React, { useState } from 'react';
import type { Settings, LearningGoal } from '../types';

interface OnboardingProps {
  onComplete: (settings: Omit<Settings, 'darkMode' | 'readingMode'>) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [nickname, setNickname] = useState('');
  const [age, setAge] = useState<number>(22);
  const [goal, setGoal] = useState<LearningGoal>('ielts');
  const [wordCount, setWordCount] = useState(10);
  const [notificationTime, setNotificationTime] = useState('08:00');

  const goals: { id: LearningGoal; label: string; desc: string; icon: string }[] = [
    { 
        id: 'ielts', 
        label: 'IELTS Academic', 
        desc: 'Academic vocabulary for achieving Band 7.5+ in Writing/Reading.', 
        icon: '🎓' 
    },
    { 
        id: 'competitive', 
        label: 'Exam Excellence', 
        desc: 'High-yield words from BCS, Govt Banks, and Medical/DU Admission.', 
        icon: '🏛️' 
    },
    { 
        id: 'general', 
        label: 'Practical Social English', 
        desc: 'Smart words for the Market, Office, Hospital, and Daily Commute.', 
        icon: '🌍' 
    },
  ];

  const handleFinish = () => {
    const [hour, minute] = notificationTime.split(':').map(Number);
    onComplete({ 
      nickname: nickname || 'Learner', 
      age: age || 22, 
      goal, 
      wordCount, 
      notificationHour: hour, 
      notificationMinute: minute 
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-900 flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full animate-in">
        
        {step === 0 && (
          <div className="space-y-8">
             <div className="space-y-2 text-center">
                <h1 className="text-4xl font-black text-primary tracking-tighter uppercase mb-2">VOCABY</h1>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Create Profile</h2>
                <p className="text-slate-500 font-medium">Let's get to know you!</p>
             </div>
             
             <div className="space-y-6 text-left">
                <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Nickname</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Tanvir"
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                      className="w-full p-6 rounded-2xl bg-white border-2 border-slate-100 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all font-bold text-lg"
                    />
                </div>
                
                <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Your Age</label>
                    <input 
                      type="number" 
                      min="10" 
                      max="99"
                      value={age}
                      onChange={(e) => setAge(parseInt(e.target.value))}
                      className="w-full p-6 rounded-2xl bg-white border-2 border-slate-100 focus:border-primary outline-none transition-all font-black text-3xl text-center"
                    />
                    <p className="text-[10px] text-slate-400 text-center italic mt-1">Age helps us tailor word complexity for Social English.</p>
                </div>
             </div>
             
             <button 
                onClick={() => setStep(1)} 
                disabled={!nickname || !age}
                className="w-full bg-primary text-white font-black py-5 rounded-2xl shadow-xl hover:scale-[1.02] transition-transform disabled:opacity-50"
             >
                Start Learning
             </button>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-8">
             <div className="space-y-2">
                <h2 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">Select Pathway</h2>
                <p className="text-slate-500 font-medium">Where do you want to excel?</p>
             </div>
             
             <div className="space-y-4">
                {goals.map(g => (
                    <button
                        key={g.id}
                        onClick={() => setGoal(g.id)}
                        className={`w-full p-6 rounded-[2rem] border-2 text-left transition-all duration-300 ${
                            goal === g.id 
                            ? 'border-primary bg-blue-50 shadow-xl shadow-blue-500/10' 
                            : 'border-white bg-white hover:border-slate-200'
                        }`}
                    >
                        <div className="flex items-center gap-4">
                            <span className="text-4xl">{g.icon}</span>
                            <div className="flex-1">
                                <h3 className="font-bold text-lg text-slate-800">{g.label}</h3>
                                <p className="text-xs text-slate-400 mt-1">{g.desc}</p>
                            </div>
                            {goal === g.id && (
                                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4"><polyline points="20 6 9 17 4 12"/></svg>
                                </div>
                            )}
                        </div>
                    </button>
                ))}
             </div>
             <div className="flex gap-4">
                <button onClick={() => setStep(0)} className="w-1/4 bg-slate-200 text-slate-600 font-black py-5 rounded-2xl">Back</button>
                <button onClick={() => setStep(2)} className="flex-1 bg-primary text-white font-black py-5 rounded-2xl shadow-xl hover:scale-[1.02] transition-transform">Next Step</button>
             </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8">
             <div className="space-y-2">
                <h2 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">Daily Target</h2>
                <p className="text-slate-500 font-medium">How many new words per day?</p>
             </div>
             
             <div className="grid grid-cols-2 gap-4">
                {[5, 10, 15, 20].map(count => (
                  <button
                    key={count}
                    onClick={() => setWordCount(count)}
                    className={`p-8 rounded-[2rem] border-2 font-black text-3xl transition-all ${
                      wordCount === count 
                      ? 'border-primary bg-blue-50 text-primary shadow-lg' 
                      : 'border-white bg-white text-slate-400'
                    }`}
                  >
                    {count}
                  </button>
                ))}
             </div>
             
             <div className="flex gap-4">
                <button onClick={() => setStep(1)} className="w-1/4 bg-slate-200 text-slate-600 font-black py-5 rounded-2xl">Back</button>
                <button onClick={() => setStep(3)} className="flex-1 bg-primary text-white font-black py-5 rounded-2xl shadow-xl hover:scale-[1.02] transition-transform">Final Step</button>
             </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-10">
            <div className="space-y-2">
                <h2 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">Reminder Time</h2>
                <p className="text-slate-400 font-medium italic">"Consistency is the key to mastery."</p>
            </div>
            
            <input 
                type="time" 
                value={notificationTime} 
                onChange={(e) => setNotificationTime(e.target.value)} 
                className="p-8 border-none rounded-[2rem] bg-white text-5xl w-full text-center font-black shadow-inner" 
            />
            
            <div className="flex gap-4">
                <button onClick={() => setStep(2)} className="w-1/4 bg-slate-200 text-slate-600 font-black py-5 rounded-2xl">Back</button>
                <button onClick={handleFinish} className="flex-1 bg-primary text-white font-black py-5 rounded-2xl shadow-xl shadow-blue-500/20">Let's Begin</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
