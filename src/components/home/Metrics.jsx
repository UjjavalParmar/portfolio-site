import { metrics } from '../../data/site'

export default function Metrics() {
  return (
    <section className="shell section" aria-label="Impact in numbers">
      <dl className="metric-grid">
        {metrics.map((m) => (
          <div key={m.caption}>
            <dt
              className="metric-num"
              style={m.accent ? { color: 'var(--accent)' } : undefined}
            >
              {m.value}
            </dt>
            <dd className="caption" style={{ marginTop: '8px' }}>
              {m.caption}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
