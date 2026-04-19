import { useEffect, useMemo, useState } from 'react';
import {
  createActivity,
  deleteActivity,
  getAdminActivities,
  updateActivity,
} from '../../services/activityAdminApi';
import type { Activity, ActivityPayload } from '../../services/activityAdminApi';

const initialForm: ActivityPayload = {
  name: '',
  description: '',
  price: 0,
  duration_minutes: 30,
  is_active: true,
};

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [form, setForm] = useState<ActivityPayload>(initialForm);
  const [editingId, setEditingId] = useState<number | null>(null);

  const isNarrowScreen = window.innerWidth < 1200;

  const loadActivities = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getAdminActivities();
      setActivities(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load activities');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadActivities();
  }, []);

  const filteredActivities = useMemo(() => {
    return activities.filter((item) => {
      const text = `${item.name} ${item.description || ''}`.toLowerCase();
      return text.includes(search.toLowerCase());
    });
  }, [activities, search]);

  const handleChange = (
    key: keyof ActivityPayload,
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
  };

  const handleEdit = (item: Activity) => {
    setEditingId(item.id);
    setForm({
      name: item.name,
      description: item.description || '',
      price: Number(item.price),
      duration_minutes: item.duration_minutes,
      is_active: item.is_active,
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setError('');

      if (editingId) {
        await updateActivity(editingId, form);
      } else {
        await createActivity(form);
      }

      await loadActivities();
      resetForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Request failed');
    }
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm('Are you sure you want to delete this activity?');
    if (!confirmed) return;

    try {
      setError('');
      await deleteActivity(id);
      await loadActivities();

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
          <h1 style={titleStyle}>Activities & Extras</h1>
          <p style={subtitleStyle}>Manage add-on services and activities</p>
        </div>

        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={searchInputStyle}
        />
      </div>

      {error ? <div style={errorBoxStyle}>{error}</div> : null}

      <div
        style={{
          ...layoutStyle,
          gridTemplateColumns: isNarrowScreen
            ? '1fr'
            : 'minmax(320px, 380px) minmax(0, 1fr)',
        }}
      >
        <div style={formCardStyle}>
          <div style={formHeaderStyle}>
            <h2 style={cardTitleStyle}>
              {editingId ? 'Edit Activity' : 'Add Activity'}
            </h2>

            {editingId ? (
              <button type="button" style={cancelButtonStyle} onClick={resetForm}>
                Cancel
              </button>
            ) : null}
          </div>

          <form onSubmit={handleSubmit} style={formStyle}>
            <div style={fieldStyle}>
              <label style={labelStyle}>Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => handleChange('name', e.target.value)}
                style={inputStyle}
                required
              />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Description</label>
              <textarea
                value={form.description}
                onChange={(e) => handleChange('description', e.target.value)}
                style={textareaStyle}
              />
            </div>

            <div style={twoColStyle}>
              <div style={fieldStyle}>
                <label style={labelStyle}>Price</label>
                <input
                  type="number"
                  value={form.price}
                  onChange={(e) => handleChange('price', Number(e.target.value))}
                  style={inputStyle}
                />
              </div>

              <div style={fieldStyle}>
                <label style={labelStyle}>Duration</label>
                <input
                  type="number"
                  value={form.duration_minutes}
                  onChange={(e) =>
                    handleChange('duration_minutes', Number(e.target.value))
                  }
                  style={inputStyle}
                />
              </div>
            </div>

            <label style={checkboxLabelStyle}>
              <input
                type="checkbox"
                checked={form.is_active}
                onChange={(e) => handleChange('is_active', e.target.checked)}
              />
              Active
            </label>

            <button type="submit" style={submitButtonStyle}>
              {editingId ? 'Update Activity' : 'Add Activity'}
            </button>
          </form>
        </div>

        <div style={cardsGridStyle}>
          {loading ? (
            <div style={emptyStateStyle}>Loading activities...</div>
          ) : filteredActivities.length === 0 ? (
            <div style={emptyStateStyle}>No activities found.</div>
          ) : (
            filteredActivities.map((item) => (
              <article key={item.id} style={activityCardStyle}>
                <div style={cardTopStyle}>
                  <div style={iconStyle}>✦</div>

                  <span
                    style={{
                      ...statusBadgeStyle,
                      ...(item.is_active ? activeBadgeStyle : inactiveBadgeStyle),
                    }}
                  >
                    {item.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>

                <h3 style={activityTitleStyle}>{item.name}</h3>
                <p style={activityDescriptionStyle}>
                  {item.description || 'No description provided.'}
                </p>

                <div style={metaRowStyle}>
                  <span style={priceStyle}>€{item.price}</span>
                  <span style={durationStyle}>{item.duration_minutes} min</span>
                </div>

                <div style={actionsStyle}>
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
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

const pageStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  minWidth: 0,
};

const headerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: '16px',
  alignItems: 'center',
  flexWrap: 'wrap',
};

const titleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: '36px',
  fontWeight: 800,
  color: '#1f2937',
};

const subtitleStyle: React.CSSProperties = {
  margin: '8px 0 0 0',
  color: '#6b7280',
  fontSize: '16px',
};

const searchInputStyle: React.CSSProperties = {
  width: '280px',
  maxWidth: '100%',
  height: '48px',
  borderRadius: '14px',
  border: '1px solid #ece7df',
  padding: '0 16px',
  backgroundColor: '#faf8f5',
  outline: 'none',
  boxSizing: 'border-box',
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

const layoutStyle: React.CSSProperties = {
  display: 'grid',
  gap: '24px',
  alignItems: 'start',
};

const formCardStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  border: '1px solid #ece7df',
  borderRadius: '24px',
  padding: '24px',
  boxShadow: '0 14px 28px rgba(15, 23, 42, 0.05)',
  minWidth: 0,
};

const formHeaderStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '12px',
  marginBottom: '18px',
};

const cardTitleStyle: React.CSSProperties = {
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

const formStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '14px',
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
  height: '44px',
  borderRadius: '12px',
  border: '1px solid #e5dccf',
  padding: '0 14px',
  fontSize: '14px',
  outline: 'none',
  width: '100%',
  boxSizing: 'border-box',
};

const textareaStyle: React.CSSProperties = {
  minHeight: '100px',
  borderRadius: '12px',
  border: '1px solid #e5dccf',
  padding: '12px 14px',
  fontSize: '14px',
  outline: 'none',
  resize: 'vertical',
  width: '100%',
  boxSizing: 'border-box',
};

const twoColStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '12px',
};

const checkboxLabelStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  fontSize: '14px',
  fontWeight: 600,
  color: '#1f2937',
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
};

const cardsGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '20px',
  minWidth: 0,
};

const emptyStateStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  borderRadius: '24px',
  padding: '30px',
  textAlign: 'center',
  color: '#6b7280',
  border: '1px solid #ece7df',
};

const activityCardStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  borderRadius: '24px',
  border: '1px solid #ece7df',
  boxShadow: '0 12px 24px rgba(15, 23, 42, 0.04)',
  padding: '22px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
};

const cardTopStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '12px',
};

const iconStyle: React.CSSProperties = {
  width: '54px',
  height: '54px',
  borderRadius: '18px',
  backgroundColor: '#fff3e4',
  color: '#ea7b12',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 800,
  fontSize: '22px',
};

const statusBadgeStyle: React.CSSProperties = {
  padding: '7px 12px',
  borderRadius: '999px',
  fontSize: '12px',
  fontWeight: 700,
  whiteSpace: 'nowrap',
};

const activeBadgeStyle: React.CSSProperties = {
  backgroundColor: '#e8faef',
  color: '#15803d',
};

const inactiveBadgeStyle: React.CSSProperties = {
  backgroundColor: '#fde8e8',
  color: '#b91c1c',
};

const activityTitleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: '22px',
  fontWeight: 800,
  color: '#1f2937',
};

const activityDescriptionStyle: React.CSSProperties = {
  margin: 0,
  color: '#4b5563',
  fontSize: '14px',
  lineHeight: 1.7,
  minHeight: '48px',
};

const metaRowStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '12px',
};

const priceStyle: React.CSSProperties = {
  color: '#ea7b12',
  fontWeight: 800,
  fontSize: '22px',
};

const durationStyle: React.CSSProperties = {
  color: '#6b7280',
  fontSize: '14px',
};

const actionsStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  gap: '10px',
};

const editButtonStyle: React.CSSProperties = {
  height: '42px',
  border: '1px solid #e3d8c9',
  backgroundColor: '#f8f5f1',
  color: '#1f2937',
  borderRadius: '12px',
  fontSize: '14px',
  fontWeight: 700,
  cursor: 'pointer',
};

const deleteButtonStyle: React.CSSProperties = {
  height: '42px',
  padding: '0 14px',
  border: 'none',
  backgroundColor: '#fde8e8',
  color: '#b91c1c',
  borderRadius: '12px',
  fontSize: '14px',
  fontWeight: 700,
  cursor: 'pointer',
};