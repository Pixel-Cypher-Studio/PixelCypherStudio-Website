'use client';

import Link from 'next/link';
import { useState } from 'react';
import './packages.scss';

const tickerItems = ['Graphic Design', 'Motion Graphics', 'Video Editing', 'Web Development', 'Brand Identity', 'Packaging', 'Social Creatives', 'Reels & Shorts'];

const masterBundle = {
  badge: 'Our Most Popular Offer',
  title: 'Master Bundle',
  subtitle: 'The Full Stack',
  description: 'Everything your brand needs under one roof.',
  price: 'NA',
  timeline: 'One-time · 4-6 weeks',
  includes: [
    { icon: '🎨', color: 'purple', title: 'Graphic Design', description: 'Full brand identity.' },
    { icon: '🎬', color: 'green', title: 'Motion & Video', description: 'Motion pieces + edits.' },
    { icon: '💻', color: 'orange', title: 'Web Development', description: '5-page website.' },
  ],
  items: [
    { label: 'Brand Logo System', tag: '✓ Included', type: 'check' },
    { label: 'Brand Guidelines', tag: '✓ Included', type: 'check' },
    { label: 'Social Media Kit', tag: '✓ Included', type: 'check' },
    { label: '3× Motion Graphics', tag: '✓ Included', type: 'check' },
    { label: '2× Video Edits', tag: '✓ Included', type: 'check' },
    { label: '5-Page Website', tag: '✓ Included', type: 'check' },
    { label: 'CMS Setup', tag: '✓ Included', type: 'check' },
    { label: 'Packaging Design', tag: 'Add-on', type: 'optional' },
    { label: 'E-Commerce', tag: 'Add-on', type: 'optional' },
    { label: 'Monthly Retainer', tag: 'Custom', type: 'custom' },
  ],
  individualValue: 'NA',
  saving: 'Up to 35% off',
  total: 'NA',
};

const plans = [
  { number: '01', name: 'Brand Starter', description: 'For new businesses.', price: 'NA', color: 'purple', billing: 'One-time · 1-2 weeks', features: [{ text: 'Logo system', active: true }, { text: 'Colour guide', active: true }, { text: 'Business cards', active: true }, { text: 'Social templates', active: true }, { text: 'Brand board', active: true }, { text: 'Video/Motion', active: false }, { text: 'Web', active: false }] },
  { number: '02', name: 'Motion Studio', description: 'Storytelling in motion.', price: 'NA', color: 'green', featured: true, billing: 'One-time · 2-3 weeks', features: [{ text: '2× Motion videos', active: true }, { text: '1× Promo reel', active: true }, { text: '3× Short edits', active: true }, { text: 'Colour grade', active: true }, { text: 'Subtitles', active: true }, { text: 'Brand kit', active: true }, { text: 'Web', active: false }] },
  { number: '03', name: 'Web Launch', description: 'Performance-first website.', price: 'NA', color: 'orange', billing: 'One-time · 3-4 weeks', features: [{ text: '5-page website', active: true }, { text: 'Animations', active: true }, { text: 'Responsive', active: true }, { text: 'CMS panel', active: true }, { text: 'SEO', active: true }, { text: '1 month support', active: true }, { text: 'Motion/Video', active: false }] },
  { number: '04', name: 'Brand + Motion', description: 'Identity with motion.', price: 'NA', color: 'blue', billing: 'One-time · 3-4 weeks', features: [{ text: 'Full logo system', active: true }, { text: 'Guidelines', active: true }, { text: '2× Motion pieces', active: true }, { text: '2× Video edits', active: true }, { text: 'Social kit', active: true }, { text: 'Logo sting', active: true }, { text: 'Web', active: false }] },
  { number: '05', name: 'Motion + Web', description: 'Website with video.', price: 'NA', color: 'purple', billing: 'One-time · 4-5 weeks', features: [{ text: '5-page website', active: true }, { text: '2× Motion graphics', active: true }, { text: '3× Short edits', active: true }, { text: 'Video integration', active: true }, { text: 'CMS setup', active: true }, { text: '1 month support', active: true }, { text: 'Brand identity', active: false }] },
  { number: '06', name: 'Monthly Retainer', description: 'Dedicated hours monthly.', price: 'NA', color: 'green', billing: 'Monthly · Cancel anytime', isMonthly: true, features: [{ text: '40 hours/month', active: true }, { text: 'Graphic design', active: true }, { text: '8-12 posts', active: true }, { text: '1× Short video', active: true }, { text: 'Priority', active: true }, { text: 'Slack channel', active: true }, { text: 'Monthly call', active: true }] },
];

