import styles from './Services.module.scss';

const services = [
  {
    id: '01',
    slug: 'VISUAL',
    subtitle: 'Graphic Design',
    accent: 'red' as const,
    items: [
      'Brand Identity Systems',
      'Editorial & Typeface Design',
      'Packaging & Print Monoliths',
    ],
    description:
      'We create visual systems that feel inevitable — brand identities built to last a decade, not a quarter.',
  },
  {
    id: '02',
    slug: 'KINETIC',
    subtitle: 'Motion Systems',
    accent: 'green' as const,
    items: [
      'CGI & 3D Environment Development',
      'Dynamic UI Motion Design',
      'Brand Film Direction',
    ],
    description:
      'Motion is not decoration — it\'s communication. We animate brands with the rigor of cinematography.',
  },
  {
    id: '03',
    slug: 'TERMINAL',
    subtitle: 'Web Engines',
    accent: 'blue' as const,
    items: [
      'React & Next.js Implementation',
      'WebGL & Interactive Experiences',
      'Technical SEO & Performance',
    ],
    description:
      'Production-grade code that ships fast and scales further. From pixel-perfect UI to immersive WebGL worlds.',
  },
];

export default function Services() {
  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <div className={styles.header}>
          <span className="label-caps">What We Do</span>
          <h2 className={styles.title}>Three Pillars.<br />One Vision.</h2>
        </div>

        <div className={styles.grid}>
          {services.map(({ id, slug, subtitle, accent, items, description }) => (
            <article key={id} className={`${styles.card} ${styles[`card--${accent}`]}`}>
              {/* Accent bar */}
              <div className={`${styles.bar} ${styles[`bar--${accent}`]}`} />

              <div className={styles.cardHead}>
                <span className={styles.idTag}>{id} //</span>
                <span className={`${styles.slug} ${styles[`slug--${accent}`]}`}>{slug}</span>
              </div>

              <h3 className={styles.cardSubtitle}>{subtitle}</h3>
              <p className={styles.cardDesc}>{description}</p>

              <ul className={styles.list}>
                {items.map((item) => (
                  <li key={item} className={styles.listItem}>
                    <span className={`${styles.bullet} ${styles[`bullet--${accent}`]}`} />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
