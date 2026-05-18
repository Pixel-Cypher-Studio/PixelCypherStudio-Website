import styles from './graphicdesign.module.scss';

const anatomyColumns = [
  {
    num: '01',
    title: 'DISCOVER',
    colorKey: 'red' as const,
    items: ['Brand Strategy & Research', 'Audience & Market Analysis', 'Competitor Benchmarking'],
  },
  {
    num: '02',
    title: 'DESIGN',
    colorKey: 'green' as const,
    items: ['Logo & Identity Design', 'Typography & Colour Systems', 'Visual Language Development'],
  },
  {
    num: '03',
    title: 'DELIVER',
    colorKey: 'blue' as const,
    items: ['Brand Guidelines Document', 'Print & Digital Assets', 'Packaging & Collateral'],
  },
];

const artifacts = [
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDyEvCZ3ku5kAnn_X2MyFFg33qhXhF98gVU4AJsNmfANzCuOXQP5jyYUbH1NQLAreknbrnoVe9xI9zL5Sh88YjgzAt4m7S18LOtLdljzsI5VcbyLW4yUd-4XfJmofchMOTPDf6qqV96WXLCUObyBkY6J1lSudHscPO4vdR5ODBt3RwqEyEqj7OZY7nITxrgJcZaMgXo3yKv03l20X-AOQVbXkJXu2K6_UcuhHyuwl7UPOJ-HNUTrigE8IiOV4DrFLPBJEJEHE4755V2',
    alt: 'Brand Identity Example',
    title: 'BRAND IDENTITY',
    desc: 'Logos, colour palettes, and typography systems built to be instantly recognisable across every format and touchpoint.',
  },
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_buveR-FuH9HimVu7lJ4CKNU94riM2PVlHaklBD6ZlPB8fyCUo_rXcX2cm1wgiVoNSTTl42Ew3njZE1gACsNgC_yu6gNzEi9EqFxV-lqydFDMz70aiUuBXLPX0djkEFN0sPs-sHP0bzBf1ZfrdZ8bwCGfHgA3M3CbhSrVERoKNuhAeAahVcDe6GcpBwSdBmm1grjRbctEYN3OhB2jMk6VSjRrzzd99x8ThOMzm895rHqyMFMXSFY0xV8e-z8i_REEyTG5KX95PhG5',
    alt: 'Print Design Example',
    title: 'PRINT DESIGN',
    desc: 'Brochures, posters, and packaging that carry your brand identity into the physical world with the same care as the digital.',
  },
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPY0_I2jPGQlA2kgsuYPeLbPxOnzRzCXiJIjw_AEQWodKFyDk2defoLun6phycIgSEj6G-EojIZjYZxIGxvlNySGzlxu0235J3MhncZCGZoi0ig2JjbS4MMBzmhebIiwU-gmi4vrzmcYkdRhag-Mx64Kuu6CzRHnkKh3NlwWuikgo9GvWggwGo_SaXhnGVXvBMuy4BlVTqMfug98DUW8flBlSLIDQ3lPOt7U371hdUX9bVE3E3RXtARDIRpmM7piklkLFcUvcrS2qo',
    alt: 'Visual Systems Example',
    title: 'VISUAL SYSTEMS',
    desc: 'Scalable design templates and guidelines so your brand looks consistent no matter who uses it or where it appears.',
  },
];

const colorClassMap = {
  red: styles.red,
  green: styles.green,
  blue: styles.blue,
};

