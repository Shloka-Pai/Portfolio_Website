import React from 'react';
import './Journey.css';

const journeyTimeline = [
  {
    period: '2022 - 2026',
    role: 'B.Tech CSE Undergrad',
    org: 'AI/ML Specialization',
    description: 'Laid core foundations in DSA, software engineering, and deep learning architectures.',
    tags: ['DSA', 'Python', 'AI/ML']
  },
  {
    period: '2023 - 2024',
    role: 'Technical Member',
    org: 'GFG Student Club',
    description: 'Organized hackathons, hosted coding sessions, and mentored peers in DSA.',
    tags: ['Hackathons', 'Mentorship', 'DSA']
  },
  {
    period: '2024 - 2025',
    role: 'Technical Lead',
    org: 'Swift Student Club',
    description: 'Directed dev sprints, hosted coding bootcamps, and architected web platforms.',
    tags: ['Leadership', 'System Design', 'Git']
  },
  {
    period: '2025 - Present',
    role: 'Full Stack Intern',
    org: 'Industry Experience',
    description: 'Integrated predictive deep learning models with React dashboards, optimizing latency.',
    tags: ['PyTorch', 'React', 'APIs']
  },
    {
    period: 'Feb 2026',
    role: 'Best Delegate',
    org: 'Industry Experience',
    description: 'Integrated predictive deep learning models with React dashboards, optimizing latency.',
    tags: ['PyTorch', 'React', 'APIs']
  },
      {
    period: 'Feb 2026',
    role: 'National level hackathon',
    org: 'Industry Experience',
    description: 'Integrated predictive deep learning models with React dashboards, optimizing latency.',
    tags: ['PyTorch', 'React', 'APIs']
  }
];

export default function Journey() {
  return (
    <section className="journey-section" id="journey">
      <div className="journey-container">
        {/* Header Section */}
        <div className="journey-header">
          <span className="journey-subtitle">EXPERIENCE & PATHWAY</span>
          <h2 className="journey-title">MY JOURNEY</h2>
          <div className="journey-header-line"></div>
        </div>

        {/* Horizontal Alternating Timeline for Desktop / Vertical for Mobile */}
        <div className="timeline-horizontal-track">
          {/* Main Horizontal Connecting Line */}
          <div className="timeline-horizontal-line"></div>

          <div className="timeline-items-wrapper">
            {journeyTimeline.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div 
                  key={idx} 
                  className={`timeline-node-item ${isEven ? 'pos-above' : 'pos-below'}`}
                >
                  {/* Glowing Node Dot on the horizontal track */}
                  <div className="timeline-horizontal-dot">
                    <div className="timeline-dot-inner"></div>
                    <div className="timeline-dot-pulse"></div>
                  </div>

                  {/* Vertical Connector Line */}
                  <div className="timeline-connector-vertical"></div>

                  {/* Interactive Card */}
                  <div className="timeline-card-box">
                    <div className="timeline-card-glow-layer"></div>
                    <span className="timeline-pill-period">{item.period}</span>
                    <h3 className="timeline-title-role">{item.role}</h3>
                    <h4 className="timeline-title-org">{item.org}</h4>
                    <p className="timeline-text-desc">{item.description}</p>
                    
                    <div className="timeline-pills-tags">
                      {item.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="timeline-pill-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
