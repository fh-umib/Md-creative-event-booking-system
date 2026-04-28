import { useEffect, useMemo, useState } from 'react';
import type { CSSProperties, FormEvent } from 'react';
import {
  createMascot,
  getAdminMascots,
  updateMascot,
} from '../../services/mascotAdminApi';
import type { Mascot, MascotPayload } from '../../services/mascotAdminApi';

type PublicMascot = {
  name: string;
  theme: string;
  description: string;
  image: string;
};

type DisplayMascot = {
  id: number;
  name: string;
  character_name: string;
  theme: string;
  description: string;
  price: string | number;
  duration_minutes: string | number;
  min_age?: string | number | null;
  max_age?: string | number | null;
  is_available: boolean;
  image: string;
  source: 'admin' | 'public';
  adminItem?: Mascot;
};

type AvailabilityFilter = 'All' | 'Available' | 'Unavailable';

const publicMascots: PublicMascot[] = [
  {
    name: 'Arlo, Ziko & Flix',
    theme: 'Fantazi',
    description: 'Personazhe argëtuese për festa plot energji, lojë dhe buzëqeshje.',
    image: '/images/mascots/arlo-ziko-flix.png',
  },
  {
    name: 'Bluey & Bingo',
    theme: 'Vizatimor',
    description: 'Dy personazhe të dashura për fëmijë, perfekte për ditëlindje dhe evente familjare.',
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
    description: 'Personazhe magjike për fëmijët që i duan përrallat, akullin dhe botën e princeshave.',
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
    description: 'Dy personazhe shumë të dashura për fëmijë, ideale për festa dinamike dhe plot ngjyra.',
    image: '/images/mascots/lady-bud-cat-noir.png',
  },
  {
    name: 'Lion Teddy',
    theme: 'Kafshë',
    description: 'Maskotë e butë dhe miqësore që i jep festës atmosferë të ngrohtë dhe të këndshme.',
    image: '/images/mascots/lion-teddy.png',
  },
  {
    name: 'LOL Doll & Garfield',
    theme: 'Vizatimor',
    description: 'Personazhe të njohura për fëmijë, të përshtatshme për fotografi dhe lojëra në festë.',
    image: '/images/mascots/lol-doll-garfiled.png',
  },
  {
    name: 'Mario, Luigi & Sonic',
    theme: 'Aventurë',
    description: 'Personazhe plot ritëm dhe energji për fëmijë që duan lojë, aventurë dhe argëtim.',
    image: '/images/mascots/mario-luigi-sonic.png',
  },
  {
    name: 'Marshall & Chase',
    theme: 'Aventurë',
    description: 'Maskota të dashura për fëmijë, perfekte për festa me temë shpëtimi dhe lojëra.',
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
    description: 'Personazhe klasike që sjellin atmosferë festive, vallëzim dhe shumë foto të bukura.',
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
    description: 'Superhero i preferuar për fëmijë që duan aksion, lojë dhe momente të paharrueshme.',
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
    description: 'Dy personazhe klasike që sjellin humor, lojë dhe kujtime të bukura për fëmijët.',
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
    description: 'Personazhe të dashura për fëmijë, ideale për festa familjare dhe fotografi të bukura.',
    image: '/images/mascots/winniethepooh-donalduck.png',
  },
];

const initialForm: MascotPayload = {
  name: '',
  character_name: '',
  theme: '',
  description: '',
  price: 0,
  duration_minutes: 60,
  min_age: '',
  max_age: '',
  is_available: true,
};

function normalize(value?: string | null) {
  return String(value || '')
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '')
    .trim();
}

