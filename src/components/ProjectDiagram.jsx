export default function ProjectDiagram({ project }) {
  return (
    <figure className="project-diagram" aria-label={`${project.title}: simplified architecture`}>
      <p className="eyebrow">[ system overview ]</p>
      <ol className="diagram-flow">
        {project.flow.map((node, index) => (
          <li key={node.title}>
            <span className="diagram-number" aria-hidden="true">0{index + 1}</span>
            <strong>{node.title}</strong>
            <span className="body-step">{node.detail}</span>
          </li>
        ))}
      </ol>
      <figcaption className="caption">
        Simplified conceptual diagram of the described implementation.
      </figcaption>
    </figure>
  )
}
