'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './videoeditingmotiongraphics.module.scss';

// ── Data ───────────────────────────────────────────────────

const NAV_LINKS = [
  { href: '#work', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#contact', label: 'Contact' },
];

const STATS = [
  { num: '150+', label: 'Projects Done' },
  { num: '8', label: 'Years Experience' },
  { num: '40M+', label: 'Views Generated' },
];

const TICKER_ITEMS = [
  'Cinematic Editing', 'Color Grading', 'Motion Graphics', 'Sound Design',
  'VFX', 'Commercial', 'Documentary', 'Music Videos',
];

interface LandscapeCard {
  colorClass: string;
  textColor: string;
  label: string;
  genre: string;
  name: string;
  dur: string;
}

interface PortraitCard {
  colorClass: string;
  textColor: string;
  label: string;
  genre: string;
  name: string;
  dur: string;
}

const LANDSCAPE_CARDS_ROW1: LandscapeCard[] = [
  { colorClass: 'c1', textColor: '#3a3028', label: 'BRAND FILM',  genre: 'Commercial',  name: 'Nike Air Campaign',  dur: '3:45 · 4K · 2024' },
  { colorClass: 'c2', textColor: '#1a2e30', label: 'DOCUMENTARY', genre: 'Documentary', name: 'Ocean Silence',      dur: '18:30 · 4K · 2024' },
  { colorClass: 'c3', textColor: '#301a18', label: 'MUSIC VIDEO', genre: 'Music Video', name: 'Echoes of You',      dur: '4:12 · 6K · 2023' },
  { colorClass: 'c4', textColor: '#1e2e18', label: 'SHORT FILM',  genre: 'Narrative',   name: 'The Last Train',     dur: '12:00 · 4K · 2023' },
  { colorClass: 'c5', textColor: '#280e30', label: 'FASHION',     genre: 'Fashion Film', name: 'Couture SS24',      dur: '2:30 · 6K · 2024' },
  { colorClass: 'c6', textColor: '#0f1e28', label: 'TRAVEL',      genre: 'Travel',      name: 'Patagonia Raw',      dur: '7:20 · 4K · 2023' },
];

const LANDSCAPE_CARDS_ROW2: LandscapeCard[] = [
  { colorClass: 'c7', textColor: '#2e1e1e', label: 'PRODUCT',   genre: 'Product',   name: 'Tesla Reveal',       dur: '1:30 · 8K · 2024' },
  { colorClass: 'c8', textColor: '#232e18', label: 'SPORTS',    genre: 'Sports',    name: 'World Cup Recap',    dur: '5:00 · 4K · 2023' },
  { colorClass: 'c1', textColor: '#3a3028', label: 'WEDDING',   genre: 'Wedding',   name: 'Amore in Tuscany',   dur: '8:45 · 4K · 2024' },
  { colorClass: 'c5', textColor: '#280e30', label: 'CORPORATE', genre: 'Corporate', name: 'Goldman Sachs 2024', dur: '3:00 · 4K · 2024' },
  { colorClass: 'c2', textColor: '#1a2e30', label: 'NATURE',    genre: 'Nature',    name: 'Arctic Drift',       dur: '22:00 · 6K · 2023' },
  { colorClass: 'c4', textColor: '#1e2e18', label: 'ANIMATION', genre: 'Animation', name: 'Pixel Dreams',       dur: '2:00 · 4K · 2024' },
];

const PORTRAIT_CARDS: PortraitCard[] = [
  { colorClass: 'c3', textColor: '#301a18', label: 'REEL',   genre: 'Instagram', name: 'Skincare Launch',  dur: '0:30' },
  { colorClass: 'c5', textColor: '#280e30', label: 'TIKTOK', genre: 'TikTok',    name: 'Dance Trend',      dur: '0:15' },
  { colorClass: 'c1', textColor: '#3a3028', label: 'SHORT',  genre: 'YT Shorts', name: "Chef's Special",   dur: '0:58' },
  { colorClass: 'c2', textColor: '#1a2e30', label: 'REEL',   genre: 'Instagram', name: 'Fitness Journey',  dur: '0:45' },
  { colorClass: 'c6', textColor: '#0f1e28', label: 'STORY',  genre: 'Stories',   name: 'Behind the Lens',  dur: '0:20' },
  { colorClass: 'c8', textColor: '#232e18', label: 'TIKTOK', genre: 'TikTok',    name: 'Street Style NYC', dur: '0:30' },
  { colorClass: 'c7', textColor: '#2e1e1e', label: 'SHORT',  genre: 'YT Shorts', name: 'Car Reveal',       dur: '0:52' },
  { colorClass: 'c4', textColor: '#1e2e18', label: 'REEL',   genre: 'Instagram', name: 'Forest Walk',      dur: '0:30' },
];

const SKILLS = [
  { name: 'Premiere Pro',   width: '95%', delay: '0.1s' },
  { name: 'DaVinci Resolve',width: '90%', delay: '0.2s' },
  { name: 'After Effects',  width: '85%', delay: '0.3s' },
  { name: 'Color Grading',  width: '92%', delay: '0.4s' },
  { name: 'Sound Design',   width: '78%', delay: '0.5s' },
  { name: 'Motion Graphics',width: '80%', delay: '0.6s' },
];

const CLIENTS = ['NIKE', 'SONY', 'APPLE', 'VOGUE', 'RED BULL', 'NETFLIX', 'HBO', 'SPOTIFY'];

interface ServiceItem {
  num: string;
  icon: React.ReactNode;
  name: string;
  text: string;
}

const SERVICES: ServiceItem[] = [
  {
    num: '01',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2" y="5" width="16" height="10" rx="1" stroke="#d4401a" strokeWidth="1.5" />
        <path d="M14 10l-6 3.5V6.5L14 10z" fill="#d4401a" />
      </svg>
    ),
    name: 'Video Editing',
    text: 'Full narrative editing from assembly cut to final delivery. Pacing, rhythm, story structure — all handled with surgical precision.',
  },
  {
    num: '02',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="7" stroke="#d4401a" strokeWidth="1.5" />
        <circle cx="10" cy="10" r="3" fill="#d4401a" />
      </svg>
    ),
    name: 'Color Grading',
    text: 'Professional color correction and cinematic LUT creation in DaVinci Resolve. From log footage to ready-to-publish masters.',
  },
  {
    num: '03',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M3 14l4-4 3 3 4-6 3 4" stroke="#d4401a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    name: 'Motion Graphics',
    text: 'Animated titles, lower thirds, kinetic typography, and custom graphic packages built in After Effects.',
  },
  {
    num: '04',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M4 10a6 6 0 0012 0M10 4v12M7 6l3-3 3 3" stroke="#d4401a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    name: 'Social Reels',
    text: 'High-retention short-form content for Instagram, TikTok, and YouTube Shorts. Hook-first editing strategy that converts.',
  },
  {
    num: '05',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M3 10h3l3-6 4 12 3-6h1" stroke="#d4401a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    name: 'Sound Design',
    text: 'SFX layering, music supervision, audio mix and master. Sound that reinforces every visual decision.',
  },
  {
    num: '06',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="3" y="3" width="6" height="6" rx="1" stroke="#d4401a" strokeWidth="1.5" />
        <rect x="11" y="3" width="6" height="6" rx="1" stroke="#d4401a" strokeWidth="1.5" />
        <rect x="3" y="11" width="6" height="6" rx="1" stroke="#d4401a" strokeWidth="1.5" />
        <rect x="11" y="11" width="6" height="6" rx="1" stroke="#d4401a" strokeWidth="1.5" />
      </svg>
    ),
    name: 'VFX & Compositing',
    text: 'Green screen, tracking, rotoscoping, and compositing work to add the impossible to your footage.',
  },
];

