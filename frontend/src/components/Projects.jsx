import React from 'react';
import './Projects.css';

const projectsList = [
  {
    title: 'Slouch Detector',
    subtitle: 'Real-time Doodling to Generative Art',
    description: 'An interactive canvas dashboard leveraging Generative Adversarial Networks (GANs) to transform hand-drawn sketches into high-fidelity stylized artwork instantaneously.',
    tech: ['PyTorch', 'React', 'FastAPI', 'Canvas API'],
    codeLink: 'https://github.com',
    liveLink: 'https://demo.com',
    visualClass: 'project-neurosketch'
  },
  {
    title: 'Crows Pulse',
    subtitle: 'Browser-Based Neural Net Designer',
    description: 'A visual flow node editor allowing users to assemble, compile, and train custom neural networks in the browser with real-time backpropagation gradient descent visualizations.',
    tech: ['TensorFlow.js', 'React Flow', 'Web Workers'],
    codeLink: 'https://github.com',
    liveLink: 'https://demo.com',
    visualClass: 'project-synapse'
  },
  {
    title: 'JeevanSetu',
    subtitle: 'Creative WebGL Graphics Sandbox',
    description: 'A performance-oriented creative graphics library featuring physics-based fluid simulation grids, custom GPU noise fields, and interactive multi-layered liquid cursor trails.',
    tech: ['Three.js', 'GLSL', 'Vite', 'HTML5 Canvas'],
    codeLink: 'https://github.comhttps://github.com/Shloka-Pai/JeevanSetu',
    liveLink: 'https://demo.com',
    visualClass: 'project-satin'
  }
];

export default function Projects() {
  return (
    <section className="projects-section" id="projects">
      <div className="projects-container">
        {/* Section Header */}
        <div className="projects-header">
          <span className="projects-subtitle">CREATIVE PORTFOLIO</span>
          <h2 className="projects-title">FEATURED WORK</h2>
          <div className="projects-header-line"></div>
        </div>

        {/* Project Cards Grid */}
        <div className="projects-grid">
          {projectsList.map((project, idx) => (
            <div key={idx} className="project-card">
              {/* Animated visual panel representing the project */}
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

              {/* Project Metadata */}
              <div className="project-details-content">
                <span className="project-card-subtitle">{project.subtitle}</span>
                <h3 className="project-card-title">{project.title}</h3>
                <p className="project-card-desc">{project.description}</p>

                {/* Tech Pills */}
                <div className="project-tech-tags">
                  {project.tech.map((tag, tIdx) => (
                    <span key={tIdx} className="project-tech-tag">{tag}</span>
                  ))}
                </div>

                {/* Action Links */}
                <div className="project-card-actions">
                  <a href={project.codeLink} target="_blank" rel="noopener noreferrer" className="project-action-link">
                    CODEBASE
                    <span className="action-underline"></span>
                  </a>
                  <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="project-action-link">
                    LIVE DEMO
                    <span className="action-underline"></span>
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
