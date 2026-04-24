import  { useState, useEffect } from 'react';

// ── Data ──────────────────────────────────────────────────────────────────
const DATA = {
  '1yr': {
    label: 'Last 12 Months',
    kpis: [
      { label: 'Total Bookings',    value: 312,    suffix: '',   prefix: '',   change: '+18%', up: true,  icon: '📅' },
      { label: 'Total Revenue',     value: 44250,  suffix: '',   prefix: '€',  change: '+22%', up: true,  icon: '💰' },
      { label: 'Active Packages',   value: 12,     suffix: '',   prefix: '',   change: '+2',   up: true,  icon: '📦' },
      { label: 'Total Customers',   value: 189,    suffix: '',   prefix: '',   change: '+31',  up: true,  icon: '👥' },
      { label: 'Avg. Event Value',  value: 142,    suffix: '',   prefix: '€',  change: '+€12', up: true,  icon: '📈' },
      { label: 'Pending Bookings',  value: 7,      suffix: '',   prefix: '',   change: '-3',   up: false, icon: '⏳' },
    ],
    months: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    revenue: [2800,3100,3600,4100,5200,7400,8800,9100,7200,5100,4300,3650],
    bookings:[14,  16,  18,  21,  28,  38,  46,  48,  37,  27,  22,  19 ],
    services: [
      { name: 'Decorations',  value: 38, color: '#c8841a' },
      { name: 'Mascots',      value: 25, color: '#e8b56a' },
      { name: 'Activities',   value: 18, color: '#1a120b' },
      { name: 'Photo Booth',  value: 12, color: '#9a8878' },
      { name: 'Packages',     value: 7,  color: '#e6d9c4' },
    ],
    topEvents: [
      { name: 'Birthday Celebrations', count: 124, pct: 40 },
      { name: 'Weddings & Engagements',count: 68,  pct: 22 },
      { name: 'Baby Showers',          count: 52,  pct: 17 },
      { name: 'Corporate Events',      count: 38,  pct: 12 },
      { name: 'Grand Openings',        count: 30,  pct: 9  },
    ],
  },
  '3yr': {
    label: 'Last 3 Years',
    kpis: [
      { label: 'Total Bookings',    value: 847,    suffix: '',   prefix: '',   change: '+64%', up: true,  icon: '📅' },
      { label: 'Total Revenue',     value: 118400, suffix: '',   prefix: '€',  change: '+81%', up: true,  icon: '💰' },
      { label: 'Active Packages',   value: 12,     suffix: '',   prefix: '',   change: '+8',   up: true,  icon: '📦' },
      { label: 'Total Customers',   value: 512,    suffix: '',   prefix: '',   change: '+320', up: true,  icon: '👥' },
      { label: 'Avg. Event Value',  value: 140,    suffix: '',   prefix: '€',  change: '+€38', up: true,  icon: '📈' },
      { label: 'Pending Bookings',  value: 7,      suffix: '',   prefix: '',   change: 'now',  up: true,  icon: '⏳' },
    ],
    months: ['2022 Q1','Q2','Q3','Q4','2023 Q1','Q2','Q3','Q4','2024 Q1','Q2','Q3','Q4'],
    revenue: [4200,6800,12400,8100,7200,11000,18600,12800,9400,14200,21000,15200],
    bookings:[18,  28,  52,  34,  32,  48,  78,  56,  41,  62,  92,  66 ],
    services: [
      { name: 'Decorations',  value: 35, color: '#c8841a' },
      { name: 'Mascots',      value: 27, color: '#e8b56a' },
      { name: 'Activities',   value: 20, color: '#1a120b' },
      { name: 'Photo Booth',  value: 11, color: '#9a8878' },
      { name: 'Packages',     value: 7,  color: '#e6d9c4' },
    ],
    topEvents: [
      { name: 'Birthday Celebrations', count: 338, pct: 40 },
      { name: 'Weddings & Engagements',count: 186, pct: 22 },
      { name: 'Baby Showers',          count: 144, pct: 17 },
      { name: 'Corporate Events',      count: 102, pct: 12 },
      { name: 'Grand Openings',        count: 77,  pct: 9  },
    ],
  },
  '5yr': {
    label: 'Last 5 Years',
    kpis: [
      { label: 'Total Bookings',    value: 1820,   suffix: '',   prefix: '',   change: '+240%', up: true, icon: '📅' },
      { label: 'Total Revenue',     value: 247000, suffix: '',   prefix: '€',  change: '+310%', up: true, icon: '💰' },
      { label: 'Active Packages',   value: 12,     suffix: '',   prefix: '',   change: '+12',   up: true, icon: '📦' },
      { label: 'Total Customers',   value: 1102,   suffix: '',   prefix: '',   change: '+980',  up: true, icon: '👥' },
      { label: 'Avg. Event Value',  value: 136,    suffix: '',   prefix: '€',  change: '+€74',  up: true, icon: '📈' },
      { label: 'Pending Bookings',  value: 7,      suffix: '',   prefix: '',   change: 'now',   up: true, icon: '⏳' },
    ],
    months: ['2020','2021','2022','2023','2024'],
    revenue: [18200, 28400, 31500, 49600, 44250],
    bookings:[112,   178,   196,   312,   312  ],
    services: [
      { name: 'Decorations',  value: 33, color: '#c8841a' },
      { name: 'Mascots',      value: 28, color: '#e8b56a' },
      { name: 'Activities',   value: 22, color: '#1a120b' },
      { name: 'Photo Booth',  value: 10, color: '#9a8878' },
      { name: 'Packages',     value: 7,  color: '#e6d9c4' },
    ],
    topEvents: [
      { name: 'Birthday Celebrations', count: 728, pct: 40 },
      { name: 'Weddings & Engagements',count: 400, pct: 22 },
      { name: 'Baby Showers',          count: 309, pct: 17 },
      { name: 'Corporate Events',      count: 219, pct: 12 },
      { name: 'Grand Openings',        count: 164, pct: 9  },
    ],
  },
};

