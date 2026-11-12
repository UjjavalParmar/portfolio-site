import Link from 'next/link'
import { notFound } from 'next/navigation'
import Nav from '../../../src/components/Nav'
import Footer from '../../../src/components/Footer'
import ContactBlock from '../../../src/components/home/ContactBlock'
import ProjectDiagram from '../../../src/components/ProjectDiagram'
import { projects } from '../../../src/data/site'

export const dynamicParams = false

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }))
}

export function generateMetadata({ params }) {
  const project = projects.find(({ slug }) => slug === params.slug)
  if (!project) notFound()
  return {
    title: project.title,
    description: project.desc,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: { title: project.title, description: project.desc, url: `/work/${project.slug}` },
  }
}

export default function ProjectPage({ params }) {
  const project = projects.find(({ slug }) => slug === params.slug)
  if (!project) notFound()

  return (
    <>
      <Nav />
      <main id="main">
        <article className="shell project-page">
          <Link href="/#work" className="link-mono">← All selected work</Link>
          <header className="project-header">
            <p className="eyebrow">[ selected work · {project.num} ]</p>
            <h1 className="h1">{project.title}</h1>
            <p className="lead">{project.desc}</p>
            <ul className="project-tags">
              {project.tech.map((tool) => <li className="chip" key={tool}>{tool}</li>)}
            </ul>
          </header>
          <ProjectDiagram project={project} />
          <div className="project-narrative article-body">
            <section aria-labelledby="problem-title">
              <h2 id="problem-title" className="h2 h2--sm">The problem</h2>
              <p>{project.problem}</p>
            </section>
            <section aria-labelledby="contribution-title">
              <h2 id="contribution-title" className="h2 h2--sm">What I implemented</h2>
              <ul>{project.contribution.map((item) => <li key={item}>{item}</li>)}</ul>
            </section>
            <section aria-labelledby="outcome-title">
              <h2 id="outcome-title" className="h2 h2--sm">The resulting system</h2>
              <p>{project.outcome}</p>
            </section>
            <section aria-labelledby="considerations-title">
              <h2 id="considerations-title" className="h2 h2--sm">Design considerations</h2>
              <p>{project.considerations}</p>
            </section>
          </div>
          <nav className="project-related" aria-label="Other projects">
            <p className="eyebrow">[ more work ]</p>
            {projects.filter(({ slug }) => slug !== project.slug).map((other) => (
              <Link key={other.slug} href={`/work/${other.slug}`} className="body-card">{other.title} →</Link>
            ))}
          </nav>
        </article>
        <ContactBlock />
      </main>
      <Footer />
    </>
  )
}
