'use client';

import { useState } from 'react';
import styles from './graphicdesign.module.scss';

const processSteps = [
  {
    num: '01',
    title: 'Discovery & Strategy',
    desc: 'We dig into your business, audience, and competitive landscape. We understand the cultural and market context before a single pixel is drawn.',
  },
  {
    num: '02',
    title: 'Concept Development',
    desc: 'Multiple distinct directions — no lazy variations of the same idea. Each concept is a fully resolved strategic position, not just an aesthetic preference.',
  },
  {
    num: '03',
    title: 'Refinement & Feedback',
    desc: 'We iterate with purpose. Every round of feedback is an opportunity to sharpen — not just change. We push for the best version, not just approval.',
  },
  {
    num: '04',
    title: 'System Build & Delivery',
    desc: 'Production files, brand guidelines, usage rules, and everything your team needs to deploy the identity confidently across every touchpoint.',
  },
];

const services = [
  { num: '01 //', icon: '⬡', title: 'Brand Identity', desc: 'Logo design, brand mark systems, and visual identity frameworks that define how your brand lives across every surface.', tags: ['Logo Design', 'Brand Mark', 'Identity System'], color: 'sc-green' },
  { num: '02 //', icon: 'Aa', title: 'Typography & Type', desc: 'Custom typeface selection, typographic hierarchy, and lettering that gives your brand an unmistakable voice.', tags: ['Type Systems', 'Lettering', 'Hierarchy'], color: 'sc-purple' },
  { num: '03 //', icon: '◉', title: 'Color & Visual Language', desc: 'Systematic color palettes, icon families, and graphic vocabularies that keep every brand expression consistent.', tags: ['Color Palettes', 'Iconography', 'Visual System'], color: 'sc-pink' },
  { num: '04 //', icon: '▦', title: 'Brand Guidelines', desc: 'Comprehensive brand bibles that document every rule, ratio, and spec so your identity stays sharp at scale.', tags: ['Style Guide', "Do's & Don'ts", 'Brand Bible'], color: 'sc-cyan' },
  { num: '05 //', icon: '⬜', title: 'Print & Collateral', desc: 'Business cards, stationery, posters, and physical brand assets crafted to make a tactile statement.', tags: ['Print Design', 'Stationery', 'Posters'], color: 'sc-yellow' },
  { num: '06 //', icon: '◧', title: 'Social & Digital Assets', desc: 'Template systems, social kits, and digital-first design that scales your brand across every platform.', tags: ['Social Kits', 'Templates', 'Digital Assets'], color: 'sc-orange' },
];

const portfolioItems = [
  { bg: 'pb1', pattern: 'pat1', cat: 'Brand Identity · 2025', title: 'NovaMark Financial', deco: 'BRAND' },
  { bg: 'pb2', pattern: 'pat2', cat: 'Typography · 2025', title: 'Verdia Organics', deco: 'TYPE' },
  { bg: 'pb3', pattern: 'pat3', cat: 'Packaging · 2025', title: 'Blaze Spirits Co.', deco: 'PACK' },
  { bg: 'pb4', pattern: 'pat4', cat: 'Brand System · 2024', title: 'Aether Studios', deco: 'SYS' },
  { bg: 'pb5', pattern: 'pat5', cat: 'Logo Design · 2024', title: 'Lumen Coffee', deco: 'LOGO' },
];

const tools = [
  { icon: '🅰', name: 'Illustrator' },
  { icon: '🅿', name: 'Photoshop' },
  { icon: '◻', name: 'InDesign' },
  { icon: '◈', name: 'Figma' },
  { icon: '▲', name: 'After Effects' },
  { icon: '⬡', name: 'Blender' },
  { icon: '◉', name: 'Procreate' },
  { icon: '▦', name: 'Midjourney' },
];

