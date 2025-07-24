import React from 'react';
import { Github, Linkedin, Mail, Heart, Bot, Phone } from 'lucide-react';

interface FooterProps {
  darkMode: boolean;
}

const Footer: React.FC<FooterProps> = ({ darkMode }) => {
  return (
    <footer className={`py-8 md:py-12 border-t ${
      darkMode 
        ? 'bg-slate-900 text-white border-purple-500/20' 
        : 'bg-white text-gray-900 border-purple-200'
    }`}>
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
            {/* Brand Section */}
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-2 text-xl sm:text-2xl font-bold mb-4">
                <Bot className={darkMode ? "text-purple-400" : "text-purple-600"} size={28} />
                <span className={darkMode ? "text-white" : "text-gray-900"}>Prins</span>
                <span className={darkMode ? "text-purple-400" : "text-purple-600"}>Sayja</span>
              </div>
              <p className={`text-sm sm:text-base leading-relaxed max-w-sm mx-auto md:mx-0 ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                🎓 Data Science Master's student passionate about creating intelligent, 
                data-driven solutions that solve real-world problems and drive innovation.
              </p>
            </div>

            {/* Quick Links Section */}
            <div className="text-center md:text-left">
              <h4 className={`text-base sm:text-lg font-semibold mb-4 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>🔗 Quick Links</h4>
              <ul className="space-y-2 inline-block md:block">
                <li>
                  <a href="#home" className={`text-sm sm:text-base transition-colors ${
                    darkMode 
                      ? 'text-gray-400 hover:text-purple-400' 
                      : 'text-gray-600 hover:text-purple-600'
                  }`}>
                    Home
                  </a>
                </li>
                <li>
                  <a href="#about" className={`text-sm sm:text-base transition-colors ${
                    darkMode 
                      ? 'text-gray-400 hover:text-purple-400' 
                      : 'text-gray-600 hover:text-purple-600'
                  }`}>
                    About
                  </a>
                </li>
                <li>
                  <a href="#skills" className={`text-sm sm:text-base transition-colors ${
                    darkMode 
                      ? 'text-gray-400 hover:text-purple-400' 
                      : 'text-gray-600 hover:text-purple-600'
                  }`}>
                    Skills
                  </a>
                </li>
                <li>
                  <a href="#contact" className={`text-sm sm:text-base transition-colors ${
                    darkMode 
                      ? 'text-gray-400 hover:text-purple-400' 
                      : 'text-gray-600 hover:text-purple-600'
                  }`}>
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Connect Section */}
            <div className="text-center md:text-left">
              <h4 className={`text-base sm:text-lg font-semibold mb-4 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>🌐 Connect</h4>
              <div className="space-y-3">
                {/* Email */}
                <a
                  href="mailto:contactprinssayja@gmail.com"
                  className={`flex items-center justify-center md:justify-start transition-all transform hover:scale-105 p-2 rounded-lg ${
                    darkMode 
                      ? 'text-gray-400 hover:text-purple-400 hover:bg-purple-500/10' 
                      : 'text-gray-600 hover:text-purple-600 hover:bg-purple-100'
                  }`}
                >
                  <Mail size={18} className="mr-2 sm:mr-3 flex-shrink-0" />
                  <span className="text-xs sm:text-sm break-all sm:break-normal">contactprinssayja@gmail.com</span>
                </a>
                
                {/* Phone */}
                <a
                  href="tel:+4917658692439"
                  className={`flex items-center justify-center md:justify-start transition-all transform hover:scale-105 p-2 rounded-lg ${
                    darkMode 
                      ? 'text-gray-400 hover:text-purple-400 hover:bg-purple-500/10' 
                      : 'text-gray-600 hover:text-purple-600 hover:bg-purple-100'
                  }`}
                >
                  <Phone size={18} className="mr-2 sm:mr-3 flex-shrink-0" />
                  <span className="text-xs sm:text-sm">+49 17658692439</span>
                </a>
                
                {/* Social Links */}
                <div className="flex justify-center md:justify-start space-x-2 pt-2">
                  <a
                    href="https://github.com/prinssayja01"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`transition-all transform hover:scale-110 p-2 rounded-lg ${
                      darkMode 
                        ? 'text-gray-400 hover:text-purple-400 hover:bg-purple-500/10' 
                        : 'text-gray-600 hover:text-purple-600 hover:bg-purple-100'
                    }`}
                    aria-label="GitHub Profile"
                  >
                    <Github size={20} sm:size={24} />
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
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin size={20} sm:size={24} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className={`border-t mt-6 md:mt-8 pt-6 md:pt-8 text-center ${
            darkMode ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <p className={`flex flex-col sm:flex-row items-center justify-center text-sm sm:text-base ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              <span className="flex items-center">
                Built with <Heart className="text-red-500 mx-1 sm:mx-2" size={14} sm:size={16} /> and AI by Prins Sayja ✨
              </span>
            </p>
            <p className={`text-xs sm:text-sm mt-2 px-4 ${
              darkMode ? 'text-gray-500' : 'text-gray-500'
            }`}>
              © 2025 All rights reserved. 🚀 Currently based in Erlangen, Germany 🇩🇪
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
