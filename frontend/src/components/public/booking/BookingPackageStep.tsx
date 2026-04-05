import type { Package } from '../../../types';

interface BookingPackageStepProps {
  packages: Package[];
  selectedPackage: Package | null;
  isLoading: boolean;
  error: string | null;
  onSelect: (packageItem: Package) => void;
}

export default function BookingPackageStep({
  packages,
  selectedPackage,
  isLoading,
  error,
  onSelect,
}: BookingPackageStepProps) {
  return (
    <div>
      <div style={headerStyle}>
        <span style={badgeStyle}>STEP 2 OF 5</span>
        <h2 style={titleStyle}>Choose Your Package</h2>
        <p style={textStyle}>
          Select the package that best matches your event category and experience.
        </p>
      </div>

      {isLoading ? (
        <div style={stateBoxStyle}>
          <h3 style={stateTitleStyle}>Loading packages...</h3>
          <p style={stateTextStyle}>
            Please wait while we prepare the package options.
          </p>
        </div>
      ) : error ? (
        <div style={{ ...stateBoxStyle, ...errorStateStyle }}>
          <h3 style={stateTitleStyle}>Unable to load packages</h3>
          <p style={stateTextStyle}>{error}</p>
        </div>
      ) : !packages.length ? (
        <div style={stateBoxStyle}>
          <h3 style={stateTitleStyle}>No packages found</h3>
          <p style={stateTextStyle}>
            There are currently no available packages for this category.
          </p>
        </div>
      ) : (
        <div style={gridStyle}>
          {packages.map((item) => {
            const isSelected = selectedPackage?.id === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelect(item)}
                style={{
                  ...cardStyle,
                  ...(isSelected ? selectedCardStyle : {}),
                }}
              >
                <div style={cardBodyStyle}>
                  <div style={cardTopStyle}>
                    <h3 style={cardTitleStyle}>{item.title || item.name}</h3>
                    <span style={priceBadgeStyle}>
                      €{item.base_price ?? item.price ?? 0}
                    </span>
                  </div>

                  <p style={cardDescriptionStyle}>
                    {item.description || 'A curated package for memorable celebrations.'}
                  </p>

                  <div style={cardMetaStyle}>
                    {item.category ? (
                      <span style={metaPillStyle}>{item.category}</span>
                    ) : null}
                    {item.duration_minutes || item.duration ? (
                      <span style={metaPillStyle}>
                        {item.duration_minutes ?? item.duration} min
                      </span>
                    ) : null}
                  </div>

                  <div style={cardFooterStyle}>
                    <span
                      style={{
                        ...statusBadgeStyle,
                        ...(isSelected ? selectedBadgeStyle : {}),
                      }}
                    >
                      {isSelected ? 'Selected' : 'Choose package'}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
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

const priceBadgeStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '999px',
  background: '#f8f3e8',
  color: '#a16207',
  fontWeight: 800,
  fontSize: '14px',
  padding: '8px 12px',
};

const cardDescriptionStyle: React.CSSProperties = {
  margin: 0,
  color: '#64748b',
  fontSize: '16px',
  lineHeight: 1.8,
};

const cardMetaStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '10px',
};

const metaPillStyle: React.CSSProperties = {
  borderRadius: '999px',
  background: '#f1f5f9',
  color: '#334155',
  fontSize: '13px',
  fontWeight: 700,
  padding: '8px 12px',
};

const cardFooterStyle: React.CSSProperties = {
  marginTop: '6px',
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

const stateBoxStyle: React.CSSProperties = {
  borderRadius: '24px',
  border: '1px solid #ebe4da',
  background: '#fbfaf7',
  padding: '34px 24px',
  textAlign: 'center',
};

const errorStateStyle: React.CSSProperties = {
  border: '1px solid #fecaca',
  background: '#fff1f2',
};

const stateTitleStyle: React.CSSProperties = {
  margin: '0 0 10px',
  color: '#111827',
  fontSize: '28px',
  fontWeight: 800,
};

const stateTextStyle: React.CSSProperties = {
  margin: 0,
  color: '#6b7280',
  lineHeight: 1.7,
};