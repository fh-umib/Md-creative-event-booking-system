import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

// ── useWindowWidth ────────────────────────────────────────────────────────
function useWindowWidth() {
  const [w, setW] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  useEffect(() => {
    const fn = () => setW(window.innerWidth);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);
  return w;
}

// ── useCountUp ────────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 3200) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    if (!started) return;
    let s: number | null = null;
    const step = (ts: number) => {
      if (!s) s = ts;
      const p = Math.min((ts - s) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);
  return { count, ref };
}

// ── ScrollToTop ───────────────────────────────────────────────────────────
function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Scroll to top"
      style={{
        position: 'fixed', bottom: 28, right: 20, zIndex: 999,
        width: 48, height: 48, borderRadius: '50%',
        background: '#c8841a', border: 'none', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 4px 20px rgba(200,132,26,.45)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(14px) scale(0.85)',
        transition: 'opacity 0.3s, transform 0.3s',
        pointerEvents: visible ? 'auto' : 'none',
      }}>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 15V5M10 5L5 10M10 5L15 10" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );
}

// ── StatItem ──────────────────────────────────────────────────────────────
function StatItem({ icon, target, suffix, label, isMobile }: {
  icon: string; target: number; suffix: string; label: string; isMobile: boolean;
}) {
  const { count, ref } = useCountUp(target);
  return (
    <div ref={ref} style={{ textAlign: 'center', padding: isMobile ? '18px 10px' : '26px 20px' }}>
      <div style={{ marginBottom: 8, color: '#c8841a', fontSize: isMobile ? 18 : 22 }}>{icon}</div>
      <h3 style={{ margin: '0 0 4px', color: '#111827', fontSize: isMobile ? '26px' : 'clamp(28px,3vw,44px)', fontWeight: 800, lineHeight: 1, fontFamily: "'Cormorant Garamond',serif" }}>
        {count.toLocaleString()}{suffix}
      </h3>
      <p style={{ margin: 0, color: '#667085', fontSize: isMobile ? '13px' : '15px' }}>{label}</p>
    </div>
  );
}

