'use client';

import { useEffect } from 'react';
import { navLinks } from './Nav';

export default function MobileMenu({ open, onClose }) {
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
        onClick={onClose}
      />
      <div className="fixed inset-y-0 right-0 z-50 w-64 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 md:hidden animate-slide-in">
        <div className="flex items-center justify-end p-4">
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded-md"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="px-4 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={
                link.current
                  ? 'block px-3 py-2.5 rounded-md text-sm font-medium text-slate-900 bg-slate-100 dark:text-white dark:bg-slate-800'
                  : 'block px-3 py-2.5 rounded-md text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800 transition-colors'
              }
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
