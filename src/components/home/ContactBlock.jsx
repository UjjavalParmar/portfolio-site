import ArrowIcon from '../ArrowIcon'
import { profile } from '../../data/site'

export default function ContactBlock() {
  return (
    <section id="contact" className="contact-section" aria-labelledby="contact-title">
      <div className="shell">
        <div className="contact-grid">
          <h2 id="contact-title" className="contact-title">
            Your next <br />DevOps engineer<span>.</span>
          </h2>
          <div className="contact-copy">
            <p>
              Send me the role and the infrastructure challenge your team is working on.
              I’m open to opportunities worldwide, including remote work and relocation.
            </p>
            <a href={`mailto:${profile.email}`} className="btn btn--ink">
              Let’s talk <ArrowIcon />
            </a>
            <a className="contact-email" href={`mailto:${profile.email}`}>{profile.email}</a>
          </div>
        </div>
        <div className="contact-links">
          <a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub <ArrowIcon /></a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <ArrowIcon /></a>
          <a href={profile.phoneHref}>{profile.phone}</a>
          <a href={profile.resume} download>Download résumé <ArrowIcon direction="down" /></a>
        </div>
      </div>
    </section>
  )
}
