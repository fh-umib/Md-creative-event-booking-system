import React from 'react';

type ExtraService = {
  id: number;
  name: string;
  category: string;
  price: string;
  status: 'Active' | 'Inactive';
};

const extraServices: ExtraService[] = [
  {
    id: 1,
    name: 'Face Painting',
    category: 'Kids Activity',
    price: '€40',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Magic Show',
    category: 'Entertainment',
    price: '€90',
    status: 'Active',
  },
  {
    id: 3,
    name: 'Balloon Decoration',
    category: 'Decoration Add-on',
    price: '€55',
    status: 'Active',
  },
  {
    id: 4,
    name: 'Photo Corner Setup',
    category: 'Photo Service',
    price: '€70',
    status: 'Inactive',
  },
];

export default function ExtrasPage() {
  return (
    <div style={pageStyle}>
      <div style={headerStyle}>
        <div>
          <h2 style={titleStyle}>Extra Services</h2>
          <p style={subtitleStyle}>
            Manage additional services offered for events and celebrations.
          </p>
        </div>

        <button type="button" style={addButtonStyle}>
          Add Extra Service
        </button>
      </div>

      <div style={statsGridStyle}>
        <div style={statCardStyle}>
          <p style={statLabelStyle}>Total Extras</p>
          <h3 style={statValueStyle}>12</h3>
        </div>

        <div style={statCardStyle}>
          <p style={statLabelStyle}>Active Services</p>
          <h3 style={statValueStyle}>9</h3>
        </div>

        <div style={statCardStyle}>
          <p style={statLabelStyle}>Popular Category</p>
          <h3 style={statValueStyle}>Entertainment</h3>
        </div>
      </div>

      <div style={tableCardStyle}>
        <div style={tableHeaderStyle}>
          <span style={{ ...cellHeaderStyle, flex: 0.7 }}>ID</span>
          <span style={{ ...cellHeaderStyle, flex: 2 }}>Service Name</span>
          <span style={{ ...cellHeaderStyle, flex: 1.5 }}>Category</span>
          <span style={{ ...cellHeaderStyle, flex: 1 }}>Price</span>
          <span style={{ ...cellHeaderStyle, flex: 1 }}>Status</span>
        </div>

        {extraServices.map((service) => (
          <div key={service.id} style={tableRowStyle}>
            <span style={{ ...cellStyle, flex: 0.7 }}>#{service.id}</span>
            <span style={{ ...cellStyle, flex: 2 }}>{service.name}</span>
            <span style={{ ...cellStyle, flex: 1.5 }}>{service.category}</span>
            <span style={{ ...cellStyle, flex: 1 }}>{service.price}</span>
            <span style={{ ...cellStyle, flex: 1 }}>
              <span
                style={{
                  ...statusBadgeStyle,
                  backgroundColor:
                    service.status === 'Active' ? '#dcfce7' : '#fee2e2',
                  color: service.status === 'Active' ? '#166534' : '#991b1b',
                }}
              >
                {service.status}
              </span>
            </span>
          </div>
        ))}
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
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '16px',
  flexWrap: 'wrap',
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
  lineHeight: 1.6,
};

const addButtonStyle: React.CSSProperties = {
  border: 'none',
  borderRadius: '12px',
  backgroundColor: '#d89b12',
  color: '#091a4d',
  padding: '12px 18px',
  fontSize: '14px',
  fontWeight: 800,
  cursor: 'pointer',
};

const statsGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
  gap: '14px',
};

const statCardStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  border: '1px solid #e2e8f0',
  borderRadius: '16px',
  padding: '18px',
  boxShadow: '0 6px 18px rgba(15, 23, 42, 0.04)',
};

const statLabelStyle: React.CSSProperties = {
  margin: 0,
  fontSize: '13px',
  color: '#64748b',
  fontWeight: 600,
};

const statValueStyle: React.CSSProperties = {
  margin: '10px 0 0 0',
  fontSize: '24px',
  fontWeight: 800,
  color: '#0f172a',
};

const tableCardStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  border: '1px solid #e2e8f0',
  borderRadius: '16px',
  overflow: 'hidden',
  boxShadow: '0 6px 18px rgba(15, 23, 42, 0.04)',
};

const tableHeaderStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  padding: '14px 18px',
  backgroundColor: '#f8fafc',
  borderBottom: '1px solid #e2e8f0',
};

const tableRowStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  padding: '14px 18px',
  borderBottom: '1px solid #eef2f7',
};

const cellHeaderStyle: React.CSSProperties = {
  fontSize: '13px',
  fontWeight: 700,
  color: '#475569',
};

const cellStyle: React.CSSProperties = {
  fontSize: '14px',
  color: '#0f172a',
  fontWeight: 500,
};

const statusBadgeStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '78px',
  padding: '6px 10px',
  borderRadius: '999px',
  fontSize: '12px',
  fontWeight: 700,
};