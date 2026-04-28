import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

type MascotCard = {
  name: string;
  theme: string;
  description: string;
  image: string;
};

const mascotCards: MascotCard[] = [
  {
    name: 'Arlo, Ziko & Flix',
    theme: 'Fantazi',
    description: 'Personazhe argëtuese për festa plot energji, lojë dhe buzëqeshje.',
    image: '/images/mascots/arlo-ziko-flix.png',
  },
  {
    name: 'Bluey & Bingo',
    theme: 'Vizatimor',
    description:
      'Dy personazhe të dashura për fëmijë, perfekte për ditëlindje dhe evente familjare.',
    image: '/images/mascots/bluey-bingo.png',
  },
  {
    name: 'Boy & Girl',
    theme: 'Baby Shower',
    description:
      'Maskotë shumë e ëmbël për baby shower dhe gender reveal, ideale për fotografi, hyrje tematike dhe një atmosferë të veçantë në event.',
    image: '/images/mascots/boy-girl.png',
  },
  {
    name: 'Elsa, Anna & Olaf',
    theme: 'Princeshë',
    description:
      'Personazhe magjike për fëmijët që i duan përrallat, akullin dhe botën e princeshave.',
    image: '/images/mascots/elsa-anna-olaf.png',
  },
  {
    name: 'Fox & Panda',
    theme: 'Kafshë',
    description: 'Maskota të ëmbla dhe shumë të përshtatshme për festa me fëmijë të vegjël.',
    image: '/images/mascots/fox-panda.png',
  },
  {
    name: 'Goofy',
    theme: 'Disney',
    description: 'Personazh klasik që sjell humor, lojë dhe atmosferë të gëzueshme në event.',
    image: '/images/mascots/goofy.png',
  },
  {
    name: 'Hello Kitty & LOL Doll',
    theme: 'Vizatimor',
    description: 'Kombinim i bukur për festa vajzash, me ngjyra, stil dhe shumë ëmbëlsi.',
    image: '/images/mascots/hello-kitty-lol-doll.png',
  },
  {
    name: 'Iron Man & Black Panther',
    theme: 'Superhero',
    description: 'Superheronj për fëmijët që duan aksion, energji dhe atmosferë të fuqishme.',
    image: '/images/mascots/iron-man-black-panther.png',
  },
  {
    name: 'Ladybug & Cat Noir',
    theme: 'Superhero',
    description:
      'Dy personazhe shumë të dashura për fëmijë, ideale për festa dinamike dhe plot ngjyra.',
    image: '/images/mascots/lady-bud-cat-noir.png',
  },
  {
    name: 'Lion Teddy',
    theme: 'Kafshë',
    description:
      'Maskotë e butë dhe miqësore që i jep festës atmosferë të ngrohtë dhe të këndshme.',
    image: '/images/mascots/lion-teddy.png',
  },
  {
    name: 'LOL Doll & Garfield',
    theme: 'Vizatimor',
    description:
      'Personazhe të njohura për fëmijë, të përshtatshme për fotografi dhe lojëra në festë.',
    image: '/images/mascots/lol-doll-garfiled.png',
  },
  {
    name: 'Mario, Luigi & Sonic',
    theme: 'Aventurë',
    description:
      'Personazhe plot ritëm dhe energji për fëmijë që duan lojë, aventurë dhe argëtim.',
    image: '/images/mascots/mario-luigi-sonic.png',
  },
  {
    name: 'Marshall & Chase',
    theme: 'Aventurë',
    description:
      'Maskota të dashura për fëmijë, perfekte për festa me temë shpëtimi dhe lojëra.',
    image: '/images/mascots/marshall-chase.png',
  },
  {
    name: 'Masha & Ariu',
    theme: 'Vizatimor',
    description: 'Dy personazhe të ngrohta dhe shumë të njohura për festa të ëmbla fëmijësh.',
    image: '/images/mascots/masha-the-bear.png',
  },
  {
    name: 'Micky & Minnie Mouse',
    theme: 'Disney',
    description:
      'Personazhe klasike që sjellin atmosferë festive, vallëzim dhe shumë foto të bukura.',
    image: '/images/mascots/micky-minnie-mouse.png',
  },
  {
    name: 'Minions',
    theme: 'Vizatimor',
    description: 'Maskota plot humor dhe energji që i bëjnë fëmijët të qeshin gjatë gjithë festës.',
    image: '/images/mascots/minions.png',
  },
  {
    name: 'Palço',
    theme: 'Klasike',
    description: 'Personazh klasik për festa, me lojëra, humor dhe atmosferë argëtuese për fëmijë.',
    image: '/images/mascots/palco.png',
  },
  {
    name: 'Pikachu',
    theme: 'Aventurë',
    description: 'Personazh shumë i dashur për fëmijët që e duan botën e lojërave dhe aventurave.',
    image: '/images/mascots/pikachu.png',
  },
  {
    name: 'Queen Bee & Bon Bon',
    theme: 'Fantazi',
    description: 'Personazhe me pamje të veçantë për festa plot ngjyra, stil dhe energji.',
    image: '/images/mascots/queen-bea-bon-bon.png',
  },
  {
    name: 'Santa Claus & Rudolf',
    theme: 'Festive',
    description: 'Zgjedhje ideale për festa dimërore, fundvit dhe evente me atmosferë festive.',
    image: '/images/mascots/santa-claus-rudolf.png',
  },
  {
    name: 'Spiderman',
    theme: 'Superhero',
    description:
      'Superhero i preferuar për fëmijë që duan aksion, lojë dhe momente të paharrueshme.',
    image: '/images/mascots/spidermans.png',
  },
  {
    name: 'SpongeBob',
    theme: 'Vizatimor',
    description: 'Personazh gazmor dhe shumë i dashur që sjell humor dhe ngjyra në festë.',
    image: '/images/mascots/spoongebob.png',
  },
  {
    name: 'Stitch & Angel',
    theme: 'Disney',
    description: 'Dy personazhe të ëmbla dhe të veçanta për festa të ngrohta dhe plot dashuri.',
    image: '/images/mascots/stichy-angel.png',
  },
  {
    name: 'Superman & Batman',
    theme: 'Superhero',
    description: 'Dy superheronj klasikë për festa me temë aksioni dhe atmosferë të fuqishme.',
    image: '/images/mascots/superman-batman.png',
  },
  {
    name: 'Tigger',
    theme: 'Disney',
    description: 'Personazh i gjallë dhe energjik që sjell shumë lëvizje dhe gëzim në festë.',
    image: '/images/mascots/tigger.png',
  },
  {
    name: 'Tom & Jerry',
    theme: 'Vizatimor',
    description:
      'Dy personazhe klasike që sjellin humor, lojë dhe kujtime të bukura për fëmijët.',
    image: '/images/mascots/tommy-jerry.png',
  },
  {
    name: 'Unicorn & Lepurushja',
    theme: 'Fantazi',
    description: 'Personazhe të ëmbla për festa me ngjyra pastel, fantazi dhe atmosferë të butë.',
    image: '/images/mascots/unicorn-lepurushja.png',
  },
  {
    name: 'Winnie the Pooh & Donald Duck',
    theme: 'Disney',
    description:
      'Personazhe të dashura për fëmijë, ideale për festa familjare dhe fotografi të bukura.',
    image: '/images/mascots/winniethepooh-donalduck.png',
  },
];

