import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

type PhotoService = {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  number: string;
};

const photoServices: PhotoService[] = [
  {
    title: 'Photo Booth',
    subtitle: 'Kënd fotografik për evente',
    description:
      'Photo Booth është një kënd fotografik ku mysafirët mund të bëjnë foto gjatë eventit dhe të krijojnë kujtime të bukura nga festa.',
    image: '/images/photo-booth/photo-both.png',
    number: '01',
  },
  {
    title: 'Photo Box',
    subtitle: 'Kuti fotografike moderne',
    description:
      'Photo Box është një zgjidhje kreative për evente, ku mysafirët mund të fotografohen në një hapësirë të veçantë dhe elegante.',
    image: '/images/photo-booth/photo-box.png',
    number: '02',
  },
  {
    title: 'Pasqyrë e Personalizuar',
    subtitle: 'Pasqyrë dekorative për foto',
    description:
      'Pasqyrë elegante ku mysafirët mund të bëjnë foto. Sipër mund të vendoset emër, datë apo tekst i personalizuar sipas eventit.',
    image: '/images/photo-booth/personalized-mirror.png',
    number: '03',
  },
];

const tickerItems = [
  'Photo Booth',
  'Photo Box',
  'Pasqyrë e Personalizuar',
  'Kujtime nga Festa',
  'Emër i Personalizuar',
  'Kënd Fotografik',
];

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Kthehu lart"
      className={visible ? 'pb-scroll-top visible' : 'pb-scroll-top'}
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M10 15V5M10 5L5 10M10 5L15 10"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

