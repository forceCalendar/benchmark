'use client';

import { useState } from 'react';
import ThemeToggle from './ThemeToggle';
import MobileMenu from './MobileMenu';

const navLinks = [
  { href: 'https://forcecalendar.org/core', label: 'Core' },
  { href: 'https://forcecalendar.org/interface', label: 'Interface' },
  { href: 'https://forcecalendar.org/salesforce', label: 'Salesforce' },
  { href: 'https://forcecalendar.org/playground', label: 'Playground' },
  { href: 'https://docs.forcecalendar.org', label: 'Docs' },
  { href: 'https://benchmark.forcecalendar.org', label: 'Benchmark', current: true },
  { href: 'https://audit.forcecalendar.org', label: 'Audit' },
  { href: 'https://github.com/forcecalendar', label: 'GitHub' },
];

export { navLinks };

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-30 w-full bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <a href="https://forcecalendar.org" className="text-lg tracking-tight text-slate-900 dark:text-white">
            <span className="font-light">force</span>
            <span className="font-semibold">Calendar</span>
          </a>

          <div className="hidden md:flex items-center gap-6 text-sm">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={
                  link.current
                    ? 'text-slate-900 dark:text-white font-medium'
                    : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors'
                }
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-1">
            <ThemeToggle />
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="p-2 md:hidden text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-md"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