const SOCIAL_LINKS = ['Instagram', 'Vimeo', 'LinkedIn', 'YouTube'];
const FOOTER_SOCIALS = ['Instagram', 'Vimeo', 'LinkedIn'];

// ── Sub-components ─────────────────────────────────────────

const PlayIcon = () => (
  <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
    <path d="M1 1l12 7L1 15V1z" fill="#f4f1eb" />
  </svg>
);

interface LandscapeCardProps {
  card: LandscapeCard;
}
const LandscapeCardItem = ({ card }: LandscapeCardProps) => (
  <div className={styles.cardLandscape}>
    <div
      className={`${styles.cardInner} ${styles[card.colorClass as keyof typeof styles]}`}
      style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <div className={styles.grain} />
      <span
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          color: card.textColor,
          fontSize: '1.1rem',
          letterSpacing: '.12em',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {card.label}
      </span>
    </div>
    <div className={styles.cardOverlay}>
      <div className={styles.cardGenre}>{card.genre}</div>
      <div className={styles.cardName}>{card.name}</div>
      <div className={styles.cardDur}>{card.dur}</div>
    </div>
    <div className={styles.playBtn}>
      <PlayIcon />
    </div>
  </div>
);

interface PortraitCardProps {
  card: PortraitCard;
}
const PortraitCardItem = ({ card }: PortraitCardProps) => (
  <div className={styles.cardPortrait}>
    <div
      className={`${styles.cardInner} ${styles[card.colorClass as keyof typeof styles]}`}
      style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <div className={styles.grain} />
      <span
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          color: card.textColor,
          fontSize: '1rem',
          letterSpacing: '.12em',
          position: 'relative',
          zIndex: 2,
          writingMode: 'vertical-rl',
        }}
      >
        {card.label}
      </span>
    </div>
    <div className={styles.cardOverlay}>
      <div className={styles.cardGenre}>{card.genre}</div>
      <div className={styles.cardName}>{card.name}</div>
      <div className={styles.cardDur}>{card.dur}</div>
    </div>
  </div>
);

