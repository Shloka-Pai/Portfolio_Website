import React, { useEffect, useState, useRef } from 'react';
import { api } from '../api';
import './Projects.css';

const visualClasses = ['project-neurosketch', 'project-synapse', 'project-satin', 'project-extra1', 'project-extra2'];

const FALLBACK = [
  {
    title: 'Slouch Detector',
    subtitle: 'Real-time Posture Detection',
    description: 'A real-time computer vision system that monitors posture via webcam, achieving 90%+ detection accuracy at 25+ FPS. Features a custom calibration algorithm that reduced false-positive alerts by 30% across diverse body types and camera angles.',
    tech: ['Python', 'MediaPipe', 'OpenCV'],
    codeLink: 'https://github.com/Shloka-Pai/Slouch-detector-PBL-',
    liveLink: '#',
    visualClass: 'project-neurosketch'
  },
  {
    title: 'CrowdPulse',
    subtitle: 'Real-Time Crowd Monitoring System',
    description: 'A crowd monitoring platform that processes live video streams at 15+ FPS to detect high-density zones with 85%+ accuracy using custom vision models. Includes automated SOS escalation and predictive risk scoring.',
    tech: ['MERN Stack', 'YOLO', 'Computer Vision'],
    codeLink: 'https://github.com/Shloka-Pai/CrowdPulseNew',
    liveLink: '#',
    visualClass: 'project-synapse'
  },
  {
    title: 'Sanjeevan',
    subtitle: 'Real-Time Healthcare Platform',
    description: 'A telemetry platform streaming patient vitals from ambulances to hospitals with under 2s latency. Features a multilingual AI assistant supporting 3+ languages and an automated hospital-matching engine.',
    tech: ['MERN Stack', 'WebSockets', 'LLMs'],
    codeLink: 'https://github.com/Shloka-Pai/JeevanSetu',
    liveLink: '#',
    visualClass: 'project-satin'
  },
  {
    title: 'Academic Assistant',
    subtitle: 'Academic Assistant platform',
    description: 'A fully dynamic MERN-stack portfolio with a custom gooey cursor, animated timeline, carousel project showcase, and a MongoDB-backed CMS for managing all content without touching code.',
    tech: ['React', 'Node.js', 'MongoDB', 'Express'],
    codeLink: 'https://github.com/Shloka-Pai/Portfolio_Website',
    liveLink: '#',
    visualClass: 'project-extra1'
  },
  {
    title: 'DSA Visualizer',
    subtitle: 'Algorithm Learning Tool',
    description: 'An interactive web app that animates sorting, searching, and graph traversal algorithms step-by-step. Helps students understand time complexity through real-time visual feedback and speed controls.',
    tech: ['React', 'JavaScript', 'CSS Animations'],
    codeLink: 'https://github.com/Shloka-Pai',
    liveLink: '#',
    visualClass: 'project-extra2'
  },
];

const svgDecorations = [
  // 0 — neural network nodes
  <svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="40" r="8" fill="rgba(255,255,255,0.15)" />
    <circle cx="60" cy="20" r="8" fill="rgba(255,255,255,0.15)" />
    <circle cx="100" cy="40" r="8" fill="rgba(255,255,255,0.15)" />
    <circle cx="60" cy="60" r="8" fill="rgba(255,255,255,0.15)" />
    <line x1="28" y1="40" x2="52" y2="20" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
    <line x1="68" y1="20" x2="92" y2="40" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
    <line x1="28" y1="40" x2="52" y2="60" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
    <line x1="68" y1="60" x2="92" y2="40" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
    <line x1="60" y1="28" x2="60" y2="52" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
  </svg>,
  // 1 — flow nodes
  <svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="30" width="24" height="20" rx="4" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
    <rect x="48" y="15" width="24" height="20" rx="4" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
    <rect x="86" y="30" width="24" height="20" rx="4" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
    <rect x="48" y="45" width="24" height="20" rx="4" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
    <line x1="34" y1="40" x2="48" y2="25" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
    <line x1="72" y1="25" x2="86" y2="40" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
    <line x1="60" y1="35" x2="60" y2="45" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
  </svg>,
  // 2 — wave curve
  <svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 60 Q30 10 60 40 Q90 70 110 20" stroke="rgba(255,255,255,0.3)" strokeWidth="2" fill="none" />
    <path d="M10 65 Q30 15 60 45 Q90 75 110 25" stroke="rgba(255,255,255,0.1)" strokeWidth="6" fill="none" />
    <circle cx="60" cy="40" r="4" fill="rgba(255,255,255,0.4)" />
    <circle cx="30" cy="28" r="3" fill="rgba(255,255,255,0.2)" />
    <circle cx="90" cy="52" r="3" fill="rgba(255,255,255,0.2)" />
  </svg>,
  // 3 — code brackets
  <svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M35 20 L15 40 L35 60" stroke="rgba(255,255,255,0.3)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M85 20 L105 40 L85 60" stroke="rgba(255,255,255,0.3)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="65" y1="15" x2="55" y2="65" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round" />
  </svg>,
  // 4 — bar chart
  <svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="15" y="45" width="16" height="22" rx="3" fill="rgba(255,255,255,0.15)" />
    <rect x="38" y="30" width="16" height="37" rx="3" fill="rgba(255,255,255,0.2)" />
    <rect x="61" y="18" width="16" height="49" rx="3" fill="rgba(255,255,255,0.25)" />
    <rect x="84" y="35" width="16" height="32" rx="3" fill="rgba(255,255,255,0.15)" />
    <line x1="10" y1="67" x2="110" y2="67" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
  </svg>,
];

