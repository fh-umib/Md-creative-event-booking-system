interface AdminBookingStatusBadgeProps {
  label: string;
  variant?: 'status' | 'payment';
}

export default function AdminBookingStatusBadge({
  label,
  variant = 'status',
}: AdminBookingStatusBadgeProps) {
  const style = getBadgeStyle(label, variant);

  return <span style={style}>{label}</span>;
}

function getBadgeStyle(label: string, variant: 'status' | 'payment'): React.CSSProperties {
  const base: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '8px 12px',
    borderRadius: '999px',
    fontSize: '13px',
    fontWeight: 800,
  };

  if (variant === 'status') {
    if (label === 'Pending') return { ...base, background: '#fff7ed', color: '#c2410c' };
    if (label === 'Approved') return { ...base, background: '#eff6ff', color: '#1d4ed8' };
    if (label === 'Completed') return { ...base, background: '#ecfdf5', color: '#047857' };
    if (label === 'Cancelled') return { ...base, background: '#fff1f2', color: '#be123c' };
  }

  if (variant === 'payment') {
    if (label === 'Unpaid') return { ...base, background: '#fff1f2', color: '#be123c' };
    if (label === 'Partially Paid') return { ...base, background: '#fff7ed', color: '#c2410c' };
    if (label === 'Paid') return { ...base, background: '#ecfdf5', color: '#047857' };
    if (label === 'Refunded') return { ...base, background: '#f1f5f9', color: '#334155' };
  }

  return { ...base, background: '#f3f4f6', color: '#4b5563' };
}