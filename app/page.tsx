import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import ContactForm from '@/components/ContactForm'
import StatsCounter from '@/components/StatsCounter'
import ServicesCarousel from '@/components/ServicesCarousel'
import PortfolioCarousel from '@/components/PortfolioCarousel'

export const metadata: Metadata = {
  title: { absolute: 'Intech Jr — Desenvolvimento Web, Design e Marketing Digital' },
  description:
    'Empresa júnior do IFSULDEMINAS campus Muzambinho. Criamos sites, identidades visuais e estratégias digitais para transformar seu negócio.',
  alternates: {
    canonical: 'https://intechjr.muz.ifsuldeminas.edu.br',
  },
  openGraph: {
    title: 'Intech Jr — Desenvolvimento Web, Design e Marketing Digital',
    description:
      'Empresa júnior do IFSULDEMINAS campus Muzambinho. Criamos sites, identidades visuais e estratégias digitais para transformar seu negócio.',
    url: 'https://intechjr.muz.ifsuldeminas.edu.br',
  },
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Intech Jr.',
  url: 'https://intechjr.muz.ifsuldeminas.edu.br',
  logo: 'https://intechjr.muz.ifsuldeminas.edu.br/images/Logo.webp',
  description:
    'Empresa júnior de tecnologia vinculada ao IFSULDEMINAS, campus Muzambinho. Atuamos com desenvolvimento web, design gráfico e marketing digital.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Muzambinho',
    addressRegion: 'MG',
    addressCountry: 'BR',
  },
  parentOrganization: {
    '@type': 'EducationalOrganization',
    name: 'IFSULDEMINAS — Campus Muzambinho',
    url: 'https://muz.ifsuldeminas.edu.br',
  },
}

const processSteps = [
  {
    num: '01',
    icon: 'bi-chat-dots-fill',
    title: 'Briefing',
    text: 'Entendemos seus objetivos, público-alvo e expectativas para alinhar visão e estratégia antes de qualquer linha de código.',
  },
  {
    num: '02',
    icon: 'bi-lightbulb-fill',
    title: 'Estratégia',
    text: 'Planejamos a solução ideal com base nos dados, benchmarks e nas necessidades específicas do seu negócio.',
  },
  {
    num: '03',
    icon: 'bi-code-slash',
    title: 'Execução',
    text: 'Desenvolvemos com agilidade e qualidade, mantendo você informado a cada sprint com entregas parciais.',
  },
  {
    num: '04',
    icon: 'bi-rocket-takeoff-fill',
    title: 'Entrega',
    text: 'Lançamos o produto com suporte dedicado e acompanhamento pós-entrega para garantir o sucesso.',
  },
]

const portfolio = [
  {
    img: '/images/img.webp',
    alt: 'Projeto AgitaJr',
    title: 'AgitaJr',
    text: 'Identidade visual para a AgitaJr',
    tag: 'Branding',
  },
  {
    img: '/images/CA.jpg',
    alt: 'Projeto Centro Acadêmico',
    title: 'Centro Acadêmico',
    text: 'Identidade visual para o Centro Acadêmico de Computação',
    tag: 'Design',
  },
  {
    img: '/images/portifolio1.jpg',
    alt: 'Logo Ciência da Computação',
    title: 'Logo CC',
    text: 'Logotipo do curso de Ciência da Computação',
    tag: 'Design',
  },
  {
    img: '/images/portifolio3.webp',
    alt: 'Projeto de Marketing',
    title: 'Campanha Digital',
    text: 'Estratégia e criação de conteúdo para redes sociais',
    tag: 'Marketing',
  },
]

