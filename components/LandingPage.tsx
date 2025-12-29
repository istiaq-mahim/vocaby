
import React from 'react';

interface LandingPageProps {
  onLogin: () => void;
  onGuestLogin: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLogin, onGuestLogin }) => {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-primary/20 rounded-full blur-[160px] -mr-[20%] -mt-[10%] animate-subtle-float"></div>
      <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-violet-600/10 rounded-full blur-[140px] -ml-[10%] -mb-[10%]"></div>
      
      <div className="max-w-4xl w-full text-center z-10 space-y-12 animate-slide-up">
        
        <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border-white/10 mb-4">
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60">IELTS Prep Reinvented</span>
            </div>
            
            <h1 className="text-7xl md:text-9xl font-display font-black text-white tracking-tighter leading-[0.85] text-glow">
                VOCABY<span className="text-primary">.</span>
            </h1>
            
            <h2 className="text-2xl md:text-4xl font-display font-bold text-white/90 leading-tight">
                Master English vocabulary <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text card-gradient">specifically for Bangladesh.</span>
            </h2>
            
            <p className="text-lg md:text-xl text-slate-400 max-w-xl mx-auto font-medium">
                AI-curated learning for high-achievers. 
                Learn 5-10 high-impact words daily with intelligent recall.
            </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 pt-6">
            {/* Real Google Login Button */}
            <button 
                onClick={onLogin}
                className="group relative w-full md:w-auto px-12 py-5 bg-white text-slate-900 font-black text-lg rounded-3xl shadow-2xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-4 overflow-hidden"
            >
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span>Sign in with Google</span>
            </button>
            
            <div className="flex items-center gap-4 w-full md:w-64">
              <div className="h-px bg-white/10 flex-grow"></div>
              <span className="text-white/30 text-[10px] font-black uppercase tracking-widest">or</span>
              <div className="h-px bg-white/10 flex-grow"></div>
            </div>

            <button 
                onClick={onGuestLogin}
                className="w-full md:w-auto px-12 py-4 glass text-white/80 hover:text-white font-bold text-sm rounded-2xl transition-all border border-white/10 hover:border-white/20"
            >
                Quick Access (Guest Mode)
            </button>
            
            <p className="text-[10px] text-white/30 max-w-xs mx-auto mt-4 font-medium uppercase tracking-wider">
               * Signup is required for cross-device syncing and advanced progress tracking.
            </p>
        </div>
      </div>

      <footer className="absolute bottom-8 text-slate-500 text-[10px] font-black uppercase tracking-[0.4em] opacity-40">
        Built for Excellence • Vocaby 2024
      </footer>
    </div>
  );
};

export default LandingPage;
