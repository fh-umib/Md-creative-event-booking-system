import React, { useState } from 'react';

// ── tiny inline Chart components (no external deps) ──────────────────────────

function LineChart() {
  const revenue = [3200, 4100, 5200, 4800, 5600, 7800, 7200, 6400, 5600, 8200, 9100, 9800];
  const bookings = [8, 12, 15, 11, 14, 20, 18, 16, 21, 24, 28, 30];
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const W = 620, H = 220, pad = { t: 20, r: 20, b: 40, l: 50 };
  const gW = W - pad.l - pad.r, gH = H - pad.t - pad.b;
  const maxRev = Math.max(...revenue);
  const toX = (i: number) => pad.l + (i / (revenue.length - 1)) * gW;
  const toY = (v: number, max: number) => pad.t + gH - (v / max) * gH;
  const revPath = revenue.map((v, i) => `${i === 0 ? 'M' : 'L'}${toX(i)},${toY(v, maxRev)}`).join(' ');
  const revFill = `${revPath} L${toX(revenue.length-1)},${pad.t+gH} L${pad.l},${pad.t+gH} Z`;
  const [hover, setHover] = useState<number|null>(null);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto' }}>
      <defs>
        <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f97316" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#f97316" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      {[0, 2500, 5000, 7500, 10000].map(v => (
        <g key={v}>
          <line x1={pad.l} x2={pad.l+gW} y1={toY(v, maxRev)} y2={toY(v, maxRev)} stroke="#f1f5f9" strokeWidth="1" />
          <text x={pad.l - 8} y={toY(v, maxRev) + 4} textAnchor="end" fontSize="10" fill="#94a3b8">
            €{v >= 1000 ? v/1000+'k' : v}
          </text>
        </g>
      ))}
      <path d={revFill} fill="url(#revGrad)" />
      <path d={revPath} fill="none" stroke="#f97316" strokeWidth="2.5" strokeLinejoin="round" />
      {months.map((m, i) => (
        <text key={m} x={toX(i)} y={H - 8} textAnchor="middle" fontSize="10" fill="#94a3b8">{m}</text>
      ))}
      {revenue.map((v, i) => (
        <circle
          key={i}
          cx={toX(i)} cy={toY(v, maxRev)} r="4"
          fill={hover === i ? '#f97316' : 'transparent'}
          stroke={hover === i ? '#f97316' : 'transparent'}
          strokeWidth="2"
          style={{ cursor: 'pointer' }}
          onMouseEnter={() => setHover(i)}
          onMouseLeave={() => setHover(null)}
        />
      ))}
      {hover !== null && (
        <g>
          <rect
            x={toX(hover) + (hover > 8 ? -120 : 10)}
            y={toY(revenue[hover], maxRev) - 30}
            width="110" height="52" rx="8"
            fill="white" stroke="#e2e8f0" strokeWidth="1"
            style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.08))' }}
          />
          <text x={toX(hover) + (hover > 8 ? -65 : 65)} y={toY(revenue[hover], maxRev) - 12} textAnchor="middle" fontSize="11" fontWeight="600" fill="#0f172a">{months[hover]}</text>
          <text x={toX(hover) + (hover > 8 ? -65 : 65)} y={toY(revenue[hover], maxRev) + 4} textAnchor="middle" fontSize="10" fill="#f97316">revenue: €{revenue[hover].toLocaleString()}</text>
          <text x={toX(hover) + (hover > 8 ? -65 : 65)} y={toY(revenue[hover], maxRev) + 18} textAnchor="middle" fontSize="10" fill="#f43f5e">bookings: {bookings[hover]}</text>
        </g>
      )}
    </svg>
  );
}

