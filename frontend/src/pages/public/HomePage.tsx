import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <main>
      <section
        style={{
          padding: '72px 24px 56px',
          background:
            'linear-gradient(135deg, #0f172a 0%, #1e293b 45%, #7c3aed 100%)',
          color: '#ffffff',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1.1fr 0.9fr',
            gap: '32px',
            alignItems: 'center',
          }}
        >
          <div>
            <p
              style={{
                margin: '0 0 14px 0',
                fontSize: '14px',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                opacity: 0.85,
              }}
            >
              MD Creative Event Booking
            </p>

            <h1
              style={{
                fontSize: '56px',
                lineHeight: 1.1,
                margin: '0 0 18px 0',
              }}
            >
              Make every children’s event unforgettable
            </h1>

            <p
              style={{
                fontSize: '18px',
                lineHeight: 1.7,
                maxWidth: '680px',
                marginBottom: '28px',
                color: 'rgba(255,255,255,0.88)',
              }}
            >
              Discover mascot entertainment, fun celebration packages, and easy
              booking management for birthdays, parties, and special moments.
            </p>

            <div
              style={{
                display: 'flex',
                gap: '14px',
                flexWrap: 'wrap',
              }}
            >
              <Link to="/booking" style={primaryButtonStyle}>
                Book an Event
              </Link>

              <Link to="/packages" style={secondaryButtonStyle}>
                View Packages
              </Link>
            </div>
          </div>

          <div
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '24px',
              padding: '28px',
              backdropFilter: 'blur(8px)',
            }}
          >
            <div
              style={{
                display: 'grid',
                gap: '16px',
              }}
            >
              <div style={heroCardStyle}>
                <strong>Mascot Characters</strong>
                <p style={heroTextStyle}>
                  Fun, colorful, and memorable mascots for every children’s event.
                </p>
              </div>

              <div style={heroCardStyle}>
                <strong>Event Packages</strong>
                <p style={heroTextStyle}>
                  Flexible package choices for small celebrations and bigger parties.
                </p>
              </div>

              <div style={heroCardStyle}>
                <strong>Easy Booking</strong>
                <p style={heroTextStyle}>
                  Prepare your event request quickly and manage it with ease.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        style={{
          padding: '56px 24px',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <div style={{ marginBottom: '28px' }}>
          <h2
            style={{
              fontSize: '36px',
              marginBottom: '12px',
            }}
          >
            Why choose MD Creative?
          </h2>

          <p
            style={{
              margin: 0,
              color: '#4b5563',
              lineHeight: 1.7,
              maxWidth: '720px',
            }}
          >
            We help families and organizers create joyful events with mascots,
            entertainment, and celebration options in one place.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '20px',
          }}
        >
          <div style={featureCardStyle}>
            <h3 style={featureTitleStyle}>Simple Experience</h3>
            <p style={featureTextStyle}>
              Browse packages, choose mascots, and prepare your request easily.
            </p>
          </div>

          <div style={featureCardStyle}>
            <h3 style={featureTitleStyle}>Family Events</h3>
            <p style={featureTextStyle}>
              Perfect for birthdays, school events, and special celebrations.
            </p>
          </div>

          <div style={featureCardStyle}>
            <h3 style={featureTitleStyle}>Flexible Choices</h3>
            <p style={featureTextStyle}>
              Mix and match entertainment services based on your needs.
            </p>
          </div>

          <div style={featureCardStyle}>
            <h3 style={featureTitleStyle}>Admin Management</h3>
            <p style={featureTextStyle}>
              Keep bookings, packages, mascots, and updates organized in one dashboard.
            </p>
          </div>
        </div>
      </section>

      <section
        style={{
          padding: '0 24px 64px',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            borderRadius: '24px',
            padding: '32px',
            background: '#111827',
            color: '#ffffff',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '20px',
            flexWrap: 'wrap',
          }}
        >
          <div>
            <h2 style={{ margin: '0 0 10px 0', fontSize: '30px' }}>
              Ready to plan your next event?
            </h2>
            <p
              style={{
                margin: 0,
                color: 'rgba(255,255,255,0.82)',
                lineHeight: 1.6,
              }}
            >
              Start with a package, choose your mascot, and send your booking request.
            </p>
          </div>

          <Link to="/booking" style={primaryButtonStyle}>
            Start Booking
          </Link>
        </div>
      </section>
    </main>
  );
}

const primaryButtonStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '12px 18px',
  borderRadius: '12px',
  background: '#ffffff',
  color: '#111827',
  fontWeight: 700,
  textDecoration: 'none',
};

const secondaryButtonStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '12px 18px',
  borderRadius: '12px',
  background: 'transparent',
  color: '#ffffff',
  fontWeight: 700,
  textDecoration: 'none',
  border: '1px solid rgba(255,255,255,0.3)',
};

const heroCardStyle: React.CSSProperties = {
  borderRadius: '16px',
  padding: '18px',
  background: 'rgba(255,255,255,0.08)',
};

const heroTextStyle: React.CSSProperties = {
  margin: '8px 0 0 0',
  color: 'rgba(255,255,255,0.82)',
  lineHeight: 1.6,
};

const featureCardStyle: React.CSSProperties = {
  border: '1px solid #e5e7eb',
  borderRadius: '18px',
  padding: '24px',
  background: '#ffffff',
  boxShadow: '0 8px 24px rgba(0,0,0,0.04)',
};

const featureTitleStyle: React.CSSProperties = {
  margin: '0 0 10px 0',
  fontSize: '22px',
};

const featureTextStyle: React.CSSProperties = {
  margin: 0,
  color: '#4b5563',
  lineHeight: 1.7,
};