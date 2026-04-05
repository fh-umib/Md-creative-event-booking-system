import type { AdminDecorationItem } from '../../../data/adminDecorations';

interface AdminDecorationDetailsDrawerProps {
  item: AdminDecorationItem | null;
  onClose: () => void;
}

export default function AdminDecorationDetailsDrawer({
  item,
  onClose,
}: AdminDecorationDetailsDrawerProps) {
  if (!item) return null;

  return (
    <div style={overlayStyle}>
      <div style={drawerStyle}>
        <div style={headerStyle}>
          <div>
            <h2 style={titleStyle}>{item.title}</h2>
            <p style={metaStyle}>
              {item.category}
              {item.subcategory ? ` • ${item.subcategory}` : ''} • {item.style}
            </p>
          </div>

          <button type="button" onClick={onClose} style={closeStyle}>
            Close
          </button>
        </div>

        <div
          style={{
            ...imageStyle,
            backgroundImage: `url(${item.heroImage})`,
          }}
        />

        <div style={sectionStyle}>
          <h3 style={sectionTitleStyle}>Description</h3>
          <p style={textStyle}>{item.description}</p>
        </div>

        <div style={sectionStyle}>
          <h3 style={sectionTitleStyle}>Tags</h3>
          <div style={tagsRowStyle}>
            {item.tags.map((tag) => (
              <span key={tag} style={tagStyle}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div style={sectionStyle}>
          <h3 style={sectionTitleStyle}>Status</h3>
          <p style={textStyle}>
            <strong>{item.status}</strong> • Updated on {item.updatedAt}
          </p>
        </div>

        <div style={actionsRowStyle}>
          <button type="button" style={primaryButtonStyle}>
            Edit Decoration
          </button>
          <button type="button" style={secondaryButtonStyle}>
            Change Status
          </button>
        </div>
      </div>
    </div>
  );
}

const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(15, 23, 42, 0.35)',
  display: 'flex',
  justifyContent: 'flex-end',
  zIndex: 60,
};

const drawerStyle: React.CSSProperties = {
  width: '520px',
  maxWidth: '100%',
  height: '100vh',
  background: '#ffffff',
  overflowY: 'auto',
  boxShadow: '-10px 0 30px rgba(15, 23, 42, 0.12)',
  padding: '24px',
};

const headerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: '16px',
  marginBottom: '18px',
};

const titleStyle: React.CSSProperties = {
  margin: '0 0 8px',
  color: '#0f172a',
  fontSize: '28px',
  fontWeight: 800,
};

const metaStyle: React.CSSProperties = {
  margin: 0,
  color: '#64748b',
  lineHeight: 1.7,
};

const closeStyle: React.CSSProperties = {
  border: '1px solid #dbe2ea',
  background: '#ffffff',
  color: '#0f172a',
  padding: '10px 14px',
  borderRadius: '12px',
  fontWeight: 700,
  cursor: 'pointer',
  height: 'fit-content',
};

const imageStyle: React.CSSProperties = {
  height: '280px',
  borderRadius: '18px',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  marginBottom: '20px',
};

const sectionStyle: React.CSSProperties = {
  marginBottom: '20px',
};

const sectionTitleStyle: React.CSSProperties = {
  margin: '0 0 10px',
  color: '#0f172a',
  fontSize: '18px',
  fontWeight: 800,
};

const textStyle: React.CSSProperties = {
  margin: 0,
  color: '#475569',
  lineHeight: 1.8,
};

const tagsRowStyle: React.CSSProperties = {
  display: 'flex',
  gap: '10px',
  flexWrap: 'wrap',
};

const tagStyle: React.CSSProperties = {
  padding: '8px 12px',
  borderRadius: '999px',
  background: '#f8fafc',
  border: '1px solid #e2e8f0',
  color: '#334155',
  fontSize: '13px',
  fontWeight: 700,
};

const actionsRowStyle: React.CSSProperties = {
  display: 'flex',
  gap: '12px',
  flexWrap: 'wrap',
};

const primaryButtonStyle: React.CSSProperties = {
  border: 'none',
  background: '#0f172a',
  color: '#ffffff',
  padding: '13px 18px',
  borderRadius: '14px',
  fontWeight: 700,
  cursor: 'pointer',
};

const secondaryButtonStyle: React.CSSProperties = {
  border: '1px solid #dbe2ea',
  background: '#ffffff',
  color: '#0f172a',
  padding: '13px 18px',
  borderRadius: '14px',
  fontWeight: 700,
  cursor: 'pointer',
};