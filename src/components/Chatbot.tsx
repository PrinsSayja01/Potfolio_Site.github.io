import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatbotProps {
  darkMode: boolean;
}

const Chatbot: React.FC<ChatbotProps> = ({ darkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! 👋 I'm Prins's AI assistant. I can help you learn more about his experience, projects, skills, and achievements. What would you like to know?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('experience') || message.includes('work') || message.includes('job')) {
      return "Prins is a Software Developer at Twinnet Technology (Dec 2021 - Apr 2022) where he developed responsive web apps using React, Angular, Java, and Node.js. He increased user engagement by 40% and reduced bounce rate by 25%! 🚀 He's currently pursuing his Master's in Data Science at FAU Erlangen-Nürnberg.";
    }
    
    if (message.includes('education') || message.includes('study') || message.includes('university')) {
      return "Prins is currently pursuing his Master's in Data Science at Friedrich-Alexander-Universität Erlangen-Nürnberg 🎓 (Oct 2022 - Present). He completed his B.Tech in Information Technology Engineering from RK University, Gujarat, India (2018-2022). His coursework includes Machine Learning, AI with Python, Data Structures, and more!";
    }
    
    if (message.includes('skills') || message.includes('technologies') || message.includes('programming')) {
      return "Prins has impressive technical skills! 💻 Programming: Python (NumPy, Pandas, Scikit-learn), Java, SQL, R. AI/Data: Deep Learning (CNNs, RNNs), Computer Vision (OpenCV), NLP, TensorFlow, PyTorch. Cloud/MLOps: AWS SageMaker, GCP AI Platform, Docker. He's also skilled in React, Angular, Node.js, and Streamlit!";
    }
    
    if (message.includes('projects') || message.includes('portfolio')) {
      return "Prins has built some amazing AI projects! 🤖 1) Gender & Age Detection System with 92% accuracy using OpenCV 2) Advanced Resume Analyzer using NLP 3) Customer Churn Prediction Dashboard with Streamlit 4) AI/Data Prototypes with OpenAI APIs. All are open-source and demonstrate real-world applications!";
    }
    
    if (message.includes('achievements') || message.includes('awards') || message.includes('certification')) {
      return "Prins has impressive achievements! 🏆 3rd Position at Envision 2020 (RK University), AWS APAC Solutions Architecture certification, Deloitte Data Analytics Job Simulation, Smart Gujarat Hackathon certification, and CMI Leadership program completion. He's also boosted user engagement by 40%+ in his projects!";
    }
    
    if (message.includes('contact') || message.includes('reach') || message.includes('email')) {
      return "You can reach Prins at contactprinssayja@gmail.com 📧 or call him at +49 17658692439 📱. He's also on LinkedIn and GitHub! He's currently based in Erlangen, Germany 🇩🇪 and is always open to discussing AI projects and opportunities.";
    }
    
    if (message.includes('languages') || message.includes('speak')) {
      return "Prins speaks English at an Advanced level (C1) 🇬🇧 and German at a Beginner level (A1) 🇩🇪. He's continuously improving his German while studying in Germany!";
    }
    
    if (message.includes('location') || message.includes('where') || message.includes('germany')) {
      return "Prins is currently based in Erlangen, Germany 🇩🇪 where he's pursuing his Master's degree at Friedrich-Alexander-Universität. He originally comes from Gujarat, India 🇮🇳 where he completed his bachelor's degree.";
    }
    
    if (message.includes('ai') || message.includes('machine learning') || message.includes('data science')) {
      return "Prins is passionate about AI and Data Science! 🧠 He specializes in Deep Learning (CNNs, RNNs), Computer Vision with OpenCV, NLP, and works with TensorFlow and PyTorch. His projects include real-time face detection, resume analysis, and churn prediction - all achieving impressive accuracy rates!";
    }
    
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return "Hello! 👋 Great to meet you! I'm here to help you learn more about Prins Sayja and his work in AI, data science, and software development. What specific area interests you most? 🤖";
    }
    
    return "That's an interesting question! 🤔 I'm specifically designed to share information about Prins's professional background, education, projects, skills, and achievements. You can ask me about his experience at Twinnet Technology, his AI projects, his studies in Germany, or his technical skills. What would you like to know? ✨";
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputText),
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
          isOpen 
            ? 'bg-red-600 hover:bg-red-700' 
            : darkMode
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
              : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
        }`}
      >
        {isOpen ? <X size={24} className="text-white" /> : <MessageCircle size={24} className="text-white" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className={`fixed bottom-24 right-6 w-96 h-96 rounded-lg shadow-2xl border z-40 flex flex-col ${
          darkMode 
            ? 'bg-slate-800 border-purple-500/20' 
            : 'bg-white border-purple-200'
        }`}>
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 rounded-t-lg">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-full">
                <Bot size={20} className="text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold">🤖 Prins's AI Assistant</h3>
                <p className="text-purple-100 text-sm">Ask me about Prins!</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-2 max-w-[80%] ${
                  message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}>
                  <div className={`p-2 rounded-full ${
                    message.sender === 'user' 
                      ? 'bg-purple-600' 
                      : darkMode ? 'bg-slate-700' : 'bg-gray-200'
                  }`}>
                    {message.sender === 'user' ? 
                      <User size={16} className="text-white" /> : 
                      <Bot size={16} className={darkMode ? "text-purple-400" : "text-purple-600"} />
                    }
                  </div>
                  <div className={`p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-purple-600 text-white'
                      : darkMode 
                        ? 'bg-slate-700 text-gray-200'
                        : 'bg-gray-100 text-gray-800'
                  }`}>
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-2">
                  <div className={`p-2 rounded-full ${
                    darkMode ? 'bg-slate-700' : 'bg-gray-200'
                  }`}>
                    <Bot size={16} className={darkMode ? "text-purple-400" : "text-purple-600"} />
                  </div>
                  <div className={`p-3 rounded-lg ${
                    darkMode ? 'bg-slate-700' : 'bg-gray-100'
                  }`}>
                    <div className="flex space-x-1">
                      <div className={`w-2 h-2 rounded-full animate-bounce ${
                        darkMode ? 'bg-purple-400' : 'bg-purple-600'
                      }`}></div>
                      <div className={`w-2 h-2 rounded-full animate-bounce delay-100 ${
                        darkMode ? 'bg-purple-400' : 'bg-purple-600'
                      }`}></div>
                      <div className={`w-2 h-2 rounded-full animate-bounce delay-200 ${
                        darkMode ? 'bg-purple-400' : 'bg-purple-600'
                      }`}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className={`p-4 border-t ${
            darkMode ? 'border-slate-700' : 'border-gray-200'
          }`}>
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about Prins's experience, projects, skills..."
                className={`flex-1 px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  darkMode 
                    ? 'bg-slate-700 text-white border-slate-600' 
                    : 'bg-white text-gray-900 border-gray-300'
                }`}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim()}
                className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 p-2 rounded-lg transition-colors duration-200"
              >
                <Send size={18} className="text-white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;