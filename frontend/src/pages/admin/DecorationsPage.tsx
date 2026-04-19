import { useEffect, useMemo, useState } from 'react';
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

export default function DecorationsPage() {
  const [decorations, setDecorations] = useState<Decoration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [form, setForm] = useState<DecorationPayload>(initialForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const isNarrowScreen = window.innerWidth < 1200;

  const filteredDecorations = useMemo(() => {
    const sorted = [...decorations].sort((a, b) => a.id - b.id);

    if (!search.trim()) {
      return sorted;
    }

    const value = search.toLowerCase();

    return sorted.filter((item) => {
      const text = `${item.title} ${item.category} ${item.short_description || ''} ${
        item.theme_colors || ''
      }`.toLowerCase();

      return text.includes(value);
    });
  }, [decorations, search]);

  const loadDecorations = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getAdminDecorations();
      setDecorations(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load decorations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDecorations();
  }, []);

  const handleChange = (
    key: keyof DecorationPayload,
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
      setError(err instanceof Error ? err.message : 'Request failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm('Are you sure you want to delete this decoration?');
    if (!confirmed) return;

    try {
      setError('');
      await deleteDecoration(id);
      await loadDecorations();

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
          <p style={eyebrowStyle}>Admin Management</p>
          <h1 style={titleStyle}>Decorations</h1>
          <p style={subtitleStyle}>
            Manage decoration categories, content, pricing and visibility.
          </p>
        </div>

        <input
          type="text"
          placeholder="Search decorations..."
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
            : 'minmax(320px, 390px) minmax(0, 1fr)',
        }}
      >
        <div style={formCardStyle}>
          <div style={formHeaderStyle}>
            <h2 style={cardTitleStyle}>
              {editingId ? 'Edit Decoration' : 'Add Decoration'}
            </h2>

            {editingId ? (
              <button type="button" style={cancelButtonStyle} onClick={resetForm}>
                Cancel Edit
              </button>
            ) : null}
          </div>

          <form onSubmit={handleSubmit} style={formStyle}>
            <div style={fieldGroupStyle}>
              <label style={labelStyle}>Title</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => handleChange('title', e.target.value)}
                style={inputStyle}
                placeholder="Bride to Be"
                required
              />
            </div>

            <div style={fieldGroupStyle}>
              <label style={labelStyle}>Category</label>
              <input
                type="text"
                value={form.category}
                onChange={(e) => handleChange('category', e.target.value)}
                style={inputStyle}
                placeholder="Bridal"
                required
              />
            </div>

            <div style={fieldGroupStyle}>
              <label style={labelStyle}>Short Description</label>
              <textarea
                value={form.short_description}
                onChange={(e) => handleChange('short_description', e.target.value)}
                style={textareaStyle}
                placeholder="Short summary..."
              />
            </div>

            <div style={fieldGroupStyle}>
              <label style={labelStyle}>Full Description</label>
              <textarea
                value={form.full_description}
                onChange={(e) => handleChange('full_description', e.target.value)}
                style={{ ...textareaStyle, minHeight: '120px' }}
                placeholder="Detailed description..."
              />
            </div>

            <div style={fieldGroupStyle}>
              <label style={labelStyle}>Image URL</label>
              <input
                type="text"
                value={form.image_url}
                onChange={(e) => handleChange('image_url', e.target.value)}
                style={inputStyle}
                placeholder="https://..."
              />
            </div>

            <div style={twoColumnStyle}>
              <div style={fieldGroupStyle}>
                <label style={labelStyle}>Price From</label>
                <input
                  type="number"
                  value={form.price_from}
                  onChange={(e) => handleChange('price_from', Number(e.target.value))}
                  style={inputStyle}
                />
              </div>

              <div style={fieldGroupStyle}>
                <label style={labelStyle}>Theme Colors</label>
                <input
                  type="text"
                  value={form.theme_colors}
                  onChange={(e) => handleChange('theme_colors', e.target.value)}
                  style={inputStyle}
                  placeholder="white,gold,blush"
                />
              </div>
            </div>

            <div style={checkboxRowStyle}>
              <label style={checkboxLabelStyle}>
                <input
                  type="checkbox"
                  checked={form.is_featured}
                  onChange={(e) => handleChange('is_featured', e.target.checked)}
                />
                Featured
              </label>

              <label style={checkboxLabelStyle}>
                <input
                  type="checkbox"
                  checked={form.is_active}
                  onChange={(e) => handleChange('is_active', e.target.checked)}
                />
                Active
              </label>
            </div>

            <button type="submit" style={submitButtonStyle} disabled={submitting}>
              {submitting
                ? editingId
                  ? 'Updating...'
                  : 'Creating...'
                : editingId
                ? 'Update Decoration'
                : 'Add Decoration'}
            </button>
          </form>
        </div>

        <div style={cardsGridStyle}>
          {loading ? (
            <div style={emptyStateStyle}>Loading decorations...</div>
          ) : filteredDecorations.length === 0 ? (
            <div style={emptyStateStyle}>No decorations found.</div>
          ) : (
            filteredDecorations.map((item) => (
              <article key={item.id} style={cardStyle}>
                <div style={cardImageWrapStyle}>
                  {item.image_url ? (
                    <img
                      src={item.image_url}
                      alt={item.title}
                      style={cardImageStyle}
                    />
                  ) : (
                    <div style={imagePlaceholderStyle}>No Image</div>
                  )}
                </div>

                <div style={cardContentStyle}>
                  <div style={cardTopRowStyle}>
                    <div>
                      <h3 style={cardNameStyle}>{item.title}</h3>
                      <p style={cardCategoryStyle}>{item.category}</p>
                    </div>

                    <div style={badgesWrapStyle}>
                      {item.is_featured ? (
                        <span style={{ ...badgeStyle, ...featuredBadgeStyle }}>
                          Featured
                        </span>
                      ) : null}

                      <span
                        style={{
                          ...badgeStyle,
                          ...(item.is_active ? activeBadgeStyle : inactiveBadgeStyle),
                        }}
                      >
                        {item.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>

                  <p style={cardDescriptionStyle}>
                    {item.short_description || 'No short description provided.'}
                  </p>

                  <div style={metaRowStyle}>
                    <span style={priceStyle}>From €{item.price_from}</span>
                    <span style={themeStyle}>
                      {item.theme_colors || 'No colors specified'}
                    </span>
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

const eyebrowStyle: React.CSSProperties = {
  margin: 0,
  color: '#d97706',
  fontSize: '13px',
  fontWeight: 800,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
};

const titleStyle: React.CSSProperties = {
  margin: '8px 0 0 0',
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

const fieldGroupStyle: React.CSSProperties = {
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
  minHeight: '90px',
  borderRadius: '12px',
  border: '1px solid #e5dccf',
  padding: '12px 14px',
  fontSize: '14px',
  outline: 'none',
  resize: 'vertical',
  width: '100%',
  boxSizing: 'border-box',
};

const twoColumnStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '12px',
};

const checkboxRowStyle: React.CSSProperties = {
  display: 'flex',
  gap: '18px',
  flexWrap: 'wrap',
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

const cardStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  borderRadius: '24px',
  border: '1px solid #ece7df',
  boxShadow: '0 12px 24px rgba(15, 23, 42, 0.04)',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
};

const cardImageWrapStyle: React.CSSProperties = {
  height: '180px',
  backgroundColor: '#f8f5f1',
};

const cardImageStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block',
};

const imagePlaceholderStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#6b7280',
  fontWeight: 700,
};

const cardContentStyle: React.CSSProperties = {
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '14px',
};

const cardTopRowStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: '12px',
  alignItems: 'flex-start',
};

const cardNameStyle: React.CSSProperties = {
  margin: 0,
  fontSize: '22px',
  fontWeight: 800,
  color: '#1f2937',
};

const cardCategoryStyle: React.CSSProperties = {
  margin: '6px 0 0 0',
  color: '#6b7280',
  fontSize: '14px',
};

const badgesWrapStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  alignItems: 'flex-end',
};

const badgeStyle: React.CSSProperties = {
  padding: '7px 12px',
  borderRadius: '999px',
  fontSize: '12px',
  fontWeight: 700,
  whiteSpace: 'nowrap',
};

const featuredBadgeStyle: React.CSSProperties = {
  backgroundColor: '#fff1de',
  color: '#d97706',
};

const activeBadgeStyle: React.CSSProperties = {
  backgroundColor: '#e8faef',
  color: '#15803d',
};

const inactiveBadgeStyle: React.CSSProperties = {
  backgroundColor: '#fde8e8',
  color: '#b91c1c',
};

const cardDescriptionStyle: React.CSSProperties = {
  margin: 0,
  color: '#4b5563',
  fontSize: '14px',
  lineHeight: 1.7,
  minHeight: '48px',
};

const metaRowStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: '12px',
  alignItems: 'center',
};

const priceStyle: React.CSSProperties = {
  color: '#ea7b12',
  fontWeight: 800,
  fontSize: '22px',
};

const themeStyle: React.CSSProperties = {
  color: '#6b7280',
  fontSize: '13px',
  textAlign: 'right',
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