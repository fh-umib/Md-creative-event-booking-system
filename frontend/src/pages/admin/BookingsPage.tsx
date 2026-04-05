import { useEffect, useMemo, useState } from 'react';
import {
  deleteAdminBooking,
  getAdminBookingById,
  getAdminBookings,
  updateAdminBookingStatus,
} from '../../services/bookingAdminApi';
import type { AdminBooking } from '../../services/bookingAdminApi';

const statusOptions = ['All', 'Pending', 'Approved', 'Completed', 'Cancelled'] as const;
const paymentOptions = ['Unpaid', 'Partially Paid', 'Paid', 'Refunded'] as const;

function formatDate(date: string, time?: string | null) {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const formattedTime =
    time && time.slice(0, 5) !== '00:00' ? time.slice(0, 5) : '';

  return {
    date: formattedDate,
    time: formattedTime,
  };
}

function getStatusStyle(status: AdminBooking['status']): React.CSSProperties {
  if (status === 'Approved') {
    return { backgroundColor: '#fff1de', color: '#f08a00' };
  }

  if (status === 'Pending') {
    return { backgroundColor: '#ffe2ec', color: '#d6457a' };
  }

  if (status === 'Cancelled') {
    return { backgroundColor: '#ffe3e3', color: '#dc2626' };
  }

  return { backgroundColor: '#eef2f7', color: '#374151' };
}

