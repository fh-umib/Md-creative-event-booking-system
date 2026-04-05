import type { BookingCategoryKey, BookingCategoryOption } from '../../../types';

interface BookingCategoryStepProps {
  categories: BookingCategoryOption[];
  selectedCategory: BookingCategoryKey | null;
  onSelect: (category: BookingCategoryKey) => void;
}

export default function BookingCategoryStep({
  categories,
  selectedCategory,
  onSelect,
}: BookingCategoryStepProps) {
  return (
    <div>
      <div style={headerStyle}>
        <span style={badgeStyle}>STEP 1 OF 5</span>
        <h2 style={titleStyle}>Choose Event Category</h2>
        <p style={textStyle}>
          Start by selecting the type of event experience you want to build.
        </p>
      </div>

      <div style={gridStyle}>
        {categories.map((category) => {
          const isSelected = selectedCategory === category.key;

          return (
            <button
              key={category.key}
              type="button"
              onClick={() => onSelect(category.key)}
              style={{
                ...cardStyle,
                ...(isSelected ? selectedCardStyle : {}),
              }}
            >
              <div style={cardBodyStyle}>
                <div style={cardTopStyle}>
                  <h3 style={cardTitleStyle}>{category.title}</h3>
                  <span
                    style={{
                      ...statusBadgeStyle,
                      ...(isSelected ? selectedBadgeStyle : {}),
                    }}
                  >
                    {isSelected ? 'Selected' : 'Choose'}
                  </span>
                </div>

                <p style={cardDescriptionStyle}>{category.description}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  marginBottom: '28px',
};

const badgeStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '8px 16px',
  borderRadius: '999px',
  border: '1px solid rgba(199,146,47,0.3)',
  color: '#c7922f',
  background: 'rgba(255,255,255,0.7)',
  fontWeight: 700,
  fontSize: '13px',
  letterSpacing: '0.04em',
};

const titleStyle: React.CSSProperties = {
  margin: '20px 0 10px',
  color: '#0f172a',
  fontSize: '38px',
  fontWeight: 800,
};

const textStyle: React.CSSProperties = {
  margin: 0,
  color: '#64748b',
  fontSize: '18px',
  lineHeight: 1.7,
};

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
  gap: '20px',
};

const cardStyle: React.CSSProperties = {
  background: '#ffffff',
  border: '1px solid #e8e0d5',
  borderRadius: '24px',
  padding: '24px',
  textAlign: 'left',
  cursor: 'pointer',
  boxShadow: '0 12px 28px rgba(15, 23, 42, 0.05)',
  transition: 'all 0.2s ease',
};

const selectedCardStyle: React.CSSProperties = {
  border: '1px solid #c7922f',
  boxShadow: '0 16px 34px rgba(199, 146, 47, 0.14)',
  transform: 'translateY(-2px)',
};

const cardBodyStyle: React.CSSProperties = {
  display: 'grid',
  gap: '16px',
};

const cardTopStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: '12px',
};

const cardTitleStyle: React.CSSProperties = {
  margin: 0,
  color: '#111827',
  fontSize: '24px',
  fontWeight: 800,
};

const cardDescriptionStyle: React.CSSProperties = {
  margin: 0,
  color: '#64748b',
  fontSize: '16px',
  lineHeight: 1.8,
};

const statusBadgeStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '8px 12px',
  borderRadius: '999px',
  background: '#f3f4f6',
  color: '#4b5563',
  fontSize: '13px',
  fontWeight: 700,
};

const selectedBadgeStyle: React.CSSProperties = {
  background: '#1f2f4f',
  color: '#ffffff',
};