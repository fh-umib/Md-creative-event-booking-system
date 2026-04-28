import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

type IconName =
  | 'sparkles'
  | 'heart'
  | 'camera'
  | 'arrow'
  | 'flower'
  | 'star'
  | 'gift'
  | 'home'
  | 'ring'
  | 'palette';

type DecorationService = {
  title: string;
  subtitle: string;
  description: string;
  details: string[];
  icon: IconName;
};

function GoldIcon({ name }: { name: IconName }) {
  const props: React.SVGProps<SVGSVGElement> = {
    width: 22,
    height: 22,
    viewBox: '0 0 24 24',
    fill: 'none',
  };

  if (name === 'sparkles') {
    return (
      <svg {...props}>
        <path
          d="M12 2.8l1.7 5 5 1.7-5 1.7-1.7 5-1.7-5-5-1.7 5-1.7 1.7-5Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M18.6 14.6l.7 2.1 2.1.7-2.1.7-.7 2.1-.7-2.1-2.1-.7 2.1-.7.7-2.1Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (name === 'heart') {
    return (
      <svg {...props}>
        <path
          d="M20.2 5.9c-1.6-1.9-4.3-2-6.1-.3L12 7.6 9.9 5.6c-1.8-1.7-4.5-1.6-6.1.3-1.8 2-1.7 5 .3 6.9l7.9 7.3 7.9-7.3c2-1.9 2.1-4.9.3-6.9Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (name === 'camera') {
    return (
      <svg {...props}>
        <path
          d="M8.5 6.5 10 4h4l1.5 2.5H19A2.5 2.5 0 0 1 21.5 9v8A2.5 2.5 0 0 1 19 19.5H5A2.5 2.5 0 0 1 2.5 17V9A2.5 2.5 0 0 1 5 6.5h3.5Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M12 16a3.2 3.2 0 1 0 0-6.4A3.2 3.2 0 0 0 12 16Z"
          stroke="currentColor"
          strokeWidth="1.8"
        />
      </svg>
    );
  }

  if (name === 'flower') {
    return (
      <svg {...props}>
        <path
          d="M12 13.4a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M12 7.4c1.2-2.6 3.7-3.1 4.8-2 1.1 1.1.6 3.6-2 4.8 2.6 1.2 3.1 3.7 2 4.8-1.1 1.1-3.6.6-4.8-2-1.2 2.6-3.7 3.1-4.8 2-1.1-1.1-.6-3.6 2-4.8-2.6-1.2-3.1-3.7-2-4.8 1.1-1.1 3.6-.6 4.8 2Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (name === 'gift') {
    return (
      <svg {...props}>
        <path
          d="M4 10h16v10H4V10ZM3 7h18v3H3V7ZM12 7v13"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M12 7s-4.5.2-4.5-2.1C7.5 3.7 8.4 3 9.4 3 11.2 3 12 7 12 7ZM12 7s4.5.2 4.5-2.1c0-1.2-.9-1.9-1.9-1.9C12.8 3 12 7 12 7Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (name === 'home') {
    return (
      <svg {...props}>
        <path
          d="M3.5 11.5 12 4l8.5 7.5M5.5 10.2V20h13v-9.8"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.5 20v-5h5v5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (name === 'ring') {
    return (
      <svg {...props}>
        <path
          d="M9 5h6l-1.5 3h-3L9 5Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M12 21a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13Z"
          stroke="currentColor"
          strokeWidth="1.8"
        />
      </svg>
    );
  }

  if (name === 'palette') {
    return (
      <svg {...props}>
        <path
          d="M12 3.5a8.5 8.5 0 0 0 0 17h1.2c1.4 0 2.1-1.7 1.1-2.7-.7-.7-.2-1.9.8-1.9H17a4.5 4.5 0 0 0 4.5-4.5C21.5 7 17.2 3.5 12 3.5Z"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path d="M8 10h.01M11 7.5h.01M15 8.5h.01M7.5 14h.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === 'star') {
    return (
      <svg {...props}>
        <path
          d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1L12 16.9l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg {...props}>
      <path
        d="M4 12h14M14 7l5 5-5 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Kthehu lart"
      className={visible ? 'decor-scroll visible' : 'decor-scroll'}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
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

const services: DecorationService[] = [
  {
    title: 'Dekore për ditëlindje',
    subtitle: 'Për vajza dhe djem',
    description:
      'Krijojmë dekore të personalizuara për ditëlindje fëmijësh, me tema, ngjyra dhe detaje që përshtaten me dëshirën e klientit.',
    details: ['Backdrop tematik', 'Balona me ngjyra të kombinuara', 'Tavolina kryesore', 'Detaje sipas personazhit ose temës'],
    icon: 'gift',
  },
  {
    title: 'Dekore për baby shower',
    subtitle: 'Të buta dhe elegante',
    description:
      'Për baby shower përgatisim atmosferë të ngrohtë, të ëmbël dhe shumë të kujdesshme, me ngjyra të buta dhe elemente që duken bukur në foto.',
    details: ['Ngjyra pastel', 'Balona dhe lule dekorative', 'Kënd për fotografi', 'Tekste të personalizuara'],
    icon: 'heart',
  },
  {
    title: 'Dekore për fejesa dhe dasma',
    subtitle: 'Momente familjare me stil',
    description:
      'Për fejesa dhe dasma fokusohemi në elegancë, pastërti vizuale dhe detaje që e bëjnë hapësirën të duket më solemne.',
    details: ['Dekor elegant hyrjeje', 'Aranzhime me lule', 'Kënde fotografike', 'Përshtatje me ngjyrat e eventit'],
    icon: 'ring',
  },
  {
    title: 'Balona për hyrje',
    subtitle: 'Përshtypja e parë',
    description:
      'Dekorimi i hyrjes është pjesa që krijon përshtypjen e parë te mysafirët. Ne e ndërtojmë hyrjen sipas hapësirës dhe stilit të eventit.',
    details: ['Hyrje me balona', 'Kombinime gold, nude, pastel ose tema fëmijësh', 'Vendosje sipas ambientit', 'Detaje mirëseardhjeje'],
    icon: 'home',
  },
  {
    title: 'Mirëseardhje dhe tabela të personalizuara',
    subtitle: 'Detaji që e bën eventin unik',
    description:
      'Përgatisim kënde mirëseardhjeje, tabela me emër, mbishkrime dhe elemente të personalizuara që i japin eventit identitet.',
    details: ['Tabela mirëseardhjeje', 'Emra të personalizuar', 'Përshtatje me temën', 'Vendosje pranë hyrjes ose këndit kryesor'],
    icon: 'sparkles',
  },
  {
    title: 'Kënde fotografike',
    subtitle: 'Për kujtime më të bukura',
    description:
      'Krijojmë kënde që janë të menduara për foto, video dhe kujtime. Çdo kënd ndërtohet që të duket bukur dhe i plotë në pamje.',
    details: ['Backdrop për foto', 'Kompozim me balona/lule', 'Detaje dekorative', 'Kombinim me Photo Booth ose Photo Box'],
    icon: 'camera',
  },
  {
    title: 'Lule, ngjyra dhe detaje dekorative',
    subtitle: 'Për atmosferë më të plotë',
    description:
      'Dekori nuk është vetëm vendosje balonash. Ne mundohemi të kombinojmë ngjyra, forma dhe detaje që ambienti të duket i kuruar.',
    details: ['Lule artificiale/dekorative', 'Kombinim ngjyrash', 'Elemente gold, cream ose pastel', 'Stilizim sipas eventit'],
    icon: 'flower',
  },
  {
    title: 'Dekore sipas kërkesës',
    subtitle: 'Çdo event ka çmim të veçantë',
    description:
      'Çmimet e dekorimeve nuk janë gjithmonë fikse, sepse varen nga tema, hapësira, madhësia dhe elementet që klienti zgjedh.',
    details: ['Analizojmë kërkesën', 'Përshtatim idenë me buxhetin', 'Propozojmë stilin më të mirë', 'Vendosim çmimin pas specifikimit'],
    icon: 'palette',
  },
];

const processSteps = [
  {
    title: 'Na tregoni idenë',
    text: 'Na dërgoni temën, ngjyrat, llojin e eventit dhe hapësirën ku mbahet festa.',
  },
  {
    title: 'Ne e planifikojmë stilin',
    text: 'E analizojmë kërkesën dhe propozojmë një kombinim që duket bukur, praktik dhe i përshtatshëm.',
  },
  {
    title: 'Realizojmë dekorin',
    text: 'Në ditën e eventit kujdesemi për vendosjen, detajet dhe atmosferën përfundimtare.',
  },
];

const smallImages = [
  '/images/home/decorations.png',
  '/images/gallery/wedding1.png',
  '/images/gallery/decoration-girl1.png',
];

export default function DecorationsPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,500;1,600&family=DM+Sans:wght@400;500;600;700;800;900&display=swap');

        * {
          box-sizing: border-box;
        }

        .decor-page {
          width: 100%;
          max-width: 100%;
          overflow-x: hidden;
          background:
            radial-gradient(circle at 12% 10%, rgba(200,132,26,0.10), transparent 28%),
            radial-gradient(circle at 88% 38%, rgba(85,45,18,0.08), transparent 30%),
            linear-gradient(180deg, #faf7f2 0%, #fffaf4 46%, #f6efe6 100%);
          color: #1a120b;
          font-family: 'DM Sans', sans-serif;
        }

        .decor-serif {
          font-family: 'Cormorant Garamond', serif;
        }

        .decor-wrap {
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 28px;
        }

        @keyframes decorFadeUp {
          from {
            opacity: 0;
            transform: translateY(28px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes decorFloat {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-12px);
          }
        }

        @keyframes decorMarquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        .decor-hero {
          position: relative;
          overflow: hidden;
          background:
            radial-gradient(circle at 16% 22%, rgba(209,145,31,0.18), transparent 28%),
            radial-gradient(circle at 82% 22%, rgba(255,255,255,0.08), transparent 22%),
            linear-gradient(125deg, #150d07 0%, #241409 45%, #321b0b 100%);
          color: #fff;
        }

        .decor-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: repeating-linear-gradient(
            45deg,
            rgba(255,255,255,0.035) 0,
            rgba(255,255,255,0.035) 1px,
            transparent 1px,
            transparent 70px
          );
          pointer-events: none;
        }

        .decor-hero-inner {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(320px, 0.95fr);
          gap: 34px;
          align-items: center;
          min-height: 680px;
          padding: 78px 0 88px;
        }

        .decor-hero-content {
          max-width: 760px;
          animation: decorFadeUp 0.85s ease both;
        }

        .decor-kicker {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 9px 18px;
          border-radius: 999px;
          background: rgba(200,132,26,0.14);
          border: 1px solid rgba(200,132,26,0.34);
          color: #e8b56a;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }

        .decor-kicker svg {
          color: #d89a2d;
        }

        .decor-title {
          margin: 24px 0 20px;
          font-size: clamp(62px, 7.5vw, 112px);
          line-height: 0.9;
          font-weight: 700;
          letter-spacing: -0.04em;
          color: #fff;
        }

        .decor-title em {
          color: #d89a2d;
          font-style: italic;
        }

        .decor-hero-text {
          max-width: 670px;
          margin: 0;
          color: rgba(255,255,255,0.84);
          font-size: 17px;
          line-height: 1.9;
        }

        .decor-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 32px;
        }

        .decor-btn-gold,
        .decor-btn-light,
        .decor-btn-dark {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          min-height: 52px;
          padding: 0 24px;
          border-radius: 16px;
          text-decoration: none;
          border: none;
          cursor: pointer;
          font-size: 14px;
          font-weight: 900;
          transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
        }

        .decor-btn-gold {
          background: linear-gradient(135deg, #d4911e, #c8841a);
          color: #fff;
          box-shadow: 0 12px 30px rgba(200,132,26,0.34);
        }

        .decor-btn-light {
          background: rgba(255,255,255,0.10);
          border: 1px solid rgba(255,255,255,0.18);
          color: #fff;
        }

        .decor-btn-dark {
          background: #1a120b;
          color: #fff;
        }

        .decor-btn-gold:hover,
        .decor-btn-light:hover,
        .decor-btn-dark:hover {
          transform: translateY(-2px);
        }

        .decor-visual {
          position: relative;
          min-height: 520px;
          animation: decorFadeUp 1s ease both 0.15s;
        }

        .decor-visual-card {
          position: absolute;
          border-radius: 34px;
          background:
            linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.05));
          border: 1px solid rgba(255,255,255,0.12);
          box-shadow: 0 24px 60px rgba(0,0,0,0.28);
          backdrop-filter: blur(10px);
        }

        .decor-visual-main {
          width: 360px;
          height: 430px;
          right: 40px;
          top: 38px;
          padding: 30px;
          animation: decorFloat 5.5s ease-in-out infinite;
        }

        .decor-visual-side {
          width: 220px;
          height: 260px;
          left: 20px;
          bottom: 52px;
          transform: rotate(-7deg);
          opacity: 0.75;
        }

        .decor-arch {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 180px 180px 28px 28px;
          border: 2px solid rgba(232,181,106,0.46);
          background:
            radial-gradient(circle at 50% 16%, rgba(216,154,45,0.22), transparent 30%),
            linear-gradient(180deg, rgba(255,255,255,0.10), rgba(255,255,255,0.04));
          overflow: hidden;
        }

        .decor-arch::before {
          content: '';
          position: absolute;
          left: 50%;
          bottom: 30px;
          width: 160px;
          height: 160px;
          transform: translateX(-50%);
          border-radius: 50%;
          background: radial-gradient(circle, rgba(216,154,45,0.22), transparent 68%);
        }

        .decor-balloon {
          position: absolute;
          width: 44px;
          height: 56px;
          border-radius: 50%;
          background: linear-gradient(180deg, #f7e6c8, #c8841a);
          box-shadow: 0 12px 28px rgba(0,0,0,0.16);
        }

        .decor-balloon.one {
          left: 42px;
          top: 90px;
        }

        .decor-balloon.two {
          right: 42px;
          top: 120px;
          background: linear-gradient(180deg, #ffffff, #eadcc8);
        }

        .decor-balloon.three {
          left: 82px;
          bottom: 110px;
          background: linear-gradient(180deg, #f4d6cc, #d6a48e);
        }

        .decor-balloon.four {
          right: 82px;
          bottom: 88px;
          background: linear-gradient(180deg, #f7ead8, #d8b27d);
        }

        .decor-visual-label {
          position: absolute;
          left: 50%;
          bottom: 42px;
          transform: translateX(-50%);
          padding: 12px 16px;
          border-radius: 999px;
          background: rgba(26,18,11,0.58);
          color: #fff7ea;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .decor-floating-note {
          position: absolute;
          left: 0;
          top: 60px;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 13px 16px;
          border-radius: 18px;
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.13);
          color: #fff7ea;
          font-size: 13px;
          font-weight: 800;
          backdrop-filter: blur(10px);
        }

        .decor-floating-note svg {
          color: #d89a2d;
        }

        .decor-marquee {
          overflow: hidden;
          background: linear-gradient(90deg, #170d07, #2a1609, #170d07);
          border-top: 1px solid rgba(255,255,255,0.08);
          border-bottom: 1px solid rgba(255,255,255,0.08);
          padding: 15px 0;
        }

        .decor-marquee-track {
          display: flex;
          width: max-content;
          animation: decorMarquee 34s linear infinite;
        }

        .decor-marquee-group {
          display: flex;
          white-space: nowrap;
        }

        .decor-marquee-item {
          display: inline-flex;
          align-items: center;
          gap: 16px;
          padding: 0 24px;
          color: #f2dfbd;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        .decor-marquee-dot {
          width: 8px;
          height: 8px;
          border-radius: 2px;
          background: #d1911f;
          transform: rotate(45deg);
          box-shadow: 0 0 14px rgba(209,145,31,0.58);
        }

        .decor-section {
          padding: 84px 0;
        }

        .decor-section-head {
          max-width: 850px;
          margin: 0 auto 42px;
          text-align: center;
        }

        .decor-section-title {
          margin: 16px 0 14px;
          font-size: clamp(42px, 5vw, 76px);
          line-height: 0.98;
          font-weight: 700;
          color: #1a120b;
        }

        .decor-section-title em {
          color: #c8841a;
          font-style: italic;
        }

        .decor-section-text {
          margin: 0 auto;
          max-width: 750px;
          color: #74685b;
          font-size: 16px;
          line-height: 1.85;
        }

        .decor-services-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 18px;
        }

        .decor-service-card {
          position: relative;
          overflow: hidden;
          min-height: 360px;
          padding: 26px 22px;
          border-radius: 28px;
          background:
            radial-gradient(circle at top right, rgba(200,132,26,0.09), transparent 36%),
            linear-gradient(180deg, rgba(255,255,255,0.96), rgba(255,249,241,0.98));
          border: 1px solid #eadfce;
          box-shadow: 0 14px 34px rgba(26,18,11,0.07);
          animation: decorFadeUp 0.75s ease both;
          transition: transform 0.32s ease, box-shadow 0.32s ease;
        }

        .decor-service-card:hover {
          transform: translateY(-7px);
          box-shadow: 0 24px 52px rgba(26,18,11,0.12);
        }

        .decor-service-card::after {
          content: '';
          position: absolute;
          right: -45px;
          bottom: -45px;
          width: 140px;
          height: 140px;
          border-radius: 50%;
          background: rgba(200,132,26,0.07);
        }

        .decor-service-icon {
          width: 52px;
          height: 52px;
          border-radius: 17px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #c8841a;
          background: rgba(200,132,26,0.10);
          margin-bottom: 18px;
        }

        .decor-service-subtitle {
          display: block;
          margin-bottom: 10px;
          color: #c8841a;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 0.13em;
          text-transform: uppercase;
        }

        .decor-service-title {
          margin: 0 0 12px;
          color: #1a120b;
          font-size: 28px;
          line-height: 1;
          font-weight: 900;
        }

        .decor-service-desc {
          margin: 0 0 18px;
          color: #6f6254;
          font-size: 14px;
          line-height: 1.72;
        }

        .decor-detail-list {
          position: relative;
          z-index: 2;
          display: grid;
          gap: 9px;
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .decor-detail-list li {
          display: flex;
          gap: 9px;
          align-items: flex-start;
          color: #7a6b5c;
          font-size: 13px;
          line-height: 1.5;
        }

        .decor-detail-list li::before {
          content: '';
          width: 7px;
          height: 7px;
          margin-top: 6px;
          border-radius: 2px;
          background: #c8841a;
          transform: rotate(45deg);
          flex-shrink: 0;
        }

        .decor-process {
          padding: 0 0 84px;
        }

        .decor-process-box {
          border-radius: 34px;
          overflow: hidden;
          border: 1px solid #eadfce;
          background: #fffaf4;
          box-shadow: 0 18px 44px rgba(26,18,11,0.08);
        }

        .decor-process-top {
          display: grid;
          grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
          gap: 0;
        }

        .decor-process-preview {
          position: relative;
          min-height: 420px;
          background:
            linear-gradient(135deg, rgba(20,12,6,0.74), rgba(64,37,14,0.52)),
            url('/images/home/decorations.png');
          background-size: cover;
          background-position: center;
        }

        .decor-process-preview::after {
          content: '';
          position: absolute;
          inset: 22px;
          border: 1px solid rgba(255,255,255,0.22);
          border-radius: 26px;
        }

        .decor-process-content {
          padding: 44px;
        }

        .decor-process-title {
          margin: 0 0 12px;
          font-size: clamp(36px, 4vw, 58px);
          line-height: 0.98;
          color: #1a120b;
          font-weight: 700;
        }

        .decor-process-title em {
          color: #c8841a;
          font-style: italic;
        }

        .decor-steps {
          display: grid;
          gap: 16px;
          margin-top: 28px;
        }

        .decor-step {
          display: grid;
          grid-template-columns: 52px 1fr;
          gap: 16px;
          align-items: flex-start;
          padding: 18px;
          border-radius: 22px;
          background: rgba(255,255,255,0.68);
          border: 1px solid #efe3d4;
        }

        .decor-step-number {
          width: 52px;
          height: 52px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #1a120b;
          color: #fff;
          font-size: 15px;
          font-weight: 900;
        }

        .decor-step h3 {
          margin: 0 0 6px;
          font-size: 18px;
          color: #1a120b;
        }

        .decor-step p {
          margin: 0;
          color: #74685b;
          font-size: 14px;
          line-height: 1.7;
        }

        .decor-gallery-invite {
          padding: 0 0 86px;
        }

        .decor-gallery-box {
          position: relative;
          overflow: hidden;
          border-radius: 34px;
          padding: 42px;
          background:
            linear-gradient(135deg, rgba(25,14,7,0.96), rgba(64,37,14,0.90));
          color: #fff;
          box-shadow: 0 20px 54px rgba(26,18,11,0.18);
        }

        .decor-gallery-box::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 16% 20%, rgba(209,145,31,0.22), transparent 30%),
            radial-gradient(circle at 88% 82%, rgba(255,255,255,0.08), transparent 28%);
          pointer-events: none;
        }

        .decor-gallery-inner {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: minmax(0, 1fr) 360px;
          gap: 34px;
          align-items: center;
        }

        .decor-gallery-title {
          margin: 14px 0 12px;
          font-size: clamp(40px, 5vw, 70px);
          line-height: 0.98;
          color: #fff;
          font-weight: 700;
        }

        .decor-gallery-title em {
          color: #d89a2d;
          font-style: italic;
        }

        .decor-gallery-text {
          margin: 0;
          max-width: 720px;
          color: rgba(255,255,255,0.82);
          font-size: 16px;
          line-height: 1.85;
        }

        .decor-gallery-images {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          transform: rotate(-2deg);
        }

        .decor-gallery-img {
          height: 170px;
          border-radius: 22px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.16);
          box-shadow: 0 14px 30px rgba(0,0,0,0.20);
        }

        .decor-gallery-img:nth-child(2) {
          transform: translateY(26px);
        }

        .decor-gallery-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          filter: saturate(0.95) brightness(0.9);
        }

        .decor-scroll {
          position: fixed;
          right: 20px;
          bottom: 24px;
          z-index: 999;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: none;
          background: #c8841a;
          color: #fff;
          cursor: pointer;
          box-shadow: 0 10px 26px rgba(200,132,26,0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transform: translateY(14px);
          pointer-events: none;
          transition: all 0.28s ease;
        }

        .decor-scroll.visible {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }

        @media (max-width: 1180px) {
          .decor-hero-inner {
            grid-template-columns: 1fr;
            min-height: auto;
            padding: 70px 0;
          }

          .decor-visual {
            min-height: 420px;
          }

          .decor-visual-main {
            right: 80px;
          }

          .decor-services-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .decor-process-top {
            grid-template-columns: 1fr;
          }

          .decor-gallery-inner {
            grid-template-columns: 1fr;
          }

          .decor-gallery-images {
            max-width: 520px;
          }
        }

        @media (max-width: 767px) {
          .decor-wrap {
            padding: 0 18px;
          }

          .decor-hero-inner {
            padding: 56px 0 62px;
          }

          .decor-title {
            font-size: 58px;
          }

          .decor-hero-text {
            font-size: 15px;
          }

          .decor-actions {
            flex-direction: column;
          }

          .decor-actions a {
            width: 100%;
          }

          .decor-visual {
            display: none;
          }

          .decor-marquee-item {
            padding: 0 18px;
            font-size: 11px;
          }

          .decor-section {
            padding: 62px 0;
          }

          .decor-services-grid {
            grid-template-columns: 1fr;
          }

          .decor-service-card {
            min-height: auto;
            border-radius: 24px;
          }

          .decor-process {
            padding-bottom: 62px;
          }

          .decor-process-preview {
            min-height: 300px;
          }

          .decor-process-content {
            padding: 28px 20px;
          }

          .decor-step {
            grid-template-columns: 1fr;
          }

          .decor-gallery-box {
            padding: 30px 20px;
            border-radius: 26px;
          }

          .decor-gallery-images {
            grid-template-columns: 1fr;
            transform: none;
          }

          .decor-gallery-img,
          .decor-gallery-img:nth-child(2) {
            height: 210px;
            transform: none;
          }
        }
      `}</style>

      <main className="decor-page">
        <section className="decor-hero">
          <div className="decor-wrap">
            <div className="decor-hero-inner">
              <div className="decor-hero-content">
                <div className="decor-kicker">
                  <GoldIcon name="sparkles" />
                  Dekorime për evente
                </div>

                <h1 className="decor-serif decor-title">
                  Dekorime
                  <br />
                  me <em>atmosferë</em>
                </h1>

                <p className="decor-hero-text">
                  Ne nuk ofrojmë vetëm dekor, por krijojmë ndjesinë e eventit.
                  Çdo ngjyrë, balonë, lule, tabelë dhe detaj vendoset me kujdes
                  që festa juaj të duket e bukur, e rregulluar dhe e veçantë.
                </p>

                <div className="decor-actions">
                  <Link to="/booking" className="decor-btn-gold">
                    Rezervo dekorin
                    <GoldIcon name="arrow" />
                  </Link>

                  <Link to="/gallery" className="decor-btn-light">
                    Shiko fotot në galeri
                    <GoldIcon name="camera" />
                  </Link>
                </div>
              </div>

              <div className="decor-visual">
                <div className="decor-floating-note">
                  <GoldIcon name="heart" />
                  Çdo detaj vendoset me dashni
                </div>

                <div className="decor-visual-card decor-visual-side" />

                <div className="decor-visual-card decor-visual-main">
                  <div className="decor-arch">
                    <div className="decor-balloon one" />
                    <div className="decor-balloon two" />
                    <div className="decor-balloon three" />
                    <div className="decor-balloon four" />
                    <div className="decor-visual-label">MD Creative Decor</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="decor-marquee">
          <div className="decor-marquee-track">
            {[...Array(2)].map((_, repeatIndex) => (
              <div key={repeatIndex} className="decor-marquee-group">
                {[
                  'Ditëlindje',
                  'Baby Shower',
                  'Fejesa',
                  'Dasma',
                  'Hyrje speciale',
                  'Balona',
                  'Mirëseardhje',
                  'Kënde fotografike',
                  'Dekore të personalizuara',
                ].map((item) => (
                  <div key={`${repeatIndex}-${item}`} className="decor-marquee-item">
                    <span>{item}</span>
                    <span className="decor-marquee-dot" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <section className="decor-section" id="sherbimet">
          <div className="decor-wrap">
            <div className="decor-section-head">
              <div className="decor-kicker">
                <GoldIcon name="star" />
                Çfarë ofrojmë
              </div>

              <h2 className="decor-serif decor-section-title">
                Dekore të menduara
                <br />
                për çdo <em>rast</em>
              </h2>

              <p className="decor-section-text">
                Këtu nuk kemi vendosur shumë foto, sepse kjo faqe është për t’ju
                treguar qartë çfarë shërbimesh ofrojmë. Për më shumë pamje reale
                nga eventet tona, mund të vizitoni Galerinë ose faqet tona në rrjete sociale.
              </p>
            </div>

            <div className="decor-services-grid">
              {services.map((service, index) => (
                <article
                  key={service.title}
                  className="decor-service-card"
                  style={{ animationDelay: `${index * 0.06}s` }}
                >
                  <div className="decor-service-icon">
                    <GoldIcon name={service.icon} />
                  </div>

                  <span className="decor-service-subtitle">{service.subtitle}</span>

                  <h3 className="decor-service-title">{service.title}</h3>

                  <p className="decor-service-desc">{service.description}</p>

                  <ul className="decor-detail-list">
                    {service.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="decor-process">
          <div className="decor-wrap">
            <div className="decor-process-box">
              <div className="decor-process-top">
                <div className="decor-process-preview" />

                <div className="decor-process-content">
                  <div className="decor-kicker">
                    <GoldIcon name="palette" />
                    Si punojmë
                  </div>

                  <h2 className="decor-serif decor-process-title">
                    Nga ideja juaj
                    <br />
                    te dekori <em>final</em>
                  </h2>

                  <p className="decor-section-text" style={{ margin: 0 }}>
                    Çdo dekor e ndërtojmë sipas kërkesës, prandaj çmimi dhe realizimi
                    varen nga hapësira, tema, ngjyrat dhe elementet që zgjidhen.
                  </p>

                  <div className="decor-steps">
                    {processSteps.map((step, index) => (
                      <div key={step.title} className="decor-step">
                        <div className="decor-step-number">
                          {String(index + 1).padStart(2, '0')}
                        </div>

                        <div>
                          <h3>{step.title}</h3>
                          <p>{step.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="decor-gallery-invite">
          <div className="decor-wrap">
            <div className="decor-gallery-box">
              <div className="decor-gallery-inner">
                <div>
                  <div className="decor-kicker">
                    <GoldIcon name="camera" />
                    Fotot reale
                  </div>

                  <h2 className="decor-serif decor-gallery-title">
                    Pamjet e plota
                    <br />
                    janë në <em>galeri</em>
                  </h2>

                  <p className="decor-gallery-text">
                    Në këtë faqe i kemi lënë përshkrimet kryesore të shërbimeve,
                    ndërsa fotot reale të eventeve mund t’i shihni te Galeria.
                    Aty kemi vendosur albume me dekorime për fëmijë, dasma, fejesa,
                    baby shower, hyrje speciale dhe shumë detaje të tjera.
                  </p>

                  <div className="decor-actions">
                    <Link to="/gallery" className="decor-btn-gold">
                      Hape galerinë
                      <GoldIcon name="arrow" />
                    </Link>

                    <Link to="/booking" className="decor-btn-light">
                      Kërko ofertë
                      <GoldIcon name="sparkles" />
                    </Link>
                  </div>
                </div>

                <div className="decor-gallery-images">
                  {smallImages.map((src) => (
                    <div key={src} className="decor-gallery-img">
                      <img src={src} alt="Pamje nga dekorimet e MD Creative" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <ScrollToTop />
    </>
  );
}