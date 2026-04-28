import { useEffect, useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import {
  createPackage,
  deletePackage,
  getAdminPackages,
  updatePackage,
} from '../../services/packageAdminApi';
import type {
  AdminPackage,
  AdminPackagePayload,
} from '../../services/packageAdminApi';

type PackageFilter = 'all' | 'mascot' | 'bounce-house' | 'bubble-bounce';
type StatusFilter = 'all' | 'active' | 'inactive';

const initialForm: AdminPackagePayload = {
  title: '',
  description: '',
  category: 'mascot',
  duration_minutes: 60,
  min_mascots: 0,
  max_mascots: 0,
  base_price: 0,
  is_active: true,
};

const categoryLabels: Record<string, string> = {
  mascot: 'Maskota',
  'bounce-house': 'Bounce House',
  'bubble-bounce': 'Bubble & Bounce',
};

const categoryDescriptions: Record<string, string> = {
  mascot: 'Paketa me personazhe, maskota dhe argëtim për fëmijë.',
  'bounce-house': 'Paketa me lojëra kërcyese dhe pajisje për evente.',
  'bubble-bounce': 'Paketa premium me kombinim të bubble show, bounce dhe dekor.',
};

function formatMoney(value?: string | number | null) {
  return `€${Number(value || 0).toLocaleString('de-DE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function formatDuration(minutes?: number | string | null) {
  const value = Number(minutes || 0);

  if (value <= 0) return '—';
  if (value < 60) return `${value} min`;

  const hours = value / 60;
  return `${hours % 1 === 0 ? hours : hours.toFixed(1)} orë`;
}

function getPackageIncludes(item: AdminPackage): string[] {
  if (item.extras?.length) return item.extras;

  if (item.category === 'mascot') {
    return ['Maskotë', 'Muzikë', 'Animim bazik'];
  }

  if (item.category === 'bounce-house') {
    return ['Bounce House', 'Montim', 'Asistent'];
  }

  if (item.category === 'bubble-bounce') {
    return ['Bubble Show', 'Bounce', 'Dekor Premium'];
  }

  return ['Paketë e personalizuar'];
}

function getCategoryTone(category: string) {
  if (category === 'mascot') return 'Personazhe';
  if (category === 'bounce-house') return 'Loja kërcyese';
  if (category === 'bubble-bounce') return 'Premium';
  return 'Custom';
}

export default function PackagesPage() {
  const [packages, setPackages] = useState<AdminPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<PackageFilter>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [form, setForm] = useState<AdminPackagePayload>(initialForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);

  const loadPackages = async (value = '') => {
    try {
      setLoading(true);
      setError('');

      const data = await getAdminPackages(value);
      setPackages(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Paketat nuk mund të ngarkohen.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPackages();
  }, []);

  const filteredPackages = useMemo(() => {
    const value = search.trim().toLowerCase();

    return [...packages]
      .sort((a, b) => Number(a.base_price || 0) - Number(b.base_price || 0))
      .filter((item) => {
        const text = `${item.title} ${item.description || ''} ${item.category}`.toLowerCase();

        const matchesSearch = !value || text.includes(value);
        const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
        const matchesStatus =
          statusFilter === 'all' ||
          (statusFilter === 'active' && item.is_active) ||
          (statusFilter === 'inactive' && !item.is_active);

        return matchesSearch && matchesCategory && matchesStatus;
      });
  }, [packages, search, categoryFilter, statusFilter]);

  const stats = useMemo(() => {
    const total = packages.length;
    const active = packages.filter((item) => item.is_active).length;
    const inactive = total - active;

    const totalValue = packages.reduce((sum, item) => sum + Number(item.base_price || 0), 0);
    const avgPrice = total ? totalValue / total : 0;

    const mascotPackages = packages.filter((item) => item.category === 'mascot').length;
    const bouncePackages = packages.filter((item) => item.category === 'bounce-house').length;
    const bubblePackages = packages.filter((item) => item.category === 'bubble-bounce').length;

    return {
      total,
      active,
      inactive,
      totalValue,
      avgPrice,
      mascotPackages,
      bouncePackages,
      bubblePackages,
      activePercent: total ? Math.round((active / total) * 100) : 0,
    };
  }, [packages]);

  const categoryChart = useMemo(() => {
    const categories = [
      { key: 'mascot', label: 'Maskota', count: stats.mascotPackages },
      { key: 'bounce-house', label: 'Bounce House', count: stats.bouncePackages },
      { key: 'bubble-bounce', label: 'Bubble & Bounce', count: stats.bubblePackages },
    ];

    return categories;
  }, [stats]);

  const maxCategoryCount = Math.max(...categoryChart.map((item) => item.count), 1);

  const priceGroups = useMemo(() => {
    const groups = [
      { label: 'Deri €150', count: 0 },
      { label: '€151–€350', count: 0 },
      { label: '€350+', count: 0 },
    ];

    packages.forEach((item) => {
      const price = Number(item.base_price || 0);

      if (price <= 150) groups[0].count += 1;
      else if (price <= 350) groups[1].count += 1;
      else groups[2].count += 1;
    });

    return groups;
  }, [packages]);

  const maxPriceGroup = Math.max(...priceGroups.map((item) => item.count), 1);

  const handleChange = (key: keyof AdminPackagePayload, value: string | number | boolean) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
    setShowForm(false);
  };

  const openCreateForm = () => {
    setEditingId(null);
    setForm(initialForm);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEdit = (item: AdminPackage) => {
    setEditingId(item.id);

    setForm({
      title: item.title,
      description: item.description || '',
      category: item.category,
      duration_minutes: Number(item.duration_minutes || 60),
      min_mascots: Number(item.min_mascots || 0),
      max_mascots: Number(item.max_mascots || 0),
      base_price: Number(item.base_price || 0),
      is_active: Boolean(item.is_active),
    });

    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setSubmitting(true);
      setError('');

      if (editingId) {
        await updatePackage(editingId, form);
      } else {
        await createPackage(form);
      }

      await loadPackages(search);
      resetForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ruajtja e paketës dështoi.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm('A jeni e sigurt që dëshironi ta fshini këtë paketë?');

    if (!confirmed) return;

    try {
      setError('');
      await deletePackage(id);
      await loadPackages(search);

      if (editingId === id) {
        resetForm();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fshirja e paketës dështoi.');
    }
  };

  return (
    <>
      <style>{`
        @keyframes pkgSpin {
          to {
            transform: rotate(360deg);
          }
        }

        .pkg-page {
          display: flex;
          flex-direction: column;
          gap: 18px;
          min-width: 0;
        }

        .pkg-hero {
          position: relative;
          overflow: hidden;
          border-radius: 28px;
          border: 1px solid #eadfce;
          background:
            radial-gradient(circle at 12% 20%, rgba(212,145,30,.28), transparent 32%),
            linear-gradient(135deg, #1a120b 0%, #2b1a0d 58%, #120d07 100%);
          padding: 28px;
          color: #ffffff;
          box-shadow: 0 14px 38px rgba(26,18,11,.16);
        }

        .pkg-hero::after {
          content: "PACK";
          position: absolute;
          right: 26px;
          bottom: -28px;
          font-size: clamp(78px, 12vw, 150px);
          line-height: 1;
          font-weight: 950;
          color: rgba(212,145,30,.08);
          pointer-events: none;
        }

        .pkg-hero-content {
          position: relative;
          z-index: 1;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 22px;
          flex-wrap: wrap;
        }

        .pkg-kicker {
          margin: 0 0 9px;
          color: #d4911e;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: .18em;
          text-transform: uppercase;
        }

        .pkg-title {
          margin: 0;
          font-size: clamp(27px, 3.5vw, 44px);
          font-weight: 950;
          line-height: 1.05;
          color: #ffffff;
        }

        .pkg-title span {
          color: #d4911e;
          font-style: italic;
        }

        .pkg-subtitle {
          margin: 10px 0 0;
          max-width: 760px;
          color: rgba(255,255,255,.68);
          font-size: 14px;
          line-height: 1.75;
        }

        .pkg-hero-card {
          min-width: 245px;
          border-radius: 20px;
          border: 1px solid rgba(212,145,30,.28);
          background: rgba(255,255,255,.07);
          padding: 16px;
          backdrop-filter: blur(12px);
        }

        .pkg-hero-card strong {
          display: block;
          color: #ffffff;
          font-size: 26px;
          font-weight: 950;
          line-height: 1;
          margin-bottom: 7px;
        }

        .pkg-hero-card span {
          color: rgba(255,255,255,.58);
          font-size: 13px;
          line-height: 1.45;
        }

        .pkg-toolbar {
          display: grid;
          grid-template-columns: minmax(260px, 1fr) 165px 150px auto auto;
          gap: 10px;
          align-items: center;
          background: rgba(255,255,255,.94);
          border: 1px solid #eadfce;
          border-radius: 20px;
          padding: 12px;
          box-shadow: 0 7px 22px rgba(26,18,11,.05);
        }

        .pkg-search,
        .pkg-select {
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

        .pkg-search:focus,
        .pkg-select:focus {
          border-color: #c8841a;
          box-shadow: 0 0 0 4px rgba(200,132,26,.12);
          background: #ffffff;
        }

        .pkg-refresh,
        .pkg-add {
          height: 42px;
          border-radius: 999px;
          padding: 0 16px;
          font-size: 13px;
          font-weight: 900;
          cursor: pointer;
          white-space: nowrap;
        }

        .pkg-refresh {
          border: none;
          background: #1a120b;
          color: #ffffff;
        }

        .pkg-add {
          border: none;
          background: linear-gradient(135deg, #d4911e, #b87318);
          color: #ffffff;
          box-shadow: 0 9px 22px rgba(200,132,26,.24);
        }

        .pkg-stats {
          display: grid;
          grid-template-columns: repeat(5, minmax(135px, 1fr));
          gap: 12px;
        }

        .pkg-stat-card {
          background: rgba(255,255,255,.94);
          border: 1px solid #eadfce;
          border-radius: 18px;
          padding: 15px;
          box-shadow: 0 7px 22px rgba(26,18,11,.05);
        }

        .pkg-stat-label {
          margin: 0 0 10px;
          color: #7a6a52;
          font-size: 11px;
          font-weight: 800;
        }

        .pkg-stat-value {
          margin: 0;
          color: #1a120b;
          font-size: 23px;
          font-weight: 950;
          line-height: 1;
        }

        .pkg-insights {
          display: grid;
          grid-template-columns: minmax(0, 1.25fr) minmax(280px, .75fr);
          gap: 14px;
        }

        .pkg-panel {
          background: rgba(255,255,255,.94);
          border: 1px solid #eadfce;
          border-radius: 20px;
          padding: 18px;
          box-shadow: 0 7px 22px rgba(26,18,11,.05);
          min-width: 0;
        }

        .pkg-panel-title {
          margin: 0;
          color: #1a120b;
          font-size: 17px;
          font-weight: 950;
        }

        .pkg-panel-text {
          margin: 5px 0 15px;
          color: #7a6a52;
          font-size: 12.5px;
          line-height: 1.45;
        }

        .pkg-category-list,
        .pkg-price-list {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
        }

        .pkg-mini-card {
          border: 1px solid #f3eadc;
          background: #fffaf2;
          border-radius: 15px;
          padding: 12px;
          min-width: 0;
        }

        .pkg-mini-top {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          margin-bottom: 8px;
          color: #1a120b;
          font-size: 12px;
          font-weight: 850;
        }

        .pkg-mini-track {
          height: 9px;
          border-radius: 999px;
          background: #f1dfc5;
          overflow: hidden;
        }

        .pkg-mini-fill {
          height: 100%;
          border-radius: 999px;
          background: linear-gradient(135deg, #d4911e, #b87318);
        }

        .pkg-error {
          padding: 13px 16px;
          border-radius: 16px;
          border: 1px solid #fecaca;
          background: #fef2f2;
          color: #991b1b;
          font-size: 14px;
          font-weight: 750;
        }

        .pkg-form-card,
        .pkg-list-card {
          background: rgba(255,255,255,.94);
          border: 1px solid #eadfce;
          border-radius: 20px;
          box-shadow: 0 8px 24px rgba(26,18,11,.06);
          overflow: hidden;
        }

        .pkg-form-head,
        .pkg-list-head {
          padding: 17px 18px;
          border-bottom: 1px solid #f0e4d2;
          background: linear-gradient(135deg, #fffdf8, #ffffff);
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
          flex-wrap: wrap;
        }

        .pkg-form-title,
        .pkg-list-title {
          margin: 0;
          color: #1a120b;
          font-size: 18px;
          font-weight: 950;
        }

        .pkg-form-text,
        .pkg-list-text {
          margin: 5px 0 0;
          color: #7a6a52;
          font-size: 12px;
          line-height: 1.45;
        }

        .pkg-cancel {
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

        .pkg-form {
          padding: 18px;
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 12px;
        }

        .pkg-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .pkg-field-wide {
          grid-column: span 2;
        }

        .pkg-field-full {
          grid-column: 1 / -1;
        }

        .pkg-label {
          color: #6b5a45;
          font-size: 11px;
          font-weight: 850;
          letter-spacing: .06em;
          text-transform: uppercase;
        }

        .pkg-input,
        .pkg-select-input,
        .pkg-textarea {
          width: 100%;
          border-radius: 12px;
          border: 1.5px solid #eadfce;
          background: #fffdf8;
          color: #1a120b;
          font-size: 13px;
          outline: none;
        }

        .pkg-input,
        .pkg-select-input {
          height: 40px;
          padding: 0 12px;
        }

        .pkg-textarea {
          min-height: 76px;
          padding: 11px 12px;
          resize: vertical;
          line-height: 1.5;
        }

        .pkg-input:focus,
        .pkg-select-input:focus,
        .pkg-textarea:focus {
          border-color: #c8841a;
          box-shadow: 0 0 0 4px rgba(200,132,26,.12);
          background: #ffffff;
        }

        .pkg-check,
        .pkg-submit {
          grid-column: span 2;
        }

        .pkg-check {
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

        .pkg-check input {
          accent-color: #c8841a;
        }

        .pkg-submit {
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

        .pkg-submit:disabled {
          opacity: .7;
          cursor: not-allowed;
        }

        .pkg-loading,
        .pkg-empty {
          padding: 44px 18px;
          text-align: center;
          color: #7a6a52;
          font-size: 14px;
        }

        .pkg-spinner {
          width: 32px;
          height: 32px;
          margin: 0 auto 12px;
          border-radius: 50%;
          border: 3px solid #eadfce;
          border-top-color: #c8841a;
          animation: pkgSpin .75s linear infinite;
        }

        .pkg-grid {
          padding: 16px;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 14px;
        }

        .pkg-card {
          border: 1px solid #eadfce;
          border-radius: 18px;
          background: #ffffff;
          overflow: hidden;
          box-shadow: 0 4px 14px rgba(26,18,11,.04);
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        .pkg-card-top {
          position: relative;
          min-height: 120px;
          padding: 15px;
          background:
            radial-gradient(circle at top left, rgba(212,145,30,.2), transparent 45%),
            linear-gradient(135deg, #fffaf2, #ffffff);
          border-bottom: 1px solid #f3eadc;
        }

        .pkg-card-badges {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 10px;
          margin-bottom: 16px;
        }

        .pkg-category-badge,
        .pkg-status {
          min-height: 25px;
          padding: 6px 10px;
          border-radius: 999px;
          font-size: 10px;
          font-weight: 950;
          white-space: nowrap;
        }

        .pkg-category-badge {
          background: rgba(154,93,10,.88);
          color: #ffffff;
        }

        .pkg-status-active {
          background: #ecfdf5;
          color: #047857;
        }

        .pkg-status-inactive {
          background: #fef2f2;
          color: #991b1b;
        }

        .pkg-card-title {
          margin: 0;
          color: #1a120b;
          font-size: 19px;
          font-weight: 950;
          line-height: 1.14;
        }

        .pkg-card-subtitle {
          margin: 6px 0 0;
          color: #8a7558;
          font-size: 12px;
          font-weight: 800;
          line-height: 1.4;
        }

        .pkg-card-body {
          padding: 13px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          flex: 1;
        }

        .pkg-description {
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

        .pkg-info {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
        }

        .pkg-info-box {
          border-radius: 12px;
          background: #fffaf2;
          border: 1px solid #f3eadc;
          padding: 8px;
          min-width: 0;
        }

        .pkg-info-label {
          display: block;
          color: #8a7558;
          font-size: 9px;
          font-weight: 900;
          letter-spacing: .08em;
          text-transform: uppercase;
          margin-bottom: 3px;
        }

        .pkg-info-value {
          color: #1a120b;
          font-size: 12px;
          font-weight: 850;
          word-break: break-word;
        }

        .pkg-includes {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: auto;
        }

        .pkg-include {
          min-height: 25px;
          padding: 6px 9px;
          border-radius: 999px;
          background: #fff7e8;
          color: #9a5d0a;
          border: 1px solid #f1d5a3;
          font-size: 10px;
          font-weight: 900;
        }

        .pkg-actions {
          display: flex;
          gap: 6px;
          padding-top: 2px;
        }

        .pkg-action-btn {
          flex: 1;
          height: 34px;
          border-radius: 10px;
          font-size: 12px;
          font-weight: 850;
          cursor: pointer;
        }

        .pkg-edit-btn {
          border: 1.5px solid #f1d5a3;
          background: #fff7e8;
          color: #9a5d0a;
        }

        .pkg-delete-btn {
          border: 1.5px solid #fecaca;
          background: #fef2f2;
          color: #991b1b;
        }

        @media (max-width: 1180px) {
          .pkg-toolbar {
            grid-template-columns: 1fr 1fr;
          }

          .pkg-stats {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .pkg-insights {
            grid-template-columns: 1fr;
          }

          .pkg-form {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 720px) {
          .pkg-hero {
            padding: 22px;
            border-radius: 22px;
          }

          .pkg-toolbar {
            grid-template-columns: 1fr;
          }

          .pkg-stats {
            grid-template-columns: 1fr;
          }

          .pkg-category-list,
          .pkg-price-list {
            grid-template-columns: 1fr;
          }

          .pkg-form {
            grid-template-columns: 1fr;
          }

          .pkg-field-wide,
          .pkg-field-full,
          .pkg-check,
          .pkg-submit {
            grid-column: 1 / -1;
          }

          .pkg-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 520px) {
          .pkg-info {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <section className="pkg-page">
        <div className="pkg-hero">
          <div className="pkg-hero-content">
            <div>
              <p className="pkg-kicker">Menaxhimi i paketave</p>
              <h1 className="pkg-title">
                Paketat që e bëjnë eventin <span>më të plotë</span>
              </h1>
              <p className="pkg-subtitle">
                Këtu admini menaxhon paketat kryesore të MD Creative: çmimet, kategoritë,
                kohëzgjatjen, numrin e maskotave dhe statusin aktiv për secilën ofertë.
              </p>
            </div>

            <div className="pkg-hero-card">
              <strong>{stats.total} paketa</strong>
              <span>
                {stats.active} aktive, {stats.inactive} jo aktive dhe çmim mesatar {formatMoney(stats.avgPrice)}.
              </span>
            </div>
          </div>
        </div>

        <div className="pkg-toolbar">
          <input
            type="text"
            className="pkg-search"
            placeholder="Kërko sipas titullit, përshkrimit ose kategorisë..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <select
            className="pkg-select"
            value={categoryFilter}
            onChange={(event) => setCategoryFilter(event.target.value as PackageFilter)}
          >
            <option value="all">Të gjitha kategoritë</option>
            <option value="mascot">Maskota</option>
            <option value="bounce-house">Bounce House</option>
            <option value="bubble-bounce">Bubble & Bounce</option>
          </select>

          <select
            className="pkg-select"
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value as StatusFilter)}
          >
            <option value="all">Të gjitha</option>
            <option value="active">Aktive</option>
            <option value="inactive">Jo aktive</option>
          </select>

          <button type="button" className="pkg-refresh" onClick={() => loadPackages(search)}>
            Rifresko
          </button>

          <button type="button" className="pkg-add" onClick={openCreateForm}>
            + Shto paketë
          </button>
        </div>

        <div className="pkg-stats">
          {[
            { label: 'Totali i paketave', value: stats.total },
            { label: 'Paketa aktive', value: stats.active },
            { label: 'Paketa jo aktive', value: stats.inactive },
            { label: 'Vlera totale', value: formatMoney(stats.totalValue) },
            { label: 'Çmimi mesatar', value: formatMoney(stats.avgPrice) },
          ].map((item) => (
            <div key={item.label} className="pkg-stat-card">
              <p className="pkg-stat-label">{item.label}</p>
              <p className="pkg-stat-value">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="pkg-insights">
          <div className="pkg-panel">
            <h2 className="pkg-panel-title">Ndarja sipas kategorive</h2>
            <p className="pkg-panel-text">
              Këto kategori ndihmojnë adminin të kuptojë se çfarë lloj paketash janë më të përfaqësuara në sistem.
            </p>

            <div className="pkg-category-list">
              {categoryChart.map((item) => (
                <div key={item.key} className="pkg-mini-card">
                  <div className="pkg-mini-top">
                    <span>{item.label}</span>
                    <strong>{item.count}</strong>
                  </div>

                  <div className="pkg-mini-track">
                    <div
                      className="pkg-mini-fill"
                      style={{ width: `${Math.max(8, (item.count / maxCategoryCount) * 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pkg-panel">
            <h2 className="pkg-panel-title">Niveli i çmimeve</h2>
            <p className="pkg-panel-text">
              Grupim i shpejtë për të parë a dominojnë paketat bazike, mesatare apo premium.
            </p>

            <div className="pkg-price-list">
              {priceGroups.map((item) => (
                <div key={item.label} className="pkg-mini-card">
                  <div className="pkg-mini-top">
                    <span>{item.label}</span>
                    <strong>{item.count}</strong>
                  </div>

                  <div className="pkg-mini-track">
                    <div
                      className="pkg-mini-fill"
                      style={{ width: `${Math.max(8, (item.count / maxPriceGroup) * 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {error && <div className="pkg-error">{error}</div>}

        {showForm && (
          <div className="pkg-form-card">
            <div className="pkg-form-head">
              <div>
                <h2 className="pkg-form-title">{editingId ? 'Përditëso paketën' : 'Shto paketë të re'}</h2>
                <p className="pkg-form-text">
                  Plotëso të dhënat kryesore që përcaktojnë ofertën, çmimin dhe përdorimin e paketës.
                </p>
              </div>

              <button type="button" className="pkg-cancel" onClick={resetForm}>
                Anulo
              </button>
            </div>

            <form onSubmit={handleSubmit} className="pkg-form">
              <div className="pkg-field pkg-field-wide">
                <label className="pkg-label">Titulli</label>
                <input
                  type="text"
                  className="pkg-input"
                  value={form.title}
                  onChange={(event) => handleChange('title', event.target.value)}
                  placeholder="Premium Party"
                  required
                />
              </div>

              <div className="pkg-field pkg-field-wide">
                <label className="pkg-label">Kategoria</label>
                <select
                  className="pkg-select-input"
                  value={form.category}
                  onChange={(event) => handleChange('category', event.target.value)}
                >
                  <option value="mascot">Maskota</option>
                  <option value="bounce-house">Bounce House</option>
                  <option value="bubble-bounce">Bubble & Bounce</option>
                </select>
              </div>

              <div className="pkg-field pkg-field-full">
                <label className="pkg-label">Përshkrimi</label>
                <textarea
                  className="pkg-textarea"
                  value={form.description}
                  onChange={(event) => handleChange('description', event.target.value)}
                  placeholder="Shkruaj përshkrimin e paketës..."
                />
              </div>

              <div className="pkg-field">
                <label className="pkg-label">Kohëzgjatja</label>
                <input
                  type="number"
                  className="pkg-input"
                  value={form.duration_minutes}
                  onChange={(event) => handleChange('duration_minutes', Number(event.target.value))}
                  min={0}
                />
              </div>

              <div className="pkg-field">
                <label className="pkg-label">Çmimi bazë</label>
                <input
                  type="number"
                  className="pkg-input"
                  value={form.base_price}
                  onChange={(event) => handleChange('base_price', Number(event.target.value))}
                  min={0}
                />
              </div>

              <div className="pkg-field">
                <label className="pkg-label">Min. maskota</label>
                <input
                  type="number"
                  className="pkg-input"
                  value={form.min_mascots}
                  onChange={(event) => handleChange('min_mascots', Number(event.target.value))}
                  min={0}
                />
              </div>

              <div className="pkg-field">
                <label className="pkg-label">Max. maskota</label>
                <input
                  type="number"
                  className="pkg-input"
                  value={form.max_mascots}
                  onChange={(event) => handleChange('max_mascots', Number(event.target.value))}
                  min={0}
                />
              </div>

              <label className="pkg-check">
                <input
                  type="checkbox"
                  checked={form.is_active}
                  onChange={(event) => handleChange('is_active', event.target.checked)}
                />
                Paketa është aktive
              </label>

              <button type="submit" className="pkg-submit" disabled={submitting}>
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
        )}

        <div className="pkg-list-card">
          <div className="pkg-list-head">
            <div>
              <h2 className="pkg-list-title">Lista e paketave</h2>
              <p className="pkg-list-text">
                Këto janë paketat që ruhen në sistem dhe mund të përdoren për ofertat e eventeve.
              </p>
            </div>
          </div>

          {loading ? (
            <div className="pkg-loading">
              <div className="pkg-spinner" />
              Duke u ngarkuar paketat...
            </div>
          ) : filteredPackages.length === 0 ? (
            <div className="pkg-empty">Nuk u gjet asnjë paketë me këto filtra.</div>
          ) : (
            <div className="pkg-grid">
              {filteredPackages.map((item) => (
                <article key={item.id} className="pkg-card">
                  <div className="pkg-card-top">
                    <div className="pkg-card-badges">
                      <span className="pkg-category-badge">
                        {categoryLabels[item.category] || item.category}
                      </span>

                      <span className={`pkg-status ${item.is_active ? 'pkg-status-active' : 'pkg-status-inactive'}`}>
                        {item.is_active ? 'Aktive' : 'Jo aktive'}
                      </span>
                    </div>

                    <h3 className="pkg-card-title">{item.title}</h3>
                    <p className="pkg-card-subtitle">
                      {categoryDescriptions[item.category] || 'Paketë e personalizuar për evente.'}
                    </p>
                  </div>

                  <div className="pkg-card-body">
                    <p className="pkg-description">
                      {item.description || 'Nuk ka përshkrim për këtë paketë.'}
                    </p>

                    <div className="pkg-info">
                      <div className="pkg-info-box">
                        <span className="pkg-info-label">Çmimi</span>
                        <span className="pkg-info-value">{formatMoney(item.base_price)}</span>
                      </div>

                      <div className="pkg-info-box">
                        <span className="pkg-info-label">Koha</span>
                        <span className="pkg-info-value">{formatDuration(item.duration_minutes)}</span>
                      </div>

                      <div className="pkg-info-box">
                        <span className="pkg-info-label">Maskota</span>
                        <span className="pkg-info-value">
                          {item.min_mascots} - {item.max_mascots}
                        </span>
                      </div>
                    </div>

                    <div className="pkg-includes">
                      <span className="pkg-include">{getCategoryTone(item.category)}</span>

                      {getPackageIncludes(item).map((extra) => (
                        <span key={extra} className="pkg-include">
                          {extra}
                        </span>
                      ))}
                    </div>

                    <div className="pkg-actions">
                      <button type="button" className="pkg-action-btn pkg-edit-btn" onClick={() => handleEdit(item)}>
                        Edito
                      </button>

                      <button
                        type="button"
                        className="pkg-action-btn pkg-delete-btn"
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
      </section>
    </>
  );
}