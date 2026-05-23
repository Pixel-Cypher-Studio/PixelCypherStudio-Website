'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import ThemeToggle from '@/components/ThemeToggle';
import styles from './Navbar.module.scss';

const navLinks = [
  // { href: '/work', label: 'Work' },
  { href: '/', label: 'Studio' },
  { href: '/packages', label: 'Packages' },
 { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const { theme } = useTheme();

  useEffect(() => setMounted(true), []);

  const logoSrc = mounted && theme === 'dark'
    ? '/images/logo/pcslogo1_dark.png'
    : '/images/logo/pcslogo1.png';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      closeBtnRef.current?.focus();
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  useEffect(() => setMenuOpen(false), [pathname]);

  const open = () => setMenuOpen(true);
  const close = () => setMenuOpen(false);

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <nav className={styles.nav}>
          <Link href="/" className={styles.logo}>
            <span className={styles.logoMark}>
              <Image
                src={logoSrc}
                alt="Pixel Cypher Studio logo"
                fill
                sizes="32px"
                className={styles.logoImage}
                priority
              />
            </span>
            <span className={styles.logoText}>PIXELCYPHER STUDIO</span>
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
            {/* <Link href="/contact" className={styles.cta}>
              Hire Us
            </Link> */}
          </div>
        </nav>
      </header>

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

      <div
        id="mobile-overlay"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`${styles.overlay} ${menuOpen ? styles.overlayOpen : ''}`}
        onClick={close}
      >
        <div className={styles.overlayInner}>
          <button
            ref={closeBtnRef}
            className={styles.closeBtn}
            onClick={close}
            aria-label="Close navigation menu"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <div className={styles.overlayTheme} onClick={(e) => e.stopPropagation()}>
            <ThemeToggle />
          </div>

          <Link href="/" className={styles.overlayBrand} onClick={close}>
            <span className={styles.overlayLogoMark}>
              <Image
                src={logoSrc}
                alt="Pixel Cypher Studio logo"
                fill
                sizes="40px"
                className={styles.logoImage}
              />
            </span>
            <span className={styles.overlayBrandText}>PIXELCYPHER STUDIO</span>
          </Link>

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

          <div className={styles.overlayFooter} onClick={(e) => e.stopPropagation()}>
            <Link href="/contact" className={styles.overlayCta} onClick={close}>
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