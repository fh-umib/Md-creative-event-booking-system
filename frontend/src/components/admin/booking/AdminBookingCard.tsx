import type { BookingRecord } from '../../../types';
import AdminBookingStatusBadge from './AdminBookingStatusBadge';

interface AdminBookingCardProps {
  item: BookingRecord;
  onView: (id: number) => void;
}

export default function AdminBookingCard({
  item,
  onView,
}: AdminBookingCardProps) {
  return (
    <div style={cardStyle}>
      <div style={topStyle}>
        <div>
          <h3 style={titleStyle}>{item.event_title}</h3>
          <p style={subTextStyle}>{item.customer_name || 'Unknown customer'}</p>
        </div>

        <div style={badgeWrapStyle}>
          <AdminBookingStatusBadge label={item.status} variant="status" />
          <AdminBookingStatusBadge label={item.payment_status} variant="payment" />
        </div>
      </div>

      <div style={metaGridStyle}>
        <Meta label="Booking Code" value={item.booking_code} />
        <Meta label="Category" value={item.package_category || '-'} />
        <Meta label="Package" value={item.package_title || '-'} />
        <Meta label="Event Date" value={item.event_date} />
        <Meta label="Venue" value={item.venue_name || '-'} />
        <Meta label="Total" value={`€${item.total_price}`} />
      </div>

      <div style={actionsStyle}>
        <button type="button" onClick={() => onView(item.id)} style={buttonStyle}>
          View Details
        </button>
      </div>
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div style={metaStyle}>
      <span style={metaLabelStyle}>{label}</span>
      <span style={metaValueStyle}>{value}</span>
    </div>
  );
}

const cardStyle: React.CSSProperties = {
  background: '#ffffff',
  border: '1px solid #e5e7eb',
  borderRadius: '22px',
  padding: '20px',
  boxShadow: '0 12px 24px rgba(15, 23, 42, 0.04)',
};

const topStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: '16px',
  marginBottom: '18px',
};

const titleStyle: React.CSSProperties = {
  margin: '0 0 6px',
  color: '#0f172a',
  fontSize: '22px',
  fontWeight: 800,
};

const subTextStyle: React.CSSProperties = {
  margin: 0,
  color: '#64748b',
};

const badgeWrapStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  justifyContent: 'flex-end',
};

const metaGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  gap: '14px',
};

const metaStyle: React.CSSProperties = {
  display: 'grid',
  gap: '4px',
};

const metaLabelStyle: React.CSSProperties = {
  color: '#64748b',
  fontSize: '13px',
  fontWeight: 700,
};

const metaValueStyle: React.CSSProperties = {
  color: '#111827',
  fontSize: '15px',
};

const actionsStyle: React.CSSProperties = {
  marginTop: '18px',
};

const buttonStyle: React.CSSProperties = {
  border: 'none',
  borderRadius: '14px',
  padding: '12px 18px',
  background: '#1f2f4f',
  color: '#ffffff',
  fontWeight: 800,
  fontSize: '14px',
  cursor: 'pointer',
};