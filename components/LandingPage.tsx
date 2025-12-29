
import React from 'react';

interface LandingPageProps {
  onLogin: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      
      {/* Cinematic Background */}
      <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-primary/20 rounded-full blur-[160px] -mr-[20%] -mt-[10%] animate-subtle-float"></div>
      <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-violet-600/10 rounded-full blur-[140px] -ml-[10%] -mb-[10%]"></div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

      <div className="max-w-4xl w-full text-center z-10 space-y-12 animate-slide-up">
        
        <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border-white/10 mb-4">
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60">Level Up Your Vocabulary</span>
            </div>
            
            <h1 className="text-7xl md:text-9xl font-display font-black text-white tracking-tighter leading-[0.85] text-glow">
                VOCABY<span className="text-primary">.</span>
            </h1>
            
            <h2 className="text-2xl md:text-4xl font-display font-bold text-white/90 leading-tight">
                Master English for <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text card-gradient">IELTS & Competitive Exams.</span>
            </h2>
            
            <p className="text-lg md:text-xl text-slate-400 max-w-xl mx-auto font-medium">
                AI-curated learning designed specifically for Bangladeshi high-achievers. Learn faster, remember longer.
            </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-6">
            <button 
                onClick={onLogin}
                className="group relative w-full md:w-auto px-12 py-6 card-gradient text-white font-black text-xl rounded-3xl shadow-2xl shadow-primary/40 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-4 overflow-hidden"
            >
                <span className="relative z-10">Get Started Free</span>
                <span className="text-2xl group-hover:translate-x-1 transition-transform relative z-10">→</span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            </button>
            <div className="text-left hidden md:block border-l border-white/10 pl-6">
                <p className="text-white text-sm font-bold">12,000+ Students</p>
                <p className="text-slate-500 text-xs font-medium">Preparing for IELTS Band 7+</p>
            </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto pt-10">
            <Feature icon="🧠" text="SRS Algorithm" />
            <Feature icon="🤖" text="Gemini-3 AI" />
            <Feature icon="🇧🇩" text="Bangla Context" />
            <Feature icon="📊" text="Live Progress" />
        </div>
      </div>

      <footer className="absolute bottom-8 text-slate-500 text-xs font-bold uppercase tracking-[0.3em] opacity-40">
        Engineered for Excellence • © 2024
      </footer>
    </div>
  );
};

const Feature: React.FC<{icon: string, text: string}> = ({icon, text}) => (
    <div className="p-4 glass rounded-2xl border-white/5 flex flex-col items-center gap-2 group hover:bg-white/5 transition-colors">
        <span className="text-xl group-hover:scale-110 transition-transform">{icon}</span>
        <span className="text-[10px] text-white/40 font-black uppercase tracking-widest">{text}</span>
    </div>
);

export default LandingPage;
