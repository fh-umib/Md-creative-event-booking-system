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

const statusLabels: Record<string, string> = {
  All: 'Të gjitha',
  Pending: 'Në pritje',
  Approved: 'E aprovuar',
  Completed: 'E përfunduar',
  Cancelled: 'E anuluar',
};

const paymentLabels: Record<string, string> = {
  Unpaid: 'E papaguar',
  'Partially Paid': 'Paguar pjesërisht',
  Paid: 'E paguar',
  Refunded: 'E kthyer',
};

function formatDate(date?: string | null, time?: string | null) {
  if (!date) return '—';

  const formattedDate = new Date(date).toLocaleDateString('sq-AL', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const formattedTime = time && time.slice(0, 5) !== '00:00' ? time.slice(0, 5) : '';

  return formattedTime ? `${formattedDate}, ${formattedTime}` : formattedDate;
}

function formatMoney(value?: string | number | null) {
  return `€${Number(value || 0).toLocaleString('de-DE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function StatusBadge({ status }: { status: string }) {
  const className = `booking-badge booking-badge-${status.toLowerCase().replaceAll(' ', '-')}`;

  return <span className={className}>{statusLabels[status] || status}</span>;
}

function PaymentBadge({ status }: { status: string }) {
  const className = `booking-badge booking-payment-${status.toLowerCase().replaceAll(' ', '-')}`;

  return <span className={className}>{paymentLabels[status] || status}</span>;
}

function DetailRow({ label, value }: { label: string; value?: string | number | null }) {
  return (
    <div className="booking-detail-row">
      <span>{label}</span>
      <strong>{value || '—'}</strong>
    </div>
  );
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<AdminBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [drawerLoading, setDrawerLoading] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<(typeof statusOptions)[number]>('All');
  const [selectedBooking, setSelectedBooking] = useState<AdminBooking | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const loadBookings = async () => {
    try {
      setLoading(true);
      setError('');

      const data = await getAdminBookings(search, statusFilter === 'All' ? '' : statusFilter);
      setBookings(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Rezervimet nuk mund të ngarkohen.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, [statusFilter]);

  const stats = useMemo(() => {
    const totalRevenue = bookings.reduce((sum, item) => sum + Number(item.total_price || 0), 0);

    return [
      { label: 'Totali', value: bookings.length },
      { label: 'Në pritje', value: bookings.filter((item) => item.status === 'Pending').length },
      { label: 'Të aprovuara', value: bookings.filter((item) => item.status === 'Approved').length },
      { label: 'Të përfunduara', value: bookings.filter((item) => item.status === 'Completed').length },
      { label: 'Të ardhura', value: formatMoney(totalRevenue) },
    ];
  }, [bookings]);

  const handleViewBooking = async (id: number) => {
    try {
      setDrawerOpen(true);
      setDrawerLoading(true);
      setSelectedBooking(null);

      const data = await getAdminBookingById(id);
      setSelectedBooking(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Detajet e rezervimit nuk mund të ngarkohen.');
    } finally {
      setDrawerLoading(false);
    }
  };

  const handleDeleteBooking = async (id: number) => {
    const confirmed = window.confirm('A jeni e sigurt që dëshironi ta fshini këtë rezervim?');

    if (!confirmed) return;

    try {
      await deleteAdminBooking(id);
      await loadBookings();

      if (selectedBooking?.id === id) {
        setSelectedBooking(null);
        setDrawerOpen(false);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fshirja e rezervimit dështoi.');
    }
  };

  const handleStatusChange = async (id: number, status: AdminBooking['status']) => {
    try {
      await updateAdminBookingStatus(id, status);
      await loadBookings();

      if (selectedBooking?.id === id) {
        const updated = await getAdminBookingById(id);
        setSelectedBooking(updated);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Përditësimi i statusit dështoi.');
    }
  };

  const handlePaymentChange = async (id: number, paymentStatus: (typeof paymentOptions)[number]) => {
    try {
      await updateAdminPaymentStatus(id, paymentStatus);
      await loadBookings();

      if (selectedBooking?.id === id) {
        const updated = await getAdminBookingById(id);
        setSelectedBooking(updated);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Përditësimi i pagesës dështoi.');
    }
  };

  return (
    <>
      <style>{`
        @keyframes bookingSpin {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes drawerIn {
          from {
            opacity: 0;
            transform: translateX(30px);
          }

          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .bookings-page {
          display: flex;
          flex-direction: column;
          gap: 22px;
        }

        .bookings-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 18px;
          flex-wrap: wrap;
        }

        .bookings-kicker {
          margin: 0 0 8px;
          color: #c8841a;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: .16em;
          text-transform: uppercase;
        }

        .bookings-title {
          margin: 0;
          font-size: clamp(25px, 3vw, 34px);
          font-weight: 950;
          color: #1a120b;
          line-height: 1.1;
        }

        .bookings-subtitle {
          margin: 8px 0 0;
          max-width: 680px;
          color: #7a6a52;
          font-size: 14px;
          line-height: 1.6;
        }

        .bookings-refresh {
          height: 44px;
          padding: 0 20px;
          border: none;
          border-radius: 999px;
          background: linear-gradient(135deg, #d4911e, #b87318);
          color: #fff;
          font-size: 14px;
          font-weight: 850;
          cursor: pointer;
          box-shadow: 0 10px 26px rgba(200, 132, 26, .25);
          transition: transform .2s, box-shadow .2s;
          white-space: nowrap;
        }

        .bookings-refresh:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 32px rgba(200, 132, 26, .34);
        }

        .bookings-stats {
          display: grid;
          grid-template-columns: repeat(5, minmax(140px, 1fr));
          gap: 14px;
        }

        .booking-stat-card {
          background: rgba(255, 255, 255, .9);
          border: 1px solid #eadfce;
          border-radius: 20px;
          padding: 18px;
          box-shadow: 0 8px 26px rgba(26, 18, 11, .06);
        }

        .booking-stat-label {
          margin: 0 0 12px;
          color: #7a6a52;
          font-size: 12px;
          font-weight: 750;
        }

        .booking-stat-value {
          margin: 0;
          color: #1a120b;
          font-size: 25px;
          font-weight: 950;
          line-height: 1;
        }

        .bookings-card {
          background: rgba(255, 255, 255, .92);
          border: 1px solid #eadfce;
          border-radius: 24px;
          box-shadow: 0 10px 34px rgba(26, 18, 11, .07);
          overflow: hidden;
        }

        .bookings-toolbar {
          padding: 18px 20px;
          border-bottom: 1px solid #f0e4d2;
          background: linear-gradient(135deg, #fffdf8, #ffffff);
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
        }

        .booking-search {
          flex: 1;
          min-width: 250px;
          max-width: 420px;
          height: 42px;
          border-radius: 14px;
          border: 1.5px solid #eadfce;
          background: #fffaf2;
          color: #1a120b;
          padding: 0 15px;
          font-size: 14px;
          outline: none;
          transition: border-color .2s, box-shadow .2s, background .2s;
        }

        .booking-search:focus {
          border-color: #c8841a;
          box-shadow: 0 0 0 4px rgba(200, 132, 26, .12);
          background: #fffdf8;
        }

        .booking-filters {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .booking-filter-btn,
        .booking-search-btn {
          height: 39px;
          padding: 0 14px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 850;
          cursor: pointer;
          transition: transform .15s, border-color .15s, background .15s, color .15s;
        }

        .booking-filter-btn {
          border: 1.5px solid #eadfce;
          background: #fff;
          color: #6b5a45;
        }

        .booking-filter-btn:hover {
          transform: translateY(-1px);
          border-color: #c8841a;
        }

        .booking-filter-btn.active {
          background: #c8841a;
          border-color: #c8841a;
          color: #fff;
        }

        .booking-search-btn {
          border: none;
          background: #1a120b;
          color: #fff;
        }

        .booking-search-btn:hover {
          transform: translateY(-1px);
        }

        .bookings-table-wrap {
          overflow-x: auto;
        }

        .bookings-table {
          width: 100%;
          min-width: 980px;
          border-collapse: collapse;
        }

        .bookings-table thead {
          background: #fffaf2;
        }

        .bookings-table th {
          padding: 13px 14px;
          text-align: left;
          color: #8a7558;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: .08em;
          text-transform: uppercase;
          border-bottom: 1px solid #eadfce;
          white-space: nowrap;
        }

        .bookings-table td {
          padding: 15px 14px;
          border-bottom: 1px solid #f3eadc;
          color: #1a120b;
          font-size: 13px;
          vertical-align: middle;
        }

        .bookings-table tbody tr {
          transition: background .15s;
        }

        .bookings-table tbody tr:hover {
          background: #fffaf2;
        }

        .booking-main-text {
          margin: 0;
          color: #1a120b;
          font-weight: 850;
        }

        .booking-muted-text {
          margin: 4px 0 0;
          color: #7a6a52;
          font-size: 12px;
          line-height: 1.4;
        }

        .booking-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 28px;
          padding: 5px 11px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 850;
          white-space: nowrap;
        }

        .booking-badge-pending {
          background: #fff7e6;
          color: #b45309;
        }

        .booking-badge-approved {
          background: #ecfdf5;
          color: #047857;
        }

        .booking-badge-completed {
          background: #eef2ff;
          color: #3730a3;
        }

        .booking-badge-cancelled {
          background: #fef2f2;
          color: #991b1b;
        }

        .booking-payment-unpaid {
          background: #fef2f2;
          color: #991b1b;
        }

        .booking-payment-partially-paid {
          background: #fffbeb;
          color: #92400e;
        }

        .booking-payment-paid {
          background: #ecfdf5;
          color: #047857;
        }

        .booking-payment-refunded {
          background: #eef2ff;
          color: #3730a3;
        }

        .booking-actions {
          display: flex;
          gap: 8px;
          flex-wrap: nowrap;
        }

        .booking-action-btn {
          height: 34px;
          padding: 0 12px;
          border-radius: 10px;
          font-size: 12px;
          font-weight: 850;
          cursor: pointer;
          transition: transform .15s, box-shadow .15s;
        }

        .booking-action-btn:hover {
          transform: translateY(-1px);
        }

        .booking-view-btn {
          border: 1.5px solid #f1d5a3;
          background: #fff7e8;
          color: #9a5d0a;
        }

        .booking-delete-btn {
          border: 1.5px solid #fecaca;
          background: #fef2f2;
          color: #991b1b;
        }

        .booking-select {
          width: 100%;
          max-width: 170px;
          height: 34px;
          border-radius: 10px;
          border: 1.5px solid #eadfce;
          background: #fffdf8;
          color: #1a120b;
          padding: 0 8px;
          font-size: 12px;
          font-weight: 750;
          outline: none;
          cursor: pointer;
        }

        .booking-select:focus {
          border-color: #c8841a;
        }

        .bookings-message {
          padding: 52px 20px;
          text-align: center;
          color: #7a6a52;
          font-size: 14px;
        }

        .booking-spinner {
          width: 34px;
          height: 34px;
          margin: 0 auto 12px;
          border-radius: 50%;
          border: 3px solid #eadfce;
          border-top-color: #c8841a;
          animation: bookingSpin .75s linear infinite;
        }

        .bookings-error {
          padding: 13px 16px;
          border-radius: 16px;
          border: 1px solid #fecaca;
          background: #fef2f2;
          color: #991b1b;
          font-size: 14px;
          font-weight: 750;
        }

        .booking-drawer-overlay {
          position: fixed;
          inset: 0;
          background: rgba(18, 13, 7, .48);
          backdrop-filter: blur(3px);
          z-index: 1500;
          display: flex;
          justify-content: flex-end;
        }

        .booking-drawer {
          width: min(520px, 100%);
          height: 100%;
          background: #fffdf8;
          box-shadow: -24px 0 56px rgba(18, 13, 7, .22);
          animation: drawerIn .22s ease both;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
        }

        .booking-drawer-header {
          position: sticky;
          top: 0;
          z-index: 2;
          background: linear-gradient(135deg, #fffaf2, #ffffff);
          border-bottom: 1px solid #eadfce;
          padding: 22px 24px;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 14px;
        }

        .booking-drawer-title {
          margin: 0;
          color: #1a120b;
          font-size: 22px;
          font-weight: 950;
        }

        .booking-drawer-subtitle {
          margin: 5px 0 0;
          color: #7a6a52;
          font-size: 13px;
        }

        .booking-close-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 1px solid #eadfce;
          background: #fff;
          color: #1a120b;
          font-size: 20px;
          font-weight: 900;
          cursor: pointer;
        }

        .booking-drawer-body {
          padding: 22px 24px 28px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .booking-section {
          background: #ffffff;
          border: 1px solid #eadfce;
          border-radius: 18px;
          padding: 18px;
          box-shadow: 0 6px 18px rgba(26, 18, 11, .04);
        }

        .booking-section-title {
          margin: 0 0 12px;
          color: #c8841a;
          font-size: 12px;
          font-weight: 950;
          letter-spacing: .12em;
          text-transform: uppercase;
        }

        .booking-detail-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
          padding: 10px 0;
          border-bottom: 1px solid #f3eadc;
        }

        .booking-detail-row:last-child {
          border-bottom: none;
        }

        .booking-detail-row span {
          color: #7a6a52;
          font-size: 13px;
          font-weight: 650;
          flex-shrink: 0;
        }

        .booking-detail-row strong {
          color: #1a120b;
          font-size: 13px;
          font-weight: 800;
          text-align: right;
          word-break: break-word;
        }

        .booking-note {
          margin: 0;
          color: #1a120b;
          font-size: 14px;
          line-height: 1.7;
          white-space: pre-wrap;
        }

        @media (max-width: 1200px) {
          .bookings-stats {
            grid-template-columns: repeat(3, minmax(140px, 1fr));
          }
        }

        @media (max-width: 760px) {
          .bookings-page {
            gap: 18px;
          }

          .bookings-refresh {
            width: 100%;
          }

          .bookings-stats {
            grid-template-columns: 1fr 1fr;
          }

          .bookings-toolbar {
            padding: 16px;
          }

          .booking-search {
            min-width: 100%;
            max-width: none;
          }

          .booking-filters {
            width: 100%;
          }

          .booking-filter-btn,
          .booking-search-btn {
            flex: 1;
            min-width: 115px;
          }

          .booking-drawer-header,
          .booking-drawer-body {
            padding-left: 18px;
            padding-right: 18px;
          }
        }

        @media (max-width: 520px) {
          .bookings-stats {
            grid-template-columns: 1fr;
          }

          .bookings-card {
            border-radius: 18px;
          }

          .bookings-table th,
          .bookings-table td {
            padding: 12px;
          }
        }
      `}</style>

      <section className="bookings-page">
        <div className="bookings-header">
          <div>
            <p className="bookings-kicker">Administrimi i rezervimeve</p>
            <h1 className="bookings-title">Rezervimet</h1>
            <p className="bookings-subtitle">
              Menaxho kërkesat e klientëve, kontrollo statusin e eventeve, pagesat dhe detajet kryesore të çdo
              rezervimi.
            </p>
          </div>

          <button type="button" className="bookings-refresh" onClick={loadBookings}>
            Rifresko të dhënat
          </button>
        </div>

        <div className="bookings-stats">
          {stats.map((item) => (
            <div key={item.label} className="booking-stat-card">
              <p className="booking-stat-label">{item.label}</p>
              <p className="booking-stat-value">{item.value}</p>
            </div>
          ))}
        </div>

        {error && <div className="bookings-error">{error}</div>}

        <div className="bookings-card">
          <div className="bookings-toolbar">
            <input
              className="booking-search"
              type="text"
              placeholder="Kërko sipas klientit, emailit, kodit ose paketës..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') loadBookings();
              }}
            />

            <div className="booking-filters">
              {statusOptions.map((status) => (
                <button
                  key={status}
                  type="button"
                  className={`booking-filter-btn${statusFilter === status ? ' active' : ''}`}
                  onClick={() => setStatusFilter(status)}
                >
                  {statusLabels[status]}
                </button>
              ))}

              <button type="button" className="booking-search-btn" onClick={loadBookings}>
                Kërko
              </button>
            </div>
          </div>

          {loading ? (
            <div className="bookings-message">
              <div className="booking-spinner" />
              Duke u ngarkuar rezervimet...
            </div>
          ) : bookings.length === 0 ? (
            <div className="bookings-message">
              <strong style={{ display: 'block', color: '#1a120b', marginBottom: 6 }}>
                Nuk u gjet asnjë rezervim.
              </strong>
              Provo të ndryshosh kërkimin ose filtrin e statusit.
            </div>
          ) : (
            <div className="bookings-table-wrap">
              <table className="bookings-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Klienti</th>
                    <th>Paketa</th>
                    <th>Data</th>
                    <th>Mysafirë</th>
                    <th>Statusi</th>
                    <th>Pagesa</th>
                    <th>Shuma</th>
                    <th>Veprime</th>
                  </tr>
                </thead>

                <tbody>
                  {bookings.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <strong>#{item.id}</strong>
                      </td>

                      <td>
                        <p className="booking-main-text">{item.customer_name || '—'}</p>
                        <p className="booking-muted-text">{item.customer_email || '—'}</p>
                      </td>

                      <td>
                        <p className="booking-main-text">{item.package_title || '—'}</p>
                      </td>

                      <td>{formatDate(item.event_date, item.start_time)}</td>

                      <td>{item.guest_count || '—'}</td>

                      <td>
                        <StatusBadge status={item.status} />
                      </td>

                      <td>
                        <PaymentBadge status={item.payment_status} />
                      </td>

                      <td>
                        <strong>{formatMoney(item.total_price)}</strong>
                      </td>

                      <td>
                        <div className="booking-actions">
                          <button
                            type="button"
                            className="booking-action-btn booking-view-btn"
                            onClick={() => handleViewBooking(item.id)}
                          >
                            Detaje
                          </button>

                          <button
                            type="button"
                            className="booking-action-btn booking-delete-btn"
                            onClick={() => handleDeleteBooking(item.id)}
                          >
                            Fshi
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      {drawerOpen && (
        <div className="booking-drawer-overlay" onClick={() => setDrawerOpen(false)}>
          <aside className="booking-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="booking-drawer-header">
              <div>
                <h2 className="booking-drawer-title">Detajet e rezervimit</h2>
                <p className="booking-drawer-subtitle">
                  {selectedBooking ? `Rezervimi #${selectedBooking.id}` : 'Duke u ngarkuar...'}
                </p>
              </div>

              <button type="button" className="booking-close-btn" onClick={() => setDrawerOpen(false)}>
                ×
              </button>
            </div>

            <div className="booking-drawer-body">
              {drawerLoading ? (
                <div className="bookings-message">
                  <div className="booking-spinner" />
                  Duke u ngarkuar detajet...
                </div>
              ) : selectedBooking ? (
                <>
                  <div className="booking-section">
                    <h3 className="booking-section-title">Klienti</h3>
                    <DetailRow label="Emri" value={selectedBooking.customer_name} />
                    <DetailRow label="Email" value={selectedBooking.customer_email} />
                    <DetailRow label="Telefoni" value={selectedBooking.customer_phone} />
                  </div>

                  <div className="booking-section">
                    <h3 className="booking-section-title">Eventi</h3>
                    <DetailRow label="Titulli" value={selectedBooking.event_title} />
                    <DetailRow label="Lloji" value={selectedBooking.event_type} />
                    <DetailRow label="Paketa" value={selectedBooking.package_title} />
                    <DetailRow label="Data" value={formatDate(selectedBooking.event_date, selectedBooking.start_time)} />
                    <DetailRow label="Ora e përfundimit" value={selectedBooking.end_time?.slice(0, 5)} />
                    <DetailRow label="Numri i mysafirëve" value={selectedBooking.guest_count} />
                  </div>

                  <div className="booking-section">
                    <h3 className="booking-section-title">Lokacioni</h3>
                    <DetailRow label="Vendi" value={selectedBooking.venue_name} />
                    <DetailRow label="Adresa" value={selectedBooking.venue_address} />
                  </div>

                  <div className="booking-section">
                    <h3 className="booking-section-title">Statusi dhe pagesa</h3>

                    <div className="booking-detail-row">
                      <span>Statusi i rezervimit</span>
                      <select
                        className="booking-select"
                        value={selectedBooking.status}
                        onChange={(e) =>
                          handleStatusChange(selectedBooking.id, e.target.value as AdminBooking['status'])
                        }
                      >
                        {statusOptions
                          .filter((status) => status !== 'All')
                          .map((status) => (
                            <option key={status} value={status}>
                              {statusLabels[status]}
                            </option>
                          ))}
                      </select>
                    </div>

                    <div className="booking-detail-row">
                      <span>Statusi i pagesës</span>
                      <select
                        className="booking-select"
                        value={selectedBooking.payment_status}
                        onChange={(e) =>
                          handlePaymentChange(selectedBooking.id, e.target.value as (typeof paymentOptions)[number])
                        }
                      >
                        {paymentOptions.map((payment) => (
                          <option key={payment} value={payment}>
                            {paymentLabels[payment]}
                          </option>
                        ))}
                      </select>
                    </div>

                    <DetailRow label="Shuma totale" value={formatMoney(selectedBooking.total_price)} />
                  </div>

                  <div className="booking-section">
                    <h3 className="booking-section-title">Kërkesa të veçanta</h3>
                    <p className="booking-note">
                      {selectedBooking.special_requests || 'Nuk ka kërkesa të veçanta për këtë rezervim.'}
                    </p>
                  </div>

                  <button
                    type="button"
                    className="booking-action-btn booking-delete-btn"
                    style={{ width: '100%', height: 44 }}
                    onClick={() => handleDeleteBooking(selectedBooking.id)}
                  >
                    Fshi këtë rezervim
                  </button>
                </>
              ) : (
                <div className="bookings-message">Nuk u gjetën detajet e rezervimit.</div>
              )}
            </div>
          </aside>
        </div>
      )}
    </>
  );
}