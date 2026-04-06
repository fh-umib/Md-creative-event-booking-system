import { useEffect, useMemo, useState } from 'react';
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

const revenueTrend = [
  { month: 'Jan', value: 2400 },
  { month: 'Feb', value: 3200 },
  { month: 'Mar', value: 4800 },
  { month: 'Apr', value: 3900 },
  { month: 'May', value: 5200 },
  { month: 'Jun', value: 6100 },
];


function formatDuration(minutes: number) {
  if (minutes < 60) return `${minutes} min`;
  const hours = minutes / 60;
  return `${hours % 1 === 0 ? hours : hours.toFixed(1)} hours`;
}

function getPackageIncludes(item: AdminPackage): string[] {
  if (item.extras?.length) return item.extras;

  if (item.category === 'mascot') {
    return ['Mascot', 'Music', 'Basic Decorations'];
  }

  if (item.category === 'bounce-house') {
    return ['Bounce House', 'Assistant', 'Setup'];
  }

  if (item.category === 'bubble-bounce') {
    return ['Bubble Setup', 'Balloons', 'Premium Decor'];
  }

  return ['Custom Package'];
}

export default function PackagesPage() {
  const [packages, setPackages] = useState<AdminPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search] = useState('');
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
      setError(err instanceof Error ? err.message : 'Failed to load packages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPackages();
  }, []);

  const filteredPackages = useMemo(() => {
    return packages.filter((item) => {
      const text =
        `${item.title} ${item.description || ''} ${item.category}`.toLowerCase();
      return text.includes(search.toLowerCase());
    });
  }, [packages, search]);

  const stats = useMemo(() => {
    const totalPackages = filteredPackages.length;
    const activePackages = filteredPackages.filter((item) => item.is_active).length;
    const totalRevenue = filteredPackages.reduce(
      (sum, item) => sum + Number(item.base_price || 0),
      0
    );
    const avgPrice = totalPackages ? totalRevenue / totalPackages : 0;

    return {
      totalPackages,
      activePackages,
      totalRevenue,
      avgPrice,
    };
  }, [filteredPackages]);

  const featuredPackages = useMemo(() => {
    return [...filteredPackages].sort(
      (a, b) => Number(b.base_price) - Number(a.base_price)
    );
  }, [filteredPackages]);

  const maxTrendValue = Math.max(...revenueTrend.map((item) => item.value));

  const handleChange = (
    key: keyof AdminPackagePayload,
    value: string | number | boolean
  ) => {
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

  const handleEdit = (item: AdminPackage) => {
    setEditingId(item.id);
    setForm({
      title: item.title,
      description: item.description || '',
      category: item.category,
      duration_minutes: item.duration_minutes,
      min_mascots: item.min_mascots,
      max_mascots: item.max_mascots,
      base_price: Number(item.base_price),
      is_active: item.is_active,
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updatePackage(editingId, form);
      } else {
        await createPackage(form);
      }

      await loadPackages(search);
      resetForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Request failed');
    }
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this package?'
    );
    if (!confirmed) return;

    try {
      await deletePackage(id);
      await loadPackages(search);

      if (editingId === id) {
        resetForm();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed');
    }
  };

  return (
    <section style={pageStyle}>
      <div style={headerStyle}>
        <div>
          <h1 style={titleStyle}>Packages</h1>
          <p style={subtitleStyle}>Manage event packages and pricing</p>
        </div>

        <button
          type="button"
          style={addButtonStyle}
          onClick={() => {
            setEditingId(null);
            setForm(initialForm);
            setShowForm((prev) => !prev);
          }}
        >
          + Add Package
        </button>
      </div>

      {error ? <div style={errorBoxStyle}>{error}</div> : null}

      {showForm ? (
        <div style={formCardStyle}>
          <div style={formHeaderStyle}>
            <h2 style={formTitleStyle}>
              {editingId ? 'Edit Package' : 'Add Package'}
            </h2>

            <button type="button" style={cancelButtonStyle} onClick={resetForm}>
              Cancel
            </button>
          </div>

          <form onSubmit={handleSubmit} style={formGridStyle}>
            <div style={fieldStyle}>
              <label style={labelStyle}>Title</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => handleChange('title', e.target.value)}
                style={inputStyle}
                required
              />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Category</label>
              <select
                value={form.category}
                onChange={(e) => handleChange('category', e.target.value)}
                style={inputStyle}
              >
                <option value="mascot">Mascot</option>
                <option value="bounce-house">Bounce House</option>
                <option value="bubble-bounce">Bubble &amp; Bounce</option>
              </select>
            </div>

            <div style={{ ...fieldStyle, gridColumn: '1 / -1' }}>
              <label style={labelStyle}>Description</label>
              <textarea
                value={form.description}
                onChange={(e) => handleChange('description', e.target.value)}
                style={textareaStyle}
              />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Duration (minutes)</label>
              <input
                type="number"
                value={form.duration_minutes}
                onChange={(e) =>
                  handleChange('duration_minutes', Number(e.target.value))
                }
                style={inputStyle}
              />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Base Price (€)</label>
              <input
                type="number"
                value={form.base_price}
                onChange={(e) => handleChange('base_price', Number(e.target.value))}
                style={inputStyle}
              />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Min Mascots</label>
              <input
                type="number"
                value={form.min_mascots}
                onChange={(e) => handleChange('min_mascots', Number(e.target.value))}
                style={inputStyle}
              />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Max Mascots</label>
              <input
                type="number"
                value={form.max_mascots}
                onChange={(e) => handleChange('max_mascots', Number(e.target.value))}
                style={inputStyle}
              />
            </div>

            <label style={checkboxLabelStyle}>
              <input
                type="checkbox"
                checked={form.is_active}
                onChange={(e) => handleChange('is_active', e.target.checked)}
              />
              Active Package
            </label>

            <div style={submitWrapStyle}>
              <button type="submit" style={submitButtonStyle}>
                {editingId ? 'Update Package' : 'Create Package'}
              </button>
            </div>
          </form>
        </div>
      ) : null}

      <div style={topSectionStyle}>
        <div style={statsGridStyle}>
          <div style={statCardStyle}>
            <div style={{ ...statIconStyle, backgroundColor: '#fff2e7', color: '#f97316' }}>
              📦
            </div>
            <div style={statValueStyle}>{stats.totalPackages}</div>
            <div style={statLabelStyle}>Total Packages</div>
          </div>

          <div style={statCardStyle}>
            <div style={{ ...statIconStyle, backgroundColor: '#fff6dc', color: '#f59e0b' }}>
              ⭐
            </div>
            <div style={statValueStyle}>4.5</div>
            <div style={statLabelStyle}>Avg Rating</div>
          </div>

          <div style={statCardStyle}>
            <div style={{ ...statIconStyle, backgroundColor: '#eaf2ff', color: '#3b82f6' }}>
              👥
            </div>
            <div style={statValueStyle}>{stats.activePackages}</div>
            <div style={statLabelStyle}>Active Packages</div>
          </div>

          <div style={statCardStyle}>
            <div style={{ ...statIconStyle, backgroundColor: '#e8faef', color: '#22c55e' }}>
              $
            </div>
            <div style={statValueStyle}>€{stats.totalRevenue.toFixed(1)}</div>
            <div style={statLabelStyle}>Total Revenue</div>
          </div>
        </div>

        <div style={chartCardStyle}>
          <h3 style={chartTitleStyle}>Package Revenue Trend</h3>
          <p style={chartSubtitleStyle}>Monthly package revenue (€)</p>

          <div style={chartStyle}>
            {revenueTrend.map((item) => (
              <div key={item.month} style={chartBarWrapStyle}>
                <div style={chartColumnStyle}>
                  <div
                    style={{
                      ...chartBarStyle,
                      height: `${(item.value / maxTrendValue) * 150}px`,
                    }}
                    title={`Revenue: €${item.value.toLocaleString()}`}
                  />
                </div>
                <span style={chartLabelStyle}>{item.month}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={cardsGridStyle}>
        {loading ? (
          <div style={emptyStateStyle}>Loading packages...</div>
        ) : featuredPackages.length === 0 ? (
          <div style={emptyStateStyle}>No packages found.</div>
        ) : (
          featuredPackages.map((item, index) => {
            const includes = getPackageIncludes(item);
            const popular = index < 2;

            return (
              <article key={item.id} style={packageCardStyle}>
                {popular ? <div style={popularBadgeStyle}>↗ MOST POPULAR</div> : null}

                <div style={packageTopStyle}>
                  <div>
                    <h3 style={packageTitleStyle}>{item.title}</h3>
                    <p style={packageDescStyle}>
                      {item.description || 'No description added yet for this package.'}
                    </p>
                  </div>

                  <div style={priceSideStyle}>
                    <div style={packagePriceStyle}>€{item.base_price}</div>
                    <div style={packageDurationStyle}>
                      {formatDuration(item.duration_minutes)}
                    </div>
                  </div>
                </div>

                <div style={metaRowStyle}>
                  <span style={metaTextStyle}>⭐ 4.{(item.id % 5) + 2}</span>
                  <span style={metaTextStyle}>
                    👥 {(item.max_mascots + 1) * 7} bookings
                  </span>
                  <span style={trendStyle}>↗ +{(item.id % 4) * 4 + 8}%</span>
                </div>

                <div style={includesTitleStyle}>INCLUDES</div>

                <div style={includesWrapStyle}>
                  {includes.map((extra) => (
                    <span key={extra} style={includeTagStyle}>
                      {extra}
                    </span>
                  ))}
                </div>

                <div style={footerRowStyle}>
                  <span style={revenueStyle}>
                    €{(Number(item.base_price) * ((item.id % 3) + 9)).toLocaleString()} revenue
                  </span>

                  <div style={actionsWrapStyle}>
                    <button
                      type="button"
                      style={iconButtonStyle}
                      onClick={() => handleEdit(item)}
                    >
                      ✎
                    </button>
                    <button
                      type="button"
                      style={iconButtonStyle}
                      onClick={() => handleDelete(item.id)}
                    >
                      🗑
                    </button>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>

      <div style={bottomInfoStyle}>
        Average package value: <strong>€{stats.avgPrice.toFixed(2)}</strong>
      </div>
    </section>
  );
}

const pageStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '22px',
};

const headerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '16px',
  flexWrap: 'wrap',
};

const titleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: '42px',
  fontWeight: 800,
  color: '#2b2b2b',
  fontFamily: 'Georgia, serif',
};

const subtitleStyle: React.CSSProperties = {
  margin: '6px 0 0',
  color: '#6b7280',
  fontSize: '16px',
};

const addButtonStyle: React.CSSProperties = {
  border: 'none',
  borderRadius: '16px',
  padding: '14px 22px',
  background: 'linear-gradient(135deg, #f59e0b, #ec4899)',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: 700,
  cursor: 'pointer',
};

const errorBoxStyle: React.CSSProperties = {
  backgroundColor: '#fff1f1',
  color: '#a33b3b',
  border: '1px solid #f2caca',
  borderRadius: '16px',
  padding: '14px 16px',
  fontSize: '14px',
  fontWeight: 600,
};

const formCardStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  borderRadius: '24px',
  border: '1px solid #ece7df',
  padding: '24px',
  boxShadow: '0 10px 24px rgba(15, 23, 42, 0.04)',
};

const formHeaderStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '12px',
  marginBottom: '18px',
};

const formTitleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: '24px',
  fontWeight: 800,
  color: '#1f2937',
};

const cancelButtonStyle: React.CSSProperties = {
  border: '1px solid #e2d6c2',
  backgroundColor: '#fffaf2',
  color: '#1f2937',
  borderRadius: '999px',
  padding: '10px 16px',
  fontSize: '13px',
  fontWeight: 700,
  cursor: 'pointer',
};

const formGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '16px',
};

const fieldStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
};

const labelStyle: React.CSSProperties = {
  fontSize: '14px',
  fontWeight: 700,
  color: '#1f2937',
};

const inputStyle: React.CSSProperties = {
  height: '46px',
  borderRadius: '14px',
  border: '1px solid #e5dccf',
  padding: '0 14px',
  fontSize: '14px',
  outline: 'none',
};

const textareaStyle: React.CSSProperties = {
  minHeight: '100px',
  borderRadius: '14px',
  border: '1px solid #e5dccf',
  padding: '12px 14px',
  fontSize: '14px',
  outline: 'none',
  resize: 'vertical',
};

const checkboxLabelStyle: React.CSSProperties = {
  gridColumn: '1 / -1',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  fontSize: '14px',
  fontWeight: 600,
  color: '#1f2937',
};

const submitWrapStyle: React.CSSProperties = {
  gridColumn: '1 / -1',
};

const submitButtonStyle: React.CSSProperties = {
  height: '48px',
  border: 'none',
  borderRadius: '14px',
  background: 'linear-gradient(135deg, #f59e0b, #ec4899)',
  color: '#ffffff',
  fontSize: '15px',
  fontWeight: 800,
  cursor: 'pointer',
  padding: '0 24px',
};

const topSectionStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '420px 1fr',
  gap: '20px',
};

const statsGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '18px',
};

const statCardStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  border: '1px solid #ece7df',
  borderRadius: '22px',
  padding: '22px 18px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '150px',
  boxShadow: '0 10px 24px rgba(15, 23, 42, 0.04)',
};

const statIconStyle: React.CSSProperties = {
  width: '52px',
  height: '52px',
  borderRadius: '18px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '24px',
  marginBottom: '14px',
  fontWeight: 800,
};

const statValueStyle: React.CSSProperties = {
  fontSize: '22px',
  fontWeight: 800,
  color: '#1f2937',
  marginBottom: '4px',
};

const statLabelStyle: React.CSSProperties = {
  fontSize: '14px',
  color: '#6b7280',
};

const chartCardStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  border: '1px solid #ece7df',
  borderRadius: '22px',
  padding: '22px',
  boxShadow: '0 10px 24px rgba(15, 23, 42, 0.04)',
};

const chartTitleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: '18px',
  fontWeight: 800,
  color: '#2d2a26',
  fontFamily: 'Georgia, serif',
};

const chartSubtitleStyle: React.CSSProperties = {
  margin: '8px 0 18px',
  color: '#6b7280',
  fontSize: '14px',
};

const chartStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'space-between',
  gap: '20px',
  minHeight: '210px',
};

