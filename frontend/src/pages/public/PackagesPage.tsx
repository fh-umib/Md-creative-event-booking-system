import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPackageCategories } from '../../services/packageApi';

type PackageCategorySummary = {
  category: string;
  min_price: number;
  max_price: number;
  total_packages: number;
};

const categoryMeta: Record<string, { title: string; description: string; image: string; label: string; icon: string }> = {
  mascot: {
    title: 'Mascot Packages',
    description: 'Fun mascot combinations with music, face painting, photography, and interactive children entertainment.',
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=80',
    label: 'Most Popular',
    icon: '🎭',
  },
  'bounce-house': {
    title: 'Bounce House Packages',
    description: 'Energetic packages with bounce house setups, decoration, assistants, mascots, and event fun for kids.',
    image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80',
    label: 'Play Zone',
    icon: '🏠',
  },
  'bubble-bounce': {
    title: 'Bubble & Bounce Packages',
    description: 'Premium bubble and bounce combinations with balloons, assistants, mascots, face painting, and photography.',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80',
    label: 'Premium Combo',
    icon: '✨',
  },
};

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
        position: 'fixed', bottom: 28, right: 24, zIndex: 999,
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

// ── Main ──────────────────────────────────────────────────────────────────
export default function PackagesPage() {
  const [categories, setCategories] = useState<PackageCategorySummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const width = useWindowWidth();
  const isMobile = width < 640;
  const isTablet = width < 1024;

  useEffect(() => {
    getPackageCategories()
      .then((data) => setCategories(data as PackageCategorySummary[]))
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load packages'))
      .finally(() => setLoading(false));
  }, []);

  const mapped = useMemo(() => categories.map((item) => ({
    ...item,
    ...(categoryMeta[item.category] ?? {
      title: item.category,
      description: 'Explore available packages in this category.',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
      label: 'Category',
      icon: '🎉',
    }),
  })), [categories]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=DM+Sans:wght@400;500;600;700&display=swap');

        .pp { font-family: 'DM Sans', sans-serif; background: #faf7f2; }
        .pp-serif { font-family: 'Cormorant Garamond', serif; }

        @keyframes pp-fadeUp  { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pp-marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }

        .pp-a1 { animation: pp-fadeUp .55s ease both .05s; }
        .pp-a2 { animation: pp-fadeUp .55s ease both .18s; }
        .pp-a3 { animation: pp-fadeUp .55s ease both .30s; }

        .pp-ticker { display: inline-flex; animation: pp-marquee 24s linear infinite; }

        /* cards */
        .pp-card { transition: transform .35s ease, box-shadow .35s ease; }
        .pp-card:hover { transform: translateY(-6px); box-shadow: 0 24px 52px rgba(26,18,11,.14) !important; }
        .pp-card:hover .pp-card-img { transform: scale(1.04); }
        .pp-card-img { transition: transform .5s ease; }
        .pp-card:hover .pp-card-overlay { opacity: 1 !important; }
        .pp-card-overlay { transition: opacity .3s; }

        /* view button */
        .pp-view-btn { transition: background .2s, color .2s, gap .2s; }
        .pp-view-btn:hover { background: #c8841a !important; color: #fff !important; }

        /* note hover */
        .pp-note { transition: border-color .2s, box-shadow .2s; }
        .pp-note:hover { border-color: #c8841a !important; box-shadow: 0 4px 20px rgba(200,132,26,.1) !important; }

        @media (max-width: 639px) {
          .pp-grid     { grid-template-columns: 1fr !important; }
          .pp-cta-btns { flex-direction: column !important; }
          .pp-cta-btns a { text-align: center; }
        }
        @media (min-width: 640px) and (max-width: 1023px) {
          .pp-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>

      <div className="pp">

        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <div style={{
          background: 'linear-gradient(135deg, #1a120b 0%, #2c1a0a 55%, #1a120b 100%)',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(45deg,rgba(200,132,26,.035) 0,rgba(200,132,26,.035) 1px,transparent 1px,transparent 56px)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle,rgba(200,132,26,.14) 0%,transparent 65%)', pointerEvents: 'none' }} />

          <div style={{ maxWidth: 1280, margin: '0 auto', padding: isMobile ? '60px 22px 54px' : '84px 44px 76px', position: 'relative', zIndex: 1, textAlign: 'center' }}>

            <div className="pp-a1" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'rgba(200,132,26,.12)', border: '1px solid rgba(200,132,26,.3)', borderRadius: 99, padding: '8px 20px', marginBottom: 28 }}>
              <span style={{ fontSize: 15 }}>🎁</span>
              <span style={{ color: '#e8b56a', fontSize: 12, fontWeight: 700, letterSpacing: '.15em', textTransform: 'uppercase' }}>Flexible Pricing</span>
            </div>

            <h1 className="pp-serif pp-a2" style={{ margin: '0 0 18px', color: '#fff', fontSize: isMobile ? '48px' : isTablet ? '64px' : '82px', lineHeight: 1.02, fontWeight: 700 }}>
              Event{' '}
              <em style={{ fontStyle: 'italic', color: '#c8841a' }}>Packages</em>
            </h1>

            <p className="pp-a3" style={{ margin: '0 auto', color: 'rgba(255,255,255,.65)', fontSize: isMobile ? '16px' : '18px', lineHeight: 1.85, maxWidth: 560 }}>
              Choose the package category that fits your celebration and find the perfect combination of services, entertainment, and magic.
            </p>
          </div>

          {/* ticker */}
          <div style={{ borderTop: '1px solid rgba(200,132,26,.18)', padding: '13px 0', overflow: 'hidden' }}>
            <div className="pp-ticker">
              {[...Array(2)].map((_, ri) => (
                <span key={ri} style={{ display: 'inline-flex' }}>
                  {['Mascot Packages', 'Bounce House', 'Bubble & Bounce', 'Face Painting', 'Photography', 'Music & DJ', 'Decorations', 'Custom Combos'].map((t) => (
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

        {/* ── SECTION HEADING + GRID ────────────────────────────────────── */}
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: isMobile ? '52px 22px 72px' : '72px 44px 96px' }}>

          <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 48px' }}>
            <p style={{ margin: '0 0 8px', color: '#c8841a', fontSize: 12, fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase' }}>Choose Your Package</p>
            <h2 className="pp-serif" style={{ margin: '0 0 14px', fontSize: isMobile ? '32px' : '48px', fontWeight: 700, color: '#1a120b', lineHeight: 1.08 }}>
              Pick the type that fits<br />
              <em style={{ fontStyle: 'italic', color: '#c8841a' }}>your celebration.</em>
            </h2>
            <p style={{ margin: 0, color: '#7a6a52', fontSize: 16, lineHeight: 1.8 }}>
              Each category contains multiple packages with different inclusions and price points.
            </p>
          </div>

          {/* loading */}
          {loading && (
            <>
              <style>{`@keyframes pp-spin { to { transform: rotate(360deg); } }`}</style>
              <div style={{ textAlign: 'center', padding: '60px 0' }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', border: '3px solid #e6d9c4', borderTopColor: '#c8841a', animation: 'pp-spin .85s linear infinite', margin: '0 auto 14px' }} />
                <p style={{ margin: 0, color: '#7a6a52', fontSize: 15 }}>Loading packages…</p>
              </div>
            </>
          )}

          {/* error */}
          {!loading && error && (
            <div style={{ background: '#fff1f1', color: '#991b1b', border: '1.5px solid #fecaca', borderRadius: 16, padding: '28px', textAlign: 'center', fontSize: 15 }}>{error}</div>
          )}

          {/* empty */}
          {!loading && !error && mapped.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 24px', background: '#fff', borderRadius: 20, border: '1.5px solid #e6d9c4', color: '#7a6a52', fontSize: 16 }}>
              No package categories found.
            </div>
          )}

          {/* cards */}
          {!loading && !error && mapped.length > 0 && (
            <div className="pp-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 22 }}>
              {mapped.map((cat) => (
                <article key={cat.category} className="pp-card" style={{ background: '#fff', borderRadius: 24, overflow: 'hidden', border: '1.5px solid #e6d9c4', boxShadow: '0 6px 24px rgba(26,18,11,.06)' }}>

                  {/* image */}
                  <div style={{ height: 220, overflow: 'hidden', position: 'relative' }}>
                    <div className="pp-card-img" style={{
                      position: 'absolute', inset: 0,
                      backgroundImage: `url("${cat.image}")`,
                      backgroundSize: 'cover', backgroundPosition: 'center',
                    }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(20,10,2,.55) 0%, transparent 55%)' }} />
                    <div className="pp-card-overlay" style={{ position: 'absolute', inset: 0, background: 'rgba(200,132,26,.08)', opacity: 0 }} />

                    {/* label badge top-left */}
                    <div style={{ position: 'absolute', top: 14, left: 14, background: '#c8841a', color: '#fff', fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', padding: '5px 13px', borderRadius: 99 }}>
                      {cat.label}
                    </div>

                    {/* icon bottom-right */}
                    <div style={{ position: 'absolute', bottom: 14, right: 14, width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,.15)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
                      {cat.icon}
                    </div>
                  </div>

                  {/* content */}
                  <div style={{ padding: '22px' }}>
                    <h3 className="pp-serif" style={{ margin: '0 0 10px', fontSize: 26, fontWeight: 700, color: '#1a120b', lineHeight: 1.1 }}>{cat.title}</h3>
                    <p style={{ margin: '0 0 20px', color: '#7a6a52', fontSize: 14, lineHeight: 1.75, minHeight: 72 }}>{cat.description}</p>

                    {/* price + meta row */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 18, paddingBottom: 18, borderBottom: '1px solid #f0e9dd' }}>
                      <div>
                        <p style={{ margin: '0 0 2px', fontSize: 11, color: '#9a8878', fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase' }}>Starting from</p>
                        <span className="pp-serif" style={{ fontSize: 32, fontWeight: 700, color: '#c8841a', lineHeight: 1 }}>€{cat.min_price}</span>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <p style={{ margin: '0 0 2px', fontSize: 11, color: '#9a8878', fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase' }}>Up to</p>
                        <span style={{ fontSize: 16, fontWeight: 700, color: '#6b5a45' }}>€{cat.max_price}</span>
                      </div>
                    </div>

                    {/* packages count + cta */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                      <span style={{ fontSize: 13, color: '#9a8878', fontWeight: 600 }}>
                        {cat.total_packages} package{cat.total_packages !== 1 ? 's' : ''} available
                      </span>
                      <Link to={`/packages/${cat.category}`} className="pp-view-btn" style={{
                        display: 'inline-flex', alignItems: 'center', gap: 8,
                        textDecoration: 'none', background: '#fef3d0', color: '#92640e',
                        padding: '10px 18px', borderRadius: 12,
                        fontSize: 13, fontWeight: 700,
                        border: '1.5px solid #e8d5a0',
                      }}>
                        View Packages
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                          <path d="M2 6.5h9M8 3l3.5 3.5L8 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* ── CUSTOM NOTE ──────────────────────────────────────────────── */}
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: isMobile ? '0 22px 48px' : '0 44px 64px' }}>
          <div className="pp-note" style={{
            background: '#fff', borderRadius: 20,
            border: '1.5px solid #e6d9c4',
            padding: isMobile ? '24px 22px' : '28px 36px',
            display: 'flex', alignItems: isMobile ? 'flex-start' : 'center',
            gap: 20, flexDirection: isMobile ? 'column' : 'row',
            boxShadow: '0 4px 16px rgba(26,18,11,.04)',
          }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: '#fef3d0', border: '1.5px solid #e8d5a0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>
              💬
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ margin: '0 0 4px', fontSize: 14, fontWeight: 700, color: '#1a120b' }}>Need something custom?</p>
              <p style={{ margin: 0, fontSize: 14, color: '#7a6a52', lineHeight: 1.75 }}>
                If none of these packages fit perfectly, we will prepare a custom offer just for you — tailored to your event, budget, and vision.
              </p>
            </div>
            <Link to="/booking" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, flexShrink: 0,
              textDecoration: 'none', background: '#c8841a', color: '#fff',
              padding: '12px 22px', borderRadius: 99, fontWeight: 700, fontSize: 14,
              boxShadow: '0 4px 14px rgba(200,132,26,.3)',
              whiteSpace: 'nowrap',
            }}>
              Request Custom
            </Link>
          </div>
        </div>

        {/* ── BOTTOM CTA ───────────────────────────────────────────────── */}
        <div style={{ padding: isMobile ? '0 22px 72px' : '0 44px 96px' }}>
          <div style={{
            maxWidth: 900, margin: '0 auto',
            background: 'linear-gradient(135deg, #1a120b 0%, #2c1a0a 100%)',
            borderRadius: 28, padding: isMobile ? '44px 24px' : '60px 64px',
            textAlign: 'center', position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: -60, right: -60, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle,rgba(200,132,26,.18) 0%,transparent 70%)', pointerEvents: 'none' }} />
            <p style={{ margin: '0 0 10px', color: '#c8841a', fontSize: 12, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase' }}>Ready to celebrate?</p>
            <h2 className="pp-serif" style={{ margin: '0 0 16px', color: '#fff', fontSize: isMobile ? '30px' : '46px', fontWeight: 700, lineHeight: 1.1 }}>
              Book your package today<br />
              <em style={{ fontStyle: 'italic', color: '#c8841a' }}>and leave the rest to us.</em>
            </h2>
            <p style={{ margin: '0 auto 36px', color: 'rgba(255,255,255,.6)', fontSize: 16, lineHeight: 1.85, maxWidth: 500 }}>
              Choose a package, customize your event details, and our team will handle everything from setup to the last smile.
            </p>
            <div className="pp-cta-btns" style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/booking" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                textDecoration: 'none', background: '#c8841a', color: '#fff',
                padding: '15px 30px', borderRadius: 99, fontWeight: 700, fontSize: 15,
                boxShadow: '0 6px 24px rgba(200,132,26,.35)',
              }}>
                Book Now
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <Link to="/decorations" style={{
                display: 'inline-flex', alignItems: 'center',
                textDecoration: 'none', background: 'rgba(255,255,255,.08)', color: '#fff',
                padding: '15px 28px', borderRadius: 99, fontWeight: 700, fontSize: 15,
                border: '1px solid rgba(255,255,255,.18)',
              }}>
                Explore Decorations
              </Link>
            </div>
          </div>
        </div>

      </div>

      <ScrollToTop />
    </>
  );
}