
import React from 'react';
import type { Settings } from '../types';
import { XIcon } from './icons/XIcon';

interface SettingsPanelProps {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
  onClose: () => void;
}

const Toggle: React.FC<{ label: string; isEnabled: boolean; onToggle: () => void; description: string; }> = ({ label, isEnabled, onToggle, description }) => (
  <div className="flex justify-between items-center py-3">
    <div>
        <label htmlFor={label} className="font-semibold text-textDark dark:text-gray-200">{label}</label>
        <p className="text-sm text-textLight dark:text-gray-400">{description}</p>
    </div>
    <button
      id={label}
      role="switch"
      aria-checked={isEnabled}
      onClick={onToggle}
      className={`${
        isEnabled ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'
      } relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary`}
    >
      <span
        className={`${
          isEnabled ? 'translate-x-6' : 'translate-x-1'
        } inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200 ease-in-out`}
      />
    </button>
  </div>
);


const SettingsPanel: React.FC<SettingsPanelProps> = ({ settings, updateSettings, onClose }) => {
  const wordOptions = [5, 10, 15, 20];

  const formatTime = (hour: number, minute: number) => {
    const h = String(hour).padStart(2, '0');
    const m = String(minute).padStart(2, '0');
    return `${h}:${m}`;
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [hour, minute] = e.target.value.split(':').map(Number);
    updateSettings({ notificationHour: hour, notificationMinute: minute });
  };
  
  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 z-40 animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      ></div>
      
      {/* Panel */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-50 bg-white dark:bg-gray-800 rounded-t-2xl shadow-lg animate-fade-in-up" style={{ animationDuration: '0.3s'}} role="dialog" aria-modal="true" aria-labelledby="settings-title">
          <header className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h2 id="settings-title" className="text-xl font-bold text-textDark dark:text-gray-100">Settings</h2>
            <button onClick={onClose} className="p-1 rounded-full text-textLight dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700" aria-label="Close settings">
              <XIcon />
            </button>
          </header>
          <div className="p-4 max-h-[70vh] overflow-y-auto">
            {/* Learning Settings */}
            <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wider">Learning</h3>
                <div className="bg-secondary/50 dark:bg-gray-900/50 p-4 rounded-lg">
                    {/* Word Count */}
                    <div className="mb-4">
                        <label className="font-semibold text-textDark dark:text-gray-200">Words per Day</label>
                        <p className="text-sm text-textLight dark:text-gray-400 mb-3">Choose how many new words to learn daily.</p>
                        <div className="grid grid-cols-4 gap-2">
                            {wordOptions.map(option => (
                                <button
                                    key={option}
                                    onClick={() => updateSettings({ wordCount: option })}
                                    className={`p-3 rounded-lg text-lg font-bold transition-all duration-200 ${
                                        settings.wordCount === option
                                        ? 'bg-primary text-white scale-105 shadow-md'
                                        : 'bg-secondary text-textDark dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                                    }`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>
                    {/* Reminder Time */}
                    <div>
                        <div className="flex justify-between items-center">
                            <div>
                                <label className="font-semibold text-textDark dark:text-gray-200">Reminder Time</label>
                                <p className="text-sm text-textLight dark:text-gray-400">Set your daily learning reminder.</p>
                            </div>
                            <input
                                type="time"
                                value={formatTime(settings.notificationHour, settings.notificationMinute)}
                                onChange={handleTimeChange}
                                className="p-2 border rounded-lg bg-secondary dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 text-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                aria-label="Set reminder time"
                            />
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Appearance Settings */}
            <div>
                 <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wider">Appearance</h3>
                 <div className="bg-secondary/50 dark:bg-gray-900/50 p-4 rounded-lg divide-y divide-gray-200 dark:divide-gray-700">
                    <Toggle 
                        label="Dark Mode"
                        description="Reduces glare and improves night viewing."
                        isEnabled={settings.darkMode}
                        onToggle={() => updateSettings({ darkMode: !settings.darkMode })}
                    />
                    <Toggle 
                        label="Reading Mode"
                        description="Reduces blue light for eye comfort."
                        isEnabled={settings.readingMode}
                        onToggle={() => updateSettings({ readingMode: !settings.readingMode })}
                    />
                 </div>
            </div>
          </div>
      </div>
    </>
  );
};

export default SettingsPanel;
