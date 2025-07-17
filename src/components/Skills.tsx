import React from 'react';

interface SkillsProps {
  darkMode: boolean;
}

const Skills: React.FC<SkillsProps> = ({ darkMode }) => {
  const skillCategories = [
    {
      title: '💻 Programming Languages',
      skills: [
        { name: 'Python', level: 95 },
        { name: 'Java', level: 85 },
        { name: 'SQL', level: 90 },
        { name: 'R', level: 80 },
        { name: 'JavaScript', level: 85 },
      ],
    },
    {
      title: '🤖 AI & Data Science',
      skills: [
        { name: 'Deep Learning (CNNs, RNNs)', level: 90 },
        { name: 'Computer Vision (OpenCV)', level: 92 },
        { name: 'NLP', level: 85 },
        { name: 'TensorFlow', level: 88 },
        { name: 'PyTorch', level: 85 },
      ],
    },
    {
      title: '☁️ Cloud & MLOps',
      skills: [
        { name: 'AWS SageMaker', level: 80 },
        { name: 'GCP AI Platform', level: 75 },
        { name: 'Docker', level: 85 },
        { name: 'CI/CD Pipelines', level: 80 },
        { name: 'Model Deployment', level: 85 },
      ],
    },
    {
      title: '🛠️ Tools & Frameworks',
      skills: [
        { name: 'React.js', level: 85 },
        { name: 'Angular', level: 80 },
        { name: 'Node.js', level: 80 },
        { name: 'Streamlit', level: 90 },
        { name: 'Tableau', level: 85 },
      ],
    },
    {
      title: '📊 Data & Analytics',
      skills: [
        { name: 'NumPy & Pandas', level: 95 },
        { name: 'Scikit-learn', level: 90 },
        { name: 'Data Visualization', level: 88 },
        { name: 'Statistical Analysis', level: 85 },
        { name: 'A/B Testing', level: 80 },
      ],
    },
    {
      title: '🎯 Methodologies',
      skills: [
        { name: 'Agile Development', level: 85 },
        { name: 'Data Pipelines', level: 88 },
        { name: 'Model Optimization', level: 85 },
        { name: 'Cross-Functional Collaboration', level: 90 },
        { name: 'Problem-Solving', level: 95 },
      ],
    },
  ];

  return (
    <section id="skills" className={`py-20 ${darkMode ? 'bg-slate-900/50' : 'bg-gray-50/50'} backdrop-blur-sm`}>
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              ⚡ Skills & Technologies
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              My technical expertise spans across AI/ML, software development, cloud technologies, and data science
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {skillCategories.map((category, index) => (
              <div
                key={category.title}
                className={`p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border group hover:scale-105 ${
                  darkMode 
                    ? 'bg-slate-800/50 border-purple-500/20 hover:border-purple-500/40' 
                    : 'bg-white/70 border-purple-200 hover:border-purple-400'
                }`}
              >
                <h3 className={`text-xl font-semibold mb-6 text-center transition-colors duration-300 ${
                  darkMode 
                    ? 'text-white group-hover:text-purple-400' 
                    : 'text-gray-900 group-hover:text-purple-600'
                }`}>
                  {category.title}
                </h3>
                <div className="space-y-4">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className={`font-medium text-sm ${
                          darkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>{skill.name}</span>
                        <span className={`text-xs ${
                          darkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>{skill.level}%</span>
                      </div>
                      <div className={`w-full rounded-full h-2 ${
                        darkMode ? 'bg-gray-700' : 'bg-gray-200'
                      }`}>
                        <div
                          className={`h-2 rounded-full transition-all duration-1000 ease-out ${
                            darkMode 
                              ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
                              : 'bg-gradient-to-r from-purple-600 to-pink-600'
                          } animate-circuit-glow`}
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;