import React, { useState, useEffect } from 'react';
import { Menu, X, Bot, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    // { href: '#skill-universe', label: 'Universe' },
    { href: '#projects', label: 'Projects' },
    // { href: '#hackathon-challenge', label: 'Challenge' },
    { href: '#ai-playground', label: 'AI Lab' },
    // { href: '#ai-tools', label: 'AI Tools' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? darkMode 
          ? 'bg-slate-900/98 backdrop-blur-lg shadow-xl border-b border-purple-500/30' 
          : 'bg-white/98 backdrop-blur-lg shadow-xl border-b border-purple-200/60'
        : darkMode
          ? 'bg-slate-900/80 backdrop-blur-md'
          : 'bg-white/80 backdrop-blur-md'
    }`}>
      <div className="container mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-2xl font-bold">
            <Bot className={darkMode ? "text-purple-400" : "text-purple-600"} size={32} />
            <span className={darkMode ? "text-white" : "text-gray-900"}>Prins</span>
            <span className={darkMode ? "text-purple-400" : "text-purple-600"}>Sayja</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`transition-colors duration-200 font-medium relative group ${
                  darkMode 
                    ? 'text-gray-300 hover:text-purple-400' 
                    : 'text-gray-700 hover:text-purple-600'
                }`}
              >
                {item.label}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                  darkMode ? 'bg-purple-400' : 'bg-purple-600'
                }`}></span>
              </a>
            ))}
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-all duration-300 ${
                darkMode 
                  ? 'bg-purple-500/20 text-purple-400 hover:bg-purple-500/30' 
                  : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
              }`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-all duration-300 ${
                darkMode 
                  ? 'bg-purple-500/20 text-purple-400 hover:bg-purple-500/30' 
                  : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
              }`}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              className={`transition-colors ${
                darkMode 
                  ? 'text-gray-300 hover:text-purple-400' 
                  : 'text-gray-700 hover:text-purple-600'
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className={`md:hidden mt-4 py-4 rounded-lg shadow-lg border transition-all duration-300 ${
            darkMode 
              ? 'bg-slate-800/95 backdrop-blur-md border-purple-500/20' 
              : 'bg-white/95 backdrop-blur-md border-purple-200/50'
          }`}>
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`block px-4 py-2 transition-colors duration-200 ${
                  darkMode 
                    ? 'text-gray-300 hover:text-purple-400 hover:bg-purple-500/10' 
                    : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;