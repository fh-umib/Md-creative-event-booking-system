import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPackageCategories } from '../../services/packageApi';

type PackageCategorySummary = {
  category: string;
  min_price: number;
  max_price: number;
  total_packages: number;
};

const categoryMeta: Record<
  string,
  {
    title: string;
    description: string;
    image: string;
    label: string;
  }
> = {
  mascot: {
    title: 'Mascot Packages',
    description:
      'Fun mascot combinations with music, face painting, photography, and interactive children entertainment.',
    image:
      'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=80',
    label: 'Most Popular',
  },
  'bounce-house': {
    title: 'Bounce House Packages',
    description:
      'Energetic packages with bounce house setups, decoration, assistants, mascots, and event fun for kids.',
    image:
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80',
    label: 'Play Zone',
  },
  'bubble-bounce': {
    title: 'Bubble & Bounce Packages',
    description:
      'Premium bubble and bounce combinations with balloons, assistants, mascots, face painting, and photography.',
    image:
      'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80',
    label: 'Premium Combo',
  },
};

export default function PackagesPage() {
  const [categories, setCategories] = useState<PackageCategorySummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError('');
        const data = (await getPackageCategories()) as PackageCategorySummary[];
        setCategories(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load packages');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const mappedCategories = useMemo(() => {
    return categories.map((item) => {
      const meta = categoryMeta[item.category] || {
        title: item.category,
        description: 'Explore available packages in this category.',
        image:
          'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
        label: 'Category',
      };

      return {
        ...item,
        ...meta,
      };
    });
  }, [categories]);

  return (
    <section style={pageStyle}>
      <div style={heroStyle}>
        <p style={eyebrowStyle}>Flexible Pricing</p>
        <h1 style={titleStyle}>
          Event <span style={accentTextStyle}>Packages</span>
        </h1>
        <p style={subtitleStyle}>
          Choose the package category you want to explore and find the best fit for your celebration.
        </p>
      </div>

      <div style={sectionStyle}>
        <p style={sectionEyebrowStyle}>Choose Your Package</p>
        <h2 style={sectionTitleStyle}>Pick the package type you want to see</h2>

        {loading ? (
          <div style={stateBoxStyle}>Loading package categories...</div>
        ) : error ? (
          <div style={stateBoxStyle}>{error}</div>
        ) : mappedCategories.length === 0 ? (
          <div style={stateBoxStyle}>No package categories found.</div>
        ) : (
          <div style={gridStyle}>
            {mappedCategories.map((category) => (
              <article key={category.category} style={cardStyle}>
                <div
                  style={{
                    ...cardImageStyle,
                    backgroundImage: `linear-gradient(rgba(20,31,60,0.28), rgba(20,31,60,0.28)), url("${category.image}")`,
                  }}
                />
                <div style={cardContentStyle}>
                  <span style={labelStyle}>{category.label}</span>
                  <h3 style={cardTitleStyle}>{category.title}</h3>
                  <p style={cardTextStyle}>{category.description}</p>

                  <div style={priceRowStyle}>
                    <span style={priceHintStyle}>From</span>
                    <span style={priceStyle}>€{category.min_price}</span>
                  </div>

                  <div style={metaRowStyle}>
                    <span style={metaTextStyle}>{category.total_packages} packages</span>
                    <span style={metaTextStyle}>up to €{category.max_price}</span>
                  </div>

                  <Link to={`/packages/${category.category}`} style={buttonStyle}>
                    View Packages
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      <div style={noteBoxStyle}>
        If you need something outside these packages, we will prepare a custom offer just for you so it fits your event perfectly.
      </div>
    </section>
  );
}

const pageStyle: React.CSSProperties = {
  maxWidth: '1280px',
  margin: '0 auto',
  padding: '0 24px 34px',
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

const accentTextStyle: React.CSSProperties = {
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
  padding: '70px 0 26px',
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

const stateBoxStyle: React.CSSProperties = {
  padding: '50px 20px',
  textAlign: 'center',
  color: '#6b7280',
  fontSize: '18px',
};

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
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

const labelStyle: React.CSSProperties = {
  display: 'inline-flex',
  padding: '8px 12px',
  borderRadius: '999px',
  backgroundColor: '#fbf1e4',
  color: '#c87f17',
  fontSize: '12px',
  fontWeight: 700,
};

const cardTitleStyle: React.CSSProperties = {
  margin: '14px 0 10px',
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

const priceRowStyle: React.CSSProperties = {
  marginTop: '18px',
  display: 'flex',
  alignItems: 'baseline',
  gap: '8px',
};

const priceHintStyle: React.CSSProperties = {
  color: '#6b7280',
  fontSize: '14px',
};

const priceStyle: React.CSSProperties = {
  color: '#ea7b12',
  fontWeight: 800,
  fontSize: '28px',
};

const metaRowStyle: React.CSSProperties = {
  marginTop: '10px',
  display: 'flex',
  justifyContent: 'space-between',
  gap: '12px',
  flexWrap: 'wrap',
};

const metaTextStyle: React.CSSProperties = {
  color: '#4b5563',
  fontSize: '14px',
  fontWeight: 600,
};

const buttonStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '18px',
  textDecoration: 'none',
  backgroundColor: '#e3a52a',
  color: '#1f2937',
  padding: '12px 18px',
  borderRadius: '12px',
  fontSize: '14px',
  fontWeight: 700,
};

const noteBoxStyle: React.CSSProperties = {
  marginTop: '18px',
  borderRadius: '22px',
  padding: '24px',
  backgroundColor: '#fffaf2',
  border: '1px solid #f2e6cd',
  color: '#7a5b12',
  fontSize: '16px',
  lineHeight: 1.8,
  textAlign: 'center',
  fontWeight: 600,
};