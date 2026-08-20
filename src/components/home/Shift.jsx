import SectionHead from './SectionHead'
import { shift } from '../../data/site'

function Panel({ label, rows, tone }) {
  const after = tone === 'after'
  return (
    <div style={{ padding: '30px 32px' }}>
      <p
        className="meta meta--strong"
        style={{
          marginBottom: '20px',
          color: after ? 'var(--accent)' : 'var(--fg3)',
        }}
      >
        {label}
      </p>
      <ul
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          listStyle: 'none',
        }}
      >
        {rows.map((row) => (
          <li
            key={row}
            style={{
              display: 'grid',
              gridTemplateColumns: '16px 1fr',
              gap: '12px',
              font: '400 15px/1.55 var(--font-sans), sans-serif',
              color: after ? 'var(--fg)' : 'var(--fg2)',
            }}
          >
            <span
              aria-hidden="true"
              style={{ color: after ? 'var(--ok)' : 'var(--bad)' }}
            >
              {after ? '✓' : '✕'}
            </span>
            <span>{row}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Shift() {
  return (
    <section className="shell section" aria-labelledby="shift-title">
      <SectionHead
        eyebrow="the shift"
        title={
          <span id="shift-title">What changed when I owned the pipeline.</span>
        }
        titleWidth="24ch"
        intro="Same team, same services. The difference is what a release asks of a person."
        introWidth="52ch"
        gap={36}
      />

      <div className="rule-grid rule-grid--panel grid-2">
        <Panel label="BEFORE" rows={shift.before} tone="before" />
        <Panel label="AFTER" rows={shift.after} tone="after" />
      </div>
    </section>
  )
}
