'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import useInteractionTracker from '../../hooks/useInteractionTracker';
import '../../styles/background-effects.css';

// A simpler background component without Three.js
const SimpleBackground = () => {
    // Log to confirm the component is rendering
    console.log('SimpleBackground component rendering');

    const interaction = useInteractionTracker();

    // Mouse position for gradient effect
    const mouseX = useSpring(0, { damping: 30, stiffness: 50 });
    const mouseY = useSpring(0, { damping: 30, stiffness: 50 });

    // Update spring values when mouse moves
    useEffect(() => {
        mouseX.set(interaction.mouse.normalized.x * 100);
        mouseY.set(interaction.mouse.normalized.y * 100);
    }, [interaction.mouse.normalized.x, interaction.mouse.normalized.y, mouseX, mouseY]);

    // Transform mouse position to gradient position
    const gradientX = useTransform(
        mouseX,
        [-100, 100],
        ['45%', '55%']
    );

    const gradientY = useTransform(
        mouseY,
        [-100, 100],
        ['45%', '55%']
    );

    // Create animated blobs with higher opacity
    const blobs = [
        { size: '40vh', left: '10%', top: '20%', delay: 0, color: 'rgba(242, 242, 242, 0.1)', animClass: 'float-element' },
        { size: '35vh', right: '15%', top: '10%', delay: 0.2, color: 'rgba(234, 228, 213, 0.12)', animClass: 'float-element-slow' },
        { size: '45vh', left: '25%', bottom: '15%', delay: 0.4, color: 'rgba(182, 176, 159, 0.15)', animClass: 'float-element-fast' },
        { size: '30vh', right: '25%', bottom: '20%', delay: 0.6, color: 'rgba(216, 208, 192, 0.12)', animClass: 'float-element' },
        { size: '25vh', left: '40%', top: '40%', delay: 0.8, color: 'rgba(169, 162, 149, 0.1)', animClass: 'float-element-slow' },
        { size: '20vh', right: '40%', top: '60%', delay: 1.0, color: 'rgba(242, 242, 242, 0.15)', animClass: 'float-element-fast' },
        { size: '30vh', left: '60%', top: '30%', delay: 1.2, color: 'rgba(234, 228, 213, 0.12)', animClass: 'float-element' },
    ];

    return (
        <motion.div
            className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            style={{
                background: 'linear-gradient(135deg, rgba(10,10,10,1) 0%, rgba(20,20,20,1) 100%)',
            }}
        >
            {/* Animated blobs */}
            {blobs.map((blob, index) => (
                <div
                    key={index}
                    className={`absolute rounded-full blur-3xl blob ${blob.animClass}`}
                    style={{
                        width: blob.size,
                        height: blob.size,
                        left: blob.left,
                        right: blob.right,
                        top: blob.top,
                        bottom: blob.bottom,
                        backgroundColor: blob.color,
                        animationDelay: `${blob.delay}s`,
                    }}
                />
            ))}

            {/* Add more visible particles for extra depth */}
            {Array.from({ length: 100 }).map((_, index) => (
                <div
                    key={`particle-${index}`}
                    className="particle"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        opacity: Math.random() * 0.7 + 0.3,
                        width: `${Math.random() * 4 + 1}px`,
                        height: `${Math.random() * 4 + 1}px`,
                    }}
                />
            ))}

            {/* Gradient overlay that follows mouse */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(circle at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.9) 70%, rgba(0,0,0,1) 100%)',
                    backgroundPosition: `${gradientX} ${gradientY}`,
                }}
            />

            {/* Vignette effect */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    boxShadow: 'inset 0 0 150px 60px rgba(0,0,0,0.8)',
                }}
            />

            {/* Subtle noise texture overlay */}
            <div className="noise-overlay" />

            {/* Shimmer effect */}
            <div className="absolute inset-0 shimmer-effect" />

            {/* Glow effect that follows mouse */}
            <motion.div
                className="glow-effect"
                style={{
                    left: interaction.mouse.x,
                    top: interaction.mouse.y,
                    opacity: interaction.mouse.x > 0 ? 0.7 : 0,
                }}
            />
        </motion.div>
    );
};

export default SimpleBackground;