const pricingPlans = [
  {
    tier: 'Starter',
    amount: '25K',
    period: 'one-time project',
    features: ['Logo Design (3 concepts)', 'Brand Color Palette', 'Primary Font Selection', 'Business Card Design', { text: 'Brand Guidelines Doc', dim: true }, { text: 'Social Media Kit', dim: true }, { text: 'Packaging Design', dim: true }],
    featured: false,
  },
  {
    tier: 'Studio',
    badge: 'Most Popular',
    amount: '65K',
    period: 'one-time project',
    features: ['Logo Design (5 concepts)', 'Full Brand Identity System', 'Typography System', 'Complete Stationery Suite', 'Brand Guidelines (40+ pages)', 'Social Media Kit (10 templates)', { text: 'Packaging Design', dim: true }],
    featured: true,
  },
  {
    tier: 'Enterprise',
    amount: 'Custom',
    period: 'tailored scope',
    features: ['Full Brand Strategy Workshop', 'Complete Identity System', 'Packaging & Print Design', 'Brand Guidelines (80+ pages)', 'Motion Identity Elements', 'Ongoing Brand Retainer Option', 'Dedicated Art Director'],
    featured: false,
  },
];

const tickerItems = ['Brand Identity', 'Logo Design', 'Typography Systems', 'Brand Guidelines', 'Visual Communication', 'Packaging Design', 'Print & Digital', 'Brand Strategy', 'Art Direction'];

function makeOrbit(label: string, labelStep: number, radius: number, fontSize = 16) {
  const fillStep = (fontSize * 0.6 * 180) / (Math.PI * radius);
  const labelChars = Array.from(label).map((char, i) => ({ char, angle: i * labelStep, isFill: false }));
  const startAngle = labelChars.length * labelStep;
  const fillCount = Math.floor((360 - startAngle) / fillStep) - 2;
  const fillChars = Array.from({ length: fillCount }, (_, i) => ({ char: '─', angle: startAngle + i * fillStep, isFill: true }));
  return [...labelChars, ...fillChars];
}

