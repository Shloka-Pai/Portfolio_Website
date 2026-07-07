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

      // Only show when the transition starts (t > 0.28)
      if (t > 0.28) {
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

  const techIcons = [
    {
      name: 'C',
      svg: (
        <svg className="tech-svg" viewBox="0 0 24 24" fill="none" stroke="#00599C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 16A6 6 0 1 1 18 8" />
        </svg>
      )
    },
    {
      name: 'C++',
      svg: (
        <svg className="tech-svg" viewBox="0 0 24 24" fill="none" stroke="#00599C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 16A6 6 0 1 1 18 8" />
          <path d="M14 12h4M16 10v4M20 12h4M22 10v4" stroke="#659AD2" strokeWidth="2" />
        </svg>
      )
    },
    {
      name: 'JavaScript',
      svg: (
        <svg className="tech-svg" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" fill="#F7DF1E" />
          <path d="M12 15h2a1.5 1.5 0 0 0 1.5-1.5v-1A1.5 1.5 0 0 0 14 11h-1a1.5 1.5 0 0 1-1.5-1.5v-1A1.5 1.5 0 0 1 13 7h2" stroke="#000000" strokeWidth="2" />
        </svg>
      )
    },
    {
      name: 'Python',
      svg: (
        <svg className="tech-svg" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2C8.5 2 8 3 8 5v2h4V6a1 1 0 0 1 1-1h3a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-6c-1.5 0-3 1-3 3v4c0 1.5 1 3 3 3h2v-2c0-1.5 1-3 3-3h3c1.5 0 2-1 2-3v-4c0-2-1.5-3-5-3z" fill="#3776AB" />
          <path d="M12 22c3.5 0 4-1 4-3v-2h-4v1a1 1 0 0 1-1 1H8a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h6c1.5 0 3-1 3-3V7c0-1.5-1-3-3-3h-2v2c0 1.5-1 3-3 3H6c-1.5 0-2 1-2 3v4c0 2 1.5 3 5 3z" fill="#FFD343" />
          <circle cx="9.5" cy="4.5" r="0.75" fill="#fff" />
          <circle cx="14.5" cy="19.5" r="0.75" fill="#fff" />
        </svg>
      )
    },
    {
      name: 'Java',
      svg: (
        <svg className="tech-svg" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 2c0 2-2 3-1 5" stroke="#5382A1" />
          <path d="M13 3c0 2-1 3-1 5" stroke="#5382A1" />
          <path d="M15 2c0 3-3 4-1 7" stroke="#5382A1" />
          <path d="M6 14h12l-1 4a3 3 0 0 1-3 3h-4a3 3 0 0 1-3-3l-1-4z" fill="#F89820" />
          <path d="M18 14c1.5 0 2.5.5 2.5 1.5s-1 1.5-2.5 1.5" stroke="#F89820" strokeWidth="2" />
          <path d="M4 19c2 1 6 1.5 8 1.5s6-.5 8-1.5" stroke="#5382A1" />
        </svg>
      )
    },
    {
      name: 'React',
      svg: (
        <svg className="tech-svg" viewBox="0 0 24 24" fill="none" stroke="#61DAFB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="12" rx="10" ry="4" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
          <circle cx="12" cy="12" r="1.5" fill="#61DAFB" />
        </svg>
      )
    },
    {
      name: 'CSS3',
      svg: (
        <svg className="tech-svg" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L3 5v12l9 4 9-4V5l-9-3z" fill="#1572B6" />
          <path d="M12 5.5v12.5l5.5-2.5.5-4h-6v-2h8.5l-.5 2" stroke="#FFFFFF" strokeWidth="1.8" />
          <path d="M12 5.5v12.5L6.5 15.5l-.5-4h2.5" stroke="#E0E0E0" strokeWidth="1.8" />
        </svg>
      )
    },
    {
      name: 'Node.js',
      svg: (
        <svg className="tech-svg" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L4 7v10l8 5 8-5V7l-8-5z" fill="#339933" />
          <path d="M12 7l6 3.5V17l-6-3.5" stroke="#FFFFFF" strokeWidth="1.8" />
          <path d="M12 13.5v7l-6-3.5V10.5" stroke="#E0E0E0" strokeWidth="1.8" />
        </svg>
      )
    },
    {
      name: 'Express',
      svg: (
        <svg className="tech-svg" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 12h16M4 6h16M4 18h16" />
        </svg>
      )
    },
    {
      name: 'MongoDB',
      svg: (
        <svg className="tech-svg" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2c0 0-5 3.5-5 9s3 11 5 11 5-5.5 5-11-5-9-5-9z" fill="#47A248" />
          <path d="M12 2v20" stroke="#FFFFFF" strokeWidth="1.5" />
          <path d="M9.5 11c0 2 1.5 3 2.5 3s2.5-1 2.5-3" stroke="#FFFFFF" strokeWidth="1.5" />
        </svg>
      )
    },
    {
      name: 'PostgreSQL',
      svg: (
        <svg className="tech-svg" viewBox="0 0 24 24" fill="none" stroke="#336791" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a8 8 0 0 0-8 8c0 4 3.5 7 8 7v5s5-3 6-5" fill="rgba(51, 103, 145, 0.1)" />
          <path d="M8 9.5a1.5 1.5 0 1 1 3 0" fill="#336791" />
          <path d="M12 17c1.5-1 3.5-2.5 3.5-5.5a3.5 3.5 0 0 0-7 0" />
        </svg>
      )
    },
    {
      name: 'MySQL',
      svg: (
        <svg className="tech-svg" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 12s4-5 10-5 10 5 10 5-4 5-10 5S2 12 2 12z" fill="#00758F" />
          <path d="M12 7v10" stroke="#F29111" strokeWidth="2.5" />
          <path d="M16 11l-4 4-4-4" stroke="#F29111" strokeWidth="2.5" />
        </svg>
      )
    },
    {
      name: 'SQLite',
      svg: (
        <svg className="tech-svg" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" fill="#003B57" />
          <line x1="16" y1="8" x2="2" y2="22" stroke="#409AD6" strokeWidth="2" />
          <line x1="17.5" y1="15" x2="9" y2="15" stroke="#FFFFFF" strokeWidth="2" />
        </svg>
      )
    },
    {
      name: 'Git',
      svg: (
        <svg className="tech-svg" viewBox="0 0 24 24" fill="none" stroke="#F05032" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="18" cy="18" r="3" fill="#F05032" />
          <circle cx="6" cy="6" r="3" fill="#F05032" />
          <circle cx="6" cy="18" r="3" fill="#F05032" />
          <path d="M18 15V9a4 4 0 0 0-4-4H9" />
          <line x1="6" y1="9" x2="6" y2="15" />
        </svg>
      )
    },
    {
      name: 'GitHub',
      svg: (
        <svg className="tech-svg" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
        </svg>
      )
    },
    {
      name: 'Docker',
      svg: (
        <svg className="tech-svg" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 14c-1 0-1.5-.5-1.5-1.5V11c0-1.5-1-2.5-2.5-2.5H4C2.5 8.5 1.5 9.5 1.5 11v1.5c0 1 .5 1.5 1.5 1.5h19z" fill="#2496ED" />
          <path d="M5.5 8.5v3M8.5 8.5v3M11.5 5.5v6M14.5 8.5v3" stroke="#FFFFFF" strokeWidth="1.5" />
        </svg>
      )
    }
  ];

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

        {/* Single horizontal tech stack strip aligned with the details grid width */}
        <div className="about-tech-stack">
          {techIcons.map((tech, idx) => (
            <div key={idx} className="tech-icon-item" title={tech.name}>
              {tech.svg}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
