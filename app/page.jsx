import HomePage from '../src/components/HomePage'

export const metadata = {
  alternates: {
    canonical: '/',
  },
}

export default function Page() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ujjavaldeploys.in'

  // JSON-LD Person Schema for SEO
  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Ujjaval Parmar',
    url: siteUrl,
    jobTitle: 'DevOps Engineer',
    description:
      'Associate DevOps Engineer specializing in AWS, Kubernetes, CI/CD, and cloud infrastructure.',
    sameAs: [
      'https://github.com/UjjavalParmar',
      'https://linkedin.com/in/ujjavalparmar',
    ],
    knowsAbout: [
      'DevOps',
      'AWS',
      'Kubernetes',
      'Docker',
      'CI/CD',
      'Terraform',
      'Jenkins',
      'ArgoCD',
      'Cloud Infrastructure',
    ],
  }

  // JSON-LD WebSite Schema
  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Ujjaval Parmar | DevOps Engineer',
    url: siteUrl,
    description:
      'Portfolio of Ujjaval Parmar - Associate DevOps Engineer specializing in AWS, Kubernetes, CI/CD, and cloud infrastructure.',
    author: {
      '@type': 'Person',
      name: 'Ujjaval Parmar',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <HomePage />
    </>
  )
}
