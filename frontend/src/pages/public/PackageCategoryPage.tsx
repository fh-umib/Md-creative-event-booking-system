import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getPackagesByCategory } from '../../services/packageApi';
import type { PackageItem } from '../../services/packageApi';

type CategoryInfo = {
  title: string;
  subtitle: string;
  image: string;
  badge: string;
};

const categoryInfo: Record<string, CategoryInfo> = {
  'bounce-house': {
    title: 'Bounce House',
    subtitle:
      'Zgjidh paketën që i përshtatet festës suaj me bounce house, argëtim dhe atmosferë të veçantë për fëmijë.',
    image: '/images/packages/bounce-house.png',
    badge: 'Zonë Argëtimi',
  },
  'bounce-house-bubble-show': {
    title: 'Bounce House & Bubble Show',
    subtitle:
      'Kombinim i bukur i bounce house dhe bubble show për festa më dinamike, më argëtuese dhe më magjike.',
    image: '/images/packages/bounce-house-bubble-show.png',
    badge: 'Kombinim Special',
  },
  'bubble-bounce': {
    title: 'Bounce House & Bubble Show',
    subtitle:
      'Kombinim i bukur i bounce house dhe bubble show për festa më dinamike, më argëtuese dhe më magjike.',
    image: '/images/packages/bounce-house-bubble-show.png',
    badge: 'Kombinim Special',
  },
  'bubble-show': {
    title: 'Bubble Show',
    subtitle:
      'Shfaqje me flluska që sjell gëzim, lojë dhe momente magjike për fëmijët gjatë eventit.',
    image: '/images/packages/bubble-show.png',
    badge: 'Show Magjik',
  },
  'baby-shower': {
    title: 'Baby Shower',
    subtitle:
      'Paketa të veçanta për baby shower dhe gender reveal me dekorime, zërim dhe organizim elegant.',
    image: '/images/packages/baby-shower.png',
    badge: 'Moment i Ëmbël',
  },
  'event-decorations': {
    title: 'Dekorime Eventesh',
    subtitle:
      'Dekorime të personalizuara për ditëlindje, festa familjare dhe evente të veçanta.',
    image: '/images/packages/event-decorations.png',
    badge: 'Dekorime',
  },
  decorations: {
    title: 'Dekorime Eventesh',
    subtitle:
      'Dekorime të personalizuara për ditëlindje, festa familjare dhe evente të veçanta.',
    image: '/images/packages/event-decorations.png',
    badge: 'Dekorime',
  },
  mascots: {
    title: 'Maskota për Fëmijë',
    subtitle:
      'Personazhe të dashura për fëmijë që sjellin lojë, buzëqeshje dhe atmosferë festive.',
    image: '/images/packages/mascots.png',
    badge: 'Personazhe',
  },
  mascot: {
    title: 'Maskota për Fëmijë',
    subtitle:
      'Personazhe të dashura për fëmijë që sjellin lojë, buzëqeshje dhe atmosferë festive.',
    image: '/images/packages/mascots.png',
    badge: 'Personazhe',
  },
  'photo-booth': {
    title: 'Photo Booth & Photo Box',
    subtitle:
      'Kënd fotografik për kujtime të bukura dhe momente që mbeten gjatë pas festës.',
    image: '/images/packages/photo-booth.png',
    badge: 'Kujtime',
  },
  'drinks-bar': {
    title: 'Shankerica për Evente',
    subtitle:
      'Shankerica dhe pije festive për evente, me çmime që përshtaten sipas sasisë dhe kërkesës.',
    image: '/images/packages/drinks-bar.png',
    badge: 'Pije',
  },
  'entrance-balloons': {
    title: 'Balona për Hyrje',
    subtitle:
      'Dekorim hyrës me balona për një përshtypje të bukur që në momentin e parë të eventit.',
    image: '/images/packages/entrance-balloons.png',
    badge: 'Hyrje Speciale',
  },
};

function normalizeCategory(value?: string) {
  return value ? value.trim().toLowerCase() : '';
}

function formatPrice(value: number | string | null | undefined) {
  const price = Number(value);

  if (!Number.isFinite(price) || price <= 0) {
    return 'Sipas kërkesës';
  }

  return `€${price.toFixed(2)}`;
}

