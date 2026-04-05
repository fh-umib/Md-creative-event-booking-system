import React, { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';

export default function PublicLayout() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Decorations', path: '/decorations' },
    { label: 'Mascots', path: '/mascots' },
    { label: 'Activities', path: '/activities' },
    { label: 'Photo Booth', path: '/photo-booth' },
    { label: 'Packages', path: '/packages' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Our Team', path: '/our-team' },
    { label: 'Reviews', path: '/reviews' },
    { label: 'Admin', path: '/admin/login' },
  ];

  useEffect(() => {
    const closeOnOutside = () => setIsMenuOpen(false);
    if (isMenuOpen) {
      window.addEventListener('click', closeOnOutside);
    }
    return () => window.removeEventListener('click', closeOnOutside);
  }, [isMenuOpen]);

  return (
    <div style={pageStyle}>
      <header style={headerStyle}>
        <Link to="/" style={brandStyle}>
          <div style={logoBoxStyle}>MD</div>
          <div style={brandTextWrapperStyle}>
            <span style={brandTextStyle}>Creative</span>
            <span style={brandSubtleStyle}>Event Services</span>
          </div>
        </Link>

        <div style={actionsWrapperStyle}>
          <button
            type="button"
            style={bookNowButtonStyle}
            onClick={() => navigate('/booking')}
          >
            Book Now
          </button>

          <button
            type="button"
            style={signInButtonStyle}
            onClick={() => navigate('/signin')}
          >
            Sign In
          </button>

          <div style={menuContainerStyle} onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              style={menuButtonStyle}
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              ☰ Menu
            </button>

            {isMenuOpen && (
              <div style={dropdownMenuStyle}>
                <div style={dropdownHeaderStyle}>
                  <div>
                    <div style={dropdownTitleStyle}>Menu</div>
                    <div style={dropdownSubtitleStyle}>MD Creative</div>
                  </div>

                  <button
                    type="button"
                    style={closeButtonStyle}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    ✕
                  </button>
                </div>

                <nav style={dropdownNavStyle}>
                  {navItems.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      style={({ isActive }) => ({
                        ...dropdownLinkStyle,
                        ...(isActive ? activeDropdownLinkStyle : {}),
                      })}
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </nav>
              </div>
            )}
          </div>
        </div>
      </header>

      <main style={mainStyle}>
        <Outlet />
      </main>

      <footer style={footerStyle}>
        <div style={footerTopStyle}>
          <div style={footerBrandColumnStyle}>
            <div style={footerLogoRowStyle}>
              <div style={footerLogoBoxStyle}>MD</div>
              <div style={footerBrandNameStyle}>Creative</div>
            </div>

            <p style={footerDescriptionStyle}>
              Premium event services in Kosovo. Elegant decorations, mascot
              entertainment, activities and unforgettable celebrations for every
              special moment.
            </p>

            <div style={socialRowStyle}>
              <div style={socialIconStyle}>ig</div>
              <div style={socialIconStyle}>fb</div>
            </div>
          </div>

          <div style={footerColumnStyle}>
            <h4 style={footerHeadingStyle}>Services</h4>
            <div style={footerLinksColumnStyle}>
              <Link to="/decorations" style={footerLinkStyle}>
                Decorations
              </Link>
              <Link to="/mascots" style={footerLinkStyle}>
                Mascot Characters
              </Link>
              <Link to="/activities" style={footerLinkStyle}>
                Activities
              </Link>
              <Link to="/photo-booth" style={footerLinkStyle}>
                Photo Experiences
              </Link>
              <Link to="/packages" style={footerLinkStyle}>
                Event Packages
              </Link>
            </div>
          </div>

          <div style={footerColumnStyle}>
            <h4 style={footerHeadingStyle}>Company</h4>
            <div style={footerLinksColumnStyle}>
              <Link to="/gallery" style={footerLinkStyle}>
                Event Gallery
              </Link>
              <Link to="/our-team" style={footerLinkStyle}>
                Our Team
              </Link>
              <Link to="/reviews" style={footerLinkStyle}>
                Client Reviews
              </Link>
              <Link to="/booking" style={footerLinkStyle}>
                Book an Event
              </Link>
              <Link to="/signin" style={footerLinkStyle}>
                My Account
              </Link>
            </div>
          </div>

          <div style={footerColumnStyle}>
            <h4 style={footerHeadingStyle}>Contact</h4>
            <div style={contactListStyle}>
              <div style={contactItemStyle}>
                <span style={contactBadgeStyle}>☎</span>
                <span style={contactTextStyle}>+383 4X XXX XXX</span>
              </div>
              <div style={contactItemStyle}>
                <span style={contactBadgeStyle}>✉</span>
                <span style={contactTextStyle}>info@mdcreative.com</span>
              </div>
              <div style={contactItemStyle}>
                <span style={contactBadgeStyle}>⌂</span>
                <span style={contactTextStyle}>Prishtina, Kosovo</span>
              </div>
            </div>
          </div>
        </div>

        <div style={footerNoticeStyle}>
          <span style={noticeIconStyle}>📅</span>
          <span>
            June, July, August, and September are peak season months. Please
            book at least 1 week in advance.
          </span>
        </div>

        <div style={footerBottomStyle}>
          <span>© 2026 MD Creative — All rights reserved.</span>
          <span>Premium event services in Kosovo</span>
        </div>
      </footer>
    </div>
  );
}

const sharedFontFamily =
  '"Playfair Display", "Georgia", "Times New Roman", serif';

const pageStyle: React.CSSProperties = {
  minHeight: '100vh',
  backgroundColor: '#f8f6f2',
  fontFamily: sharedFontFamily,
};

const headerStyle: React.CSSProperties = {
  height: '84px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 24px',
  backgroundColor: '#ffffff',
  borderBottom: '1px solid #ebe5db',
  position: 'sticky',
  top: 0,
  zIndex: 1000,
};

const brandStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  textDecoration: 'none',
  flexShrink: 0,
};

