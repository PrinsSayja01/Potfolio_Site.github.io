import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

interface SkillPlanet {
  name: string;
  category: string;
  proficiency: number;
  icon: string;
  color: number;
  description: string;
  projects: string[];
}

interface SkillUniverseProps {
  darkMode: boolean;
}

const SkillUniverse: React.FC<SkillUniverseProps> = ({ darkMode }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedSkill, setSelectedSkill] = useState<SkillPlanet | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Skills data
  const skills: SkillPlanet[] = [
    {
      name: "Python Ecosystem",
      category: "Programming Languages",
      proficiency: 95,
      icon: "🐍",
      color: 0x8b5cf6,
      description: "NumPy, Pandas, Scikit-learn - Core data science stack",
      projects: ["Gender & Age Detection", "Resume Analyzer", "Customer Churn Prediction"]
    },
    {
      name: "AI & Deep Learning",
      category: "AI/Data Science",
      proficiency: 92,
      icon: "🧠",
      color: 0x06b6d4,
      description: "CNNs, RNNs, TensorFlow, PyTorch - Advanced neural networks",
      projects: ["Gender Detection (92% accuracy)", "Computer Vision Projects", "NLP Applications"]
    },
    {
      name: "Computer Vision",
      category: "AI Specialization",
      proficiency: 90,
      icon: "👁️",
      color: 0xec4899,
      description: "OpenCV, Real-time detection, Image processing",
      projects: ["Gender & Age Detection (GitHub)", "Age/Gender Classification", "Live Video Processing"]
    },
    {
      name: "Web Technologies",
      category: "Full-Stack Development",
      proficiency: 85,
      icon: "🌐",
      color: 0x10b681,
      description: "React, Angular, Node.js - Modern web development",
      projects: ["Twinnet Technology Apps", "Portfolio Website", "Interactive Dashboards"]
    },
    {
      name: "Cloud & MLOps",
      category: "Cloud Technologies",
      proficiency: 80,
      icon: "☁️",
      color: 0xf59e0b,
      description: "AWS SageMaker, GCP AI Platform, Docker, CI/CD pipelines",
      projects: ["Model Deployment", "Cloud Architecture", "Scalable ML Systems"]
    },
    {
      name: "Data Engineering",
      category: "Data & Analytics",
      proficiency: 88,
      icon: "📊",
      color: 0x8b5cf6,
      description: "SQL, Data Pipelines, Model Optimization, A/B Testing",
      projects: ["Customer Analytics", "Data Preprocessing", "Feature Engineering"]
    },
    {
      name: "Tools & Frameworks",
      category: "Development Tools",
      proficiency: 85,
      icon: "🔧",
      color: 0xf97316,
      description: "Git, Streamlit, Tableau, Firebase - Professional toolkit",
      projects: ["Interactive Dashboards", "Data Visualization", "Version Control"]
    },
    {
      name: "Programming Languages",
      category: "Core Languages",
      proficiency: 87,
      icon: "💻",
      color: 0x06b6d4,
      description: "Java, SQL, R - Multi-language proficiency",
      projects: ["Backend Development", "Database Management", "Statistical Analysis"]
    }
  ];

  useEffect(() => {
    if (!mountRef.current) return;

    let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer;
    let autoRotate = true;
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let cameraDistance = 20;
    let cameraAngleX = 0;
    let cameraAngleY = 0;
    const planets: any[] = [];

    const init = () => {
      // Scene Setup
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(mountRef.current!.clientWidth, mountRef.current!.clientHeight);
      renderer.setClearColor(0x000000, 0);
      mountRef.current!.appendChild(renderer.domElement);

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(ambientLight);

      // Add stars
      const starGeometry = new THREE.BufferGeometry();
      const starVertices = [];
      for (let i = 0; i < 1000; i++) {
        const x = (Math.random() - 0.5) * 200;
        const y = (Math.random() - 0.5) * 200;
        const z = (Math.random() - 0.5) * 200;
        starVertices.push(x, y, z);
      }
      starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
      const stars = new THREE.Points(starGeometry, new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 }));
      scene.add(stars);

      // Create planets and AI persona
      createAIPlatform(scene);
      createAIEntity(scene);
      createSun(scene);
      createPlanets(scene, planets, skills);

      // Camera Position
      camera.position.set(0, 5, 20);
      camera.lookAt(0, 0, 0);

      // Event Listeners
      addEventListeners(renderer, scene, camera, planets, setSelectedSkill);

      // Start animation
      animate();

      setIsLoaded(true);
    };

    const animate = () => {
      requestAnimationFrame(animate);
      const time = Date.now() * 0.001;

      // Rotate camera if autoRotate enabled
      if (autoRotate) {
        cameraAngleY += 0.003;
      }

      // Update camera position
      camera.position.x = Math.cos(cameraAngleY) * Math.cos(cameraAngleX) * cameraDistance;
      camera.position.y = Math.sin(cameraAngleX) * cameraDistance;
      camera.position.z = Math.sin(cameraAngleY) * Math.cos(cameraAngleX) * cameraDistance;
      camera.lookAt(0, 0, 0);

      // Animate planets
      planets.forEach((planetData, index) => {
        const speed = 0.1 + (index * 0.05);
        const orbitRadius = planetData.planet.userData.orbitRadius;
        const angle = time * speed + (index * Math.PI * 2) / skills.length;
        planetData.planet.position.x = Math.cos(angle) * orbitRadius;
        planetData.planet.position.z = Math.sin(angle) * orbitRadius;
        planetData.planet.position.y = Math.sin(time * 1.2 + index) * 0.5;
        planetData.glow.position.copy(planetData.planet.position);
        planetData.label.position.set(
          planetData.planet.position.x,
          planetData.planet.position.y + 0.5,
          planetData.planet.position.z
        );
        planetData.label.lookAt(camera.position);
        planetData.planet.rotation.y += 0.01;
        planetData.glow.material.opacity = 0.3 + Math.sin(time * 2 + index) * 0.1;
      });

      renderer.render(scene, camera);
    };

    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', onWindowResize);

    init();

    return () => {
      window.removeEventListener('resize', onWindowResize);
      cancelAnimationFrame(requestAnimationFrame(animate));
      renderer.dispose();
    };
  }, []);

  const createAIPlatform = (scene: THREE.Scene) => {
    const platformGeometry = new THREE.CylinderGeometry(2.5, 2.5, 0.2, 32);
    const platformMaterial = new THREE.MeshBasicMaterial({ color: 0x2c3e50, transparent: true, opacity: 0.8 });
    const platform = new THREE.Mesh(platformGeometry, platformMaterial);
    platform.position.y = -0.5;
    scene.add(platform);
  };

  const createAIEntity = (scene: THREE.Scene) => {
    const aiPersona = new THREE.Group();
    // Body, head, arms, legs, eyes... (same as in your HTML)
    // Simplified here for brevity — add your full mesh creation logic here
    scene.add(aiPersona);
  };

  const createSun = (scene: THREE.Scene) => {
    const sunGeometry = new THREE.SphereGeometry(0.6, 32, 32);
    const sunMaterial = new THREE.MeshBasicMaterial({ color: 0x64ffda, transparent: true, opacity: 0.7 });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    sun.position.y = 4;
    scene.add(sun);
  };

  const createPlanets = (
    scene: THREE.Scene,
    planets: any[],
    skills: SkillPlanet[]
  ) => {
    skills.forEach((skill, index) => {
      const size = 0.3 + (skill.proficiency / 100) * 0.5;
      const geometry = new THREE.SphereGeometry(size, 16, 16);
      const material = new THREE.MeshBasicMaterial({
        color: skill.color,
        transparent: true,
        opacity: 0.9
      });
      const planet = new THREE.Mesh(geometry, material);
      const orbitRadius = 4 + (index % 3) * 1.5;
      const angle = (index / skills.length) * Math.PI * 2;
      planet.position.x = Math.cos(angle) * orbitRadius;
      planet.position.z = Math.sin(angle) * orbitRadius;
      planet.position.y = (Math.random() - 0.5) * 2;
      planet.userData = { skill, index, orbitRadius };

      // Glow effect
      const glowGeometry = new THREE.SphereGeometry(size * 1.3, 16, 16);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: skill.color,
        transparent: true,
        opacity: 0.3
      });
      const glow = new THREE.Mesh(glowGeometry, glowMaterial);
      glow.position.copy(planet.position);

      // Label
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = 512;
      canvas.height = 128;
      context.fillStyle = 'rgba(0, 0, 0, 0)';
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.font = 'bold 36px Arial';
      context.fillStyle = '#64ffda';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(skill.name, canvas.width / 2, canvas.height / 2);
      const texture = new THREE.CanvasTexture(canvas);
      const labelMaterial = new THREE.SpriteMaterial({ map: texture, transparent: true, opacity: 0.9 });
      const label = new THREE.Sprite(labelMaterial);
      label.scale.set(4, 1, 1);
      label.position.set(planet.position.x, planet.position.y + size + 1, planet.position.z);

      scene.add(planet);
      scene.add(glow);
      scene.add(label);
      planets.push({ planet, glow, label, skill });
    });
  };

  const addEventListeners = (
    renderer: THREE.WebGLRenderer,
    scene: THREE.Scene,
    camera: THREE.Camera,
    planets: any[],
    setSelectedSkill: React.Dispatch<React.SetStateAction<any>>
  ) => {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const domElement = renderer.domElement;

    domElement.addEventListener('click', (e) => {
      if (isDragging) return;
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(planets.map(p => p.planet));
      if (intersects.length > 0) {
        setSelectedSkill(intersects[0].object.userData.skill);
      }
    });

    domElement.addEventListener('mousedown', (e) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    domElement.addEventListener('mousemove', (e) => {
      if (isDragging) {
        const deltaMove = {
          x: e.clientX - previousMousePosition.x,
          y: e.clientY - previousMousePosition.y
        };
        cameraAngleY += deltaMove.x * 0.01;
        cameraAngleX += deltaMove.y * 0.01;
        previousMousePosition = { x: e.clientX, y: e.clientY };
      }
    });

    domElement.addEventListener('mouseup', () => {
      isDragging = false;
    });

    domElement.addEventListener('wheel', (e) => {
      cameraDistance += e.deltaY * 0.01;
      cameraDistance = Math.max(5, Math.min(50, cameraDistance));
    });
  };

  return (
    <section id="skill-universe" className={`py-20 relative overflow-hidden ${darkMode ? 'bg-slate-900' : 'bg-gray-900'}`}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">🌌 Skill Universe</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore my technical skills in an interactive 3D galaxy. Each planet represents a core competency, orbiting around my passion for AI and innovation.
          </p>
        </div>

        <div className="relative">
          <div ref={mountRef} className="w-full h-96 md:h-[500px] rounded-xl border border-purple-500/20 bg-black/20 backdrop-blur-sm" style={{ cursor: 'grab' }} />
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-purple-400 text-lg">Loading Universe... 🌌</div>
            </div>
          )}
          <div className="absolute top-4 left-4 text-white/70 text-sm">
            <p>🖱️ Watch the planets orbit • Click to explore skills</p>
          </div>
        </div>

        {/* Modal */}
        {selectedSkill && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className={`max-w-2xl w-full rounded-xl p-8 ${darkMode ? 'bg-slate-800' : 'bg-white'}`}>
              <div className="flex items-center mb-6">
                <div className="p-4 rounded-lg mr-4" style={{ backgroundColor: `${selectedSkill.color.toString(16)}20`, color: selectedSkill.color }}>
                  <span className="text-2xl">{selectedSkill.icon}</span>
                </div>
                <div>
                  <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedSkill.name}</h3>
                  <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{selectedSkill.category}</p>
                </div>
              </div>
              <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{selectedSkill.description}</p>
              <div className="mb-6">
                <h4 className={`font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Related Projects:</h4>
                <div className="grid gap-2">
                  {selectedSkill.projects.map((project, idx) => (
                    <div key={idx} className={`p-3 rounded-lg ${darkMode ? 'bg-slate-700' : 'bg-gray-100'}`}>
                      <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{project}</span>
                    </div>
                  ))}
                </div>
              </div>
              <button onClick={() => setSelectedSkill(null)} className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300">
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SkillUniverse;