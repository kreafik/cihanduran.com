// macOS pencere gövdesi (legacy BodyContent'in sade karşılığı).
export default function BodyContent({ children }) {
  return <div style={{ display: 'flex', flex: 1, maxWidth: '100%', minHeight: '28rem', height: '100%' }}>{children}</div>;
}
