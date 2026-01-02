
import React from 'react';
import type { Settings, LearningGoal } from '../types';
import { XIcon } from './icons/XIcon';

interface SettingsPanelProps {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
  onClose: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ settings, updateSettings, onClose }) => {
  const goalLabels: Record<LearningGoal, string> = {
    general: 'General English',
    competitive: 'Competitive Exam',
    ielts: 'IELTS Academic'
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose}></div>
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-50 bg-white dark:bg-gray-800 rounded-t-[3rem] shadow-2xl animate-in">
          <header className="p-8 pb-4 flex justify-between items-center">
            <h2 className="text-2xl font-black">Preferences</h2>
            <button onClick={onClose} className="p-2 bg-slate-50 rounded-full"><XIcon /></button>
          </header>
          
          <div className="p-8 pt-4 space-y-8 pb-12 overflow-y-auto max-h-[80vh]">
            <section>
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Learning Goal</h3>
                <div className="grid grid-cols-1 gap-3">
                    {(['general', 'competitive', 'ielts'] as LearningGoal[]).map(g => (
                        <button 
                            key={g} 
                            onClick={() => updateSettings({ goal: g })}
                            className={`p-4 rounded-2xl text-left border-2 font-bold transition-all ${settings.goal === g ? 'border-primary bg-blue-50' : 'border-slate-100'}`}
                        >
                            {goalLabels[g]}
                        </button>
                    ))}
                </div>
            </section>

            <section>
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Daily Target</h3>
                <div className="grid grid-cols-4 gap-2">
                    {[5, 10, 15, 20].map(n => (
                        <button key={n} onClick={() => updateSettings({ wordCount: n })} className={`p-4 rounded-2xl font-black ${settings.wordCount === n ? 'bg-primary text-white' : 'bg-slate-50'}`}>
                            {n}
                        </button>
                    ))}
                </div>
            </section>

            <section className="flex justify-between items-center bg-slate-50 p-6 rounded-3xl">
                <div>
                    <h3 className="font-black">Dark Mode</h3>
                    <p className="text-xs text-slate-400">Easier on the eyes</p>
                </div>
                <button onClick={() => updateSettings({ darkMode: !settings.darkMode })} className={`w-14 h-8 rounded-full transition-all relative ${settings.darkMode ? 'bg-primary' : 'bg-slate-300'}`}>
                    <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${settings.darkMode ? 'left-7' : 'left-1'}`}></div>
                </button> section
            </section>
          </div>
      </div>
    </>
  );
};

export default SettingsPanel;
