'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import WebDevelopmentScene from '@/components/WebDevelopmentScene';
import styles from '@/app/capabilities/web-development/WebDevelopmentPage.module.scss';

type BuildMessage = {
  message: string;
  progress: number;
  phase: 'walking' | 'building' | 'complete';
  sectionIndex: number;
};

type BuildRect = {
  left: number;
  right: number;
  top: number;
  bottom: number;
  width: number;
  height: number;
};

const stats = [
  { value: 248, label: 'PROJECTS BUILT' },
  { value: 99, label: '% UPTIME SLA' },
  { value: 12, label: 'YEARS BUILDING' },
  { value: 47, label: 'ENGINEERS ON CREW' },
];

const projects = [
  {
    tag: 'WEB APP',
    title: 'CONSTRUCT OS',
    description:
      'Real-time project management built for construction firms. Used daily by 50k+ project managers worldwide.',
    accent: 'orange',
    icon: '🏗',
  },
  {
    tag: 'MOBILE',
    title: 'BOLT DELIVERY',
    description:
      'Last-mile logistics platform powering 80,000 daily active couriers across 12 metropolitan areas.',
    accent: 'blue',
    icon: '⚡',
  },
  {
    tag: 'GAME',
    title: 'PIXEL FORGE',
    description:
      'Award-winning indie tower defense with procedural pixel art generation. 200k+ downloads.',
    accent: 'teal',
    icon: '🎮',
  },
  {
    tag: 'AI PLATFORM',
    title: 'NEURAL DRAFT',
    description:
      'AI design assistant that speaks the language of pixels, vectors, and motion. Ship designs 10x faster.',
    accent: 'violet',
    icon: '🤖',
  },
];

const services = [
  {
    icon: '⚙️',
    title: 'ENGINEERING',
    description:
      'Full-stack development with battle-tested architecture. Monoliths to service layers, built to scale.',
  },
  {
    icon: '🎨',
    title: 'PIXEL DESIGN',
    description:
      'Interfaces crafted with obsessive precision. Every pixel intentional, every animation purposeful.',
  },
  {
    icon: '🚀',
    title: 'DEPLOYMENT',
    description:
      'Zero-downtime launches with CI/CD, observability, rollback safety, and production hardening.',
  },
];

const buildMessages: BuildMessage[] = [
  { message: 'LAYING FOUNDATION...', progress: 0.16, phase: 'building', sectionIndex: 0 },
  { message: 'INSTALLING COUNTERS...', progress: 0.34, phase: 'building', sectionIndex: 1 },
  { message: 'ASSEMBLING CAROUSEL...', progress: 0.58, phase: 'building', sectionIndex: 2 },
  { message: 'PLACING SERVICE CARDS...', progress: 0.82, phase: 'building', sectionIndex: 3 },
  { message: 'FINISHING FOOTER...', progress: 0.96, phase: 'building', sectionIndex: 4 },
];

const sectionCount = 5;

