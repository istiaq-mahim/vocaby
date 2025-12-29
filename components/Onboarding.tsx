
import React, { useState } from 'react';
import type { Settings } from '../types';

interface OnboardingProps {
  onComplete: (settings: Omit<Settings, 'darkMode' | 'readingMode'>) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [wordCount, setWordCount] = useState<number>(10);
  const [notificationTime, setNotificationTime] = useState('08:00');
  const [notificationPermission, setNotificationPermission] = useState(Notification.permission);

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

  const handleRequestPermission = async () => {
    const permission = await Notification.requestPermission();
    setNotificationPermission(permission);
    handleFinish(); // Finish onboarding regardless of permission status
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col items-center justify-center p-4 text-center">
      <div className="max-w-md w-full">
        {step < 3 && <h1 className="text-3xl font-bold text-primary mb-2">Welcome to Vocaby!</h1>}
        {step < 3 && <p className="text-textLight dark:text-gray-400 mb-8">Let's set up your daily learning habit.</p>}

        {step === 1 && (
          <div className="animate-fade-in">
            <h2 className="text-xl font-semibold text-textDark dark:text-gray-200 mb-4">How many new words do you want to learn each day?</h2>
            <div className="grid grid-cols-2 gap-4">
              {wordOptions.map(option => (
                <button
                  key={option}
                  onClick={() => setWordCount(option)}
                  className={`p-6 rounded-lg text-2xl font-bold transition-all duration-200 ${
                    wordCount === option
                      ? 'bg-primary text-white scale-105 shadow-lg'
                      : 'bg-secondary text-textDark dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            <button
              onClick={handleNext}
              className="mt-10 w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Next
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-in">
            <h2 className="text-xl font-semibold text-textDark dark:text-gray-200 mb-4">When should we remind you?</h2>
            <div className="flex justify-center items-center gap-4">
              <input
                type="time"
                value={notificationTime}
                onChange={(e) => setNotificationTime(e.target.value)}
                className="p-3 border rounded-lg bg-secondary dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 text-2xl w-48 text-center focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
             <button
              onClick={handleNext}
              className="mt-10 w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Continue
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="animate-fade-in">
            <h1 className="text-3xl font-bold text-primary mb-2">One Last Step</h1>
            <p className="text-textLight dark:text-gray-400 mb-8">Enable notifications to get your daily learning reminders.</p>
            <div className="bg-secondary dark:bg-gray-800 p-6 rounded-lg text-left mb-6">
                <h3 className="font-bold text-textDark dark:text-gray-200">Why enable notifications?</h3>
                <p className="text-sm text-textLight dark:text-gray-400 mt-1">We'll send you a daily reminder to help you build a consistent learning habit. You can manage this in your browser settings anytime.</p>
            </div>
             <button
              onClick={handleRequestPermission}
              className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Allow Notifications & Start Learning
            </button>
            <button
              onClick={handleFinish}
              className="mt-4 w-full text-sm text-textLight dark:text-gray-400 hover:text-textDark dark:hover:text-gray-200"
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