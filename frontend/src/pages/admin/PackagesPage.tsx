import { useState } from 'react';
import { usePackages } from '../../hooks/usePackages';

export default function PackagesPage() {
  const {
    packages,
    isLoading,
    error,
    createPackage,
    updatePackage,
    deletePackage,
    fetchPackages,
  } = usePackages();

  const [form, setForm] = useState({
    id: '',
    name: '',
    description: '',
    price: '',
    imageUrl: '',
  });

  const [search, setSearch] = useState({
    name: '',
    maxPrice: '',
  });

  const isEditing = !!form.id;

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSearch((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    await fetchPackages(search);
  };

  const resetForm = () => {
    setForm({
      id: '',
      name: '',
      description: '',
      price: '',
      imageUrl: '',
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const payload = {
      name: form.name,
      description: form.description,
      price: Number(form.price),
      imageUrl: form.imageUrl,
      isActive: true,
    };

    if (isEditing) {
      await updatePackage(String(form.id), payload);
    } else {
      await createPackage(payload);
    }

    resetForm();
  };

  const handleEdit = (item: any) => {
    setForm({
      id: String(item.id),
      name: item.name,
      description: item.description || '',
      price: String(item.price),
      imageUrl: item.imageUrl || '',
    });
  };

  return (
    <section>
      <h1 style={{ marginBottom: '20px' }}>Admin Packages</h1>

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
          name="name"
          placeholder="Search by name"
          value={search.name}
          onChange={handleSearchChange}
        />

        <input
          type="number"
          name="maxPrice"
          placeholder="Max price"
          value={search.maxPrice}
          onChange={handleSearchChange}
        />

        <button type="submit">Filter Packages</button>
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
          name="name"
          placeholder="Package name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          rows={4}
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          value={form.imageUrl}
          onChange={handleChange}
        />

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button type="submit">
            {isEditing ? 'Update Package' : 'Add Package'}
          </button>

          {isEditing && (
            <button type="button" onClick={resetForm}>
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {isLoading && <p>Loading packages...</p>}
      {error && <p style={{ color: 'crimson' }}>{error}</p>}

      {!isLoading && packages.length === 0 ? (
        <p>No packages found.</p>
      ) : (
        <div style={{ display: 'grid', gap: '16px' }}>
          {packages.map((item: any) => (
            <div
              key={item.id}
              style={{
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                padding: '20px',
                background: '#fff',
              }}
            >
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p>
                <strong>Price:</strong> €{item.price}
              </p>

              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <button onClick={() => handleEdit(item)}>Edit</button>
                <button onClick={() => deletePackage(String(item.id))}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}