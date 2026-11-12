import { metrics } from '../../data/site'

export default function Metrics() {
  return (
    <section className="scope-band" aria-label="Engineering scope and delivery approach">
      <div className="shell"><dl className="metric-grid">
        {metrics.map((m) => <div key={m.caption}><dt className="metric-num">{m.value}</dt><dd className="caption">{m.caption}</dd></div>)}
      </dl></div>
    </section>
  )
}