const themeOrder = [
  'Të gjitha',
  'Disney',
  'Superhero',
  'Vizatimor',
  'Prineshë',
  'Kafshë',
  'Fantazi',
  'Aventurë',
  'Klasike',
  'Festive',
  'Baby Shower',
];

const tickerItems = [
  'Micky & Minnie',
  'Spiderman',
  'Elsa & Anna',
  'Boy & Girl',
  'Baby Shower',
  'Paw Patrol',
  'Superheronj',
  'Princesha',
  'Disney',
  '50+ karaktere',
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
      className={visible ? 'mp-scroll-top visible' : 'mp-scroll-top'}
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

export default function MascotsPage() {
  const [search, setSearch] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('Të gjitha');

  const themes = useMemo(() => {
    const existingThemes = mascotCards.map((item) => item.theme);

    return themeOrder.filter(
      (theme) => theme === 'Të gjitha' || existingThemes.includes(theme)
    );
  }, []);

  const filteredMascots = useMemo(() => {
    const query = search.trim().toLowerCase();

    return mascotCards.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(query) ||
        item.theme.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query);

      const matchesTheme =
        selectedTheme === 'Të gjitha' || item.theme === selectedTheme;

      return matchesSearch && matchesTheme;
    });
  }, [search, selectedTheme]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=DM+Sans:wght@400;500;600;700;800&display=swap');

        .mp,
        .mp * {
          box-sizing: border-box;
        }

        .mp {
          width: 100%;
          max-width: 100%;
          overflow-x: hidden;
          background: #faf7f2;
          color: #1a120b;
          font-family: 'DM Sans', sans-serif;
        }

        .mp-serif {
          font-family: 'Cormorant Garamond', serif;
        }

        @keyframes mp-fade-up {
          from {
            opacity: 0;
            transform: translateY(22px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes mp-marquee {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }

        .mp-a1 {
          animation: mp-fade-up .55s ease both .05s;
        }

        .mp-a2 {
          animation: mp-fade-up .55s ease both .18s;
        }

        .mp-a3 {
          animation: mp-fade-up .55s ease both .30s;
        }

        .mp-hero {
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #1a120b 0%, #2c1a0a 55%, #1a120b 100%);
        }

        .mp-hero::before {
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

        .mp-hero::after {
          content: '';
          position: absolute;
          width: 620px;
          height: 620px;
          border-radius: 50%;
          top: 45%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: radial-gradient(circle, rgba(200,132,26,.16) 0%, transparent 65%);
          pointer-events: none;
        }

        .mp-hero-inner {
          position: relative;
          z-index: 1;
          max-width: 1200px;
          margin: 0 auto;
          padding: 86px 44px 70px;
          text-align: center;
        }

        .mp-badge {
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

        .mp-hero-title {
          margin: 0 0 18px;
          color: #fff;
          font-size: 82px;
          line-height: 1.02;
          font-weight: 700;
        }

        .mp-hero-title em {
          color: #c8841a;
          font-style: italic;
        }

        .mp-hero-text {
          margin: 0 auto 34px;
          max-width: 680px;
          color: rgba(255,255,255,.66);
          font-size: 18px;
          line-height: 1.85;
        }

        .mp-search-wrap {
          width: 100%;
          max-width: 540px;
          margin: 0 auto;
          position: relative;
        }

        .mp-search-icon {
          position: absolute;
          left: 20px;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(255,255,255,.45);
          pointer-events: none;
        }

        .mp-search {
          width: 100%;
          height: 54px;
          border-radius: 999px;
          border: 1.5px solid rgba(255,255,255,.14);
          background: rgba(255,255,255,.07);
          color: #fff;
          padding: 0 22px 0 50px;
          font-size: 15px;
          font-family: inherit;
          transition: border-color .2s ease, background .2s ease, box-shadow .2s ease;
        }

        .mp-search:focus {
          border-color: rgba(200,132,26,.8);
          background: rgba(255,255,255,.12);
          box-shadow: 0 0 0 3px rgba(200,132,26,.2);
          outline: none;
        }

        .mp-search::placeholder {
          color: rgba(255,255,255,.45);
        }

        .mp-ticker-wrap {
          width: 100%;
          overflow: hidden;
          border-top: 1px solid rgba(200,132,26,.18);
          padding: 13px 0;
        }

        .mp-ticker {
          display: flex;
          width: max-content;
          max-width: none;
          animation: mp-marquee 24s linear infinite;
          will-change: transform;
        }

        .mp-ticker-group {
          display: inline-flex;
          align-items: center;
          flex-shrink: 0;
          max-width: none;
        }

        .mp-ticker-item {
          display: inline-flex;
          align-items: center;
          gap: 16px;
          padding-right: 40px;
          white-space: nowrap;
          max-width: none;
        }

        .mp-ticker-star {
          color: #c8841a;
          font-size: 13px;
        }

        .mp-ticker-text {
          color: rgba(255,255,255,.45);
          font-size: 12px;
          font-weight: 800;
          letter-spacing: .08em;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .mp-main {
          max-width: 1280px;
          margin: 0 auto;
          padding: 62px 44px 96px;
        }

        .mp-head {
          max-width: 760px;
          margin: 0 auto 34px;
          text-align: center;
        }

        .mp-kicker {
          margin: 0 0 9px;
          color: #c8841a;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: .18em;
          text-transform: uppercase;
        }

        .mp-head-title {
          margin: 0 0 14px;
          color: #1a120b;
          font-size: 50px;
          line-height: 1.08;
          font-weight: 700;
        }

        .mp-head-title em {
          color: #c8841a;
          font-style: italic;
        }

        .mp-head-text {
          margin: 0;
          color: #7a6a52;
          font-size: 16px;
          line-height: 1.8;
        }

        .mp-filters {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 10px;
          margin: 0 auto 34px;
        }

        .mp-filter-btn {
          border: 1.5px solid #e6d9c4;
          background: #fff;
          color: #7a6a52;
          border-radius: 999px;
          padding: 10px 16px;
          font-size: 13px;
          font-weight: 800;
          cursor: pointer;
          transition: background .2s ease, color .2s ease, border-color .2s ease, transform .2s ease;
        }

        .mp-filter-btn:hover {
          transform: translateY(-1px);
          border-color: rgba(200,132,26,.38);
          color: #92640e;
        }

        .mp-filter-btn.active {
          background: #c8841a;
          color: #fff;
          border-color: #c8841a;
        }

        .mp-result-count {
          margin: 0 0 22px;
          text-align: center;
          color: #8a795f;
          font-size: 14px;
          font-weight: 700;
          line-height: 1.6;
        }

        .mp-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 22px;
          align-items: stretch;
        }

        .mp-card {
          min-width: 0;
          height: 100%;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          border-radius: 24px;
          background: #fff;
          border: 1.5px solid #e6d9c4;
          box-shadow: 0 8px 28px rgba(26,18,11,.06);
          transition: transform .3s ease, box-shadow .3s ease, border-color .3s ease;
        }

        .mp-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 42px rgba(26,18,11,.12);
          border-color: rgba(200,132,26,.34);
        }

        .mp-image {
          position: relative;
          height: 235px;
          overflow: hidden;
          flex-shrink: 0;
          background: #f2e8dc;
        }

        .mp-image-bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          transition: transform .5s ease;
        }

        .mp-card:hover .mp-image-bg {
          transform: scale(1.05);
        }

        .mp-image::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(20,10,2,.62) 0%, transparent 58%);
        }

        .mp-theme {
          position: absolute;
          top: 14px;
          left: 14px;
          z-index: 1;
          max-width: calc(100% - 28px);
          padding: 7px 12px;
          border-radius: 999px;
          background: rgba(255,255,255,.94);
          color: #92640e;
          font-size: 11px;
          font-weight: 900;
          white-space: nowrap;
        }

        .mp-available {
          position: absolute;
          right: 14px;
          bottom: 14px;
          z-index: 1;
          padding: 7px 12px;
          border-radius: 999px;
          background: #c8841a;
          color: #fff;
          font-size: 11px;
          font-weight: 900;
          white-space: nowrap;
        }

        .mp-content {
          display: flex;
          flex-direction: column;
          flex: 1;
          padding: 20px 18px 18px;
        }

        .mp-title {
          margin: 0 0 10px;
          color: #1a120b;
          font-size: 28px;
          line-height: 1.05;
          font-weight: 700;
        }

        .mp-description {
          margin: 0;
          color: #7a6a52;
          font-size: 13.5px;
          line-height: 1.7;
        }

        .mp-card-footer {
          margin-top: auto;
          padding-top: 18px;
        }

        .mp-card-line {
          height: 1px;
          width: 100%;
          background: #f0e6d8;
          margin-bottom: 16px;
        }

        .mp-card-action {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          color: #92640e;
          font-size: 13px;
          font-weight: 900;
        }

        .mp-card-action span:last-child {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #fef3d0;
          border: 1px solid #e8d5a0;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: background .2s ease, color .2s ease;
        }

        .mp-card:hover .mp-card-action span:last-child {
          background: #c8841a;
          color: #fff;
        }

        .mp-quote {
          margin-top: 58px;
          border-radius: 30px;
          background: linear-gradient(135deg, #1a120b 0%, #2c1a0a 100%);
          position: relative;
          overflow: hidden;
          padding: 54px 42px;
          text-align: center;
        }

        .mp-quote::before {
          content: '';
          position: absolute;
          top: -80px;
          right: -80px;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(200,132,26,.20) 0%, transparent 70%);
          pointer-events: none;
        }

        .mp-quote-content {
          position: relative;
          z-index: 1;
          max-width: 820px;
          margin: 0 auto;
        }

        .mp-quote-text {
          margin: 0 0 18px;
          color: #fff;
          font-size: 36px;
          line-height: 1.18;
          font-weight: 700;
        }

        .mp-quote-text em {
          color: #c8841a;
          font-style: italic;
        }

        .mp-quote-small {
          margin: 0;
          color: rgba(255,255,255,.66);
          font-size: 15px;
          line-height: 1.8;
        }

        .mp-cta {
          margin-top: 34px;
          display: grid;
          grid-template-columns: 1.15fr .85fr;
          gap: 22px;
          align-items: stretch;
        }

        .mp-cta-box {
          border-radius: 26px;
          border: 1.5px solid #e6d9c4;
          background: #fff;
          padding: 30px;
          box-shadow: 0 8px 26px rgba(26,18,11,.05);
        }

        .mp-cta-title {
          margin: 0 0 10px;
          color: #1a120b;
          font-size: 33px;
          line-height: 1.1;
          font-weight: 700;
        }

        .mp-cta-title em {
          color: #c8841a;
          font-style: italic;
        }

        .mp-cta-text {
          margin: 0;
          color: #7a6a52;
          font-size: 15px;
          line-height: 1.8;
        }

        .mp-cta-dark {
          background: #1a120b;
          border-color: rgba(200,132,26,.25);
        }

        .mp-cta-dark .mp-cta-title {
          color: #fff;
        }

        .mp-cta-dark .mp-cta-text {
          color: rgba(255,255,255,.66);
        }

        .mp-cta-btn {
          margin-top: 22px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          min-height: 48px;
          padding: 0 24px;
          border-radius: 999px;
          background: #c8841a;
          color: #fff;
          text-decoration: none;
          font-size: 14px;
          font-weight: 900;
          box-shadow: 0 8px 24px rgba(200,132,26,.34);
          transition: transform .2s ease, box-shadow .2s ease;
        }

        .mp-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 34px rgba(200,132,26,.45);
        }

        .mp-empty {
          border-radius: 24px;
          background: #fff;
          border: 1.5px solid #e6d9c4;
          padding: 44px 24px;
          text-align: center;
          color: #7a6a52;
          font-size: 15px;
        }

        .mp-scroll-top {
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

        .mp-scroll-top.visible {
          opacity: 1;
          transform: translateY(0) scale(1);
          pointer-events: auto;
        }

        @media (max-width: 1180px) {
          .mp-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }

        @media (max-width: 900px) {
          .mp-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .mp-cta {
            grid-template-columns: 1fr;
          }

          .mp-hero-title {
            font-size: 64px;
          }

          .mp-head-title {
            font-size: 44px;
          }
        }

        @media (max-width: 639px) {
          .mp-hero-inner {
            padding: 58px 18px 48px;
          }

          .mp-hero::after {
            width: 340px;
            height: 340px;
          }

          .mp-badge {
            padding: 7px 13px;
            font-size: 10px;
            letter-spacing: .09em;
            margin-bottom: 22px;
          }

          .mp-hero-title {
            font-size: 42px;
            line-height: 1.05;
          }

          .mp-hero-text {
            font-size: 14.5px;
            line-height: 1.75;
          }

          .mp-search {
            height: 50px;
            font-size: 14px;
          }

          .mp-ticker {
            animation-duration: 18s;
          }

          .mp-ticker-item {
            gap: 10px;
            padding-right: 26px;
          }

          .mp-ticker-text {
            font-size: 10px;
            letter-spacing: .05em;
          }

          .mp-main {
            padding: 44px 16px 76px;
          }

          .mp-head {
            margin-bottom: 28px;
          }

          .mp-kicker {
            font-size: 10.5px;
            letter-spacing: .15em;
          }

          .mp-head-title {
            font-size: 33px;
          }

          .mp-head-text {
            font-size: 14px;
          }

          .mp-filters {
            gap: 8px;
            margin-bottom: 28px;
          }

          .mp-filter-btn {
            padding: 9px 13px;
            font-size: 12px;
          }

          .mp-result-count {
            font-size: 13px;
            padding: 0 8px;
          }

          .mp-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .mp-card {
            border-radius: 22px;
          }

          .mp-image {
            height: 245px;
          }

          .mp-title {
            font-size: 29px;
          }

          .mp-description {
            font-size: 13.8px;
          }

          .mp-quote {
            margin-top: 44px;
            border-radius: 24px;
            padding: 42px 20px;
          }

          .mp-quote-text {
            font-size: 29px;
          }

          .mp-cta {
            margin-top: 24px;
          }

          .mp-cta-box {
            padding: 24px 20px;
            border-radius: 22px;
          }

          .mp-cta-title {
            font-size: 28px;
          }

          .mp-cta-btn {
            width: 100%;
          }

          .mp-scroll-top {
            width: 44px;
            height: 44px;
            right: 16px;
            bottom: 18px;
          }
        }
      `}</style>

      <main className="mp">
        <section className="mp-hero">
          <div className="mp-hero-inner">
            <div className="mp-badge mp-a1">
              <span>🎭</span>
              <span>50+ personazhe në dispozicion</span>
            </div>

            <h1 className="mp-serif mp-hero-title mp-a2">
              Maskota dhe <em>personazhe</em>
            </h1>

            <p className="mp-hero-text mp-a3">
              Sillni magji, gëzim dhe emocion në festën tuaj me maskota të dashura
              për fëmijë. Nga personazhet klasikë deri te superheronjtë, çdo festë
              bëhet më e gjallë.
            </p>

            <div className="mp-search-wrap mp-a3">
              <span className="mp-search-icon">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle
                    cx="8"
                    cy="8"
                    r="6"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                  <path
                    d="M13 13l3 3"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </span>

              <input
                className="mp-search"
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Kërko sipas emrit ose temës..."
              />
            </div>
          </div>

          <div className="mp-ticker-wrap">
            <div className="mp-ticker">
              {[0, 1].map((groupIndex) => (
                <div className="mp-ticker-group" key={groupIndex}>
                  {tickerItems.map((item) => (
                    <span className="mp-ticker-item" key={`${groupIndex}-${item}`}>
                      <span className="mp-ticker-star">✦</span>
                      <span className="mp-ticker-text">{item}</span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mp-main">
          <div className="mp-head">
            <p className="mp-kicker">Zgjidh personazhin</p>

            <h2 className="mp-serif mp-head-title">
              Çdo fëmijë ka një personazh <em>të preferuar.</em>
            </h2>

            <p className="mp-head-text">
              Këtu janë disa nga maskotat tona. Përveç këtyre, kemi edhe karaktere të
              tjera deri në 50+ personazhe, të cilat mund t’i përshtatim sipas temës së
              eventit tuaj.
            </p>
          </div>

          <div className="mp-filters">
            {themes.map((theme) => (
              <button
                key={theme}
                type="button"
                className={
                  selectedTheme === theme
                    ? 'mp-filter-btn active'
                    : 'mp-filter-btn'
                }
                onClick={() => setSelectedTheme(theme)}
              >
                {theme}
              </button>
            ))}
          </div>

          <p className="mp-result-count">
            Duke shfaqur {filteredMascots.length} karta me kombinime maskotash nga koleksioni ynë 50+ personazhe
          </p>

          {filteredMascots.length > 0 ? (
            <div className="mp-grid">
              {filteredMascots.map((mascot) => (
                <article className="mp-card" key={mascot.name}>
                  <div className="mp-image">
                    <div
                      className="mp-image-bg"
                      style={{ backgroundImage: `url("${mascot.image}")` }}
                    />

                    <div className="mp-theme">{mascot.theme}</div>
                    <div className="mp-available">Në dispozicion</div>
                  </div>

                  <div className="mp-content">
                    <h3 className="mp-serif mp-title">{mascot.name}</h3>

                    <p className="mp-description">{mascot.description}</p>

                    <div className="mp-card-footer">
                      <div className="mp-card-line" />

                      <div className="mp-card-action">
                        <span>Mund të shtohet në event</span>
                        <span>→</span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="mp-empty">
              Nuk u gjet asnjë personazh me këtë kërkim. Provo një emër ose temë tjetër.
            </div>
          )}

          <div className="mp-quote">
            <div className="mp-quote-content">
              <p className="mp-serif mp-quote-text">
                “Një maskotë nuk është vetëm kostum, është{' '}
                <em>momenti kur festa merr jetë.</em>”
              </p>

              <p className="mp-quote-small">
                Fëmijët i kujtojnë më gjatë momentet kur personazhi i tyre i preferuar
                shfaqet papritur, luan me ta dhe bëhet pjesë e gëzimit të festës.
              </p>
            </div>
          </div>

          <div className="mp-cta">
            <div className="mp-cta-box">
              <p className="mp-kicker">50+ karaktere</p>

              <h3 className="mp-serif mp-cta-title">
                Nuk e sheh personazhin që dëshiron?
              </h3>

              <p className="mp-cta-text">
                Kjo faqe shfaq vetëm një pjesë të koleksionit. Ne kemi edhe shumë
                karaktere të tjera, prandaj mund të na tregoni temën e festës dhe
                personazhin që kërkoni.
              </p>
            </div>

            <div className="mp-cta-box mp-cta-dark">
              <p className="mp-kicker">Rezervim</p>

              <h3 className="mp-serif mp-cta-title">
                Zgjidh maskotën për <em>eventin tënd.</em>
              </h3>

              <p className="mp-cta-text">
                Na tregoni datën, vendin, moshën e fëmijëve dhe personazhin e preferuar.
                Ne ju ndihmojmë të krijoni kombinimin më të bukur për festë.
              </p>

              <Link to="/booking" className="mp-cta-btn">
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