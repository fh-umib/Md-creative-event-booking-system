import { useEffect, useMemo, useState } from 'react';
import type { FormEvent } from 'react';
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

type PublicAlbum = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  cover_image_url: string;
  category: string;
  badge: string;
  countLabel: string;
  photo_count: number;
  display_order: number;
};

type DisplayAlbum = {
  id: number;
  title: string;
  slug: string;
  subtitle: string;
  description: string;
  category: string;
  cover_image_url: string;
  event_date?: string | null;
  is_featured: boolean;
  is_published: boolean;
  display_order: number;
  badge: string;
  countLabel: string;
  photo_count: number;
  source: 'admin' | 'public';
  adminItem?: GalleryAlbum;
};

type CategoryFilter = 'all' | string;
type PublishFilter = 'all' | 'published' | 'draft';

const galleryPath = '/images/gallery';

const publicAlbums: PublicAlbum[] = [
  {
    id: 'mascots',
    title: 'Maskota dhe personazhe',
    subtitle: 'Argëtim për fëmijë',
    description:
      'Momente plot buzëqeshje me personazhe të dashura për fëmijë. Ky album përmban disa nga karakteret tona më të kërkuara.',
    cover_image_url: `${galleryPath}/mascots1.png`,
    category: 'mascots',
    badge: '10 foto',
    countLabel: '50+ karaktere',
    photo_count: 10,
    display_order: 1,
  },
  {
    id: 'wedding-engagement',
    title: 'Dasma dhe fejesa',
    subtitle: 'Elegancë festive',
    description:
      'Dekore elegante për momente të mëdha familjare, me atmosferë të kuruar dhe stil në çdo cep.',
    cover_image_url: `${galleryPath}/wedding2.png`,
    category: 'wedding-engagement',
    badge: '10 foto',
    countLabel: 'Dasma & fejesa',
    photo_count: 10,
    display_order: 2,
  },
  {
    id: 'kids-decor',
    title: 'Dekore për vajza dhe djem',
    subtitle: 'Ditëlindje me temë',
    description:
      'Një album i përbashkët me dekore për vajza dhe djem, me shumë ngjyra, tema kreative dhe detaje të personalizuara.',
    cover_image_url: `${galleryPath}/decoration-girl2.png`,
    category: 'kids-decor',
    badge: '10 foto',
    countLabel: 'Vajza & djem',
    photo_count: 10,
    display_order: 3,
  },
  {
    id: 'bounce-bubble',
    title: 'Bounce dhe Bubble House',
    subtitle: 'Argëtim aktiv',
    description:
      'Kënde lojërash për fëmijë me bounce house dhe bubble house, të kombinuara me atmosferë festive.',
    cover_image_url: `${galleryPath}/bubble2.png`,
    category: 'bounce-bubble',
    badge: '10 foto',
    countLabel: 'Bounce & bubble',
    photo_count: 10,
    display_order: 4,
  },
  {
    id: 'baby-shower',
    title: 'Baby Shower',
    subtitle: 'Momente të buta',
    description:
      'Dekore të ëmbla dhe të kujdesshme për një ditë të paharrueshme, me ngjyra të buta dhe shumë ndjeshmëri.',
    cover_image_url: `${galleryPath}/baby-shower2.png`,
    category: 'baby-shower',
    badge: '10 foto',
    countLabel: 'Baby shower',
    photo_count: 10,
    display_order: 5,
  },
  {
    id: 'photo-booth',
    title: 'Photo Booth & Photo Box',
    subtitle: 'Kujtime nga eventi',
    description:
      'Photo booth, photo box dhe pasqyrë e personalizuar për kujtime të bukura që mbesin edhe pas eventit.',
    cover_image_url: '/images/photo-booth/photo-both.png',
    category: 'photo-booth',
    badge: '10 foto',
    countLabel: 'Photo booth',
    photo_count: 10,
    display_order: 6,
  },
  {
    id: 'extra',
    title: 'Ekstra dhe detaje të veçanta',
    subtitle: 'Mirëseardhje, karrocë, pasqyrë',
    description:
      'Karroca, mirëseardhja, pasqyra e personalizuar dhe shumë detaje tjera që e bëjnë hyrjen dhe atmosferën më të plotë.',
    cover_image_url: `${galleryPath}/extra4.png`,
    category: 'extra',
    badge: '10 foto',
    countLabel: 'Ekstra',
    photo_count: 10,
    display_order: 7,
  },
  {
    id: 'bride-to-be',
    title: 'Kanagjegj / Bride to Be',
    subtitle: 'Detaje për nusen',
    description:
      'Kënde të veçanta për kanagjegj, me dekorime elegante dhe pamje që duken bukur në çdo fotografi.',
    cover_image_url: `${galleryPath}/bride-to-be2.png`,
    category: 'bride-to-be',
    badge: '5 foto',
    countLabel: 'Bride to be',
    photo_count: 5,
    display_order: 8,
  },
  {
    id: 'synetia',
    title: 'Syneti',
    subtitle: 'Dekor familjar',
    description:
      'Dekore për syneti me pamje festive dhe të kuruar, të përshtatura për organizim familjar.',
    cover_image_url: `${galleryPath}/synetia2.png`,
    category: 'synetia',
    badge: '5 foto',
    countLabel: 'Syneti',
    photo_count: 5,
    display_order: 9,
  },
];

