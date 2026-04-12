import styles from './Marquee.module.scss';

interface MarqueeProps {
  items?: string[];
  speed?: number;
  reverse?: boolean;
}

const DEFAULT_ITEMS = [
  'Kinetic Motion',
  'RGB Aesthetics',
  'Digital Monoliths',
  'Pixel Perfect',
  'Motion Direction',
  '3D Generative',
];

export default function Marquee({
  items = DEFAULT_ITEMS,
  speed = 30,
  reverse = false,
}: MarqueeProps) {
  // Duplicate for seamless infinite loop: track width = 2× one copy,
  // animation moves by −50% (= one copy width), then loops invisibly.
  const allItems = [...items, ...items];

  return (
    <div className={styles.wrapper}>
      <div className={styles.dividerLine} />
      <div
        className={`${styles.track} ${reverse ? styles.trackReverse : ''}`}
        // --marquee-speed is a CSS custom property read by the animation shorthand
        style={{ '--marquee-speed': `${speed}s` } as React.CSSProperties}
      >
        {allItems.map((item, i) => (
          <span key={i} className={styles.item}>
            <span className={styles.dot} />
            {item}
          </span>
        ))}
      </div>
      <div className={styles.dividerLine} />
    </div>
  );
}
