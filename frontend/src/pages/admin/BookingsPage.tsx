import { useEffect, useMemo, useState } from 'react';
import {
  deleteAdminBooking,
  getAdminBookingById,
  getAdminBookings,
  updateAdminBookingStatus,
  updateAdminPaymentStatus,
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

function getPaymentStyle(paymentStatus: string): React.CSSProperties {
  if (paymentStatus === 'Paid') {
    return { backgroundColor: '#dcfce7', color: '#166534' };
  }

  if (paymentStatus === 'Partially Paid') {
    return { backgroundColor: '#fff7d6', color: '#b45309' };
  }

  if (paymentStatus === 'Refunded') {
    return { backgroundColor: '#e0e7ff', color: '#4338ca' };
  }

  return { backgroundColor: '#fee2e2', color: '#b91c1c' };
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
      setError('');
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

  const handlePaymentStatusChange = async (
    id: number,
    paymentStatus: 'Unpaid' | 'Partially Paid' | 'Paid' | 'Refunded'
  ) => {
    try {
      setError('');
      await updateAdminPaymentStatus(id, paymentStatus);
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
      setError('');
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
                  <th style={thStyle}>Payment</th>
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

                      <td style={tdStyle}>
                        <select
                          value={item.payment_status}
                          onChange={(e) =>
                            handlePaymentStatusChange(
                              item.id,
                              e.target.value as (typeof paymentOptions)[number]
                            )
                          }
                          style={{
                            ...statusSelectStyle,
                            ...getPaymentStyle(item.payment_status),
                          }}
                        >
                          {paymentOptions.map((paymentStatus) => (
                            <option key={paymentStatus} value={paymentStatus}>
                              {paymentStatus}
                            </option>
                          ))}
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
                  <p style={detailTextStyle}><strong>Phone:</strong> {selectedBooking.customer_phone || '—'}</p>
                </div>

                <div style={detailCardStyle}>
                  <h3 style={detailHeadingStyle}>Venue & Notes</h3>
                  <p style={detailTextStyle}><strong>Venue:</strong> {selectedBooking.venue_name || '—'}</p>
                  <p style={detailTextStyle}><strong>Address:</strong> {selectedBooking.venue_address || '—'}</p>
                  <p style={detailTextStyle}><strong>Notes:</strong> {selectedBooking.special_requests || '—'}</p>
                </div>

                <div style={detailCardStyle}>
                  <h3 style={detailHeadingStyle}>Payment</h3>
                  <p style={detailTextStyle}><strong>Status:</strong> {selectedBooking.payment_status}</p>
                  <p style={detailTextStyle}><strong>Total:</strong> €{selectedBooking.total_price}</p>
                  <p style={detailTextStyle}><strong>Deposit:</strong> €{selectedBooking.deposit_amount}</p>
                  <p style={detailTextStyle}><strong>Remaining:</strong> €{selectedBooking.remaining_balance}</p>
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
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '16px',
};

const titleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: '30px',
  fontWeight: 800,
  color: '#0f172a',
};

const subtitleStyle: React.CSSProperties = {
  margin: '8px 0 0 0',
  color: '#64748b',
  fontSize: '15px',
};

const newBookingButtonStyle: React.CSSProperties = {
  height: '46px',
  border: 'none',
  borderRadius: '14px',
  padding: '0 18px',
  backgroundColor: '#f59e0b',
  color: '#0f172a',
  fontWeight: 800,
  cursor: 'pointer',
};

const errorBoxStyle: React.CSSProperties = {
  backgroundColor: '#fee2e2',
  color: '#b91c1c',
  padding: '14px 16px',
  borderRadius: '14px',
  fontWeight: 600,
};

const tableCardStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  borderRadius: '22px',
  padding: '20px',
  boxShadow: '0 14px 30px rgba(15, 23, 42, 0.06)',
};

const toolbarStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: '16px',
  marginBottom: '18px',
  flexWrap: 'wrap',
};

const toolbarRightStyle: React.CSSProperties = {
  display: 'flex',
  gap: '12px',
  flexWrap: 'wrap',
};

