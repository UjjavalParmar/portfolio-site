import { Inter } from 'next/font/google'
import '../src/index.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://ujjavaldeploys.in'),
  title: {
    default: 'Ujjaval Parmar | DevOps Engineer',
    template: '%s | Ujjaval Parmar',
  },
  description:
    'Ujjaval Parmar - Associate DevOps Engineer specializing in AWS, Kubernetes, CI/CD, and cloud infrastructure. Building scalable, secure, and automated solutions.',
  keywords: [
    'DevOps Engineer',
    'AWS',
    'Kubernetes',
    'CI/CD',
    'Cloud Infrastructure',
    'Terraform',
    'Jenkins',
    'ArgoCD',
  ],
  authors: [{ name: 'Ujjaval Parmar' }],
  creator: 'Ujjaval Parmar',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Ujjaval Parmar',
    title: 'Ujjaval Parmar | DevOps Engineer',
    description:
      'Associate DevOps Engineer specializing in cloud infrastructure, Kubernetes, and CI/CD automation.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ujjaval Parmar | DevOps Engineer',
    description:
      'Associate DevOps Engineer specializing in cloud infrastructure, Kubernetes, and CI/CD automation.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
