interface BookingErrorStateProps {
  title?: string;
  message: string;
}

export default function BookingErrorState({
  title = 'Something went wrong',
  message,
}: BookingErrorStateProps) {
  return (
    <div style={boxStyle}>
      <h3 style={titleStyle}>{title}</h3>
      <p style={textStyle}>{message}</p>
    </div>
  );
}

const boxStyle: React.CSSProperties = {
  borderRadius: '24px',
  border: '1px solid #fecaca',
  background: '#fff1f2',
  padding: '36px 24px',
  textAlign: 'center',
};

const titleStyle: React.CSSProperties = {
  margin: '0 0 10px',
  color: '#111827',
  fontSize: '28px',
  fontWeight: 800,
};

const textStyle: React.CSSProperties = {
  margin: 0,
  color: '#6b7280',
  lineHeight: 1.7,
};