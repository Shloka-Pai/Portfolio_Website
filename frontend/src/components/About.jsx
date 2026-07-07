import React, { useEffect, useRef, useState } from 'react';
import professionalImg from '../assets/professional.jpg';
import TiltedCard from './TiltedCard';
import './About.css';

export default function About() {
  const cutoutCanvasRef = useRef(null);
  const scrollProgressRef = useRef(0);
  const [isHovered, setIsHovered] = useState(false);
  const isHoveredRef = useRef(false);

  // Keep ref in sync with state for requestAnimationFrame loop
  useEffect(() => {
    isHoveredRef.current = isHovered;
  }, [isHovered]);

  useEffect(() => {
    const canvas = cutoutCanvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    let animationFrameId;

    const drawCutout = () => {
      const ctx = canvas.getContext('2d');
      const width = canvas.width;
      const height = canvas.height;

      // Read current scroll progress
      const scrollProgressStr = document.documentElement.style.getPropertyValue('--scroll-progress') || '0';
      const targetProgress = parseFloat(scrollProgressStr);

      // Smooth scroll progress lerp
      scrollProgressRef.current += (targetProgress - scrollProgressRef.current) * 0.08;
      const t = scrollProgressRef.current;
      const currentHovered = isHoveredRef.current;

      ctx.clearRect(0, 0, width, height);

      // Only show when the transition starts (t > 0.3)
      if (t > 0.3) {
        // 1. Draw solid charcoal stencil layer
        ctx.fillStyle = '#090a0e';
        ctx.fillRect(0, 0, width, height);

        // Normalize progress from [0.3, 1.0] to [0.0, 1.0]
        const nt = Math.min(Math.max((t - 0.3) / 0.7, 0), 1.0);

        ctx.save();
        
        // Translate to screen center + vertical offset that shifts it up to standard header height at nt=1.0
        const targetY = width < 768 ? -130 : -250;
        const translateYVal = nt * targetY;
        ctx.translate(width / 2, height / 2 + translateYVal);

        // Scale down (zoom out) from 14x to 1x from center
        const scaleVal = Math.max(14 - nt * 13, 1);
        ctx.scale(scaleVal, scaleVal);

        // Configure font specs - slightly smaller font scale (10.5vw instead of 12vw)
        const fontScale = width < 768 ? 12 : 10.5;
        ctx.font = `900 ${fontScale}vw "Bebas Neue", sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        if (currentHovered) {
          // If hovered: Draw solid white text with a 3D drop-shadow
          ctx.globalCompositeOperation = 'source-over';
          
          ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
          ctx.shadowBlur = 20;
          ctx.shadowOffsetX = 6;
          ctx.shadowOffsetY = 6;
          
          ctx.fillStyle = '#ffffff';
          ctx.fillText("ABOUT ME", 0, 0);
          
          // Reset shadow properties
          ctx.shadowColor = 'transparent';
        } else {
          // If not hovered: Cut holes out of the solid charcoal layer to show purple paint underneath
          ctx.globalCompositeOperation = 'destination-out';
          ctx.fillStyle = '#000';
          ctx.fillText("ABOUT ME", 0, 0);
        }

        ctx.restore();

        // Reset composite operation
        ctx.globalCompositeOperation = 'source-over';
      }

      animationFrameId = requestAnimationFrame(drawCutout);
    };

    animationFrameId = requestAnimationFrame(drawCutout);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="about-section" id="about">
      {/* HTML5 Canvas stencil cutout that shows underlying periwinkle paint sweeps */}
      <canvas ref={cutoutCanvasRef} className="about-cutout-canvas" />

      {/* Foreground content wrapper */}
      <div className="about-content">
        {/* Invisible title layer acting purely as a hover trigger mapped exactly to canvas coordinates */}
        <h2 
          className="about-title"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          ABOUT ME
        </h2>

        <div className="about-details-grid">
          {/* Left Side: Professional Photo Card using TiltedCard */}
          <div className="about-photo-wrapper">
            <TiltedCard
              imageSrc={professionalImg}
              altText="Shloka Pai Professional Profile"
              containerHeight="100%"
              containerWidth="100%"
              imageHeight="100%"
              imageWidth="100%"
              scaleOnHover={1.03}
              rotateAmplitude={12}
              showMobileWarning={false}
              showTooltip={false}
            />
          </div>

          {/* Right Side: Professional Details */}
          <div className="about-info-text">
            <p>
              <span>4th-Year Computer Science undergrad</span> specializing in <span>AI/ML</span>. Driven by a strong foundation in <span>Data Structures & Algorithms</span> and a passion for building <span>intelligent, full-stack systems</span>. I actively participate in hackathons to build real-world projects that solve complex problems and optimize solutions.
            </p>

            <a 
              href="/resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="resume-btn"
            >
              Resume
              <svg className="resume-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
