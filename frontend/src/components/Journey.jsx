import React, { useEffect, useState } from 'react';
import { api } from '../api';
import './Journey.css';

function formatPeriod(item) {
  if (!item.startDate) return '';
  const start = new Date(item.startDate).getFullYear();
  if (item.current) return `${start} - Present`;
  if (!item.endDate) return `${start}`;
  return `${start} - ${new Date(item.endDate).getFullYear()}`;
}

const FALLBACK = [
  { period: '2023 - 2026', role: 'B.Tech CSE Undergrad', org: 'AI/ML Specialization', description: 'Laid core foundations in DSA, software engineering, and deep learning architectures.', tags: ['DSA', 'Python', 'AI/ML'] },
  { period: '2025 - 2026', role: 'Technical Member', org: 'GFG Student Club', description: 'Conducted DSA and problem-solving bootcamps to aid interview prep and mentored peers in DSA.', tags: ['Hackathons', 'Mentorship', 'DSA', 'Leadership'] },
  { period: '2025 - 2026', role: 'Technical Lead', org: 'Swift Student Club', description: 'Led a 10-day hands-on workshop on Swift and SwiftUI, mentoring 50+ students.', tags: ['Leadership', 'System Design', 'Git'] },
  { period: 'July 2025', role: 'Full Stack Intern', org: 'Elite Softwares', description: 'Designed relational database schemas and optimized end-to-end data flow across frontend and backend services.', tags: ['Django', 'Database', 'APIs'] },
  { period: 'Feb 2026', role: 'Best Delegate', org: 'MUN Conference', description: 'Recognized for excellence in leadership, strategic negotiation, and public policy debate', tags: ['Leadership', 'Communication', 'Public Speaking'] },
  { period: 'March 2026', role: 'National Level Hackathon', org: 'Industry Experience', description: 'Built and presented an AI-powered solution at a national hackathon.', tags: ['AI/ML', 'APIs','MERN'] },
];

export default function Journey() {
  const [journeyTimeline, setJourneyTimeline] = useState(FALLBACK);

  useEffect(() => {
    api.get('/api/journey')
      .then(data => {
        if (!Array.isArray(data) || data.length === 0) return;
        setJourneyTimeline(data.map(item => ({
          period: formatPeriod(item),
          role: item.title,
          org: item.organization,
          description: item.description,
          tags: item.tags || [],
        })));
      })
      .catch(() => {});
  }, []);

  return (
    <section className="journey-section" id="journey">
      <div className="journey-container">
        <div className="journey-header">
          <span className="journey-subtitle">EXPERIENCE & PATHWAY</span>
          <h2 className="journey-title">MY JOURNEY</h2>
          <div className="journey-header-line"></div>
        </div>

        <div className="timeline-horizontal-track">
          <div className="timeline-horizontal-line"></div>
          <div className="timeline-items-wrapper">
            {journeyTimeline.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div key={idx} className={`timeline-node-item ${isEven ? 'pos-above' : 'pos-below'}`}>
                  <div className="timeline-horizontal-dot">
                    <div className="timeline-dot-inner"></div>
                    <div className="timeline-dot-pulse"></div>
                  </div>
                  <div className="timeline-connector-vertical"></div>
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
