'use client';

import { useTheme } from 'next-themes';
import { useEffect, useRef, useState } from 'react';
import styles from './ThemeToggle.module.scss';

export default function ThemeToggle() {
const { theme, setTheme } = useTheme();
const [mounted, setMounted] = useState(false);
const buttonRef = useRef<HTMLButtonElement>(null);

// Avoid hydration mismatch — only render after mount
useEffect(() => setMounted(true), []);

if (!mounted) return <div className={styles.placeholder} />;

const isDark = theme === 'dark';

const handleToggle = () => {
const button = buttonRef.current;
const newTheme = isDark ? 'light' : 'dark';

// Respect reduced-motion preference — skip animation entirely
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
setTheme(newTheme);
return;
}

// Fallback for Safari / browsers without View Transitions API
if (!document.startViewTransition) {
setTheme(newTheme);
return;
}

// ── Compute the circle origin from the button's center ──────────────────
// rect is relative to the viewport, which is exactly what clip-path needs.
const rect = button!.getBoundingClientRect();
const x = rect.left + rect.width / 2;
const y = rect.top + rect.height / 2;

// Radius must reach the farthest viewport corner from the origin point
const maxRadius = Math.hypot(
  Math.max(x, window.innerWidth - x),
  Math.max(y, window.innerHeight - y),
);

// ── Start transition ─────────────────────────────────────────────────────
// setTheme sets data-theme on <html> synchronously, so the new snapshot
// captures the fully-applied new theme colours.
const transition = document.startViewTransition(() => {
setTheme(newTheme);
});

// transition.ready resolves once both snapshots are captured and the
// pseudo-elements are in the DOM — safe to animate from here.
transition.ready.then(() => {
document.documentElement.animate(
  {
  clipPath: [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${maxRadius}px at ${x}px ${y}px)`,
  ],
  },
  {
  duration: 700,
  easing: 'ease-out',
  // Target the incoming (new-theme) snapshot layer
  pseudoElement: '::view-transition-new(root)',
  },
);
});
};

return (
<button
ref={buttonRef}
onClick={handleToggle}
className={styles.toggle}
aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
>
<span className={`${styles.icon} ${isDark ? styles.iconMoon : styles.iconSun}`}>
{isDark ? (
// Sun icon — shown in dark mode (clicking switches to light)
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
<circle cx="12" cy="12" r="5" />
<line x1="12" y1="1" x2="12" y2="3" />
<line x1="12" y1="21" x2="12" y2="23" />
<line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
<line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
<line x1="1" y1="12" x2="3" y2="12" />
<line x1="21" y1="12" x2="23" y2="12" />
<line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
<line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
</svg>
) : (
// Moon icon — shown in light mode (clicking switches to dark)
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
</svg>
)}
</span>
</button>
);
}
