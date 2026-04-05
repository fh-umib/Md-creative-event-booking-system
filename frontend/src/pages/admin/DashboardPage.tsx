import React from 'react';

export default function DashboardPage() {
  return (
    <div style={pageStyle}>
      <div style={headerRowStyle}>
        <div>
          <h2 style={titleStyle}>Dashboard Overview</h2>
          <p style={subtitleStyle}>Quick summary of your platform activity.</p>
        </div>
      </div>

      <div style={cardsGridStyle}>
        <div style={cardStyle}>
          <p style={cardLabelStyle}>Total Bookings</p>
          <h3 style={cardValueStyle}>24</h3>
        </div>

        <div style={cardStyle}>
          <p style={cardLabelStyle}>Pending Requests</p>
          <h3 style={cardValueStyle}>8</h3>
        </div>

        <div style={cardStyle}>
          <p style={cardLabelStyle}>Active Packages</p>
          <h3 style={cardValueStyle}>12</h3>
        </div>

        <div style={cardStyle}>
          <p style={cardLabelStyle}>Team Members</p>
          <h3 style={cardValueStyle}>6</h3>
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

const headerRowStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
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

const cardsGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
  gap: '14px',
};

const cardStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  borderRadius: '16px',
  padding: '18px',
  border: '1px solid #e2e8f0',
  boxShadow: '0 6px 18px rgba(15, 23, 42, 0.04)',
};

const cardLabelStyle: React.CSSProperties = {
  margin: 0,
  fontSize: '13px',
  color: '#64748b',
  fontWeight: 600,
};

const cardValueStyle: React.CSSProperties = {
  margin: '10px 0 0 0',
  fontSize: '28px',
  color: '#0f172a',
  fontWeight: 800,
};