const categoryOptions = [
  { value: 'mascots', label: 'Maskota dhe personazhe' },
  { value: 'wedding-engagement', label: 'Dasma dhe fejesa' },
  { value: 'kids-decor', label: 'Dekore për vajza dhe djem' },
  { value: 'bounce-bubble', label: 'Bounce dhe Bubble House' },
  { value: 'baby-shower', label: 'Baby Shower' },
  { value: 'photo-booth', label: 'Photo Booth & Photo Box' },
  { value: 'extra', label: 'Ekstra dhe detaje' },
  { value: 'bride-to-be', label: 'Kanagjegj / Bride to Be' },
  { value: 'synetia', label: 'Syneti' },
];

const initialForm: AdminGalleryAlbumPayload = {
  title: '',
  slug: '',
  description: '',
  category: 'mascots',
  cover_image_url: '',
  event_date: '',
  is_featured: false,
  is_published: true,
  display_order: 1,
};

function normalize(value?: string | null) {
  return String(value || '')
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/ë/g, 'e')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9]+/g, '')
    .trim();
}

function createSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/ë/g, 'e')
    .replace(/ç/g, 'c')
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function formatCategory(value?: string | null) {
  return categoryOptions.find((item) => item.value === value)?.label || value || 'Pa kategori';
}