export default function GraphicDesignCapabilityContent() {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  return (
    <div className={styles.page}>

      {/* <nav className={styles.nav}>
        <a href="#" className={styles.navLogo}>
          <div className={styles.logoDot} />
          PixelCypher Studio
        </a>
        <ul className={styles.navLinks}>
          <li><a href="#">Studio</a></li>
          <li><a href="#" className={styles.active}>Graphic Design</a></li>
          <li><a href="#">Motion</a></li>
          <li><a href="#">Web Dev</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
        <a href="#" className={styles.navCta}>Hire Us</a>
      </nav> */}

      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroNoise} />
        <div className={styles.heroGridLines} />
        <div className={styles.heroLeft}>
          <div className={styles.heroLabel}>Graphic Design</div>
          <h1 className={styles.heroTitle}>
            Visual<br />
            <span className={styles.lineAccent}>Identity</span><br />
            <span className={styles.lineOutline}>Systems</span>
          </h1>
          <p className={styles.heroDesc}>We build brand languages that are unmistakable — rooted in strategy, executed with obsessive precision, and built to cut through the noise.</p>
          <div className={styles.heroActions}>
            <a href="/packages" className={styles.btnPrimary}>Start a Project →</a>
            <a href="/" className={styles.btnSecondary}>View Portfolio</a>
          </div>
        </div>
        <div className={styles.heroRight}>
          <div className={styles.heroVisual}>
            <div className={styles.visualCenter}>
              <div className={styles.visualCenterIcon}>◈</div>
              <div className={styles.visualCenterLabel}>Design Core</div>
            </div>
            {/* duration 20s, start 0°  → delay 0s */}
            <div className={styles.brandOrbit} style={{ color: 'var(--accent-green)', animationDuration: '20s', animationDelay: '0s' }}>
              {makeOrbit(' BRANDING IDENTITY ', 4, 160).map(({ char, angle, isFill }, i) => (
                <span key={i} className={styles.orbitChar} style={{ transform: `rotate(${angle}deg) translateY(-160px)`, opacity: isFill ? 0.25 : 1 }}>
                  {char}
                </span>
              ))}
            </div>
            {/* duration 30s, start 90° → delay -(90/360)×30 = -7.5s */}
            <div className={styles.brandOrbit} style={{ color: 'var(--accent-purple)', animationDuration: '30s', animationDelay: '-7.5s' }}>
              {makeOrbit('TYPOGRAPHY ', 3, 200).map(({ char, angle, isFill }, i) => (
                <span key={i} className={styles.orbitChar} style={{ transform: `rotate(${angle}deg) translateY(-200px)`, opacity: isFill ? 0.25 : 1 }}>
                  {char}
                </span>
              ))}
            </div>
            {/* duration 45s, start 180° → delay -(180/360)×45 = -22.5s */}
            <div className={styles.brandOrbit} style={{ color: 'var(--accent-pink)', animationDuration: '45s', animationDelay: '-22.5s' }}>
              {makeOrbit('COLOR SYSTEMS ', 3, 240).map(({ char, angle, isFill }, i) => (
                <span key={i} className={styles.orbitChar} style={{ transform: `rotate(${angle}deg) translateY(-240px)`, opacity: isFill ? 0.25 : 1 }}>
                  {char}
                </span>
              ))}
            </div>
            {/* duration 65s, start 270° → delay -(270/360)×65 = -48.75s */}
            <div className={styles.brandOrbit} style={{ color: 'var(--accent-cyan)', animationDuration: '65s', animationDelay: '-48.75s' }}>
              {makeOrbit(' VISUAL STRATEGY ', 3, 280).map(({ char, angle, isFill }, i) => (
                <span key={i} className={styles.orbitChar} style={{ transform: `rotate(${angle}deg) translateY(-280px)`, opacity: isFill ? 0.25 : 1 }}>
                  {char}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className={styles.tickerWrap}>
        <div className={styles.tickerTrack}>
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <div key={i} className={styles.tickerItem}>
              <span className={styles.dot} />{item}
            </div>
          ))}
        </div>
      </div>


          <section id="portfolio" className={styles.portfolioSection}>
        <div className={styles.portfolioHeader}>
          <div>
            <div className={styles.sectionLabel}>Selected Work</div>
            <h2 className={styles.sectionTitle}>Recent<br />Projects</h2>
          </div>
          <a href="#" className={styles.btnSecondary}>View All Work →</a>
        </div>
        <div className={styles.portfolioGrid}>
          {portfolioItems.map((item, i) => (
            <div key={i} className={styles.portItem}>
              <div className={`${styles.portBg} ${styles[item.bg]}`}>
                <div className={`${styles.portPattern} ${styles[item.pattern]}`} />
                <div className={styles.portDeco}>{item.deco}</div>
              </div>
              <div className={styles.portOverlay} />
              <div className={styles.portInfo}>
                <div className={styles.portCat}>{item.cat}</div>
                <div className={styles.portTitle}>{item.title}</div>
              </div>
            </div>
          ))}
        </div>
      </section>


      <section id="services" className={styles.servicesSection}>
        <div className={styles.servicesHeader}>
          <div>
            <div className={styles.sectionLabel}>Our Capabilities</div>
            <h2 className={styles.sectionTitle}>What We<br />Design</h2>
          </div>
          <p className={styles.sectionSub}>Every visual touchpoint we create is a strategic act — built for clarity, cultural resonance, and lasting impact.</p>
        </div>
        <div className={styles.servicesGrid}>
          {services.map((service, i) => (
            <div key={i} className={`${styles.serviceCard} ${styles[service.color]}`}>
              <div className={styles.cardNum}>{service.num}</div>
              <span className={styles.cardIcon}>{service.icon}</span>
              <div className={styles.cardTitle}>{service.title}</div>
              <p className={styles.cardDesc}>{service.desc}</p>
              <div className={styles.cardTags}>
                {service.tags.map((tag, j) => (
                  <span key={j} className={styles.tag}>{tag}</span>
                ))}
              </div>
              <div className={styles.cardArrow}>↗</div>
            </div>
          ))}
        </div>
      </section>

      {/* <div className={styles.statsSection}>
        <div className={styles.statsGrid}>
          <div className={styles.statItem}>
            <div className={styles.statNum}>80<span className={styles.statSuffix}>+</span></div>
            <div className={styles.statLabel}>Brands Built</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNum}>6<span className={styles.statSuffix}>yr</span></div>
            <div className={styles.statLabel}>In the Industry</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNum}>100<span className={styles.statSuffix}>%</span></div>
            <div className={styles.statLabel}>Client Retention</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNum}>3<span className={styles.statSuffix}>×</span></div>
            <div className={styles.statLabel}>Avg. Brand Impact</div>
          </div>
        </div>
      </div> */}

      

      <section className={styles.processSection}>
        <div className={styles.processInner}>
          <div>
            <div className={styles.sectionLabel}>How We Work</div>
            <h2 className={styles.sectionTitle}>Our<br />Process</h2>
            <p className={styles.sectionSub}>Every great brand starts with a rigorous process — not just taste.</p>
          </div>
          <div className={styles.processSteps}>
            {processSteps.map((step, i) => (
              <div
                key={i}
                className={styles.processStep}
                onMouseEnter={() => setHoveredStep(i)}
                onMouseLeave={() => setHoveredStep(null)}
              >
                <div
                  className={styles.stepNum}
                  style={{ color: hoveredStep === i ? 'var(--accent-green)' : undefined }}
                >
                  {step.num}
                </div>
                <div className={styles.stepContent}>
                  <div
                    className={styles.stepTitle}
                    style={{ transform: hoveredStep === i ? 'translateY(-4px)' : 'translateY(0)' }}
                  >
                    {step.title}
                  </div>
                  <div
                    className={styles.stepDesc}
                    style={{
                      maxHeight: hoveredStep === i ? '200px' : '0',
                      opacity: hoveredStep === i ? 1 : 0,
                    }}
                  >
                    {step.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.toolsSection}>
        <div className={styles.toolsInner}>
          <div>
            <div className={styles.sectionLabel}>Our Toolkit</div>
            <h2 className={styles.sectionTitle}>Tools<br />We Master</h2>
            <p className={styles.sectionSub}>Industry-standard tools, wielded with precision. We don't just know the software — we push it to its limits.</p>
            <a href="#" className={styles.btnPrimary} style={{ marginTop: 40, display: 'inline-flex' }}>See Our Work →</a>
          </div>
          <div className={styles.toolsGrid}>
            {tools.map((tool, i) => (
              <div key={i} className={styles.toolItem}>
                <div className={styles.toolIcon}>{tool.icon}</div>
                <div className={styles.toolName}>{tool.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* <section className={styles.pricingSection}>
        <div className={styles.pricingHeader}>
          <div className={styles.sectionLabel}>Investment</div>
          <h2 className={styles.sectionTitle}>Transparent<br />Pricing</h2>
          <p className={styles.sectionSub}>No hidden costs. No scope creep surprises. Just clear value for exceptional design.</p>
        </div>
        <div className={styles.pricingGrid}>
          {pricingPlans.map((plan, i) => (
            <div key={i} className={`${styles.priceCard} ${plan.featured ? styles.featured : ''}`}>
              {plan.badge && <div className={styles.priceBadge}>{plan.badge}</div>}
              <div className={styles.priceTier}>{plan.tier}</div>
              <div className={styles.priceAmount}>
                {plan.amount === 'Custom' ? (
                  <span className={styles.priceCustom}>Custom</span>
                ) : (
                  <>
                    <span className={styles.priceCurrency}>₹</span>{plan.amount}
                  </>
                )}
              </div>
              <div className={styles.pricePeriod}>{plan.period}</div>
              <ul className={styles.priceFeatures}>
                {plan.features.map((feature, j) => (
                  <li key={j} className={(typeof feature === 'object' && feature.dim) ? styles.dim : ''}>
                    {typeof feature === 'string' ? feature : feature.text}
                  </li>
                ))}
              </ul>
              <a href="#" className={`${styles.priceBtn} ${plan.featured ? styles.featuredBtn : ''}`}>Get Started</a>
            </div>
          ))}
        </div>
      </section> */}

      <section className={styles.ctaSection}>
        <div className={styles.ctaBg} />
        <div className={styles.ctaInner}>
          <div className={styles.ctaEyebrow}>Ready to build something iconic?</div>
          <h2 className={styles.ctaTitle}>Your Brand.<br /><span>Unforgettable.</span></h2>
          <p className={styles.ctaSub}>We're selective about who we work with — not because we're precious, but because great brands require genuine commitment from both sides.</p>
          <div className={styles.ctaActions}>
            <a href="#" className={styles.btnPrimary}>Start Your Project →</a>
            {/* <a href="#" className={styles.btnSecondary}>See Case Studies</a> */}
          </div>
        </div>
      </section>

{/* 
      <footer className={styles.footer}>
        <div className={styles.footerLeft}>©2026 PixelCypher Studio. All rights reserved.</div>
        <div className={styles.footerStatus}>
          <div className={styles.statusDot} />
          Accepting New Projects
        </div>
      </footer> */}
    </div>
  );
}
