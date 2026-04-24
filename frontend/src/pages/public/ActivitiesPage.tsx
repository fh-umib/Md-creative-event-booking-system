import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPublicActivities } from '../../services/activityApi';
import type { Activity } from '../../services/activityApi';

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

// ── Icon map by activity name keywords ───────────────────────────────────
function getActivityIcon(name: string): string {
  const n = name.toLowerCase();
  if (n.includes('face') || n.includes('paint')) return '🎨';
  if (n.includes('bounce') || n.includes('jump')) return '🏠';
  if (n.includes('bubble')) return '🫧';
  if (n.includes('photo') || n.includes('360')) return '📸';
  if (n.includes('music') || n.includes('dj')) return '🎵';
  if (n.includes('balloon')) return '🎈';
  if (n.includes('magic')) return '🪄';
  if (n.includes('dance')) return '💃';
  if (n.includes('game')) return '🎮';
  if (n.includes('candy') || n.includes('food')) return '🍭';
  return '✨';
}

// ── ActivitiesPage ─────────────────────────────────────────────────────────
export default function ActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const width = useWindowWidth();
  const isMobile = width < 640;
  const isTablet = width < 1024;

  useEffect(() => {
    getPublicActivities()
      .then(setActivities)
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load activities'))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return activities.filter((a) =>
      `${a.name} ${a.description || ''}`.toLowerCase().includes(q)
    );
  }, [activities, search]);

  const activeCount = activities.filter((a) => a.is_active).length;

  // ── Loading ──
  if (loading) {
    return (
      <>
        <style>{`@keyframes ap-spin { to { transform: rotate(360deg); } }`}</style>
        <div style={{ background: '#faf7f2', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', border: '3px solid #e6d9c4', borderTopColor: '#c8841a', animation: 'ap-spin .85s linear infinite', margin: '0 auto 14px' }} />
            <p style={{ margin: 0, color: '#7a6a52', fontSize: 15 }}>Loading activities…</p>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <div style={{ background: '#faf7f2', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <div style={{ background: '#fff1f1', color: '#991b1b', border: '1.5px solid #fecaca', borderRadius: 16, padding: '28px 36px', fontSize: 15 }}>{error}</div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=DM+Sans:wght@400;500;600;700&display=swap');

        .ap { font-family: 'DM Sans', sans-serif; background: #faf7f2; }
        .ap-serif { font-family: 'Cormorant Garamond', serif; }

        @keyframes ap-fadeUp  { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes ap-marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }

        .ap-a1 { animation: ap-fadeUp .55s ease both .05s; }
        .ap-a2 { animation: ap-fadeUp .55s ease both .18s; }
        .ap-a3 { animation: ap-fadeUp .55s ease both .30s; }
        .ap-a4 { animation: ap-fadeUp .55s ease both .42s; }

        .ap-ticker { display: inline-flex; animation: ap-marquee 22s linear infinite; }

        /* search */
        .ap-search:focus {
          border-color: #c8841a !important;
          box-shadow: 0 0 0 3px rgba(200,132,26,.14) !important;
          outline: none;
        }

        /* cards */
        .ap-card { transition: transform .3s ease, box-shadow .3s ease; }
        .ap-card:hover { transform: translateY(-5px); box-shadow: 0 20px 48px rgba(26,18,11,.12) !important; }
        .ap-card:hover .ap-card-icon { background: #c8841a !important; color: #fff !important; }
        .ap-card-icon { transition: background .25s, color .25s; }

        /* book btn */
        .ap-book-btn { transition: background .2s, color .2s; }
        .ap-book-btn:hover { background: #c8841a !important; color: #fff !important; border-color: #c8841a !important; }

        /* cta btn */
        .ap-cta-btn { transition: transform .2s, box-shadow .2s; }
        .ap-cta-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(200,132,26,.45) !important; }

        @media (max-width: 639px) {
          .ap-grid       { grid-template-columns: 1fr !important; }
          .ap-hero-pills { gap: 8px !important; }
          .ap-cta-btns   { flex-direction: column !important; }
          .ap-cta-btns a { text-align: center; }
        }
        @media (min-width: 640px) and (max-width: 1023px) {
          .ap-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>

      <div className="ap">

        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <div style={{
          background: 'linear-gradient(135deg, #1a120b 0%, #2c1a0a 55%, #1a120b 100%)',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(45deg,rgba(200,132,26,.035) 0,rgba(200,132,26,.035) 1px,transparent 1px,transparent 56px)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle,rgba(200,132,26,.15) 0%,transparent 65%)', pointerEvents: 'none' }} />

          <div style={{ maxWidth: 1280, margin: '0 auto', padding: isMobile ? '60px 22px 54px' : '84px 44px 76px', position: 'relative', zIndex: 1, textAlign: 'center' }}>

            {/* eyebrow */}
            <div className="ap-a1" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'rgba(200,132,26,.12)', border: '1px solid rgba(200,132,26,.3)', borderRadius: 99, padding: '8px 20px', marginBottom: 28 }}>
              <span style={{ fontSize: 15 }}>🎪</span>
              <span style={{ color: '#e8b56a', fontSize: 12, fontWeight: 700, letterSpacing: '.15em', textTransform: 'uppercase' }}>Unforgettable Entertainment</span>
            </div>

            <h1 className="ap-serif ap-a2" style={{ margin: '0 0 18px', color: '#fff', fontSize: isMobile ? '44px' : isTablet ? '62px' : '80px', lineHeight: 1.02, fontWeight: 700 }}>
              Activities &{' '}
              <em style={{ fontStyle: 'italic', color: '#c8841a' }}>Entertainment</em>
            </h1>

            <p className="ap-a3" style={{ margin: '0 auto 36px', color: 'rgba(255,255,255,.65)', fontSize: isMobile ? '16px' : '18px', lineHeight: 1.85, maxWidth: 560 }}>
              Unique entertainment services and attractions that make every event extraordinary — exclusive experiences available only in Kosovo.
            </p>

            {/* stat pills */}
            <div className="ap-hero-pills ap-a4" style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 40 }}>
              {[
                { icon: '🎯', label: `${activities.length} Activities` },
                { icon: '✅', label: `${activeCount} Available Now` },
                { icon: '🇽🇰', label: 'Only in Kosovo' },
              ].map((p) => (
                <div key={p.label} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 99, padding: '9px 18px' }}>
                  <span style={{ fontSize: 14 }}>{p.icon}</span>
                  <span style={{ color: 'rgba(255,255,255,.82)', fontSize: 13, fontWeight: 600 }}>{p.label}</span>
                </div>
              ))}
            </div>

            {/* search */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ position: 'relative', width: '100%', maxWidth: 500 }}>
                <svg style={{ position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle cx="8" cy="8" r="6" stroke="rgba(26,18,11,.4)" strokeWidth="1.8"/>
                  <path d="M13 13l3 3" stroke="rgba(26,18,11,.4)" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
                <input
                  className="ap-search"
                  type="text"
                  placeholder="Search activities…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{
                    width: '100%', height: 54, borderRadius: 99,
                    border: '1.5px solid #e6d9c4',
                    background: '#fff',
                    color: '#1a120b', padding: '0 22px 0 50px',
                    fontSize: 15, fontFamily: 'inherit',
                    boxShadow: '0 4px 20px rgba(26,18,11,.08)',
                    transition: 'border-color .2s, box-shadow .2s',
                  }}
                />
              </div>
            </div>
          </div>

          {/* ticker */}
          <div style={{ borderTop: '1px solid rgba(200,132,26,.18)', padding: '13px 0', overflow: 'hidden' }}>
            <div className="ap-ticker">
              {[...Array(2)].map((_, ri) => (
                <span key={ri} style={{ display: 'inline-flex' }}>
                  {['Face Painting', 'Bounce House', 'Bubble Show', '360° Photo', 'Music & DJ', 'Balloon Art', 'Magic Show', 'Candy Bar'].map((t) => (
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

        {/* ── GRID ─────────────────────────────────────────────────────── */}
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: isMobile ? '48px 22px 72px' : '64px 44px 96px' }}>

          {/* result count */}
          {search && (
            <p style={{ margin: '0 0 24px', textAlign: 'center', color: '#9a8878', fontSize: 14, fontWeight: 500 }}>
              Showing <strong style={{ color: '#1a120b' }}>{filtered.length}</strong> result{filtered.length !== 1 ? 's' : ''} for "<span style={{ color: '#c8841a' }}>{search}</span>"
            </p>
          )}

          {/* empty */}
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 24px', background: '#fff', borderRadius: 24, border: '1.5px solid #e6d9c4' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🎪</div>
              <h3 className="ap-serif" style={{ margin: '0 0 10px', fontSize: 28, fontWeight: 700, color: '#1a120b' }}>No activities found</h3>
              <p style={{ margin: 0, color: '#7a6a52', fontSize: 15 }}>Try changing your search and explore more options.</p>
            </div>
          ) : (
            <div className="ap-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 20 }}>
              {filtered.map((item) => (
                <article key={item.id} className="ap-card" style={{
                  background: '#fff', borderRadius: 22,
                  border: '1.5px solid #e6d9c4',
                  padding: '24px',
                  boxShadow: '0 4px 20px rgba(26,18,11,.06)',
                  display: 'flex', flexDirection: 'column',
                }}>
                  {/* top row: icon + status */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 }}>
                    <div className="ap-card-icon" style={{
                      width: 52, height: 52, borderRadius: 15,
                      background: '#fef3d0', color: '#c8841a',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 24, flexShrink: 0,
                    }}>
                      {getActivityIcon(item.name)}
                    </div>
                    <span style={{
                      padding: '5px 12px', borderRadius: 99, fontSize: 12, fontWeight: 700,
                      background: item.is_active ? '#dcfce7' : '#fee2e2',
                      color: item.is_active ? '#15803d' : '#b91c1c',
                    }}>
                      {item.is_active ? '● Available' : '○ Unavailable'}
                    </span>
                  </div>

                  {/* title */}
                  <h3 className="ap-serif" style={{ margin: '0 0 10px', fontSize: 24, fontWeight: 700, color: '#1a120b', lineHeight: 1.1 }}>
                    {item.name}
                  </h3>

                  {/* description */}
                  <p style={{ margin: '0 0 auto', color: '#7a6a52', fontSize: 14, lineHeight: 1.75, paddingBottom: 18 }}>
                    {item.description}
                  </p>

                  {/* divider */}
                  <div style={{ height: 1, background: '#f0e9dd', margin: '0 0 16px' }} />

                  {/* price + duration */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                    <span className="ap-serif" style={{ fontSize: 28, fontWeight: 700, color: '#c8841a', lineHeight: 1 }}>
                      €{item.price}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, color: '#9a8878', fontWeight: 500 }}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <circle cx="7" cy="7" r="5.5" stroke="#9a8878" strokeWidth="1.4"/>
                        <path d="M7 4.5V7l2 1.5" stroke="#9a8878" strokeWidth="1.4" strokeLinecap="round"/>
                      </svg>
                      {item.duration_minutes} min
                    </span>
                  </div>

                  {/* book btn */}
                  <Link to="/booking" className="ap-book-btn" style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    height: 46, borderRadius: 12, textDecoration: 'none',
                    background: '#fef3d0', color: '#92640e',
                    fontWeight: 700, fontSize: 14,
                    border: '1.5px solid #e8d5a0',
                  }}>
                    Add to Booking
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                      <path d="M2 6.5h9M8 3l3.5 3.5L8 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                </article>
              ))}
            </div>
          )}
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
            <div style={{ position: 'absolute', bottom: -40, left: -40, width: 220, height: 220, borderRadius: '50%', background: 'radial-gradient(circle,rgba(200,132,26,.1) 0%,transparent 70%)', pointerEvents: 'none' }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <p style={{ margin: '0 0 10px', color: '#c8841a', fontSize: 12, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase' }}>
                Make Your Event Unforgettable
              </p>
              <h2 className="ap-serif" style={{ margin: '0 0 16px', color: '#fff', fontSize: isMobile ? '28px' : '46px', fontWeight: 700, lineHeight: 1.1 }}>
                Combine activities with mascots,<br />
                <em style={{ fontStyle: 'italic', color: '#c8841a' }}>decorations & photo booths.</em>
              </h2>
              <p style={{ margin: '0 auto 36px', color: 'rgba(255,255,255,.6)', fontSize: 16, lineHeight: 1.85, maxWidth: 520 }}>
                Choose the right extras and create an experience your guests will never forget — from the first balloon to the last photo.
              </p>
              <div className="ap-cta-btns" style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to="/booking" className="ap-cta-btn" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  textDecoration: 'none', background: '#c8841a', color: '#fff',
                  padding: '15px 30px', borderRadius: 99, fontWeight: 700, fontSize: 15,
                  boxShadow: '0 6px 24px rgba(200,132,26,.35)',
                }}>
                  Start Planning
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
                <Link to="/packages" style={{
                  display: 'inline-flex', alignItems: 'center',
                  textDecoration: 'none', background: 'rgba(255,255,255,.08)', color: '#fff',
                  padding: '15px 28px', borderRadius: 99, fontWeight: 700, fontSize: 15,
                  border: '1px solid rgba(255,255,255,.18)',
                }}>
                  View Packages
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>

      <ScrollToTop />
    </>
  );
}