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
  const [form, setForm] = useState<DecorationPayload>(initialForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const sortedDecorations = useMemo(
    () => [...decorations].sort((a, b) => a.id - b.id),
    [decorations]
  );

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
      </div>

      {error ? <div style={errorBoxStyle}>{error}</div> : null}

      <div style={layoutStyle}>
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
                ? 'Saving...'
                : editingId
                ? 'Update Decoration'
                : 'Create Decoration'}
            </button>
          </form>
        </div>

        <div style={listCardStyle}>
          <div style={formHeaderStyle}>
            <h2 style={cardTitleStyle}>Decoration List</h2>
            <span style={countBadgeStyle}>{sortedDecorations.length} items</span>
          </div>

          {loading ? (
            <div style={emptyStateStyle}>Loading decorations...</div>
          ) : sortedDecorations.length === 0 ? (
            <div style={emptyStateStyle}>No decorations found.</div>
          ) : (
            <div style={listStyle}>
              {sortedDecorations.map((item) => (
                <div key={item.id} style={itemCardStyle}>
                  <div style={itemTopStyle}>
                    <div>
                      <h3 style={itemTitleStyle}>{item.title}</h3>
                      <p style={itemMetaStyle}>
                        #{item.id} · {item.category}
                      </p>
                    </div>

                    <div style={badgeRowStyle}>
                      {item.is_featured ? (
                        <span style={featuredBadgeStyle}>Featured</span>
                      ) : null}

                      <span
                        style={{
                          ...statusBadgeStyle,
                          backgroundColor: item.is_active ? '#e8f7ee' : '#fbe8e8',
                          color: item.is_active ? '#1f7a45' : '#a33b3b',
                        }}
                      >
                        {item.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>

                  <p style={itemDescriptionStyle}>{item.short_description}</p>

                  <div style={itemBottomStyle}>
                    <span style={priceTextStyle}>From €{item.price_from}</span>

                    <div style={actionRowStyle}>
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
                </div>
              ))}
            </div>
          )}
        </div>
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

const eyebrowStyle: React.CSSProperties = {
  margin: 0,
  color: '#c88d12',
  fontSize: '13px',
  fontWeight: 700,
  letterSpacing: '2px',
  textTransform: 'uppercase',
};

const titleStyle: React.CSSProperties = {
  margin: '10px 0',
  fontSize: '34px',
  fontWeight: 800,
  color: '#0f1b3d',
};

const subtitleStyle: React.CSSProperties = {
  margin: 0,
  color: '#6d665b',
  fontSize: '15px',
  lineHeight: 1.7,
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
  gridTemplateColumns: '1fr 1.1fr',
  gap: '22px',
  alignItems: 'start',
};

const formCardStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  borderRadius: '24px',
  border: '1px solid #ece3d5',
  boxShadow: '0 14px 28px rgba(15, 23, 42, 0.05)',
  padding: '24px',
};

const listCardStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  borderRadius: '24px',
  border: '1px solid #ece3d5',
  boxShadow: '0 14px 28px rgba(15, 23, 42, 0.05)',
  padding: '24px',
};

const formHeaderStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '12px',
  marginBottom: '18px',
  flexWrap: 'wrap',
};

const cardTitleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: '24px',
  fontWeight: 800,
  color: '#0f1b3d',
};

const cancelButtonStyle: React.CSSProperties = {
  border: '1px solid #e2d6c2',
  backgroundColor: '#fffaf2',
  color: '#0f1b3d',
  borderRadius: '999px',
  padding: '10px 16px',
  fontSize: '13px',
  fontWeight: 700,
  cursor: 'pointer',
};

const formStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
};

const fieldGroupStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
};

const labelStyle: React.CSSProperties = {
  fontSize: '14px',
  fontWeight: 700,
  color: '#0f1b3d',
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
  minHeight: '92px',
  borderRadius: '14px',
  border: '1px solid #e5dccf',
  padding: '12px 14px',
  fontSize: '14px',
  outline: 'none',
  resize: 'vertical',
};

const twoColumnStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '14px',
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
  color: '#0f1b3d',
  fontWeight: 600,
};

const submitButtonStyle: React.CSSProperties = {
  height: '48px',
  border: 'none',
  borderRadius: '14px',
  backgroundColor: '#d89b12',
  color: '#0f1b3d',
  fontSize: '15px',
  fontWeight: 800,
  cursor: 'pointer',
};

const countBadgeStyle: React.CSSProperties = {
  display: 'inline-flex',
  padding: '8px 12px',
  borderRadius: '999px',
  backgroundColor: '#f8edd6',
  color: '#b68417',
  fontSize: '12px',
  fontWeight: 700,
};

const emptyStateStyle: React.CSSProperties = {
  padding: '24px',
  textAlign: 'center',
  color: '#6d665b',
  fontSize: '15px',
};

const listStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
};

const itemCardStyle: React.CSSProperties = {
  border: '1px solid #ece3d5',
  borderRadius: '18px',
  padding: '18px',
  backgroundColor: '#fffdf9',
};

const itemTopStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: '14px',
  alignItems: 'flex-start',
  flexWrap: 'wrap',
};

const itemTitleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: '20px',
  fontWeight: 800,
  color: '#0f1b3d',
};

const itemMetaStyle: React.CSSProperties = {
  margin: '6px 0 0 0',
  color: '#7a7367',
  fontSize: '13px',
};

const badgeRowStyle: React.CSSProperties = {
  display: 'flex',
  gap: '8px',
  flexWrap: 'wrap',
};

const featuredBadgeStyle: React.CSSProperties = {
  display: 'inline-flex',
  padding: '7px 10px',
  borderRadius: '999px',
  backgroundColor: '#f8edd6',
  color: '#b68417',
  fontSize: '12px',
  fontWeight: 700,
};

const statusBadgeStyle: React.CSSProperties = {
  display: 'inline-flex',
  padding: '7px 10px',
  borderRadius: '999px',
  fontSize: '12px',
  fontWeight: 700,
};

const itemDescriptionStyle: React.CSSProperties = {
  margin: '14px 0',
  color: '#6d665b',
  fontSize: '14px',
  lineHeight: 1.7,
};

const itemBottomStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '14px',
  flexWrap: 'wrap',
};

const priceTextStyle: React.CSSProperties = {
  color: '#0f1b3d',
  fontWeight: 800,
  fontSize: '15px',
};

const actionRowStyle: React.CSSProperties = {
  display: 'flex',
  gap: '10px',
};

const editButtonStyle: React.CSSProperties = {
  border: '1px solid #dfd4c3',
  backgroundColor: '#ffffff',
  color: '#0f1b3d',
  borderRadius: '10px',
  padding: '10px 14px',
  fontSize: '13px',
  fontWeight: 700,
  cursor: 'pointer',
};

const deleteButtonStyle: React.CSSProperties = {
  border: 'none',
  backgroundColor: '#fbe8e8',
  color: '#a33b3b',
  borderRadius: '10px',
  padding: '10px 14px',
  fontSize: '13px',
  fontWeight: 700,
  cursor: 'pointer',
};