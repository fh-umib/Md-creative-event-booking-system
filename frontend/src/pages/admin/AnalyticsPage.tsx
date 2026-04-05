import React from 'react';

export default function AnalyticsPage() {
  return (
    <div style={pageStyle}>
      <div style={headerStyle}>
        <h2 style={titleStyle}>Analytics</h2>
        <p style={subtitleStyle}>
          Overview of bookings, services and platform activity.
        </p>
      </div>

      <div style={gridStyle}>
        <div style={cardStyle}>
          <p style={labelStyle}>Total Views</p>
          <h3 style={valueStyle}>1,284</h3>
        </div>

        <div style={cardStyle}>
          <p style={labelStyle}>Bookings This Month</p>
          <h3 style={valueStyle}>32</h3>
        </div>

        <div style={cardStyle}>
          <p style={labelStyle}>Most Popular Service</p>
          <h3 style={valueStyle}>Decorations</h3>
        </div>

        <div style={cardStyle}>
          <p style={labelStyle}>Pending Inquiries</p>
          <h3 style={valueStyle}>7</h3>
        </div>
      </div>
    </div>
  );
}

const pageStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '18px',
};

const headerStyle: React.CSSProperties = {
  marginBottom: '6px',
};

const titleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: '22px',
  fontWeight: 800,
  color: '#0f172a',
};

const subtitleStyle: React.CSSProperties = {
  margin: '6px 0 0 0',
  fontSize: '14px',
  color: '#64748b',
};

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '14px',
};

const cardStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  border: '1px solid #e2e8f0',
  borderRadius: '16px',
  padding: '18px',
  boxShadow: '0 6px 18px rgba(15, 23, 42, 0.04)',
};

const labelStyle: React.CSSProperties = {
  margin: 0,
  fontSize: '13px',
  color: '#64748b',
  fontWeight: 600,
};

const valueStyle: React.CSSProperties = {
  margin: '10px 0 0 0',
  fontSize: '24px',
  fontWeight: 800,
  color: '#0f172a',
};