// ── Data ──────────────────────────────────────────────────────────────────
const serviceCards = [
  { title: 'Decorations',           description: 'Elegant setups for weddings, birthdays, engagements, anniversaries, and grand openings.', image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80', to: '/decorations', icon: '🎀' },
  { title: 'Mascot Characters',     description: 'Over 50 unique mascot characters to bring joy and excitement to every celebration.',           image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1200&q=80', to: '/mascots',     icon: '🎭' },
  { title: 'Activities & Fun',      description: 'Face painting, bounce houses, ball houses, and music for unforgettable fun.',                   image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80', to: '/activities',  icon: '🎪' },
  { title: 'Photo Experiences',     description: '360° Photo Booth and photo box stations to capture every special moment.',                      image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80', to: '/photo-booth', icon: '📸' },
];

const reasons = [
  { icon: '✦', title: 'Premium Quality',       text: 'Every detail planned with the highest quality materials and execution.' },
  { icon: '✦', title: 'Exclusive Attractions', text: 'The only provider in Kosovo offering select entertainment attractions.' },
  { icon: '✦', title: 'Custom Packages',       text: 'Build your perfect event by combining services and activities your way.' },
];

const eventTypes = ['Weddings', 'Birthdays', 'Engagements', 'Baby Showers', 'Anniversaries', 'Grand Openings', 'Baptisms', 'Corporate Events'];

// ── HomePage ──────────────────────────────────────────────────────────────
export default function HomePage() {
  const width = useWindowWidth();
  const isMobile  = width < 640;
  const isTablet  = width < 1024;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=DM+Sans:wght@400;500;700&display=swap');

        * { box-sizing: border-box; }
        .hp { font-family: 'DM Sans', sans-serif; background: #f7f4ef; }
        .hp-serif { font-family: 'Cormorant Garamond', serif; }

        @keyframes hp-fadeUp  { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
        @keyframes hp-marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes hp-pulse   { 0%,100%{transform:scale(1)} 50%{transform:scale(1.06)} }

        .hp-a1 { animation: hp-fadeUp .6s ease both .05s; }
        .hp-a2 { animation: hp-fadeUp .6s ease both .2s; }
        .hp-a3 { animation: hp-fadeUp .6s ease both .35s; }
        .hp-a4 { animation: hp-fadeUp .6s ease both .5s; }

        /* service cards */
        .hp-scard { transition: transform .35s ease, box-shadow .35s ease; }
        .hp-scard:hover { transform: translateY(-6px); box-shadow: 0 24px 52px rgba(26,18,11,.18) !important; }
        .hp-scard:hover .hp-scard-img { transform: scale(1.05); }
        .hp-scard-img { transition: transform .5s ease; }
        .hp-scard:hover .hp-scard-overlay { opacity: 1 !important; }
        .hp-scard-overlay { transition: opacity .3s; }

        /* reason cards */
        .hp-reason:hover { border-color: #c8841a !important; box-shadow: 0 8px 28px rgba(200,132,26,.12) !important; }
        .hp-reason { transition: border-color .2s, box-shadow .2s, transform .2s; }
        .hp-reason:hover { transform: translateY(-3px); }

        /* buttons */
        .hp-btn-gold { transition: transform .2s, box-shadow .2s, opacity .2s; }
        .hp-btn-gold:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(200,132,26,.4) !important; }
        .hp-btn-ghost:hover { background: rgba(255,255,255,.15) !important; }
        .hp-btn-ghost { transition: background .2s; }
        .hp-btn-outline:hover { background: #1a120b !important; color: #fff !important; }
        .hp-btn-outline { transition: background .2s, color .2s; }

        /* ticker */
        .hp-ticker { display: inline-flex; animation: hp-marquee 28s linear infinite; }

        /* cta pulse badge */
        .hp-pulse { animation: hp-pulse 3s ease-in-out infinite; }

        /* ── MOBILE MEDIA QUERIES ── */
        @media (max-width: 639px) {
          .hp-hero-btns   { flex-direction: column !important; align-items: stretch !important; }
          .hp-hero-btns a { text-align: center !important; min-width: unset !important; }
          .hp-stats-grid  { grid-template-columns: 1fr !important; }
          .hp-stat-sep    { border-top: 1px solid #f0e9dd !important; border-left: none !important; }
          .hp-svc-grid    { grid-template-columns: 1fr !important; }
          .hp-reasons-grid{ grid-template-columns: 1fr !important; }
          .hp-cta-btns    { flex-direction: column !important; align-items: stretch !important; }
          .hp-cta-btns a  { text-align: center !important; }
          .hp-event-types { display: none !important; }
        }
        @media (min-width: 640px) and (max-width: 1023px) {
          .hp-svc-grid     { grid-template-columns: 1fr !important; }
          .hp-reasons-grid { grid-template-columns: repeat(2,1fr) !important; }
          .hp-stat-sep     { border-left: 1px solid #f0e9dd; }
        }
        @media (min-width: 640px) {
          .hp-stat-sep { border-left: 1px solid #f0e9dd; }
        }
      `}</style>

      <div className="hp">

        {/* ══ HERO ════════════════════════════════════════════════════════ */}
        <section style={{
          position: 'relative', overflow: 'hidden',
          minHeight: isMobile ? '100svh' : '680px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {/* bg image */}
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
          {/* gradient overlay */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(170deg,rgba(15,23,42,.72) 0%,rgba(15,23,42,.55) 50%,rgba(200,132,26,.15) 100%)' }} />

          {/* content */}
          <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 1000, margin: '0 auto', padding: isMobile ? '80px 22px 100px' : '80px 44px', textAlign: 'center' }}>

            {/* eyebrow pill */}
            <div className="hp-a1" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'rgba(200,132,26,.15)', border: '1px solid rgba(200,132,26,.4)', borderRadius: 99, padding: '8px 20px', marginBottom: isMobile ? 20 : 28 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#c8841a', flexShrink: 0 }} />
              <span style={{ color: '#e8b56a', fontSize: isMobile ? 11 : 12, fontWeight: 700, letterSpacing: '.15em', textTransform: 'uppercase' }}>Premium Event Services · Kosovo</span>
            </div>

            <h1 className="hp-serif hp-a2" style={{
              margin: '0 0 20px', color: '#fff',
              fontSize: isMobile ? '44px' : isTablet ? '60px' : '82px',
              lineHeight: 1.02, fontWeight: 700,
            }}>
              Creating<br />
              <em style={{ fontStyle: 'italic', color: '#c8841a' }}>Extraordinary</em><br />
              Events & Celebrations
            </h1>

            <p className="hp-a3" style={{ margin: '0 auto 36px', maxWidth: 600, color: 'rgba(255,255,255,.78)', fontSize: isMobile ? '16px' : '18px', lineHeight: 1.85 }}>
              From elegant decorations to captivating entertainment — we craft bespoke experiences that make every occasion truly memorable.
            </p>

            <div className="hp-a4 hp-hero-btns" style={{ display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap' }}>
              <Link to="/packages" className="hp-btn-gold" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, minWidth: 210, padding: '15px 24px', borderRadius: 14, background: '#c8841a', color: '#fff', textDecoration: 'none', fontWeight: 700, fontSize: 16, boxShadow: '0 6px 20px rgba(200,132,26,.35)' }}>
                Explore Our Packages
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
              <Link to="/booking" className="hp-btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minWidth: 180, padding: '15px 24px', borderRadius: 14, background: 'rgba(255,255,255,.09)', color: '#fff', textDecoration: 'none', fontWeight: 700, fontSize: 16, border: '1px solid rgba(255,255,255,.3)' }}>
                Book an Event
              </Link>
            </div>

            {/* scroll hint */}
            {!isMobile && (
              <div style={{ marginTop: 48, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, opacity: 0.5 }}>
                <span style={{ fontSize: 11, color: '#fff', letterSpacing: '.12em', textTransform: 'uppercase' }}>Scroll to explore</span>
                <svg width="18" height="24" viewBox="0 0 18 24" fill="none"><rect x="6.5" y="1" width="5" height="9" rx="2.5" stroke="#fff" strokeWidth="1.5"/><circle cx="9" cy="5" r="1.5" fill="#fff"><animate attributeName="cy" values="5;8;5" dur="1.6s" repeatCount="indefinite"/></circle><path d="M4 15l5 5 5-5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            )}
          </div>

          {/* ticker at bottom of hero */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, borderTop: '1px solid rgba(200,132,26,.2)', padding: '12px 0', overflow: 'hidden', background: 'rgba(15,23,42,.4)', backdropFilter: 'blur(8px)' }}>
            <div className="hp-ticker">
              {[...Array(2)].map((_, ri) => (
                <span key={ri} style={{ display: 'inline-flex' }}>
                  {eventTypes.map((t) => (
                    <span key={t} style={{ display: 'inline-flex', alignItems: 'center', gap: 14, paddingRight: 36 }}>
                      <span style={{ color: '#c8841a', fontSize: 12 }}>✦</span>
                      <span style={{ color: 'rgba(255,255,255,.55)', fontSize: 12, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase' }}>{t}</span>
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ══ STATS ═══════════════════════════════════════════════════════ */}
        <section style={{ padding: '0 20px', marginTop: isMobile ? '-36px' : '-52px', position: 'relative', zIndex: 2 }}>
          <div className="hp-stats-grid" style={{ maxWidth: 860, margin: '0 auto', background: '#fff', borderRadius: 22, boxShadow: '0 18px 48px rgba(26,18,11,.1)', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', overflow: 'hidden' }}>
            <StatItem icon="◌" target={5000} suffix="+" label="Happy Clients"    isMobile={isMobile} />
            <div className="hp-stat-sep"><StatItem icon="☆" target={200}  suffix="+" label="5-Star Reviews"   isMobile={isMobile} /></div>
            <div className="hp-stat-sep"><StatItem icon="⌘" target={800}  suffix="+" label="Events Delivered" isMobile={isMobile} /></div>
          </div>
        </section>

        {/* ══ SERVICES ════════════════════════════════════════════════════ */}
        <section style={{ maxWidth: 1280, margin: '0 auto', padding: isMobile ? '56px 20px 32px' : '80px 44px 40px' }}>
          <div style={{ maxWidth: 680, margin: '0 auto 44px', textAlign: 'center' }}>
            <p style={{ margin: '0 0 8px', color: '#c8841a', fontSize: 12, fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase' }}>What We Offer</p>
            <h2 className="hp-serif" style={{ margin: '0 0 14px', fontSize: isMobile ? '34px' : 'clamp(34px,4.5vw,56px)', fontWeight: 700, color: '#111827', lineHeight: 1.08 }}>
              Our Services
            </h2>
            <p style={{ margin: 0, color: '#667085', fontSize: isMobile ? '15px' : '17px', lineHeight: 1.8 }}>
              Select a category to explore our full range of professional event services.
            </p>
          </div>

          <div className="hp-svc-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))', gap: isMobile ? 14 : 22 }}>
            {serviceCards.map((card) => (
              <Link key={card.title} to={card.to} style={{ textDecoration: 'none' }}>
                <article className="hp-scard" style={{ borderRadius: 22, overflow: 'hidden', position: 'relative', height: isMobile ? 220 : 360, boxShadow: '0 6px 24px rgba(26,18,11,.08)' }}>
                  <div className="hp-scard-img" style={{ position: 'absolute', inset: 0, backgroundImage: `url(${card.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,8,2,.88) 0%, rgba(15,8,2,.3) 55%, rgba(15,8,2,.04) 100%)' }} />
                  <div className="hp-scard-overlay" style={{ position: 'absolute', inset: 0, background: 'rgba(200,132,26,.08)', opacity: 0 }} />

                  <div style={{ position: 'absolute', top: 16, left: 16, width: 36, height: 36, borderRadius: 10, background: 'rgba(200,132,26,.2)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
                    {card.icon}
                  </div>

                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: isMobile ? '16px' : '24px' }}>
                    <h3 className="hp-serif" style={{ margin: '0 0 6px', color: '#fff', fontSize: isMobile ? '22px' : '28px', fontWeight: 700, lineHeight: 1.1 }}>{card.title}</h3>
                    {!isMobile && <p style={{ margin: '0 0 12px', color: 'rgba(255,255,255,.78)', fontSize: 14, lineHeight: 1.7 }}>{card.description}</p>}
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, color: '#f0c060', fontSize: 14, fontWeight: 700 }}>
                      Explore
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 6.5h9M8 3l3.5 3.5L8 10" stroke="#f0c060" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>

        {/* ══ WHY US ══════════════════════════════════════════════════════ */}
        <section style={{ background: 'linear-gradient(135deg,#1a120b 0%,#2c1a0a 100%)', padding: isMobile ? '56px 20px' : '80px 44px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -80, right: -80, width: 360, height: 360, borderRadius: '50%', background: 'radial-gradient(circle,rgba(200,132,26,.16) 0%,transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: -60, left: -60, width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle,rgba(200,132,26,.1) 0%,transparent 70%)', pointerEvents: 'none' }} />

          <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <div style={{ textAlign: 'center', marginBottom: 44 }}>
              <p style={{ margin: '0 0 10px', color: '#c8841a', fontSize: 12, fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase' }}>Why Choose Us</p>
              <h2 className="hp-serif" style={{ margin: 0, color: '#fff', fontSize: isMobile ? '32px' : 'clamp(34px,4.5vw,54px)', fontWeight: 700, lineHeight: 1.08 }}>
                The MD Creative <em style={{ fontStyle: 'italic', color: '#c8841a' }}>Difference</em>
              </h2>
            </div>

            <div className="hp-reasons-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: isMobile ? 14 : 20 }}>
              {reasons.map((item, i) => (
                <div key={item.title} className="hp-reason" style={{ background: 'rgba(255,255,255,.05)', border: '1.5px solid rgba(255,255,255,.08)', borderRadius: 20, padding: isMobile ? '22px 18px' : '28px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(200,132,26,.15)', border: '1.5px solid rgba(200,132,26,.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c8841a', fontSize: 20, fontWeight: 800 }}>
                    {i + 1}
                  </div>
                  <h3 style={{ margin: 0, color: '#fff', fontSize: isMobile ? '17px' : '20px', fontWeight: 700 }}>{item.title}</h3>
                  <p style={{ margin: 0, color: 'rgba(255,255,255,.6)', fontSize: isMobile ? '14px' : '15px', lineHeight: 1.8 }}>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ SOCIAL PROOF ════════════════════════════════════════════════ */}
        <section style={{ background: '#fff', padding: isMobile ? '48px 20px' : '64px 44px', borderTop: '1px solid #e8ddd0', borderBottom: '1px solid #e8ddd0' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 36 }}>
              <p style={{ margin: '0 0 8px', color: '#c8841a', fontSize: 12, fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase' }}>Trusted by Families Across Kosovo</p>
              <h2 className="hp-serif" style={{ margin: 0, fontSize: isMobile ? '28px' : '40px', fontWeight: 700, color: '#1a120b', lineHeight: 1.1 }}>
                What our clients say
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2,1fr)' : 'repeat(3,1fr)', gap: 18 }}>
              {[
                { name: 'Arta K.',      event: 'Birthday Party',    stars: 5, text: 'Absolutely magical! The decorations were beyond what I imagined. Every guest was amazed. MD Creative made my daughter\'s birthday unforgettable.' },
                { name: 'Besnik M.',    event: 'Wedding Reception',  stars: 5, text: 'Professional from start to finish. The team arrived early, set up beautifully, and handled every detail perfectly. Highly recommend!' },
                { name: 'Flutura D.',  event: 'Baby Shower',        stars: 5, text: 'The mascot characters were a huge hit with the kids! Everyone was laughing and having fun. Will definitely book again for our next event.' },
              ].map((r, i) => (
                <div key={i} style={{ background: '#faf7f2', borderRadius: 20, padding: '24px', border: '1.5px solid #e6d9c4' }}>
                  <div style={{ display: 'flex', gap: 2, marginBottom: 14 }}>
                    {Array(r.stars).fill(0).map((_, j) => (
                      <svg key={j} width="16" height="16" viewBox="0 0 16 16" fill="#c8841a"><path d="M8 1l1.8 3.6L14 5.4l-3 2.9.7 4.1L8 10.4l-3.7 2 .7-4.1-3-2.9 4.2-.8z"/></svg>
                    ))}
                  </div>
                  <p style={{ margin: '0 0 18px', color: '#4a3b28', fontSize: 14, lineHeight: 1.8, fontStyle: 'italic' }}>"{r.text}"</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'linear-gradient(135deg,#d4911e,#c8841a)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 15, fontWeight: 700, fontFamily: "'Cormorant Garamond',serif" }}>
                      {r.name[0]}
                    </div>
                    <div>
                      <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#1a120b' }}>{r.name}</p>
                      <p style={{ margin: 0, fontSize: 12, color: '#9a8878' }}>{r.event}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ PEAK NOTICE ═════════════════════════════════════════════════ */}
        <section style={{ padding: isMobile ? '36px 20px' : '48px 44px' }}>
          <div style={{ maxWidth: 820, margin: '0 auto', background: '#fff', borderRadius: 22, border: '1.5px solid #e6d9c4', padding: isMobile ? '24px 20px' : '32px 40px', display: 'flex', alignItems: isMobile ? 'flex-start' : 'center', gap: 20, flexDirection: isMobile ? 'column' : 'row', boxShadow: '0 4px 20px rgba(26,18,11,.05)' }}>
            <div style={{ width: 52, height: 52, borderRadius: 14, background: '#fef3d0', border: '1.5px solid #e8d5a0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, flexShrink: 0 }}>
              📅
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: '0 0 6px', fontSize: isMobile ? '17px' : '19px', fontWeight: 800, color: '#1a120b' }}>Peak Season Notice</h3>
              <p style={{ margin: 0, color: '#7a6a52', fontSize: isMobile ? '14px' : '15px', lineHeight: 1.75 }}>
                June – September are peak months. Book at least <strong style={{ color: '#c8841a' }}>1 week in advance</strong> to secure your preferred date.
              </p>
            </div>
            <Link to="/booking" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, textDecoration: 'none', background: '#c8841a', color: '#fff', padding: '11px 22px', borderRadius: 99, fontWeight: 700, fontSize: 14, whiteSpace: 'nowrap', flexShrink: 0, boxShadow: '0 4px 14px rgba(200,132,26,.3)' }}>
              Book Now
            </Link>
          </div>
        </section>

        {/* ══ CTA ════════════════════════════════════════════════════════ */}
        <section style={{ padding: isMobile ? '0 20px 60px' : '0 44px 80px' }}>
          <div style={{ maxWidth: 900, margin: '0 auto', background: 'linear-gradient(135deg,#1a120b 0%,#2c1a0a 100%)', borderRadius: 28, padding: isMobile ? '48px 24px' : '64px 60px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -60, right: -60, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle,rgba(200,132,26,.2) 0%,transparent 70%)', pointerEvents: 'none' }} />

            <div className="hp-pulse" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(200,132,26,.15)', border: '1px solid rgba(200,132,26,.35)', borderRadius: 99, padding: '7px 18px', marginBottom: 20 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#c8841a', display: 'inline-block' }} />
              <span style={{ color: '#e8b56a', fontSize: 11, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase' }}>Taking bookings now</span>
            </div>

            <h2 className="hp-serif" style={{ margin: '0 0 16px', color: '#fff', fontSize: isMobile ? '32px' : 'clamp(34px,5vw,54px)', fontWeight: 700, lineHeight: 1.08 }}>
              Ready to Create Something<br />
              <em style={{ fontStyle: 'italic', color: '#c8841a' }}>Extraordinary?</em>
            </h2>
            <p style={{ margin: '0 auto 36px', maxWidth: 520, color: 'rgba(255,255,255,.6)', fontSize: isMobile ? '15px' : '16px', lineHeight: 1.85 }}>
              Let us bring your vision to life. Choose a package, customize your services, and leave the rest to us.
            </p>

            <div className="hp-cta-btns" style={{ display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap' }}>
              <Link to="/booking" className="hp-btn-gold" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, textDecoration: 'none', background: '#c8841a', color: '#fff', padding: '15px 30px', borderRadius: 99, fontWeight: 700, fontSize: 15, boxShadow: '0 6px 24px rgba(200,132,26,.4)' }}>
                Start Planning Your Event
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
              <a href="tel:+38344378786" className="hp-btn-outline" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, textDecoration: 'none', background: 'transparent', color: '#fff', padding: '15px 28px', borderRadius: 99, fontWeight: 700, fontSize: 15, border: '1.5px solid rgba(255,255,255,.3)' }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M14 11.3c-.2-.2-1.8-1.2-2.1-1.3-.3-.1-.5 0-.7.2l-.9 1.1c-.2.2-.4.3-.7.1C8.9 10.9 7.1 9.1 6.6 8.4c-.2-.3-.1-.5.1-.7l1.1-.9c.2-.2.3-.4.2-.7C7.9 5.8 6.9 4.2 6.7 4c-.2-.2-.4-.2-.6-.2-.2 0-.4.1-.6.2C4.7 4.6 4 5.4 4 6.5c0 1.2.6 2.6 1.6 3.9 1 1.3 2.6 2.6 4 3.1 1.4.5 2.4.3 3.1-.4.7-.7.9-1.4.5-1.8z" fill="#fff"/></svg>
                Call Us
              </a>
            </div>
          </div>
        </section>

      </div>

      <ScrollToTop />
    </>
  );
}