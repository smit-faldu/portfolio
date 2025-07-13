'use client';

import React, { useEffect, useState } from 'react';

const MinimalBackground = () => {
    const [mounted, setMounted] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Only run on client-side
    useEffect(() => {
        console.log('MinimalBackground mounted');
        setMounted(true);

        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY
            });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    if (!mounted) {
        console.log('MinimalBackground not mounted yet');
        return null;
    }

    console.log('MinimalBackground rendering with mouse position:', mousePosition);

    return (
        <div
            className="fixed inset-0 w-full h-full pointer-events-none z-[-1]"
            style={{
                background: 'linear-gradient(135deg, #0a0a0a 0%, #141414 100%)'
            }}
        >
            {/* Static blobs */}
            <div
                className="absolute rounded-full blur-3xl"
                style={{
                    width: '40vh',
                    height: '40vh',
                    left: '10%',
                    top: '20%',
                    backgroundColor: 'rgba(242, 242, 242, 0.15)',
                }}
            />

            <div
                className="absolute rounded-full blur-3xl"
                style={{
                    width: '35vh',
                    height: '35vh',
                    right: '15%',
                    top: '10%',
                    backgroundColor: 'rgba(234, 228, 213, 0.18)',
                }}
            />

            <div
                className="absolute rounded-full blur-3xl"
                style={{
                    width: '45vh',
                    height: '45vh',
                    left: '25%',
                    bottom: '15%',
                    backgroundColor: 'rgba(182, 176, 159, 0.2)',
                }}
            />

            <div
                className="absolute rounded-full blur-3xl"
                style={{
                    width: '30vh',
                    height: '30vh',
                    right: '25%',
                    bottom: '20%',
                    backgroundColor: 'rgba(216, 208, 192, 0.18)',
                }}
            />

            {/* Glow effect that follows mouse */}
            <div
                className="absolute rounded-full blur-3xl"
                style={{
                    width: '300px',
                    height: '300px',
                    left: mousePosition.x,
                    top: mousePosition.y,
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'rgba(234, 228, 213, 0.2)',
                    opacity: mousePosition.x > 0 ? 0.8 : 0,
                }}
            />

            {/* Vignette effect */}
            <div
                className="absolute inset-0"
                style={{
                    boxShadow: 'inset 0 0 150px 60px rgba(0,0,0,0.8)',
                }}
            />
        </div>
    );
};

export default MinimalBackground;