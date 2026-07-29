import React, { useEffect, useState } from 'react';
import { api } from '../api';
import './Contact.css';

const icons = {
    Contact: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  Email: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
  LinkedIn: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
  GitHub: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  ),
  LeetCode: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.823-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.365.497 1.9-.038.535-.536.553-1.387.038-1.9l-2.609-2.519c-.756-.731-1.754-1.2-2.85-1.2H9.5c-1.1 0-2.1.47-2.85 1.2L2.318 12c-.75.73-1.2 1.73-1.2 2.83s.45 2.1 1.2 2.83l4.332 4.363c.75.73 1.75 1.2 2.85 1.2h.002c1.1 0 2.1-.47 2.85-1.2l2.609-2.52c.515-.514.497-1.365-.038-1.9-.535-.535-1.386-.552-1.9-.038z" />
    </svg>
  ),
};

const FALLBACK = [
  { label: 'Contact',  value: '+91 9653217932', href: 'tel:+919653217932' },
  { label: 'Email',    value: 'shlokanikhilpai@gmail.com',       href: 'mailto:shlokanikhilpai@gmail.com' },
  { label: 'LinkedIn', value: 'linkedin.com/in/shloka-pai', href: 'https://www.linkedin.com/in/shloka-pai' },
  { label: 'GitHub',   value: 'github.com/Shloka-Pai',      href: 'https://github.com/Shloka-Pai' },
];

export default function Contact() {
  const [links, setLinks] = useState(FALLBACK);

  useEffect(() => {
    api.get('/api/about')
      .then(data => {
        if (!data?.email) return;
        const dynamic = [
          { label: 'Contact',  value: data.phone,        href: data.phone ? `tel:${data.phone}` : undefined },
          { label: 'Email',    value: data.email,        href: `mailto:${data.email}` },
          { label: 'LinkedIn', value: data.linkedinUrl,  href: data.linkedinUrl },
          { label: 'GitHub',   value: data.githubUrl,    href: data.githubUrl },
        ].filter(l => l.value);
        if (dynamic.length > 0) setLinks(dynamic);
      })
      .catch(() => {});
  }, []);

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        <div className="contact-header">
          <span className="contact-eyebrow">GET IN TOUCH</span>
          <h2 className="contact-title">LET'S CONNECT</h2>
          <div className="contact-header-line"></div>
          <p className="contact-subtitle">
            Open to collaborations, internships & full-time roles. Feel free to reach out through any of the channels below.
          </p>
        </div>

        <div className="contact-grid">
          {links.map((item) => (
            <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" className="contact-card">
              <span className="contact-card-icon">{icons[item.label]}</span>
              <span className="contact-card-body">
                <span className="contact-card-label">{item.label}</span>
                <span className="contact-card-value">{item.value}</span>
              </span>
              <svg className="contact-card-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17 17 7M7 7h10v10" />
              </svg>
            </a>
          ))}
        </div>

        <div className="contact-footer">
          <span>© {new Date().getFullYear()} Shloka Pai. Built with React.</span>
        </div>
      </div>
    </section>
  );
}
