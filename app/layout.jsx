import { Anton, Public_Sans, IBM_Plex_Mono } from 'next/font/google'
import { SpeedInsights } from '@vercel/speed-insights/next'
import '../src/index.css'

const display = Anton({
  subsets: ['latin'],
  weight: '400',
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
    'Ujjaval Parmar, DevOps Engineer. GitOps pipelines for 10+ microservices, Helm delivery across five environments, Terraform on AWS, and production Gateway API migration.',
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
      'DevOps Engineer building repeatable Kubernetes delivery with AWS, Terraform, Helm, Jenkins, and Argo CD. Open to opportunities worldwide.',
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
      'DevOps Engineer building repeatable Kubernetes delivery with AWS, Terraform, Helm, Jenkins, and Argo CD. Open to opportunities worldwide.',
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
      { url: '/favicon.ico?v=up1', sizes: '16x16 32x32 48x48' },
      { url: '/icon-16x16.png?v=up1', type: 'image/png', sizes: '16x16' },
      { url: '/icon-32x32.png?v=up1', type: 'image/png', sizes: '32x32' },
      { url: '/icon-192x192.png?v=up1', type: 'image/png', sizes: '192x192' },
      { url: '/icon-512x512.png?v=up1', type: 'image/png', sizes: '512x512' },
      { url: '/favicon.svg?v=up1', type: 'image/svg+xml', sizes: 'any' },
    ],
    apple: [
      { url: '/icon-152x152.png?v=up1', sizes: '152x152' },
      { url: '/icon-167x167.png?v=up1', sizes: '167x167' },
      { url: '/apple-touch-icon.png?v=up1', sizes: '180x180' },
    ],
  },
  manifest: '/site.webmanifest?v=up1',
}

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#10110e' },
    { media: '(prefers-color-scheme: light)', color: '#f0f0e8' },
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
