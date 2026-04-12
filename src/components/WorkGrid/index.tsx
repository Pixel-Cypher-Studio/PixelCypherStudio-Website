import styles from './WorkGrid.module.scss';

const projects = [
  {
    id: '01',
    title: 'Cyber-Ether Shell',
    category: 'Global Branding / UI-UX',
    year: '2024',
    accent: 'red' as const,
    size: 'large' as const,
    description: 'A complete digital rebrand for a global tech company — from visual identity to a fully-interactive product UI, executed in 6 weeks.',
  },
  {
    id: '02',
    title: 'Kinetic Drift',
    category: 'TV Commercial / VFX',
    year: '2023',
    accent: 'green' as const,
    size: 'small' as const,
    description: 'High-octane visual effects for an automotive launch campaign, featuring 3D particle simulations and real-time rendering.',
  },
  {
    id: '03',
    title: 'Synth-Grid Pro',
    category: 'Hardware / App Interface',
    year: '2024',
    accent: 'blue' as const,
    size: 'small' as const,
    description: 'Interface design for a professional synthesizer — bridging hardware aesthetics with modern touch-first software.',
  },
  {
    id: '04',
    title: 'Void Protocol',
    category: 'Immersive Website / VR',
    year: '2024',
    accent: 'red' as const,
    size: 'large' as const,
    description: 'WebGL-powered immersive experience for a luxury lifestyle brand — full 3D environment navigation with spatial audio.',
  },
];

export default function WorkGrid() {
  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <div className={styles.header}>
          <span className="label-caps">All Projects</span>
          <h2 className={styles.title}>Selected Work</h2>
        </div>

        <div className={styles.grid}>
          {projects.map(({ id, title, category, year, accent, size, description }) => (
            <article
              key={id}
              className={`${styles.card} ${styles[`card--${size}`]} ${styles[`card--${accent}`]}`}
            >
              {/* Placeholder image area */}
              <div className={`${styles.visual} ${styles[`visual--${accent}`]}`}>
                <span className={styles.visualNum}>{id}</span>
                <div className={`${styles.visualOrb} ${styles[`visualOrb--${accent}`]}`} />
              </div>

              <div className={styles.info}>
                <div className={styles.meta}>
                  <span className={`${styles.category} ${styles[`cat--${accent}`]}`}>
                    {category}
                  </span>
                  <span className={styles.year}>{year}</span>
                </div>
                <h3 className={styles.cardTitle}>{title}</h3>
                <p className={styles.cardDesc}>{description}</p>
              </div>

              <div className={styles.cardFooter}>
                <span className={styles.viewLabel}>View Case Study</span>
                <svg
                  className={styles.arrowIcon}
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
