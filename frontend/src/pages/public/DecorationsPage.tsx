import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPublicDecorations } from '../../services/decorationApi';
import type { Decoration } from '../../services/decorationApi';

export default function DecorationsPage() {
  const [decorations, setDecorations] = useState<Decoration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadDecorations = async () => {
      try {
        const data = await getPublicDecorations();
        setDecorations(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load decorations');
      } finally {
        setLoading(false);
      }
    };

    loadDecorations();
  }, []);

  if (loading) {
    return (
      <section style={pageStyle}>
        <div style={stateBoxStyle}>Loading decorations...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section style={pageStyle}>
        <div style={stateBoxStyle}>{error}</div>
      </section>
    );
  }

  return (
    <section style={pageStyle}>
      <div style={heroSectionStyle}>
        <div style={heroTextStyle}>
          <p style={eyebrowStyle}>Luxury Styling for Every Celebration</p>
          <h1 style={titleStyle}>Decorations</h1>
          <p style={subtitleStyle}>
            Discover elegant decoration services crafted to transform your event
            into a visually unforgettable experience. Explore our categories and
            choose the concept that matches your special moment.
          </p>

          <div style={buttonRowStyle}>
            <Link to="/booking" style={primaryButtonStyle}>
              Book Decoration Service
            </Link>
            <a href="#categories" style={secondaryButtonStyle}>
              Explore Categories
            </a>
          </div>
        </div>

        <div style={heroImageWrapperStyle}>
          <div style={heroImageCardStyle}>
            <div style={heroImageTopStyle}>
              <span style={heroBadgeStyle}>Premium Styling</span>
            </div>
            <div style={heroImageStyle} />
          </div>
        </div>
      </div>

      <div style={statsWrapperStyle}>
        <div style={statCardStyle}>
          <h3 style={statValueStyle}>{decorations.length}+</h3>
          <p style={statLabelStyle}>Decoration Categories</p>
        </div>
        <div style={statCardStyle}>
          <h3 style={statValueStyle}>
            {decorations.filter((item) => item.is_featured).length}+
          </h3>
          <p style={statLabelStyle}>Featured Concepts</p>
        </div>
        <div style={statCardStyle}>
          <h3 style={statValueStyle}>
            €
            {decorations.length > 0
              ? Math.min(...decorations.map((item) => Number(item.price_from || 0)))
              : 0}
            +
          </h3>
          <p style={statLabelStyle}>Starting Price</p>
        </div>
      </div>

      <div style={introSectionStyle}>
        <p style={sectionEyebrowStyle}>What We Offer</p>
        <h2 style={sectionTitleStyle}>Decoration Categories</h2>
        <p style={sectionTextStyle}>
          Select a category and explore decoration concepts tailored for your
          special occasion. Each category is loaded directly from your backend.
        </p>
      </div>

      <div id="categories" style={gridStyle}>
        {decorations.map((item) => (
          <Link key={item.id} to={`/decorations/${item.slug}`} style={cardLinkStyle}>
            <article style={cardStyle}>
              <div
                style={{
                  ...cardImageStyle,
                  backgroundImage: `linear-gradient(rgba(15,27,61,0.18), rgba(15,27,61,0.18)), url(${item.image_url})`,
                }}
              />
              <div style={cardContentStyle}>
                <div style={cardTopRowStyle}>
                  <span style={categoryBadgeStyle}>{item.category}</span>
                  <span style={priceStyle}>From €{item.price_from}</span>
                </div>

                <h3 style={cardTitleStyle}>{item.title}</h3>
                <p style={cardTextStyle}>{item.short_description}</p>
                <span style={cardActionStyle}>View Details →</span>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}

const pageStyle: React.CSSProperties = {
  maxWidth: '1280px',
  margin: '0 auto',
  padding: '42px 24px 20px',
};

const stateBoxStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  border: '1px solid #ece3d5',
  borderRadius: '24px',
  padding: '40px',
  textAlign: 'center',
  color: '#6d665b',
  fontSize: '18px',
};

const heroSectionStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1.15fr 0.85fr',
  gap: '32px',
  alignItems: 'center',
  marginBottom: '34px',
};

const heroTextStyle: React.CSSProperties = {
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
  margin: '14px 0 14px',
  fontSize: '58px',
  lineHeight: 1.05,
  fontWeight: 800,
  color: '#0f1b3d',
};

const subtitleStyle: React.CSSProperties = {
  margin: 0,
  maxWidth: '760px',
  fontSize: '18px',
  lineHeight: 1.9,
  color: '#6d665b',
};

const buttonRowStyle: React.CSSProperties = {
  display: 'flex',
  gap: '14px',
  marginTop: '28px',
  flexWrap: 'wrap',
};

const primaryButtonStyle: React.CSSProperties = {
  textDecoration: 'none',
  backgroundColor: '#d89b12',
  color: '#0f1b3d',
  padding: '14px 22px',
  borderRadius: '999px',
  fontWeight: 700,
  fontSize: '15px',
  boxShadow: '0 10px 20px rgba(216, 155, 18, 0.18)',
};

const secondaryButtonStyle: React.CSSProperties = {
  textDecoration: 'none',
  backgroundColor: '#ffffff',
  color: '#0f1b3d',
  padding: '14px 22px',
  borderRadius: '999px',
  fontWeight: 700,
  fontSize: '15px',
  border: '1px solid #e8dfd1',
};

const heroImageWrapperStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
};

