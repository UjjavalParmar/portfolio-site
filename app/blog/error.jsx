'use client'
export default function BlogError({reset}) {
  return <main id="main" className="shell section"><p className="eyebrow">[ engineering notes ]</p><h1 className="h2">The blog is temporarily unavailable.</h1><p className="body-intro" style={{marginBlock:24}}>Please try again in a moment.</p><button className="btn btn--primary" onClick={reset}>Try again</button></main>
}
