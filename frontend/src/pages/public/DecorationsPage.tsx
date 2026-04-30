import { useEffect, useState, type SVGProps } from 'react';
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
  const props: SVGProps<SVGSVGElement> = {
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
        <path
          d="M8 10h.01M11 7.5h.01M15 8.5h.01M7.5 14h.01"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
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
    details: [
      'Backdrop tematik',
      'Balona me ngjyra të kombinuara',
      'Tavolina kryesore',
      'Detaje sipas personazhit ose temës',
    ],
    icon: 'gift',
  },
  {
    title: 'Dekore për baby shower',
    subtitle: 'Të buta dhe elegante',
    description:
      'Për baby shower përgatisim atmosferë të ngrohtë, të ëmbël dhe shumë të kujdesshme, me ngjyra të buta dhe elemente që duken bukur në foto.',
    details: [
      'Ngjyra pastel',
      'Balona dhe lule dekorative',
      'Kënd për fotografi',
      'Tekste të personalizuara',
    ],
    icon: 'heart',
  },
  {
    title: 'Dekore për fejesa dhe dasma',
    subtitle: 'Momente familjare me stil',
    description:
      'Për fejesa dhe dasma fokusohemi në elegancë, pastërti vizuale dhe detaje që e bëjnë hapësirën të duket më solemne.',
    details: [
      'Dekor elegant hyrjeje',
      'Aranzhime me lule',
      'Kënde fotografike',
      'Përshtatje me ngjyrat e eventit',
    ],
    icon: 'ring',
  },
  {
    title: 'Balona për hyrje',
    subtitle: 'Përshtypja e parë',
    description:
      'Dekorimi i hyrjes krijon përshtypjen e parë te mysafirët. Ne e ndërtojmë hyrjen sipas hapësirës dhe stilit të eventit.',
    details: [
      'Hyrje me balona',
      'Kombinime gold, nude ose pastel',
      'Vendosje sipas ambientit',
      'Detaje mirëseardhjeje',
    ],
    icon: 'home',
  },
  {
    title: 'Mirëseardhje dhe tabela',
    subtitle: 'Detaje të personalizuara',
    description:
      'Përgatisim kënde mirëseardhjeje, tabela me emër, mbishkrime dhe elemente që i japin eventit identitet.',
    details: [
      'Tabela mirëseardhjeje',
      'Emra të personalizuar',
      'Përshtatje me temën',
      'Vendosje pranë hyrjes',
    ],
    icon: 'sparkles',
  },
  {
    title: 'Kënde fotografike',
    subtitle: 'Për kujtime më të bukura',
    description:
      'Krijojmë kënde për foto dhe video, të menduara që çdo pamje të duket e plotë, elegante dhe e veçantë.',
    details: [
      'Backdrop për foto',
      'Kompozim me balona/lule',
      'Detaje dekorative',
      'Kombinim me Photo Booth',
    ],
    icon: 'camera',
  },
  {
    title: 'Lule dhe detaje',
    subtitle: 'Për atmosferë më të plotë',
    description:
      'Dekori nuk është vetëm vendosje balonash. Ne kombinojmë ngjyra, forma dhe detaje që ambienti të duket i kuruar.',
    details: [
      'Lule dekorative',
      'Kombinim ngjyrash',
      'Elemente gold, cream ose pastel',
      'Stilizim sipas eventit',
    ],
    icon: 'flower',
  },
  {
    title: 'Dekore sipas kërkesës',
    subtitle: 'Çdo event ka çmim të veçantë',
    description:
      'Çmimet varen nga tema, hapësira, madhësia dhe elementet që klienti zgjedh. Prandaj çdo ofertë e bëjmë të personalizuar.',
    details: [
      'Analizojmë kërkesën',
      'Përshtatim idenë me buxhetin',
      'Propozojmë stilin më të mirë',
      'Vendosim çmimin pas specifikimit',
    ],
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
            transform: translateY(22px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
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
            radial-gradient(circle at 15% 18%, rgba(209,145,31,0.16), transparent 30%),
            radial-gradient(circle at 82% 20%, rgba(255,255,255,0.07), transparent 24%),
            linear-gradient(125deg, #150d07 0%, #241409 48%, #321b0b 100%);
          color: #fff;
        }

        .decor-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            linear-gradient(rgba(255,255,255,0.026) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.026) 1px, transparent 1px);
          background-size: 54px 54px;
          opacity: 0.32;
          pointer-events: none;
        }

        .decor-hero-inner {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(340px, 470px);
          gap: 44px;
          align-items: center;
          min-height: calc(100vh - 118px);
          padding: 34px 0 32px;
        }

        .decor-hero-content {
          max-width: 720px;
          animation: decorFadeUp 0.75s ease both;
        }

        .decor-kicker {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 8px 16px;
          border-radius: 999px;
          background: rgba(200,132,26,0.14);
          border: 1px solid rgba(200,132,26,0.34);
          color: #e8b56a;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .decor-kicker svg {
          color: #d89a2d;
          flex-shrink: 0;
        }

        .decor-title {
          margin: 15px 0 12px;
          font-size: clamp(48px, 5.8vw, 82px);
          line-height: 0.92;
          font-weight: 700;
          letter-spacing: -0.04em;
          color: #fff;
        }

        .decor-title em {
          color: #d89a2d;
          font-style: italic;
        }

        .decor-hero-text {
          max-width: 620px;
          margin: 0;
          color: rgba(255,255,255,0.84);
          font-size: 15px;
          line-height: 1.68;
        }

        .decor-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 18px;
        }

        .decor-btn-gold,
        .decor-btn-light,
        .decor-btn-dark {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          min-height: 46px;
          padding: 0 20px;
          border-radius: 15px;
          text-decoration: none;
          border: none;
          cursor: pointer;
          font-size: 13.5px;
          font-weight: 900;
          transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
        }

        .decor-btn-gold {
          background: linear-gradient(135deg, #d4911e, #c8841a);
          color: #fff;
          box-shadow: 0 12px 30px rgba(200,132,26,0.32);
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

        .decor-mini-info {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 14px;
        }

        .decor-mini-pill {
          padding: 8px 12px;
          border-radius: 999px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.12);
          color: rgba(255,255,255,0.86);
          font-size: 12.5px;
          font-weight: 800;
          backdrop-filter: blur(8px);
        }

        .decor-visual-clean {
          width: 100%;
          animation: decorFadeUp 0.8s ease both 0.12s;
        }

        .decor-moodboard {
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          align-items: stretch;
        }

        .decor-board-card {
          position: relative;
          overflow: hidden;
          border-radius: 22px;
          background: linear-gradient(145deg, rgba(255,255,255,0.14), rgba(255,255,255,0.06));
          border: 1px solid rgba(255,255,255,0.16);
          box-shadow: 0 18px 42px rgba(0,0,0,0.20);
          backdrop-filter: blur(18px);
        }

        .decor-board-card.main {
          grid-column: span 2;
          padding: 20px;
          min-height: 205px;
        }

        .decor-board-card.small {
          padding: 15px;
          min-height: 104px;
        }

        .decor-board-card.image {
          min-height: 118px;
          background:
            linear-gradient(135deg, rgba(26,18,11,0.35), rgba(26,18,11,0.72)),
            url('/images/home/decorations.png');
          background-size: cover;
          background-position: center;
        }

        .decor-board-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at top right, rgba(216,154,45,0.18), transparent 38%),
            linear-gradient(145deg, rgba(255,255,255,0.08), transparent);
          pointer-events: none;
        }

        .decor-board-content {
          position: relative;
          z-index: 2;
        }

        .decor-board-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          margin-bottom: 13px;
        }

        .decor-logo-chip {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 7px 11px;
          border-radius: 999px;
          background: rgba(27,12,3,0.50);
          color: #fff;
          font-size: 10.5px;
          font-weight: 900;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .decor-love-chip {
          padding: 7px 10px;
          border-radius: 999px;
          background: rgba(255,255,255,0.12);
          color: #fff5e8;
          font-size: 11.5px;
          font-weight: 800;
          white-space: nowrap;
        }

        .decor-board-title {
          margin: 0 0 8px;
          color: #ffffff;
          font-size: 23px;
          line-height: 1.13;
          font-weight: 900;
          max-width: 390px;
        }

        .decor-board-text {
          margin: 0;
          color: rgba(255,255,255,0.78);
          font-size: 12.8px;
          line-height: 1.55;
          max-width: 400px;
        }

        .decor-chip-list {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
          margin-top: 12px;
        }

        .decor-chip {
          padding: 7px 10px;
          border-radius: 999px;
          background: rgba(255,255,255,0.10);
          border: 1px solid rgba(255,255,255,0.14);
          color: #fff;
          font-size: 11.5px;
          font-weight: 800;
        }

        .decor-stat-value {
          display: block;
          color: #ffffff;
          font-size: 24px;
          font-weight: 900;
          margin-bottom: 4px;
        }

        .decor-stat-label {
          color: rgba(255,255,255,0.76);
          font-size: 11.8px;
          font-weight: 800;
          line-height: 1.35;
        }

        .decor-check-list {
          display: grid;
          gap: 8px;
          margin-top: 10px;
        }

        .decor-check-item {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          color: rgba(255,255,255,0.88);
          font-size: 11.8px;
          font-weight: 800;
          line-height: 1.35;
        }

        .decor-check-dot {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: rgba(214,152,41,0.20);
          color: #f3c16c;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          flex-shrink: 0;
        }

        .decor-side-title {
          margin: 0 0 7px;
          color: #ffffff;
          font-size: 14px;
          font-weight: 900;
        }

        .decor-image-label {
          position: absolute;
          left: 14px;
          bottom: 14px;
          z-index: 2;
          padding: 8px 11px;
          border-radius: 999px;
          background: rgba(255,255,255,0.14);
          color: #fff;
          font-size: 11.5px;
          font-weight: 900;
          backdrop-filter: blur(10px);
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
          max-width: none;
          animation: decorMarquee 34s linear infinite;
        }

        .decor-marquee-group {
          display: flex;
          white-space: nowrap;
          max-width: none;
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
          max-width: none;
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
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 14px 34px rgba(200,132,26,0.42);
          cursor: pointer;
          opacity: 0;
          transform: translateY(16px) scale(0.9);
          pointer-events: none;
          transition: 0.25s ease;
        }

        .decor-scroll.visible {
          opacity: 1;
          transform: translateY(0) scale(1);
          pointer-events: auto;
        }

        @media (max-width: 1180px) {
          .decor-hero-inner {
            grid-template-columns: 1fr;
            min-height: auto;
            gap: 28px;
            padding: 40px 0 42px;
          }

          .decor-visual-clean {
            max-width: 660px;
          }

          .decor-services-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 980px) {
          .decor-process-top,
          .decor-gallery-inner {
            grid-template-columns: 1fr;
          }

          .decor-gallery-images {
            max-width: 520px;
          }
        }

        @media (max-width: 767px) {
          .decor-wrap {
            padding: 0 16px;
          }

          .decor-hero-inner {
            padding: 32px 0 36px;
          }

          .decor-title {
            font-size: 43px;
          }

          .decor-hero-text {
            font-size: 14px;
            line-height: 1.6;
          }

          .decor-actions {
            flex-direction: column;
          }

          .decor-actions a {
            width: 100%;
          }

          .decor-mini-info {
            gap: 7px;
          }

          .decor-mini-pill {
            font-size: 11.5px;
            padding: 8px 10px;
          }

          .decor-moodboard {
            grid-template-columns: 1fr;
          }

          .decor-board-card.main {
            grid-column: span 1;
            min-height: auto;
          }

          .decor-board-card.small,
          .decor-board-card.image {
            min-height: auto;
          }

          .decor-board-title {
            font-size: 23px;
          }

          .decor-board-top {
            flex-direction: column;
            align-items: flex-start;
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

                <div className="decor-mini-info">
                  <span className="decor-mini-pill">Ditëlindje</span>
                  <span className="decor-mini-pill">Baby Shower</span>
                  <span className="decor-mini-pill">Bride To Be</span>
                  <span className="decor-mini-pill">Dasma & Fejesa</span>
                </div>
              </div>

              <div className="decor-visual-clean">
                <div className="decor-moodboard">
                  <div className="decor-board-card main">
                    <div className="decor-board-content">
                      <div className="decor-board-top">
                        <span className="decor-logo-chip">MD Creative Decor</span>
                        <span className="decor-love-chip">♡ Me dashni</span>
                      </div>

                      <h3 className="decor-board-title">
                        Çdo event e kthejmë në një pamje që të mbetet në mend
                      </h3>

                      <p className="decor-board-text">
                        Nga balonat hyrëse deri te backdrop, tavolinat dekorative
                        dhe detajet finale — çdo pjesë kombinohet që ambienti të
                        duket elegant dhe i plotë.
                      </p>

                      <div className="decor-chip-list">
                        <span className="decor-chip">Balona</span>
                        <span className="decor-chip">Backdrop</span>
                        <span className="decor-chip">Lule</span>
                        <span className="decor-chip">Tavolina</span>
                        <span className="decor-chip">Temë me ngjyra</span>
                        <span className="decor-chip">Detaje unike</span>
                      </div>
                    </div>
                  </div>

                  <div className="decor-board-card small">
                    <div className="decor-board-content">
                      <span className="decor-stat-value">100+</span>
                      <span className="decor-stat-label">
                        Dekore të realizuara me stil, kujdes dhe detaje të veçanta.
                      </span>
                    </div>
                  </div>

                  <div className="decor-board-card small">
                    <div className="decor-board-content">
                      <span className="decor-stat-value">Custom</span>
                      <span className="decor-stat-label">
                        Çdo dekor përshtatet sipas kërkesës, hapësirës dhe temës.
                      </span>
                    </div>
                  </div>

                  <div className="decor-board-card image">
                    <span className="decor-image-label">Pamje elegante për çdo festë</span>
                  </div>

                  <div className="decor-board-card small">
                    <div className="decor-board-content">
                      <h4 className="decor-side-title">Çfarë përfshijmë?</h4>

                      <div className="decor-check-list">
                        <div className="decor-check-item">
                          <span className="decor-check-dot">✓</span>
                          <span>Zgjedhje stili dhe ngjyrash</span>
                        </div>

                        <div className="decor-check-item">
                          <span className="decor-check-dot">✓</span>
                          <span>Vendosje me kujdes e dekorit</span>
                        </div>

                        <div className="decor-check-item">
                          <span className="decor-check-dot">✓</span>
                          <span>Përshtatje për eventin tuaj</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="decor-marquee">
          <div className="decor-marquee-track">
            {[0, 1].map((group) => (
              <div className="decor-marquee-group" key={group}>
                {[
                  'Dekore për ditëlindje',
                  'Baby shower',
                  'Fejesa dhe dasma',
                  'Balona për hyrje',
                  'Kënde fotografike',
                  'Tabela të personalizuara',
                ].map((item) => (
                  <span className="decor-marquee-item" key={`${group}-${item}`}>
                    <span className="decor-marquee-dot" />
                    {item}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <section className="decor-section">
          <div className="decor-wrap">
            <div className="decor-section-head">
              <div className="decor-kicker">
                <GoldIcon name="star" />
                Shërbimet e dekorimit
              </div>

              <h2 className="decor-serif decor-section-title">
                Çfarë ofrojmë për <em>eventin tuaj?</em>
              </h2>

              <p className="decor-section-text">
                Në këtë faqe nuk kemi vendosur shumë foto, sepse fotot reale i kemi
                në galeri. Këtu mund të shihni përshkrimet kryesore të dekorimeve
                që ofrojmë dhe mënyrën se si i përshtatim me eventin tuaj.
              </p>
            </div>

            <div className="decor-services-grid">
              {services.map((service, index) => (
                <article
                  className="decor-service-card"
                  key={service.title}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="decor-service-icon">
                    <GoldIcon name={service.icon} />
                  </div>

                  <span className="decor-service-subtitle">{service.subtitle}</span>

                  <h3 className="decor-serif decor-service-title">
                    {service.title}
                  </h3>

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
                    Procesi ynë
                  </div>

                  <h2 className="decor-serif decor-process-title">
                    Nga ideja deri te <em>dekorimi final</em>
                  </h2>

                  <p className="decor-section-text" style={{ margin: 0 }}>
                    Çdo dekor fillon me një ide. Ne e dëgjojmë kërkesën tuaj,
                    propozojmë stilin dhe e përgatisim atmosferën sipas eventit,
                    hapësirës dhe ngjyrave që dëshironi.
                  </p>

                  <div className="decor-steps">
                    {processSteps.map((step, index) => (
                      <div className="decor-step" key={step.title}>
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

                  <div className="decor-actions">
                    <Link to="/booking" className="decor-btn-dark">
                      Fillo rezervimin
                      <GoldIcon name="arrow" />
                    </Link>
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