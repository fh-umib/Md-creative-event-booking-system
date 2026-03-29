import { useState } from 'react';
import { usePackages } from '../../hooks/usePackages';

export default function BookingPage() {
  const { packages, isLoading } = usePackages();

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    eventTitle: '',
    eventDate: '',
    selectedPackage: '',
    notes: '',
  });

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSuccess('');
    setError('');

    if (!form.fullName || !form.email || !form.eventTitle || !form.eventDate) {
      setError('Please fill in all required fields.');
      return;
    }

    setSuccess('Your booking request has been prepared successfully.');
    setForm({
      fullName: '',
      email: '',
      phone: '',
      eventTitle: '',
      eventDate: '',
      selectedPackage: '',
      notes: '',
    });
  };

  return (
    <section
      style={{
        padding: '48px 24px',
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      <div style={{ marginBottom: '32px' }}>
        <h1
          style={{
            fontSize: '40px',
            marginBottom: '12px',
          }}
        >
          Book Your Event
        </h1>

        <p
          style={{
            color: '#4b5563',
            fontSize: '18px',
            maxWidth: '720px',
            lineHeight: 1.6,
          }}
        >
          Fill in your event details and prepare your booking request for mascots,
          birthday packages, and kids entertainment.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.1fr 0.9fr',
          gap: '24px',
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'grid',
            gap: '14px',
            background: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '18px',
            padding: '24px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.04)',
          }}
        >
          <h2 style={{ margin: 0 }}>Booking Form</h2>

          <input
            name="fullName"
            placeholder="Full name"
            value={form.fullName}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            name="phone"
            placeholder="Phone number"
            value={form.phone}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            name="eventTitle"
            placeholder="Event title"
            value={form.eventTitle}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            name="eventDate"
            type="date"
            value={form.eventDate}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <select
            name="selectedPackage"
            value={form.selectedPackage}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="">Select a package</option>
            {!isLoading &&
              packages.map((item: any) => (
                <option key={item.id} value={item.name}>
                  {item.name} - €{item.price}
                </option>
              ))}
          </select>

          <textarea
            name="notes"
            placeholder="Special requests or notes"
            value={form.notes}
            onChange={handleChange}
            rows={5}
            style={textareaStyle}
          />

          {success && (
            <p
              style={{
                margin: 0,
                color: 'green',
                fontWeight: 600,
              }}
            >
              {success}
            </p>
          )}

          {error && (
            <p
              style={{
                margin: 0,
                color: 'crimson',
                fontWeight: 600,
              }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            style={{
              border: 'none',
              borderRadius: '10px',
              padding: '14px 18px',
              cursor: 'pointer',
              background: '#111827',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '16px',
            }}
          >
            Submit Booking Request
          </button>
        </form>

        <div
          style={{
            background: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '18px',
            padding: '24px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.04)',
            height: 'fit-content',
          }}
        >
          <h2 style={{ marginTop: 0 }}>Booking Information</h2>

          <ul
            style={{
              paddingLeft: '18px',
              color: '#4b5563',
              lineHeight: 1.8,
            }}
          >
            <li>Choose your preferred event date.</li>
            <li>Select a package if you already know what you want.</li>
            <li>Add notes for mascots, extras, or special requests.</li>
            <li>Your request can later be reviewed and confirmed by admin.</li>
          </ul>

          <div
            style={{
              marginTop: '24px',
              padding: '18px',
              borderRadius: '14px',
              background: '#f9fafb',
              border: '1px solid #e5e7eb',
            }}
          >
            <strong style={{ display: 'block', marginBottom: '8px' }}>
              Popular choice
            </strong>
            <p style={{ margin: 0, color: '#4b5563', lineHeight: 1.6 }}>
              Birthday Basic is a great option for small events with simple and
              fun celebration planning.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 14px',
  borderRadius: '10px',
  border: '1px solid #d1d5db',
  fontSize: '16px',
  outline: 'none',
};

const textareaStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 14px',
  borderRadius: '10px',
  border: '1px solid #d1d5db',
  fontSize: '16px',
  outline: 'none',
  resize: 'vertical',
};