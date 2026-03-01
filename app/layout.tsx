import type { Metadata } from 'next'
import './globals.css'
import ScrollReveal from '@/components/ScrollReveal'

export const metadata: Metadata = {
  title: 'Intech Jr — Soluções Digitais',
  description:
    'Desenvolvimento web, design gráfico e marketing digital com qualidade e propósito. Baseada em Muzambinho, MG.',
  authors: [{ name: 'Intech Jr.' }],
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
