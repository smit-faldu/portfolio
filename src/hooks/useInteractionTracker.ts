'use client';

import { useState, useEffect } from 'react';

interface InteractionState {
  mouse: {
    x: number;
    y: number;
    normalized: {
      x: number;
      y: number;
    };
  };
  scroll: {
    y: number;
    normalized: number;
  };
  viewport: {
    width: number;
    height: number;
  };
}

export const useInteractionTracker = () => {
  const [state, setState] = useState<InteractionState>({
    mouse: {
      x: 0,
      y: 0,
      normalized: { x: 0, y: 0 }
    },
    scroll: {
      y: 0,
      normalized: 0
    },
    viewport: {
      width: typeof window !== 'undefined' ? window.innerWidth : 1200,
      height: typeof window !== 'undefined' ? window.innerHeight : 800
    }
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Throttle function to limit execution frequency
    const throttle = (callback: Function, delay: number) => {
      let lastCall = 0;
      return function(...args: any[]) {
        const now = new Date().getTime();
        if (now - lastCall < delay) {
          return;
        }
        lastCall = now;
        return callback(...args);
      };
    };

    // Mouse move handler with throttling
    const handleMouseMove = throttle((e: MouseEvent) => {
      setState(prev => ({
        ...prev,
        mouse: {
          x: e.clientX,
          y: e.clientY,
          normalized: {
            x: (e.clientX / window.innerWidth) * 2 - 1,
            y: -(e.clientY / window.innerHeight) * 2 + 1
          }
        }
      }));
    }, 16); // ~60fps

    // Scroll handler with throttling
    const handleScroll = throttle(() => {
      setState(prev => ({
        ...prev,
        scroll: {
          y: window.scrollY,
          normalized: window.scrollY * 0.001 // Scale down for easier use
        }
      }));
    }, 16);

    // Resize handler
    const handleResize = throttle(() => {
      setState(prev => ({
        ...prev,
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        }
      }));
    }, 100); // Less frequent updates for resize

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    // Initial call to set scroll position
    handleScroll();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return state;
};

export default useInteractionTracker;