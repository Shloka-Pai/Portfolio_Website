import React, { useEffect, useRef } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Journey from './components/Journey';
import Projects from './components/Projects';
import Contact from './components/Contact';
import './App.css';

function App() {
  useEffect(() => {
    // Create container
    const container = document.createElement('div');
    container.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:9999;overflow:hidden;';

    // Create filtered inner wrapper
    const inner = document.createElement('div');
    inner.style.cssText = 'position:absolute;inset:0;filter:url(#gooey-blob);';

    // Create blobs
    const blobs = [];
    for (let i = 0; i < 5; i++) {
      const b = document.createElement('div');
      b.style.cssText = `position:absolute;width:55px;height:55px;border-radius:50%;background:#6366f1;left:0;top:0;transform:translate(-9999px,-9999px);`;
      inner.appendChild(b);
      blobs.push(b);
    }

    // Create SVG filter
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.style.cssText = 'position:absolute;width:0;height:0;';
    svg.innerHTML = `<defs><filter id="gooey-blob"><feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"/><feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9" result="goo"/><feComposite in="SourceGraphic" in2="goo" operator="atop"/></filter></defs>`;

    container.appendChild(svg);
    container.appendChild(inner);
    document.body.appendChild(container);

    // Mouse tracking
    const pos = Array.from({ length: 5 }, () => ({ x: -9999, y: -9999 }));
    let mouse = { x: -9999, y: -9999 };
    let animId;
    let initialized = false;
    let scaleVal = 0;
    let isActive = false;
    let timeout;

    const onMove = (e) => {
      mouse = { x: e.clientX, y: e.clientY };
      isActive = true;
      clearTimeout(timeout);
    };

    const onLeave = () => {
      isActive = false;
      initialized = false;
      mouse = { x: -9999, y: -9999 };
      pos.forEach(p => { p.x = -9999; p.y = -9999; });
    };

    const tick = () => {
      scaleVal += ((isActive ? 1 : 0) - scaleVal) * 0.15;

      if (mouse.x !== -9999) {
        if (!initialized) {
          pos.forEach(p => { p.x = mouse.x; p.y = mouse.y; });
          initialized = true;
        }
        for (let i = 0; i < 5; i++) {
          const prev = i === 0 ? mouse : pos[i - 1];
          const lerp = i === 0 ? 0.22 : 0.14;
          pos[i].x += (prev.x - pos[i].x) * lerp;
          pos[i].y += (prev.y - pos[i].y) * lerp;
          const s = scaleVal * (1 - i * 0.12);
          blobs[i].style.transform = `translate(${pos[i].x}px, ${pos[i].y}px) translate(-50%, -50%) scale(${s})`;
        }
      }
      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.body.removeChild(container);
    };
  }, []);

  return (
    <div className="portfolio-app">
      <Hero />
      <About />
      <Journey />
      <Projects />
      <Contact />
    </div>
  );
}

export default App;
