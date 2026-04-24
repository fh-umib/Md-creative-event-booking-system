import { useMemo, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

type GalleryItem = {
  id: number;
  title: string;
  category: 'All' | 'Decorations' | 'Mascots' | 'Activities' | 'Photo Booth' | 'Packages';
  image: string;
  description: string;
};

const galleryItems: GalleryItem[] = [
  { id: 1, title: 'Princess Birthday Setup', category: 'Decorations', image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80', description: 'Elegant pastel balloon styling with luxury birthday table details.' },
  { id: 2, title: 'Mascot Celebration', category: 'Mascots', image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1200&q=80', description: 'Interactive mascot moment full of joy, energy, and smiles.' },
  { id: 3, title: 'Photo Booth Corner', category: 'Photo Booth', image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80', description: 'Modern event booth corner prepared for photos and instant memories.' },
  { id: 4, title: 'Kids Activity Zone', category: 'Activities', image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1200&q=80', description: 'Creative children activities arranged for active and playful events.' },
  { id: 5, title: 'Luxury Balloon Wall', category: 'Decorations', image: 'https://images.unsplash.com/photo-1464349153735-7db50ed83c84?auto=format&fit=crop&w=1200&q=80', description: 'High-end decorative wall with balloon composition and themed styling.' },
  { id: 6, title: 'Bubble & Bounce Package', category: 'Packages', image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80', description: 'A premium package look combining fun structure and event styling.' },
  { id: 7, title: 'Birthday Table Design', category: 'Decorations', image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80', description: 'Refined birthday table styling with coordinated colors and details.' },
  { id: 8, title: 'Happy Mascot Entrance', category: 'Mascots', image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=80', description: 'A memorable entrance moment for children at a special celebration.' },
];

const filters: GalleryItem['category'][] = ['All', 'Decorations', 'Mascots', 'Activities', 'Photo Booth', 'Packages'];

// ── Hooks ─────────────────────────────────────────────────────────────────
function useWindowWidth() {
  const [w, setW] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  useEffect(() => {
    const fn = () => setW(window.innerWidth);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);
  return w;
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
        position: 'fixed', bottom: 28, right: 24, zIndex: 1000,
        width: 48, height: 48, borderRadius: '50%',
        background: '#c8841a', border: 'none', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 4px 20px rgba(200,132,26,.45)',
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
    if (!started || target === 0) { setCount(target); return; }
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

// ── StatCount ─────────────────────────────────────────────────────────────
function StatCount({ target, suffix = '', label, isMobile }: {
  target: number; suffix?: string; label: string; isMobile: boolean;
}) {
  const { count, ref } = useCountUp(target);
  return (
    <div ref={ref} style={{ textAlign: 'center', padding: isMobile ? '20px 12px' : '28px 20px' }}>
      <p className="gp-serif" style={{ margin: '0 0 6px', fontSize: isMobile ? '28px' : 'clamp(28px,3vw,42px)', fontWeight: 700, color: '#1a120b', lineHeight: 1 }}>
        {count.toLocaleString()}{suffix}
      </p>
      <p style={{ margin: 0, fontSize: 14, color: '#9a8878' }}>{label}</p>
    </div>
  );
}


export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState<GalleryItem['category']>('All');
  const [selected, setSelected] = useState<GalleryItem | null>(null);
  const width = useWindowWidth();
  const isMobile = width < 640;
  const isTablet = width < 1024;

  const filtered = useMemo(() => {
    if (activeFilter === 'All') return galleryItems;
    return galleryItems.filter((i) => i.category === activeFilter);
  }, [activeFilter]);

  // lock body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = selected ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selected]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=DM+Sans:wght@400;500;600;700&display=swap');

        .gp { font-family: 'DM Sans', sans-serif; background: #faf7f2; }
        .gp-serif { font-family: 'Cormorant Garamond', serif; }

        @keyframes gp-fadeUp  { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes gp-marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes gp-modalIn { from{opacity:0;transform:scale(.94)} to{opacity:1;transform:scale(1)} }
        @keyframes gp-overlayIn { from{opacity:0} to{opacity:1} }

        .gp-a1 { animation: gp-fadeUp .55s ease both .05s; }
        .gp-a2 { animation: gp-fadeUp .55s ease both .18s; }
        .gp-a3 { animation: gp-fadeUp .55s ease both .30s; }

        .gp-ticker { display: inline-flex; animation: gp-marquee 26s linear infinite; }

        /* filters */
        .gp-filter { transition: background .2s, color .2s, border-color .2s, transform .15s; }
        .gp-filter:hover:not(.active) { transform: translateY(-1px); border-color: #c8841a !important; color: #c8841a !important; }

        /* gallery cards */
        .gp-card { transition: transform .35s ease, box-shadow .35s ease; cursor: pointer; }
        .gp-card:hover { transform: translateY(-6px) scale(1.01); box-shadow: 0 24px 52px rgba(26,18,11,.18) !important; }
        .gp-card:hover .gp-card-img { transform: scale(1.06); }
        .gp-card-img { transition: transform .5s ease; width: 100%; height: 100%; object-fit: cover; display: block; }
        .gp-card:hover .gp-overlay { background: linear-gradient(180deg,rgba(20,10,2,.06) 0%,rgba(20,10,2,.85) 100%) !important; }
        .gp-overlay { transition: background .3s; }

        /* stat card */
        .gp-stat { transition: transform .25s, box-shadow .25s; }
        .gp-stat:hover { transform: translateY(-3px); box-shadow: 0 16px 40px rgba(26,18,11,.1) !important; }

        /* modal */
        .gp-modal-overlay { animation: gp-overlayIn .22s ease; }
        .gp-modal-card    { animation: gp-modalIn .28s cubic-bezier(.34,1.56,.64,1); }
        .gp-close:hover { background: #c8841a !important; }

        /* bottom cta */
        .gp-cta-btn { transition: transform .2s, box-shadow .2s; }
        .gp-cta-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(200,132,26,.45) !important; }

        /* ── RESPONSIVE ── */
        @media (max-width: 639px) {
          .gp-stats-grid  { grid-template-columns: 1fr !important; gap: 12px !important; }
          .gp-gallery-grid { grid-template-columns: 1fr !important; }
          .gp-filter-row  { gap: 8px !important; }
          .gp-modal-inner { flex-direction: column !important; }
          .gp-modal-img   { height: 240px !important; width: 100% !important; flex-shrink: 0; }
          .gp-cta-btns    { flex-direction: column !important; }
          .gp-cta-btns a  { text-align: center; }
        }
        @media (min-width: 640px) and (max-width: 1023px) {
          .gp-stats-grid   { grid-template-columns: repeat(3, 1fr) !important; }
          .gp-gallery-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (min-width: 1024px) {
          .gp-gallery-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
      `}</style>

      <div className="gp">

        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <div style={{ background: 'linear-gradient(135deg,#1a120b 0%,#2c1a0a 55%,#1a120b 100%)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(45deg,rgba(200,132,26,.035) 0,rgba(200,132,26,.035) 1px,transparent 1px,transparent 56px)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle,rgba(200,132,26,.15) 0%,transparent 65%)', pointerEvents: 'none' }} />

          <div style={{ maxWidth: 1280, margin: '0 auto', padding: isMobile ? '60px 22px 54px' : '84px 44px 76px', position: 'relative', zIndex: 1, textAlign: 'center' }}>
            <div className="gp-a1" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'rgba(200,132,26,.12)', border: '1px solid rgba(200,132,26,.3)', borderRadius: 99, padding: '8px 20px', marginBottom: 28 }}>
              <span style={{ fontSize: 15 }}>📷</span>
              <span style={{ color: '#e8b56a', fontSize: 12, fontWeight: 700, letterSpacing: '.15em', textTransform: 'uppercase' }}>Our Portfolio</span>
            </div>

            <h1 className="gp-serif gp-a2" style={{ margin: '0 0 18px', color: '#fff', fontSize: isMobile ? '52px' : isTablet ? '68px' : '86px', lineHeight: 1.0, fontWeight: 700 }}>
              Event{' '}
              <em style={{ fontStyle: 'italic', color: '#c8841a' }}>Gallery</em>
            </h1>

            <p className="gp-a3" style={{ margin: '0 auto', color: 'rgba(255,255,255,.65)', fontSize: isMobile ? '16px' : '18px', lineHeight: 1.85, maxWidth: 580 }}>
              Browse photos from our past events — decorations, mascot appearances, activities, and beautiful celebrations we've brought to life.
            </p>
          </div>

          {/* ticker */}
          <div style={{ borderTop: '1px solid rgba(200,132,26,.18)', padding: '13px 0', overflow: 'hidden' }}>
            <div className="gp-ticker">
              {[...Array(2)].map((_, ri) => (
                <span key={ri} style={{ display: 'inline-flex' }}>
                  {['Decorations', 'Mascots', 'Activities', 'Photo Booth', 'Packages', 'Weddings', 'Birthdays', 'Engagements'].map((t) => (
                    <span key={t} style={{ display: 'inline-flex', alignItems: 'center', gap: 16, paddingRight: 40 }}>
                      <span style={{ color: '#c8841a', fontSize: 13 }}>✦</span>
                      <span style={{ color: 'rgba(255,255,255,.45)', fontSize: 12, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase' }}>{t}</span>
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── STATS ────────────────────────────────────────────────────── */}
        <div style={{ padding: '0 22px', marginTop: isMobile ? '-36px' : '-48px', position: 'relative', zIndex: 2 }}>
          <div className="gp-stats-grid" style={{ maxWidth: 860, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', background: '#fff', borderRadius: 22, boxShadow: '0 18px 48px rgba(26,18,11,.09)', overflow: 'hidden' }}>
            <StatCount target={250} suffix="+" label="Captured Moments" isMobile={isMobile} />
            <div style={{ borderLeft: '1px solid #f0e9dd' }}>
              <StatCount target={800} suffix="+" label="Events Styled" isMobile={isMobile} />
            </div>
            <div style={{ borderLeft: '1px solid #f0e9dd' }}>
              <StatCount target={6} suffix="" label="Service Categories" isMobile={isMobile} />
            </div>
          </div>
        </div>

        {/* ── GALLERY ──────────────────────────────────────────────────── */}
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: isMobile ? '52px 22px 72px' : '72px 44px 96px' }}>

          {/* heading */}
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <p style={{ margin: '0 0 8px', color: '#c8841a', fontSize: 12, fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase' }}>Explore Moments</p>
            <h2 className="gp-serif" style={{ margin: 0, fontSize: isMobile ? '32px' : '48px', fontWeight: 700, color: '#1a120b', lineHeight: 1.08 }}>
              See our celebration <em style={{ fontStyle: 'italic', color: '#c8841a' }}>highlights.</em>
            </h2>
          </div>

          {/* filters */}
          <div className="gp-filter-row" style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 36 }}>
            {filters.map((f) => {
              const active = f === activeFilter;
              return (
                <button key={f} type="button" className={`gp-filter${active ? ' active' : ''}`}
                  onClick={() => setActiveFilter(f)}
                  style={{
                    padding: '9px 20px', borderRadius: 99, fontSize: 13, fontWeight: 700,
                    cursor: 'pointer', fontFamily: 'inherit',
                    border: active ? 'none' : '1.5px solid #e6d9c4',
                    background: active ? '#c8841a' : '#fff',
                    color: active ? '#fff' : '#6b5a45',
                    boxShadow: active ? '0 4px 16px rgba(200,132,26,.3)' : '0 2px 8px rgba(26,18,11,.04)',
                  }}>
                  {f}
                </button>
              );
            })}
          </div>

          {/* grid */}
          <div className="gp-gallery-grid" style={{ display: 'grid', gap: 18 }}>
            {filtered.map((item) => (
                <article key={item.id} className="gp-card"
                  onClick={() => setSelected(item)}
                  style={{ position: 'relative', height: 340, borderRadius: 22, overflow: 'hidden', boxShadow: '0 6px 24px rgba(26,18,11,.09)' }}>

                  <img src={item.image} alt={item.title} className="gp-card-img" />

                  {/* gradient overlay always visible */}
                  <div className="gp-overlay" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(20,10,2,.08) 0%,rgba(20,10,2,.78) 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '16px' }}>
                    {/* category tag — always top left */}
                    <span style={{ alignSelf: 'flex-start', background: '#c8841a', color: '#fff', borderRadius: 99, padding: '5px 13px', fontSize: 11, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase' }}>
                      {item.category}
                    </span>

                    {/* text bottom */}
                    <div>
                      <h3 className="gp-serif" style={{ margin: '0 0 6px', color: '#fff', fontSize: '22px', fontWeight: 700, lineHeight: 1.1 }}>{item.title}</h3>
                      <p style={{ margin: '0 0 12px', color: 'rgba(255,255,255,.75)', fontSize: 13, lineHeight: 1.65 }}>{item.description}</p>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, color: '#f0c060', fontSize: 13, fontWeight: 700 }}>
                        View
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 6.5h9M8 3l3.5 3.5L8 10" stroke="#f0c060" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
          </div>

          {/* bottom note */}
          <div style={{ marginTop: 44, background: '#fff', border: '1.5px solid #e6d9c4', borderRadius: 22, padding: isMobile ? '28px 22px' : '36px 44px', textAlign: 'center', boxShadow: '0 4px 20px rgba(26,18,11,.05)' }}>
            <div style={{ fontSize: 32, marginBottom: 14 }}>🎉</div>
            <h3 className="gp-serif" style={{ margin: '0 0 10px', fontSize: isMobile ? '24px' : '34px', fontWeight: 700, color: '#1a120b' }}>
              Want your event featured here next?
            </h3>
            <p style={{ margin: '0 auto 28px', maxWidth: 560, color: '#7a6a52', fontSize: 15, lineHeight: 1.8 }}>
              We create stylish, joyful, and memorable celebrations with decorations, mascots, activities, and custom event experiences.
            </p>
            <div className="gp-cta-btns" style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/booking" className="gp-cta-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none', background: '#c8841a', color: '#fff', padding: '13px 26px', borderRadius: 99, fontWeight: 700, fontSize: 15, boxShadow: '0 6px 20px rgba(200,132,26,.3)' }}>
                Book Your Event
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M2.5 7.5h10M9 4l3.5 3.5L9 11" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
              <Link to="/packages" style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none', background: 'transparent', color: '#1a120b', padding: '13px 26px', borderRadius: 99, fontWeight: 700, fontSize: 15, border: '1.5px solid #d8cfc3' }}>
                View Packages
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── MODAL ────────────────────────────────────────────────────── */}
      {selected && (
        <div className="gp-modal-overlay"
          onClick={() => setSelected(null)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(10,6,2,.82)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: isMobile ? '16px' : '32px', zIndex: 9999 }}>

          <div className="gp-modal-card"
            onClick={(e) => e.stopPropagation()}
            style={{ width: '100%', maxWidth: 960, background: '#fff', borderRadius: 24, overflow: 'hidden', position: 'relative', boxShadow: '0 24px 64px rgba(0,0,0,.35)', maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}>

            {/* close */}
            <button className="gp-close"
              onClick={() => setSelected(null)}
              style={{ position: 'absolute', top: 14, right: 14, width: 38, height: 38, borderRadius: '50%', border: 'none', background: 'rgba(26,18,11,.7)', color: '#fff', fontSize: 20, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2, transition: 'background .2s' }}>
              ✕
            </button>

            <div className="gp-modal-inner" style={{ display: 'flex', flex: 1, overflow: 'auto' }}>
              {/* image */}
              <div className="gp-modal-img" style={{ width: isMobile ? '100%' : '60%', flexShrink: 0, height: isMobile ? 260 : 'auto', minHeight: isMobile ? 0 : 480 }}>
                <img src={selected.image} alt={selected.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>

              {/* content */}
              <div style={{ padding: isMobile ? '22px' : '36px', display: 'flex', flexDirection: 'column', justifyContent: 'center', flex: 1 }}>
                <span style={{ display: 'inline-block', background: '#fef3d0', color: '#92640e', borderRadius: 99, padding: '5px 14px', fontSize: 12, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 16, alignSelf: 'flex-start' }}>
                  {selected.category}
                </span>
                <h3 className="gp-serif" style={{ margin: '0 0 14px', fontSize: isMobile ? '26px' : '36px', fontWeight: 700, color: '#1a120b', lineHeight: 1.1 }}>{selected.title}</h3>
                <p style={{ margin: '0 0 28px', color: '#7a6a52', fontSize: 15, lineHeight: 1.8 }}>{selected.description}</p>
                <Link to="/booking" onClick={() => setSelected(null)} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, alignSelf: 'flex-start', textDecoration: 'none', background: '#c8841a', color: '#fff', padding: '12px 24px', borderRadius: 99, fontWeight: 700, fontSize: 14, boxShadow: '0 4px 16px rgba(200,132,26,.3)' }}>
                  Book This Style
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3.5l3.5 3.5L8 10.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <ScrollToTop />
    </>
  );
}