export default function PhotoBoothPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=DM+Sans:wght@400;500;600;700;800&display=swap');

        .pb,
        .pb * {
          box-sizing: border-box;
        }

        .pb {
          width: 100%;
          max-width: 100%;
          overflow-x: hidden;
          background: #faf7f2;
          color: #1a120b;
          font-family: 'DM Sans', sans-serif;
        }

        .pb-serif {
          font-family: 'Cormorant Garamond', serif;
        }

        @keyframes pb-fade-up {
          from {
            opacity: 0;
            transform: translateY(22px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pb-marquee {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }

        .pb-a1 {
          animation: pb-fade-up .55s ease both .05s;
        }

        .pb-a2 {
          animation: pb-fade-up .55s ease both .18s;
        }

        .pb-a3 {
          animation: pb-fade-up .55s ease both .30s;
        }

        .pb-hero {
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #1a120b 0%, #2c1a0a 55%, #1a120b 100%);
        }

        .pb-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: repeating-linear-gradient(
            45deg,
            rgba(200, 132, 26, .035) 0,
            rgba(200, 132, 26, .035) 1px,
            transparent 1px,
            transparent 56px
          );
          pointer-events: none;
        }

        .pb-hero::after {
          content: '';
          position: absolute;
          width: 620px;
          height: 620px;
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: radial-gradient(circle, rgba(200,132,26,.16) 0%, transparent 65%);
          pointer-events: none;
        }

        .pb-hero-inner {
          position: relative;
          z-index: 1;
          max-width: 1200px;
          margin: 0 auto;
          padding: 86px 44px 78px;
          text-align: center;
        }

        .pb-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-bottom: 26px;
          padding: 8px 20px;
          border-radius: 999px;
          background: rgba(200,132,26,.12);
          border: 1px solid rgba(200,132,26,.32);
          color: #e8b56a;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: .15em;
          text-transform: uppercase;
        }

        .pb-badge-dot {
          width: 7px;
          height: 7px;
          border-radius: 999px;
          background: #c8841a;
          box-shadow: 0 0 0 4px rgba(200,132,26,.14);
        }

        .pb-hero-title {
          margin: 0 0 18px;
          color: #fff;
          font-size: 82px;
          line-height: 1.02;
          font-weight: 700;
        }

        .pb-hero-title em {
          color: #c8841a;
          font-style: italic;
        }

        .pb-hero-text {
          margin: 0 auto;
          max-width: 680px;
          color: rgba(255,255,255,.66);
          font-size: 18px;
          line-height: 1.85;
        }

        .pb-ticker-wrap {
          width: 100%;
          overflow: hidden;
          border-top: 1px solid rgba(200,132,26,.18);
          padding: 13px 0;
        }

        .pb-ticker {
          display: flex;
          width: max-content;
          max-width: none;
          animation: pb-marquee 22s linear infinite;
          will-change: transform;
        }

        .pb-ticker-group {
          display: inline-flex;
          align-items: center;
          flex-shrink: 0;
          max-width: none;
        }

        .pb-ticker-item {
          display: inline-flex;
          align-items: center;
          gap: 16px;
          padding-right: 40px;
          white-space: nowrap;
          max-width: none;
        }

        .pb-ticker-star {
          color: #c8841a;
          font-size: 13px;
        }

        .pb-ticker-text {
          color: rgba(255,255,255,.45);
          font-size: 12px;
          font-weight: 800;
          letter-spacing: .08em;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .pb-main {
          max-width: 1280px;
          margin: 0 auto;
          padding: 70px 44px 96px;
        }

        .pb-head {
          max-width: 760px;
          margin: 0 auto 44px;
          text-align: center;
        }

        .pb-kicker {
          margin: 0 0 9px;
          color: #c8841a;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: .18em;
          text-transform: uppercase;
        }

        .pb-head-title {
          margin: 0 0 14px;
          color: #1a120b;
          font-size: 50px;
          line-height: 1.08;
          font-weight: 700;
        }

        .pb-head-title em {
          color: #c8841a;
          font-style: italic;
        }

        .pb-head-text {
          margin: 0;
          color: #7a6a52;
          font-size: 16px;
          line-height: 1.8;
        }

        .pb-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 24px;
          align-items: stretch;
        }

        .pb-card {
          min-width: 0;
          height: 100%;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          border-radius: 26px;
          background: #fff;
          border: 1.5px solid #e6d9c4;
          box-shadow: 0 8px 28px rgba(26,18,11,.06);
          transition: transform .3s ease, box-shadow .3s ease, border-color .3s ease;
        }

        .pb-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 42px rgba(26,18,11,.12);
          border-color: rgba(200,132,26,.34);
        }

        .pb-image {
          position: relative;
          height: 285px;
          overflow: hidden;
          flex-shrink: 0;
          background: #1a120b;
        }

        .pb-image-bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          transition: transform .5s ease;
        }

        .pb-card:hover .pb-image-bg {
          transform: scale(1.05);
        }

        .pb-image::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(20,10,2,.68) 0%, transparent 62%);
        }

        .pb-number {
          position: absolute;
          top: 15px;
          left: 15px;
          z-index: 1;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255,255,255,.94);
          color: #c8841a;
          font-size: 12px;
          font-weight: 900;
          box-shadow: 0 6px 18px rgba(0,0,0,.12);
        }

        .pb-image-label {
          position: absolute;
          right: 15px;
          bottom: 15px;
          z-index: 1;
          max-width: calc(100% - 30px);
          padding: 7px 13px;
          border-radius: 999px;
          background: #c8841a;
          color: #fff;
          font-size: 11px;
          font-weight: 900;
          white-space: nowrap;
        }

        .pb-content {
          display: flex;
          flex-direction: column;
          flex: 1;
          padding: 24px 22px 22px;
        }

        .pb-subtitle {
          margin: 0 0 7px;
          color: #c8841a;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: .13em;
          text-transform: uppercase;
        }

        .pb-title {
          margin: 0 0 12px;
          color: #1a120b;
          font-size: 36px;
          line-height: 1.05;
          font-weight: 700;
        }

        .pb-description {
          margin: 0;
          color: #7a6a52;
          font-size: 14px;
          line-height: 1.75;
        }

        .pb-card-footer {
          margin-top: auto;
          padding-top: 22px;
        }

        .pb-card-line {
          height: 1px;
          width: 100%;
          background: #f0e6d8;
          margin-bottom: 18px;
        }

        .pb-card-action {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          color: #92640e;
          font-size: 13px;
          font-weight: 900;
        }

        .pb-card-action span:last-child {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: #fef3d0;
          border: 1px solid #e8d5a0;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: background .2s ease, color .2s ease;
        }

        .pb-card:hover .pb-card-action span:last-child {
          background: #c8841a;
          color: #fff;
        }

        .pb-info {
          margin-top: 54px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 22px;
          align-items: stretch;
        }

        .pb-info-box {
          border-radius: 24px;
          background: #fff;
          border: 1.5px solid #e6d9c4;
          padding: 28px;
          box-shadow: 0 8px 26px rgba(26,18,11,.05);
        }

        .pb-info-box.dark {
          background: linear-gradient(135deg, #1a120b 0%, #2c1a0a 100%);
          border-color: rgba(200,132,26,.24);
        }

        .pb-info-title {
          margin: 0 0 10px;
          font-size: 30px;
          line-height: 1.1;
          font-weight: 700;
          color: #1a120b;
        }

        .pb-info-box.dark .pb-info-title {
          color: #fff;
        }

        .pb-info-text {
          margin: 0;
          color: #7a6a52;
          font-size: 15px;
          line-height: 1.8;
        }

        .pb-info-box.dark .pb-info-text {
          color: rgba(255,255,255,.66);
        }

        .pb-cta {
          margin-top: 68px;
          border-radius: 30px;
          overflow: hidden;
          background: linear-gradient(135deg, #1a120b 0%, #2c1a0a 100%);
          position: relative;
          padding: 58px 46px;
          text-align: center;
        }

        .pb-cta::before {
          content: '';
          position: absolute;
          top: -90px;
          right: -90px;
          width: 330px;
          height: 330px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(200,132,26,.18) 0%, transparent 70%);
          pointer-events: none;
        }

        .pb-cta-content {
          position: relative;
          z-index: 1;
          max-width: 760px;
          margin: 0 auto;
        }

        .pb-cta-title {
          margin: 0 0 16px;
          color: #fff;
          font-size: 48px;
          line-height: 1.08;
          font-weight: 700;
        }

        .pb-cta-title em {
          color: #c8841a;
          font-style: italic;
        }

        .pb-cta-text {
          margin: 0 auto 28px;
          color: rgba(255,255,255,.66);
          font-size: 16px;
          line-height: 1.85;
          max-width: 560px;
        }

        .pb-cta-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          min-height: 50px;
          padding: 0 28px;
          border-radius: 999px;
          background: #c8841a;
          color: #fff;
          text-decoration: none;
          font-size: 15px;
          font-weight: 900;
          box-shadow: 0 8px 24px rgba(200,132,26,.34);
          transition: transform .2s ease, box-shadow .2s ease;
        }

        .pb-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 34px rgba(200,132,26,.45);
        }

        .pb-scroll-top {
          position: fixed;
          bottom: 24px;
          right: 22px;
          z-index: 999;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: #c8841a;
          color: #fff;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 20px rgba(200,132,26,.45);
          opacity: 0;
          transform: translateY(14px) scale(.85);
          pointer-events: none;
          transition: opacity .28s ease, transform .28s ease;
        }

        .pb-scroll-top.visible {
          opacity: 1;
          transform: translateY(0) scale(1);
          pointer-events: auto;
        }

        @media (max-width: 1023px) {
          .pb-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .pb-info {
            grid-template-columns: 1fr;
          }

          .pb-hero-title {
            font-size: 64px;
          }

          .pb-head-title {
            font-size: 44px;
          }
        }

        @media (max-width: 639px) {
          .pb-hero-inner {
            padding: 58px 18px 48px;
          }

          .pb-hero::after {
            width: 340px;
            height: 340px;
          }

          .pb-badge {
            padding: 7px 13px;
            font-size: 10px;
            letter-spacing: .09em;
            margin-bottom: 22px;
          }

          .pb-hero-title {
            font-size: 42px;
            line-height: 1.05;
          }

          .pb-hero-text {
            font-size: 14.5px;
            line-height: 1.75;
          }

          .pb-ticker {
            animation-duration: 18s;
          }

          .pb-ticker-item {
            gap: 10px;
            padding-right: 26px;
          }

          .pb-ticker-text {
            font-size: 10px;
            letter-spacing: .05em;
          }

          .pb-main {
            padding: 44px 16px 76px;
          }

          .pb-head {
            margin-bottom: 32px;
          }

          .pb-kicker {
            font-size: 10.5px;
            letter-spacing: .15em;
          }

          .pb-head-title {
            font-size: 33px;
          }

          .pb-head-text {
            font-size: 14px;
          }

          .pb-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .pb-card {
            border-radius: 22px;
          }

          .pb-image {
            height: 235px;
          }

          .pb-content {
            padding: 22px 18px 20px;
          }

          .pb-title {
            font-size: 30px;
          }

          .pb-description {
            font-size: 13.8px;
          }

          .pb-info {
            margin-top: 42px;
            gap: 18px;
          }

          .pb-info-box {
            padding: 24px 20px;
            border-radius: 22px;
          }

          .pb-info-title {
            font-size: 27px;
          }

          .pb-info-text {
            font-size: 14px;
          }

          .pb-cta {
            margin-top: 48px;
            border-radius: 24px;
            padding: 44px 20px;
          }

          .pb-cta-title {
            font-size: 32px;
          }

          .pb-cta-text {
            font-size: 14.5px;
          }

          .pb-cta-btn {
            width: 100%;
          }

          .pb-scroll-top {
            width: 44px;
            height: 44px;
            right: 16px;
            bottom: 18px;
          }
        }
      `}</style>

      <main className="pb">
        <section className="pb-hero">
          <div className="pb-hero-inner">
            <div className="pb-badge pb-a1">
              <span className="pb-badge-dot" />
              <span>Kujtime nga eventi</span>
            </div>

            <h1 className="pb-serif pb-hero-title pb-a2">
              Photo Booth dhe <em>Photo Box</em>
            </h1>

            <p className="pb-hero-text pb-a3">
              Krijoni kënd fotografik të veçantë për mysafirët tuaj me Photo Booth,
              Photo Box dhe pasqyrë të personalizuar për evente elegante e të paharrueshme.
            </p>
          </div>

          <div className="pb-ticker-wrap">
            <div className="pb-ticker">
              {[0, 1].map((groupIndex) => (
                <div className="pb-ticker-group" key={groupIndex}>
                  {tickerItems.map((item) => (
                    <span className="pb-ticker-item" key={`${groupIndex}-${item}`}>
                      <span className="pb-ticker-star">✦</span>
                      <span className="pb-ticker-text">{item}</span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-main">
          <div className="pb-head">
            <p className="pb-kicker">Zgjidh shërbimin</p>

            <h2 className="pb-serif pb-head-title">
              Detaje që e bëjnë eventin <em>më të veçantë.</em>
            </h2>

            <p className="pb-head-text">
              Çmimi vendoset sipas shërbimit që zgjedhni, kohëzgjatjes së eventit,
              dizajnit dhe detajeve të personalizimit.
            </p>
          </div>

          <div className="pb-grid">
            {photoServices.map((service) => (
              <article className="pb-card" key={service.title}>
                <div className="pb-image">
                  <div
                    className="pb-image-bg"
                    style={{ backgroundImage: `url("${service.image}")` }}
                  />

                  <div className="pb-number">{service.number}</div>

                  <div className="pb-image-label">{service.subtitle}</div>
                </div>

                <div className="pb-content">
                  <p className="pb-subtitle">{service.subtitle}</p>

                  <h3 className="pb-serif pb-title">{service.title}</h3>

                  <p className="pb-description">{service.description}</p>

                  <div className="pb-card-footer">
                    <div className="pb-card-line" />

                    <div className="pb-card-action">
                      <span>Çmimi sipas kërkesës</span>
                      <span>→</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="pb-info">
            <div className="pb-info-box">
              <p className="pb-kicker">Personalizim</p>

              <h3 className="pb-serif pb-info-title">
                Emër, datë apo tekst sipas eventit tuaj
              </h3>

              <p className="pb-info-text">
                Te pasqyra e personalizuar mund të vendoset tekst i veçantë, emër,
                datë apo dedikim sipas llojit të eventit. Ajo shërben si detaj elegant
                dekorativ dhe si hapësirë e bukur për foto.
              </p>
            </div>

            <div className="pb-info-box dark">
              <p className="pb-kicker">Çmimi</p>

              <h3 className="pb-serif pb-info-title">
                Oferta përgatitet pasi të dimë kërkesën tuaj
              </h3>

              <p className="pb-info-text">
                Për Photo Booth, Photo Box dhe pasqyrën e personalizuar, çmimi nuk është
                fiks. Ai caktohet sipas shërbimit, kohëzgjatjes, vendit dhe detajeve që
                dëshironi për eventin.
              </p>
            </div>
          </div>

          <div className="pb-cta">
            <div className="pb-cta-content">
              <p className="pb-kicker">Gati për kujtime?</p>

              <h2 className="pb-serif pb-cta-title">
                Shto një kënd fotografik <em>në eventin tënd.</em>
              </h2>

              <p className="pb-cta-text">
                Na tregoni datën, vendin dhe llojin e shërbimit që dëshironi. Ne ju
                përgatisim ofertën më të përshtatshme për eventin tuaj.
              </p>

              <Link to="/booking" className="pb-cta-btn">
                Rezervo Eventin
                <span>→</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <ScrollToTop />
    </>
  );
}