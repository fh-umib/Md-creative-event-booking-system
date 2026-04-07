import { Link } from 'react-router-dom';

const reviewStats = [
  { label: 'Average Rating', value: '4.9', icon: '☆' },
  { label: 'Happy Clients', value: '1,200+', icon: '◌' },
  { label: 'Events Reviewed', value: '850+', icon: '⌘' },
];

const featuredReviews = [
  {
    name: 'Elira Krasniqi',
    role: 'Birthday Event Client',
    rating: 5,
    text:
      'Everything was beyond beautiful. The decoration, mascots, and entertainment were perfectly organized. The children were so happy and the whole event felt magical.',
  },
  {
    name: 'Blerim Hoxha',
    role: 'Family Celebration Client',
    rating: 5,
    text:
      'Professional service from beginning to end. Communication was excellent and the team made sure every detail was delivered exactly as promised.',
  },
  {
    name: 'Arta Berisha',
    role: 'Engagement Event Client',
    rating: 4,
    text:
      'The setup looked elegant and premium. The team was polite, punctual, and very easy to work with. We would definitely book again.',
  },
  {
    name: 'Diona Gashi',
    role: 'Kids Party Client',
    rating: 5,
    text:
      'The mascot performance and activities were the highlight of the day. The children loved every minute and the whole experience felt very special.',
  },
  {
    name: 'Gentiana Shala',
    role: 'Private Event Client',
    rating: 5,
    text:
      'A very creative and trustworthy team. They transformed our ideas into a complete event experience. Highly recommended.',
  },
  {
    name: 'Luan Mehmeti',
    role: 'Grand Opening Client',
    rating: 4,
    text:
      'The event looked professional and modern. The decorations were excellent and the team handled everything with care and confidence.',
  },
];

