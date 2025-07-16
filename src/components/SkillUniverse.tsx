import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Brain, Code, Database, Globe, Cpu, Zap, Eye, Cloud, BarChart3, Settings, RotateCcw, Tag } from 'lucide-react';

interface SkillUniverseProps {
  darkMode: boolean;
}

interface SkillPlanet {
  name: string;
  category: string;
  level: number;
  color: string;
  colorHex: number;
  icon: React.ReactNode;
  description: string;
  projects: string[];
  position: { x: number; y: number; z: number };
}

const SkillUniverse: React.FC<SkillUniverseProps> = ({ darkMode }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const [selectedSkill, setSelectedSkill] = useState<SkillPlanet | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [showLabels, setShowLabels] = useState(false);
  const [cameraDistance, setCameraDistance] = useState(20);
  const [cameraAngleX, setCameraAngleX] = useState(0);
  const [cameraAngleY, setCameraAngleY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [previousMousePosition, setPreviousMousePosition] = useState({ x: 0, y: 0 });

  const skillPlanets: SkillPlanet[] = [
    {
      name: 'Python Ecosystem',
      category: 'Programming Languages',
      level: 95,
      color: '#3776ab',
      colorHex: 0x3776ab,
      icon: <Code size={24} />,
      description: 'NumPy, Pandas, Scikit-learn - Core data science stack',
      projects: ['Gender & Age Detection', 'Resume Analyzer', 'Customer Churn Prediction'],
      position: { x: 8, y: 2, z: 0 }
    },
    {
      name: 'AI & Deep Learning',
      category: 'AI/Data Science',
      level: 92,
      color: '#ff6b6b',
      colorHex: 0xff6b6b,
      icon: <Brain size={24} />,
      description: 'CNNs, RNNs, TensorFlow, PyTorch - Advanced neural networks',
      projects: ['Gender Detection (92% accuracy)', 'Computer Vision Projects', 'NLP Applications'],
      position: { x: -6, y: 3, z: 4 }
    },
    {
      name: 'Computer Vision',
      category: 'AI Specialization',
      level: 90,
      color: '#4ecdc4',
      colorHex: 0x4ecdc4,
      icon: <Eye size={24} />,
      description: 'OpenCV, Real-time detection, Image processing',
      projects: ['Gender & Age Detection (GitHub)', 'Age/Gender Classification', 'Live Video Processing'],
      position: { x: 4, y: -4, z: 6 }
    },
    {
      name: 'Web Technologies',
      category: 'Full-Stack Development',
      level: 85,
      color: '#45b7d1',
      colorHex: 0x45b7d1,
      icon: <Globe size={24} />,
      description: 'React, Angular, Node.js - Modern web development',
      projects: ['Twinnet Technology Apps', 'Portfolio Website', 'Interactive Dashboards'],
      position: { x: -8, y: -2, z: -3 }
    },
    {
      name: 'Cloud & MLOps',
      category: 'Cloud Technologies',
      level: 80,
      color: '#96ceb4',
      colorHex: 0x96ceb4,
      icon: <Cloud size={24} />,
      description: 'AWS SageMaker, GCP AI Platform, Docker, CI/CD pipelines',
      projects: ['Model Deployment', 'Cloud Architecture', 'Scalable ML Systems'],
      position: { x: 2, y: 6, z: -5 }
    },
    {
      name: 'Data Engineering',
      category: 'Data & Analytics',
      level: 88,
      color: '#feca57',
      colorHex: 0xfeca57,
      icon: <BarChart3 size={24} />,
      description: 'SQL, Data Pipelines, Model Optimization, A/B Testing',
      projects: ['Customer Analytics', 'Data Preprocessing', 'Feature Engineering'],
      position: { x: -4, y: -5, z: 2 }
    },
    {
      name: 'Tools & Frameworks',
      category: 'Development Tools',
      level: 85,
      color: '#ee5a24',
      colorHex: 0xee5a24,
      icon: <Settings size={24} />,
      description: 'Git, Streamlit, Tableau, Firebase - Professional toolkit',
      projects: ['Interactive Dashboards', 'Data Visualization', 'Version Control'],
      position: { x: 6, y: 1, z: -6 }
    },
    {
      name: 'Programming Languages',
      category: 'Core Languages',
      level: 87,
      color: '#9b59b6',
      colorHex: 0x9b59b6,
      icon: <Cpu size={24} />,
      description: 'Java, SQL, R - Multi-language proficiency',
      projects: ['Backend Development', 'Database Management', 'Statistical Analysis'],
      position: { x: -2, y: 4, z: 8 }
    }
  ];

  const planetsRef = useRef<any[]>([]);
  const aiPersonaRef = useRef<THREE.Group>();
  const animationIdRef = useRef<number>();

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
    cameraRef.current = camera;

    // Create central platform
    const platformGeometry = new THREE.CylinderGeometry(2.5, 2.5, 0.2, 32);
    const platformMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x2c3e50,
      transparent: true,
      opacity: 0.8
    });
    const platform = new THREE.Mesh(platformGeometry, platformMaterial);
    platform.position.y = -0.5;
    scene.add(platform);

    // Platform glow
    const platformGlowGeometry = new THREE.CylinderGeometry(2.8, 2.8, 0.1, 32);
    const platformGlowMaterial = new THREE.MeshBasicMaterial({
      color: 0x64ffda,
      transparent: true,
      opacity: 0.3
    });
    const platformGlow = new THREE.Mesh(platformGlowGeometry, platformGlowMaterial);
    platformGlow.position.y = -0.45;
    scene.add(platformGlow);

    // Create AI persona
    const aiPersona = new THREE.Group();
    
    // Body
    const bodyGeometry = new THREE.CylinderGeometry(0.25, 0.3, 1.2, 12);
    const bodyMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x2c3e50,
      transparent: true,
      opacity: 0.9
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.3;
    aiPersona.add(body);
    
    // Head
    const headGeometry = new THREE.SphereGeometry(0.25, 16, 16);
    const headMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xe8b894,
      transparent: true,
      opacity: 0.95
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 1.1;
    aiPersona.add(head);
    
    // Glowing AI eyes
    const eyeGeometry = new THREE.SphereGeometry(0.03, 8, 8);
    const eyeMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x00ffff,
      transparent: true,
      opacity: 0.9
    });
    
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.08, 1.15, 0.2);
    aiPersona.add(leftEye);
    
    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.08, 1.15, 0.2);
    aiPersona.add(rightEye);
    
    // Arms
    const armGeometry = new THREE.CylinderGeometry(0.08, 0.08, 0.8, 8);
    const armMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xe8b894,
      transparent: true,
      opacity: 0.9
    });
    
    const leftArm = new THREE.Mesh(armGeometry, armMaterial);
    leftArm.position.set(-0.4, 0.5, 0);
    leftArm.rotation.z = 0.2;
    aiPersona.add(leftArm);
    
    const rightArm = new THREE.Mesh(armGeometry, armMaterial);
    rightArm.position.set(0.4, 0.5, 0);
    rightArm.rotation.z = -0.2;
    aiPersona.add(rightArm);
    
    // Energy field
    const energyFieldGeometry = new THREE.SphereGeometry(1.2, 16, 16);
    const energyFieldMaterial = new THREE.MeshBasicMaterial({
      color: 0x64ffda,
      transparent: true,
      opacity: 0.08,
      wireframe: true
    });
    const energyField = new THREE.Mesh(energyFieldGeometry, energyFieldMaterial);
    energyField.position.y = 0.2;
    aiPersona.add(energyField);
    
    // Neural network around head
    const neuralGeometry = new THREE.SphereGeometry(0.4, 8, 8);
    const neuralMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0.15,
      wireframe: true
    });
    const neuralNetwork = new THREE.Mesh(neuralGeometry, neuralMaterial);
    neuralNetwork.position.y = 1.1;
    aiPersona.add(neuralNetwork);
    
    aiPersona.position.y = -0.4;
    scene.add(aiPersona);
    aiPersonaRef.current = aiPersona;

    // Central sun (AI Core)
    const sunGeometry = new THREE.SphereGeometry(0.8, 32, 32);
    const sunMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xffd700,
      transparent: true,
      opacity: 0.7
    });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    sun.position.y = 3;
    scene.add(sun);

    // Sun glow
    const sunGlow = new THREE.Mesh(
      new THREE.SphereGeometry(1.0, 32, 32),
      new THREE.MeshBasicMaterial({
        color: 0xffd700,
        transparent: true,
        opacity: 0.2
      })
    );
    sunGlow.position.y = 3;
    scene.add(sunGlow);

    // Create skill planets
    const planets: any[] = [];
    skillPlanets.forEach((skill, index) => {
      const size = 0.3 + (skill.level / 100) * 0.7;
      const geometry = new THREE.SphereGeometry(size, 16, 16);
      const material = new THREE.MeshBasicMaterial({ 
        color: skill.colorHex,
        transparent: true,
        opacity: 0.9
      });
      const planet = new THREE.Mesh(geometry, material);
      
      planet.position.set(skill.position.x, skill.position.y, skill.position.z);
      planet.userData = { skill: skill, index: index };
      
      // Glow effect
      const glowGeometry = new THREE.SphereGeometry(size * 1.3, 16, 16);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: skill.colorHex,
        transparent: true,
        opacity: 0.3
      });
      const glow = new THREE.Mesh(glowGeometry, glowMaterial);
      glow.position.copy(planet.position);
      
      // Text label
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (context) {
        canvas.width = 512;
        canvas.height = 128;
        
        context.fillStyle = 'rgba(0, 0, 0, 0)';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.font = 'bold 36px Arial';
        context.fillStyle = '#ffffff';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.shadowColor = 'rgba(0, 0, 0, 0.8)';
        context.shadowBlur = 8;
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        
        const skillName = skill.name.length > 15 ? skill.name.substring(0, 15) + '...' : skill.name;
        context.fillText(skillName, canvas.width / 2, canvas.height / 2);
        
        const texture = new THREE.CanvasTexture(canvas);
        const labelMaterial = new THREE.SpriteMaterial({ 
          map: texture,
          transparent: true,
          opacity: 0.9
        });
        const label = new THREE.Sprite(labelMaterial);
        label.scale.set(4, 1, 1);
        label.position.set(skill.position.x, skill.position.y + size + 1, skill.position.z);
        label.visible = false;
        
        scene.add(planet);
        scene.add(glow);
        scene.add(label);
        planets.push({ planet, glow, skill, label });
      }
    });
    
    planetsRef.current = planets;

    // Add stars
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 });
    const starVertices = [];
    
    for (let i = 0; i < 1000; i++) {
      starVertices.push(
        (Math.random() - 0.5) * 200,
        (Math.random() - 0.5) * 200,
        (Math.random() - 0.5) * 200
      );
    }
    
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Mouse controls
    const handleMouseDown = (e: MouseEvent) => {
      setIsDragging(true);
      setPreviousMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const deltaMove = {
          x: e.clientX - previousMousePosition.x,
          y: e.clientY - previousMousePosition.y
        };
        
        setCameraAngleY(prev => prev + deltaMove.x * 0.01);
        setCameraAngleX(prev => Math.max(-Math.PI/2, Math.min(Math.PI/2, prev + deltaMove.y * 0.01)));
        
        setPreviousMousePosition({ x: e.clientX, y: e.clientY });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const handleWheel = (e: WheelEvent) => {
      setCameraDistance(prev => Math.max(5, Math.min(50, prev + e.deltaY * 0.01)));
    };

    // Click detection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleClick = (e: MouseEvent) => {
      if (isDragging) return;
      
      mouse.x = (e.clientX / mountRef.current!.clientWidth) * 2 - 1;
      mouse.y = -(e.clientY / mountRef.current!.clientHeight) * 2 + 1;
      
      raycaster.setFromCamera(mouse, camera);
      const planetMeshes = planets.map(p => p.planet);
      const intersects = raycaster.intersectObjects(planetMeshes);
      
      if (intersects.length > 0) {
        const skill = intersects[0].object.userData.skill;
        setSelectedSkill(skill);
      }
    };

    renderer.domElement.addEventListener('mousedown', handleMouseDown);
    renderer.domElement.addEventListener('mousemove', handleMouseMove);
    renderer.domElement.addEventListener('mouseup', handleMouseUp);
    renderer.domElement.addEventListener('wheel', handleWheel);
    renderer.domElement.addEventListener('click', handleClick);

    // Camera initial position
    camera.position.set(0, 5, 20);
    camera.lookAt(0, 0, 0);

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      
      // Auto rotate
      if (autoRotate) {
        setCameraAngleY(prev => prev + 0.005);
      }
      
      // Update camera position
      camera.position.x = Math.cos(cameraAngleY) * Math.cos(cameraAngleX) * cameraDistance;
      camera.position.y = Math.sin(cameraAngleX) * cameraDistance;
      camera.position.z = Math.sin(cameraAngleY) * Math.cos(cameraAngleX) * cameraDistance;
      camera.lookAt(0, 0, 0);
      
      // Animate planets
      planets.forEach((planetData, index) => {
        const time = Date.now() * 0.001;
        const speed = 0.15 + (index * 0.08);
        const skill = planetData.skill;
        
        const orbitRadius = Math.sqrt(skill.position.x ** 2 + skill.position.z ** 2);
        const angle = time * speed + (index * Math.PI * 2) / skillPlanets.length;
        
        planetData.planet.position.x = Math.cos(angle) * orbitRadius;
        planetData.planet.position.z = Math.sin(angle) * orbitRadius;
        planetData.planet.position.y = skill.position.y + Math.sin(time * 1.5 + index) * 0.3;
        
        planetData.glow.position.copy(planetData.planet.position);
        
        const planetSize = 0.3 + (skill.level / 100) * 0.7;
        planetData.label.position.set(
          planetData.planet.position.x,
          planetData.planet.position.y + planetSize + 1,
          planetData.planet.position.z
        );
        
        planetData.label.lookAt(camera.position);
        planetData.planet.rotation.y += 0.02;
        planetData.glow.material.opacity = 0.3 + Math.sin(time * 3 + index) * 0.1;
      });
      
      // Animate AI persona
      const time = Date.now() * 0.001;
      if (aiPersonaRef.current) {
        aiPersonaRef.current.rotation.y = Math.sin(time * 0.3) * 0.2;
        
        // Animate energy field and neural network
        const energyField = aiPersonaRef.current.children.find(child => 
          child instanceof THREE.Mesh && child.material.wireframe
        );
        if (energyField) {
          energyField.rotation.y += 0.005;
          energyField.rotation.x += 0.003;
        }
      }
      
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
      renderer.domElement.removeEventListener('mousedown', handleMouseDown);
      renderer.domElement.removeEventListener('mousemove', handleMouseMove);
      renderer.domElement.removeEventListener('mouseup', handleMouseUp);
      renderer.domElement.removeEventListener('wheel', handleWheel);
      renderer.domElement.removeEventListener('click', handleClick);
      
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [autoRotate, cameraDistance, cameraAngleX, cameraAngleY, isDragging, previousMousePosition]);

  const resetView = () => {
    setCameraDistance(20);
    setCameraAngleX(0);
    setCameraAngleY(0);
  };

  const toggleLabels = () => {
    setShowLabels(!showLabels);
    if (planetsRef.current) {
      planetsRef.current.forEach(planetData => {
        planetData.label.visible = !showLabels;
      });
    }
  };

  return (
    <section id="skill-universe" className={`py-20 relative overflow-hidden ${
      darkMode ? 'bg-slate-900' : 'bg-gray-900'
    }`}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            🌌 AI Skill Universe
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Meet your AI persona standing at the center of his expertise galaxy. Each planet represents a core technical competency, orbiting around his passion for AI and innovation.
          </p>
        </div>

        <div className="relative">
          {/* Info Panel */}
          <div className="absolute top-4 left-4 z-10 bg-black/80 backdrop-blur-sm rounded-lg p-4 max-w-sm border border-white/10">
            <h3 className="text-white font-semibold mb-2">🌌 AI Skill Universe</h3>
            <p className="text-gray-300 text-sm mb-3">
              Your AI persona commands the center of this skill galaxy.
            </p>
            <div className="text-xs text-gray-400 space-y-1">
              <p>🖱️ <strong>Click</strong> planets to explore skills</p>
              <p>🎯 <strong>Drag</strong> to rotate view</p>
              <p>⚡ <strong>Scroll</strong> to zoom in/out</p>
              <p>🤖 <strong>AI Persona</strong> commands the center</p>
            </div>
          </div>

          {/* Controls */}
          <div className="absolute bottom-4 left-4 z-10 flex gap-2">
            <button
              onClick={() => setAutoRotate(!autoRotate)}
              className={`px-3 py-2 rounded-lg text-sm border transition-all ${
                autoRotate 
                  ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400' 
                  : 'bg-black/70 border-white/20 text-white hover:bg-cyan-500/10'
              }`}
            >
              <RotateCcw size={16} className="inline mr-1" />
              Auto Rotate
            </button>
            <button
              onClick={resetView}
              className="px-3 py-2 rounded-lg text-sm bg-black/70 border border-white/20 text-white hover:bg-cyan-500/10 transition-all"
            >
              🎯 Reset View
            </button>
            <button
              onClick={toggleLabels}
              className={`px-3 py-2 rounded-lg text-sm border transition-all ${
                showLabels 
                  ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400' 
                  : 'bg-black/70 border-white/20 text-white hover:bg-cyan-500/10'
              }`}
            >
              <Tag size={16} className="inline mr-1" />
              Labels
            </button>
          </div>

          {/* 3D Universe Container */}
          <div 
            ref={mountRef} 
            className="w-full h-96 md:h-[500px] rounded-xl border border-purple-500/20 bg-black/20 backdrop-blur-sm"
            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
          />

          {/* Loading indicator */}
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <div className="text-center">
                <div className="w-8 h-8 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin mx-auto mb-4"></div>
                <div className="text-cyan-400 text-lg">Loading Skill Universe... 🌌</div>
              </div>
            </div>
          )}
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
                  <span className="text-cyan-400">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-1000 bg-gradient-to-r from-cyan-400 to-blue-500"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
              
              <p className="text-gray-300 text-sm mb-3">{skill.description}</p>
              
              <div className="flex flex-wrap gap-1">
                {skill.projects.slice(0, 2).map((project, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 rounded text-xs bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
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
                // Around line 681, change this:
<h3 className={`text-2xl font-bold ${darkMode

// To this:
<h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>

// Or if you want to keep it simple and consistent with your dark theme:
<h3 className="text-2xl font-bold text-white">

// The complete modal section should look like this:
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
          <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {selectedSkill.category}
          </p>
        </div>
        <button
          onClick={() => setSelectedSkill(null)}
          className="ml-auto p-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white"
        >
          ×
        </button>
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Proficiency Level</span>
          <span className="text-cyan-400 font-semibold">{selectedSkill.level}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3">
          <div
            className="h-3 rounded-full transition-all duration-1000 bg-gradient-to-r from-cyan-400 to-blue-500"
            style={{ width: `${selectedSkill.level}%` }}
          />
        </div>
      </div>
      
      <p className={`text-lg mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        {selectedSkill.description}
      </p>
      
      <div className="mb-6">
        <h4 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Featured Projects
        </h4>
        <div className="space-y-2">
          {selectedSkill.projects.map((project, idx) => (
            <div
              key={idx}
              className="px-3 py-2 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
            >
              {project}
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
)}