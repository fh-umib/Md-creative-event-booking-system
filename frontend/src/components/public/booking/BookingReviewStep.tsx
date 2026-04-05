import type {
  BookingCategoryKey,
  BookingCustomizationSelections,
  BookingDetailsForm,
  Package,
} from '../../../types';

interface BookingReviewStepProps {
  selectedCategory: BookingCategoryKey | null;
  selectedPackage: Package | null;
  customization: BookingCustomizationSelections;
  details: BookingDetailsForm;
  totalPrice: number;
}

export default function BookingReviewStep({
  selectedCategory,
  selectedPackage,
  customization,
  details,
  totalPrice,
}: BookingReviewStepProps) {
  return (
    <div>
      <div style={headerStyle}>
        <span style={badgeStyle}>STEP 5 OF 5</span>
        <h2 style={titleStyle}>Review Your Booking</h2>
        <p style={textStyle}>
          Check your selections and event details before submitting the booking.
        </p>
      </div>

      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>Selected Category</h3>
        <p style={sectionValueStyle}>{selectedCategory || 'Not selected'}</p>
      </div>

      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>Selected Package</h3>
        <p style={sectionValueStyle}>
          {selectedPackage ? selectedPackage.title || selectedPackage.name : 'Not selected'}
        </p>
      </div>

      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>Customization</h3>
        <div style={listStyle}>
          <span style={itemPillStyle}>Mascots: {customization.mascots.length}</span>
          <span style={itemPillStyle}>Activities: {customization.activities.length}</span>
          <span style={itemPillStyle}>Extras: {customization.extras.length}</span>
          {customization.theme ? (
            <span style={itemPillStyle}>Theme: {customization.theme}</span>
          ) : null}
          {customization.backdrop ? (
            <span style={itemPillStyle}>Backdrop: {customization.backdrop}</span>
          ) : null}
          {customization.bounceUnit ? (
            <span style={itemPillStyle}>Bounce: {customization.bounceUnit}</span>
          ) : null}
          {customization.bubbleExperience ? (
            <span style={itemPillStyle}>Bubble: {customization.bubbleExperience}</span>
          ) : null}
        </div>
      </div>

      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>Event Details</h3>
        <div style={detailsGridStyle}>
          <ReviewField label="Full Name" value={details.fullName} />
          <ReviewField label="Phone" value={details.phone} />
          <ReviewField label="Email" value={details.email} />
          <ReviewField label="Event Title" value={details.eventTitle} />
          <ReviewField label="Event Date" value={details.eventDate} />
          <ReviewField label="Start Time" value={details.startTime} />
          <ReviewField label="End Time" value={details.endTime} />
          <ReviewField label="Venue Name" value={details.venueName} />
          <ReviewField label="Venue Address" value={details.venueAddress} />
          <ReviewField label="Guest Count" value={String(details.guestCount)} />
        </div>

        {details.specialRequests ? (
          <div style={{ marginTop: '16px' }}>
            <strong style={sectionTitleStyle}>Special Requests</strong>
            <p style={sectionValueStyle}>{details.specialRequests}</p>
          </div>
        ) : null}
      </div>

      <div style={totalBoxStyle}>
        <span style={totalLabelStyle}>Estimated Total</span>
        <strong style={totalValueStyle}>€{totalPrice}</strong>
      </div>
    </div>
  );
}

function ReviewField({ label, value }: { label: string; value: string }) {
  return (
    <div style={reviewFieldStyle}>
      <span style={reviewFieldLabelStyle}>{label}</span>
      <span style={reviewFieldValueStyle}>{value || '-'}</span>
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

const sectionStyle: React.CSSProperties = {
  background: '#ffffff',
  border: '1px solid #e8e0d5',
  borderRadius: '22px',
  padding: '20px',
  marginBottom: '18px',
};

const sectionTitleStyle: React.CSSProperties = {
  margin: '0 0 10px',
  color: '#111827',
  fontSize: '18px',
  fontWeight: 800,
};

const sectionValueStyle: React.CSSProperties = {
  margin: 0,
  color: '#64748b',
  lineHeight: 1.8,
};

const listStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '10px',
};

const itemPillStyle: React.CSSProperties = {
  borderRadius: '999px',
  background: '#f1f5f9',
  color: '#334155',
  fontSize: '13px',
  fontWeight: 700,
  padding: '8px 12px',
};

const detailsGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: '14px',
};

const reviewFieldStyle: React.CSSProperties = {
  display: 'grid',
  gap: '6px',
};

const reviewFieldLabelStyle: React.CSSProperties = {
  color: '#475569',
  fontSize: '13px',
  fontWeight: 700,
};

const reviewFieldValueStyle: React.CSSProperties = {
  color: '#111827',
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