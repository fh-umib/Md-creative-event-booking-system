import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getPackagesByCategory } from '../../services/packageApi';

type PackageItem = {
  id: number;
  title: string;
  description: string | null;
  category: string;
  duration_minutes: number;
  min_mascots: number;
  max_mascots: number;
  base_price: number;
  is_active: boolean;
  extras?: string[];
};

type CategoryMeta = {
  title: string;
  label: string;
  icon: string;
  image: string;
  quote: string;
};

const categoriesToSearch = [
  'bounce-house',
  'bounce-house-bubble-show',
  'bubble-bounce',
  'bubble-show',
  'baby-shower',
  'event-decorations',
  'decorations',
  'mascots',
  'mascot',
  'photo-booth',
  'drinks-bar',
  'entrance-balloons',
];

const categoryMeta: Record<string, CategoryMeta> = {
  'bounce-house': {
    title: 'Bounce House',
    label: 'Zonë Argëtimi',
    icon: '🏰',
    image: '/images/packages/bounce-house.png',
    quote: 'Loja është mënyra më e bukur se si fëmijët krijojnë kujtime gjatë festës.',
  },
  'bounce-house-bubble-show': {
    title: 'Bounce House & Bubble Show',
    label: 'Kombinim Special',
    icon: '✨',
    image: '/images/packages/bounce-house-bubble-show.png',
    quote: 'Kur loja bashkohet me flluskat, festa bëhet më e gjallë dhe më magjike.',
  },
  'bubble-bounce': {
    title: 'Bounce House & Bubble Show',
    label: 'Kombinim Special',
    icon: '✨',
    image: '/images/packages/bounce-house-bubble-show.png',
    quote: 'Kur loja bashkohet me flluskat, festa bëhet më e gjallë dhe më magjike.',
  },
  'bubble-show': {
    title: 'Bubble Show',
    label: 'Show Magjik',
    icon: '🫧',
    image: '/images/packages/bubble-show.png',
    quote: 'Ndonjëherë mjafton një flluskë për të krijuar buzëqeshje të mëdha.',
  },
  'baby-shower': {
    title: 'Baby Shower',
    label: 'Moment i Ëmbël',
    icon: '🍼',
    image: '/images/packages/baby-shower.png',
    quote: 'Çdo fillim i ri meriton të festohet me butësi, dashuri dhe detaje të bukura.',
  },
  'event-decorations': {
    title: 'Dekorime Eventesh',
    label: 'Dekorime',
    icon: '🎈',
    image: '/images/packages/event-decorations.png',
    quote: 'Detajet e vogla janë ato që e bëjnë një hapësirë të ndihet e veçantë.',
  },
  decorations: {
    title: 'Dekorime Eventesh',
    label: 'Dekorime',
    icon: '🎈',
    image: '/images/packages/event-decorations.png',
    quote: 'Detajet e vogla janë ato që e bëjnë një hapësirë të ndihet e veçantë.',
  },
  mascot: {
    title: 'Maskota për Fëmijë',
    label: 'Personazhe',
    icon: '🎭',
    image: '/images/packages/mascots.png',
    quote: 'Një personazh i dashur mund ta kthejë një festë në aventurë për fëmijët.',
  },
  mascots: {
    title: 'Maskota për Fëmijë',
    label: 'Personazhe',
    icon: '🎭',
    image: '/images/packages/mascots.png',
    quote: 'Një personazh i dashur mund ta kthejë një festë në aventurë për fëmijët.',
  },
  'photo-booth': {
    title: 'Photo Booth',
    label: 'Kujtime',
    icon: '📸',
    image: '/images/packages/photo-booth.png',
    quote: 'Fotografitë ndalen në kohë, por kujtimet e eventit mbeten gjithmonë.',
  },
  'drinks-bar': {
    title: 'Shankerica për Evente',
    label: 'Pije',
    icon: '🥤',
    image: '/images/packages/drinks-bar.png',
    quote: 'Një detaj i shërbyer bukur e bën gjithë eventin të duket më i kujdesshëm.',
  },
  'entrance-balloons': {
    title: 'Balona për Hyrje',
    label: 'Hyrje Speciale',
    icon: '🎊',
    image: '/images/packages/entrance-balloons.png',
    quote: 'Hyrja është përshtypja e parë e festës, prandaj duhet të jetë e bukur.',
  },
};