const logoBoxStyle: React.CSSProperties = {
  width: '56px',
  height: '56px',
  borderRadius: '18px',
  backgroundColor: '#d89b12',
  color: '#0f1b3d',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '22px',
  fontWeight: 800,
  letterSpacing: '0.5px',
  boxShadow: '0 8px 18px rgba(216, 155, 18, 0.18)',
};

const brandTextWrapperStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  lineHeight: 1,
};

const brandTextStyle: React.CSSProperties = {
  fontSize: '18px',
  fontWeight: 700,
  color: '#c88d12',
  letterSpacing: '0.3px',
};

const brandSubtleStyle: React.CSSProperties = {
  marginTop: '4px',
  fontSize: '10px',
  fontWeight: 600,
  color: '#a28f6a',
  letterSpacing: '1.2px',
  textTransform: 'uppercase',
};

const actionsWrapperStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  flexWrap: 'wrap',
  position: 'relative',
};

const bookNowButtonStyle: React.CSSProperties = {
  border: 'none',
  borderRadius: '999px',
  backgroundColor: '#d89b12',
  color: '#0f1b3d',
  fontSize: '14px',
  fontWeight: 700,
  padding: '14px 22px',
  cursor: 'pointer',
  fontFamily: sharedFontFamily,
  boxShadow: '0 8px 18px rgba(216, 155, 18, 0.16)',
};

const signInButtonStyle: React.CSSProperties = {
  border: '1px solid #ddd6c8',
  borderRadius: '999px',
  backgroundColor: '#ffffff',
  color: '#1f2937',
  fontSize: '14px',
  fontWeight: 700,
  padding: '14px 20px',
  cursor: 'pointer',
  fontFamily: sharedFontFamily,
};

const menuContainerStyle: React.CSSProperties = {
  position: 'relative',
};

const menuButtonStyle: React.CSSProperties = {
  border: 'none',
  borderRadius: '14px',
  backgroundColor: '#c9951a',
  color: '#ffffff',
  padding: '13px 16px',
  fontSize: '13px',
  fontWeight: 700,
  cursor: 'pointer',
  fontFamily: sharedFontFamily,
};

const dropdownMenuStyle: React.CSSProperties = {
  position: 'absolute',
  top: 'calc(100% + 12px)',
  right: 0,
  width: '290px',
  maxHeight: '70vh',
  overflowY: 'auto',
  backgroundColor: '#ffffff',
  border: '1px solid #ebe5db',
  borderRadius: '18px',
  boxShadow: '0 18px 40px rgba(15, 23, 42, 0.12)',
  padding: '16px',
  zIndex: 1200,
};

const dropdownHeaderStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: '12px',
  paddingBottom: '12px',
  borderBottom: '1px solid #f0e9dd',
  marginBottom: '12px',
};

