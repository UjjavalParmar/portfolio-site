import ArrowIcon from './ArrowIcon'

export default function Footer({ bare = false }) {
  return (
    <footer className={`site-footer${bare ? ' site-footer--bare' : ''}`}>
      <div className="shell">
        <span className="footer-mono">© {new Date().getFullYear()} Ujjaval Parmar</span>
        <span className="footer-mono">Built with intent. Deployed with care.</span>
        <a href="#main" className="footer-mono">Back to top <ArrowIcon direction="up" /></a>
      </div>
    </footer>
  )
}
