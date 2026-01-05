
import React, { useState } from 'react';
import { XIcon } from './icons/XIcon';

interface AuthDialogProps {
  onClose: () => void;
  onSuccess: (email: string) => void;
}

const AuthDialog: React.FC<AuthDialogProps> = ({ onClose, onSuccess }) => {
  const [mode, setMode] = useState<'selection' | 'manual'>('selection');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    // Simulate finding device accounts and selecting one
    setTimeout(() => {
      onSuccess('user@gmail.com');
      setIsLoading(false);
    }, 1500);
  };

  const handleManualSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setIsLoading(true);
    setTimeout(() => {
      onSuccess(email);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white dark:bg-gray-800 w-full max-w-sm rounded-[2.5rem] shadow-2xl p-8 animate-in overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-black text-slate-900 dark:text-white">Secure Backup</h3>
          <button onClick={onClose} className="p-2 bg-slate-50 dark:bg-gray-700 rounded-full"><XIcon /></button>
        </div>

        {isLoading ? (
          <div className="py-20 flex flex-col items-center justify-center space-y-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="font-bold text-slate-400 italic">Connecting to secure server...</p>
          </div>
        ) : mode === 'selection' ? (
          <div className="space-y-6">
            <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-3xl border border-blue-100 dark:border-blue-800 text-center">
              <p className="text-sm text-blue-800 dark:text-blue-300 font-bold leading-relaxed">
                Sync your words, streaks, and SRS data across all your Android devices automatically.
              </p>
            </div>

            <button 
              onClick={handleGoogleSignIn}
              className="w-full py-5 bg-white border-2 border-slate-100 flex items-center justify-center gap-4 rounded-2xl font-black text-slate-700 hover:bg-slate-50 transition-all shadow-sm"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign in with Google
            </button>

            <div className="flex items-center gap-3">
              <div className="h-px bg-slate-100 flex-1"></div>
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">or</span>
              <div className="h-px bg-slate-100 flex-1"></div>
            </div>

            <button 
              onClick={() => setMode('manual')}
              className="w-full py-4 text-slate-400 font-bold text-sm hover:text-primary transition-all underline"
            >
              No Gmail? Use Email/Password
            </button>
          </div>
        ) : (
          <form onSubmit={handleManualSignIn} className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 rounded-2xl bg-slate-50 border-none font-bold"
                placeholder="email@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 rounded-2xl bg-slate-50 border-none font-bold"
                placeholder="••••••••"
                required
              />
            </div>
            <div className="flex gap-3 pt-4">
               <button 
                type="button"
                onClick={() => setMode('selection')}
                className="w-1/3 py-4 bg-slate-100 text-slate-500 font-bold rounded-2xl"
              >
                Back
              </button>
              <button 
                type="submit"
                className="flex-1 py-4 bg-primary text-white font-black rounded-2xl shadow-lg shadow-primary/20"
              >
                Link Account
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthDialog;
