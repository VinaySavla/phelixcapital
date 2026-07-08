import './globals.css'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/next'

export const metadata = {
  metadataBase: new URL('https://phelixcap.in'),
  title: {
    default: 'Phelix Capital',
    template: '%s | Phelix Capital'
  },
  description: 'Phelix Capital helps investors build sustainable wealth through transparent, research-driven mutual fund solutions.',
  keywords: [
    'Phelix Capital',
    'mutual fund distributor',
    'investment advisory',
    'financial planning',
    'wealth management',
    'research driven investing'
  ],
  authors: [{ name: 'Shobhit Bhansali' }],
  creator: 'Shobhit Bhansali',
  publisher: 'Phelix Capital',
  icons: {
    icon: '/favicon.ico'
  },
  alternates: {
    canonical: '/'
  },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'Phelix Capital',
    title: 'Phelix Capital',
    description: 'Transparent, research-driven mutual fund solutions for long-term wealth building.',
    images: [
      {
        url: '/phelixcapitallogodark.png',
        width: 1200,
        height: 630,
        alt: 'Phelix Capital'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Phelix Capital',
    description: 'Transparent, research-driven mutual fund solutions for long-term wealth building.',
    images: ['/phelixcapitallogodark.png']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1
    }
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="canonical" href="https://phelixcap.in" />
      </head>
      <body>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-QBW07SEV1Z"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'G-QBW07SEV1Z');`}
        </Script>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
