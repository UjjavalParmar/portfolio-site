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
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '16x16 32x32 48x48' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon-16x16.png', type: 'image/png', sizes: '16x16' },
      { url: '/icon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/icon-192x192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon-512x512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [
      { url: '/icon-152x152.png', sizes: '152x152' },
      { url: '/icon-167x167.png', sizes: '167x167' },
      { url: '/apple-touch-icon.png', sizes: '180x180' },
    ],
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
