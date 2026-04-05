import { Link } from 'react-router-dom';

interface DecorationSubcategoryCardProps {
  title: string;
  description: string;
  image: string;
  to: string;
}

export default function DecorationSubcategoryCard({
  title,
  description,
  image,
  to,
}: DecorationSubcategoryCardProps) {
  return (
    <Link to={to} style={linkStyle}>
      <article style={cardStyle}>
        <div
          style={{
            ...imageStyle,
            backgroundImage: `url(${image})`,
          }}
        />
        <div style={bodyStyle}>
          <h3 style={titleStyle}>{title}</h3>
          <p style={textStyle}>{description}</p>
          <span style={actionStyle}>View Styles →</span>
        </div>
      </article>
    </Link>
  );
}

const linkStyle: React.CSSProperties = {
  textDecoration: 'none',
};

const cardStyle: React.CSSProperties = {
  overflow: 'hidden',
  borderRadius: '22px',
  background: '#ffffff',
  border: '1px solid #ece6dc',
  boxShadow: '0 10px 24px rgba(15, 23, 42, 0.05)',
};

const imageStyle: React.CSSProperties = {
  height: '280px',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};

const bodyStyle: React.CSSProperties = {
  padding: '22px',
};

const titleStyle: React.CSSProperties = {
  margin: '0 0 8px',
  color: '#111827',
  fontSize: '24px',
  fontWeight: 800,
};

const textStyle: React.CSSProperties = {
  margin: '0 0 14px',
  color: '#667085',
  lineHeight: 1.7,
};

const actionStyle: React.CSSProperties = {
  color: '#d99a1d',
  fontWeight: 800,
};