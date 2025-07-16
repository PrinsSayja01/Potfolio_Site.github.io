import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

interface SkillPlanet {
  name: string;
  category: string;
  level: number;
  color: string;
  icon: JSX.Element;
  description: string;
  projects: string[];
}

interface SkillUniverseProps {
  darkMode: boolean;
}

const SkillUniverse: React.FC<SkillUniverseProps> = ({ darkMode }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const planetsRef = useRef<any[]>([]);
  const [selectedSkill, setSelectedSkill] = useState<SkillPlanet | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const skillPlanets: SkillPlanet[] = [
    {
      name: 'Python Ecosystem',
      category: 'Programming Languages',
      level: 95,
      color: '#8b5cf6',
      icon: <span className="text-2xl">🐍</span>,
      description: 'NumPy, Pandas, Scikit-learn - Core data science stack',
      projects: ['Gender & Age Detection', 'Resume Analyzer']
    },
    {
      name: 'AI & Deep Learning',
      category: 'AI/Data Science',
      level: 92,
      color: '#06b6d4',
      icon: <span className="text-2xl">🧠</span>,
      description: 'CNNs, RNNs, TensorFlow, PyTorch - Advanced neural networks',
      projects: ['Gender Detection', 'Computer Vision Projects']
    },
    // Add more skills...
  ];

  useEffect(() => {
    if (!mountRef.current) return;

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
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    // Stars background
    const starsGeometry = new THREE.BufferGeometry();
    const starVertices = [];
    for (let i = 0; i < 1000; i++) {
      const x = (Math.random() - 0.5) * 200;
      const y = (Math.random() - 0.5) * 200;
      const z = (Math.random() - 0.5) * 200;
      starVertices.push(x, y, z);
    }
    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 });
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    // Camera position
    camera.position.set(0, 5, 20);
    camera.lookAt(0, 0, 0);

    // Create planets
    const planets: any[] = [];
    skillPlanets.forEach((skill, index) => {
      const geometry = new THREE.SphereGeometry(0.3 + skill.level * 0.01, 32, 32);
      const material = new THREE.MeshPhongMaterial({
        color: parseInt(skill.color.replace('#', ''), 16),
        shininess: 100,
        transparent: true,
        opacity: 0.8,
      });
      const planet = new THREE.Mesh(geometry, material);
      const radius = 4 + index * 1.5;
      const angle = (index / skillPlanets.length) * Math.PI * 2;
      planet.position.x = Math.cos(angle) * radius;
      planet.position.z = Math.sin(angle) * radius;
      planet.position.y = (Math.random() - 0.5) * 2;
      planet.userData = { skill };
      scene.add(planet);
      planets.push(planet);
    });

    planetsRef.current = planets;

    // Raycaster for click detection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // Touch/Mouse Controls
    let isDragging = false;
    let previousTouch = { x: 0, y: 0 };
    let previousMouse = { x: 0, y: 0 };
    let cameraDistance = 20;
    let cameraAngleX = 0;
    let cameraAngleY = 0;

    // Handle mouse down
    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', (e) => {
      isDragging = true;
      previousMouse = { x: e.clientX, y: e.clientY };
    });

    // Handle mouse move
    domElement.addEventListener('mousemove', (e) => {
      if (isDragging) {
        const dx = e.clientX - previousMouse.x;
        const dy = e.clientY - previousMouse.y;
        cameraAngleY += dx * 0.002;
        cameraAngleX += dy * 0.002;
        previousMouse = { x: e.clientX, y: e.clientY };
      }
    });

    domElement.addEventListener('mouseup', () => {
      isDragging = false;
    });

    // Handle scroll zoom
    domElement.addEventListener('wheel', (e) => {
      cameraDistance -= e.deltaY * 0.01;
      cameraDistance = Math.max(5, Math.min(50, cameraDistance));
    });

    // Handle touch start
    domElement.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        const touch = e.touches[0];
        previousTouch = { x: touch.clientX, y: touch.clientY };
      } else if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        (domElement as any)._initialPinchDistance = distance;
      }
    });

    // Handle touch move
    domElement.addEventListener('touchmove', (e) => {
      if (e.touches.length === 1 && !isDragging) {
        isDragging = true;
        const touch = e.touches[0];
        previousTouch = { x: touch.clientX, y: touch.clientY };
      }

      if (e.touches.length === 1 && isDragging) {
        const touch = e.touches[0];
        const dx = touch.clientX - previousTouch.x;
        const dy = touch.clientY - previousTouch.y;
        cameraAngleY += dx * 0.002;
        cameraAngleX += dy * 0.002;
        previousTouch = { x: touch.clientX, y: touch.clientY };
      }

      if (e.touches.length === 2) {
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const dx = touch1.clientX - touch2.clientX;
        const dy = touch1.clientY - touch2.clientY;
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

    // Handle tap/click
    domElement.addEventListener('click', (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects(planets);
      if (intersects.length > 0) {
        setSelectedSkill(intersects[0].object.userData.skill);
      }
    });

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Update camera position
      camera.position.x = Math.cos(cameraAngleY) * Math.cos(cameraAngleX) * cameraDistance;
      camera.position.y = Math.sin(cameraAngleX) * cameraDistance;
      camera.position.z = Math.sin(cameraAngleY) * Math.cos(cameraAngleX) * cameraDistance;
      camera.lookAt(0, 0, 0);

      // Rotate planets
      const time = Date.now() * 0.001;
      planets.forEach((planetData, index) => {
        const speed = 0.1 + index * 0.005;
        const orbitRadius = 4 + index * 1.5;
        const angle = time * speed + (index * Math.PI * 2) / skillPlanets.length;
        planetData.position.x = Math.cos(angle) * orbitRadius;
        planetData.position.z = Math.sin(angle) * orbitRadius;
        planetData.position.y = Math.sin(time * 1.2 + index) * 0.5;
        planetData.rotation.y += 0.01;
      });

      renderer.render(scene, camera);
    };

    animate();
    setIsLoaded(true);

    // Resize handler
    const handleResize = () => {
      if (!mountRef.current || !camera || !renderer) return;
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(requestAnimationFrame(animate));
      domElement.removeEventListener('mousedown', () => {});
      domElement.removeEventListener('mousemove', () => {});
      domElement.removeEventListener('mouseup', () => {});
      domElement.removeEventListener('wheel', () => {});
      domElement.removeEventListener('touchstart', () => {});
      domElement.removeEventListener('touchmove', () => {});
      domElement.removeEventListener('touchend', () => {});
      domElement.removeEventListener('click', () => {});
      renderer.dispose();
    };
  }, []);

  return (
    <section id="skill-universe" className={`py-20 relative overflow-hidden ${darkMode ? 'bg-slate-900' : 'bg-gray-900'}`}>
      <div className="container mx-auto px-6">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">🌌 Skill Universe</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore my technical skills in an interactive 3D galaxy.
          </p>
        </div>

        {/* 3D Canvas */}
        <div className="relative">
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

        {/* Modal */}
        {selectedSkill && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className={`max-w-2xl w-full rounded-xl p-8 ${darkMode ? 'bg-slate-800' : 'bg-white'}`}>
              <div className="flex items-center mb-6">
                <div className="p-4 rounded-lg mr-4" style={{ backgroundColor: `${selectedSkill.color}20`, color: selectedSkill.color }}>
                  {selectedSkill.icon}
                </div>
                <div>
                  <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedSkill.name}</h3>
                  <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{selectedSkill.category}</p>
                </div>
              </div>
              <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{selectedSkill.description}</p>
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