function formatDate(value?: string | null) {
  if (!value) return 'Pa datë';

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString('sq-AL', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export default function GalleryPage() {
  const [albums, setAlbums] = useState<GalleryAlbum[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [publishFilter, setPublishFilter] = useState<PublishFilter>('all');
  const [form, setForm] = useState<AdminGalleryAlbumPayload>(initialForm);
  const [editingId, setEditingId] = useState<number | null>(null);

  const loadAlbums = async (value = '') => {
    try {
      setLoading(true);
      setError('');

      const data = await getAdminGalleryAlbums({ search: value });
      setAlbums(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Galeria nuk mund të ngarkohet.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAlbums();
  }, []);

  const displayAlbums = useMemo<DisplayAlbum[]>(() => {
    return publicAlbums.map((publicItem) => {
      const publicTitleKey = normalize(publicItem.title);
      const publicSlugKey = normalize(publicItem.id);

      const matchedAdmin = albums.find((adminItem) => {
        const adminTitleKey = normalize(adminItem.title);
        const adminSlugKey = normalize(adminItem.slug);
        const adminCategoryKey = normalize(adminItem.category);

        return (
          adminTitleKey === publicTitleKey ||
          adminSlugKey === publicSlugKey ||
          adminCategoryKey === publicSlugKey
        );
      });

      if (matchedAdmin) {
        return {
          id: matchedAdmin.id,
          title: matchedAdmin.title || publicItem.title,
          slug: matchedAdmin.slug || publicItem.id,
          subtitle: publicItem.subtitle,
          description: matchedAdmin.description || publicItem.description,
          category: matchedAdmin.category || publicItem.category,
          cover_image_url: matchedAdmin.cover_image_url || publicItem.cover_image_url,
          event_date: matchedAdmin.event_date,
          is_featured: Boolean(matchedAdmin.is_featured),
          is_published: Boolean(matchedAdmin.is_published),
          display_order: Number(matchedAdmin.display_order || publicItem.display_order),
          badge: publicItem.badge,
          countLabel: publicItem.countLabel,
          photo_count: Number(matchedAdmin.photo_count || publicItem.photo_count),
          source: 'admin',
          adminItem: matchedAdmin,
        };
      }

      return {
        id: -publicItem.display_order,
        title: publicItem.title,
        slug: publicItem.id,
        subtitle: publicItem.subtitle,
        description: publicItem.description,
        category: publicItem.category,
        cover_image_url: publicItem.cover_image_url,
        event_date: '',
        is_featured: false,
        is_published: true,
        display_order: publicItem.display_order,
        badge: publicItem.badge,
        countLabel: publicItem.countLabel,
        photo_count: publicItem.photo_count,
        source: 'public',
      };
    });
  }, [albums]);

  const filteredAlbums = useMemo(() => {
    const value = search.trim().toLowerCase();

    return displayAlbums
      .filter((item) => {
        const text = `${item.title} ${item.subtitle} ${item.description} ${item.category}`.toLowerCase();

        const matchesSearch = !value || text.includes(value);
        const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
        const matchesPublish =
          publishFilter === 'all' ||
          (publishFilter === 'published' && item.is_published) ||
          (publishFilter === 'draft' && !item.is_published);

        return matchesSearch && matchesCategory && matchesPublish;
      })
      .sort((a, b) => a.display_order - b.display_order);
  }, [displayAlbums, search, categoryFilter, publishFilter]);

  const stats = useMemo(() => {
    const totalPhotos = displayAlbums.reduce((sum, item) => sum + Number(item.photo_count || 0), 0);
    const featured = displayAlbums.filter((item) => item.is_featured).length;
    const published = displayAlbums.filter((item) => item.is_published).length;
    const connected = displayAlbums.filter((item) => item.source === 'admin').length;
    const publicOnly = displayAlbums.filter((item) => item.source === 'public').length;

    return {
      totalAlbums: displayAlbums.length,
      totalPhotos,
      featured,
      published,
      drafts: displayAlbums.length - published,
      connected,
      publicOnly,
    };
  }, [displayAlbums]);

  const categoryChart = useMemo(() => {
    const grouped = displayAlbums.reduce<Record<string, number>>((acc, item) => {
      const key = item.category || 'uncategorized';
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(grouped)
      .map(([category, count]) => ({
        category,
        label: formatCategory(category),
        count,
      }))
      .sort((a, b) => b.count - a.count);
  }, [displayAlbums]);

  const maxCategoryCount = Math.max(...categoryChart.map((item) => item.count), 1);

  const handleChange = (
    key: keyof AdminGalleryAlbumPayload,
    value: string | number | boolean | null,
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleTitleChange = (value: string) => {
    setForm((prev) => ({
      ...prev,
      title: value,
      slug: prev.slug ? prev.slug : createSlug(value),
    }));
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
  };

  const handleEdit = (album: DisplayAlbum) => {
    if (album.source === 'admin' && album.adminItem) {
      setEditingId(album.adminItem.id);
    } else {
      setEditingId(null);
    }

    setForm({
      title: album.title,
      slug: album.slug,
      description: album.description,
      category: album.category,
      cover_image_url: album.cover_image_url,
      event_date: album.event_date || '',
      is_featured: Boolean(album.is_featured),
      is_published: Boolean(album.is_published),
      display_order: Number(album.display_order || 1),
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setSubmitting(true);
      setError('');

      const payload: AdminGalleryAlbumPayload = {
        ...form,
        slug: form.slug || createSlug(form.title),
      };

      if (editingId) {
        await updateGalleryAlbum(editingId, payload);
      } else {
        await createGalleryAlbum(payload);
      }

      await loadAlbums(search);
      resetForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ruajtja e albumit dështoi.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (album: DisplayAlbum) => {
    if (album.source !== 'admin' || !album.adminItem) {
      window.alert(
        'Ky album është pjesë e faqes publike. Për ta larguar nga public page duhet të hiqet nga lista publike e galerisë.',
      );
      return;
    }

    const confirmed = window.confirm('A jeni e sigurt që dëshironi ta fshini këtë album nga databaza?');

    if (!confirmed) return;

    try {
      setError('');
      await deleteGalleryAlbum(album.adminItem.id);
      await loadAlbums(search);

      if (editingId === album.adminItem.id) {
        resetForm();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fshirja e albumit dështoi.');
    }
  };

  return (
    <>
      <style>{`
        @keyframes galSpin {
          to {
            transform: rotate(360deg);
          }
        }

        .gal-page {
          display: flex;
          flex-direction: column;
          gap: 18px;
          min-width: 0;
        }

        .gal-hero {
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

        .gal-hero::after {
          content: "GALLERY";
          position: absolute;
          right: 24px;
          bottom: -28px;
          font-size: clamp(62px, 10vw, 142px);
          line-height: 1;
          font-weight: 950;
          color: rgba(212,145,30,.08);
          pointer-events: none;
        }

        .gal-hero-content {
          position: relative;
          z-index: 1;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 22px;
          flex-wrap: wrap;
        }

        .gal-kicker {
          margin: 0 0 9px;
          color: #d4911e;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: .18em;
          text-transform: uppercase;
        }

        .gal-title {
          margin: 0;
          font-size: clamp(27px, 3.5vw, 44px);
          font-weight: 950;
          line-height: 1.05;
          color: #ffffff;
        }

        .gal-title span {
          color: #d4911e;
          font-style: italic;
        }

        .gal-subtitle {
          margin: 10px 0 0;
          max-width: 790px;
          color: rgba(255,255,255,.68);
          font-size: 14px;
          line-height: 1.75;
        }

        .gal-hero-card {
          min-width: 250px;
          border-radius: 20px;
          border: 1px solid rgba(212,145,30,.28);
          background: rgba(255,255,255,.07);
          padding: 16px;
          backdrop-filter: blur(12px);
        }

        .gal-hero-card strong {
          display: block;
          color: #ffffff;
          font-size: 26px;
          font-weight: 950;
          line-height: 1;
          margin-bottom: 7px;
        }

        .gal-hero-card span {
          color: rgba(255,255,255,.58);
          font-size: 13px;
          line-height: 1.45;
        }

        .gal-toolbar {
          display: grid;
          grid-template-columns: minmax(260px, 1fr) 210px 160px auto;
          gap: 10px;
          align-items: center;
          background: rgba(255,255,255,.94);
          border: 1px solid #eadfce;
          border-radius: 20px;
          padding: 12px;
          box-shadow: 0 7px 22px rgba(26,18,11,.05);
        }

        .gal-search,
        .gal-select {
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

        .gal-search:focus,
        .gal-select:focus {
          border-color: #c8841a;
          box-shadow: 0 0 0 4px rgba(200,132,26,.12);
          background: #ffffff;
        }

        .gal-refresh {
          height: 42px;
          border-radius: 999px;
          padding: 0 16px;
          border: none;
          background: #1a120b;
          color: #ffffff;
          font-size: 13px;
          font-weight: 900;
          cursor: pointer;
          white-space: nowrap;
        }

        .gal-stats {
          display: grid;
          grid-template-columns: repeat(5, minmax(135px, 1fr));
          gap: 12px;
        }

        .gal-stat-card {
          background: rgba(255,255,255,.94);
          border: 1px solid #eadfce;
          border-radius: 18px;
          padding: 15px;
          box-shadow: 0 7px 22px rgba(26,18,11,.05);
        }

        .gal-stat-label {
          margin: 0 0 10px;
          color: #7a6a52;
          font-size: 11px;
          font-weight: 800;
        }

        .gal-stat-value {
          margin: 0;
          color: #1a120b;
          font-size: 23px;
          font-weight: 950;
          line-height: 1;
        }

        .gal-insights {
          display: grid;
          grid-template-columns: minmax(0, 1.35fr) minmax(280px, .75fr);
          gap: 14px;
        }

        .gal-panel {
          background: rgba(255,255,255,.94);
          border: 1px solid #eadfce;
          border-radius: 20px;
          padding: 18px;
          box-shadow: 0 7px 22px rgba(26,18,11,.05);
          min-width: 0;
        }

        .gal-panel-title {
          margin: 0;
          color: #1a120b;
          font-size: 17px;
          font-weight: 950;
        }

        .gal-panel-text {
          margin: 5px 0 15px;
          color: #7a6a52;
          font-size: 12.5px;
          line-height: 1.45;
        }

        .gal-category-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 12px;
        }

        .gal-mini-card {
          border: 1px solid #f3eadc;
          background: #fffaf2;
          border-radius: 15px;
          padding: 12px;
          min-width: 0;
        }

        .gal-mini-top {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          margin-bottom: 8px;
          color: #1a120b;
          font-size: 12px;
          font-weight: 850;
        }

        .gal-mini-track {
          height: 9px;
          border-radius: 999px;
          background: #f1dfc5;
          overflow: hidden;
        }

        .gal-mini-fill {
          height: 100%;
          border-radius: 999px;
          background: linear-gradient(135deg, #d4911e, #b87318);
        }

        .gal-sync-box {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .gal-sync-card {
          border: 1px solid #f3eadc;
          background: #fffaf2;
          border-radius: 15px;
          padding: 14px;
        }

        .gal-sync-card span {
          display: block;
          color: #7a6a52;
          font-size: 11px;
          font-weight: 800;
          margin-bottom: 8px;
        }

        .gal-sync-card strong {
          color: #1a120b;
          font-size: 25px;
          font-weight: 950;
        }

        .gal-error {
          padding: 13px 16px;
          border-radius: 16px;
          border: 1px solid #fecaca;
          background: #fef2f2;
          color: #991b1b;
          font-size: 14px;
          font-weight: 750;
        }

        .gal-form-card,
        .gal-list-card {
          background: rgba(255,255,255,.94);
          border: 1px solid #eadfce;
          border-radius: 20px;
          box-shadow: 0 8px 24px rgba(26,18,11,.06);
          overflow: hidden;
        }

        .gal-form-head,
        .gal-list-head {
          padding: 17px 18px;
          border-bottom: 1px solid #f0e4d2;
          background: linear-gradient(135deg, #fffdf8, #ffffff);
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
          flex-wrap: wrap;
        }

        .gal-form-title,
        .gal-list-title {
          margin: 0;
          color: #1a120b;
          font-size: 18px;
          font-weight: 950;
        }

        .gal-form-text,
        .gal-list-text {
          margin: 5px 0 0;
          color: #7a6a52;
          font-size: 12px;
          line-height: 1.45;
        }

        .gal-cancel {
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

        .gal-form {
          padding: 18px;
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 12px;
        }

        .gal-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .gal-field-wide {
          grid-column: span 2;
        }

        .gal-field-full {
          grid-column: 1 / -1;
        }

        .gal-label {
          color: #6b5a45;
          font-size: 11px;
          font-weight: 850;
          letter-spacing: .06em;
          text-transform: uppercase;
        }

        .gal-input,
        .gal-select-input,
        .gal-textarea {
          width: 100%;
          border-radius: 12px;
          border: 1.5px solid #eadfce;
          background: #fffdf8;
          color: #1a120b;
          font-size: 13px;
          outline: none;
        }

        .gal-input,
        .gal-select-input {
          height: 40px;
          padding: 0 12px;
        }

        .gal-textarea {
          min-height: 76px;
          padding: 11px 12px;
          resize: vertical;
          line-height: 1.5;
        }

        .gal-input:focus,
        .gal-select-input:focus,
        .gal-textarea:focus {
          border-color: #c8841a;
          box-shadow: 0 0 0 4px rgba(200,132,26,.12);
          background: #ffffff;
        }

        .gal-checks {
          grid-column: span 2;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .gal-check {
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

        .gal-check input {
          accent-color: #c8841a;
        }

        .gal-submit {
          grid-column: span 2;
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

        .gal-submit:disabled {
          opacity: .7;
          cursor: not-allowed;
        }

        .gal-loading,
        .gal-empty {
          padding: 44px 18px;
          text-align: center;
          color: #7a6a52;
          font-size: 14px;
        }

        .gal-spinner {
          width: 32px;
          height: 32px;
          margin: 0 auto 12px;
          border-radius: 50%;
          border: 3px solid #eadfce;
          border-top-color: #c8841a;
          animation: galSpin .75s linear infinite;
        }

        .gal-grid {
          padding: 16px;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 14px;
        }

        .gal-card {
          border: 1px solid #eadfce;
          border-radius: 18px;
          background: #ffffff;
          overflow: hidden;
          box-shadow: 0 4px 14px rgba(26,18,11,.04);
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        .gal-image {
          position: relative;
          height: 170px;
          background:
            radial-gradient(circle at top left, rgba(212,145,30,.2), transparent 45%),
            linear-gradient(135deg, #fffaf2, #ffffff);
          overflow: hidden;
          border-bottom: 1px solid #f3eadc;
        }

        .gal-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform .35s ease;
        }

        .gal-card:hover .gal-image img {
          transform: scale(1.05);
        }

        .gal-source,
        .gal-status,
        .gal-count {
          position: absolute;
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

        .gal-source {
          left: 9px;
          top: 9px;
        }

        .gal-source-admin {
          background: rgba(22,101,52,.88);
          color: #ffffff;
        }

        .gal-source-public {
          background: rgba(154,93,10,.88);
          color: #ffffff;
        }

        .gal-status {
          right: 9px;
          top: 9px;
        }

        .gal-status-published {
          background: rgba(236,253,245,.92);
          color: #047857;
        }

        .gal-status-draft {
          background: rgba(254,242,242,.94);
          color: #991b1b;
        }

        .gal-count {
          left: 9px;
          bottom: 9px;
          background: rgba(255,255,255,.94);
          color: #1a120b;
        }

        .gal-card-body {
          padding: 13px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          flex: 1;
        }

        .gal-category-pill {
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

        .gal-card-title {
          margin: 0;
          color: #1a120b;
          font-size: 18px;
          font-weight: 950;
          line-height: 1.15;
        }

        .gal-card-subtitle {
          margin: -4px 0 0;
          color: #9a8878;
          font-size: 11px;
          font-weight: 800;
          line-height: 1.35;
        }

        .gal-description {
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

        .gal-info {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
          margin-top: auto;
        }

        .gal-info-box {
          border-radius: 12px;
          background: #fffaf2;
          border: 1px solid #f3eadc;
          padding: 8px;
          min-width: 0;
        }

        .gal-info-label {
          display: block;
          color: #8a7558;
          font-size: 9px;
          font-weight: 900;
          letter-spacing: .08em;
          text-transform: uppercase;
          margin-bottom: 3px;
        }

        .gal-info-value {
          color: #1a120b;
          font-size: 12px;
          font-weight: 850;
          word-break: break-word;
        }

        .gal-actions {
          display: flex;
          gap: 6px;
          padding-top: 2px;
        }

        .gal-action-btn {
          flex: 1;
          height: 34px;
          border-radius: 10px;
          font-size: 12px;
          font-weight: 850;
          cursor: pointer;
        }

        .gal-edit-btn {
          border: 1.5px solid #f1d5a3;
          background: #fff7e8;
          color: #9a5d0a;
        }

        .gal-delete-btn {
          border: 1.5px solid #fecaca;
          background: #fef2f2;
          color: #991b1b;
        }

        @media (max-width: 1180px) {
          .gal-toolbar {
            grid-template-columns: 1fr 1fr;
          }

          .gal-stats {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .gal-insights {
            grid-template-columns: 1fr;
          }

          .gal-form {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 720px) {
          .gal-hero {
            padding: 22px;
            border-radius: 22px;
          }

          .gal-toolbar {
            grid-template-columns: 1fr;
          }

          .gal-stats {
            grid-template-columns: 1fr;
          }

          .gal-form {
            grid-template-columns: 1fr;
          }

          .gal-field-wide,
          .gal-field-full,
          .gal-checks,
          .gal-submit {
            grid-column: 1 / -1;
          }

          .gal-checks,
          .gal-sync-box {
            grid-template-columns: 1fr;
          }

          .gal-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 520px) {
          .gal-info {
            grid-template-columns: 1fr;
          }

          .gal-image {
            height: 220px;
          }
        }
      `}</style>

      <section className="gal-page">
        <div className="gal-hero">
          <div className="gal-hero-content">
            <div>
              <p className="gal-kicker">Menaxhimi i galerisë</p>
              <h1 className="gal-title">
                Albumet që klientët <span>i shohin në faqen publike</span>
              </h1>
              <p className="gal-subtitle">
                Këtu admini sheh të njëjtat albume që shfaqen në public page. Nëse një album është i lidhur
                me databazën, mund të editohet direkt; nëse jo, mund të ruhet në admin.
              </p>
            </div>

            <div className="gal-hero-card">
              <strong>{stats.totalAlbums} albume</strong>
              <span>
                {stats.connected} të lidhura me databazë, {stats.publicOnly} vetëm nga public page.
              </span>
            </div>
          </div>
        </div>

        <div className="gal-toolbar">
          <input
            type="text"
            className="gal-search"
            placeholder="Kërko sipas albumit, kategorisë ose përshkrimit..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <select
            className="gal-select"
            value={categoryFilter}
            onChange={(event) => setCategoryFilter(event.target.value)}
          >
            <option value="all">Të gjitha kategoritë</option>
            {categoryOptions.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>

          <select
            className="gal-select"
            value={publishFilter}
            onChange={(event) => setPublishFilter(event.target.value as PublishFilter)}
          >
            <option value="all">Të gjitha</option>
            <option value="published">Të publikuara</option>
            <option value="draft">Draft</option>
          </select>

          <button type="button" className="gal-refresh" onClick={() => loadAlbums(search)}>
            Rifresko
          </button>
        </div>

        <div className="gal-stats">
          {[
            { label: 'Totali', value: stats.totalAlbums },
            { label: 'Foto gjithsej', value: `${stats.totalPhotos}+` },
            { label: 'Nga databaza', value: stats.connected },
            { label: 'Nga public page', value: stats.publicOnly },
            { label: 'Publikuara', value: stats.published },
          ].map((item) => (
            <div key={item.label} className="gal-stat-card">
              <p className="gal-stat-label">{item.label}</p>
              <p className="gal-stat-value">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="gal-insights">
          <div className="gal-panel">
            <h2 className="gal-panel-title">Albumet sipas kategorive</h2>
            <p className="gal-panel-text">
              Këto janë kategoritë që klienti i sheh në galerinë publike.
            </p>

            <div className="gal-category-list">
              {categoryChart.map((item) => (
                <div key={item.category} className="gal-mini-card">
                  <div className="gal-mini-top">
                    <span>{item.label}</span>
                    <strong>{item.count}</strong>
                  </div>

                  <div className="gal-mini-track">
                    <div
                      className="gal-mini-fill"
                      style={{ width: `${Math.max(8, (item.count / maxCategoryCount) * 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="gal-panel">
            <h2 className="gal-panel-title">Sinkronizimi me databazë</h2>
            <p className="gal-panel-text">
              Kur të gjitha albumet lidhen me databazën, admini dhe public page janë më të rregullta.
            </p>

            <div className="gal-sync-box">
              <div className="gal-sync-card">
                <span>Nga databaza</span>
                <strong>{stats.connected}</strong>
              </div>

              <div className="gal-sync-card">
                <span>Vetëm public</span>
                <strong>{stats.publicOnly}</strong>
              </div>
            </div>
          </div>
        </div>

        {error && <div className="gal-error">{error}</div>}

        <div className="gal-form-card">
          <div className="gal-form-head">
            <div>
              <h2 className="gal-form-title">{editingId ? 'Përditëso albumin' : 'Ruaj album në admin'}</h2>
              <p className="gal-form-text">
                Kur ruhet një album publik, ai lidhet me databazën dhe mund të menaxhohet nga admini.
              </p>
            </div>

            {(editingId || form.title) && (
              <button type="button" className="gal-cancel" onClick={resetForm}>
                Anulo
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="gal-form">
            <div className="gal-field gal-field-wide">
              <label className="gal-label">Titulli</label>
              <input
                type="text"
                className="gal-input"
                value={form.title}
                onChange={(event) => handleTitleChange(event.target.value)}
                placeholder="Maskota dhe personazhe"
                required
              />
            </div>

            <div className="gal-field gal-field-wide">
              <label className="gal-label">Slug</label>
              <input
                type="text"
                className="gal-input"
                value={form.slug || ''}
                onChange={(event) => handleChange('slug', event.target.value)}
                placeholder="maskota-dhe-personazhe"
                required
              />
            </div>

            <div className="gal-field gal-field-wide">
              <label className="gal-label">Kategoria</label>
              <select
                className="gal-select-input"
                value={form.category}
                onChange={(event) => handleChange('category', event.target.value)}
              >
                {categoryOptions.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="gal-field">
              <label className="gal-label">Data e eventit</label>
              <input
                type="date"
                className="gal-input"
                value={form.event_date || ''}
                onChange={(event) => handleChange('event_date', event.target.value)}
              />
            </div>

            <div className="gal-field">
              <label className="gal-label">Renditja</label>
              <input
                type="number"
                className="gal-input"
                value={form.display_order}
                onChange={(event) => handleChange('display_order', Number(event.target.value))}
                min={1}
              />
            </div>

            <div className="gal-field gal-field-full">
              <label className="gal-label">Fotografia kryesore</label>
              <input
                type="text"
                className="gal-input"
                value={form.cover_image_url || ''}
                onChange={(event) => handleChange('cover_image_url', event.target.value)}
                placeholder="/images/gallery/mascots1.png"
              />
            </div>

            <div className="gal-field gal-field-full">
              <label className="gal-label">Përshkrimi</label>
              <textarea
                className="gal-textarea"
                value={form.description || ''}
                onChange={(event) => handleChange('description', event.target.value)}
                placeholder="Shkruaj përshkrimin e albumit..."
              />
            </div>

            <div className="gal-checks">
              <label className="gal-check">
                <input
                  type="checkbox"
                  checked={form.is_featured}
                  onChange={(event) => handleChange('is_featured', event.target.checked)}
                />
                Album i veçuar
              </label>

              <label className="gal-check">
                <input
                  type="checkbox"
                  checked={form.is_published}
                  onChange={(event) => handleChange('is_published', event.target.checked)}
                />
                Publiko në faqe
              </label>
            </div>

            <button type="submit" className="gal-submit" disabled={submitting}>
              {submitting
                ? editingId
                  ? 'Duke u përditësuar...'
                  : 'Duke u ruajtur...'
                : editingId
                  ? 'Ruaj ndryshimet'
                  : 'Ruaj në admin'}
            </button>
          </form>
        </div>

        <div className="gal-list-card">
          <div className="gal-list-head">
            <div>
              <h2 className="gal-list-title">Albumet e faqes publike</h2>
              <p className="gal-list-text">
                Këto janë albumet që klienti i sheh në public gallery dhe që mund të lidhen me databazën.
              </p>
            </div>
          </div>

          {loading ? (
            <div className="gal-loading">
              <div className="gal-spinner" />
              Duke u ngarkuar galeria...
            </div>
          ) : filteredAlbums.length === 0 ? (
            <div className="gal-empty">Nuk u gjet asnjë album me këto filtra.</div>
          ) : (
            <div className="gal-grid">
              {filteredAlbums.map((album) => (
                <article key={`${album.source}-${album.id}`} className="gal-card">
                  <div className="gal-image">
                    <span
                      className={`gal-source ${
                        album.source === 'admin' ? 'gal-source-admin' : 'gal-source-public'
                      }`}
                    >
                      {album.source === 'admin' ? 'Databazë' : 'Public'}
                    </span>

                    <span
                      className={`gal-status ${
                        album.is_published ? 'gal-status-published' : 'gal-status-draft'
                      }`}
                    >
                      {album.is_published ? 'Publikuar' : 'Draft'}
                    </span>

                    <span className="gal-count">{album.badge}</span>

                    {album.cover_image_url ? (
                      <img src={album.cover_image_url} alt={album.title} />
                    ) : (
                      <div className="gal-empty">Pa fotografi</div>
                    )}
                  </div>

                  <div className="gal-card-body">
                    <span className="gal-category-pill">{formatCategory(album.category)}</span>

                    <div>
                      <h3 className="gal-card-title">{album.title}</h3>
                      <p className="gal-card-subtitle">{album.subtitle}</p>
                    </div>

                    <p className="gal-description">{album.description}</p>

                    <div className="gal-info">
                      <div className="gal-info-box">
                        <span className="gal-info-label">Foto</span>
                        <span className="gal-info-value">{album.photo_count}</span>
                      </div>

                      <div className="gal-info-box">
                        <span className="gal-info-label">Data</span>
                        <span className="gal-info-value">{formatDate(album.event_date)}</span>
                      </div>

                      <div className="gal-info-box">
                        <span className="gal-info-label">Renditja</span>
                        <span className="gal-info-value">#{album.display_order}</span>
                      </div>
                    </div>

                    <div className="gal-actions">
                      <button type="button" className="gal-action-btn gal-edit-btn" onClick={() => handleEdit(album)}>
                        {album.source === 'admin' ? 'Edito' : 'Ruaj'}
                      </button>

                      <button
                        type="button"
                        className="gal-action-btn gal-delete-btn"
                        onClick={() => handleDelete(album)}
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