export default function ReviewsPage() {
  return (
    <main style={pageStyle}>
      <section style={heroSectionStyle}>
        <div style={heroOverlayStyle} />

        <div style={heroContainerStyle}>
          <p style={heroEyebrowStyle}>CLIENT EXPERIENCES & TESTIMONIALS</p>

          <h1 style={heroTitleStyle}>
            What Our Clients
            <br />
            Say About Us
          </h1>

          <p style={heroTextStyle}>
            Real feedback from people who trusted MD Creative to make their
            events memorable, elegant, and full of joy.
          </p>

          <div style={heroButtonsStyle}>
            <Link to="/booking" style={primaryButtonStyle}>
              Book Your Event
            </Link>

            <Link to="/packages" style={secondaryButtonStyle}>
              Explore Packages
            </Link>
          </div>
        </div>
      </section>

      <section style={statsSectionStyle}>
        <div style={statsCardStyle}>
          {reviewStats.map((item) => (
            <div key={item.label} style={statItemStyle}>
              <div style={statIconStyle}>{item.icon}</div>
              <h3 style={statNumberStyle}>{item.value}</h3>
              <p style={statLabelStyle}>{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={sectionStyle}>
        <div style={sectionHeadingStyle}>
          <p style={sectionEyebrowStyle}>FEATURED REVIEWS</p>
          <h2 style={sectionTitleStyle}>Trusted By Families & Clients</h2>
          <p style={sectionTextStyle}>
            These testimonials highlight the quality, creativity, and care we
            bring to every celebration.
          </p>
        </div>

        <div style={reviewsGridStyle}>
          {featuredReviews.map((review, index) => (
            <article key={`${review.name}-${index}`} style={reviewCardStyle}>
              <div style={quoteIconStyle}>“</div>

              <div style={starsStyle}>
                {Array.from({ length: review.rating }).map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>

              <p style={reviewTextStyle}>{review.text}</p>

              <div style={reviewFooterStyle}>
                <h3 style={reviewNameStyle}>{review.name}</h3>
                <p style={reviewRoleStyle}>{review.role}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section style={trustSectionStyle}>
        <div style={trustBoxStyle}>
          <div style={trustIconStyle}>✓</div>
          <h2 style={trustTitleStyle}>Why Clients Keep Choosing MD Creative</h2>
          <p style={trustTextStyle}>
            We combine premium decoration, entertainment, reliable service, and
            custom event experiences that leave lasting impressions.
          </p>
        </div>
      </section>

      <section style={ctaSectionStyle}>
        <div style={ctaBoxStyle}>
          <h2 style={ctaTitleStyle}>
            Ready to Be Our
            <br />
            Next Happy Client?
          </h2>

          <p style={ctaTextStyle}>
            Let us turn your special day into a professionally managed and
            unforgettable celebration.
          </p>

          <div style={ctaButtonsStyle}>
            <Link to="/booking" style={primaryButtonStyle}>
              Start Your Booking
            </Link>

            <a href="tel:+38344378786" style={callButtonStyle}>
              Call Us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

const pageStyle: React.CSSProperties = {
  background: '#f7f4ef',
};

const heroSectionStyle: React.CSSProperties = {
  position: 'relative',
  minHeight: '620px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '70px 24px 90px',
  backgroundImage:
    'url(https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1600&q=80)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};

const heroOverlayStyle: React.CSSProperties = {
  position: 'absolute',
  inset: 0,
  background:
    'linear-gradient(180deg, rgba(15,23,42,0.65) 0%, rgba(15,23,42,0.55) 52%, rgba(247,244,239,0.90) 100%)',
};

const heroContainerStyle: React.CSSProperties = {
  position: 'relative',
  zIndex: 1,
  maxWidth: '980px',
  margin: '0 auto',
  textAlign: 'center',
};

const heroEyebrowStyle: React.CSSProperties = {
  margin: '0 0 16px',
  color: '#ffffff',
  fontSize: '14px',
  letterSpacing: '0.16em',
  fontWeight: 600,
};

const heroTitleStyle: React.CSSProperties = {
  margin: '0 0 18px',
  color: '#ffffff',
  fontSize: 'clamp(42px, 6vw, 76px)',
  lineHeight: 1.02,
  fontWeight: 800,
};

const heroTextStyle: React.CSSProperties = {
  margin: '0 auto',
  maxWidth: '760px',
  color: 'rgba(255,255,255,0.9)',
  fontSize: '18px',
  lineHeight: 1.7,
};

const heroButtonsStyle: React.CSSProperties = {
  marginTop: '28px',
  display: 'flex',
  justifyContent: 'center',
  gap: '14px',
  flexWrap: 'wrap',
};

const primaryButtonStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '210px',
  padding: '15px 20px',
  borderRadius: '14px',
  background: '#d99a1d',
  color: '#111827',
  textDecoration: 'none',
  fontWeight: 800,
  fontSize: '16px',
};

const secondaryButtonStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '190px',
  padding: '15px 20px',
  borderRadius: '14px',
  background: 'rgba(255,255,255,0.08)',
  color: '#ffffff',
  textDecoration: 'none',
  fontWeight: 700,
  fontSize: '16px',
  border: '1px solid rgba(255,255,255,0.32)',
};

const statsSectionStyle: React.CSSProperties = {
  position: 'relative',
  marginTop: '-52px',
  padding: '0 24px',
};

const statsCardStyle: React.CSSProperties = {
  maxWidth: '860px',
  margin: '0 auto',
  background: '#ffffff',
  borderRadius: '22px',
  boxShadow: '0 18px 40px rgba(15,23,42,0.08)',
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '16px',
  padding: '28px 20px',
};

const statItemStyle: React.CSSProperties = {
  textAlign: 'center',
};

const statIconStyle: React.CSSProperties = {
  marginBottom: '8px',
  color: '#d99a1d',
  fontSize: '22px',
};

const statNumberStyle: React.CSSProperties = {
  margin: '0 0 6px',
  color: '#111827',
  fontSize: 'clamp(28px, 3vw, 44px)',
  fontWeight: 800,
};

const statLabelStyle: React.CSSProperties = {
  margin: 0,
  color: '#667085',
  fontSize: '16px',
};

const sectionStyle: React.CSSProperties = {
  maxWidth: '1280px',
  margin: '0 auto',
  padding: '72px 24px 30px',
};

const sectionHeadingStyle: React.CSSProperties = {
  maxWidth: '760px',
  margin: '0 auto 34px',
  textAlign: 'center',
};

const sectionEyebrowStyle: React.CSSProperties = {
  margin: '0 0 10px',
  color: '#d99a1d',
  fontSize: '14px',
  letterSpacing: '0.16em',
  fontWeight: 700,
};

const sectionTitleStyle: React.CSSProperties = {
  margin: '0 0 12px',
  color: '#111827',
  fontSize: 'clamp(34px, 4.5vw, 58px)',
  fontWeight: 800,
  lineHeight: 1.08,
};

const sectionTextStyle: React.CSSProperties = {
  margin: 0,
  color: '#667085',
  fontSize: '18px',
  lineHeight: 1.7,
};

const reviewsGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  gap: '24px',
};

const reviewCardStyle: React.CSSProperties = {
  background: '#ffffff',
  borderRadius: '20px',
  boxShadow: '0 18px 40px rgba(15,23,42,0.08)',
  padding: '28px 24px',
  display: 'flex',
  flexDirection: 'column',
  minHeight: '320px',
};

const quoteIconStyle: React.CSSProperties = {
  color: '#d99a1d',
  fontSize: '38px',
  lineHeight: 1,
};

const starsStyle: React.CSSProperties = {
  marginTop: '10px',
  color: '#d99a1d',
  fontSize: '18px',
  letterSpacing: '0.10em',
};

const reviewTextStyle: React.CSSProperties = {
  margin: '18px 0 22px',
  color: '#667085',
  fontSize: '15px',
  lineHeight: 1.9,
  flex: 1,
};

const reviewFooterStyle: React.CSSProperties = {
  paddingTop: '16px',
  borderTop: '1px solid #eceff4',
};

const reviewNameStyle: React.CSSProperties = {
  margin: '0 0 6px',
  color: '#111827',
  fontSize: '20px',
  fontWeight: 800,
};

const reviewRoleStyle: React.CSSProperties = {
  margin: 0,
  color: '#667085',
  fontSize: '14px',
};

const trustSectionStyle: React.CSSProperties = {
  padding: '54px 24px 12px',
};

const trustBoxStyle: React.CSSProperties = {
  maxWidth: '820px',
  margin: '0 auto',
  textAlign: 'center',
};

const trustIconStyle: React.CSSProperties = {
  color: '#d99a1d',
  fontSize: '22px',
  marginBottom: '8px',
};

const trustTitleStyle: React.CSSProperties = {
  margin: '0 0 10px',
  color: '#111827',
  fontSize: 'clamp(22px, 3vw, 34px)',
  fontWeight: 800,
  lineHeight: 1.15,
};

const trustTextStyle: React.CSSProperties = {
  margin: 0,
  color: '#667085',
  fontSize: '15px',
  lineHeight: 1.8,
};

const ctaSectionStyle: React.CSSProperties = {
  padding: '36px 24px 72px',
};

const ctaBoxStyle: React.CSSProperties = {
  maxWidth: '860px',
  margin: '0 auto',
  textAlign: 'center',
};

const ctaTitleStyle: React.CSSProperties = {
  margin: '0 0 14px',
  color: '#111827',
  fontSize: 'clamp(34px, 5vw, 56px)',
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

const callButtonStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '160px',
  padding: '15px 20px',
  borderRadius: '14px',
  background: '#ffffff',
  color: '#111827',
  textDecoration: 'none',
  fontWeight: 700,
  fontSize: '16px',
  border: '1px solid #d7dce5',
};