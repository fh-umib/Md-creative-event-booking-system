import React from 'react';
import { Link } from 'react-router-dom';

const packages = [
  {
    title: 'Kids Birthday',
    text: 'Colorful and playful concepts with joyful details and themed styling.',
  },
  {
    title: 'Teen Birthday',
    text: 'Trendy modern decoration styles with personality and fun photo moments.',
  },
  {
    title: 'Adult Celebration',
    text: 'Elegant birthday styling with premium setups and refined details.',
  },
];

export default function BirthdayDecorPage() {
  return (
    <section style={pageStyle}>
      <div style={topSectionStyle}>
        <div style={leftStyle}>
          <p style={eyebrowStyle}>Birthday Styling</p>
          <h1 style={titleStyle}>Every Birthday Deserves a Statement Look</h1>
          <p style={textStyle}>
            From colorful kids’ celebrations to refined adult birthday setups, our
            decoration concepts are designed to bring emotion, fun and beauty into every event.
          </p>

          <div style={buttonRowStyle}>
            <Link to="/booking" style={primaryButtonStyle}>
              Start Booking
            </Link>
            <Link to="/decorations" style={secondaryButtonStyle}>
              Back to Decorations
            </Link>
          </div>
        </div>

        <div style={rightImageStyle} />
      </div>

      <div style={cardsGridStyle}>
        {packages.map((item) => (
          <div key={item.title} style={cardStyle}>
            <h3 style={cardTitleStyle}>{item.title}</h3>
            <p style={cardTextStyle}>{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const pageStyle: React.CSSProperties = {
  maxWidth: '1280px',
  margin: '0 auto',
  padding: '42px 24px 24px',
};

const topSectionStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1.05fr 0.95fr',
  gap: '30px',
  alignItems: 'center',
  marginBottom: '38px',
};

const leftStyle: React.CSSProperties = {
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
  fontSize: '54px',
  lineHeight: 1.07,
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

const rightImageStyle: React.CSSProperties = {
  minHeight: '430px',
  borderRadius: '28px',
  backgroundImage:
    'linear-gradient(rgba(15,27,61,0.12), rgba(15,27,61,0.12)), url("https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=1200&q=80")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  border: '1px solid #ece3d5',
  boxShadow: '0 16px 30px rgba(15, 23, 42, 0.06)',
};

const cardsGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
  gap: '22px',
};

const cardStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  borderRadius: '22px',
  border: '1px solid #ece3d5',
  padding: '26px',
  boxShadow: '0 12px 26px rgba(15, 23, 42, 0.05)',
};

const cardTitleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: '24px',
  fontWeight: 700,
  color: '#0f1b3d',
};

const cardTextStyle: React.CSSProperties = {
  margin: '12px 0 0 0',
  fontSize: '15px',
  lineHeight: 1.8,
  color: '#6d665b',
};