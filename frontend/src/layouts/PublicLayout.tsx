import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';


const navItems = [
  { label: 'Ballina', path: '/' },
  { label: 'Dekorime', path: '/decorations' },
  { label: 'Maskota', path: '/mascots' },
  { label: 'Aktivitete', path: '/activities' },
  { label: 'Photo Booth', path: '/photo-booth' },
  { label: 'Paketat', path: '/packages' },
  { label: 'Galeria', path: '/gallery' },
  { label: 'Ekipi Ynë', path: '/our-team' },
  { label: 'Vlerësimet', path: '/reviews' },
   { label: 'Admin', path: '/admin/login' },
];

const EMAIL = 'mdcreative.bookin@gmail.com';
const PHONE_DISPLAY = '+383 44 378 786';
const PHONE_LINK = '+38344378786';

export default function PublicLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('mousedown', handleClickOutside);

    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  const goToBooking = () => {
    navigate('/booking');
    setMenuOpen(false);
  };

  const goToSignIn = () => {
    navigate('/signin');
    setMenuOpen(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@400;500;600;700;800&display=swap');

        *,
        *::before,
        *::after {
          box-sizing: border-box;
        }

        html,
        body,
        #root {
          width: 100%;
          max-width: 100%;
          overflow-x: hidden;
        }

        body {
          margin: 0;
          background: #faf7f2;
        }

        .pl-root {
          width: 100%;
          max-width: 100%;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: #faf7f2;
          font-family: 'DM Sans', sans-serif;
          overflow-x: hidden;
        }

        .pl-header {
          position: sticky;
          top: 0;
          z-index: 1000;
          width: 100%;
          max-width: 100%;
          height: 76px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(250, 247, 242, 0.94);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border-bottom: 1px solid transparent;
          transition: border-color .3s ease, box-shadow .3s ease;
          overflow: hidden;
        }

        .pl-header.scrolled {
          border-color: #e8ddd0;
          box-shadow: 0 4px 24px rgba(26, 18, 11, .07);
        }

        .pl-header-inner {
          width: 100%;
          max-width: 1440px;
          height: 100%;
          margin: 0 auto;
          padding: 0 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          min-width: 0;
        }

        .pl-brand {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          flex-shrink: 0;
          min-width: 0;
        }

        .pl-logo {
          width: 50px;
          height: 50px;
          border-radius: 16px;
          background: linear-gradient(135deg, #d4911e 0%, #b87318 100%);
          color: #fff;
          font-family: 'Cormorant Garamond', serif;
          font-size: 20px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 6px 18px rgba(200, 132, 26, .35);
          letter-spacing: .5px;
          transition: transform .2s ease;
          flex-shrink: 0;
        }

        .pl-brand:hover .pl-logo {
          transform: rotate(-4deg) scale(1.04);
        }

        .pl-brand-text {
          display: flex;
          flex-direction: column;
          line-height: 1;
          min-width: 0;
        }

        .pl-brand-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 19px;
          font-weight: 700;
          color: #1a120b;
          letter-spacing: .3px;
          white-space: nowrap;
        }

        .pl-brand-sub {
          margin-top: 3px;
          font-size: 9px;
          font-weight: 700;
          color: #c8841a;
          letter-spacing: .18em;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .pl-nav {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 4px;
          min-width: 0;
        }

        .pl-nav-link {
          text-decoration: none;
          color: #6b5a45;
          font-size: 13px;
          font-weight: 800;
          padding: 9px 10px;
          border-radius: 999px;
          transition: background .2s ease, color .2s ease;
          white-space: nowrap;
        }

        .pl-nav-link:hover,
        .pl-nav-link.active {
          background: #fef3d0;
          color: #92640e;
        }

        .pl-actions {
          display: flex;
          align-items: center;
          gap: 10px;
          position: relative;
          flex-shrink: 0;
          min-width: 0;
        }

        .pl-btn-book {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          padding: 11px 22px;
          border: none;
          border-radius: 99px;
          background: linear-gradient(135deg, #d4911e 0%, #c8841a 100%);
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 800;
          cursor: pointer;
          box-shadow: 0 4px 16px rgba(200, 132, 26, .35);
          transition: transform .2s ease, box-shadow .2s ease;
          white-space: nowrap;
        }

        .pl-btn-book:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(200, 132, 26, .45);
        }

        .pl-btn-signin {
          padding: 11px 20px;
          border: 1.5px solid #d8cfc3;
          border-radius: 99px;
          background: transparent;
          color: #1a120b;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: border-color .2s ease, background .2s ease;
          white-space: nowrap;
        }

        .pl-btn-signin:hover {
          border-color: #c8841a;
          background: rgba(200, 132, 26, .05);
        }

        .pl-btn-menu {
          display: none;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 11px 18px;
          border: none;
          border-radius: 14px;
          background: #1a120b;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 800;
          cursor: pointer;
          transition: background .2s ease;
          white-space: nowrap;
        }

        .pl-btn-menu:hover {
          background: #2e1d0e;
        }

        .pl-menu-icon {
          width: 18px;
          height: 18px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 4px;
          flex-shrink: 0;
        }

        .pl-menu-icon span {
          width: 18px;
          height: 2px;
          border-radius: 999px;
          background: currentColor;
          transition: transform .25s ease, opacity .25s ease;
        }

        .pl-menu-icon.open span:nth-child(1) {
          transform: translateY(6px) rotate(45deg);
        }

        .pl-menu-icon.open span:nth-child(2) {
          opacity: 0;
        }

        .pl-menu-icon.open span:nth-child(3) {
          transform: translateY(-6px) rotate(-45deg);
        }

        .pl-overlay {
          position: fixed;
          inset: 0;
          z-index: 1200;
          background: rgba(26, 18, 11, .54);
          backdrop-filter: blur(6px);
          opacity: 0;
          pointer-events: none;
          transition: opacity .25s ease;
        }

        .pl-overlay.open {
          opacity: 1;
          pointer-events: auto;
        }

        .pl-dropdown {
          position: fixed;
          top: 76px;
          right: 14px;
          z-index: 1300;
          width: min(360px, calc(100vw - 28px));
          background: #fff;
          border: 1px solid #e8ddd0;
          border-radius: 24px;
          box-shadow: 0 20px 60px rgba(26, 18, 11, .22);
          overflow: hidden;
          animation: pl-dropIn .22s ease both;
        }

        @keyframes pl-dropIn {
          from {
            opacity: 0;
            transform: translateY(-8px) scale(.97);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .pl-dropdown-head {
          padding: 18px 18px 14px;
          background: linear-gradient(135deg, #1a120b 0%, #2c1a0a 100%);
          color: #fff;
        }

        .pl-dropdown-kicker {
          margin: 0 0 7px;
          color: #c8841a;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: .16em;
          text-transform: uppercase;
        }

        .pl-dropdown-title {
          margin: 0;
          font-family: 'Cormorant Garamond', serif;
          font-size: 26px;
          line-height: 1.05;
          font-weight: 700;
        }

        .pl-dropdown-nav {
          padding: 12px;
          display: grid;
          gap: 6px;
          overflow: visible;
        }

        .pl-dropdown-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          text-decoration: none;
          color: #1a120b;
          font-size: 14px;
          font-weight: 800;
          padding: 10px 13px;
          border-radius: 14px;
          background: #fff;
          border: 1px solid transparent;
          transition: background .2s ease, border-color .2s ease, color .2s ease;
        }

        .pl-dropdown-link:hover,
        .pl-dropdown-link.active {
          background: #fef3d0;
          border-color: #e8d5a0;
          color: #92640e;
        }

        .pl-dropdown-link span:last-child {
          color: #c8841a;
        }

        .pl-dropdown-actions {
          padding: 0 12px 12px;
          display: grid;
          gap: 8px;
        }

        .pl-dropdown-action {
          height: 42px;
          border-radius: 14px;
          border: none;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 900;
        }

        .pl-dropdown-action.book {
          background: #c8841a;
          color: #fff;
        }

        .pl-dropdown-action.signin {
          background: #f8f5f1;
          color: #1a120b;
          border: 1px solid #e8ddd0;
        }

        .pl-dropdown-contact {
          padding: 13px 16px 15px;
          background: #faf7f2;
          border-top: 1px solid #e8ddd0;
        }

        .pl-dropdown-contact p {
          margin: 0 0 6px;
          color: #7a6a52;
          font-size: 12px;
          line-height: 1.5;
        }

        .pl-dropdown-contact a {
          color: #92640e;
          font-size: 12px;
          font-weight: 800;
          text-decoration: none;
        }

        .pl-main {
          flex: 1 1 auto;
          width: 100%;
          max-width: 100%;
          overflow-x: hidden;
        }

        .pl-footer {
          width: 100%;
          max-width: 100%;
          background: #120c07;
          color: rgba(255, 255, 255, .72);
          overflow: hidden;
        }

        .pl-footer-cta {
          border-bottom: 1px solid rgba(255, 255, 255, .08);
          padding: 58px 32px;
        }

        .pl-footer-cta-inner {
          max-width: 1280px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 28px;
        }

        .pl-footer-kicker {
          margin: 0 0 10px;
          color: #c8841a;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: .16em;
          text-transform: uppercase;
        }

        .pl-footer-title {
          margin: 0;
          color: #fff;
          font-family: 'Cormorant Garamond', serif;
          font-size: 46px;
          line-height: 1.08;
          font-weight: 700;
          max-width: 650px;
        }

        .pl-footer-title em {
          color: #c8841a;
          font-style: italic;
        }

        .pl-footer-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 15px 28px;
          border-radius: 999px;
          background: #c8841a;
          color: #fff;
          text-decoration: none;
          font-size: 15px;
          font-weight: 900;
          box-shadow: 0 8px 24px rgba(200, 132, 26, .28);
          white-space: nowrap;
        }

        .pl-footer-main {
          max-width: 1280px;
          margin: 0 auto;
          padding: 42px 32px;
          display: grid;
          grid-template-columns: 1.2fr .75fr .75fr .75fr;
          gap: 34px;
        }

        .pl-footer-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }

        .pl-footer-brand .pl-brand-name {
          color: #fff;
        }

        .pl-footer-text {
          margin: 0;
          max-width: 430px;
          font-size: 14px;
          line-height: 1.8;
          color: rgba(255, 255, 255, .62);
        }

        .pl-socials {
          margin-top: 20px;
          display: flex;
          gap: 10px;
        }

        .pl-socials a {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(255, 255, 255, .08);
          border: 1px solid rgba(255, 255, 255, .12);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          text-decoration: none;
          font-size: 13px;
          font-weight: 900;
        }

        .pl-footer h4 {
          margin: 0 0 16px;
          color: #c8841a;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: .16em;
          text-transform: uppercase;
        }

        .pl-footer-links {
          display: grid;
          gap: 10px;
        }

        .pl-footer-links a,
        .pl-footer-links span {
          color: rgba(255, 255, 255, .66);
          font-size: 14px;
          text-decoration: none;
          line-height: 1.6;
        }

        .pl-footer-links a:hover {
          color: #c8841a;
        }

        .pl-contact-item {
          display: flex !important;
          align-items: center;
          gap: 11px;
        }

        .pl-contact-icon {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: rgba(200, 132, 26, .12);
          border: 1px solid rgba(200, 132, 26, .34);
          color: #c8841a;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .pl-contact-icon svg {
          width: 16px;
          height: 16px;
          stroke: currentColor;
        }

        .pl-footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, .08);
          padding: 18px 32px;
        }

        .pl-footer-bottom-inner {
          max-width: 1280px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          gap: 18px;
          color: rgba(255, 255, 255, .42);
          font-size: 13px;
        }

        @media (max-width: 1100px) {
          .pl-nav {
            display: none;
          }

          .pl-btn-menu {
            display: inline-flex;
          }
        }

        @media (max-width: 900px) {
          .pl-footer-main {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 768px) {
          .pl-header {
            height: 68px;
          }

          .pl-header-inner {
            padding: 0 14px;
            gap: 8px;
          }

          .pl-logo {
            width: 42px;
            height: 42px;
            border-radius: 14px;
            font-size: 16px;
          }

          .pl-brand {
            gap: 8px;
            flex: 1 1 auto;
            overflow: hidden;
          }

          .pl-brand-text {
            overflow: hidden;
          }

          .pl-brand-name {
            font-size: 18px;
            max-width: 96px;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .pl-brand-sub {
            font-size: 7.5px;
            letter-spacing: .13em;
            max-width: 110px;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .pl-actions {
            gap: 6px;
          }

          .pl-btn-book {
            height: 38px;
            padding: 0 12px;
            font-size: 11px;
            gap: 5px;
          }

          .pl-btn-book svg {
            width: 13px;
            height: 13px;
          }

          .pl-btn-signin {
            display: none;
          }

          .pl-btn-menu {
            height: 38px;
            min-width: 42px;
            padding: 0 12px;
            font-size: 0;
            border-radius: 13px;
          }

          .pl-menu-icon {
            width: 17px;
            height: 17px;
          }

          .pl-menu-icon span {
            width: 17px;
          }

          .pl-dropdown {
            top: 74px;
            right: 12px;
            width: calc(100vw - 24px);
            border-radius: 22px;
          }

          .pl-dropdown-head {
            padding: 16px 17px 12px;
          }

          .pl-dropdown-title {
            font-size: 24px;
          }

          .pl-dropdown-nav {
            padding: 11px;
            gap: 5px;
          }

          .pl-dropdown-link {
            font-size: 13px;
            padding: 9px 12px;
            border-radius: 13px;
          }

          .pl-dropdown-actions {
            padding: 0 11px 11px;
            gap: 7px;
          }

          .pl-dropdown-action {
            height: 40px;
            font-size: 12.5px;
          }

          .pl-dropdown-contact {
            padding: 11px 15px 13px;
          }

          .pl-footer-cta {
            padding: 46px 18px;
          }

          .pl-footer-cta-inner {
            flex-direction: column;
            align-items: flex-start;
          }

          .pl-footer-title {
            font-size: 34px;
          }

          .pl-footer-btn {
            width: 100%;
          }

          .pl-footer-main {
            grid-template-columns: 1fr;
            padding: 38px 18px;
            gap: 30px;
          }

          .pl-footer-bottom {
            padding: 18px;
          }

          .pl-footer-bottom-inner {
            flex-direction: column;
          }
        }

        @media (max-width: 390px) {
          .pl-header-inner {
            padding: 0 10px;
            gap: 6px;
          }

          .pl-brand-name {
            max-width: 82px;
          }

          .pl-brand-sub {
            max-width: 92px;
          }

          .pl-btn-book {
            padding: 0 10px;
            font-size: 10px;
          }

          .pl-btn-menu {
            min-width: 40px;
            padding: 0 10px;
          }

          .pl-dropdown {
            top: 72px;
          }

          .pl-dropdown-link {
            font-size: 12.5px;
            padding: 8px 11px;
          }

          .pl-dropdown-action {
            height: 38px;
          }

          .pl-dropdown-contact p,
          .pl-dropdown-contact a {
            font-size: 11.5px;
          }
        }
      `}</style>

      <div className="pl-root">
        <header className={`pl-header ${scrolled ? 'scrolled' : ''}`}>
          <div className="pl-header-inner">
            <Link to="/" className="pl-brand" aria-label="MD Creative">
              <div className="pl-logo">MD</div>

              <div className="pl-brand-text">
                <span className="pl-brand-name">Creative</span>
                <span className="pl-brand-sub">Shërbime për evente</span>
              </div>
            </Link>

            <nav className="pl-nav" aria-label="Navigimi kryesor">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/'}
                  className={({ isActive }) =>
                    isActive ? 'pl-nav-link active' : 'pl-nav-link'
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="pl-actions">
              <button type="button" className="pl-btn-book" onClick={goToBooking}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M5 2v2M11 2v2M3 6h10M4 3.5h8A1.5 1.5 0 0 1 13.5 5v7A1.5 1.5 0 0 1 12 13.5H4A1.5 1.5 0 0 1 2.5 12V5A1.5 1.5 0 0 1 4 3.5Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                Rezervo
              </button>

              <button type="button" className="pl-btn-signin" onClick={goToSignIn}>
                Hyr
              </button>

              <button
                type="button"
                className="pl-btn-menu"
                onClick={() => setMenuOpen((prev) => !prev)}
                aria-label={menuOpen ? 'Mbyll menynë' : 'Hap menynë'}
                aria-expanded={menuOpen}
              >
                <span className={menuOpen ? 'pl-menu-icon open' : 'pl-menu-icon'}>
                  <span />
                  <span />
                  <span />
                </span>
                Menyja
              </button>
            </div>
          </div>
        </header>

        <div
          className={menuOpen ? 'pl-overlay open' : 'pl-overlay'}
          onClick={() => setMenuOpen(false)}
        />

        {menuOpen && (
          <div className="pl-dropdown" ref={menuRef}>
            <div className="pl-dropdown-head">
              <p className="pl-dropdown-kicker">Menyja</p>
              <h2 className="pl-dropdown-title">Eksploro MD Creative</h2>
            </div>

            <nav className="pl-dropdown-nav" aria-label="Menyja në telefon">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/'}
                  className={({ isActive }) =>
                    isActive ? 'pl-dropdown-link active' : 'pl-dropdown-link'
                  }
                >
                  <span>{item.label}</span>
                  <span>→</span>
                </NavLink>
              ))}
            </nav>

            <div className="pl-dropdown-actions">
              <button
                type="button"
                className="pl-dropdown-action book"
                onClick={goToBooking}
              >
                Rezervo eventin
              </button>

              <button
                type="button"
                className="pl-dropdown-action signin"
                onClick={goToSignIn}
              >
                Hyr
              </button>
            </div>

            <div className="pl-dropdown-contact">
              <p>Na kontaktoni për rezervime, dekorime, maskota dhe paketa eventesh.</p>
              <p>
                <a href={`tel:${PHONE_LINK}`}>{PHONE_DISPLAY}</a>
              </p>
              <p>
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </p>
            </div>
          </div>
        )}

        <main className="pl-main">
          <Outlet />
        </main>

        <footer className="pl-footer">
          <div className="pl-footer-cta">
            <div className="pl-footer-cta-inner">
              <div>
                <p className="pl-footer-kicker">Gati për festë?</p>

                <h2 className="pl-footer-title">
                  Le të krijojmë një event <em>që mbahet mend gjatë.</em>
                </h2>
              </div>

              <Link to="/booking" className="pl-footer-btn">
                Rezervo Eventin
                <span>→</span>
              </Link>
            </div>
          </div>

          <div className="pl-footer-main">
            <div>
              <div className="pl-footer-brand">
                <div className="pl-logo">MD</div>

                <div className="pl-brand-text">
                  <span className="pl-brand-name">Creative</span>
                  <span className="pl-brand-sub">Shërbime për evente</span>
                </div>
              </div>

              <p className="pl-footer-text">
                MD Creative sjell dekorime elegante, maskota, aktivitete argëtuese,
                photo booth, shankerica dhe paketa të veçanta për çdo festë familjare
                apo event special.
              </p>

              <div className="pl-socials">
                <a href="#" aria-label="Instagram">
                  IG
                </a>
                <a href="#" aria-label="Facebook">
                  FB
                </a>
                <a href="#" aria-label="TikTok">
                  TT
                </a>
              </div>
            </div>

            <div>
              <h4>Shërbimet</h4>

              <div className="pl-footer-links">
                <Link to="/decorations">Dekorime</Link>
                <Link to="/mascots">Maskota për fëmijë</Link>
                <Link to="/activities">Aktivitete për fëmijë</Link>
                <Link to="/photo-booth">Photo Booth</Link>
                <Link to="/packages">Paketa eventesh</Link>
              </div>
            </div>

            <div>
              <h4>Navigimi</h4>

              <div className="pl-footer-links">
                <Link to="/">Ballina</Link>
                <Link to="/gallery">Galeria</Link>
                <Link to="/our-team">Ekipi ynë</Link>
                <Link to="/reviews">Vlerësimet</Link>
                <Link to="/booking">Rezervo eventin</Link>
                <Link to="/signin">Admin</Link>
              </div>
            </div>

            <div>
              <h4>Kontakt</h4>

              <div className="pl-footer-links">
                <a href={`tel:${PHONE_LINK}`} className="pl-contact-item">
                  <span className="pl-contact-icon">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path
                        d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 11.19 18 19.5 19.5 0 0 1 6 12.81 19.79 19.79 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.77.63 2.61a2 2 0 0 1-.45 2.11L8 9.69a16 16 0 0 0 6.31 6.31l1.25-1.25a2 2 0 0 1 2.11-.45c.84.3 1.71.51 2.61.63A2 2 0 0 1 22 16.92Z"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span>{PHONE_DISPLAY}</span>
                </a>

                <a href={`mailto:${EMAIL}`} className="pl-contact-item">
                  <span className="pl-contact-icon">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path
                        d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="m22 6-10 7L2 6"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span>{EMAIL}</span>
                </a>

                <span className="pl-contact-item">
                  <span className="pl-contact-icon">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path
                        d="M21 10c0 7-9 12-9 12S3 17 3 10a9 9 0 1 1 18 0Z"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span>Kosovë</span>
                </span>

                <span className="pl-contact-item">
                  <span className="pl-contact-icon">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 2 15 9l7 3-7 3-3 7-3-7-7-3 7-3 3-7Z"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span>Evente · Dekorime · Maskota</span>
                </span>
              </div>
            </div>
          </div>

          <div className="pl-footer-bottom">
            <div className="pl-footer-bottom-inner">
              <span>
                © {new Date().getFullYear()} MD Creative. Të gjitha të drejtat e rezervuara.
              </span>
              <span>Evente · Dekorime · Maskota · Paketa</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}