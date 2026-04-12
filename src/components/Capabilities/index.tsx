import styles from './Capabilities.module.scss';

const capabilities = [
  {
    number: '01',
    title: 'Motion Direction',
    description:
      'Animation systems, kinetic typography, and motion-driven brand experiences that pulse with life.',
    accent: 'red' as const,
    tags: ['Brand Animation', 'UI Motion', 'Title Sequences'],
  },
  {
    number: '02',
    title: '3D Generative',
    description:
      'Procedural environments, generative art installations, and immersive 3D brand worlds built to scale.',
    accent: 'green' as const,
    tags: ['CGI', 'WebGL', 'Procedural Art'],
  },
  {
    number: '03',
    title: 'Core Lab',
    description:
      'R&D division for experimental interfaces, emerging tech integrations, and digital innovation at the frontier.',
    accent: 'blue' as const,
    tags: ['R&D', 'Emerging Tech', 'Prototyping'],
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
          {capabilities.map(({ number, title, description, accent, tags }) => (
            <article key={number} className={`${styles.card} ${styles[`card--${accent}`]}`}>
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
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
