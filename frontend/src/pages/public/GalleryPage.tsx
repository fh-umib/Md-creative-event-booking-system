import { useEffect, useMemo, useState } from 'react';
import type { SVGProps } from 'react';

type Album = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  photos: string[];
  badge: string;
  countLabel: string;
  tone: 'gold' | 'cream' | 'rose' | 'brown';
};

type GoldIconName =
  | 'camera'
  | 'heart'
  | 'sparkles'
  | 'grid'
  | 'arrow'
  | 'close'
  | 'instagram'
  | 'tiktok';

function GoldIcon({ name }: { name: GoldIconName }) {
  const props: SVGProps<SVGSVGElement> = {
    width: 20,
    height: 20,
    viewBox: '0 0 24 24',
    fill: 'none',
  };

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

  if (name === 'heart') {
    return (
      <svg {...props}>
        <path
          d="M20.4 5.8c-1.7-1.9-4.4-2-6.2-.3L12 7.6 9.8 5.5C8 3.8 5.3 3.9 3.6 5.8c-1.8 2-1.7 5.1.3 7l8.1 7.5 8.1-7.5c2-1.9 2.1-5 .3-7Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (name === 'sparkles') {
    return (
      <svg {...props}>
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

  if (name === 'grid') {
    return (
      <svg {...props}>
        <path
          d="M4 4h6v6H4V4ZM14 4h6v6h-6V4ZM4 14h6v6H4v-6ZM14 14h6v6h-6v-6Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (name === 'instagram') {
    return (
      <svg {...props}>
        <rect
          x="4"
          y="4"
          width="16"
          height="16"
          rx="5"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
      </svg>
    );
  }

  if (name === 'tiktok') {
    return (
      <svg {...props}>
        <path
          d="M14 4v9.2a3.8 3.8 0 1 1-3.8-3.8"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M14 4c1 2 2.5 3.2 4.5 3.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (name === 'close') {
    return (
      <svg {...props}>
        <path
          d="M6 6l12 12M18 6 6 18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
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

const galleryPath = '/images/gallery';
const thankYouBackground = `${galleryPath}/wedding4.png`;

const albums: Album[] = [
  {
    id: 'mascots',
    title: 'Maskota dhe personazhe',
    subtitle: 'Argëtim për fëmijë',
    description:
      'Momente plot buzëqeshje me personazhe të dashura për fëmijë. Ky album përmban disa nga karakteret tona më të kërkuara.',
    photos: Array.from({ length: 10 }, (_, i) => `${galleryPath}/mascots${i + 1}.png`),
    badge: '10 foto',
    countLabel: '50+ karaktere',
    tone: 'gold',
  },
  {
    id: 'wedding-engagement',
    title: 'Dasma dhe fejesa',
    subtitle: 'Elegancë festive',
    description:
      'Dekore elegante për momente të mëdha familjare, me atmosferë të kuruar dhe stil në çdo cep.',
    photos: [
      ...Array.from({ length: 5 }, (_, i) => `${galleryPath}/wedding${i + 1}.png`),
      ...Array.from({ length: 5 }, (_, i) => `${galleryPath}/engagement${i + 1}.png`),
    ],
    badge: '10 foto',
    countLabel: 'Dasma & fejesa',
    tone: 'cream',
  },
  {
    id: 'kids-decor',
    title: 'Dekore për vajza dhe djem',
    subtitle: 'Ditëlindje me temë',
    description:
      'Një album i përbashkët me dekore për vajza dhe djem, me shumë ngjyra, tema kreative dhe detaje të personalizuara.',
    photos: [
      ...Array.from({ length: 5 }, (_, i) => `${galleryPath}/decoration-girl${i + 1}.png`),
      ...Array.from({ length: 5 }, (_, i) => `${galleryPath}/decoration-boy${i + 1}.png`),
    ],
    badge: '10 foto',
    countLabel: 'Vajza & djem',
    tone: 'rose',
  },
  {
    id: 'bounce-bubble',
    title: 'Bounce dhe Bubble House',
    subtitle: 'Argëtim aktiv',
    description:
      'Kënde lojërash për fëmijë me bounce house dhe bubble house, të kombinuara me atmosferë festive.',
    photos: [
      ...Array.from({ length: 5 }, (_, i) => `${galleryPath}/bounce${i + 1}.png`),
      ...Array.from({ length: 5 }, (_, i) => `${galleryPath}/bubble${i + 1}.png`),
    ],
    badge: '10 foto',
    countLabel: 'Bounce & bubble',
    tone: 'gold',
  },
  {
    id: 'baby-shower',
    title: 'Baby Shower',
    subtitle: 'Momente të buta',
    description:
      'Dekore të ëmbla dhe të kujdesshme për një ditë të paharrueshme, me ngjyra të buta dhe shumë ndjeshmëri.',
    photos: Array.from({ length: 10 }, (_, i) => `${galleryPath}/baby-shower${i + 1}.png`),
    badge: '10 foto',
    countLabel: 'Baby shower',
    tone: 'rose',
  },
  {
    id: 'photo-booth',
    title: 'Photo Booth & Photo Box',
    subtitle: 'Kujtime nga eventi',
    description:
      'Photo booth, photo box dhe pasqyrë e personalizuar për kujtime të bukura që mbesin edhe pas eventit.',
    photos: [
      '/images/photo-booth/photo-both.png',
      '/images/photo-booth/photo-box.png',
      '/images/photo-booth/personalized-mirror.png',
      `${galleryPath}/extra1.png`,
      `${galleryPath}/extra2.png`,
      `${galleryPath}/extra3.png`,
      `${galleryPath}/extra4.png`,
      `${galleryPath}/extra5.png`,
      `${galleryPath}/extra6.png`,
      `${galleryPath}/extra7.png`,
    ],
    badge: '10 foto',
    countLabel: 'Photo booth',
    tone: 'gold',
  },
  {
    id: 'extra',
    title: 'Ekstra dhe detaje të veçanta',
    subtitle: 'Mirëseardhje, karrocë, pasqyrë',
    description:
      'Karroca, mirëseardhja, pasqyra e personalizuar dhe shumë detaje tjera që e bëjnë hyrjen dhe atmosferën më të plotë.',
    photos: Array.from({ length: 10 }, (_, i) => `${galleryPath}/extra${i + 1}.png`),
    badge: '10 foto',
    countLabel: 'Ekstra',
    tone: 'cream',
  },
  {
    id: 'bride-to-be',
    title: 'Kanagjegj / Bride to Be',
    subtitle: 'Detaje për nusen',
    description:
      'Kënde të veçanta për kanagjegj, me dekorime elegante dhe pamje që duken bukur në çdo fotografi.',
    photos: Array.from({ length: 5 }, (_, i) => `${galleryPath}/bride-to-be${i + 1}.png`),
    badge: '5 foto',
    countLabel: 'Bride to be',
    tone: 'cream',
  },
  {
    id: 'synetia',
    title: 'Syneti',
    subtitle: 'Dekor familjar',
    description:
      'Dekore për syneti me pamje festive dhe të kuruar, të përshtatura për organizim familjar.',
    photos: Array.from({ length: 5 }, (_, i) => `${galleryPath}/synetia${i + 1}.png`),
    badge: '5 foto',
    countLabel: 'Syneti',
    tone: 'brown',
  },
];

const tickerItems = [
  'Maskota dhe personazhe',
  'Dekore për vajza dhe djem',
  'Dasma dhe fejesa',
  'Bounce & Bubble House',
  'Baby Shower',
  'Kanagjegj',
  'Syneti',
  'Photo Booth',
  'Photo Box',
  'Karroca',
  'Mirëseardhje',
  'Pasqyrë e personalizuar',
];

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
      className={visible ? 'gallery-scroll visible' : 'gallery-scroll'}
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

export default function GalleryPage() {
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const totalPhotos = useMemo(
    () => albums.reduce((total, album) => total + album.photos.length, 0),
    []
  );

  useEffect(() => {
    document.body.style.overflow = selectedAlbum || selectedPhoto ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedAlbum, selectedPhoto]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,500;1,600&family=DM+Sans:wght@400;500;600;700;800;900&display=swap');

        * {
          box-sizing: border-box;
        }

        .gallery-page {
          width: 100%;
          max-width: 100%;
          overflow-x: hidden;
          background:
            radial-gradient(circle at 10% 10%, rgba(200,132,26,0.10), transparent 26%),
            radial-gradient(circle at 85% 40%, rgba(90,45,18,0.08), transparent 32%),
            linear-gradient(180deg, #f8f4ee 0%, #fbf8f4 48%, #f6efe6 100%);
          color: #1a120b;
          font-family: 'DM Sans', sans-serif;
        }

        .gallery-serif {
          font-family: 'Cormorant Garamond', serif;
        }

        .gallery-wrap {
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 28px;
        }

        @keyframes galleryFadeUp {
          from {
            opacity: 0;
            transform: translateY(28px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes galleryZoom {
          from {
            transform: scale(1.08);
          }
          to {
            transform: scale(1.02);
          }
        }

        @keyframes galleryMarquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @keyframes galleryModal {
          from {
            opacity: 0;
            transform: scale(0.94) translateY(18px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .gallery-hero {
          position: relative;
          min-height: 78vh;
          display: flex;
          align-items: center;
          overflow: hidden;
          background:
            radial-gradient(circle at 15% 20%, rgba(212,145,31,0.18), transparent 26%),
            radial-gradient(circle at 82% 25%, rgba(255,255,255,0.06), transparent 20%),
            linear-gradient(120deg, #120c07 0%, #201209 42%, #2b1709 72%, #1b110b 100%);
          isolation: isolate;
        }

        .gallery-hero-bg {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(135deg, rgba(255,255,255,0.03), transparent 35%),
            repeating-linear-gradient(
              45deg,
              rgba(255,255,255,0.03) 0,
              rgba(255,255,255,0.03) 1px,
              transparent 1px,
              transparent 72px
            );
          animation: galleryZoom 1.8s ease both;
        }

        .gallery-hero::after {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 75% 30%, rgba(212,145,31,0.10), transparent 24%),
            radial-gradient(circle at 78% 78%, rgba(212,145,31,0.08), transparent 20%);
          z-index: 1;
          pointer-events: none;
        }

        .gallery-hero-layout {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(320px, 0.95fr);
          gap: 32px;
          align-items: center;
        }

        .gallery-hero-content {
          position: relative;
          z-index: 2;
          max-width: 760px;
          padding: 88px 0 76px;
          animation: galleryFadeUp 0.9s ease both;
        }

        .gallery-hero-illustration {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 520px;
          animation: galleryFadeUp 1s ease both;
        }

        .gallery-camera-wrap {
          position: relative;
          width: min(100%, 500px);
          height: 470px;
        }

        .gallery-camera-glow {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 340px;
          height: 340px;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          background: radial-gradient(circle, rgba(212,145,31,0.26) 0%, rgba(212,145,31,0.10) 38%, transparent 72%);
          filter: blur(10px);
        }

        .gallery-camera-card {
          position: absolute;
          border-radius: 26px;
          border: 1px solid rgba(255,255,255,0.10);
          background: linear-gradient(180deg, rgba(255,255,255,0.10), rgba(255,255,255,0.04));
          box-shadow: 0 18px 46px rgba(0,0,0,0.26);
          backdrop-filter: blur(8px);
        }

        .gallery-camera-card.back {
          width: 240px;
          height: 150px;
          top: 44px;
          right: 36px;
          transform: rotate(10deg);
          opacity: 0.65;
        }

        .gallery-camera-card.front {
          width: 250px;
          height: 160px;
          bottom: 48px;
          left: 26px;
          transform: rotate(-8deg);
        }

        .gallery-camera-body {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 320px;
          height: 220px;
          transform: translate(-50%, -50%);
          border-radius: 34px;
          background: linear-gradient(180deg, #2e231d 0%, #1c1511 100%);
          border: 1px solid rgba(255,255,255,0.10);
          box-shadow: 0 24px 60px rgba(0,0,0,0.34);
        }

        .gallery-camera-top {
          position: absolute;
          top: -28px;
          left: 38px;
          width: 140px;
          height: 54px;
          border-radius: 18px 18px 10px 10px;
          background: linear-gradient(180deg, #332720 0%, #211915 100%);
          border: 1px solid rgba(255,255,255,0.08);
        }

        .gallery-camera-lens-ring {
          position: absolute;
          left: 50%;
          top: 52%;
          width: 140px;
          height: 140px;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          background: radial-gradient(circle, #15110f 0%, #221915 38%, #0f0b09 70%, #3a2a21 100%);
          box-shadow:
            inset 0 0 0 10px #2f241d,
            inset 0 0 0 22px #1a1310,
            0 0 0 8px rgba(255,255,255,0.03);
        }

        .gallery-camera-lens-core {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 68px;
          height: 68px;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          background:
            radial-gradient(circle at 35% 35%, rgba(255,255,255,0.55), rgba(255,255,255,0.06) 22%, rgba(52,125,173,0.36) 35%, #0f1e2c 68%, #091018 100%);
          box-shadow: inset 0 0 18px rgba(255,255,255,0.18);
        }

        .gallery-camera-flash {
          position: absolute;
          top: 36px;
          right: 42px;
          width: 42px;
          height: 30px;
          border-radius: 10px;
          background: linear-gradient(180deg, #efe3cd 0%, #cab18e 100%);
          box-shadow: inset 0 0 10px rgba(255,255,255,0.35);
        }

        .gallery-camera-button {
          position: absolute;
          top: -16px;
          right: 42px;
          width: 48px;
          height: 16px;
          border-radius: 10px;
          background: linear-gradient(180deg, #d59a2e 0%, #b77c18 100%);
        }

        .gallery-camera-small-circle {
          position: absolute;
          top: 42px;
          left: 46px;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #d89a2d;
          box-shadow: 0 0 18px rgba(216,154,45,0.45);
        }

        .gallery-camera-label {
          position: absolute;
          right: 26px;
          bottom: 24px;
          padding: 10px 14px;
          border-radius: 999px;
          background: rgba(255,255,255,0.08);
          color: #f3dfbf;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .gallery-floating-badge {
          position: absolute;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 16px;
          border-radius: 999px;
          background: rgba(255,255,255,0.10);
          border: 1px solid rgba(255,255,255,0.12);
          color: #fff7ea;
          font-size: 12px;
          font-weight: 800;
          box-shadow: 0 14px 30px rgba(0,0,0,0.18);
          backdrop-filter: blur(8px);
        }

        .gallery-floating-badge.one {
          left: 0;
          top: 74px;
        }

        .gallery-floating-badge.two {
          right: 0;
          bottom: 92px;
        }

        .gallery-floating-badge .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #d89a2d;
          box-shadow: 0 0 12px rgba(216,154,45,0.55);
        }

        .gallery-kicker {
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

        .gallery-kicker svg {
          color: #d89a2d;
        }

        .gallery-hero-title {
          margin: 22px 0 18px;
          color: #fff;
          font-size: clamp(58px, 7vw, 102px);
          line-height: 0.92;
          font-weight: 700;
          letter-spacing: -0.03em;
        }

        .gallery-hero-title em {
          color: #d89a2d;
          font-style: italic;
        }

        .gallery-hero-text {
          max-width: 650px;
          margin: 0;
          color: rgba(255,255,255,0.82);
          font-size: 17px;
          line-height: 1.9;
        }

        .gallery-hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 30px;
        }

        .gallery-btn-gold,
        .gallery-btn-light,
        .gallery-social-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          min-height: 52px;
          padding: 0 24px;
          border-radius: 16px;
          text-decoration: none;
          font-size: 14px;
          font-weight: 800;
          transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
        }

        .gallery-btn-gold {
          border: none;
          cursor: pointer;
          background: linear-gradient(135deg, #d4911e, #c8841a);
          color: #fff;
          box-shadow: 0 12px 28px rgba(200,132,26,0.34);
        }

        .gallery-btn-light {
          background: rgba(255,255,255,0.10);
          border: 1px solid rgba(255,255,255,0.18);
          color: #fff;
        }

        .gallery-btn-gold:hover,
        .gallery-btn-light:hover,
        .gallery-social-link:hover {
          transform: translateY(-2px);
        }

        .gallery-marquee {
          overflow: hidden;
          background: linear-gradient(90deg, #170d07, #2a1609, #170d07);
          border-top: 1px solid rgba(255,255,255,0.08);
          border-bottom: 1px solid rgba(255,255,255,0.08);
          padding: 15px 0;
        }

        .gallery-marquee-track {
          display: flex;
          width: max-content;
          animation: galleryMarquee 34s linear infinite;
        }

        .gallery-marquee-group {
          display: flex;
          white-space: nowrap;
        }

        .gallery-marquee-item {
          display: inline-flex;
          align-items: center;
          gap: 16px;
          padding: 0 24px;
          color: #f2dfbd;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          line-height: 1;
        }

        .gallery-marquee-dot {
          width: 8px;
          height: 8px;
          border-radius: 2px;
          background: #d1911f;
          transform: rotate(45deg);
          box-shadow: 0 0 14px rgba(209,145,31,0.58);
        }

        .gallery-stats-section {
          position: relative;
          z-index: 4;
          margin-top: -42px;
          padding: 0 0 44px;
        }

        .gallery-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          max-width: 920px;
          margin: 0 auto;
          overflow: hidden;
          background: rgba(255,255,255,0.98);
          border: 1px solid #ece0d0;
          border-radius: 26px;
          box-shadow: 0 18px 44px rgba(26,18,11,0.1);
        }

        .gallery-stat {
          padding: 26px 18px;
          text-align: center;
          border-left: 1px solid #f1e7d9;
        }

        .gallery-stat:first-child {
          border-left: none;
        }

        .gallery-stat-icon {
          width: 42px;
          height: 42px;
          margin: 0 auto 10px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(200,132,26,0.1);
          color: #c8841a;
        }

        .gallery-stat-number {
          display: block;
          margin-bottom: 6px;
          color: #1a120b;
          font-size: clamp(30px, 4vw, 44px);
          font-weight: 700;
          line-height: 1;
        }

        .gallery-stat-label {
          color: #786b5c;
          font-size: 13px;
          line-height: 1.5;
        }

        .gallery-intro {
          padding: 18px 0 34px;
          text-align: center;
        }

        .gallery-section-title {
          max-width: 860px;
          margin: 16px auto 14px;
          color: #1a120b;
          font-size: clamp(42px, 5vw, 72px);
          line-height: 0.98;
          font-weight: 700;
        }

        .gallery-section-title em {
          color: #c8841a;
          font-style: italic;
        }

        .gallery-section-text {
          max-width: 760px;
          margin: 0 auto;
          color: #74685b;
          font-size: 16px;
          line-height: 1.85;
        }

        .gallery-albums {
          padding: 10px 0 78px;
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 22px;
          align-items: stretch;
        }

        .gallery-card {
          position: relative;
          border: 1px solid #eadfce;
          border-radius: 30px;
          overflow: hidden;
          padding: 0;
          cursor: pointer;
          text-align: left;
          background: linear-gradient(180deg, #fffdf9 0%, #f8f1e8 100%);
          box-shadow: 0 16px 38px rgba(26, 18, 11, 0.10);
          animation: galleryFadeUp 0.8s ease both;
          transition: transform 0.35s ease, box-shadow 0.35s ease;
          min-height: 440px;
        }

        .gallery-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 26px 54px rgba(26, 18, 11, 0.16);
        }

        .gallery-card:nth-child(1),
        .gallery-card:nth-child(2),
        .gallery-card:nth-child(6),
        .gallery-card:nth-child(7),
        .gallery-card:nth-child(8),
        .gallery-card:nth-child(9) {
          grid-column: span 6;
        }

        .gallery-card:nth-child(3),
        .gallery-card:nth-child(4),
        .gallery-card:nth-child(5) {
          grid-column: span 4;
          min-height: 420px;
        }

        .gallery-card:nth-child(6),
        .gallery-card:nth-child(7) {
          min-height: 470px;
        }

        .gallery-card:nth-child(8),
        .gallery-card:nth-child(9) {
          min-height: 410px;
        }

        .gallery-card-visual {
          position: relative;
          min-height: 220px;
          padding: 18px 18px 10px;
          overflow: hidden;
          background:
            radial-gradient(circle at top right, rgba(212, 145, 31, 0.14), transparent 28%),
            radial-gradient(circle at bottom left, rgba(255, 255, 255, 0.6), transparent 32%),
            linear-gradient(135deg, #f7efe4 0%, #efe2d2 100%);
          border-bottom: 1px solid #efe4d6;
        }

        .gallery-card-visual.tone-gold {
          background:
            radial-gradient(circle at top right, rgba(212, 145, 31, 0.18), transparent 30%),
            linear-gradient(135deg, #f8f0e4 0%, #efe1cf 100%);
        }

        .gallery-card-visual.tone-rose {
          background:
            radial-gradient(circle at top right, rgba(221, 167, 167, 0.16), transparent 30%),
            linear-gradient(135deg, #fbf1ef 0%, #f2e3dd 100%);
        }

        .gallery-card-visual.tone-cream {
          background:
            radial-gradient(circle at top right, rgba(255, 223, 163, 0.18), transparent 30%),
            linear-gradient(135deg, #fcf7f0 0%, #f2e8db 100%);
        }

        .gallery-card-visual.tone-brown {
          background:
            radial-gradient(circle at top right, rgba(172, 96, 35, 0.12), transparent 30%),
            linear-gradient(135deg, #f4ece4 0%, #eadccf 100%);
        }

        .gallery-card-visual::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.22), rgba(255,255,255,0.22)),
            repeating-linear-gradient(
              45deg,
              rgba(255,255,255,0.07) 0,
              rgba(255,255,255,0.07) 1px,
              transparent 1px,
              transparent 36px
            );
          pointer-events: none;
        }

        .gallery-card-top {
          position: relative;
          z-index: 3;
          display: flex;
          justify-content: space-between;
          gap: 10px;
          align-items: center;
        }

        .gallery-card-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 9px 13px;
          border-radius: 999px;
          background: rgba(255,255,255,0.94);
          color: #1a120b;
          font-size: 12px;
          font-weight: 900;
          box-shadow: 0 8px 22px rgba(26,18,11,0.10);
        }

        .gallery-card-badge svg {
          color: #c8841a;
          width: 17px;
          height: 17px;
        }

        .gallery-card-count {
          padding: 10px 14px;
          border-radius: 999px;
          background: #d1911f;
          color: #fff;
          font-size: 12px;
          font-weight: 900;
          box-shadow: 0 8px 22px rgba(209,145,31,0.30);
        }

        .gallery-album-center {
          position: relative;
          z-index: 2;
          min-height: 170px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px 8px 10px;
        }

        .gallery-album-stack {
          position: relative;
          width: 220px;
          height: 140px;
        }

        .gallery-album-sheet {
          position: absolute;
          inset: 0;
          border-radius: 22px;
          border: 1px solid rgba(212, 145, 31, 0.18);
          box-shadow: 0 12px 28px rgba(26, 18, 11, 0.08);
        }

        .gallery-album-sheet-back {
          background: linear-gradient(180deg, #f6ecdf 0%, #ebdccb 100%);
          transform: rotate(-8deg) translate(-12px, 8px);
          opacity: 0.8;
        }

        .gallery-album-sheet-middle {
          background: linear-gradient(180deg, #fff8f0 0%, #efe2d3 100%);
          transform: rotate(6deg) translate(10px, 4px);
          opacity: 0.92;
        }

        .gallery-album-sheet-front {
          background:
            linear-gradient(180deg, rgba(255,255,255,0.88), rgba(255,255,255,0.78)),
            linear-gradient(135deg, #fdfaf5 0%, #f1e5d6 100%);
          backdrop-filter: blur(3px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 20px;
          transition: transform 0.35s ease, box-shadow 0.35s ease;
        }

        .gallery-card:hover .gallery-album-sheet-front {
          transform: translateY(-6px) scale(1.02);
          box-shadow: 0 18px 34px rgba(26, 18, 11, 0.12);
        }

        .gallery-album-icon {
          width: 52px;
          height: 52px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(212, 145, 31, 0.12);
          color: #c8841a;
        }

        .gallery-album-mini-title {
          text-align: center;
          color: #2c1d12;
          font-size: 15px;
          font-weight: 900;
          line-height: 1.25;
        }

        .gallery-album-mini-subtitle {
          text-align: center;
          color: #8a7660;
          font-size: 12px;
          font-weight: 700;
          line-height: 1.4;
        }

        .gallery-card-body {
          position: relative;
          padding: 24px 24px 24px;
          background:
            radial-gradient(circle at top right, rgba(212,145,31,0.07), transparent 32%),
            linear-gradient(180deg, rgba(255,255,255,0.72) 0%, rgba(255,248,240,0.94) 100%);
        }

        .gallery-card-subtitle {
          display: inline-block;
          margin-bottom: 10px;
          color: #c8841a;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 0.13em;
          text-transform: uppercase;
        }

        .gallery-card-title {
          margin: 0 0 12px;
          color: #1a120b;
          font-size: clamp(34px, 3.3vw, 48px);
          line-height: 0.94;
          font-weight: 700;
        }

        .gallery-card-desc {
          max-width: 620px;
          margin: 0 0 18px;
          color: #6f6254;
          font-size: 14px;
          line-height: 1.72;
        }

        .gallery-card-action {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          min-height: 42px;
          padding: 0 16px;
          border-radius: 999px;
          background: rgba(212, 145, 31, 0.10);
          border: 1px solid rgba(212, 145, 31, 0.20);
          color: #9f6712;
          font-size: 13px;
          font-weight: 800;
          transition: all 0.25s ease;
        }

        .gallery-card:hover .gallery-card-action {
          background: #d1911f;
          color: #fff;
          transform: translateX(4px);
        }

        .gallery-note {
          padding: 0 0 34px;
        }

        .gallery-note-box {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 24px;
          align-items: center;
          padding: 28px 30px;
          border-radius: 28px;
          background:
            linear-gradient(135deg, rgba(255,255,255,0.98), rgba(255,250,242,0.96));
          border: 1px solid #eadfce;
          box-shadow: 0 14px 34px rgba(26,18,11,0.08);
        }

        .gallery-note-title {
          margin: 0 0 8px;
          color: #1a120b;
          font-size: 28px;
          font-weight: 900;
        }

        .gallery-note-text {
          margin: 0;
          color: #756758;
          font-size: 15px;
          line-height: 1.8;
        }

        .gallery-socials {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .gallery-social-link {
          background: #1a120b;
          color: #fff;
        }

        .gallery-social-link:hover {
          background: #c8841a;
        }

        .gallery-thankyou {
          padding: 0 0 78px;
        }

        .gallery-thankyou-box {
          position: relative;
          overflow: hidden;
          border-radius: 32px;
          padding: 54px 30px;
          text-align: center;
          background:
            linear-gradient(135deg, rgba(20,12,6,0.94), rgba(64,37,14,0.88)),
            url('${thankYouBackground}');
          background-size: cover;
          background-position: center;
          color: #fff;
          box-shadow: 0 20px 48px rgba(26,18,11,0.18);
        }

        .gallery-thankyou-box::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 20% 20%, rgba(209,145,31,0.22), transparent 28%),
            radial-gradient(circle at 80% 80%, rgba(255,255,255,0.07), transparent 28%);
          pointer-events: none;
        }

        .gallery-thankyou-inner {
          position: relative;
          z-index: 2;
          max-width: 780px;
          margin: 0 auto;
        }

        .gallery-thankyou-title {
          margin: 14px 0 12px;
          color: #fff;
          font-size: clamp(42px, 5vw, 70px);
          line-height: 0.98;
          font-weight: 700;
        }

        .gallery-thankyou-title em {
          color: #d89a2d;
          font-style: italic;
        }

        .gallery-thankyou-text {
          margin: 0 auto;
          max-width: 650px;
          color: rgba(255,255,255,0.84);
          font-size: 16px;
          line-height: 1.85;
        }

        .gallery-modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 22px;
          background: rgba(12,8,5,0.78);
          backdrop-filter: blur(10px);
        }

        .gallery-modal {
          width: min(1120px, 100%);
          max-height: min(88vh, 820px);
          overflow: hidden;
          border-radius: 30px;
          background: #fbf8f4;
          box-shadow: 0 28px 70px rgba(0,0,0,0.36);
          animation: galleryModal 0.3s ease both;
        }

        .gallery-modal-header {
          display: flex;
          justify-content: space-between;
          gap: 18px;
          align-items: flex-start;
          padding: 24px 26px;
          border-bottom: 1px solid #eadfce;
          background: #fffaf4;
        }

        .gallery-modal-title {
          margin: 0 0 8px;
          color: #1a120b;
          font-size: 36px;
          line-height: 1;
          font-weight: 700;
        }

        .gallery-modal-desc {
          margin: 0;
          max-width: 720px;
          color: #74685b;
          font-size: 14px;
          line-height: 1.7;
        }

        .gallery-modal-close {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: none;
          background: #1a120b;
          color: #fff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.25s ease, transform 0.25s ease;
        }

        .gallery-modal-close:hover {
          background: #c8841a;
          transform: rotate(90deg);
        }

        .gallery-photo-grid {
          max-height: calc(88vh - 150px);
          overflow: auto;
          padding: 22px;
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 14px;
        }

        .gallery-photo-btn {
          position: relative;
          overflow: hidden;
          height: 190px;
          border: none;
          border-radius: 20px;
          padding: 0;
          cursor: pointer;
          background: #eadfce;
          box-shadow: 0 8px 20px rgba(26,18,11,0.08);
        }

        .gallery-photo-btn img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.45s ease, filter 0.45s ease;
        }

        .gallery-photo-btn:hover img {
          transform: scale(1.08);
          filter: brightness(0.88);
        }

        .gallery-photo-number {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(26,18,11,0.72);
          color: #fff;
          font-size: 12px;
          font-weight: 900;
        }

        .gallery-photo-viewer {
          position: fixed;
          inset: 0;
          z-index: 3000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 22px;
          background: rgba(8,5,3,0.88);
        }

        .gallery-photo-viewer img {
          max-width: min(96vw, 1100px);
          max-height: 88vh;
          object-fit: contain;
          border-radius: 22px;
          box-shadow: 0 26px 70px rgba(0,0,0,0.4);
        }

        .gallery-photo-close {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 3100;
          width: 46px;
          height: 46px;
          border-radius: 50%;
          border: none;
          background: #c8841a;
          color: #fff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .gallery-scroll {
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

        .gallery-scroll.visible {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }

        @media (max-width: 1180px) {
          .gallery-hero-layout {
            grid-template-columns: 1fr;
          }

          .gallery-hero-illustration {
            min-height: 420px;
            padding-bottom: 42px;
          }

          .gallery-card,
          .gallery-card:nth-child(1),
          .gallery-card:nth-child(2),
          .gallery-card:nth-child(3),
          .gallery-card:nth-child(4),
          .gallery-card:nth-child(5),
          .gallery-card:nth-child(6),
          .gallery-card:nth-child(7),
          .gallery-card:nth-child(8),
          .gallery-card:nth-child(9) {
            grid-column: span 6;
            min-height: 440px;
          }

          .gallery-photo-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }

        @media (max-width: 767px) {
          .gallery-wrap {
            padding: 0 18px;
          }

          .gallery-hero {
            min-height: auto;
          }

          .gallery-hero-layout {
            grid-template-columns: 1fr;
          }

          .gallery-hero-content {
            padding: 72px 0 24px;
          }

          .gallery-hero-title {
            font-size: 56px;
          }

          .gallery-hero-text {
            font-size: 15px;
          }

          .gallery-hero-actions {
            flex-direction: column;
          }

          .gallery-hero-actions a {
            width: 100%;
          }

          .gallery-hero-illustration {
            min-height: 360px;
            padding-bottom: 24px;
          }

          .gallery-camera-wrap {
            width: 100%;
            max-width: 360px;
            height: 320px;
          }

          .gallery-camera-body {
            width: 240px;
            height: 170px;
          }

          .gallery-camera-top {
            width: 105px;
            height: 42px;
            top: -22px;
            left: 28px;
          }

          .gallery-camera-lens-ring {
            width: 104px;
            height: 104px;
          }

          .gallery-camera-lens-core {
            width: 52px;
            height: 52px;
          }

          .gallery-camera-card.back {
            width: 180px;
            height: 112px;
            top: 28px;
            right: 18px;
          }

          .gallery-camera-card.front {
            width: 185px;
            height: 116px;
            bottom: 30px;
            left: 10px;
          }

          .gallery-floating-badge.one {
            top: 18px;
            left: 0;
          }

          .gallery-floating-badge.two {
            right: 0;
            bottom: 18px;
          }

          .gallery-marquee-item {
            padding: 0 18px;
            font-size: 11px;
            letter-spacing: 0.14em;
          }

          .gallery-stats-section {
            margin-top: -26px;
          }

          .gallery-stats {
            grid-template-columns: 1fr;
          }

          .gallery-stat {
            border-left: none;
            border-top: 1px solid #f1e7d9;
          }

          .gallery-stat:first-child {
            border-top: none;
          }

          .gallery-grid {
            grid-template-columns: 1fr;
            gap: 18px;
          }

          .gallery-card,
          .gallery-card:nth-child(1),
          .gallery-card:nth-child(2),
          .gallery-card:nth-child(3),
          .gallery-card:nth-child(4),
          .gallery-card:nth-child(5),
          .gallery-card:nth-child(6),
          .gallery-card:nth-child(7),
          .gallery-card:nth-child(8),
          .gallery-card:nth-child(9) {
            grid-column: span 1;
            min-height: auto;
            border-radius: 24px;
          }

          .gallery-card-visual {
            min-height: 205px;
          }

          .gallery-album-stack {
            width: 190px;
            height: 126px;
          }

          .gallery-card-title {
            font-size: 34px;
          }

          .gallery-note-box {
            grid-template-columns: 1fr;
            padding: 24px 20px;
          }

          .gallery-socials {
            width: 100%;
          }

          .gallery-social-link {
            flex: 1;
          }

          .gallery-thankyou-box {
            padding: 42px 22px;
            border-radius: 24px;
          }

          .gallery-modal-backdrop {
            padding: 12px;
            align-items: flex-start;
          }

          .gallery-modal {
            max-height: 94vh;
            border-radius: 24px;
          }

          .gallery-modal-header {
            padding: 20px;
          }

          .gallery-modal-title {
            font-size: 30px;
          }

          .gallery-photo-grid {
            max-height: calc(94vh - 150px);
            grid-template-columns: 1fr;
            padding: 16px;
          }

          .gallery-photo-btn {
            height: 280px;
          }
        }
      `}</style>

      <div className="gallery-page">
        <section className="gallery-hero">
          <div className="gallery-hero-bg" />

          <div className="gallery-wrap">
            <div className="gallery-hero-layout">
              <div className="gallery-hero-content">
                <div className="gallery-kicker">
                  <GoldIcon name="camera" />
                  Galeria e eventeve
                </div>

                <h1 className="gallery-serif gallery-hero-title">
                  Albumet tona
                  <br />
                  plot <em>jetë</em>
                </h1>

                <p className="gallery-hero-text">
                  Këtu mund t’i shihni disa nga momentet, dekorimet, personazhet dhe
                  detajet që kemi realizuar në evente të ndryshme. Çdo album përmban
                  vetëm një pjesë të punës sonë, sepse çdo event ka historinë e vet.
                </p>

                <div className="gallery-hero-actions">
                  <a href="#albumet" className="gallery-btn-gold">
                    Shiko albumet
                    <GoldIcon name="arrow" />
                  </a>

                  <a
                    href="https://www.instagram.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="gallery-btn-light"
                  >
                    <GoldIcon name="instagram" />
                    Na ndiqni në Instagram
                  </a>
                </div>
              </div>

              <div className="gallery-hero-illustration">
                <div className="gallery-camera-wrap">
                  <div className="gallery-camera-glow" />

                  <div className="gallery-camera-card back" />
                  <div className="gallery-camera-card front" />

                  <div className="gallery-floating-badge one">
                    <span className="dot" />
                    Albume kreative
                  </div>

                  <div className="gallery-floating-badge two">
                    <span className="dot" />
                    Foto & kujtime
                  </div>

                  <div className="gallery-camera-body">
                    <div className="gallery-camera-top" />
                    <div className="gallery-camera-button" />
                    <div className="gallery-camera-small-circle" />
                    <div className="gallery-camera-flash" />

                    <div className="gallery-camera-lens-ring">
                      <div className="gallery-camera-lens-core" />
                    </div>

                    <div className="gallery-camera-label">MD Creative</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="gallery-marquee">
          <div className="gallery-marquee-track">
            {[...Array(2)].map((_, repeatIndex) => (
              <div key={repeatIndex} className="gallery-marquee-group">
                {tickerItems.map((item) => (
                  <div key={`${repeatIndex}-${item}`} className="gallery-marquee-item">
                    <span>{item}</span>
                    <span className="gallery-marquee-dot" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <section className="gallery-stats-section">
          <div className="gallery-wrap">
            <div className="gallery-stats">
              <div className="gallery-stat">
                <div className="gallery-stat-icon">
                  <GoldIcon name="grid" />
                </div>
                <span className="gallery-serif gallery-stat-number">{albums.length}</span>
                <span className="gallery-stat-label">Albume të organizuara</span>
              </div>

              <div className="gallery-stat">
                <div className="gallery-stat-icon">
                  <GoldIcon name="camera" />
                </div>
                <span className="gallery-serif gallery-stat-number">{totalPhotos}+</span>
                <span className="gallery-stat-label">Foto të përzgjedhura</span>
              </div>

              <div className="gallery-stat">
                <div className="gallery-stat-icon">
                  <GoldIcon name="sparkles" />
                </div>
                <span className="gallery-serif gallery-stat-number">100%</span>
                <span className="gallery-stat-label">Detaje të kuruara</span>
              </div>
            </div>
          </div>
        </section>

        <section className="gallery-intro">
          <div className="gallery-wrap">
            <div className="gallery-kicker">
              <GoldIcon name="sparkles" />
              Zgjidh albumin
            </div>

            <h2 className="gallery-serif gallery-section-title">
              Çdo kategori ka
              <br />
              atmosferën e vet <em>speciale</em>
            </h2>

            <p className="gallery-section-text">
              Klikoni në një album për t’i parë fotot brenda tij. Kartat janë menduar
              si kopertina albumesh, ndërsa fotot reale hapen brenda secilit album.
            </p>
          </div>
        </section>

        <section id="albumet" className="gallery-albums">
          <div className="gallery-wrap">
            <div className="gallery-grid">
              {albums.map((album, index) => (
                <button
                  key={album.id}
                  type="button"
                  className={`gallery-card tone-${album.tone}`}
                  style={{ animationDelay: `${index * 0.06}s` }}
                  onClick={() => setSelectedAlbum(album)}
                >
                  <div className={`gallery-card-visual tone-${album.tone}`}>
                    <div className="gallery-card-top">
                      <span className="gallery-card-badge">
                        <GoldIcon name="camera" />
                        {album.badge}
                      </span>

                      <span className="gallery-card-count">{album.countLabel}</span>
                    </div>

                    <div className="gallery-album-center">
                      <div className="gallery-album-stack">
                        <div className="gallery-album-sheet gallery-album-sheet-back" />
                        <div className="gallery-album-sheet gallery-album-sheet-middle" />
                        <div className="gallery-album-sheet gallery-album-sheet-front">
                          <div className="gallery-album-icon">
                            <GoldIcon name="grid" />
                          </div>

                          <span className="gallery-album-mini-title">{album.title}</span>
                          <span className="gallery-album-mini-subtitle">
                            {album.subtitle}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="gallery-card-body">
                    <span className="gallery-card-subtitle">{album.subtitle}</span>

                    <h3 className="gallery-serif gallery-card-title">{album.title}</h3>

                    <p className="gallery-card-desc">{album.description}</p>

                    <span className="gallery-card-action">
                      Hap albumin
                      <GoldIcon name="arrow" />
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="gallery-note">
          <div className="gallery-wrap">
            <div className="gallery-note-box">
              <div>
                <h3 className="gallery-note-title">
                  Këto janë vetëm disa nga momentet tona
                </h3>

                <p className="gallery-note-text">
                  Në çdo event krijojmë përmbajtje të reja — foto, video, prapaskena
                  dhe detaje nga realizimi. Për më shumë momente të përditshme, na
                  ndiqni në Instagram dhe TikTok, ku publikojmë event pas eventi punën
                  tonë.
                </p>
              </div>

              <div className="gallery-socials">
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="gallery-social-link"
                >
                  <GoldIcon name="instagram" />
                  Instagram
                </a>

                <a
                  href="https://www.tiktok.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="gallery-social-link"
                >
                  <GoldIcon name="tiktok" />
                  TikTok
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="gallery-thankyou">
          <div className="gallery-wrap">
            <div className="gallery-thankyou-box">
              <div className="gallery-thankyou-inner">
                <div className="gallery-kicker">
                  <GoldIcon name="heart" />
                  Nga MD Creative
                </div>

                <h2 className="gallery-serif gallery-thankyou-title">
                  Faleminderit që çdo moment
                  <br />
                  e bëni më <em>të bukur</em>
                </h2>

                <p className="gallery-thankyou-text">
                  Çdo festë, çdo buzëqeshje dhe çdo detaj na jep më shumë arsye të
                  krijojmë me dashuri. Galeria jonë rritet me ju, event pas eventi.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {selectedAlbum ? (
        <div
          className="gallery-modal-backdrop"
          onClick={() => setSelectedAlbum(null)}
          role="presentation"
        >
          <div className="gallery-modal" onClick={(event) => event.stopPropagation()}>
            <div className="gallery-modal-header">
              <div>
                <h2 className="gallery-serif gallery-modal-title">{selectedAlbum.title}</h2>
                <p className="gallery-modal-desc">{selectedAlbum.description}</p>
              </div>

              <button
                type="button"
                className="gallery-modal-close"
                aria-label="Mbyll albumin"
                onClick={() => setSelectedAlbum(null)}
              >
                <GoldIcon name="close" />
              </button>
            </div>

            <div className="gallery-photo-grid">
              {selectedAlbum.photos.map((photo, index) => (
                <button
                  key={photo}
                  type="button"
                  className="gallery-photo-btn"
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <img src={photo} alt={`${selectedAlbum.title} ${index + 1}`} />
                  <span className="gallery-photo-number">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {selectedPhoto ? (
        <div className="gallery-photo-viewer" onClick={() => setSelectedPhoto(null)}>
          <button
            type="button"
            className="gallery-photo-close"
            aria-label="Mbyll foton"
            onClick={() => setSelectedPhoto(null)}
          >
            <GoldIcon name="close" />
          </button>

          <img
            src={selectedPhoto}
            alt="Foto nga galeria"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      ) : null}

      <ScrollToTop />
    </>
  );
}