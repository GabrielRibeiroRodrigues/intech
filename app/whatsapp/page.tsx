import { cookies } from 'next/headers'
import type { Metadata } from 'next'
import {
  WHATSAPP_SESSION_COOKIE,
  isValidSessionToken,
} from '@/lib/whatsappAuth'
import WhatsappLoginForm from '@/components/WhatsappLoginForm'

export const metadata: Metadata = {
  title: 'Portal WhatsApp — Intech Jr.',
  robots: { index: false, follow: false },
}

export default async function WhatsappPortalPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get(WHATSAPP_SESSION_COOKIE)?.value
  const authenticated = isValidSessionToken(token)

  return (
    <main className="whatsapp-portal">
      <div className="whatsapp-portal__card">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/Logo.png" alt="Intech Jr." className="whatsapp-portal__logo" />
        <h1 className="whatsapp-portal__title">Portal WhatsApp</h1>

        {authenticated ? (
          <>
            <p className="whatsapp-portal__text">
              Clique abaixo para abrir o WhatsApp Web da empresa.
            </p>
            <a
              href="https://web.whatsapp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-portal__button"
            >
              <i className="bi bi-whatsapp" aria-hidden="true" /> Abrir WhatsApp Web
            </a>
          </>
        ) : (
          <>
            <p className="whatsapp-portal__text">Acesso restrito à equipe de vendas.</p>
            <WhatsappLoginForm />
          </>
        )}
      </div>
    </main>
  )
}
