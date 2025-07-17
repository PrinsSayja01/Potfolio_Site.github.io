import React from 'react';
import { Github, Linkedin, Mail, Heart, Bot, Phone } from 'lucide-react';

interface FooterProps {
  darkMode: boolean;
}

const Footer: React.FC<FooterProps> = ({ darkMode }) => {
  return (
    <footer className={`py-12 border-t ${
      darkMode 
        ? 'bg-slate-900 text-white border-purple-500/20' 
        : 'bg-white text-gray-900 border-purple-200'
    }`}>
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div>
              <div className="flex items-center space-x-2 text-2xl font-bold mb-4">
                <Bot className={darkMode ? "text-purple-400" : "text-purple-600"} size={32} />
                <span className={darkMode ? "text-white" : "text-gray-900"}>Prins</span>
                <span className={darkMode ? "text-purple-400" : "text-purple-600"}>Sayja</span>
              </div>
              <p className={`leading-relaxed ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                🎓 Data Science Master's student passionate about creating intelligent, 
                data-driven solutions that solve real-world problems and drive innovation.
              </p>
            </div>

            <div>
              <h4 className={`text-lg font-semibold mb-4 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>🔗 Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#home" className={`transition-colors ${
                    darkMode 
                      ? 'text-gray-400 hover:text-purple-400' 
                      : 'text-gray-600 hover:text-purple-600'
                  }`}>
                    Home
                  </a>
                </li>
                <li>
                  <a href="#about" className={`transition-colors ${
                    darkMode 
                      ? 'text-gray-400 hover:text-purple-400' 
                      : 'text-gray-600 hover:text-purple-600'
                  }`}>
                    About
                  </a>
                </li>
                <li>
                  <a href="#skills" className={`transition-colors ${
                    darkMode 
                      ? 'text-gray-400 hover:text-purple-400' 
                      : 'text-gray-600 hover:text-purple-600'
                  }`}>
                    Skills
                  </a>
                </li>
                <li>
                  <a href="#contact" className={`transition-colors ${
                    darkMode 
                      ? 'text-gray-400 hover:text-purple-400' 
                      : 'text-gray-600 hover:text-purple-600'
                  }`}>
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className={`text-lg font-semibold mb-4 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>🌐 Connect</h4>
              <div className="space-y-3">
                <a
                  href="mailto:contactprinssayja@gmail.com"
                  className={`flex items-center transition-all transform hover:scale-105 p-2 rounded-lg ${
                    darkMode 
                      ? 'text-gray-400 hover:text-purple-400 hover:bg-purple-500/10' 
                      : 'text-gray-600 hover:text-purple-600 hover:bg-purple-100'
                  }`}
                >
                  <Mail size={20} className="mr-3" />
                  <span className="text-sm">contactprinssayja@gmail.com</span>
                </a>
                <a
                  href="tel:+4917658692439"
                  className={`flex items-center transition-all transform hover:scale-105 p-2 rounded-lg ${
                    darkMode 
                      ? 'text-gray-400 hover:text-purple-400 hover:bg-purple-500/10' 
                      : 'text-gray-600 hover:text-purple-600 hover:bg-purple-100'
                  }`}
                >
                  <Phone size={20} className="mr-3" />
                  <span className="text-sm">+49 17658692439</span>
                </a>
                <div className="flex space-x-2 pt-2">
                  <a
                    href="https://github.com/prinssayja01"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`transition-all transform hover:scale-110 p-2 rounded-lg ${
                      darkMode 
                        ? 'text-gray-400 hover:text-purple-400 hover:bg-purple-500/10' 
                        : 'text-gray-600 hover:text-purple-600 hover:bg-purple-100'
                    }`}
                  >
                    <Github size={24} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/connect-with-prins-sayja/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`transition-all transform hover:scale-110 p-2 rounded-lg ${
                      darkMode 
                        ? 'text-gray-400 hover:text-purple-400 hover:bg-purple-500/10' 
                        : 'text-gray-600 hover:text-purple-600 hover:bg-purple-100'
                    }`}
                  >
                    <Linkedin size={24} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className={`border-t mt-8 pt-8 text-center ${
            darkMode ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <p className={`flex items-center justify-center ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Built with <Heart className="text-red-500 mx-2" size={16} /> and AI by Prins Sayja ✨
            </p>
            <p className={`text-sm mt-2 ${
              darkMode ? 'text-gray-500' : 'text-gray-500'
            }`}>
              © 2025 All rights reserved. 🚀 Currently based in Erlangen, Germany 🇩🇪
            </p>
          </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;