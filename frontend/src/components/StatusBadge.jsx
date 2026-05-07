const COLOR_MAP = {
  PENDING:          { bg: '#fef3c7', color: '#92400e' },
  ACCEPTED:         { bg: '#dbeafe', color: '#1e40af' },
  ASSIGNED:         { bg: '#ede9fe', color: '#5b21b6' },
  PICKED_UP:        { bg: '#cffafe', color: '#155e75' },
  OUT_FOR_DELIVERY: { bg: '#ffedd5', color: '#9a3412' },
  DELIVERED:        { bg: '#dcfce7', color: '#166534' },
  REJECTED:         { bg: '#fee2e2', color: '#991b1b' },
};

export default function StatusBadge({ status }) {
  const style = COLOR_MAP[status] || { bg: '#f3f4f6', color: '#374151' };
  return (
    <span style={{
      background: style.bg,
      color: style.color,
      padding: '4px 12px',
      borderRadius: 20,
      fontSize: 12,
      fontWeight: 600,
      display: 'inline-block',
    }}>
      {status?.replace(/_/g, ' ')}
    </span>
  );
}