import { profile } from '../../data/site'

export default function ContactBlock() {
  const links = [
    { label: 'GitHub', href: profile.github, external: true },
    { label: 'LinkedIn', href: profile.linkedin, external: true },
    { label: profile.phone, href: profile.phoneHref },
  ]

  return (
    <section
      id="contact"
      className="shell section"
      aria-labelledby="contact-title"
    >
      <div className="contact-grid">
        <div>
          <h2
            id="contact-title"
            className="h2 h2--lg"
            style={{ margin: '0 0 16px', maxWidth: '22ch' }}
          >
            Hiring for infrastructure that has to stay up?
          </h2>
          <p className="body-contact" style={{ margin: 0, maxWidth: '46ch' }}>
            I reply within a day. Happy to walk through any of the case studies
            in detail.
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            alignItems: 'flex-start',
          }}
        >
          <a
            href={`mailto:${profile.email}`}
            className="btn btn--primary"
            style={{ whiteSpace: 'nowrap' }}
          >
            {profile.email}
          </a>
          <ul
            style={{
              display: 'flex',
              gap: '20px',
              flexWrap: 'wrap',
              paddingLeft: '2px',
              listStyle: 'none',
            }}
          >
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="link-mono"
                  {...(l.external
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