const fallbackMeta: CategoryMeta = {
  title: 'Paketa e Eventit',
  label: 'Paketa',
  icon: '🎁',
  image: '/images/packages/event-decorations.png',
  quote: 'Çdo event bëhet më i bukur kur planifikohet me kujdes dhe dashuri për detajet.',
};

function useWindowWidth() {
  const [width, setWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
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
        bottom: 28,
        right: 24,
        zIndex: 999,
        width: 48,
        height: 48,
        borderRadius: '50%',
        background: '#c8841a',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 20px rgba(200,132,26,.45)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(14px) scale(0.85)',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
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

function formatCategoryName(value?: string) {
  const names: Record<string, string> = {
    'bounce-house': 'Bounce House',
    'bounce-house-bubble-show': 'Bounce House & Bubble Show',
    'bubble-bounce': 'Bounce House & Bubble Show',
    'bubble-show': 'Bubble Show',
    'baby-shower': 'Baby Shower',
    'event-decorations': 'Dekorime Eventesh',
    decorations: 'Dekorime Eventesh',
    mascot: 'Maskota për Fëmijë',
    mascots: 'Maskota për Fëmijë',
    'photo-booth': 'Photo Booth',
    'drinks-bar': 'Shankerica për Evente',
    'entrance-balloons': 'Balona për Hyrje',
  };

  return names[value || ''] || value || 'Paketa Eventi';
}

function localizeTitle(title?: string, category?: string) {
  const cleanTitle = (title || '').trim();

  if (!cleanTitle) {
    return `Paketa ${formatCategoryName(category)}`;
  }

  return cleanTitle
    .replace(/^Bounce Package/i, 'Paketa Bounce House')
    .replace(/^Bubble Package/i, 'Paketa Bubble Show')
    .replace(/^Mascot Package/i, 'Paketa me Maskota')
    .replace(/^Decoration Package/i, 'Paketa e Dekorimit')
    .replace(/^Photo Booth Package/i, 'Paketa Photo Booth')
    .replace(/^Baby Shower Package/i, 'Paketa Baby Shower')
    .replace(/^Drinks Package/i, 'Paketa Shankerica')
    .replace(/^Entrance Balloons Package/i, 'Paketa me Balona për Hyrje')
    .replace(/^Package/i, 'Paketa')
    .replace(/package/gi, 'paketë');
}

function localizeDescription(description?: string | null) {
  const text = (description || '').trim();

  if (!text) {
    return 'Kjo paketë është e përshtatur për evente të ndryshme dhe mund të personalizohet sipas kërkesës suaj.';
  }

  const knownDescriptions: Record<string, string> = {
    'Bounce house for 3 hours with one assistant for children.':
      'Bounce house për 3 orë me një asistent për fëmijët.',
    'Bounce house with balloon decoration and one assistant.':
      'Bounce house me dekorim me balona dhe një asistent.',
    'Bounce house, assistant, 2 mascots and professional music.':
      'Bounce house, asistent, 2 maskota dhe muzikë profesionale.',
  };

  if (knownDescriptions[text]) {
    return knownDescriptions[text];
  }

  return text
    .replace(/for children/gi, 'për fëmijë')
    .replace(/with one assistant/gi, 'me një asistent')
    .replace(/one assistant/gi, 'një asistent')
    .replace(/assistant/gi, 'asistent')
    .replace(/balloon decoration/gi, 'dekorim me balona')
    .replace(/professional music/gi, 'muzikë profesionale')
    .replace(/mascots/gi, 'maskota')
    .replace(/mascot/gi, 'maskotë')
    .replace(/hours/gi, 'orë')
    .replace(/hour/gi, 'orë')
    .replace(/children/gi, 'fëmijë')
    .replace(/party/gi, 'festë')
    .replace(/event/gi, 'event')
    .replace(/events/gi, 'evente');
}

async function findPackageById(id: string): Promise<PackageItem | null> {
  const results = await Promise.allSettled(
    categoriesToSearch.map(async (category) => {
      const packages = (await getPackagesByCategory(category)) as PackageItem[];

      return packages.find((item) => Number(item.id) === Number(id)) || null;
    })
  );

  for (const result of results) {
    if (result.status === 'fulfilled' && result.value) {
      return result.value;
    }
  }

  return null;
}

export default function PackageDetailPage() {
  const { id } = useParams<{ id: string }>();

  const [packageItem, setPackageItem] = useState<PackageItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const width = useWindowWidth();

  const isMobile = width < 640;
  const isTablet = width < 1024;

  useEffect(() => {
    if (!id) return;

    const loadPackage = async () => {
      try {
        setLoading(true);
        setError('');

        const foundPackage = await findPackageById(id);

        if (!foundPackage) {
          throw new Error('Paketa nuk u gjet.');
        }

        setPackageItem(foundPackage);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Paketa nuk arriti të ngarkohet.');
      } finally {
        setLoading(false);
      }
    };

    loadPackage();
  }, [id]);

  const meta = useMemo(() => {
    if (!packageItem) return fallbackMeta;

    return categoryMeta[packageItem.category] || fallbackMeta;
  }, [packageItem]);

  const title = localizeTitle(packageItem?.title, packageItem?.category);
  const description = localizeDescription(packageItem?.description);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=DM+Sans:wght@400;500;600;700;800&display=swap');

        .pdp {
          font-family: 'DM Sans', sans-serif;
          background: #faf7f2;
          color: #1a120b;
        }

        .pdp-serif {
          font-family: 'Cormorant Garamond', serif;
        }

        @keyframes pdp-fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pdp-spin {
          to {
            transform: rotate(360deg);
          }
        }

        .pdp-a1 {
          animation: pdp-fadeUp .55s ease both .05s;
        }

        .pdp-a2 {
          animation: pdp-fadeUp .55s ease both .18s;
        }

        .pdp-a3 {
          animation: pdp-fadeUp .55s ease both .30s;
        }

        .pdp-card {
          transition: transform .28s ease, box-shadow .28s ease, border-color .28s ease;
        }

        .pdp-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 18px 42px rgba(26,18,11,.11) !important;
          border-color: rgba(200,132,26,.38) !important;
        }

        .pdp-btn {
          transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease;
        }

        .pdp-btn:hover {
          transform: translateY(-2px);
        }

        @media (max-width: 639px) {
          .pdp-section {
            padding-left: 18px !important;
            padding-right: 18px !important;
          }

          .pdp-hero-grid {
            grid-template-columns: 1fr !important;
            border-radius: 26px !important;
          }

          .pdp-hero-content {
            padding: 42px 22px !important;
          }

          .pdp-hero-image {
            min-height: 280px !important;
          }

          .pdp-title {
            font-size: 40px !important;
          }

          .pdp-description {
            font-size: 15px !important;
          }

          .pdp-stats {
            flex-direction: column !important;
          }

          .pdp-stat {
            width: 100% !important;
          }

          .pdp-info-grid {
            grid-template-columns: 1fr !important;
          }

          .pdp-actions {
            flex-direction: column !important;
          }

          .pdp-actions a {
            width: 100%;
          }

          .pdp-quote {
            left: 18px !important;
            right: 18px !important;
            bottom: 18px !important;
            padding: 16px 18px !important;
          }
        }

        @media (min-width: 640px) and (max-width: 1023px) {
          .pdp-hero-grid {
            grid-template-columns: 1fr !important;
          }

          .pdp-hero-image {
            min-height: 360px !important;
          }

          .pdp-info-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
        }
      `}</style>

      <main className="pdp">
        <section
          className="pdp-section"
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            padding: isMobile ? '24px 18px 0' : '36px 44px 0',
          }}
        >
          <div
            className="pdp-hero-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: isTablet ? '1fr' : '1.05fr .95fr',
              background: 'linear-gradient(135deg, #1a120b 0%, #2c1a0a 100%)',
              borderRadius: 34,
              overflow: 'hidden',
              boxShadow: '0 16px 44px rgba(26,18,11,.12)',
            }}
          >
            <div
              className="pdp-hero-content"
              style={{
                padding: isMobile ? '42px 22px' : '72px 54px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: -80,
                  right: -80,
                  width: 280,
                  height: 280,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(200,132,26,.18) 0%, transparent 70%)',
                  pointerEvents: 'none',
                }}
              />

              <span
                className="pdp-a1"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  background: 'rgba(200,132,26,.12)',
                  border: '1px solid rgba(200,132,26,.32)',
                  color: '#e8b56a',
                  borderRadius: 99,
                  padding: '8px 17px',
                  fontSize: 12,
                  fontWeight: 800,
                  letterSpacing: '.14em',
                  textTransform: 'uppercase',
                }}
              >
                <span>{meta.icon}</span>
                <span>Detajet e paketës</span>
              </span>

              {loading ? (
                <div style={{ padding: '64px 0 20px' }}>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      border: '3px solid rgba(255,255,255,.18)',
                      borderTopColor: '#c8841a',
                      animation: 'pdp-spin .85s linear infinite',
                      marginBottom: 16,
                    }}
                  />

                  <p style={{ margin: 0, color: 'rgba(255,255,255,.68)', fontSize: 16 }}>
                    Duke u ngarkuar paketa…
                  </p>
                </div>
              ) : error ? (
                <div
                  style={{
                    marginTop: 34,
                    background: 'rgba(255,241,241,.1)',
                    color: '#fecaca',
                    border: '1px solid rgba(254,202,202,.28)',
                    borderRadius: 18,
                    padding: 22,
                    fontSize: 15,
                    lineHeight: 1.7,
                  }}
                >
                  {error}
                </div>
              ) : packageItem ? (
                <>
                  <h1
                    className="pdp-serif pdp-a2 pdp-title"
                    style={{
                      margin: '24px 0 16px',
                      color: '#fff',
                      fontSize: isMobile ? 40 : isTablet ? 58 : 72,
                      lineHeight: 1.02,
                      fontWeight: 700,
                    }}
                  >
                    {title}
                  </h1>

                  <p
                    className="pdp-a3 pdp-description"
                    style={{
                      margin: '0 0 30px',
                      color: 'rgba(255,255,255,.68)',
                      fontSize: isMobile ? 15 : 17,
                      lineHeight: 1.85,
                      maxWidth: 640,
                    }}
                  >
                    {description}
                  </p>

                  <div
                    className="pdp-actions"
                    style={{
                      display: 'flex',
                      gap: 12,
                      flexWrap: 'wrap',
                      marginBottom: 30,
                    }}
                  >
                    <Link
                      to="/booking"
                      className="pdp-btn"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textDecoration: 'none',
                        background: '#c8841a',
                        color: '#fff',
                        padding: '14px 26px',
                        borderRadius: 99,
                        fontWeight: 800,
                        fontSize: 15,
                        boxShadow: '0 6px 22px rgba(200,132,26,.35)',
                      }}
                    >
                      Rezervo këtë paketë
                    </Link>

                    <Link
                      to={`/packages/${packageItem.category}`}
                      className="pdp-btn"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textDecoration: 'none',
                        background: 'rgba(255,255,255,.08)',
                        color: '#fff',
                        padding: '14px 24px',
                        borderRadius: 99,
                        fontWeight: 800,
                        fontSize: 15,
                        border: '1px solid rgba(255,255,255,.18)',
                      }}
                    >
                      Kthehu te kategoria
                    </Link>
                  </div>

                  <div
                    className="pdp-stats"
                    style={{
                      display: 'flex',
                      gap: 12,
                      flexWrap: 'wrap',
                    }}
                  >
                    {[
                      {
                        label: 'Çmimi',
                        value: `€${Number(packageItem.base_price || 0).toFixed(2)}`,
                      },
                      {
                        label: 'Kohëzgjatja',
                        value: `${packageItem.duration_minutes} min`,
                      },
                      {
                        label: 'Kategoria',
                        value: formatCategoryName(packageItem.category),
                      },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="pdp-stat"
                        style={{
                          background: 'rgba(255,255,255,.08)',
                          border: '1px solid rgba(255,255,255,.14)',
                          borderRadius: 18,
                          padding: '14px 18px',
                          minWidth: 135,
                        }}
                      >
                        <p
                          style={{
                            margin: '0 0 4px',
                            color: 'rgba(255,255,255,.48)',
                            fontSize: 11,
                            fontWeight: 800,
                            letterSpacing: '.1em',
                            textTransform: 'uppercase',
                          }}
                        >
                          {item.label}
                        </p>

                        <p
                          style={{
                            margin: 0,
                            color: item.label === 'Çmimi' ? '#c8841a' : '#fff',
                            fontSize: 22,
                            fontWeight: 800,
                            lineHeight: 1.15,
                          }}
                        >
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </>
              ) : null}
            </div>

            <div
              className="pdp-hero-image"
              style={{
                minHeight: isTablet ? 360 : 540,
                position: 'relative',
                overflow: 'hidden',
                background: `url("${meta.image}") center / cover no-repeat`,
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: isTablet
                    ? 'linear-gradient(to top, rgba(26,18,11,.65), transparent 55%)'
                    : 'linear-gradient(to right, rgba(26,18,11,.30), transparent 58%)',
                }}
              />

              <div
                className="pdp-quote"
                style={{
                  position: 'absolute',
                  left: 24,
                  bottom: 24,
                  right: 24,
                  background: 'rgba(255,255,255,.9)',
                  border: '1px solid rgba(255,255,255,.58)',
                  borderRadius: 20,
                  padding: '18px 20px',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 12px 34px rgba(0,0,0,.14)',
                }}
              >
                <p
                  className="pdp-serif"
                  style={{
                    margin: 0,
                    color: '#1a120b',
                    fontSize: isMobile ? 20 : 24,
                    fontStyle: 'italic',
                    lineHeight: 1.45,
                    fontWeight: 600,
                  }}
                >
                  “{meta.quote}”
                </p>
              </div>
            </div>
          </div>
        </section>

        {!loading && !error && packageItem && (
          <>
            <section
              className="pdp-section"
              style={{
                maxWidth: 1120,
                margin: '0 auto',
                padding: isMobile ? '42px 18px 0' : '56px 44px 0',
              }}
            >
              <div
                className="pdp-info-grid"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                  gap: 16,
                }}
              >
                {[
                  {
                    icon: '📋',
                    title: 'Çfarë përfshin?',
                    text: description,
                  },
                  {
                    icon: '⏱️',
                    title: 'Kohëzgjatja',
                    text: `Kjo paketë zgjat rreth ${packageItem.duration_minutes} minuta dhe mund të përshtatet sipas eventit.`,
                  },
                  {
                    icon: '🎭',
                    title: 'Maskota',
                    text:
                      packageItem.max_mascots > 0
                        ? `Paketa mund të përfshijë nga ${packageItem.min_mascots} deri në ${packageItem.max_mascots} maskota.`
                        : 'Kjo paketë nuk përfshin maskota, por mund të kombinohet me shërbime tjera.',
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="pdp-card"
                    style={{
                      background: '#fff',
                      border: '1.5px solid #eadfce',
                      borderRadius: 22,
                      padding: '22px 20px',
                      boxShadow: '0 6px 22px rgba(26,18,11,.05)',
                    }}
                  >
                    <div style={{ fontSize: 26, marginBottom: 12 }}>{item.icon}</div>

                    <h3
                      style={{
                        margin: '0 0 8px',
                        color: '#1a120b',
                        fontSize: 18,
                        fontWeight: 800,
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
            </section>

            <section
              className="pdp-section"
              style={{
                maxWidth: 1120,
                margin: '0 auto',
                padding: isMobile ? '42px 18px 0' : '56px 44px 0',
              }}
            >
              <div
                style={{
                  background: '#fff',
                  border: '1.5px solid #eadfce',
                  borderRadius: 26,
                  padding: isMobile ? '28px 22px' : '34px 38px',
                  boxShadow: '0 8px 28px rgba(26,18,11,.06)',
                }}
              >
                <p
                  style={{
                    margin: '0 0 10px',
                    color: '#c8841a',
                    fontSize: 12,
                    fontWeight: 800,
                    letterSpacing: '.16em',
                    textTransform: 'uppercase',
                  }}
                >
                  Përshkrimi i paketës
                </p>

                <h2
                  className="pdp-serif"
                  style={{
                    margin: '0 0 14px',
                    color: '#1a120b',
                    fontSize: isMobile ? 32 : 46,
                    lineHeight: 1.08,
                    fontWeight: 700,
                  }}
                >
                  Detajet që e bëjnë këtë paketë të veçantë
                </h2>

                <p
                  style={{
                    margin: '0 0 24px',
                    color: '#7a6a52',
                    fontSize: 16,
                    lineHeight: 1.85,
                    maxWidth: 860,
                  }}
                >
                  {description}
                </p>

                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <span
                    style={{
                      background: '#fef3d0',
                      color: '#92640e',
                      border: '1.5px solid #e8d5a0',
                      borderRadius: 99,
                      padding: '9px 14px',
                      fontSize: 13,
                      fontWeight: 800,
                    }}
                  >
                    {formatCategoryName(packageItem.category)}
                  </span>

                  <span
                    style={{
                      background: '#fffaf2',
                      color: '#6b5a45',
                      border: '1.5px solid #f0e6d8',
                      borderRadius: 99,
                      padding: '9px 14px',
                      fontSize: 13,
                      fontWeight: 800,
                    }}
                  >
                    {packageItem.duration_minutes} min
                  </span>

                  <span
                    style={{
                      background: packageItem.is_active ? '#dcfce7' : '#fef9c3',
                      color: packageItem.is_active ? '#15803d' : '#a16207',
                      borderRadius: 99,
                      padding: '9px 14px',
                      fontSize: 13,
                      fontWeight: 800,
                    }}
                  >
                    {packageItem.is_active ? 'Në dispozicion' : 'Jo aktive'}
                  </span>
                </div>
              </div>
            </section>

            <section
              className="pdp-section"
              style={{
                padding: isMobile ? '42px 18px 76px' : '56px 44px 96px',
              }}
            >
              <div
                style={{
                  maxWidth: 900,
                  margin: '0 auto',
                  background: 'linear-gradient(135deg, #1a120b 0%, #2c1a0a 100%)',
                  borderRadius: 28,
                  padding: isMobile ? '44px 24px' : '60px 64px',
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
                    width: 300,
                    height: 300,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle,rgba(200,132,26,.18) 0%,transparent 70%)',
                    pointerEvents: 'none',
                  }}
                />

                <div style={{ position: 'relative', zIndex: 1 }}>
                  <p
                    style={{
                      margin: '0 0 10px',
                      color: '#c8841a',
                      fontSize: 12,
                      fontWeight: 800,
                      letterSpacing: '.16em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Gati për festë?
                  </p>

                  <h2
                    className="pdp-serif"
                    style={{
                      margin: '0 0 16px',
                      color: '#fff',
                      fontSize: isMobile ? 31 : 48,
                      fontWeight: 700,
                      lineHeight: 1.1,
                    }}
                  >
                    Rezervoni këtë paketë
                    <br />
                    <em style={{ fontStyle: 'italic', color: '#c8841a' }}>
                      dhe pjesën tjetër na e lini neve.
                    </em>
                  </h2>

                  <p
                    style={{
                      margin: '0 auto 34px',
                      color: 'rgba(255,255,255,.62)',
                      fontSize: 16,
                      lineHeight: 1.85,
                      maxWidth: 560,
                    }}
                  >
                    Tregoni datën, vendin dhe detajet e eventit. Ekipi ynë do të kujdeset për organizimin dhe realizimin e paketës.
                  </p>

                  <div
                    className="pdp-actions"
                    style={{
                      display: 'flex',
                      gap: 14,
                      justifyContent: 'center',
                      flexWrap: 'wrap',
                    }}
                  >
                    <Link
                      to="/booking"
                      className="pdp-btn"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textDecoration: 'none',
                        background: '#c8841a',
                        color: '#fff',
                        padding: '15px 30px',
                        borderRadius: 99,
                        fontWeight: 800,
                        fontSize: 15,
                        boxShadow: '0 6px 24px rgba(200,132,26,.35)',
                      }}
                    >
                      Rezervo tani
                    </Link>

                    <Link
                      to={`/packages/${packageItem.category}`}
                      className="pdp-btn"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textDecoration: 'none',
                        background: 'rgba(255,255,255,.08)',
                        color: '#fff',
                        padding: '15px 28px',
                        borderRadius: 99,
                        fontWeight: 800,
                        fontSize: 15,
                        border: '1px solid rgba(255,255,255,.18)',
                      }}
                    >
                      Shiko paketat tjera
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      <ScrollToTop />
    </>
  );
}