interface DecorationEmptyStateProps {
  title?: string;
  message?: string;
}

export default function DecorationEmptyState({
  title = 'Nothing to show yet',
  message = 'No decoration items were found for this section.',
}: DecorationEmptyStateProps) {
  return (
    <div style={boxStyle}>
      <div style={iconStyle}>◇</div>
      <h3 style={titleStyle}>{title}</h3>
      <p style={textStyle}>{message}</p>
    </div>
  );
}

const boxStyle: React.CSSProperties = {
  borderRadius: '24px',
  padding: '48px 24px',
  background: '#ffffff',
  border: '1px solid #ece6dc',
  textAlign: 'center',
};

const iconStyle: React.CSSProperties = {
  color: '#d99a1d',
  fontSize: '34px',
  marginBottom: '10px',
};

const titleStyle: React.CSSProperties = {
  margin: '0 0 10px',
  color: '#111827',
  fontSize: '28px',
  fontWeight: 800,
};

const textStyle: React.CSSProperties = {
  margin: 0,
  color: '#667085',
  lineHeight: 1.7,
};