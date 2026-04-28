import { useEffect, useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import {
  createDecoration,
  deleteDecoration,
  getAdminDecorations,
  updateDecoration,
} from '../../services/decorationApi';
import type { Decoration, DecorationPayload } from '../../services/decorationApi';

const initialForm: DecorationPayload = {
  title: '',
  category: '',
  short_description: '',
  full_description: '',
  image_url: '',
  price_from: 0,
  theme_colors: '',
  is_featured: false,
  is_active: true,
};

function formatMoney(value?: string | number | null) {
  return `€${Number(value || 0).toLocaleString('de-DE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export default function DecorationsPage() {
  const [decorations, setDecorations] = useState<Decoration[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [form, setForm] = useState<DecorationPayload>(initialForm);
  const [editingId, setEditingId] = useState<number | null>(null);

  const loadDecorations = async () => {
    try {
      setLoading(true);
      setError('');

      const data = await getAdminDecorations();
      setDecorations(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Dekorimet nuk mund të ngarkohen.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDecorations();
  }, []);

  const filteredDecorations = useMemo(() => {
    const value = search.trim().toLowerCase();
    const sorted = [...decorations].sort((a, b) => a.id - b.id);

    if (!value) return sorted;

    return sorted.filter((item) => {
      const text = `${item.title} ${item.category} ${item.short_description || ''} ${item.theme_colors || ''}`.toLowerCase();
      return text.includes(value);
    });
  }, [decorations, search]);

  const stats = useMemo(() => {
    const active = decorations.filter((item) => item.is_active).length;
    const featured = decorations.filter((item) => item.is_featured).length;
    const inactive = decorations.filter((item) => !item.is_active).length;

    const avgPrice =
      decorations.length > 0
        ? decorations.reduce((sum, item) => sum + Number(item.price_from || 0), 0) / decorations.length
        : 0;

    return {
      total: decorations.length,
      active,
      featured,
      inactive,
      avgPrice,
    };
  }, [decorations]);

  const categoryChart = useMemo(() => {
    const grouped = decorations.reduce<Record<string, number>>((acc, item) => {
      const key = item.category?.trim() || 'Pa kategori';
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(grouped)
      .map(([category, count]) => ({ category, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);
  }, [decorations]);

  const maxCategoryCount = Math.max(...categoryChart.map((item) => item.count), 1);

  const handleChange = (key: keyof DecorationPayload, value: string | number | boolean) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
  };

  const handleEdit = (item: Decoration) => {
    setEditingId(item.id);

    setForm({
      title: item.title,
      category: item.category,
      short_description: item.short_description ?? '',
      full_description: item.full_description ?? '',
      image_url: item.image_url ?? '',
      price_from: Number(item.price_from ?? 0),
      theme_colors: item.theme_colors ?? '',
      is_featured: Boolean(item.is_featured),
      is_active: Boolean(item.is_active),
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      setError('');

      if (editingId) {
        await updateDecoration(editingId, form);
      } else {
        await createDecoration(form);
      }

      await loadDecorations();
      resetForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ruajtja e dekorimit dështoi.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm('A jeni e sigurt që dëshironi ta fshini këtë dekorim?');

    if (!confirmed) return;

    try {
      setError('');
      await deleteDecoration(id);
      await loadDecorations();

      if (editingId === id) {
        resetForm();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fshirja e dekorimit dështoi.');
    }
  };

  return (
    <>
      <style>{`
        @keyframes decorSpin {
          to {
            transform: rotate(360deg);
          }
        }

        .decor-page {
          display: flex;
          flex-direction: column;
          gap: 18px;
          min-width: 0;
        }

        .decor-hero {
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

        .decor-hero::after {
          content: "DECOR";
          position: absolute;
          right: 22px;
          bottom: -22px;
          font-size: clamp(58px, 10vw, 120px);
          line-height: 1;
          font-weight: 950;
          color: rgba(212,145,30,.08);
          pointer-events: none;
        }

        .decor-hero-content {
          position: relative;
          z-index: 1;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 18px;
          flex-wrap: wrap;
        }

        .decor-kicker {
          margin: 0 0 9px;
          color: #d4911e;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: .18em;
          text-transform: uppercase;
        }

        .decor-title {
          margin: 0;
          font-size: clamp(25px, 3.2vw, 38px);
          font-weight: 950;
          line-height: 1.05;
          color: #ffffff;
        }

        .decor-title span {
          color: #d4911e;
          font-style: italic;
        }

        .decor-subtitle {
          margin: 10px 0 0;
          max-width: 760px;
          color: rgba(255,255,255,.68);
          font-size: 14px;
          line-height: 1.7;
        }

        .decor-hero-note {
          min-width: 220px;
          border-radius: 18px;
          border: 1px solid rgba(212,145,30,.28);
          background: rgba(255,255,255,.07);
          padding: 14px;
          backdrop-filter: blur(12px);
        }

        .decor-hero-note strong {
          display: block;
          color: #ffffff;
          font-size: 21px;
          font-weight: 950;
          margin-bottom: 4px;
        }

        .decor-hero-note span {
          color: rgba(255,255,255,.58);
          font-size: 13px;
          line-height: 1.45;
        }

        .decor-toolbar {
          display: grid;
          grid-template-columns: minmax(260px, 1fr) auto;
          gap: 10px;
          align-items: center;
          background: rgba(255,255,255,.92);
          border: 1px solid #eadfce;
          border-radius: 20px;
          padding: 12px;
          box-shadow: 0 7px 22px rgba(26,18,11,.05);
        }

        .decor-search {
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

        .decor-search:focus {
          border-color: #c8841a;
          box-shadow: 0 0 0 4px rgba(200,132,26,.12);
          background: #ffffff;
        }

        .decor-refresh {
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

        .decor-refresh:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(200,132,26,.32);
        }

        .decor-stats {
          display: grid;
          grid-template-columns: repeat(5, minmax(135px, 1fr));
          gap: 12px;
        }

        .decor-stat-card {
          background: rgba(255,255,255,.92);
          border: 1px solid #eadfce;
          border-radius: 18px;
          padding: 15px;
          box-shadow: 0 7px 22px rgba(26,18,11,.05);
        }

        .decor-stat-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;
        }

        .decor-stat-label {
          margin: 0;
          color: #7a6a52;
          font-size: 11px;
          font-weight: 750;
        }

        .decor-stat-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #c8841a;
          box-shadow: 0 0 0 5px rgba(200,132,26,.12);
          flex-shrink: 0;
        }

        .decor-stat-value {
          margin: 0;
          color: #1a120b;
          font-size: 22px;
          font-weight: 950;
          line-height: 1;
        }

        .decor-insights {
          display: grid;
          grid-template-columns: minmax(0, 1fr);
          gap: 14px;
        }

        .decor-chart-card {
          background: rgba(255,255,255,.92);
          border: 1px solid #eadfce;
          border-radius: 20px;
          padding: 18px;
          box-shadow: 0 7px 22px rgba(26,18,11,.05);
          min-width: 0;
        }

        .decor-chart-title {
          margin: 0;
          color: #1a120b;
          font-size: 17px;
          font-weight: 950;
        }

        .decor-chart-subtitle {
          margin: 5px 0 15px;
          color: #7a6a52;
          font-size: 12.5px;
          line-height: 1.45;
        }

        .decor-bar-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
          gap: 12px;
        }

        .decor-bar-item {
          border: 1px solid #f3eadc;
          background: #fffaf2;
          border-radius: 14px;
          padding: 12px;
        }

        .decor-bar-top {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          margin-bottom: 8px;
          color: #1a120b;
          font-size: 12px;
          font-weight: 850;
        }

        .decor-bar-track {
          height: 9px;
          border-radius: 999px;
          background: #f1dfc5;
          overflow: hidden;
        }

        .decor-bar-fill {
          height: 100%;
          border-radius: 999px;
          background: linear-gradient(135deg, #d4911e, #b87318);
        }

        .decor-error {
          padding: 13px 16px;
          border-radius: 16px;
          border: 1px solid #fecaca;
          background: #fef2f2;
          color: #991b1b;
          font-size: 14px;
          font-weight: 750;
        }

        .decor-layout {
          display: flex;
          flex-direction: column;
          gap: 18px;
          align-items: stretch;
        }

        .decor-form-card,
        .decor-list-card {
          background: rgba(255,255,255,.92);
          border: 1px solid #eadfce;
          border-radius: 20px;
          box-shadow: 0 8px 24px rgba(26,18,11,.06);
          overflow: hidden;
        }

        .decor-form-head,
        .decor-list-head {
          padding: 17px 18px;
          border-bottom: 1px solid #f0e4d2;
          background: linear-gradient(135deg, #fffdf8, #ffffff);
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
        }

        .decor-form-title,
        .decor-list-title {
          margin: 0;
          color: #1a120b;
          font-size: 18px;
          font-weight: 950;
        }

        .decor-form-text,
        .decor-list-text {
          margin: 5px 0 0;
          color: #7a6a52;
          font-size: 12px;
          line-height: 1.45;
        }

        .decor-cancel {
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

        .decor-form {
          padding: 18px;
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 12px;
        }

        .decor-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .decor-field-wide {
          grid-column: span 2;
        }

        .decor-field-full {
          grid-column: 1 / -1;
        }

        .decor-checks {
          grid-column: span 2;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .decor-submit {
          grid-column: span 2;
        }

        .decor-label {
          color: #6b5a45;
          font-size: 11px;
          font-weight: 850;
          letter-spacing: .06em;
          text-transform: uppercase;
        }

        .decor-input,
        .decor-textarea {
          width: 100%;
          border-radius: 12px;
          border: 1.5px solid #eadfce;
          background: #fffdf8;
          color: #1a120b;
          font-size: 13px;
          outline: none;
          transition: border-color .2s, box-shadow .2s, background .2s;
        }

        .decor-input {
          height: 40px;
          padding: 0 12px;
        }

        .decor-textarea {
          min-height: 78px;
          padding: 11px 12px;
          resize: vertical;
          line-height: 1.5;
        }

        .decor-input:focus,
        .decor-textarea:focus {
          border-color: #c8841a;
          box-shadow: 0 0 0 4px rgba(200,132,26,.12);
          background: #ffffff;
        }

        .decor-check {
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

        .decor-check input {
          accent-color: #c8841a;
        }

        .decor-submit {
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

        .decor-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(200,132,26,.32);
        }

        .decor-submit:disabled {
          opacity: .7;
          cursor: not-allowed;
        }

        .decor-list-head {
          align-items: center;
          flex-wrap: wrap;
        }

        .decor-list-count {
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

        .decor-loading,
        .decor-empty {
          padding: 44px 18px;
          text-align: center;
          color: #7a6a52;
          font-size: 14px;
        }

        .decor-spinner {
          width: 32px;
          height: 32px;
          margin: 0 auto 12px;
          border-radius: 50%;
          border: 3px solid #eadfce;
          border-top-color: #c8841a;
          animation: decorSpin .75s linear infinite;
        }

        .decor-grid {
          padding: 16px;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
          gap: 14px;
          align-items: stretch;
        }

        .decor-card {
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

        .decor-card-image {
          position: relative;
          height: 155px;
          background: #fff7e8;
          overflow: hidden;
          flex-shrink: 0;
        }

        .decor-card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform .35s ease;
        }

        .decor-card:hover .decor-card-image img {
          transform: scale(1.05);
        }

        .decor-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background:
            radial-gradient(circle at top left, rgba(212,145,30,.22), transparent 42%),
            linear-gradient(135deg, #fff7e8, #fffdf8);
          color: #9a5d0a;
          font-size: 13px;
          font-weight: 950;
        }

        .decor-status {
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

        .decor-status-active {
          background: rgba(236,253,245,.92);
          color: #047857;
        }

        .decor-status-inactive {
          background: rgba(254,242,242,.94);
          color: #991b1b;
        }

        .decor-featured {
          position: absolute;
          top: 9px;
          left: 9px;
          z-index: 2;
          min-height: 24px;
          padding: 5px 9px;
          border-radius: 999px;
          font-size: 9px;
          font-weight: 950;
          letter-spacing: .06em;
          text-transform: uppercase;
          background: rgba(154,93,10,.88);
          color: #ffffff;
          border: 1px solid rgba(255,255,255,.45);
          backdrop-filter: blur(10px);
        }

        .decor-card-body {
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          flex: 1;
        }

        .decor-category-pill {
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

        .decor-card-title {
          margin: 0;
          color: #1a120b;
          font-size: 17px;
          font-weight: 900;
          line-height: 1.15;
          min-height: 38px;
        }

        .decor-description {
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

        .decor-info-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
          margin-top: auto;
        }

        .decor-info-box {
          border-radius: 12px;
          background: #fffaf2;
          border: 1px solid #f3eadc;
          padding: 8px;
          min-width: 0;
        }

        .decor-info-label {
          display: block;
          color: #8a7558;
          font-size: 9px;
          font-weight: 900;
          letter-spacing: .08em;
          text-transform: uppercase;
          margin-bottom: 3px;
        }

        .decor-info-value {
          color: #1a120b;
          font-size: 12px;
          font-weight: 850;
          word-break: break-word;
        }

        .decor-actions {
          display: flex;
          gap: 6px;
          padding-top: 2px;
        }

        .decor-action-btn {
          flex: 1;
          height: 34px;
          border-radius: 10px;
          font-size: 12px;
          font-weight: 850;
          cursor: pointer;
          transition: transform .15s, box-shadow .15s;
        }

        .decor-action-btn:hover {
          transform: translateY(-1px);
        }

        .decor-edit-btn {
          border: 1.5px solid #f1d5a3;
          background: #fff7e8;
          color: #9a5d0a;
        }

        .decor-delete-btn {
          border: 1.5px solid #fecaca;
          background: #fef2f2;
          color: #991b1b;
        }

        @media (max-width: 1060px) {
          .decor-toolbar {
            grid-template-columns: 1fr;
          }

          .decor-refresh {
            width: 100%;
          }

          .decor-stats {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .decor-form {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 720px) {
          .decor-grid {
            padding: 16px;
            grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
          }

          .decor-form {
            grid-template-columns: 1fr;
          }

          .decor-field-wide,
          .decor-field-full,
          .decor-checks,
          .decor-submit {
            grid-column: 1 / -1;
          }

          .decor-checks {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 520px) {
          .decor-hero {
            padding: 20px;
            border-radius: 20px;
          }

          .decor-stats {
            grid-template-columns: 1fr;
          }

          .decor-form-head,
          .decor-list-head {
            padding: 16px;
          }

          .decor-form {
            padding: 16px;
          }

          .decor-card-image {
            height: 225px;
          }

          .decor-card-title,
          .decor-description {
            min-height: auto;
          }

          .decor-info-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <section className="decor-page">
        <div className="decor-hero">
          <div className="decor-hero-content">
            <div>
              <p className="decor-kicker">Menaxhimi i dekorimeve</p>
              <h1 className="decor-title">
                Dekorimet që shfaqen <span>në faqen publike</span>
              </h1>
              <p className="decor-subtitle">
                Këtu mund të shtosh, përditësosh dhe menaxhosh dekorimet për evente, baby shower,
                ditëlindje, fejesa dhe festa familjare.
              </p>
            </div>

            <div className="decor-hero-note">
              <strong>{stats.total} dekorime</strong>
              <span>{stats.active} aktive, {stats.featured} të veçuara dhe {stats.inactive} jo aktive.</span>
            </div>
          </div>
        </div>

        <div className="decor-toolbar">
          <input
            type="text"
            placeholder="Kërko sipas titullit, kategorisë ose ngjyrave..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="decor-search"
          />

          <button type="button" className="decor-refresh" onClick={loadDecorations}>
            Rifresko
          </button>
        </div>

        <div className="decor-stats">
          {[
            { label: 'Totali i dekorimeve', value: stats.total },
            { label: 'Dekorime aktive', value: stats.active },
            { label: 'Të veçuara', value: stats.featured },
            { label: 'Jo aktive', value: stats.inactive },
            { label: 'Çmimi mesatar', value: formatMoney(stats.avgPrice) },
          ].map((item) => (
            <div key={item.label} className="decor-stat-card">
              <div className="decor-stat-top">
                <p className="decor-stat-label">{item.label}</p>
                <span className="decor-stat-dot" />
              </div>
              <p className="decor-stat-value">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="decor-insights">
          <div className="decor-chart-card">
            <h2 className="decor-chart-title">Kategoritë më të përdorura</h2>
            <p className="decor-chart-subtitle">
              Këto janë kategoritë ku janë grupuar dekorimet në admin panel.
            </p>

            {categoryChart.length === 0 ? (
              <p className="decor-chart-subtitle" style={{ margin: 0 }}>
                Nuk ka ende të dhëna për grafikun.
              </p>
            ) : (
              <div className="decor-bar-list">
                {categoryChart.map((item) => (
                  <div key={item.category} className="decor-bar-item">
                    <div className="decor-bar-top">
                      <span>{item.category}</span>
                      <strong>{item.count}</strong>
                    </div>
                    <div className="decor-bar-track">
                      <div
                        className="decor-bar-fill"
                        style={{ width: `${Math.max(8, (item.count / maxCategoryCount) * 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {error && <div className="decor-error">{error}</div>}

        <div className="decor-layout">
          <div className="decor-form-card">
            <div className="decor-form-head">
              <div>
                <h2 className="decor-form-title">{editingId ? 'Përditëso dekorimin' : 'Shto dekorim'}</h2>
                <p className="decor-form-text">
                  Plotëso të dhënat kryesore për dekorimin që do të shfaqet në sistem.
                </p>
              </div>

              {(editingId || form.title) && (
                <button type="button" className="decor-cancel" onClick={resetForm}>
                  Anulo
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="decor-form">
              <div className="decor-field decor-field-wide">
                <label className="decor-label">Titulli</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  className="decor-input"
                  placeholder="Dekor me balona për hyrje"
                  required
                />
              </div>

              <div className="decor-field decor-field-wide">
                <label className="decor-label">Kategoria</label>
                <input
                  type="text"
                  value={form.category}
                  onChange={(e) => handleChange('category', e.target.value)}
                  className="decor-input"
                  placeholder="Ditëlindje, Fejesë, Baby Shower..."
                  required
                />
              </div>

              <div className="decor-field decor-field-full">
                <label className="decor-label">Përshkrim i shkurtër</label>
                <textarea
                  value={form.short_description}
                  onChange={(e) => handleChange('short_description', e.target.value)}
                  className="decor-textarea"
                  placeholder="Përshkrimi që shfaqet në kartë..."
                />
              </div>

              <div className="decor-field decor-field-full">
                <label className="decor-label">Përshkrim i plotë</label>
                <textarea
                  value={form.full_description}
                  onChange={(e) => handleChange('full_description', e.target.value)}
                  className="decor-textarea"
                  placeholder="Detaje të plota për dekorimin..."
                />
              </div>

              <div className="decor-field decor-field-wide">
                <label className="decor-label">Linku i fotografisë</label>
                <input
                  type="text"
                  value={form.image_url}
                  onChange={(e) => handleChange('image_url', e.target.value)}
                  className="decor-input"
                  placeholder="https://..."
                />
              </div>

              <div className="decor-field">
                <label className="decor-label">Çmimi fillestar</label>
                <input
                  type="number"
                  value={form.price_from}
                  onChange={(e) => handleChange('price_from', Number(e.target.value))}
                  className="decor-input"
                  min={0}
                />
              </div>

              <div className="decor-field">
                <label className="decor-label">Ngjyrat</label>
                <input
                  type="text"
                  value={form.theme_colors}
                  onChange={(e) => handleChange('theme_colors', e.target.value)}
                  className="decor-input"
                  placeholder="white, gold, blush"
                />
              </div>

              <div className="decor-checks">
                <label className="decor-check">
                  <input
                    type="checkbox"
                    checked={form.is_featured}
                    onChange={(e) => handleChange('is_featured', e.target.checked)}
                  />
                  I veçuar
                </label>

                <label className="decor-check">
                  <input
                    type="checkbox"
                    checked={form.is_active}
                    onChange={(e) => handleChange('is_active', e.target.checked)}
                  />
                  Aktiv
                </label>
              </div>

              <button type="submit" className="decor-submit" disabled={submitting}>
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

          <div className="decor-list-card">
            <div className="decor-list-head">
              <div>
                <h2 className="decor-list-title">Lista e dekorimeve</h2>
                <p className="decor-list-text">Kartat e dekorimeve të ruajtura në databazë.</p>
              </div>
              <span className="decor-list-count">{filteredDecorations.length} rezultate</span>
            </div>

            {loading ? (
              <div className="decor-loading">
                <div className="decor-spinner" />
                Duke u ngarkuar dekorimet...
              </div>
            ) : filteredDecorations.length === 0 ? (
              <div className="decor-empty">
                <strong style={{ display: 'block', color: '#1a120b', marginBottom: 6 }}>
                  Nuk u gjet asnjë dekorim.
                </strong>
                Provo të ndryshosh kërkimin ose shto një dekorim të ri.
              </div>
            ) : (
              <div className="decor-grid">
                {filteredDecorations.map((item) => (
                  <article key={item.id} className="decor-card">
                    <div className="decor-card-image">
                      {item.is_featured && <span className="decor-featured">I veçuar</span>}

                      <span
                        className={`decor-status ${
                          item.is_active ? 'decor-status-active' : 'decor-status-inactive'
                        }`}
                      >
                        {item.is_active ? 'Aktiv' : 'Jo aktiv'}
                      </span>

                      {item.image_url ? (
                        <img src={item.image_url} alt={item.title} />
                      ) : (
                        <div className="decor-placeholder">Pa fotografi</div>
                      )}
                    </div>

                    <div className="decor-card-body">
                      <span className="decor-category-pill">{item.category || 'Pa kategori'}</span>

                      <h3 className="decor-card-title">{item.title}</h3>

                      <p className="decor-description">
                        {item.short_description || 'Nuk ka përshkrim të shkurtër për këtë dekorim.'}
                      </p>

                      <div className="decor-info-grid">
                        <div className="decor-info-box">
                          <span className="decor-info-label">Çmimi</span>
                          <span className="decor-info-value">Nga {formatMoney(item.price_from)}</span>
                        </div>

                        <div className="decor-info-box">
                          <span className="decor-info-label">Ngjyrat</span>
                          <span className="decor-info-value">{item.theme_colors || '—'}</span>
                        </div>
                      </div>

                      <div className="decor-actions">
                        <button type="button" className="decor-action-btn decor-edit-btn" onClick={() => handleEdit(item)}>
                          Edito
                        </button>

                        <button
                          type="button"
                          className="decor-action-btn decor-delete-btn"
                          onClick={() => handleDelete(item.id)}
                        >
                          Fshi
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