const dropdownTitleStyle: React.CSSProperties = {
  fontSize: '18px',
  fontWeight: 700,
  color: '#0f1b3d',
};

const dropdownSubtitleStyle: React.CSSProperties = {
  marginTop: '4px',
  fontSize: '12px',
  color: '#8b7d65',
};

const closeButtonStyle: React.CSSProperties = {
  border: 'none',
  background: 'transparent',
  color: '#7a6e59',
  fontSize: '18px',
  fontWeight: 700,
  cursor: 'pointer',
  fontFamily: sharedFontFamily,
};

const dropdownNavStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
};

const dropdownLinkStyle: React.CSSProperties = {
  textDecoration: 'none',
  color: '#2a2a2a',
  fontSize: '14px',
  fontWeight: 700,
  padding: '12px 13px',
  borderRadius: '12px',
  backgroundColor: '#f8f4ec',
  transition: '0.2s ease',
};

const activeDropdownLinkStyle: React.CSSProperties = {
  backgroundColor: '#d89b12',
  color: '#ffffff',
};

const mainStyle: React.CSSProperties = {
  minHeight: 'calc(100vh - 84px)',
};

const footerStyle: React.CSSProperties = {
  marginTop: '40px',
  backgroundColor: '#f4efe6',
  borderTop: '1px solid #e6ddcf',
};

const footerTopStyle: React.CSSProperties = {
  maxWidth: '1280px',
  margin: '0 auto',
  padding: '48px 24px 34px',
  display: 'grid',
  gridTemplateColumns: '1.3fr 1fr 1fr 1fr',
  gap: '40px',
};

const footerBrandColumnStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
};

const footerLogoRowStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  marginBottom: '18px',
};

const footerLogoBoxStyle: React.CSSProperties = {
  width: '46px',
  height: '46px',
  borderRadius: '14px',
  backgroundColor: '#d89b12',
  color: '#0f1b3d',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 800,
  fontSize: '18px',
};

const footerBrandNameStyle: React.CSSProperties = {
  fontSize: '24px',
  fontWeight: 700,
  color: '#c88d12',
};

const footerDescriptionStyle: React.CSSProperties = {
  margin: 0,
  fontSize: '15px',
  lineHeight: 1.8,
  color: '#5e5a54',
  maxWidth: '360px',
};

const socialRowStyle: React.CSSProperties = {
  display: 'flex',
  gap: '12px',
  marginTop: '22px',
};

const socialIconStyle: React.CSSProperties = {
  width: '42px',
  height: '42px',
  borderRadius: '50%',
  backgroundColor: '#fffaf2',
  border: '1px solid #eadfcd',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#b68417',
  fontSize: '14px',
  fontWeight: 700,
};

const footerColumnStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
};

const footerHeadingStyle: React.CSSProperties = {
  margin: '0 0 18px 0',
  fontSize: '20px',
  fontWeight: 700,
  color: '#1f2937',
};

const footerLinksColumnStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '14px',
};

const footerLinkStyle: React.CSSProperties = {
  textDecoration: 'none',
  color: '#5e5a54',
  fontSize: '16px',
  fontWeight: 500,
};

const contactListStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '18px',
};

const contactItemStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '14px',
};

const contactBadgeStyle: React.CSSProperties = {
  width: '40px',
  height: '40px',
  borderRadius: '12px',
  backgroundColor: '#fffaf2',
  border: '1px solid #eadfcd',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#b68417',
  fontSize: '15px',
};

const contactTextStyle: React.CSSProperties = {
  fontSize: '16px',
  color: '#5e5a54',
};

const footerNoticeStyle: React.CSSProperties = {
  borderTop: '1px solid #e6ddcf',
  borderBottom: '1px solid #e6ddcf',
  padding: '18px 24px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',
  color: '#b68417',
  fontSize: '16px',
  fontWeight: 600,
  textAlign: 'center',
};

const noticeIconStyle: React.CSSProperties = {
  fontSize: '18px',
};

const footerBottomStyle: React.CSSProperties = {
  maxWidth: '1280px',
  margin: '0 auto',
  padding: '18px 24px 24px',
  display: 'flex',
  justifyContent: 'space-between',
  gap: '16px',
  flexWrap: 'wrap',
  color: '#817b72',
  fontSize: '14px',
};