import { Link } from 'react-router-dom';

const services = [
  {
    title: 'Classic Booth',
    subtitle: 'Elegant setup for birthdays and private celebrations',
    price: '€80/session',
    image:
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Luxury Mirror Booth',
    subtitle: 'Interactive premium mirror photo experience',
    price: '€120/session',
    image:
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Wedding Photo Corner',
    subtitle: 'Romantic setup with prints, props and elegant lighting',
    price: '€150/session',
    image:
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
  },
];

const included = [
  {
    title: 'Professional Equipment',
    text: 'State-of-the-art cameras and lighting for flawless results.',
    icon: '📷',
  },
  {
    title: 'Instant Prints',
    text: 'Physical prints ready within seconds for your guests.',
    icon: '⚡',
  },
  {
    title: 'Digital Copies',
    text: 'All photos delivered digitally for easy sharing on social media.',
    icon: '🖼️',
  },
  {
    title: 'Custom Backdrops',
    text: 'Branded or themed props and backdrops to match your event.',
    icon: '✨',
  },
];

export default function PhotoBoothPage() {
  return (
    <section style={pageStyle}>
      <div style={heroStyle}>
        <p style={eyebrowStyle}>Capture Every Moment</p>
        <h1 style={titleStyle}>
          Photo <span style={accentStyle}>Experiences</span>
        </h1>
        <p style={subtitleStyle}>
          Professional photo booth services and cutting-edge technology to capture every unforgettable moment.
        </p>
      </div>

      <div style={sectionStyle}>
        <p style={sectionEyebrowStyle}>Our Stations</p>
        <h2 style={sectionTitleStyle}>Photo Booth Services</h2>

        <div style={gridStyle}>
          {services.map((item) => (
            <article key={item.title} style={cardStyle}>
              <div
                style={{
                  ...cardImageStyle,
                  backgroundImage: `linear-gradient(rgba(15,27,61,0.18), rgba(15,27,61,0.18)), url("${item.image}")`,
                }}
              />
              <div style={cardContentStyle}>
                <h3 style={cardTitleStyle}>{item.title}</h3>
                <p style={cardTextStyle}>{item.subtitle}</p>
                <div style={cardFooterStyle}>
                  <span style={priceStyle}>{item.price}</span>
                  <Link to="/booking" style={cardButtonStyle}>
                    Book Now
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div style={darkSectionStyle}>
        <p style={sectionEyebrowDarkStyle}>What’s Included</p>
        <h2 style={sectionTitleDarkStyle}>Every Service Includes</h2>

        <div style={includedGridStyle}>
          {included.map((item) => (
            <article key={item.title} style={includedCardStyle}>
              <div style={includedIconStyle}>{item.icon}</div>
              <h3 style={includedTitleStyle}>{item.title}</h3>
              <p style={includedTextStyle}>{item.text}</p>
            </article>
          ))}
        </div>

        <div style={tagsRowStyle}>
          <span style={tagStyle}>On-site technician</span>
          <span style={tagStyle}>Unlimited sessions</span>
          <span style={tagStyle}>Social sharing station</span>
          <span style={tagStyle}>Custom props</span>
        </div>
      </div>

      <div style={ctaStyle}>
        <p style={ctaEyebrowStyle}>Create Lasting Memories</p>
        <h2 style={ctaTitleStyle}>Add a professional photo experience to your next event</h2>
        <p style={ctaTextStyle}>
          Perfect for birthdays, weddings, engagements, baby showers and themed celebrations.
        </p>
        <Link to="/booking" style={ctaButtonStyle}>
          Book a Photo Booth
        </Link>
      </div>
    </section>
  );
}

const pageStyle: React.CSSProperties = {
  maxWidth: '1280px',
  margin: '0 auto',
  padding: '0 24px 30px',
};

const heroStyle: React.CSSProperties = {
  background: 'linear-gradient(135deg, #1d2b4f, #233457)',
  borderRadius: '0 0 34px 34px',
  padding: '90px 24px 100px',
  textAlign: 'center',
  color: '#ffffff',
};

const eyebrowStyle: React.CSSProperties = {
  display: 'inline-block',
  margin: 0,
  padding: '10px 18px',
  borderRadius: '999px',
  border: '1px solid rgba(232, 179, 56, 0.35)',
  color: '#e3a52a',
  fontSize: '13px',
  fontWeight: 700,
  letterSpacing: '1.5px',
  textTransform: 'uppercase',
};

const titleStyle: React.CSSProperties = {
  margin: '24px 0 14px',
  fontSize: '72px',
  lineHeight: 1,
  fontWeight: 800,
};

const accentStyle: React.CSSProperties = {
  color: '#e3a52a',
};

const subtitleStyle: React.CSSProperties = {
  margin: '0 auto',
  maxWidth: '760px',
  color: 'rgba(255,255,255,0.74)',
  fontSize: '18px',
  lineHeight: 1.8,
};

const sectionStyle: React.CSSProperties = {
  padding: '70px 0 30px',
};

const sectionEyebrowStyle: React.CSSProperties = {
  margin: 0,
  textAlign: 'center',
  color: '#c88d12',
  fontSize: '14px',
  fontWeight: 700,
  letterSpacing: '2px',
  textTransform: 'uppercase',
};

const sectionTitleStyle: React.CSSProperties = {
  margin: '14px 0 34px',
  textAlign: 'center',
  fontSize: '54px',
  fontWeight: 800,
  color: '#1f2937',
};

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '22px',
};

const cardStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  borderRadius: '24px',
  overflow: 'hidden',
  border: '1px solid #ece7df',
  boxShadow: '0 16px 30px rgba(15, 23, 42, 0.05)',
};

const cardImageStyle: React.CSSProperties = {
  height: '240px',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};

const cardContentStyle: React.CSSProperties = {
  padding: '22px',
};

const cardTitleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: '28px',
  fontWeight: 800,
  color: '#1f2937',
};

