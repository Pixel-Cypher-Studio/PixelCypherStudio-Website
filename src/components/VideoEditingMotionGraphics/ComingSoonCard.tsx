import Image from 'next/image';
import styles from './videoeditingmotiongraphics.module.scss';

interface ComingSoonCardProps {
  label: string;
  genre: string;
  name: string;
  dur: string;
  index: number;
}

export default function ComingSoonCard({ label, genre, name, dur, index }: ComingSoonCardProps) {
  return (
    <div className={styles.cardLandscape}>
      <div className={styles.comingSoonCard}>
        {/* Coming Soon Image */}
        <div className={styles.comingSoonImage}>
          <Image
            src="/images/sample_images/coming_soon.png" 
            alt="Coming Soon"
            fill
            className={styles.comingSoonImg}
            sizes="(max-width: 768px) 100vw, 25vw"
          />
        </div>
        
        {/* Overlay Content */}
        <div className={styles.comingSoonOverlay}>
          <div className={styles.comingSoonLabel}>{label}</div>
          <div className={styles.comingSoonGenre}>{genre}</div>
          <div className={styles.comingSoonName}>{name}</div>
          <div className={styles.comingSoonDur}>{dur}</div>
        </div>
        
        {/* Play Icon (disabled state) */}
        <div className={styles.playBtnDisabled}>
          <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
            <path d="M1 1l12 7L1 15V1z" fill="#6b7280" />
          </svg>
        </div>
      </div>
    </div>
  );
}
