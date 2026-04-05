import type { BookingDetailsForm } from '../../../types';

interface BookingDetailsStepProps {
  details: BookingDetailsForm;
  onChange: (field: keyof BookingDetailsForm, value: string | number) => void;
}

export default function BookingDetailsStep({
  details,
  onChange,
}: BookingDetailsStepProps) {
  return (
    <div>
      <div style={headerStyle}>
        <span style={badgeStyle}>STEP 4 OF 5</span>
        <h2 style={titleStyle}>Enter Event Details</h2>
        <p style={textStyle}>
          Provide the essential information for your booking request.
        </p>
      </div>

      <div style={gridStyle}>
        <Field
          label="Full Name"
          value={details.fullName}
          onChange={(value) => onChange('fullName', value)}
          placeholder="Enter your full name"
        />
        <Field
          label="Phone"
          value={details.phone}
          onChange={(value) => onChange('phone', value)}
          placeholder="+383 4X XXX XXX"
        />
        <Field
          label="Email"
          value={details.email}
          onChange={(value) => onChange('email', value)}
          placeholder="Enter your email"
          type="email"
        />
        <Field
          label="Event Title"
          value={details.eventTitle}
          onChange={(value) => onChange('eventTitle', value)}
          placeholder="Birthday Party"
        />
        <Field
          label="Event Date"
          value={details.eventDate}
          onChange={(value) => onChange('eventDate', value)}
          type="date"
        />
        <Field
          label="Start Time"
          value={details.startTime}
          onChange={(value) => onChange('startTime', value)}
          type="time"
        />
        <Field
          label="End Time"
          value={details.endTime}
          onChange={(value) => onChange('endTime', value)}
          type="time"
        />
        <Field
          label="Venue Name"
          value={details.venueName}
          onChange={(value) => onChange('venueName', value)}
          placeholder="Enter venue name"
        />
        <Field
          label="Venue Address"
          value={details.venueAddress}
          onChange={(value) => onChange('venueAddress', value)}
          placeholder="Enter venue address"
        />
        <Field
          label="Guest Count"
          value={details.guestCount}
          onChange={(value) => onChange('guestCount', Number(value))}
          type="number"
          placeholder="0"
        />
      </div>

      <div style={textareaWrapStyle}>
        <label style={labelStyle}>Special Requests</label>
        <textarea
          value={details.specialRequests}
          onChange={(e) => onChange('specialRequests', e.target.value)}
          placeholder="Tell us anything important about your event..."
          style={textareaStyle}
          rows={5}
        />
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        type={type}
        style={inputStyle}
      />
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
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: '18px',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  marginBottom: '8px',
  color: '#374151',
  fontWeight: 700,
  fontSize: '14px',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  border: '1px solid #d8d2c8',
  outline: 'none',
  borderRadius: '16px',
  background: '#fff',
  padding: '14px 16px',
  fontSize: '15px',
  color: '#111827',
};

const textareaWrapStyle: React.CSSProperties = {
  marginTop: '18px',
};

const textareaStyle: React.CSSProperties = {
  width: '100%',
  border: '1px solid #d8d2c8',
  outline: 'none',
  borderRadius: '18px',
  background: '#fff',
  padding: '14px 16px',
  fontSize: '15px',
  color: '#111827',
  resize: 'vertical',
  fontFamily: 'inherit',
};