import { useEffect, useMemo, useState } from 'react';
import {
  createGalleryAlbum,
  deleteGalleryAlbum,
  getAdminGalleryAlbums,
  updateGalleryAlbum,
} from '../../services/galleryApi';
import type {
  AdminGalleryAlbumPayload,
  GalleryAlbum,
} from '../../services/galleryApi';

const initialForm: AdminGalleryAlbumPayload = {
  title: '',
  slug: '',
  description: '',
  category: 'birthday',
  cover_image_url: '',
  event_date: '',
  is_featured: false,
  is_published: true,
  display_order: 0,
};

const categoryOptions = [
  { value: 'birthday', label: 'Birthday' },
  { value: 'themed-party', label: 'Themed Party' },
  { value: 'holiday', label: 'Holiday' },
  { value: 'outdoor', label: 'Outdoor' },
  { value: 'mascot', label: 'Mascot' },
  { value: 'decorations', label: 'Decorations' },
  { value: 'photo-booth', label: 'Photo Booth' },
  { value: 'packages', label: 'Packages' },
];

function formatCategory(value: string) {
  return categoryOptions.find((item) => item.value === value)?.label || value;
}

function getCardGradient(index: number) {
  const gradients = [
    'linear-gradient(135deg, #f59e0b, #f97316)',
    'linear-gradient(135deg, #ec4899, #f43f5e)',
    'linear-gradient(135deg, #8b5cf6, #a855f7)',
    'linear-gradient(135deg, #22c55e, #34d399)',
    'linear-gradient(135deg, #06b6d4, #3b82f6)',
    'linear-gradient(135deg, #eab308, #f59e0b)',
    'linear-gradient(135deg, #fb7185, #ef4444)',
    'linear-gradient(135deg, #14b8a6, #06b6d4)',
  ];

  return gradients[index % gradients.length];
}

