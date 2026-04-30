import { Link, useParams } from 'react-router-dom';

import DecorationEmptyState from '../../components/public/decorations/DecorationEmptyState';
import DecorationGalleryCard from '../../components/public/decorations/DecorationGalleryCard';
import DecorationHero from '../../components/public/decorations/DecorationHero';
import DecorationSubcategoryCard from '../../components/public/decorations/DecorationSubcategoryCard';
import { getDecorationCategoryBySlug } from '../../data/decorations';

export default function DecorationCategoryPage() {
  const { categorySlug } = useParams<{ categorySlug: string }>();

  const category = categorySlug ? getDecorationCategoryBySlug(categorySlug) : null;

  if (!category) {
    return (
      <main style={pageStyle}>
        <section style={sectionStyle}>
          <DecorationEmptyState
            title="Category not found"
            message="This decoration category could not be found."
          />
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
        primaryText="Book This Category"
        primaryTo="/booking"
        secondaryText="Explore Below"
        secondaryTo="#content"
      />

      <section style={introStripStyle}>
        <div style={introStripInnerStyle}>
          <div style={introCardStyle}>
            <h3 style={introCardTitleStyle}>Elegant Concepts</h3>
            <p style={introCardTextStyle}>
              Thoughtfully styled setups that match the mood, venue, and occasion.
            </p>
          </div>

          <div style={introCardStyle}>
            <h3 style={introCardTitleStyle}>Custom Consultation</h3>
            <p style={introCardTextStyle}>
              Final details and pricing are tailored after discussing your exact vision.
            </p>
          </div>

          <div style={introCardStyle}>
            <h3 style={introCardTitleStyle}>Visual Impact</h3>
            <p style={introCardTextStyle}>
              Each setup is planned to leave a memorable first impression for your guests.
            </p>
          </div>
        </div>
      </section>

      <section id="content" style={sectionStyle}>
        {hasSubcategories ? (
          <>
            <div style={headingWrapStyle}>
              <p style={eyebrowStyle}>SUBCATEGORIES</p>
              <h2 style={titleStyle}>Choose a Style Direction</h2>
              <p style={textStyle}>
                Select the type that best matches your event and continue into the visual gallery.
              </p>
            </div>

            <div style={subcategoryGridStyle}>
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
              <p style={eyebrowStyle}>SIGNATURE STYLES</p>
              <h2 style={titleStyle}>Explore This Collection</h2>
              <p style={textStyle}>
                Browse elegant directions for this category and choose the look that fits your celebration.
              </p>
            </div>

            <div style={galleryGridStyle}>
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
          <DecorationEmptyState />
        )}
      </section>

      <section style={ctaSectionStyle}>
        <div style={ctaBoxStyle}>
          <p style={ctaEyebrowStyle}>NEXT STEP</p>
          <h2 style={ctaTitleStyle}>Let’s Shape the Perfect Look</h2>
          <p style={ctaTextStyle}>
            Once you choose the direction you like, we can continue with details,
            ideas, and the best setup for your event.
          </p>

          <div style={ctaButtonsStyle}>
            <Link to="/booking" style={primaryButtonStyle}>
              Start Booking
            </Link>
            <Link to="/decorations" style={secondaryButtonStyle}>
              Back to Categories
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

const pageStyle: React.CSSProperties = {
  background: '#f7f4ef',
};

const introStripStyle: React.CSSProperties = {
  padding: '28px 24px 12px',
};

const introStripInnerStyle: React.CSSProperties = {
  maxWidth: '1320px',
  margin: '0 auto',
  display: 'grid',
  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  gap: '20px',
};

const introCardStyle: React.CSSProperties = {
  background: '#ffffff',
  border: '1px solid #ece6dc',
  borderRadius: '20px',
  padding: '22px',
  boxShadow: '0 10px 24px rgba(15, 23, 42, 0.04)',
};

const introCardTitleStyle: React.CSSProperties = {
  margin: '0 0 10px',
  color: '#111827',
  fontSize: '21px',
  fontWeight: 800,
};

const introCardTextStyle: React.CSSProperties = {
  margin: 0,
  color: '#667085',
  fontSize: '15px',
  lineHeight: 1.75,
};

const sectionStyle: React.CSSProperties = {
  maxWidth: '1320px',
  margin: '0 auto',
  padding: '56px 24px 80px',
};

const headingWrapStyle: React.CSSProperties = {
  textAlign: 'center',
  maxWidth: '760px',
  margin: '0 auto 34px',
};

const eyebrowStyle: React.CSSProperties = {
  margin: '0 0 10px',
  color: '#d99a1d',
  letterSpacing: '0.16em',
  fontWeight: 700,
  fontSize: '13px',
};

const titleStyle: React.CSSProperties = {
  margin: '0 0 12px',
  color: '#111827',
  fontSize: 'clamp(32px, 4vw, 50px)',
  fontWeight: 800,
  lineHeight: 1.08,
};

const textStyle: React.CSSProperties = {
  margin: 0,
  color: '#667085',
  lineHeight: 1.75,
  fontSize: '17px',
};

const subcategoryGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: '24px',
};

const galleryGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  gap: '22px',
};

const galleryLinkStyle: React.CSSProperties = {
  textDecoration: 'none',
};

const ctaSectionStyle: React.CSSProperties = {
  padding: '0 24px 84px',
};

const ctaBoxStyle: React.CSSProperties = {
  maxWidth: '980px',
  margin: '0 auto',
  textAlign: 'center',
  background: '#ffffff',
  border: '1px solid #ece6dc',
  borderRadius: '26px',
  padding: '42px 24px',
  boxShadow: '0 14px 30px rgba(15, 23, 42, 0.05)',
};

const ctaEyebrowStyle: React.CSSProperties = {
  margin: '0 0 10px',
  color: '#d99a1d',
  letterSpacing: '0.16em',
  fontWeight: 700,
  fontSize: '13px',
};

const ctaTitleStyle: React.CSSProperties = {
  margin: '0 0 14px',
  color: '#111827',
  fontSize: 'clamp(30px, 4vw, 46px)',
  fontWeight: 800,
  lineHeight: 1.08,
};

const ctaTextStyle: React.CSSProperties = {
  margin: '0 auto',
  maxWidth: '700px',
  color: '#667085',
  fontSize: '16px',
  lineHeight: 1.8,
};

const ctaButtonsStyle: React.CSSProperties = {
  marginTop: '24px',
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
  padding: '15px 22px',
  borderRadius: '999px',
  fontSize: '15px',
};

const secondaryButtonStyle: React.CSSProperties = {
  textDecoration: 'none',
  background: '#ffffff',
  color: '#111827',
  border: '1px solid #d7dce5',
  fontWeight: 700,
  padding: '15px 22px',
  borderRadius: '999px',
  fontSize: '15px',
};