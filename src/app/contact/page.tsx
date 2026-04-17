import type { Metadata } from 'next';
import Marquee from '@/components/Marquee';
import ContactMailLink from '@/components/ContactMailLink';
import styles from './contact.module.scss';

export const metadata: Metadata = {
  title: 'Contact — PixelCypher',
  description:
    'Start a conversation with PixelCypher Studio about graphic design, motion graphics, video editing, and web development.',
};

const contactMarqueeItems = [
  'Graphic Design',
  'Motion Graphics',
  'Video Editing',
  'Web Development',
  'Brand Systems',
  'Digital Production',
];

const contactDetails = [
  {
    label: 'Primary Email',
    value: 'pixelcypherstudio@gmail.com',
  },
  {
    label: 'Availability',
    value: 'Accepting new projects',
  },
  {
    label: 'Response Window',
    value: 'Usually within 24 to 48 hours',
  },
];

export default function ContactPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.bgOrbs} aria-hidden="true">
            <div className={`${styles.orb} ${styles.orbBlue}`} />
            <div className={`${styles.orb} ${styles.orbRed}`} />
          </div>

          <span className="label-caps">Contact</span>

          <h1 className={styles.headline}>
            Let&apos;s Build
            <br />
            <span className="kinetic-text">Something Precise.</span>
          </h1>

          <p className={styles.sub}>
            If you need a sharper visual identity, stronger motion content, or a
            high-performance website, send us the brief and we&apos;ll take it from
            there.
          </p>

          <div className={styles.actions}>
            <ContactMailLink
              email="hello@pixelcypherstudio.com"
              subject="Project Inquiry"
              body="Hi PixelCypher Studio,%0D%0A%0D%0AI would like to discuss a project."
              className={styles.primaryCta}
            >
              Mail Us
            </ContactMailLink>

            <a href="#contact-details" className={styles.secondaryCta}>
              View Contact Info
            </a>
          </div>
        </div>
      </section>

      <Marquee items={contactMarqueeItems} speed={26} reverse />

      <section className={styles.section} id="contact-details">
        <div className={`container ${styles.grid}`}>
          <div className={styles.copyBlock}>
            <span className="label-caps">How We Work</span>
            <h2 className={styles.sectionTitle}>
              Clear Inputs.
              <br />
              Strong Output.
            </h2>
            <p className={styles.sectionBody}>
              The best collaborations start with clarity. Share your goals,
              timelines, references, and technical requirements, and we&apos;ll
              respond with the right direction for the project.
            </p>
          </div>

          <div className={styles.infoPanel}>
            {contactDetails.map((item) => (
              <div key={item.label} className={styles.infoRow}>
                <span className={styles.infoLabel}>{item.label}</span>
                <span className={styles.infoValue}>{item.value}</span>
              </div>
            ))}

            <div className={styles.infoActions}>
              <ContactMailLink
                email="hello@pixelcypherstudio.com"
                subject="Project Inquiry"
                body="Hi PixelCypher Studio,%0D%0A%0D%0AI would like to discuss a project."
                className={styles.inlineLink}
              >
                Start the Conversation →
              </ContactMailLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}