import HomePage from '../src/components/HomePage'
import { profile } from '../src/data/site'

export const metadata = {
  alternates: {
    canonical: '/',
  },
}

export default function Page() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.devopslife.space'

  // JSON-LD Person Schema for SEO
  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Ujjaval Parmar',
    url: siteUrl,
    jobTitle: 'DevOps Engineer',
    description:
      'DevOps Engineer building GitOps pipelines for 10+ microservices and reusable Helm delivery across five environments on AWS.',
    sameAs: [
      profile.github,
      profile.linkedin,
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
      'DevOps engineering work by Ujjaval Parmar: GitOps delivery, reusable Helm charts, Terraform on AWS, and Kubernetes Gateway API.',
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
