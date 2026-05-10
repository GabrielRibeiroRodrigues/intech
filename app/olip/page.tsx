import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import OlipGallery from '@/components/OlipGallery'
import OlipChampions from '@/components/OlipChampions'

export const metadata: Metadata = {
  title: '15ª OLIP — Olimpíada Interna de Programação | Intech Jr.',
  description:
    'A 15ª edição da Olimpíada Interna de Programação do IFSULDEMINAS está chegando. Mostre suas habilidades, resolva desafios algorítmicos e seja o destaque do campus.',
}

const olipNews = [
  {
    tag: 'Destaque',
    date: '20 de junho de 2026',
    title: '15ª OLIP já tem data marcada',
    text: 'A próxima edição já está confirmada. Reúna sua equipe, acompanhe os detalhes do regulamento e prepare-se para mais um dia de desafios algorítmicos em Muzambinho.',
    href: '#sobre',
    image: '/images/olip15.jfif',
    alt: 'Arte da 15ª OLIP',
    cta: 'Ver detalhes da edição',
  },
  {
    tag: 'Resultado',
    date: '7 de julho de 2025',
    title: '14ª edição: confira as equipes ganhadoras',
    text: 'Veja quem subiu ao pódio na edição mais recente e representou o campus com destaque na competição.',
    href: 'https://muz.ifsuldeminas.edu.br/noticias/6361-14-edicao-da-olimpiada-interna-de-programacao-olip-confira-as-equipes-ganhadoras',
    image: '/images/olip14.jpeg',
    alt: 'Registro da 14ª edição da OLIP',
    cta: 'Ler notícia',
    external: true,
  },
  {
    tag: 'Retrospectiva',
    date: '27 de junho de 2023',
    title: '13ª OLIP reuniu 245 alunos',
    text: 'A edição de 2023 reforçou o alcance da olimpíada e mostrou a força da programação no instituto.',
    href: 'https://muz.ifsuldeminas.edu.br/noticias/4962-13-edicao-da-olimpiada-interna-de-programacao-reune-245-alunos',
    image: '/images/olip13.png',
    alt: 'Arte da 13ª edição da OLIP',
    cta: 'Ler notícia',
    external: true,
  },
]

export default function OlipPage() {
  const [featuredNews, ...secondaryNews] = olipNews

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

        {/* ── Últimas Notícias ── */}
        <section id="noticias" className="section olip-news-section" aria-labelledby="olip-news-title">
          <div className="container">
            <div className="section-header reveal">
              <div className="section-chip olip-section-chip">
                <i className="bi bi-megaphone-fill" />
                Últimas notícias
              </div>
              <h2 id="olip-news-title" className="section-title">
                O que está movimentando a{' '}
                <span className="olip-green-text">OLIP</span>
              </h2>
              <p className="section-subtitle">
                Atualizações da edição atual, resultados recentes e marcos que ajudam a contar a trajetória da competição.
              </p>
            </div>

            <div className="olip-news__grid">
              <a
                href={featuredNews.href}
                className="olip-news-card olip-news-card--featured reveal"
              >
                <div className="olip-news-card__media">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={featuredNews.image}
                    alt={featuredNews.alt}
                    className="olip-news-card__image"
                  />
                </div>
                <div className="olip-news-card__body">
                  <div className="olip-news-card__meta">
                    <span className="olip-news-card__pill">{featuredNews.tag}</span>
                    <span className="olip-news-card__date">
                      <i className="bi bi-calendar3" aria-hidden="true" />
                      {featuredNews.date}
                    </span>
                  </div>
                  <h3 className="olip-news-card__title olip-news-card__title--featured">
                    {featuredNews.title}
                  </h3>
                  <p className="olip-news-card__text olip-news-card__text--featured">
                    {featuredNews.text}
                  </p>
                  <span className="olip-news-card__cta">
                    {featuredNews.cta}
                    <i className="bi bi-arrow-right" aria-hidden="true" />
                  </span>
                </div>
              </a>

              <div className="olip-news__stack">
                {secondaryNews.map((item, index) => (
                  <a
                    key={item.title}
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    className="olip-news-card olip-news-card--compact reveal"
                    style={{ '--i': index + 1 } as React.CSSProperties}
                  >
                    <div className="olip-news-card__thumb-wrap">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image}
                        alt={item.alt}
                        className="olip-news-card__thumb"
                      />
                    </div>
                    <div className="olip-news-card__body olip-news-card__body--compact">
                      <div className="olip-news-card__meta olip-news-card__meta--compact">
                        <span className="olip-news-card__pill">{item.tag}</span>
                        <span className="olip-news-card__date">{item.date}</span>
                      </div>
                      <h3 className="olip-news-card__title">{item.title}</h3>
                      <p className="olip-news-card__text">{item.text}</p>
                      <span className="olip-news-card__cta">
                        {item.cta}
                        <i className="bi bi-arrow-up-right" aria-hidden="true" />
                      </span>
                    </div>
                  </a>
                ))}
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

        {/* ── Inscrição ── */}
        <section id="inscricao" className="section olip-signup-section" aria-labelledby="olip-signup-title">
          <div className="container">
            <div className="olip-signup__grid">

              {/* Coluna esquerda — info + canais */}
              <div className="reveal">
                <div className="section-chip olip-section-chip">
                  <i className="bi bi-pencil-square" />
                  Inscrição
                </div>
                <h2 id="olip-signup-title" className="section-title">
                  Pronto para o{' '}
                  <span className="olip-green-text">desafio?</span>
                </h2>
                <p className="olip-signup__text">
                  Preencha o formulário ao lado para garantir a vaga da sua equipe na
                  15ª OLIP. As inscrições ficam abertas até 1º de junho de 2026.
                </p>

                <div className="contact__links">
                  <a
                    href="mailto:olip@ifsuldeminas.edu.br"
                    className="contact__link-item"
                    aria-label="Enviar e-mail para a organização"
                  >
                    <i className="bi bi-envelope-fill" aria-hidden="true" />
                    olip@ifsuldeminas.edu.br
                    <i className="bi bi-arrow-right contact__link-arrow" aria-hidden="true" />
                  </a>
                  <a
                    href="https://www.instagram.com/olip.ifsuldeminas?igsh=MWFhMGY4enJjNTkzZA=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact__link-item contact__link-item--instagram"
                    aria-label="Perfil no Instagram da OLIP"
                  >
                    <i className="bi bi-instagram" aria-hidden="true" />
                    Instagram
                    <i className="bi bi-arrow-right contact__link-arrow" aria-hidden="true" />
                  </a>
                  <div className="contact__location">
                    <i className="bi bi-geo-alt-fill" aria-hidden="true" />
                    <div>
                      <strong>IFSULDEMINAS – Campus Muzambinho</strong>
                      <span>Muzambinho, MG</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Coluna direita — iframe Google Forms */}
              <div className="form-card olip-signup__form-card reveal" style={{ '--i': 1 } as React.CSSProperties}>
                <iframe
                  src="https://forms.gle/pJ2aMk9QVonH54PZ9"
                  className="olip-signup__iframe"
                  title="Formulário de inscrição — 15ª OLIP"
                  loading="lazy"
                  frameBorder="0"
                  marginHeight={0}
                  marginWidth={0}
                >
                  Carregando…
                </iframe>
              </div>

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
