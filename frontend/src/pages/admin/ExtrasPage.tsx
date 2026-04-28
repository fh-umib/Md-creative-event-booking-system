import { useEffect, useMemo, useState } from 'react';
import type { CSSProperties, FormEvent } from 'react';
import {
  createActivity,
  deleteActivity,
  getAdminActivities,
  updateActivity,
} from '../../services/activityAdminApi';
import type { Activity, ActivityPayload } from '../../services/activityAdminApi';

type PublicActivity = {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  icon: string;
  defaultPrice: number;
  defaultDuration: number;
};

type DisplayActivity = {
  id: number;
  name: string;
  subtitle: string;
  description: string;
  image: string;
  icon: string;
  price: string | number;
  duration_minutes: string | number;
  is_active: boolean;
  source: 'admin' | 'public';
  adminItem?: Activity;
};

type StatusFilter = 'All' | 'Active' | 'Inactive';

const publicActivities: PublicActivity[] = [
  {
    title: 'Pikturim Fytyre',
    subtitle: 'Face Painting',
    description:
      'Ngjyrosje kreative për fëmijë me dizajne të bukura, të përshtatshme për ditëlindje, festa dhe evente familjare.',
    image: '/images/activities/face-painting.png',
    icon: '01',
    defaultPrice: 0,
    defaultDuration: 30,
  },
  {
    title: 'Art me Balona',
    subtitle: 'Balloon Art',
    description:
      'Forma të ndryshme me balona për fëmijë, të krijuara gjatë eventit për ta bërë festën më argëtuese dhe më të gjallë.',
    image: '/images/activities/balloon-art.png',
    icon: '02',
    defaultPrice: 0,
    defaultDuration: 30,
  },
  {
    title: 'Photo Booth',
    subtitle: 'Kujtime nga festa',
    description:
      'Kënd fotografik për mysafirët, me atmosferë të veçantë dhe kujtime që mbeten gjatë pas përfundimit të eventit.',
    image: '/images/packages/photo-booth.png',
    icon: '03',
    defaultPrice: 0,
    defaultDuration: 60,
  },
  {
    title: 'DJ dhe Muzikë',
    subtitle: 'Atmosferë festive',
    description:
      'Muzikë, zërim dhe atmosferë e përshtatur për fëmijë dhe familje, që festa të jetë më dinamike dhe më argëtuese.',
    image: '/images/activities/dj-music.png',
    icon: '04',
    defaultPrice: 0,
    defaultDuration: 60,
  },
  {
    title: 'Candy Cart',
    subtitle: 'Kënd i ëmbël',
    description:
      'Kënd dekorativ me ëmbëlsira dhe detaje të bukura, i përshtatur me stilin dhe ngjyrat e eventit tuaj.',
    image: '/images/activities/candy-cart.png',
    icon: '05',
    defaultPrice: 0,
    defaultDuration: 45,
  },
  {
    title: 'Tabela Mirëseardhëse',
    subtitle: 'Welcome Sign Setup',
    description:
      'Vendosje elegante e tabelës mirëseardhëse për hyrjen e eventit, me dekorim dhe detaje të personalizuara.',
    image: '/images/activities/welcome-sign-setup.png',
    icon: '06',
    defaultPrice: 0,
    defaultDuration: 30,
  },
];

