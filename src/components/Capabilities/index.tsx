import styles from './Capabilities.module.scss';
import Link from 'next/link';

const capabilities = [
  {
    number: '01',
    title: 'Graphic Design',
    description:
      'Visual identity systems, typography, and high-impact brand communication crafted for clarity, consistency, and cultural relevance.',
    accent: 'red' as const,
    tags: ['Brand Identity', 'Typography', 'Visual Systems'],
  },
  {
    number: '02',
    title: 'Motion Graphics / Video Editing',
    description:
      'Narrative-driven motion design, cinematic editing, and dynamic visual storytelling engineered for engagement across digital platforms.',
    accent: 'green' as const,
    tags: ['Motion Design', 'Video Editing', 'Storytelling'],
  },
  {
    number: '03',
    title: 'Web Development',
    description:
      'Scalable web architectures, interactive front-end systems, and performance-optimized digital experiences built with modern technologies.',
    accent: 'blue' as const,
    tags: ['Frontend', 'Backend', 'Performance'],
  },
];

export default function Capabilities() {
  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <div className={styles.header}>
          <span className="label-caps">Our Capabilities</span>
          <h2 className={styles.title}>
            What We<br />
            Bring to the Table
          </h2>
        </div>

        <div className={styles.grid}>
          {capabilities.map(({ number, title, description, accent, tags }) => {
  const cardContent = (
    <>
      <div className={styles.cardTop}>
        <span className={styles.number}>{number} //</span>
        <div className={`${styles.accentDot} ${styles[`dot--${accent}`]}`} />
      </div>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardDesc}>{description}</p>
      <div className={styles.tags}>
        {tags.map((tag) => (
          <span key={tag} className={styles.tag}>{tag}</span>
        ))}
      </div>
    </>
  );

  if (title === 'Web Development') {
    return (
      <Link
        key={number}
        href="/capabilities/web-development"
        className={`${styles.card} ${styles[`card--${accent}`]}`}
        aria-label="Open Web Development capability page"
      >
        {cardContent}
      </Link>
    );
  }

  return (
    <article key={number} className={`${styles.card} ${styles[`card--${accent}`]}`}>
      {cardContent}
    </article>
  );
})}
        </div>
      </div>
    </section>
  );
}
