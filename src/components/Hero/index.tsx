import Link from 'next/link';
import HeroScene from '@/components/HeroScene';
import styles from './Hero.module.scss';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <HeroScene />

      {/* RGB ambient orbs */}
      <div className={styles.orbs} aria-hidden="true">
        <div className={`${styles.orb} ${styles.orbRed}`}    />
        <div className={`${styles.orb} ${styles.orbGreen}`}  />
        <div className={`${styles.orb} ${styles.orbBlue}`}   />
      </div>

      <div className={`container ${styles.content}`}>
        {/* Studio label */}
        <div className={styles.label}>
          <span className={styles.labelDot} />
          <span className="label-caps">A Hyper-Kinetic Design Studio</span>
        </div>

        {/* Main headline */}
        <h1 className={styles.headline}>
          We Craft<br />
          <span className="kinetic-text">Brands That</span><br />
          Move.
        </h1>

        {/* Subheadline */}
        <p className={styles.sub}>
          Specializing in digital motion, neon aesthetics, and immersive brand
          identities that break through the noise.
        </p>

        {/* CTAs */}
        <div className={styles.actions}>
          <Link href="#" className={styles.ctaPrimary}>
            View Reel
            <span className={styles.arrow}>→</span>
          </Link>
          <Link href="/contact" className={styles.ctaSecondary}>
           Contact
          </Link>
        </div>

        {/* Stats row */}
        <div className={styles.stats}>
          {[
            // { value: '7+',  label: 'Years'    },
            // { value: '120', label: 'Projects' },
            // { value: '40+', label: 'Clients'  },
          ].map(({ value, label }) => (
            <div key={label} className={styles.stat}>
              <span className={styles.statValue}>{value}</span>
              <span className={styles.statLabel}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollHint} aria-hidden="true">
        <span className={styles.scrollLine} />
        <span className="label-caps" style={{ fontSize: '0.625rem' }}>Scroll</span>
      </div>
    </section>
  );
}
