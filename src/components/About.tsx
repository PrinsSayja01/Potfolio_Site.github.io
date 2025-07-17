import React from 'react';
import { Brain, Code, Database, GraduationCap, Award, Globe } from 'lucide-react';

interface AboutProps {
  darkMode: boolean;
}

const About: React.FC<AboutProps> = ({ darkMode }) => {
  return (
    <section id="about" className={`py-20 ${darkMode ? 'bg-slate-800/50' : 'bg-white/50'} backdrop-blur-sm`}>
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              🧠 About Me
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Data Science Master's student at Friedrich-Alexander-Universität Erlangen-Nürnberg with proven 
              software development experience and a passion for building intelligent, data-driven solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6 order-2 md:order-1">
              <div className={`w-24 h-1 rounded-full ${
                darkMode 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-600' 
                  : 'bg-gradient-to-r from-purple-600 to-pink-700'
              }`}></div>
              <p className={`text-lg leading-relaxed ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Results-driven professional with hands-on experience in AI, NLP, and scalable web systems. 
                I have a proven track record of boosting user engagement by over 40% through innovative 
                ML prototypes and user-focused engineering solutions.
              </p>
              <p className={`text-lg leading-relaxed ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Currently pursuing my Master's in Data Science while building real-world applications 
                that solve complex problems. My goal is to bridge the gap between cutting-edge AI research 
                and practical, impactful solutions that make a difference.
              </p>
            </div>

            <div className="space-y-6 order-1 md:order-2">
              <div className={`p-6 rounded-xl border transition-all duration-300 group hover:scale-105 ${
                darkMode 
                  ? 'bg-purple-900/30 border-purple-500/20 hover:border-purple-500/40' 
                  : 'bg-purple-50 border-purple-200 hover:border-purple-400'
              }`}>
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-lg group-hover:scale-110 transition-transform duration-300 ${
                    darkMode ? 'bg-purple-600' : 'bg-purple-600'
                  }`}>
                    <GraduationCap className="text-white" size={24} />
                  </div>
                  <h3 className={`text-xl font-semibold ml-4 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>Education</h3>
                </div>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                  M.Sc. Data Science at FAU Erlangen-Nürnberg & B.Tech IT Engineering from RK University
                </p>
              </div>

              <div className={`p-6 rounded-xl border transition-all duration-300 group hover:scale-105 ${
                darkMode 
                  ? 'bg-blue-900/30 border-blue-500/20 hover:border-blue-500/40' 
                  : 'bg-blue-50 border-blue-200 hover:border-blue-400'
              }`}>
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-lg group-hover:scale-110 transition-transform duration-300 ${
                    darkMode ? 'bg-blue-600' : 'bg-blue-600'
                  }`}>
                    <Code className="text-white" size={24} />
                  </div>
                  <h3 className={`text-xl font-semibold ml-4 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>Development Experience</h3>
                </div>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                  Software Developer at Twinnet Technology with expertise in React, Angular, Java, and Node.js
                </p>
              </div>

              <div className={`p-6 rounded-xl border transition-all duration-300 group hover:scale-105 ${
                darkMode 
                  ? 'bg-green-900/30 border-green-500/20 hover:border-green-500/40' 
                  : 'bg-green-50 border-green-200 hover:border-green-400'
              }`}>
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-lg group-hover:scale-110 transition-transform duration-300 ${
                    darkMode ? 'bg-green-600' : 'bg-green-600'
                  }`}>
                    <Brain className="text-white" size={24} />
                  </div>
                  <h3 className={`text-xl font-semibold ml-4 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>AI & Machine Learning</h3>
                </div>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                  Specialized in Deep Learning, Computer Vision, NLP, and building intelligent data-driven tools
                </p>
              </div>
            </div>
          </div>

          {/* Languages & Achievements */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <div className={`p-6 rounded-xl border ${
              darkMode 
                ? 'bg-slate-900/50 border-purple-500/20' 
                : 'bg-white/70 border-purple-200'
            }`}>
              <div className="flex items-center mb-4">
                <Globe className={darkMode ? 'text-purple-400' : 'text-purple-600'} size={24} />
                <h3 className={`text-xl font-semibold ml-3 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>Languages</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>English</span>
                  <span className={darkMode ? 'text-purple-400' : 'text-purple-600'}>Advanced (C1)</span>
                </div>
                <div className="flex justify-between">
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>German</span>
                  <span className={darkMode ? 'text-purple-400' : 'text-purple-600'}>Beginner (A1)</span>
                </div>
              </div>
            </div>

            <div className={`p-6 rounded-xl border ${
              darkMode 
                ? 'bg-slate-900/50 border-purple-500/20' 
                : 'bg-white/70 border-purple-200'
            }`}>
              <div className="flex items-center mb-4">
                <Award className={darkMode ? 'text-purple-400' : 'text-purple-600'} size={24} />
                <h3 className={`text-xl font-semibold ml-3 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>Key Achievements</h3>
              </div>
              <div className="space-y-2 text-sm">
                <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                  🏆 3rd Position - Envision 2020, RK University
                </p>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                  ☁️ AWS APAC Solutions Architecture Program
                </p>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                  📊 Deloitte Data Analytics Job Simulation
                </p>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                  🚀 Smart Gujarat Hackathon Certification
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;