export default function WebDevelopmentCapabilityContent() {
  const sectionRefs = useRef<Array<HTMLElement | null>>([]);
  const [revealedSections, setRevealedSections] = useState<boolean[]>(
    Array.from({ length: sectionCount }, () => false)
  );
  const [displayStats, setDisplayStats] = useState<number[]>(stats.map(() => 0));
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [activeBuildRect, setActiveBuildRect] = useState<BuildRect | null>(null);
  const [buildState, setBuildState] = useState<BuildMessage>({
    message: 'INITIALIZING BUILD...',
    progress: 0.08,
    phase: 'walking',
    sectionIndex: 0,
  });

  const readSectionRect = (index: number) => {
    const section = sectionRefs.current[index];

    if (!section) {
      setActiveBuildRect(null);
      return;
    }

    const rect = section.getBoundingClientRect();
    setActiveBuildRect({
      left: rect.left,
      right: rect.right,
      top: rect.top,
      bottom: rect.bottom,
      width: rect.width,
      height: rect.height,
    });
  };

  useEffect(() => {
    let cancelled = false;
    let statFrameId = 0;
    const timers: number[] = [];
    const previousOverflow = document.body.style.overflow;

    const sleep = (ms: number) =>
      new Promise<void>((resolve) => {
        const timerId = window.setTimeout(() => resolve(), ms);
        timers.push(timerId);
      });

    const revealSection = (index: number) => {
      setRevealedSections((current) => current.map((shown, currentIndex) => currentIndex === index || shown));
    };

    const animateStats = () => {
      const duration = 1400;
      const startedAt = performance.now();

      const tick = (now: number) => {
        if (cancelled) {
          return;
        }

        const progress = Math.min((now - startedAt) / duration, 1);
        setDisplayStats(stats.map((stat) => Math.round(stat.value * progress)));

        if (progress < 1) {
          statFrameId = window.requestAnimationFrame(tick);
        }
      };

      statFrameId = window.requestAnimationFrame(tick);
    };

    const buildSequence = async () => {
      document.body.style.overflow = 'hidden';

      for (let index = 0; index < sectionRefs.current.length; index += 1) {
        const section = sectionRefs.current[index];

        if (!section) {
          continue;
        }

        section.scrollIntoView({
          behavior: 'smooth',
          block: index === 0 ? 'start' : 'center',
        });

        setBuildState({
          message: buildMessages[index].message,
          progress: Math.max(buildMessages[index].progress - 0.08, 0.05),
          phase: 'walking',
          sectionIndex: index,
        });

        await sleep(index === 0 ? 300 : 580);

        if (cancelled) {
          return;
        }

        readSectionRect(index);
        setBuildState(buildMessages[index]);

        await sleep(360);

        if (cancelled) {
          return;
        }

        revealSection(index);

        if (index === 1) {
          animateStats();
        }

        await sleep(index === 0 ? 500 : 780);

        if (cancelled) {
          return;
        }
      }

      setBuildState({
        message: 'BUILD COMPLETE!',
        progress: 1,
        phase: 'complete',
        sectionIndex: sectionCount - 1,
      });

      document.body.style.overflow = previousOverflow;
    };

    void buildSequence();

    return () => {
      cancelled = true;
      document.body.style.overflow = previousOverflow;
      window.cancelAnimationFrame(statFrameId);
      timers.forEach((timerId) => window.clearTimeout(timerId));
    };
  }, []);

  useEffect(() => {
    const handleViewportChange = () => {
      readSectionRect(buildState.sectionIndex);
    };

    handleViewportChange();
    window.addEventListener('resize', handleViewportChange);
    window.addEventListener('scroll', handleViewportChange, { passive: true });

    return () => {
      window.removeEventListener('resize', handleViewportChange);
      window.removeEventListener('scroll', handleViewportChange);
    };
  }, [buildState.sectionIndex]);

  const goToProject = (index: number) => {
    setActiveProjectIndex((index + projects.length) % projects.length);
  };

  return (
    <div className={styles.page}>
      <WebDevelopmentScene buildRect={activeBuildRect} buildState={buildState} />

      <div className={styles.groundLine} aria-hidden="true" />

      <main className={styles.main}>
        <section
          ref={(node) => {
            sectionRefs.current[0] = node;
          }}
          className={`${styles.hero} ${styles.buildSection} ${revealedSections[0] ? styles.sectionVisible : ''}`}
        >
          <div className={styles.heroGrid} />
          <div className={styles.heroGlow} />
          <div className={styles.heroInner}>
            <div className={styles.badge}>▶ BUILD v3.0</div>
            <h1 className={styles.title}>
              PIXEL
              <br />
              <em>BUILD</em>
            </h1>
            <p className={styles.heroSub}>
              We construct digital experiences, one pixel at a time. Fast, bold,
              and built to last on any screen.
            </p>
            <div className={styles.cta}>
              <Link href="#contact" className={styles.primaryButton}>
                START PROJECT
              </Link>
              <Link href="/work" className={styles.secondaryButton}>
                VIEW WORK ↓
              </Link>
            </div>
          </div>
        </section>

        <section
          ref={(node) => {
            sectionRefs.current[1] = node;
          }}
          className={`${styles.statsSection} ${styles.buildSection} ${revealedSections[1] ? styles.sectionVisible : ''}`}
        >
          <div className={styles.stats}>
            {stats.map((stat, index) => (
              <div key={stat.label}>
                <span className={styles.statNumber}>{displayStats[index]}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section
          ref={(node) => {
            sectionRefs.current[2] = node;
          }}
          className={`${styles.projectsSection} ${styles.buildSection} ${revealedSections[2] ? styles.sectionVisible : ''}`}
        >
          <div className={styles.sectionHeader}>
            <h2>OUR WORK</h2>
            <div className={styles.pixelLine} />
          </div>

          <div className={styles.carouselShell}>
            <div className={styles.carouselViewport}>
              <div
                className={styles.carouselTrack}
                style={{ transform: `translateX(-${activeProjectIndex * 100}%)` }}
              >
                {projects.map((project) => (
                  <article key={project.title} className={styles.slide}>
                    <div className={`${styles.slideVisual} ${styles[`accent--${project.accent}`]}`}>
                      {project.icon}
                    </div>
                    <div>
                      <span className={styles.slideTag}>{project.tag}</span>
                      <h3 className={styles.slideTitle}>{project.title}</h3>
                      <p className={styles.slideDescription}>{project.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className={styles.carouselControls}>
              <button
                type="button"
                className={styles.carouselButton}
                onClick={() => goToProject(activeProjectIndex - 1)}
                aria-label="Previous project"
              >
                ◀
              </button>

              <div className={styles.dots}>
                {projects.map((project, index) => (
                  <button
                    key={project.title}
                    type="button"
                    className={`${styles.dot} ${index === activeProjectIndex ? styles.dotActive : ''}`}
                    onClick={() => goToProject(index)}
                    aria-label={`Go to ${project.title}`}
                  />
                ))}
              </div>

              <button
                type="button"
                className={styles.carouselButton}
                onClick={() => goToProject(activeProjectIndex + 1)}
                aria-label="Next project"
              >
                ▶
              </button>
            </div>
          </div>
        </section>

        <section
          ref={(node) => {
            sectionRefs.current[3] = node;
          }}
          className={`${styles.servicesSection} ${styles.buildSection} ${revealedSections[3] ? styles.sectionVisible : ''}`}
        >
          <div className={styles.sectionHeader}>
            <h2>SERVICES</h2>
            <div className={styles.pixelLine} />
          </div>

          <div className={styles.servicesGrid}>
            {services.map((service) => (
              <article key={service.title} className={styles.card}>
                <span className={styles.cardIcon}>{service.icon}</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <div className={styles.cardBar}>
                  <div className={styles.cardBarFill} />
                </div>
              </article>
            ))}
          </div>
        </section>

        <footer
          id="contact"
          ref={(node) => {
            sectionRefs.current[4] = node;
          }}
          className={`${styles.footer} ${styles.buildSection} ${revealedSections[4] ? styles.sectionVisible : ''}`}
        >
          <div className={styles.footerLogo}>
            PIXEL<span>BUILD</span>
          </div>
          <p className={styles.footerTag}>
            © 2025 — BUILDING THE FUTURE, ONE PIXEL AT A TIME
          </p>
          <div className={styles.footerLinks}>
            <Link href="/work">WORK</Link>
            <Link href="/studio">STUDIO</Link>
            <Link href="/">HOME</Link>
            <Link href="/contact">CONTACT</Link>
          </div>
        </footer>
      </main>
    </div>
  );
}