export default function GalleryPage() {
  const [albums, setAlbums] = useState<GalleryAlbum[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [form, setForm] = useState<AdminGalleryAlbumPayload>(initialForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);

  const loadAlbums = async (value = '') => {
    try {
      setLoading(true);
      setError('');
      const data = await getAdminGalleryAlbums({ search: value });
      setAlbums(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load gallery');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAlbums();
  }, []);

  const filteredAlbums = useMemo(() => {
    return albums.filter((item) => {
      const text =
        `${item.title} ${item.description || ''} ${item.category}`.toLowerCase();
      return text.includes(search.toLowerCase());
    });
  }, [albums, search]);

  const stats = useMemo(() => {
    const totalPhotos = filteredAlbums.reduce(
      (sum, item) => sum + Number(item.photo_count || 0),
      0
    );

    const featuredCount = filteredAlbums.filter((item) => item.is_featured).length;
    const publishedCount = filteredAlbums.filter((item) => item.is_published).length;

    return {
      totalAlbums: filteredAlbums.length,
      totalPhotos,
      featuredCount,
      publishedCount,
    };
  }, [filteredAlbums]);

  const handleChange = (
    key: keyof AdminGalleryAlbumPayload,
    value: string | number | boolean | null
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

  const handleEdit = (album: GalleryAlbum) => {
    setEditingId(album.id);
    setForm({
      title: album.title,
      slug: album.slug,
      description: album.description || '',
      category: album.category,
      cover_image_url: album.cover_image_url,
      event_date: album.event_date || '',
      is_featured: album.is_featured,
      is_published: album.is_published,
      display_order: album.display_order,
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setError('');

      if (editingId) {
        await updateGalleryAlbum(editingId, form);
      } else {
        await createGalleryAlbum(form);
      }

      await loadAlbums(search);
      resetForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Request failed');
    }
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this album?'
    );
    if (!confirmed) return;

    try {
      setError('');
      await deleteGalleryAlbum(id);
      await loadAlbums(search);

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
          <h1 style={titleStyle}>Gallery</h1>
          <p style={subtitleStyle}>Manage event albums, photos, and media</p>
        </div>

        <div style={headerActionsStyle}>
          <input
            type="text"
            placeholder="Search albums..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={searchInputStyle}
          />

          <button
            type="button"
            style={primaryButtonStyle}
            onClick={() => {
              setEditingId(null);
              setForm(initialForm);
              setShowForm((prev) => !prev);
            }}
          >
            {showForm ? 'Close Form' : 'New Album'}
          </button>
        </div>
      </div>

      {error ? <div style={errorBoxStyle}>{error}</div> : null}

      {showForm ? (
        <div style={formCardStyle}>
          <div style={formHeaderStyle}>
            <h2 style={formTitleStyle}>
              {editingId ? 'Edit Album' : 'Create Album'}
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
              <label style={labelStyle}>Slug</label>
              <input
                type="text"
                value={form.slug || ''}
                onChange={(e) => handleChange('slug', e.target.value)}
                style={inputStyle}
                placeholder="optional-auto-generated"
              />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Category</label>
              <select
                value={form.category}
                onChange={(e) => handleChange('category', e.target.value)}
                style={inputStyle}
              >
                {categoryOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Event Date</label>
              <input
                type="date"
                value={form.event_date || ''}
                onChange={(e) => handleChange('event_date', e.target.value)}
                style={inputStyle}
              />
            </div>

            <div style={{ ...fieldStyle, gridColumn: '1 / -1' }}>
              <label style={labelStyle}>Cover Image URL</label>
              <input
                type="text"
                value={form.cover_image_url}
                onChange={(e) => handleChange('cover_image_url', e.target.value)}
                style={inputStyle}
                required
              />
            </div>

            <div style={{ ...fieldStyle, gridColumn: '1 / -1' }}>
              <label style={labelStyle}>Description</label>
              <textarea
                value={form.description || ''}
                onChange={(e) => handleChange('description', e.target.value)}
                style={textareaStyle}
              />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Display Order</label>
              <input
                type="number"
                value={form.display_order || 0}
                onChange={(e) =>
                  handleChange('display_order', Number(e.target.value))
                }
                style={inputStyle}
              />
            </div>

            <div style={checkboxWrapStyle}>
              <label style={checkboxLabelStyle}>
                <input
                  type="checkbox"
                  checked={Boolean(form.is_featured)}
                  onChange={(e) => handleChange('is_featured', e.target.checked)}
                />
                Featured
              </label>

              <label style={checkboxLabelStyle}>
                <input
                  type="checkbox"
                  checked={Boolean(form.is_published)}
                  onChange={(e) => handleChange('is_published', e.target.checked)}
                />
                Published
              </label>
            </div>

            <div style={submitWrapStyle}>
              <button type="submit" style={submitButtonStyle}>
                {editingId ? 'Update Album' : 'Create Album'}
              </button>
            </div>
          </form>
        </div>
      ) : null}

      <div style={statsGridStyle}>
        <div style={statCardStyle}>
          <div style={{ ...statIconStyle, backgroundColor: '#fff2e7', color: '#f97316' }}>
            🖼
          </div>
          <div style={statValueStyle}>{stats.totalPhotos}</div>
          <div style={statLabelStyle}>Total Photos</div>
        </div>

        <div style={statCardStyle}>
          <div style={{ ...statIconStyle, backgroundColor: '#eaf2ff', color: '#3b82f6' }}>
            📁
          </div>
          <div style={statValueStyle}>{stats.totalAlbums}</div>
          <div style={statLabelStyle}>Albums</div>
        </div>

        <div style={statCardStyle}>
          <div style={{ ...statIconStyle, backgroundColor: '#e8faef', color: '#22c55e' }}>
            👁
          </div>
          <div style={statValueStyle}>{stats.publishedCount}</div>
          <div style={statLabelStyle}>Published</div>
        </div>

        <div style={statCardStyle}>
          <div style={{ ...statIconStyle, backgroundColor: '#fff6dc', color: '#f59e0b' }}>
            ⭐
          </div>
          <div style={statValueStyle}>{stats.featuredCount}</div>
          <div style={statLabelStyle}>Featured</div>
        </div>
      </div>

      {loading ? (
        <div style={emptyStateStyle}>Loading gallery...</div>
      ) : filteredAlbums.length === 0 ? (
        <div style={emptyStateStyle}>No albums found.</div>
      ) : (
        <div style={gridStyle}>
          {filteredAlbums.map((album, index) => (
            <article key={album.id} style={cardStyle}>
              <div
                style={{
                  ...coverStyle,
                  backgroundImage: album.cover_image_url
                    ? `linear-gradient(rgba(15,23,42,0.16), rgba(15,23,42,0.16)), url("${album.cover_image_url}")`
                    : getCardGradient(index),
                  backgroundColor: '#ddd',
                }}
              >
                <div style={coverTopStyle}>
                  {album.is_featured ? (
                    <span style={featuredBadgeStyle}>⭐ Featured</span>
                  ) : (
                    <span style={standardBadgeStyle}>{formatCategory(album.category)}</span>
                  )}

                  <span style={photoCountBadgeStyle}>
                    {album.photo_count || 0} photos
                  </span>
                </div>
              </div>

              <div style={cardBodyStyle}>
                <h3 style={cardTitleStyle}>{album.title}</h3>

                <div style={metaRowStyle}>
                  <span style={categoryChipStyle}>
                    {formatCategory(album.category)}
                  </span>
                  <span style={dateTextStyle}>
                    {album.event_date || 'No date'}
                  </span>
                </div>

                <p style={cardTextStyle}>
                  {album.description || 'No description added yet.'}
                </p>

                <div style={statusRowStyle}>
                  <span
                    style={{
                      ...statusBadgeStyle,
                      ...(album.is_published
                        ? publishedBadgeStyle
                        : draftBadgeStyle),
                    }}
                  >
                    {album.is_published ? 'Published' : 'Draft'}
                  </span>

                  <span style={orderTextStyle}>Order: {album.display_order}</span>
                </div>

                <div style={actionsStyle}>
                  <button
                    type="button"
                    style={editButtonStyle}
                    onClick={() => handleEdit(album)}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    style={deleteButtonStyle}
                    onClick={() => handleDelete(album.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
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
  alignItems: 'flex-start',
  gap: '16px',
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
  fontSize: '16px',
  color: '#6b7280',
};

const headerActionsStyle: React.CSSProperties = {
  display: 'flex',
  gap: '12px',
  alignItems: 'center',
  flexWrap: 'wrap',
};

const searchInputStyle: React.CSSProperties = {
  width: '240px',
  maxWidth: '100%',
  height: '46px',
  borderRadius: '14px',
  border: '1px solid #e5e7eb',
  padding: '0 14px',
  fontSize: '14px',
  outline: 'none',
  backgroundColor: '#ffffff',
};

const primaryButtonStyle: React.CSSProperties = {
  height: '46px',
  border: 'none',
  borderRadius: '14px',
  padding: '0 18px',
  backgroundColor: '#0f172a',
  color: '#ffffff',
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
  gap: '12px',
  marginBottom: '18px',
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
  height: '46px',
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

const checkboxWrapStyle: React.CSSProperties = {
  display: 'flex',
  gap: '16px',
  alignItems: 'center',
  flexWrap: 'wrap',
};

const checkboxLabelStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  fontWeight: 700,
  color: '#334155',
  fontSize: '14px',
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
  backgroundColor: '#f59e0b',
  color: '#0f172a',
  fontWeight: 800,
  cursor: 'pointer',
};

const statsGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
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

const emptyStateStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  borderRadius: '18px',
  padding: '26px',
  textAlign: 'center',
  color: '#64748b',
  boxShadow: '0 14px 30px rgba(15, 23, 42, 0.06)',
};

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '18px',
};

const cardStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  borderRadius: '22px',
  overflow: 'hidden',
  boxShadow: '0 14px 30px rgba(15, 23, 42, 0.06)',
};

const coverStyle: React.CSSProperties = {
  minHeight: '180px',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  padding: '16px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
};

const coverTopStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: '12px',
  alignItems: 'flex-start',
};

const featuredBadgeStyle: React.CSSProperties = {
  backgroundColor: '#fff7d6',
  color: '#b45309',
  padding: '7px 10px',
  borderRadius: '999px',
  fontSize: '12px',
  fontWeight: 800,
};

const standardBadgeStyle: React.CSSProperties = {
  backgroundColor: 'rgba(255,255,255,0.92)',
  color: '#0f172a',
  padding: '7px 10px',
  borderRadius: '999px',
  fontSize: '12px',
  fontWeight: 800,
};

const photoCountBadgeStyle: React.CSSProperties = {
  backgroundColor: 'rgba(15,23,42,0.75)',
  color: '#ffffff',
  padding: '7px 10px',
  borderRadius: '999px',
  fontSize: '12px',
  fontWeight: 700,
};

const cardBodyStyle: React.CSSProperties = {
  padding: '20px',
};

const cardTitleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: '22px',
  fontWeight: 800,
  color: '#0f172a',
};

const metaRowStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: '12px',
  alignItems: 'center',
  marginTop: '10px',
};

const categoryChipStyle: React.CSSProperties = {
  padding: '6px 10px',
  borderRadius: '999px',
  backgroundColor: '#f1f5f9',
  color: '#334155',
  fontSize: '12px',
  fontWeight: 700,
};

const dateTextStyle: React.CSSProperties = {
  color: '#64748b',
  fontSize: '13px',
};

const cardTextStyle: React.CSSProperties = {
  margin: '14px 0',
  color: '#475569',
  fontSize: '14px',
  lineHeight: 1.7,
  minHeight: '48px',
};

const statusRowStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: '12px',
  alignItems: 'center',
  marginBottom: '16px',
};

const statusBadgeStyle: React.CSSProperties = {
  padding: '7px 10px',
  borderRadius: '999px',
  fontSize: '12px',
  fontWeight: 800,
};

const publishedBadgeStyle: React.CSSProperties = {
  backgroundColor: '#dcfce7',
  color: '#166534',
};

const draftBadgeStyle: React.CSSProperties = {
  backgroundColor: '#fee2e2',
  color: '#b91c1c',
};

const orderTextStyle: React.CSSProperties = {
  color: '#64748b',
  fontSize: '13px',
  fontWeight: 700,
};

const actionsStyle: React.CSSProperties = {
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