function DonutChart() {
  const data = [
    { label: 'Full Celebration', count: 34, color: '#f97316' },
    { label: 'Premium Party', count: 28, color: '#f43f5e' },
    { label: 'Mascot Show', count: 22, color: '#a855f7' },
    { label: 'Basic Party', count: 15, color: '#3b82f6' },
    { label: 'Decoration Only', count: 12, color: '#22c55e' },
  ];
  const total = data.reduce((s, d) => s + d.count, 0);
  let angle = -Math.PI / 2;
  const cx = 80, cy = 80, r = 65, inner = 40;

  const slices = data.map(d => {
    const sweep = (d.count / total) * 2 * Math.PI;
    const x1 = cx + r * Math.cos(angle), y1 = cy + r * Math.sin(angle);
    angle += sweep;
    const x2 = cx + r * Math.cos(angle), y2 = cy + r * Math.sin(angle);
    const ix1 = cx + inner * Math.cos(angle - sweep), iy1 = cy + inner * Math.sin(angle - sweep);
    const ix2 = cx + inner * Math.cos(angle), iy2 = cy + inner * Math.sin(angle);
    const large = sweep > Math.PI ? 1 : 0;
    return { ...d, path: `M${x1},${y1} A${r},${r} 0 ${large} 1 ${x2},${y2} L${ix2},${iy2} A${inner},${inner} 0 ${large} 0 ${ix1},${iy1} Z` };
  });

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
      <svg viewBox="0 0 160 160" style={{ width: '160px', flexShrink: 0 }}>
        {slices.map((s, i) => (
          <path key={i} d={s.path} fill={s.color} stroke="white" strokeWidth="2" />
        ))}
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
        {data.map((d, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: d.color, flexShrink: 0 }} />
              <span style={{ fontSize: '13px', color: '#475569' }}>{d.label}</span>
            </div>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a' }}>{d.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function BarChart() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const values = [3, 6, 4, 7, 12, 18, 14];
  const max = Math.max(...values);
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '10px', height: '160px', padding: '0 8px' }}>
      {days.map((d, i) => (
        <div key={d} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', height: '100%', justifyContent: 'flex-end' }}>
          <div style={{ width: '100%', background: 'linear-gradient(180deg, #fb923c, #f97316)', borderRadius: '6px 6px 0 0', height: `${(values[i] / max) * 130}px`, transition: 'height 0.3s' }} />
          <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 500 }}>{d}</span>
        </div>
      ))}
    </div>
  );
}

