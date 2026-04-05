import { Link } from 'react-router-dom';

const serviceCards = [
  {
    title: 'Decorations',
    description:
      'Elegant setups for weddings, birthdays, engagements, anniversaries, and grand openings.',
    image:
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80',
    to: '/decorations',
  },
  {
    title: 'Mascot Characters',
    description:
      'Over 50 unique mascot characters to bring joy and excitement to every celebration.',
    image:
      'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1200&q=80',
    to: '/mascots',
  },
  {
    title: 'Activities & Entertainment',
    description:
      'Face painting, bounce houses, ball houses, and music for unforgettable fun.',
    image:
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    to: '/activities',
  },
  {
    title: 'Photo Experiences',
    description:
      '360° Photo Booth and photo box stations to capture every special moment.',
    image:
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80',
    to: '/photobooth',
  },
];

const reasons = [
  {
    title: 'Premium Quality',
    text: 'Every detail is meticulously planned with the highest quality materials and execution.',
  },
  {
    title: 'Exclusive Attractions',
    text: 'We are the only provider in Kosovo offering select entertainment attractions.',
  },
  {
    title: 'Custom Packages',
    text: 'Build your perfect event by combining services, mascots, and activities your way.',
  },
];

export default function HomePage() {
  return (
    <main style={pageStyle}>
      <section style={heroSectionStyle}>
        <div style={heroOverlayStyle} />

        <div style={heroContainerStyle}>
          <p style={heroEyebrowStyle}>PREMIUM EVENT SERVICES IN KOSOVO</p>

          <h1 style={heroTitleStyle}>
            Creating Extraordinary
            <br />
            Events & Celebrations
          </h1>

          <p style={heroTextStyle}>
            From elegant decorations to captivating entertainment — we craft
            bespoke experiences that make every occasion truly memorable.
          </p>

          <div style={heroButtonsStyle}>
            <Link to="/packages" style={primaryButtonStyle}>
              Explore Our Packages
            </Link>

            <Link to="/booking" style={secondaryButtonStyle}>
              Book an Event
            </Link>
          </div>
        </div>
      </section>

      <section style={statsSectionStyle}>
        <div style={statsCardStyle}>
          <div style={statItemStyle}>
            <div style={statIconStyle}>◌</div>
            <h3 style={statNumberStyle}>5,000+</h3>
            <p style={statLabelStyle}>Happy Clients</p>
          </div>

          <div style={statItemStyle}>
            <div style={statIconStyle}>☆</div>
            <h3 style={statNumberStyle}>200+</h3>
            <p style={statLabelStyle}>5-Star Reviews</p>
          </div>

          <div style={statItemStyle}>
            <div style={statIconStyle}>⌘</div>
            <h3 style={statNumberStyle}>800+</h3>
            <p style={statLabelStyle}>Events Delivered</p>
          </div>
        </div>
      </section>

      <section style={sectionStyle}>
        <div style={sectionHeadingStyle}>
          <p style={sectionEyebrowStyle}>WHAT WE OFFER</p>
          <h2 style={sectionTitleStyle}>Our Services</h2>
          <p style={sectionTextStyle}>
            Select a category to explore our full range of professional event services.
          </p>
        </div>

        <div style={servicesGridStyle}>
          {serviceCards.map((card) => (
            <Link key={card.title} to={card.to} style={serviceCardLinkStyle}>
              <article
                style={{
                  ...serviceCardStyle,
                  backgroundImage: `linear-gradient(180deg, rgba(17,24,39,0.08) 0%, rgba(17,24,39,0.72) 100%), url(${card.image})`,
                }}
              >
                <div style={serviceCardContentStyle}>
                  <h3 style={serviceCardTitleStyle}>{card.title}</h3>
                  <p style={serviceCardTextStyle}>{card.description}</p>
                  <span style={serviceCardActionStyle}>Explore →</span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>

      <section style={whySectionStyle}>
        <div style={sectionHeadingStyle}>
          <p style={{ ...sectionEyebrowStyle, color: '#d99a1d' }}>WHY CHOOSE US</p>
          <h2 style={{ ...sectionTitleStyle, color: '#ffffff' }}>
            The MD Creative Difference
          </h2>
        </div>

        <div style={reasonsGridStyle}>
          {reasons.map((item) => (
            <div key={item.title} style={reasonCardStyle}>
              <div style={reasonIconStyle}>✓</div>
              <h3 style={reasonTitleStyle}>{item.title}</h3>
              <p style={reasonTextStyle}>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={noticeSectionStyle}>
        <div style={noticeBoxStyle}>
          <div style={noticeIconStyle}>⌚</div>
          <h2 style={noticeTitleStyle}>Peak Season Notice</h2>
          <p style={noticeTextStyle}>
            June, July, August, and September are peak season months. Please book at
            least 1 week in advance to secure your preferred date.
          </p>
        </div>
      </section>

      <section style={ctaSectionStyle}>
        <div style={ctaBoxStyle}>
          <h2 style={ctaTitleStyle}>
            Ready to Create Something
            <br />
            Extraordinary?
          </h2>

          <p style={ctaTextStyle}>
            Let us bring your vision to life. Choose a package, customize your services,
            and leave the rest to us.
          </p>

          <div style={ctaButtonsStyle}>
            <Link to="/booking" style={primaryButtonStyle}>
              Start Planning Your Event
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
    'url(https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1600&q=80)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};

const heroOverlayStyle: React.CSSProperties = {
  position: 'absolute',
  inset: 0,
  background:
    'linear-gradient(180deg, rgba(15,23,42,0.58) 0%, rgba(15,23,42,0.48) 52%, rgba(247,244,239,0.88) 100%)',
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

const servicesGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: '24px',
};

const serviceCardLinkStyle: React.CSSProperties = {
  textDecoration: 'none',
};

const serviceCardStyle: React.CSSProperties = {
  minHeight: '360px',
  borderRadius: '20px',
  overflow: 'hidden',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  display: 'flex',
  alignItems: 'end',
};

const serviceCardContentStyle: React.CSSProperties = {
  width: '100%',
  padding: '22px 22px 24px',
};

const serviceCardTitleStyle: React.CSSProperties = {
  margin: '0 0 10px',
  color: '#ffffff',
  fontSize: '28px',
  fontWeight: 800,
  lineHeight: 1.08,
};

const serviceCardTextStyle: React.CSSProperties = {
  margin: '0 0 14px',
  color: 'rgba(255,255,255,0.88)',
  fontSize: '16px',
  lineHeight: 1.7,
  maxWidth: '520px',
};

const serviceCardActionStyle: React.CSSProperties = {
  color: '#d99a1d',
  fontSize: '17px',
  fontWeight: 800,
};

const whySectionStyle: React.CSSProperties = {
  marginTop: '36px',
  background: '#1f2f4f',
  padding: '72px 24px',
};

const reasonsGridStyle: React.CSSProperties = {
  maxWidth: '1200px',
  margin: '0 auto',
  display: 'grid',
  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  gap: '24px',
};

const reasonCardStyle: React.CSSProperties = {
  textAlign: 'center',
  padding: '10px 14px',
};

const reasonIconStyle: React.CSSProperties = {
  width: '52px',
  height: '52px',
  margin: '0 auto 16px',
  borderRadius: '999px',
  border: '2px solid #d99a1d',
  color: '#d99a1d',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '24px',
  fontWeight: 800,
};

const reasonTitleStyle: React.CSSProperties = {
  margin: '0 0 10px',
  color: '#ffffff',
  fontSize: '22px',
  fontWeight: 800,
};

const reasonTextStyle: React.CSSProperties = {
  margin: 0,
  color: '#cbd5e1',
  fontSize: '16px',
  lineHeight: 1.8,
};

const noticeSectionStyle: React.CSSProperties = {
  padding: '54px 24px 12px',
};

const noticeBoxStyle: React.CSSProperties = {
  maxWidth: '820px',
  margin: '0 auto',
  textAlign: 'center',
};

const noticeIconStyle: React.CSSProperties = {
  color: '#d99a1d',
  fontSize: '22px',
  marginBottom: '8px',
};

const noticeTitleStyle: React.CSSProperties = {
  margin: '0 0 10px',
  color: '#111827',
  fontSize: 'clamp(22px, 3vw, 34px)',
  fontWeight: 800,
  lineHeight: 1.15,
};

const noticeTextStyle: React.CSSProperties = {
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