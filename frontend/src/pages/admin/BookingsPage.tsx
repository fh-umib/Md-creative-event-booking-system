import { useEffect } from 'react';

import { useBookingAdmin } from '../../hooks/useBookingAdmin';
import AdminBookingStats from '../../components/admin/booking/AdminBookingStats';
import AdminBookingFilters from '../../components/admin/booking/AdminBookingFilters';
import AdminBookingList from '../../components/admin/booking/AdminBookingList';
import AdminBookingDetailsDrawer from '../../components/admin/booking/AdminBookingDetailsDrawer';

export default function BookingsPage() {
  const {
    items,
    selectedBooking,
    filters,
    isLoading,
    error,
    stats,
    setFilters,
    setSelectedBooking,
    fetchBookings,
    fetchBookingById,
  } = useBookingAdmin();

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <section style={pageStyle}>
      <div style={containerStyle}>
        <div style={headerStyle}>
          <h1 style={titleStyle}>Admin Bookings</h1>
          <p style={textStyle}>
            Manage booking requests, review event details, and track statuses.
          </p>
        </div>

        <div style={sectionWrapStyle}>
          <AdminBookingStats stats={stats} />

          <AdminBookingFilters
            filters={filters}
            onChange={setFilters}
            onApply={() => fetchBookings(filters)}
          />

          {isLoading ? (
            <div style={stateBoxStyle}>Loading bookings...</div>
          ) : error ? (
            <div style={errorBoxStyle}>{error}</div>
          ) : (
            <AdminBookingList
              items={items}
              onView={(id) => {
                fetchBookingById(id);
              }}
            />
          )}
        </div>
      </div>

      <AdminBookingDetailsDrawer
        item={selectedBooking}
        onClose={() => setSelectedBooking(null)}
      />
    </section>
  );
}

const pageStyle: React.CSSProperties = {
  background: '#f8fafc',
  padding: '32px 24px 60px',
  minHeight: '100vh',
};

const containerStyle: React.CSSProperties = {
  maxWidth: '1280px',
  margin: '0 auto',
};

const headerStyle: React.CSSProperties = {
  marginBottom: '24px',
};

const titleStyle: React.CSSProperties = {
  margin: '0 0 8px',
  color: '#0f172a',
  fontSize: '36px',
  fontWeight: 800,
};

const textStyle: React.CSSProperties = {
  margin: 0,
  color: '#64748b',
  fontSize: '17px',
  lineHeight: 1.7,
};

const sectionWrapStyle: React.CSSProperties = {
  display: 'grid',
  gap: '18px',
};

const stateBoxStyle: React.CSSProperties = {
  background: '#ffffff',
  border: '1px solid #e5e7eb',
  borderRadius: '22px',
  padding: '28px 20px',
  color: '#64748b',
  fontWeight: 700,
};

const errorBoxStyle: React.CSSProperties = {
  background: '#fff1f2',
  border: '1px solid #fecaca',
  borderRadius: '22px',
  padding: '28px 20px',
  color: '#be123c',
  fontWeight: 700,
};