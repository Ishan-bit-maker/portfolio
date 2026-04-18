/**
 * Immersive 3D Z-Axis Engine
 */

document.addEventListener("DOMContentLoaded", () => {
    const scene = document.getElementById('scene');
    const layers = document.querySelectorAll('.layer');
    const depthIndicator = document.getElementById('depth-value');
    
    // Virtual Camera Properties
    let cameraZ = 0;
    
    // Mouse tracking for global scene rotation
    let mouseX = 0;
    let mouseY = 0;
    let targetRotateX = 0;
    let targetRotateY = 0;
    let currentRotateX = 0;
    let currentRotateY = 0;

    // Track mouse
    window.addEventListener('mousemove', (e) => {
        // Normalize mouse to -1 to 1
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = (e.clientY / window.innerHeight) * 2 - 1;
        
        // Target rotation (max 5 degrees)
        targetRotateY = mouseX * 5; 
        targetRotateX = -mouseY * 5; 
    });

    // Main Engine Loop
    function render() {
        // 1. Calculate scroll depth
        // We map the physical scroll height to virtual Z-space
        const scrollY = window.scrollY;
        
        // This multiplier controls how fast you fly through Z space based on scroll
        cameraZ = scrollY * 1.5; 
        
        if (depthIndicator) {
            depthIndicator.textContent = Math.floor(cameraZ);
        }

        // 2. Smooth interpolate scene rotation (Lerp)
        currentRotateX += (targetRotateX - currentRotateX) * 0.1;
        currentRotateY += (targetRotateY - currentRotateY) * 0.1;

        // Apply global scene translation (moving camera forward = moving scene backward in translateZ)
        // Note: moving the scene deeply requires mapping cameraZ to translateZ
        scene.style.transform = `translateZ(${cameraZ}px) rotateX(${currentRotateX}deg) rotateY(${currentRotateY}deg)`;

        // 3. Render individual layers
        layers.forEach(layer => {
            // Get original deep Z position defined in HTML data-z
            const layerZ = parseFloat(layer.getAttribute('data-z')) || 0;
            
            // Because the scene translates by +cameraZ, the layer's actual position relative to the camera is layerZ + cameraZ.
            // If layerZ + cameraZ > 0, it has flown PAST the camera (behind the user).
            const relativeZ = layerZ + cameraZ;

            // Fade logic based on distance from camera
            let opacity = 1;
            
            if (relativeZ > 100) {
                // Flown past camera, fade out quickly
                opacity = 0;
            } else if (relativeZ < -3000) {
                // Too far in the distance, fade out into the dark
                opacity = Math.max(0, 1 - (Math.abs(relativeZ) - 3000) / 2000);
            } else {
                // Fade in beautifully as it gets close
                opacity = 1;
            }

            layer.style.opacity = opacity;
            layer.style.transform = `translateZ(${layerZ}px)`;
            
            // Turn off pointer events if invisible to not block clicks
            layer.style.pointerEvents = opacity < 0.1 ? 'none' : 'auto';
        });

        requestAnimationFrame(render);
    }

    // Start Engine
    render();
});
