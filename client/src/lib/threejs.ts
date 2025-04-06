import * as THREE from 'three';

export const initThreeJsBackground = (containerId: string = 'canvas-container') => {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Setup
  const canvas = document.createElement('canvas');
  container.appendChild(canvas);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 50;

  // Create particles
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = 2000;

  const posArray = new Float32Array(particlesCount * 3);
  for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 100;
  }

  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

  // Materials
  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.2,
    color: 0x0080FF,
    transparent: true,
    opacity: 0.4
  });

  // Mesh
  const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particlesMesh);

  // Handle resize
  const handleResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  window.addEventListener('resize', handleResize);

  // Mouse interaction
  let mouseX = 0;
  let mouseY = 0;

  const handleMouseMove = (event: MouseEvent) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
  };

  window.addEventListener('mousemove', handleMouseMove);

  // Animation
  const animate = () => {
    requestAnimationFrame(animate);
    
    // Rotate particles slowly based on mouse position
    particlesMesh.rotation.y += 0.001;
    particlesMesh.rotation.x += mouseY * 0.0005;
    particlesMesh.rotation.z += mouseX * 0.0005;
    
    renderer.render(scene, camera);
  };

  // Start animation
  animate();

  // Return cleanup function
  return () => {
    window.removeEventListener('resize', handleResize);
    window.removeEventListener('mousemove', handleMouseMove);
    if (container && canvas.parentNode === container) {
      container.removeChild(canvas);
    }
    renderer.dispose();
    particlesGeometry.dispose();
    particlesMaterial.dispose();
  };
};