const initialForm: ActivityPayload = {
  name: '',
  description: '',
  price: 0,
  duration_minutes: 30,
  is_active: true,
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

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('All');
  const [form, setForm] = useState<ActivityPayload>(initialForm);
  const [editingId, setEditingId] = useState<number | null>(null);

  const loadActivities = async () => {
    try {
      setLoading(true);
      setError('');

      const data = await getAdminActivities();
      setActivities(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Aktivitetet nuk mund të ngarkohen.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadActivities();
  }, []);

  const displayActivities = useMemo<DisplayActivity[]>(() => {
    return publicActivities.map((publicItem, index) => {
      const publicKey = normalize(publicItem.title);
      const publicSubtitleKey = normalize(publicItem.subtitle);

      const matchedAdmin = activities.find((adminItem) => {
        const adminName = normalize(adminItem.name);

        return adminName === publicKey || adminName === publicSubtitleKey;
      });

      if (matchedAdmin) {
        return {
          id: matchedAdmin.id,
          name: matchedAdmin.name || publicItem.title,
          subtitle: publicItem.subtitle,
          description: matchedAdmin.description || publicItem.description,
          image: publicItem.image,
          icon: publicItem.icon,
          price: matchedAdmin.price || publicItem.defaultPrice,
          duration_minutes: matchedAdmin.duration_minutes || publicItem.defaultDuration,
          is_active: Boolean(matchedAdmin.is_active),
          source: 'admin' as const,
          adminItem: matchedAdmin,
        };
      }

      return {
        id: -(index + 1),
        name: publicItem.title,
        subtitle: publicItem.subtitle,
        description: publicItem.description,
        image: publicItem.image,
        icon: publicItem.icon,
        price: publicItem.defaultPrice,
        duration_minutes: publicItem.defaultDuration,
        is_active: true,
        source: 'public' as const,
      };
    });
  }, [activities]);

  const filteredActivities = useMemo(() => {
    const value = search.trim().toLowerCase();

    return displayActivities.filter((item) => {
      const text = `${item.name} ${item.subtitle} ${item.description}`.toLowerCase();

      const matchesSearch = !value || text.includes(value);
      const matchesStatus =
        statusFilter === 'All' ||
        (statusFilter === 'Active' && item.is_active) ||
        (statusFilter === 'Inactive' && !item.is_active);

      return matchesSearch && matchesStatus;
    });
  }, [displayActivities, search, statusFilter]);

  const stats = useMemo(() => {
    const total = displayActivities.length;
    const active = displayActivities.filter((item) => item.is_active).length;
    const inactive = total - active;
    const connected = displayActivities.filter((item) => item.source === 'admin').length;
    const publicOnly = displayActivities.filter((item) => item.source === 'public').length;

    const averageDuration =
      total > 0
        ? Math.round(
            displayActivities.reduce((sum, item) => sum + Number(item.duration_minutes || 0), 0) / total,
          )
        : 0;

    return {
      total,
      active,
      inactive,
      connected,
      publicOnly,
      averageDuration,
      activePercent: total ? Math.round((active / total) * 100) : 0,
    };
  }, [displayActivities]);

  const durationChart = useMemo(() => {
    const groups = [
      { label: '≤ 30 min', count: 0 },
      { label: '31–60 min', count: 0 },
      { label: '60+ min', count: 0 },
    ];

    displayActivities.forEach((item) => {
      const minutes = Number(item.duration_minutes || 0);

      if (minutes <= 30) groups[0].count += 1;
      else if (minutes <= 60) groups[1].count += 1;
      else groups[2].count += 1;
    });

    return groups;
  }, [displayActivities]);

  const maxDurationCount = Math.max(...durationChart.map((item) => item.count), 1);

  const handleChange = (key: keyof ActivityPayload, value: string | number | boolean) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
  };

  const handleEdit = (item: DisplayActivity) => {
    if (item.source === 'admin' && item.adminItem) {
      setEditingId(item.adminItem.id);
    } else {
      setEditingId(null);
    }

    setForm({
      name: item.name,
      description: item.description,
      price: Number(item.price || 0),
      duration_minutes: Number(item.duration_minutes || 30),
      is_active: Boolean(item.is_active),
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setSubmitting(true);
      setError('');

      if (editingId) {
        await updateActivity(editingId, form);
      } else {
        await createActivity(form);
      }

      await loadActivities();
      resetForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ruajtja e aktivitetit dështoi.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (item: DisplayActivity) => {
    if (item.source !== 'admin' || !item.adminItem) {
      window.alert(
        'Ky aktivitet është pjesë e faqes publike. Për ta larguar nga public page duhet të hiqet nga lista e aktiviteteve publike.',
      );
      return;
    }

    const confirmed = window.confirm('A jeni e sigurt që dëshironi ta fshini këtë aktivitet nga databaza?');

    if (!confirmed) return;

    try {
      setError('');
      await deleteActivity(item.adminItem.id);
      await loadActivities();

      if (editingId === item.adminItem.id) {
        resetForm();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fshirja e aktivitetit dështoi.');
    }
  };

  const activeStyle = {
    '--active': `${stats.total ? Math.round((stats.active / stats.total) * 360) : 0}deg`,
  } as CSSProperties;

  return (
    <>
      <style>{`
        @keyframes actSpin {
          to {
            transform: rotate(360deg);
          }
        }

        .act-page {
          display: flex;
          flex-direction: column;
          gap: 18px;
          min-width: 0;
        }

        .act-hero {
          position: relative;
          overflow: hidden;
          border-radius: 26px;
          border: 1px solid #eadfce;
          background:
            radial-gradient(circle at 12% 20%, rgba(212,145,30,.26), transparent 32%),
            linear-gradient(135deg, #1a120b 0%, #2b1a0d 58%, #120d07 100%);
          padding: 26px;
          color: #ffffff;
          box-shadow: 0 12px 34px rgba(26,18,11,.14);
        }

        .act-hero::after {
          content: "PLAY";
          position: absolute;
          right: 24px;
          bottom: -26px;
          font-size: clamp(72px, 11vw, 142px);
          line-height: 1;
          font-weight: 950;
          color: rgba(212,145,30,.08);
          pointer-events: none;
        }

        .act-hero-content {
          position: relative;
          z-index: 1;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 20px;
          flex-wrap: wrap;
        }

        .act-kicker {
          margin: 0 0 9px;
          color: #d4911e;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: .18em;
          text-transform: uppercase;
        }

        .act-title {
          margin: 0;
          font-size: clamp(26px, 3.4vw, 42px);
          line-height: 1.05;
          font-weight: 950;
        }

        .act-title span {
          color: #d4911e;
          font-style: italic;
        }

        .act-subtitle {
          margin: 10px 0 0;
          max-width: 760px;
          color: rgba(255,255,255,.68);
          font-size: 14px;
          line-height: 1.7;
        }

        .act-hero-card {
          min-width: 245px;
          border-radius: 20px;
          border: 1px solid rgba(212,145,30,.28);
          background: rgba(255,255,255,.07);
          padding: 15px;
          backdrop-filter: blur(12px);
        }

        .act-hero-card strong {
          display: block;
          color: #ffffff;
          font-size: 24px;
          font-weight: 950;
          margin-bottom: 5px;
        }

        .act-hero-card span {
          color: rgba(255,255,255,.58);
          font-size: 13px;
          line-height: 1.45;
        }

        .act-toolbar {
          display: grid;
          grid-template-columns: minmax(260px, 1fr) auto auto auto;
          gap: 10px;
          align-items: center;
          background: rgba(255,255,255,.92);
          border: 1px solid #eadfce;
          border-radius: 20px;
          padding: 12px;
          box-shadow: 0 7px 22px rgba(26,18,11,.05);
        }

        .act-search {
          height: 42px;
          border-radius: 999px;
          border: 1.5px solid #eadfce;
          background: #fffdf8;
          color: #1a120b;
          padding: 0 15px;
          font-size: 13px;
          outline: none;
          min-width: 0;
        }

        .act-search:focus {
          border-color: #c8841a;
          box-shadow: 0 0 0 4px rgba(200,132,26,.12);
          background: #ffffff;
        }

        .act-filter-btn,
        .act-refresh {
          height: 40px;
          border-radius: 999px;
          padding: 0 14px;
          font-size: 12px;
          font-weight: 850;
          cursor: pointer;
          white-space: nowrap;
        }

        .act-filter-btn {
          border: 1.5px solid #eadfce;
          background: #fffdf8;
          color: #6b5a45;
        }

        .act-filter-btn.active {
          border-color: #d4911e;
          background: linear-gradient(135deg, #d4911e, #b87318);
          color: #ffffff;
        }

        .act-refresh {
          border: none;
          background: #1a120b;
          color: #ffffff;
        }

        .act-stats {
          display: grid;
          grid-template-columns: repeat(5, minmax(135px, 1fr));
          gap: 12px;
        }

        .act-stat-card {
          background: rgba(255,255,255,.92);
          border: 1px solid #eadfce;
          border-radius: 18px;
          padding: 15px;
          box-shadow: 0 7px 22px rgba(26,18,11,.05);
        }

        .act-stat-label {
          margin: 0 0 10px;
          color: #7a6a52;
          font-size: 11px;
          font-weight: 750;
        }

        .act-stat-value {
          margin: 0;
          color: #1a120b;
          font-size: 23px;
          font-weight: 950;
          line-height: 1;
        }

        .act-insights {
          display: grid;
          grid-template-columns: minmax(0, 1.3fr) minmax(280px, .75fr);
          gap: 14px;
        }

        .act-panel {
          background: rgba(255,255,255,.92);
          border: 1px solid #eadfce;
          border-radius: 20px;
          padding: 18px;
          box-shadow: 0 7px 22px rgba(26,18,11,.05);
          min-width: 0;
        }

        .act-panel-title {
          margin: 0;
          color: #1a120b;
          font-size: 17px;
          font-weight: 950;
        }

        .act-panel-text {
          margin: 5px 0 15px;
          color: #7a6a52;
          font-size: 12.5px;
          line-height: 1.45;
        }

        .act-duration-list {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
        }

        .act-duration-item {
          border-radius: 15px;
          border: 1px solid #f3eadc;
          background: #fffaf2;
          padding: 12px;
        }

        .act-duration-top {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          margin-bottom: 8px;
          color: #1a120b;
          font-size: 12px;
          font-weight: 850;
        }

        .act-duration-track {
          height: 9px;
          border-radius: 999px;
          background: #f1dfc5;
          overflow: hidden;
        }

        .act-duration-fill {
          height: 100%;
          border-radius: 999px;
          background: linear-gradient(135deg, #d4911e, #b87318);
        }

        .act-health {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .act-ring {
          width: 116px;
          height: 116px;
          border-radius: 50%;
          background: conic-gradient(#c8841a 0deg var(--active), #f1dfc5 var(--active) 360deg);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .act-ring-inner {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: #fffdf8;
          border: 1px solid #eadfce;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }

        .act-ring-number {
          color: #1a120b;
          font-size: 22px;
          font-weight: 950;
          line-height: 1;
        }

        .act-ring-label {
          color: #7a6a52;
          font-size: 10px;
          font-weight: 800;
          margin-top: 4px;
        }

        .act-health-text {
          flex: 1;
          min-width: 180px;
          color: #7a6a52;
          font-size: 13px;
          line-height: 1.55;
          margin: 0;
        }

        .act-error {
          padding: 13px 16px;
          border-radius: 16px;
          border: 1px solid #fecaca;
          background: #fef2f2;
          color: #991b1b;
          font-size: 14px;
          font-weight: 750;
        }

        .act-form-card,
        .act-list-card {
          background: rgba(255,255,255,.92);
          border: 1px solid #eadfce;
          border-radius: 20px;
          box-shadow: 0 8px 24px rgba(26,18,11,.06);
          overflow: hidden;
        }

        .act-form-head,
        .act-list-head {
          padding: 17px 18px;
          border-bottom: 1px solid #f0e4d2;
          background: linear-gradient(135deg, #fffdf8, #ffffff);
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
          flex-wrap: wrap;
        }

        .act-form-title,
        .act-list-title {
          margin: 0;
          color: #1a120b;
          font-size: 18px;
          font-weight: 950;
        }

        .act-form-text,
        .act-list-text {
          margin: 5px 0 0;
          color: #7a6a52;
          font-size: 12px;
          line-height: 1.45;
        }

        .act-cancel {
          height: 34px;
          padding: 0 12px;
          border-radius: 999px;
          border: 1.5px solid #eadfce;
          background: #fffaf2;
          color: #1a120b;
          font-size: 11px;
          font-weight: 850;
          cursor: pointer;
        }

        .act-form {
          padding: 18px;
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 12px;
        }

        .act-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .act-field-wide {
          grid-column: span 2;
        }

        .act-field-full {
          grid-column: 1 / -1;
        }

        .act-label {
          color: #6b5a45;
          font-size: 11px;
          font-weight: 850;
          letter-spacing: .06em;
          text-transform: uppercase;
        }

        .act-input,
        .act-textarea {
          width: 100%;
          border-radius: 12px;
          border: 1.5px solid #eadfce;
          background: #fffdf8;
          color: #1a120b;
          font-size: 13px;
          outline: none;
        }

        .act-input {
          height: 40px;
          padding: 0 12px;
        }

        .act-textarea {
          min-height: 76px;
          padding: 11px 12px;
          resize: vertical;
          line-height: 1.5;
        }

        .act-input:focus,
        .act-textarea:focus {
          border-color: #c8841a;
          box-shadow: 0 0 0 4px rgba(200,132,26,.12);
        }

        .act-check,
        .act-submit {
          grid-column: span 2;
        }

        .act-check {
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

        .act-check input {
          accent-color: #c8841a;
        }

        .act-submit {
          height: 42px;
          border: none;
          border-radius: 14px;
          background: linear-gradient(135deg, #d4911e, #b87318);
          color: #ffffff;
          font-size: 13px;
          font-weight: 900;
          cursor: pointer;
          box-shadow: 0 9px 22px rgba(200,132,26,.24);
        }

        .act-submit:disabled {
          opacity: .7;
          cursor: not-allowed;
        }

        .act-loading,
        .act-empty {
          padding: 44px 18px;
          text-align: center;
          color: #7a6a52;
          font-size: 14px;
        }

        .act-spinner {
          width: 32px;
          height: 32px;
          margin: 0 auto 12px;
          border-radius: 50%;
          border: 3px solid #eadfce;
          border-top-color: #c8841a;
          animation: actSpin .75s linear infinite;
        }

        .act-grid {
          padding: 16px;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(245px, 1fr));
          gap: 14px;
        }

        .act-card {
          border: 1px solid #eadfce;
          border-radius: 18px;
          background: #ffffff;
          overflow: hidden;
          box-shadow: 0 4px 14px rgba(26,18,11,.04);
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        .act-card-image {
          position: relative;
          height: 145px;
          background:
            radial-gradient(circle at top left, rgba(212,145,30,.18), transparent 45%),
            linear-gradient(135deg, #fffaf2, #ffffff);
          overflow: hidden;
          border-bottom: 1px solid #f3eadc;
        }

        .act-card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform .35s ease;
        }

        .act-card:hover .act-card-image img {
          transform: scale(1.05);
        }

        .act-number {
          position: absolute;
          top: 9px;
          left: 9px;
          z-index: 2;
          width: 31px;
          height: 31px;
          border-radius: 50%;
          background: rgba(255,255,255,.94);
          color: #9a5d0a;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          font-weight: 950;
          box-shadow: 0 6px 18px rgba(0,0,0,.12);
        }

        .act-source {
          position: absolute;
          right: 9px;
          top: 9px;
          z-index: 2;
          min-height: 24px;
          padding: 5px 9px;
          border-radius: 999px;
          font-size: 9px;
          font-weight: 950;
          text-transform: uppercase;
          border: 1px solid rgba(255,255,255,.45);
          backdrop-filter: blur(10px);
        }

        .act-source-admin {
          background: rgba(22,101,52,.88);
          color: #ffffff;
        }

        .act-source-public {
          background: rgba(154,93,10,.88);
          color: #ffffff;
        }

        .act-status {
          position: absolute;
          left: 9px;
          bottom: 9px;
          z-index: 2;
          min-height: 24px;
          padding: 5px 9px;
          border-radius: 999px;
          font-size: 9px;
          font-weight: 950;
          text-transform: uppercase;
          border: 1px solid rgba(255,255,255,.45);
          backdrop-filter: blur(10px);
        }

        .act-status-active {
          background: rgba(236,253,245,.92);
          color: #047857;
        }

        .act-status-inactive {
          background: rgba(254,242,242,.94);
          color: #991b1b;
        }

        .act-card-body {
          padding: 13px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          flex: 1;
        }

        .act-type-pill {
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

        .act-card-title {
          margin: 0;
          color: #1a120b;
          font-size: 18px;
          font-weight: 950;
          line-height: 1.15;
        }

        .act-card-subtitle {
          margin: -4px 0 0;
          color: #9a8878;
          font-size: 11px;
          font-weight: 800;
          line-height: 1.35;
        }

        .act-description {
          margin: 0;
          color: #7a6a52;
          font-size: 12px;
          line-height: 1.5;
          min-height: 54px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .act-info {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          margin-top: auto;
        }

        .act-info-box {
          border-radius: 12px;
          background: #fffaf2;
          border: 1px solid #f3eadc;
          padding: 8px;
          min-width: 0;
        }

        .act-info-label {
          display: block;
          color: #8a7558;
          font-size: 9px;
          font-weight: 900;
          letter-spacing: .08em;
          text-transform: uppercase;
          margin-bottom: 3px;
        }

        .act-info-value {
          color: #1a120b;
          font-size: 12px;
          font-weight: 850;
          word-break: break-word;
        }

        .act-actions {
          display: flex;
          gap: 6px;
          padding-top: 2px;
        }

        .act-action-btn {
          flex: 1;
          height: 34px;
          border-radius: 10px;
          font-size: 12px;
          font-weight: 850;
          cursor: pointer;
        }

        .act-edit-btn {
          border: 1.5px solid #f1d5a3;
          background: #fff7e8;
          color: #9a5d0a;
        }

        .act-delete-btn {
          border: 1.5px solid #fecaca;
          background: #fef2f2;
          color: #991b1b;
        }

        @media (max-width: 1060px) {
          .act-toolbar {
            grid-template-columns: 1fr 1fr;
          }

          .act-stats {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .act-insights {
            grid-template-columns: 1fr;
          }

          .act-form {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 720px) {
          .act-toolbar {
            grid-template-columns: 1fr;
          }

          .act-stats {
            grid-template-columns: 1fr;
          }

          .act-duration-list {
            grid-template-columns: 1fr;
          }

          .act-form {
            grid-template-columns: 1fr;
          }

          .act-field-wide,
          .act-field-full,
          .act-check,
          .act-submit {
            grid-column: 1 / -1;
          }

          .act-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 520px) {
          .act-hero {
            padding: 20px;
            border-radius: 20px;
          }

          .act-card-image {
            height: 220px;
          }

          .act-info {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <section className="act-page">
        <div className="act-hero">
          <div className="act-hero-content">
            <div>
              <p className="act-kicker">Menaxhimi i aktiviteteve</p>
              <h1 className="act-title">
                Aktivitetet që klientët <span>i shohin në faqen publike</span>
              </h1>
              <p className="act-subtitle">
                Këtu admini sheh të njëjtat aktivitete që paraqiten në public page. Nëse një aktivitet është i lidhur
                me databazën, mund të përditësohet direkt; nëse jo, mund të ruhet në admin.
              </p>
            </div>

            <div className="act-hero-card">
              <strong>{stats.total} aktivitete</strong>
              <span>
                {stats.connected} të lidhura me databazë, {stats.publicOnly} vetëm nga public page.
              </span>
            </div>
          </div>
        </div>

        <div className="act-toolbar">
          <input
            type="text"
            placeholder="Kërko sipas emrit, llojit ose përshkrimit..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="act-search"
          />

          <button
            type="button"
            className={`act-filter-btn ${statusFilter === 'All' ? 'active' : ''}`}
            onClick={() => setStatusFilter('All')}
          >
            Të gjitha
          </button>

          <button
            type="button"
            className={`act-filter-btn ${statusFilter === 'Active' ? 'active' : ''}`}
            onClick={() => setStatusFilter('Active')}
          >
            Aktive
          </button>

          <button type="button" className="act-refresh" onClick={loadActivities}>
            Rifresko
          </button>
        </div>

        <div className="act-stats">
          {[
            { label: 'Totali', value: stats.total },
            { label: 'Aktive', value: stats.active },
            { label: 'Nga databaza', value: stats.connected },
            { label: 'Nga public page', value: stats.publicOnly },
            { label: 'Koha mesatare', value: `${stats.averageDuration} min` },
          ].map((item) => (
            <div key={item.label} className="act-stat-card">
              <p className="act-stat-label">{item.label}</p>
              <p className="act-stat-value">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="act-insights">
          <div className="act-panel">
            <h2 className="act-panel-title">Kohëzgjatja e aktiviteteve</h2>
            <p className="act-panel-text">
              Grupimi sipas minutave ndihmon me e planifiku eventin dhe me kuptu cilat aktivitete janë më të shkurtra
              apo më të gjata.
            </p>

            <div className="act-duration-list">
              {durationChart.map((item) => (
                <div key={item.label} className="act-duration-item">
                  <div className="act-duration-top">
                    <span>{item.label}</span>
                    <strong>{item.count}</strong>
                  </div>

                  <div className="act-duration-track">
                    <div
                      className="act-duration-fill"
                      style={{ width: `${Math.max(8, (item.count / maxDurationCount) * 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="act-panel">
            <h2 className="act-panel-title">Sinkronizimi me public page</h2>
            <p className="act-panel-text">
              Kur të gjitha aktivitetet lidhen me databazë, admini dhe public page janë më të rregullta dhe më
              profesionale.
            </p>

            <div className="act-health">
              <div className="act-ring" style={activeStyle}>
                <div className="act-ring-inner">
                  <span className="act-ring-number">{stats.activePercent}%</span>
                  <span className="act-ring-label">aktive</span>
                </div>
              </div>

              <p className="act-health-text">
                Aktivitetet me burim “Public” janë në faqe, por ende nuk janë të ruajtura si të dhëna reale në databazë.
              </p>
            </div>
          </div>
        </div>

        {error && <div className="act-error">{error}</div>}

        <div className="act-form-card">
          <div className="act-form-head">
            <div>
              <h2 className="act-form-title">{editingId ? 'Përditëso aktivitetin' : 'Shto aktivitet në admin'}</h2>
              <p className="act-form-text">
                Kur ruhet një aktivitet publik, ai lidhet me databazën dhe mund të menaxhohet nga admini.
              </p>
            </div>

            {(editingId || form.name) && (
              <button type="button" className="act-cancel" onClick={resetForm}>
                Anulo
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="act-form">
            <div className="act-field act-field-wide">
              <label className="act-label">Emri i aktivitetit</label>
              <input
                type="text"
                value={form.name}
                onChange={(event) => handleChange('name', event.target.value)}
                className="act-input"
                placeholder="Pikturim Fytyre"
                required
              />
            </div>

            <div className="act-field act-field-full">
              <label className="act-label">Përshkrimi</label>
              <textarea
                value={form.description}
                onChange={(event) => handleChange('description', event.target.value)}
                className="act-textarea"
                placeholder="Shkruaj përshkrimin e aktivitetit..."
              />
            </div>

            <div className="act-field">
              <label className="act-label">Çmimi</label>
              <input
                type="number"
                value={form.price}
                onChange={(event) => handleChange('price', Number(event.target.value))}
                className="act-input"
                min={0}
              />
            </div>

            <div className="act-field">
              <label className="act-label">Kohëzgjatja</label>
              <input
                type="number"
                value={form.duration_minutes}
                onChange={(event) => handleChange('duration_minutes', Number(event.target.value))}
                className="act-input"
                min={0}
              />
            </div>

            <label className="act-check">
              <input
                type="checkbox"
                checked={form.is_active}
                onChange={(event) => handleChange('is_active', event.target.checked)}
              />
              Aktiviteti është aktiv
            </label>

            <button type="submit" className="act-submit" disabled={submitting}>
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

        <div className="act-list-card">
          <div className="act-list-head">
            <div>
              <h2 className="act-list-title">Aktivitetet e faqes publike</h2>
              <p className="act-list-text">
                Këto janë të njëjtat aktivitete që klienti i sheh në public page.
              </p>
            </div>
          </div>

          {loading ? (
            <div className="act-loading">
              <div className="act-spinner" />
              Duke u ngarkuar aktivitetet...
            </div>
          ) : filteredActivities.length === 0 ? (
            <div className="act-empty">Nuk u gjet asnjë aktivitet me këto filtra.</div>
          ) : (
            <div className="act-grid">
              {filteredActivities.map((item) => (
                <article key={`${item.source}-${item.id}`} className="act-card">
                  <div className="act-card-image">
                    <span className="act-number">{item.icon}</span>

                    <span
                      className={`act-source ${
                        item.source === 'admin' ? 'act-source-admin' : 'act-source-public'
                      }`}
                    >
                      {item.source === 'admin' ? 'Databazë' : 'Public'}
                    </span>

                    <span className={`act-status ${item.is_active ? 'act-status-active' : 'act-status-inactive'}`}>
                      {item.is_active ? 'Aktiv' : 'Jo aktiv'}
                    </span>

                    <img src={item.image} alt={item.name} />
                  </div>

                  <div className="act-card-body">
                    <span className="act-type-pill">{item.subtitle}</span>

                    <div>
                      <h3 className="act-card-title">{item.name}</h3>
                      <p className="act-card-subtitle">{item.subtitle}</p>
                    </div>

                    <p className="act-description">{item.description}</p>

                    <div className="act-info">
                      <div className="act-info-box">
                        <span className="act-info-label">Çmimi</span>
                        <span className="act-info-value">{formatMoney(item.price)}</span>
                      </div>

                      <div className="act-info-box">
                        <span className="act-info-label">Koha</span>
                        <span className="act-info-value">{item.duration_minutes || 0} min</span>
                      </div>
                    </div>

                    <div className="act-actions">
                      <button type="button" className="act-action-btn act-edit-btn" onClick={() => handleEdit(item)}>
                        {item.source === 'admin' ? 'Edito' : 'Ruaj'}
                      </button>

                      <button type="button" className="act-action-btn act-delete-btn" onClick={() => handleDelete(item)}>
                        Fshi
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}