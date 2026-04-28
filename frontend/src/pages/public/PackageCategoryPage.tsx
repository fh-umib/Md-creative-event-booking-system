import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import { Link, useParams } from 'react-router-dom';

import DecorationEmptyState from '../../components/public/decorations/DecorationEmptyState';
import DecorationGalleryCard from '../../components/public/decorations/DecorationGalleryCard';
import DecorationHero from '../../components/public/decorations/DecorationHero';
import DecorationSubcategoryCard from '../../components/public/decorations/DecorationSubcategoryCard';
import { getDecorationCategoryBySlug } from '../../data/decorations';

function useWindowWidth() {
  const [width, setWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
}

function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 420);

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Kthehu lart"
      style={{
        position: 'fixed',
        right: 22,
        bottom: 24,
        zIndex: 999,
        width: 46,
        height: 46,
        borderRadius: '50%',
        border: 'none',
        background: '#d99a1d',
        color: '#111827',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 12px 28px rgba(217, 154, 29, 0.42)',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transform: visible ? 'translateY(0)' : 'translateY(14px)',
        transition: '0.25s ease',
      }}
    >
      ↑
    </button>
  );
}

export default function DecorationCategoryPage() {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const width = useWindowWidth();

  const isMobile = width <= 640;
  const isTablet = width > 640 && width <= 980;

  const category = categorySlug ? getDecorationCategoryBySlug(categorySlug) : null;

  const responsive = useMemo(() => {
    const introColumns = isMobile
      ? '1fr'
      : isTablet
        ? 'repeat(2, minmax(0, 1fr))'
        : 'repeat(3, minmax(0, 1fr))';

    const subcategoryColumns = isMobile ? '1fr' : 'repeat(2, minmax(0, 1fr))';

    const galleryColumns = isMobile
      ? '1fr'
      : isTablet
        ? 'repeat(2, minmax(0, 1fr))'
        : 'repeat(3, minmax(0, 1fr))';

    return {
      sectionPadding: isMobile ? '38px 18px 56px' : '56px 24px 80px',
      introPadding: isMobile ? '22px 18px 8px' : '28px 24px 12px',
      ctaPadding: isMobile ? '0 18px 58px' : '0 24px 84px',
      introColumns,
      subcategoryColumns,
      galleryColumns,
      titleSize: isMobile ? '30px' : 'clamp(34px, 4vw, 50px)',
      ctaTitleSize: isMobile ? '28px' : 'clamp(30px, 4vw, 46px)',
      cardPadding: isMobile ? '18px' : '22px',
      ctaBoxPadding: isMobile ? '34px 20px' : '42px 24px',
      buttonWidth: isMobile ? '100%' : 'auto',
    };
  }, [isMobile, isTablet]);

  if (!category) {
    return (
      <main style={pageStyle}>
        <section style={{ ...sectionStyle, padding: responsive.sectionPadding }}>
          <DecorationEmptyState
            title="Kategoria nuk u gjet"
            message="Kjo kategori e dekorimit nuk ekziston ose nuk është më e disponueshme."
          />

          <div style={{ textAlign: 'center', marginTop: 24 }}>
            <Link to="/decorations" style={secondaryButtonStyle}>
              Kthehu te dekorimet
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const hasSubcategories = Boolean(category.subcategories?.length);
  const hasStyles = Boolean(category.styles?.length);

  return (
    <main style={pageStyle}>
      <DecorationHero
        label={category.heroLabel}
        title={category.heroTitle}
        text={category.heroText}
        primaryText="Rezervo këtë dekor"
        primaryTo="/booking"
        secondaryText="Shiko më poshtë"
        secondaryTo="#content"
      />

      <section style={{ ...introStripStyle, padding: responsive.introPadding }}>
        <div
          style={{
            ...introStripInnerStyle,
            gridTemplateColumns: responsive.introColumns,
          }}
        >
          <div style={{ ...introCardStyle, padding: responsive.cardPadding }}>
            <span style={introIconStyle}>🎨</span>
            <h3 style={introCardTitleStyle}>Ide të personalizuara</h3>
            <p style={introCardTextStyle}>
              Çdo dekor përshtatet me temën, ngjyrat, ambientin dhe stilin e
              eventit tuaj.
            </p>
          </div>

          <div style={{ ...introCardStyle, padding: responsive.cardPadding }}>
            <span style={introIconStyle}>💬</span>
            <h3 style={introCardTitleStyle}>Konsultim para realizimit</h3>
            <p style={introCardTextStyle}>
              Detajet finale dhe çmimi caktohen pas diskutimit të idesë,
              hapësirës dhe kërkesave tuaja.
            </p>
          </div>

          <div style={{ ...introCardStyle, padding: responsive.cardPadding }}>
            <span style={introIconStyle}>✨</span>
            <h3 style={introCardTitleStyle}>Pamje elegante në event</h3>
            <p style={introCardTextStyle}>
              Dekori planifikohet që hyrja, tavolina dhe këndi fotografik të
              duken bukur në çdo detaj.
            </p>
          </div>
        </div>
      </section>

      <section
        id="content"
        style={{
          ...sectionStyle,
          padding: responsive.sectionPadding,
        }}
      >
        {hasSubcategories ? (
          <>
            <div style={headingWrapStyle}>
              <p style={eyebrowStyle}>KATEGORITË E DEKORIT</p>
              <h2 style={{ ...titleStyle, fontSize: responsive.titleSize }}>
                Zgjedh drejtimin që i përshtatet eventit
              </h2>
              <p style={textStyle}>
                Shiko llojet e dekorimeve dhe vazhdo te stili që të përshtatet
                më së miri për festën, dasmën apo eventin tënd.
              </p>
            </div>

            <div
              style={{
                ...subcategoryGridStyle,
                gridTemplateColumns: responsive.subcategoryColumns,
              }}
            >
              {category.subcategories!.map((subcategory) => (
                <DecorationSubcategoryCard
                  key={subcategory.slug}
                  title={subcategory.title}
                  description={subcategory.description}
                  image={subcategory.coverImage}
                  to={`/decorations/${category.slug}/${subcategory.slug}`}
                />
              ))}
            </div>
          </>
        ) : hasStyles ? (
          <>
            <div style={headingWrapStyle}>
              <p style={eyebrowStyle}>STILET E DEKORIMIT</p>
              <h2 style={{ ...titleStyle, fontSize: responsive.titleSize }}>
                Shiko koleksionin e kësaj kategorie
              </h2>
              <p style={textStyle}>
                Këtu mund të shohësh disa drejtime vizuale për këtë dekor dhe
                të zgjedhësh stilin që përshtatet më bukur me eventin.
              </p>
            </div>

            <div
              style={{
                ...galleryGridStyle,
                gridTemplateColumns: responsive.galleryColumns,
              }}
            >
              {category.styles!.map((style) => (
                <Link
                  key={style.slug}
                  to={`/decorations/${category.slug}/${style.slug}`}
                  style={galleryLinkStyle}
                >
                  <DecorationGalleryCard
                    title={style.title}
                    image={style.heroImage}
                    description={style.shortDescription}
                  />
                </Link>
              ))}
            </div>
          </>
        ) : (
          <DecorationEmptyState
            title="Nuk ka stile për momentin"
            message="Kjo kategori është duke u përgatitur. Mund të na kontaktoni për ide dhe dekorime të personalizuara."
          />
        )}
      </section>

      <section style={{ ...ctaSectionStyle, padding: responsive.ctaPadding }}>
        <div
          style={{
            ...ctaBoxStyle,
            padding: responsive.ctaBoxPadding,
          }}
        >
          <p style={ctaEyebrowStyle}>HAPI I RADHËS</p>
          <h2 style={{ ...ctaTitleStyle, fontSize: responsive.ctaTitleSize }}>
            Ta kthejmë idenë tënde në një dekor të bukur
          </h2>
          <p style={ctaTextStyle}>
            Pasi të zgjedhësh stilin që të pëlqen, mund të vazhdojmë me datën,
            lokacionin, ngjyrat dhe detajet për ta përshtatur dekorin me eventin
            tënd.
          </p>

          <div
            style={{
              ...ctaButtonsStyle,
              flexDirection: isMobile ? 'column' : 'row',
            }}
          >
            <Link
              to="/booking"
              style={{
                ...primaryButtonStyle,
                width: responsive.buttonWidth,
                textAlign: 'center',
              }}
            >
              Fillo rezervimin
            </Link>

            <Link
              to="/decorations"
              style={{
                ...secondaryButtonStyle,
                width: responsive.buttonWidth,
                textAlign: 'center',
              }}
            >
              Kthehu te dekorimet
            </Link>
          </div>
        </div>
      </section>

      <ScrollToTopButton />
    </main>
  );
}

const pageStyle: CSSProperties = {
  background:
    'linear-gradient(180deg, #fffaf2 0%, #f7f4ef 38%, #ffffff 100%)',
  minHeight: '100vh',
};

const introStripStyle: CSSProperties = {
  padding: '28px 24px 12px',
};

const introStripInnerStyle: CSSProperties = {
  maxWidth: '1320px',
  margin: '0 auto',
  display: 'grid',
  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  gap: '20px',
};

const introCardStyle: CSSProperties = {
  background: 'rgba(255, 255, 255, 0.92)',
  border: '1px solid #ece6dc',
  borderRadius: '22px',
  padding: '22px',
  boxShadow: '0 14px 32px rgba(15, 23, 42, 0.06)',
  backdropFilter: 'blur(10px)',
};

const introIconStyle: CSSProperties = {
  width: 42,
  height: 42,
  borderRadius: '50%',
  background: '#fff3d6',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '21px',
  marginBottom: '14px',
};

const introCardTitleStyle: CSSProperties = {
  margin: '0 0 10px',
  color: '#111827',
  fontSize: '20px',
  fontWeight: 800,
};

const introCardTextStyle: CSSProperties = {
  margin: 0,
  color: '#667085',
  fontSize: '15px',
  lineHeight: 1.75,
};

const sectionStyle: CSSProperties = {
  maxWidth: '1320px',
  margin: '0 auto',
  padding: '56px 24px 80px',
};

const headingWrapStyle: CSSProperties = {
  textAlign: 'center',
  maxWidth: '790px',
  margin: '0 auto 36px',
};

const eyebrowStyle: CSSProperties = {
  margin: '0 0 10px',
  color: '#d99a1d',
  letterSpacing: '0.16em',
  fontWeight: 800,
  fontSize: '13px',
};

const titleStyle: CSSProperties = {
  margin: '0 0 14px',
  color: '#111827',
  fontSize: 'clamp(34px, 4vw, 50px)',
  fontWeight: 900,
  lineHeight: 1.08,
};

const textStyle: CSSProperties = {
  margin: 0,
  color: '#667085',
  lineHeight: 1.75,
  fontSize: '17px',
};

const subcategoryGridStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: '24px',
};

const galleryGridStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  gap: '22px',
};

