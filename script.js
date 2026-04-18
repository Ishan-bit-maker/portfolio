/**
 * Cinematic Monochrome Portfolio Interactions
 */

document.addEventListener("DOMContentLoaded", () => {
  
  // --- Dynamic Scroll Interactivity ---
  const heroContent = document.querySelector('.hero-content');
  const videoBg = document.getElementById('bg-video');
  const glassPanels = document.querySelectorAll('.glass-panel');
  const scrollElements = document.querySelectorAll(".animate-on-scroll");

  const handleScrollEffects = () => {
    const scrollY = window.scrollY;
    
    // 1. Hero Parallax & Fade
    if (heroContent) {
      // Move down slightly and fade out as you scroll down
      const opacity = Math.max(0, 1 - scrollY / 600);
      const translateY = scrollY * 0.4;
      const scale = Math.max(0.9, 1 - scrollY / 2000);
      heroContent.style.transform = `translateY(${translateY}px) scale(${scale})`;
      heroContent.style.opacity = opacity;
    }

    // 2. Video Parallax
    if (videoBg) {
      // Subtle shift in the video to give massive depth
      videoBg.style.transform = `translateY(${scrollY * 0.15}px)`;
    }

    // 3. Dynamic Glass Panel Scaling
    glassPanels.forEach(panel => {
      const rect = panel.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // If the panel is in the middle of the screen, scale it up slightly
      const centerDistance = Math.abs(windowHeight / 2 - (rect.top + rect.height / 2));
      const maxDist = windowHeight;
      const progress = 1 - Math.min(centerDistance / maxDist, 1);
      
      // Calculate depth scale: ranges from 0.95 to 1.0
      const scaleDepth = 0.95 + (0.05 * progress);
      // Subtle glow based on center proximity
      const glow = 15 * progress;
      
      // We only apply this if we aren't overriding a hover state, but for a cinematic feel
      // a continuous transform is awesome.
      // Make sure we only manipulate the transition scale if it exists.
      panel.style.transform = `scale(${scaleDepth})`;
      panel.style.boxShadow = `0 ${5 + glow}px ${20 + glow*2}px rgba(0, 0, 0, 0.5)`;
    });

    // 4. Standard Entrance Fades
    scrollElements.forEach((el) => {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop <= window.innerHeight * 0.85) {
        el.classList.add("is-visible");
      }
    });
  };

  // Trigger on load
  handleScrollEffects();

  // Trigger on scroll via requestAnimationFrame for max performance
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleScrollEffects();
        ticking = false;
      });
      ticking = true;
    }
  });

  // --- Smooth Scrolling for Anchor Links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});
