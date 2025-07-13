'use client';

import { useEffect, useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Experience from '../components/sections/Experience';
import Skills from '../components/sections/Skills';
import Projects from '../components/sections/Projects';
import Contact from '../components/sections/Contact';
import ThemeToggle from '../components/layout/ThemeToggle';
// Using global CSS for background instead of a component

export default function Home() {
  // Add scroll reveal animation
  useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      const revealElements = document.querySelectorAll('.reveal');

      revealElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add('active');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="min-h-screen">
      {/* Vignette effect */}
      <div className="vignette"></div>
      <Header />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
      <ThemeToggle />
    </main>
  );
}