const addons = [
  { icon: '📦', color: 'purple', name: 'Product Packaging', description: 'Custom packaging design.', price: 'NA' },
  { icon: '⚡', color: 'green', name: 'Rush Delivery', description: 'Prioritise your project.', price: 'NA' },
  { icon: '🛒', color: 'orange', name: 'E-Commerce Store', description: 'Full online store.', price: 'NA' },
  { icon: '📱', color: 'blue', name: 'Social Media Kit', description: 'Template pack.', price: 'NA' },
  { icon: '📊', color: 'red', name: 'Pitch Deck Design', description: 'Investor-ready pitch decks that look as sharp as the idea they are presenting.', price: 'NA' },
    { icon: '🗣', color: 'blue', name: 'Brand Strategy Session', description: '2-hour guided strategy workshop — positioning, audience, tone, and market fit.', price: 'NA' },
    { icon: '🌐', color: 'blue', name: 'Domain + Hosting Setup', description: 'End-to-end domain registration, hosting configuration, and SSL certificate setup.', price: 'NA' },

];

const faqs = [
  { question: 'What payment methods do you accept?', answer: 'Bank transfers, UPI, credit cards, PayPal, Wise. 50% advance required.' },
  { question: 'How long does a project take?', answer: 'Brand Starter (1-2 weeks), Motion (2-3), Web (3-5), Master (4-6). Rush available.' },
  { question: 'Do you offer revisions?', answer: 'Yes! 2-3 rounds included in all packages.' },
  { question: 'Can I upgrade later?', answer: 'Absolutely! Upgrade or add services anytime.' },
  { question: 'What about ongoing work?', answer: 'Monthly Retainer perfect for ongoing needs. Custom retainers available.' },
];