const galleryLinkStyle: CSSProperties = {
  textDecoration: 'none',
  color: 'inherit',
  display: 'block',
};

const ctaSectionStyle: CSSProperties = {
  padding: '0 24px 84px',
};

const ctaBoxStyle: CSSProperties = {
  maxWidth: '980px',
  margin: '0 auto',
  textAlign: 'center',
  background:
    'linear-gradient(135deg, rgba(255,255,255,0.96), rgba(255,247,232,0.96))',
  border: '1px solid #ece6dc',
  borderRadius: '28px',
  padding: '42px 24px',
  boxShadow: '0 18px 42px rgba(15, 23, 42, 0.07)',
};

const ctaEyebrowStyle: CSSProperties = {
  margin: '0 0 10px',
  color: '#d99a1d',
  letterSpacing: '0.16em',
  fontWeight: 800,
  fontSize: '13px',
};

const ctaTitleStyle: CSSProperties = {
  margin: '0 0 14px',
  color: '#111827',
  fontSize: 'clamp(30px, 4vw, 46px)',
  fontWeight: 900,
  lineHeight: 1.08,
};

const ctaTextStyle: CSSProperties = {
  margin: '0 auto',
  maxWidth: '720px',
  color: '#667085',
  fontSize: '16px',
  lineHeight: 1.8,
};

const ctaButtonsStyle: CSSProperties = {
  marginTop: '26px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '14px',
  flexWrap: 'wrap',
};

const primaryButtonStyle: CSSProperties = {
  textDecoration: 'none',
  background: '#d99a1d',
  color: '#111827',
  fontWeight: 900,
  padding: '15px 24px',
  borderRadius: '999px',
  fontSize: '15px',
  boxShadow: '0 12px 24px rgba(217, 154, 29, 0.28)',
};

const secondaryButtonStyle: CSSProperties = {
  textDecoration: 'none',
  background: '#ffffff',
  color: '#111827',
  border: '1px solid #d7dce5',
  fontWeight: 800,
  padding: '15px 24px',
  borderRadius: '999px',
  fontSize: '15px',
};