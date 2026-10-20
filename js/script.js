document.addEventListener("DOMContentLoaded", () => {
  const nodes = document.querySelectorAll("section, .article, .log, .about-copy");
  if (!("IntersectionObserver" in window) || !nodes.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 }
  );

  nodes.forEach((el) => observer.observe(el));
});
