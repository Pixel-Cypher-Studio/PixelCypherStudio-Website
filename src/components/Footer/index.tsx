import Link from 'next/link';
import styles from './Footer.module.scss';

const socialLinks = [
  { label: 'Instagram',  href: '#' },
  { label: 'ArtStation', href: '#' },
  { label: 'Behance',    href: '#' },
  { label: 'Vimeo',      href: '#' },
];

const navLinks = [
  { label: 'Work',    href: '/work'   },
  { label: 'Studio',  href: '/studio' },
  { label: 'Lab',     href: '/lab'    },
  { label: 'Contact', href: '#contact'},
];

const legalLinks = [
  { label: 'Archive',  href: '#' },
  { label: 'Process',  href: '#' },
  { label: 'Careers',  href: '#' },
  { label: 'Privacy',  href: '#' },
];

export default function Footer() {
  return (
    <footer className={styles.footer} id="contact">
      <div className={`container ${styles.inner}`}>
        {/* Top section */}
        <div className={styles.top}>
          {/* Brand */}
          <div className={styles.brand}>
            <Link href="/" className={styles.logo}>
              <span className={styles.logoMark}>PC</span>
              <span className={styles.logoName}>PIXEL CYPHER</span>
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

          {/* Nav */}
          <nav className={styles.navCol}>
            <span className="label-caps">Navigation</span>
            <ul className={styles.linkList}>
              {navLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className={styles.footerLink}>{label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social */}
          <nav className={styles.navCol}>
            <span className="label-caps">Find Us</span>
            <ul className={styles.linkList}>
              {socialLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className={styles.footerLink} target="_blank" rel="noopener noreferrer">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom bar */}
        <div className={styles.bottom}>
          <p className={styles.copy}>©{new Date().getFullYear()} PixelCypher. All rights reserved.</p>
          <ul className={styles.legal}>
            {legalLinks.map(({ label, href }) => (
              <li key={label}>
                <Link href={href} className={styles.legalLink}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
