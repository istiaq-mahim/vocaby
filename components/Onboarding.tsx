
import React, { useState } from 'react';
import type { Settings } from '../types';

interface OnboardingProps {
  onComplete: (settings: Omit<Settings, 'darkMode' | 'readingMode'>) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [wordCount, setWordCount] = useState<number>(10);
  const [notificationTime, setNotificationTime] = useState('08:00');

  const wordOptions = [5, 10, 15, 20];

  const handleNext = () => setStep(step + 1);
  
  const handleFinish = () => {
    const [hour, minute] = notificationTime.split(':').map(Number);
    onComplete({
      wordCount,
      notificationHour: hour,
      notificationMinute: minute,
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full animate-in">
        <h1 className="text-4xl font-extrabold text-[#0052CC] mb-3">Welcome to Vocaby!</h1>
        <p className="text-slate-500 dark:text-gray-400 text-lg mb-12">Let's set up your daily learning habit.</p>

        {step === 1 && (
          <div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-gray-200 mb-8">How many new words do you want to learn each day?</h2>
            <div className="grid grid-cols-2 gap-4 mb-16">
              {wordOptions.map(option => (
                <button
                  key={option}
                  onClick={() => setWordCount(option)}
                  className={`py-8 rounded-xl text-3xl font-bold transition-all duration-300 ${
                    wordCount === option
                      ? 'bg-primary text-white shadow-xl shadow-blue-200'
                      : 'bg-slate-50 text-slate-800 dark:bg-gray-800 dark:text-gray-200 hover:bg-slate-100'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            <button
              onClick={handleNext}
              className="w-full bg-primary text-white font-bold py-5 px-4 rounded-xl text-lg hover:bg-blue-700 transition-all shadow-lg"
            >
              Next
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-gray-200 mb-8">When should we remind you?</h2>
            <div className="flex justify-center items-center mb-16">
              <div className="relative group">
                <input
                  type="time"
                  value={notificationTime}
                  onChange={(e) => setNotificationTime(e.target.value)}
                  className="p-6 pr-12 border-none rounded-xl bg-slate-50 dark:bg-gray-800 dark:text-gray-200 text-3xl w-64 text-center font-bold focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all appearance-none"
                />
                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-2xl opacity-20 group-hover:opacity-40 pointer-events-none">🕒</span>
              </div>
            </div>
             <button
              onClick={handleNext}
              className="w-full bg-primary text-white font-bold py-5 px-4 rounded-xl text-lg hover:bg-blue-700 transition-all shadow-lg"
            >
              Continue
            </button>
          </div>
        )}

        {step === 3 && (
          <div>
            <h1 className="text-4xl font-extrabold text-[#0052CC] mb-3">One Last Step</h1>
            <p className="text-slate-500 dark:text-gray-400 text-lg mb-8">Enable notifications to get your daily learning reminders.</p>
            <div className="bg-slate-50 dark:bg-gray-800 p-8 rounded-2xl text-left mb-10 border border-slate-100 dark:border-gray-700">
                <h3 className="font-bold text-xl text-slate-800 dark:text-gray-200 mb-3">Why enable notifications?</h3>
                <p className="text-slate-500 dark:text-gray-400 leading-relaxed">We'll send you a daily reminder to help you build a consistent learning habit. You can manage this in your browser settings anytime.</p>
            </div>
             <button
              onClick={handleFinish}
              className="w-full bg-primary text-white font-bold py-5 px-4 rounded-xl text-lg hover:bg-blue-700 transition-all shadow-lg mb-6"
            >
              Allow Notifications & Start Learning
            </button>
            <button
              onClick={handleFinish}
              className="text-slate-400 font-bold hover:text-slate-600 transition-colors"
            >
              Maybe Later
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
