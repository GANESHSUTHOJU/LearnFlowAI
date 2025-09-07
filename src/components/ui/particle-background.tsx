
'use client';

import { useEffect } from 'react';

declare global {
    interface Window {
        particlesJS: any;
        pJSDom: any[];
    }
}

const SCRIPT_ID = 'particles-js-script';
const CONTAINER_ID = 'particles-js';


export default function ParticleBackground() {

    useEffect(() => {
        // Prevent script from being added multiple times
        if (document.getElementById(SCRIPT_ID)) {
            return;
        }

        const script = document.createElement('script');
        script.id = SCRIPT_ID;
        script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
        script.async = true;
        script.onload = () => {
            if(window.particlesJS) {
                window.particlesJS(CONTAINER_ID, {
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

        document.head.appendChild(script);

        return () => {
            // Clean up particles instance and its canvas
            if (window.pJSDom && window.pJSDom.length > 0) {
                 const pJS = window.pJSDom.find((p) => p.pJS.canvas.el.parentElement?.id === CONTAINER_ID);
                 if (pJS) {
                    pJS.pJS.fn.vendors.destroypJS();
                 }
                 window.pJSDom = window.pJSDom.filter(p => p !== pJS);
            }
            
            // Remove the script tag
            const scriptToRemove = document.getElementById(SCRIPT_ID);
            if (scriptToRemove) {
                scriptToRemove.remove();
            }
        };

    }, []);


    return null;
}
