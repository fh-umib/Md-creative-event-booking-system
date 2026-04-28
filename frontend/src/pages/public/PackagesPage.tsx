import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPackageCategories } from '../../services/packageApi';

type PackageCategorySummary = {
  category: string;
  min_price: number;
  max_price: number;
  total_packages: number;
};

type CategoryMeta = {
  title: string;
  description: string;
  image: string;
  label: string;
  icon: string;
};

const defaultPackageCategories: PackageCategorySummary[] = [
  { category: 'bounce-house', min_price: 0, max_price: 0, total_packages: 0 },
  { category: 'bounce-house-bubble-show', min_price: 0, max_price: 0, total_packages: 0 },
  { category: 'bubble-show', min_price: 0, max_price: 0, total_packages: 0 },
  { category: 'baby-shower', min_price: 0, max_price: 0, total_packages: 0 },
  { category: 'event-decorations', min_price: 0, max_price: 0, total_packages: 0 },
  { category: 'mascots', min_price: 0, max_price: 0, total_packages: 0 },
  { category: 'photo-booth', min_price: 0, max_price: 0, total_packages: 0 },
  { category: 'drinks-bar', min_price: 0, max_price: 0, total_packages: 0 },
  { category: 'entrance-balloons', min_price: 0, max_price: 0, total_packages: 0 },
];

const categoryMeta: Record<string, CategoryMeta> = {
  'bounce-house': {
    title: 'Bounce House',
    description:
      'Argëtim i sigurt dhe plot energji për fëmijë me bounce house të përshtatshëm për festa të ndryshme.',
    image: '/images/packages/bounce-house.png',
    label: 'Zonë Argëtimi',
    icon: '🏰',
  },

  'bounce-house-bubble-show': {
    title: 'Bounce House & Bubble Show',
    description:
      'Kombinim i bounce house me bubble show për një festë më dinamike, më argëtuese dhe më të veçantë.',
    image: '/images/packages/bounce-house-bubble-show.png',
    label: 'Kombinim Special',
    icon: '✨',
  },

  'bubble-bounce': {
    title: 'Bounce House & Bubble Show',
    description:
      'Kombinim i bounce house me bubble show për një festë më dinamike, më argëtuese dhe më të veçantë.',
    image: '/images/packages/bounce-house-bubble-show.png',
    label: 'Kombinim Special',
    icon: '✨',
  },

  'bubble-show': {
    title: 'Bubble Show',
    description:
      'Shfaqje me flluska që sjell gëzim, lojë dhe momente magjike për fëmijët gjatë eventit.',
    image: '/images/packages/bubble-show.png',
    label: 'Show Magjik',
    icon: '🫧',
  },

  'baby-shower': {
    title: 'Baby Shower',
    description:
      'Paketa të veçanta për gender reveal dhe baby shower, me dekorime, maskota dhe zërim profesional.',
    image: '/images/packages/baby-shower.png',
    label: 'Moment i Ëmbël',
    icon: '🍼',
  },

  'event-decorations': {
    title: 'Dekorime Eventesh',
    description:
      'Dekorime të personalizuara për festa, ditëlindje dhe evente familjare. Çmimi vendoset pasi të zgjidhet stili, tema dhe detajet.',
    image: '/images/packages/event-decorations.png',
    label: 'Dekorime',
    icon: '🎈',
  },

  decorations: {
    title: 'Dekorime Eventesh',
    description:
      'Dekorime të personalizuara për festa, ditëlindje dhe evente familjare. Çmimi vendoset pasi të zgjidhet stili, tema dhe detajet.',
    image: '/images/packages/event-decorations.png',
    label: 'Dekorime',
    icon: '🎈',
  },

  mascots: {
    title: 'Maskota për Fëmijë',
    description:
      'Personazhe të dashura për fëmijë që sjellin atmosferë festive, lojë dhe argëtim në çdo event.',
    image: '/images/packages/mascots.png',
    label: 'Personazhe',
    icon: '🎭',
  },

  mascot: {
    title: 'Maskota për Fëmijë',
    description:
      'Personazhe të dashura për fëmijë që sjellin atmosferë festive, lojë dhe argëtim në çdo event.',
    image: '/images/packages/mascots.png',
    label: 'Personazhe',
    icon: '🎭',
  },

  'photo-booth': {
    title: 'Photo Booth & Photo Box',
    description:
      'Kënd fotografik për kujtime të bukura. Ofrojmë Photo Booth dhe Photo Box, ndërsa çmimi vendoset sipas shërbimit, kohëzgjatjes dhe kërkesës.',
    image: '/images/packages/photo-booth.png',
    label: 'Kujtime',
    icon: '📸',
  },

  'drinks-bar': {
    title: 'Shankerica për Evente',
    description:
      'Shankerica fillon nga 8€ për copë. Në bazë të sasisë dhe detajeve të eventit, ne përgatisim çmim të veçantë për ju.',
    image: '/images/packages/drinks-bar.png',
    label: 'Pije',
    icon: '🥤',
  },

  'entrance-balloons': {
    title: 'Balona për Hyrje',
    description:
      'Dekorim hyrës me balona që krijon një moment të veçantë dhe të paharrueshëm në fillim të festës.',
    image: '/images/packages/entrance-balloons.png',
    label: 'Hyrje Speciale',
    icon: '🎊',
  },
};

