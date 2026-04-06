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
  return (
    categoryOptions.find((item) => item.value === value)?.label || value
  );
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
                  backgroundImage: `linear-gradient(rgba(15,23,42,0.16), rgba(15,23,42,0.16)), url("${album.cover_image_url}")`,
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

              <div
                style={{
                  ...bottomAccentStyle,
                  background: getCardGradient(index),
                }}
              />
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
  fontSize: '40px',
  fontWeight: 800,
  color: '#2b2b2b',
  fontFamily: 'Georgia, serif',
};

const subtitleStyle: React.CSSProperties = {
  margin: '8px 0 0',
  color: '#6b7280',
  fontSize: '16px',
};

const headerActionsStyle: React.CSSProperties = {
  display: 'flex',
  gap: '12px',
  flexWrap: 'wrap',
};

const searchInputStyle: React.CSSProperties = {
  width: '280px',
  height: '46px',
  borderRadius: '14px',
  border: '1px solid #e5dccf',
  padding: '0 14px',
  backgroundColor: '#fff',
  outline: 'none',
  fontSize: '14px',
};

const primaryButtonStyle: React.CSSProperties = {
  height: '46px',
  border: 'none',
  borderRadius: '14px',
  padding: '0 18px',
  background: 'linear-gradient(135deg, #f59e0b, #ec4899)',
  color: '#ffffff',
  fontSize: '14px',
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

const checkboxWrapStyle: React.CSSProperties = {
  display: 'flex',
  gap: '18px',
  alignItems: 'center',
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

const statsGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
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
  minHeight: '140px',
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

const gridStyle: React.CSSProperties = {
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

const cardStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  borderRadius: '24px',
  border: '1px solid #ece7df',
  overflow: 'hidden',
  boxShadow: '0 10px 24px rgba(15, 23, 42, 0.04)',
  position: 'relative',
};

const coverStyle: React.CSSProperties = {
  height: '220px',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  position: 'relative',
};

const coverTopStyle: React.CSSProperties = {
  position: 'absolute',
  inset: 0,
  padding: '16px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
};

const featuredBadgeStyle: React.CSSProperties = {
  backgroundColor: '#f59e0b',
  color: '#ffffff',
  borderRadius: '999px',
  padding: '8px 12px',
  fontSize: '12px',
  fontWeight: 800,
};

const standardBadgeStyle: React.CSSProperties = {
  backgroundColor: 'rgba(255,255,255,0.92)',
  color: '#1f2937',
  borderRadius: '999px',
  padding: '8px 12px',
  fontSize: '12px',
  fontWeight: 800,
};

const photoCountBadgeStyle: React.CSSProperties = {
  backgroundColor: 'rgba(15,23,42,0.72)',
  color: '#ffffff',
  borderRadius: '999px',
  padding: '8px 12px',
  fontSize: '12px',
  fontWeight: 700,
};

const cardBodyStyle: React.CSSProperties = {
  padding: '18px 18px 22px',
};

const cardTitleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: '22px',
  fontWeight: 800,
  color: '#2d2a26',
  fontFamily: 'Georgia, serif',
};

const metaRowStyle: React.CSSProperties = {
  marginTop: '10px',
  display: 'flex',
  justifyContent: 'space-between',
  gap: '12px',
  flexWrap: 'wrap',
};

const categoryChipStyle: React.CSSProperties = {
  padding: '7px 11px',
  borderRadius: '999px',
  backgroundColor: '#f8f5f1',
  color: '#2f2f2f',
  fontSize: '12px',
  fontWeight: 700,
  border: '1px solid #ece7df',
};

const dateTextStyle: React.CSSProperties = {
  color: '#6b7280',
  fontSize: '13px',
};

const cardTextStyle: React.CSSProperties = {
  margin: '12px 0 0',
  color: '#6b7280',
  fontSize: '14px',
  lineHeight: 1.7,
  minHeight: '68px',
};

const statusRowStyle: React.CSSProperties = {
  marginTop: '16px',
  display: 'flex',
  justifyContent: 'space-between',
  gap: '12px',
  alignItems: 'center',
  flexWrap: 'wrap',
};

const statusBadgeStyle: React.CSSProperties = {
  padding: '8px 12px',
  borderRadius: '999px',
  fontSize: '12px',
  fontWeight: 700,
};

const publishedBadgeStyle: React.CSSProperties = {
  backgroundColor: '#e8faef',
  color: '#22c55e',
};

const draftBadgeStyle: React.CSSProperties = {
  backgroundColor: '#fff1de',
  color: '#d97706',
};

const orderTextStyle: React.CSSProperties = {
  fontSize: '13px',
  color: '#6b7280',
  fontWeight: 600,
};

const actionsStyle: React.CSSProperties = {
  marginTop: '18px',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
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
  border: 'none',
  backgroundColor: '#fde8e8',
  color: '#b91c1c',
  borderRadius: '12px',
  fontSize: '14px',
  fontWeight: 700,
  cursor: 'pointer',
};

const bottomAccentStyle: React.CSSProperties = {
  height: '6px',
  width: '100%',
};