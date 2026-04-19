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
      setError('');

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
      setError('');
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
          featuredPackages.map((item) => (
            <div key={item.id} style={packageCardStyle}>
              <div style={packageTopRowStyle}>
                <div>
                  <h3 style={packageTitleStyle}>{item.title}</h3>
                  <p style={packageCategoryStyle}>{item.category}</p>
                </div>

                <div
                  style={{
                    ...statusBadgeStyle,
                    backgroundColor: item.is_active ? '#dcfce7' : '#fee2e2',
                    color: item.is_active ? '#166534' : '#991b1b',
                  }}
                >
                  {item.is_active ? 'Active' : 'Inactive'}
                </div>
              </div>

              <p style={packageDescriptionStyle}>
                {item.description || 'No description provided.'}
              </p>

              <div style={packageInfoGridStyle}>
                <div style={infoBoxStyle}>
                  <span style={infoLabelStyle}>Duration</span>
                  <strong style={infoValueStyle}>
                    {formatDuration(item.duration_minutes)}
                  </strong>
                </div>

                <div style={infoBoxStyle}>
                  <span style={infoLabelStyle}>Mascots</span>
                  <strong style={infoValueStyle}>
                    {item.min_mascots} - {item.max_mascots}
                  </strong>
                </div>

                <div style={infoBoxStyle}>
                  <span style={infoLabelStyle}>Base Price</span>
                  <strong style={infoValueStyle}>€{item.base_price}</strong>
                </div>
              </div>

              <div style={includesWrapStyle}>
                {getPackageIncludes(item).map((extra) => (
                  <span key={extra} style={includeBadgeStyle}>
                    {extra}
                  </span>
                ))}
              </div>

              <div style={cardActionsStyle}>
                <button
                  type="button"
                  style={editButtonStyle}
                  onClick={() => handleEdit(item)}
                >
                  Edit
                </button>

                <button
                  type="button"
                  style={deleteButtonStyle}
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

const pageStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
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
  fontSize: '30px',
  fontWeight: 800,
  color: '#0f172a',
};

const subtitleStyle: React.CSSProperties = {
  margin: '8px 0 0 0',
  fontSize: '15px',
  color: '#64748b',
};

const addButtonStyle: React.CSSProperties = {
  height: '46px',
  border: 'none',
  borderRadius: '14px',
  padding: '0 18px',
  backgroundColor: '#f59e0b',
  color: '#0f172a',
  fontWeight: 800,
  cursor: 'pointer',
};

const errorBoxStyle: React.CSSProperties = {
  backgroundColor: '#fee2e2',
  color: '#b91c1c',
  padding: '14px 16px',
  borderRadius: '14px',
  fontWeight: 600,
};

const formCardStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  borderRadius: '22px',
  padding: '22px',
  boxShadow: '0 14px 30px rgba(15, 23, 42, 0.06)',
};

const formHeaderStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '18px',
  gap: '12px',
};

const formTitleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: '22px',
  fontWeight: 800,
  color: '#0f172a',
};

const cancelButtonStyle: React.CSSProperties = {
  height: '40px',
  border: 'none',
  borderRadius: '12px',
  padding: '0 14px',
  backgroundColor: '#e2e8f0',
  color: '#0f172a',
  fontWeight: 700,
  cursor: 'pointer',
};

const formGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
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
  color: '#334155',
};

const inputStyle: React.CSSProperties = {
  height: '48px',
  borderRadius: '14px',
  border: '1px solid #dbe2ea',
  padding: '0 14px',
  fontSize: '14px',
  outline: 'none',
};

const textareaStyle: React.CSSProperties = {
  minHeight: '110px',
  borderRadius: '14px',
  border: '1px solid #dbe2ea',
  padding: '12px 14px',
  fontSize: '14px',
  resize: 'vertical',
  outline: 'none',
};

const checkboxLabelStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  fontSize: '14px',
  fontWeight: 700,
  color: '#334155',
};

const submitWrapStyle: React.CSSProperties = {
  gridColumn: '1 / -1',
  display: 'flex',
  justifyContent: 'flex-end',
};

const submitButtonStyle: React.CSSProperties = {
  height: '46px',
  border: 'none',
  borderRadius: '14px',
  padding: '0 18px',
  backgroundColor: '#0f172a',
  color: '#ffffff',
  fontWeight: 800,
  cursor: 'pointer',
};

const topSectionStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1.2fr 1fr',
  gap: '20px',
};

const statsGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: '16px',
};

const statCardStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  borderRadius: '20px',
  padding: '20px',
  boxShadow: '0 14px 30px rgba(15, 23, 42, 0.06)',
};

const statIconStyle: React.CSSProperties = {
  width: '44px',
  height: '44px',
  borderRadius: '14px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '20px',
  marginBottom: '14px',
};

const statValueStyle: React.CSSProperties = {
  fontSize: '28px',
  fontWeight: 800,
  color: '#0f172a',
};

const statLabelStyle: React.CSSProperties = {
  marginTop: '6px',
  fontSize: '14px',
  color: '#64748b',
};

const chartCardStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  borderRadius: '20px',
  padding: '20px',
  boxShadow: '0 14px 30px rgba(15, 23, 42, 0.06)',
};

const chartTitleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: '18px',
  fontWeight: 800,
  color: '#0f172a',
};

const chartSubtitleStyle: React.CSSProperties = {
  margin: '8px 0 0 0',
  fontSize: '14px',
  color: '#64748b',
};

const chartStyle: React.CSSProperties = {
  marginTop: '24px',
  height: '190px',
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'space-between',
  gap: '14px',
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
  height: '150px',
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'center',
};

const chartBarStyle: React.CSSProperties = {
  width: '100%',
  maxWidth: '40px',
  borderRadius: '14px 14px 8px 8px',
  background: 'linear-gradient(180deg, #f59e0b, #f97316)',
};

const chartLabelStyle: React.CSSProperties = {
  fontSize: '13px',
  color: '#64748b',
  fontWeight: 700,
};

const cardsGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '18px',
};

const packageCardStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  borderRadius: '22px',
  padding: '20px',
  boxShadow: '0 14px 30px rgba(15, 23, 42, 0.06)',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
};

const packageTopRowStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: '12px',
};

const packageTitleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: '20px',
  fontWeight: 800,
  color: '#0f172a',
};

const packageCategoryStyle: React.CSSProperties = {
  margin: '6px 0 0 0',
  color: '#64748b',
  fontSize: '14px',
  textTransform: 'capitalize',
};

const statusBadgeStyle: React.CSSProperties = {
  height: '32px',
  display: 'inline-flex',
  alignItems: 'center',
  padding: '0 12px',
  borderRadius: '999px',
  fontSize: '12px',
  fontWeight: 800,
  whiteSpace: 'nowrap',
};

const packageDescriptionStyle: React.CSSProperties = {
  margin: 0,
  color: '#475569',
  fontSize: '14px',
  lineHeight: 1.6,
};

const packageInfoGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  gap: '10px',
};

const infoBoxStyle: React.CSSProperties = {
  backgroundColor: '#f8fafc',
  borderRadius: '14px',
  padding: '12px',
};

const infoLabelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '12px',
  color: '#64748b',
  marginBottom: '6px',
};

const infoValueStyle: React.CSSProperties = {
  fontSize: '14px',
  color: '#0f172a',
};

const includesWrapStyle: React.CSSProperties = {
  display: 'flex',
  gap: '8px',
  flexWrap: 'wrap',
};

const includeBadgeStyle: React.CSSProperties = {
  padding: '7px 10px',
  borderRadius: '999px',
  backgroundColor: '#fff7d6',
  color: '#b45309',
  fontSize: '12px',
  fontWeight: 700,
};

const cardActionsStyle: React.CSSProperties = {
  display: 'flex',
  gap: '10px',
};

const editButtonStyle: React.CSSProperties = {
  flex: 1,
  height: '42px',
  border: 'none',
  borderRadius: '12px',
  backgroundColor: '#e2e8f0',
  color: '#0f172a',
  fontWeight: 700,
  cursor: 'pointer',
};

const deleteButtonStyle: React.CSSProperties = {
  flex: 1,
  height: '42px',
  border: 'none',
  borderRadius: '12px',
  backgroundColor: '#fee2e2',
  color: '#b91c1c',
  fontWeight: 700,
  cursor: 'pointer',
};

const emptyStateStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  borderRadius: '18px',
  padding: '26px',
  textAlign: 'center',
  color: '#64748b',
  boxShadow: '0 14px 30px rgba(15, 23, 42, 0.06)',
};