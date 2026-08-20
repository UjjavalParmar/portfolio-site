/**
 * `bare` renders the footer rule alone, for pages that do not end on the
 * contact block and therefore supply their own leading space.
 */
export default function Footer({ bare = false }) {
  return (
    <footer
      className="shell"
      style={{ paddingBottom: '88px', marginTop: bare ? '80px' : 0 }}
    >
      <div
        style={{
          borderTop: '1px solid var(--line2)',
          marginTop: bare ? 0 : '56px',
          paddingTop: '18px',
          display: 'flex',
          justifyContent: 'space-between',
          gap: '16px',
          flexWrap: 'wrap',
        }}
      >
        <span className="footer-mono">
          © {new Date().getFullYear()} Ujjaval Parmar
        </span>
        <span className="footer-mono">
          built static · deployed on push · 0 runtime dependencies
        </span>
      </div>
    </footer>
  )
}
