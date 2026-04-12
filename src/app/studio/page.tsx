import Services from '@/components/Services';
import Philosophy from '@/components/Philosophy';
import Marquee from '@/components/Marquee';
import styles from './studio.module.scss';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Studio — PixelCypher',
  description: 'A high-fidelity digital craft house at the intersection of brutalist architecture and neon aesthetics.',
};

const studioMarqueeItems = [
  'Visual Design',
  'Motion Systems',
  'Web Engines',
  'Brand Identity',
  'Digital Craft',
  'R&D Lab',
];

export default function StudioPage() {
  return (
    <>
      {/* Page hero */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          {/* Background decoration */}
          <div className={styles.bgOrbs} aria-hidden="true">
            <div className={`${styles.orb} ${styles.orbRed}`}  />
            <div className={`${styles.orb} ${styles.orbGreen}`} />
          </div>

          <span className="label-caps">Our Studio</span>
          <h1 className={styles.headline}>
            A High-Fidelity<br />
            <span className="kinetic-text">Digital Craft House.</span>
          </h1>
          <p className={styles.sub}>
            At the intersection of brutalist architecture and neon aesthetics — we
            operate as a creative engine where technical precision meets relentless
            creative chaos.
          </p>

          {/* Studio philosophy pills */}
          <div className={styles.pills}>
            {['Established 2017', 'Remote-First', 'Independent Studio', 'Open to Collabs'].map(
              (pill) => (
                <span key={pill} className={styles.pill}>
                  {pill}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      <Marquee items={studioMarqueeItems} speed={28} reverse />
      <Services />
      <Philosophy />
    </>
  );
}
