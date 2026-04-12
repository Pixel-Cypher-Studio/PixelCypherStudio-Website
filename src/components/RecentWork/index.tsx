import Link from 'next/link';
import styles from './RecentWork.module.scss';

const projects = [
  {
    id: '01',
    title: 'Titan-X Identity',
    category: 'Gaming / Hardware',
    year: '2024',
    accent: 'red' as const,
    description: 'Full brand identity system for a next-gen gaming hardware company — logo, motion guidelines, and launch campaign.',
  },
  {
    id: '02',
    title: 'Velocity UI Kit',
    category: 'Design System',
    year: '2024',
    accent: 'green' as const,
    description: 'A 600+ component motion-first design system built for high-performance product teams.',
  },
  {
    id: '03',
    title: 'Void Studio Lab',
    category: 'Architecture / Space',
    year: '2024',
    accent: 'blue' as const,
    description: 'Immersive digital experience for an architectural firm — WebGL environments and 3D spatial navigation.',
  },
];

export default function RecentWork() {
  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <div className={styles.header}>
          <span className="label-caps">Recent Drops</span>
          <div className={styles.headerRow}>
            <h2 className={styles.title}>Selected Work</h2>
            <Link href="/work" className={styles.viewAll}>
              View All Projects →
            </Link>
          </div>
        </div>

        <div className={styles.list}>
          {projects.map((project, index) => (
            <article key={project.id} className={styles.item}>
              <div className={styles.indexCol}>
                <span className={styles.index}>{project.id}</span>
                <div className={`${styles.indexLine} ${styles[`line--${project.accent}`]}`} />
              </div>
              <div className={styles.body}>
                <div className={styles.meta}>
                  <span className={`${styles.category} ${styles[`cat--${project.accent}`]}`}>{project.category}</span>
                  <span className={styles.year}>{project.year}</span>
                </div>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.projectDesc}>{project.description}</p>
              </div>
              <Link href="/work" className={styles.arrow} aria-label={`View ${project.title}`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
