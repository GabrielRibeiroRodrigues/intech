import type { Metadata } from 'next'
import './globals.css'
import ScrollReveal from '@/components/ScrollReveal'

const BASE_URL = 'https://intechjr.muz.ifsuldeminas.edu.br'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Intech Jr — Soluções Digitais',
    template: '%s | Intech Jr',
  },
  description:
    'Desenvolvimento web, design gráfico e marketing digital com qualidade e propósito. Empresa júnior do IFSULDEMINAS, campus Muzambinho, MG.',
  keywords: [
    'Intech Jr',
    'empresa júnior',
    'desenvolvimento web',
    'design gráfico',
    'marketing digital',
    'IFSULDEMINAS',
    'Muzambinho',
    'tecnologia',
    'Next.js',
    'React',
  ],
  authors: [{ name: 'Intech Jr.' }],
  creator: 'Intech Jr.',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: BASE_URL,
    siteName: 'Intech Jr',
    title: 'Intech Jr — Soluções Digitais',
    description:
      'Desenvolvimento web, design gráfico e marketing digital com qualidade e propósito. Empresa júnior do IFSULDEMINAS, campus Muzambinho, MG.',
    images: [
      {
        url: '/images/Logo.png',
        width: 1200,
        height: 630,
        alt: 'Intech Jr — Soluções Digitais',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Intech Jr — Soluções Digitais',
    description:
      'Desenvolvimento web, design gráfico e marketing digital com qualidade e propósito. Empresa júnior do IFSULDEMINAS, campus Muzambinho, MG.',
    images: ['/images/Logo.png'],
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
  verification: {
    google: 'HvxkTdE172IrCDEf2jIDRjfRGMCaZgNmaKw26l82OpQ',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <head>
        <link rel="icon" type="image/png" href="/images/Logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
        />
      </head>
      <body>
        <ScrollReveal />
        {children}
      </body>
    </html>
  )
}
