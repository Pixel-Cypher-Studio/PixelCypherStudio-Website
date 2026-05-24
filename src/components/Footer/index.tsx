import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.scss';

const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/pixelcypherstudio/' },
  { label: 'ArtStation', href: '' },
  { label: 'Behance', href: '' },
  { label: 'Vimeo', href: '' },
];

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Studio', href: '/studio' },
  // { label: 'Lab', href: '/lab' },
  { label: 'Contact', href: '/contact' },
];

// const legalLinks = [
//   { label: 'Archive', href: '' },
//   { label: 'Process', href: '' },
//   { label: 'Careers', href: '' },
//   { label: 'Privacy', href: '' },
// ];

function FooterItem({ label, href, className }: { label: string; href: string; className: string }) {
  if (!href || href === '#') {
    return <span className={`${className} ${styles.inactiveLink}`}>{label}</span>;
  }

  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className={styles.footer} id="contact">
      <div className="container pt-16 pb-8">
        <div className={styles.top}>
          <div className="flex flex-col gap-5 max-w-80">
            <Link href="/" className="flex items-center gap-2.5 no-underline">
              <span className={styles.logoMark}>
                <Image
                  src="/images/logo/pixelcypherstudio.webp"
                  alt="Pixel Cypher Studio logo"
                  fill
                  sizes="36px"
                  className={styles.logoImage}
                />
              </span>
              <span className={styles.logoName}>PIXELCYPHER STUDIO</span>
            </Link>

            <p className={styles.tagline}>
              A hyper-kinetic design studio crafting brands that move — digital motion,
              neon aesthetics, and immersive identities.
            </p>

            <div className={styles.status}>
              <span className={styles.statusDot} />
              <span>Accepting New Projects</span>
            </div>
          </div>

          <nav className="flex flex-col gap-5">
            <span className="label-caps">Navigation</span>
            <ul className="flex flex-col gap-3">
              {navLinks.map(({ label, href }) => (
                <li key={label}>
                  <FooterItem label={label} href={href} className={styles.footerLink} />
                </li>
              ))}
            </ul>
          </nav>

          <nav className="flex flex-col gap-5">
            <span className="label-caps">Find Us</span>
            <ul className="flex flex-col gap-3">
              {socialLinks.map(({ label, href }) => (
                <li key={label}>
                  <FooterItem label={label} href={href} className={styles.footerLink} />
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copy}>©{new Date().getFullYear()} PixelCypherStudio. All rights reserved.</p>
          {/* <ul className={styles.legal}>
            {legalLinks.map(({ label, href }) => (
              <li key={label}>
                <FooterItem label={label} href={href} className={styles.legalLink} />
              </li>
            ))}
          </ul> */}
        </div>
      </div>
    </footer>
  );
}