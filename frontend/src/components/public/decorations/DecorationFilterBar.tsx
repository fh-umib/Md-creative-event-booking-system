import type { DecorationFilterTag } from '../../../data/decorations';

interface DecorationFilterBarProps {
  filters: DecorationFilterTag[];
  selectedFilter: DecorationFilterTag | 'all';
  onChange: (value: DecorationFilterTag | 'all') => void;
}

export default function DecorationFilterBar({
  filters,
  selectedFilter,
  onChange,
}: DecorationFilterBarProps) {
  return (
    <div style={wrapStyle}>
      <button
        type="button"
        onClick={() => onChange('all')}
        style={{
          ...buttonStyle,
          ...(selectedFilter === 'all' ? activeButtonStyle : {}),
        }}
      >
        All Styles
      </button>

      {filters.map((filter) => (
        <button
          key={filter}
          type="button"
          onClick={() => onChange(filter)}
          style={{
            ...buttonStyle,
            ...(selectedFilter === filter ? activeButtonStyle : {}),
          }}
        >
          {formatLabel(filter)}
        </button>
      ))}
    </div>
  );
}

function formatLabel(value: string) {
  return value
    .split('-')
    .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
    .join(' ');
}

const wrapStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  gap: '12px',
  flexWrap: 'wrap',
  marginBottom: '34px',
};

const buttonStyle: React.CSSProperties = {
  border: '1px solid #e7dccb',
  background: '#ffffff',
  color: '#334155',
  padding: '12px 18px',
  borderRadius: '999px',
  fontWeight: 700,
  cursor: 'pointer',
};

const activeButtonStyle: React.CSSProperties = {
  background: '#d99a1d',
  color: '#111827',
  border: '1px solid #d99a1d',
};