import SectionHead from './SectionHead'
import { tools } from '../../data/site'

export default function Stack() {
  return (
    <section id="stack" className="shell section" aria-labelledby="stack-title">
      <SectionHead
        eyebrow="stack"
        title={
          <span id="stack-title">
            Tools I run in production, not just in tutorials.
          </span>
        }
        size="sm"
        gap={28}
      />

      <ul
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          listStyle: 'none',
        }}
      >
        {tools.map((t) => (
          <li key={t} className="chip chip--lg">
            {t}
          </li>
        ))}
      </ul>
    </section>
  )
}
