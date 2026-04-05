import type { BookingRecord } from '../../../types';
import AdminBookingCard from './AdminBookingCard';

interface AdminBookingListProps {
  items: BookingRecord[];
  onView: (id: number) => void;
}

export default function AdminBookingList({
  items,
  onView,
}: AdminBookingListProps) {
  if (!items.length) {
    return (
      <div style={emptyStyle}>
        <h3 style={emptyTitleStyle}>No bookings found</h3>
        <p style={emptyTextStyle}>
          There are currently no bookings matching the selected filters.
        </p>
      </div>
    );
  }

  return (
    <div style={listStyle}>
      {items.map((item) => (
        <AdminBookingCard key={item.id} item={item} onView={onView} />
      ))}
    </div>
  );
}

const listStyle: React.CSSProperties = {
  display: 'grid',
  gap: '16px',
};

const emptyStyle: React.CSSProperties = {
  background: '#ffffff',
  border: '1px solid #e5e7eb',
  borderRadius: '22px',
  padding: '30px 20px',
  textAlign: 'center',
};

const emptyTitleStyle: React.CSSProperties = {
  margin: '0 0 10px',
  color: '#111827',
  fontSize: '24px',
  fontWeight: 800,
};

const emptyTextStyle: React.CSSProperties = {
  margin: 0,
  color: '#6b7280',
  lineHeight: 1.7,
};