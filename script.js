/**
 * Premium Portfolio Interactions
 */

document.addEventListener("DOMContentLoaded", () => {
  // --- Scroll Observer for Animations ---
  const scrollElements = document.querySelectorAll(".animate-on-scroll");

  const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return (elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend);
  };

  const displayScrollElement = (element) => {
    element.classList.add("is-visible");
  };

  const hideScrollElement = (element) => {
    element.classList.remove("is-visible");
  };

  const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
      if (elementInView(el, 1.15)) {
        displayScrollElement(el);
      } 
      // Optional: hide when scrolling back up
      // else {
      //   hideScrollElement(el);
      // }
    });
  };

  // Trigger once on load
  handleScrollAnimation();

  // Trigger on scroll
  window.addEventListener("scroll", () => {
    handleScrollAnimation();
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
