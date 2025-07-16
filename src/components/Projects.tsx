import React from 'react';
import { ExternalLink, Github, Eye, Users, BarChart3, Brain, FileText, TrendingUp } from 'lucide-react';

interface ProjectsProps {
  darkMode: boolean;
}

const Projects: React.FC<ProjectsProps> = ({ darkMode }) => {
  const projects = [
    {
      title: '👥 Gender and Age Detection System',
      description: 'Real-time face detection and classification tool using OpenCV and Caffe models for webcam streams. Achieved ~92% accuracy with pre-trained models for demographic analysis.',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
      tech: ['Python', 'OpenCV', 'Deep Learning', 'Computer Vision', 'Caffe'],
      icon: <Eye className="text-purple-400" size={24} />,
      accuracy: '92%',
      features: ['Real-time processing', 'Webcam integration', 'Demographic labeling'],
      githubUrl: 'https://github.com/PrinsSayja01/Gender-and-Age-detection',
    },
    {
      title: '📄 Advanced Resume Analyzer',
      description: 'AI-powered tool to analyze and score resumes based on job descriptions using NLP and machine learning. Open-source project with community contributions.',
      image: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=800',
      tech: ['Python', 'NLP', 'SpaCy', 'Scikit-learn', 'Machine Learning'],
      icon: <FileText className="text-blue-400" size={24} />,
      features: ['Job matching', 'Actionable insights', 'Open source'],
      //githubUrl: 'https://github.com/prinssayja',
      //liveUrl: 'https://github.com/prinssayja',
    },
    {
      title: '📊 Customer Churn Prediction Dashboard',
      description: 'Interactive Streamlit dashboard predicting telecom customer churn using XGBoost and Random Forest. Features real-time predictions and user-friendly interface.',
      image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800',
      tech: ['Python', 'Streamlit', 'XGBoost', 'Random Forest', 'Data Visualization'],
      icon: <TrendingUp className="text-green-400" size={24} />,
      features: ['Interactive dashboard', 'Real-time predictions', 'Model comparison'],
     // githubUrl: 'https://github.com/prinssayja',
      //liveUrl: 'https://streamlit.io',
    },
    {
      title: '🤖 AI/Data Prototypes (Open Source)',
      description: 'Lightweight demo applications for data visualization and AI-driven insights using Python, Streamlit, and OpenAI APIs with real-time predictions.',
      image: 'https://images.pexels.com/photos/8386422/pexels-photo-8386422.jpeg?auto=compress&cs=tinysrgb&w=800',
      tech: ['Python', 'Streamlit', 'OpenAI API', 'Data Visualization'],
      icon: <Brain className="text-pink-400" size={24} />,
      features: ['API integration', 'Real-time insights', 'Open source'],
      //githubUrl: 'https://github.com/prinssayja',
    },
  ];

  return (
    <section id="projects" className={`py-20 ${darkMode ? 'bg-slate-800/50' : 'bg-white/50'} backdrop-blur-sm`}>
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              🚀 Featured Projects
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Real-world AI and machine learning projects demonstrating practical applications and technical excellence
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div
                key={project.title}
                className={`rounded-xl shadow-lg overflow-hidden transition-all duration-300 group border hover:scale-105 ${
                  darkMode 
                    ? 'bg-slate-900/50 border-purple-500/20 hover:border-purple-500/40 hover:shadow-purple-500/20' 
                    : 'bg-white/70 border-purple-200 hover:border-purple-400 hover:shadow-purple-200/50'
                } animate-fade-in`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 animate-hologram"
                  />
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                    darkMode 
                      ? 'bg-gradient-to-t from-slate-900/80 to-transparent' 
                      : 'bg-gradient-to-t from-white/80 to-transparent'
                  }`}></div>
                  <div className={`absolute top-4 left-4 p-2 rounded-lg animate-neural-pulse ${
                    darkMode ? 'bg-slate-900/80' : 'bg-white/80'
                  }`}>
                    {project.icon}
                  </div>
                  {project.accuracy && (
                    <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium ${
                      darkMode 
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                        : 'bg-green-100 text-green-700 border border-green-300'
                    }`}>
                      {project.accuracy} Accuracy
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className={`text-xl font-semibold mb-3 transition-colors duration-300 ${
                    darkMode 
                      ? 'text-white group-hover:text-purple-400' 
                      : 'text-gray-900 group-hover:text-purple-600'
                  }`}>
                    {project.title}
                  </h3>
                  <p className={`mb-4 leading-relaxed ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {project.description}
                  </p>
                  
                  {/* Features */}
                  <div className="mb-4">
                    <h4 className={`text-sm font-medium mb-2 ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>Key Features:</h4>
                    <div className="flex flex-wrap gap-1">
                      {project.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className={`px-2 py-1 rounded text-xs ${
                            darkMode 
                              ? 'bg-slate-700 text-gray-300' 
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className={`px-3 py-1 rounded-full text-sm font-medium border ${
                          darkMode 
                            ? 'bg-purple-500/20 text-purple-300 border-purple-500/30' 
                            : 'bg-purple-100 text-purple-700 border-purple-300'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex space-x-4">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center transition-colors duration-200 ${
                        darkMode 
                          ? 'text-gray-400 hover:text-gray-300' 
                          : 'text-gray-600 hover:text-gray-500'
                      }`}
                    >
                      <Github size={18} className="mr-2" />
                      Code
                    </a>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center transition-colors duration-200 ${
                          darkMode 
                            ? 'text-purple-400 hover:text-purple-300' 
                            : 'text-purple-600 hover:text-purple-500'
                        }`}
                      >
                        <ExternalLink size={18} className="mr-2" />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;