import React, { useEffect, useRef } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import './App.css';

function App() {
  const targetScrollRef = useRef(0);
  const currentScrollRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      // Target progress from 0 to 1 over the full scroll track length
      targetScrollRef.current = scrollHeight > 0 ? Math.min(scrollY / scrollHeight, 1) : 0;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on load
    handleScroll();

    let animationFrameId;
    
    // Lerp update loop (smooth factor of 0.08 gives a very smooth inertia feel)
    const updateScrollProgress = () => {
      const target = targetScrollRef.current;
      let current = currentScrollRef.current;
      
      current += (target - current) * 0.08;
      
      if (Math.abs(target - current) < 0.0001) {
        current = target;
      }
      
      currentScrollRef.current = current;
      document.documentElement.style.setProperty('--scroll-progress', current.toString());
      
      animationFrameId = requestAnimationFrame(updateScrollProgress);
    };

    animationFrameId = requestAnimationFrame(updateScrollProgress);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="portfolio-app">
      {/* Pinned frame containing the Hero and emerging About cutout page */}
      <div className="app-pinned-viewport">
        <Hero />
        <About />
      </div>
      
      {/* Scroll track height to drive the transitions */}
      <div className="scroll-spacer"></div>
    </div>
  );
}

export default App;
