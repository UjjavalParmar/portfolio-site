import { pipeline, profile } from '../../data/site'

function PipelinePanel() {
  return (
    <div
      style={{ border: '1px solid var(--line)', background: 'var(--panel)' }}
      aria-label="Deployment pipeline status"
      role="group"
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '13px 16px',
          borderBottom: '1px solid var(--line)',
        }}
      >
        <span className="meta" style={{ whiteSpace: 'nowrap' }}>
          {pipeline.service}
        </span>
        <span
          className="meta meta--strong"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '7px',
            color: 'var(--ok)',
            letterSpacing: 'normal',
          }}
        >
          <span className="dot" style={{ background: 'var(--ok)' }} />
          {pipeline.status}
        </span>
      </div>

      <ul style={{ listStyle: 'none' }}>
        {pipeline.steps.map((step) => (
          <li
            key={step.label}
            style={{
              display: 'grid',
              gridTemplateColumns: '18px 1fr auto',
              gap: '12px',
              alignItems: 'center',
              padding: '12px 16px',
              borderBottom: '1px solid var(--line2)',
            }}
          >
            <span
              aria-hidden="true"
              style={{
                font: '400 11px var(--font-mono), monospace',
                color: `var(--${step.tone})`,
              }}
            >
              {step.glyph}
            </span>
            <span style={{ font: '400 13px var(--font-sans), sans-serif' }}>
              {step.label}
            </span>
            <span
              style={{
                font: `${step.tone === 'accent' ? 500 : 400} 11px var(--font-mono), monospace`,
                color: step.tone === 'accent' ? 'var(--accent)' : 'var(--fg3)',
              }}
            >
              {step.timing}
            </span>
          </li>
        ))}
      </ul>

      <div
        style={{
          padding: '14px 16px',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <span className="meta" style={{ whiteSpace: 'nowrap', letterSpacing: 'normal' }}>
          {pipeline.footer.label}
        </span>
        <span
          className="meta meta--strong"
          style={{ color: 'var(--fg)', letterSpacing: 'normal' }}
        >
          {pipeline.footer.value}
        </span>
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section className="shell hero-grid" aria-labelledby="hero-title">
      <div>
        <p className="eyebrow" style={{ marginBottom: '26px' }}>
          [ infrastructure &amp; delivery ]
        </p>
        <h1
          id="hero-title"
          className="h1"
          style={{ margin: '0 0 24px', maxWidth: '18ch' }}
        >
          I keep deployments <em>boring.</em>
        </h1>
        <p className="lead" style={{ margin: '0 0 32px', maxWidth: '50ch' }}>
          Associate DevOps Engineer at GlobalVox. I build the pipelines,
          clusters and monitoring that let five microservices ship on a Friday
          without anyone watching a dashboard.
        </p>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <a href="#work" className="btn btn--primary">
            Read a case study
          </a>
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--ghost"
          >
            Download résumé
          </a>
        </div>
        <p className="mono-13" style={{ marginTop: '34px' }}>
          {profile.location}&nbsp;·&nbsp;open to remote
        </p>
      </div>

      <PipelinePanel />
    </section>
  )
}
