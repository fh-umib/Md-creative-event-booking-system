import React from 'react';
import { Link, Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const isLoggedIn = localStorage.getItem('md_admin_logged_in') === 'true';

  if (!isLoggedIn) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  const handleLogout = () => {
    localStorage.removeItem('md_admin_logged_in');
    navigate('/admin/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/admin/dashboard' },
    { label: 'Bookings', path: '/admin/bookings' },
    { label: 'Decorations', path: '/admin/decorations' },
    { label: 'Mascots', path: '/admin/mascots' },
    { label: 'Packages', path: '/admin/packages' },
    { label: 'Extras', path: '/admin/extras' },
    { label: 'Reviews', path: '/admin/reviews' },
    { label: 'Staff', path: '/admin/staff' },
    { label: 'Analytics', path: '/admin/analytics' },
    { label: 'Gallery', path: '/admin/gallery' },
  ];

  return (
    <div style={pageStyle}>
      <aside style={sidebarStyle}>
        <div>
          <div style={logoRowStyle}>
            <div style={logoBoxStyle}>MD</div>
            <div>
              <div style={brandTitleStyle}>MD Creative</div>
              <div style={brandSubtitleStyle}>Admin Panel</div>
            </div>
          </div>

          <nav style={navStyle}>
            {navItems.map((item) => {
              const active = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  style={{
                    ...navLinkStyle,
                    ...(active ? activeNavLinkStyle : {}),
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <button type="button" style={logoutButtonStyle} onClick={handleLogout}>
          Log Out
        </button>
      </aside>

      <div style={contentWrapperStyle}>
        <header style={topbarStyle}>
          <div>
            <h1 style={topbarTitleStyle}>Admin Dashboard</h1>
            <p style={topbarTextStyle}>Manage bookings, services and content.</p>
          </div>
        </header>

        <main style={mainStyle}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

const pageStyle: React.CSSProperties = {
  minHeight: '100vh',
  display: 'flex',
  backgroundColor: '#f8fafc',
};

const sidebarStyle: React.CSSProperties = {
  width: '250px',
  backgroundColor: '#0f172a',
  color: '#ffffff',
  padding: '20px 16px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
};

const logoRowStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  marginBottom: '26px',
};

const logoBoxStyle: React.CSSProperties = {
  width: '46px',
  height: '46px',
  borderRadius: '14px',
  backgroundColor: '#d89b12',
  color: '#091a4d',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 800,
  fontSize: '20px',
};

const brandTitleStyle: React.CSSProperties = {
  fontSize: '16px',
  fontWeight: 800,
};

const brandSubtitleStyle: React.CSSProperties = {
  fontSize: '12px',
  color: '#cbd5e1',
};

const navStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
};

const navLinkStyle: React.CSSProperties = {
  textDecoration: 'none',
  color: '#e2e8f0',
  padding: '10px 12px',
  borderRadius: '12px',
  fontSize: '14px',
  fontWeight: 600,
};

const activeNavLinkStyle: React.CSSProperties = {
  backgroundColor: '#1e293b',
  color: '#ffffff',
};

const logoutButtonStyle: React.CSSProperties = {
  height: '42px',
  border: 'none',
  borderRadius: '12px',
  backgroundColor: '#d89b12',
  color: '#091a4d',
  fontSize: '14px',
  fontWeight: 800,
  cursor: 'pointer',
};

const contentWrapperStyle: React.CSSProperties = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
};

const topbarStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  padding: '20px 24px',
  borderBottom: '1px solid #e2e8f0',
};

const topbarTitleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: '24px',
  fontWeight: 800,
  color: '#0f172a',
};

const topbarTextStyle: React.CSSProperties = {
  margin: '6px 0 0 0',
  fontSize: '14px',
  color: '#64748b',
};

const mainStyle: React.CSSProperties = {
  padding: '20px',
};