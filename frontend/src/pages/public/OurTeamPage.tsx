import { useEffect, useMemo, useState } from 'react';
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

const movingHighlights = [
  'FLUTURA HYSENI',
  'TRINGA HYSENI',
  'RINOR HYSENI',
  'ELMONDA HYSENI',
];

function useWindowWidth() {
  const [width, setWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1280
  );

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
}

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      style={{
        position: 'fixed',
        right: 20,
        bottom: 24,
        zIndex: 999,
        width: 46,
        height: 46,
        borderRadius: '50%',
        border: 'none',
        cursor: 'pointer',
        background: '#c8841a',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 8px 24px rgba(200,132,26,.35)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(12px)',
        pointerEvents: visible ? 'auto' : 'none',
        transition: 'all .28s ease',
      }}
    >
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
        <path
          d="M10 15V5M10 5L5 10M10 5L15 10"
          stroke="#fff"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

export default function OurTeamPage() {
  const [data, setData] = useState<PublicStaffResponse>(emptyData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const width = useWindowWidth();

  const isMobile = width < 640;
  const isTablet = width < 1024;

  useEffect(() => {
    async function loadStaff() {
      try {
        setLoading(true);
        setError('');
        const response = await getPublicStaff();
        setData(response);
      } catch {
        setError('Failed to load team data.');
      } finally {
        setLoading(false);
      }
    }

    loadStaff();
  }, []);

  const totalMembers = useMemo(
    () => data.stats.total_members || data.staff.length,
    [data]
  );
  const avgRating = useMemo(
    () => (data.stats.avg_rating > 0 ? Number(data.stats.avg_rating).toFixed(1) : '—'),
    [data]
  );
  const totalReviews = useMemo(() => data.stats.total_reviews || 0, [data]);

  if (loading) {
    return (
      <>
        <style>{`
          @keyframes team-spin { 
            to { transform: rotate(360deg); } 
          }
        `}</style>
        <main
          style={{
            minHeight: '70vh',
            background: '#faf7f2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                border: '3px solid #eadfce',
                borderTopColor: '#c8841a',
                animation: 'team-spin .9s linear infinite',
                margin: '0 auto 14px',
              }}
            />
            <p style={{ margin: 0, color: '#7a6a52', fontSize: 15 }}>Loading team...</p>
          </div>
        </main>
      </>
    );
  }

  if (error) {
    return (
      <main
        style={{
          minHeight: '70vh',
          background: '#faf7f2',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 24,
        }}
      >
        <div
          style={{
            background: '#fff1f1',
            color: '#991b1b',
            border: '1.5px solid #fecaca',
            borderRadius: 18,
            padding: '24px 28px',
            fontSize: 15,
            maxWidth: 540,
            textAlign: 'center',
          }}
        >
          {error}
        </div>
      </main>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@400;500;700&display=swap');

        .team-page {
          font-family: 'DM Sans', sans-serif;
          background: #faf7f2;
        }

        .team-serif {
          font-family: 'Cormorant Garamond', serif;
        }

        @keyframes team-fadeUp {
          from { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          to {   
            opacity: 1; 
            transform: translateY(0); 
          }
        }

        @keyframes team-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        .team-a1 { animation: team-fadeUp .55s ease both .05s; }
        .team-a2 { animation: team-fadeUp .55s ease both .16s; }
        .team-a3 { animation: team-fadeUp .55s ease both .28s; }
        .team-a4 { animation: team-fadeUp .55s ease both .40s; }

        .team-card {
          transition: transform .28s ease, box-shadow .28s ease;
        }

        .team-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 22px 48px rgba(26,18,11,.12) !important;
        }

        .team-btn-primary,
        .team-btn-secondary {
          transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease;
        }

        .team-btn-primary:hover,
        .team-btn-secondary:hover {
          transform: translateY(-2px);
        }

        .team-marquee-wrap {
          position: relative;
          overflow: hidden;
          border-top: 1px solid rgba(200,132,26,.14);
          border-bottom: 1px solid rgba(200,132,26,.14);
          background: linear-gradient(90deg, #1a120b 0%, #25170b 50%, #1a120b 100%);
        }

        .team-marquee-track {
          display: flex;
          width: max-content;
          animation: team-marquee 30s linear infinite;
        }

        .team-marquee-item {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          padding: 18px 22px;
          color: rgba(255,255,255,.68);
          font-size: 13px;
          font-weight: 700;
          letter-spacing: .12em;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .team-marquee-star {
          color: #c8841a;
          font-size: 12px;
          flex-shrink: 0;
        }

        @media (max-width: 639px) {
          .team-stats-grid {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }

          .team-grid {
            grid-template-columns: 1fr !important;
            gap: 18px !important;
          }

          .team-cta-actions {
            flex-direction: column;
          }

          .team-cta-actions a {
            width: 100%;
          }

          .team-marquee-item {
            padding: 15px 16px;
            font-size: 11px;
            gap: 10px;
            letter-spacing: .10em;
          }

          .team-marquee-track {
            animation-duration: 22s;
          }
        }

        @media (min-width: 640px) and (max-width: 1023px) {
          .team-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
        }
      `}</style>

      <main className="team-page">
        <section
          style={{
            position: 'relative',
            overflow: 'hidden',
            background: 'linear-gradient(135deg, #1a120b 0%, #2c1a0a 55%, #1a120b 100%)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage:
                'repeating-linear-gradient(45deg,rgba(200,132,26,.035) 0,rgba(200,132,26,.035) 1px,transparent 1px,transparent 56px)',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '38%',
              left: '50%',
              transform: 'translate(-50%,-50%)',
              width: isMobile ? 320 : 620,
              height: isMobile ? 320 : 620,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(200,132,26,.16) 0%, transparent 68%)',
              pointerEvents: 'none',
            }}
          />

          <div
            style={{
              maxWidth: 1280,
              margin: '0 auto',
              padding: isMobile ? '64px 20px 86px' : isTablet ? '84px 32px 100px' : '92px 44px 110px',
              position: 'relative',
              zIndex: 1,
              textAlign: 'center',
            }}
          >
            <div
              className="team-a1"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                background: 'rgba(200,132,26,.12)',
                border: '1px solid rgba(200,132,26,.30)',
                borderRadius: 999,
                padding: '8px 18px',
                marginBottom: 26,
              }}
            >
              <span style={{ fontSize: 16 }}>✨</span>
              <span
                style={{
                  color: '#e8b56a',
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: '.15em',
                  textTransform: 'uppercase',
                }}
              >
                THE PEOPLE BEHIND THE MAGIC
              </span>
            </div>

            <h1
              className="team-serif team-a2"
              style={{
                margin: '0 0 18px',
                color: '#fff',
                fontSize: isMobile ? '46px' : isTablet ? '64px' : '82px',
                lineHeight: 1.03,
                fontWeight: 700,
              }}
            >
              Meet Our{' '}
              <em style={{ fontStyle: 'italic', color: '#c8841a' }}>Talented</em>
              <br />
              Team
            </h1>

            <p
              className="team-a3"
              style={{
                margin: '0 auto',
                maxWidth: 720,
                color: 'rgba(255,255,255,.68)',
                fontSize: isMobile ? 16 : 18,
                lineHeight: 1.85,
              }}
            >
              Every unforgettable event starts with exceptional people. Meet the professionals
              who bring energy, creativity, care, and unforgettable moments to every celebration.
            </p>
          </div>
        </section>

        <section className="team-marquee-wrap">
          <div className="team-marquee-track">
            {[
              ...movingHighlights,
              ...movingHighlights,
              ...movingHighlights,
              ...movingHighlights,
            ].map((item, index) => (
              <div key={`${item}-${index}`} className="team-marquee-item">
                <span className="team-marquee-star">✦</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section
          style={{
            marginTop: isMobile ? '-10px' : '-2px',
            padding: isMobile ? '24px 20px 0' : '30px 32px 0',
            position: 'relative',
            zIndex: 2,
          }}
        >
          <div
            className="team-stats-grid"
            style={{
              maxWidth: 980,
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
              gap: 16,
              background: '#fff',
              border: '1.5px solid #eadfce',
              borderRadius: 26,
              padding: isMobile ? '18px' : '22px',
              boxShadow: '0 16px 42px rgba(26,18,11,.08)',
            }}
          >
            {[
              { icon: '👥', value: totalMembers, label: 'Team Members' },
              { icon: '⭐', value: avgRating, label: 'Avg Rating' },
              { icon: '💬', value: totalReviews, label: 'Total Reviews' },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  background: '#fffaf2',
                  border: '1px solid #f1e6d6',
                  borderRadius: 20,
                  padding: isMobile ? '18px 14px' : '22px 18px',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: 24, marginBottom: 8 }}>{item.icon}</div>
                <h3
                  className="team-serif"
                  style={{
                    margin: '0 0 4px',
                    color: '#1a120b',
                    fontSize: isMobile ? 32 : 40,
                    lineHeight: 1,
                    fontWeight: 700,
                  }}
                >
                  {item.value}
                </h3>
                <p
                  style={{
                    margin: 0,
                    color: '#7a6a52',
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                >
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            padding: isMobile ? '44px 20px 28px' : '62px 32px 34px',
          }}
        >
          <div style={{ textAlign: 'center', maxWidth: 780, margin: '0 auto 34px' }}>
            <p
              style={{
                margin: '0 0 10px',
                color: '#c8841a',
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '.16em',
                textTransform: 'uppercase',
              }}
            >
              OUR PROFESSIONALS
            </p>

            <h2
              className="team-serif"
              style={{
                margin: '0 0 12px',
                color: '#1a120b',
                fontSize: isMobile ? '36px' : isTablet ? '48px' : '58px',
                lineHeight: 1.08,
                fontWeight: 700,
              }}
            >
              Experts In Every Detail
            </h2>

            <p
              style={{
                margin: 0,
                color: '#7a6a52',
                fontSize: isMobile ? 15 : 17,
                lineHeight: 1.85,
              }}
            >
              Meet the team members who help make each event elegant, joyful, and memorable.
            </p>
          </div>

          {data.staff.length === 0 ? (
            <div
              style={{
                maxWidth: 760,
                margin: '0 auto',
                textAlign: 'center',
                padding: isMobile ? '42px 22px' : '56px 26px',
                background: '#fff',
                borderRadius: 24,
                border: '1.5px solid #eadfce',
                boxShadow: '0 10px 30px rgba(26,18,11,.05)',
              }}
            >
              <div style={{ fontSize: 42, marginBottom: 12 }}>✨</div>
              <h3
                className="team-serif"
                style={{
                  margin: '0 0 10px',
                  color: '#1a120b',
                  fontSize: 32,
                  fontWeight: 700,
                }}
              >
                Team Coming Soon
              </h3>
              <p
                style={{
                  margin: 0,
                  color: '#7a6a52',
                  fontSize: 16,
                  lineHeight: 1.8,
                }}
              >
                Our team profiles are being prepared. Check back soon.
              </p>
            </div>
          ) : (
            <div
              className="team-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                gap: 22,
              }}
            >
              {data.staff.map((member, index) => {
                const fallbackImage =
                  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=80';

                return (
                  <article
                    key={member.id}
                    className="team-card"
                    style={{
                      background: '#fff',
                      borderRadius: 24,
                      overflow: 'hidden',
                      border: '1.5px solid #eadfce',
                      boxShadow: '0 8px 24px rgba(26,18,11,.06)',
                      display: 'flex',
                      flexDirection: 'column',
                      animation: `team-fadeUp .55s ease both ${0.08 * (index + 1)}s`,
                    }}
                  >
                    <div
                      style={{
                        height: isMobile ? 260 : 320,
                        backgroundImage: `linear-gradient(180deg, rgba(17,24,39,0.05) 0%, rgba(17,24,39,0.18) 100%), url(${member.image_url || fallbackImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />

                    <div
                      style={{
                        padding: isMobile ? '18px 16px 18px' : '22px 20px 22px',
                        display: 'flex',
                        flexDirection: 'column',
                        flex: 1,
                      }}
                    >
                      <h3
                        className="team-serif"
                        style={{
                          margin: '0 0 6px',
                          color: '#1a120b',
                          fontSize: isMobile ? 28 : 34,
                          lineHeight: 1.08,
                          fontWeight: 700,
                        }}
                      >
                        {member.full_name}
                      </h3>

                      <p
                        style={{
                          margin: '0 0 14px',
                          color: '#c8841a',
                          fontSize: 14,
                          fontWeight: 700,
                          letterSpacing: '.06em',
                          textTransform: 'uppercase',
                        }}
                      >
                        {member.role}
                      </p>

                      <p
                        style={{
                          margin: '0 0 18px',
                          color: '#7a6a52',
                          fontSize: 14,
                          lineHeight: 1.8,
                          flex: 1,
                        }}
                      >
                        {member.bio ||
                          'Dedicated to creating memorable events with care, professionalism, and creativity.'}
                      </p>

                      {(member.email || member.phone) && (
                        <div
                          style={{
                            borderTop: '1px solid #efe6d8',
                            paddingTop: 14,
                            display: 'grid',
                            gap: 6,
                          }}
                        >
                          {member.email && (
                            <p
                              style={{
                                margin: 0,
                                color: '#5e5140',
                                fontSize: 13,
                                wordBreak: 'break-word',
                                lineHeight: 1.6,
                              }}
                            >
                              {member.email}
                            </p>
                          )}
                          {member.phone && (
                            <p
                              style={{
                                margin: 0,
                                color: '#5e5140',
                                fontSize: 13,
                                wordBreak: 'break-word',
                                lineHeight: 1.6,
                              }}
                            >
                              {member.phone}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        <section style={{ padding: isMobile ? '10px 20px 72px' : '20px 32px 96px' }}>
          <div
            style={{
              maxWidth: 1180,
              margin: '0 auto',
              background: 'linear-gradient(135deg, #1a120b 0%, #2c1a0a 100%)',
              borderRadius: 28,
              padding: isMobile ? '42px 20px' : isTablet ? '54px 30px' : '68px 48px',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: -60,
                right: -60,
                width: 280,
                height: 280,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(200,132,26,.18) 0%, transparent 70%)',
                pointerEvents: 'none',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: -40,
                left: -40,
                width: 220,
                height: 220,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(200,132,26,.12) 0%, transparent 70%)',
                pointerEvents: 'none',
              }}
            />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>✦</div>

              <p
                style={{
                  margin: '0 0 10px',
                  color: '#c8841a',
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: '.16em',
                  textTransform: 'uppercase',
                }}
              >
                SHARE YOUR EXPERIENCE
              </p>

              <h2
                className="team-serif"
                style={{
                  margin: '0 0 14px',
                  color: '#fff',
                  fontSize: isMobile ? '32px' : isTablet ? '44px' : '54px',
                  lineHeight: 1.08,
                  fontWeight: 700,
                }}
              >
                Want to Rate Our Team?
              </h2>

              <p
                style={{
                  margin: '0 auto 28px',
                  maxWidth: 640,
                  color: 'rgba(255,255,255,.65)',
                  fontSize: isMobile ? 15 : 16,
                  lineHeight: 1.85,
                }}
              >
                Sign in and complete a booking to share your experience and let others know how our
                team made your event special.
              </p>

              <div
                className="team-cta-actions"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: 14,
                  flexWrap: 'wrap',
                }}
              >
                <Link
                  to="/reviews"
                  className="team-btn-primary"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textDecoration: 'none',
                    background: '#c8841a',
                    color: '#fff',
                    padding: '15px 28px',
                    borderRadius: 999,
                    fontWeight: 700,
                    fontSize: 15,
                    boxShadow: '0 8px 24px rgba(200,132,26,.35)',
                  }}
                >
                  See Reviews
                </Link>

                <Link
                  to="/booking"
                  className="team-btn-secondary"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textDecoration: 'none',
                    background: 'rgba(255,255,255,.08)',
                    color: '#fff',
                    padding: '15px 28px',
                    borderRadius: 999,
                    fontWeight: 700,
                    fontSize: 15,
                    border: '1px solid rgba(255,255,255,.18)',
                  }}
                >
                  Book an Event
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <ScrollToTop />
    </>
  );
}