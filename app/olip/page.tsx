import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: '15ª OLIP — Olimpíada Interna de Programação | Intech Jr.',
  description:
    'A 15ª edição da Olimpíada Interna de Programação do IFSULDEMINAS está chegando. Mostre suas habilidades, resolva desafios algorítmicos e seja o destaque do campus.',
}

export default function OlipPage() {
  return (
    <>
      <Navbar />

      {/* ── Hero ── */}
      <section className="olip-hero" aria-labelledby="olip-hero-title">
        {/* Background photo */}
        <div
          className="olip-hero__bg"
          style={{ backgroundImage: "url('/images/olip-hero.jpg')" }}
          aria-hidden="true"
        />

        {/* Dark gradient overlay */}
        <div className="olip-hero__overlay" aria-hidden="true" />

        {/* Subtle grid */}
        <div className="olip-hero__grid" aria-hidden="true" />

        {/* Decorative green orbs */}
        <div className="olip-hero__orb olip-hero__orb--1" aria-hidden="true" />
        <div className="olip-hero__orb olip-hero__orb--2" aria-hidden="true" />

        <div className="olip-hero__content">
          {/* Location chip */}
          <div className="olip-hero__badge">
            <span className="olip-hero__badge-dot" aria-hidden="true" />
            IFSULDEMINAS · Campus Muzambinho
          </div>

          {/* Edition number — decorative */}
          <p className="olip-hero__edition" aria-hidden="true">15ª</p>

          <h1 id="olip-hero-title" className="olip-hero__title">
            Olimpíada Interna de{' '}
            <span className="olip-green-text">Programação</span>
          </h1>

          <p className="olip-hero__subtitle">
            Mostre suas habilidades, resolva desafios algorítmicos e seja o
            destaque do IFSULDEMINAS.
          </p>

          {/* Date + location meta */}
          <div className="olip-hero__meta" aria-label="Data e local do evento">
            <div className="olip-hero__meta-item">
              <i className="bi bi-calendar-event-fill" aria-hidden="true" />
              <span>20 de junho de 2026</span>
            </div>
            <div className="olip-hero__meta-divider" aria-hidden="true" />
            <div className="olip-hero__meta-item">
              <i className="bi bi-geo-alt-fill" aria-hidden="true" />
              <span>Muzambinho · MG</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="olip-hero__cta">
            <a href="#inscricao" className="btn btn-lg olip-btn-primary">
              <i className="bi bi-pencil-square" aria-hidden="true" />
              Inscreva-se
            </a>
            <a href="#sobre" className="btn btn-ghost btn-lg">
              Saiba mais
              <i className="bi bi-arrow-down" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hero__scroll" aria-hidden="true">
          <i className="bi bi-chevron-compact-down" style={{ fontSize: '1.4rem' }} />
          <span>scroll</span>
        </div>
      </section>

      <main>
        {/* Remaining sections will be added here */}
      </main>
    </>
  )
}
