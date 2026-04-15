import Image from 'next/image';
import Link from 'next/link';
import styles from './Philosophy.module.scss';

const philosophyImages = [
  {
    id: 'main',
    src: '/images/philosophy/studio-main.jpg',
    alt: 'PixelCypher studio setup',
    className: 'featureMedia',
    sizes: '(max-width: 900px) 100vw, 66vw',
  },
  {
    id: 'wave',
    src: '/images/philosophy/studio-wave.jpg',
    alt: 'Abstract light wave',
    className: 'secondaryMedia',
    sizes: '(max-width: 900px) 100vw, 33vw',
  },
  {
    id: 'abstract',
    src: '/images/philosophy/studio-abstract.jpg',
    alt: 'Abstract architectural light composition',
    className: 'secondaryMediaWide',
    sizes: '(max-width: 900px) 100vw, 66vw',
  },
];


export default function Philosophy() {
  return (
    <section className={`section ${styles.section}`}>
  <div className="container">
    <div className={styles.grid}>
  {philosophyImages.slice(0, 1).map((image) => (
    <div key={image.id} className={styles[image.className]}>
      <div className={styles.mediaFrame}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className={styles.mediaImage}
          sizes={image.sizes}
        />
      </div>
    </div>
  ))}

  <div className={styles.copyPanel}>
    <span className="label-caps">Studio Philosophy</span>

    <blockquote className={styles.statement}>
      We don't just build websites; we build{' '}
      <em className={styles.emphasis}>digital monoliths</em> that stand the test of time and trend.
    </blockquote>

    <p className={styles.body}>
      Every project begins with a question: what does this brand feel like at
      3 AM, in motion, on a screen? We work at the intersection of technical
      precision and creative chaos.
    </p>

    <Link href="/studio" className={styles.link}>
      Learn Our Process
      <span className={styles.arrow}>→</span>
    </Link>
  </div>

  {philosophyImages.slice(1).map((image) => (
    <div key={image.id} className={styles[image.className]}>
      <div className={styles.mediaFrame}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className={styles.mediaImage}
          sizes={image.sizes}
        />
      </div>
    </div>
  ))}
</div>
  </div>
</section>
  );
}
