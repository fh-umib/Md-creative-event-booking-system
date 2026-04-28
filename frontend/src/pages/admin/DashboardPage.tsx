import { useState } from 'react';
import { Link } from 'react-router-dom';

function LineChart() {
  const revenue = [3200, 4100, 5200, 4800, 5600, 7800, 7200, 6400, 5600, 8200, 9100, 9800];
  const bookings = [8, 12, 15, 11, 14, 20, 18, 16, 21, 24, 28, 30];
  const months = ['Jan', 'Shk', 'Mar', 'Pri', 'Maj', 'Qer', 'Kor', 'Gus', 'Sht', 'Tet', 'Nën', 'Dhj'];

  const width = 620;
  const height = 220;
  const padding = { top: 20, right: 20, bottom: 40, left: 54 };
  const graphWidth = width - padding.left - padding.right;
  const graphHeight = height - padding.top - padding.bottom;
  const maxRevenue = Math.max(...revenue, 10000);

  const toX = (index: number) => padding.left + (index / (revenue.length - 1)) * graphWidth;
  const toY = (value: number) => padding.top + graphHeight - (value / maxRevenue) * graphHeight;

  const revenuePath = revenue
    .map((value, index) => `${index === 0 ? 'M' : 'L'}${toX(index)},${toY(value)}`)
    .join(' ');

  const fillPath = `${revenuePath} L${toX(revenue.length - 1)},${padding.top + graphHeight} L${padding.left},${
    padding.top + graphHeight
  } Z`;

  const [hover, setHover] = useState<number | null>(null);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="dash-line-chart">
      <defs>
        <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d4911e" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#d4911e" stopOpacity="0.02" />
        </linearGradient>
      </defs>

      {[0, 2500, 5000, 7500, 10000].map((value) => (
        <g key={value}>
          <line
            x1={padding.left}
            x2={padding.left + graphWidth}
            y1={toY(value)}
            y2={toY(value)}
            stroke="#efe2cf"
            strokeWidth="1"
          />
          <text x={padding.left - 10} y={toY(value) + 4} textAnchor="end" fontSize="10" fill="#9a8878">
            €{value >= 1000 ? `${value / 1000}k` : value}
          </text>
        </g>
      ))}

      <path d={fillPath} fill="url(#revenueGradient)" />
      <path d={revenuePath} fill="none" stroke="#c8841a" strokeWidth="3" strokeLinejoin="round" />

      {months.map((month, index) => (
        <text key={month} x={toX(index)} y={height - 10} textAnchor="middle" fontSize="10" fill="#9a8878">
          {month}
        </text>
      ))}

      {revenue.map((value, index) => (
        <circle
          key={index}
          cx={toX(index)}
          cy={toY(value)}
          r={hover === index ? 6 : 4}
          fill={hover === index ? '#c8841a' : '#ffffff'}
          stroke="#c8841a"
          strokeWidth="2"
          className="dash-chart-dot"
          onMouseEnter={() => setHover(index)}
          onMouseLeave={() => setHover(null)}
        />
      ))}

      {hover !== null && (
        <g>
          <rect
            x={toX(hover) + (hover > 8 ? -130 : 12)}
            y={toY(revenue[hover]) - 34}
            width="118"
            height="58"
            rx="10"
            fill="#ffffff"
            stroke="#eadfce"
            strokeWidth="1"
          />

          <text
            x={toX(hover) + (hover > 8 ? -71 : 71)}
            y={toY(revenue[hover]) - 15}
            textAnchor="middle"
            fontSize="11"
            fontWeight="800"
            fill="#1a120b"
          >
            {months[hover]}
          </text>

          <text
            x={toX(hover) + (hover > 8 ? -71 : 71)}
            y={toY(revenue[hover]) + 2}
            textAnchor="middle"
            fontSize="10"
            fontWeight="700"
            fill="#9a5d0a"
          >
            €{revenue[hover].toLocaleString('de-DE')}
          </text>

          <text
            x={toX(hover) + (hover > 8 ? -71 : 71)}
            y={toY(revenue[hover]) + 17}
            textAnchor="middle"
            fontSize="10"
            fill="#7a6a52"
          >
            {bookings[hover]} rezervime
          </text>
        </g>
      )}
    </svg>
  );
}