type Period = '1yr' | '3yr' | '5yr';

// ── useCountUp ────────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 1400, trigger: unknown = null) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    setCount(0);
    if (target === 0) return;
    let s: number | null = null;
    let raf: number;
    const step = (ts: number) => {
      if (!s) s = ts;
      const p = Math.min((ts - s) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, trigger]);
  return count;
}

// ── Mini Line Chart (SVG) ─────────────────────────────────────────────────
function LineChart({ data, labels, color = '#c8841a', secondData, secondColor = '#e6d9c4' }: {
  data: number[]; labels: string[]; color?: string;
  secondData?: number[]; secondColor?: string;
}) {
  const W = 560; const H = 160; const PAD = { t: 12, r: 12, b: 36, l: 44 };
  const iW = W - PAD.l - PAD.r;
  const iH = H - PAD.t - PAD.b;

  const allVals = secondData ? [...data, ...secondData] : data;
  const maxV = Math.max(...allVals);
  const minV = 0;
  const range = maxV - minV || 1;

  const px = (i: number) => PAD.l + (i / (data.length - 1)) * iW;
  const py = (v: number) => PAD.t + iH - ((v - minV) / range) * iH;

  const path = (arr: number[]) =>
    arr.map((v, i) => `${i === 0 ? 'M' : 'L'}${px(i).toFixed(1)},${py(v).toFixed(1)}`).join(' ');

  const area = (arr: number[]) =>
    `${path(arr)} L${px(arr.length - 1).toFixed(1)},${(PAD.t + iH).toFixed(1)} L${PAD.l},${(PAD.t + iH).toFixed(1)} Z`;

  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((t) => Math.round(minV + t * range));

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
      <defs>
        <linearGradient id="ga" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.18"/>
          <stop offset="100%" stopColor={color} stopOpacity="0.01"/>
        </linearGradient>
        <linearGradient id="gb" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={secondColor} stopOpacity="0.14"/>
          <stop offset="100%" stopColor={secondColor} stopOpacity="0.01"/>
        </linearGradient>
      </defs>

      {/* grid lines */}
      {yTicks.map((v) => (
        <g key={v}>
          <line x1={PAD.l} y1={py(v)} x2={W - PAD.r} y2={py(v)} stroke="#f0e9dd" strokeWidth="1" strokeDasharray="4,3"/>
          <text x={PAD.l - 6} y={py(v)} textAnchor="end" dominantBaseline="middle" fontSize="10" fill="#9a8878">
            {v >= 1000 ? `€${(v/1000).toFixed(0)}k` : v}
          </text>
        </g>
      ))}

      {/* area fills */}
      {secondData && <path d={area(secondData)} fill="url(#gb)"/>}
      <path d={area(data)} fill="url(#ga)"/>

      {/* lines */}
      {secondData && <path d={path(secondData)} fill="none" stroke={secondColor} strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" strokeDasharray="5,3"/>}
      <path d={path(data)} fill="none" stroke={color} strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round"/>

      {/* dots on primary */}
      {data.map((v, i) => (
        <circle key={i} cx={px(i)} cy={py(v)} r="3.5" fill="#fff" stroke={color} strokeWidth="2"/>
      ))}

      {/* x labels */}
      {labels.map((l, i) => {
        const step = Math.max(1, Math.floor(labels.length / 6));
        if (i % step !== 0 && i !== labels.length - 1) return null;
        return (
          <text key={i} x={px(i)} y={H - 6} textAnchor="middle" fontSize="10" fill="#9a8878">{l}</text>
        );
      })}
    </svg>
  );
}

