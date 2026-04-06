import { useMemo, useState } from 'react';

type GalleryItem = {
  id: number;
  title: string;
  category: 'All' | 'Decorations' | 'Mascots' | 'Activities' | 'Photo Booth' | 'Packages';
  image: string;
  description: string;
};

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: 'Princess Birthday Setup',
    category: 'Decorations',
    image:
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80',
    description: 'Elegant pastel balloon styling with luxury birthday table details.',
  },
  {
    id: 2,
    title: 'Mascot Celebration',
    category: 'Mascots',
    image:
      'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1200&q=80',
    description: 'Interactive mascot moment full of joy, energy, and smiles.',
  },
  {
    id: 3,
    title: 'Photo Booth Corner',
    category: 'Photo Booth',
    image:
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80',
    description: 'Modern event booth corner prepared for photos and instant memories.',
  },
  {
    id: 4,
    title: 'Kids Activity Zone',
    category: 'Activities',
    image:
      'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1200&q=80',
    description: 'Creative children activities arranged for active and playful events.',
  },
  {
    id: 5,
    title: 'Luxury Balloon Wall',
    category: 'Decorations',
    image:
      'https://images.unsplash.com/photo-1464349153735-7db50ed83c84?auto=format&fit=crop&w=1200&q=80',
    description: 'High-end decorative wall with balloon composition and themed styling.',
  },
  {
    id: 6,
    title: 'Bubble & Bounce Package',
    category: 'Packages',
    image:
      'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80',
    description: 'A premium package look combining fun structure and event styling.',
  },
  {
    id: 7,
    title: 'Birthday Table Design',
    category: 'Decorations',
    image:
      'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80',
    description: 'Refined birthday table styling with coordinated colors and details.',
  },
  {
    id: 8,
    title: 'Happy Mascot Entrance',
    category: 'Mascots',
    image:
      'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=80',
    description: 'A memorable entrance moment for children at a special celebration.',
  },
];

