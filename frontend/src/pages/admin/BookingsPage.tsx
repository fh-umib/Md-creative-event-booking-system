import { useBookings } from '../../hooks/useBookings';

export default function BookingsPage() {
  const { bookings, isLoading, error, updateBookingStatus } = useBookings();

  if (isLoading) return <p>Loading bookings...</p>;
  if (error) return <p style={{ color: 'crimson' }}>{error}</p>;

  return (
    <section>
      <h1 style={{ marginBottom: '20px' }}>Bookings</h1>

      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={thStyle}>Client</th>
                <th style={thStyle}>Event Date</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((booking: any) => (
                <tr key={booking.id}>
                  <td style={tdStyle}>{booking.customerName}</td>
                  <td style={tdStyle}>{booking.eventDate}</td>
                  <td style={tdStyle}>{booking.status}</td>
                  <td style={tdStyle}>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      <button onClick={() => updateBookingStatus(booking.id, 'Approved' as any)}>
                        Approve
                      </button>
                      <button onClick={() => updateBookingStatus(booking.id, 'Cancelled' as any)}>
                        Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

const thStyle: React.CSSProperties = {
  border: '1px solid #e5e7eb',
  textAlign: 'left',
  padding: '12px',
  background: '#f9fafb',
};

const tdStyle: React.CSSProperties = {
  border: '1px solid #e5e7eb',
  padding: '12px',
};