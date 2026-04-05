import { useEffect, useState } from 'react';
import { createPublicBooking } from '../../services/bookingApi';
import { getPublicPackages } from '../../services/packageApi';
import type { PackageItem } from '../../services/packageApi';

type BookingFormState = {
  full_name: string;
  email: string;
  phone: string;
  event_title: string;
  event_type: string;
  event_date: string;
  start_time: string;
  end_time: string;
  venue_name: string;
  venue_address: string;
  guest_count: number;
  special_requests: string;
  package_id: number | '';
};

const initialForm: BookingFormState = {
  full_name: '',
  email: '',
  phone: '',
  event_title: '',
  event_type: '',
  event_date: '',
  start_time: '',
  end_time: '',
  venue_name: '',
  venue_address: '',
  guest_count: 0,
  special_requests: '',
  package_id: '',
};

export default function BookingPage() {
  const [form, setForm] = useState<BookingFormState>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');
  const [packages, setPackages] = useState<PackageItem[]>([]);

  useEffect(() => {
    const loadPackages = async () => {
      try {
        const data = await getPublicPackages();
        setPackages(data.filter((item) => item.is_active));
      } catch {
        setPackages([]);
      }
    };

    loadPackages();
  }, []);

  const handleChange = (
    key: keyof BookingFormState,
    value: string | number
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const selectedPackage = packages.find(
    (item) => item.id === Number(form.package_id)
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      setError('');
      setSuccessMessage('');

      await createPublicBooking(form);

      setSuccessMessage(
        'Your booking request has been submitted successfully. Our team will contact you soon.'
      );
      setForm(initialForm);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit booking');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section style={pageStyle}>
      <div style={heroStyle}>
        <div style={heroTextStyle}>
          <p style={eyebrowStyle}>Book Your Event</p>
          <h1 style={titleStyle}>Let’s Plan Something Beautiful Together</h1>
          <p style={subtitleStyle}>
            Fill in your booking details and our team will review your request,
            prepare the best setup for your event, and contact you with the next steps.
          </p>
        </div>

        <div style={heroImageStyle} />
      </div>

      <div style={contentGridStyle}>
        <div style={infoCardStyle}>
          <p style={sectionEyebrowStyle}>Why Book With Us</p>
          <h2 style={sectionTitleStyle}>A Creative Experience from Start to Finish</h2>

          <ul style={listStyle}>
            <li style={listItemStyle}>Premium event styling and decoration</li>
            <li style={listItemStyle}>Responsive and professional communication</li>
            <li style={listItemStyle}>Custom packages for different event types</li>
            <li style={listItemStyle}>Smooth booking flow with real follow-up</li>
          </ul>

          {selectedPackage ? (
            <div style={selectedPackageCardStyle}>
              <p style={selectedPackageLabelStyle}>Selected Package</p>
              <h3 style={selectedPackageTitleStyle}>{selectedPackage.title}</h3>
              <p style={selectedPackageTextStyle}>
                {selectedPackage.description || 'No description available.'}
              </p>
              <p style={selectedPackagePriceStyle}>
                Starting from €{selectedPackage.base_price}
              </p>
            </div>
          ) : null}
        </div>

        <div style={formCardStyle}>
          <div style={formHeaderStyle}>
            <h2 style={formTitleStyle}>Booking Form</h2>
            <p style={formSubtitleStyle}>
              Complete the form below to send your booking request.
            </p>
          </div>

          {successMessage ? <div style={successBoxStyle}>{successMessage}</div> : null}
          {error ? <div style={errorBoxStyle}>{error}</div> : null}

          <form onSubmit={handleSubmit} style={formStyle}>
            <div style={twoColumnStyle}>
              <div style={fieldStyle}>
                <label style={labelStyle}>Full Name</label>
                <input
                  type="text"
                  value={form.full_name}
                  onChange={(e) => handleChange('full_name', e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div style={fieldStyle}>
                <label style={labelStyle}>Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  style={inputStyle}
                />
              </div>
            </div>

            <div style={twoColumnStyle}>
              <div style={fieldStyle}>
                <label style={labelStyle}>Phone</label>
                <input
                  type="text"
                  value={form.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div style={fieldStyle}>
                <label style={labelStyle}>Event Title</label>
                <input
                  type="text"
                  value={form.event_title}
                  onChange={(e) => handleChange('event_title', e.target.value)}
                  style={inputStyle}
                />
              </div>
            </div>

            <div style={twoColumnStyle}>
              <div style={fieldStyle}>
                <label style={labelStyle}>Event Type</label>
                <input
                  type="text"
                  value={form.event_type}
                  onChange={(e) => handleChange('event_type', e.target.value)}
                  style={inputStyle}
                  placeholder="Birthday, Baby Shower..."
                />
              </div>

              <div style={fieldStyle}>
                <label style={labelStyle}>Guests</label>
                <input
                  type="number"
                  value={form.guest_count}
                  onChange={(e) => handleChange('guest_count', Number(e.target.value))}
                  style={inputStyle}
                />
              </div>
            </div>

            <div style={twoColumnStyle}>
              <div style={fieldStyle}>
                <label style={labelStyle}>Event Date</label>
                <input
                  type="date"
                  value={form.event_date}
                  onChange={(e) => handleChange('event_date', e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div style={fieldStyle}>
                <label style={labelStyle}>Start Time</label>
                <input
                  type="time"
                  value={form.start_time}
                  onChange={(e) => handleChange('start_time', e.target.value)}
                  style={inputStyle}
                />
              </div>
            </div>

            <div style={twoColumnStyle}>
              <div style={fieldStyle}>
                <label style={labelStyle}>End Time</label>
                <input
                  type="time"
                  value={form.end_time}
                  onChange={(e) => handleChange('end_time', e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div style={fieldStyle}>
                <label style={labelStyle}>Package</label>
                <select
                  value={form.package_id}
                  onChange={(e) =>
                    handleChange(
                      'package_id',
                      e.target.value ? Number(e.target.value) : ''
                    )
                  }
                  style={inputStyle}
                >
                  <option value="">Select a package</option>
                  {packages.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.title} - €{item.base_price}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Venue Name</label>
              <input
                type="text"
                value={form.venue_name}
                onChange={(e) => handleChange('venue_name', e.target.value)}
                style={inputStyle}
              />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Venue Address</label>
              <input
                type="text"
                value={form.venue_address}
                onChange={(e) => handleChange('venue_address', e.target.value)}
                style={inputStyle}
              />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Special Requests</label>
              <textarea
                value={form.special_requests}
                onChange={(e) => handleChange('special_requests', e.target.value)}
                style={textareaStyle}
                placeholder="Tell us about your event vision, colors, theme or special notes..."
              />
            </div>

            <button type="submit" style={submitButtonStyle} disabled={submitting}>
              {submitting ? 'Submitting...' : 'Submit Booking Request'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

const pageStyle: React.CSSProperties = {
  maxWidth: '1280px',
  margin: '0 auto',
  padding: '42px 24px 28px',
};

const heroStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1.05fr 0.95fr',
  gap: '30px',
  alignItems: 'center',
  marginBottom: '34px',
};

const heroTextStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
};

const eyebrowStyle: React.CSSProperties = {
  margin: 0,
  color: '#c88d12',
  fontSize: '14px',
  fontWeight: 700,
  letterSpacing: '2px',
  textTransform: 'uppercase',
};

const titleStyle: React.CSSProperties = {
  margin: '14px 0',
  fontSize: '56px',
  lineHeight: 1.06,
  color: '#0f1b3d',
  fontWeight: 800,
};

const subtitleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: '18px',
  lineHeight: 1.9,
  color: '#6d665b',
  maxWidth: '760px',
};

const heroImageStyle: React.CSSProperties = {
  minHeight: '420px',
  borderRadius: '28px',
  backgroundImage:
    'linear-gradient(rgba(15,27,61,0.12), rgba(15,27,61,0.12)), url("https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  border: '1px solid #ece3d5',
  boxShadow: '0 16px 30px rgba(15, 23, 42, 0.06)',
};

const contentGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '0.8fr 1.2fr',
  gap: '24px',
  alignItems: 'start',
};

const infoCardStyle: React.CSSProperties = {
  backgroundColor: '#fffaf2',
  border: '1px solid #ece3d5',
  borderRadius: '24px',
  padding: '28px',
};

const sectionEyebrowStyle: React.CSSProperties = {
  margin: 0,
  color: '#c88d12',
  fontSize: '13px',
  fontWeight: 700,
  letterSpacing: '2px',
  textTransform: 'uppercase',
};

const sectionTitleStyle: React.CSSProperties = {
  margin: '14px 0 18px',
  fontSize: '34px',
  fontWeight: 800,
  color: '#0f1b3d',
};

const listStyle: React.CSSProperties = {
  margin: 0,
  paddingLeft: '20px',
};

const listItemStyle: React.CSSProperties = {
  marginBottom: '12px',
  color: '#6d665b',
  fontSize: '15px',
  lineHeight: 1.8,
};

const selectedPackageCardStyle: React.CSSProperties = {
  marginTop: '24px',
  backgroundColor: '#ffffff',
  border: '1px solid #ece3d5',
  borderRadius: '20px',
  padding: '20px',
};

const selectedPackageLabelStyle: React.CSSProperties = {
  margin: 0,
  color: '#c88d12',
  fontSize: '12px',
  fontWeight: 700,
  letterSpacing: '1px',
  textTransform: 'uppercase',
};

const selectedPackageTitleStyle: React.CSSProperties = {
  margin: '10px 0 8px',
  fontSize: '24px',
  fontWeight: 800,
  color: '#0f1b3d',
};

const selectedPackageTextStyle: React.CSSProperties = {
  margin: 0,
  color: '#6d665b',
  fontSize: '14px',
  lineHeight: 1.7,
};

const selectedPackagePriceStyle: React.CSSProperties = {
  margin: '14px 0 0 0',
  color: '#0f1b3d',
  fontSize: '15px',
  fontWeight: 800,
};

const formCardStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  border: '1px solid #ece3d5',
  borderRadius: '24px',
  padding: '28px',
  boxShadow: '0 14px 28px rgba(15, 23, 42, 0.05)',
};

const formHeaderStyle: React.CSSProperties = {
  marginBottom: '18px',
};

const formTitleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: '30px',
  fontWeight: 800,
  color: '#0f1b3d',
};

const formSubtitleStyle: React.CSSProperties = {
  margin: '10px 0 0 0',
  color: '#6d665b',
  fontSize: '15px',
  lineHeight: 1.7,
};

const successBoxStyle: React.CSSProperties = {
  backgroundColor: '#ecfdf3',
  color: '#166534',
  border: '1px solid #b7ebc6',
  borderRadius: '16px',
  padding: '14px 16px',
  fontSize: '14px',
  fontWeight: 600,
  marginBottom: '16px',
};

const errorBoxStyle: React.CSSProperties = {
  backgroundColor: '#fff1f1',
  color: '#a33b3b',
  border: '1px solid #f2caca',
  borderRadius: '16px',
  padding: '14px 16px',
  fontSize: '14px',
  fontWeight: 600,
  marginBottom: '16px',
};

const formStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
};

const twoColumnStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '14px',
};

const fieldStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
};

const labelStyle: React.CSSProperties = {
  fontSize: '14px',
  fontWeight: 700,
  color: '#0f1b3d',
};

const inputStyle: React.CSSProperties = {
  height: '46px',
  borderRadius: '14px',
  border: '1px solid #e5dccf',
  padding: '0 14px',
  fontSize: '14px',
  outline: 'none',
  backgroundColor: '#ffffff',
};

const textareaStyle: React.CSSProperties = {
  minHeight: '110px',
  borderRadius: '14px',
  border: '1px solid #e5dccf',
  padding: '12px 14px',
  fontSize: '14px',
  outline: 'none',
  resize: 'vertical',
};

const submitButtonStyle: React.CSSProperties = {
  height: '50px',
  border: 'none',
  borderRadius: '14px',
  background: 'linear-gradient(135deg, #d89b12, #ec4899)',
  color: '#ffffff',
  fontSize: '15px',
  fontWeight: 800,
  cursor: 'pointer',
  marginTop: '6px',
};