import React from 'react';
import { ArrowDown, Github, Linkedin, Mail, Download, Sparkles, Brain, Cpu } from 'lucide-react';

interface HeroProps {
  darkMode: boolean;
}

const Hero: React.FC<HeroProps> = ({ darkMode }) => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* AI Circuit Background */}
      <div className="absolute inset-0 opacity-10">
        <div className={`absolute top-10 left-10 w-32 h-32 border-2 rounded-lg rotate-12 animate-circuit-glow ${
          darkMode ? 'border-purple-400' : 'border-purple-600'
        }`}>
          <div className={`absolute top-2 left-2 w-4 h-4 rounded-full animate-neural-pulse ${
            darkMode ? 'bg-purple-400' : 'bg-purple-600'
          }`}></div>
          <div className={`absolute bottom-2 right-2 w-4 h-4 rounded-full animate-neural-pulse delay-500 ${
            darkMode ? 'bg-blue-400' : 'bg-blue-600'
          }`}></div>
        </div>
        <div className={`absolute top-40 right-20 w-24 h-24 border-2 rounded-full -rotate-12 animate-hologram ${
          darkMode ? 'border-pink-400' : 'border-pink-600'
        }`}>
          <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full animate-neural-pulse ${
            darkMode ? 'bg-pink-400' : 'bg-pink-600'
          }`}></div>
        </div>
        
        {/* Code Typing Animation */}
        <div className={`absolute bottom-20 left-10 font-mono text-xs overflow-hidden whitespace-nowrap ${
          darkMode ? 'text-green-400/60' : 'text-green-600/60'
        }`}>
          <div className="animate-code-typing">
            {'> ai.predict(future) // Building tomorrow\'s solutions today'}
          </div>
        </div>
      </div>

      {/* Floating AI Icons */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 animate-float animate-hologram">
          <Brain className={`${darkMode ? 'text-purple-400/60' : 'text-purple-600/60'}`} size={32} />
        </div>
        <div className="absolute top-1/3 right-1/4 animate-float-delayed animate-quantum-spin">
          <Cpu className={`${darkMode ? 'text-blue-400/60' : 'text-blue-600/60'}`} size={28} />
        </div>
        <div className="absolute bottom-1/3 left-1/3 animate-float-slow animate-neural-pulse">
          <Sparkles className={`${darkMode ? 'text-pink-400/60' : 'text-pink-600/60'}`} size={36} />
        </div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 animate-fade-in mt-8">
            <span className={`inline-block px-6 py-3 rounded-full text-sm font-medium border transition-all duration-300 ${
              darkMode 
                ? 'bg-purple-500/20 text-purple-300 border-purple-500/30' 
                : 'bg-purple-100 text-purple-700 border-purple-300'
            }`}>
              🎓 Data Science Master's Student & AI Developer
            </span>
          </div>
          
          <h1 className={`text-5xl md:text-7xl font-bold mb-6 animate-fade-in delay-200 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Hi, I'm{' '}
            <span className={`text-transparent bg-clip-text ${
              darkMode 
                ? 'bg-gradient-to-r from-purple-400 to-pink-400' 
                : 'bg-gradient-to-r from-purple-600 to-pink-600'
            }`}>
              Prins Sayja
            </span>
          </h1>
          
          <p className={`text-xl md:text-2xl mb-8 animate-fade-in delay-400 ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            🚀 Building Intelligent Data-Driven Solutions
          </p>
          
          <p className={`text-lg mb-12 max-w-2xl mx-auto animate-fade-in delay-600 ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            Results-driven Data Science Master's student with hands-on experience in AI, NLP, and scalable web systems. 
            Passionate about creating intelligent tools that solve real-world problems and boost engagement by 40%+.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in delay-800">
            <a
              href="#projects"
              className={`px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center space-x-2 ${
                darkMode 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700' 
                  : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700'
              }`}
            >
              <span>🎯 View My Projects</span>
              <Sparkles size={18} />
            </a>
            <a
              href="/resume.pdf"
              download
              className={`px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center space-x-2 border-2 ${
                darkMode 
                  ? 'bg-transparent border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white' 
                  : 'bg-transparent border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white'
              }`}
            >
              <Download size={18} />
              <span>📄 Download CV</span>
            </a>
          </div>

          <div className="flex justify-center space-x-6 animate-fade-in delay-1000">
            <a
              href="https://github.com/prinssayja01"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-all duration-300 transform hover:scale-110 p-3 rounded-full ${
                darkMode 
                  ? 'text-gray-400 hover:text-purple-400 hover:bg-purple-500/10' 
                  : 'text-gray-600 hover:text-purple-600 hover:bg-purple-100'
              }`}
            >
              <Github size={28} />
            </a>
            <a
              href="https://www.linkedin.com/in/connect-with-prins-sayja/"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-all duration-300 transform hover:scale-110 p-3 rounded-full ${
                darkMode 
                  ? 'text-gray-400 hover:text-purple-400 hover:bg-purple-500/10' 
                  : 'text-gray-600 hover:text-purple-600 hover:bg-purple-100'
              }`}
            >
              <Linkedin size={28} />
            </a>
            <a
              href="mailto:contactprinssayja@gmail.com"
              className={`transition-all duration-300 transform hover:scale-110 p-3 rounded-full ${
                darkMode 
                  ? 'text-gray-400 hover:text-purple-400 hover:bg-purple-500/10' 
                  : 'text-gray-600 hover:text-purple-600 hover:bg-purple-100'
              }`}
            >
              <Mail size={28} />
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown size={24} className={darkMode ? "text-gray-400" : "text-gray-600"} />
        </div>
      </div>
    </section>
  );
};

export default Hero;