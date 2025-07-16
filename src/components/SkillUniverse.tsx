import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

interface Skill {
  name: string;
  category: string;
  proficiency: number;
  icon: string;
  color: number;
  description: string;
  projects: string[];
}

interface SkillPlanetData {
  planet: THREE.Mesh;
  glow: THREE.Mesh;
  label: THREE.Sprite;
  skill: Skill;
}

const SkillUniverse: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Your skills data
  const skills: Skill[] = [
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
      projects: ["Gender Detection", "Computer Vision Projects", "NLP Applications"]
    },
    {
      name: "Computer Vision",
      category: "AI Specialization",
      proficiency: 90,
      icon: "👁️",
      color: 0xec4899,
      description: "OpenCV, Real-time detection, Image processing",
      projects: ["Gender Detection", "Age/Gender Classification", "Live Video Processing"]
    },
    {
      name: "Web Technologies",
      category: "Full-Stack Development",
      proficiency: 85,
      icon: "🌐",
      color: 0x10b981,
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

  // Initialize scene
  useEffect(() => {
    if (!mountRef.current) return;

    // Setup Three.js
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    // Create AI Persona (central figure)
    const aiPersona = createAIEntity();
    scene.add(aiPersona);

    // Starfield background
    const stars = createStars();
    scene.add(stars);

    // Create planets
    const planets: SkillPlanetData[] = [];
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

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
      planet.userData = { skill };

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

      // Orbit rings
      const orbitGeometry = new THREE.RingGeometry(orbitRadius - 0.05, orbitRadius + 0.05, 64);
      const orbitMaterial = new THREE.MeshBasicMaterial({
        color: skill.color,
        transparent: true,
        opacity: 0.1,
        side: THREE.DoubleSide
      });
      const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
      orbit.rotation.x = -Math.PI / 2;
      scene.add(orbit);
    });

    // Camera setup
    camera.position.set(0, 5, 20);
    camera.lookAt(0, 0, 0);

    // Controls
    let autoRotate = true;
    let showLabels = false;
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let cameraDistance = 20;
    let cameraAngleX = 0;
    let cameraAngleY = 0;

    const domElement = renderer.domElement;

    // Mouse Events
    domElement.addEventListener('mousedown', (e) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    domElement.addEventListener('mousemove', (e) => {
      if (isDragging) {
        const dx = e.clientX - previousMousePosition.x;
        const dy = e.clientY - previousMousePosition.y;
        cameraAngleY += dx * 0.002;
        cameraAngleX += dy * 0.002;
        previousMousePosition = { x: e.clientX, y: e.clientY };
      }
    });

    domElement.addEventListener('mouseup', () => {
      isDragging = false;
    });

    domElement.addEventListener('wheel', (e) => {
      cameraDistance -= e.deltaY * 0.01;
      cameraDistance = Math.max(5, Math.min(50, cameraDistance));
    });

    // Touch Events
    domElement.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      } else if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        (domElement as any)._initialPinchDistance = distance;
      }
    });

    domElement.addEventListener('touchmove', (e) => {
      if (e.touches.length === 1 && isDragging) {
        const touch = e.touches[0];
        const dx = touch.clientX - previousMousePosition.x;
        const dy = touch.clientY - previousMousePosition.y;
        cameraAngleY += dx * 0.002;
        cameraAngleX += dy * 0.002;
        previousMousePosition = { x: touch.clientX, y: touch.clientY };
      }

      if (e.touches.length === 2) {
        const t1 = e.touches[0];
        const t2 = e.touches[1];
        const dx = t1.clientX - t2.clientX;
        const dy = t1.clientY - t2.clientY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const delta = distance - (domElement as any)._initialPinchDistance;
        cameraDistance -= delta * 0.01;
        cameraDistance = Math.max(5, Math.min(50, cameraDistance));
        (domElement as any)._initialPinchDistance = distance;
      }
    });

    domElement.addEventListener('touchend', () => {
      isDragging = false;
    });

    // Click interaction
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

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      const time = Date.now() * 0.001;

      // Rotate camera
      if (autoRotate) {
        cameraAngleY += 0.003;
      }

      camera.position.x = Math.cos(cameraAngleY) * Math.cos(cameraAngleX) * cameraDistance;
      camera.position.y = Math.sin(cameraAngleX) * cameraDistance;
      camera.position.z = Math.sin(cameraAngleY) * Math.cos(cameraAngleX) * cameraDistance;
      camera.lookAt(0, 0, 0);

      // Animate planets
      planets.forEach((data, i) => {
        const speed = 0.1 + i * 0.005;
        const orbitRadius = data.planet.userData.orbitRadius;
        const angle = time * speed + (i * Math.PI * 2) / skills.length;
        data.planet.position.x = Math.cos(angle) * orbitRadius;
        data.planet.position.z = Math.sin(angle) * orbitRadius;
        data.planet.position.y = Math.sin(time * 1.2 + i) * 0.5;
        data.glow.position.copy(data.planet.position);
        data.label.position.set(
          data.planet.position.x,
          data.planet.position.y + 0.5,
          data.planet.position.z
        );
        data.label.lookAt(camera.position);
        data.planet.rotation.y += 0.01;
        data.glow.material.opacity = 0.3 + Math.sin(time * 2 + i) * 0.1;
      });

      // Animate AI persona
      aiPersona.rotation.y += 0.002;
      aiPersona.children.forEach(child => {
        if (child instanceof THREE.Mesh) {
          child.rotation.y += 0.002;
        }
      });

      renderer.render(scene, camera);
    };

    animate();
    setIsLoaded(true);

    // Resize handler
    const handleResize = () => {
      if (!camera || !renderer || !mountRef.current) return;
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(requestAnimationFrame(animate));
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const createAIEntity = (): THREE.Group => {
    const group = new THREE.Group();

    // Body
    const bodyGeo = new THREE.CylinderGeometry(0.25, 0.3, 1.2, 12);
    const bodyMat = new THREE.MeshBasicMaterial({ color: 0x2c3e50, transparent: true, opacity: 0.9 });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = 0.3;
    group.add(body);

    // Head
    const headGeo = new THREE.SphereGeometry(0.25, 16, 16);
    const headMat = new THREE.MeshBasicMaterial({ color: 0xe8b894, transparent: true, opacity: 0.95 });
    const head = new THREE.Mesh(headGeo, headMat);
    head.position.y = 1.1;
    group.add(head);

    // Eyes
    const eyeGeo = new THREE.SphereGeometry(0.03, 8, 8);
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 0.9 });
    const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
    leftEye.position.set(-0.08, 1.15, 0.2);
    const rightEye = new THREE.Mesh(eyeGeo, eyeMat);
    rightEye.position.set(0.08, 1.15, 0.2);
    group.add(leftEye, rightEye);

    // Position AI at center
    group.position.y = -0.4;
    return group;
  };

  const createStars = (): THREE.Points => {
    const starVertices = [];
    for (let i = 0; i < 1000; i++) {
      const x = (Math.random() - 0.5) * 200;
      const y = (Math.random() - 0.5) * 200;
      const z = (Math.random() - 0.5) * 200;
      starVertices.push(x, y, z);
    }
    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 });
    return new THREE.Points(starGeometry, starMaterial);
  };

  return (
    <section id="skill-universe" className={`py-20 relative overflow-hidden ${darkMode ? 'bg-slate-900' : 'bg-gray-900'}`}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">🌌 Skill Universe</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore my technical skills in an interactive 3D galaxy.
          </p>
        </div>

        <div className="relative">
          {/* 3D Canvas */}
          <div
            ref={mountRef}
            className="w-full h-96 md:h-[500px] rounded-xl border border-purple-500/20 bg-black/20 backdrop-blur-sm"
            style={{ cursor: 'grab' }}
          />
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-purple-400 text-lg">Loading Universe... 🌌</div>
            </div>
          )}
          <div className="absolute top-4 left-4 text-white/70 text-sm">
            <p>🖱️ Watch the planets orbit • Tap or drag to explore</p>
          </div>
        </div>

        {/* Planet Grid (Optional) */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {skills.map((skill, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-xl border transition-all duration-300 cursor-pointer hover:scale-105 ${
                darkMode ? 'bg-slate-800/50 border-purple-500/20 hover:border-purple-500/40' : 'bg-white/10 border-purple-400/20 hover:border-purple-400/40'
              }`}
              onClick={() => setSelectedSkill(skill)}
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-lg mr-4" style={{ backgroundColor: `${skill.color.toString(16)}20`, color: `#${skill.color.toString(16)}` }}>
                  <span className="text-2xl">{skill.icon}</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold">{skill.name}</h3>
                  <p className="text-gray-400 text-sm">{skill.category}</p>
                </div>
              </div>
              <div className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300">Proficiency</span>
                  <span className="text-purple-400">{skill.proficiency}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="h-2 rounded-full"
                    style={{ width: `${skill.proficiency}%`, backgroundColor: `#${skill.color.toString(16)}` }}
                  />
                </div>
              </div>
              <p className="text-gray-300 text-sm mb-3">{skill.description}</p>
              <div className="flex flex-wrap gap-1">
                {skill.projects.slice(0, 2).map((project, idx) => (
                  <span key={idx} className="px-2 py-1 rounded text-xs bg-gray-700 text-gray-300">
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

      {/* Modal */}
      {selectedSkill && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className={`max-w-2xl w-full rounded-xl p-8 ${darkMode ? 'bg-slate-800' : 'bg-white'}`}>
            <div className="flex items-center mb-6">
              <div className="p-4 rounded-lg mr-4" style={{ backgroundColor: `${selectedSkill.color.toString(16)}20`, color: `#${selectedSkill.color.toString(16)}` }}>
                <span className="text-2xl">{selectedSkill.icon}</span>
              </div>
              <div>
                <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedSkill.name}</h3>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{selectedSkill.category}</p>
              </div>
            </div>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-6`}>
              {selectedSkill.description}
            </p>
            <div className="mb-6">
              <h4 className={`font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Related Projects:</h4>
              <div className="grid gap-2">
                {selectedSkill.projects.map((project, idx) => (
                  <div key={idx} className={`${darkMode ? 'bg-slate-700' : 'bg-gray-100'} p-3 rounded-lg`}>
                    <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{project}</span>
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