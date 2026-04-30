import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getDecorationBySlug } from '../../services/decorationApi';
import type { Decoration } from '../../services/decorationApi';

export default function DecorationDetailPage() {
  const { slug } = useParams();
  const [decoration, setDecoration] = useState<Decoration | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadDecoration = async () => {
      if (!slug) return;

      try {
        const data = await getDecorationBySlug(slug);
        setDecoration(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load decoration');
      } finally {
        setLoading(false);
      }
    };

    loadDecoration();
  }, [slug]);

  if (loading) return <div>Loading decoration...</div>;
  if (error) return <div>{error}</div>;
  if (!decoration) return <div>Decoration not found.</div>;

  return (
    <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '42px 24px 24px' }}>
      <p style={{ color: '#c88d12', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' }}>
        {decoration.category}
      </p>

      <h1 style={{ fontSize: '56px', color: '#0f1b3d', margin: '14px 0' }}>
        {decoration.title}
      </h1>

      <p style={{ fontSize: '18px', lineHeight: 1.9, color: '#6d665b', maxWidth: '760px' }}>
        {decoration.full_description}
      </p>

      <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginTop: '28px' }}>
        <Link
          to="/booking"
          style={{
            textDecoration: 'none',
            backgroundColor: '#d89b12',
            color: '#0f1b3d',
            borderRadius: '999px',
            padding: '14px 22px',
            fontWeight: 700,
          }}
        >
          Book This Decoration
        </Link>

        <Link
          to="/decorations"
          style={{
            textDecoration: 'none',
            backgroundColor: '#ffffff',
            color: '#0f1b3d',
            border: '1px solid #e8dfd1',
            borderRadius: '999px',
            padding: '14px 22px',
            fontWeight: 700,
          }}
        >
          Back to Decorations
        </Link>
      </div>

      <div
        style={{
          marginTop: '32px',
          minHeight: '420px',
          borderRadius: '26px',
          backgroundImage: `linear-gradient(rgba(15,27,61,0.12), rgba(15,27,61,0.12)), url(${decoration.image_url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          border: '1px solid #ece3d5',
          boxShadow: '0 16px 30px rgba(15, 23, 42, 0.06)',
        }}
      />

      <div style={{ marginTop: '28px', fontSize: '18px', color: '#0f1b3d', fontWeight: 700 }}>
        Starting from €{decoration.price_from}
      </div>
    </section>
  );
}