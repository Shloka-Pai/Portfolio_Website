import React, { useEffect, useState } from 'react';
import { api } from '../api';
import './Projects.css';

const visualClasses = ['project-neurosketch', 'project-synapse', 'project-satin'];

const FALLBACK = [
  {
  title: 'Slouch Detector',
  subtitle: 'Real-time Posture Detection',
  description: 'A real-time computer vision system that monitors posture via webcam, achieving 90%+ detection accuracy at 25+ FPS. Features a custom calibration algorithm that reduced false-positive alerts by 30% across diverse body types and camera angles.',
  tech: ['Python', 'MediaPipe', 'OpenCV'],
  codeLink: 'https://github.com/Shloka-Pai/Slouch-detector-PBL-',
  visualClass: 'project-neurosketch'
},
{
  title: 'CrowdPulse',
  subtitle: 'Real-Time Crowd Monitoring System',
  description: 'A crowd monitoring platform that processes live video streams at 15+ FPS to detect high-density zones with 85%+ accuracy using custom vision models. Includes automated SOS escalation and predictive risk scoring, cutting emergency coordination time by 40% in simulations.',
  tech: ['MERN Stack', 'YOLO', 'Computer Vision'],
  codeLink: 'https://github.com/Shloka-Pai/CrowdPulseNew',
  visualClass: 'project-synapse'
},
{
  title: 'Sanjeevan',
  subtitle: 'Real-Time Healthcare Platform',
  description: 'A telemetry platform streaming patient vitals from ambulances to hospitals with under 2s latency. Features a multilingual AI assistant supporting 3+ languages and an automated hospital-matching engine that cut manual dispatch time by 50%.',
  tech: ['MERN Stack', 'WebSockets', 'LLMs'],
  codeLink: 'https://github.com/Shloka-Pai/JeevanSetu',
  visualClass: 'project-satin'
},
];

export default function Projects() {
  const [projectsList, setProjectsList] = useState(FALLBACK);

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

  return (
    <section className="projects-section" id="projects">
      <div className="projects-container">
        <div className="projects-header">
          <span className="projects-subtitle">CREATIVE PORTFOLIO</span>
          <h2 className="projects-title">MY PROJECTS</h2>
          <div className="projects-header-line"></div>
        </div>

        <div className="projects-grid">
          {projectsList.map((project, idx) => (
            <div key={idx} className="project-card">
              <div className={`project-visual-preview ${project.visualClass}`}>
                <div className="visual-overlay"></div>
                <div className="visual-grid-glow"></div>
                <div className="visual-decoration">
                  {idx === 0 && (
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
                    </svg>
                  )}
                  {idx === 1 && (
                    <svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="10" y="30" width="24" height="20" rx="4" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                      <rect x="48" y="15" width="24" height="20" rx="4" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                      <rect x="86" y="30" width="24" height="20" rx="4" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                      <rect x="48" y="45" width="24" height="20" rx="4" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                      <line x1="34" y1="40" x2="48" y2="25" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
                      <line x1="72" y1="25" x2="86" y2="40" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
                      <line x1="60" y1="35" x2="60" y2="45" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
                    </svg>
                  )}
                  {idx === 2 && (
                    <svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 60 Q30 10 60 40 Q90 70 110 20" stroke="rgba(255,255,255,0.3)" strokeWidth="2" fill="none" />
                      <path d="M10 65 Q30 15 60 45 Q90 75 110 25" stroke="rgba(255,255,255,0.1)" strokeWidth="6" fill="none" />
                      <circle cx="60" cy="40" r="4" fill="rgba(255,255,255,0.4)" />
                      <circle cx="30" cy="28" r="3" fill="rgba(255,255,255,0.2)" />
                      <circle cx="90" cy="52" r="3" fill="rgba(255,255,255,0.2)" />
                    </svg>
                  )}
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
          ))}
        </div>
      </div>
    </section>
  );
}
