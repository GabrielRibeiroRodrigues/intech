import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import OlipGallery from '@/components/OlipGallery'
import OlipChampions from '@/components/OlipChampions'

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
        {/* ── Sobre o Evento + Edição Atual ── */}
        <section id="sobre" className="section olip-about" aria-labelledby="olip-about-title">
          <div className="container">
            <div className="about__grid">

              {/* Poster image */}
              <div className="about__image-wrap reveal">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/olip-poster.jpg"
                  alt="Arte oficial da 15ª OLIP"
                  className="olip-about__poster"
                />
              </div>

              {/* Content */}
              <div className="reveal" style={{ '--i': 1 } as React.CSSProperties}>
                <div className="section-chip olip-section-chip">
                  <i className="bi bi-trophy-fill" />
                  Sobre o Evento
                </div>
                <h2 id="olip-about-title" className="section-title">
                  O maior evento de programação{' '}
                  <span className="olip-green-text">do IFSULDEMINAS</span>
                </h2>
                <p className="about__text">
                  A OLIP fomenta o raciocínio lógico e a resolução de problemas, preparando
                  os alunos para competições nacionais como a Maratona de Programação da SBC.
                  Aberta a todos os alunos regulares dos institutos federais.
                </p>
                <p className="about__text">
                  A competição envolve a resolução de problemas algorítmicos em tempo
                  limitado com linguagens como C, C++, Java ou Python, submetidos em
                  plataforma de juiz online.
                </p>

                <div className="olip-info__grid">
                  {[
                    { icon: 'bi-calendar-event-fill', label: 'Data',    value: '20 de junho de 2026' },
                    { icon: 'bi-geo-alt-fill',         label: 'Local',   value: 'Laboratórios de Informática · IFSULDEMINAS Muzambinho' },
                    { icon: 'bi-people-fill',           label: 'Equipes', value: 'Até 3 integrantes por equipe. Consulta a material impresso permitida.' },
                    { icon: 'bi-trophy-fill',           label: 'Formato', value: 'Maratona SBC — balões por questão correta.' },
                  ].map(({ icon, label, value }) => (
                    <div key={label} className="olip-info__item">
                      <div className="olip-info__item-icon" aria-hidden="true">
                        <i className={`bi ${icon}`} />
                      </div>
                      <div>
                        <p className="olip-info__item-label">{label}</p>
                        <p className="olip-info__item-value">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── Galeria ── */}
        <section id="galeria" className="section olip-gallery-section" aria-labelledby="olip-gallery-title">
          <div className="container">
            <div className="section-header reveal">
              <div className="section-chip olip-section-chip">
                <i className="bi bi-images" />
                Galeria
              </div>
              <h2 id="olip-gallery-title" className="section-title">
                Momentos de cada{' '}
                <span className="olip-green-text">edição</span>
              </h2>
              <p className="section-subtitle">
                Relembre os melhores momentos das edições passadas e inspire-se para a próxima.
              </p>
            </div>

            <div className="reveal" style={{ '--i': 1 } as React.CSSProperties}>
              <OlipGallery />
            </div>
          </div>
        </section>
        {/* ── Histórico e Campeões ── */}
        <section id="historico" className="section olip-champ-section" aria-labelledby="olip-champ-title">
          <div className="container">
            <div className="section-header reveal">
              <div className="section-chip olip-section-chip">
                <i className="bi bi-trophy-fill" />
                Histórico
              </div>
              <h2 id="olip-champ-title" className="section-title">
                Campeões de cada{' '}
                <span className="olip-green-text">edição</span>
              </h2>
              <p className="section-subtitle">
                Conheça as equipes que deixaram sua marca na história da OLIP.
              </p>
            </div>

            <div className="reveal" style={{ '--i': 1 } as React.CSSProperties}>
              <OlipChampions />
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="footer" role="contentinfo">
        <div className="container">
          <div className="footer__top">
            <div className="footer__brand-col">
              <div className="footer__brand">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/Logo.png" alt="Logo Intech Jr." className="footer__logo" />
                <span className="footer__name">Intech Jr.</span>
              </div>
              <p className="footer__tagline">
                Soluções digitais em desenvolvimento web, design e marketing.
                Baseada em Muzambinho — MG.
              </p>
              <div className="footer__social">
                <a
                  href="https://www.instagram.com/intech.jr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__social-link"
                  aria-label="Instagram da Intech Jr."
                >
                  <i className="bi bi-instagram" aria-hidden="true" />
                </a>
                <a
                  href="https://www.facebook.com/aajracam?locale=pt_BR"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__social-link"
                  aria-label="Facebook da Intech Jr."
                >
                  <i className="bi bi-facebook" aria-hidden="true" />
                </a>
                <a
                  href="https://wa.me/35910010967"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__social-link"
                  aria-label="WhatsApp da Intech Jr."
                >
                  <i className="bi bi-whatsapp" aria-hidden="true" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="footer__heading">Navegação</h4>
              <nav className="footer__links" aria-label="Links do rodapé">
                <a href="/#services" className="footer__link">Serviços</a>
                <a href="/#about" className="footer__link">Sobre nós</a>
                <a href="/#portfolio" className="footer__link">Portfólio</a>
                <a href="/#contact" className="footer__link">Contato</a>
              </nav>
            </div>

            <div>
              <h4 className="footer__heading">Serviços</h4>
              <nav className="footer__links" aria-label="Serviços oferecidos">
                <a href="/#services" className="footer__link">Desenvolvimento Web</a>
                <a href="/#services" className="footer__link">Design Gráfico</a>
                <a href="/#services" className="footer__link">Marketing Digital</a>
              </nav>
            </div>

            <div>
              <h4 className="footer__heading">Contato</h4>
              <div className="footer__contact-info">
                <a href="mailto:intechjr@gmail.com" className="footer__link">
                  intechjr@gmail.com
                </a>
                <a href="https://wa.me/35910010967" className="footer__link" target="_blank" rel="noopener noreferrer">
                  (35) 91001-0967
                </a>
                <span className="footer__link footer__link--location">
                  Muzambinho – MG
                </span>
              </div>
            </div>
          </div>

          <div className="footer__bottom">
            <span>© 2026 Intech Jr. Todos os direitos reservados.</span>
            <span className="footer__bottom-right">
              Vinculada ao IFSULDEMINAS · Campus Muzambinho
            </span>
          </div>
        </div>
      </footer>
    </>
  )
}
