import styles from './Marquee.module.scss';

interface MarqueeProps {
  items?: string[];
  speed?: number;
  reverse?: boolean;
}

const DEFAULT_ITEMS = [
  'Graphic Design',
  'Motion Graphics',
  'Brandings',
  'Website Design',
  'Video Editing',
  'Motion Direction',
  '3D Generative',
  'Brand Toolkits',
  'Promotional Reels',
  'Portfolio Building',
];

export default function Marquee({
  items = DEFAULT_ITEMS,
  speed = 30,
  reverse = false,
}: MarqueeProps) {
  const allItems = [...items, ...items];

  return (
    <div className={styles.wrapper}>
      <div className={styles.dividerLine} />
      <div
        className={`${styles.track} ${reverse ? styles.trackReverse : ''}`}
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