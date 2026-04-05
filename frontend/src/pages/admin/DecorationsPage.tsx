import { useDecorationAdmin } from '../../hooks/useDecorationAdmin';
import AdminDecorationDetailsDrawer from '../../components/admin/decorations/AdminDecorationDetailsDrawer';
import AdminDecorationFilters from '../../components/admin/decorations/AdminDecorationFilters';
import AdminDecorationList from '../../components/admin/decorations/AdminDecorationList';
import AdminDecorationStats from '../../components/admin/decorations/AdminDecorationStats';

export default function DecorationsPage() {
  const {
    items,
    selectedItem,
    filters,
    stats,
    categories,
    setSelectedItem,
    setFilters,
  } = useDecorationAdmin();

  return (
    <section style={pageStyle}>
      <div style={containerStyle}>
        <div style={headerStyle}>
          <div>
            <h1 style={titleStyle}>Admin Decorations</h1>
            <p style={textStyle}>
              Manage decoration categories, styles, visual concepts, and published items.
            </p>
          </div>

          <button type="button" style={addButtonStyle}>
            Add Decoration
          </button>
        </div>

        <div style={contentWrapStyle}>
          <AdminDecorationStats stats={stats} />

          <AdminDecorationFilters
            filters={filters}
            categories={categories}
            onChange={setFilters}
          />

          <AdminDecorationList items={items} onView={setSelectedItem} />
        </div>
      </div>

      <AdminDecorationDetailsDrawer
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </section>
  );
}

const pageStyle: React.CSSProperties = {
  background: '#f8fafc',
  padding: '32px 24px 60px',
  minHeight: '100vh',
};

const containerStyle: React.CSSProperties = {
  maxWidth: '1280px',
  margin: '0 auto',
};

const headerStyle: React.CSSProperties = {
  marginBottom: '24px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '18px',
};

const titleStyle: React.CSSProperties = {
  margin: '0 0 8px',
  color: '#0f172a',
  fontSize: '36px',
  fontWeight: 800,
};

const textStyle: React.CSSProperties = {
  margin: 0,
  color: '#64748b',
  fontSize: '17px',
  lineHeight: 1.7,
};

const addButtonStyle: React.CSSProperties = {
  border: 'none',
  background: '#d99a1d',
  color: '#111827',
  padding: '14px 20px',
  borderRadius: '16px',
  fontWeight: 800,
  cursor: 'pointer',
  whiteSpace: 'nowrap',
};

const contentWrapStyle: React.CSSProperties = {
  display: 'grid',
  gap: '18px',
};