export default function GraphicDesignCapabilityContent() {
  return (
    <div className={styles.page}>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNjhIf2dfJgujPsDazvv9OFrOYwIMXllE72-TEKsjknGP649f8L3tbamDxAGVSpvoUmAPP2fusfG71airCwuxXOehGpDLGDvRf2OT5msajseAusz0tUBCkwXVt9Q-Be-2Po6cYiKxQlasGrcbkrxxkM00yr54GJaiPJ7dyHkklaP7Xw5h-5plVKTrQHaBe1L6oIrMj1nXSOvSozn0E3FbyyVr48cD7z-QPtnHtaq8_SK7tvo6ndOyIQ_4KS7Ysd-J61JWB_9oDaU4_"
            alt=""
            className={styles.heroBgImg}
          />
        </div>

        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            MAKE YOUR <br />
            <span className={styles.gradientText}>MARK</span>
          </h1>
          <p className={styles.heroSub}>Brand identity and visual design built to last.</p>
          <div className={styles.heroScroll} aria-hidden="true">
            <svg
              className={styles.scrollArrow}
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="7 10 12 15 17 10" />
              <polyline points="7 15 12 20 17 15" />
            </svg>
          </div>
        </div>

        <div className={styles.heroFootnote} aria-hidden="true">
          <div className={styles.footnoteLine} />
          <span className={styles.footnoteText}>EST. 2026 / PIXELCYPHER</span>
        </div>
      </section>

      {/* ── Anatomy of a Brand ───────────────────────────────── */}
      <section className={styles.anatomy}>
        <div className={styles.anatomyHeader}>
          <h2 className={styles.anatomyHeadline}>
            HOW WE BUILD <br />
            <span className={styles.anatomyFaded}>YOUR BRAND</span>
          </h2>
          <p className={styles.anatomyDesc}>
            Great design starts with understanding. We learn your business, your audience, and your goals —
            then craft a visual identity that works across everything.
          </p>
        </div>

        <div className={styles.anatomyGrid}>
          {anatomyColumns.map((col) => (
            <div key={col.num} className={styles.anatomyColumn}>
              <div className={`${styles.columnTitle} ${colorClassMap[col.colorKey]}`}>
                {col.num} {col.title}
              </div>
              <ul className={styles.columnList}>
                {col.items.map((item) => (
                  <li key={item} className={styles.columnListItem}>
                    <span className={`${styles.bullet} ${colorClassMap[col.colorKey]}`} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── Iconic Artifacts ─────────────────────────────────── */}
      <section className={styles.artifacts}>
        <div className={styles.artifactsHeader}>
          <h2 className={styles.artifactsTitle}>
            <span className={styles.artifactsBar} aria-hidden="true" />
            OUR WORK
          </h2>
        </div>
        <div className={styles.artifactsGrid}>
          {artifacts.map((a) => (
            <div key={a.title} className={styles.artifactCard}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={a.src} alt={a.alt} className={styles.artifactImg} />
              <div className={styles.artifactOverlay}>
                <h3 className={styles.artifactOverlayTitle}>{a.title}</h3>
                <p className={styles.artifactOverlayDesc}>{a.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Chromatic Tension ────────────────────────────────── */}
      <section className={styles.chromatic}>
        <div className={styles.chromaticGrid}>
          <div className={styles.chromaticLeft}>
            <h2 className={styles.chromaticTitle}>
              CRAFT MEETS <br />
              <span className={styles.chromaticAccent}>STRATEGY</span>
            </h2>
            <p className={styles.chromaticBody}>
              Good design isn't decoration — it's communication. Every colour choice, typeface, and layout
              is made with your audience in mind, so your brand doesn't just look good, it actually works.
            </p>
            <div className={styles.metricsStack}>
              <div className={styles.metricRow}>
                <div className={styles.metricLabels}>
                  <span className={styles.metricLabel}>Brand Consistency</span>
                  <span className={styles.metricValue}>98%</span>
                </div>
                <div className={styles.metricTrack}>
                  <div className={`${styles.metricFill} ${styles.fillRed}`} style={{ width: '98%' }} />
                </div>
              </div>
              <div className={styles.metricRow}>
                <div className={styles.metricLabels}>
                  <span className={styles.metricLabel}>Client Satisfaction</span>
                  <span className={styles.metricValue}>96%</span>
                </div>
                <div className={styles.metricTrack}>
                  <div className={`${styles.metricFill} ${styles.fillGreen}`} style={{ width: '96%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className={styles.chromaticRight}>
            <div className={styles.glassPanel}>
              <div className={styles.technicalVisual}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMPMQcma3ZVyWk_5Qd6j4DI2vk7JY-w7WBL9ri3TjXuXTM1CbiQKsoPFNbOQaHuZRmg26xt0dqvmxqxQySU_xSjsVU6p6ghmwkUv-3VTv17w84G-DkM0AxvhYjORKqRWUthnYGqr1Zk4j49Kb-udaBDzKGP6IsaFyvCtRRudgYA67stNRM40gVJxW60WKjhTIexk2D0LWpLm_QCkTSDnHDruAQue5pcVq_mZv4LefM4xirsVT6PuhRw4qlah8d0gOeAc0VN-LsaTDR"
                  alt="Technical Grid"
                  className={styles.technicalImg}
                />
                <div className={styles.technicalBadge} aria-hidden="true">
                  DESIGN: PIXEL CYPHER STUDIO
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
