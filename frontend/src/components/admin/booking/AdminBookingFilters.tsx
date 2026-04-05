import type { AdminBookingFilters as AdminBookingFiltersType } from '../../../types';

interface AdminBookingFiltersProps {
  filters: AdminBookingFiltersType;
  onChange: (next: AdminBookingFiltersType) => void;
  onApply: () => void;
}

export default function AdminBookingFilters({
  filters,
  onChange,
  onApply,
}: AdminBookingFiltersProps) {
  const updateField = (field: keyof AdminBookingFiltersType, value: string) => {
    onChange({
      ...filters,
      [field]: value,
    });
  };

  return (
    <div style={wrapperStyle}>
      <div style={gridStyle}>
        <input
          value={filters.search}
          onChange={(e) => updateField('search', e.target.value)}
          placeholder="Search bookings..."
          style={inputStyle}
        />

        <select
          value={filters.status}
          onChange={(e) => updateField('status', e.target.value)}
          style={inputStyle}
        >
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        <select
          value={filters.paymentStatus}
          onChange={(e) => updateField('paymentStatus', e.target.value)}
          style={inputStyle}
        >
          <option value="">All Payment Statuses</option>
          <option value="Unpaid">Unpaid</option>
          <option value="Partially Paid">Partially Paid</option>
          <option value="Paid">Paid</option>
          <option value="Refunded">Refunded</option>
        </select>

        <select
          value={filters.category}
          onChange={(e) => updateField('category', e.target.value)}
          style={inputStyle}
        >
          <option value="">All Categories</option>
          <option value="mascots">Mascots</option>
          <option value="decorations">Decorations</option>
          <option value="bounce-bubble">Bounce & Bubble</option>
        </select>

        <input
          type="date"
          value={filters.eventDate}
          onChange={(e) => updateField('eventDate', e.target.value)}
          style={inputStyle}
        />
      </div>

      <button type="button" onClick={onApply} style={buttonStyle}>
        Apply Filters
      </button>
    </div>
  );
}

const wrapperStyle: React.CSSProperties = {
  background: '#ffffff',
  border: '1px solid #e5e7eb',
  borderRadius: '22px',
  padding: '20px',
  display: 'grid',
  gap: '16px',
};

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
  gap: '14px',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  border: '1px solid #d8d2c8',
  outline: 'none',
  borderRadius: '14px',
  background: '#fff',
  padding: '12px 14px',
  fontSize: '14px',
  color: '#111827',
};

const buttonStyle: React.CSSProperties = {
  justifySelf: 'start',
  border: 'none',
  borderRadius: '14px',
  padding: '12px 18px',
  background: '#1f2f4f',
  color: '#ffffff',
  fontWeight: 800,
  fontSize: '14px',
  cursor: 'pointer',
};