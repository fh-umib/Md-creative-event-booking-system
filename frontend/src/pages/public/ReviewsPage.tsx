import { useState } from 'react';
import { useReviews } from '../../hooks/useReviews';

export default function ReviewsPage() {
  const { reviews, isLoading, error, fetchReviews } = useReviews();
  const [filters, setFilters] = useState({
    customerName: '',
    minRating: '',
    onlyApproved: 'true',
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleFilter = async (event: React.FormEvent) => {
    event.preventDefault();
    await fetchReviews(filters);
  };

  if (isLoading) {
    return <p style={{ padding: '40px' }}>Loading reviews...</p>;
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
        <h1 style={{ fontSize: '40px', marginBottom: '12px' }}>
          Customer Reviews
        </h1>

        <p
          style={{
            color: '#4b5563',
            fontSize: '18px',
            maxWidth: '700px',
            lineHeight: 1.6,
          }}
        >
          Read what our customers say about their experience with MD Creative.
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
          name="customerName"
          placeholder="Search by customer name"
          value={filters.customerName}
          onChange={handleChange}
        />

        <input
          type="number"
          name="minRating"
          placeholder="Minimum rating"
          value={filters.minRating}
          onChange={handleChange}
        />

        <select
          name="onlyApproved"
          value={filters.onlyApproved}
          onChange={handleChange}
        >
          <option value="true">Only approved</option>
          <option value="false">All reviews</option>
        </select>

        <button type="submit">Apply Filters</button>
      </form>

      {reviews.length === 0 ? (
        <div
          style={{
            border: '1px solid #e5e7eb',
            borderRadius: '16px',
            padding: '32px',
            background: '#ffffff',
          }}
        >
          <p style={{ margin: 0, color: '#6b7280' }}>No reviews available.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '18px' }}>
          {reviews.map((item: any) => (
            <div
              key={item.id}
              style={{
                border: '1px solid #e5e7eb',
                borderRadius: '18px',
                padding: '22px',
                background: '#ffffff',
                boxShadow: '0 8px 24px rgba(0,0,0,0.04)',
              }}
            >
              <h3 style={{ margin: '0 0 10px 0', fontSize: '24px' }}>
                {item.customerName}
              </h3>

              <p
                style={{
                  margin: '0 0 12px 0',
                  color: '#4b5563',
                  lineHeight: 1.7,
                }}
              >
                {item.comment}
              </p>

              <strong style={{ fontSize: '18px', color: '#111827' }}>
                Rating: {item.rating}/5
              </strong>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}