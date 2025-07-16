import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import SkillUniverse from './components/SkillUniverse';
import HackathonChallenge from './components/HackathonChallenge';
import AIPlayground from './components/AIPlayground';
import TechTimeline from './components/TechTimeline';
// import AITools from './components/AITools';
import Chatbot from './components/Chatbot';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      darkMode 
        ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-50'
    }`}>
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-20 left-20 w-96 h-96 rounded-full mix-blend-multiply filter blur-xl animate-pulse ${
          darkMode ? 'bg-purple-500/20' : 'bg-purple-400/30'
        }`}></div>
        <div className={`absolute top-40 right-20 w-96 h-96 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-700 ${
          darkMode ? 'bg-blue-500/20' : 'bg-blue-400/30'
        }`}></div>
        <div className={`absolute bottom-20 left-1/2 w-96 h-96 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000 ${
          darkMode ? 'bg-pink-500/20' : 'bg-pink-400/30'
        }`}></div>
        
        {/* AI Data Flow Lines */}
        <div className="absolute top-1/4 left-0 w-full h-px">
          <div className={`h-full w-32 animate-data-flow ${
            darkMode ? 'bg-gradient-to-r from-transparent via-purple-400 to-transparent' 
                     : 'bg-gradient-to-r from-transparent via-purple-600 to-transparent'
          }`}></div>
        </div>
        <div className="absolute top-2/3 left-0 w-full h-px">
          <div className={`h-full w-24 animate-data-flow delay-1000 ${
            darkMode ? 'bg-gradient-to-r from-transparent via-pink-400 to-transparent' 
                     : 'bg-gradient-to-r from-transparent via-pink-600 to-transparent'
          }`}></div>
        </div>
        
        {/* Binary Rain Effect */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className={`absolute text-xs font-mono animate-binary-rain ${
                darkMode ? 'text-green-400/30' : 'text-green-600/30'
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${4 + Math.random() * 2}s`
              }}
            >
              {Math.random() > 0.5 ? '1' : '0'}
            </div>
          ))}
        </div>
        
        {/* Neural Network Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 1000 1000">
            <defs>
              <pattern id="neural-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle cx="50" cy="50" r="2" fill={darkMode ? "#8b5cf6" : "#6366f1"} opacity="0.5" className="animate-neural-pulse">
                  <animate attributeName="r" values="1;3;1" dur="3s" repeatCount="indefinite"/>
                </circle>
                <circle cx="20" cy="20" r="1" fill={darkMode ? "#ec4899" : "#8b5cf6"} opacity="0.3" className="animate-neural-pulse delay-500">
                  <animate attributeName="r" values="0.5;2;0.5" dur="4s" repeatCount="indefinite"/>
                </circle>
                <circle cx="80" cy="30" r="1.5" fill={darkMode ? "#06b6d4" : "#3b82f6"} opacity="0.4" className="animate-neural-pulse delay-1000">
                  <animate attributeName="r" values="1;2.5;1" dur="5s" repeatCount="indefinite"/>
                </circle>
                <line x1="20" y1="20" x2="50" y2="50" stroke={darkMode ? "#8b5cf6" : "#6366f1"} strokeWidth="0.5" opacity="0.3" className="animate-circuit-glow"/>
                <line x1="50" y1="50" x2="80" y2="30" stroke={darkMode ? "#ec4899" : "#8b5cf6"} strokeWidth="0.5" opacity="0.3" className="animate-circuit-glow"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#neural-pattern)"/>
          </svg>
        </div>

        {/* Floating Geometric Shapes */}
        <div className="absolute top-1/4 left-1/4 animate-float animate-quantum-spin">
          <div className={`w-8 h-8 rotate-45 ${darkMode ? 'bg-purple-400/20' : 'bg-purple-500/30'}`}></div>
        </div>
        <div className="absolute top-1/3 right-1/4 animate-float-delayed animate-hologram">
          <div className={`w-6 h-6 rounded-full ${darkMode ? 'bg-blue-400/20' : 'bg-blue-500/30'}`}></div>
        </div>
        <div className="absolute bottom-1/3 left-1/3 animate-float-slow animate-circuit-glow">
          <div className={`w-10 h-10 ${darkMode ? 'bg-pink-400/20' : 'bg-pink-500/30'}`} style={{clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'}}></div>
        </div>
        
        {/* AI Scanning Lines */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className={`absolute top-1/3 w-full h-px animate-ai-scan ${
            darkMode ? 'bg-gradient-to-r from-transparent via-cyan-400 to-transparent' 
                     : 'bg-gradient-to-r from-transparent via-cyan-600 to-transparent'
          }`} style={{animationDelay: '2s'}}></div>
        </div>
      </div>

      <Header darkMode={darkMode} toggleTheme={toggleTheme} />
      <Hero darkMode={darkMode} />
      <About darkMode={darkMode} />
      <Skills darkMode={darkMode} />
      <SkillUniverse darkMode={darkMode} />
      <Projects darkMode={darkMode} />
      <HackathonChallenge darkMode={darkMode} />
      <AIPlayground darkMode={darkMode} />
      <TechTimeline darkMode={darkMode} />
      {/* <AITools darkMode={darkMode} /> */}
      <Contact darkMode={darkMode} />
      <Footer darkMode={darkMode} />
      <Chatbot darkMode={darkMode} />
    </div>
  );
}

export default App;