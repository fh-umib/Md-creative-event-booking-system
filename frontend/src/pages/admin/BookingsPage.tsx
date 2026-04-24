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
  const d = new Date(date).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  });
  const t = time && time.slice(0, 5) !== '00:00' ? time.slice(0, 5) : '';
  return { date: d, time: t };
}

const statusCfg: Record<string, { bg: string; color: string; dot: string }> = {
  Approved:  { bg: '#fff7e6', color: '#b45309', dot: '#f59e0b' },
  Pending:   { bg: '#fdf2f8', color: '#9d174d', dot: '#ec4899' },
  Cancelled: { bg: '#fef2f2', color: '#991b1b', dot: '#ef4444' },
  Completed: { bg: '#f0fdf4', color: '#166534', dot: '#22c55e' },
};

const paymentCfg: Record<string, { bg: string; color: string }> = {
  Paid:             { bg: '#f0fdf4', color: '#166534' },
  'Partially Paid': { bg: '#fffbeb', color: '#92400e' },
  Refunded:         { bg: '#eef2ff', color: '#3730a3' },
  Unpaid:           { bg: '#fef2f2', color: '#991b1b' },
};

function StatusBadge({ status }: { status: string }) {
  const c = statusCfg[status] ?? { bg: '#f1f5f9', color: '#475569', dot: '#94a3b8' };
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 11px', borderRadius: 99, background: c.bg, color: c.color, fontSize: 12, fontWeight: 700 }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: c.dot, flexShrink: 0 }} />
      {status}
    </span>
  );
}

function PayBadge({ status }: { status: string }) {
  const c = paymentCfg[status] ?? { bg: '#f1f5f9', color: '#475569' };
  return (
    <span style={{ display: 'inline-flex', padding: '4px 11px', borderRadius: 99, background: c.bg, color: c.color, fontSize: 12, fontWeight: 700 }}>
      {status}
    </span>
  );
}

function DetailRow({ label, value }: { label: string; value?: string | number | null }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, padding: '9px 0', borderBottom: '1px solid #f1f5f9' }}>
      <span style={{ fontSize: 13, color: '#64748b', fontWeight: 500, flexShrink: 0 }}>{label}</span>
      <span style={{ fontSize: 13, color: '#0f172a', fontWeight: 600, textAlign: 'right' }}>{value ?? '—'}</span>
    </div>
  );
}

