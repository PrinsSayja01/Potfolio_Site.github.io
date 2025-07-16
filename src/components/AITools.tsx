import React from 'react';
import { Brain, Cpu, Database, Zap, Code, BarChart3 } from 'lucide-react';

interface AIToolsProps {
  darkMode: boolean;
}

const AITools: React.FC<AIToolsProps> = ({ darkMode }) => {
  const tools = [
    {
      name: '🧠 Neural Network Visualizer',
      description: 'Interactive tool for visualizing neural network architectures and training processes',
      icon: <Brain className="text-purple-400" size={32} />,
      features: ['Real-time visualization', 'Multiple architectures', 'Training metrics'],
      status: 'Active'
    },
    {
      name: '⚡ ML Model Optimizer',
      description: 'Automated hyperparameter tuning and model optimization platform',
      icon: <Cpu className="text-blue-400" size={32} />,
      features: ['AutoML capabilities', 'Performance tracking', 'Model comparison'],
      status: 'Beta'
    },
    {
      name: '🔧 Data Pipeline Builder',
      description: 'Visual interface for creating and managing ML data pipelines',
      icon: <Database className="text-green-400" size={32} />,
      features: ['Drag & drop interface', 'Real-time monitoring', 'Scalable processing'],
      status: 'Active'
    },
    {
      name: '📊 AI Performance Monitor',
      description: 'Real-time monitoring and analytics for deployed AI models',
      icon: <BarChart3 className="text-yellow-400" size={32} />,
      features: ['Model drift detection', 'Performance metrics', 'Alert system'],
      status: 'Coming Soon'
    },
    {
      name: '💻 Code Generation AI',
      description: 'AI-powered code generation and optimization assistant',
      icon: <Code className="text-pink-400" size={32} />,
      features: ['Multi-language support', 'Code optimization', 'Documentation generation'],
      status: 'Beta'
    },
    {
      name: '🚀 Inference Accelerator',
      description: 'High-performance inference engine for production AI models',
      icon: <Zap className="text-orange-400" size={32} />,
      features: ['GPU acceleration', 'Batch processing', 'Low latency'],
      status: 'Active'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return darkMode 
        ? 'bg-green-500/20 text-green-400 border-green-500/30' 
        : 'bg-green-100 text-green-700 border-green-300';
      case 'Beta': return darkMode 
        ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' 
        : 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'Coming Soon': return darkMode 
        ? 'bg-gray-500/20 text-gray-400 border-gray-500/30' 
        : 'bg-gray-100 text-gray-600 border-gray-300';
      default: return darkMode 
        ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' 
        : 'bg-purple-100 text-purple-700 border-purple-300';
    }
  };

  return (
    <section id="ai-tools" className={`py-20 ${darkMode ? 'bg-slate-900/50' : 'bg-gray-50/50'} backdrop-blur-sm`}>
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              🛠️ AI Tools & Platforms
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Custom-built AI tools and platforms that streamline machine learning workflows and enhance productivity
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool, index) => (
              <div
                key={tool.name}
                className={`p-6 rounded-xl shadow-lg transition-all duration-300 border group cursor-pointer hover:scale-105 ${
                  darkMode 
                    ? 'bg-slate-800/50 border-purple-500/20 hover:border-purple-500/40 hover:shadow-purple-500/20' 
                    : 'bg-white/70 border-purple-200 hover:border-purple-400 hover:shadow-purple-200/50'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg group-hover:scale-110 transition-transform duration-300 ${
                    darkMode ? 'bg-slate-700/50' : 'bg-gray-100'
                  }`}>
                    {tool.icon}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(tool.status)}`}>
                    {tool.status}
                  </span>
                </div>
                
                <h3 className={`text-xl font-semibold mb-3 transition-colors duration-300 ${
                  darkMode 
                    ? 'text-white group-hover:text-purple-400' 
                    : 'text-gray-900 group-hover:text-purple-600'
                }`}>
                  {tool.name}
                </h3>
                
                <p className={`mb-4 leading-relaxed ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {tool.description}
                </p>
                
                <div className="space-y-2">
                  {tool.features.map((feature, idx) => (
                    <div key={idx} className={`flex items-center text-sm ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full mr-2 ${
                        darkMode ? 'bg-purple-400' : 'bg-purple-600'
                      }`}></div>
                      {feature}
                    </div>
                  ))}
                </div>
                
                <div className={`mt-4 pt-4 border-t ${
                  darkMode ? 'border-gray-700' : 'border-gray-200'
                }`}>
                  <button className={`text-sm font-medium transition-colors duration-200 ${
                    darkMode 
                      ? 'text-purple-400 hover:text-purple-300' 
                      : 'text-purple-600 hover:text-purple-500'
                  }`}>
                    Learn More →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AITools;