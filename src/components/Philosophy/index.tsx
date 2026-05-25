'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import styles from './Philosophy.module.scss';
import { mediaUrl } from '@/utils/media';

const services = [
  {
    number: '01',
    title: 'BRANDING',
    description: 'Strategy-led identity systems that build recognition and trust.',
    href: '/services/branding',
    image: mediaUrl('home.philosophy.branding'),
  },
  {
    number: '02',
    title: 'PACKAGING',
    description: 'Packaging that embodies the product and elevates the experience.',
    href: '/packaging',
    image: mediaUrl('home.philosophy.packaging'),
  },
  {
    number: '03',
    title: 'MOTION GRAPHICS',
    description: 'Bringing brands to life through movement, typography and rhythm.',
    href: '/capabilities/graphic-design',
    image: mediaUrl('home.philosophy.motionGraphics'),
  },
  {
    number: '04',
    title: 'VIDEO EDITING',
    description: 'Story-driven editing that captures emotion and tells a tale.',
    href: '/capabilities/video-editing-motion-graphics',
    image: '/images/philosophy/studio-main.jpg',
  },
  {
    number: '05',
    title: 'WEB DEVELOPMENT',
    description: 'Immersive digital experiences built for performance and impact.',
    href: '/capabilities/web-development',
    image: '/images/philosophy/studio-main.jpg',
  },
];

export default function Philosophy() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <div className={`section-header ${styles.header}`}>
          <span className="label-caps">Studio Philosophy</span>
          <h2 className={styles.title}>
            We Don't Just Build Websites;<br />
            We Build <span className="kinetic-text">Digital Monoliths</span>
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {/* Top Row - 2 cards */}
          <div className={styles.topRow}>
            {services.slice(0, 2).map((service, index) => {
              const isHovered = hoveredIndex === index;
              
              return (
                <Link
                  key={service.number}
                  href={service.href}
                  className={`${styles.card} ${styles[`card--${index % 3}`]} ${styles.cardLarge}`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="absolute inset-0 w-full h-full">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className={`${styles.image} ${isHovered ? styles.imageHover : ''}`}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  
                  <div className={styles.content}>
                    <div className={styles.number}>{service.number}</div>
                    <h3 className={styles.cardTitle}>{service.title}</h3>
                    <p className={styles.cardDescription}>{service.description}</p>
                  </div>
                  
                  <div className={styles.arrowContainer}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.arrow}>
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Bottom Row - 3 cards */}
          <div className={styles.bottomRow}>
            {services.slice(2).map((service, index) => {
              const actualIndex = index + 2;
              const isHovered = hoveredIndex === actualIndex;
              
              return (
                <Link
                  key={service.number}
                  href={service.href}
                  className={`${styles.card} ${styles[`card--${actualIndex % 3}`]}`}
                  onMouseEnter={() => setHoveredIndex(actualIndex)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="absolute inset-0 w-full h-full">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className={`${styles.image} ${isHovered ? styles.imageHover : ''}`}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  
                  <div className={styles.content}>
                    <div className={styles.number}>{service.number}</div>
                    <h3 className={styles.cardTitle}>{service.title}</h3>
                    <p className={styles.cardDescription}>{service.description}</p>
                  </div>
                  
                  <div className={styles.arrowContainer}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.arrow}>
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* <div className={styles.footer}>
          <Link href="/studio" className={styles.learnMore}>
            <span className="label-caps">Explore Our Studio</span>
            <div className={styles.arrowWrapper}>
              <span className={styles.arrowLine} />
              <span className={styles.arrowHead}>→</span>
            </div>
          </Link>
        </div> */}
      </div>
    </section>
  );
}
