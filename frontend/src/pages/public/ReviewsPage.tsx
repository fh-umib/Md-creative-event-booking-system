import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const reviewStats = [
  { label: 'Vlerësimi mesatar', value: '4.9', icon: '★' },
  { label: 'Klientë të kënaqur', value: '1,200+', icon: '♡' },
  { label: 'Evente të vlerësuara', value: '850+', icon: '✦' },
];

const featuredReviews = [
  {
    name: 'Elira Krasniqi',
    role: 'Kliente e festës së ditëlindjes',
    rating: 5,
    text:
      'Gjithçka ishte më e bukur se sa e kishim imagjinuar. Dekorimi, maskotat dhe argëtimi ishin të organizuara në mënyrë perfekte. Fëmijët u kënaqën pafund dhe i gjithë eventi dukej magjik.',
  },
  {
    name: 'Blerim Hoxha',
    role: 'Klient i feste familjare',
    rating: 5,
    text:
      'Shërbim profesional nga fillimi deri në fund. Komunikimi ishte shumë i mirë dhe ekipi u kujdes që çdo detaj të realizohej ashtu siç ishte premtuar.',
  },
  {
    name: 'Arta Berisha',
    role: 'Kliente e eventit të fejesës',
    rating: 4,
    text:
      'Ambient shumë elegant dhe me pamje premium. Ekipi ishte i sjellshëm, i saktë dhe shumë i lehtë për bashkëpunim. Pa dyshim do t’ju zgjedhnim sërish.',
  },
  {
    name: 'Diona Gashi',
    role: 'Kliente e festës për fëmijë',
    rating: 5,
    text:
      'Performanca e maskotës dhe aktivitetet ishin pjesa më e bukur e ditës. Fëmijët e shijuan çdo minutë dhe e gjithë eksperienca ishte shumë e veçantë.',
  },
  {
    name: 'Gentiana Shala',
    role: 'Kliente e eventit privat',
    rating: 5,
    text:
      'Një ekip shumë kreativ dhe i besueshëm. I kthyen idetë tona në një eksperiencë të plotë dhe të bukur. I rekomandoj me shumë kënaqësi.',
  },
  {
    name: 'Luan Mehmeti',
    role: 'Klient i eventit hapës',
    rating: 4,
    text:
      'Eventi dukej profesional dhe modern. Dekorimet ishin shumë të bukura dhe ekipi e menaxhoi gjithçka me kujdes dhe siguri.',
  },
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
      aria-label="Kthehu lart"
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

export default function ReviewsPage() {
  const width = useWindowWidth();
  const isMobile = width < 640;
  const isTablet = width < 1024;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@400;500;700&display=swap');

        .reviews-page {
          font-family: 'DM Sans', sans-serif;
          background:
            radial-gradient(circle at top left, rgba(200,132,26,0.06), transparent 30%),
            radial-gradient(circle at bottom right, rgba(200,132,26,0.07), transparent 28%),
            #faf7f2;
          min-height: 100vh;
        }

        .reviews-serif {
          font-family: 'Cormorant Garamond', serif;
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .fade-1 { animation: fadeUp .55s ease both .05s; }
        .fade-2 { animation: fadeUp .55s ease both .16s; }
        .fade-3 { animation: fadeUp .55s ease both .28s; }
        .fade-4 { animation: fadeUp .55s ease both .40s; }

        .review-card {
          transition: transform .28s ease, box-shadow .28s ease, border-color .28s ease;
        }

        .review-card:hover {
          transform: translateY(-7px);
          box-shadow: 0 24px 50px rgba(26,18,11,.12) !important;
          border-color: rgba(200,132,26,.24) !important;
        }

        .stat-card {
          transition: transform .25s ease, box-shadow .25s ease;
        }

        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 36px rgba(26,18,11,.08);
        }

        .hero-button-primary,
        .hero-button-secondary,
        .cta-button-primary,
        .cta-button-secondary {
          transition: transform .2s ease, box-shadow .2s ease, background .2s ease;
        }

        .hero-button-primary:hover,
        .hero-button-secondary:hover,
        .cta-button-primary:hover,
        .cta-button-secondary:hover {
          transform: translateY(-2px);
        }

        @media (max-width: 639px) {
          .hero-buttons,
          .cta-buttons {
            flex-direction: column;
          }

          .hero-buttons a,
          .cta-buttons a {
            width: 100%;
          }

          .stats-grid {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }

          .reviews-grid {
            grid-template-columns: 1fr !important;
            gap: 18px !important;
          }

          .feature-grid {
            grid-template-columns: 1fr !important;
          }
        }

        @media (min-width: 640px) and (max-width: 1023px) {
          .reviews-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }

          .feature-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
        }
      `}</style>

      <main className="reviews-page">
        <section
          style={{
            position: 'relative',
            overflow: 'hidden',
            padding: isMobile ? '72px 20px 92px' : isTablet ? '86px 32px 108px' : '100px 44px 120px',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: -120,
              left: -80,
              width: isMobile ? 220 : 360,
              height: isMobile ? 220 : 360,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(200,132,26,.16) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              right: -100,
              top: 40,
              width: isMobile ? 220 : 420,
              height: isMobile ? 220 : 420,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(26,18,11,.07) 0%, transparent 72%)',
              pointerEvents: 'none',
            }}
          />

          <div
            style={{
              maxWidth: 1260,
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: isTablet ? '1fr' : '1.15fr .85fr',
              gap: isMobile ? 28 : 34,
              alignItems: 'center',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <div>
              <div
                className="fade-1"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  background: 'rgba(200,132,26,.10)',
                  border: '1px solid rgba(200,132,26,.24)',
                  borderRadius: 999,
                  padding: '8px 18px',
                  marginBottom: 24,
                }}
              >
                <span style={{ fontSize: 15, color: '#c8841a' }}>✦</span>
                <span
                  style={{
                    color: '#9a6a17',
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: '.16em',
                    textTransform: 'uppercase',
                  }}
                >
                  Përvoja reale nga klientët tanë
                </span>
              </div>

              <h1
                className="reviews-serif fade-2"
                style={{
                  margin: '0 0 18px',
                  color: '#1a120b',
                  fontSize: isMobile ? '48px' : isTablet ? '66px' : '86px',
                  lineHeight: 1.02,
                  fontWeight: 700,
                }}
              >
                Evente elegante,
                <br />
                <span style={{ color: '#c8841a', fontStyle: 'italic' }}>kujtime të bukura</span>
              </h1>

              <p
                className="fade-3"
                style={{
                  margin: '0 0 28px',
                  maxWidth: 700,
                  color: '#6d5f4c',
                  fontSize: isMobile ? 16 : 18,
                  lineHeight: 1.9,
                }}
              >
                Vlerësimet tona tregojnë më shumë se kënaqësi — ato pasqyrojnë besimin,
                gëzimin dhe përvojat e bukura që klientët mbajnë mend edhe pas përfundimit
                të eventit.
              </p>

              <div
                className="hero-buttons fade-4"
                style={{
                  display: 'flex',
                  gap: 14,
                  flexWrap: 'wrap',
                }}
              >
                <Link
                  to="/booking"
                  className="hero-button-primary"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: isMobile ? '100%' : 220,
                    padding: '15px 24px',
                    borderRadius: 999,
                    background: '#c8841a',
                    color: '#fff',
                    textDecoration: 'none',
                    fontWeight: 700,
                    fontSize: 15,
                    boxShadow: '0 10px 24px rgba(200,132,26,.26)',
                  }}
                >
                  Fillo rezervimin
                </Link>

                <Link
                  to="/packages"
                  className="hero-button-secondary"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: isMobile ? '100%' : 190,
                    padding: '15px 24px',
                    borderRadius: 999,
                    background: '#fff',
                    color: '#1a120b',
                    textDecoration: 'none',
                    fontWeight: 700,
                    fontSize: 15,
                    border: '1.5px solid #eadfce',
                    boxShadow: '0 8px 24px rgba(26,18,11,.05)',
                  }}
                >
                  Shiko paketat
                </Link>
              </div>
            </div>

            <div>
              <div
                className="fade-4"
                style={{
                  background: 'linear-gradient(145deg, #1a120b 0%, #2a1a0d 100%)',
                  borderRadius: 32,
                  padding: isMobile ? '24px 18px' : '30px 26px',
                  boxShadow: '0 24px 60px rgba(26,18,11,.16)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: -40,
                    right: -40,
                    width: 180,
                    height: 180,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(200,132,26,.22) 0%, transparent 70%)',
                    pointerEvents: 'none',
                  }}
                />

                <div
                  style={{
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      gap: 14,
                      marginBottom: 18,
                    }}
                  >
                    <div>
                      <p
                        style={{
                          margin: '0 0 8px',
                          color: 'rgba(255,255,255,.55)',
                          fontSize: 12,
                          letterSpacing: '.15em',
                          textTransform: 'uppercase',
                          fontWeight: 700,
                        }}
                      >
                        Mendimi juaj ka vlerë
                      </p>
                      <h3
                        className="reviews-serif"
                        style={{
                          margin: 0,
                          color: '#fff',
                          fontSize: isMobile ? 30 : 38,
                          lineHeight: 1.12,
                          fontWeight: 700,
                        }}
                      >
                        “Komentet tuaja
                        <br />
                        janë motivi ynë.”
                      </h3>
                    </div>

                    <div
                      style={{
                        color: '#c8841a',
                        fontSize: 52,
                        lineHeight: 1,
                      }}
                    >
                      “
                    </div>
                  </div>

                  <p
                    style={{
                      margin: '0 0 20px',
                      color: 'rgba(255,255,255,.74)',
                      fontSize: 15,
                      lineHeight: 1.9,
                    }}
                  >
                    Na ndihmon shumë kur ndani përvojën tuaj me ne. Fjalët tuaja na motivojnë
                    të vazhdojmë të krijojmë evente edhe më të bukura, më të ngrohta dhe të
                    paharrueshme për secilin klient.
                  </p>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 14,
                      paddingTop: 18,
                      borderTop: '1px solid rgba(255,255,255,.10)',
                    }}
                  >
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #c8841a 0%, #f0c27a 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        fontWeight: 700,
                        fontSize: 18,
                        flexShrink: 0,
                      }}
                    >
                      💬
                    </div>

                    <div>
                      <h4
                        style={{
                          margin: '0 0 4px',
                          color: '#fff',
                          fontSize: 15,
                          fontWeight: 700,
                        }}
                      >
                        Shkruani komentin tuaj
                      </h4>
                      <p
                        style={{
                          margin: 0,
                          color: 'rgba(255,255,255,.60)',
                          fontSize: 13,
                        }}
                      >
                        Mendimi juaj ka shumë vlerë për ne
                      </p>
                    </div>
                  </div>

                  <div
                    style={{
                      marginTop: 20,
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, minmax(0,1fr))',
                      gap: 10,
                    }}
                  >
                    {[
                      'Besim',
                      'Përkushtim',
                      'Kreativitet',
                    ].map((item) => (
                      <div
                        key={item}
                        style={{
                          background: 'rgba(255,255,255,.06)',
                          border: '1px solid rgba(255,255,255,.08)',
                          borderRadius: 16,
                          padding: '14px 10px',
                          textAlign: 'center',
                        }}
                      >
                        <div style={{ color: '#c8841a', fontSize: 18, marginBottom: 6 }}>★</div>
                        <p
                          style={{
                            margin: 0,
                            color: 'rgba(255,255,255,.72)',
                            fontSize: 12,
                            lineHeight: 1.5,
                            fontWeight: 600,
                          }}
                        >
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          style={{
            marginTop: isMobile ? '-34px' : '-42px',
            padding: isMobile ? '0 20px' : '0 32px',
            position: 'relative',
            zIndex: 2,
          }}
        >
          <div
            className="stats-grid"
            style={{
              maxWidth: 980,
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: 'repeat(3, minmax(0,1fr))',
              gap: 16,
            }}
          >
            {reviewStats.map((item) => (
              <div
                key={item.label}
                className="stat-card"
                style={{
                  background: 'rgba(255,255,255,.78)',
                  backdropFilter: 'blur(10px)',
                  border: '1.5px solid rgba(234,223,206,.85)',
                  borderRadius: 24,
                  padding: isMobile ? '20px 16px' : '24px 20px',
                  textAlign: 'center',
                  boxShadow: '0 12px 30px rgba(26,18,11,.05)',
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    margin: '0 auto 12px',
                    background: '#fff8ef',
                    border: '1px solid #f1e2c9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#c8841a',
                    fontSize: 20,
                  }}
                >
                  {item.icon}
                </div>

                <h3
                  className="reviews-serif"
                  style={{
                    margin: '0 0 4px',
                    color: '#1a120b',
                    fontSize: isMobile ? 32 : 42,
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
            padding: isMobile ? '46px 20px 22px' : '64px 32px 28px',
          }}
        >
          <div
            style={{
              textAlign: 'center',
              maxWidth: 760,
              margin: '0 auto 34px',
            }}
          >
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
              Pse klientët na zgjedhin përsëri
            </p>

            <h2
              className="reviews-serif"
              style={{
                margin: '0 0 12px',
                color: '#1a120b',
                fontSize: isMobile ? '36px' : isTablet ? '50px' : '60px',
                lineHeight: 1.08,
                fontWeight: 700,
              }}
            >
              Më shumë se dekorim.
              <br />
              <span style={{ color: '#c8841a', fontStyle: 'italic' }}>Një përvojë e plotë.</span>
            </h2>

            <p
              style={{
                margin: 0,
                color: '#6d5f4c',
                fontSize: isMobile ? 15 : 17,
                lineHeight: 1.85,
              }}
            >
              Familjet dhe klientët tanë na zgjedhin për atmosferën, elegancën, besimin dhe
              energjinë e bukur që sjellim në çdo event.
            </p>
          </div>

          <div
            className="feature-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, minmax(0,1fr))',
              gap: 16,
              marginBottom: 34,
            }}
          >
            {[
              {
                title: 'Stil premium',
                text: 'Detaje elegante dhe ambiente të kuruara për evente të paharrueshme.',
              },
              {
                title: 'Ekip i besueshëm',
                text: 'Profesional, i saktë dhe gjithmonë i lehtë për bashkëpunim.',
              },
              {
                title: 'Ide kreative',
                text: 'Koncepte të veçanta që e bëjnë çdo festë më personale dhe më speciale.',
              },
              {
                title: 'Momente të lumtura',
                text: 'Përvoja të krijuara për të lënë gëzim te fëmijët dhe te të rriturit.',
              },
            ].map((item) => (
              <div
                key={item.title}
                style={{
                  background: '#fff',
                  border: '1.5px solid #eadfce',
                  borderRadius: 22,
                  padding: isMobile ? '18px 16px' : '22px 18px',
                  boxShadow: '0 8px 24px rgba(26,18,11,.04)',
                }}
              >
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#fff8ef',
                    color: '#c8841a',
                    fontSize: 16,
                    marginBottom: 12,
                    border: '1px solid #f1e2c9',
                  }}
                >
                  ✦
                </div>

                <h3
                  style={{
                    margin: '0 0 8px',
                    color: '#1a120b',
                    fontSize: 16,
                    fontWeight: 700,
                  }}
                >
                  {item.title}
                </h3>

                <p
                  style={{
                    margin: 0,
                    color: '#7a6a52',
                    fontSize: 14,
                    lineHeight: 1.75,
                  }}
                >
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          <div
            className="reviews-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, minmax(0,1fr))',
              gap: 22,
            }}
          >
            {featuredReviews.map((review, index) => (
              <article
                key={`${review.name}-${index}`}
                className="review-card"
                style={{
                  background: index % 3 === 0 ? 'linear-gradient(180deg, #fff, #fffaf2)' : '#fff',
                  borderRadius: 28,
                  border: '1.5px solid #eadfce',
                  boxShadow: '0 10px 28px rgba(26,18,11,.05)',
                  padding: isMobile ? '22px 18px' : '26px 22px',
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: isMobile ? 280 : 320,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 16,
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      background: '#fff8ef',
                      border: '1px solid #f1e2c9',
                      color: '#c8841a',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 18,
                    }}
                  >
                    ”
                  </div>

                  <div
                    style={{
                      color: '#c8841a',
                      fontSize: 16,
                      letterSpacing: '.08em',
                    }}
                  >
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                </div>

                <p
                  style={{
                    margin: '0 0 20px',
                    color: '#6f624f',
                    fontSize: 15,
                    lineHeight: 1.9,
                    flex: 1,
                  }}
                >
                  {review.text}
                </p>

                <div
                  style={{
                    paddingTop: 16,
                    borderTop: '1px solid #efe6d8',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                  }}
                >
                  <div
                    style={{
                      width: 46,
                      height: 46,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #c8841a 0%, #e3b56d 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontWeight: 700,
                      fontSize: 14,
                      flexShrink: 0,
                    }}
                  >
                    {review.name
                      .split(' ')
                      .map((part) => part[0])
                      .slice(0, 2)
                      .join('')}
                  </div>

                  <div>
                    <h3
                      className="reviews-serif"
                      style={{
                        margin: '0 0 4px',
                        color: '#1a120b',
                        fontSize: 28,
                        fontWeight: 700,
                        lineHeight: 1.05,
                      }}
                    >
                      {review.name}
                    </h3>
                    <p
                      style={{
                        margin: 0,
                        color: '#7a6a52',
                        fontSize: 13,
                      }}
                    >
                      {review.role}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section style={{ padding: isMobile ? '12px 20px 72px' : '26px 32px 96px' }}>
          <div
            style={{
              maxWidth: 1180,
              margin: '0 auto',
              background: 'linear-gradient(140deg, #1a120b 0%, #2b1b0d 100%)',
              borderRadius: 32,
              padding: isMobile ? '42px 20px' : isTablet ? '56px 30px' : '70px 48px',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 26px 60px rgba(26,18,11,.16)',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: -70,
                right: -70,
                width: 280,
                height: 280,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(200,132,26,.22) 0%, transparent 70%)',
                pointerEvents: 'none',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: -50,
                left: -50,
                width: 220,
                height: 220,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255,255,255,.06) 0%, transparent 70%)',
                pointerEvents: 'none',
              }}
            />

            <div style={{ position: 'relative', zIndex: 1 }}>
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
                Le të krijojmë diçka të bukur
              </p>

              <h2
                className="reviews-serif"
                style={{
                  margin: '0 0 14px',
                  color: '#fff',
                  fontSize: isMobile ? '34px' : isTablet ? '46px' : '58px',
                  lineHeight: 1.08,
                  fontWeight: 700,
                }}
              >
                Gati të bëheni
                <br />
                klienti ynë i radhës?
              </h2>

              <p
                style={{
                  margin: '0 auto 26px',
                  maxWidth: 700,
                  color: 'rgba(255,255,255,.68)',
                  fontSize: isMobile ? 15 : 16,
                  lineHeight: 1.85,
                }}
              >
                Nga festat për fëmijë deri te eventet elegante private, ne krijojmë momente
                të bukura, të ngrohta dhe të paharrueshme.
              </p>

              <div
                className="cta-buttons"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: 14,
                  flexWrap: 'wrap',
                }}
              >
                <Link
                  to="/booking"
                  className="cta-button-primary"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: isMobile ? '100%' : 220,
                    padding: '15px 24px',
                    borderRadius: 999,
                    background: '#c8841a',
                    color: '#fff',
                    textDecoration: 'none',
                    fontWeight: 700,
                    fontSize: 15,
                    boxShadow: '0 10px 24px rgba(200,132,26,.26)',
                  }}
                >
                  Rezervo eventin
                </Link>

                <a
                  href="tel:+38344378786"
                  className="cta-button-secondary"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: isMobile ? '100%' : 170,
                    padding: '15px 24px',
                    borderRadius: 999,
                    background: 'rgba(255,255,255,.08)',
                    color: '#fff',
                    textDecoration: 'none',
                    fontWeight: 700,
                    fontSize: 15,
                    border: '1px solid rgba(255,255,255,.16)',
                  }}
                >
                  Na telefono
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <ScrollToTop />
    </>
  );
}