const cardTextStyle: React.CSSProperties = {
  margin: '12px 0 18px',
  color: '#6b7280',
  fontSize: '15px',
  lineHeight: 1.8,
  minHeight: '54px',
};

const cardFooterStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '12px',
  flexWrap: 'wrap',
};

const priceStyle: React.CSSProperties = {
  color: '#ea7b12',
  fontWeight: 800,
  fontSize: '24px',
};

const cardButtonStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  textDecoration: 'none',
  backgroundColor: '#f7f3ee',
  color: '#1f2937',
  padding: '12px 18px',
  borderRadius: '12px',
  fontSize: '14px',
  fontWeight: 700,
};

const darkSectionStyle: React.CSSProperties = {
  marginTop: '24px',
  background: 'linear-gradient(135deg, #1d2b4f, #233457)',
  borderRadius: '30px',
  padding: '70px 24px',
};

const sectionEyebrowDarkStyle: React.CSSProperties = {
  margin: 0,
  textAlign: 'center',
  color: '#e3a52a',
  fontSize: '14px',
  fontWeight: 700,
  letterSpacing: '2px',
  textTransform: 'uppercase',
};

const sectionTitleDarkStyle: React.CSSProperties = {
  margin: '16px 0 34px',
  textAlign: 'center',
  fontSize: '52px',
  fontWeight: 800,
  color: '#ffffff',
};

const includedGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
  gap: '22px',
};

const includedCardStyle: React.CSSProperties = {
  backgroundColor: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '24px',
  padding: '28px 22px',
  textAlign: 'center',
};

const includedIconStyle: React.CSSProperties = {
  width: '58px',
  height: '58px',
  borderRadius: '18px',
  margin: '0 auto 18px',
  backgroundColor: 'rgba(227,165,42,0.12)',
  color: '#e3a52a',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '26px',
};

const includedTitleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: '28px',
  fontWeight: 800,
  color: '#ffffff',
};

const includedTextStyle: React.CSSProperties = {
  margin: '12px 0 0',
  color: 'rgba(255,255,255,0.72)',
  fontSize: '15px',
  lineHeight: 1.8,
};

const tagsRowStyle: React.CSSProperties = {
  marginTop: '26px',
  display: 'flex',
  justifyContent: 'center',
  gap: '12px',
  flexWrap: 'wrap',
};

const tagStyle: React.CSSProperties = {
  padding: '12px 18px',
  borderRadius: '999px',
  backgroundColor: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.08)',
  color: 'rgba(255,255,255,0.84)',
  fontSize: '14px',
};

const ctaStyle: React.CSSProperties = {
  padding: '80px 24px 30px',
  textAlign: 'center',
};

const ctaEyebrowStyle: React.CSSProperties = {
  margin: 0,
  color: '#c88d12',
  fontSize: '14px',
  fontWeight: 700,
  letterSpacing: '1.5px',
  textTransform: 'uppercase',
};

const ctaTitleStyle: React.CSSProperties = {
  margin: '18px auto 12px',
  maxWidth: '900px',
  fontSize: '56px',
  fontWeight: 800,
  color: '#1f2937',
  lineHeight: 1.1,
};

const ctaTextStyle: React.CSSProperties = {
  margin: '0 auto',
  maxWidth: '760px',
  color: '#6b7280',
  fontSize: '18px',
  lineHeight: 1.8,
};

const ctaButtonStyle: React.CSSProperties = {
  display: 'inline-flex',
  marginTop: '26px',
  textDecoration: 'none',
  backgroundColor: '#e3a52a',
  color: '#1f2937',
  padding: '16px 28px',
  borderRadius: '999px',
  fontWeight: 800,
  fontSize: '16px',
};