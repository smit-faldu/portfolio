'use client';

import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface TiltEffectProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

const TiltEffect = ({ children, className = '', intensity = 10 }: TiltEffectProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 100 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined') return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate distance from center (normalized from -1 to 1)
      const distanceX = (e.clientX - centerX) / (rect.width / 2);
      const distanceY = (e.clientY - centerY) / (rect.height / 2);

      // Apply tilt effect
      x.set(distanceX * intensity);
      y.set(distanceY * -intensity); // Invert Y for natural tilt
    };

    const handleMouseLeave = () => {
      // Reset to neutral position
      x.set(0);
      y.set(0);
    };

    window.addEventListener('mousemove', handleMouseMove);

    if (ref.current) {
      ref.current.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (ref.current) {
        ref.current.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [intensity, x, y]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        perspective: 1000,
        transformStyle: 'preserve-3d',
      }}
    >
      <motion.div
        style={{
          rotateX: springY,
          rotateY: springX,
          transformStyle: 'preserve-3d',
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default TiltEffect;