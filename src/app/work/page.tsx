import WorkGrid from '@/components/WorkGrid';
import Marquee from '@/components/Marquee';
import styles from './work.module.scss';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Work — PixelCypher',
  description: 'Selected projects spanning branding, motion, WebGL, and immersive digital experiences.',
};

const workMarqueeItems = [
  'Branding',
  'Motion Systems',
  'WebGL Experiences',
  'UI/UX Design',
  'Film & VFX',
  'Digital Identity',
];

export default function WorkPage() {
  return (
    <>
      {/* Page hero */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <span className="label-caps">Selected Projects</span>
          <h1 className={styles.headline}>
            Work That<br />
            <span className="kinetic-text">Speaks First.</span>
          </h1>
          <p className={styles.sub}>
            A curated archive of brand identities, motion campaigns, interactive
            experiences, and digital systems built for the relentless.
          </p>
        </div>
      </section>

      <Marquee items={workMarqueeItems} speed={25} />
      <WorkGrid />
    </>
  );
}
