import React, { useEffect, useRef, useState } from 'react';
import avatarImg from '../assets/avatar.png';
import TiltedCard from './TiltedCard';
import './Hero.css';

const messages = [
  "I'm open to work! DM or book a call now ✨",
  "Let's collaborate on your next project! 🚀",
  "Available for freelance & full-time roles! 💼",
  "Looking for internship & full-time roles! 💼"
];

export default function Hero() {
  const containerRef = useRef(null);
  const nameContainerRef = useRef(null);
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % messages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Keep name clip-path in sync with the global cursor position
  useEffect(() => {
    const nameContainer = nameContainerRef.current;
    const container = containerRef.current;
    if (!nameContainer || !container) return;

    const onMove = (e) => {
      const containerRect = container.getBoundingClientRect();
      const nameRect = nameContainer.getBoundingClientRect();
      nameContainer.style.setProperty('--mouse-x', `${e.clientX - nameRect.left}px`);
      nameContainer.style.setProperty('--mouse-y', `${e.clientY - nameRect.top}px`);
      container.classList.add('is-moving', 'is-hovered');
    };

    const timeoutRef = { current: null };
    const onMoveThrottle = (e) => {
      onMove(e);
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => container.classList.remove('is-moving'), 150);
    };

    const onLeave = () => container.classList.remove('is-hovered', 'is-moving');

    window.addEventListener('mousemove', onMoveThrottle);
    container.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMoveThrottle);
      container.removeEventListener('mouseleave', onLeave);
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <section className="hero-section" ref={containerRef}>
      {/* Navigation Header at Top */}
      <header className="hero-nav">
        <div className="logo-section">
          <span className="logo-dot"></span>
          <span className="logo-text">BASED IN INDIA</span>
        </div>
        <nav className="nav-right">
          <a href="#about" className="nav-link">About</a>
          <a href="#journey" className="nav-link">Journey</a>
          <a href="#projects" className="nav-link">Projects</a>
          <a href="#contact" className="nav-link">Contact</a>
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
            I am a fourth year student at MIT Art Design & Technology University specializing in AI/ML, I Enjoy participating in hackathons and ahve a strog foundation in Data Structured and Algorathms
          </p>

          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">
              View Work
              <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a href="#contact" className="btn btn-secondary">Let's Connect</a>
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

    </section>
  );
}