const marqueeItems = [
  'Desenvolvimento Web',
  'Design Gráfico',
  'Marketing Digital',
  'Branding',
  'UI / UX',
  'React · Next.js',
  'Identidade Visual',
  'Estratégia Digital',
  'Landing Pages',
  'E-commerce',
]

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <Navbar />

      {/* ── Hero ── */}
      <section className="hero" aria-labelledby="hero-title">
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          className="hero__video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src="/videos/video.mp4" type="video/mp4" />
        </video>
        <div className="hero__overlay" aria-hidden="true" />
        <div className="hero__grid" aria-hidden="true" />

        <div className="hero__orb hero__orb--1" aria-hidden="true" />
        <div className="hero__orb hero__orb--2" aria-hidden="true" />

        <div className="hero__content">
          <div className="hero__badge">
            <span className="hero__badge-dot" aria-hidden="true" />
            Muzambinho · MG — Empresa Júnior
          </div>

          <h1 id="hero-title" className="hero__title">
            Tecnologia que{' '}
            <span className="gradient-text">transforma</span>{' '}
            ideias em realidade
          </h1>

          <p className="hero__subtitle">
            Transformamos ideias em produtos digitais de alto impacto — com design,
            tecnologia e estratégia alinhados ao crescimento do seu negócio.
          </p>

          <div className="hero__cta">
            <a href="#contact" className="btn btn-primary btn-lg">
              <i className="bi bi-rocket-takeoff-fill" />
              Iniciar projeto
            </a>
            <a href="#services" className="btn btn-ghost btn-lg">
              Nossos serviços
              <i className="bi bi-arrow-right" />
            </a>
          </div>

          <div className="hero__trust" aria-label="Parceiros e certificações">
            <span className="hero__trust-label">Vinculada ao</span>
            <span className="hero__trust-divider" aria-hidden="true" />
            <span className="hero__trust-item">
              <i className="bi bi-building" aria-hidden="true" />
              IFSULDEMINAS
            </span>
            <span className="hero__trust-divider" aria-hidden="true" />
            <span className="hero__trust-item">
              <i className="bi bi-award" aria-hidden="true" />
              Brasil Júnior
            </span>
          </div>
        </div>

        <div className="hero__scroll" aria-hidden="true">
          <i className="bi bi-chevron-compact-down" style={{ fontSize: '1.4rem' }} />
          <span>scroll</span>
        </div>
      </section>

      {/* ── Marquee ticker ── */}
      <div className="marquee-strip" aria-hidden="true">
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="marquee-item">
              <span className="marquee-dot" />
              {item}
            </span>
          ))}
        </div>
      </div>

      <main>
        {/* ── Stats ── */}
        <StatsCounter />

        {/* ── Services ── */}
        <section id="services" className="section" aria-labelledby="services-title">
          <div className="container">
            <div className="section-header reveal">
              <div className="section-chip">
                <i className="bi bi-grid-3x3-gap-fill" />
                O que fazemos
              </div>
              <h2 id="services-title" className="section-title">
                Serviços pensados{' '}
                <span className="gradient-text">para o seu crescimento</span>
              </h2>
              <p className="section-subtitle">
                Unimos conhecimento técnico e criatividade para entregar soluções
                que realmente fazem diferença.
              </p>
            </div>

            <div className="reveal" style={{ '--i': 1 } as React.CSSProperties}>
              <ServicesCarousel />
            </div>
          </div>
        </section>

        {/* ── About ── */}
        <section id="about" className="section about" aria-labelledby="about-title">
          <div className="container">
            <div className="about__grid">
              {/* Visual */}
              <div className="about__image-wrap reveal">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/design.webp" alt="Equipe Intech Jr. trabalhando" />
                <div className="about__image-badge" aria-hidden="true">
                  <span className="about__image-badge-num">2017</span>
                  <span className="about__image-badge-label">Fundação</span>
                </div>
                <div className="about__image-badge about__image-badge--bottom" aria-hidden="true">
                  <i className="bi bi-award-fill" />
                  <span>Certificada Brasil Júnior</span>
                </div>
              </div>

              {/* Content */}
              <div className="reveal" style={{ '--i': 1 } as React.CSSProperties}>
                <div className="section-chip">
                  <i className="bi bi-info-circle-fill" />
                  Sobre nós
                </div>
                <h2 id="about-title" className="section-title">
                  Inovação com propósito,{' '}
                  <span className="gradient-text">resultados reais</span>
                </h2>
                <p className="about__text">
                  A Intech Jr. é uma empresa júnior de tecnologia com sede no IFSULDEMINAS
                  Campus Muzambinho, especializada em soluções digitais sob medida — do
                  desenvolvimento web à identidade visual e estratégias de marketing digital.
                </p>
                <p className="about__text">
                  Nossos projetos seguem metodologias ágeis e processos estruturados,
                  garantindo qualidade técnica, prazos cumpridos e resultados que geram
                  valor real para o negócio do cliente.
                </p>

                <div className="about__highlights">
                  {[
                    { icon: 'bi-people-fill', text: 'Equipe multidisciplinar e especializada' },
                    { icon: 'bi-lightning-charge-fill', text: 'Processos ágeis e metodologia comprovada' },
                    { icon: 'bi-bullseye', text: 'Foco em resultado e satisfação do cliente' },
                    { icon: 'bi-tag-fill', text: 'Preços acessíveis sem abrir mão da qualidade' },
                  ].map(({ icon, text }) => (
                    <div key={text} className="about__highlight-item">
                      <i className={`bi ${icon}`} aria-hidden="true" />
                      {text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── History (ACAM → InTech) ── */}
        <section id="history" className="section history" aria-labelledby="history-title">
          <div className="container">
            <div className="history__grid">
              {/* Content */}
              <div className="reveal">
                <div className="section-chip">
                  <i className="bi bi-clock-history" />
                  Nossa História
                </div>
                <h2 id="history-title" className="section-title">
                  De ACAM Jr. a{' '}
                  <span className="gradient-text">InTech Jr.</span>
                </h2>
                <p className="history__text">
                  A InTech Jr. é a continuidade da ACAM Jr., agora com uma nova
                  identidade e posicionamento, mantendo o mesmo propósito:
                  desenvolver soluções tecnológicas e formar profissionais
                  preparados para o mercado.
                </p>
              </div>

              {/* Image */}
              <div className="history__image-wrap reveal" style={{ '--i': 1 } as React.CSSProperties}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/acamin.jpeg"
                  alt="Equipe ACAM Jr. — origem da InTech Jr."
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── Process ── */}
        <section className="section process" aria-labelledby="process-title">
          <div className="container">
            <div className="section-header reveal">
              <div className="section-chip">
                <i className="bi bi-arrow-repeat" />
                Como trabalhamos
              </div>
              <h2 id="process-title" className="section-title">
                Do briefing à entrega,{' '}
                <span className="gradient-text">sem complicação</span>
              </h2>
              <p className="section-subtitle">
                Um processo claro e transparente para que você saiba exatamente
                o que esperar em cada etapa.
              </p>
            </div>

            <div className="process__timeline">
              {processSteps.map(({ num, icon, title, text }, index) => (
                <div
                  className="process-step reveal"
                  key={num}
                  style={{ '--i': index } as React.CSSProperties}
                >
                  <div className="process-step__connector" aria-hidden="true" />
                  <div className="process-step__head">
                    <div className="process-step__icon">
                      <i className={`bi ${icon}`} aria-hidden="true" />
                    </div>
                    <div className="process-step__num" aria-hidden="true">{num}</div>
                  </div>
                  <h3 className="process-step__title">{title}</h3>
                  <p className="process-step__text">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Portfolio ── */}
        <section id="portfolio" className="section portfolio-section" aria-labelledby="portfolio-title">
          <div className="container">
            <div className="section-header reveal">
              <div className="section-chip">
                <i className="bi bi-collection-fill" />
                Portfólio
              </div>
              <h2 id="portfolio-title" className="section-title">
                Projetos que{' '}
                <span className="gradient-text">falam por si</span>
              </h2>
              <p className="section-subtitle">
                Cada projeto é uma história de parceria, criatividade e
                tecnologia aplicada.
              </p>
            </div>

            <div className="reveal" style={{ '--i': 1 } as React.CSSProperties}>
              <PortfolioCarousel items={portfolio} />
            </div>
          </div>
        </section>

        {/* ── Team ── */}
        <section id="team" className="section team-section" aria-labelledby="team-title">
          <div className="container">
            <div className="section-header reveal">
              <div className="section-chip">
                <i className="bi bi-people-fill" />
                Nossa Equipe
              </div>
              <h2 id="team-title" className="section-title">
                Pessoas que fazem a{' '}
                <span className="gradient-text">magia acontecer</span>
              </h2>
              <p className="section-subtitle">
                Nossa equipe multidisciplinar une talento, criatividade e técnica
                para entregar soluções digitais de excelência.
              </p>
            </div>

            <div className="team-photo-wrap reveal" style={{ '--i': 1 } as React.CSSProperties}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/equipe.webp"
                alt="Equipe Intech Jr."
                className="team-photo"
              />
              <div className="team-photo__glow" aria-hidden="true" />
            </div>
          </div>
        </section>

        {/* ── CTA Strip ── */}
        <section className="cta-section" aria-labelledby="cta-title">
          <div className="cta-section__orb cta-section__orb--1" aria-hidden="true" />
          <div className="cta-section__orb cta-section__orb--2" aria-hidden="true" />
          <div className="container cta-section__inner">
            <div className="section-chip" style={{ margin: '0 auto 20px' }}>
              <i className="bi bi-chat-heart-fill" />
              Vamos conversar
            </div>
            <h2 id="cta-title" className="cta-section__title">
              Pronto para transformar sua ideia?
            </h2>
            <p className="cta-section__subtitle">
              Nossa equipe está pronta para criar a solução ideal — com agilidade,
              qualidade e preço justo. Sem burocracia.
            </p>
            <a href="#contact" className="btn btn-primary btn-lg">
              <i className="bi bi-chat-dots-fill" />
              Fale com a gente agora
            </a>
          </div>
        </section>

        {/* ── Contact ── */}
        <section id="contact" className="section" aria-labelledby="contact-title">
          <div className="container">
            <div className="section-header reveal">
              <div className="section-chip">
                <i className="bi bi-envelope-fill" />
                Contato
              </div>
              <h2 id="contact-title" className="section-title">
                Entre em{' '}
                <span className="gradient-text">contato</span>
              </h2>
              <p className="section-subtitle">
                Preencha o formulário ou escolha um de nossos canais de atendimento.
                Respondemos em até 24 horas.
              </p>
            </div>

            <div className="contact__grid">
              {/* Info */}
              <div className="reveal">
                <h3 className="contact__info-title">Canais de atendimento</h3>
                <p className="contact__info-text">
                  Estamos prontos para atender você. Escolha a forma mais conveniente
                  de entrar em contato com nossa equipe.
                </p>
                <div className="contact__links">
                  <a
                    href="https://wa.me/35910010967"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact__link-item contact__link-item--whatsapp"
                    aria-label="Contato via WhatsApp"
                  >
                    <i className="bi bi-whatsapp" aria-hidden="true" />
                    WhatsApp
                    <i className="bi bi-arrow-right contact__link-arrow" aria-hidden="true" />
                  </a>
                  <a
                    href="https://www.instagram.com/intech.jr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact__link-item contact__link-item--instagram"
                    aria-label="Perfil no Instagram"
                  >
                    <i className="bi bi-instagram" aria-hidden="true" />
                    Instagram
                    <i className="bi bi-arrow-right contact__link-arrow" aria-hidden="true" />
                  </a>
                  <a
                    href="https://www.facebook.com/aajracam?locale=pt_BR"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact__link-item contact__link-item--facebook"
                    aria-label="Página no Facebook"
                  >
                    <i className="bi bi-facebook" aria-hidden="true" />
                    Facebook
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

              {/* Form */}
              <div className="form-card reveal" style={{ '--i': 1 } as React.CSSProperties}>
                <ContactForm />
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
                <a href="#services" className="footer__link">Serviços</a>
                <a href="#about" className="footer__link">Sobre nós</a>
                <a href="#portfolio" className="footer__link">Portfólio</a>
                <a href="#contact" className="footer__link">Contato</a>
              </nav>
            </div>

            <div>
              <h4 className="footer__heading">Serviços</h4>
              <nav className="footer__links" aria-label="Serviços oferecidos">
                <a href="#services" className="footer__link">Desenvolvimento Web</a>
                <a href="#services" className="footer__link">Design Gráfico</a>
                <a href="#services" className="footer__link">Marketing Digital</a>
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

      {/* ── WhatsApp Float ── */}
      <a
        href="https://wa.me/35910010967"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        aria-label="Fale conosco pelo WhatsApp"
      >
        <i className="bi bi-whatsapp" aria-hidden="true" />
      </a>
    </>
  )
}
