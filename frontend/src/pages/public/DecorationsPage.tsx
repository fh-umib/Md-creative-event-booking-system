import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPublicDecorations } from '../../services/decorationApi';
import type { Decoration } from '../../services/decorationApi';

function useWindowWidth() {
  const [w, setW] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  useEffect(() => {
    const fn = () => setW(window.innerWidth);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);
  return w;
}

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
    if (target === 0) { setCount(0); return; }
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
        position: 'fixed', bottom: 28, right: 24, zIndex: 999,
        width: 48, height: 48, borderRadius: '50%',
        background: '#c8841a', border: 'none', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 4px 20px rgba(200,132,26,0.45)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(14px) scale(0.85)',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
        pointerEvents: visible ? 'auto' : 'none',
      }}>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 15V5M10 5L5 10M10 5L15 10" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

function StatCount({ prefix = '', target, suffix = '', label, isMobile }: {
  prefix?: string; target: number; suffix?: string; label: string; isMobile: boolean;
}) {
  const { count, ref } = useCountUp(target);
  return (
    <div ref={ref} style={{ textAlign: 'center' }}>
      <p style={{ margin: '0 0 4px', fontSize: isMobile ? '34px' : '46px', fontWeight: 800, color: '#1a120b', lineHeight: 1, fontFamily: "'Cormorant Garamond', serif" }}>
        {prefix}{count.toLocaleString()}{suffix}
      </p>
      <p style={{ margin: 0, fontSize: 13, color: '#9a8878', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>{label}</p>
    </div>
  );
}

export default function DecorationsPage() {
  const [decorations, setDecorations] = useState<Decoration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const width = useWindowWidth();
  const isMobile = width < 640;
  const isTablet = width < 1024;

  useEffect(() => {
    getPublicDecorations()
      .then(setDecorations)
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load decorations'))
      .finally(() => setLoading(false));
  }, []);

  const minPrice = decorations.length > 0
    ? Math.min(...decorations.map((d) => Number(d.price_from || 0)))
    : 0;
  const featuredCount = decorations.filter((d) => d.is_featured).length;

  if (loading) {
    return (
      <>
        <style>{`@keyframes dp-spin { to { transform: rotate(360deg); } }`}</style>
        <div style={{ background: '#faf7f2', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', border: '2.5px solid #e6d9c4', borderTopColor: '#c8841a', animation: 'dp-spin .85s linear infinite', margin: '0 auto 14px' }} />
            <p style={{ margin: 0, color: '#9a8878', fontSize: 15 }}>Loading…</p>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <div style={{ background: '#faf7f2', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <div style={{ background: '#fff1f1', color: '#991b1b', border: '1px solid #fecaca', borderRadius: 16, padding: '28px 36px', fontSize: 15 }}>{error}</div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@400;500;600;700&display=swap');

        * { box-sizing: border-box; }
        .dp { font-family: 'DM Sans', sans-serif; background: #faf7f2; color: #1a120b; }
        .dp-serif { font-family: 'Cormorant Garamond', serif; }

        @keyframes dp-fadeUp   { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes dp-fadeIn   { from{opacity:0} to{opacity:1} }
        @keyframes dp-scaleIn  { from{opacity:0;transform:scale(0.96)} to{opacity:1;transform:scale(1)} }

        .dp-a1 { animation: dp-fadeUp .6s ease both .05s; }
        .dp-a2 { animation: dp-fadeUp .6s ease both .2s; }
        .dp-a3 { animation: dp-fadeUp .6s ease both .35s; }
        .dp-a4 { animation: dp-fadeUp .6s ease both .5s; }
        .dp-ai { animation: dp-scaleIn .8s ease both .1s; }

        /* card hover */
        .dp-card { transition: transform .4s ease, box-shadow .4s ease; cursor: pointer; }
        .dp-card:hover { transform: translateY(-6px); }
        .dp-card:hover .dp-card-img { transform: scale(1.04); }
        .dp-card-img { transition: transform .5s ease; }

        /* overlay on card hover */
        .dp-card:hover .dp-card-overlay { opacity: 1 !important; }
        .dp-card-overlay { transition: opacity .3s ease; }

        /* buttons */
        .dp-btn-gold { transition: transform .2s, box-shadow .2s; }
        .dp-btn-gold:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(200,132,26,.38) !important; }
        .dp-btn-outline { transition: background .2s, color .2s; }
        .dp-btn-outline:hover { background: #1a120b !important; color: #fff !important; }

        /* divider line */
        .dp-line { height: 1px; background: linear-gradient(90deg, transparent, #ddd0be 30%, #ddd0be 70%, transparent); }

        @media (max-width: 639px) {
          .dp-hero-cols  { grid-template-columns: 1fr !important; }
          .dp-hero-right { display: none !important; }
          .dp-stats-row  { grid-template-columns: 1fr !important; gap: 24px !important; }
          .dp-cards-grid { grid-template-columns: 1fr !important; }
          .dp-cta-btns   { flex-direction: column !important; }
          .dp-cta-btns a { text-align: center; }
        }
        @media (min-width: 640px) and (max-width: 1023px) {
          .dp-cards-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .dp-stats-row  { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (min-width: 640px) {
          .dp-stat-sep { border-left: 1px solid #e6d9c4; }
        }
      `}</style>

      <div className="dp">

        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <div style={{ background: '#faf7f2', overflow: 'hidden' }}>
          <div className="dp-hero-cols" style={{ display: 'grid', gridTemplateColumns: isTablet ? '1fr' : '1fr 1fr', minHeight: isTablet ? 'auto' : 620 }}>

            {/* LEFT — text, padded */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: isMobile ? '60px 22px 48px' : isTablet ? '72px 44px 56px' : '80px 56px 80px 60px' }}>

              {/* eyebrow */}
              <div className="dp-a1" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
                <div style={{ width: 28, height: 1.5, background: '#c8841a', flexShrink: 0 }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: '#c8841a', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                  Luxury Styling · Kosovo
                </span>
              </div>

              {/* title */}
              <h1 className="dp-serif dp-a2" style={{ margin: '0 0 22px', fontSize: isMobile ? '54px' : isTablet ? '68px' : '80px', fontWeight: 700, lineHeight: 0.95, color: '#1a120b' }}>
                Deco&shy;ra&shy;tions
                <br />
                <em style={{ fontStyle: 'italic', color: '#c8841a', fontSize: isMobile ? '46px' : isTablet ? '58px' : '68px' }}>that speak.</em>
              </h1>

              {/* desc */}
              <p className="dp-a3" style={{ margin: '0 0 16px', fontSize: 16, lineHeight: 1.85, color: '#6b5a45', maxWidth: 400 }}>
                Discover elegant decoration services crafted to transform your event into a visually unforgettable experience.
              </p>

              {/* mini trust row */}
              <div className="dp-a3" style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginBottom: 36 }}>
                {[`${decorations.length}+ Styles`, `${featuredCount}+ Featured`, `From €${minPrice}`].map((t) => (
                  <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#c8841a', flexShrink: 0 }} />
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#9a8878' }}>{t}</span>
                  </div>
                ))}
              </div>

              {/* buttons */}
              <div className="dp-a4" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Link to="/booking" className="dp-btn-gold" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none', background: '#c8841a', color: '#fff', padding: '13px 26px', borderRadius: 99, fontWeight: 700, fontSize: 15, boxShadow: '0 6px 20px rgba(200,132,26,.3)' }}>
                  Book Now
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M2.5 7.5h10M9 4l3.5 3.5L9 11" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </Link>
                <a href="#categories" className="dp-btn-outline" style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none', background: 'transparent', color: '#1a120b', padding: '13px 26px', borderRadius: 99, fontWeight: 700, fontSize: 15, border: '1.5px solid rgba(26,18,11,.3)' }}>
                  Explore ↓
                </a>
              </div>
            </div>

            {/* RIGHT — image, full height, clipped */}
            {!isTablet && (
              <div className="dp-hero-right dp-ai" style={{ position: 'relative', overflow: 'hidden' }}>
                {/* main image */}
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url("https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1000&q=85")', backgroundSize: 'cover', backgroundPosition: 'center' }} />

                {/* subtle left-fade so image blends into ivory bg */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #faf7f2 0%, transparent 18%)' }} />

                {/* dark bottom gradient for readability of badge */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,8,2,.55) 0%, transparent 40%)' }} />

                {/* floating stat cards — bottom left */}
                <div style={{ position: 'absolute', bottom: 32, left: 32, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div style={{ background: 'rgba(255,255,255,.92)', backdropFilter: 'blur(12px)', borderRadius: 14, padding: '12px 18px', border: '1px solid rgba(255,255,255,.6)', boxShadow: '0 8px 24px rgba(0,0,0,.12)' }}>
                    <p style={{ margin: '0 0 2px', fontSize: 10, fontWeight: 700, color: '#c8841a', letterSpacing: '.12em', textTransform: 'uppercase' }}>Available Now</p>
                    <p style={{ margin: 0, fontSize: 16, fontWeight: 800, color: '#1a120b' }}>{decorations.length}+ Decoration Styles</p>
                  </div>
                  <div style={{ background: '#c8841a', borderRadius: 14, padding: '12px 18px', boxShadow: '0 8px 24px rgba(200,132,26,.35)' }}>
                    <p style={{ margin: '0 0 2px', fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,.75)', letterSpacing: '.12em', textTransform: 'uppercase' }}>Starting From</p>
                    <p style={{ margin: 0, fontSize: 16, fontWeight: 800, color: '#fff' }}>€{minPrice} per event</p>
                  </div>
                </div>

                {/* decorative quote top-right */}
                <div style={{ position: 'absolute', top: 32, right: 28, maxWidth: 200, background: 'rgba(26,18,11,.6)', backdropFilter: 'blur(10px)', borderRadius: 14, padding: '14px 16px', border: '1px solid rgba(200,132,26,.25)' }}>
                  <p className="dp-serif" style={{ margin: 0, fontSize: 14, fontStyle: 'italic', color: '#fff', lineHeight: 1.55 }}>
                    "Every space has a story — we help you tell it beautifully."
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── INTRO PULL QUOTE ──────────────────────────────────────────── */}
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: isMobile ? '60px 22px' : '80px 44px' }}>
          <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>
            <div style={{ width: 40, height: 1, background: '#c8841a', margin: '0 auto 24px' }} />
            <p className="dp-serif" style={{ margin: '0 0 20px', fontSize: isMobile ? '26px' : '36px', fontStyle: 'italic', lineHeight: 1.45, color: '#1a120b', fontWeight: 400 }}>
              "A beautifully decorated space doesn't just look good — it makes people <em>feel</em> something."
            </p>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: '#9a8878', letterSpacing: '.12em', textTransform: 'uppercase' }}>MD Creative Team</p>
          </div>
        </div>

        <div className="dp-line" style={{ maxWidth: 1280, margin: '0 auto 0', padding: '0 44px' }}><div /></div>

        {/* ── CATEGORIES ────────────────────────────────────────────────── */}
        <div id="categories" style={{ maxWidth: 1280, margin: '0 auto', padding: isMobile ? '60px 22px 80px' : '80px 44px 100px' }}>

          {/* section heading */}
          <div style={{ display: 'flex', alignItems: isMobile ? 'flex-start' : 'flex-end', justifyContent: 'space-between', gap: 24, marginBottom: 44, flexDirection: isMobile ? 'column' : 'row' }}>
            <div>
              <p style={{ margin: '0 0 10px', fontSize: 12, fontWeight: 700, color: '#c8841a', letterSpacing: '.18em', textTransform: 'uppercase' }}>What We Offer</p>
              <h2 className="dp-serif" style={{ margin: 0, fontSize: isMobile ? '34px' : '52px', fontWeight: 700, color: '#1a120b', lineHeight: 1.05 }}>
                Our Collections
              </h2>
            </div>
            <p style={{ margin: 0, maxWidth: 340, fontSize: 15, color: '#6b5a45', lineHeight: 1.8, flexShrink: 0 }}>
              Each category is a world of its own — explore and find the one that speaks to your celebration.
            </p>
          </div>

          {/* cards */}
          {decorations.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 24px', color: '#9a8878', fontSize: 16, background: '#fff', borderRadius: 20, border: '1px solid #e6d9c4' }}>
              No decoration categories available yet.
            </div>
          ) : (
            <div className="dp-cards-grid" style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: 20 }}>
              {decorations.map((item) => (
                <Link
                  key={item.id}
                  to={`/decorations/${item.slug}`}
                  style={{ textDecoration: 'none' }}
                >
                  <article className="dp-card" style={{ borderRadius: 22, overflow: 'hidden', position: 'relative', height: 400, boxShadow: '0 4px 24px rgba(26,18,11,.09)' }}>

                    {/* full-bleed image */}
                    <div className="dp-card-img" style={{
                      position: 'absolute', inset: 0,
                      backgroundImage: `url(${item.image_url})`,
                      backgroundSize: 'cover', backgroundPosition: 'center',
                    }} />

                    {/* gradient overlay */}
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,8,2,.88) 0%, rgba(15,8,2,.35) 55%, rgba(15,8,2,.04) 100%)' }} />

                    {/* gold hover tint */}
                    <div className="dp-card-overlay" style={{ position: 'absolute', inset: 0, background: 'rgba(200,132,26,.1)', opacity: 0 }} />

                    {/* featured badge top-left */}
                    {item.is_featured && (
                      <div style={{ position: 'absolute', top: 16, left: 16, background: '#c8841a', color: '#fff', fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', padding: '5px 13px', borderRadius: 99 }}>
                        Featured
                      </div>
                    )}

                    {/* price top-right */}
                    <div style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(0,0,0,.45)', backdropFilter: 'blur(8px)', color: '#fff', fontSize: 13, fontWeight: 700, padding: '5px 13px', borderRadius: 99 }}>
                      From €{item.price_from}
                    </div>

                    {/* content bottom */}
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px 26px 26px' }}>
                      <span style={{ display: 'inline-block', background: 'rgba(255,255,255,.13)', color: 'rgba(255,255,255,.9)', fontSize: 11, fontWeight: 700, padding: '4px 11px', borderRadius: 99, letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 10, backdropFilter: 'blur(8px)' }}>
                        {item.category}
                      </span>
                      <h3 className="dp-serif" style={{ margin: '0 0 8px', fontSize: '28px', fontWeight: 700, color: '#fff', lineHeight: 1.1 }}>
                        {item.title}
                      </h3>
                      <p style={{ margin: '0 0 16px', fontSize: 14, color: 'rgba(255,255,255,.7)', lineHeight: 1.65, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden' }}>
                        {item.short_description}
                      </p>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#f0c060', fontSize: 14, fontWeight: 700 }}>
                        View Collection
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="#f0c060" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* ── BOTTOM CTA ────────────────────────────────────────────────── */}
        <div style={{ background: '#fff', borderTop: '1px solid #eddec4', padding: isMobile ? '60px 22px' : '80px 44px' }}>
          <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
            <div style={{ width: 40, height: 1, background: '#c8841a', margin: '0 auto 28px' }} />
            <h2 className="dp-serif" style={{ margin: '0 0 18px', fontSize: isMobile ? '34px' : '52px', fontWeight: 700, color: '#1a120b', lineHeight: 1.1 }}>
              Ready to transform<br />
              <span style={{ fontStyle: 'italic', color: '#c8841a' }}>your space?</span>
            </h2>
            <p style={{ margin: '0 auto 36px', maxWidth: 480, fontSize: 16, color: '#6b5a45', lineHeight: 1.85 }}>
              Choose a decoration style, book a consultation, and let us craft something extraordinary for your celebration.
            </p>
            <div className="dp-cta-btns" style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/booking" className="dp-btn-gold" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none', background: '#c8841a', color: '#fff', padding: '15px 30px', borderRadius: 99, fontWeight: 700, fontSize: 15, boxShadow: '0 6px 20px rgba(200,132,26,.3)' }}>
                Book Decoration Service
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Link>
              <Link to="/packages" className="dp-btn-outline" style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none', background: 'transparent', color: '#1a120b', padding: '15px 30px', borderRadius: 99, fontWeight: 700, fontSize: 15, border: '1.5px solid #1a120b' }}>
                View Packages
              </Link>
            </div>
          </div>
        </div>

      </div>

      <ScrollToTop />
    </>
  );
}