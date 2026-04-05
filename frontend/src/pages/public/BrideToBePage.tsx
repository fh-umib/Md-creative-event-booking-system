
import { Link } from 'react-router-dom';


export default function BrideToBePage() {
  return (
    <section
      style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '42px 24px 24px',
      }}
    >
      <p
        style={{
          margin: 0,
          color: '#c88d12',
          fontSize: '14px',
          fontWeight: 700,
          letterSpacing: '2px',
          textTransform: 'uppercase',
        }}
      >
        Bride to Be Collection
      </p>

      <h1
        style={{
          margin: '14px 0',
          fontSize: '52px',
          lineHeight: 1.08,
          color: '#0f1b3d',
          fontWeight: 800,
        }}
      >
        Celebrate Her Special Era in Style
      </h1>

      <p
        style={{
          margin: 0,
          fontSize: '18px',
          lineHeight: 1.9,
          color: '#6d665b',
          maxWidth: '760px',
        }}
      >
        Elegant bridal shower styling with premium details, soft colors and a
        beautiful atmosphere for unforgettable moments.
      </p>

      <div
        style={{
          display: 'flex',
          gap: '14px',
          flexWrap: 'wrap',
          marginTop: '28px',
        }}
      >
        <Link
          to="/booking"
          style={{
            textDecoration: 'none',
            backgroundColor: '#d89b12',
            color: '#0f1b3d',
            borderRadius: '999px',
            padding: '14px 22px',
            fontSize: '15px',
            fontWeight: 700,
          }}
        >
          Reserve This Style
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
            fontSize: '15px',
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
          backgroundImage:
            'linear-gradient(rgba(15,27,61,0.12), rgba(15,27,61,0.12)), url("https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          border: '1px solid #ece3d5',
          boxShadow: '0 16px 30px rgba(15, 23, 42, 0.06)',
        }}
      />
    </section>
  );
}