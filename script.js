/**
 * 3D Portfolio Background & Interactions
 */

// --- Three.js Background ---
let scene, camera, renderer, particles;

function initThree() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Particles
  const particlesCount = 1500;
  const positions = new Float32Array(particlesCount * 3);
  
  for (let i = 0; i < particlesCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 15;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    size: 0.015,
    color: 0x3a86ff,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending
  });

  particles = new THREE.Points(geometry, material);
  scene.add(particles);

  animate();
}

function animate() {
  requestAnimationFrame(animate);
  
  if (particles) {
    particles.rotation.y += 0.001;
    particles.rotation.x += 0.0005;
  }

  renderer.render(scene, camera);
}

function handleResize() {
  if (!camera || !renderer) return;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// --- 3D Tilt Effect ---
function initTilt() {
  const tiltElements = document.querySelectorAll('.tilt');
  
  tiltElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    
    el.addEventListener('mouseleave', () => {
      el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
  });
}

// --- Quote of the Day ---
const quotes = [
  "with great power comes with great responsibility",
  "you cannot add days to your life but you can add life to your days",
  "sometimes it is better to be kind than right",
  "sunset is the proof that the ending can be beautiful too",
  "the computer is a bicycle for the mind",
  "simplicity is the ultimate sophistication"
];

function displayQuoteOfTheDay() {
  const quoteContainer = document.getElementById("qotd-content");
  if (!quoteContainer) return;

  const quoteIndex = Math.floor(Math.random() * quotes.length);
  const selectedQuote = quotes[quoteIndex];

  quoteContainer.innerHTML = `<span style="font-style: italic;">"${selectedQuote}"</span>`;
}

// --- Initialization ---
document.addEventListener("DOMContentLoaded", () => {
  initThree();
  initTilt();
  displayQuoteOfTheDay();
  
  window.addEventListener('resize', handleResize);
  
  // Mouse movement interaction for particles
  window.addEventListener('mousemove', (e) => {
    if (particles) {
      const mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      const mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
      particles.rotation.y += mouseX * 0.005;
      particles.rotation.x += mouseY * 0.005;
    }
  });
});
