import { Link } from 'react-router-dom';

type ActivityCard = {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  icon: string;
};

const activities: ActivityCard[] = [
  {
    title: 'Pikturim Fytyre',
    subtitle: 'Face Painting',
    description:
      'Ngjyrosje kreative për fëmijë me dizajne të bukura, të përshtatshme për ditëlindje, festa dhe evente familjare.',
    image: '/images/activities/face-painting.png',
    icon: '01',
  },
  {
    title: 'Art me Balona',
    subtitle: 'Balloon Art',
    description:
      'Forma të ndryshme me balona për fëmijë, të krijuara gjatë eventit për ta bërë festën më argëtuese dhe më të gjallë.',
    image: '/images/activities/balloon-art.png',
    icon: '02',
  },
  {
    title: 'Photo Booth',
    subtitle: 'Kujtime nga festa',
    description:
      'Kënd fotografik për mysafirët, me atmosferë të veçantë dhe kujtime që mbeten gjatë pas përfundimit të eventit.',
    image: '/images/packages/photo-booth.png',
    icon: '03',
  },
  {
    title: 'DJ dhe Muzikë',
    subtitle: 'Atmosferë festive',
    description:
      'Muzikë, zërim dhe atmosferë e përshtatur për fëmijë dhe familje, që festa të jetë më dinamike dhe më argëtuese.',
    image: '/images/activities/dj-music.png',
    icon: '04',
  },
  {
    title: 'Candy Cart',
    subtitle: 'Kënd i ëmbël',
    description:
      'Kënd dekorativ me ëmbëlsira dhe detaje të bukura, i përshtatur me stilin dhe ngjyrat e eventit tuaj.',
    image: '/images/activities/candy-cart.png',
    icon: '05',
  },
  {
    title: 'Tabela Mirëseardhëse',
    subtitle: 'Welcome Sign Setup',
    description:
      'Vendosje elegante e tabelës mirëseardhëse për hyrjen e eventit, me dekorim dhe detaje të personalizuara.',
    image: '/images/activities/welcome-sign-setup.png',
    icon: '06',
  },
];

