import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <aside
        style={{
          width: '250px',
          background: '#111827',
          color: 'white',
          padding: '24px',
        }}
      >
        <h2 style={{ marginBottom: '24px' }}>Admin Panel</h2>

        <div style={{ marginBottom: '24px' }}>
          <p style={{ margin: 0, fontWeight: 'bold' }}>{user?.fullName}</p>
          <small>{user?.role}</small>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Link to="/admin/dashboard" style={{ color: 'white' }}>
            Dashboard
          </Link>
          <Link to="/admin/bookings" style={{ color: 'white' }}>
            Bookings
          </Link>
          <Link to="/admin/packages" style={{ color: 'white' }}>
            Packages
          </Link>
          <Link to="/admin/mascots" style={{ color: 'white' }}>
            Mascots
          </Link>
          <Link to="/admin/reviews" style={{ color: 'white' }}>
            Reviews
          </Link>
          <Link to="/admin/staff" style={{ color: 'white' }}>
            Staff
          </Link>
        </nav>

        <button
          onClick={handleLogout}
          style={{
            marginTop: '24px',
            padding: '10px 14px',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Logout
        </button>
      </aside>

      <main style={{ flex: 1, padding: '24px' }}>
        <Outlet />
      </main>
    </div>
  );
}