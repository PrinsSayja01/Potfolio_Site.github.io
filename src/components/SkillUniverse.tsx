import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Brain, Code, Database, Globe, Cpu, Zap } from 'lucide-react';

interface SkillUniverseProps {
  darkMode: boolean;
}

interface SkillPlanet {
  name: string;
  category: string;
  level: number;
  color: string;
  icon: React.ReactNode;
  description: string;
  projects: string[];
}

const SkillUniverse: React.FC<SkillUniverseProps> = ({ darkMode }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const [selectedSkill, setSelectedSkill] = useState<SkillPlanet | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const skillPlanets: SkillPlanet[] = [
    {
      name: 'Python Ecosystem',
      category: 'Programming Languages',
      level: 95,
      color: '#8b5cf6',
      icon: <Brain size={24} />,
      description: 'NumPy, Pandas, Scikit-learn - Core data science stack',
      projects: ['Gender & Age Detection', 'Resume Analyzer', 'Customer Churn Prediction']
    },
    {
      name: 'AI & Deep Learning',
      category: 'AI/Data Science',
      level: 92,
      color: '#06b6d4',
      icon: <Brain size={24} />,
      description: 'CNNs, RNNs, TensorFlow, PyTorch - Advanced neural networks',
      projects: ['Gender Detection (92% accuracy)', 'Computer Vision Projects', 'NLP Applications']
    },
    {
      name: 'Computer Vision',
      category: 'AI Specialization',
      level: 90,
      color: '#ec4899',
      icon: <Cpu size={24} />,
      description: 'OpenCV, Real-time detection, Image processing',
      projects: ['Gender & Age Detection (GitHub)', 'Age/Gender Classification', 'Live Video Processing']
    },
    {
      name: 'Web Technologies',
      category: 'Full-Stack Development',
      level: 85,
      color: '#10b981',
      icon: <Code size={24} />,
      description: 'React, Angular, Node.js - Modern web development',
      projects: ['Twinnet Technology Apps', 'Portfolio Website', 'Interactive Dashboards']
    },
    {
      name: 'Cloud & MLOps',
      category: 'Cloud Technologies',
      level: 80,
      color: '#f59e0b',
      icon: <Globe size={24} />,
      description: 'AWS SageMaker, GCP AI Platform, Docker, CI/CD pipelines',
      projects: ['Model Deployment', 'Cloud Architecture', 'Scalable ML Systems']
    },
    {
      name: 'Data Engineering',
      category: 'Data & Analytics',
      level: 88,
      color: '#8b5cf6',
      icon: <Database size={24} />,
      description: 'SQL, Data Pipelines, Model Optimization, A/B Testing',
      projects: ['Customer Analytics', 'Data Preprocessing', 'Feature Engineering']
    },
    {
      name: 'Tools & Frameworks',
      category: 'Development Tools',
      level: 85,
      color: '#f97316',
      icon: <Zap size={24} />,
      description: 'Git, Streamlit, Tableau, Firebase - Professional toolkit',
      projects: ['Interactive Dashboards', 'Data Visualization', 'Version Control']
    },
    {
      name: 'Programming Languages',
      category: 'Core Languages',
      level: 87,
      color: '#06b6d4',
      icon: <Code size={24} />,
      description: 'Java, SQL, R - Multi-language proficiency',
      projects: ['Backend Development', 'Database Management', 'Statistical Analysis']
    }
  ];

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    sceneRef.current = scene;
    rendererRef.current = renderer;

    // Create skill planets
    const planets: THREE.Mesh[] = [];
    const orbits: THREE.Line[] = [];

    skillPlanets.forEach((skill, index) => {
      // Create planet
      const geometry = new THREE.SphereGeometry(0.3 + skill.level * 0.01, 32, 32);
      const material = new THREE.MeshPhongMaterial({ 
        color: skill.color,
        shininess: 100,
        transparent: true,
        opacity: 0.8
      });
      const planet = new THREE.Mesh(geometry, material);
      
      // Position planets in orbit
      const radius = 3 + index * 1.5;
      const angle = (index / skillPlanets.length) * Math.PI * 2;
      planet.position.x = Math.cos(angle) * radius;
      planet.position.z = Math.sin(angle) * radius;
      planet.userData = { skill, index };
      
      scene.add(planet);
      planets.push(planet);

      // Create orbit ring
      const orbitGeometry = new THREE.RingGeometry(radius - 0.05, radius + 0.05, 64);
      const orbitMaterial = new THREE.MeshBasicMaterial({ 
        color: skill.color, 
        transparent: true, 
        opacity: 0.2,
        side: THREE.DoubleSide
      });
      const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
      orbit.rotation.x = -Math.PI / 2;
      scene.add(orbit);
    });

    // Add central core (representing you)
    const coreGeometry = new THREE.SphereGeometry(0.8, 32, 32);
    const coreMaterial = new THREE.MeshPhongMaterial({ 
      color: '#8b5cf6',
      emissive: '#4c1d95',
      shininess: 100
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    scene.add(core);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x8b5cf6, 1, 100);
    pointLight.position.set(0, 5, 5);
    scene.add(pointLight);

    // Add stars
    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = 1000;
    const positions = new Float32Array(starsCount * 3);

    for (let i = 0; i < starsCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 100;
    }

    starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 });
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    // Camera position
    camera.position.set(0, 5, 10);
    camera.lookAt(0, 0, 0);

    // Animation loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Rotate planets around center
      planets.forEach((planet, index) => {
        const radius = 3 + index * 1.5;
        const speed = 0.01 + index * 0.005;
        const time = Date.now() * speed * 0.001;
        
        planet.position.x = Math.cos(time) * radius;
        planet.position.z = Math.sin(time) * radius;
        planet.rotation.y += 0.02;
      });

      // Rotate core
      core.rotation.y += 0.01;
      core.rotation.x += 0.005;

      // Rotate stars
      stars.rotation.y += 0.0005;

      renderer.render(scene, camera);
    };

    animate();
    setIsLoaded(true);

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current) return;
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <section id="skill-universe" className={`py-20 relative overflow-hidden ${
      darkMode ? 'bg-slate-900' : 'bg-gray-900'
    }`}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            🌌 Skill Universe
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore my technical skills in an interactive 3D galaxy. Each planet represents a core competency, 
            orbiting around my passion for AI and innovation.
          </p>
        </div>

        <div className="relative">
          {/* 3D Universe Container */}
          <div 
            ref={mountRef} 
            className="w-full h-96 md:h-[500px] rounded-xl border border-purple-500/20 bg-black/20 backdrop-blur-sm"
            style={{ cursor: 'grab' }}
          />

          {/* Loading indicator */}
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-purple-400 text-lg">Loading Universe... 🌌</div>
            </div>
          )}

          {/* Instructions */}
          <div className="absolute top-4 left-4 text-white/70 text-sm">
            <p>🖱️ Watch the planets orbit • Click to explore skills</p>
          </div>
        </div>

        {/* Skill Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {skillPlanets.map((skill, index) => (
            <div
              key={skill.name}
              className={`p-6 rounded-xl border transition-all duration-300 cursor-pointer hover:scale-105 ${
                darkMode 
                  ? 'bg-slate-800/50 border-purple-500/20 hover:border-purple-500/40' 
                  : 'bg-white/10 border-purple-400/20 hover:border-purple-400/40'
              }`}
              onClick={() => setSelectedSkill(skill)}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center mb-4">
                <div 
                  className="p-3 rounded-lg mr-4"
                  style={{ backgroundColor: skill.color + '20', color: skill.color }}
                >
                  {skill.icon}
                </div>
                <div>
                  <h3 className="text-white font-semibold">{skill.name}</h3>
                  <p className="text-gray-400 text-sm">{skill.category}</p>
                </div>
              </div>
              
              <div className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300">Proficiency</span>
                  <span className="text-purple-400">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-1000"
                    style={{ 
                      width: `${skill.level}%`,
                      backgroundColor: skill.color
                    }}
                  />
                </div>
              </div>
              
              <p className="text-gray-300 text-sm mb-3">{skill.description}</p>
              
              <div className="flex flex-wrap gap-1">
                {skill.projects.slice(0, 2).map((project, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 rounded text-xs bg-gray-700 text-gray-300"
                  >
                    {project}
                  </span>
                ))}
                {skill.projects.length > 2 && (
                  <span className="px-2 py-1 rounded text-xs bg-gray-700 text-gray-300">
                    +{skill.projects.length - 2} more
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skill Detail Modal */}
      {selectedSkill && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className={`max-w-2xl w-full rounded-xl p-8 ${
            darkMode ? 'bg-slate-800' : 'bg-white'
          }`}>
            <div className="flex items-center mb-6">
              <div 
                className="p-4 rounded-lg mr-4"
                style={{ backgroundColor: selectedSkill.color + '20', color: selectedSkill.color }}
              >
                {selectedSkill.icon}
              </div>
              <div>
                <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {selectedSkill.name}
                </h3>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {selectedSkill.category}
                </p>
              </div>
            </div>
            
            <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {selectedSkill.description}
            </p>
            
            <div className="mb-6">
              <h4 className={`font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Related Projects:
              </h4>
              <div className="grid gap-2">
                {selectedSkill.projects.map((project, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-lg ${
                      darkMode ? 'bg-slate-700' : 'bg-gray-100'
                    }`}
                  >
                    <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                      {project}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            <button
              onClick={() => setSelectedSkill(null)}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default SkillUniverse;