interface AdminDecorationStatsProps {
  stats: {
    total: number;
    active: number;
    draft: number;
    categories: number;
  };
}

export default function AdminDecorationStats({ stats }: AdminDecorationStatsProps) {
  const cards = [
    { label: 'Total Styles', value: stats.total },
    { label: 'Active', value: stats.active },
    { label: 'Draft', value: stats.draft },
    { label: 'Categories', value: stats.categories },
  ];

  return (
    <div style={gridStyle}>
      {cards.map((card) => (
        <div key={card.label} style={cardStyle}>
          <p style={labelStyle}>{card.label}</p>
          <h3 style={valueStyle}>{card.value}</h3>
        </div>
      ))}
    </div>
  );
}

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
  gap: '16px',
};

const cardStyle: React.CSSProperties = {
  background: '#ffffff',
  border: '1px solid #e5e7eb',
  borderRadius: '20px',
  padding: '20px',
  boxShadow: '0 10px 24px rgba(15, 23, 42, 0.04)',
};

const labelStyle: React.CSSProperties = {
  margin: '0 0 10px',
  color: '#64748b',
  fontSize: '14px',
  fontWeight: 700,
};

const valueStyle: React.CSSProperties = {
  margin: 0,
  color: '#0f172a',
  fontSize: '34px',
  fontWeight: 800,
};