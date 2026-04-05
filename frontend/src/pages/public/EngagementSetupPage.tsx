import React from 'react';
import { Link } from 'react-router-dom';

export default function EngagementSetupPage() {
  return (
    <section style={pageStyle}>
      <div style={heroCardStyle}>
        <div style={textColumnStyle}>
          <p style={eyebrowStyle}>Engagement Setup</p>
          <h1 style={titleStyle}>Romantic Styling for a Beautiful “Yes”</h1>
          <p style={textStyle}>
            We design engagement setups with elegance, intimacy and luxury in mind.
            From soft floral styling to premium backdrops and candle-lit details,
            every concept is created to feel meaningful and memorable.
          </p>

          <div style={buttonRowStyle}>
            <Link to="/booking" style={primaryButtonStyle}>
              Book Engagement Setup
            </Link>
            <Link to="/decorations" style={secondaryButtonStyle}>
              Back
            </Link>
          </div>
        </div>

        <div style={imageColumnStyle} />
      </div>

      <div style={bottomSectionStyle}>
        <div style={detailCardStyle}>
          <h3 style={detailTitleStyle}>Romantic Backdrops</h3>
          <p style={detailTextStyle}>
            Customized backdrops designed to make your proposal or engagement corner feel luxurious.
          </p>
        </div>
        <div style={detailCardStyle}>
          <h3 style={detailTitleStyle}>Elegant Floral Styling</h3>
          <p style={detailTextStyle}>
            Refined floral combinations and soft palettes that enhance the visual atmosphere.
          </p>
        </div>
        <div style={detailCardStyle}>
          <h3 style={detailTitleStyle}>Premium Table Details</h3>
          <p style={detailTextStyle}>
            Beautiful finishing elements including candles, centerpieces and classy accessories.
          </p>
        </div>
      </div>
    </section>
  );
}

const pageStyle: React.CSSProperties = {
  maxWidth: '1280px',
  margin: '0 auto',
  padding: '42px 24px 24px',
};

const heroCardStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '28px',
  alignItems: 'center',
  backgroundColor: '#fffaf2',
  border: '1px solid #ece3d5',
  borderRadius: '30px',
  padding: '28px',
  boxShadow: '0 16px 30px rgba(15, 23, 42, 0.06)',
  marginBottom: '34px',
};

const textColumnStyle: React.CSSProperties = {
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
  fontSize: '52px',
  lineHeight: 1.08,
  color: '#0f1b3d',
  fontWeight: 800,
};

const textStyle: React.CSSProperties = {
  margin: 0,
  fontSize: '18px',
  lineHeight: 1.9,
  color: '#6d665b',
};

const buttonRowStyle: React.CSSProperties = {
  display: 'flex',
  gap: '14px',
  flexWrap: 'wrap',
  marginTop: '28px',
};

const primaryButtonStyle: React.CSSProperties = {
  textDecoration: 'none',
  backgroundColor: '#d89b12',
  color: '#0f1b3d',
  borderRadius: '999px',
  padding: '14px 22px',
  fontSize: '15px',
  fontWeight: 700,
};

const secondaryButtonStyle: React.CSSProperties = {
  textDecoration: 'none',
  backgroundColor: '#ffffff',
  color: '#0f1b3d',
  border: '1px solid #e8dfd1',
  borderRadius: '999px',
  padding: '14px 22px',
  fontSize: '15px',
  fontWeight: 700,
};

const imageColumnStyle: React.CSSProperties = {
  minHeight: '430px',
  borderRadius: '24px',
  backgroundImage:
    'linear-gradient(rgba(15,27,61,0.12), rgba(15,27,61,0.12)), url("https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};

const bottomSectionStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
  gap: '22px',
};

const detailCardStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  border: '1px solid #ece3d5',
  borderRadius: '22px',
  padding: '24px',
  boxShadow: '0 12px 26px rgba(15, 23, 42, 0.05)',
};

const detailTitleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: '24px',
  fontWeight: 700,
  color: '#0f1b3d',
};

const detailTextStyle: React.CSSProperties = {
  margin: '12px 0 0 0',
  fontSize: '15px',
  lineHeight: 1.8,
  color: '#6d665b',
};