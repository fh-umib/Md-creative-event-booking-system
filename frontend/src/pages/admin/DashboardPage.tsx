import { useAnalytics } from '../../hooks/useAnalytics';

export default function DashboardPage() {
  const { stats, isLoading, error } = useAnalytics();

  if (isLoading) return <p>Loading dashboard...</p>;
  if (error) return <p style={{ color: 'crimson' }}>{error}</p>;

  const cardStyle: React.CSSProperties = {
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    padding: '20px',
    background: '#fff',
  };

  return (
    <section>
      <h1 style={{ marginBottom: '20px' }}>Admin Dashboard</h1>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
        }}
      >
        <div style={cardStyle}>
          <h3>Total Bookings</h3>
          <p>{stats.totalBookings}</p>
        </div>

        <div style={cardStyle}>
          <h3>Total Packages</h3>
          <p>{stats.totalPackages}</p>
        </div>

        <div style={cardStyle}>
          <h3>Total Mascots</h3>
          <p>{stats.totalMascots}</p>
        </div>

        <div style={cardStyle}>
          <h3>Total Reviews</h3>
          <p>{stats.totalReviews}</p>
        </div>
      </div>
    </section>
  );
}