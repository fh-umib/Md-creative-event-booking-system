import { Link, Outlet, useLocation } from 'react-router-dom';

export default function PublicLayout() {
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/packages', label: 'Packages' },
    { to: '/mascots', label: 'Mascots' },
    { to: '/booking', label: 'Booking' },
    { to: '/reviews', label: 'Reviews' },
    { to: '/login', label: 'Admin' },
  ];

  const footerLinks = {
    services: [
      { to: '/decorations', label: 'Decorations' },
      { to: '/mascots', label: 'Mascot Characters' },
      { to: '/activities', label: 'Activities' },
      { to: '/photobooth', label: 'Photo Booth' },
      { to: '/packages', label: 'Event Packages' },
    ],
    company: [
      { to: '/gallery', label: 'Event Gallery' },
      { to: '/team', label: 'Our Team' },
      { to: '/reviews', label: 'Client Reviews' },
      { to: '/booking', label: 'Book an Event' },
      { to: '/login', label: 'My Account' },
    ],
  };

  return (
    <div style={pageStyle}>
      <header style={headerStyle}>
        <div style={headerInnerStyle}>
          <Link to="/" style={logoStyle}>
            <span style={logoMainStyle}>MD</span>
            <span style={logoAccentStyle}> Creative</span>
          </Link>

          <nav style={navStyle}>
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;

              return (
                <Link
                  key={link.to}
                  to={link.to}
                  style={{
                    ...navLinkStyle,
                    ...(isActive ? activeNavLinkStyle : {}),
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <main style={mainStyle}>
        <Outlet />
      </main>

      <footer style={footerStyle}>
        <div style={footerTopStyle}>
          <div style={footerCtaBoxStyle}>
            <div>
              <h3 style={footerCtaTitleStyle}>Ready to create a magical event?</h3>
              <p style={footerCtaTextStyle}>
                Let us help you plan a memorable celebration with the perfect
                package, mascots, and custom add-ons.
              </p>
            </div>

            <Link to="/booking" style={footerCtaButtonStyle}>
              Book Now
            </Link>
          </div>

          <div style={footerGridStyle}>
            <div>
              <h3 style={footerBrandStyle}>
                <span style={logoMainFooterStyle}>MD</span>
                <span style={logoAccentFooterStyle}> Creative</span>
              </h3>
              <p style={footerDescriptionStyle}>
                Premium event services in Kosovo. Creating extraordinary
                celebrations for children and families with creativity, care,
                and unforgettable experiences.
              </p>

              <div style={socialRowStyle}>
                <a href="#" style={socialButtonStyle} aria-label="Instagram">
                  IG
                </a>
                <a href="#" style={socialButtonStyle} aria-label="Facebook">
                  FB
                </a>
                <a href="#" style={socialButtonStyle} aria-label="TikTok">
                  TT
                </a>
              </div>
            </div>

            <div>
              <h4 style={footerHeadingStyle}>Services</h4>
              <div style={footerLinksColumnStyle}>
                {footerLinks.services.map((link) => (
                  <Link key={link.to} to={link.to} style={footerLinkStyle}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h4 style={footerHeadingStyle}>Company</h4>
              <div style={footerLinksColumnStyle}>
                {footerLinks.company.map((link) => (
                  <Link key={link.to} to={link.to} style={footerLinkStyle}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h4 style={footerHeadingStyle}>Contact</h4>
              <div style={footerContactColumnStyle}>
                <p style={footerContactItemStyle}>+383 44 378786 </p>
                <p style={footerContactItemStyle}>mdcreative@gmail.com</p>
                <p style={footerContactItemStyle}>Prishtina, Kosovo</p>
                <p style={footerContactNoteStyle}>
                  Peak season fills quickly. We recommend booking at least one
                  week in advance.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div style={footerBottomStyle}>
          <span>© 2026 MD Creative. All rights reserved.</span>
          <span>Luxury event booking experience for kids parties and celebrations.</span>
        </div>
      </footer>
    </div>
  );
}

const pageStyle: React.CSSProperties = {
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  background: '#f7f4ef',
};

const headerStyle: React.CSSProperties = {
  position: 'sticky',
  top: 0,
  zIndex: 50,
  background: '#ffffff',
  borderBottom: '1px solid #ebe5db',
};

const headerInnerStyle: React.CSSProperties = {
  maxWidth: '1280px',
  margin: '0 auto',
  padding: '22px 28px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '24px',
};

const logoStyle: React.CSSProperties = {
  textDecoration: 'none',
  fontWeight: 800,
  fontSize: '24px',
  letterSpacing: '-0.02em',
};

const logoMainStyle: React.CSSProperties = {
  color: '#0f172a',
};

const logoAccentStyle: React.CSSProperties = {
  color: '#d99a1d',
};

const navStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '14px',
  flexWrap: 'wrap',
};

const navLinkStyle: React.CSSProperties = {
  textDecoration: 'none',
  color: '#334155',
  fontWeight: 700,
  fontSize: '16px',
  padding: '12px 18px',
  borderRadius: '16px',
  transition: 'all 0.2s ease',
};

const activeNavLinkStyle: React.CSSProperties = {
  background: '#0f172a',
  color: '#ffffff',
};

const mainStyle: React.CSSProperties = {
  flex: 1,
};

const footerStyle: React.CSSProperties = {
  background: '#1f2f4f',
  color: '#e5e7eb',
  marginTop: '60px',
};

const footerTopStyle: React.CSSProperties = {
  maxWidth: '1280px',
  margin: '0 auto',
  padding: '0 28px 0',
};

const footerCtaBoxStyle: React.CSSProperties = {
  marginTop: '-20px',
  marginBottom: '34px',
  background:
    'linear-gradient(135deg, rgba(232,174,57,0.14) 0%, rgba(255,255,255,0.05) 100%)',
  border: '1px solid rgba(232,174,57,0.24)',
  borderRadius: '24px',
  padding: '28px 30px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '24px',
};

const footerCtaTitleStyle: React.CSSProperties = {
  margin: '0 0 8px',
  color: '#ffffff',
  fontSize: '28px',
  fontWeight: 800,
};

const footerCtaTextStyle: React.CSSProperties = {
  margin: 0,
  color: '#cbd5e1',
  lineHeight: 1.7,
  maxWidth: '720px',
};

const footerCtaButtonStyle: React.CSSProperties = {
  textDecoration: 'none',
  background: '#c7922f',
  color: '#111827',
  fontWeight: 800,
  padding: '14px 22px',
  borderRadius: '16px',
  whiteSpace: 'nowrap',
};

const footerGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1.3fr 1fr 1fr 1fr',
  gap: '36px',
  padding: '10px 0 38px',
};

const footerBrandStyle: React.CSSProperties = {
  margin: '0 0 14px',
  fontSize: '34px',
  fontWeight: 800,
};

const logoMainFooterStyle: React.CSSProperties = {
  color: '#ffffff',
};

const logoAccentFooterStyle: React.CSSProperties = {
  color: '#e8ae39',
};

const footerDescriptionStyle: React.CSSProperties = {
  margin: '0 0 22px',
  color: '#cbd5e1',
  lineHeight: 1.9,
  maxWidth: '360px',
  fontSize: '16px',
};

const socialRowStyle: React.CSSProperties = {
  display: 'flex',
  gap: '12px',
};

const socialButtonStyle: React.CSSProperties = {
  width: '46px',
  height: '46px',
  borderRadius: '14px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  textDecoration: 'none',
  background: 'rgba(255,255,255,0.08)',
  color: '#ffffff',
  fontWeight: 800,
};

const footerHeadingStyle: React.CSSProperties = {
  margin: '6px 0 18px',
  color: '#ffffff',
  fontSize: '20px',
  fontWeight: 800,
};

const footerLinksColumnStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '14px',
};

const footerLinkStyle: React.CSSProperties = {
  textDecoration: 'none',
  color: '#cbd5e1',
  fontSize: '16px',
};

const footerContactColumnStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '14px',
};

const footerContactItemStyle: React.CSSProperties = {
  margin: 0,
  color: '#cbd5e1',
  fontSize: '16px',
  lineHeight: 1.7,
};

const footerContactNoteStyle: React.CSSProperties = {
  margin: '8px 0 0',
  color: '#e8ae39',
  lineHeight: 1.8,
  fontSize: '15px',
};

const footerBottomStyle: React.CSSProperties = {
  borderTop: '1px solid rgba(255,255,255,0.08)',
  padding: '20px 28px',
  maxWidth: '1280px',
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'space-between',
  gap: '20px',
  color: '#cbd5e1',
  fontSize: '15px',
};