export default function PackagesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const toggleFaq = (index: number) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className="packages-page">
      {/* <nav className="nav-packages">
        <Link href="/" className="nav-logo"><div className="dot" />PixelCypher Studio</Link>
        <ul className="nav-links">
          <li><Link href="/studio">Studio</Link></li>
          <li><Link href="/work">Work</Link></li>
          <li><Link href="#packages">Packages</Link></li>
          <li><Link href="#build">Custom</Link></li>
          <li><Link href="#contact">Contact</Link></li>
        </ul>
        <Link href="#contact" className="nav-cta">Get a Quote</Link>
      </nav> */}

      {/* <section className="hero">
        <div className="hero-grid-bg" />
        <div className="hero-glow" />
        <div className="hero-tag"><span className="line" />Transparent Pricing</div>
        <h1>Packages &amp;<br /><em>Pricing.</em></h1>
        <p className="hero-sub">No hidden costs. Studio power — pick a bundle or build your own.</p>
        <div className="hero-actions">
          <a href="#packages" className="btn-primary">Browse Packages ↓</a>
          <a href="#build" className="btn-ghost">Build Your Own →</a>
        </div>
      </section> */}

      {/* <div className="ticker-wrap">
        <div className="ticker">{[...tickerItems, ...tickerItems].map((item, i) => (<div key={i} className="ticker-item"><span className="dot" /> {item}</div>))}</div>
      </div> */}

      <section className="master-bundle" id="master">
        <div className="master-bundle-inner">
          <div>
            <div className="bundle-badge"><span className="pulse" />{masterBundle.badge}</div>
            <div className="section-tag">{masterBundle.subtitle}</div>
            <h2 className="section-title">Master<br /><em>Bundle</em></h2>
            <p className="bundle-desc">{masterBundle.description}</p>
            <div className="bundle-price-block">
              <span className="from">Starting from</span>
              <div className="price-row"><span className="price-currency">₹</span><span className="price-number">{masterBundle.price}</span></div>
              <p className="price-note">{masterBundle.timeline}</p>
            </div>
            <div className="bundle-includes">
              {masterBundle.includes.map((include, i) => (
                <div key={i} className="include-row">
                  <div className={`include-icon ${include.color}`}>{include.icon}</div>
                  <div className="include-text"><h4>{include.title}</h4><p>{include.description}</p></div>
                </div>
              ))}
            </div>
            <a href="#contact" className="btn-primary">Claim This Bundle →</a>
          </div>
          <div className="bundle-right">
            <div className="bundle-card">
              <div className="bundle-card-header"><h3>{masterBundle.title}</h3><p>Complete package</p></div>
              <div className="bundle-items">
                {masterBundle.items.map((item, i) => (
                  <div key={i} className="bundle-item">
                    <span className="label">{item.label}</span>
                    <span className={`tag tag-${item.type}`}>{item.tag}</span>
                  </div>
                ))}
              </div>
              <div className="bundle-total">
                <div className="bundle-total-row"><span>Individual value</span><span className="strikethrough">{masterBundle.individualValue}</span></div>
                <div className="bundle-total-row"><span>Bundle saving</span><span className="saving">{masterBundle.saving}</span></div>
                <div className="bundle-total-main"><span className="label">BUNDLE TOTAL</span><span className="amount">{masterBundle.total}</span></div>
              </div>
              <div className="bundle-cta">
                <a href="#contact" className="cta-full">Get Master Bundle</a>
                <a href="#build" className="cta-outline">Build Custom Plan</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section packages-section" id="packages">
        <div className="section-tag">Pick Your Power</div>
        <h2 className="section-title">Alternative<br /><em>Bundles</em></h2>
        <p className="section-desc">Focused packages for every stage.</p>
        <div className="plans-grid">
          {plans.map((plan, i) => (
            <div key={i} className={`plan-card ${plan.featured ? 'featured' : ''}`}>
              <div className="plan-header">
                <div className="plan-number" style={plan.featured ? { color: 'var(--accent-green)' } : {}}>{plan.number} // {plan.featured ? '★ Best Value' : ''}</div>
                <div className="plan-name">{plan.name}</div>
                <div className="plan-desc">{plan.description}</div>
              </div>
              <div className="plan-price-block">
                <div className={`plan-price ${plan.color}`}><span className="sym">₹</span>{plan.price}{plan.isMonthly && <span className="per-mo">/mo</span>}</div>
                <div className="plan-billing">{plan.billing}</div>
              </div>
              <div className="plan-features">
                {plan.features.map((feature, j) => (
                  <div key={j} className="feature-item">
                    <span className={feature.active ? 'check' : 'cross'}>{feature.active ? '✓' : '—'}</span>
                    <span className={feature.active ? 'active' : ''}>{feature.text}</span>
                  </div>
                ))}
              </div>
              <div className="plan-action">
                <a href="#contact" className={plan.featured ? 'cta-full' : 'cta-outline'}>Get Started</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="custom-builder" id="build">
        <div className="custom-builder-inner">
          <div className="section-tag">You Decide</div>
          <h2 className="build-section-title">Build Your<br /><span className="g">Own Package</span></h2>
          <p className="builder-desc">Toggle services, pick sub-deliverables, get a quote.</p>
          <div className="builder-grid">
            <div className="service-modules">
              {['Graphic Design', 'Motion Graphics', 'Web Development'].map((mod, i) => (
                <div key={i} className="module" id={`mod-${i}`}>
                  <div className="module-header">
                    <div className="module-header-left">
                      <div className={`module-icon ${i === 0 ? 'purple' : i === 1 ? 'green' : 'orange'}`}>
                        {i === 0 ? '🎨' : i === 1 ? '🎬' : '💻'}
                      </div>
                      <div className="module-title">
                        <h4>{mod}</h4>
                        <p>{i === 0 ? 'Brand identity, print & digital' : i === 1 ? 'Animated content, reels' : 'Sites, e-commerce, portals'}</p>
                      </div>
                    </div>
                    <div className="module-right">
                      <span className="module-price-tag">from ₹{i === 0 ? '12K' : i === 1 ? '10K' : '25K'}</span>
                      <div className="toggle" />
                    </div>
                  </div>
                  <div className="module-sub">
                    <div className="sub-options">
                      {['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5', 'Option 6'].map((opt, j) => (
                        <div key={j} className={`sub-option ${j === 0 ? 'active' : ''}`}>
                          <div className="sub-check">{j === 0 ? '✓' : ''}</div>
                          <span>{opt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="summary-card">
              <div className="summary-header">
                <h3>Your Estimate</h3>
                <p>Toggle to build</p>
              </div>
              <div className="summary-items">
                <div className="summary-empty">No services selected</div>
              </div>
              <div className="summary-footer">
                <div className="summary-total-row">
                  <span className="t-label">Estimated Total</span>
                  <span className="t-amount">₹0</span>
                </div>
                <p className="summary-note">We'll confirm after discovery call.</p>
                <a href="#contact" className="cta-full" style={{ opacity: 0.4 }}>Request Quote →</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section addons-section">
        <div className="section-tag">Power-Ups</div>
        <h2 className="section-title">Add-Ons &amp;<br /><em>Extras</em></h2>
        <p className="section-desc">Stack these on any package.</p>
        <div className="addons-grid">
          {addons.map((addon, i) => (
            <div key={i} className="addon-card">
              <div className="addon-icon-wrap" style={{ background: `rgba(${addon.color === 'purple' ? '184,157,255' : addon.color === 'green' ? '142,255,139' : addon.color === 'orange' ? '255,140,66' : '91,200,255'},0.1)` }}>{addon.icon}</div>
              <h4>{addon.name}</h4>
              <p>{addon.description}</p>
              <div className="addon-price" style={{ color: `var(--accent-${addon.color})` }}>{addon.price}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="section faq-section">
          
        <div className="section-tag">Common Questions</div>
        <h2 className="section-title">FAQ's <em>Answered</em></h2>
        <div className="faq-list">
          {faqs.map((faq, i) => (
            <div key={i} className={`faq-item ${openFaq === i ? 'open' : ''}`}>
              <div className="faq-q" onClick={() => toggleFaq(i)}>
                <span>{faq.question}</span>
                <div className="faq-icon">{openFaq === i ? '+' : '−'}</div>
              </div>
              <div className="faq-a">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
        
      </section>

      <section className="cta-band" id="contact">
        <div className="cta-band-glow" />
        {/* <h2>Ready to <span>Scale</span> Your Brand?</h2>
        <p>Let's build something extraordinary.</p> */}
        <div className="actions">
          <a href="#contact" className="btn-primary">Email Us →</a>
          {/* <a href="#packages" className="btn-ghost">View Packages →</a> */}
        </div>
      </section>

      {/* <footer>
        <div className="footer-logo">PixelCypher Studio</div>
        <div className="footer-note">© 2025 All rights reserved.</div>
      </footer> */}
    </div>
  );
}
