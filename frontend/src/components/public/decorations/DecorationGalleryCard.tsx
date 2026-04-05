interface DecorationGalleryCardProps {
  title: string;
  image: string;
  description: string;
}

export default function DecorationGalleryCard({
  title,
  image,
  description,
}: DecorationGalleryCardProps) {
  return (
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
      </div>
    </article>
  );
}

const cardStyle: React.CSSProperties = {
  overflow: 'hidden',
  borderRadius: '22px',
  background: '#ffffff',
  border: '1px solid #ece6dc',
  boxShadow: '0 10px 24px rgba(15, 23, 42, 0.05)',
};

const imageStyle: React.CSSProperties = {
  height: '340px',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};

const bodyStyle: React.CSSProperties = {
  padding: '18px 18px 22px',
};

const titleStyle: React.CSSProperties = {
  margin: '0 0 8px',
  color: '#111827',
  fontSize: '20px',
  fontWeight: 800,
};

const textStyle: React.CSSProperties = {
  margin: 0,
  color: '#667085',
  lineHeight: 1.7,
  fontSize: '15px',
};