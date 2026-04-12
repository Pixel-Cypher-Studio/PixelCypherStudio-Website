'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from '@/components/ThemeToggle';
import styles from './Navbar.module.scss';

const navLinks = [
  { href: '/work',    label: 'Work'    },
  { href: '/studio',  label: 'Studio'  },
  { href: '/lab',     label: 'Lab'     },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const pathname   = usePathname();
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Scroll detection for desktop navbar shrink
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll while overlay is open; focus close button on open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      closeBtnRef.current?.focus();
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Escape key closes overlay
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  // Close on route change (link tap)
  useEffect(() => setMenuOpen(false), [pathname]);

  const open  = () => setMenuOpen(true);
  const close = () => setMenuOpen(false);

  return (
    <>
      {/* ─── Desktop navbar (hidden on mobile) ──────────────────────────────── */}
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <nav className={styles.nav}>
          <Link href="/" className={styles.logo}>
            <span className={styles.logoMark}>PC</span>
            <span className={styles.logoText}>PIXEL CYPHER</span>
          </Link>

          <ul className={styles.links}>
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`${styles.link} ${pathname === href ? styles.active : ''}`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <div className={styles.actions}>
            <ThemeToggle />
            <Link href="#contact" className={styles.cta}>Hire Us</Link>
          </div>
        </nav>
      </header>

      {/* ─── Mobile hamburger — fixed top-right (hidden on desktop) ─────────── */}
      <button
        className={styles.hamburger}
        onClick={open}
        aria-label="Open navigation menu"
        aria-expanded={menuOpen}
        aria-controls="mobile-overlay"
      >
        <span className={styles.bar} />
        <span className={styles.bar} />
        <span className={styles.bar} />
      </button>

      {/* ─── Full-screen overlay ─────────────────────────────────────────────── */}
      {/* Clicking the overlay background (not a child element) triggers close   */}
      <div
        id="mobile-overlay"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`${styles.overlay} ${menuOpen ? styles.overlayOpen : ''}`}
        onClick={close}
      >
        {/* Inner layout — not a propagation stopper; individual elements handle it */}
        <div className={styles.overlayInner}>

          {/* × close — top-left ------------------------------------------------ */}
          <button
            ref={closeBtnRef}
            className={styles.closeBtn}
            onClick={close}
            aria-label="Close navigation menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <line x1="18" y1="6"  x2="6"  y2="18" />
              <line x1="6"  y1="6"  x2="18" y2="18" />
            </svg>
          </button>

          {/* Theme toggle — top-right; stop propagation so it doesn't close menu */}
          <div
            className={styles.overlayTheme}
            onClick={(e) => e.stopPropagation()}
          >
            <ThemeToggle />
          </div>

          {/* Nav links — vertically stacked, large display text ----------------- */}
          <nav className={styles.overlayNav}>
            <ul className={styles.overlayList}>
              {navLinks.map(({ href, label }, i) => (
                <li
                  key={href}
                  className={styles.overlayItem}
                  style={{ '--i': i } as React.CSSProperties}
                >
                  <Link
                    href={href}
                    className={`${styles.overlayLink} ${pathname === href ? styles.overlayLinkActive : ''}`}
                    onClick={close}
                  >
                    <span className={styles.overlayLinkNum}>0{i + 1}</span>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer — CTA + status ---------------------------------------------- */}
          <div
            className={styles.overlayFooter}
            onClick={(e) => e.stopPropagation()}
          >
            <Link href="#contact" className={styles.overlayCta} onClick={close}>
              Hire Us →
            </Link>
            <p className={styles.overlayStatus}>
              <span className={styles.overlayStatusDot} />
              Accepting New Projects
            </p>
          </div>

        </div>
      </div>
    </>
  );
}
