import type { BookingRecord } from '../../../types';
import AdminBookingStatusBadge from './AdminBookingStatusBadge';

interface AdminBookingDetailsDrawerProps {
  item: BookingRecord | null;
  onClose: () => void;
}

export default function AdminBookingDetailsDrawer({
  item,
  onClose,
}: AdminBookingDetailsDrawerProps) {
  if (!item) return null;

  return (
    <div style={overlayStyle}>
      <div style={drawerStyle}>
        <div style={headerStyle}>
          <div>
            <h2 style={titleStyle}>{item.event_title}</h2>
            <p style={subTitleStyle}>{item.booking_code}</p>
          </div>

          <button type="button" onClick={onClose} style={closeButtonStyle}>
            Close
          </button>
        </div>

        <div style={badgeRowStyle}>
          <AdminBookingStatusBadge label={item.status} variant="status" />
          <AdminBookingStatusBadge label={item.payment_status} variant="payment" />
        </div>

        <div style={sectionStyle}>
          <Detail label="Customer" value={item.customer_name || '-'} />
          <Detail label="Email" value={item.customer_email || '-'} />
          <Detail label="Phone" value={item.customer_phone || '-'} />
          <Detail label="Category" value={item.package_category || '-'} />
          <Detail label="Package" value={item.package_title || '-'} />
          <Detail label="Event Date" value={item.event_date} />
          <Detail label="Venue" value={item.venue_name || '-'} />
          <Detail label="Address" value={item.venue_address || '-'} />
          <Detail label="Guests" value={String(item.guest_count || 0)} />
          <Detail label="Total" value={`€${item.total_price}`} />
          <Detail label="Deposit" value={`€${item.deposit_amount}`} />
          <Detail label="Remaining" value={`€${item.remaining_balance}`} />
        </div>

        {item.special_requests ? (
          <div style={noteBoxStyle}>
            <strong>Special Requests</strong>
            <p style={noteTextStyle}>{item.special_requests}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div style={detailStyle}>
      <span style={detailLabelStyle}>{label}</span>
      <span style={detailValueStyle}>{value}</span>
    </div>
  );
}

const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(15, 23, 42, 0.4)',
  display: 'flex',
  justifyContent: 'flex-end',
  zIndex: 100,
};

const drawerStyle: React.CSSProperties = {
  width: '460px',
  maxWidth: '100%',
  height: '100%',
  background: '#ffffff',
  padding: '24px',
  overflowY: 'auto',
  boxShadow: '-12px 0 30px rgba(15, 23, 42, 0.12)',
};

const headerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: '16px',
  alignItems: 'flex-start',
};

const titleStyle: React.CSSProperties = {
  margin: '0 0 6px',
  color: '#0f172a',
  fontSize: '28px',
  fontWeight: 800,
};

const subTitleStyle: React.CSSProperties = {
  margin: 0,
  color: '#64748b',
};

const closeButtonStyle: React.CSSProperties = {
  border: '1px solid #d1d5db',
  borderRadius: '12px',
  padding: '10px 14px',
  background: '#ffffff',
  color: '#111827',
  fontWeight: 700,
  cursor: 'pointer',
};

const badgeRowStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '10px',
  margin: '18px 0',
};

const sectionStyle: React.CSSProperties = {
  display: 'grid',
  gap: '12px',
};

const detailStyle: React.CSSProperties = {
  display: 'grid',
  gap: '4px',
  paddingBottom: '10px',
  borderBottom: '1px solid #f1f5f9',
};

const detailLabelStyle: React.CSSProperties = {
  color: '#64748b',
  fontSize: '13px',
  fontWeight: 700,
};

const detailValueStyle: React.CSSProperties = {
  color: '#111827',
  fontSize: '15px',
};

const noteBoxStyle: React.CSSProperties = {
  marginTop: '20px',
  borderRadius: '18px',
  background: '#f8fafc',
  border: '1px solid #e2e8f0',
  padding: '16px',
};

const noteTextStyle: React.CSSProperties = {
  margin: '10px 0 0',
  color: '#475569',
  lineHeight: 1.7,
};