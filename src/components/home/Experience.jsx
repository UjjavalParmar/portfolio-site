import ArrowIcon from '../ArrowIcon'
import { experience, profile } from '../../data/site'

export default function Experience() {
  return (
    <section id="experience" className="experience-section" aria-labelledby="experience-title">
      <div className="shell experience-layout">
        <div className="experience-intro">
          <h2 id="experience-title" className="h2">
            Built through <br />hands-on work<span className="accent-text">.</span>
          </h2>
          <p className="body-intro">GlobalVoxInc<br />Ahmedabad, India</p>
          <a href={profile.resume} download className="text-link">The full résumé <ArrowIcon /></a>
        </div>
        <div className="experience-timeline">
          {experience.map(role => (
            <article key={role.title} className="experience-card">
              <p className="experience-date meta">{role.dates}</p>
              <h3 className="h3-card">{role.title}</h3>
              <ul className="body-card">
                {role.bullets.slice(0, 3).map(bullet => <li key={bullet}>{bullet}</li>)}
              </ul>
            </article>
          ))}
          <div className="education">
            <p className="meta">Education / 2020–2024</p>
            <p>B.Tech, Computer Science &amp; Engineering</p>
            <p className="body-step">Pandit Deendayal Energy University · CGPA 8.9/10</p>
          </div>
        </div>
      </div>
    </section>
  )
}
