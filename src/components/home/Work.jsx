import ArrowIcon from '../ArrowIcon'
import Link from 'next/link'
import ProjectArt from '../InfrastructureArt'
import { projects } from '../../data/site'

export default function Work() {
  return (
    <section id="work" className="shell section work-section" aria-labelledby="work-title">
      <div className="section-heading">
        <div><h2 id="work-title" className="h2">Inside the <br /><span className="accent-text">infrastructure.</span></h2></div>
        <p className="body-intro">From the first image build to production routing. Four walkthroughs of the problems, the implementation, and the resulting systems.</p>
      </div>
      <div className="project-grid">
        {projects.map((p) => (
          <Link key={p.slug} href={`/work/${p.slug}`} className={`project-card project-card--${p.num}`}>
            <div className="project-preview"><div className="preview-meta"><span>{p.num} / {p.impact}</span><ArrowIcon /></div><ProjectArt slug={p.slug} /><span className="preview-caption">Conceptual architecture</span></div>
            <div className="project-card-copy">
              <div className="project-card-title"><h3 className="h3-card">{p.title}</h3><span className="project-arrow"><ArrowIcon /></span></div>
              <p className="body-card">{p.desc}</p>
              <ul className="project-tags">{p.tech.map(t => <li className="chip" key={t}>{t}</li>)}</ul>
              <span className="text-link">Read the project <ArrowIcon direction="right" /></span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
