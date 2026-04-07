import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPublicStaff } from '../../services/staffService';
import type { PublicStaffResponse } from '../../types/staff';

const emptyData: PublicStaffResponse = {
  staff: [],
  stats: {
    total_members: 0,
    avg_rating: 0,
    total_reviews: 0,
  },
  reviews: [],
};

export default function OurTeamPage() {
  const [data, setData] = useState<PublicStaffResponse>(emptyData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadStaff() {
      try {
        setLoading(true);
        const response = await getPublicStaff();
        setData(response);
      } catch (err) {
        setError('Failed to load team data.');
      } finally {
        setLoading(false);
      }
    }

    loadStaff();
  }, []);

  if (loading) {
    return (
      <main style={pageStyle}>
        <div style={stateBoxStyle}>Loading team...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main style={pageStyle}>
        <div style={stateBoxStyle}>{error}</div>
      </main>
    );
  }

  return (
    <main style={pageStyle}>
      <section style={heroSectionStyle}>
        <div style={heroOverlayStyle} />

        <div style={heroContainerStyle}>
          <p style={heroEyebrowStyle}>THE PEOPLE BEHIND THE MAGIC</p>

          <h1 style={heroTitleStyle}>
            Meet Our <span style={heroAccentStyle}>Talented</span>
            <br />
            Team
          </h1>

          <p style={heroTextStyle}>
            Every unforgettable event starts with exceptional people.
          </p>
        </div>
      </section>

      <section style={statsSectionStyle}>
        <div style={statsCardStyle}>
          <div style={statItemStyle}>
            <div style={statIconStyle}>◌</div>
            <h3 style={statNumberStyle}>{data.stats.total_members}</h3>
            <p style={statLabelStyle}>Team Members</p>
          </div>

          <div style={statItemStyle}>
            <div style={statIconStyle}>☆</div>
            <h3 style={statNumberStyle}>
              {data.stats.avg_rating > 0 ? data.stats.avg_rating : '—'}
            </h3>
            <p style={statLabelStyle}>Avg Rating</p>
          </div>

          <div style={statItemStyle}>
            <div style={statIconStyle}>⌘</div>
            <h3 style={statNumberStyle}>{data.stats.total_reviews}</h3>
            <p style={statLabelStyle}>Total Reviews</p>
          </div>
        </div>
      </section>

      <section style={sectionStyle}>
        <div style={sectionHeadingStyle}>
          <p style={sectionEyebrowStyle}>OUR PROFESSIONALS</p>
          <h2 style={sectionTitleStyle}>Experts In Every Detail</h2>
          <p style={sectionTextStyle}>
            Meet the professionals who help create extraordinary celebrations.
          </p>
        </div>

        {data.staff.length === 0 ? (
          <div style={emptyStateStyle}>
            <div style={emptyIconStyle}>◌</div>
            <h3 style={emptyTitleStyle}>Team Coming Soon</h3>
            <p style={emptyTextStyle}>
              Our team profiles are being prepared. Check back soon.
            </p>
          </div>
        ) : (
          <div style={teamGridStyle}>
            {data.staff.map((member) => (
              <article key={member.id} style={teamCardStyle}>
                <div
                  style={{
                    ...teamCardImageWrapStyle,
                    backgroundImage: `linear-gradient(180deg, rgba(17,24,39,0.05) 0%, rgba(17,24,39,0.18) 100%), url(${
                      member.image_url ||
                      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=80'
                    })`,
                  }}
                />

                <div style={teamCardContentStyle}>
                  <h3 style={teamCardNameStyle}>{member.full_name}</h3>
                  <p style={teamCardRoleStyle}>{member.role}</p>
                  <p style={teamCardBioStyle}>
                    {member.bio || 'Dedicated to creating memorable events with care and creativity.'}
                  </p>

                  <div style={teamCardMetaStyle}>
                    {member.email && <p style={teamCardMetaTextStyle}>{member.email}</p>}
                    {member.phone && <p style={teamCardMetaTextStyle}>{member.phone}</p>}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section style={ctaSectionStyle}>
        <div style={ctaBoxStyle}>
          <div style={ctaIconStyle}>✦</div>

          <h2 style={ctaTitleStyle}>Want to Rate Our Team?</h2>

          <p style={ctaTextStyle}>
            Sign in and complete a booking to share your experience.
          </p>

          <div style={ctaButtonsStyle}>
            <Link to="/reviews" style={primaryButtonStyle}>
              See Reviews
            </Link>

            <Link to="/booking" style={secondaryButtonStyle}>
              Book an Event
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

const stateBoxStyle: React.CSSProperties = {
  minHeight: '70vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#111827',
  fontSize: '18px',
  padding: '24px',
};

const heroSectionStyle: React.CSSProperties = {
  position: 'relative',
  minHeight: '620px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '70px 24px 110px',
  backgroundImage:
    'url(https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1600&q=80)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};

const heroOverlayStyle: React.CSSProperties = {
  position: 'absolute',
  inset: 0,
  background:
    'linear-gradient(180deg, rgba(15,23,42,0.68) 0%, rgba(15,23,42,0.58) 52%, rgba(247,244,239,0.92) 100%)',
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

const heroAccentStyle: React.CSSProperties = {
  color: '#d99a1d',
};

const heroTextStyle: React.CSSProperties = {
  margin: '0 auto',
  maxWidth: '760px',
  color: 'rgba(255,255,255,0.9)',
  fontSize: '18px',
  lineHeight: 1.7,
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

const emptyStateStyle: React.CSSProperties = {
  maxWidth: '760px',
  margin: '0 auto',
  background: '#ffffff',
  borderRadius: '24px',
  boxShadow: '0 18px 40px rgba(15,23,42,0.06)',
  textAlign: 'center',
  padding: '56px 24px',
};

const emptyIconStyle: React.CSSProperties = {
  color: '#d99a1d',
  fontSize: '32px',
  marginBottom: '12px',
};

const emptyTitleStyle: React.CSSProperties = {
  margin: '0 0 10px',
  color: '#111827',
  fontSize: '30px',
  fontWeight: 800,
};

const emptyTextStyle: React.CSSProperties = {
  margin: 0,
  color: '#667085',
  fontSize: '16px',
  lineHeight: 1.8,
};

const teamGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  gap: '24px',
};

const teamCardStyle: React.CSSProperties = {
  background: '#ffffff',
  borderRadius: '20px',
  overflow: 'hidden',
  boxShadow: '0 18px 40px rgba(15,23,42,0.08)',
};

const teamCardImageWrapStyle: React.CSSProperties = {
  minHeight: '320px',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};

const teamCardContentStyle: React.CSSProperties = {
  padding: '22px 22px 24px',
};

const teamCardNameStyle: React.CSSProperties = {
  margin: '0 0 8px',
  color: '#111827',
  fontSize: '28px',
  fontWeight: 800,
  lineHeight: 1.08,
};

const teamCardRoleStyle: React.CSSProperties = {
  margin: '0 0 14px',
  color: '#d99a1d',
  fontSize: '16px',
  fontWeight: 800,
  letterSpacing: '0.04em',
};

const teamCardBioStyle: React.CSSProperties = {
  margin: '0 0 16px',
  color: '#667085',
  fontSize: '15px',
  lineHeight: 1.8,
  minHeight: '84px',
};

const teamCardMetaStyle: React.CSSProperties = {
  paddingTop: '14px',
  borderTop: '1px solid #eceff4',
};

const teamCardMetaTextStyle: React.CSSProperties = {
  margin: '0 0 6px',
  color: '#475467',
  fontSize: '14px',
  lineHeight: 1.6,
};

const ctaSectionStyle: React.CSSProperties = {
  padding: '36px 24px 72px',
};

const ctaBoxStyle: React.CSSProperties = {
  maxWidth: '860px',
  margin: '0 auto',
  textAlign: 'center',
  background: '#ffffff',
  borderRadius: '24px',
  boxShadow: '0 18px 40px rgba(15,23,42,0.08)',
  padding: '44px 24px',
};

const ctaIconStyle: React.CSSProperties = {
  color: '#d99a1d',
  fontSize: '28px',
  marginBottom: '10px',
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

const primaryButtonStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '190px',
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
  background: '#ffffff',
  color: '#111827',
  textDecoration: 'none',
  fontWeight: 700,
  fontSize: '16px',
  border: '1px solid #d7dce5',
};