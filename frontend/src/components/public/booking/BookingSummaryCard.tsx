import type { BookingCategoryKey, Package } from '../../../types';

interface BookingSummaryCardProps {
  currentStepLabel: string;
  selectedCategory: BookingCategoryKey | null;
  selectedPackage: Package | null;
  totalPrice: number;
  onBack?: () => void;
  onNext?: () => void;
  nextDisabled?: boolean;
  nextLabel?: string;
  backLabel?: string;
  note?: string;
}

export default function BookingSummaryCard({
  currentStepLabel,
  selectedCategory,
  selectedPackage,
  totalPrice,
  onBack,
  onNext,
  nextDisabled = false,
  nextLabel = 'Continue',
  backLabel = 'Back',
  note = 'Your total updates automatically as you build your booking.',
}: BookingSummaryCardProps) {
  return (
    <aside style={cardStyle}>
      <div style={headerStyle}>
        <h3 style={titleStyle}>Booking Summary</h3>
        <span style={stepStyle}>{currentStepLabel}</span>
      </div>

      <div style={sectionStyle}>
        <strong style={sectionTitleStyle}>Category</strong>
        <p style={sectionValueStyle}>{selectedCategory || 'No category selected'}</p>
      </div>

      <div style={sectionStyle}>
        <strong style={sectionTitleStyle}>Package</strong>
        <p style={sectionValueStyle}>
          {selectedPackage
            ? selectedPackage.title || selectedPackage.name
            : 'No package selected'}
        </p>
      </div>

      <div style={totalBoxStyle}>
        <span style={totalLabelStyle}>Total</span>
        <strong style={totalValueStyle}>€{totalPrice}</strong>
      </div>

      <div style={actionsStyle}>
        {onBack ? (
          <button type="button" onClick={onBack} style={secondaryButtonStyle}>
            {backLabel}
          </button>
        ) : (
          <div />
        )}

        {onNext ? (
          <button
            type="button"
            onClick={onNext}
            disabled={nextDisabled}
            style={{
              ...primaryButtonStyle,
              ...(nextDisabled ? disabledButtonStyle : {}),
            }}
          >
            {nextLabel}
          </button>
        ) : null}
      </div>

      <div style={noteBoxStyle}>{note}</div>
    </aside>
  );
}

const cardStyle: React.CSSProperties = {
  background: '#ffffff',
  border: '1px solid #ebe4da',
  borderRadius: '28px',
  padding: '24px',
  boxShadow: '0 22px 45px rgba(15, 23, 42, 0.08)',
  position: 'sticky',
  top: '96px',
};

const headerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '12px',
  marginBottom: '18px',
};

const titleStyle: React.CSSProperties = {
  margin: 0,
  color: '#111827',
  fontSize: '24px',
  fontWeight: 800,
};

const stepStyle: React.CSSProperties = {
  color: '#6b7280',
  fontSize: '14px',
  fontWeight: 700,
};

const sectionStyle: React.CSSProperties = {
  padding: '16px 0',
  borderBottom: '1px solid #eee6dc',
};

const sectionTitleStyle: React.CSSProperties = {
  display: 'block',
  color: '#1f2937',
  fontSize: '16px',
  marginBottom: '6px',
};

const sectionValueStyle: React.CSSProperties = {
  margin: 0,
  color: '#64748b',
  lineHeight: 1.7,
  fontSize: '15px',
};

const totalBoxStyle: React.CSSProperties = {
  marginTop: '20px',
  padding: '20px',
  borderRadius: '20px',
  background: '#f8f4ed',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const totalLabelStyle: React.CSSProperties = {
  color: '#4b5563',
  fontWeight: 800,
  fontSize: '15px',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
};

const totalValueStyle: React.CSSProperties = {
  color: '#111827',
  fontSize: '34px',
};

const actionsStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '12px',
  marginTop: '20px',
};

const primaryButtonStyle: React.CSSProperties = {
  border: 'none',
  borderRadius: '18px',
  padding: '15px 18px',
  background: '#1f2f4f',
  color: '#ffffff',
  fontWeight: 800,
  fontSize: '16px',
  cursor: 'pointer',
};

const secondaryButtonStyle: React.CSSProperties = {
  border: '1px solid #d8d2c8',
  borderRadius: '18px',
  padding: '15px 18px',
  background: '#ffffff',
  color: '#111827',
  fontWeight: 800,
  fontSize: '16px',
  cursor: 'pointer',
};

const disabledButtonStyle: React.CSSProperties = {
  background: '#9ca3af',
  cursor: 'not-allowed',
};

const noteBoxStyle: React.CSSProperties = {
  marginTop: '20px',
  borderRadius: '18px',
  background: '#fff8eb',
  border: '1px solid #edd7a0',
  padding: '14px 16px',
  color: '#a16207',
  fontSize: '14px',
  lineHeight: 1.7,
};