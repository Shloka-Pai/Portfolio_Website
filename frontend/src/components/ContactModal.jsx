import React, { useEffect } from 'react';
import './ContactModal.css';

const contacts = [
  {
    label: 'Phone',
    value: '+91 98765 43210',
    href: 'tel:+919876543210',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.18 6.18l.97-.97a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    )
  },
  {
    label: 'Email',
    value: 'shloka.pai@email.com',
    href: 'mailto:shloka.pai@email.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    )
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/shloka-pai',
    href: 'https://www.linkedin.com/in/shloka-pai',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    )
  },
  {
    label: 'GitHub',
    value: 'github.com/shloka-pai',
    href: 'https://github.com/shloka-pai',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    )
  },
  {
    label: 'LeetCode',
    value: 'leetcode.com/u/shloka-pai',
    href: 'https://leetcode.com/u/shloka-pai',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.823-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.365.497 1.9-.038.535-.536.553-1.387.038-1.9l-2.609-2.519c-.756-.731-1.754-1.2-2.85-1.2H9.5c-1.1 0-2.1.47-2.85 1.2L2.318 12c-.75.73-1.2 1.73-1.2 2.83s.45 2.1 1.2 2.83l4.332 4.363c.75.73 1.75 1.2 2.85 1.2h.002c1.1 0 2.1-.47 2.85-1.2l2.609-2.52c.515-.514.497-1.365-.038-1.9-.535-.535-1.386-.552-1.9-.038z" />
        <path d="M13.196 6.243l2.607 2.697" />
      </svg>
    )
  }
];

export default function ContactModal({ onClose }) {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        <span className="modal-eyebrow">GET IN TOUCH</span>
        <h2 className="modal-title">Let's Connect</h2>
        <p className="modal-subtitle">Open to collaborations, internships & full-time roles.</p>

        <div className="modal-contacts">
          {contacts.map((c) => (
            <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer" className="modal-contact-row">
              <span className="modal-contact-icon">{c.icon}</span>
              <span className="modal-contact-info">
                <span className="modal-contact-label">{c.label}</span>
                <span className="modal-contact-value">{c.value}</span>
              </span>
              <svg className="modal-contact-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17 17 7M7 7h10v10" />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
