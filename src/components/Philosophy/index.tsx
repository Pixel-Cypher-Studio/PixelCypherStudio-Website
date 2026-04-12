import Link from 'next/link';
import styles from './Philosophy.module.scss';

export default function Philosophy() {
  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <div className={styles.inner}>
          <span className="label-caps">Studio Philosophy</span>

          <blockquote className={styles.statement}>
            We don't just build websites; we build{' '}
            <em className={styles.emphasis}>digital monoliths</em> that
            stand the test of time and trend.
          </blockquote>

          <p className={styles.body}>
            Every project begins with a question: what does this brand feel like at
            3 AM, in motion, on a screen? We work at the intersection of technical
            precision and creative chaos — rapid prototyping until the answer reveals
            itself.
          </p>

          <div className={styles.actions}>
            <Link href="/studio" className={styles.link}>
              Learn Our Process
              <span className={styles.arrow}>→</span>
            </Link>
          </div>
        </div>

        {/* Decorative element */}
        <div className={styles.decoration} aria-hidden="true">
          <div className={styles.decoLine} />
          <span className={styles.decoText}>EST. 2017</span>
          <div className={styles.decoLine} />
        </div>
      </div>
    </section>
  );
}
