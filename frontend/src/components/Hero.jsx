import React, { useEffect, useRef, useState } from 'react';
import avatarImg from '../assets/avatar.png';
import TiltedCard from './TiltedCard';
import './Hero.css';

const messages = [
  "I'm open to work! DM or book a call now ✨",
  "Let's collaborate on your next project! 🚀",
  "Available for freelance & full-time roles! 💼"
];

export default function Hero() {
  const containerRef = useRef(null);
  const nameContainerRef = useRef(null);
  const timeoutRef = useRef(null);
  const paintCanvasRef = useRef(null);
  const paintProgressRef = useRef(0);
  
  const [msgIndex, setMsgIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % messages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);
  
  // Track actual mouse target
  const mouseRef = useRef({ x: -999, y: -999 });
  
  // Store scale value for transitions
  const scaleRef = useRef(0);
  
  // Store positions for the 5 trail blobs
  const blobsRef = useRef([
    { x: -999, y: -999 },
    { x: -999, y: -999 },
    { x: -999, y: -999 },
    { x: -999, y: -999 },
    { x: -999, y: -999 }
  ]);

  useEffect(() => {
    const container = containerRef.current;
    const nameContainer = nameContainerRef.current;
    if (!container) return;

    // Get all blob DOM elements
    const blobElements = container.querySelectorAll('.blob');

    // Resize canvas to cover viewport - read ref dynamically inside function
    const resizeCanvas = () => {
      const canvas = paintCanvasRef.current;
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Update target coordinate
      mouseRef.current = { x, y };

      // Set moving & hovered class immediately on mouse move
      container.classList.add('is-moving');
      container.classList.add('is-hovered');

      // Reset moving timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        container.classList.remove('is-moving');
      }, 150);
    };

    // Animation frame loop
    let animationFrameId;
    let initialized = false;

    const updateBlobs = () => {
      const target = mouseRef.current;
      const blobs = blobsRef.current;

      // Smooth scale interpolation (0.15 lerp speed)
      const isHovered = container.classList.contains('is-hovered');
      const targetScale = isHovered ? 1 : 0;
      scaleRef.current += (targetScale - scaleRef.current) * 0.15;

      if (scaleRef.current < 0.001 && targetScale === 0) {
        // If hidden, hide elements to save layout work
        for (let i = 0; i < blobs.length; i++) {
          if (blobElements[i]) {
            blobElements[i].style.transform = 'scale(0)';
          }
        }
      } else {
        if (target.x !== -999) {
          if (!initialized) {
            blobs.forEach((b) => {
              b.x = target.x;
              b.y = target.y;
            });
            initialized = true;
          }

          // Lerp each blob position
          for (let i = 0; i < blobs.length; i++) {
            const prev = i === 0 ? target : blobs[i - 1];
            // Flow coefficients: Lead is fast, tail drags
            const lerpFactor = i === 0 ? 0.22 : 0.14;
            
            blobs[i].x += (prev.x - blobs[i].x) * lerpFactor;
            blobs[i].y += (prev.y - blobs[i].y) * lerpFactor;

            // Apply style directly to DOM for 60fps/120fps fluid movement
            if (blobElements[i]) {
              const baseScale = 1.0 - i * 0.12; // Taper trail scale (1.0 down to 0.52)
              const currentScale = scaleRef.current * baseScale;
              blobElements[i].style.transform = `translate3d(${blobs[i].x}px, ${blobs[i].y}px, 0) translate(-50%, -50%) scale(${currentScale})`;
            }
          }

          // Update clipping mask variables on the name container relative to its offset
          if (nameContainer && blobs[0]) {
            const nameRect = nameContainer.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();
            const nameMouseX = blobs[0].x - (nameRect.left - containerRect.left);
            const nameMouseY = blobs[0].y - (nameRect.top - containerRect.top);
            
            nameContainer.style.setProperty('--mouse-x', `${nameMouseX}px`);
            nameContainer.style.setProperty('--mouse-y', `${nameMouseY}px`);
          }
        }
      }

      // Handle paintbrush canvas stroke drawing - read ref dynamically inside loop
      const canvas = paintCanvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;

        // Fetch lerped scroll progress from documentElement custom variable
        const scrollProgressStr = document.documentElement.style.getPropertyValue('--scroll-progress') || '0';
        const targetProgress = parseFloat(scrollProgressStr);
        
        // Lerp progress for painting transition speed
        paintProgressRef.current += (targetProgress - paintProgressRef.current) * 0.08;
        const t = paintProgressRef.current;

        ctx.clearRect(0, 0, width, height);

        if (t > 0.001) {
          const baseColor = '#707bf4'; // Card periwinkle color
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';

          // Zig-zag paintbrush sweep points covering the entire screen canvas
          const points = [
            { x: -100, y: -100 },
            { x: width * 0.35, y: height * 0.18 },
            { x: width * 0.85, y: height * 0.08 },
            { x: width * 0.15, y: height * 0.45 },
            { x: width * 0.9, y: height * 0.58 },
            { x: width * 0.1, y: height * 0.8 },
            { x: width * 0.8, y: height * 0.92 },
            { x: width * 0.5, y: height + 100 }
          ];

          // Calculate adaptive thickness. Scales up massively to fully cover the screen at t=1.0
          const baseWidth = t * Math.max(width, height) * 0.95;

          // Define parallel offset brush bristle tracks
          const bristles = [
            { dx: 0, dy: 0, w: baseWidth * 0.9, opacity: 1 },
            { dx: -baseWidth * 0.08, dy: -baseWidth * 0.05, w: baseWidth * 0.15, opacity: 0.85 },
            { dx: baseWidth * 0.1, dy: baseWidth * 0.06, w: baseWidth * 0.22, opacity: 0.9 },
            { dx: -baseWidth * 0.16, dy: baseWidth * 0.1, w: baseWidth * 0.12, opacity: 0.75 },
            { dx: baseWidth * 0.18, dy: -baseWidth * 0.12, w: baseWidth * 0.18, opacity: 0.8 }
          ];

          bristles.forEach((bristle) => {
            ctx.beginPath();
            ctx.lineWidth = bristle.w;
            ctx.strokeStyle = baseColor;
            ctx.globalAlpha = bristle.opacity;

            // Draw line up to current segment progress index
            const activeSegs = t * (points.length - 1);
            
            const startX = points[0].x + bristle.dx;
            const startY = points[0].y + bristle.dy;
            ctx.moveTo(startX, startY);

            for (let i = 1; i < points.length; i++) {
              const segProgress = activeSegs - (i - 1);
              if (segProgress >= 1) {
                ctx.lineTo(points[i].x + bristle.dx, points[i].y + bristle.dy);
              } else if (segProgress > 0) {
                const prev = points[i - 1];
                const curr = points[i];
                const px = prev.x + (curr.x - prev.x) * segProgress + bristle.dx;
                const py = prev.y + (curr.y - prev.y) * segProgress + bristle.dy;
                ctx.lineTo(px, py);
                break;
              } else {
                break;
              }
            }
            ctx.stroke();
          });
          
          ctx.globalAlpha = 1.0; // Reset canvas alpha
        }
      }

      animationFrameId = requestAnimationFrame(updateBlobs);
    };

    animationFrameId = requestAnimationFrame(updateBlobs);

    const handleMouseEnter = () => {
      container.classList.add('is-hovered');
    };

    const handleMouseLeave = () => {
      container.classList.remove('is-hovered');
      container.classList.remove('is-moving');
      initialized = false;
      mouseRef.current = { x: -999, y: -999 };
      blobsRef.current.forEach((b) => {
        b.x = -999;
        b.y = -999;
      });
    };

    // Bind mouse events cleanly (mousemove globally, enter/leave locally to container boundaries)
    window.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <section className="hero-section" ref={containerRef}>
      {/* Paint Brush Canvas for scroll background transition */}
      <canvas ref={paintCanvasRef} className="paintbrush-canvas" />

      {/* Navigation Header at Top */}
      <header className="hero-nav">
        <div className="logo-section">
          <span className="logo-dot"></span>
          <span className="logo-text">BASED IN INDIA</span>
        </div>
        <nav className="nav-right">
          <a href="#about" className="nav-link">About</a>
          <a href="#projects" className="nav-link">Projects</a>
          <a href="#contact" className="nav-cta-outline">BOOK A CALL</a>
        </nav>
      </header>

      {/* Main Hero Split Body */}
      <div className="hero-content split-layout">
        {/* Left Side: Name and Actions */}
        <div className="hero-text-block">
          <div className="hero-name-container" ref={nameContainerRef}>
            {/* Background text (visible outside the cursor blob) */}
            <h1 className="hero-title text-bg">
              SHLOKA<br />PAI
            </h1>

            {/* Foreground text (visible only inside the cursor blob) */}
            <h1 className="hero-title text-fg" aria-hidden="true">
              SHLOKA<br />PAI
            </h1>
          </div>

          <p className="hero-subtitle">
            I currently work as a Creative Frontend Developer crafting immersive digital interfaces, physics-based interactions, and interactive web applications.
          </p>

          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">
              View Work
              <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a href="#about" className="btn btn-secondary">Learn More</a>
          </div>
        </div>

        {/* Right Side: Avatar Card powered by React Bits TiltedCard */}
        <div className="hero-avatar-area">
          <div className="avatar-wrapper">
            <div className="avatar-glow"></div>
            
            <TiltedCard
              imageSrc={avatarImg}
              altText="Shloka Pai Avatar"
              containerHeight="100%"
              containerWidth="100%"
              imageHeight="100%"
              imageWidth="100%"
              scaleOnHover={1.04}
              rotateAmplitude={14}
              showMobileWarning={false}
              showTooltip={false}
              displayOverlayContent={true}
              overlayContent={
                /* Speech bubble floats 3D in translateZ overlay */
                <div className="avatar-status-bubble">
                  <span className="bubble-pulse-dot"></span>
                  <span key={msgIndex} className="bubble-text animate-fade">
                    {messages[msgIndex]}
                  </span>
                </div>
              }
            />
          </div>
        </div>
      </div>

      {/* Custom Flowing Cursor (SVG Gooey effect) */}
      <div className="cursor-gooey-container">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
        <div className="blob blob-4"></div>
        <div className="blob blob-5"></div>
      </div>

      {/* SVG gooey filter definition */}
      <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }}>
        <defs>
          <filter id="gooey">
            <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -8" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>
    </section>
  );
}
