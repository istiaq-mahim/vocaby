
import React, { useState } from 'react';
import type { Settings, LearningGoal } from '../types';

interface OnboardingProps {
  onComplete: (settings: Omit<Settings, 'darkMode' | 'readingMode'>) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState<LearningGoal>('ielts');
  const [notificationTime, setNotificationTime] = useState('08:00');

  const goals: { id: LearningGoal; label: string; desc: string; icon: string }[] = [
    { 
        id: 'ielts', 
        label: 'IELTS Academic', 
        desc: 'Academic vocabulary for Band 7.5+ scoring.', 
        icon: '🎓' 
    },
    { 
        id: 'competitive', 
        label: 'BCS & Job Prep', 
        desc: 'High-frequency words for BCS and Bank job exams.', 
        icon: '🏛️' 
    },
    { 
        id: 'general', 
        label: 'General English', 
        desc: 'Intermediate words for social and professional life.', 
        icon: '🌍' 
    },
  ];

  const handleFinish = () => {
    const [hour, minute] = notificationTime.split(':').map(Number);
    onComplete({ goal, wordCount: 30, notificationHour: hour, notificationMinute: minute });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-900 flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full animate-in">
        
        {step === 0 && (
          <div className="space-y-8">
             <div className="space-y-2">
                <h1 className="text-4xl font-black text-primary tracking-tighter">Welcome to Vocaby</h1>
                <p className="text-slate-500 font-medium">What is your learning goal?</p>
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
             <button onClick={() => setStep(1)} className="w-full bg-primary text-white font-black py-5 rounded-2xl shadow-xl hover:scale-[1.02] transition-transform">Continue</button>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-10">
            <div className="space-y-2">
                <h2 className="text-3xl font-black text-slate-800 tracking-tight">Preferred Time?</h2>
                <p className="text-slate-400 font-medium">We'll send a daily reminder.</p>
            </div>
            
            <input 
                type="time" 
                value={notificationTime} 
                onChange={(e) => setNotificationTime(e.target.value)} 
                className="p-8 border-none rounded-[2rem] bg-white text-5xl w-full text-center font-black shadow-inner" 
            />
            
            <button onClick={handleFinish} className="w-full bg-primary text-white font-black py-5 rounded-2xl shadow-xl shadow-blue-500/20">Get Started</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