export default function BookingsPage() {
  const [bookings, setBookings]           = useState<AdminBooking[]>([]);
  const [loading, setLoading]             = useState(true);
  const [error, setError]                 = useState('');
  const [search, setSearch]               = useState('');
  const [statusFilter, setStatusFilter]   = useState<(typeof statusOptions)[number]>('All');
  const [selected, setSelected]           = useState<AdminBooking | null>(null);
  const [drawerOpen, setDrawerOpen]       = useState(false);
  const [drawerLoading, setDrawerLoading] = useState(false);

  const loadBookings = async () => {
    try {
      setLoading(true); setError('');
      setBookings(await getAdminBookings(search, statusFilter === 'All' ? '' : statusFilter));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load bookings');
    } finally { setLoading(false); }
  };

  useEffect(() => { loadBookings(); }, [statusFilter]);

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this booking?')) return;
    try {
      await deleteAdminBooking(id); await loadBookings();
      if (selected?.id === id) { setSelected(null); setDrawerOpen(false); }
    } catch (err) { setError(err instanceof Error ? err.message : 'Delete failed'); }
  };

  const handleStatusChange = async (id: number, status: AdminBooking['status']) => {
    try {
      await updateAdminBookingStatus(id, status); await loadBookings();
      if (selected?.id === id) setSelected(await getAdminBookingById(id));
    } catch (err) { setError(err instanceof Error ? err.message : 'Status update failed'); }
  };

  const handlePaymentChange = async (id: number, ps: typeof paymentOptions[number]) => {
    try {
      await updateAdminPaymentStatus(id, ps); await loadBookings();
      if (selected?.id === id) setSelected(await getAdminBookingById(id));
    } catch (err) { setError(err instanceof Error ? err.message : 'Payment update failed'); }
  };

  const handleView = async (id: number) => {
    setDrawerLoading(true); setDrawerOpen(true);
    try { setSelected(await getAdminBookingById(id)); }
    catch (err) { setError(err instanceof Error ? err.message : 'Failed to load details'); }
    finally { setDrawerLoading(false); }
  };

  const rows = useMemo(() => bookings, [bookings]);

  const stats = useMemo(() => ({
    total:    bookings.length,
    pending:  bookings.filter((b) => b.status === 'Pending').length,
    approved: bookings.filter((b) => b.status === 'Approved').length,
    revenue:  bookings.reduce((s, b) => s + Number(b.total_price || 0), 0),
  }), [bookings]);

  const spinnerStyle: React.CSSProperties = {
    width: 32, height: 32, borderRadius: '50%',
    border: '2.5px solid #e2e8f0', borderTopColor: '#c8841a',
    animation: 'abk-spin .7s linear infinite', margin: '0 auto 12px',
  };

  return (
    <>
      <style>{`
        @keyframes abk-spin  { to { transform: rotate(360deg); } }
        @keyframes abk-slide { from { transform: translateX(36px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes abk-fade  { from { opacity: 0; } to { opacity: 1; } }
      `}</style>

      <section style={{ display: 'flex', flexDirection: 'column', gap: 24, fontFamily: "'DM Sans','Inter',sans-serif" }}>

        {/* HEADER */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: '#0f172a' }}>Bookings</h1>
            <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: 14 }}>Manage all event bookings and reservations</p>
          </div>
          <button type="button" style={{ height: 42, padding: '0 20px', borderRadius: 12, border: 'none', background: 'linear-gradient(135deg,#d4911e,#c8841a)', color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer', boxShadow: '0 4px 14px rgba(200,132,26,.35)', whiteSpace: 'nowrap' }}>
            + New Booking
          </button>
        </div>

        {/* STAT CARDS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 14 }}>
          {[
            { label: 'Total Bookings', value: stats.total,                          icon: '📅', iconBg: '#eff6ff' },
            { label: 'Pending',        value: stats.pending,                         icon: '⏳', iconBg: '#fffbeb' },
            { label: 'Approved',       value: stats.approved,                        icon: '✅', iconBg: '#f0fdf4' },
            { label: 'Revenue',        value: `€${stats.revenue.toLocaleString()}`,  icon: '💰', iconBg: '#fef3d0' },
          ].map((s) => (
            <div key={s.label} style={{ background: '#fff', borderRadius: 16, border: '1.5px solid #e2e8f0', padding: '16px 18px', boxShadow: '0 2px 8px rgba(15,23,42,.04)', display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 42, height: 42, borderRadius: 12, background: s.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
                {s.icon}
              </div>
              <div>
                <p style={{ margin: 0, fontSize: 12, color: '#64748b', fontWeight: 500 }}>{s.label}</p>
                <p style={{ margin: '2px 0 0', fontSize: 22, fontWeight: 800, color: '#0f172a', lineHeight: 1 }}>{s.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ERROR */}
        {error && (
          <div style={{ background: '#fef2f2', color: '#991b1b', border: '1px solid #fecaca', borderRadius: 12, padding: '12px 16px', fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
            ⚠️ {error}
          </div>
        )}

        {/* TABLE CARD */}
        <div style={{ background: '#fff', borderRadius: 20, border: '1.5px solid #e2e8f0', boxShadow: '0 4px 20px rgba(15,23,42,.05)', overflow: 'hidden' }}>

          {/* Toolbar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '16px 20px', borderBottom: '1px solid #f1f5f9', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', flex: 1, minWidth: 200, maxWidth: 320 }}>
              <svg style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="6" cy="6" r="4.5" stroke="#94a3b8" strokeWidth="1.4" />
                <path d="M10 10l2 2" stroke="#94a3b8" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
              <input
                type="text" placeholder="Search bookings…" value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && loadBookings()}
                onFocus={(e) => (e.target.style.borderColor = '#c8841a')}
                onBlur={(e) => (e.target.style.borderColor = '#e2e8f0')}
                style={{ width: '100%', height: 40, borderRadius: 10, border: '1.5px solid #e2e8f0', padding: '0 14px 0 34px', fontSize: 14, background: '#f8fafc', color: '#0f172a', boxSizing: 'border-box' as const, outline: 'none', transition: 'border-color .2s' }}
              />
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
              {statusOptions.map((s) => {
                const active = statusFilter === s;
                return (
                  <button key={s} type="button" onClick={() => setStatusFilter(s)}
                    style={{ height: 38, padding: '0 14px', borderRadius: 10, border: `1.5px solid ${active ? '#c8841a' : '#e2e8f0'}`, background: active ? '#c8841a' : '#fff', color: active ? '#fff' : '#475569', fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all .15s' }}>
                    {s}
                  </button>
                );
              })}
              <button type="button" onClick={loadBookings}
                style={{ height: 38, padding: '0 16px', borderRadius: 10, border: 'none', background: '#0f172a', color: '#fff', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
                Search
              </button>
            </div>
          </div>

          {/* Content */}
          {loading ? (
            <div style={{ padding: 48, textAlign: 'center', color: '#64748b', fontSize: 14 }}>
              <div style={spinnerStyle} /> Loading bookings…
            </div>
          ) : rows.length === 0 ? (
            <div style={{ padding: 60, textAlign: 'center', color: '#64748b' }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>📋</div>
              <p style={{ margin: 0, fontSize: 15, fontWeight: 600, color: '#0f172a' }}>No bookings found</p>
              <p style={{ margin: '6px 0 0', fontSize: 13 }}>Try adjusting your search or filter</p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 860 }}>
                <thead>
                  <tr style={{ background: '#f8fafc' }}>
                    {['ID', 'Customer', 'Package', 'Event Date', 'Guests', 'Status', 'Payment', 'Amount', 'Actions'].map((h) => (
                      <th key={h} style={{ textAlign: 'left', padding: '11px 14px', fontSize: 11, fontWeight: 700, color: '#64748b', letterSpacing: '.05em', textTransform: 'uppercase', borderBottom: '1px solid #e2e8f0', whiteSpace: 'nowrap' }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((item, idx) => {
                    const fmt = formatDate(item.event_date, item.start_time);
                    return (
                      <tr key={item.id}
                        style={{ background: idx % 2 === 0 ? '#fff' : '#fafbfc', transition: 'background .12s' }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = '#f8fafc'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = idx % 2 === 0 ? '#fff' : '#fafbfc'; }}
                      >
                        <td style={{ padding: '12px 14px', borderBottom: '1px solid #f1f5f9', whiteSpace: 'nowrap' }}>
                          <span style={{ fontSize: 12, color: '#94a3b8', fontWeight: 700 }}>#{item.booking_code}</span>
                        </td>
                        <td style={{ padding: '12px 14px', borderBottom: '1px solid #f1f5f9' }}>
                          <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#0f172a' }}>{item.customer_name}</p>
                          <p style={{ margin: '2px 0 0', fontSize: 12, color: '#64748b' }}>{item.customer_email}</p>
                        </td>
                        <td style={{ padding: '12px 14px', borderBottom: '1px solid #f1f5f9', maxWidth: 130 }}>
                          <span style={{ fontSize: 13, color: item.package_title ? '#334155' : '#94a3b8' }}>
                            {item.package_title || '—'}
                          </span>
                        </td>
                        <td style={{ padding: '12px 14px', borderBottom: '1px solid #f1f5f9', whiteSpace: 'nowrap' }}>
                          <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{fmt.date}</p>
                          {fmt.time && <p style={{ margin: '2px 0 0', fontSize: 12, color: '#64748b' }}>{fmt.time}</p>}
                        </td>
                        <td style={{ padding: '12px 14px', borderBottom: '1px solid #f1f5f9', textAlign: 'center' }}>
                          <span style={{ fontSize: 13, fontWeight: 600, color: '#334155' }}>{item.guest_count}</span>
                        </td>
                        <td style={{ padding: '12px 14px', borderBottom: '1px solid #f1f5f9' }}>
                          <select value={item.status}
                            onChange={(e) => handleStatusChange(item.id, e.target.value as AdminBooking['status'])}
                            style={{ ...(statusCfg[item.status] ?? {}), border: 'none', borderRadius: 99, padding: '5px 10px', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
                            {['Pending', 'Approved', 'Completed', 'Cancelled'].map((s) => <option key={s} value={s}>{s}</option>)}
                          </select>
                        </td>
                        <td style={{ padding: '12px 14px', borderBottom: '1px solid #f1f5f9' }}>
                          <select value={item.payment_status}
                            onChange={(e) => handlePaymentChange(item.id, e.target.value as typeof paymentOptions[number])}
                            style={{ ...(paymentCfg[item.payment_status] ?? {}), border: 'none', borderRadius: 99, padding: '5px 10px', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
                            {paymentOptions.map((p) => <option key={p} value={p}>{p}</option>)}
                          </select>
                        </td>
                        <td style={{ padding: '12px 14px', borderBottom: '1px solid #f1f5f9', whiteSpace: 'nowrap' }}>
                          <span style={{ fontSize: 14, fontWeight: 800, color: '#0f172a' }}>€{item.total_price}</span>
                        </td>
                        <td style={{ padding: '12px 14px', borderBottom: '1px solid #f1f5f9' }}>
                          <div style={{ display: 'flex', gap: 6 }}>
                            <button type="button" onClick={() => handleView(item.id)}
                              onMouseEnter={(e) => { e.currentTarget.style.background = '#e2e8f0'; }}
                              onMouseLeave={(e) => { e.currentTarget.style.background = '#f8fafc'; }}
                              style={{ height: 30, padding: '0 12px', borderRadius: 8, border: '1.5px solid #e2e8f0', background: '#f8fafc', color: '#334155', fontWeight: 700, fontSize: 12, cursor: 'pointer', transition: 'background .15s' }}>
                              View
                            </button>
                            <button type="button" onClick={() => handleDelete(item.id)}
                              onMouseEnter={(e) => { e.currentTarget.style.background = '#fecaca'; }}
                              onMouseLeave={(e) => { e.currentTarget.style.background = '#fef2f2'; }}
                              style={{ height: 30, padding: '0 12px', borderRadius: 8, border: '1.5px solid #fecaca', background: '#fef2f2', color: '#b91c1c', fontWeight: 700, fontSize: 12, cursor: 'pointer', transition: 'background .15s' }}>
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

          {/* Footer count */}
          {rows.length > 0 && (
            <div style={{ padding: '11px 20px', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
              <span style={{ fontSize: 13, color: '#64748b' }}>
                Showing <strong style={{ color: '#0f172a' }}>{rows.length}</strong> booking{rows.length !== 1 ? 's' : ''}
              </span>
              <span style={{ fontSize: 12, color: '#94a3b8' }}>
                {statusFilter !== 'All' ? `Filtered: ${statusFilter}` : 'All statuses'}
              </span>
            </div>
          )}
        </div>
      </section>

      {/* DRAWER */}
      {drawerOpen && (
        <div onClick={() => setDrawerOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,.42)', display: 'flex', justifyContent: 'flex-end', zIndex: 9999, animation: 'abk-fade .18s ease' }}>
          <div onClick={(e) => e.stopPropagation()}
            style={{ width: '100%', maxWidth: 500, background: '#fff', height: '100dvh', overflowY: 'auto', display: 'flex', flexDirection: 'column', boxShadow: '-16px 0 48px rgba(15,23,42,.14)', animation: 'abk-slide .22s ease' }}>

            {/* Sticky header */}
            <div style={{ padding: '18px 22px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, position: 'sticky', top: 0, background: '#fff', zIndex: 1 }}>
              <div>
                <h2 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: '#0f172a' }}>Booking Details</h2>
                {selected && (
                  <div style={{ marginTop: 5, display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 13, color: '#64748b' }}>#{selected.booking_code}</span>
                    <StatusBadge status={selected.status} />
                  </div>
                )}
              </div>
              <button onClick={() => setDrawerOpen(false)}
                style={{ width: 34, height: 34, borderRadius: 9, border: '1.5px solid #e2e8f0', background: '#f8fafc', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: '#475569', flexShrink: 0 }}>
                ✕
              </button>
            </div>

            {drawerLoading || !selected ? (
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 12, color: '#64748b' }}>
                <div style={spinnerStyle} />
                Loading details…
              </div>
            ) : (
              <div style={{ padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 16, flex: 1 }}>

                <div style={{ background: '#f8fafc', borderRadius: 14, padding: 16, border: '1.5px solid #e2e8f0' }}>
                  <p style={{ margin: '0 0 10px', fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '.07em' }}>📅 Booking Info</p>
                  <DetailRow label="Code"        value={selected.booking_code} />
                  <DetailRow label="Event Title" value={selected.event_title} />
                  <DetailRow label="Event Type"  value={selected.event_type} />
                  <DetailRow label="Date"        value={selected.event_date} />
                  <DetailRow label="Time"        value={`${selected.start_time || '—'} – ${selected.end_time || '—'}`} />
                  <DetailRow label="Guests"      value={selected.guest_count} />
                  <DetailRow label="Package"     value={selected.package_title} />
                </div>

                <div style={{ background: '#f8fafc', borderRadius: 14, padding: 16, border: '1.5px solid #e2e8f0' }}>
                  <p style={{ margin: '0 0 10px', fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '.07em' }}>👤 Customer</p>
                  <DetailRow label="Name"  value={selected.customer_name} />
                  <DetailRow label="Email" value={selected.customer_email} />
                  <DetailRow label="Phone" value={selected.customer_phone} />
                </div>

                <div style={{ background: '#f8fafc', borderRadius: 14, padding: 16, border: '1.5px solid #e2e8f0' }}>
                  <p style={{ margin: '0 0 10px', fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '.07em' }}>📍 Venue & Notes</p>
                  <DetailRow label="Venue"   value={selected.venue_name} />
                  <DetailRow label="Address" value={selected.venue_address} />
                  <DetailRow label="Notes"   value={selected.special_requests} />
                </div>

                <div style={{ background: '#fef9ed', borderRadius: 14, padding: 16, border: '1.5px solid #e8d5a0' }}>
                  <p style={{ margin: '0 0 10px', fontSize: 11, fontWeight: 700, color: '#92640e', textTransform: 'uppercase', letterSpacing: '.07em' }}>💰 Payment</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #f0e9dd' }}>
                    <span style={{ fontSize: 13, color: '#92640e', fontWeight: 500 }}>Status</span>
                    <PayBadge status={selected.payment_status} />
                  </div>
                  <DetailRow label="Total"     value={`€${selected.total_price}`} />
                  <DetailRow label="Deposit"   value={`€${selected.deposit_amount}`} />
                  <DetailRow label="Remaining" value={`€${selected.remaining_balance}`} />
                </div>

                <div style={{ display: 'flex', gap: 10 }}>
                  <select value={selected.status}
                    onChange={(e) => handleStatusChange(selected.id, e.target.value as AdminBooking['status'])}
                    style={{ flex: 1, height: 40, borderRadius: 10, border: '1.5px solid #e2e8f0', padding: '0 12px', fontSize: 13, fontWeight: 600, background: '#f8fafc', color: '#0f172a', cursor: 'pointer' }}>
                    {['Pending', 'Approved', 'Completed', 'Cancelled'].map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <button onClick={() => handleDelete(selected.id)}
                    style={{ height: 40, padding: '0 16px', borderRadius: 10, border: '1.5px solid #fecaca', background: '#fef2f2', color: '#b91c1c', fontWeight: 700, fontSize: 13, cursor: 'pointer', whiteSpace: 'nowrap' }}>
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}