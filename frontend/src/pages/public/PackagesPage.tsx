import { useState } from 'react';
import { usePackages } from '../../hooks/usePackages';

export default function PackagesPage() {
  const { packages, isLoading, error, fetchPackages } = usePackages();
  const [filters, setFilters] = useState({
    name: '',
    maxPrice: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleFilter = async (event: React.FormEvent) => {
    event.preventDefault();
    await fetchPackages(filters);
  };

  if (isLoading) {
    return <p style={{ padding: '40px' }}>Loading packages...</p>;
  }

  if (error) {
    return <p style={{ padding: '40px', color: 'crimson' }}>{error}</p>;
  }

  return (
    <section
      style={{
        padding: '48px 24px',
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '40px', marginBottom: '12px' }}>Our Packages</h1>
        <p
          style={{
            color: '#4b5563',
            fontSize: '18px',
            maxWidth: '700px',
            lineHeight: 1.6,
          }}
        >
          Explore our event packages designed for birthdays and kids celebrations.
        </p>
      </div>

      <form
        onSubmit={handleFilter}
        style={{
          display: 'grid',
          gap: '12px',
          maxWidth: '560px',
          marginBottom: '28px',
        }}
      >
        <input
          type="text"
          name="name"
          placeholder="Search by name"
          value={filters.name}
          onChange={handleChange}
        />

        <input
          type="number"
          name="maxPrice"
          placeholder="Max price"
          value={filters.maxPrice}
          onChange={handleChange}
        />

        <button type="submit">Apply Filters</button>
      </form>

      {packages.length === 0 ? (
        <div
          style={{
            border: '1px solid #e5e7eb',
            borderRadius: '16px',
            padding: '32px',
            background: '#ffffff',
          }}
        >
          <p style={{ margin: 0, color: '#6b7280' }}>No packages available.</p>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
          }}
        >
          {packages.map((item: any) => (
            <div
              key={item.id}
              style={{
                border: '1px solid #e5e7eb',
                borderRadius: '18px',
                padding: '22px',
                background: '#ffffff',
                boxShadow: '0 8px 24px rgba(0,0,0,0.04)',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
              }}
            >
              {item.imageUrl ? (
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  style={{
                    width: '100%',
                    height: '180px',
                    objectFit: 'cover',
                    borderRadius: '12px',
                  }}
                />
              ) : (
                <div
                  style={{
                    width: '100%',
                    height: '180px',
                    borderRadius: '12px',
                    background: '#f3f4f6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#9ca3af',
                    fontWeight: 600,
                  }}
                >
                  No image
                </div>
              )}

              <div>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '24px' }}>{item.name}</h3>
                <p style={{ margin: 0, color: '#4b5563', lineHeight: 1.6 }}>
                  {item.description || 'No description available.'}
                </p>
              </div>

              <div
                style={{
                  marginTop: 'auto',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <strong style={{ fontSize: '22px', color: '#111827' }}>
                  €{item.price}
                </strong>

                <button
                  style={{
                    border: 'none',
                    borderRadius: '10px',
                    padding: '10px 16px',
                    cursor: 'pointer',
                    background: '#111827',
                    color: '#ffffff',
                    fontWeight: 600,
                  }}
                >
                  Book now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}