const tickerItems = [
  'Bounce House',
  'Bounce House & Bubble Show',
  'Bubble Show',
  'Baby Shower',
  'Dekorime',
  'Maskota',
  'Photo Booth',
  'Photo Box',
  'Shankerica',
  'Balona për Hyrje',
];

function useWindowWidth() {
  const [w, setW] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  useEffect(() => {
    const fn = () => setW(window.innerWidth);

    window.addEventListener('resize', fn);

    return () => window.removeEventListener('resize', fn);
  }, []);

  return w;
}

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 400);

    window.addEventListener('scroll', fn, { passive: true });

    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Kthehu lart"
      style={{
        position: 'fixed',
        bottom: 22,
        right: 18,
        zIndex: 999,
        width: 46,
        height: 46,
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

function getPriceText(category: string, minPrice: number) {
  if (category === 'event-decorations' || category === 'decorations') {
    return 'Sipas kërkesës';
  }

  if (category === 'photo-booth') {
    return 'Sipas kërkesës';
  }

  if (category === 'drinks-bar') {
    return minPrice > 0 ? `Nga €${Number(minPrice).toFixed(2)}` : 'Nga €8.00';
  }

  return minPrice > 0 ? `Nga €${Number(minPrice).toFixed(2)}` : 'Sipas kërkesës';
}

export default function PackagesPage() {
  const [categories, setCategories] = useState<PackageCategorySummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const width = useWindowWidth();

  const isMobile = width < 640;
  const isTablet = width < 1024;

  useEffect(() => {
    getPackageCategories()
      .then((data) => setCategories(data as PackageCategorySummary[]))
      .catch((err) =>
        setError(err instanceof Error ? err.message : 'Paketat nuk arritën të ngarkohen')
      )
      .finally(() => setLoading(false));
  }, []);

  const mapped = useMemo(() => {
    const apiMap = new Map(categories.map((item) => [item.category, item]));

    return defaultPackageCategories.map((defaultItem) => {
      const apiItem =
        apiMap.get(defaultItem.category) ||
        apiMap.get(defaultItem.category === 'mascots' ? 'mascot' : defaultItem.category) ||
        apiMap.get(
          defaultItem.category === 'bounce-house-bubble-show'
            ? 'bubble-bounce'
            : defaultItem.category
        );

      const finalItem = apiItem || defaultItem;
      const meta = categoryMeta[finalItem.category] || categoryMeta[defaultItem.category];

      return {
        ...defaultItem,
        ...finalItem,
        ...meta,
        routeCategory: finalItem.category,
      };
    });
  }, [categories]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=DM+Sans:wght@400;500;600;700;800&display=swap');

        .pp,
        .pp * {
          box-sizing: border-box;
          max-width: 100%;
        }

        .pp {
          width: 100%;
          max-width: 100%;
          overflow-x: hidden;
          font-family: 'DM Sans', sans-serif;
          background: #faf7f2;
          color: #1a120b;
        }

        .pp-serif {
          font-family: 'Cormorant Garamond', serif;
        }

        .pp-hero-title,
        .pp-section-title,
        .pp-card-title,
        .pp-card-description,
        .pp-hero-text,
        .pp-section-text {
          overflow-wrap: break-word;
          word-break: normal;
        }

        @keyframes pp-fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pp-marquee {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }

        @keyframes pp-spin {
          to {
            transform: rotate(360deg);
          }
        }

        .pp-a1 {
          animation: pp-fadeUp .55s ease both .05s;
        }

        .pp-a2 {
          animation: pp-fadeUp .55s ease both .18s;
        }

        .pp-a3 {
          animation: pp-fadeUp .55s ease both .30s;
        }

        .pp-ticker {
          display: flex;
          width: max-content;
          max-width: none !important;
          animation: pp-marquee 24s linear infinite;
          will-change: transform;
        }

        .pp-ticker-group {
          display: inline-flex;
          align-items: center;
          flex-shrink: 0;
          max-width: none !important;
        }

        .pp-ticker-item {
          max-width: none !important;
        }

        .pp-card {
          transition: transform .35s ease, box-shadow .35s ease;
        }

        .pp-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 42px rgba(26,18,11,.12) !important;
        }

        .pp-card:hover .pp-card-img {
          transform: scale(1.04);
        }

        .pp-card-img {
          transition: transform .5s ease;
        }

        .pp-card:hover .pp-card-overlay {
          opacity: 1 !important;
        }

        .pp-card-overlay {
          transition: opacity .3s;
        }

        .pp-view-btn {
          transition: background .2s, color .2s, gap .2s, transform .2s;
        }

        .pp-view-btn:hover {
          background: #c8841a !important;
          color: #fff !important;
          transform: translateY(-1px);
        }

        @media (max-width: 639px) {
          .pp {
            width: 100% !important;
            max-width: 100% !important;
            overflow-x: hidden !important;
          }

          .pp-hero-wrap {
            width: 100% !important;
            max-width: 100% !important;
            overflow: hidden !important;
          }

          .pp-hero {
            width: 100% !important;
            max-width: 100% !important;
            padding: 50px 16px 42px !important;
          }

          .pp-hero-badge {
            max-width: 100% !important;
            padding: 7px 12px !important;
            gap: 7px !important;
            margin-bottom: 22px !important;
          }

          .pp-hero-badge span:last-child {
            font-size: 10px !important;
            letter-spacing: .08em !important;
            white-space: normal !important;
          }

          .pp-hero-title {
            font-size: 38px !important;
            line-height: 1.05 !important;
            margin-bottom: 14px !important;
          }

          .pp-hero-text {
            font-size: 14.5px !important;
            line-height: 1.75 !important;
            max-width: 100% !important;
          }

          .pp-ticker {
            animation-duration: 18s !important;
          }

          .pp-ticker-item {
            padding-right: 24px !important;
            gap: 9px !important;
          }

          .pp-ticker-text {
            font-size: 10px !important;
            letter-spacing: .05em !important;
          }

          .pp-main {
            width: 100% !important;
            max-width: 100% !important;
            padding: 40px 14px 70px !important;
          }

          .pp-section-head {
            max-width: 100% !important;
            margin-bottom: 32px !important;
          }

          .pp-section-title {
            font-size: 31px !important;
            line-height: 1.08 !important;
          }

          .pp-section-text {
            font-size: 14px !important;
            line-height: 1.75 !important;
          }

          .pp-grid {
            width: 100% !important;
            max-width: 100% !important;
            grid-template-columns: minmax(0, 1fr) !important;
            gap: 20px !important;
          }

          .pp-card {
            width: 100% !important;
            max-width: 100% !important;
            border-radius: 22px !important;
          }

          .pp-card-image {
            width: 100% !important;
            height: 215px !important;
          }

          .pp-card-title {
            font-size: 29px !important;
            line-height: 1.08 !important;
          }

          .pp-card-content {
            padding: 19px 17px 20px !important;
          }

          .pp-card-description {
            min-height: auto !important;
            font-size: 13.8px !important;
            line-height: 1.7 !important;
            margin-bottom: 16px !important;
          }

          .pp-price-row {
            margin-top: 0 !important;
            padding: 13px 0 !important;
            gap: 10px !important;
          }

          .pp-price-value {
            font-size: 15px !important;
          }

          .pp-view-btn {
            height: 46px !important;
            font-size: 14px !important;
          }

          .pp-floating-label {
            top: 12px !important;
            left: 12px !important;
            font-size: 10px !important;
            padding: 5px 9px !important;
          }

          .pp-floating-count {
            right: 12px !important;
            bottom: 12px !important;
            font-size: 10px !important;
            padding: 5px 9px !important;
          }
        }

        @media (min-width: 640px) and (max-width: 1023px) {
          .pp-hero {
            padding: 72px 30px 64px !important;
          }

          .pp-hero-title {
            font-size: 62px !important;
          }

          .pp-main {
            padding: 58px 30px 82px !important;
          }

          .pp-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            gap: 22px !important;
          }

          .pp-card-image {
            height: 220px !important;
          }

          .pp-card-title {
            font-size: 30px !important;
          }

          .pp-card-description {
            min-height: 118px !important;
          }
        }

        @media (min-width: 1024px) and (max-width: 1180px) {
          .pp-card-title {
            font-size: 27px !important;
          }

          .pp-card-description {
            min-height: 118px !important;
          }

          .pp-price-value {
            font-size: 15px !important;
          }
        }
      `}</style>

      <div className="pp">
        <div
          className="pp-hero-wrap"
          style={{
            width: '100%',
            maxWidth: '100%',
            background:
              'linear-gradient(135deg, #1a120b 0%, #2c1a0a 55%, #1a120b 100%)',
            position: 'relative',
            overflow: 'hidden',
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
              top: '50%',
              left: '50%',
              transform: 'translate(-50%,-50%)',
              width: isMobile ? 320 : 600,
              height: isMobile ? 320 : 600,
              borderRadius: '50%',
              background:
                'radial-gradient(circle,rgba(200,132,26,.14) 0%,transparent 65%)',
              pointerEvents: 'none',
            }}
          />

          <div
            className="pp-hero"
            style={{
              width: '100%',
              maxWidth: 1280,
              margin: '0 auto',
              padding: isMobile ? '50px 16px 42px' : isTablet ? '72px 30px 64px' : '84px 44px 76px',
              position: 'relative',
              zIndex: 1,
              textAlign: 'center',
            }}
          >
            <div
              className="pp-a1 pp-hero-badge"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                maxWidth: '100%',
                background: 'rgba(200,132,26,.12)',
                border: '1px solid rgba(200,132,26,.3)',
                borderRadius: 99,
                padding: '8px 20px',
                marginBottom: 28,
              }}
            >
              <span style={{ fontSize: 15, flexShrink: 0 }}>🎁</span>

              <span
                style={{
                  color: '#e8b56a',
                  fontSize: 12,
                  fontWeight: 800,
                  letterSpacing: '.15em',
                  textTransform: 'uppercase',
                }}
              >
                Paketa fleksibile për çdo festë
              </span>
            </div>

            <h1
              className="pp-serif pp-a2 pp-hero-title"
              style={{
                margin: '0 0 18px',
                color: '#fff',
                fontSize: isMobile ? '38px' : isTablet ? '62px' : '82px',
                lineHeight: 1.02,
                fontWeight: 700,
              }}
            >
              Paketat e{' '}
              <em style={{ fontStyle: 'italic', color: '#c8841a' }}>Eventeve</em>
            </h1>

            <p
              className="pp-a3 pp-hero-text"
              style={{
                margin: '0 auto',
                color: 'rgba(255,255,255,.65)',
                fontSize: isMobile ? '14.5px' : '18px',
                lineHeight: 1.85,
                maxWidth: 600,
              }}
            >
              Zgjidhni kategorinë që i përshtatet festës suaj dhe gjeni kombinimin ideal
              të shërbimeve, argëtimit dhe dekorimit.
            </p>
          </div>

          <div
            style={{
              borderTop: '1px solid rgba(200,132,26,.18)',
              padding: '13px 0',
              overflow: 'hidden',
              width: '100%',
              maxWidth: '100%',
            }}
          >
            <div className="pp-ticker">
              {[0, 1].map((groupIndex) => (
                <div className="pp-ticker-group" key={groupIndex}>
                  {tickerItems.map((t, index) => (
                    <span
                      key={`${groupIndex}-${t}-${index}`}
                      className="pp-ticker-item"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 16,
                        paddingRight: 40,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      <span style={{ color: '#c8841a', fontSize: 13, flexShrink: 0 }}>✦</span>

                      <span
                        className="pp-ticker-text"
                        style={{
                          color: 'rgba(255,255,255,.45)',
                          fontSize: 12,
                          fontWeight: 700,
                          letterSpacing: '.08em',
                          textTransform: 'uppercase',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {t}
                      </span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className="pp-main"
          style={{
            width: '100%',
            maxWidth: 1280,
            margin: '0 auto',
            padding: isMobile ? '40px 14px 70px' : isTablet ? '58px 30px 82px' : '68px 44px 90px',
          }}
        >
          <div
            className="pp-section-head"
            style={{
              textAlign: 'center',
              maxWidth: 680,
              margin: '0 auto 42px',
            }}
          >
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
              Zgjidh paketën tënde
            </p>

            <h2
              className="pp-serif pp-section-title"
              style={{
                margin: '0 0 14px',
                fontSize: isMobile ? '31px' : '48px',
                fontWeight: 700,
                color: '#1a120b',
                lineHeight: 1.08,
              }}
            >
              Gjej shërbimin që i përshtatet
              <br />
              <em style={{ fontStyle: 'italic', color: '#c8841a' }}>festës suaj.</em>
            </h2>

            <p
              className="pp-section-text"
              style={{
                margin: 0,
                color: '#7a6a52',
                fontSize: isMobile ? 14 : 16,
                lineHeight: 1.8,
              }}
            >
              Çdo kategori mund të përmbajë disa paketa me përfshirje dhe çmime të
              ndryshme.
            </p>
          </div>

          {loading && (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  border: '3px solid #e6d9c4',
                  borderTopColor: '#c8841a',
                  animation: 'pp-spin .85s linear infinite',
                  margin: '0 auto 14px',
                }}
              />

              <p style={{ margin: 0, color: '#7a6a52', fontSize: 15 }}>
                Duke u ngarkuar paketat…
              </p>
            </div>
          )}

          {!loading && error && (
            <div
              style={{
                background: '#fff1f1',
                color: '#991b1b',
                border: '1.5px solid #fecaca',
                borderRadius: 16,
                padding: '28px',
                textAlign: 'center',
                fontSize: 15,
              }}
            >
              {error}
            </div>
          )}

          {!loading && !error && mapped.length === 0 && (
            <div
              style={{
                textAlign: 'center',
                padding: '60px 24px',
                background: '#fff',
                borderRadius: 20,
                border: '1.5px solid #e6d9c4',
                color: '#7a6a52',
                fontSize: 16,
              }}
            >
              Nuk u gjet asnjë kategori paketash.
            </div>
          )}

          {!loading && !error && mapped.length > 0 && (
            <div
              className="pp-grid"
              style={{
                width: '100%',
                display: 'grid',
                gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                gap: 22,
                alignItems: 'stretch',
              }}
            >
              {mapped.map((cat) => (
                <article
                  key={cat.category}
                  className="pp-card"
                  style={{
                    width: '100%',
                    minWidth: 0,
                    background: '#fff',
                    borderRadius: 24,
                    overflow: 'hidden',
                    border: '1.5px solid #e6d9c4',
                    boxShadow: '0 6px 24px rgba(26,18,11,.06)',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                  }}
                >
                  <div
                    className="pp-card-image"
                    style={{
                      width: '100%',
                      height: 225,
                      overflow: 'hidden',
                      position: 'relative',
                      flexShrink: 0,
                    }}
                  >
                    <div
                      className="pp-card-img"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: `url("${cat.image}")`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />

                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background:
                          'linear-gradient(to top, rgba(20,10,2,.60) 0%, transparent 60%)',
                      }}
                    />

                    <div
                      className="pp-card-overlay"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'rgba(200,132,26,.08)',
                        opacity: 0,
                      }}
                    />

                    <div
                      className="pp-floating-label"
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
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 7,
                        maxWidth: 'calc(100% - 28px)',
                      }}
                    >
                      <span style={{ flexShrink: 0 }}>{cat.icon}</span>
                      <span>{cat.label}</span>
                    </div>

                    <div
                      className="pp-floating-count"
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
                      {cat.total_packages > 0 ? `${cat.total_packages} paketa` : 'Kategori'}
                    </div>
                  </div>

                  <div
                    className="pp-card-content"
                    style={{
                      padding: '20px 20px 22px',
                      display: 'flex',
                      flexDirection: 'column',
                      flex: 1,
                      minWidth: 0,
                    }}
                  >
                    <h3
                      className="pp-serif pp-card-title"
                      style={{
                        margin: '0 0 9px',
                        color: '#1a120b',
                        fontSize: 30,
                        lineHeight: 1.08,
                        fontWeight: 700,
                      }}
                    >
                      {cat.title}
                    </h3>

                    <p
                      className="pp-card-description"
                      style={{
                        margin: '0 0 18px',
                        color: '#7a6a52',
                        fontSize: 14,
                        lineHeight: 1.7,
                        minHeight: isMobile ? 'auto' : 96,
                      }}
                    >
                      {cat.description}
                    </p>

                    <div
                      className="pp-price-row"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 12,
                        marginTop: 'auto',
                        marginBottom: 18,
                        padding: '14px 0',
                        borderTop: '1px solid #f0e6d8',
                        borderBottom: '1px solid #f0e6d8',
                      }}
                    >
                      <div style={{ minWidth: 0 }}>
                        <p
                          style={{
                            margin: '0 0 4px',
                            color: '#9a8878',
                            fontSize: 12,
                            fontWeight: 800,
                          }}
                        >
                          Çmimi
                        </p>

                        <p
                          className="pp-price-value"
                          style={{
                            margin: 0,
                            color: '#1a120b',
                            fontSize: 16,
                            fontWeight: 800,
                          }}
                        >
                          {getPriceText(cat.category, Number(cat.min_price))}
                        </p>
                      </div>

                      <div style={{ textAlign: 'right', minWidth: 0 }}>
                        <p
                          style={{
                            margin: '0 0 4px',
                            color: '#9a8878',
                            fontSize: 12,
                            fontWeight: 800,
                          }}
                        >
                          Paketa
                        </p>

                        <p
                          style={{
                            margin: 0,
                            color: '#1a120b',
                            fontSize: 16,
                            fontWeight: 800,
                          }}
                        >
                          {cat.total_packages > 0 ? cat.total_packages : '—'}
                        </p>
                      </div>
                    </div>

                    <Link
                      to={`/packages/${cat.routeCategory}`}
                      className="pp-view-btn"
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
                        gap: 8,
                        fontSize: 14,
                        fontWeight: 800,
                        border: '1.5px solid #e8d5a0',
                      }}
                    >
                      Shiko paketat
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                        <path
                          d="M2.5 7.5h10M9 4l3.5 3.5L9 11"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>

      <ScrollToTop />
    </>
  );
}