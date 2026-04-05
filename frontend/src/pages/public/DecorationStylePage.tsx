import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import DecorationEmptyState from '../../components/public/decorations/DecorationEmptyState';
import DecorationFilterBar from '../../components/public/decorations/DecorationFilterBar';
import DecorationGalleryCard from '../../components/public/decorations/DecorationGalleryCard';
import DecorationHero from '../../components/public/decorations/DecorationHero';
import {
  type DecorationFilterTag,
  getDecorationCategoryBySlug,
  getDecorationStyle,
  getDecorationSubcategory,
} from '../../data/decorations';

export default function DecorationStylePage() {
  const { categorySlug, styleSlug } = useParams<{
    categorySlug: string;
    styleSlug: string;
  }>();

  const category = categorySlug ? getDecorationCategoryBySlug(categorySlug) : null;
  const subcategory =
    categorySlug && styleSlug ? getDecorationSubcategory(categorySlug, styleSlug) : null;
  const style =
    categorySlug && styleSlug ? getDecorationStyle(categorySlug, styleSlug) : null;

  const [selectedFilter, setSelectedFilter] = useState<DecorationFilterTag | 'all'>('all');

  const filters = useMemo(() => {
    if (subcategory?.styles?.length) return [];
    if (!style) return [];

    return Array.from(new Set(style.gallery.flatMap((item) => item.tags)));
  }, [subcategory, style]);

  const filteredGallery = useMemo(() => {
    if (!style) return [];
    if (selectedFilter === 'all') return style.gallery;

    return style.gallery.filter((item) => item.tags.includes(selectedFilter));
  }, [style, selectedFilter]);

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

  if (subcategory && subcategory.styles.length) {
    return (
      <main style={pageStyle}>
        <DecorationHero
          label={subcategory.heroLabel}
          title={subcategory.heroTitle}
          text={subcategory.heroText}
          primaryText="Book This Style"
          primaryTo="/booking"
          secondaryText="View Concepts"
          secondaryTo="#content"
        />

        <section id="content" style={sectionStyle}>
          <div style={headingWrapStyle}>
            <p style={eyebrowStyle}>CURATED CONCEPTS</p>
            <h2 style={titleStyle}>Explore Our Signature Looks</h2>
            <p style={textStyle}>
              Select a visual direction that best matches your celebration.
            </p>
          </div>

          <div style={galleryGridStyle}>
            {subcategory.styles.map((item) => (
              <Link
                key={item.slug}
                to={`/decorations/${category.slug}/${item.slug}`}
                style={galleryLinkStyle}
              >
                <DecorationGalleryCard
                  title={item.title}
                  image={item.heroImage}
                  description={item.shortDescription}
                />
              </Link>
            ))}
          </div>
        </section>
      </main>
    );
  }

  if (!style) {
    return (
      <main style={pageStyle}>
        <section style={sectionStyle}>
          <DecorationEmptyState
            title="Style not found"
            message="This decoration style could not be found."
          />
        </section>
      </main>
    );
  }

  return (
    <main style={pageStyle}>
      <DecorationHero
        label={category.heroLabel}
        title={style.title}
        text={style.intro}
        primaryText="Book This Style"
        primaryTo="/booking"
        secondaryText="Explore Gallery"
        secondaryTo="#content"
      />

      <section style={highlightsSectionStyle}>
        <div style={highlightsInnerStyle}>
          <div style={highlightBoxStyle}>
            <h3 style={highlightTitleStyle}>Styled Around Your Vision</h3>
            <p style={highlightTextStyle}>
              Every setup can be adjusted to match your event mood, space, and desired details.
            </p>
          </div>

          <div style={highlightBoxStyle}>
            <h3 style={highlightTitleStyle}>Elegant Visual Presentation</h3>
            <p style={highlightTextStyle}>
              We focus on a polished look so the event feels memorable both in person and in photos.
            </p>
          </div>

          <div style={highlightBoxStyle}>
            <h3 style={highlightTitleStyle}>Final Details Live</h3>
            <p style={highlightTextStyle}>
              The design direction starts here, while full customization is completed after consultation.
            </p>
          </div>
        </div>
      </section>

      <section id="content" style={sectionStyle}>
        <div style={headingWrapStyle}>
          <p style={eyebrowStyle}>FILTER BY STYLE</p>
          <h2 style={titleStyle}>Choose the Mood You Love</h2>
          <p style={textStyle}>
            Browse the gallery and discover the visual direction that fits your event.
          </p>
        </div>

        <DecorationFilterBar
          filters={filters}
          selectedFilter={selectedFilter}
          onChange={setSelectedFilter}
        />

        {filteredGallery.length ? (
          <div style={galleryGridStyle}>
            {filteredGallery.map((item) => (
              <DecorationGalleryCard
                key={item.id}
                title={item.title}
                image={item.image}
                description={item.description}
              />
            ))}
          </div>
        ) : (
          <DecorationEmptyState
            title="No matching styles"
            message="Try another filter to explore more decoration ideas."
          />
        )}
      </section>

      <section style={bottomCtaSectionStyle}>
        <div style={bottomCtaBoxStyle}>
          <p style={bottomCtaEyebrowStyle}>READY WHEN YOU ARE</p>
          <h2 style={bottomCtaTitleStyle}>Take This Style Into Your Event</h2>
          <p style={bottomCtaTextStyle}>
            If this visual direction matches your celebration, continue to booking and we’ll shape the final setup together.
          </p>

          <div style={bottomCtaButtonsStyle}>
            <Link to="/booking" style={primaryButtonStyle}>
              Continue to Booking
            </Link>
            <Link to={`/decorations/${category.slug}`} style={secondaryButtonStyle}>
              Back to Category
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

const highlightsSectionStyle: React.CSSProperties = {
  padding: '28px 24px 12px',
};

const highlightsInnerStyle: React.CSSProperties = {
  maxWidth: '1320px',
  margin: '0 auto',
  display: 'grid',
  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  gap: '20px',
};

const highlightBoxStyle: React.CSSProperties = {
  background: '#ffffff',
  border: '1px solid #ece6dc',
  borderRadius: '20px',
  padding: '22px',
  boxShadow: '0 10px 24px rgba(15, 23, 42, 0.04)',
};

const highlightTitleStyle: React.CSSProperties = {
  margin: '0 0 10px',
  color: '#111827',
  fontSize: '21px',
  fontWeight: 800,
};

const highlightTextStyle: React.CSSProperties = {
  margin: 0,
  color: '#667085',
  lineHeight: 1.75,
  fontSize: '15px',
};

const sectionStyle: React.CSSProperties = {
  maxWidth: '1320px',
  margin: '0 auto',
  padding: '56px 24px 72px',
};

const headingWrapStyle: React.CSSProperties = {
  textAlign: 'center',
  maxWidth: '820px',
  margin: '0 auto 30px',
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

const galleryGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  gap: '22px',
};

const galleryLinkStyle: React.CSSProperties = {
  textDecoration: 'none',
};

const bottomCtaSectionStyle: React.CSSProperties = {
  padding: '0 24px 84px',
};

const bottomCtaBoxStyle: React.CSSProperties = {
  maxWidth: '980px',
  margin: '0 auto',
  textAlign: 'center',
  background: '#ffffff',
  border: '1px solid #ece6dc',
  borderRadius: '26px',
  padding: '42px 24px',
  boxShadow: '0 14px 30px rgba(15, 23, 42, 0.05)',
};

const bottomCtaEyebrowStyle: React.CSSProperties = {
  margin: '0 0 10px',
  color: '#d99a1d',
  letterSpacing: '0.16em',
  fontWeight: 700,
  fontSize: '13px',
};

const bottomCtaTitleStyle: React.CSSProperties = {
  margin: '0 0 14px',
  color: '#111827',
  fontSize: 'clamp(30px, 4vw, 46px)',
  fontWeight: 800,
  lineHeight: 1.08,
};

const bottomCtaTextStyle: React.CSSProperties = {
  margin: '0 auto',
  maxWidth: '700px',
  color: '#667085',
  fontSize: '16px',
  lineHeight: 1.8,
};

const bottomCtaButtonsStyle: React.CSSProperties = {
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