async function updatePaymentStatus(id: number, payment_status: string) {
  const response = await fetch(`http://localhost:5000/api/bookings/${id}/payment-status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ payment_status }),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.message || 'Failed to update payment status');
  }

  return response.json();
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<AdminBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] =
    useState<(typeof statusOptions)[number]>('All');

  const [selectedBooking, setSelectedBooking] = useState<AdminBooking | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [detailsLoading, setDetailsLoading] = useState(false);

  const loadBookings = async () => {
    try {
      setLoading(true);
      setError('');

      const data = await getAdminBookings(
        search,
        statusFilter === 'All' ? '' : statusFilter
      );

      setBookings(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, [statusFilter]);

  const handleSearch = async () => {
    await loadBookings();
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm('Are you sure you want to delete this booking?');
    if (!confirmed) return;

    try {
      await deleteAdminBooking(id);
      await loadBookings();

      if (selectedBooking?.id === id) {
        setSelectedBooking(null);
        setDetailsOpen(false);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed');
    }
  };

  const handleStatusChange = async (
    id: number,
    status: AdminBooking['status']
  ) => {
    try {
      await updateAdminBookingStatus(id, status);
      await loadBookings();

      if (selectedBooking?.id === id) {
        const fresh = await getAdminBookingById(id);
        setSelectedBooking(fresh);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Status update failed');
    }
  };

  const handlePaymentStatusChange = async (id: number, paymentStatus: string) => {
    try {
      await updatePaymentStatus(id, paymentStatus);
      await loadBookings();

      if (selectedBooking?.id === id) {
        const fresh = await getAdminBookingById(id);
        setSelectedBooking(fresh);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment update failed');
    }
  };

  const handleView = async (id: number) => {
    try {
      setDetailsLoading(true);
      setDetailsOpen(true);
      const data = await getAdminBookingById(id);
      setSelectedBooking(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load details');
    } finally {
      setDetailsLoading(false);
    }
  };

  const rows = useMemo(() => bookings, [bookings]);

  return (
    <section style={pageStyle}>
      <div style={topHeaderStyle}>
        <div>
          <h1 style={titleStyle}>Bookings</h1>
          <p style={subtitleStyle}>Manage all event bookings and reservations</p>
        </div>

        <button type="button" style={newBookingButtonStyle}>
          + New Booking
        </button>
      </div>

      {error ? <div style={errorBoxStyle}>{error}</div> : null}

      <div style={tableCardStyle}>
        <div style={toolbarStyle}>
          <input
            type="text"
            placeholder="Search bookings..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={searchInputStyle}
          />

          <div style={toolbarRightStyle}>
            <button type="button" style={searchButtonStyle} onClick={handleSearch}>
              Search
            </button>

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as (typeof statusOptions)[number])
              }
              style={selectStyle}
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status === 'All' ? 'All Status' : status}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div style={emptyStateStyle}>Loading bookings...</div>
        ) : rows.length === 0 ? (
          <div style={emptyStateStyle}>No bookings found.</div>
        ) : (
          <div style={tableWrapperStyle}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>ID</th>
                  <th style={thStyle}>Customer</th>
                  <th style={thStyle}>Package</th>
                  <th style={thStyle}>Date & Time</th>
                  <th style={thStyle}>Guests</th>
                  <th style={thStyle}>Status</th>
                  <th style={thStyle}>Amount</th>
                  <th style={thStyle}>Actions</th>
                </tr>
              </thead>

              <tbody>
                {rows.map((item) => {
                  const formatted = formatDate(item.event_date, item.start_time);

                  return (
                    <tr key={item.id}>
                      <td style={tdStyle}>#{item.booking_code}</td>

                      <td style={tdStyle}>
                        <div style={customerNameStyle}>{item.customer_name}</div>
                        <div style={customerEmailStyle}>{item.customer_email}</div>
                      </td>

                      <td style={tdStyle}>{item.package_title || 'No Package'}</td>

                      <td style={tdStyle}>
                        <div>{formatted.date}</div>
                        <div style={mutedTextStyle}>{formatted.time}</div>
                      </td>

                      <td style={tdStyle}>{item.guest_count}</td>

                      <td style={tdStyle}>
                        <select
                          value={item.status}
                          onChange={(e) =>
                            handleStatusChange(
                              item.id,
                              e.target.value as AdminBooking['status']
                            )
                          }
                          style={{
                            ...statusSelectStyle,
                            ...getStatusStyle(item.status),
                          }}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Approved">Approved</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>

                      <td style={tdStyle}>€{item.total_price}</td>

                      <td style={tdStyle}>
                        <div style={actionRowStyle}>
                          <button
                            type="button"
                            style={viewButtonStyle}
                            onClick={() => handleView(item.id)}
                          >
                            View
                          </button>
                          <button
                            type="button"
                            style={deleteButtonStyle}
                            onClick={() => handleDelete(item.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {detailsOpen && (
        <div style={overlayStyle} onClick={() => setDetailsOpen(false)}>
          <div style={drawerStyle} onClick={(e) => e.stopPropagation()}>
            <div style={drawerHeaderStyle}>
              <div>
                <h2 style={drawerTitleStyle}>Booking Details</h2>
                <p style={drawerSubtitleStyle}>
                  Review booking information and payment details.
                </p>
              </div>

              <button
                type="button"
                style={closeButtonStyle}
                onClick={() => setDetailsOpen(false)}
              >
                ✕
              </button>
            </div>

            {detailsLoading || !selectedBooking ? (
              <div style={emptyStateStyle}>Loading details...</div>
            ) : (
              <div style={detailsGridStyle}>
                <div style={detailCardStyle}>
                  <h3 style={detailHeadingStyle}>Booking Info</h3>
                  <p style={detailTextStyle}><strong>Code:</strong> {selectedBooking.booking_code}</p>
                  <p style={detailTextStyle}><strong>Event Title:</strong> {selectedBooking.event_title}</p>
                  <p style={detailTextStyle}><strong>Event Type:</strong> {selectedBooking.event_type || '—'}</p>
                  <p style={detailTextStyle}><strong>Date:</strong> {selectedBooking.event_date}</p>
                  <p style={detailTextStyle}><strong>Time:</strong> {selectedBooking.start_time || '—'} - {selectedBooking.end_time || '—'}</p>
                  <p style={detailTextStyle}><strong>Guests:</strong> {selectedBooking.guest_count}</p>
                </div>

                <div style={detailCardStyle}>
                  <h3 style={detailHeadingStyle}>Customer</h3>
                  <p style={detailTextStyle}><strong>Name:</strong> {selectedBooking.customer_name}</p>
                  <p style={detailTextStyle}><strong>Email:</strong> {selectedBooking.customer_email}</p>
                  <p style={detailTextStyle}><strong>Phone:</strong> {'customer_phone' in selectedBooking ? (selectedBooking as any).customer_phone || '—' : '—'}</p>
                </div>

                <div style={detailCardStyle}>
                  <h3 style={detailHeadingStyle}>Venue & Notes</h3>
                  <p style={detailTextStyle}><strong>Venue:</strong> {'venue_name' in selectedBooking ? (selectedBooking as any).venue_name || '—' : '—'}</p>
                  <p style={detailTextStyle}><strong>Address:</strong> {'venue_address' in selectedBooking ? (selectedBooking as any).venue_address || '—' : '—'}</p>
                  <p style={detailTextStyle}><strong>Requests:</strong> {'special_requests' in selectedBooking ? (selectedBooking as any).special_requests || '—' : '—'}</p>
                </div>

                <div style={detailCardStyle}>
                  <h3 style={detailHeadingStyle}>Package & Payment</h3>
                  <p style={detailTextStyle}><strong>Package:</strong> {selectedBooking.package_title || 'No Package'}</p>
                  <p style={detailTextStyle}><strong>Total:</strong> €{selectedBooking.total_price}</p>
                  <p style={detailTextStyle}><strong>Deposit:</strong> €{selectedBooking.deposit_amount}</p>
                  <p style={detailTextStyle}><strong>Remaining:</strong> €{selectedBooking.remaining_balance}</p>

                  <div style={{ marginTop: '14px' }}>
                    <label style={smallLabelStyle}>Payment Status</label>
                    <select
                      value={selectedBooking.payment_status}
                      onChange={(e) =>
                        handlePaymentStatusChange(selectedBooking.id, e.target.value)
                      }
                      style={paymentSelectStyle}
                    >
                      {paymentOptions.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

const pageStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
};

const topHeaderStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '16px',
  flexWrap: 'wrap',
};

const titleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: '36px',
  fontWeight: 800,
  color: '#1f2937',
};

const subtitleStyle: React.CSSProperties = {
  margin: '8px 0 0 0',
  fontSize: '16px',
  color: '#6b7280',
};

const newBookingButtonStyle: React.CSSProperties = {
  border: 'none',
  borderRadius: '14px',
  background: 'linear-gradient(135deg, #f59e0b, #ec4899)',
  color: '#ffffff',
  padding: '14px 22px',
  fontSize: '15px',
  fontWeight: 700,
  cursor: 'pointer',
};

const errorBoxStyle: React.CSSProperties = {
  backgroundColor: '#fff1f1',
  color: '#a33b3b',
  border: '1px solid #f2caca',
  borderRadius: '16px',
  padding: '14px 16px',
  fontSize: '14px',
  fontWeight: 600,
};

const tableCardStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  borderRadius: '24px',
  border: '1px solid #ece7df',
  boxShadow: '0 14px 28px rgba(15, 23, 42, 0.05)',
  overflow: 'hidden',
};

const toolbarStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: '16px',
  padding: '20px',
  borderBottom: '1px solid #f1ece5',
  flexWrap: 'wrap',
};

const toolbarRightStyle: React.CSSProperties = {
  display: 'flex',
  gap: '12px',
  flexWrap: 'wrap',
};

const searchInputStyle: React.CSSProperties = {
  flex: 1,
  minWidth: '280px',
  height: '48px',
  borderRadius: '14px',
  border: '1px solid #ece7df',
  padding: '0 16px',
  fontSize: '14px',
  outline: 'none',
  backgroundColor: '#faf8f5',
};

const searchButtonStyle: React.CSSProperties = {
  height: '48px',
  border: '1px solid #e4d7c4',
  borderRadius: '14px',
  backgroundColor: '#fffaf2',
  color: '#1f2937',
  padding: '0 18px',
  fontSize: '14px',
  fontWeight: 700,
  cursor: 'pointer',
};

const selectStyle: React.CSSProperties = {
  height: '48px',
  borderRadius: '14px',
  border: '1px solid #ece7df',
  padding: '0 14px',
  fontSize: '14px',
  backgroundColor: '#faf8f5',
  outline: 'none',
};

const emptyStateStyle: React.CSSProperties = {
  padding: '28px',
  textAlign: 'center',
  color: '#6b7280',
  fontSize: '15px',
};

const tableWrapperStyle: React.CSSProperties = {
  overflowX: 'auto',
};

const tableStyle: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
};

const thStyle: React.CSSProperties = {
  textAlign: 'left',
  padding: '18px 20px',
  fontSize: '13px',
  color: '#6b7280',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.6px',
  borderBottom: '1px solid #f1ece5',
  backgroundColor: '#fcfbf9',
};

const tdStyle: React.CSSProperties = {
  padding: '20px',
  fontSize: '15px',
  color: '#1f2937',
  borderBottom: '1px solid #f5f1eb',
  verticalAlign: 'middle',
};

const customerNameStyle: React.CSSProperties = {
  fontWeight: 700,
  color: '#1f2937',
};

const customerEmailStyle: React.CSSProperties = {
  marginTop: '4px',
  color: '#6b7280',
  fontSize: '13px',
};

const mutedTextStyle: React.CSSProperties = {
  marginTop: '4px',
  color: '#6b7280',
  fontSize: '13px',
};

const statusSelectStyle: React.CSSProperties = {
  border: 'none',
  borderRadius: '999px',
  padding: '8px 12px',
  fontSize: '13px',
  fontWeight: 700,
  outline: 'none',
  cursor: 'pointer',
};

const actionRowStyle: React.CSSProperties = {
  display: 'flex',
  gap: '8px',
  flexWrap: 'wrap',
};

const viewButtonStyle: React.CSSProperties = {
  border: '1px solid #e3d8c9',
  backgroundColor: '#ffffff',
  color: '#1f2937',
  borderRadius: '10px',
  padding: '8px 12px',
  fontSize: '13px',
  fontWeight: 700,
  cursor: 'pointer',
};

const deleteButtonStyle: React.CSSProperties = {
  border: 'none',
  backgroundColor: '#fde8e8',
  color: '#b91c1c',
  borderRadius: '10px',
  padding: '8px 12px',
  fontSize: '13px',
  fontWeight: 700,
  cursor: 'pointer',
};

const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(15, 23, 42, 0.28)',
  display: 'flex',
  justifyContent: 'flex-end',
  zIndex: 2000,
};

const drawerStyle: React.CSSProperties = {
  width: '520px',
  maxWidth: '100%',
  height: '100vh',
  backgroundColor: '#ffffff',
  padding: '24px',
  overflowY: 'auto',
  boxShadow: '-18px 0 40px rgba(15, 23, 42, 0.12)',
};

const drawerHeaderStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: '12px',
  marginBottom: '22px',
};

const drawerTitleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: '28px',
  fontWeight: 800,
  color: '#1f2937',
};

const drawerSubtitleStyle: React.CSSProperties = {
  margin: '8px 0 0 0',
  color: '#6b7280',
  fontSize: '14px',
};

const closeButtonStyle: React.CSSProperties = {
  border: 'none',
  backgroundColor: '#f7f4ef',
  color: '#374151',
  width: '40px',
  height: '40px',
  borderRadius: '12px',
  fontSize: '18px',
  cursor: 'pointer',
};

const detailsGridStyle: React.CSSProperties = {
  display: 'grid',
  gap: '16px',
};

const detailCardStyle: React.CSSProperties = {
  backgroundColor: '#fcfbf9',
  border: '1px solid #ece7df',
  borderRadius: '18px',
  padding: '18px',
};

const detailHeadingStyle: React.CSSProperties = {
  margin: '0 0 12px 0',
  fontSize: '18px',
  fontWeight: 800,
  color: '#1f2937',
};

const detailTextStyle: React.CSSProperties = {
  margin: '0 0 10px 0',
  fontSize: '14px',
  color: '#4b5563',
  lineHeight: 1.7,
};

const smallLabelStyle: React.CSSProperties = {
  display: 'block',
  marginBottom: '8px',
  fontSize: '13px',
  fontWeight: 700,
  color: '#374151',
};

const paymentSelectStyle: React.CSSProperties = {
  width: '100%',
  height: '44px',
  borderRadius: '12px',
  border: '1px solid #e5dccf',
  padding: '0 12px',
  fontSize: '14px',
  outline: 'none',
  backgroundColor: '#ffffff',
};