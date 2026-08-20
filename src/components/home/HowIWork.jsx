import SectionHead from './SectionHead'
import { steps } from '../../data/site'

export default function HowIWork() {
  return (
    <section id="how" className="shell section" aria-labelledby="how-title">
      <SectionHead
        eyebrow="how it works"
        title={
          <span id="how-title">
            From commit to production, with no human in the path.
          </span>
        }
        titleWidth="26ch"
      />

      <ol className="rule-grid grid-4" style={{ listStyle: 'none' }}>
        {steps.map((s) => (
          <li key={s.num} style={{ padding: '28px 24px' }}>
            <p className="meta meta--strong" style={{ marginBottom: '18px' }}>
              {s.num}
            </p>
            <h3 className="h3-step" style={{ margin: '0 0 10px' }}>
              {s.title}
            </h3>
            <p className="body-step" style={{ margin: 0 }}>
              {s.desc}
            </p>
          </li>
        ))}
      </ol>
    </section>
  )
}