// ── main dashboard ────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const stats = [
    { label: 'Total Bookings', value: '156', change: '+12% from last month', icon: '📅', positive: true },
    { label: 'Revenue', value: '€44,250', change: '+8.2% from last month', icon: '💰', positive: true },
    { label: 'Active Packages', value: '12', change: '2 new this month', icon: '📦', positive: true },
    { label: 'Customers', value: '89', change: '+15 new customers', icon: '👥', positive: true },
  ];

  const upcomingEvents = [
    { name: 'Princess Birthday Party', client: 'Sara K.', guests: 25, mascots: 2, date: 'Apr 12', time: '14:00' },
    { name: 'Superhero Bash', client: 'Arben G.', guests: 35, mascots: 3, date: 'Apr 14', time: '11:00' },
    { name: 'Unicorn Magic', client: 'Lena M.', guests: 15, mascots: 1, date: 'Apr 16', time: '15:00' },
  ];

  const recentBookings = [
    { id: '#MD-1024', customer: 'Sara K.', package: 'Premium Party', date: 'Apr 12, 2026', status: 'Confirmed', amount: '€450' },
    { id: '#MD-1023', customer: 'Lena M.', package: 'Mascot Show', date: 'Apr 10, 2026', status: 'Pending', amount: '€280' },
    { id: '#MD-1022', customer: 'Arta B.', package: 'Full Celebration', date: 'Apr 8, 2026', status: 'Confirmed', amount: '€680' },
    { id: '#MD-1021', customer: 'Dren H.', package: 'Basic Party', date: 'Apr 5, 2026', status: 'Cancelled', amount: '€150' },
    { id: '#MD-1020', customer: 'Maja R.', package: 'Decoration Only', date: 'Apr 3, 2026', status: 'Completed', amount: '€220' },
  ];

  const popularPackages = [
    { rank: 1, name: 'Full Celebration', bookings: 34, revenue: '€23,120', pct: 100, color: '#f97316' },
    { rank: 2, name: 'Premium Party', bookings: 28, revenue: '€12,600', pct: 82, color: '#f97316' },
    { rank: 3, name: 'Mascot Show', bookings: 22, revenue: '€6,160', pct: 65, color: '#f43f5e' },
    { rank: 4, name: 'Basic Party', bookings: 15, revenue: '€2,250', pct: 44, color: '#f43f5e' },
  ];

  const statusStyle = (s: string): React.CSSProperties => {
    const map: Record<string, { bg: string; color: string }> = {
      Confirmed: { bg: '#fff7ed', color: '#f97316' },
      Pending: { bg: '#fdf2f8', color: '#f43f5e' },
      Cancelled: { bg: '#fee2e2', color: '#ef4444' },
      Completed: { bg: '#f0fdf4', color: '#22c55e' },
    };
    const c = map[s] || { bg: '#f8fafc', color: '#64748b' };
    return { display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '3px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, background: c.bg, color: c.color };
  };

  const quickActions = [
    { label: 'New Booking', icon: '📅', bg: 'linear-gradient(135deg,#fb923c,#f97316)' },
    { label: 'Add Package', icon: '📦', bg: 'linear-gradient(135deg,#60a5fa,#3b82f6)' },
    { label: 'Add Mascot', icon: '🎭', bg: 'linear-gradient(135deg,#4ade80,#22c55e)' },
    { label: 'View Reports', icon: '📊', bg: 'linear-gradient(135deg,#f472b6,#ec4899)' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

      {/* ── Welcome Banner ── */}
      <div style={{
        borderRadius: '16px',
        background: 'linear-gradient(135deg, #fb923c 0%, #f97316 30%, #f43f5e 70%, #e11d48 100%)',
        padding: '32px 36px',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
        <div style={{ position: 'absolute', bottom: '-60px', right: '80px', width: '150px', height: '150px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
        <p style={{ margin: '0 0 6px', fontSize: '14px', opacity: 0.9, display: 'flex', alignItems: 'center', gap: '6px' }}>
          ✨ Welcome back, Admin
        </p>
        <h1 style={{ margin: '0 0 12px', fontSize: '28px', fontWeight: 800, letterSpacing: '-0.5px' }}>MD Creative Dashboard</h1>
        <p style={{ margin: 0, fontSize: '14px', opacity: 0.9, lineHeight: 1.6 }}>
          Here's what's happening with your event business today. You have{' '}
          <strong>3 upcoming events</strong> and <strong>5 pending bookings</strong>.
        </p>
      </div>

      {/* ── Stat Cards ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        {stats.map((s, i) => (
          <div key={i} style={{ background: 'white', borderRadius: '14px', padding: '20px', border: '1px solid #f1f5f9', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <p style={{ margin: 0, fontSize: '13px', color: '#64748b', fontWeight: 500 }}>{s.label}</p>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'linear-gradient(135deg,#fb923c,#f97316)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
                {s.icon}
              </div>
            </div>
            <p style={{ margin: '10px 0 6px', fontSize: '26px', fontWeight: 800, color: '#0f172a' }}>{s.value}</p>
            <p style={{ margin: 0, fontSize: '12px', color: '#22c55e', fontWeight: 500 }}>↑ {s.change}</p>
          </div>
        ))}
      </div>

      {/* ── Charts Row ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '16px' }}>
        {/* Revenue Overview */}
        <div style={{ background: 'white', borderRadius: '14px', padding: '24px', border: '1px solid #f1f5f9', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Revenue Overview</h3>
              <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#94a3b8' }}>Monthly revenue & bookings trend</p>
            </div>
            <div style={{ display: 'flex', gap: '14px', fontSize: '12px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#64748b' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f97316', display: 'inline-block' }} /> Revenue
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#64748b' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f43f5e', display: 'inline-block' }} /> Bookings
              </span>
            </div>
          </div>
          <LineChart />
        </div>

        {/* Booking Categories */}
        <div style={{ background: 'white', borderRadius: '14px', padding: '24px', border: '1px solid #f1f5f9', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <h3 style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Booking Categories</h3>
          <p style={{ margin: '0 0 20px', fontSize: '13px', color: '#94a3b8' }}>Distribution by package type</p>
          <DonutChart />
        </div>
      </div>

      {/* ── Weekly Bookings + Upcoming Events ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        {/* Weekly */}
        <div style={{ background: 'white', borderRadius: '14px', padding: '24px', border: '1px solid #f1f5f9', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Weekly Bookings</h3>
              <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#94a3b8' }}>This week's booking activity</p>
            </div>
            <button style={{ padding: '6px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'white', fontSize: '12px', fontWeight: 600, color: '#475569', cursor: 'pointer' }}>This Week</button>
          </div>
          <BarChart />
        </div>

        {/* Upcoming Events */}
        <div style={{ background: 'white', borderRadius: '14px', padding: '24px', border: '1px solid #f1f5f9', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Upcoming Events</h3>
              <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#94a3b8' }}>Next scheduled celebrations</p>
            </div>
            <a href="#" style={{ fontSize: '13px', color: '#f97316', fontWeight: 600, textDecoration: 'none' }}>View All →</a>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {upcomingEvents.map((e, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', borderRadius: '10px', background: '#fafafa', border: '1px solid #f1f5f9' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'linear-gradient(135deg,#fb923c,#f97316)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0 }}>📅</div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>{e.name}</p>
                  <p style={{ margin: '2px 0 0', fontSize: '11px', color: '#94a3b8' }}>{e.client} · {e.guests} guests · {e.mascots} mascots</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>{e.date}</p>
                  <p style={{ margin: '2px 0 0', fontSize: '11px', color: '#94a3b8' }}>{e.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Recent Bookings + Popular Packages ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '16px' }}>
        {/* Recent Bookings */}
        <div style={{ background: 'white', borderRadius: '14px', padding: '24px', border: '1px solid #f1f5f9', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Recent Bookings</h3>
              <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#94a3b8' }}>Latest booking requests</p>
            </div>
            <a href="#" style={{ fontSize: '13px', color: '#f97316', fontWeight: 600, textDecoration: 'none' }}>View All →</a>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['ID', 'Customer', 'Package', 'Date', 'Status', 'Amount'].map(h => (
                  <th key={h} style={{ textAlign: 'left', fontSize: '11px', color: '#94a3b8', fontWeight: 600, paddingBottom: '10px', borderBottom: '1px solid #f1f5f9', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentBookings.map((b, i) => (
                <tr key={i} style={{ borderBottom: i < recentBookings.length - 1 ? '1px solid #f8fafc' : 'none' }}>
                  <td style={{ padding: '12px 0', fontSize: '13px', color: '#64748b', fontWeight: 500 }}>{b.id}</td>
                  <td style={{ padding: '12px 0', fontSize: '13px', fontWeight: 600, color: '#0f172a' }}>{b.customer}</td>
                  <td style={{ padding: '12px 0', fontSize: '13px', color: '#475569' }}>{b.package}</td>
                  <td style={{ padding: '12px 0', fontSize: '13px', color: '#64748b' }}>{b.date}</td>
                  <td style={{ padding: '12px 0' }}>
                    <span style={statusStyle(b.status)}>
                      {b.status === 'Confirmed' && '●'} {b.status === 'Pending' && '●'} {b.status === 'Cancelled' && '●'} {b.status === 'Completed' && '○'} {b.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px 0', fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>{b.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Popular Packages */}
        <div style={{ background: 'white', borderRadius: '14px', padding: '24px', border: '1px solid #f1f5f9', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <h3 style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Popular Packages</h3>
          <p style={{ margin: '0 0 20px', fontSize: '13px', color: '#94a3b8' }}>Top performing services</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {popularPackages.map((p, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, color: '#475569', flexShrink: 0 }}>{p.rank}</span>
                    <span style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>{p.name}</span>
                  </div>
                  <span style={{ fontSize: '12px', color: '#94a3b8' }}>{p.bookings} bookings</span>
                </div>
                <div style={{ height: '6px', background: '#f1f5f9', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${p.pct}%`, background: p.color, borderRadius: '3px' }} />
                </div>
                <p style={{ margin: '4px 0 0', fontSize: '12px', color: p.color, fontWeight: 600 }}>{p.revenue}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Quick Actions ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
        {quickActions.map((a, i) => (
          <button key={i} style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            padding: '18px 20px', borderRadius: '14px',
            border: '1px solid #f1f5f9', background: 'white',
            cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            transition: 'transform 0.15s, box-shadow 0.15s',
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 6px 20px rgba(0,0,0,0.08)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = ''; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)'; }}
          >
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: a.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>{a.icon}</div>
            <span style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>{a.label}</span>
          </button>
        ))}
      </div>

    </div>
  );
}