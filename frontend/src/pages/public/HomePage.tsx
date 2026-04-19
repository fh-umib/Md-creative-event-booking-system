import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

// ── Animated counter hook ──────────────────────────────────────────────────
function useCountUp(target: number, duration = 1800, startOnVisible = true) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!startOnVisible) { setStarted(true); return; }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [startOnVisible]);

  useEffect(() => {
    if (!started) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);

  return { count, ref };
}

// ── Scroll-to-top button ───────────────────────────────────────────────────
function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      style={{
        position: 'fixed',
        bottom: 28,
        right: 24,
        zIndex: 999,
        width: 48,
        height: 48,
        borderRadius: '50%',
        background: '#d99a1d',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 20px rgba(217,154,29,0.45)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(14px) scale(0.85)',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 15V5M10 5L5 10M10 5L15 10" stroke="#111827" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );
}

// ── Animated stat item ─────────────────────────────────────────────────────
function AnimatedStat({ icon, target, suffix, label, isMobile }: {
  icon: string; target: number; suffix: string; label: string; isMobile: boolean;
}) {
  const { count, ref } = useCountUp(target, 3200);
  return (
    <div ref={ref} style={{ textAlign: 'center', padding: isMobile ? '14px 8px' : 0 }}>
      <div style={{ marginBottom: 8, color: '#d99a1d', fontSize: 22 }}>{icon}</div>
      <h3 style={{ margin: '0 0 6px', color: '#111827', fontSize: isMobile ? '26px' : 'clamp(28px,3vw,44px)', fontWeight: 800 }}>
        {count.toLocaleString()}{suffix}
      </h3>
      <p style={{ margin: 0, color: '#667085', fontSize: isMobile ? '14px' : '16px' }}>{label}</p>
    </div>
  );
}

const serviceCards = [
  {
    title: 'Decorations',
    description:
      'Elegant setups for weddings, birthdays, engagements, anniversaries, and grand openings.',
    image:
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80',
    to: '/decorations',
  },
  {
    title: 'Mascot Characters',
    description:
      'Over 50 unique mascot characters to bring joy and excitement to every celebration.',
    image:
      'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1200&q=80',
    to: '/mascots',
  },
  {
    title: 'Activities & Entertainment',
    description:
      'Face painting, bounce houses, ball houses, and music for unforgettable fun.',
    image:
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    to: '/activities',
  },
  {
    title: 'Photo Experiences',
    description:
      '360° Photo Booth and photo box stations to capture every special moment.',
    image:
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80',
    to: '/photo-booth',
  },
];

const reasons = [
  {
    title: 'Premium Quality',
    text: 'Every detail is meticulously planned with the highest quality materials and execution.',
  },
  {
    title: 'Exclusive Attractions',
    text: 'We are the only provider in Kosovo offering select entertainment attractions.',
  },
  {
    title: 'Custom Packages',
    text: 'Build your perfect event by combining services, mascots, and activities your way.',
  },
];

function useWindowWidth() {
  const [width, setWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return width;
}

export default function HomePage() {
  const width = useWindowWidth();
  const isMobile = width < 640;
  const isTablet = width < 1024;

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-eyebrow { animation: fadeUp 0.55s ease both; animation-delay: 0.05s; }
        .hero-title   { animation: fadeUp 0.55s ease both; animation-delay: 0.18s; }
        .hero-text    { animation: fadeUp 0.55s ease both; animation-delay: 0.30s; }
        .hero-buttons { animation: fadeUp 0.55s ease both; animation-delay: 0.42s; }

        .service-card-link:hover .service-card-inner {
          transform: scale(1.025);
        }
        .service-card-inner {
          transition: transform 0.35s ease;
        }

        .reason-card:hover .reason-icon {
          background: #d99a1d;
          color: #111827;
        }
        .reason-icon {
          transition: background 0.25s, color 0.25s;
        }

        .primary-btn:hover  { opacity: 0.88; }
        .secondary-btn:hover { background: rgba(255,255,255,0.18); }
        .call-btn:hover     { background: #f0ede8; }

        @media (max-width: 639px) {
          .stats-grid    { grid-template-columns: 1fr !important; gap: 0 !important; }
          .stat-divider  { border-top: 1px solid #e5e7eb; margin: 0 16px; }
          .services-grid { grid-template-columns: 1fr !important; }
          .reasons-grid  { grid-template-columns: 1fr !important; }
          .hero-buttons-wrap { flex-direction: column !important; align-items: stretch !important; }
          .hero-buttons-wrap a { min-width: unset !important; text-align: center; }
          .cta-buttons-wrap  { flex-direction: column !important; align-items: stretch !important; }
          .cta-buttons-wrap a { min-width: unset !important; text-align: center; }
        }

        @media (min-width: 640px) and (max-width: 1023px) {
          .services-grid { grid-template-columns: 1fr !important; }
          .reasons-grid  { grid-template-columns: repeat(2, 1fr) !important; }
        }

        @media (min-width: 640px) {
          .stat-divider { display: none; }
        }
      `}</style>

      <main style={{ background: '#f7f4ef' }}>

        {/* ── HERO ── */}
        <section style={{
          position: 'relative',
          minHeight: isMobile ? '520px' : '620px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: isMobile ? '60px 20px 80px' : '70px 24px 90px',
          backgroundImage:
            'url(https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1600&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(180deg,rgba(15,23,42,.62) 0%,rgba(15,23,42,.5) 52%,rgba(247,244,239,.88) 100%)',
          }} />

          <div style={{ position: 'relative', zIndex: 1, maxWidth: 980, margin: '0 auto', textAlign: 'center', width: '100%' }}>
            <p className="hero-eyebrow" style={{ margin: '0 0 16px', color: '#fff', fontSize: isMobile ? '12px' : '14px', letterSpacing: '0.16em', fontWeight: 600 }}>
              PREMIUM EVENT SERVICES IN KOSOVO
            </p>

            <h1 className="hero-title" style={{ margin: '0 0 18px', color: '#fff', fontSize: isMobile ? '38px' : isTablet ? '54px' : '76px', lineHeight: 1.02, fontWeight: 800 }}>
              Creating Extraordinary<br />Events & Celebrations
            </h1>

            <p className="hero-text" style={{ margin: '0 auto', maxWidth: 760, color: 'rgba(255,255,255,.9)', fontSize: isMobile ? '16px' : '18px', lineHeight: 1.7 }}>
              From elegant decorations to captivating entertainment — we craft bespoke experiences that make every occasion truly memorable.
            </p>

            <div className="hero-buttons hero-buttons-wrap" style={{ marginTop: 28, display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap' }}>
              <Link to="/packages" className="primary-btn" style={primaryBtnStyle}>Explore Our Packages</Link>
              <Link to="/booking"  className="secondary-btn" style={secondaryBtnStyle}>Book an Event</Link>
            </div>
          </div>
        </section>

        {/* ── STATS ── */}
        <section style={{ position: 'relative', marginTop: isMobile ? '-40px' : '-52px', padding: '0 16px' }}>
          <div className="stats-grid" style={{
            maxWidth: 860, margin: '0 auto',
            background: '#fff', borderRadius: 22,
            boxShadow: '0 18px 40px rgba(15,23,42,.08)',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            padding: isMobile ? '20px 12px' : '28px 20px',
          }}>
            {[
              { icon: '◌', target: 5000, suffix: '+', label: 'Happy Clients' },
              { icon: '☆', target: 200,  suffix: '+', label: '5-Star Reviews' },
              { icon: '⌘', target: 800,  suffix: '+', label: 'Events Delivered' },
            ].map((s, i) => (
              <div key={s.label}>
                {i > 0 && <div className="stat-divider" />}
                <AnimatedStat icon={s.icon} target={s.target} suffix={s.suffix} label={s.label} isMobile={isMobile} />
              </div>
            ))}
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section style={{ maxWidth: 1280, margin: '0 auto', padding: isMobile ? '56px 16px 24px' : '72px 24px 30px' }}>
          <div style={{ maxWidth: 760, margin: '0 auto 34px', textAlign: 'center' }}>
            <p style={eyebrowStyle}>WHAT WE OFFER</p>
            <h2 style={{ ...sectionTitleStyle, fontSize: isMobile ? '32px' : 'clamp(34px,4.5vw,58px)' }}>Our Services</h2>
            <p style={sectionTextStyle}>Select a category to explore our full range of professional event services.</p>
          </div>

          <div className="services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0,1fr))', gap: isMobile ? '16px' : '24px' }}>
            {serviceCards.map((card) => (
              <Link key={card.title} to={card.to} className="service-card-link" style={{ textDecoration: 'none' }}>
                <article className="service-card-inner" style={{
                  minHeight: isMobile ? '240px' : '360px',
                  borderRadius: 20, overflow: 'hidden',
                  backgroundImage: `linear-gradient(180deg,rgba(17,24,39,.08) 0%,rgba(17,24,39,.72) 100%),url(${card.image})`,
                  backgroundSize: 'cover', backgroundPosition: 'center',
                  display: 'flex', alignItems: 'flex-end',
                }}>
                  <div style={{ width: '100%', padding: isMobile ? '16px' : '22px 22px 24px' }}>
                    <h3 style={{ margin: '0 0 8px', color: '#fff', fontSize: isMobile ? '20px' : '28px', fontWeight: 800, lineHeight: 1.08 }}>{card.title}</h3>
                    {!isMobile && <p style={{ margin: '0 0 12px', color: 'rgba(255,255,255,.88)', fontSize: '16px', lineHeight: 1.7 }}>{card.description}</p>}
                    <span style={{ color: '#d99a1d', fontSize: isMobile ? '15px' : '17px', fontWeight: 800 }}>Explore →</span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>

        {/* ── WHY US ── */}
        <section style={{ marginTop: 36, background: '#1f2f4f', padding: isMobile ? '52px 16px' : '72px 24px' }}>
          <div style={{ maxWidth: 760, margin: '0 auto 34px', textAlign: 'center' }}>
            <p style={{ ...eyebrowStyle, color: '#d99a1d' }}>WHY CHOOSE US</p>
            <h2 style={{ ...sectionTitleStyle, color: '#fff', fontSize: isMobile ? '30px' : 'clamp(34px,4.5vw,58px)' }}>The MD Creative Difference</h2>
          </div>

          <div className="reasons-grid" style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: isMobile ? '20px' : '24px' }}>
            {reasons.map((item) => (
              <div key={item.title} className="reason-card" style={{ textAlign: 'center', padding: '10px 14px' }}>
                <div className="reason-icon" style={{
                  width: 52, height: 52, margin: '0 auto 16px',
                  borderRadius: 999, border: '2px solid #d99a1d',
                  color: '#d99a1d', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: 24, fontWeight: 800,
                }}>✓</div>
                <h3 style={{ margin: '0 0 10px', color: '#fff', fontSize: isMobile ? '18px' : '22px', fontWeight: 800 }}>{item.title}</h3>
                <p style={{ margin: 0, color: '#cbd5e1', fontSize: isMobile ? '15px' : '16px', lineHeight: 1.8 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── NOTICE ── */}
        <section style={{ padding: isMobile ? '40px 16px 10px' : '54px 24px 12px' }}>
          <div style={{ maxWidth: 820, margin: '0 auto', textAlign: 'center' }}>
            <div style={{ color: '#d99a1d', fontSize: 22, marginBottom: 8 }}>⌚</div>
            <h2 style={{ margin: '0 0 10px', color: '#111827', fontSize: isMobile ? '22px' : 'clamp(22px,3vw,34px)', fontWeight: 800, lineHeight: 1.15 }}>
              Peak Season Notice
            </h2>
            <p style={{ margin: 0, color: '#667085', fontSize: isMobile ? '14px' : '15px', lineHeight: 1.8 }}>
              June, July, August, and September are peak season months. Please book at least 1 week in advance to secure your preferred date.
            </p>
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{ padding: isMobile ? '32px 16px 60px' : '36px 24px 72px' }}>
          <div style={{ maxWidth: 860, margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ margin: '0 0 14px', color: '#111827', fontSize: isMobile ? '30px' : 'clamp(34px,5vw,56px)', fontWeight: 800, lineHeight: 1.08 }}>
              Ready to Create Something<br />Extraordinary?
            </h2>
            <p style={{ margin: '0 auto', maxWidth: 700, color: '#667085', fontSize: isMobile ? '15px' : '16px', lineHeight: 1.8 }}>
              Let us bring your vision to life. Choose a package, customize your services, and leave the rest to us.
            </p>
            <div className="cta-buttons-wrap" style={{ marginTop: 24, display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap' }}>
              <Link to="/booking" className="primary-btn" style={primaryBtnStyle}>Start Planning Your Event</Link>
              <a href="tel:+38344378786" className="call-btn" style={callBtnStyle}>Call Us</a>
            </div>
          </div>
        </section>

      </main>

      <ScrollToTop />
    </>
  );
}

const primaryBtnStyle: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  minWidth: 210, padding: '15px 20px', borderRadius: 14,
  background: '#d99a1d', color: '#111827',
  textDecoration: 'none', fontWeight: 800, fontSize: 16,
  transition: 'opacity 0.2s',
};

const secondaryBtnStyle: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  minWidth: 190, padding: '15px 20px', borderRadius: 14,
  background: 'rgba(255,255,255,.08)', color: '#fff',
  textDecoration: 'none', fontWeight: 700, fontSize: 16,
  border: '1px solid rgba(255,255,255,.32)',
  transition: 'background 0.2s',
};

const callBtnStyle: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  minWidth: 160, padding: '15px 20px', borderRadius: 14,
  background: '#fff', color: '#111827',
  textDecoration: 'none', fontWeight: 700, fontSize: 16,
  border: '1px solid #d7dce5',
  transition: 'background 0.2s',
};

const eyebrowStyle: React.CSSProperties = {
  margin: '0 0 10px', color: '#d99a1d',
  fontSize: 14, letterSpacing: '0.16em', fontWeight: 700,
};

const sectionTitleStyle: React.CSSProperties = {
  margin: '0 0 12px', color: '#111827',
  fontSize: 'clamp(34px,4.5vw,58px)', fontWeight: 800, lineHeight: 1.08,
};

const sectionTextStyle: React.CSSProperties = {
  margin: 0, color: '#667085', fontSize: 18, lineHeight: 1.7,
};