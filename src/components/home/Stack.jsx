import Link from 'next/link'
import ArrowIcon from '../ArrowIcon'
import { skillGroups } from '../../data/site'

export default function Stack() {
  return (
    <section id="stack" className="shell section stack-section" aria-labelledby="stack-title">
      <div className="section-heading">
        <h2 id="stack-title" className="h2">The working stack.</h2>
        <p className="body-intro">The tools matter. What I build with them matters more.</p>
      </div>
      <dl className="skills-matrix">
        {skillGroups.map(group => (
          <div key={group.title} className="skill-row">
            <dt className="h3-step">{group.title}</dt>
            <dd>
              <p className="skill-tools">{group.tools}</p>
              <p className="body-card">{group.evidence}</p>
              {group.href && (
                <Link className="skill-link" href={group.href}>See it in the work <ArrowIcon /></Link>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
