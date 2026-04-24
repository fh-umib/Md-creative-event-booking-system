import  { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';

// ── Nav items ─────────────────────────────────────────────────────────────
const navItems = [
  { label: 'Home',        path: '/' },
  { label: 'Decorations', path: '/decorations' },
  { label: 'Mascots',     path: '/mascots' },
  { label: 'Activities',  path: '/activities' },
  { label: 'Photo Booth', path: '/photo-booth' },
  { label: 'Packages',    path: '/packages' },
  { label: 'Gallery',     path: '/gallery' },
  { label: 'Our Team',    path: '/our-team' },
  { label: 'Reviews',     path: '/reviews' },
];

export default function PublicLayout() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // header shadow on scroll
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // close menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const fn = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('mousedown', fn);
    return () => window.removeEventListener('mousedown', fn);
  }, [menuOpen]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        body { margin: 0; background: #faf7f2; }

        .pl-root { font-family: 'DM Sans', sans-serif; min-height: 100vh; display: flex; flex-direction: column; background: #faf7f2; }
        .pl-serif { font-family: 'Cormorant Garamond', serif; }

        /* ── HEADER ── */
        .pl-header {
          position: sticky; top: 0; z-index: 1000;
          height: 76px;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 32px;
          background: rgba(250,247,242,0.92);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border-bottom: 1px solid transparent;
          transition: border-color .3s, box-shadow .3s;
        }
        .pl-header.scrolled {
          border-color: #e8ddd0;
          box-shadow: 0 4px 24px rgba(26,18,11,.07);
        }

        /* brand */
        .pl-brand { display: flex; align-items: center; gap: 12px; text-decoration: none; flex-shrink: 0; }
        .pl-logo {
          width: 50px; height: 50px; border-radius: 16px;
          background: linear-gradient(135deg, #d4911e 0%, #b87318 100%);
          color: #fff; font-family: 'Cormorant Garamond', serif;
          font-size: 20px; font-weight: 700;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 6px 18px rgba(200,132,26,.35);
          letter-spacing: .5px;
          transition: transform .2s;
        }
        .pl-brand:hover .pl-logo { transform: rotate(-4deg) scale(1.04); }
        .pl-brand-text { display: flex; flex-direction: column; line-height: 1; }
        .pl-brand-name { font-family: 'Cormorant Garamond', serif; font-size: 19px; font-weight: 700; color: #1a120b; letter-spacing: .3px; }
        .pl-brand-sub  { margin-top: 3px; font-size: 9px; font-weight: 700; color: #c8841a; letter-spacing: .18em; text-transform: uppercase; }

        /* header actions */
        .pl-actions { display: flex; align-items: center; gap: 10px; position: relative; }

        .pl-btn-book {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 11px 22px; border: none; border-radius: 99px;
          background: linear-gradient(135deg, #d4911e 0%, #c8841a 100%);
          color: #fff; font-family: 'DM Sans', sans-serif;
          font-size: 14px; font-weight: 700; cursor: pointer;
          box-shadow: 0 4px 16px rgba(200,132,26,.35);
          transition: transform .2s, box-shadow .2s;
          white-space: nowrap;
        }
        .pl-btn-book:hover { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(200,132,26,.45); }

        .pl-btn-signin {
          padding: 11px 20px; border: 1.5px solid #d8cfc3;
          border-radius: 99px; background: transparent;
          color: #1a120b; font-family: 'DM Sans', sans-serif;
          font-size: 14px; font-weight: 600; cursor: pointer;
          transition: border-color .2s, background .2s;
          white-space: nowrap;
        }
        .pl-btn-signin:hover { border-color: #c8841a; background: rgba(200,132,26,.05); }

        .pl-btn-menu {
          display: flex; align-items: center; gap: 8px;
          padding: 11px 18px; border: none; border-radius: 14px;
          background: #1a120b; color: #fff;
          font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 700;
          cursor: pointer; transition: background .2s;
          white-space: nowrap;
        }
        .pl-btn-menu:hover { background: #2e1d0e; }
        .pl-btn-menu svg { transition: transform .3s; }
        .pl-btn-menu.open svg { transform: rotate(90deg); }

        /* dropdown */
        .pl-dropdown {
          position: absolute; top: calc(100% + 12px); right: 0;
          width: 300px;
          background: #fff;
          border: 1px solid #e8ddd0;
          border-radius: 22px;
          box-shadow: 0 20px 60px rgba(26,18,11,.15);
          overflow: hidden;
          animation: pl-dropIn .22s ease;
        }
        @keyframes pl-dropIn {
          from { opacity: 0; transform: translateY(-8px) scale(.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .pl-dropdown-head {
          display: flex; align-items: center; justify-content: space-between;
          padding: 18px 20px 14px;
          border-bottom: 1px solid #f0e9dd;
          background: linear-gradient(135deg, #faf7f2 0%, #fff 100%);
        }
        .pl-dropdown-title { font-family: 'Cormorant Garamond', serif; font-size: 20px; font-weight: 700; color: #1a120b; }
        .pl-dropdown-sub   { font-size: 12px; color: #c8841a; font-weight: 600; letter-spacing: .08em; margin-top: 2px; }
        .pl-dropdown-close {
          width: 32px; height: 32px; border-radius: 50%;
          border: 1px solid #e8ddd0; background: #faf7f2;
          color: #6b5a45; font-size: 14px; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background .2s;
        }
        .pl-dropdown-close:hover { background: #f0e9dd; }

        .pl-dropdown-nav { padding: 12px; display: flex; flex-direction: column; gap: 2px; }

        .pl-nav-link {
          display: flex; align-items: center; justify-content: space-between;
          padding: 11px 14px; border-radius: 12px;
          text-decoration: none; color: #1a120b;
          font-size: 14px; font-weight: 600;
          transition: background .18s, color .18s;
        }
        .pl-nav-link:hover { background: #faf0e0; color: #c8841a; }
        .pl-nav-link.active { background: linear-gradient(135deg, #d4911e, #c8841a); color: #fff; }
        .pl-nav-link .arrow { opacity: 0; transform: translateX(-4px); transition: opacity .18s, transform .18s; font-size: 12px; }
        .pl-nav-link:hover .arrow { opacity: 1; transform: translateX(0); }
        .pl-nav-link.active .arrow { opacity: 1; }

        /* ── FOOTER ── */
        .pl-footer { background: #1a120b; margin-top: auto; }

        .pl-footer-top {
          max-width: 1280px; margin: 0 auto;
          padding: 64px 44px 48px;
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr 1fr;
          gap: 48px;
        }

        .pl-footer-brand {}
        .pl-footer-logo-row { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
        .pl-footer-logo {
          width: 48px; height: 48px; border-radius: 14px;
          background: linear-gradient(135deg, #d4911e, #b87318);
          color: #fff; font-family: 'Cormorant Garamond', serif;
          font-size: 19px; font-weight: 700;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 16px rgba(200,132,26,.4);
        }
        .pl-footer-brand-name { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 700; color: #fff; }
        .pl-footer-brand-sub  { font-size: 10px; font-weight: 700; color: #c8841a; letter-spacing: .16em; text-transform: uppercase; margin-top: 2px; }

        .pl-footer-desc { margin: 0 0 24px; font-size: 14px; line-height: 1.85; color: rgba(255,255,255,.5); max-width: 300px; }

        .pl-socials { display: flex; gap: 10px; }
        .pl-social {
          width: 40px; height: 40px; border-radius: 50%;
          border: 1px solid rgba(255,255,255,.12);
          background: rgba(255,255,255,.05);
          color: rgba(255,255,255,.6);
          display: flex; align-items: center; justify-content: center;
          font-size: 13px; font-weight: 700; cursor: pointer;
          transition: background .2s, border-color .2s, color .2s;
          text-decoration: none;
        }
        .pl-social:hover { background: #c8841a; border-color: #c8841a; color: #fff; }

        /* ── FOOTER ── */
        .pl-footer { background: #120d07; position: relative; overflow: hidden; }

        /* big decorative text behind */
        .pl-footer-bg-text {
          position: absolute; bottom: 60px; left: 50%; transform: translateX(-50%);
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(80px, 12vw, 160px); font-weight: 700;
          color: rgba(200,132,26,.04); white-space: nowrap;
          pointer-events: none; user-select: none; letter-spacing: -.02em;
          line-height: 1;
        }

        /* top CTA band */
        .pl-footer-cta {
          position: relative; z-index: 1;
          border-bottom: 1px solid rgba(255,255,255,.06);
          padding: 56px 44px;
          display: flex; align-items: center; justify-content: space-between;
          gap: 32px; flex-wrap: wrap;
          max-width: 1280px; margin: 0 auto;
        }
        .pl-footer-cta-left {}
        .pl-footer-cta-tag { font-size: 11px; font-weight: 700; color: #c8841a; letter-spacing: .2em; text-transform: uppercase; margin-bottom: 12px; display: flex; align-items: center; gap: 10px; }
        .pl-footer-cta-tag::before { content: ''; display: block; width: 24px; height: 1px; background: #c8841a; }
        .pl-footer-cta-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(28px, 4vw, 48px); font-weight: 700; color: #fff; line-height: 1.08; margin: 0; }
        .pl-footer-cta-title em { font-style: italic; color: #c8841a; }
        .pl-footer-cta-btn {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 15px 32px; border-radius: 99px; border: none;
          background: linear-gradient(135deg, #d4911e, #c8841a);
          color: #fff; font-family: 'DM Sans', sans-serif;
          font-size: 15px; font-weight: 700; cursor: pointer; text-decoration: none;
          box-shadow: 0 8px 28px rgba(200,132,26,.4);
          transition: transform .2s, box-shadow .2s; white-space: nowrap;
          flex-shrink: 0;
        }
        .pl-footer-cta-btn:hover { transform: translateY(-2px); box-shadow: 0 14px 40px rgba(200,132,26,.5); }

        /* main grid */
        .pl-footer-top {
          position: relative; z-index: 1;
          max-width: 1280px; margin: 0 auto;
          padding: 52px 44px 44px;
          display: grid;
          grid-template-columns: 1.6fr 1fr 1fr 1fr;
          gap: 48px;
          border-bottom: 1px solid rgba(255,255,255,.06);
        }

        .pl-footer-brand {}
        .pl-footer-logo-row { display: flex; align-items: center; gap: 12px; margin-bottom: 18px; }
        .pl-footer-logo {
          width: 48px; height: 48px; border-radius: 14px;
          background: linear-gradient(135deg, #d4911e, #b87318);
          color: #fff; font-family: 'Cormorant Garamond', serif;
          font-size: 19px; font-weight: 700;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 16px rgba(200,132,26,.4);
        }
        .pl-footer-brand-name { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 700; color: #fff; }
        .pl-footer-brand-sub  { font-size: 10px; font-weight: 700; color: rgba(200,132,26,.7); letter-spacing: .16em; text-transform: uppercase; margin-top: 2px; }

        .pl-footer-desc { margin: 0 0 28px; font-size: 14px; line-height: 1.9; color: rgba(255,255,255,.4); max-width: 280px; }

        /* stats row in brand col */
        .pl-footer-stats { display: flex; gap: 0; margin-bottom: 28px; }
        .pl-footer-stat { flex: 1; padding: 14px 0; border-right: 1px solid rgba(255,255,255,.07); }
        .pl-footer-stat:last-child { border-right: none; padding-left: 16px; }
        .pl-footer-stat:first-child { padding-right: 16px; }
        .pl-footer-stat-num { font-family: 'Cormorant Garamond', serif; font-size: 26px; font-weight: 700; color: #c8841a; line-height: 1; margin-bottom: 3px; }
        .pl-footer-stat-label { font-size: 11px; color: rgba(255,255,255,.35); letter-spacing: .06em; }

        .pl-footer-col {}
        .pl-footer-heading {
          font-size: 11px; font-weight: 700; color: rgba(200,132,26,.8);
          letter-spacing: .18em; text-transform: uppercase;
          margin: 0 0 22px; padding-bottom: 14px;
          border-bottom: 1px solid rgba(255,255,255,.06);
        }
        .pl-footer-links { display: flex; flex-direction: column; gap: 2px; }
        .pl-footer-link {
          text-decoration: none; color: rgba(255,255,255,.45);
          font-size: 14px; font-weight: 500; padding: 7px 0;
          transition: color .2s, padding-left .2s;
          display: block; border-bottom: 1px solid rgba(255,255,255,.04);
        }
        .pl-footer-link:last-child { border-bottom: none; }
        .pl-footer-link:hover { color: #fff; padding-left: 6px; }

        .pl-contact-list { display: flex; flex-direction: column; gap: 2px; }
        .pl-contact-item {
          display: flex; align-items: flex-start; gap: 12px;
          padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,.04);
        }
        .pl-contact-item:last-child { border-bottom: none; }
        .pl-contact-icon {
          width: 34px; height: 34px; border-radius: 9px; flex-shrink: 0;
          background: rgba(200,132,26,.12); border: 1px solid rgba(200,132,26,.2);
          display: flex; align-items: center; justify-content: center;
          font-size: 13px; margin-top: 1px;
        }
        .pl-contact-label { font-size: 11px; color: rgba(255,255,255,.3); letter-spacing: .06em; text-transform: uppercase; margin-bottom: 2px; }
        .pl-contact-val   { font-size: 13px; color: rgba(255,255,255,.75); font-weight: 600; }

        /* notice bar */
        .pl-footer-notice {
          position: relative; z-index: 1;
          padding: 14px 44px;
          display: flex; align-items: center; justify-content: center; gap: 10px;
          color: rgba(200,132,26,.8); font-size: 13px; font-weight: 600; text-align: center;
          background: rgba(200,132,26,.07);
          border-bottom: 1px solid rgba(200,132,26,.12);
        }

        /* bottom bar */
        .pl-footer-bottom {
          position: relative; z-index: 1;
          max-width: 1280px; margin: 0 auto;
          padding: 18px 44px 26px;
          display: flex; justify-content: space-between; align-items: center;
          gap: 16px; flex-wrap: wrap;
          color: rgba(255,255,255,.2); font-size: 12px;
        }
        .pl-footer-bottom a { color: rgba(255,255,255,.35); text-decoration: none; transition: color .2s; }
        .pl-footer-bottom a:hover { color: #c8841a; }
        .pl-footer-dot { width: 3px; height: 3px; border-radius: 50%; background: rgba(255,255,255,.15); display: inline-block; vertical-align: middle; margin: 0 8px; }

        /* footer responsive */
        @media (max-width: 767px) {
          .pl-header { padding: 0 18px; height: 66px; }
          .pl-btn-signin { display: none; }
          .pl-brand-sub { display: none; }
          .pl-footer-top { grid-template-columns: 1fr !important; gap: 32px; padding: 40px 22px 36px; }
          .pl-footer-notice { padding: 14px 22px; }
          .pl-footer-bottom { padding: 16px 22px 24px; flex-direction: column; text-align: center; gap: 8px; }
          .pl-footer-bg-text { display: none; }
          .pl-footer-stats { display: none; }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .pl-footer-top { grid-template-columns: 1fr 1fr !important; gap: 32px; padding: 44px 32px 36px; }
          .pl-footer-cta { padding: 44px 32px; }
          .pl-footer-notice { padding: 14px 32px; }
          .pl-footer-bottom { padding: 16px 32px 22px; }
        }
      `}</style>

      <div className="pl-root">

        {/* ══ HEADER ══════════════════════════════════════════════════════ */}
        <header className={`pl-header${scrolled ? ' scrolled' : ''}`}>

          {/* Brand */}
          <Link to="/" className="pl-brand">
            <div className="pl-logo">MD</div>
            <div className="pl-brand-text">
              <span className="pl-brand-name pl-serif">Creative</span>
              <span className="pl-brand-sub">Event Services</span>
            </div>
          </Link>

          {/* Actions */}
          <div className="pl-actions" ref={menuRef}>
            <button className="pl-btn-book" onClick={() => navigate('/booking')}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="1" y="2" width="12" height="11" rx="2" stroke="#fff" strokeWidth="1.5"/>
                <path d="M1 6h12M5 1v2M9 1v2" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              Book Now
            </button>

            <button className="pl-btn-signin" onClick={() => navigate('/signin')}>
              Sign In
            </button>

            <button className={`pl-btn-menu${menuOpen ? ' open' : ''}`} onClick={() => setMenuOpen(p => !p)}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 4h12M2 8h12M2 12h12" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
              Menu
            </button>

            {/* Dropdown */}
            {menuOpen && (
              <div className="pl-dropdown">
                <div className="pl-dropdown-head">
                  <div className="pl-dropdown-sub" style={{ fontSize: 13, letterSpacing: '.06em' }}>MD Creative</div>
                  <button className="pl-dropdown-close" onClick={() => setMenuOpen(false)}>✕</button>
                </div>

                <nav className="pl-dropdown-nav">
                  {navItems.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      end={item.path === '/'}
                      onClick={() => setMenuOpen(false)}
                      className={({ isActive }) => `pl-nav-link${isActive ? ' active' : ''}`}
                    >
                      {item.label}
                      <span className="arrow">→</span>
                    </NavLink>
                  ))}

                  {/* Admin link subtle */}
                  <div style={{ margin: '8px 0 4px', height: 1, background: '#f0e9dd' }} />
                  <NavLink to="/admin/login" onClick={() => setMenuOpen(false)} className="pl-nav-link" style={{ color: '#9a8878', fontSize: 13 }}>
                    Admin Panel
                    <span className="arrow">→</span>
                  </NavLink>
                </nav>
              </div>
            )}
          </div>
        </header>

        {/* ══ MAIN ════════════════════════════════════════════════════════ */}
        <main style={{ flex: 1 }}>
          <Outlet />
        </main>

        {/* ══ FOOTER ══════════════════════════════════════════════════════ */}
        <footer className="pl-footer">

          {/* big decorative ghost text */}
          <div className="pl-footer-bg-text">MD Creative</div>

          {/* ── TOP CTA BAND ── */}
          <div style={{ borderBottom: '1px solid rgba(255,255,255,.06)' }}>
            <div className="pl-footer-cta">
              <div className="pl-footer-cta-left">
                <div className="pl-footer-cta-tag">Ready to celebrate?</div>
                <h2 className="pl-footer-cta-title">
                  Let's create something<br />
                  <em>truly unforgettable.</em>
                </h2>
              </div>
              <Link to="/booking" className="pl-footer-cta-btn">
                Book Your Event
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          </div>

          {/* ── MAIN GRID ── */}
          <div className="pl-footer-top">

            {/* Brand + stats */}
            <div className="pl-footer-brand">
              <div className="pl-footer-logo-row">
                <div className="pl-footer-logo pl-serif">MD</div>
                <div>
                  <div className="pl-footer-brand-name pl-serif">Creative</div>
                  <div className="pl-footer-brand-sub">Event Services</div>
                </div>
              </div>

              <p className="pl-footer-desc">
                Premium event services in Kosovo. Elegant decorations, mascot entertainment, activities, and unforgettable celebrations for every special moment.
              </p>

              {/* mini stats */}
              <div className="pl-footer-stats">
                {[
                  { num: '5K+', label: 'Happy clients' },
                  { num: '800+', label: 'Events done' },
                  { num: '200+', label: '5★ reviews' },
                ].map((s) => (
                  <div key={s.label} className="pl-footer-stat">
                    <div className="pl-footer-stat-num">{s.num}</div>
                    <div className="pl-footer-stat-label">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* socials */}
              <div className="pl-socials">
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="pl-social" title="Instagram">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                  </svg>
                </a>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="pl-social" title="Facebook">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </a>
                <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="pl-social" title="TikTok" style={{ fontSize: 10, fontWeight: 800, letterSpacing: '-.5px' }}>
                  TT
                </a>
              </div>
            </div>

            {/* Services */}
            <div className="pl-footer-col">
              <h4 className="pl-footer-heading">Services</h4>
              <div className="pl-footer-links">
                {[
                  { label: 'Decorations',       path: '/decorations' },
                  { label: 'Mascot Characters', path: '/mascots' },
                  { label: 'Activities',         path: '/activities' },
                  { label: 'Photo Experiences',  path: '/photo-booth' },
                  { label: 'Event Packages',     path: '/packages' },
                ].map((l) => (
                  <Link key={l.path} to={l.path} className="pl-footer-link">{l.label}</Link>
                ))}
              </div>
            </div>

            {/* Company */}
            <div className="pl-footer-col">
              <h4 className="pl-footer-heading">Company</h4>
              <div className="pl-footer-links">
                {[
                  { label: 'Event Gallery', path: '/gallery' },
                  { label: 'Our Team',      path: '/our-team' },
                  { label: 'Reviews',       path: '/reviews' },
                  { label: 'Book an Event', path: '/booking' },
                  { label: 'My Account',    path: '/signin' },
                ].map((l) => (
                  <Link key={l.path} to={l.path} className="pl-footer-link">{l.label}</Link>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="pl-footer-col">
              <h4 className="pl-footer-heading">Get in Touch</h4>
              <div className="pl-contact-list">
                {[
                  { icon: '📞', label: 'Phone', val: '+383 44 378 786' },
                  { icon: '✉',  label: 'Email', val: 'info@mdcreative.com' },
                  { icon: '📍', label: 'Location', val: 'Prishtina, Kosovo' },
                ].map((c) => (
                  <div key={c.label} className="pl-contact-item">
                    <div className="pl-contact-icon">{c.icon}</div>
                    <div>
                      <div className="pl-contact-label">{c.label}</div>
                      <div className="pl-contact-val">{c.val}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* peak notice */}
          <div className="pl-footer-notice">
            <span>📅</span>
            <span>June – September is peak season — book at least <strong style={{ color: '#c8841a' }}>1 week in advance</strong> to secure your date.</span>
          </div>

          {/* bottom bar */}
          <div className="pl-footer-bottom">
            <span>© 2026 MD Creative — All rights reserved.</span>
            <span>
              <a href="/decorations">Decorations</a>
              <span className="pl-footer-dot" />
              <a href="/mascots">Mascots</a>
              <span className="pl-footer-dot" />
              <a href="/booking">Book Now</a>
            </span>
          </div>

        </footer>

      </div>
    </>
  );
}