import { Link } from 'react-router-dom';

interface DecorationCategoryCardProps {
  title: string;
  description: string;
  image: string;
  to: string;
}

export default function DecorationCategoryCard({
  title,
  description,
  image,
  to,
}: DecorationCategoryCardProps) {
  return (
    <Link to={to} style={linkStyle}>
      <article
        style={{
          ...cardStyle,
          backgroundImage: `linear-gradient(180deg, rgba(15,23,42,0.06) 0%, rgba(15,23,42,0.70) 100%), url(${image})`,
        }}
      >
        <div style={contentStyle}>
          <div style={badgeStyle}>Decoration Category</div>
          <h3 style={titleStyle}>{title}</h3>
          <p style={textStyle}>{description}</p>
          <span style={actionStyle}>Explore Category →</span>
        </div>
      </article>
    </Link>
  );
}

const linkStyle: React.CSSProperties = {
  textDecoration: 'none',
};

const cardStyle: React.CSSProperties = {
  minHeight: '360px',
  borderRadius: '22px',
  overflow: 'hidden',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  display: 'flex',
  alignItems: 'end',
  boxShadow: '0 18px 36px rgba(15, 23, 42, 0.08)',
};

const contentStyle: React.CSSProperties = {
  width: '100%',
  padding: '22px',
};

const badgeStyle: React.CSSProperties = {
  display: 'inline-block',
  marginBottom: '12px',
  padding: '8px 12px',
  borderRadius: '999px',
  background: 'rgba(255,255,255,0.12)',
  color: '#ffffff',
  fontSize: '12px',
  fontWeight: 700,
  letterSpacing: '0.08em',
};

const titleStyle: React.CSSProperties = {
  margin: '0 0 10px',
  color: '#ffffff',
  fontSize: '26px',
  fontWeight: 800,
  lineHeight: 1.1,
};

const textStyle: React.CSSProperties = {
  margin: '0 0 16px',
  color: 'rgba(255,255,255,0.9)',
  lineHeight: 1.7,
  fontSize: '15px',
};

const actionStyle: React.CSSProperties = {
  color: '#d99a1d',
  fontWeight: 800,
  fontSize: '15px',
};