function ScrollToTop() {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Kthehu lart"
      className="ap-scroll-top"
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

export default function ActivitiesPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=DM+Sans:wght@400;500;600;700;800&display=swap');

        .ap,
        .ap * {
          box-sizing: border-box;
        }

        .ap {
          width: 100%;
          max-width: 100%;
          overflow-x: hidden;
          background: #faf7f2;
          color: #1a120b;
          font-family: 'DM Sans', sans-serif;
        }

        .ap-serif {
          font-family: 'Cormorant Garamond', serif;
        }

        @keyframes ap-fade-up {
          from {
            opacity: 0;
            transform: translateY(22px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes ap-marquee {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }

        .ap-a1 {
          animation: ap-fade-up .55s ease both .05s;
        }

        .ap-a2 {
          animation: ap-fade-up .55s ease both .18s;
        }

        .ap-a3 {
          animation: ap-fade-up .55s ease both .3s;
        }

        .ap-hero {
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #1a120b 0%, #2c1a0a 55%, #1a120b 100%);
        }

        .ap-hero::before {
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

        .ap-hero::after {
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

        .ap-hero-inner {
          position: relative;
          z-index: 1;
          max-width: 1200px;
          margin: 0 auto;
          padding: 86px 44px 78px;
          text-align: center;
        }

        .ap-badge {
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

        .ap-hero-title {
          margin: 0 0 18px;
          color: #fff;
          font-size: 82px;
          line-height: 1.02;
          font-weight: 700;
        }

        .ap-hero-title em {
          color: #c8841a;
          font-style: italic;
        }

        .ap-hero-text {
          margin: 0 auto;
          max-width: 650px;
          color: rgba(255,255,255,.66);
          font-size: 18px;
          line-height: 1.85;
        }

        .ap-ticker-wrap {
          width: 100%;
          overflow: hidden;
          border-top: 1px solid rgba(200,132,26,.18);
          padding: 13px 0;
        }

        .ap-ticker {
          display: flex;
          width: max-content;
          max-width: none;
          animation: ap-marquee 23s linear infinite;
          will-change: transform;
        }

        .ap-ticker-group {
          display: inline-flex;
          align-items: center;
          flex-shrink: 0;
          max-width: none;
        }

        .ap-ticker-item {
          display: inline-flex;
          align-items: center;
          gap: 16px;
          padding-right: 40px;
          white-space: nowrap;
          max-width: none;
        }

        .ap-ticker-star {
          color: #c8841a;
          font-size: 13px;
        }

        .ap-ticker-text {
          color: rgba(255,255,255,.45);
          font-size: 12px;
          font-weight: 800;
          letter-spacing: .08em;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .ap-main {
          max-width: 1280px;
          margin: 0 auto;
          padding: 70px 44px 96px;
        }

        .ap-head {
          max-width: 720px;
          margin: 0 auto 44px;
          text-align: center;
        }

        .ap-kicker {
          margin: 0 0 9px;
          color: #c8841a;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: .18em;
          text-transform: uppercase;
        }

        .ap-head-title {
          margin: 0 0 14px;
          color: #1a120b;
          font-size: 50px;
          line-height: 1.08;
          font-weight: 700;
        }

        .ap-head-title em {
          color: #c8841a;
          font-style: italic;
        }

        .ap-head-text {
          margin: 0;
          color: #7a6a52;
          font-size: 16px;
          line-height: 1.8;
        }

        .ap-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 24px;
          align-items: stretch;
        }

        .ap-card {
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

        .ap-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 42px rgba(26,18,11,.12);
          border-color: rgba(200,132,26,.34);
        }

        .ap-image {
          position: relative;
          height: 245px;
          overflow: hidden;
          flex-shrink: 0;
        }

        .ap-image-bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          transition: transform .5s ease;
        }

        .ap-card:hover .ap-image-bg {
          transform: scale(1.05);
        }

        .ap-image::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(20,10,2,.66) 0%, transparent 62%);
        }

        .ap-number {
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

        .ap-image-label {
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

        .ap-content {
          display: flex;
          flex-direction: column;
          flex: 1;
          padding: 24px 22px 22px;
        }

        .ap-subtitle {
          margin: 0 0 7px;
          color: #c8841a;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: .13em;
          text-transform: uppercase;
        }

        .ap-title {
          margin: 0 0 12px;
          color: #1a120b;
          font-size: 34px;
          line-height: 1.05;
          font-weight: 700;
        }

        .ap-description {
          margin: 0;
          color: #7a6a52;
          font-size: 14px;
          line-height: 1.75;
        }

        .ap-card-footer {
          margin-top: auto;
          padding-top: 22px;
        }

        .ap-card-line {
          height: 1px;
          width: 100%;
          background: #f0e6d8;
          margin-bottom: 18px;
        }

        .ap-card-action {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          color: #92640e;
          font-size: 13px;
          font-weight: 900;
        }

        .ap-card-action span:last-child {
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

        .ap-card:hover .ap-card-action span:last-child {
          background: #c8841a;
          color: #fff;
        }

        .ap-cta {
          margin-top: 68px;
          border-radius: 30px;
          overflow: hidden;
          background: linear-gradient(135deg, #1a120b 0%, #2c1a0a 100%);
          position: relative;
          padding: 58px 46px;
          text-align: center;
        }

        .ap-cta::before {
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

        .ap-cta-content {
          position: relative;
          z-index: 1;
          max-width: 760px;
          margin: 0 auto;
        }

        .ap-cta-title {
          margin: 0 0 16px;
          color: #fff;
          font-size: 48px;
          line-height: 1.08;
          font-weight: 700;
        }

        .ap-cta-title em {
          color: #c8841a;
          font-style: italic;
        }

        .ap-cta-text {
          margin: 0 auto 28px;
          color: rgba(255,255,255,.66);
          font-size: 16px;
          line-height: 1.85;
          max-width: 560px;
        }

        .ap-cta-btn {
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

        .ap-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 34px rgba(200,132,26,.45);
        }

        .ap-scroll-top {
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
        }

        @media (max-width: 1023px) {
          .ap-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .ap-hero-title {
            font-size: 64px;
          }

          .ap-head-title {
            font-size: 44px;
          }
        }

        @media (max-width: 639px) {
          .ap-hero-inner {
            padding: 58px 18px 48px;
          }

          .ap-hero::after {
            width: 340px;
            height: 340px;
          }

          .ap-badge {
            padding: 7px 13px;
            font-size: 10px;
            letter-spacing: .09em;
            margin-bottom: 22px;
          }

          .ap-hero-title {
            font-size: 42px;
            line-height: 1.05;
          }

          .ap-hero-text {
            font-size: 14.5px;
            line-height: 1.75;
          }

          .ap-ticker {
            animation-duration: 18s;
          }

          .ap-ticker-item {
            gap: 10px;
            padding-right: 26px;
          }

          .ap-ticker-text {
            font-size: 10px;
            letter-spacing: .05em;
          }

          .ap-main {
            padding: 44px 16px 76px;
          }

          .ap-head {
            margin-bottom: 32px;
          }

          .ap-kicker {
            font-size: 10.5px;
            letter-spacing: .15em;
          }

          .ap-head-title {
            font-size: 33px;
          }

          .ap-head-text {
            font-size: 14px;
          }

          .ap-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .ap-card {
            border-radius: 22px;
          }

          .ap-image {
            height: 220px;
          }

          .ap-content {
            padding: 22px 18px 20px;
          }

          .ap-title {
            font-size: 30px;
          }

          .ap-description {
            font-size: 13.8px;
          }

          .ap-cta {
            margin-top: 48px;
            border-radius: 24px;
            padding: 44px 20px;
          }

          .ap-cta-title {
            font-size: 32px;
          }

          .ap-cta-text {
            font-size: 14.5px;
          }

          .ap-cta-btn {
            width: 100%;
          }

          .ap-scroll-top {
            width: 44px;
            height: 44px;
            right: 16px;
            bottom: 18px;
          }
        }
      `}</style>

      <main className="ap">
        <section className="ap-hero">
          <div className="ap-hero-inner">
            <div className="ap-badge ap-a1">
              <span>🎪</span>
              <span>Aktivitete për fëmijë</span>
            </div>

            <h1 className="ap-serif ap-hero-title ap-a2">
              Aktivitete dhe <em>argëtim</em>
            </h1>

            <p className="ap-hero-text ap-a3">
              Zgjidhni shërbimet që e bëjnë festën më të gjallë, më të bukur dhe më të paharrueshme për fëmijët dhe mysafirët.
            </p>
          </div>

          <div className="ap-ticker-wrap">
            <div className="ap-ticker">
              {[0, 1].map((groupIndex) => (
                <div className="ap-ticker-group" key={groupIndex}>
                  {[
                    'Pikturim Fytyre',
                    'Art me Balona',
                    'Photo Booth',
                    'DJ dhe Muzikë',
                    'Candy Cart',
                    'Tabela Mirëseardhëse',
                  ].map((item) => (
                    <span className="ap-ticker-item" key={`${groupIndex}-${item}`}>
                      <span className="ap-ticker-star">✦</span>
                      <span className="ap-ticker-text">{item}</span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="ap-main">
          <div className="ap-head">
            <p className="ap-kicker">Zgjidh aktivitetin</p>

            <h2 className="ap-serif ap-head-title">
              Shërbime që i japin <em>jetë festës.</em>
            </h2>

            <p className="ap-head-text">
              Këto aktivitete mund të kombinohen me dekorime, maskota dhe paketa të tjera për të krijuar një event të plotë.
            </p>
          </div>

          <div className="ap-grid">
            {activities.map((activity) => (
              <article className="ap-card" key={activity.title}>
                <div className="ap-image">
                  <div
                    className="ap-image-bg"
                    style={{ backgroundImage: `url("${activity.image}")` }}
                  />

                  <div className="ap-number">{activity.icon}</div>

                  <div className="ap-image-label">{activity.subtitle}</div>
                </div>

                <div className="ap-content">
                  <p className="ap-subtitle">{activity.subtitle}</p>

                  <h3 className="ap-serif ap-title">{activity.title}</h3>

                  <p className="ap-description">{activity.description}</p>

                  <div className="ap-card-footer">
                    <div className="ap-card-line" />

                    <div className="ap-card-action">
                      <span>Mund të shtohet në event</span>
                      <span>→</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="ap-cta">
            <div className="ap-cta-content">
              <p className="ap-kicker">Gati për argëtim?</p>

              <h2 className="ap-serif ap-cta-title">
                Kombino aktivitetet me paketën <em>që të përshtatet më së miri.</em>
              </h2>

              <p className="ap-cta-text">
                Na tregoni datën, moshën e fëmijëve dhe stilin e festës. Ne ju ndihmojmë të zgjidhni aktivitetet më të përshtatshme për eventin tuaj.
              </p>

              <Link to="/booking" className="ap-cta-btn">
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