const filters: GalleryItem['category'][] = [
  'All',
  'Decorations',
  'Mascots',
  'Activities',
  'Photo Booth',
  'Packages',
];

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState<GalleryItem['category']>('All');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const filteredItems = useMemo(() => {
    if (activeFilter === 'All') return galleryItems;
    return galleryItems.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  return (
    <section style={pageStyle}>
      <div style={heroStyle}>
        <div style={heroGlowLeftStyle} />
        <div style={heroGlowRightStyle} />

        <div style={heroContentStyle}>
          <span style={badgeStyle}>📷 OUR PORTFOLIO</span>

          <h1 style={heroTitleStyle}>
            Event <span style={heroAccentStyle}>Gallery</span>
          </h1>

          <p style={heroTextStyle}>
            Browse photos from our past events — decorations, mascot appearances,
            activities, and beautiful celebrations we’ve brought to life.
          </p>
        </div>

        <div style={curveWrapStyle}>
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" style={curveStyle}>
            <path
              d="M0,70 C250,20 450,20 720,70 C980,118 1200,110 1440,74 L1440,120 L0,120 Z"
              fill="#f7f4ef"
            />
          </svg>
        </div>
      </div>

      <div style={contentWrapStyle}>
        <div style={statsRowStyle}>
          <div style={statCardStyle}>
            <div style={statValueStyle}>250+</div>
            <div style={statLabelStyle}>Captured Moments</div>
          </div>
          <div style={statCardStyle}>
            <div style={statValueStyle}>80+</div>
            <div style={statLabelStyle}>Events Styled</div>
          </div>
          <div style={statCardStyle}>
            <div style={statValueStyle}>6</div>
            <div style={statLabelStyle}>Service Categories</div>
          </div>
        </div>

        <div style={sectionHeaderStyle}>
          <div>
            <p style={sectionEyebrowStyle}>Explore Moments</p>
            <h2 style={sectionTitleStyle}>See our celebration highlights</h2>
          </div>
        </div>

        <div style={filtersWrapStyle}>
          {filters.map((filter) => {
            const isActive = filter === activeFilter;

            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                style={{
                  ...filterButtonStyle,
                  ...(isActive ? activeFilterButtonStyle : {}),
                }}
              >
                {filter}
              </button>
            );
          })}
        </div>

        <div style={galleryGridStyle}>
          {filteredItems.map((item, index) => (
            <article
              key={item.id}
              style={{
                ...galleryCardStyle,
                ...(index % 5 === 0 ? tallCardStyle : {}),
              }}
              onClick={() => setSelectedImage(item)}
            >
              <img src={item.image} alt={item.title} style={galleryImageStyle} />

              <div style={imageOverlayStyle}>
                <span style={categoryTagStyle}>{item.category}</span>
                <div>
                  <h3 style={cardTitleStyle}>{item.title}</h3>
                  <p style={cardTextStyle}>{item.description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div style={bottomBoxStyle}>
          <h3 style={bottomTitleStyle}>Want your event featured here next?</h3>
          <p style={bottomTextStyle}>
            We create stylish, joyful, and memorable celebrations with decorations,
            mascots, activities, and custom event experiences.
          </p>
        </div>
      </div>

      {selectedImage ? (
        <div style={modalOverlayStyle} onClick={() => setSelectedImage(null)}>
          <div style={modalCardStyle} onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              style={closeButtonStyle}
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>

            <img
              src={selectedImage.image}
              alt={selectedImage.title}
              style={modalImageStyle}
            />

            <div style={modalContentStyle}>
              <span style={categoryTagStyle}>{selectedImage.category}</span>
              <h3 style={modalTitleStyle}>{selectedImage.title}</h3>
              <p style={modalTextStyle}>{selectedImage.description}</p>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

const pageStyle: React.CSSProperties = {
  backgroundColor: '#f7f4ef',
};

const heroStyle: React.CSSProperties = {
  position: 'relative',
  overflow: 'hidden',
  background: 'linear-gradient(135deg, #182544 0%, #223253 100%)',
  minHeight: '540px',
};

const heroGlowLeftStyle: React.CSSProperties = {
  position: 'absolute',
  left: '-120px',
  top: '30px',
  width: '320px',
  height: '320px',
  borderRadius: '50%',
  background: 'radial-gradient(circle, rgba(255,255,255,0.06), transparent 70%)',
};

const heroGlowRightStyle: React.CSSProperties = {
  position: 'absolute',
  right: '-100px',
  top: '80px',
  width: '300px',
  height: '300px',
  borderRadius: '50%',
  background: 'radial-gradient(circle, rgba(255,255,255,0.05), transparent 70%)',
};

const heroContentStyle: React.CSSProperties = {
  maxWidth: '900px',
  margin: '0 auto',
  padding: '120px 24px 160px',
  textAlign: 'center',
  position: 'relative',
  zIndex: 2,
};

const badgeStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  padding: '12px 20px',
  borderRadius: '999px',
  border: '1px solid rgba(227, 165, 42, 0.28)',
  color: '#e3a52a',
  fontSize: '13px',
  fontWeight: 700,
  letterSpacing: '1.6px',
};

const heroTitleStyle: React.CSSProperties = {
  margin: '28px 0 18px',
  fontSize: '86px',
  lineHeight: 0.95,
  fontWeight: 800,
  color: '#f5f3ef',
  fontFamily: 'Georgia, serif',
};

const heroAccentStyle: React.CSSProperties = {
  color: '#e3a52a',
};

const heroTextStyle: React.CSSProperties = {
  margin: '0 auto',
  maxWidth: '760px',
  color: 'rgba(255,255,255,0.76)',
  fontSize: '19px',
  lineHeight: 1.8,
};

const curveWrapStyle: React.CSSProperties = {
  position: 'absolute',
  left: 0,
  right: 0,
  bottom: -1,
  zIndex: 1,
};

const curveStyle: React.CSSProperties = {
  width: '100%',
  height: '110px',
  display: 'block',
};

const contentWrapStyle: React.CSSProperties = {
  maxWidth: '1280px',
  margin: '0 auto',
  padding: '10px 24px 60px',
};

const statsRowStyle: React.CSSProperties = {
  marginTop: '-54px',
  position: 'relative',
  zIndex: 3,
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  gap: '18px',
};

const statCardStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  border: '1px solid #ece7df',
  borderRadius: '24px',
  padding: '28px 24px',
  textAlign: 'center',
  boxShadow: '0 14px 28px rgba(15, 23, 42, 0.06)',
};

const statValueStyle: React.CSSProperties = {
  fontSize: '34px',
  fontWeight: 800,
  color: '#1f2937',
  fontFamily: 'Georgia, serif',
};

const statLabelStyle: React.CSSProperties = {
  marginTop: '8px',
  color: '#6b7280',
  fontSize: '15px',
};

const sectionHeaderStyle: React.CSSProperties = {
  marginTop: '56px',
  marginBottom: '22px',
  textAlign: 'center',
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
  margin: '12px 0 0',
  fontSize: '48px',
  fontWeight: 800,
  color: '#1f2937',
  fontFamily: 'Georgia, serif',
};

const filtersWrapStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  gap: '12px',
  flexWrap: 'wrap',
  marginBottom: '32px',
};

const filterButtonStyle: React.CSSProperties = {
  border: '1px solid #e6dccd',
  backgroundColor: '#ffffff',
  color: '#334155',
  borderRadius: '999px',
  padding: '12px 18px',
  fontSize: '14px',
  fontWeight: 700,
  cursor: 'pointer',
};

const activeFilterButtonStyle: React.CSSProperties = {
  backgroundColor: '#e3a52a',
  color: '#1f2937',
  border: '1px solid #e3a52a',
};

const galleryGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '22px',
};

const galleryCardStyle: React.CSSProperties = {
  position: 'relative',
  height: '360px',
  borderRadius: '28px',
  overflow: 'hidden',
  cursor: 'pointer',
  boxShadow: '0 14px 28px rgba(15, 23, 42, 0.08)',
  backgroundColor: '#ddd',
};

const tallCardStyle: React.CSSProperties = {
  height: '430px',
};

const galleryImageStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block',
};

const imageOverlayStyle: React.CSSProperties = {
  position: 'absolute',
  inset: 0,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '20px',
  background:
    'linear-gradient(180deg, rgba(16,24,40,0.12) 0%, rgba(16,24,40,0.74) 100%)',
};

const categoryTagStyle: React.CSSProperties = {
  alignSelf: 'flex-start',
  backgroundColor: 'rgba(227, 165, 42, 0.95)',
  color: '#1f2937',
  borderRadius: '999px',
  padding: '8px 12px',
  fontSize: '12px',
  fontWeight: 800,
};

const cardTitleStyle: React.CSSProperties = {
  margin: 0,
  color: '#ffffff',
  fontSize: '24px',
  fontWeight: 800,
  fontFamily: 'Georgia, serif',
};

const cardTextStyle: React.CSSProperties = {
  margin: '8px 0 0',
  color: 'rgba(255,255,255,0.82)',
  fontSize: '14px',
  lineHeight: 1.7,
};

const bottomBoxStyle: React.CSSProperties = {
  marginTop: '44px',
  backgroundColor: '#fffaf2',
  border: '1px solid #f0e3ca',
  borderRadius: '26px',
  padding: '34px 28px',
  textAlign: 'center',
};

const bottomTitleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: '32px',
  fontWeight: 800,
  color: '#1f2937',
  fontFamily: 'Georgia, serif',
};

const bottomTextStyle: React.CSSProperties = {
  margin: '12px auto 0',
  maxWidth: '760px',
  color: '#6b7280',
  fontSize: '16px',
  lineHeight: 1.8,
};

const modalOverlayStyle: React.CSSProperties = {
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(10, 14, 24, 0.78)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '24px',
  zIndex: 9999,
};

const modalCardStyle: React.CSSProperties = {
  width: '100%',
  maxWidth: '980px',
  backgroundColor: '#ffffff',
  borderRadius: '28px',
  overflow: 'hidden',
  position: 'relative',
  boxShadow: '0 18px 36px rgba(0,0,0,0.24)',
};

const closeButtonStyle: React.CSSProperties = {
  position: 'absolute',
  top: '16px',
  right: '16px',
  width: '42px',
  height: '42px',
  borderRadius: '999px',
  border: 'none',
  backgroundColor: 'rgba(15, 23, 42, 0.72)',
  color: '#ffffff',
  fontSize: '26px',
  cursor: 'pointer',
  zIndex: 2,
};

const modalImageStyle: React.CSSProperties = {
  width: '100%',
  height: '520px',
  objectFit: 'cover',
  display: 'block',
};

const modalContentStyle: React.CSSProperties = {
  padding: '26px',
};

const modalTitleStyle: React.CSSProperties = {
  margin: '16px 0 8px',
  fontSize: '30px',
  fontWeight: 800,
  color: '#1f2937',
  fontFamily: 'Georgia, serif',
};

const modalTextStyle: React.CSSProperties = {
  margin: 0,
  color: '#6b7280',
  fontSize: '16px',
  lineHeight: 1.8,
};