// ── Main Component ─────────────────────────────────────────

const VideoEditingMotionGraphics = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const skillsGridRef = useRef<HTMLDivElement>(null);

  // Custom cursor
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const onMove = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };
    document.addEventListener('mousemove', onMove);

    const interactables = document.querySelectorAll('a, button, .card-landscape, .card-portrait');
    const onEnter = () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(3)';
      cursor.style.opacity = '0.5';
    };
    const onLeave = () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(1)';
      cursor.style.opacity = '1';
    };
    interactables.forEach((el) => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    return () => {
      document.removeEventListener('mousemove', onMove);
      interactables.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);

  // Skill bar animation on scroll into view
  useEffect(() => {
    const grid = skillsGridRef.current;
    if (!grid) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.querySelectorAll<HTMLElement>(`.${styles.skillFill}`).forEach((f) => {
              f.style.animation = 'none';
              void f.offsetHeight; // reflow
              f.style.animation = '';
            });
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(grid);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Custom cursor */}
      <div className={styles.cursorDot} ref={cursorRef} />

      {/* NAV */}
      {/* <nav className={styles.nav}>
        <div className={styles.logo}>FRAME</div>
        <ul className={styles.navList}>
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className={styles.navLink}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav> */}

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroLeft}>
          <div className={styles.heroTag}>Available for projects — 2026</div>
          <h1 className={styles.heroTitle}>
            VISUAL<br />
            <span>STORIES</span><br />
            TOLD<br />
            RIGHT
          </h1>
          <p className={styles.heroSub}>
            Award-winning video editor crafting cinematic narratives for brands, artists, and agencies worldwide.
          </p>
          <div className={styles.heroCta}>
            <a href="#work" className={styles.btnPrimary}>View Reel</a>
            <a href="#contact" className={styles.btnGhost}>Get in Touch</a>
          </div>
        </div>

        <div className={styles.heroRight}>
          <div className={styles.heroReel}>
            {/* Clip 1: tall */}
            <div className={styles.heroClip} style={{ gridRow: 'span 2', background: '#1a1211' }}>
              <div className={`${styles.clipPlaceholder} ${styles.c1}`} style={{ height: '100%' }}>
                <div className={styles.noise} />
                <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
                  <div
                    style={{
                      fontSize: '3rem',
                      color: '#3a2e28',
                      fontFamily: "'Bebas Neue', sans-serif",
                      lineHeight: 1,
                    }}
                  >
                    REEL<br />2026
                  </div>
                </div>
              </div>
            </div>
            {/* Clip 2 */}
            <div className={styles.heroClip} style={{ background: '#0e1a1c' }}>
              <div className={`${styles.clipPlaceholder} ${styles.c2}`} style={{ height: '100%' }}>
                <div className={styles.noise} />
              </div>
            </div>
            {/* Clip 3 */}
            <div className={styles.heroClip} style={{ background: '#1c100f' }}>
              <div className={`${styles.clipPlaceholder} ${styles.c3}`} style={{ height: '100%' }}>
                <div className={styles.noise} />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.heroStats}>
          {STATS.map((s) => (
            <div key={s.label}>
              <div className={styles.statNum}>{s.num}</div>
              <div className={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TICKER */}
      <div className={styles.ticker}>
        <div className={styles.tickerInner}>
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <>
            <span  key={i}>
              {item}
              <span className={styles.accent}> ✦ </span>
            </span>
            
            </>
          ))}
        </div>
      </div>

      {/* LANDSCAPE REEL */}
      <section className={styles.reelSection} id="work">
        <div className={styles.reelHeader}>
          <div>
            <div className={styles.sectionLabel}>Landscape Projects</div>
            <h2 className={styles.reelTitle}>CINEMATIC<br />WORK</h2>
          </div>
          <p className={styles.reelDesc}>
            Feature films, commercials, and brand films crafted for the big screen experience.
          </p>
        </div>

        {/* Rail 1 — scroll left */}
        <div className={styles.railWrap}>
          <div className={styles.rail}>
            {[...LANDSCAPE_CARDS_ROW1, ...LANDSCAPE_CARDS_ROW1].map((card, i) => (
              <LandscapeCardItem key={i} card={card} />
            ))}
          </div>
        </div>

        <div className={styles.railSpacer} />

        {/* Rail 2 — scroll right */}
        <div className={styles.railWrap}>
          <div className={`${styles.rail} ${styles.reverse}`}>
            {[...LANDSCAPE_CARDS_ROW2, ...LANDSCAPE_CARDS_ROW2].map((card, i) => (
              <LandscapeCardItem key={i} card={card} />
            ))}
          </div>
        </div>
      </section>

      <div className={styles.divider} />

      {/* PORTRAIT REEL */}
      <section className={styles.reelSection}>
        <div className={styles.reelHeader}>
          <div>
            <div className={styles.sectionLabel}>Portrait &amp; Social</div>
            <h2 className={styles.reelTitle}>VERTICAL<br />FORMAT</h2>
          </div>
          <p className={styles.reelDesc}>
            Reels, TikTok edits, and short-form content designed to stop the scroll.
          </p>
        </div>

        <div className={styles.railWrap}>
          <div className={styles.rail} style={{ animationDuration: '30s' }}>
            {[...PORTRAIT_CARDS, ...PORTRAIT_CARDS].map((card, i) => (
              <PortraitCardItem key={i} card={card} />
            ))}
          </div>
        </div>
      </section>

      <div className={styles.divider} />

      {/* ABOUT */}
      <section className={styles.aboutSection} id="about">
        <div className={styles.aboutLeft}>
          <div className={styles.sectionLabel}>About</div>
          <h2 className={styles.aboutHeading}>
            THE PERSON<br />BEHIND<br />THE CUT
          </h2>
          <p className={styles.aboutText}>
            I'm Vaishnav Iyer, a video editor with 3 years of experience turning raw footage into emotional
            experiences. From 30-second ads to feature-length documentaries, I believe every frame has a purpose.
          </p>
          <p className={styles.aboutText}>
            My approach is rooted in storytelling first — the technical craft follows. I work closely with directors,
            brands, and creatives to find the edit that amplifies their vision.
          </p>
          <div className={styles.heroCta} style={{ marginTop: '2.5rem' }}>
            <a href="#contact" className={styles.btnPrimary}>Hire Me</a>
          </div>
        </div>

        <div className={styles.aboutRight}>
          <div className={styles.sectionLabel}>Skills</div>
          <div className={styles.skillsGrid} ref={skillsGridRef}>
            {SKILLS.map((skill) => (
              <div key={skill.name}>
                <div className={styles.skillName}>{skill.name}</div>
                <div className={styles.skillBar}>
                  <div
                    className={styles.skillFill}
                    style={{ width: skill.width, animationDelay: skill.delay }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className={styles.clientsRow}>
            <div className={styles.sectionLabel}>Clients</div>
            <div className={styles.clientsList}>
              {CLIENTS.map((c) => (
                <span key={c} className={styles.clientName}>{c}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className={styles.divider} />

      {/* SERVICES */}
      <section className={styles.servicesSection} id="services">
        <div className={styles.sectionLabel}>Services</div>
        <h2 className={styles.reelTitle}>WHAT I DO</h2>
        <div className={styles.servicesGrid}>
          {SERVICES.map((svc) => (
            <div key={svc.num} className={styles.serviceCard}>
              <div className={styles.serviceNum}>{svc.num}</div>
              <div className={styles.serviceIcon}>{svc.icon}</div>
              <div className={styles.serviceName}>{svc.name}</div>
              <p className={styles.serviceText}>{svc.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section className={styles.contactSection} id="contact">
        <div className={styles.sectionLabel} style={{ justifyContent: 'center', marginBottom: '2rem' }}>
          Let's Work Together
        </div>
        <h2 className={styles.contactHeading}>
          GOT A<br />PROJECT<br />IN MIND?
        </h2>
        <p className={styles.contactSub}>
          I'm open for freelance work. Drop me a message and let's create something extraordinary.
        </p>
        <a href="mailto:pixcelcypher@gmail.com" className={styles.emailLink}>
         pixcelcypher@gmail.com
        </a>

        <div className={styles.socialLinks}>
          {SOCIAL_LINKS.map((s) => (
            <a key={s} href="#" className={styles.socialLink}>{s}</a>
          ))}
        </div>
      </section>

      {/* FOOTER
      <footer className={styles.footer}>
        <div className={styles.footerCopy}>© 2025 Alex Mercer — FRAME. All rights reserved.</div>
        <div className={styles.footerSocials}>
          {FOOTER_SOCIALS.map((s) => (
            <a key={s} href="#">{s}</a>
          ))}
        </div>
      </footer> */}
    </>
  );
};

export default VideoEditingMotionGraphics;
