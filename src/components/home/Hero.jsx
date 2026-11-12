import ArrowIcon from '../ArrowIcon'
import Image from 'next/image'
import { profile } from '../../data/site'
import { HeroInfrastructure } from '../InfrastructureArt'

export default function Hero() {
  return (
    <section className="hero grid-paper" aria-labelledby="hero-title">
      <div className="shell hero-stage">
        <div className="hero-topline">
          <p className="eyebrow">DevOps engineer / Ahmedabad, India</p>
          <p className="hero-availability"><span aria-hidden="true" /> Open to roles worldwide</p>
        </div>
        <h1 id="hero-title" className="hero-name"><span>Ujjaval</span><span>Parmar<span className="name-period">.</span></span></h1>
        <figure className="hero-art"><HeroInfrastructure /><figcaption>Infrastructure, illustrated. / Conceptual view</figcaption></figure>
        <div className="hero-intro">
          <div className="hero-identity">
            <Image
              src="/ujjaval-parmar.jpeg"
              alt="Ujjaval Parmar"
              width={72}
              height={72}
              className="hero-portrait"
              priority
              unoptimized
            />
            <p className="hero-role">I build the systems <br />behind the software.</p>
          </div>
          <p className="body-card">Associate DevOps Engineer at GlobalVoxInc. GitOps pipelines, reusable Helm charts, and AWS infrastructure for repeatable deployments.</p>
          <a href="#work" className="text-link">Explore my work <ArrowIcon direction="down-right" /></a>
        </div>
        <div className="hero-actions">
          <p className="meta">AWS · Kubernetes · Terraform · GitOps</p>
          <a href={profile.resume} download className="btn btn--primary">Download résumé <ArrowIcon /></a>
        </div>
        <div className="hero-bottom"><span className="meta">Build. Declare. Reconcile. Observe.</span><a href="#work" className="meta">Scroll to explore <ArrowIcon direction="down" /></a></div>
      </div>
    </section>
  )
}
