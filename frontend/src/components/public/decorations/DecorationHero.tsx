import { Link } from 'react-router-dom';

interface DecorationHeroProps {
  label: string;
  title: string;
  text: string;
  primaryText?: string;
  primaryTo?: string;
  secondaryText?: string;
  secondaryTo?: string;
}

export default function DecorationHero({
  label,
  title,
  text,
  primaryText = 'Start Planning',
  primaryTo = '/booking',
  secondaryText = 'Explore Styles',
  secondaryTo = '#content',
}: DecorationHeroProps) {
  return (
    <section style={heroStyle}>
      <div style={heroInnerStyle}>
        <div style={labelStyle}>{label}</div>
        <h1 style={titleStyle}>{title}</h1>
        <p style={textStyle}>{text}</p>

        <div style={buttonsRowStyle}>
          <Link to={primaryTo} style={primaryButtonStyle}>
            {primaryText} →
          </Link>

          {secondaryTo.startsWith('/') ? (
            <Link to={secondaryTo} style={secondaryButtonStyle}>
              {secondaryText}
            </Link>
          ) : (
            <a href={secondaryTo} style={secondaryButtonStyle}>
              {secondaryText}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

const heroStyle: React.CSSProperties = {
  background:
    'radial-gradient(circle at top, rgba(63,92,145,0.18), transparent 30%), #1f2f4f',
  padding: '72px 24px 54px',
  color: '#ffffff',
};

const heroInnerStyle: React.CSSProperties = {
  maxWidth: '980px',
  margin: '0 auto',
  textAlign: 'center',
};

const labelStyle: React.CSSProperties = {
  display: 'inline-block',
  padding: '9px 18px',
  borderRadius: '999px',
  border: '1px solid rgba(217,154,29,0.28)',
  color: '#d99a1d',
  letterSpacing: '0.16em',
  fontSize: '12px',
  fontWeight: 700,
  marginBottom: '18px',
};

const titleStyle: React.CSSProperties = {
  margin: '0 0 14px',
  fontSize: 'clamp(34px, 5vw, 72px)',
  lineHeight: 1.02,
  fontWeight: 800,
};

const textStyle: React.CSSProperties = {
  margin: '0 auto',
  maxWidth: '760px',
  color: '#cbd5e1',
  fontSize: '17px',
  lineHeight: 1.75,
};

const buttonsRowStyle: React.CSSProperties = {
  marginTop: '28px',
  display: 'flex',
  justifyContent: 'center',
  gap: '14px',
  flexWrap: 'wrap',
};

const primaryButtonStyle: React.CSSProperties = {
  textDecoration: 'none',
  background: '#d99a1d',
  color: '#111827',
  fontWeight: 800,
  fontSize: '16px',
  padding: '15px 24px',
  borderRadius: '999px',
};

const secondaryButtonStyle: React.CSSProperties = {
  textDecoration: 'none',
  background: 'transparent',
  color: '#cbd5e1',
  fontWeight: 700,
  fontSize: '16px',
  padding: '15px 20px',
  borderRadius: '999px',
  border: '1px solid rgba(255,255,255,0.16)',
};