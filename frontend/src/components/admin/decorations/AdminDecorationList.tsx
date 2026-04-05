import type { AdminDecorationItem } from '../../../data/adminDecorations';

interface AdminDecorationListProps {
  items: AdminDecorationItem[];
  onView: (item: AdminDecorationItem) => void;
}

export default function AdminDecorationList({
  items,
  onView,
}: AdminDecorationListProps) {
  if (!items.length) {
    return <div style={emptyStyle}>No decoration styles found.</div>;
  }

  return (
    <div style={listWrapStyle}>
      {items.map((item) => (
        <article key={item.id} style={cardStyle}>
          <div
            style={{
              ...imageStyle,
              backgroundImage: `url(${item.heroImage})`,
            }}
          />

          <div style={contentStyle}>
            <div style={topRowStyle}>
              <div>
                <h3 style={titleStyle}>{item.title}</h3>
                <p style={metaStyle}>
                  {item.category}
                  {item.subcategory ? ` • ${item.subcategory}` : ''} • {item.style}
                </p>
              </div>

              <span
                style={{
                  ...statusStyle,
                  ...(item.status === 'active' ? activeStyle : draftStyle),
                }}
              >
                {item.status}
              </span>
            </div>

            <p style={descriptionStyle}>{item.description}</p>

            <div style={tagsRowStyle}>
              {item.tags.map((tag) => (
                <span key={tag} style={tagStyle}>
                  {tag}
                </span>
              ))}
            </div>

            <div style={bottomRowStyle}>
              <span style={updatedStyle}>Updated: {item.updatedAt}</span>

              <button type="button" style={buttonStyle} onClick={() => onView(item)}>
                View Details
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

const listWrapStyle: React.CSSProperties = {
  display: 'grid',
  gap: '18px',
};

const cardStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '220px minmax(0, 1fr)',
  background: '#ffffff',
  border: '1px solid #e5e7eb',
  borderRadius: '22px',
  overflow: 'hidden',
  boxShadow: '0 10px 24px rgba(15, 23, 42, 0.04)',
};

const imageStyle: React.CSSProperties = {
  minHeight: '220px',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};

const contentStyle: React.CSSProperties = {
  padding: '20px',
};

const topRowStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: '16px',
  alignItems: 'start',
};

const titleStyle: React.CSSProperties = {
  margin: '0 0 8px',
  color: '#0f172a',
  fontSize: '24px',
  fontWeight: 800,
};

const metaStyle: React.CSSProperties = {
  margin: 0,
  color: '#64748b',
  fontSize: '14px',
  lineHeight: 1.7,
};

const descriptionStyle: React.CSSProperties = {
  margin: '14px 0 16px',
  color: '#475569',
  lineHeight: 1.75,
  fontSize: '15px',
};

const tagsRowStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '10px',
  marginBottom: '16px',
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

const bottomRowStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '16px',
};

const updatedStyle: React.CSSProperties = {
  color: '#64748b',
  fontSize: '14px',
};

const buttonStyle: React.CSSProperties = {
  border: 'none',
  background: '#0f172a',
  color: '#ffffff',
  padding: '12px 18px',
  borderRadius: '14px',
  fontWeight: 700,
  cursor: 'pointer',
};

const statusStyle: React.CSSProperties = {
  padding: '8px 12px',
  borderRadius: '999px',
  fontSize: '13px',
  fontWeight: 800,
  textTransform: 'capitalize',
};

const activeStyle: React.CSSProperties = {
  background: '#ecfdf5',
  color: '#047857',
};

const draftStyle: React.CSSProperties = {
  background: '#fff7ed',
  color: '#c2410c',
};

const emptyStyle: React.CSSProperties = {
  background: '#ffffff',
  border: '1px solid #e5e7eb',
  borderRadius: '22px',
  padding: '30px 20px',
  color: '#64748b',
  fontWeight: 700,
};