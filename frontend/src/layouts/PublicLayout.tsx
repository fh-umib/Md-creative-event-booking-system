import { Link, Outlet } from 'react-router-dom';

export default function PublicLayout() {
  return (
    <div>
      <header
        style={{
          padding: '16px 24px',
          borderBottom: '1px solid #e5e7eb',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h2>MD Creative</h2>

        <nav style={{ display: 'flex', gap: '16px' }}>
          <Link to="/">Home</Link>
          <Link to="/packages">Packages</Link>
          <Link to="/mascots">Mascots</Link>
          <Link to="/booking">Booking</Link>
          <Link to="/reviews">Reviews</Link>
          <Link to="/login">Admin</Link>
        </nav>
      </header>

      <main style={{ padding: '24px' }}>
        <Outlet />
      </main>
    </div>
  );
}