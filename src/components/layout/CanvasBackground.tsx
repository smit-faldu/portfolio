'use client';

import React, { useEffect, useRef } from 'react';

const CanvasBackground = () => {
  console.log('CanvasBackground rendering');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    console.log('CanvasBackground mounted');
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);
    
    // Mouse position
    let mouseX = 0;
    let mouseY = 0;
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Create blobs
    const blobs = [
      { x: canvas.width * 0.2, y: canvas.height * 0.3, radius: canvas.height * 0.2, color: 'rgba(242, 242, 242, 0.2)' },
      { x: canvas.width * 0.8, y: canvas.height * 0.2, radius: canvas.height * 0.15, color: 'rgba(234, 228, 213, 0.25)' },
      { x: canvas.width * 0.3, y: canvas.height * 0.8, radius: canvas.height * 0.25, color: 'rgba(182, 176, 159, 0.3)' },
      { x: canvas.width * 0.7, y: canvas.height * 0.7, radius: canvas.height * 0.18, color: 'rgba(216, 208, 192, 0.25)' },
    ];
    
    // Animation loop
    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#1a1a1a');
      gradient.addColorStop(1, '#2a2a2a');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw blobs
      blobs.forEach(blob => {
        ctx.beginPath();
        ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2);
        ctx.fillStyle = blob.color;
        ctx.filter = 'blur(40px)';
        ctx.fill();
      });
      
      // Draw mouse glow if mouse has moved
      if (mouseX > 0 && mouseY > 0) {
        ctx.beginPath();
        const glow = ctx.createRadialGradient(
          mouseX, mouseY, 0,
          mouseX, mouseY, 150
        );
        glow.addColorStop(0, 'rgba(234, 228, 213, 0.3)');
        glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = glow;
        ctx.filter = 'blur(5px)';
        ctx.arc(mouseX, mouseY, 150, 0, Math.PI * 2);
        ctx.fill();
      }
      
      // Draw vignette effect
      const vignette = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width * 0.7
      );
      vignette.addColorStop(0.5, 'rgba(0, 0, 0, 0)');
      vignette.addColorStop(1, 'rgba(0, 0, 0, 0.8)');
      ctx.fillStyle = vignette;
      ctx.filter = 'none';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1]"
      style={{ display: 'block' }}
    />
  );
};

export default CanvasBackground;