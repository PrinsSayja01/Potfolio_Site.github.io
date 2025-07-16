import React, { useState, useEffect } from 'react';
import { Code, Trophy, Timer, Zap, CheckCircle, XCircle } from 'lucide-react';

interface HackathonChallengeProps {
  darkMode: boolean;
}

interface Challenge {
  id: number;
  title: string;
  question: string;
  code: string;
  options: string[];
  correct: number;
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topic: string;
}

const HackathonChallenge: React.FC<HackathonChallengeProps> = ({ darkMode }) => {
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);

  const challenges: Challenge[] = [
    {
      id: 1,
      title: 'Python List Comprehension',
      question: 'What will be the output of this code?',
      code: `numbers = [1, 2, 3, 4, 5]
result = [x**2 for x in numbers if x % 2 == 0]
print(result)`,
      options: ['[4, 16]', '[1, 9, 25]', '[2, 4]', '[1, 4, 9, 16, 25]'],
      correct: 0,
      explanation: 'The list comprehension squares only even numbers (2, 4), resulting in [4, 16].',
      difficulty: 'Easy',
      topic: 'Python'
    },
    {
      id: 2,
      title: 'JavaScript Async/Await',
      question: 'What will this async function return?',
      code: `async function getData() {
  const promise = new Promise(resolve => {
    setTimeout(() => resolve("AI Data"), 1000);
  });
  return await promise;
}
console.log(typeof getData());`,
      options: ['string', 'object', 'undefined', 'promise'],
      correct: 1,
      explanation: 'Async functions always return a Promise object, even when awaiting inside.',
      difficulty: 'Medium',
      topic: 'JavaScript'
    },
    {
      id: 3,
      title: 'Machine Learning Bug Fix',
      question: 'What\'s wrong with this ML preprocessing code?',
      code: `from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(X, y)
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.fit_transform(X_test)`,
      options: [
        'Missing random_state parameter',
        'Should use fit_transform on test data',
        'Should use transform (not fit_transform) on test data',
        'StandardScaler import is wrong'
      ],
      correct: 2,
      explanation: 'Test data should only use transform(), not fit_transform(), to avoid data leakage.',
      difficulty: 'Hard',
      topic: 'Machine Learning'
    },
    {
      id: 4,
      title: 'React Hook Logic',
      question: 'What happens when this component renders?',
      code: `function Counter() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    setCount(count + 1);
  }, [count]);
  
  return <div>{count}</div>;
}`,
      options: [
        'Shows 0',
        'Shows 1',
        'Infinite re-renders',
        'Compilation error'
      ],
      correct: 2,
      explanation: 'The useEffect depends on count and updates count, causing infinite re-renders.',
      difficulty: 'Medium',
      topic: 'React'
    }
  ];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameStarted && timeLeft > 0 && !gameCompleted) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0) {
      setGameCompleted(true);
    }
    return () => clearTimeout(timer);
  }, [timeLeft, gameStarted, gameCompleted]);

  const startGame = () => {
    setGameStarted(true);
    setCurrentChallenge(0);
    setScore(0);
    setTimeLeft(120);
    setGameCompleted(false);
  };

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    if (answerIndex === challenges[currentChallenge].correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentChallenge < challenges.length - 1) {
        setCurrentChallenge(currentChallenge + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setGameCompleted(true);
      }
    }, 2000);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-400 bg-green-500/20';
      case 'Medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'Hard': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getScoreMessage = () => {
    const percentage = (score / challenges.length) * 100;
    if (percentage >= 75) return "🏆 Excellent! You're ready for senior roles!";
    if (percentage >= 50) return "👍 Good job! Keep practicing those concepts.";
    return "💪 Great effort! Review the explanations and try again.";
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!gameStarted) {
    return (
      <section id="hackathon-challenge" className={`py-20 ${
        darkMode ? 'bg-slate-800/50' : 'bg-gray-50/50'
      } backdrop-blur-sm`}>
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              🧩 Mini Hackathon Challenge
            </h2>
            <p className={`text-xl mb-8 ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Test your coding skills with challenges inspired by my GitHub projects!
            </p>

            <div className={`p-8 rounded-xl border mb-8 ${
              darkMode 
                ? 'bg-slate-900/50 border-purple-500/20' 
                : 'bg-white/70 border-purple-200'
            }`}>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <Timer className={`mx-auto mb-2 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} size={32} />
                  <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>2 Minutes</h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Time Limit</p>
                </div>
                <div className="text-center">
                  <Code className={`mx-auto mb-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} size={32} />
                  <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>4 Challenges</h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Mixed Difficulty</p>
                </div>
                <div className="text-center">
                  <Trophy className={`mx-auto mb-2 ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`} size={32} />
                  <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Score & Feedback</h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Instant Results</p>
                </div>
              </div>

              <div className="mb-6">
                <h4 className={`font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Topics Covered:
                </h4>
                <div className="flex flex-wrap justify-center gap-2">
                  {['Python', 'JavaScript', 'Machine Learning', 'React'].map((topic) => (
                    <span
                      key={topic}
                      className={`px-3 py-1 rounded-full text-sm ${
                        darkMode 
                          ? 'bg-purple-500/20 text-purple-300' 
                          : 'bg-purple-100 text-purple-700'
                      }`}
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={startGame}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center justify-center space-x-2 mx-auto shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <Zap size={20} />
                <span>🚀 Start Challenge</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (gameCompleted) {
    return (
      <section id="hackathon-challenge" className={`py-20 ${
        darkMode ? 'bg-slate-800/50' : 'bg-gray-50/50'
      } backdrop-blur-sm`}>
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className={`p-8 rounded-xl border ${
              darkMode 
                ? 'bg-slate-900/50 border-purple-500/20' 
                : 'bg-white/70 border-purple-200'
            }`}>
              <Trophy className={`mx-auto mb-4 ${
                score >= challenges.length * 0.75 ? 'text-yellow-400' : 'text-gray-400'
              }`} size={64} />
              
              <h2 className={`text-3xl font-bold mb-4 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Challenge Complete! 🎉
              </h2>
              
              <div className="text-6xl font-bold mb-4">
                <span className={score >= challenges.length * 0.75 ? 'text-green-400' : 'text-purple-400'}>
                  {score}
                </span>
                <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                  /{challenges.length}
                </span>
              </div>
              
              <p className={`text-xl mb-6 ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {getScoreMessage()}
              </p>
              
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className={`p-4 rounded-lg ${
                  darkMode ? 'bg-slate-800' : 'bg-gray-100'
                }`}>
                  <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Accuracy
                  </h4>
                  <p className="text-2xl font-bold text-purple-400">
                    {Math.round((score / challenges.length) * 100)}%
                  </p>
                </div>
                <div className={`p-4 rounded-lg ${
                  darkMode ? 'bg-slate-800' : 'bg-gray-100'
                }`}>
                  <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Time Used
                  </h4>
                  <p className="text-2xl font-bold text-blue-400">
                    {formatTime(120 - timeLeft)}
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={startGame}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
                >
                  🔄 Try Again
                </button>
                <a
                  href="#contact"
                  className={`px-6 py-3 rounded-lg border transition-all duration-300 ${
                    darkMode 
                      ? 'border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white' 
                      : 'border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white'
                  }`}
                >
                  💼 Let's Work Together
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const challenge = challenges[currentChallenge];

  return (
    <section id="hackathon-challenge" className={`py-20 ${
      darkMode ? 'bg-slate-800/50' : 'bg-gray-50/50'
    } backdrop-blur-sm`}>
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Challenge {currentChallenge + 1} of {challenges.length}
              </h2>
              <div className="flex items-center space-x-4 mt-2">
                <span className={`px-3 py-1 rounded-full text-sm ${getDifficultyColor(challenge.difficulty)}`}>
                  {challenge.difficulty}
                </span>
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {challenge.topic}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className={`text-2xl font-bold ${timeLeft <= 30 ? 'text-red-400' : 'text-purple-400'}`}>
                {formatTime(timeLeft)}
              </div>
              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Score: {score}/{currentChallenge + (showResult ? 1 : 0)}
              </div>
            </div>
          </div>

          {/* Challenge */}
          <div className={`p-8 rounded-xl border mb-6 ${
            darkMode 
              ? 'bg-slate-900/50 border-purple-500/20' 
              : 'bg-white/70 border-purple-200'
          }`}>
            <h3 className={`text-xl font-semibold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {challenge.title}
            </h3>
            
            <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {challenge.question}
            </p>

            {/* Code Block */}
            <div className={`p-4 rounded-lg mb-6 font-mono text-sm overflow-x-auto ${
              darkMode ? 'bg-slate-800 text-green-400' : 'bg-gray-900 text-green-300'
            }`}>
              <pre>{challenge.code}</pre>
            </div>

            {/* Options */}
            <div className="grid gap-3">
              {challenge.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => !showResult && handleAnswer(index)}
                  disabled={showResult}
                  className={`p-4 rounded-lg text-left transition-all duration-300 border ${
                    showResult
                      ? index === challenge.correct
                        ? 'border-green-500 bg-green-500/20 text-green-400'
                        : index === selectedAnswer
                        ? 'border-red-500 bg-red-500/20 text-red-400'
                        : darkMode
                        ? 'border-gray-600 bg-gray-700 text-gray-400'
                        : 'border-gray-300 bg-gray-100 text-gray-600'
                      : darkMode
                      ? 'border-purple-500/20 bg-slate-800 text-white hover:border-purple-500/40 hover:bg-purple-500/10'
                      : 'border-purple-200 bg-white text-gray-900 hover:border-purple-400 hover:bg-purple-50'
                  }`}
                >
                  <div className="flex items-center">
                    <span className="mr-3 font-semibold">
                      {String.fromCharCode(65 + index)}.
                    </span>
                    <span>{option}</span>
                    {showResult && index === challenge.correct && (
                      <CheckCircle className="ml-auto text-green-400" size={20} />
                    )}
                    {showResult && index === selectedAnswer && index !== challenge.correct && (
                      <XCircle className="ml-auto text-red-400" size={20} />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Explanation */}
            {showResult && (
              <div className={`mt-6 p-4 rounded-lg ${
                darkMode ? 'bg-blue-900/30 border-blue-500/20' : 'bg-blue-50 border-blue-200'
              } border`}>
                <h4 className={`font-semibold mb-2 ${
                  darkMode ? 'text-blue-400' : 'text-blue-700'
                }`}>
                  💡 Explanation:
                </h4>
                <p className={darkMode ? 'text-blue-300' : 'text-blue-600'}>
                  {challenge.explanation}
                </p>
              </div>
            )}
          </div>

          {/* Progress Bar */}
          <div className={`w-full rounded-full h-2 ${
            darkMode ? 'bg-gray-700' : 'bg-gray-200'
          }`}>
            <div
              className="h-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-300"
              style={{ width: `${((currentChallenge + (showResult ? 1 : 0)) / challenges.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HackathonChallenge;