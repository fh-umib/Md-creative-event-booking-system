import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPublicMascots } from '../../services/mascotApi';
import type { Mascot } from '../../services/mascotApi';

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

// ── Scroll-to-top ─────────────────────────────────────────────────────────
function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
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
      }}
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 15V5M10 5L5 10M10 5L15 10" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

// ── Avatar initials with theme color ─────────────────────────────────────
const themeColors: Record<string, { bg: string; text: string }> = {
  Princess:  { bg: '#fce7f3', text: '#be185d' },
  Superhero: { bg: '#e0f2fe', text: '#0369a1' },
  Cartoon:   { bg: '#fef9c3', text: '#a16207' },
  Animal:    { bg: '#dcfce7', text: '#15803d' },
  Fantasy:   { bg: '#f3e8ff', text: '#7c3aed' },
  Disney:    { bg: '#fff1f2', text: '#e11d48' },
  Other:     { bg: '#fef3d0', text: '#92640e' },
};
function getThemeColor(theme: string) {
  return themeColors[theme] || themeColors['Other'];
}

// ── MascotsPage ───────────────────────────────────────────────────────────
export default function MascotsPage() {
  const [mascots, setMascots] = useState<Mascot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('All');
  const width = useWindowWidth();
  const isMobile = width < 640;
  const isTablet = width < 1024;

  useEffect(() => {
    getPublicMascots()
      .then(setMascots)
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load mascots'))
      .finally(() => setLoading(false));
  }, []);

  const themes = useMemo(() => {
    const all = mascots.map((m) => m.theme || 'Other').filter((v, i, a) => a.indexOf(v) === i);
    return ['All', ...all];
  }, [mascots]);

  const filtered = useMemo(() => {
    return mascots.filter((m) => {
      const q = search.toLowerCase();
      const matchSearch =
        m.name.toLowerCase().includes(q) ||
        m.character_name.toLowerCase().includes(q) ||
        (m.theme || '').toLowerCase().includes(q);
      const matchTheme = selectedTheme === 'All' || (m.theme || 'Other') === selectedTheme;
      return matchSearch && matchTheme;
    });
  }, [mascots, search, selectedTheme]);

  // ── Loading ──
  if (loading) {
    return (
      <>
        <style>{`@keyframes mp-spin { to { transform: rotate(360deg); } }`}</style>
        <div style={{ background: '#faf7f2', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', border: '3px solid #e6d9c4', borderTopColor: '#c8841a', animation: 'mp-spin .85s linear infinite', margin: '0 auto 14px' }} />
            <p style={{ margin: 0, color: '#7a6a52', fontSize: 15 }}>Loading characters…</p>
          </div>
        </div>
      </>
    );
  }

  // ── Error ──
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

        .mp { font-family: 'DM Sans', sans-serif; background: #faf7f2; }
        .mp-serif { font-family: 'Cormorant Garamond', serif; }

        @keyframes mp-fadeUp  { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes mp-marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }

        .mp-a1 { animation: mp-fadeUp .5s ease both .05s; }
        .mp-a2 { animation: mp-fadeUp .5s ease both .18s; }
        .mp-a3 { animation: mp-fadeUp .5s ease both .30s; }
        .mp-a4 { animation: mp-fadeUp .5s ease both .42s; }

        /* search input */
        .mp-search:focus {
          border-color: rgba(200,132,26,.8) !important;
          background: rgba(255,255,255,.12) !important;
          box-shadow: 0 0 0 3px rgba(200,132,26,.2);
          outline: none;
        }
        .mp-search::placeholder { color: rgba(255,255,255,.4); }

        /* filter buttons */
        .mp-filter { transition: background .2s, color .2s, border-color .2s, transform .15s; }
        .mp-filter:hover { transform: translateY(-1px); }

        /* cards */
        .mp-card { transition: transform .3s ease, box-shadow .3s ease; }
        .mp-card:hover { transform: translateY(-5px); box-shadow: 0 20px 48px rgba(26,18,11,.12) !important; }

        /* book button */
        .mp-book-btn { transition: background .2s, color .2s; }
        .mp-book-btn:hover { background: #c8841a !important; color: #fff !important; }

        /* cta button */
        .mp-cta-btn { transition: transform .2s, box-shadow .2s; }
        .mp-cta-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(200,132,26,.45) !important; }

        /* ticker */
        .mp-ticker { display: inline-flex; animation: mp-marquee 22s linear infinite; }

        @media (max-width: 639px) {
          .mp-hero-search { max-width: 100% !important; }
          .mp-filter-row  { gap: 8px !important; }
          .mp-grid        { grid-template-columns: 1fr !important; }
          .mp-cta-box     { padding: 48px 22px !important; }
        }
        @media (min-width: 640px) and (max-width: 1023px) {
          .mp-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>

      <div className="mp">

        {/* ── HERO ────────────────────────────────────────────────────── */}
        <div style={{
          background: 'linear-gradient(135deg, #1a120b 0%, #2c1a0a 55%, #1a120b 100%)',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* diagonal texture */}
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(45deg,rgba(200,132,26,.035) 0,rgba(200,132,26,.035) 1px,transparent 1px,transparent 56px)', pointerEvents: 'none' }} />
          {/* glow */}
          <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle,rgba(200,132,26,.16) 0%,transparent 65%)', pointerEvents: 'none' }} />

          <div style={{ maxWidth: 1280, margin: '0 auto', padding: isMobile ? '60px 22px 54px' : '84px 44px 76px', position: 'relative', zIndex: 1, textAlign: 'center' }}>

            {/* eyebrow */}
            <div className="mp-a1" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'rgba(200,132,26,.12)', border: '1px solid rgba(200,132,26,.3)', borderRadius: 99, padding: '8px 20px', marginBottom: 28 }}>
              <span style={{ fontSize: 16 }}>🎭</span>
              <span style={{ color: '#e8b56a', fontSize: 12, fontWeight: 700, letterSpacing: '.15em', textTransform: 'uppercase' }}>
                {mascots.length > 0 ? `${mascots.length}+` : '50+'} Characters Available
              </span>
            </div>

            <h1 className="mp-serif mp-a2" style={{ margin: '0 0 18px', color: '#fff', fontSize: isMobile ? '48px' : isTablet ? '64px' : '82px', lineHeight: 1.02, fontWeight: 700 }}>
              Mascot{' '}
              <em style={{ fontStyle: 'italic', color: '#c8841a' }}>Characters</em>
            </h1>

            <p className="mp-a3" style={{ margin: '0 auto 40px', color: 'rgba(255,255,255,.65)', fontSize: isMobile ? '16px' : '18px', lineHeight: 1.85, maxWidth: 580 }}>
              Bring magic and excitement to your celebration with our beloved character collection. From princesses to superheroes — every child's dream comes to life.
            </p>

            {/* search */}
            <div className="mp-a4" style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ position: 'relative', width: '100%', maxWidth: 520 }} className="mp-hero-search">
                <svg style={{ position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle cx="8" cy="8" r="6" stroke="rgba(255,255,255,.45)" strokeWidth="1.8"/>
                  <path d="M13 13l3 3" stroke="rgba(255,255,255,.45)" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
                <input
                  className="mp-search"
                  type="text"
                  placeholder="Search by name, theme…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{
                    width: '100%', height: 54, borderRadius: 99,
                    border: '1.5px solid rgba(255,255,255,.14)',
                    background: 'rgba(255,255,255,.07)',
                    color: '#fff', padding: '0 22px 0 50px',
                    fontSize: 15, fontFamily: 'inherit',
                    transition: 'border-color .2s, background .2s',
                  }}
                />
              </div>
            </div>
          </div>

          {/* ticker */}
          <div style={{ borderTop: '1px solid rgba(200,132,26,.18)', padding: '13px 0', overflow: 'hidden' }}>
            <div className="mp-ticker">
              {[...Array(2)].map((_, ri) => (
                <span key={ri} style={{ display: 'inline-flex' }}>
                  {['Princess', 'Superhero', 'Disney', 'Cartoon', 'Animal', 'Fantasy', 'Pirate', 'Fairy'].map((t) => (
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

        {/* ── FILTERS + GRID ────────────────────────────────────────────── */}
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: isMobile ? '36px 22px 72px' : '48px 44px 96px' }}>

          {/* filter row */}
          <div className="mp-filter-row" style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 32 }}>
            {themes.map((theme) => {
              const active = selectedTheme === theme;
              return (
                <button
                  key={theme}
                  type="button"
                  className="mp-filter"
                  onClick={() => setSelectedTheme(theme)}
                  style={{
                    padding: '9px 20px', borderRadius: 99, fontSize: 13, fontWeight: 700,
                    cursor: 'pointer', fontFamily: 'inherit',
                    border: active ? 'none' : '1.5px solid #e6d9c4',
                    background: active ? '#c8841a' : '#fff',
                    color: active ? '#fff' : '#6b5a45',
                    boxShadow: active ? '0 4px 16px rgba(200,132,26,.3)' : '0 2px 8px rgba(26,18,11,.04)',
                  }}
                >
                  {theme}
                </button>
              );
            })}
          </div>

          {/* count */}
          <p style={{ margin: '0 0 28px', textAlign: 'center', color: '#9a8878', fontSize: 14, fontWeight: 500 }}>
            Showing <strong style={{ color: '#1a120b' }}>{filtered.length}</strong> character{filtered.length !== 1 ? 's' : ''}
            {selectedTheme !== 'All' && <span style={{ color: '#c8841a' }}> · {selectedTheme}</span>}
          </p>

          {/* empty state */}
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 24px', background: '#fff', borderRadius: 24, border: '1.5px solid #e6d9c4' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🎭</div>
              <h3 style={{ margin: '0 0 10px', fontSize: 26, fontWeight: 800, color: '#1a120b', fontFamily: "'Cormorant Garamond',serif" }}>No characters found</h3>
              <p style={{ margin: 0, color: '#7a6a52', fontSize: 16 }}>Try adjusting your search or filter.</p>
            </div>
          ) : (
            <div className="mp-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 20 }}>
              {filtered.map((item) => {
                const tc = getThemeColor(item.theme || 'Other');
                return (
                  <article key={item.id} className="mp-card" style={{
                    background: '#fff', borderRadius: 22,
                    border: '1.5px solid #e6d9c4',
                    padding: '22px',
                    boxShadow: '0 4px 20px rgba(26,18,11,.06)',
                    display: 'flex', flexDirection: 'column',
                  }}>
                    {/* top row */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 }}>
                      {/* avatar */}
                      <div style={{
                        width: 56, height: 56, borderRadius: 16,
                        background: tc.bg, color: tc.text,
                        fontSize: 26, fontWeight: 800,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: "'Cormorant Garamond',serif",
                        flexShrink: 0,
                      }}>
                        {item.character_name.charAt(0)}
                      </div>

                      {/* availability badge */}
                      <span style={{
                        padding: '5px 12px', borderRadius: 99, fontSize: 12, fontWeight: 700,
                        background: item.is_available ? '#dcfce7' : '#fef9c3',
                        color: item.is_available ? '#15803d' : '#a16207',
                      }}>
                        {item.is_available ? '● Available' : '○ Booked'}
                      </span>
                    </div>

                    {/* name + theme */}
                    <h3 style={{ margin: '0 0 4px', fontSize: 22, fontWeight: 800, color: '#1a120b', lineHeight: 1.1, fontFamily: "'Cormorant Garamond',serif" }}>
                      {item.character_name}
                    </h3>
                    <span style={{
                      display: 'inline-block', marginBottom: 12,
                      background: tc.bg, color: tc.text,
                      fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 99,
                      letterSpacing: '.06em', textTransform: 'uppercase',
                      alignSelf: 'flex-start',
                    }}>
                      {item.theme || item.name}
                    </span>

                    {/* description */}
                    <p style={{ margin: '0 0 auto', color: '#7a6a52', fontSize: 14, lineHeight: 1.75, paddingBottom: 18 }}>
                      {item.description}
                    </p>

                    {/* divider */}
                    <div style={{ height: 1, background: '#f0e9dd', margin: '0 0 16px' }} />

                    {/* price + duration */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                      <span style={{ fontSize: 26, fontWeight: 800, color: '#c8841a', fontFamily: "'Cormorant Garamond',serif" }}>
                        €{item.price}<span style={{ fontSize: 14, fontWeight: 600, color: '#9a8878' }}>/hr</span>
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, color: '#9a8878', fontWeight: 500 }}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <circle cx="7" cy="7" r="5.5" stroke="#9a8878" strokeWidth="1.4"/>
                          <path d="M7 4.5V7l2 1.5" stroke="#9a8878" strokeWidth="1.4" strokeLinecap="round"/>
                        </svg>
                        {item.duration_minutes} min
                      </span>
                    </div>

                    {/* book button */}
                    <Link to="/booking" className="mp-book-btn" style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                      height: 46, borderRadius: 12, textDecoration: 'none',
                      background: '#fef3d0', color: '#92640e',
                      fontWeight: 700, fontSize: 14,
                      border: '1.5px solid #e8d5a0',
                    }}>
                      Book Character
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2.5 7h9M8 3.5l3.5 3.5L8 10.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </Link>
                  </article>
                );
              })}
            </div>
          )}
        </div>

        {/* ── CTA ─────────────────────────────────────────────────────── */}
        <div style={{ padding: isMobile ? '0 22px 72px' : '0 44px 96px' }}>
          <div className="mp-cta-box" style={{
            background: 'linear-gradient(135deg, #1a120b 0%, #2c1a0a 100%)',
            borderRadius: 28, padding: isMobile ? '48px 24px' : '72px 60px',
            textAlign: 'center', position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: -60, right: -60, width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle,rgba(200,132,26,.18) 0%,transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: -40, left: -40, width: 240, height: 240, borderRadius: '50%', background: 'radial-gradient(circle,rgba(200,132,26,.1) 0%,transparent 70%)', pointerEvents: 'none' }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <p style={{ margin: '0 0 10px', color: '#c8841a', fontSize: 12, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase' }}>
                Found Your Favorites?
              </p>
              <h2 className="mp-serif" style={{ margin: '0 0 16px', color: '#fff', fontSize: isMobile ? '30px' : '50px', fontWeight: 700, lineHeight: 1.1 }}>
                Add characters to your<br />
                <em style={{ fontStyle: 'italic', color: '#c8841a' }}>perfect celebration.</em>
              </h2>
              <p style={{ margin: '0 auto 36px', color: 'rgba(255,255,255,.6)', fontSize: 16, lineHeight: 1.85, maxWidth: 520 }}>
                Create an unforgettable event with playful characters your guests will love. Combine with decorations and activities for the ultimate package.
              </p>
              <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to="/booking" className="mp-cta-btn" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  textDecoration: 'none', background: '#c8841a', color: '#fff',
                  padding: '15px 30px', borderRadius: 99, fontWeight: 700, fontSize: 15,
                  boxShadow: '0 6px 24px rgba(200,132,26,.35)',
                }}>
                  Book Characters
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