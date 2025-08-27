
'use client';

import { useEffect } from 'react';

declare global {
    interface Window {
        particlesJS: any;
    }
}

export default function ParticleBackground() {

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
        script.async = true;
        script.onload = () => {
            if(window.particlesJS) {
                window.particlesJS("particles-js", {
                    "particles": {
                        "number": { "value": 120, "density": { "enable": true, "value_area": 800 } },
                        "color": { "value": "#ffffff" },
                        "shape": { "type": "circle" },
                        "opacity": { "value": 0.5, "random": false },
                        "size": { "value": 3, "random": true },
                        "line_linked": { "enable": true, "distance": 150, "color": "hsl(var(--primary))", "opacity": 0.4, "width": 1 },
                        "move": { 
                            "enable": true, 
                            "speed": 2, 
                            "direction": "none", 
                            "random": false, 
                            "straight": false, 
                            "out_mode": "out", 
                            "bounce": false 
                        }
                    },
                    "interactivity": {
                        "detect_on": "canvas",
                        "events": {
                            "onhover": { "enable": true, "mode": "repulse" },
                            "onclick": { "enable": true, "mode": "push" },
                            "resize": true
                        },
                        "modes": {
                            "repulse": { "distance": 100, "duration": 0.4 },
                            "push": { "particles_nb": 4 }
                        }
                    },
                    "retina_detect": true
                });
            }
        };

        document.body.appendChild(script);

        // Create a div for particles to attach to
        const particlesDiv = document.createElement('div');
        particlesDiv.id = 'particles-js';
        document.body.prepend(particlesDiv);


        return () => {
            document.body.removeChild(script);
            const particlesEl = document.getElementById('particles-js');
            if (particlesEl) {
                document.body.removeChild(particlesEl);
            }
            // If particles.js has a destroy method, call it here
            if (window.particlesJS && window.particlesJS.destroy) {
                window.particlesJS.destroy();
            }
        };

    }, []);


    return null;
}