function getCategoryTitle(category: string) {
  return category
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

export default function PackageCategoryPage() {
  const { category } = useParams<{ category: string }>();

  const [packages, setPackages] = useState<PackageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const normalizedCategory = normalizeCategory(category);

  const info = useMemo(() => {
    return (
      categoryInfo[normalizedCategory] || {
        title: getCategoryTitle(normalizedCategory),
        subtitle: 'Shiko paketat e disponueshme për këtë kategori.',
        image: '/images/packages/event-decorations.png',
        badge: 'Paketa',
      }
    );
  }, [normalizedCategory]);

  useEffect(() => {
    if (!normalizedCategory) {
      setLoading(false);
      setError('Kategoria nuk është valide.');
      return;
    }

    getPackagesByCategory(normalizedCategory)
      .then((data) => {
        setPackages(data);
        setError('');
      })
      .catch((err) => {
        console.error('Package category error:', err);
        setError(
          err instanceof Error
            ? err.message
            : 'Paketat për këtë kategori nuk arritën të ngarkohen.'
        );
      })
      .finally(() => setLoading(false));
  }, [normalizedCategory]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@400;500;600;700;800&display=swap');

        .pcp,
        .pcp * {
          box-sizing: border-box;
          max-width: 100%;
        }

        .pcp {
          width: 100%;
          min-height: 100vh;
          background: #faf7f2;
          font-family: 'DM Sans', sans-serif;
          color: #1a120b;
          overflow-x: hidden;
        }

        .pcp-serif {
          font-family: 'Cormorant Garamond', serif;
        }

        .pcp-card {
          transition: transform .25s ease, box-shadow .25s ease;
        }

        .pcp-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 18px 38px rgba(26,18,11,.12) !important;
        }

        .pcp-btn {
          transition: background .2s ease, color .2s ease, transform .2s ease;
        }

        .pcp-btn:hover {
          transform: translateY(-1px);
          background: #c8841a !important;
          color: #ffffff !important;
        }

        @media (max-width: 700px) {
          .pcp-hero {
            padding: 44px 16px 34px !important;
          }

          .pcp-hero-inner {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }

          .pcp-title {
            font-size: 40px !important;
          }

          .pcp-main {
            padding: 34px 14px 70px !important;
          }

          .pcp-grid {
            grid-template-columns: 1fr !important;
          }

          .pcp-card-img {
            height: 190px !important;
          }
        }

        @media (min-width: 701px) and (max-width: 1050px) {
          .pcp-hero-inner {
            grid-template-columns: 1fr !important;
          }

          .pcp-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
        }
      `}</style>

      <main className="pcp">
        <section
          className="pcp-hero"
          style={{
            background:
              'linear-gradient(135deg, #1a120b 0%, #2c1a0a 55%, #1a120b 100%)',
            padding: '70px 24px 62px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage:
                'repeating-linear-gradient(45deg,rgba(200,132,26,.04) 0,rgba(200,132,26,.04) 1px,transparent 1px,transparent 56px)',
            }}
          />

          <div
            className="pcp-hero-inner"
            style={{
              maxWidth: 1180,
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: '1.1fr .9fr',
              gap: 42,
              alignItems: 'center',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <div>
              <Link
                to="/packages"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  textDecoration: 'none',
                  color: '#e8b56a',
                  fontWeight: 800,
                  fontSize: 13,
                  marginBottom: 22,
                }}
              >
                ← Kthehu te paketat
              </Link>

              <div
                style={{
                  display: 'inline-flex',
                  background: 'rgba(200,132,26,.14)',
                  border: '1px solid rgba(200,132,26,.32)',
                  color: '#e8b56a',
                  padding: '8px 16px',
                  borderRadius: 99,
                  fontSize: 12,
                  fontWeight: 800,
                  letterSpacing: '.12em',
                  textTransform: 'uppercase',
                  marginBottom: 18,
                }}
              >
                {info.badge}
              </div>

              <h1
                className="pcp-serif pcp-title"
                style={{
                  margin: '0 0 16px',
                  fontSize: 72,
                  lineHeight: 1.02,
                  color: '#ffffff',
                  fontWeight: 700,
                }}
              >
                {info.title}
              </h1>

              <p
                style={{
                  margin: 0,
                  color: 'rgba(255,255,255,.68)',
                  fontSize: 17,
                  lineHeight: 1.85,
                  maxWidth: 620,
                }}
              >
                {info.subtitle}
              </p>
            </div>

            <div
              style={{
                minHeight: 330,
                borderRadius: 28,
                backgroundImage: `linear-gradient(rgba(26,18,11,.10), rgba(26,18,11,.34)), url("${info.image}")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                border: '1px solid rgba(255,255,255,.14)',
                boxShadow: '0 22px 50px rgba(0,0,0,.26)',
              }}
            />
          </div>
        </section>

        <section
          className="pcp-main"
          style={{
            maxWidth: 1180,
            margin: '0 auto',
            padding: '58px 24px 90px',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: 34 }}>
            <p
              style={{
                margin: '0 0 8px',
                color: '#c8841a',
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: '.18em',
                textTransform: 'uppercase',
              }}
            >
              Paketat në këtë kategori
            </p>

            <h2
              className="pcp-serif"
              style={{
                margin: 0,
                color: '#1a120b',
                fontSize: 44,
                lineHeight: 1.08,
              }}
            >
              Zgjidh ofertën që të përshtatet më shumë
            </h2>
          </div>

          {loading && (
            <div
              style={{
                textAlign: 'center',
                color: '#7a6a52',
                padding: '48px 0',
                fontWeight: 700,
              }}
            >
              Duke u ngarkuar paketat…
            </div>
          )}

          {!loading && error && (
            <div
              style={{
                background: '#fff1f1',
                color: '#991b1b',
                border: '1.5px solid #fecaca',
                borderRadius: 18,
                padding: '20px',
                textAlign: 'center',
                marginBottom: 24,
                fontWeight: 700,
              }}
            >
              {error}
            </div>
          )}

          {!loading && !error && packages.length === 0 && (
            <div
              style={{
                background: '#ffffff',
                border: '1.5px solid #eadfce',
                borderRadius: 22,
                padding: '42px 20px',
                textAlign: 'center',
                color: '#7a6a52',
              }}
            >
              <h3
                className="pcp-serif"
                style={{ margin: '0 0 8px', color: '#1a120b', fontSize: 32 }}
              >
                Nuk ka paketa për momentin
              </h3>
              <p style={{ margin: '0 0 22px', lineHeight: 1.7 }}>
                Kjo kategori ekziston, por ende nuk ka paketa aktive në databazë.
              </p>

              <Link
                to="/packages"
                style={{
                  display: 'inline-flex',
                  textDecoration: 'none',
                  background: '#fef3d0',
                  color: '#92640e',
                  border: '1.5px solid #e8d5a0',
                  padding: '12px 18px',
                  borderRadius: 999,
                  fontWeight: 800,
                }}
              >
                Kthehu te paketat
              </Link>
            </div>
          )}

          {!loading && !error && packages.length > 0 && (
            <div
              className="pcp-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                gap: 22,
              }}
            >
              {packages.map((item) => (
                <article
                  key={item.id}
                  className="pcp-card"
                  style={{
                    background: '#ffffff',
                    border: '1.5px solid #eadfce',
                    borderRadius: 24,
                    overflow: 'hidden',
                    boxShadow: '0 6px 24px rgba(26,18,11,.06)',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <div
                    className="pcp-card-img"
                    style={{
                      height: 205,
                      backgroundImage: `linear-gradient(rgba(26,18,11,.12), rgba(26,18,11,.36)), url("${info.image}")`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      position: 'relative',
                    }}
                  >
                    <span
                      style={{
                        position: 'absolute',
                        top: 14,
                        left: 14,
                        background: 'rgba(255,255,255,.92)',
                        color: '#1a120b',
                        borderRadius: 99,
                        padding: '6px 12px',
                        fontSize: 11,
                        fontWeight: 800,
                      }}
                    >
                      {item.category}
                    </span>

                    <span
                      style={{
                        position: 'absolute',
                        right: 14,
                        bottom: 14,
                        background: '#c8841a',
                        color: '#fff',
                        borderRadius: 99,
                        padding: '6px 12px',
                        fontSize: 11,
                        fontWeight: 800,
                      }}
                    >
                      {formatPrice(item.base_price)}
                    </span>
                  </div>

                  <div
                    style={{
                      padding: 20,
                      display: 'flex',
                      flexDirection: 'column',
                      flex: 1,
                    }}
                  >
                    <h3
                      className="pcp-serif"
                      style={{
                        margin: '0 0 10px',
                        fontSize: 30,
                        lineHeight: 1.08,
                        color: '#1a120b',
                      }}
                    >
                      {item.title}
                    </h3>

                    <p
                      style={{
                        margin: '0 0 18px',
                        color: '#7a6a52',
                        fontSize: 14,
                        lineHeight: 1.7,
                        flex: 1,
                      }}
                    >
                      {item.description || 'Paketë e përshtatshme për evente dhe festa.'}
                    </p>

                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: 10,
                        marginBottom: 18,
                        padding: '14px 0',
                        borderTop: '1px solid #f0e6d8',
                        borderBottom: '1px solid #f0e6d8',
                      }}
                    >
                      <div>
                        <p
                          style={{
                            margin: '0 0 4px',
                            color: '#9a8878',
                            fontSize: 11,
                            fontWeight: 800,
                          }}
                        >
                          Kohëzgjatja
                        </p>
                        <p style={{ margin: 0, fontWeight: 800 }}>
                          {item.duration_minutes} min
                        </p>
                      </div>

                      <div>
                        <p
                          style={{
                            margin: '0 0 4px',
                            color: '#9a8878',
                            fontSize: 11,
                            fontWeight: 800,
                          }}
                        >
                          Maskota
                        </p>
                        <p style={{ margin: 0, fontWeight: 800 }}>
                          {item.min_mascots}-{item.max_mascots}
                        </p>
                      </div>
                    </div>

                    <Link
                      to={`/packages/details/${item.id}`}
                      className="pcp-btn"
                      style={{
                        width: '100%',
                        height: 46,
                        borderRadius: 14,
                        background: '#fef3d0',
                        color: '#92640e',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 14,
                        fontWeight: 800,
                        border: '1.5px solid #e8d5a0',
                      }}
                    >
                      Shiko detajet →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}