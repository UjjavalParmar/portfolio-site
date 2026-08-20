import { Bricolage_Grotesque, Public_Sans, IBM_Plex_Mono } from 'next/font/google'
import { SpeedInsights } from '@vercel/speed-insights/next'
import '../src/index.css'

const display = Bricolage_Grotesque({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
})

const sans = Public_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-mono',
})

// Resolves the stored theme before first paint so the page never flashes the
// wrong token set. Storage access is guarded — the site must still render if
// localStorage is unavailable.
const themeScript = `(function(){try{var t=localStorage.getItem('up-portfolio-theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}})()`

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.devopslife.space'),
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
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Ujjaval Parmar - DevOps Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ujjaval Parmar | DevOps Engineer',
    description:
      'Associate DevOps Engineer specializing in cloud infrastructure, Kubernetes, and CI/CD automation.',
    images: ['/og-image.png'],
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

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0F1113' },
    { media: '(prefers-color-scheme: light)', color: '#FFFFFF' },
  ],
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a href="#main" className="sr-only-focusable">
          Skip to content
        </a>
        {children}
        <SpeedInsights />
      </body>
    </html>
  )
}
