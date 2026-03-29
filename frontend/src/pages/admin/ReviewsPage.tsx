import { useState } from 'react';
import { useReviews } from '../../hooks/useReviews';

export default function ReviewsPage() {
  const {
    reviews,
    isLoading,
    error,
    createReview,
    updateReview,
    deleteReview,
    fetchReviews,
  } = useReviews();

  const [form, setForm] = useState({
    id: '',
    customerName: '',
    comment: '',
    rating: '',
    isApproved: 'true',
  });

  const [search, setSearch] = useState({
    customerName: '',
    minRating: '',
    onlyApproved: 'false',
  });

  const isEditing = !!form.id;

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setSearch((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    await fetchReviews(search);
  };

  const resetForm = () => {
    setForm({
      id: '',
      customerName: '',
      comment: '',
      rating: '',
      isApproved: 'true',
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const payload = {
      customerName: form.customerName,
      comment: form.comment,
      rating: Number(form.rating),
      isApproved: form.isApproved === 'true',
    };

    if (isEditing) {
      await updateReview(String(form.id), payload);
    } else {
      await createReview(payload);
    }

    resetForm();
  };

  const handleEdit = (item: any) => {
    setForm({
      id: String(item.id),
      customerName: item.customerName,
      comment: item.comment || '',
      rating: String(item.rating),
      isApproved: String(item.isApproved),
    });
  };

  return (
    <section>
      <h1 style={{ marginBottom: '20px' }}>Admin Reviews</h1>

      <form
        onSubmit={handleSearch}
        style={{
          display: 'grid',
          gap: '12px',
          maxWidth: '560px',
          marginBottom: '24px',
        }}
      >
        <input
          type="text"
          name="customerName"
          placeholder="Search by customer name"
          value={search.customerName}
          onChange={handleSearchChange}
        />

        <input
          type="number"
          name="minRating"
          placeholder="Minimum rating"
          value={search.minRating}
          onChange={handleSearchChange}
        />

        <select
          name="onlyApproved"
          value={search.onlyApproved}
          onChange={handleSearchChange}
        >
          <option value="false">All reviews</option>
          <option value="true">Only approved</option>
        </select>

        <button type="submit">Filter Reviews</button>
      </form>

      <form
        onSubmit={handleSubmit}
        style={{
          display: 'grid',
          gap: '12px',
          maxWidth: '560px',
          marginBottom: '32px',
        }}
      >
        <input
          type="text"
          name="customerName"
          placeholder="Customer name"
          value={form.customerName}
          onChange={handleChange}
          required
        />

        <textarea
          name="comment"
          placeholder="Comment"
          value={form.comment}
          onChange={handleChange}
          rows={4}
          required
        />

        <input
          type="number"
          name="rating"
          placeholder="Rating (1-5)"
          value={form.rating}
          onChange={handleChange}
          min={1}
          max={5}
          required
        />

        <select
          name="isApproved"
          value={form.isApproved}
          onChange={handleChange}
        >
          <option value="true">Approved</option>
          <option value="false">Not approved</option>
        </select>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button type="submit">
            {isEditing ? 'Update Review' : 'Add Review'}
          </button>

          {isEditing && (
            <button type="button" onClick={resetForm}>
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {isLoading && <p>Loading reviews...</p>}
      {error && <p style={{ color: 'crimson' }}>{error}</p>}

      {!isLoading && reviews.length === 0 ? (
        <p>No reviews found.</p>
      ) : (
        <div style={{ display: 'grid', gap: '16px' }}>
          {reviews.map((item: any) => (
            <div
              key={item.id}
              style={{
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                padding: '20px',
                background: '#fff',
              }}
            >
              <h3>{item.customerName}</h3>
              <p>{item.comment}</p>
              <p>
                <strong>Rating:</strong> {item.rating}/5
              </p>
              <p>
                <strong>Approved:</strong> {item.isApproved ? 'Yes' : 'No'}
              </p>

              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <button onClick={() => handleEdit(item)}>Edit</button>
                <button onClick={() => deleteReview(String(item.id))}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}