const chartBarWrapStyle: React.CSSProperties = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '10px',
};

const chartColumnStyle: React.CSSProperties = {
  width: '100%',
  maxWidth: '58px',
  height: '160px',
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'center',
};

const chartBarStyle: React.CSSProperties = {
  width: '100%',
  borderRadius: '10px 10px 0 0',
  backgroundColor: '#f48b10',
};

const chartLabelStyle: React.CSSProperties = {
  fontSize: '14px',
  color: '#6b7280',
  fontWeight: 600,
};

const cardsGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
  gap: '20px',
};

const emptyStateStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  borderRadius: '24px',
  padding: '32px',
  textAlign: 'center',
  color: '#6b7280',
  border: '1px solid #ece7df',
};

const packageCardStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  borderRadius: '24px',
  border: '1px solid #ece7df',
  boxShadow: '0 10px 24px rgba(15, 23, 42, 0.04)',
  overflow: 'hidden',
  padding: '0 22px 22px',
};

const popularBadgeStyle: React.CSSProperties = {
  margin: '0 -22px 18px',
  padding: '10px 16px',
  background: 'linear-gradient(135deg, #f59e0b, #ec4899)',
  color: '#ffffff',
  fontSize: '13px',
  fontWeight: 800,
  letterSpacing: '0.5px',
};

const packageTopStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: '16px',
  alignItems: 'flex-start',
};

const packageTitleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: '20px',
  fontWeight: 800,
  color: '#2d2a26',
  fontFamily: 'Georgia, serif',
};

const packageDescStyle: React.CSSProperties = {
  margin: '10px 0 0',
  color: '#6b7280',
  fontSize: '15px',
  lineHeight: 1.6,
  minHeight: '74px',
};

const priceSideStyle: React.CSSProperties = {
  minWidth: '95px',
  textAlign: 'right',
};

const packagePriceStyle: React.CSSProperties = {
  color: '#ea7b12',
  fontWeight: 800,
  fontSize: '20px',
};

const packageDurationStyle: React.CSSProperties = {
  marginTop: '4px',
  color: '#6b7280',
  fontSize: '13px',
};

const metaRowStyle: React.CSSProperties = {
  marginTop: '14px',
  display: 'flex',
  gap: '14px',
  flexWrap: 'wrap',
};

const metaTextStyle: React.CSSProperties = {
  color: '#4b5563',
  fontSize: '14px',
};

const trendStyle: React.CSSProperties = {
  color: '#22c55e',
  fontSize: '14px',
  fontWeight: 700,
};

const includesTitleStyle: React.CSSProperties = {
  marginTop: '18px',
  marginBottom: '10px',
  fontSize: '12px',
  color: '#6b7280',
  fontWeight: 800,
  letterSpacing: '1.1px',
};

const includesWrapStyle: React.CSSProperties = {
  display: 'flex',
  gap: '10px',
  flexWrap: 'wrap',
  minHeight: '56px',
};

const includeTagStyle: React.CSSProperties = {
  padding: '8px 12px',
  borderRadius: '999px',
  backgroundColor: '#f7f4ef',
  color: '#2f2f2f',
  fontSize: '13px',
  fontWeight: 700,
  border: '1px solid #efe8dd',
};

const footerRowStyle: React.CSSProperties = {
  marginTop: '18px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '12px',
};

const revenueStyle: React.CSSProperties = {
  color: '#ea7b12',
  fontSize: '14px',
  fontWeight: 700,
};

const actionsWrapStyle: React.CSSProperties = {
  display: 'flex',
  gap: '8px',
};

const iconButtonStyle: React.CSSProperties = {
  width: '36px',
  height: '36px',
  borderRadius: '10px',
  border: '1px solid #ece7df',
  backgroundColor: '#ffffff',
  cursor: 'pointer',
};

const bottomInfoStyle: React.CSSProperties = {
  color: '#6b7280',
  fontSize: '14px',
};