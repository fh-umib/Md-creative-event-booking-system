import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getPackagesByCategory } from '../../services/packageApi';

type PackageItem = {
  id: number;
  title: string;
  description: string | null;
  category: string;
  duration_minutes: number;
  min_mascots: number;
  max_mascots: number;
  base_price: number;
  is_active: boolean;
  extras?: string[];
};

const categoryTitles: Record<string, string> = {
  mascot: 'Mascot Packages',
  'bounce-house': 'Bounce House Packages',
  'bubble-bounce': 'Bubble & Bounce Packages',
};

const categoryDescriptions: Record<string, string> = {
  mascot:
    'Interactive mascot packages with fun entertainment, music, and celebration moments for children.',
  'bounce-house':
    'Energetic bounce house packages designed for fun, movement, and memorable party experiences.',
  'bubble-bounce':
    'Premium bubble and bounce packages with elegant styling and luxury event atmosphere.',
};

export default function PackageCategoryPage() {
  const { category } = useParams();
  const [packages, setPackages] = useState<PackageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!category) return;

    const load = async () => {
      try {
        setLoading(true);
        setError('');
        const data = (await getPackagesByCategory(category)) as PackageItem[];
        setPackages(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load packages');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [category]);

  const activePackages = useMemo(() => {
    return packages.filter((item) => item.is_active);
  }, [packages]);

  const pageTitle = category ? categoryTitles[category] || 'Packages' : 'Packages';
  const pageDescription = category
    ? categoryDescriptions[category] || 'Explore available packages in this category.'
    : 'Explore available packages.';

  return (
    <section style={pageStyle}>
      <div style={heroStyle}>
        <p style={eyebrowStyle}>Category Overview</p>
        <h1 style={heroTitleStyle}>{pageTitle}</h1>
        <p style={heroTextStyle}>{pageDescription}</p>
      </div>

      {loading ? (
        <div style={stateBoxStyle}>Loading packages...</div>
      ) : error ? (
        <div style={stateBoxStyle}>{error}</div>
      ) : activePackages.length === 0 ? (
        <div style={stateBoxStyle}>No active packages found in this category.</div>
      ) : (
        <div style={gridStyle}>
          {activePackages.map((item) => (
            <article key={item.id} style={cardStyle}>
              <div style={cardTopRowStyle}>
                <span style={badgeStyle}>{item.category}</span>
                <span style={priceStyle}>€{item.base_price}</span>
              </div>

              <h2 style={cardTitleStyle}>{item.title}</h2>
              <p style={cardTextStyle}>
                {item.description || 'No description available for this package yet.'}
              </p>

              <div style={metaWrapStyle}>
                <span style={metaBadgeStyle}>{item.duration_minutes} min</span>
                <span style={metaBadgeStyle}>
                  Mascots: {item.min_mascots}-{item.max_mascots}
                </span>
              </div>

              <div style={buttonRowStyle}>
                <Link to={`/packages/details/${item.id}`} style={primaryButtonStyle}>
                  View Details
                </Link>
                <Link to="/packages" style={secondaryButtonStyle}>
                  Back
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

const pageStyle: React.CSSProperties = {
  maxWidth: '1280px',
  margin: '0 auto',
  padding: '0 24px 40px',
};

const heroStyle: React.CSSProperties = {
  background: 'linear-gradient(135deg, #1d2b4f, #24365d)',
  borderRadius: '0 0 34px 34px',
  padding: '84px 24px 96px',
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
  letterSpacing: '1.4px',
  textTransform: 'uppercase',
};

const heroTitleStyle: React.CSSProperties = {
  margin: '22px 0 14px',
  fontSize: '60px',
  lineHeight: 1.05,
  fontWeight: 800,
};

const heroTextStyle: React.CSSProperties = {
  margin: '0 auto',
  maxWidth: '780px',
  color: 'rgba(255,255,255,0.74)',
  fontSize: '18px',
  lineHeight: 1.8,
};

const stateBoxStyle: React.CSSProperties = {
  padding: '56px 20px',
  textAlign: 'center',
  color: '#6b7280',
  fontSize: '18px',
};

const gridStyle: React.CSSProperties = {
  marginTop: '42px',
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
  gap: '22px',
};

const cardStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  borderRadius: '24px',
  border: '1px solid #ece7df',
  boxShadow: '0 16px 30px rgba(15, 23, 42, 0.05)',
  padding: '24px',
  display: 'flex',
  flexDirection: 'column',
};

const cardTopRowStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: '12px',
  alignItems: 'center',
  flexWrap: 'wrap',
};

const badgeStyle: React.CSSProperties = {
  display: 'inline-flex',
  padding: '8px 12px',
  borderRadius: '999px',
  backgroundColor: '#fbf1e4',
  color: '#c87f17',
  fontSize: '12px',
  fontWeight: 700,
  textTransform: 'capitalize',
};

const priceStyle: React.CSSProperties = {
  color: '#ea7b12',
  fontWeight: 800,
  fontSize: '28px',
};

const cardTitleStyle: React.CSSProperties = {
  margin: '18px 0 10px',
  fontSize: '30px',
  fontWeight: 800,
  color: '#1f2937',
};

const cardTextStyle: React.CSSProperties = {
  margin: 0,
  color: '#6b7280',
  fontSize: '15px',
  lineHeight: 1.8,
  minHeight: '84px',
};

const metaWrapStyle: React.CSSProperties = {
  marginTop: '18px',
  display: 'flex',
  gap: '10px',
  flexWrap: 'wrap',
};

const metaBadgeStyle: React.CSSProperties = {
  padding: '8px 12px',
  borderRadius: '999px',
  backgroundColor: '#f8f6f2',
  color: '#4b5563',
  fontSize: '13px',
  fontWeight: 700,
};

const buttonRowStyle: React.CSSProperties = {
  marginTop: '22px',
  display: 'flex',
  gap: '12px',
  flexWrap: 'wrap',
};

const primaryButtonStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  textDecoration: 'none',
  backgroundColor: '#e3a52a',
  color: '#1f2937',
  padding: '12px 18px',
  borderRadius: '12px',
  fontSize: '14px',
  fontWeight: 700,
};

const secondaryButtonStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  textDecoration: 'none',
  backgroundColor: '#f8f5f1',
  border: '1px solid #e3d8c9',
  color: '#1f2937',
  padding: '12px 18px',
  borderRadius: '12px',
  fontSize: '14px',
  fontWeight: 700,
};