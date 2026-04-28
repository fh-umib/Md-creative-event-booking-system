import { Link } from 'react-router-dom';
import { useEffect, useRef, useState, type SVGProps } from 'react';

type IconName =
  | 'mask'
  | 'sparkles'
  | 'camera'
  | 'heart'
  | 'package'
  | 'calendar'
  | 'wand'
  | 'star';

function GoldIcon({ name, size = 20 }: { name: IconName; size?: number }) {
  const p: SVGProps<SVGSVGElement> = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
  };

  if (name === 'mask') {
    return (
      <svg {...p}>
        <path
          d="M4 7.5c2.6-1.2 5.2-1.2 8 0 2.8-1.2 5.4-1.2 8 0v3.2c0 4.2-2.8 7.1-6.1 7.1-1.2 0-2.1-.3-2.9-1-.8.7-1.7 1-2.9 1C4.8 17.8 4 14.9 4 10.7V7.5Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M8 11.1h.01M16 11.1h.01M9.4 14.1c1.4.9 3.8.9 5.2 0"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (name === 'sparkles') {
    return (
      <svg {...p}>
        <path
          d="M12 2.7l1.7 5 5 1.7-5 1.7-1.7 5-1.7-5-5-1.7 5-1.7 1.7-5Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M18.5 14.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (name === 'camera') {
    return (
      <svg {...p}>
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

  if (name === 'heart') {
    return (
      <svg {...p}>
        <path
          d="M20.4 5.8c-1.7-1.9-4.4-2-6.2-.3L12 7.6 9.8 5.5C8 3.8 5.3 3.9 3.6 5.8c-1.8 2-1.7 5.1.3 7l8.1 7.5 8.1-7.5c2-1.9 2.1-5 .3-7Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (name === 'package') {
    return (
      <svg {...p}>
        <path
          d="M12 2.8 20 7v10l-8 4.2L4 17V7l8-4.2Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M4.5 7.3 12 11.4l7.5-4.1M12 21V11.4"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (name === 'calendar') {
    return (
      <svg {...p}>
        <path
          d="M7 3v3M17 3v3M4.5 9h15M6.5 5h11A2.5 2.5 0 0 1 20 7.5v10A2.5 2.5 0 0 1 17.5 20h-11A2.5 2.5 0 0 1 4 17.5v-10A2.5 2.5 0 0 1 6.5 5Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (name === 'wand') {
    return (
      <svg {...p}>
        <path
          d="M5 19 19 5M15 5h4v4M4.5 5.5l.7 1.6 1.6.7-1.6.7-.7 1.6-.7-1.6-1.6-.7 1.6-.7.7-1.6ZM17.8 14.2l.6 1.3 1.3.6-1.3.6-.6 1.3-.6-1.3-1.3-.6 1.3-.6.6-1.3Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg {...p}>
      <path
        d="M12 3.2 14.3 9l6.2.4-4.8 4 1.5 6-5.2-3.3-5.2 3.3 1.5-6-4.8-4L9.7 9 12 3.2Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function useCountUp(target: number, duration = 2400) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;

    let start: number | null = null;

    const step = (time: number) => {
      if (!start) start = time;

      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setCount(Math.floor(eased * target));

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [started, target, duration]);

  return { count, ref };
}

function useScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll('[data-reveal]');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.animationPlayState = 'running';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    elements.forEach((element) => {
      (element as HTMLElement).style.animationPlayState = 'paused';
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);
}

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 440);

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Kthehu lart"
      className={visible ? 'hp-scroll visible' : 'hp-scroll'}
    >
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
        <path
          d="M10 15V5M10 5L5 10M10 5L15 10"
          stroke="#fff"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

function StatCard({
  icon,
  target,
  suffix = '',
  label,
}: {
  icon: IconName;
  target: number;
  suffix?: string;
  label: string;
}) {
  const { count, ref } = useCountUp(target);

  return (
    <div ref={ref} data-reveal className="hp-stat">
      <div className="hp-stat-icon">
        <GoldIcon name={icon} />
      </div>
      <span className="hp-stat-num">
        {count}
        {suffix}
      </span>
      <span className="hp-stat-lbl">{label}</span>
    </div>
  );
}

const services = [
  {
    title: 'Dekorime',
    desc: 'Dekore elegante për ditëlindje, fejesa, dasma, baby shower dhe evente që kërkojnë stil.',
    image: '/images/home/decorations.png',
    link: '/decorations',
    badge: 'Dekorime elegante',
    icon: 'sparkles' as IconName,
  },
  {
    title: 'Maskota',
    desc: 'Personazhe të dashura për fëmijë — energji, argëtim dhe momente që mbesin gjatë në kujtesë.',
    image: '/images/home/mascot.png',
    link: '/mascots',
    badge: '50+ personazhe',
    icon: 'mask' as IconName,
  },
  {
    title: 'Aktivitete',
    desc: 'Face painting, lojëra, muzikë dhe aktivitete që e bëjnë festën më të gjallë dhe zbavitëse.',
    image: '/images/home/activites-fun.png',
    link: '/activities',
    badge: 'Argëtim për fëmijë',
    icon: 'wand' as IconName,
  },
  {
    title: 'Photo Booth',
    desc: 'Kënde fotografike dhe photo booth për kujtime të bukura nga çdo event i veçantë.',
    image: '/images/home/photo-experiences.png',
    link: '/photo-booth',
    badge: 'Kujtime speciale',
    icon: 'camera' as IconName,
  },
];

const marqueeItems = [
  'Kënde fotografie',
  'Ditëlindje',
  'Dasma',
  'Fejesa',
  'Baby Shower',
  'Dekorime elegante',
  'Maskota',
  'Photo Booth',
  'Aktivitete',
  'Evente për fëmijë',
  'Mbrëmje festive',
  'Hyrje speciale',
];

const whyCards = [
  {
    n: '01',
    title: 'Kreativitet në çdo detaj',
    text: 'Çdo dekor, ngjyrë dhe vendosje mendohet që eventi të duket unik, i kuruar dhe me stil.',
  },
  {
    n: '02',
    title: 'Shërbime të kombinuara',
    text: 'Dekorime, maskota, aktivitete dhe photo booth kombinohen bukur në një përjetim të plotë.',
  },
  {
    n: '03',
    title: 'Përshtatje sipas kërkesës',
    text: 'Çdo festë ndërtohet sipas temës, hapësirës, dëshirës dhe buxhetit të klientit.',
  },
];

const featurePoints = [
  'Planifikim me stil dhe harmoni vizuale',
  'Kënde foto dhe detaje që bien në sy',
  'Përshtatje sipas temës dhe atmosferës',
];

const reviews = [
  {
    name: 'Klient i MD Creative',
    event: 'Ditëlindje',
    stars: 5,
    text: 'Dekorimi, maskotat dhe organizimi ishin shumë të bukura. Çdo detaj dukej i menduar me kujdes dhe festa mori një pamje shumë të veçantë.',
  },
  {
    name: 'Klient i MD Creative',
    event: 'Event familjar',
    stars: 5,
    text: 'Shërbimi ishte korrekt, i organizuar dhe shumë profesional. Fëmijët u argëtuan shumë dhe atmosfera ishte plot jetë nga fillimi deri në fund.',
  },
  {
    name: 'Klient i MD Creative',
    event: 'Baby Shower',
    stars: 5,
    text: 'Pamja finale doli elegante dhe shumë e kuruar. Ishte pikërisht ajo ndjesia e butë, festive dhe speciale që e dëshironim për këtë ditë.',
  },
];

const ctaHighlights = [
  { icon: 'sparkles' as IconName, label: 'Dekor i kuruar' },
  { icon: 'calendar' as IconName, label: 'Rezervim me plan' },
  { icon: 'heart' as IconName, label: 'Përjetim me kujdes' },
];

const miniItems = [
  {
    title: 'Stil i dallueshëm',
    text: 'Dizajn i menduar për t’u dukur elegant dhe i kuruar.',
  },
  {
    title: 'Ide kreative',
    text: 'Zgjidhje që e bëjnë eventin më tërheqës dhe më unik.',
  },
  {
    title: 'Realizim profesional',
    text: 'Pamje serioze, e pastër dhe e organizuar bukur.',
  },
];

export default function HomePage() {
  useScrollReveal();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400;1,600;1,700&family=DM+Sans:wght@400;500;600;700;800;900&display=swap');

        *, *::before, *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .hp {
          width: 100%;
          max-width: 100%;
          overflow-x: hidden;
          background:
            radial-gradient(circle at 8% 16%, rgba(200,132,26,.07), transparent 28%),
            radial-gradient(circle at 90% 52%, rgba(80,42,12,.05), transparent 28%),
            linear-gradient(180deg, #f7f3ee 0%, #fbf8f4 100%);
          color: #1a120b;
          font-family: 'DM Sans', sans-serif;
        }

        .hp-wrap {
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 28px;
        }

        .hp-serif {
          font-family: 'Cormorant Garamond', serif;
        }

        @keyframes hp-up {
          from {
            opacity: 0;
            transform: translateY(32px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes hp-zoom {
          from {
            transform: scale(1.08);
          }
          to {
            transform: scale(1.02);
          }
        }

        @keyframes hp-glow {
          0%, 100% {
            box-shadow: 0 10px 24px rgba(209,145,31,.25);
          }
          50% {
            box-shadow: 0 14px 34px rgba(209,145,31,.43);
          }
        }

        @keyframes hp-float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes hp-mrq {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @keyframes hp-pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: .65;
            transform: scale(1.06);
          }
        }

        @keyframes hp-shine {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        [data-reveal] {
          animation: hp-up .85s ease both;
          animation-play-state: paused;
        }

        .hp-kicker {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 8px 18px;
          border-radius: 99px;
          background: rgba(200,132,26,.11);
          border: 1px solid rgba(200,132,26,.28);
          color: #c8841a;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: .16em;
          text-transform: uppercase;
        }

        .hp-kicker.lite {
          background: rgba(255,255,255,.09);
          border-color: rgba(255,255,255,.18);
          color: rgba(255,255,255,.88);
        }

        .hp-kicker-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #c8841a;
          animation: hp-pulse 2.2s ease-in-out infinite;
          flex-shrink: 0;
        }

        .hp-section-head {
          max-width: 720px;
          margin: 0 auto 38px;
          text-align: center;
        }

        .hp-section-title {
          margin: 14px 0 12px;
          font-size: clamp(40px, 4.5vw, 66px);
          font-weight: 700;
          line-height: .96;
          color: #1a120b;
        }

        .hp-section-title em {
          color: #c8841a;
          font-style: italic;
        }

        .hp-section-text {
          color: #716556;
          font-size: 16px;
          line-height: 1.85;
        }

        .hp-btn-gold {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          min-height: 50px;
          padding: 0 26px;
          border-radius: 17px;
          text-decoration: none;
          background: linear-gradient(135deg, #d4911e, #c8841a);
          color: #fff;
          font-size: 14px;
          font-weight: 800;
          animation: hp-glow 3.5s ease-in-out infinite;
          transition: transform .25s, box-shadow .25s;
        }

        .hp-btn-gold:hover {
          transform: translateY(-3px);
          box-shadow: 0 18px 38px rgba(200,132,26,.48);
        }

        .hp-btn-ghost {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 50px;
          padding: 0 26px;
          border-radius: 17px;
          text-decoration: none;
          background: rgba(255,255,255,.08);
          border: 1px solid rgba(255,255,255,.22);
          color: #fff;
          font-size: 14px;
          font-weight: 700;
          transition: background .2s, transform .2s;
        }

        .hp-btn-ghost:hover {
          background: rgba(255,255,255,.16);
          transform: translateY(-2px);
        }

        .hp-hero {
          position: relative;
          min-height: calc(100vh - 84px);
          display: flex;
          align-items: center;
          padding: 38px 0 34px;
          overflow: hidden;
          background: #120c07;
          isolation: isolate;
        }

        .hp-hero-bg {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(100deg, rgba(15,10,5,.92) 0%, rgba(15,10,5,.72) 45%, rgba(15,10,5,.38) 100%),
            url('/images/home/home.png');
          background-size: cover;
          background-position: center;
          animation: hp-zoom 2s ease both;
        }

        .hp-hero::after {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
          background-image: repeating-linear-gradient(
            45deg,
            rgba(255,255,255,.028) 0,
            rgba(255,255,255,.028) 1px,
            transparent 1px,
            transparent 68px
          );
        }

        .hp-hero::before {
          content: '';
          position: absolute;
          width: 520px;
          height: 520px;
          left: -170px;
          bottom: -210px;
          border-radius: 50%;
          pointer-events: none;
          z-index: 1;
          background: radial-gradient(circle, rgba(200,132,26,.22), transparent 68%);
        }

        .hp-hero-inner {
          position: relative;
          z-index: 2;
          max-width: 760px;
        }

        .hp-hero-title {
          margin: 16px 0 14px;
          color: #fff;
          line-height: .9;
          font-size: clamp(50px, 6.1vw, 88px);
          font-weight: 700;
          letter-spacing: -.03em;
        }

        .hp-hero-title em {
          color: #d89a2d;
          font-style: italic;
          display: block;
        }

        .hp-hero-title em::after {
          content: '';
          display: block;
          height: 3px;
          border-radius: 2px;
          margin-top: 6px;
          background: linear-gradient(90deg, #c8841a, #e8b56a, #c8841a);
          background-size: 200% auto;
          animation: hp-shine 3s linear infinite;
        }

        .hp-hero-sub {
          max-width: 560px;
          color: rgba(255,255,255,.82);
          font-size: 16px;
          line-height: 1.7;
          margin-bottom: 24px;
        }

        .hp-hero-btns {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 24px;
        }

        .hp-hero-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .hp-tag {
          padding: 9px 16px;
          border-radius: 99px;
          font-size: 12px;
          font-weight: 800;
          background: rgba(255,255,255,.08);
          border: 1px solid rgba(255,255,255,.14);
          color: rgba(255,255,255,.85);
          backdrop-filter: blur(8px);
          transition: background .2s, transform .2s;
        }

        .hp-tag:hover {
          background: rgba(200,132,26,.25);
          transform: translateY(-2px);
        }

        .hp-hero-float {
          position: absolute;
          right: 48px;
          bottom: 54px;
          z-index: 3;
          background: rgba(255,255,255,.1);
          backdrop-filter: blur(18px);
          border: 1px solid rgba(255,255,255,.16);
          border-radius: 22px;
          padding: 16px 20px;
          display: flex;
          align-items: center;
          gap: 14px;
          animation: hp-float 4s ease-in-out infinite;
        }

        .hp-hero-float-icon {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          background: linear-gradient(135deg, #d4911e, #c8841a);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          flex-shrink: 0;
          font-size: 24px;
        }

        .hp-hero-float-text p:first-child {
          color: #fff;
          font-size: 15px;
          font-weight: 800;
          margin-bottom: 2px;
        }

        .hp-hero-float-text p:last-child {
          color: rgba(255,255,255,.6);
          font-size: 12px;
        }

        .hp-marquee {
          background: #160e08;
          border-top: 1px solid rgba(255,255,255,.07);
          border-bottom: 1px solid rgba(255,255,255,.07);
          overflow: hidden;
          padding: 12px 0;
        }

        .hp-marquee-track {
          display: flex;
          width: max-content;
          animation: hp-mrq 32s linear infinite;
        }

        .hp-marquee-group {
          display: flex;
          align-items: center;
          white-space: nowrap;
        }

        .hp-marquee-item {
          display: inline-flex;
          align-items: center;
          gap: 18px;
          padding: 0 22px;
          color: rgba(255,255,255,.8);
          font-size: 12px;
          font-weight: 800;
          letter-spacing: .1em;
          text-transform: uppercase;
        }

        .hp-marquee-sep {
          width: 7px;
          height: 7px;
          border-radius: 2px;
          background: #d1911f;
          transform: rotate(45deg);
          box-shadow: 0 0 14px rgba(209,145,31,.55);
          flex-shrink: 0;
        }

        .hp-stats-wrap {
          padding: 32px 0 22px;
        }

        .hp-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          background: rgba(255,255,255,.97);
          border: 1px solid #ece0d0;
          border-radius: 28px;
          overflow: hidden;
          box-shadow: 0 20px 48px rgba(26,18,11,.09);
        }

        .hp-stat {
          padding: 26px 16px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          border-left: 1px solid #f1e7d9;
          transition: background .25s, transform .25s;
        }

        .hp-stat:first-child {
          border-left: none;
        }

        .hp-stat:hover {
          background: #fffaf2;
          transform: translateY(-3px);
        }

        .hp-stat-icon {
          width: 44px;
          height: 44px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(209,145,31,.1);
          color: #c8841a;
        }

        .hp-stat-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(30px, 3.5vw, 48px);
          font-weight: 700;
          color: #1a120b;
          line-height: 1;
        }

        .hp-stat-lbl {
          font-size: 13px;
          color: #7b6c5c;
        }

        .hp-svc {
          padding: 38px 0 28px;
        }

        .hp-svc-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 20px;
        }

        .hp-svc-card {
          position: relative;
          min-height: 450px;
          border-radius: 28px;
          overflow: hidden;
          text-decoration: none;
          color: #fff;
          display: block;
          border: 1px solid rgba(200,132,26,.14);
          box-shadow: 0 16px 40px rgba(26,18,11,.12);
          transition: transform .38s ease, box-shadow .38s ease, border-color .38s ease;
        }

        .hp-svc-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 32px 64px rgba(26,18,11,.22);
          border-color: rgba(200,132,26,.42);
        }

        .hp-svc-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform .6s ease, filter .6s ease;
        }

        .hp-svc-card:hover .hp-svc-img {
          transform: scale(1.09);
          filter: brightness(.82) saturate(1.1);
        }

        .hp-svc-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(14,9,4,.96) 0%, rgba(14,9,4,.72) 44%, rgba(14,9,4,.14) 100%);
          z-index: 1;
        }

        .hp-svc-top {
          position: absolute;
          top: 18px;
          left: 18px;
          right: 18px;
          z-index: 2;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .hp-svc-pill {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 8px 13px;
          border-radius: 99px;
          background: rgba(255,255,255,.92);
          color: #1a120b;
          font-size: 12px;
          font-weight: 800;
          box-shadow: 0 6px 20px rgba(26,18,11,.14);
        }

        .hp-svc-pill svg {
          color: #c8841a;
        }

        .hp-svc-num {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #d1911f;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 900;
          box-shadow: 0 6px 18px rgba(209,145,31,.38);
        }

        .hp-svc-body {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 2;
          padding: 24px 22px 22px;
        }

        .hp-svc-title {
          font-size: 42px;
          font-weight: 700;
          line-height: .92;
          margin: 0 0 10px;
        }

        .hp-svc-desc {
          font-size: 13px;
          line-height: 1.72;
          color: rgba(255,255,255,.78);
          margin: 0 0 16px;
        }

        .hp-svc-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 18px;
          border-radius: 99px;
          font-size: 13px;
          font-weight: 800;
          background: rgba(255,255,255,.12);
          border: 1px solid rgba(255,255,255,.2);
          color: #fff;
          transition: all .25s;
        }

        .hp-svc-card:hover .hp-svc-cta {
          background: #d1911f;
          transform: translateX(4px);
          border-color: transparent;
        }

        .hp-why {
          padding: 36px 0 38px;
        }

        .hp-why-layout {
          display: grid;
          grid-template-columns: 1.15fr .85fr;
          gap: 22px;
          align-items: stretch;
        }

        .hp-why-feature {
          position: relative;
          overflow: hidden;
          min-height: 500px;
          border-radius: 30px;
          background:
            linear-gradient(128deg, rgba(16,10,5,.94), rgba(40,25,12,.88)),
            url('/images/home/decorations.png');
          background-size: cover;
          background-position: center;
          border: 1px solid rgba(200,132,26,.2);
          box-shadow: 0 22px 52px rgba(26,18,11,.18);
          padding: 36px;
          display: flex;
          align-items: flex-end;
        }

        .hp-why-feature::before {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            radial-gradient(circle at top right, rgba(209,145,31,.2), transparent 32%),
            linear-gradient(to top, rgba(10,7,4,.4), transparent 50%);
        }

        .hp-why-fc {
          position: relative;
          z-index: 2;
        }

        .hp-why-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 7px 14px;
          border-radius: 99px;
          background: rgba(255,255,255,.1);
          border: 1px solid rgba(255,255,255,.14);
          color: rgba(255,255,255,.9);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: .1em;
          text-transform: uppercase;
          margin-bottom: 18px;
        }

        .hp-why-badge svg {
          color: #d1911f;
        }

        .hp-why-ftitle {
          font-size: clamp(38px, 4vw, 58px);
          font-weight: 700;
          color: #fff;
          line-height: .96;
          margin: 0 0 14px;
        }

        .hp-why-ftitle em {
          color: #d89a2d;
          font-style: italic;
        }

        .hp-why-ftext {
          color: rgba(255,255,255,.8);
          font-size: 15px;
          line-height: 1.9;
          margin: 0 0 22px;
        }

        .hp-why-list {
          display: grid;
          gap: 10px;
        }

        .hp-why-li {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 13px 16px;
          border-radius: 16px;
          background: rgba(255,255,255,.08);
          border: 1px solid rgba(255,255,255,.1);
          color: rgba(255,255,255,.84);
          font-size: 14px;
          line-height: 1.65;
        }

        .hp-why-li-dot {
          width: 28px;
          height: 28px;
          flex-shrink: 0;
          border-radius: 50%;
          background: rgba(209,145,31,.18);
          color: #d1911f;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 1px;
        }

        .hp-why-li-dot svg {
          width: 14px;
          height: 14px;
        }

        .hp-why-side {
          display: grid;
          gap: 18px;
        }

        .hp-why-card {
          background: linear-gradient(160deg, #fff 0%, #fcf8f2 100%);
          border: 1px solid #eadfce;
          border-radius: 26px;
          padding: 26px 22px;
          box-shadow: 0 12px 28px rgba(26,18,11,.06);
          transition: transform .28s, box-shadow .28s, border-color .28s;
        }

        .hp-why-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(26,18,11,.1);
          border-color: #d7c19a;
        }

        .hp-why-card-n {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(209,145,31,.1);
          color: #c8841a;
          font-size: 13px;
          font-weight: 900;
          margin-bottom: 16px;
        }

        .hp-why-card-t {
          font-size: 22px;
          font-weight: 900;
          color: #1a120b;
          margin: 0 0 10px;
        }

        .hp-why-card-p {
          font-size: 14px;
          color: #70635a;
          line-height: 1.8;
          margin: 0;
        }

        .hp-mini-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-top: 22px;
        }

        .hp-mini {
          background: #fff;
          border: 1px solid #eadfce;
          border-radius: 22px;
          padding: 22px 18px;
          text-align: center;
          box-shadow: 0 10px 24px rgba(26,18,11,.05);
          transition: transform .2s;
        }

        .hp-mini:hover {
          transform: translateY(-4px);
        }

        .hp-mini-title {
          display: block;
          font-size: 16px;
          font-weight: 800;
          color: #1a120b;
          margin-bottom: 6px;
        }

        .hp-mini-text {
          font-size: 13px;
          color: #7a6b59;
          line-height: 1.6;
        }

        .hp-reviews {
          padding: 36px 0 26px;
        }

        .hp-reviews-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .hp-review {
          background: #fff;
          border: 1px solid #ece0d0;
          border-radius: 24px;
          padding: 26px 22px;
          box-shadow: 0 8px 24px rgba(26,18,11,.06);
          transition: transform .25s, box-shadow .25s;
        }

        .hp-review:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 40px rgba(26,18,11,.1);
        }

        .hp-review-stars {
          display: flex;
          gap: 3px;
          margin-bottom: 14px;
        }

        .hp-review-star {
          color: #c8841a;
          font-size: 15px;
        }

        .hp-review-text {
          font-size: 14px;
          color: #4a3b28;
          line-height: 1.8;
          font-style: italic;
          margin: 0 0 20px;
        }

        .hp-review-author {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .hp-review-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #d4911e, #c8841a);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px;
          font-weight: 700;
          flex-shrink: 0;
        }

        .hp-review-name {
          font-size: 14px;
          font-weight: 700;
          color: #1a120b;
        }

        .hp-review-event {
          font-size: 12px;
          color: #9a8878;
          margin-top: 2px;
        }

        .hp-notice {
          padding: 0 0 16px;
        }

        .hp-notice-box {
          background: #fff;
          border: 1.5px solid #e6d9c4;
          border-radius: 22px;
          padding: 22px 28px;
          display: flex;
          align-items: center;
          gap: 18px;
          box-shadow: 0 4px 18px rgba(26,18,11,.05);
          flex-wrap: wrap;
        }

        .hp-notice-icon {
          width: 50px;
          height: 50px;
          border-radius: 14px;
          background: #fef3d0;
          border: 1.5px solid #e8d5a0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #c8841a;
          flex-shrink: 0;
        }

        .hp-notice-title {
          font-size: 16px;
          font-weight: 800;
          color: #1a120b;
          margin: 0 0 4px;
        }

        .hp-notice-text {
          font-size: 14px;
          color: #7a6a52;
          line-height: 1.7;
          margin: 0;
        }

        .hp-notice-btn {
          margin-left: auto;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          text-decoration: none;
          background: #c8841a;
          color: #fff;
          padding: 11px 22px;
          border-radius: 99px;
          font-weight: 700;
          font-size: 14px;
          white-space: nowrap;
          flex-shrink: 0;
          box-shadow: 0 4px 14px rgba(200,132,26,.3);
          transition: transform .2s, box-shadow .2s;
        }

        .hp-notice-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 22px rgba(200,132,26,.42);
        }

        .hp-cta {
          padding: 0 0 70px;
        }

        .hp-cta-box {
          position: relative;
          overflow: hidden;
          border-radius: 32px;
          background:
            linear-gradient(135deg, rgba(16,10,5,.90), rgba(42,26,10,.84)),
            url('/images/home/home.png');
          background-size: cover;
          background-position: center 42%;
          padding: 54px 36px 48px;
          text-align: center;
          box-shadow: 0 24px 56px rgba(26,18,11,.18);
          border: 1px solid rgba(255,255,255,.08);
        }

        .hp-cta-box::before {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            radial-gradient(circle at 78% 18%, rgba(209,145,31,.26), transparent 30%),
            radial-gradient(circle at 18% 86%, rgba(255,255,255,.06), transparent 26%);
        }

        .hp-cta-box::after {
          content: '';
          position: absolute;
          inset: 20px;
          border-radius: 24px;
          border: 1px solid rgba(255,255,255,.1);
          pointer-events: none;
        }

        .hp-cta-inner {
          position: relative;
          z-index: 2;
          max-width: 820px;
          margin: 0 auto;
        }

        .hp-cta-title {
          font-size: clamp(42px, 5.2vw, 70px);
          font-weight: 700;
          color: #fff;
          line-height: .96;
          margin: 16px 0 14px;
        }

        .hp-cta-title em {
          color: #d89a2d;
          font-style: italic;
        }

        .hp-cta-sub {
          max-width: 650px;
          margin: 0 auto 26px;
          color: rgba(255,255,255,.80);
          font-size: 16px;
          line-height: 1.9;
        }

        .hp-cta-highlights {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          max-width: 760px;
          margin: 0 auto 28px;
        }

        .hp-cta-hl {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          min-height: 48px;
          padding: 10px 14px;
          border-radius: 16px;
          background: rgba(255,255,255,.09);
          border: 1px solid rgba(255,255,255,.13);
          color: rgba(255,255,255,.86);
          font-size: 13px;
          font-weight: 800;
          backdrop-filter: blur(8px);
        }

        .hp-cta-hl svg {
          color: #d89a2d;
          flex-shrink: 0;
        }

        .hp-cta-btns {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 14px;
        }

        .hp-scroll {
          position: fixed;
          bottom: 28px;
          right: 22px;
          z-index: 999;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: linear-gradient(135deg, #d4911e, #c8841a);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 6px 24px rgba(200,132,26,.5);
          opacity: 0;
          transform: translateY(16px) scale(.8);
          transition: all .3s ease;
          pointer-events: none;
        }

        .hp-scroll.visible {
          opacity: 1;
          transform: translateY(0) scale(1);
          pointer-events: auto;
        }

        @media (max-width: 1180px) {
          .hp-svc-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .hp-why-layout {
            grid-template-columns: 1fr;
          }

          .hp-hero-float {
            display: none;
          }
        }

        @media (max-width: 1023px) {
          .hp-stats {
            grid-template-columns: repeat(2, 1fr);
          }

          .hp-stat:nth-child(3),
          .hp-stat:nth-child(4) {
            border-top: 1px solid #f1e7d9;
          }

          .hp-reviews-grid {
            grid-template-columns: 1fr;
          }

          .hp-mini-row {
            grid-template-columns: 1fr;
          }

          .hp-cta-highlights {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 767px) {
          .hp-wrap {
            padding: 0 18px;
          }

          .hp-hero {
            min-height: auto;
            padding: 54px 0 44px;
          }

          .hp-hero-title {
            font-size: 46px;
          }

          .hp-hero-sub {
            font-size: 15px;
          }

          .hp-hero-btns {
            flex-direction: column;
            align-items: stretch;
          }

          .hp-hero-btns a {
            width: 100%;
          }

          .hp-stats {
            grid-template-columns: 1fr;
          }

          .hp-stat {
            border-left: none !important;
            border-top: 1px solid #f1e7d9;
          }

          .hp-stat:first-child {
            border-top: none;
          }

          .hp-svc-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .hp-svc-card {
            min-height: 380px;
            border-radius: 22px;
          }

          .hp-svc-title {
            font-size: 38px;
          }

          .hp-why-feature {
            min-height: 400px;
            padding: 22px;
            border-radius: 22px;
          }

          .hp-notice-box {
            flex-direction: column;
            align-items: flex-start;
          }

          .hp-notice-btn {
            margin-left: 0;
            align-self: stretch;
            justify-content: center;
          }

          .hp-cta {
            padding-bottom: 54px;
          }

          .hp-cta-box {
            padding: 38px 20px 34px;
            border-radius: 24px;
          }

          .hp-cta-box::after {
            inset: 14px;
            border-radius: 18px;
          }

          .hp-cta-title {
            font-size: 40px;
          }

          .hp-cta-btns {
            flex-direction: column;
            align-items: stretch;
          }

          .hp-cta-btns a {
            width: 100%;
          }
        }
      `}</style>

      <div className="hp">
        <section className="hp-hero">
          <div className="hp-hero-bg" />

          <div className="hp-wrap">
            <div className="hp-hero-inner">
              <div className="hp-kicker" data-reveal style={{ animationDelay: '.05s' }}>
                <span className="hp-kicker-dot" />
                Shërbime kreative për evente
              </div>

              <h1 className="hp-serif hp-hero-title" data-reveal style={{ animationDelay: '.18s' }}>
                Festa juaj,
                <br />
                momenti juaj
                <br />
                <em>magjik</em>
              </h1>

              <p className="hp-hero-sub" data-reveal style={{ animationDelay: '.3s' }}>
                Në MD Creative krijojmë eksperienca që lënë përshtypje — dekorime elegante,
                maskota të dashura, aktivitete argëtuese dhe photo booth që e bëjnë çdo event
                të paharrueshëm.
              </p>

              <div className="hp-hero-btns" data-reveal style={{ animationDelay: '.42s' }}>
                <Link to="/booking" className="hp-btn-gold">
                  Rezervo tani
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      stroke="#fff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>

                <Link to="/packages" className="hp-btn-ghost">
                  Shiko paketat
                </Link>
              </div>

              <div className="hp-hero-tags" data-reveal style={{ animationDelay: '.54s' }}>
                {['Dekorime unike', '50+ personazhe', 'Photo Booth', 'Aktivitete argëtuese'].map(
                  (tag) => (
                    <span key={tag} className="hp-tag">
                      {tag}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>

          <div className="hp-hero-float">
            <div className="hp-hero-float-icon">🎉</div>
            <div className="hp-hero-float-text">
              <p>800+ evente</p>
              <p>të realizuara me sukses</p>
            </div>
          </div>
        </section>

        <div className="hp-marquee">
          <div className="hp-marquee-track">
            {[...Array(2)].map((_, repeatIndex) => (
              <div key={repeatIndex} className="hp-marquee-group">
                {marqueeItems.map((item) => (
                  <div key={`${repeatIndex}-${item}`} className="hp-marquee-item">
                    <span>{item}</span>
                    <span className="hp-marquee-sep" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <section className="hp-stats-wrap">
          <div className="hp-wrap">
            <div className="hp-stats">
              <StatCard icon="mask" target={50} suffix="+" label="Personazhe në dispozicion" />
              <StatCard icon="sparkles" target={800} suffix="+" label="Evente të realizuara" />
              <StatCard icon="package" target={10} suffix="+" label="Kategori shërbimesh" />
              <StatCard icon="heart" target={100} suffix="%" label="Përkushtim në çdo detaj" />
            </div>
          </div>
        </section>

        <section className="hp-svc">
          <div className="hp-wrap">
            <div className="hp-section-head" data-reveal>
              <div className="hp-kicker">Shërbimet tona</div>
              <h2 className="hp-serif hp-section-title">
                Gjithçka që ju duhet
                <br />
                për një event <em>të veçantë</em>
              </h2>
              <p className="hp-section-text">
                Zgjidhni shërbimin që ju përshtatet dhe krijoni kombinimin ideal për festën tuaj.
              </p>
            </div>

            <div className="hp-svc-grid">
              {services.map((service, index) => (
                <Link
                  key={service.title}
                  to={service.link}
                  className="hp-svc-card"
                  data-reveal
                  style={{ animationDelay: `${0.08 + index * 0.12}s` }}
                >
                  <img src={service.image} alt={service.title} className="hp-svc-img" />
                  <div className="hp-svc-overlay" />

                  <div className="hp-svc-top">
                    <span className="hp-svc-pill">
                      <GoldIcon name={service.icon} />
                      {service.badge}
                    </span>
                    <span className="hp-svc-num">{String(index + 1).padStart(2, '0')}</span>
                  </div>

                  <div className="hp-svc-body">
                    <h3 className="hp-serif hp-svc-title">{service.title}</h3>
                    <p className="hp-svc-desc">{service.desc}</p>
                    <span className="hp-svc-cta">
                      Shiko më shumë
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M3 8h10M9 4l4 4-4 4"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="hp-why">
          <div className="hp-wrap">
            <div className="hp-section-head" data-reveal>
              <div className="hp-kicker">Pse ne</div>
              <h2 className="hp-serif hp-section-title">
                Ne nuk krijojmë vetëm
                <br />
                dekor, krijojmë <em>atmosferë</em>
              </h2>
              <p className="hp-section-text">
                Çdo event ndërtohet me stil, kreativitet dhe kujdes në detaje — klienti e ndien
                menjëherë seriozitetin dhe elegancën e MD Creative.
              </p>
            </div>

            <div className="hp-why-layout">
              <div className="hp-why-feature" data-reveal>
                <div className="hp-why-fc">
                  <div className="hp-why-badge">
                    <GoldIcon name="sparkles" />
                    <span>Përjetim me stil</span>
                  </div>

                  <h3 className="hp-serif hp-why-ftitle">
                    Jo vetëm organizim,
                    <br />
                    por një ndjesi <em>e kuruar</em>
                  </h3>

                  <p className="hp-why-ftext">
                    Nga koncepti fillestar deri te realizimi final, mendojmë çdo kënd dhe element
                    që eventi juaj të duket i veçantë, harmonik dhe profesional.
                  </p>

                  <div className="hp-why-list">
                    {featurePoints.map((point) => (
                      <div key={point} className="hp-why-li">
                        <div className="hp-why-li-dot">
                          <GoldIcon name="star" />
                        </div>
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="hp-why-side">
                {whyCards.map((card, index) => (
                  <div
                    key={card.n}
                    className="hp-why-card"
                    data-reveal
                    style={{ animationDelay: `${0.1 + index * 0.14}s` }}
                  >
                    <div className="hp-why-card-n">{card.n}</div>
                    <h3 className="hp-why-card-t">{card.title}</h3>
                    <p className="hp-why-card-p">{card.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="hp-mini-row">
              {miniItems.map((item) => (
                <div key={item.title} className="hp-mini" data-reveal>
                  <span className="hp-mini-title">{item.title}</span>
                  <span className="hp-mini-text">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="hp-reviews">
          <div className="hp-wrap">
            <div className="hp-section-head" data-reveal>
              <div className="hp-kicker">Çfarë thonë klientët</div>
              <h2 className="hp-serif hp-section-title">
                Fjalët e tyre janë
                <br />
                <em>mirënjohja jonë</em>
              </h2>
            </div>

            <div className="hp-reviews-grid">
              {reviews.map((review, index) => (
                <div
                  key={`${review.event}-${index}`}
                  className="hp-review"
                  data-reveal
                  style={{ animationDelay: `${0.08 + index * 0.14}s` }}
                >
                  <div className="hp-review-stars">
                    {Array.from({ length: review.stars }).map((_, starIndex) => (
                      <span key={starIndex} className="hp-review-star">
                        ★
                      </span>
                    ))}
                  </div>

                  <p className="hp-review-text">"{review.text}"</p>

                  <div className="hp-review-author">
                    <div className="hp-review-avatar">{review.name[0]}</div>
                    <div>
                      <div className="hp-review-name">{review.name}</div>
                      <div className="hp-review-event">{review.event}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="hp-notice">
          <div className="hp-wrap">
            <div className="hp-notice-box" data-reveal>
              <div className="hp-notice-icon">
                <GoldIcon name="calendar" size={24} />
              </div>

              <div style={{ flex: 1 }}>
                <h3 className="hp-notice-title">Rezervoni me kohë datën tuaj</h3>
                <p className="hp-notice-text">
                  Për evente me dekorime të personalizuara, maskota ose photo booth, rekomandojmë
                  rezervimin disa ditë paraprakisht. Kështu kemi kohë ta planifikojmë çdo detaj me
                  kujdes.
                </p>
              </div>

              <Link to="/booking" className="hp-notice-btn">
                Rezervo tani →
              </Link>
            </div>
          </div>
        </section>

        <section className="hp-cta">
          <div className="hp-wrap">
            <div className="hp-cta-box" data-reveal>
              <div className="hp-cta-inner">
                <div className="hp-kicker lite">
                  <span className="hp-kicker-dot" />
                  Le ta bëjmë eventin tuaj të veçantë
                </div>

                <h2 className="hp-serif hp-cta-title">
                  Na tregoni idenë tuaj,
                  <br />
                  ne e kthejmë në një event <em>të paharrueshëm</em>
                </h2>

                <p className="hp-cta-sub">
                  Qoftë një ditëlindje për fëmijë, një dekorim elegant apo një festë më e madhe,
                  MD Creative kujdeset që çdo detaj të duket bukur, i organizuar dhe me stil.
                </p>

                <div className="hp-cta-highlights">
                  {ctaHighlights.map((highlight) => (
                    <div key={highlight.label} className="hp-cta-hl">
                      <GoldIcon name={highlight.icon} size={18} />
                      <span>{highlight.label}</span>
                    </div>
                  ))}
                </div>

                <div className="hp-cta-btns">
                  <Link to="/booking" className="hp-btn-gold">
                    Rezervo eventin
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M3 8h10M9 4l4 4-4 4"
                        stroke="#fff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>

                  <Link to="/packages" className="hp-btn-ghost">
                    Shiko paketat
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <ScrollToTop />
    </>
  );
}