import Link from 'next/link';
import styles from './Services.module.scss';

const services = [
  {
    id: '01',
    slug: 'VISUAL',
    subtitle: 'Graphic Design',
    accent: 'red' as const,
    href: '/capabilities/graphic-design',
    items: [
      'Brand Identity Systems',
      'Editorial & Social Assets',
      'Print and Packaging Design',
    ],
    description:
      'We build graphic design systems that give brands a sharper voice, clearer structure, and a more durable visual presence across every touchpoint.',
  },
  {
    id: '02',
    slug: 'MOTION',
    subtitle: 'Motion Graphics / Video Editing',
    accent: 'green' as const,
     href: '/capabilities/video-editing-motion-graphics',
    items: [
      'Motion Graphics Systems',
      'Video Editing for Campaigns',
      'Short-Form Visual Storytelling',
    ],
    description:
      'From animated brand moments to polished edits, we shape motion content that feels intentional, fast, and built for modern digital attention spans.',
  },
  {
    id: '03',
    slug: 'BUILD',
    subtitle: 'Web Development',
    accent: 'blue' as const,
    href: '/capabilities/web-development',
    items: [
      'Responsive Frontend Development',
      'Backend and API Integration',
      'Performance-Focused Delivery',
    ],
    description:
      'We develop modern web experiences that are visually refined, technically reliable, and engineered to perform smoothly across devices.',
  },
];

export default function Services() {
  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <div className="section-header mb-16">
          <span className="label-caps">What We Do</span>
          <h2 className="section-heading max-w-[400px]">
            Three Pillars.
            <br />
            One Vision.
          </h2>
        </div>

        <div className={styles.grid}>
          {services.map(({ id, slug, subtitle, accent, items, description, href }) => {
            const content = (
              <>
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
              </>
            );

            if (href) {
              return (
                <Link
                  key={id}
                  href={href}
                  className={`card-base py-9 px-8 flex flex-col gap-6 ${styles[`card--${accent}`]}`}
                  aria-label={`Open ${subtitle} capability page`}
                >
                  {content}
                </Link>
              );
            }

            return (
              <article key={id} className={`card-base py-9 px-8 flex flex-col gap-6 ${styles[`card--${accent}`]}`}>
                {content}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}