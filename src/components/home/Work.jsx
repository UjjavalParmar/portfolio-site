import Link from 'next/link'
import SectionHead from './SectionHead'
import { projects } from '../../data/site'

export default function Work() {
  return (
    <section id="work" className="shell section" aria-labelledby="work-title">
      <SectionHead
        eyebrow="selected work"
        title={
          <span id="work-title">Four systems, and what they cost to run.</span>
        }
        titleWidth="24ch"
        intro="Each one opens into a full writeup: the constraint, the architecture, what broke first, and the numbers after."
        introWidth="54ch"
      />

      <div className="rule-grid grid-2">
        {projects.map((p) => (
          <Link
            key={p.num}
            href={p.href}
            className="work-card"
            style={{
              padding: '30px 32px 28px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                gap: '16px',
              }}
            >
              <span className="meta">{p.num}</span>
              <span
                className="meta meta--strong"
                style={{ color: 'var(--accent)', letterSpacing: '.06em' }}
              >
                {p.impact}
              </span>
            </div>

            <h3 className="h3-card" style={{ margin: 0, maxWidth: '22ch' }}>
              {p.title}
            </h3>

            <p className="body-card" style={{ margin: 0, maxWidth: '46ch' }}>
              {p.desc}
            </p>

            <ul
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '6px',
                marginTop: '4px',
                listStyle: 'none',
              }}
            >
              {p.tech.map((t) => (
                <li key={t} className="chip">
                  {t}
                </li>
              ))}
            </ul>

            <span
              style={{
                font: '600 14px/1 var(--font-sans), sans-serif',
                color: 'var(--accent)',
                marginTop: '6px',
              }}
            >
              Read the writeup →
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