const heroImageCardStyle: React.CSSProperties = {
  width: '100%',
  maxWidth: '450px',
  backgroundColor: '#fffaf2',
  border: '1px solid #ece3d5',
  borderRadius: '28px',
  padding: '18px',
  boxShadow: '0 18px 35px rgba(15, 23, 42, 0.06)',
};

const heroImageTopStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'flex-start',
  marginBottom: '14px',
};

const heroBadgeStyle: React.CSSProperties = {
  display: 'inline-flex',
  padding: '8px 14px',
  borderRadius: '999px',
  backgroundColor: '#f8edd6',
  color: '#b68417',
  fontSize: '13px',
  fontWeight: 700,
};

const heroImageStyle: React.CSSProperties = {
  height: '420px',
  borderRadius: '22px',
  backgroundImage:
    'linear-gradient(rgba(15,27,61,0.12), rgba(15,27,61,0.12)), url("https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};

const statsWrapperStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
  gap: '18px',
  marginBottom: '56px',
};

const statCardStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  border: '1px solid #ece3d5',
  borderRadius: '20px',
  padding: '24px',
  textAlign: 'center',
  boxShadow: '0 12px 24px rgba(15, 23, 42, 0.04)',
};

const statValueStyle: React.CSSProperties = {
  margin: 0,
  fontSize: '42px',
  fontWeight: 800,
  color: '#0f1b3d',
};

const statLabelStyle: React.CSSProperties = {
  margin: '10px 0 0 0',
  fontSize: '15px',
  color: '#7a7367',
};

const introSectionStyle: React.CSSProperties = {
  textAlign: 'center',
  maxWidth: '820px',
  margin: '0 auto 34px',
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
  margin: '14px 0 14px',
  fontSize: '44px',
  fontWeight: 800,
  color: '#0f1b3d',
};

const sectionTextStyle: React.CSSProperties = {
  margin: 0,
  fontSize: '18px',
  lineHeight: 1.8,
  color: '#6d665b',
};

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '24px',
  marginBottom: '40px',
};

const cardLinkStyle: React.CSSProperties = {
  textDecoration: 'none',
};

const cardStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  borderRadius: '24px',
  overflow: 'hidden',
  border: '1px solid #ece3d5',
  boxShadow: '0 16px 30px rgba(15, 23, 42, 0.06)',
};

const cardImageStyle: React.CSSProperties = {
  height: '260px',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};

const cardContentStyle: React.CSSProperties = {
  padding: '22px',
};

const cardTopRowStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '12px',
  marginBottom: '12px',
  flexWrap: 'wrap',
};

const categoryBadgeStyle: React.CSSProperties = {
  display: 'inline-flex',
  padding: '7px 12px',
  borderRadius: '999px',
  backgroundColor: '#f8edd6',
  color: '#b68417',
  fontSize: '12px',
  fontWeight: 700,
};

const priceStyle: React.CSSProperties = {
  fontSize: '14px',
  fontWeight: 700,
  color: '#0f1b3d',
};

const cardTitleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: '28px',
  fontWeight: 700,
  color: '#0f1b3d',
};

const cardTextStyle: React.CSSProperties = {
  margin: '12px 0 18px',
  fontSize: '15px',
  lineHeight: 1.8,
  color: '#6d665b',
};

const cardActionStyle: React.CSSProperties = {
  color: '#c88d12',
  fontSize: '15px',
  fontWeight: 700,
};