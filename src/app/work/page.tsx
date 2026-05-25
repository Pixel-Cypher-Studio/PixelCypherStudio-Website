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
        <div className={`container page-hero-inner max-w-[760px] ${styles.heroInner}`}>
          <span className="label-caps">Selected Projects</span>
          <h1 className="page-headline">
            Work That<br />
            <span className="kinetic-text">Speaks First.</span>
          </h1>
          <p className="page-sub max-w-[520px]">
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