function DonutChart() {
  const data = [
    { label: 'Full Celebration', count: 34, color: '#c8841a' },
    { label: 'Premium Party', count: 28, color: '#a66b13' },
    { label: 'Mascot Show', count: 22, color: '#8b5a12' },
    { label: 'Basic Party', count: 15, color: '#d9a441' },
    { label: 'Decoration Only', count: 12, color: '#e6c275' },
  ];

  const total = data.reduce((sum, item) => sum + item.count, 0);
  let angle = -Math.PI / 2;

  const centerX = 80;
  const centerY = 80;
  const radius = 65;
  const innerRadius = 40;

  const slices = data.map((item) => {
    const sweep = (item.count / total) * 2 * Math.PI;

    const x1 = centerX + radius * Math.cos(angle);
    const y1 = centerY + radius * Math.sin(angle);

    angle += sweep;

    const x2 = centerX + radius * Math.cos(angle);
    const y2 = centerY + radius * Math.sin(angle);

    const innerX1 = centerX + innerRadius * Math.cos(angle - sweep);
    const innerY1 = centerY + innerRadius * Math.sin(angle - sweep);
    const innerX2 = centerX + innerRadius * Math.cos(angle);
    const innerY2 = centerY + innerRadius * Math.sin(angle);

    const largeArc = sweep > Math.PI ? 1 : 0;

    return {
      ...item,
      path: `M${x1},${y1} A${radius},${radius} 0 ${largeArc} 1 ${x2},${y2} L${innerX2},${innerY2} A${innerRadius},${innerRadius} 0 ${largeArc} 0 ${innerX1},${innerY1} Z`,
    };
  });

  return (
    <div className="dash-donut-wrap">
      <svg viewBox="0 0 160 160" className="dash-donut">
        {slices.map((slice) => (
          <path key={slice.label} d={slice.path} fill={slice.color} stroke="#ffffff" strokeWidth="2" />
        ))}

        <circle cx="80" cy="80" r="31" fill="#fffdf8" />
        <text x="80" y="77" textAnchor="middle" fontSize="18" fontWeight="950" fill="#1a120b">
          {total}
        </text>
        <text x="80" y="94" textAnchor="middle" fontSize="9" fontWeight="800" fill="#8a7558">
          total
        </text>
      </svg>

      <div className="dash-donut-list">
        {data.map((item) => (
          <div key={item.label} className="dash-donut-item">
            <span className="dash-donut-left">
              <span className="dash-donut-dot" style={{ background: item.color }} />
              {item.label}
            </span>
            <strong>{item.count}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

function BarChart() {
  const days = ['Hën', 'Mar', 'Mër', 'Enj', 'Pre', 'Sht', 'Die'];
  const values = [3, 6, 4, 7, 12, 18, 14];
  const max = Math.max(...values);

  return (
    <div className="dash-week-bars">
      {days.map((day, index) => (
        <div key={day} className="dash-week-bar-item">
          <div className="dash-week-bar-track">
            <div className="dash-week-bar-fill" style={{ height: `${Math.max(10, (values[index] / max) * 100)}%` }} />
          </div>
          <span>{day}</span>
        </div>
      ))}
    </div>
  );
}

export default function DashboardPage() {
  const stats = [
    {
      label: 'Rezervime totale',
      value: '156',
      change: '+12% nga muaji i kaluar',
      note: 'Kërkesa dhe evente',
    },
    {
      label: 'Të ardhura',
      value: '€44.250',
      change: '+8.2% nga muaji i kaluar',
      note: 'Pagesa të regjistruara',
    },
    {
      label: 'Paketa aktive',
      value: '12',
      change: '2 paketa të reja',
      note: 'Oferta për klientë',
    },
    {
      label: 'Klientë',
      value: '89',
      change: '+15 klientë të rinj',
      note: 'Kontakte të ruajtura',
    },
  ];

  const upcomingEvents = [
    { name: 'Ditëlindje Princess', client: 'Sara K.', guests: 25, mascots: 2, date: '12 Pri', time: '14:00' },
    { name: 'Superhero Bash', client: 'Arben G.', guests: 35, mascots: 3, date: '14 Pri', time: '11:00' },
    { name: 'Unicorn Magic', client: 'Lena M.', guests: 15, mascots: 1, date: '16 Pri', time: '15:00' },
  ];

  const recentBookings = [
    { id: 'MD-1024', customer: 'Sara K.', package: 'Premium Party', date: '12 Pri 2026', status: 'Approved', amount: '€450' },
    { id: 'MD-1023', customer: 'Lena M.', package: 'Mascot Show', date: '10 Pri 2026', status: 'Pending', amount: '€280' },
    { id: 'MD-1022', customer: 'Arta B.', package: 'Full Celebration', date: '08 Pri 2026', status: 'Approved', amount: '€680' },
    { id: 'MD-1021', customer: 'Dren H.', package: 'Basic Party', date: '05 Pri 2026', status: 'Cancelled', amount: '€150' },
    { id: 'MD-1020', customer: 'Maja R.', package: 'Decoration Only', date: '03 Pri 2026', status: 'Completed', amount: '€220' },
  ];

  const popularPackages = [
    { rank: 1, name: 'Full Celebration', bookings: 34, revenue: '€23.120', pct: 100 },
    { rank: 2, name: 'Premium Party', bookings: 28, revenue: '€12.600', pct: 82 },
    { rank: 3, name: 'Mascot Show', bookings: 22, revenue: '€6.160', pct: 65 },
    { rank: 4, name: 'Basic Party', bookings: 15, revenue: '€2.250', pct: 44 },
  ];

  const quickActions = [
    { label: 'Shiko rezervimet', path: '/admin/bookings' },
    { label: 'Menaxho paketat', path: '/admin/packages' },
    { label: 'Menaxho maskotat', path: '/admin/mascots' },
    { label: 'Shiko analitikën', path: '/admin/analytics' },
  ];

  const statusLabel: Record<string, string> = {
    Approved: 'E aprovuar',
    Pending: 'Në pritje',
    Cancelled: 'E anuluar',
    Completed: 'E përfunduar',
  };

  return (
    <>
      <style>{`
        .dash-page {
          display: flex;
          flex-direction: column;
          gap: 18px;
          min-width: 0;
        }

        .dash-hero {
          position: relative;
          overflow: hidden;
          border-radius: 26px;
          border: 1px solid #eadfce;
          background:
            radial-gradient(circle at 12% 20%, rgba(212,145,30,.26), transparent 32%),
            linear-gradient(135deg, #1a120b 0%, #2b1a0d 58%, #120d07 100%);
          padding: 28px;
          color: #ffffff;
          box-shadow: 0 14px 38px rgba(26,18,11,.16);
        }

        .dash-hero::after {
          content: "MD";
          position: absolute;
          right: 28px;
          bottom: -36px;
          font-size: clamp(120px, 17vw, 220px);
          line-height: 1;
          font-weight: 950;
          color: rgba(212,145,30,.08);
          pointer-events: none;
        }

        .dash-hero-content {
          position: relative;
          z-index: 1;
          display: flex;
          justify-content: space-between;
          gap: 24px;
          align-items: flex-start;
          flex-wrap: wrap;
        }

        .dash-kicker {
          margin: 0 0 9px;
          color: #d4911e;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: .18em;
          text-transform: uppercase;
        }

        .dash-title {
          margin: 0;
          font-size: clamp(28px, 3.6vw, 46px);
          line-height: 1.04;
          font-weight: 950;
        }

        .dash-title span {
          color: #d4911e;
          font-style: italic;
        }

        .dash-subtitle {
          margin: 12px 0 0;
          max-width: 760px;
          color: rgba(255,255,255,.68);
          font-size: 14px;
          line-height: 1.75;
        }

        .dash-hero-card {
          min-width: 250px;
          border-radius: 22px;
          border: 1px solid rgba(212,145,30,.28);
          background: rgba(255,255,255,.07);
          padding: 16px;
          backdrop-filter: blur(12px);
        }

        .dash-hero-card strong {
          display: block;
          color: #ffffff;
          font-size: 30px;
          font-weight: 950;
          line-height: 1;
          margin-bottom: 7px;
        }

        .dash-hero-card span {
          color: rgba(255,255,255,.62);
          font-size: 13px;
          line-height: 1.45;
        }

        .dash-stats {
          display: grid;
          grid-template-columns: repeat(4, minmax(160px, 1fr));
          gap: 14px;
        }

        .dash-stat-card {
          background: rgba(255,255,255,.94);
          border: 1px solid #eadfce;
          border-radius: 20px;
          padding: 18px;
          box-shadow: 0 8px 24px rgba(26,18,11,.06);
          overflow: hidden;
          position: relative;
        }

        .dash-stat-card::after {
          content: "";
          position: absolute;
          right: -24px;
          top: -24px;
          width: 78px;
          height: 78px;
          border-radius: 50%;
          background: rgba(212,145,30,.08);
        }

        .dash-stat-label {
          margin: 0;
          color: #7a6a52;
          font-size: 12px;
          font-weight: 800;
        }

        .dash-stat-value {
          margin: 12px 0 7px;
          color: #1a120b;
          font-size: 28px;
          font-weight: 950;
          line-height: 1;
        }

        .dash-stat-change {
          margin: 0;
          color: #047857;
          font-size: 12px;
          font-weight: 850;
        }

        .dash-stat-note {
          margin: 7px 0 0;
          color: #9a8878;
          font-size: 11px;
          font-weight: 700;
        }

        .dash-grid-two {
          display: grid;
          grid-template-columns: minmax(0, 1.35fr) minmax(320px, .8fr);
          gap: 16px;
        }

        .dash-grid-equal {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
        }

        .dash-panel {
          background: rgba(255,255,255,.94);
          border: 1px solid #eadfce;
          border-radius: 22px;
          padding: 20px;
          box-shadow: 0 8px 24px rgba(26,18,11,.06);
          min-width: 0;
        }

        .dash-panel-head {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 16px;
          flex-wrap: wrap;
        }

        .dash-panel-title {
          margin: 0;
          color: #1a120b;
          font-size: 18px;
          font-weight: 950;
        }

        .dash-panel-text {
          margin: 5px 0 0;
          color: #7a6a52;
          font-size: 12.5px;
          line-height: 1.5;
        }

        .dash-panel-link {
          color: #9a5d0a;
          text-decoration: none;
          font-size: 12px;
          font-weight: 900;
          white-space: nowrap;
        }

        .dash-line-chart {
          width: 100%;
          height: auto;
          display: block;
        }

        .dash-chart-dot {
          cursor: pointer;
          transition: r .2s ease;
        }

        .dash-donut-wrap {
          display: flex;
          align-items: center;
          gap: 22px;
        }

        .dash-donut {
          width: 160px;
          flex-shrink: 0;
        }

        .dash-donut-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          flex: 1;
          min-width: 0;
        }

        .dash-donut-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          color: #6b5a45;
          font-size: 12px;
          font-weight: 800;
        }

        .dash-donut-left {
          display: flex;
          align-items: center;
          gap: 8px;
          min-width: 0;
        }

        .dash-donut-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .dash-week-bars {
          height: 165px;
          display: flex;
          align-items: end;
          gap: 10px;
          padding: 8px 4px 0;
        }

        .dash-week-bar-item {
          flex: 1;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: end;
          align-items: center;
          gap: 8px;
          min-width: 0;
        }

        .dash-week-bar-track {
          width: 100%;
          height: 130px;
          display: flex;
          align-items: end;
          border-radius: 999px;
          background: #fff7e8;
          overflow: hidden;
          border: 1px solid #f1dfc5;
        }

        .dash-week-bar-fill {
          width: 100%;
          border-radius: 999px 999px 0 0;
          background: linear-gradient(180deg, #d4911e, #b87318);
        }

        .dash-week-bar-item span {
          color: #8a7558;
          font-size: 11px;
          font-weight: 850;
        }

        .dash-event-list {
          display: flex;
          flex-direction: column;
          gap: 11px;
        }

        .dash-event-card {
          display: grid;
          grid-template-columns: 42px minmax(0, 1fr) auto;
          gap: 12px;
          align-items: center;
          padding: 12px;
          border-radius: 16px;
          background: #fffaf2;
          border: 1px solid #f3eadc;
        }

        .dash-event-date {
          width: 42px;
          height: 42px;
          border-radius: 14px;
          background: linear-gradient(135deg, #d4911e, #b87318);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 950;
          text-align: center;
          line-height: 1.1;
        }

        .dash-event-name {
          margin: 0;
          color: #1a120b;
          font-size: 13px;
          font-weight: 950;
        }

        .dash-event-meta {
          margin: 3px 0 0;
          color: #8a7558;
          font-size: 11px;
          font-weight: 750;
        }

        .dash-event-time {
          color: #1a120b;
          font-size: 12px;
          font-weight: 950;
          white-space: nowrap;
        }

        .dash-table-wrap {
          overflow-x: auto;
        }

        .dash-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 660px;
        }

        .dash-table th {
          text-align: left;
          color: #8a7558;
          font-size: 10px;
          font-weight: 950;
          letter-spacing: .08em;
          text-transform: uppercase;
          padding: 0 10px 11px;
          border-bottom: 1px solid #f0e4d2;
        }

        .dash-table td {
          padding: 12px 10px;
          border-bottom: 1px solid #f7efe3;
          color: #6b5a45;
          font-size: 12px;
          font-weight: 750;
        }

        .dash-table td strong {
          color: #1a120b;
          font-weight: 950;
        }

        .dash-status {
          display: inline-flex;
          align-items: center;
          padding: 6px 10px;
          border-radius: 999px;
          font-size: 10px;
          font-weight: 950;
          white-space: nowrap;
        }

        .dash-status-approved {
          background: #ecfdf5;
          color: #047857;
        }

        .dash-status-pending {
          background: #fff7e8;
          color: #9a5d0a;
        }

        .dash-status-cancelled {
          background: #fef2f2;
          color: #991b1b;
        }

        .dash-status-completed {
          background: #eef2ff;
          color: #3730a3;
        }

        .dash-package-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .dash-package-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          margin-bottom: 8px;
        }

        .dash-package-left {
          display: flex;
          align-items: center;
          gap: 9px;
          min-width: 0;
        }

        .dash-package-rank {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #fff7e8;
          border: 1px solid #f1d5a3;
          color: #9a5d0a;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 950;
          flex-shrink: 0;
        }

        .dash-package-name {
          color: #1a120b;
          font-size: 13px;
          font-weight: 950;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .dash-package-bookings {
          color: #8a7558;
          font-size: 11px;
          font-weight: 800;
          white-space: nowrap;
        }

        .dash-package-track {
          height: 8px;
          background: #f1dfc5;
          border-radius: 999px;
          overflow: hidden;
        }

        .dash-package-fill {
          height: 100%;
          background: linear-gradient(135deg, #d4911e, #b87318);
          border-radius: 999px;
        }

        .dash-package-revenue {
          margin: 6px 0 0;
          color: #9a5d0a;
          font-size: 12px;
          font-weight: 950;
        }

        .dash-actions {
          display: grid;
          grid-template-columns: repeat(4, minmax(160px, 1fr));
          gap: 14px;
        }

        .dash-action-card {
          text-decoration: none;
          background: rgba(255,255,255,.94);
          border: 1px solid #eadfce;
          border-radius: 18px;
          padding: 17px;
          box-shadow: 0 7px 22px rgba(26,18,11,.05);
          color: #1a120b;
          font-size: 14px;
          font-weight: 950;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          transition: transform .2s ease, box-shadow .2s ease;
        }

        .dash-action-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 14px 30px rgba(26,18,11,.1);
        }

        .dash-action-arrow {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: #fff7e8;
          color: #9a5d0a;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        @media (max-width: 1180px) {
          .dash-stats,
          .dash-actions {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .dash-grid-two,
          .dash-grid-equal {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 720px) {
          .dash-hero {
            padding: 22px;
            border-radius: 22px;
          }

          .dash-stats,
          .dash-actions {
            grid-template-columns: 1fr;
          }

          .dash-panel {
            padding: 16px;
          }

          .dash-donut-wrap {
            flex-direction: column;
            align-items: flex-start;
          }

          .dash-event-card {
            grid-template-columns: 42px minmax(0, 1fr);
          }

          .dash-event-time {
            grid-column: 2;
          }
        }
      `}</style>

      <section className="dash-page">
        <div className="dash-hero">
          <div className="dash-hero-content">
            <div>
              <p className="dash-kicker">Paneli kryesor</p>
              <h1 className="dash-title">
                Mirë se erdhe në <span>MD Creative Admin</span>
              </h1>
              <p className="dash-subtitle">
                Këtu e sheh gjendjen kryesore të biznesit: rezervimet, të ardhurat, paketat aktive,
                eventet e ardhshme dhe shërbimet që po kërkohen më së shumti nga klientët.
              </p>
            </div>

            <div className="dash-hero-card">
              <strong>3 evente</strong>
              <span>të planifikuara së shpejti dhe 5 kërkesa që presin kontrollim nga admini.</span>
            </div>
          </div>
        </div>

        <div className="dash-stats">
          {stats.map((item) => (
            <div key={item.label} className="dash-stat-card">
              <p className="dash-stat-label">{item.label}</p>
              <p className="dash-stat-value">{item.value}</p>
              <p className="dash-stat-change">↑ {item.change}</p>
              <p className="dash-stat-note">{item.note}</p>
            </div>
          ))}
        </div>

        <div className="dash-grid-two">
          <div className="dash-panel">
            <div className="dash-panel-head">
              <div>
                <h2 className="dash-panel-title">Të ardhurat gjatë vitit</h2>
                <p className="dash-panel-text">Trendi mujor i të ardhurave dhe rezervimeve.</p>
              </div>
            </div>

            <LineChart />
          </div>

          <div className="dash-panel">
            <div className="dash-panel-head">
              <div>
                <h2 className="dash-panel-title">Kategoritë e rezervimeve</h2>
                <p className="dash-panel-text">Shpërndarja sipas paketave më të zgjedhura.</p>
              </div>
            </div>

            <DonutChart />
          </div>
        </div>

        <div className="dash-grid-equal">
          <div className="dash-panel">
            <div className="dash-panel-head">
              <div>
                <h2 className="dash-panel-title">Rezervimet javore</h2>
                <p className="dash-panel-text">Aktiviteti i rezervimeve gjatë javës.</p>
              </div>
            </div>

            <BarChart />
          </div>

          <div className="dash-panel">
            <div className="dash-panel-head">
              <div>
                <h2 className="dash-panel-title">Eventet e radhës</h2>
                <p className="dash-panel-text">Festat që janë planifikuar për ditët në vijim.</p>
              </div>

              <Link to="/admin/bookings" className="dash-panel-link">
                Shiko të gjitha →
              </Link>
            </div>

            <div className="dash-event-list">
              {upcomingEvents.map((event) => (
                <div key={`${event.name}-${event.date}`} className="dash-event-card">
                  <div className="dash-event-date">{event.date}</div>

                  <div>
                    <p className="dash-event-name">{event.name}</p>
                    <p className="dash-event-meta">
                      {event.client} · {event.guests} mysafirë · {event.mascots} maskota
                    </p>
                  </div>

                  <div className="dash-event-time">{event.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="dash-grid-two">
          <div className="dash-panel">
            <div className="dash-panel-head">
              <div>
                <h2 className="dash-panel-title">Rezervimet e fundit</h2>
                <p className="dash-panel-text">Kërkesat më të reja që janë regjistruar në sistem.</p>
              </div>

              <Link to="/admin/bookings" className="dash-panel-link">
                Menaxho →
              </Link>
            </div>

            <div className="dash-table-wrap">
              <table className="dash-table">
                <thead>
                  <tr>
                    <th>Kodi</th>
                    <th>Klienti</th>
                    <th>Paketa</th>
                    <th>Data</th>
                    <th>Statusi</th>
                    <th>Shuma</th>
                  </tr>
                </thead>

                <tbody>
                  {recentBookings.map((booking) => (
                    <tr key={booking.id}>
                      <td>
                        <strong>{booking.id}</strong>
                      </td>
                      <td>{booking.customer}</td>
                      <td>{booking.package}</td>
                      <td>{booking.date}</td>
                      <td>
                        <span className={`dash-status dash-status-${booking.status.toLowerCase()}`}>
                          {statusLabel[booking.status]}
                        </span>
                      </td>
                      <td>
                        <strong>{booking.amount}</strong>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="dash-panel">
            <div className="dash-panel-head">
              <div>
                <h2 className="dash-panel-title">Paketat më të kërkuara</h2>
                <p className="dash-panel-text">Shërbimet që performojnë më së miri.</p>
              </div>
            </div>

            <div className="dash-package-list">
              {popularPackages.map((item) => (
                <div key={item.name}>
                  <div className="dash-package-top">
                    <div className="dash-package-left">
                      <span className="dash-package-rank">{item.rank}</span>
                      <span className="dash-package-name">{item.name}</span>
                    </div>

                    <span className="dash-package-bookings">{item.bookings} rezervime</span>
                  </div>

                  <div className="dash-package-track">
                    <div className="dash-package-fill" style={{ width: `${item.pct}%` }} />
                  </div>

                  <p className="dash-package-revenue">{item.revenue}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="dash-actions">
          {quickActions.map((action) => (
            <Link key={action.label} to={action.path} className="dash-action-card">
              <span>{action.label}</span>
              <span className="dash-action-arrow">↗</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}