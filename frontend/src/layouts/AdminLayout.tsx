import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

type NavItem = {
  label: string;
  path: string;
};

const navItems: NavItem[] = [
  { label: 'Paneli Kryesor', path: '/admin/dashboard' },
  { label: 'Rezervimet', path: '/admin/bookings' },
  { label: 'Dekorimet', path: '/admin/decorations' },
  { label: 'Maskotat', path: '/admin/mascots' },
  { label: 'Paketat', path: '/admin/packages' },
  { label: 'Ekstrat', path: '/admin/extras' },
  { label: 'Vlerësimet', path: '/admin/reviews' },
  { label: 'Stafi', path: '/admin/staff' },
  { label: 'Analitika', path: '/admin/analytics' },
  { label: 'Galeria', path: '/admin/gallery' },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const currentPage = navItems.find((item) => location.pathname === item.path);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      <style>{`
        *, *::before, *::after {
          box-sizing: border-box;
        }

        body {
          margin: 0;
        }

        .admin-page {
          min-height: 100vh;
          display: flex;
          background: #f6f0e8;
          color: #1a120b;
          font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        .admin-sidebar {
          width: 282px;
          min-height: 100vh;
          background:
            radial-gradient(circle at top left, rgba(212,145,30,.22), transparent 34%),
            linear-gradient(180deg, #1a120b 0%, #120d07 100%);
          color: #ffffff;
          padding: 22px 18px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: sticky;
          top: 0;
          left: 0;
          border-right: 1px solid rgba(212,145,30,.22);
          box-shadow: 10px 0 40px rgba(26,18,11,.18);
          z-index: 1000;
        }

        .admin-logo-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
          padding: 8px 6px 16px;
          border-bottom: 1px solid rgba(255,255,255,.08);
        }

        .admin-logo-box {
          width: 48px;
          height: 48px;
          border-radius: 16px;
          background: linear-gradient(135deg, #d4911e, #b87318);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 900;
          font-size: 18px;
          box-shadow: 0 10px 28px rgba(212,145,30,.35);
          letter-spacing: .4px;
        }

        .admin-brand-title {
          font-size: 17px;
          font-weight: 900;
          line-height: 1.1;
          color: #ffffff;
        }

        .admin-brand-subtitle {
          margin-top: 4px;
          font-size: 10px;
          color: #d4911e;
          font-weight: 800;
          letter-spacing: .16em;
          text-transform: uppercase;
        }

        .admin-nav {
          display: flex;
          flex-direction: column;
          gap: 7px;
          padding: 4px 0;
        }

        .admin-nav-link {
          text-decoration: none;
          color: rgba(255,255,255,.72);
          padding: 11px 12px;
          border-radius: 14px;
          font-size: 14px;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 12px;
          transition: background .2s, color .2s, transform .2s, box-shadow .2s;
          border: 1px solid transparent;
        }

        .admin-nav-link:hover {
          background: rgba(255,255,255,.07);
          color: #ffffff;
          transform: translateX(3px);
        }

        .admin-nav-link.active {
          background: linear-gradient(135deg, rgba(212,145,30,.95), rgba(184,115,24,.95));
          color: #ffffff;
          border-color: rgba(255,255,255,.12);
          box-shadow: 0 10px 26px rgba(212,145,30,.24);
        }

        .admin-nav-icon {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: rgba(212,145,30,.55);
          box-shadow: 0 0 0 4px rgba(212,145,30,.10);
          flex-shrink: 0;
          transition: background .2s, box-shadow .2s, transform .2s;
        }

        .admin-nav-link:hover .admin-nav-icon {
          background: #d4911e;
          box-shadow: 0 0 0 5px rgba(212,145,30,.16);
          transform: scale(1.08);
        }

        .admin-nav-link.active .admin-nav-icon {
          background: #ffffff;
          box-shadow: 0 0 0 5px rgba(255,255,255,.18);
        }

        .admin-sidebar-footer {
          padding-top: 18px;
          border-top: 1px solid rgba(255,255,255,.08);
        }

        .admin-mini-card {
          background: rgba(255,255,255,.06);
          border: 1px solid rgba(255,255,255,.08);
          border-radius: 18px;
          padding: 14px;
          margin-bottom: 14px;
        }

        .admin-mini-card-title {
          margin: 0 0 5px;
          font-size: 13px;
          font-weight: 800;
          color: #ffffff;
        }

        .admin-mini-card-text {
          margin: 0;
          font-size: 12px;
          line-height: 1.55;
          color: rgba(255,255,255,.52);
        }

        .admin-logout-button {
          width: 100%;
          height: 44px;
          border: none;
          border-radius: 14px;
          background: #ffffff;
          color: #1a120b;
          font-size: 14px;
          font-weight: 900;
          cursor: pointer;
          transition: transform .2s, box-shadow .2s, background .2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .admin-logout-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 24px rgba(0,0,0,.22);
          background: #fff7e8;
        }

        .admin-content-wrapper {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
        }

        .admin-topbar {
          min-height: 82px;
          background: rgba(255,255,255,.82);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          padding: 18px 28px;
          border-bottom: 1px solid #eadfce;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          position: sticky;
          top: 0;
          z-index: 700;
        }

        .admin-mobile-menu-btn {
          display: none;
          width: 44px;
          height: 44px;
          border: none;
          border-radius: 14px;
          background: #1a120b;
          color: #ffffff;
          cursor: pointer;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .admin-topbar-left {
          display: flex;
          align-items: center;
          gap: 14px;
          min-width: 0;
        }

        .admin-topbar-title {
          margin: 0;
          font-size: 25px;
          font-weight: 900;
          color: #1a120b;
          line-height: 1.15;
        }

        .admin-topbar-text {
          margin: 5px 0 0 0;
          font-size: 14px;
          color: #7a6a52;
          line-height: 1.45;
        }

        .admin-topbar-actions {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }

        .admin-public-link {
          height: 42px;
          padding: 0 16px;
          border-radius: 999px;
          border: 1px solid #e2d4bd;
          background: #fffdf8;
          color: #1a120b;
          text-decoration: none;
          font-size: 13px;
          font-weight: 800;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: border-color .2s, transform .2s, box-shadow .2s;
        }

        .admin-public-link:hover {
          border-color: #d4911e;
          transform: translateY(-1px);
          box-shadow: 0 8px 20px rgba(26,18,11,.08);
        }

        .admin-main {
          flex: 1;
          padding: 26px;
          min-width: 0;
        }

        .admin-main-shell {
          width: 100%;
          max-width: 1500px;
          margin: 0 auto;
        }

        .admin-overlay {
          display: none;
        }

        @media (max-width: 1100px) {
          .admin-sidebar {
            width: 260px;
          }

          .admin-main {
            padding: 22px;
          }
        }

        @media (max-width: 900px) {
          .admin-page {
            display: block;
          }

          .admin-sidebar {
            position: fixed;
            top: 0;
            left: 0;
            height: 100vh;
            width: min(286px, 86vw);
            transform: translateX(-105%);
            transition: transform .28s ease;
            overflow-y: auto;
          }

          .admin-sidebar.open {
            transform: translateX(0);
          }

          .admin-overlay {
            display: block;
            position: fixed;
            inset: 0;
            background: rgba(18,13,7,.48);
            backdrop-filter: blur(2px);
            z-index: 900;
            opacity: 0;
            pointer-events: none;
            transition: opacity .22s;
          }

          .admin-overlay.show {
            opacity: 1;
            pointer-events: auto;
          }

          .admin-mobile-menu-btn {
            display: inline-flex;
          }

          .admin-content-wrapper {
            min-height: 100vh;
          }

          .admin-topbar {
            padding: 14px 18px;
          }

          .admin-topbar-actions {
            display: none;
          }

          .admin-topbar-title {
            font-size: 21px;
          }

          .admin-topbar-text {
            font-size: 13px;
          }

          .admin-main {
            padding: 18px;
          }
        }

        @media (max-width: 560px) {
          .admin-topbar {
            min-height: 74px;
          }

          .admin-topbar-title {
            font-size: 19px;
          }

          .admin-topbar-text {
            display: none;
          }

          .admin-main {
            padding: 14px;
          }

          .admin-logo-row {
            margin-bottom: 18px;
          }

          .admin-nav-link {
            padding: 10px 11px;
            font-size: 13px;
          }

          .admin-mini-card {
            display: none;
          }
        }
      `}</style>

      <div className="admin-page">
        <div
          className={`admin-overlay${sidebarOpen ? ' show' : ''}`}
          onClick={closeSidebar}
          aria-hidden="true"
        />

        <aside className={`admin-sidebar${sidebarOpen ? ' open' : ''}`}>
          <div>
            <div className="admin-logo-row">
              <div className="admin-logo-box">MD</div>
              <div>
                <div className="admin-brand-title">MD Creative</div>
                <div className="admin-brand-subtitle">Admin Panel</div>
              </div>
            </div>

            <nav className="admin-nav">
              {navItems.map((item) => {
                const active = location.pathname === item.path;

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={closeSidebar}
                    className={`admin-nav-link${active ? ' active' : ''}`}
                  >
                    <span className="admin-nav-icon" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="admin-sidebar-footer">
            <div className="admin-mini-card">
              <p className="admin-mini-card-title">Menaxhimi i MD Creative</p>
              <p className="admin-mini-card-text">
                Kontrollo rezervimet, shërbimet, stafin dhe përmbajtjen e faqes nga një vend.
              </p>
            </div>

            <button type="button" className="admin-logout-button" onClick={handleLogout}>
              <span>↩</span>
              Dil nga paneli
            </button>
          </div>
        </aside>

        <div className="admin-content-wrapper">
          <header className="admin-topbar">
            <div className="admin-topbar-left">
              <button
                type="button"
                className="admin-mobile-menu-btn"
                onClick={() => setSidebarOpen(true)}
                aria-label="Hape menynë e adminit"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M3 5h14M3 10h14M3 15h14"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>

              <div>
                <h1 className="admin-topbar-title">
                  {currentPage?.label || 'Paneli i Adminit'}
                </h1>
                <p className="admin-topbar-text">
                  Menaxho rezervimet, shërbimet, përmbajtjen dhe analizat e MD Creative.
                </p>
              </div>
            </div>

            <div className="admin-topbar-actions">
              <Link to="/" className="admin-public-link">
                <span>↗</span>
                Shiko faqen publike
              </Link>
            </div>
          </header>

          <main className="admin-main">
            <div className="admin-main-shell">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}