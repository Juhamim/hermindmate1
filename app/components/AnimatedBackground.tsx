'use client';

import React, { useEffect } from 'react';

export default function AnimatedBackground() {
    useEffect(() => {
        const particlesContainer = document.getElementById('particles-container');
        if (!particlesContainer) return;

        // Create floating particles
        const colors = ['#FFB7B2', '#FF9AA2', '#C7CEEA', '#E8D5F2'];
        const particleCount = 20;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';

            const size = Math.random() * 60 + 20;
            const startX = Math.random() * 100;
            const delay = Math.random() * 20;
            const duration = Math.random() * 10 + 15;

            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${startX}%`;
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            particle.style.animationDelay = `${delay}s`;
            particle.style.animationDuration = `${duration}s`;

            particlesContainer.appendChild(particle);
        }

        return () => {
            if (particlesContainer) {
                particlesContainer.innerHTML = '';
            }
        };
    }, []);

    return <div id="particles-container" className="particles" />;
}
