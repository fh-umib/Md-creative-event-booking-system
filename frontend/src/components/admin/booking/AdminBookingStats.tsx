import type { AdminBookingStats as AdminBookingStatsType } from '../../../types';

interface AdminBookingStatsProps {
  stats: AdminBookingStatsType;
}

export default function AdminBookingStats({ stats }: AdminBookingStatsProps) {
  const cards = [
    { label: 'Total Bookings', value: stats.totalBookings },
    { label: 'Pending', value: stats.pendingBookings },
    { label: 'Approved', value: stats.approvedBookings },
    { label: 'Completed', value: stats.completedBookings },
    { label: 'Cancelled', value: stats.cancelledBookings },
    { label: 'Paid', value: stats.paidBookings },
  ];

  return (
    <div style={gridStyle}>
      {cards.map((card) => (
        <div key={card.label} style={cardStyle}>
          <span style={labelStyle}>{card.label}</span>
          <strong style={valueStyle}>{card.value}</strong>
        </div>
      ))}
    </div>
  );
}

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
  gap: '16px',
};

const cardStyle: React.CSSProperties = {
  background: '#ffffff',
  border: '1px solid #e5e7eb',
  borderRadius: '22px',
  padding: '20px',
  boxShadow: '0 12px 24px rgba(15, 23, 42, 0.04)',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  color: '#64748b',
  fontSize: '14px',
  fontWeight: 700,
  marginBottom: '12px',
};

const valueStyle: React.CSSProperties = {
  color: '#0f172a',
  fontSize: '32px',
  fontWeight: 800,
};