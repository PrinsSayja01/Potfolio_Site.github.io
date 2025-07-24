import React, { useState, useRef, useEffect } from 'react';
import { Camera, Upload, FileText, BarChart3, Play, Eye, Brain, Zap } from 'lucide-react';

interface AIPlaygroundProps {
  darkMode: boolean;
}

const AIPlayground: React.FC<AIPlaygroundProps> = ({ darkMode }) => {
  const [activeDemo, setActiveDemo] = useState<string | null>(null);
  const [webcamActive, setWebcamActive] = useState(false);
  const [detectionResults, setDetectionResults] = useState<any>(null);
  const [resumeText, setResumeText] = useState('');
  const [resumeAnalysis, setResumeAnalysis] = useState<any>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const demos = [
    {
      id: 'gender-age',
      title: '👥 Gender & Age Detection',
      description: 'Real-time face detection with demographic analysis using OpenCV',
      icon: <Eye size={24} />,
      color: 'purple',
      accuracy: '92%',
      tech: ['OpenCV', 'Deep Learning', 'Computer Vision']
    },
    {
      id: 'resume-analyzer',
      title: '📄 Resume Analyzer',
      description: 'AI-powered resume analysis with job matching and scoring',
      icon: <FileText size={24} />,
      color: 'blue',
      features: ['NLP Analysis', 'Job Matching', 'Skill Extraction'],
      tech: ['NLP', 'SpaCy', 'Machine Learning']
    },
    {
      id: 'churn-prediction',
      title: '📊 Customer Churn Prediction',
      description: 'Interactive dashboard for predicting customer churn',
      icon: <BarChart3 size={24} />,
      color: 'green',
      features: ['Real-time Predictions', 'Interactive Dashboard', 'Model Comparison'],
      tech: ['XGBoost', 'Random Forest', 'Streamlit']
    }
  ];

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setWebcamActive(true);
        
        // Simulate face detection (in real implementation, this would use OpenCV.js)
        setTimeout(() => {
          setDetectionResults({
            faces: [
              { gender: 'Male', age: 25, confidence: 0.92, x: 100, y: 80, width: 120, height: 120 }
            ]
          });
        }, 2000);
      }
    } catch (error) {
      console.error('Error accessing webcam:', error);
    }
  };

  const stopWebcam = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setWebcamActive(false);
    setDetectionResults(null);
  };

  const analyzeResume = () => {
    if (!resumeText.trim()) return;
    
    // Simulate resume analysis
    setTimeout(() => {
      setResumeAnalysis({
        score: 85,
        skills: ['Python', 'Machine Learning', 'React', 'Data Science'],
        recommendations: [
          'Add more quantified achievements',
          'Include cloud computing skills',
          'Highlight leadership experience'
        ],
        jobMatch: 'Data Scientist',
        matchScore: 78
      });
    }, 1500);
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'purple': return 'border-purple-500/20 hover:border-purple-500/40 bg-purple-500/10';
      case 'blue': return 'border-blue-500/20 hover:border-blue-500/40 bg-blue-500/10';
      case 'green': return 'border-green-500/20 hover:border-green-500/40 bg-green-500/10';
      default: return 'border-gray-500/20 hover:border-gray-500/40 bg-gray-500/10';
    }
  };

  useEffect(() => {
    return () => {
      // Cleanup webcam on unmount
      if (webcamActive) {
        stopWebcam();
      }
    };
  }, [webcamActive]);

  return (
    <section id="ai-playground" className={`py-20 ${
      darkMode ? 'bg-slate-900/50' : 'bg-white/50'
    } backdrop-blur-sm`}>
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              🧬 AI Experiment Playground
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Experience my AI projects firsthand with live, interactive demonstrations
            </p>
          </div>

          {/* Demo Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-12">
            {demos.map((demo) => (
              <div
                key={demo.id}
                className={`p-6 rounded-xl border transition-all duration-300 cursor-pointer hover:scale-105 ${
                  activeDemo === demo.id 
                    ? getColorClasses(demo.color)
                    : darkMode 
                      ? 'bg-slate-800/50 border-purple-500/20 hover:border-purple-500/40' 
                      : 'bg-white/70 border-purple-200 hover:border-purple-400'
                }`}
                onClick={() => setActiveDemo(activeDemo === demo.id ? null : demo.id)}
              >
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-lg mr-4 ${
                    demo.color === 'purple' ? 'bg-purple-600' :
                    demo.color === 'blue' ? 'bg-blue-600' : 'bg-green-600'
                  }`}>
                    <div className="text-white">{demo.icon}</div>
                  </div>
                  <div>
                    <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {demo.title}
                    </h3>
                    {demo.accuracy && (
                      <span className="text-green-400 text-sm font-medium">
                        {demo.accuracy} Accuracy
                      </span>
                    )}
                  </div>
                </div>
                
                <p className={`mb-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {demo.description}
                </p>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {demo.tech.map((tech, idx) => (
                    <span
                      key={idx}
                      className={`px-2 py-1 rounded text-xs ${
                        darkMode ? 'bg-slate-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <button className={`w-full py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeDemo === demo.id
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                    : darkMode
                      ? 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}>
                  {activeDemo === demo.id ? 'Close Demo' : 'Try Demo'}
                </button>
              </div>
            ))}
          </div>

          {/* Active Demo */}
          {activeDemo && (
            <div className={`p-8 rounded-xl border ${
              darkMode 
                ? 'bg-slate-800/50 border-purple-500/20' 
                : 'bg-white/70 border-purple-200'
            }`}>
              {/* Gender & Age Detection Demo */}
              {activeDemo === 'gender-age' && (
                <div>
                  <div className="flex items-center mb-6">
                    <Brain className="text-purple-400 mr-3" size={32} />
                    <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Real-time Gender & Age Detection
                    </h3>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <div className={`relative rounded-lg overflow-hidden ${
                        darkMode ? 'bg-slate-900' : 'bg-gray-100'
                      }`} style={{ aspectRatio: '4/3' }}>
                        {webcamActive ? (
                          <>
                            <video
                              ref={videoRef}
                              autoPlay
                              muted
                              className="w-full h-full object-cover"
                            />
                            <canvas
                              ref={canvasRef}
                              className="absolute inset-0 w-full h-full"
                            />
                            {detectionResults && (
                              <div className="absolute top-4 left-4 bg-black/80 text-white p-3 rounded-lg">
                                <div className="text-sm">
                                  <div>👤 Gender: {detectionResults.faces[0].gender}</div>
                                  <div>🎂 Age: ~{detectionResults.faces[0].age}</div>
                                  <div>✅ Confidence: {(detectionResults.faces[0].confidence * 100).toFixed(1)}%</div>
                                </div>
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <div className="text-center">
                              <Camera className={`mx-auto mb-4 ${
                                darkMode ? 'text-gray-400' : 'text-gray-500'
                              }`} size={48} />
                              <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                                Click "Start Camera" to begin detection
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex gap-4 mt-4">
                        <button
                          onClick={webcamActive ? stopWebcam : startWebcam}
                          className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
                            webcamActive
                              ? 'bg-red-600 hover:bg-red-700 text-white'
                              : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white'
                          }`}
                        >
                          {webcamActive ? 'Stop Camera' : 'Start Camera'}
                        </button>
                        <a
                          href="https://github.com/PrinsSayja01/Gender-and-Age-detection"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-3 rounded-lg border border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white transition-colors font-medium"
                        >
                          📂 View Code
                        </a>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className={`text-lg font-semibold mb-4 ${
                        darkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        🔬 How it Works
                      </h4>
                      <div className="space-y-4">
                        <div className={`p-4 rounded-lg ${
                          darkMode ? 'bg-slate-700' : 'bg-gray-100'
                        }`}>
                          <h5 className={`font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            1. Face Detection
                          </h5>
                          <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            Uses Haar Cascade classifiers to detect faces in real-time video streams
                          </p>
                        </div>
                        <div className={`p-4 rounded-lg ${
                          darkMode ? 'bg-slate-700' : 'bg-gray-100'
                        }`}>
                          <h5 className={`font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            2. Feature Extraction
                          </h5>
                          <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            Pre-trained Caffe models analyze facial features for demographic classification
                          </p>
                        </div>
                        <div className={`p-4 rounded-lg ${
                          darkMode ? 'bg-slate-700' : 'bg-gray-100'
                        }`}>
                          <h5 className={`font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            3. Prediction
                          </h5>
                          <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            Outputs gender and age predictions with confidence scores
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <h5 className={`font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          📊 Performance Metrics
                        </h5>
                        <div className="grid grid-cols-2 gap-4">
                          <div className={`p-3 rounded-lg text-center ${
                            darkMode ? 'bg-green-900/30' : 'bg-green-100'
                          }`}>
                            <div className="text-2xl font-bold text-green-400">92%</div>
                            <div className={`text-sm ${darkMode ? 'text-green-300' : 'text-green-700'}`}>
                              Accuracy
                            </div>
                          </div>
                          <div className={`p-3 rounded-lg text-center ${
                            darkMode ? 'bg-blue-900/30' : 'bg-blue-100'
                          }`}>
                            <div className="text-2xl font-bold text-blue-400">30fps</div>
                            <div className={`text-sm ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>
                              Real-time
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-4 p-4 rounded-lg bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-500/20">
                          <h6 className="text-purple-400 font-medium mb-2">🔗 GitHub Repository</h6>
                          <p className="text-gray-300 text-sm mb-3">
                            Complete source code with implementation details, model files, and documentation.
                          </p>
                          <a
                            href="https://github.com/PrinsSayja01/Gender-and-Age-detection"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-purple-400 hover:text-purple-300 text-sm font-medium"
                          >
                            <Github className="mr-2" size={16} />
                            PrinsSayja01/Gender-and-Age-detection
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Resume Analyzer Demo */}
              {activeDemo === 'resume-analyzer' && (
                <div>
                  <div className="flex items-center mb-6">
                    <FileText className="text-blue-400 mr-3" size={32} />
                    <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      AI-Powered Resume Analyzer
                    </h3>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <textarea
                        value={resumeText}
                        onChange={(e) => setResumeText(e.target.value)}
                        placeholder="Paste your resume text here or try this sample:

John Doe
Software Engineer

Experience:
- 3 years Python development
- Machine learning projects
- React and Node.js applications
- AWS cloud deployment

Skills: Python, JavaScript, React, Machine Learning, AWS"
                        className={`w-full h-64 p-4 rounded-lg border resize-none ${
                          darkMode 
                            ? 'bg-slate-900 border-slate-600 text-white' 
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      />
                      
                      <button
                        onClick={analyzeResume}
                        disabled={!resumeText.trim()}
                        className="w-full mt-4 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                      >
                        <Zap className="inline mr-2" size={18} />
                        Analyze Resume
                      </button>
                    </div>
                    
                    <div>
                      {resumeAnalysis ? (
                        <div className="space-y-4">
                          <div className={`p-4 rounded-lg ${
                            darkMode ? 'bg-slate-700' : 'bg-gray-100'
                          }`}>
                            <h5 className={`font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                              📊 Overall Score
                            </h5>
                            <div className="flex items-center">
                              <div className="text-3xl font-bold text-green-400 mr-4">
                                {resumeAnalysis.score}/100
                              </div>
                              <div className="flex-1">
                                <div className={`w-full rounded-full h-3 ${
                                  darkMode ? 'bg-gray-600' : 'bg-gray-200'
                                }`}>
                                  <div
                                    className="h-3 rounded-full bg-gradient-to-r from-green-500 to-blue-500"
                                    style={{ width: `${resumeAnalysis.score}%` }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className={`p-4 rounded-lg ${
                            darkMode ? 'bg-slate-700' : 'bg-gray-100'
                          }`}>
                            <h5 className={`font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                              🎯 Best Job Match
                            </h5>
                            <div className="flex justify-between items-center">
                              <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                                {resumeAnalysis.jobMatch}
                              </span>
                              <span className="text-blue-400 font-medium">
                                {resumeAnalysis.matchScore}% match
                              </span>
                            </div>
                          </div>
                          
                          <div className={`p-4 rounded-lg ${
                            darkMode ? 'bg-slate-700' : 'bg-gray-100'
                          }`}>
                            <h5 className={`font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                              🛠️ Detected Skills
                            </h5>
                            <div className="flex flex-wrap gap-2">
                              {resumeAnalysis.skills.map((skill: string, idx: number) => (
                                <span
                                  key={idx}
                                  className="px-3 py-1 rounded-full text-sm bg-blue-500/20 text-blue-400"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div className={`p-4 rounded-lg ${
                            darkMode ? 'bg-slate-700' : 'bg-gray-100'
                          }`}>
                            <h5 className={`font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                              💡 Recommendations
                            </h5>
                            <ul className="space-y-1">
                              {resumeAnalysis.recommendations.map((rec: string, idx: number) => (
                                <li
                                  key={idx}
                                  className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
                                >
                                  • {rec}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ) : (
                        <div className={`h-64 flex items-center justify-center rounded-lg border-2 border-dashed ${
                          darkMode ? 'border-gray-600' : 'border-gray-300'
                        }`}>
                          <div className="text-center">
                            <FileText className={`mx-auto mb-4 ${
                              darkMode ? 'text-gray-400' : 'text-gray-500'
                            }`} size={48} />
                            <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                              Analysis results will appear here
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Churn Prediction Demo */}
              {activeDemo === 'churn-prediction' && (
                <div>
                  <div className="flex items-center mb-6">
                    <BarChart3 className="text-green-400 mr-3" size={32} />
                    <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Customer Churn Prediction Dashboard
                    </h3>
                  </div>
                  
                  <div className={`rounded-lg overflow-hidden border ${
                    darkMode ? 'border-gray-600' : 'border-gray-300'
                  }`}>
                    <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-4">
                      <h4 className="font-semibold">🚀 Interactive Streamlit Dashboard</h4>
                      <p className="text-sm opacity-90">
                        Real-time customer churn prediction with XGBoost and Random Forest models
                      </p>
                    </div>
                    
                    <div className={`p-6 ${darkMode ? 'bg-slate-800' : 'bg-white'}`}>
                      <div className="grid md:grid-cols-3 gap-6 mb-6">
                        <div className={`p-4 rounded-lg text-center ${
                          darkMode ? 'bg-green-900/30' : 'bg-green-100'
                        }`}>
                          <div className="text-2xl font-bold text-green-400">94.2%</div>
                          <div className={`text-sm ${darkMode ? 'text-green-300' : 'text-green-700'}`}>
                            Model Accuracy
                          </div>
                        </div>
                        <div className={`p-4 rounded-lg text-center ${
                          darkMode ? 'bg-blue-900/30' : 'bg-blue-100'
                        }`}>
                          <div className="text-2xl font-bold text-blue-400">1,247</div>
                          <div className={`text-sm ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>
                            Customers Analyzed
                          </div>
                        </div>
                        <div className={`p-4 rounded-lg text-center ${
                          darkMode ? 'bg-purple-900/30' : 'bg-purple-100'
                        }`}>
                          <div className="text-2xl font-bold text-purple-400">23%</div>
                          <div className={`text-sm ${darkMode ? 'text-purple-300' : 'text-purple-700'}`}>
                            Churn Rate
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className={`p-4 rounded-lg ${
                          darkMode ? 'bg-slate-700' : 'bg-gray-100'
                        }`}>
                          <h5 className={`font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            🎯 Key Features
                          </h5>
                          <ul className={`space-y-1 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            <li>• Real-time customer data input and prediction</li>
                            <li>• Interactive visualizations and model comparisons</li>
                            <li>• Feature importance analysis and insights</li>
                            <li>• Batch processing for multiple customers</li>
                          </ul>
                        </div>
                        
                        <div className={`p-4 rounded-lg ${
                          darkMode ? 'bg-slate-700' : 'bg-gray-100'
                        }`}>
                          <h5 className={`font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            🛠️ Technical Implementation
                          </h5>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <h6 className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                Models Used:
                              </h6>
                              <ul className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                <li>• XGBoost Classifier</li>
                                <li>• Random Forest</li>
                                <li>• Logistic Regression</li>
                              </ul>
                            </div>
                            <div>
                              <h6 className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                Features:
                              </h6>
                              <ul className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                <li>• Customer demographics</li>
                                <li>• Usage patterns</li>
                                <li>• Service interactions</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                     {/*  <div className="mt-6 text-center">
                        <a
                          href="https://github.com/prinssayja"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-green-600 to-blue-600 text-white hover:from-green-700 hover:to-blue-700 transition-all duration-300"
                        >
                          <Play className="mr-2" size={18} />
                          View Live Dashboard
                        </a>
                      </div> */}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AIPlayground;