// ── Donut Chart ───────────────────────────────────────────────────────────
function DonutChart({ data }: { data: { name: string; value: number; color: string }[] }) {
  const R = 70; const CX = 90; const CY = 90; const SW = 28;
  const total = data.reduce((a, b) => a + b.value, 0);
  let angle = -90;
  const slices = data.map((d) => {
    const pct = d.value / total;
    const start = angle;
    angle += pct * 360;
    return { ...d, start, sweep: pct * 360, pct };
  });

  const arc = (cx: number, cy: number, r: number, startDeg: number, sweepDeg: number) => {
    const s = (startDeg * Math.PI) / 180;
    const e = ((startDeg + sweepDeg) * Math.PI) / 180;
    const x1 = cx + r * Math.cos(s); const y1 = cy + r * Math.sin(s);
    const x2 = cx + r * Math.cos(e); const y2 = cy + r * Math.sin(e);
    const lg = sweepDeg > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${r} ${r} 0 ${lg} 1 ${x2} ${y2}`;
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
      <svg viewBox="0 0 180 180" style={{ width: 120, height: 120, flexShrink: 0 }}>
        {slices.map((s, i) => (
          <path key={i} d={arc(CX, CY, R, s.start, s.sweep - 1.5)}
            fill="none" stroke={s.color} strokeWidth={SW} strokeLinecap="butt"/>
        ))}
        <text x={CX} y={CY - 4} textAnchor="middle" fontSize="13" fontWeight="700" fill="#1a120b">{total}%</text>
        <text x={CX} y={CY + 12} textAnchor="middle" fontSize="9" fill="#9a8878">total</text>
      </svg>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {slices.map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: s.color, flexShrink: 0 }} />
            <span style={{ flex: 1, fontSize: 13, color: '#4a3b28', fontWeight: 500 }}>{s.name}</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#1a120b' }}>{s.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── KPI Card ──────────────────────────────────────────────────────────────
function KpiCard({ kpi, period }: { kpi: typeof DATA['1yr']['kpis'][0]; period: Period }) {
  const raw = kpi.value;
  const count = useCountUp(raw, 1200, period);
  const display = kpi.prefix === '€' && raw >= 1000
    ? `€${count.toLocaleString()}`
    : `${kpi.prefix}${count.toLocaleString()}${kpi.suffix}`;

  return (
    <div className="an-kpi" style={{ background: '#fff', borderRadius: 18, border: '1.5px solid #e6d9c4', padding: '20px 22px', boxShadow: '0 4px 20px rgba(26,18,11,.05)', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <p style={{ margin: 0, fontSize: 13, color: '#7a6a52', fontWeight: 600 }}>{kpi.label}</p>
        <div style={{ width: 38, height: 38, borderRadius: 11, background: '#fef3d0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>
          {kpi.icon}
        </div>
      </div>
      <p style={{ margin: 0, fontSize: 28, fontWeight: 800, color: '#1a120b', lineHeight: 1, fontFamily: "'Cormorant Garamond', serif" }}>
        {display}
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: kpi.up ? '#15803d' : '#b91c1c' }}>
          {kpi.up ? '↑' : '↓'} {kpi.change}
        </span>
        <span style={{ fontSize: 12, color: '#9a8878' }}>vs previous period</span>
      </div>
    </div>
  );
}

// ── AnalyticsPage ─────────────────────────────────────────────────────────
export default function AnalyticsPage() {
  const [period, setPeriod] = useState<Period>('1yr');
  const d = DATA[period];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@400;500;600;700&display=swap');
        .an-root { font-family: 'DM Sans', sans-serif; display: flex; flex-direction: column; gap: 22px; }
        .an-kpi { transition: transform .2s, box-shadow .2s; }
        .an-kpi:hover { transform: translateY(-3px); box-shadow: 0 12px 32px rgba(26,18,11,.1) !important; }
        .an-period-btn { transition: background .18s, color .18s, border-color .18s; cursor: pointer; }
        .an-period-btn:hover:not(.active) { border-color: #c8841a !important; color: #c8841a !important; }
        .an-bar { transition: width 0.8s cubic-bezier(.34,1.2,.64,1); }
        @media (max-width: 767px) {
          .an-kpi-grid { grid-template-columns: repeat(2,1fr) !important; }
          .an-chart-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 479px) {
          .an-kpi-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div className="an-root">

        {/* ── HEADER ── */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: '#0f172a' }}>Analytics</h2>
            <p style={{ margin: '4px 0 0', fontSize: 14, color: '#64748b' }}>
              Overview of bookings, revenue and platform activity — <strong style={{ color: '#c8841a' }}>{d.label}</strong>
            </p>
          </div>

          {/* period switcher */}
          <div style={{ display: 'flex', gap: 6, background: '#f5f0e8', borderRadius: 12, padding: 4 }}>
            {(['1yr','3yr','5yr'] as Period[]).map((p) => (
              <button key={p} className={`an-period-btn${period === p ? ' active' : ''}`}
                onClick={() => setPeriod(p)}
                style={{
                  padding: '8px 18px', borderRadius: 9, border: 'none', fontSize: 13, fontWeight: 700, fontFamily: 'inherit',
                  background: period === p ? '#c8841a' : 'transparent',
                  color: period === p ? '#fff' : '#7a6a52',
                  boxShadow: period === p ? '0 3px 10px rgba(200,132,26,.3)' : 'none',
                }}>
                {p === '1yr' ? '1 Year' : p === '3yr' ? '3 Years' : '5 Years'}
              </button>
            ))}
          </div>
        </div>

        {/* ── KPIs ── */}
        <div className="an-kpi-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
          {d.kpis.map((kpi) => <KpiCard key={kpi.label} kpi={kpi} period={period} />)}
        </div>

        {/* ── CHARTS ROW ── */}
        <div className="an-chart-grid" style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 18 }}>

          {/* Revenue + Bookings chart */}
          <div style={{ background: '#fff', borderRadius: 18, border: '1.5px solid #e6d9c4', padding: '22px', boxShadow: '0 4px 20px rgba(26,18,11,.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18, flexWrap: 'wrap', gap: 12 }}>
              <div>
                <h3 style={{ margin: '0 0 3px', fontSize: 15, fontWeight: 700, color: '#1a120b' }}>Revenue Overview</h3>
                <p style={{ margin: 0, fontSize: 12, color: '#9a8878' }}>Monthly revenue & bookings trend</p>
              </div>
              <div style={{ display: 'flex', gap: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: '#7a6a52' }}>
                  <div style={{ width: 20, height: 2.5, background: '#c8841a', borderRadius: 2 }} /> Revenue
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: '#7a6a52' }}>
                  <div style={{ width: 20, height: 2, borderTop: '2px dashed #9a8878', borderRadius: 2 }} /> Bookings
                </div>
              </div>
            </div>
            <LineChart
              data={d.revenue}
              labels={d.months}
              color="#c8841a"
              secondData={d.bookings.map((b) => b * (d.revenue[0] / d.bookings[0]))}
              secondColor="#9a8878"
            />
          </div>

          {/* Service distribution */}
          <div style={{ background: '#fff', borderRadius: 18, border: '1.5px solid #e6d9c4', padding: '22px', boxShadow: '0 4px 20px rgba(26,18,11,.05)' }}>
            <h3 style={{ margin: '0 0 3px', fontSize: 15, fontWeight: 700, color: '#1a120b' }}>Service Distribution</h3>
            <p style={{ margin: '0 0 20px', fontSize: 12, color: '#9a8878' }}>Breakdown by service type</p>
            <DonutChart data={d.services} />
          </div>
        </div>

        {/* ── BOTTOM ROW ── */}
        <div className="an-chart-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>

          {/* Top event types */}
          <div style={{ background: '#fff', borderRadius: 18, border: '1.5px solid #e6d9c4', padding: '22px', boxShadow: '0 4px 20px rgba(26,18,11,.05)' }}>
            <h3 style={{ margin: '0 0 3px', fontSize: 15, fontWeight: 700, color: '#1a120b' }}>Top Event Types</h3>
            <p style={{ margin: '0 0 20px', fontSize: 12, color: '#9a8878' }}>Most booked celebration categories</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {d.topEvents.map((ev, i) => (
                <div key={ev.name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#1a120b' }}>{ev.name}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: '#c8841a' }}>{ev.count}</span>
                  </div>
                  <div style={{ height: 7, borderRadius: 99, background: '#f0e9dd', overflow: 'hidden' }}>
                    <div className="an-bar" style={{ height: '100%', borderRadius: 99, width: `${ev.pct}%`, background: i === 0 ? '#c8841a' : i === 1 ? '#e8b56a' : '#d4a852', opacity: 1 - i * 0.12 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary stats */}
          <div style={{ background: '#fff', borderRadius: 18, border: '1.5px solid #e6d9c4', padding: '22px', boxShadow: '0 4px 20px rgba(26,18,11,.05)', display: 'flex', flexDirection: 'column', gap: 0 }}>
            <h3 style={{ margin: '0 0 3px', fontSize: 15, fontWeight: 700, color: '#1a120b' }}>Period Summary</h3>
            <p style={{ margin: '0 0 20px', fontSize: 12, color: '#9a8878' }}>Key numbers at a glance</p>

            {[
              { label: 'Avg. Bookings / Month', value: Math.round(d.kpis[0].value / (period === '1yr' ? 12 : period === '3yr' ? 36 : 60)) },
              { label: 'Avg. Revenue / Month',  value: `€${Math.round(d.kpis[1].value / (period === '1yr' ? 12 : period === '3yr' ? 36 : 60)).toLocaleString()}` },
              { label: 'Most Popular Service',  value: 'Decorations' },
              { label: 'Peak Season',           value: 'Jun – Sep' },
              { label: 'Repeat Customers',      value: '43%' },
              { label: 'Satisfaction Rate',     value: '97%' },
            ].map((row, i, arr) => (
              <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: i < arr.length - 1 ? '1px solid #f0e9dd' : 'none' }}>
                <span style={{ fontSize: 13, color: '#7a6a52', fontWeight: 500 }}>{row.label}</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: '#1a120b' }}>{row.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── BOOKINGS TREND BAR ── */}
        <div style={{ background: '#fff', borderRadius: 18, border: '1.5px solid #e6d9c4', padding: '22px', boxShadow: '0 4px 20px rgba(26,18,11,.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 18, flexWrap: 'wrap', gap: 12 }}>
            <div>
              <h3 style={{ margin: '0 0 3px', fontSize: 15, fontWeight: 700, color: '#1a120b' }}>Bookings Breakdown</h3>
              <p style={{ margin: 0, fontSize: 12, color: '#9a8878' }}>Volume per period — {d.label}</p>
            </div>
            <span style={{ fontSize: 12, color: '#9a8878', alignSelf: 'flex-end' }}>
              Total: <strong style={{ color: '#c8841a' }}>{d.kpis[0].value.toLocaleString()} bookings</strong>
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 80, paddingBottom: 28, position: 'relative' }}>
            {d.bookings.map((v, i) => {
              const maxB = Math.max(...d.bookings);
              const h = Math.max(6, (v / maxB) * 80);
              return (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, position: 'relative' }}>
                  <div title={`${d.months[i]}: ${v} bookings`} style={{ width: '100%', height: h, borderRadius: '4px 4px 0 0', background: `linear-gradient(to top, #c8841a, #e8b56a)`, opacity: 0.8 + (v / maxB) * 0.2, cursor: 'default', transition: 'height 0.6s cubic-bezier(.34,1.2,.64,1)' }} />
                  <span style={{ position: 'absolute', bottom: -22, fontSize: 9, color: '#9a8878', whiteSpace: 'nowrap', transform: 'rotate(-30deg)', transformOrigin: 'top center' }}>
                    {d.months[i]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </>
  );
}