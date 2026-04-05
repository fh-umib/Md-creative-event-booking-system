import React from 'react';
import { Link } from 'react-router-dom';

const moments = [
  'Soft pastel setups',
  'Personalized backdrop design',
  'Elegant welcome corner',
  'Beautiful family photo space',
];

export default function BabyShowerPage() {
  return (
    <section style={pageStyle}>
      <div style={heroStyle}>
        <div style={contentStyle}>
          <p style={eyebrowStyle}>Baby Shower Styling</p>
          <h1 style={titleStyle}>Tender, Warm and Beautifully Designed</h1>
          <p style={textStyle}>
            We create soft and dreamy baby shower decorations with balanced colors,
            personalized details and a warm atmosphere for families to celebrate together.
          </p>

          <div style={buttonRowStyle}>
            <Link to="/booking" style={primaryButtonStyle}>
              Book This Setup
            </Link>
            <Link to="/decorations" style={secondaryButtonStyle}>
              Back
            </Link>
          </div>
        </div>

        <div style={imageStyle} />
      </div>

      <div style={bottomGridStyle}>
        <div style={infoCardStyle}>
          <p style={sectionEyebrowStyle}>Highlights</p>
          <h2 style={sectionTitleStyle}>Designed for Sweet Memories</h2>
          <ul style={listStyle}>
            {moments.map((item) => (
              <li key={item} style={listItemStyle}>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div style={quoteCardStyle}>
          <p style={quoteStyle}>
            “Every detail matters when the celebration is about welcoming a new life.”
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

const heroStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '28px',
  alignItems: 'center',
  marginBottom: '42px',
};

const contentStyle: React.CSSProperties = {
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
  fontWeight: 800,
  color: '#0f1b3d',
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
  marginTop: '26px',
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

const imageStyle: React.CSSProperties = {
  minHeight: '460px',
  borderRadius: '28px',
  backgroundImage:
    'linear-gradient(rgba(15,27,61,0.10), rgba(15,27,61,0.10)), url("https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=80")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  border: '1px solid #ece3d5',
  boxShadow: '0 16px 30px rgba(15, 23, 42, 0.06)',
};

const bottomGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1.2fr 0.8fr',
  gap: '24px',
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
  fontSize: '14px',
  fontWeight: 700,
  letterSpacing: '2px',
  textTransform: 'uppercase',
};

const sectionTitleStyle: React.CSSProperties = {
  margin: '14px 0 18px',
  fontSize: '36px',
  fontWeight: 800,
  color: '#0f1b3d',
};

const listStyle: React.CSSProperties = {
  margin: 0,
  paddingLeft: '22px',
  color: '#5f584d',
};

const listItemStyle: React.CSSProperties = {
  marginBottom: '12px',
  fontSize: '16px',
  lineHeight: 1.8,
};

const quoteCardStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  border: '1px solid #ece3d5',
  borderRadius: '24px',
  padding: '28px',
  display: 'flex',
  alignItems: 'center',
  boxShadow: '0 12px 26px rgba(15, 23, 42, 0.05)',
};

const quoteStyle: React.CSSProperties = {
  margin: 0,
  fontSize: '28px',
  lineHeight: 1.5,
  color: '#0f1b3d',
  fontWeight: 700,
};