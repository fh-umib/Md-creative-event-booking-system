import { Link, Outlet, useLocation } from 'react-router-dom';

export default function PublicLayout() {
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/packages', label: 'Packages' },
    { to: '/mascots', label: 'Mascots' },
    { to: '/booking', label: 'Booking' },
    { to: '/reviews', label: 'Reviews' },
    { to: '/login', label: 'Admin' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb' }}>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          background: '#ffffff',
          borderBottom: '1px solid #e5e7eb',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '18px 24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '20px',
            flexWrap: 'wrap',
          }}
        >
          <Link
            to="/"
            style={{
              textDecoration: 'none',
              color: '#111827',
              fontSize: '28px',
              fontWeight: 800,
              letterSpacing: '-0.5px',
            }}
          >
            MD Creative
          </Link>

          <nav
            style={{
              display: 'flex',
              gap: '10px',
              flexWrap: 'wrap',
              alignItems: 'center',
            }}
          >
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;

              return (
                <Link
                  key={link.to}
                  to={link.to}
                  style={{
                    textDecoration: 'none',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    fontWeight: 600,
                    fontSize: '15px',
                    color: isActive ? '#ffffff' : '#374151',
                    background: isActive ? '#111827' : 'transparent',
                    border: isActive ? 'none' : '1px solid transparent',
                    transition: '0.2s ease',
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer
        style={{
          borderTop: '1px solid #e5e7eb',
          background: '#ffffff',
          marginTop: '40px',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            gap: '16px',
            flexWrap: 'wrap',
            color: '#6b7280',
          }}
        >
          <p style={{ margin: 0 }}>© 2026 MD Creative. All rights reserved.</p>
          <p style={{ margin: 0 }}>Event booking platform for kids parties and celebrations.</p>
        </div>
      </footer>
    </div>
  );
}