function formatMoney(value?: string | number | null) {
  return `€${Number(value || 0).toLocaleString('de-DE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function formatAgeRange(minAge?: number | string | null, maxAge?: number | string | null) {
  if (minAge && maxAge) return `${minAge} - ${maxAge} vjeç`;
  if (minAge) return `Nga ${minAge}+ vjeç`;
  if (maxAge) return `Deri ${maxAge} vjeç`;
  return 'Të gjitha moshat';
}

export default function MascotsPage() {
  const [mascots, setMascots] = useState<Mascot[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [themeFilter, setThemeFilter] = useState('Të gjitha');
  const [availabilityFilter, setAvailabilityFilter] = useState<AvailabilityFilter>('All');
  const [form, setForm] = useState<MascotPayload>(initialForm);
  const [editingId, setEditingId] = useState<number | null>(null);

  const loadMascots = async () => {
    try {
      setLoading(true);
      setError('');

      const data = await getAdminMascots();
      setMascots(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Maskotat nuk mund të ngarkohen.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMascots();
  }, []);

  const displayMascots = useMemo<DisplayMascot[]>(() => {
    return publicMascots.map((publicItem, index) => {
      const publicKey = normalize(publicItem.name);

      const matchedAdmin = mascots.find((adminItem) => {
        const adminName = normalize(adminItem.name);
        const adminCharacter = normalize(adminItem.character_name);

        return adminName === publicKey || adminCharacter === publicKey;
      });

      if (matchedAdmin) {
        return {
          id: matchedAdmin.id,
          name: matchedAdmin.name || publicItem.name,
          character_name: matchedAdmin.character_name || publicItem.name,
          theme: matchedAdmin.theme || publicItem.theme,
          description: matchedAdmin.description || publicItem.description,
          price: matchedAdmin.price || 0,
          duration_minutes: matchedAdmin.duration_minutes || 60,
          min_age: matchedAdmin.min_age,
          max_age: matchedAdmin.max_age,
          is_available: Boolean(matchedAdmin.is_available),
          image: publicItem.image,
          source: 'admin' as const,
          adminItem: matchedAdmin,
        };
      }

      return {
        id: -(index + 1),
        name: publicItem.name,
        character_name: publicItem.name,
        theme: publicItem.theme,
        description: publicItem.description,
        price: 0,
        duration_minutes: 60,
        min_age: '',
        max_age: '',
        is_available: true,
        image: publicItem.image,
        source: 'public' as const,
      };
    });
  }, [mascots]);

  const themeOptions = useMemo(() => {
    const themes = Array.from(new Set(displayMascots.map((item) => item.theme).filter(Boolean)));

    return ['Të gjitha', ...themes.sort((a, b) => a.localeCompare(b))];
  }, [displayMascots]);

  const filteredMascots = useMemo(() => {
    const value = search.trim().toLowerCase();

    return displayMascots.filter((item) => {
      const text = `${item.name} ${item.character_name} ${item.theme} ${item.description}`.toLowerCase();

      const matchesSearch = !value || text.includes(value);
      const matchesTheme = themeFilter === 'Të gjitha' || item.theme === themeFilter;
      const matchesAvailability =
        availabilityFilter === 'All' ||
        (availabilityFilter === 'Available' && item.is_available) ||
        (availabilityFilter === 'Unavailable' && !item.is_available);

      return matchesSearch && matchesTheme && matchesAvailability;
    });
  }, [displayMascots, search, themeFilter, availabilityFilter]);

  const stats = useMemo(() => {
    const adminConnected = displayMascots.filter((item) => item.source === 'admin').length;
    const publicOnly = displayMascots.filter((item) => item.source === 'public').length;
    const available = displayMascots.filter((item) => item.is_available).length;
    const averagePrice =
      displayMascots.length > 0
        ? displayMascots.reduce((sum, item) => sum + Number(item.price || 0), 0) / displayMascots.length
        : 0;

    return {
      total: displayMascots.length,
      adminConnected,
      publicOnly,
      available,
      averagePrice,
      availabilityPercent: displayMascots.length ? Math.round((available / displayMascots.length) * 100) : 0,
    };
  }, [displayMascots]);

  const themeChart = useMemo(() => {
    const grouped = displayMascots.reduce<Record<string, number>>((acc, item) => {
      const key = item.theme || 'Pa temë';
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(grouped)
      .map(([theme, count]) => ({ theme, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 7);
  }, [displayMascots]);

  const maxThemeCount = Math.max(...themeChart.map((item) => item.count), 1);

  const handleChange = (key: keyof MascotPayload, value: string | number | boolean) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
  };

  const handleEdit = (item: DisplayMascot) => {
    if (item.source === 'admin' && item.adminItem) {
      setEditingId(item.adminItem.id);
    } else {
      setEditingId(null);
    }

    setForm({
      name: item.name,
      character_name: item.character_name,
      theme: item.theme,
      description: item.description,
      price: Number(item.price || 0),
      duration_minutes: Number(item.duration_minutes || 60),
      min_age: item.min_age === '' || item.min_age == null ? '' : Number(item.min_age),
      max_age: item.max_age === '' || item.max_age == null ? '' : Number(item.max_age),
      is_available: Boolean(item.is_available),
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      setError('');

      if (editingId) {
        await updateMascot(editingId, form);
      } else {
        await createMascot(form);
      }

      await loadMascots();
      resetForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ruajtja e maskotës dështoi.');
    } finally {
      setSubmitting(false);
    }
  };

  const ringStyle = {
    '--available': `${stats.total ? Math.round((stats.available / stats.total) * 360) : 0}deg`,
  } as CSSProperties;

  return (
    <>
      <style>{`
        @keyframes mascSpin {
          to {
            transform: rotate(360deg);
          }
        }

        .masc-page {
          display: flex;
          flex-direction: column;
          gap: 18px;
          min-width: 0;
        }

        .masc-hero {
          position: relative;
          overflow: hidden;
          border-radius: 24px;
          border: 1px solid #eadfce;
          background:
            radial-gradient(circle at 12% 20%, rgba(212,145,30,.24), transparent 32%),
            linear-gradient(135deg, #1a120b 0%, #2b1a0d 58%, #120d07 100%);
          padding: 24px;
          color: #ffffff;
          box-shadow: 0 12px 34px rgba(26,18,11,.14);
        }

        .masc-hero::after {
          content: "50+";
          position: absolute;
          right: 24px;
          bottom: -24px;
          font-size: clamp(70px, 10vw, 132px);
          line-height: 1;
          font-weight: 950;
          color: rgba(212,145,30,.09);
          pointer-events: none;
        }

        .masc-hero-content {
          position: relative;
          z-index: 1;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 18px;
          flex-wrap: wrap;
        }

        .masc-kicker {
          margin: 0 0 9px;
          color: #d4911e;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: .18em;
          text-transform: uppercase;
        }

        .masc-title {
          margin: 0;
          font-size: clamp(25px, 3.2vw, 38px);
          font-weight: 950;
          line-height: 1.05;
          color: #ffffff;
        }

        .masc-title span {
          color: #d4911e;
          font-style: italic;
        }

        .masc-subtitle {
          margin: 10px 0 0;
          max-width: 760px;
          color: rgba(255,255,255,.68);
          font-size: 14px;
          line-height: 1.7;
        }

        .masc-hero-note {
          min-width: 220px;
          border-radius: 18px;
          border: 1px solid rgba(212,145,30,.28);
          background: rgba(255,255,255,.07);
          padding: 14px;
          backdrop-filter: blur(12px);
        }

        .masc-hero-note strong {
          display: block;
          color: #ffffff;
          font-size: 21px;
          font-weight: 950;
          margin-bottom: 4px;
        }

        .masc-hero-note span {
          color: rgba(255,255,255,.58);
          font-size: 13px;
          line-height: 1.45;
        }

        .masc-toolbar {
          display: grid;
          grid-template-columns: minmax(260px, 1fr) 170px 180px auto;
          gap: 10px;
          align-items: center;
          background: rgba(255,255,255,.92);
          border: 1px solid #eadfce;
          border-radius: 20px;
          padding: 12px;
          box-shadow: 0 7px 22px rgba(26,18,11,.05);
        }

        .masc-search,
        .masc-select {
          height: 42px;
          border-radius: 999px;
          border: 1.5px solid #eadfce;
          background: #fffdf8;
          color: #1a120b;
          padding: 0 15px;
          font-size: 13px;
          outline: none;
          min-width: 0;
          transition: border-color .2s, box-shadow .2s, background .2s;
        }

        .masc-select {
          cursor: pointer;
        }

        .masc-search:focus,
        .masc-select:focus {
          border-color: #c8841a;
          box-shadow: 0 0 0 4px rgba(200,132,26,.12);
          background: #ffffff;
        }

        .masc-refresh {
          height: 42px;
          padding: 0 17px;
          border: none;
          border-radius: 999px;
          background: linear-gradient(135deg, #d4911e, #b87318);
          color: #ffffff;
          font-size: 13px;
          font-weight: 850;
          cursor: pointer;
          box-shadow: 0 9px 22px rgba(200,132,26,.24);
          transition: transform .2s, box-shadow .2s;
          white-space: nowrap;
        }

        .masc-refresh:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(200,132,26,.32);
        }

        .masc-stats {
          display: grid;
          grid-template-columns: repeat(5, minmax(135px, 1fr));
          gap: 12px;
        }

        .masc-stat-card {
          background: rgba(255,255,255,.92);
          border: 1px solid #eadfce;
          border-radius: 18px;
          padding: 15px;
          box-shadow: 0 7px 22px rgba(26,18,11,.05);
        }

        .masc-stat-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;
        }

        .masc-stat-label {
          margin: 0;
          color: #7a6a52;
          font-size: 11px;
          font-weight: 750;
        }

        .masc-stat-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #c8841a;
          box-shadow: 0 0 0 5px rgba(200,132,26,.12);
          flex-shrink: 0;
        }

        .masc-stat-value {
          margin: 0;
          color: #1a120b;
          font-size: 22px;
          font-weight: 950;
          line-height: 1;
        }

        .masc-insights {
          display: grid;
          grid-template-columns: minmax(0, 1.45fr) minmax(260px, .75fr);
          gap: 14px;
        }

        .masc-chart-card {
          background: rgba(255,255,255,.92);
          border: 1px solid #eadfce;
          border-radius: 20px;
          padding: 18px;
          box-shadow: 0 7px 22px rgba(26,18,11,.05);
          min-width: 0;
        }

        .masc-chart-title {
          margin: 0;
          color: #1a120b;
          font-size: 17px;
          font-weight: 950;
        }

        .masc-chart-subtitle {
          margin: 5px 0 15px;
          color: #7a6a52;
          font-size: 12.5px;
          line-height: 1.45;
        }

        .masc-bar-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .masc-bar-row {
          display: grid;
          grid-template-columns: 120px minmax(0, 1fr) 30px;
          align-items: center;
          gap: 10px;
        }

        .masc-bar-label {
          color: #1a120b;
          font-size: 12px;
          font-weight: 850;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .masc-bar-track {
          height: 9px;
          border-radius: 999px;
          background: #f4eadb;
          overflow: hidden;
        }

        .masc-bar-fill {
          height: 100%;
          border-radius: 999px;
          background: linear-gradient(135deg, #d4911e, #b87318);
        }

        .masc-bar-count {
          color: #7a6a52;
          font-size: 12px;
          font-weight: 850;
          text-align: right;
        }

        .masc-ring-wrap {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .masc-ring {
          width: 116px;
          height: 116px;
          border-radius: 50%;
          background:
            conic-gradient(#c8841a 0deg var(--available), #f1dfc5 var(--available) 360deg);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .masc-ring-inner {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: #fffdf8;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          border: 1px solid #eadfce;
        }

        .masc-ring-number {
          color: #1a120b;
          font-size: 22px;
          font-weight: 950;
          line-height: 1;
        }

        .masc-ring-label {
          margin-top: 4px;
          color: #7a6a52;
          font-size: 10px;
          font-weight: 800;
        }

        .masc-legend {
          display: flex;
          flex-direction: column;
          gap: 9px;
          min-width: 150px;
        }

        .masc-legend-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          color: #7a6a52;
          font-size: 12px;
          font-weight: 750;
        }

        .masc-legend-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .masc-legend-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .masc-error {
          padding: 13px 16px;
          border-radius: 16px;
          border: 1px solid #fecaca;
          background: #fef2f2;
          color: #991b1b;
          font-size: 14px;
          font-weight: 750;
        }

        .masc-layout {
          display: flex;
          flex-direction: column;
          gap: 18px;
          align-items: stretch;
        }

        .masc-form-card,
        .masc-list-card {
          background: rgba(255,255,255,.92);
          border: 1px solid #eadfce;
          border-radius: 20px;
          box-shadow: 0 8px 24px rgba(26,18,11,.06);
          overflow: hidden;
        }

        .masc-form-head,
        .masc-list-head {
          padding: 17px 18px;
          border-bottom: 1px solid #f0e4d2;
          background: linear-gradient(135deg, #fffdf8, #ffffff);
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
        }

        .masc-form-title,
        .masc-list-title {
          margin: 0;
          color: #1a120b;
          font-size: 18px;
          font-weight: 950;
        }

        .masc-form-text,
        .masc-list-text {
          margin: 5px 0 0;
          color: #7a6a52;
          font-size: 12px;
          line-height: 1.45;
        }

        .masc-cancel {
          height: 34px;
          padding: 0 12px;
          border-radius: 999px;
          border: 1.5px solid #eadfce;
          background: #fffaf2;
          color: #1a120b;
          font-size: 11px;
          font-weight: 850;
          cursor: pointer;
          white-space: nowrap;
        }

        .masc-form {
          padding: 18px;
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 12px;
        }

        .masc-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .masc-field-wide {
          grid-column: span 2;
        }

        .masc-field-full {
          grid-column: 1 / -1;
        }

        .masc-check,
        .masc-submit {
          grid-column: span 2;
        }

        .masc-label {
          color: #6b5a45;
          font-size: 11px;
          font-weight: 850;
          letter-spacing: .06em;
          text-transform: uppercase;
        }

        .masc-input,
        .masc-textarea {
          width: 100%;
          border-radius: 12px;
          border: 1.5px solid #eadfce;
          background: #fffdf8;
          color: #1a120b;
          font-size: 13px;
          outline: none;
          transition: border-color .2s, box-shadow .2s, background .2s;
        }

        .masc-input {
          height: 40px;
          padding: 0 12px;
        }

        .masc-textarea {
          min-height: 78px;
          padding: 11px 12px;
          resize: vertical;
          line-height: 1.5;
        }

        .masc-input:focus,
        .masc-textarea:focus {
          border-color: #c8841a;
          box-shadow: 0 0 0 4px rgba(200,132,26,.12);
          background: #ffffff;
        }

        .masc-two-cols {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .masc-check {
          min-height: 42px;
          border-radius: 13px;
          border: 1.5px solid #eadfce;
          background: #fffaf2;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 0 11px;
          color: #1a120b;
          font-size: 12px;
          font-weight: 800;
          cursor: pointer;
        }

        .masc-check input {
          accent-color: #c8841a;
        }

        .masc-submit {
          height: 42px;
          border: none;
          border-radius: 14px;
          background: linear-gradient(135deg, #d4911e, #b87318);
          color: #ffffff;
          font-size: 13px;
          font-weight: 900;
          cursor: pointer;
          box-shadow: 0 9px 22px rgba(200,132,26,.24);
          transition: transform .2s, box-shadow .2s, opacity .2s;
        }

        .masc-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(200,132,26,.32);
        }

        .masc-submit:disabled {
          opacity: .7;
          cursor: not-allowed;
        }

        .masc-list-head {
          align-items: center;
          flex-wrap: wrap;
        }

        .masc-list-count {
          min-height: 31px;
          padding: 7px 12px;
          border-radius: 999px;
          background: #fff7e8;
          color: #9a5d0a;
          font-size: 12px;
          font-weight: 850;
          border: 1px solid #f1d5a3;
          white-space: nowrap;
        }

        .masc-loading,
        .masc-empty {
          padding: 44px 18px;
          text-align: center;
          color: #7a6a52;
          font-size: 14px;
        }

        .masc-spinner {
          width: 32px;
          height: 32px;
          margin: 0 auto 12px;
          border-radius: 50%;
          border: 3px solid #eadfce;
          border-top-color: #c8841a;
          animation: mascSpin .75s linear infinite;
        }

        .masc-grid {
          padding: 16px;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
          gap: 14px;
          align-items: stretch;
        }

        .masc-card {
          position: relative;
          border: 1px solid #eadfce;
          border-radius: 18px;
          background: #ffffff;
          overflow: hidden;
          box-shadow: 0 4px 14px rgba(26,18,11,.04);
          display: flex;
          flex-direction: column;
          min-width: 0;
          height: 100%;
        }

        .masc-card-image {
          position: relative;
          height: 155px;
          background: #fff7e8;
          overflow: hidden;
          flex-shrink: 0;
        }

        .masc-card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform .35s ease;
        }

        .masc-card:hover .masc-card-image img {
          transform: scale(1.05);
        }

        .masc-source-badge {
          position: absolute;
          top: 9px;
          left: 9px;
          z-index: 2;
          min-height: 24px;
          padding: 5px 9px;
          border-radius: 999px;
          font-size: 9px;
          font-weight: 950;
          letter-spacing: .08em;
          text-transform: uppercase;
          border: 1px solid rgba(255,255,255,.45);
          backdrop-filter: blur(10px);
        }

        .masc-source-admin {
          background: rgba(22,101,52,.88);
          color: #ffffff;
        }

        .masc-source-public {
          background: rgba(154,93,10,.88);
          color: #ffffff;
        }

        .masc-status {
          position: absolute;
          top: 9px;
          right: 9px;
          z-index: 2;
          min-height: 24px;
          padding: 5px 9px;
          border-radius: 999px;
          font-size: 9px;
          font-weight: 950;
          letter-spacing: .06em;
          text-transform: uppercase;
          border: 1px solid rgba(255,255,255,.45);
          backdrop-filter: blur(10px);
        }

        .masc-status-available {
          background: rgba(236,253,245,.92);
          color: #047857;
        }

        .masc-status-unavailable {
          background: rgba(254,242,242,.94);
          color: #991b1b;
        }

        .masc-card-body {
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          flex: 1;
        }

        .masc-theme-pill {
          align-self: flex-start;
          min-height: 25px;
          padding: 5px 10px;
          border-radius: 999px;
          background: #fff7e8;
          color: #9a5d0a;
          border: 1px solid #f1d5a3;
          font-size: 10px;
          font-weight: 950;
        }

        .masc-card-name {
          margin: 0;
          color: #1a120b;
          font-size: 17px;
          font-weight: 900;
          line-height: 1.15;
          min-height: 38px;
        }

        .masc-card-system {
          margin: -4px 0 0;
          color: #9a8878;
          font-size: 11px;
          font-weight: 750;
          line-height: 1.35;
        }

        .masc-description {
          margin: 0;
          color: #7a6a52;
          font-size: 12px;
          line-height: 1.5;
          min-height: 52px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .masc-info-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
          margin-top: auto;
        }

        .masc-info-box {
          border-radius: 12px;
          background: #fffaf2;
          border: 1px solid #f3eadc;
          padding: 8px;
          min-width: 0;
        }

        .masc-info-label {
          display: block;
          color: #8a7558;
          font-size: 9px;
          font-weight: 900;
          letter-spacing: .08em;
          text-transform: uppercase;
          margin-bottom: 3px;
        }

        .masc-info-value {
          color: #1a120b;
          font-size: 12px;
          font-weight: 850;
          word-break: break-word;
        }

        .masc-actions {
          display: flex;
          gap: 6px;
          padding-top: 2px;
        }

        .masc-action-btn {
          flex: 1;
          height: 34px;
          border-radius: 10px;
          font-size: 12px;
          font-weight: 850;
          cursor: pointer;
          transition: transform .15s, box-shadow .15s;
        }

        .masc-action-btn:hover {
          transform: translateY(-1px);
        }

        .masc-edit-btn {
          border: 1.5px solid #f1d5a3;
          background: #fff7e8;
          color: #9a5d0a;
        }

        @media (max-width: 1060px) {
          .masc-toolbar {
            grid-template-columns: 1fr 1fr;
          }

          .masc-refresh {
            width: 100%;
          }

          .masc-stats {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .masc-insights {
            grid-template-columns: 1fr;
          }

          .masc-form {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 720px) {
          .masc-toolbar {
            grid-template-columns: 1fr;
          }

          .masc-grid {
            padding: 16px;
            grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
          }

          .masc-bar-row {
            grid-template-columns: 100px minmax(0, 1fr) 28px;
          }

          .masc-form {
            grid-template-columns: 1fr;
          }

          .masc-field-wide,
          .masc-field-full,
          .masc-check,
          .masc-submit {
            grid-column: 1 / -1;
          }
        }

        @media (max-width: 520px) {
          .masc-hero {
            padding: 20px;
            border-radius: 20px;
          }

          .masc-stats {
            grid-template-columns: 1fr;
          }

          .masc-form-head,
          .masc-list-head {
            padding: 16px;
          }

          .masc-form {
            padding: 16px;
          }

          .masc-two-cols,
          .masc-info-grid {
            grid-template-columns: 1fr;
          }

          .masc-card-image {
            height: 225px;
          }

          .masc-card-name,
          .masc-description {
            min-height: auto;
          }
        }
      `}</style>

      <section className="masc-page">
        <div className="masc-hero">
          <div className="masc-hero-content">
            <div>
              <p className="masc-kicker">Menaxhimi i maskotave</p>
              <h1 className="masc-title">
                Maskotat që klientët <span>i shohin në faqen publike</span>
              </h1>
              <p className="masc-subtitle">
                Këtu shfaqen vetëm maskotat që janë të paraqitura për klientë në faqen publike, me foto, emër,
                kategori dhe përshkrim. Kartat e lidhura me databazën mund të përditësohen direkt nga admini.
              </p>
            </div>

            <div className="masc-hero-note">
              <strong>{stats.total} karta</strong>
              <span>
                {stats.adminConnected} të lidhura me admin/databazë, {stats.publicOnly} vetëm nga katalogu publik.
              </span>
            </div>
          </div>
        </div>

        <div className="masc-toolbar">
          <input
            type="text"
            placeholder="Kërko sipas emrit, personazhit ose temës..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="masc-search"
          />

          <select value={themeFilter} onChange={(e) => setThemeFilter(e.target.value)} className="masc-select">
            {themeOptions.map((theme) => (
              <option key={theme} value={theme}>
                {theme}
              </option>
            ))}
          </select>

          <select
            value={availabilityFilter}
            onChange={(e) => setAvailabilityFilter(e.target.value as AvailabilityFilter)}
            className="masc-select"
          >
            <option value="All">Të gjitha</option>
            <option value="Available">Të disponueshme</option>
            <option value="Unavailable">Të padisponueshme</option>
          </select>

          <button type="button" className="masc-refresh" onClick={loadMascots}>
            Rifresko
          </button>
        </div>

        <div className="masc-stats">
          {[
            { label: 'Totali i kartave', value: stats.total },
            { label: 'Të lidhura me admin', value: stats.adminConnected },
            { label: 'Nga katalogu publik', value: stats.publicOnly },
            { label: 'Të disponueshme', value: stats.available },
            { label: 'Çmimi mesatar', value: formatMoney(stats.averagePrice) },
          ].map((item) => (
            <div key={item.label} className="masc-stat-card">
              <div className="masc-stat-top">
                <p className="masc-stat-label">{item.label}</p>
                <span className="masc-stat-dot" />
              </div>
              <p className="masc-stat-value">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="masc-insights">
          <div className="masc-chart-card">
            <h2 className="masc-chart-title">Temat që shfaqen për klientë</h2>
            <p className="masc-chart-subtitle">
              Këto janë kategoritë kryesore që klienti i sheh te faqja publike e maskotave.
            </p>

            <div className="masc-bar-list">
              {themeChart.map((item) => (
                <div key={item.theme} className="masc-bar-row">
                  <span className="masc-bar-label">{item.theme}</span>
                  <div className="masc-bar-track">
                    <div
                      className="masc-bar-fill"
                      style={{ width: `${Math.max(8, (item.count / maxThemeCount) * 100)}%` }}
                    />
                  </div>
                  <span className="masc-bar-count">{item.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="masc-chart-card">
            <h2 className="masc-chart-title">Disponueshmëria</h2>
            <p className="masc-chart-subtitle">Pamje e shpejtë për maskotat që mund të ofrohen për rezervime.</p>

            <div className="masc-ring-wrap">
              <div className="masc-ring" style={ringStyle}>
                <div className="masc-ring-inner">
                  <span className="masc-ring-number">{stats.availabilityPercent}%</span>
                  <span className="masc-ring-label">të lira</span>
                </div>
              </div>

              <div className="masc-legend">
                <div className="masc-legend-item">
                  <span className="masc-legend-left">
                    <span className="masc-legend-dot" style={{ background: '#c8841a' }} />
                    Të disponueshme
                  </span>
                  <strong>{stats.available}</strong>
                </div>

                <div className="masc-legend-item">
                  <span className="masc-legend-left">
                    <span className="masc-legend-dot" style={{ background: '#f1dfc5' }} />
                    Jo të disponueshme
                  </span>
                  <strong>{stats.total - stats.available}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        {error && <div className="masc-error">{error}</div>}

        <div className="masc-layout">
          <div className="masc-form-card">
            <div className="masc-form-head">
              <div>
                <h2 className="masc-form-title">{editingId ? 'Përditëso maskotën' : 'Shto maskotë'}</h2>
                <p className="masc-form-text">
                  Kur ruhet një kartë publike, ajo lidhet me databazën dhe mund të menaxhohet nga admini.
                </p>
              </div>

              {(editingId || form.name) && (
                <button type="button" className="masc-cancel" onClick={resetForm}>
                  Anulo
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="masc-form">
              <div className="masc-field masc-field-wide">
                <label className="masc-label">Emri në sistem</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="masc-input"
                  placeholder="Micky & Minnie Mouse"
                  required
                />
              </div>

              <div className="masc-field masc-field-wide">
                <label className="masc-label">Emri për klientin</label>
                <input
                  type="text"
                  value={form.character_name}
                  onChange={(e) => handleChange('character_name', e.target.value)}
                  className="masc-input"
                  placeholder="Micky & Minnie Mouse"
                  required
                />
              </div>

              <div className="masc-field masc-field-wide">
                <label className="masc-label">Tema</label>
                <input
                  type="text"
                  value={form.theme}
                  onChange={(e) => handleChange('theme', e.target.value)}
                  className="masc-input"
                  placeholder="Disney, Superhero..."
                />
              </div>

              <div className="masc-field masc-field-full">
                <label className="masc-label">Përshkrimi</label>
                <textarea
                  value={form.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  className="masc-textarea"
                  placeholder="Përshkrimi i maskotës..."
                />
              </div>

              <div className="masc-field">
                <label className="masc-label">Çmimi</label>
                <input
                  type="number"
                  value={form.price}
                  onChange={(e) => handleChange('price', Number(e.target.value))}
                  className="masc-input"
                  min={0}
                />
              </div>

              <div className="masc-field">
                <label className="masc-label">Koha</label>
                <input
                  type="number"
                  value={form.duration_minutes}
                  onChange={(e) => handleChange('duration_minutes', Number(e.target.value))}
                  className="masc-input"
                  min={0}
                />
              </div>

              <div className="masc-field">
                <label className="masc-label">Mosha min.</label>
                <input
                  type="number"
                  value={form.min_age}
                  onChange={(e) => handleChange('min_age', e.target.value ? Number(e.target.value) : '')}
                  className="masc-input"
                  min={0}
                />
              </div>

              <div className="masc-field">
                <label className="masc-label">Mosha max.</label>
                <input
                  type="number"
                  value={form.max_age}
                  onChange={(e) => handleChange('max_age', e.target.value ? Number(e.target.value) : '')}
                  className="masc-input"
                  min={0}
                />
              </div>

              <label className="masc-check">
                <input
                  type="checkbox"
                  checked={form.is_available}
                  onChange={(e) => handleChange('is_available', e.target.checked)}
                />
                Maskota është e disponueshme
              </label>

              <button type="submit" className="masc-submit" disabled={submitting}>
                {submitting
                  ? editingId
                    ? 'Duke u përditësuar...'
                    : 'Duke u shtuar...'
                  : editingId
                    ? 'Ruaj ndryshimet'
                    : 'Ruaj në admin'}
              </button>
            </form>
          </div>

          <div className="masc-list-card">
            <div className="masc-list-head">
              <div>
                <h2 className="masc-list-title">Maskotat e faqes publike</h2>
                <p className="masc-list-text">Kartat me fotografi siç i sheh klienti në public page.</p>
              </div>
              <span className="masc-list-count">{filteredMascots.length} rezultate</span>
            </div>

            {loading ? (
              <div className="masc-loading">
                <div className="masc-spinner" />
                Duke u ngarkuar maskotat...
              </div>
            ) : filteredMascots.length === 0 ? (
              <div className="masc-empty">
                <strong style={{ display: 'block', color: '#1a120b', marginBottom: 6 }}>
                  Nuk u gjet asnjë maskotë.
                </strong>
                Provo të ndryshosh kërkimin, temën ose filtrin.
              </div>
            ) : (
              <div className="masc-grid">
                {filteredMascots.map((item) => (
                  <article key={`${item.source}-${item.id}`} className="masc-card">
                    <div className="masc-card-image">
                      <span
                        className={`masc-source-badge ${
                          item.source === 'admin' ? 'masc-source-admin' : 'masc-source-public'
                        }`}
                      >
                        {item.source === 'admin' ? 'Admin' : 'Publike'}
                      </span>

                      <span
                        className={`masc-status ${
                          item.is_available ? 'masc-status-available' : 'masc-status-unavailable'
                        }`}
                      >
                        {item.is_available ? 'E lirë' : 'E zënë'}
                      </span>

                      <img src={item.image} alt={item.character_name} />
                    </div>

                    <div className="masc-card-body">
                      <span className="masc-theme-pill">{item.theme || 'Pa temë'}</span>

                      <div>
                        <h3 className="masc-card-name">{item.character_name || item.name}</h3>
                        <p className="masc-card-system">{item.name}</p>
                      </div>

                      <p className="masc-description">{item.description || 'Nuk ka përshkrim për këtë maskotë.'}</p>

                      <div className="masc-info-grid">
                        <div className="masc-info-box">
                          <span className="masc-info-label">Çmimi</span>
                          <span className="masc-info-value">{formatMoney(item.price)}</span>
                        </div>

                        <div className="masc-info-box">
                          <span className="masc-info-label">Koha</span>
                          <span className="masc-info-value">{item.duration_minutes || 0} min</span>
                        </div>

                        <div className="masc-info-box">
                          <span className="masc-info-label">Mosha</span>
                          <span className="masc-info-value">{formatAgeRange(item.min_age, item.max_age)}</span>
                        </div>

                        <div className="masc-info-box">
                          <span className="masc-info-label">Burimi</span>
                          <span className="masc-info-value">{item.source === 'admin' ? 'Databazë' : 'Katalog'}</span>
                        </div>
                      </div>

                      <div className="masc-actions">
                        <button type="button" className="masc-action-btn masc-edit-btn" onClick={() => handleEdit(item)}>
                          {item.source === 'admin' ? 'Edito' : 'Ruaj'}
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}