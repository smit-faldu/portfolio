'use client';

import React, { useEffect, useState } from 'react';
import '../../styles/background-effects.css';

const BasicBackground = () => {
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Only run on client-side
  useEffect(() => {
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
  
  if (!mounted) return null;
  
  // Create blobs
  const blobs = [
    { size: '40vh', left: '10%', top: '20%', color: 'rgba(242, 242, 242, 0.15)', className: 'float-element' },
    { size: '35vh', right: '15%', top: '10%', color: 'rgba(234, 228, 213, 0.18)', className: 'float-element-slow' },
    { size: '45vh', left: '25%', bottom: '15%', color: 'rgba(182, 176, 159, 0.2)', className: 'float-element-fast' },
    { size: '30vh', right: '25%', bottom: '20%', color: 'rgba(216, 208, 192, 0.18)', className: 'float-element' },
    { size: '25vh', left: '40%', top: '40%', color: 'rgba(169, 162, 149, 0.15)', className: 'float-element-slow' },
  ];
  
  // Create particles
  const particles = Array.from({ length: 50 }).map((_, i) => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: Math.random() * 3 + 1,
    opacity: Math.random() * 0.7 + 0.3
  }));
  
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-[-1] bg-gradient-to-br from-[#0a0a0a] to-[#141414]">
      {/* Blobs */}
      {blobs.map((blob, index) => (
        <div
          key={`blob-${index}`}
          className={`absolute rounded-full blur-3xl ${blob.className}`}
          style={{
            width: blob.size,
            height: blob.size,
            left: blob.left,
            right: blob.right,
            top: blob.top,
            bottom: blob.bottom,
            backgroundColor: blob.color,
          }}
        />
      ))}
      
      {/* Particles */}
      {particles.map((particle, index) => (
        <div
          key={`particle-${index}`}
          className="absolute rounded-full"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: particle.left,
            top: particle.top,
            opacity: particle.opacity,
            backgroundColor: 'rgba(234, 228, 213, 0.7)',
            boxShadow: '0 0 3px 1px rgba(234, 228, 213, 0.3)',
          }}
        />
      ))}
      
      {/* Noise overlay */}
      <div className="noise-overlay" />
      
      {/* Shimmer effect */}
      <div className="absolute inset-0 shimmer-effect" />
      
      {/* Glow effect that follows mouse */}
      <div
        className="glow-effect"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
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

export default BasicBackground;