const searchInputStyle: React.CSSProperties = {
  minWidth: '250px',
  height: '46px',
  borderRadius: '14px',
  border: '1px solid #dbe2ea',
  padding: '0 14px',
  fontSize: '14px',
  outline: 'none',
};

const searchButtonStyle: React.CSSProperties = {
  height: '46px',
  padding: '0 16px',
  borderRadius: '14px',
  border: 'none',
  backgroundColor: '#0f172a',
  color: '#ffffff',
  fontWeight: 700,
  cursor: 'pointer',
};

const selectStyle: React.CSSProperties = {
  height: '46px',
  borderRadius: '14px',
  border: '1px solid #dbe2ea',
  padding: '0 14px',
  fontSize: '14px',
  backgroundColor: '#ffffff',
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
  padding: '14px 12px',
  fontSize: '13px',
  color: '#64748b',
  borderBottom: '1px solid #e5e7eb',
};

const tdStyle: React.CSSProperties = {
  padding: '14px 12px',
  fontSize: '14px',
  color: '#0f172a',
  borderBottom: '1px solid #f1f5f9',
  verticalAlign: 'middle',
};

const customerNameStyle: React.CSSProperties = {
  fontWeight: 700,
};

const customerEmailStyle: React.CSSProperties = {
  color: '#64748b',
  fontSize: '13px',
  marginTop: '4px',
};

const mutedTextStyle: React.CSSProperties = {
  color: '#64748b',
  fontSize: '13px',
  marginTop: '4px',
};

const statusSelectStyle: React.CSSProperties = {
  height: '36px',
  border: 'none',
  borderRadius: '999px',
  padding: '0 12px',
  fontSize: '13px',
  fontWeight: 700,
};

const actionRowStyle: React.CSSProperties = {
  display: 'flex',
  gap: '8px',
};

const viewButtonStyle: React.CSSProperties = {
  height: '34px',
  padding: '0 12px',
  borderRadius: '10px',
  border: 'none',
  backgroundColor: '#e2e8f0',
  color: '#0f172a',
  fontWeight: 700,
  cursor: 'pointer',
};

const deleteButtonStyle: React.CSSProperties = {
  height: '34px',
  padding: '0 12px',
  borderRadius: '10px',
  border: 'none',
  backgroundColor: '#fee2e2',
  color: '#b91c1c',
  fontWeight: 700,
  cursor: 'pointer',
};

const emptyStateStyle: React.CSSProperties = {
  padding: '26px',
  textAlign: 'center',
  color: '#64748b',
};

const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(15, 23, 42, 0.35)',
  display: 'flex',
  justifyContent: 'flex-end',
  zIndex: 50,
};

const drawerStyle: React.CSSProperties = {
  width: '100%',
  maxWidth: '520px',
  backgroundColor: '#ffffff',
  height: '100vh',
  padding: '24px',
  overflowY: 'auto',
  boxShadow: '-10px 0 30px rgba(15, 23, 42, 0.10)',
};

const drawerHeaderStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: '16px',
  marginBottom: '24px',
};

const drawerTitleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: '24px',
  fontWeight: 800,
  color: '#0f172a',
};

const drawerSubtitleStyle: React.CSSProperties = {
  margin: '8px 0 0 0',
  color: '#64748b',
  fontSize: '14px',
};

const closeButtonStyle: React.CSSProperties = {
  width: '40px',
  height: '40px',
  borderRadius: '12px',
  border: 'none',
  backgroundColor: '#f1f5f9',
  cursor: 'pointer',
  fontSize: '16px',
  fontWeight: 700,
};

const detailsGridStyle: React.CSSProperties = {
  display: 'grid',
  gap: '16px',
};

const detailCardStyle: React.CSSProperties = {
  backgroundColor: '#f8fafc',
  borderRadius: '18px',
  padding: '18px',
};

const detailHeadingStyle: React.CSSProperties = {
  margin: '0 0 12px 0',
  fontSize: '16px',
  fontWeight: 800,
  color: '#0f172a',
};

const detailTextStyle: React.CSSProperties = {
  margin: '8px 0',
  color: '#334155',
  fontSize: '14px',
};