export default function Projects() {
  const [projectsList, setProjectsList] = useState(FALLBACK);
  const [current, setCurrent] = useState(0);
  const [offset, setOffset] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const trackRef = useRef(null);
  const outerRef = useRef(null);
  const dragStart = useRef(null);
  const dragging = useRef(false);
  const ANIM_MS = 450;

  useEffect(() => {
    api.get('/api/projects')
      .then(data => {
        if (!Array.isArray(data) || data.length === 0) return;
        setProjectsList(data.map((p, i) => ({
          title: p.title,
          subtitle: p.subtitle || '',
          description: p.description,
          tech: p.techStack || [],
          codeLink: p.githubLink || '#',
          liveLink: p.liveLink || '#',
          visualClass: visualClasses[i % visualClasses.length],
        })));
      })
      .catch(() => {});
  }, []);

  const total = projectsList.length;

  const calcOffset = (idx) => {
    const outer = outerRef.current;
    if (!outer) return 0;
    const outerW = outer.offsetWidth;
    const cardWidth = outerW * 0.38;
    const gap = 24;
    const centerOffset = (outerW - cardWidth) / 2;
    return centerOffset - idx * (cardWidth + gap);
  };

  const goTo = (idx) => {
    if (isAnimating) return;
    const wrapped = ((idx % total) + total) % total;
    setOffset(calcOffset(wrapped));
    setCurrent(wrapped);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), ANIM_MS);
  };

  useEffect(() => {
    const handleResize = () => setOffset(calcOffset(current));
    window.addEventListener('resize', handleResize);
    // set initial offset after mount
    setOffset(calcOffset(current));
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const prev = () => goTo(current - 1);
  const next = () => goTo(current + 1);

  const onDragStart = (e) => {
    dragStart.current = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    dragging.current = true;
  };
  const onDragEnd = (e) => {
    if (!dragging.current) return;
    dragging.current = false;
    const endX = e.type === 'touchend' ? e.changedTouches[0].clientX : e.clientX;
    const diff = dragStart.current - endX;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
  };

  return (
    <section className="projects-section" id="projects">
      <div className="projects-container">
        <div className="projects-header">
          <span className="projects-subtitle">CREATIVE PORTFOLIO</span>
          <h2 className="projects-title">MY PROJECTS</h2>
          <div className="projects-header-line"></div>
        </div>

        <div className="carousel-wrapper">
          {/* Prev button */}
          <button className="carousel-btn carousel-btn-prev" onClick={prev} disabled={isAnimating} aria-label="Previous">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Track */}
          <div
            className="carousel-track-outer"
            ref={outerRef}
            onMouseDown={onDragStart}
            onMouseUp={onDragEnd}
            onMouseLeave={onDragEnd}
            onTouchStart={onDragStart}
            onTouchEnd={onDragEnd}
          >
            <div
              className="carousel-track"
              ref={trackRef}
              style={{ transform: `translateX(${offset}px)` }}
            >
              {projectsList.map((project, idx) => {
                const diff = idx - current;
                const isCentered = diff === 0;
                const isSide = Math.abs(diff) === 1;
                let cardClass = 'card-hidden';
                if (isCentered) cardClass = 'card-center';
                else if (isSide) cardClass = 'card-side';
                return (
                <div key={idx} className={`project-card carousel-card ${cardClass}`}>
                  <div className={`project-visual-preview ${project.visualClass}`}>
                    <div className="visual-overlay"></div>
                    <div className="visual-grid-glow"></div>
                    <div className="visual-decoration">
                      {svgDecorations[idx % svgDecorations.length]}
                    </div>
                    <span className="visual-index">0{idx + 1}</span>
                  </div>

                  <div className="project-details-content">
                    <span className="project-card-subtitle">{project.subtitle}</span>
                    <h3 className="project-card-title">{project.title}</h3>
                    <p className="project-card-desc">{project.description}</p>
                    <div className="project-tech-tags">
                      {project.tech.map((tag, tIdx) => (
                        <span key={tIdx} className="project-tech-tag">{tag}</span>
                      ))}
                    </div>
                    <div className="project-card-actions">
                      <a href={project.codeLink} target="_blank" rel="noopener noreferrer" className="project-action-link">
                        CODEBASE<span className="action-underline"></span>
                      </a>
                      <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="project-action-link">
                        LIVE DEMO<span className="action-underline"></span>
                      </a>
                    </div>
                  </div>
                </div>
                );
              })}
            </div>
          </div>

          {/* Next button */}
          <button className="carousel-btn carousel-btn-next" onClick={next} disabled={isAnimating} aria-label="Next">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        {/* Dots */}
        <div className="carousel-dots">
          {projectsList.map((_, idx) => (
            <button
              key={idx}
              className={`carousel-dot ${idx === current ? 'active' : ''}`}
              onClick={() => goTo(idx)}
              aria-label={`Go to project ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
