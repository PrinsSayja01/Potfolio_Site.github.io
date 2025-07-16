import React from 'react';
import { Calendar, Code, Brain, Cloud, Zap } from 'lucide-react';

interface TechTimelineProps {
  darkMode: boolean;
}

interface TimelineItem {
  year: string;
  title: string;
  skills: string[];
  icon: React.ReactNode;
  color: string;
  description: string;
}

const TechTimeline: React.FC<TechTimelineProps> = ({ darkMode }) => {
  const timelineData: TimelineItem[] = [
    {
      year: '2018',
      title: 'Programming Foundations',
      skills: ['Java', 'C++', 'HTML/CSS', 'JavaScript'],
      icon: <Code size={20} />,
      color: 'blue',
      description: 'Started B.Tech journey, mastering programming fundamentals and web basics'
    },
    {
      year: '2019',
      title: 'Web Development',
      skills: ['React', 'Node.js', 'MongoDB', 'Express'],
      icon: <Zap size={20} />,
      color: 'green',
      description: 'Dove into full-stack development, built first web applications'
    },
    {
      year: '2020',
      title: 'Data Science Discovery',
      skills: ['Python', 'NumPy', 'Pandas', 'Matplotlib'],
      icon: <Brain size={20} />,
      color: 'purple',
      description: 'Discovered passion for data science, started with Python ecosystem'
    },
    {
      year: '2021',
      title: 'AI & Machine Learning',
      skills: ['Scikit-learn', 'TensorFlow', 'OpenCV', 'Deep Learning'],
      icon: <Brain size={20} />,
      color: 'pink',
      description: 'Professional development at Twinnet Technology, AI specialization begins'
    },
    {
      year: '2022',
      title: 'Advanced ML & Cloud',
      skills: ['PyTorch', 'AWS SageMaker', 'Docker', 'MLOps'],
      icon: <Cloud size={20} />,
      color: 'orange',
      description: 'Started Master\'s in Germany, advanced ML techniques and cloud deployment'
    },
    {
      year: '2023',
      title: 'Computer Vision Expert',
      skills: ['Advanced CV', 'NLP', 'GCP AI Platform', 'Streamlit'],
      icon: <Brain size={20} />,
      color: 'cyan',
      description: 'Specialized in computer vision, built production-ready AI applications'
    },
    {
      year: '2024',
      title: 'AI Innovation',
      skills: ['LLMs', 'Generative AI', 'Model Optimization', 'Research'],
      icon: <Zap size={20} />,
      color: 'purple',
      description: 'Cutting-edge AI research, generative models, and innovative solutions'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-500 border-blue-400 text-blue-100',
      green: 'bg-green-500 border-green-400 text-green-100',
      purple: 'bg-purple-500 border-purple-400 text-purple-100',
      pink: 'bg-pink-500 border-pink-400 text-pink-100',
      orange: 'bg-orange-500 border-orange-400 text-orange-100',
      cyan: 'bg-cyan-500 border-cyan-400 text-cyan-100'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getSkillColor = (color: string) => {
    const colors = {
      blue: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      green: 'bg-green-500/20 text-green-300 border-green-500/30',
      purple: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      pink: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
      orange: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
      cyan: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <section id="tech-timeline" className={`py-20 ${
      darkMode ? 'bg-slate-900/50' : 'bg-gray-50/50'
    } backdrop-blur-sm`}>
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              📚 Tech Stack Evolution
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              My journey through different technologies and how I built expertise over the years
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className={`absolute left-8 top-0 bottom-0 w-0.5 ${
              darkMode ? 'bg-purple-500/30' : 'bg-purple-400/30'
            }`}></div>

            {/* Timeline Items */}
            <div className="space-y-12">
              {timelineData.map((item, index) => (
                <div
                  key={item.year}
                  className="relative flex items-start animate-fade-in"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  {/* Timeline Dot */}
                  <div className={`relative z-10 flex items-center justify-center w-16 h-16 rounded-full border-4 ${
                    getColorClasses(item.color)
                  } animate-neural-pulse`}>
                    {item.icon}
                  </div>

                  {/* Content */}
                  <div className="ml-8 flex-1">
                    <div className={`p-6 rounded-xl border transition-all duration-300 hover:scale-105 ${
                      darkMode 
                        ? 'bg-slate-800/50 border-purple-500/20 hover:border-purple-500/40' 
                        : 'bg-white/70 border-purple-200 hover:border-purple-400'
                    }`}>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className={`text-xl font-bold ${
                          darkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          {item.title}
                        </h3>
                        <div className="flex items-center">
                          <Calendar className={`mr-2 ${
                            darkMode ? 'text-purple-400' : 'text-purple-600'
                          }`} size={16} />
                          <span className={`font-semibold ${
                            darkMode ? 'text-purple-400' : 'text-purple-600'
                          }`}>
                            {item.year}
                          </span>
                        </div>
                      </div>

                      <p className={`mb-4 ${
                        darkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {item.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {item.skills.map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className={`px-3 py-1 rounded-full text-sm font-medium border ${
                              getSkillColor(item.color)
                            } animate-hologram`}
                            style={{ animationDelay: `${skillIndex * 100}ms` }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Current Status */}
            <div className="relative flex items-start mt-12">
              <div className={`relative z-10 flex items-center justify-center w-16 h-16 rounded-full border-4 ${
                getColorClasses('purple')
              } animate-pulse-glow`}>
                <Zap size={20} />
              </div>
              
              <div className="ml-8 flex-1">
                <div className={`p-6 rounded-xl border ${
                  darkMode 
                    ? 'bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-purple-500/40' 
                    : 'bg-gradient-to-r from-purple-100 to-pink-100 border-purple-400'
                }`}>
                  <h3 className={`text-xl font-bold mb-2 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    🚀 Present & Future
                  </h3>
                  <p className={`mb-4 ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Currently pursuing Master's in Data Science while building cutting-edge AI solutions. 
                    Always learning, always innovating!
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['Research', 'Innovation', 'Leadership', 'Mentoring'].map((skill, index) => (
                      <span
                        key={index}
                        className={`px-3 py-1 rounded-full text-sm font-medium border ${
                          getSkillColor('purple')
                        }`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechTimeline;