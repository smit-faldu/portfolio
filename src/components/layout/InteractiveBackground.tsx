'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  opacity: number;
  originalX: number;
  originalY: number;
}

const InteractiveBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>(0);
  const isInitializedRef = useRef(false);
  const lastScrollTopRef = useRef(0);
  const gradientRef = useRef<HTMLDivElement>(null);
  const [windowSize, setWindowSize] = useState({ width: 1200, height: 800 });

  // Mouse position for gradient effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Spring physics for smooth movement
  const springConfig = { damping: 25, stiffness: 100 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Colors from the theme
  const colors = ['#F2F2F2', '#EAE4D5', '#B6B09F'];
  
  // Transform mouse position to gradient position - default values will be updated in useEffect
  const gradientX = useTransform(springX, 
    [0, windowSize.width], 
    ['-20%', '120%']
  );
  
  const gradientY = useTransform(springY, 
    [0, windowSize.height], 
    ['-20%', '120%']
  );

  // Initialize particles
  const initParticles = (width: number, height: number) => {
    const particles: Particle[] = [];
    const particleCount = Math.min(Math.floor((width * height) / 18000), 80); // Responsive particle count

    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      
      particles.push({
        x,
        y,
        originalX: x,
        originalY: y,
        size: Math.random() * 2 + 0.5,
        speedX: Math.random() * 0.15 - 0.075,
        speedY: Math.random() * 0.15 - 0.075,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.15 + 0.05,
      });
    }

    particlesRef.current = particles;
  };

  // Draw function
  const draw = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.clearRect(0, 0, width, height);

    // Draw connections first (behind particles)
    ctx.globalAlpha = 0.03;
    ctx.strokeStyle = '#EAE4D5';
    ctx.lineWidth = 0.5;

    for (let i = 0; i < particlesRef.current.length; i++) {
      for (let j = i + 1; j < particlesRef.current.length; j++) {
        const dx = particlesRef.current[i].x - particlesRef.current[j].x;
        const dy = particlesRef.current[i].y - particlesRef.current[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          // Opacity based on distance
          const opacity = 0.03 * (1 - distance / 150);
          ctx.globalAlpha = opacity;
          
          ctx.beginPath();
          ctx.moveTo(particlesRef.current[i].x, particlesRef.current[i].y);
          ctx.lineTo(particlesRef.current[j].x, particlesRef.current[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw particles
    particlesRef.current.forEach((particle) => {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.globalAlpha = particle.opacity;
      ctx.fill();
    });

    ctx.globalAlpha = 1;
  };

  // Update function
  const update = (width: number, height: number) => {
    const mouseInfluenceRadius = 180;
    const mouseForce = 0.08;
    const scrollInfluence = 0.02;
    const returnForce = 0.01; // Force pulling particles back to original position

    particlesRef.current.forEach((particle) => {
      // Regular movement
      particle.x += particle.speedX;
      particle.y += particle.speedY;

      // Mouse influence
      const dx = mousePosition.x - particle.x;
      const dy = mousePosition.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < mouseInfluenceRadius && mousePosition.x !== 0) {
        particle.x += (dx / distance) * mouseForce;
        particle.y += (dy / distance) * mouseForce;
      }

      // Scroll influence
      particle.y += scrollY * scrollInfluence;

      // Return to original position (subtle)
      const dxOriginal = particle.originalX - particle.x;
      const dyOriginal = particle.originalY - particle.y;
      particle.x += dxOriginal * returnForce;
      particle.y += dyOriginal * returnForce;

      // Boundaries check with bounce effect
      if (particle.x < 0 || particle.x > width) {
        particle.speedX = -particle.speedX * 0.8; // Dampen the bounce
      }

      if (particle.y < 0 || particle.y > height) {
        particle.speedY = -particle.speedY * 0.8; // Dampen the bounce
      }

      // Keep particles in bounds
      if (particle.x < 0) particle.x = 0;
      if (particle.x > width) particle.x = width;
      if (particle.y < 0) particle.y = 0;
      if (particle.y > height) particle.y = height;
    });
  };

  // Animation loop
  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    update(width, height);
    draw(ctx, width, height);

    animationFrameRef.current = requestAnimationFrame(animate);
  };

  // Handle resize
  const handleResize = () => {
    if (typeof window === 'undefined') return;
    
    // Update window size state
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    });
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    initParticles(canvas.width, canvas.height);
  };

  // Handle mouse move
  const handleMouseMove = (e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
    
    // Update motion values for gradient
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  // Handle scroll
  const handleScroll = () => {
    const currentScrollTop = window.scrollY;
    const scrollDelta = currentScrollTop - lastScrollTopRef.current;
    lastScrollTopRef.current = currentScrollTop;
    
    setScrollY(scrollDelta * 0.1); // Scale down the effect
    
    // Reset scroll value after a short delay to prevent continuous movement
    setTimeout(() => {
      setScrollY(0);
    }, 100);
  };

  // Initialize
  useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined') return;
    
    if (isInitializedRef.current) return;
    isInitializedRef.current = true;

    // Update window size
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    });

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Initialize particles
    initParticles(canvas.width, canvas.height);

    // Set initial mouse position to center
    mouseX.set(window.innerWidth / 2);
    mouseY.set(window.innerHeight / 2);

    // Add event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    // Start animation
    animationFrameRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  return (
    <>
      {/* Subtle gradient that follows mouse */}
      <motion.div 
        ref={gradientRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-2]"
        style={{
          background: 'radial-gradient(circle at center, rgba(234,228,213,0.03) 0%, rgba(0,0,0,0) 50%)',
          backgroundPosition: `${gradientX} ${gradientY}`,
          backgroundSize: '100% 100%',
        }}
      />
      
      {/* Particle canvas */}
      <motion.canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      />
    </>
  );
};

export default InteractiveBackground;