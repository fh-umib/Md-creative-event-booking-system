type DecorationAdminStatus = 'all' | 'active' | 'draft';

interface AdminDecorationFiltersProps {
  filters: {
    search: string;
    status: DecorationAdminStatus;
    category: string;
  };
  categories: string[];
  onChange: (value: {
    search: string;
    status: DecorationAdminStatus;
    category: string;
  }) => void;
}

export default function AdminDecorationFilters({
  filters,
  categories,
  onChange,
}: AdminDecorationFiltersProps) {
  return (
    <div style={wrapStyle}>
      <input
        type="text"
        placeholder="Search decoration styles..."
        value={filters.search}
        onChange={(e) =>
          onChange({
            ...filters,
            search: e.target.value,
          })
        }
        style={inputStyle}
      />

      <select
        value={filters.status}
        onChange={(e) =>
          onChange({
            ...filters,
            status: e.target.value as DecorationAdminStatus,
          })
        }
        style={selectStyle}
      >
        <option value="all">All Statuses</option>
        <option value="active">Active</option>
        <option value="draft">Draft</option>
      </select>

      <select
        value={filters.category}
        onChange={(e) =>
          onChange({
            ...filters,
            category: e.target.value,
          })
        }
        style={selectStyle}
      >
        <option value="all">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}

const wrapStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 2fr) 220px 220px',
  gap: '14px',
};

const inputStyle: React.CSSProperties = {
  border: '1px solid #dbe2ea',
  borderRadius: '16px',
  padding: '14px 16px',
  fontSize: '15px',
  outline: 'none',
  background: '#ffffff',
};

const selectStyle: React.CSSProperties = {
  border: '1px solid #dbe2ea',
  borderRadius: '16px',
  padding: '14px 16px',
  fontSize: '15px',
  outline: 'none',
  background: '#ffffff',
};