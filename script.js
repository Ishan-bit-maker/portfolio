/**
 * Portfolio Interactions
 */

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
  displayQuoteOfTheDay();
});

// --- 3D Canvas Background Animation ---
const canvas = document.getElementById("bg-canvas");
if (canvas) {
  const ctx = canvas.getContext("2d");
  let width, height;
  let points = [];
  const numPoints = 400; // Increased density
  let rotation = 0;

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }
  
  function initPoints() {
    points = [];
    for (let i = 0; i < numPoints; i++) {
       // Fibonacci sphere distribution
       const phi = Math.acos(-1 + (2 * i) / numPoints);
       const theta = Math.sqrt(numPoints * Math.PI) * phi;
       
       const x = Math.cos(theta) * Math.sin(phi);
       const y = Math.sin(theta) * Math.sin(phi);
       const z = Math.cos(phi);
       
       points.push({ x, y, z });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    
    const centerX = width / 2;
    const centerY = height / 2;
    // Dynamic radius based on screen size
    const radius = Math.min(width, height) * 0.35; 
    
    rotation += 0.002;
    
    const cosR = Math.cos(rotation);
    const sinR = Math.sin(rotation);
    
    // Connect points that are close to each other
    ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
    ctx.lineWidth = 0.5;

    let projectedPoints = [];

    points.forEach((p, index) => {
       // Rotate around Y axis
       const xRot = p.x * cosR - p.z * sinR;
       const zRot = p.x * sinR + p.z * cosR;
       
       // Rotate slightly around X and Z axis for a dynamic angle
       const yRot = p.y * Math.cos(0.4) - zRot * Math.sin(0.4);
       const zFinal = p.y * Math.sin(0.4) + zRot * Math.cos(0.4);
       
       const xFinal = xRot * Math.cos(0.2) - yRot * Math.sin(0.2);
       const yFinal = xRot * Math.sin(0.2) + yRot * Math.cos(0.2);

       // Perspective projection
       const scale = 2.5 / (2.5 + zFinal);
       const screenX = centerX + xFinal * radius * scale;
       const screenY = centerY + yFinal * radius * scale;
       
       projectedPoints.push({ x: screenX, y: screenY, z: zFinal, scale });
       
       // Draw point
       const alpha = Math.max(0.1, Math.min(1, scale - 0.4));
       ctx.fillStyle = `rgba(234, 234, 235, ${alpha})`;
       ctx.beginPath();
       ctx.arc(screenX, screenY, scale * 1.5, 0, Math.PI * 2);
       ctx.fill();
    });

    // Draw some connection lines for a modern wireframe / network feel
    /* 
    for(let i = 0; i < projectedPoints.length; i++) {
        for(let j = i + 1; j < projectedPoints.length; j++) {
            const p1 = projectedPoints[i];
            const p2 = projectedPoints[j];
            const dist = (p1.x - p2.x)**2 + (p1.y - p2.y)**2;
            if(dist < 2000 && p1.z < 0 && p2.z < 0) { // Only draw lines on the front face
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
        }
    }
    */

    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", resize);
  resize();
  initPoints();
  draw();
}
