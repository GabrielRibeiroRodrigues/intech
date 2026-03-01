import Navbar from '@/components/Navbar'
import ContactForm from '@/components/ContactForm'
import StatsCounter from '@/components/StatsCounter'

const services = [
  {
    icon: 'bi-code-slash',
    img: '/images/web.jpg',
    title: 'Desenvolvimento Web',
    text: 'Criamos aplicações web modernas, responsivas e de alta performance — do MVP ao produto completo.',
  },
  {
    icon: 'bi-palette2',
    img: '/images/design.jpg',
    title: 'Design Gráfico',
    text: 'Identidade visual única e impactante, alinhada aos valores da sua marca e ao seu público.',
  },
  {
    icon: 'bi-graph-up-arrow',
    img: '/images/mktdigital.png',
    title: 'Marketing Digital',
    text: 'Estratégias orientadas a dados para ampliar sua presença online e gerar resultados reais.',
  },
]

const processSteps = [
  {
    num: '01',
    icon: 'bi-chat-dots-fill',
    title: 'Briefing',
    text: 'Entendemos seus objetivos, público-alvo e expectativas para alinhar visão e estratégia.',
  },
  {
    num: '02',
    icon: 'bi-lightbulb-fill',
    title: 'Estratégia',
    text: 'Planejamos a solução ideal com base nos dados, benchmarks e nas necessidades do seu negócio.',
  },
  {
    num: '03',
    icon: 'bi-code-slash',
    title: 'Execução',
    text: 'Desenvolvemos com agilidade e qualidade, mantendo você informado a cada etapa do processo.',
  },
  {
    num: '04',
    icon: 'bi-rocket-takeoff-fill',
    title: 'Entrega',
    text: 'Lançamos o produto com suporte dedicado e acompanhamento pós-entrega.',
  },
]

const portfolio = [
  {
    img: '/images/img.png',
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
    img: '/images/portifolio3.jpg',
    alt: 'Projeto de Marketing',
    title: 'Campanha Digital',
    text: 'Estratégia e criação de conteúdo para redes sociais',
    tag: 'Marketing',
  },
]

export default function Home() {
  return (
    <>
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
          poster="/images/web.jpg"
        >
          <source src="/videos/video.mp4" type="video/mp4" />
        </video>
        <div className="hero__overlay" aria-hidden="true" />
        <div className="hero__grid" aria-hidden="true" />

        {/* Ambient glow orbs */}
        <div className="hero__orb hero__orb--1" aria-hidden="true" />
        <div className="hero__orb hero__orb--2" aria-hidden="true" />

        <div className="hero__content">
          <div className="hero__badge">
            <span className="hero__badge-dot" aria-hidden="true" />
            Muzambinho · MG
          </div>

          <h1 id="hero-title" className="hero__title">
            Tecnologia que{' '}
            <span className="gradient-text">transforma</span>{' '}
            ideias em realidade
          </h1>

          <p className="hero__subtitle">
            Transformamos ideias em produtos digitais de alto impacto — com design, tecnologia
            e estratégia alinhados ao crescimento do seu negócio.
          </p>

          <div className="hero__cta">
            <a href="#contact" className="btn btn-primary btn-lg">
              <i className="bi bi-rocket-takeoff-fill"></i>
              Iniciar projeto
            </a>
            <a href="#services" className="btn btn-ghost btn-lg">
              Nossos serviços
              <i className="bi bi-arrow-right"></i>
            </a>
          </div>
        </div>

        <div className="hero__scroll" aria-hidden="true">
          <i className="bi bi-chevron-compact-down" style={{ fontSize: '1.4rem' }}></i>
          <span>scroll</span>
        </div>
      </section>

      <main>
        {/* ── Stats ── */}
        <StatsCounter />

        {/* ── Services ── */}
        <section id="services" className="section" aria-labelledby="services-title">
          <div className="container">
            <div className="section-header reveal">
              <div className="section-chip">
                <i className="bi bi-grid-3x3-gap-fill"></i>
                O que fazemos
              </div>
              <h2 id="services-title" className="section-title">
                Serviços pensados para o seu crescimento
              </h2>
              <p className="section-subtitle">
                Unimos conhecimento técnico e criatividade para entregar soluções que realmente
                fazem diferença.
              </p>
            </div>

            <div className="services__grid">
              {services.map(({ icon, img, title, text }, index) => (
                <div
                  className="service-card reveal"
                  key={title}
                  style={{ '--i': index } as React.CSSProperties}
                >
                  <div
                    className="service-card__bg"
                    style={{ backgroundImage: `url(${img})` }}
                    aria-hidden="true"
                  />
                  <div className="service-card__icon">
                    <i className={`bi ${icon}`}></i>
                  </div>
                  <h3 className="service-card__title">{title}</h3>
                  <p className="service-card__text">{text}</p>
                  <span className="service-card__link">
                    Saiba mais <i className="bi bi-arrow-right"></i>
                  </span>
                </div>
              ))}
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
                <img src="/images/design.jpg" alt="Equipe Intech Jr. trabalhando" />
              </div>

              {/* Content */}
              <div className="reveal" style={{ '--i': 1 } as React.CSSProperties}>
                <div className="section-chip">
                  <i className="bi bi-info-circle-fill"></i>
                  Sobre nós
                </div>
                <h2 id="about-title" className="section-title">
                  Inovação com propósito,{' '}
                  <span className="gradient-text">resultados reais</span>
                </h2>
                <p className="about__text">
                  A Intech Jr. é uma empresa júnior de tecnologia com sede no IFSULDEMINAS Campus
                  Muzambinho, especializada em soluções digitais sob medida — do desenvolvimento
                  web à identidade visual e estratégias de marketing digital.
                </p>
                <p className="about__text">
                  Nossos projetos seguem metodologias ágeis e processos estruturados, garantindo
                  qualidade técnica, prazos cumpridos e resultados que geram valor real para o
                  negócio do cliente.
                </p>

                <div className="about__highlights">
                  <div className="about__highlight-item">
                    <i className="bi bi-check-circle-fill"></i>
                    Equipe multidisciplinar e especializada
                  </div>
                  <div className="about__highlight-item">
                    <i className="bi bi-check-circle-fill"></i>
                    Processos ágeis e metodologia comprovada
                  </div>
                  <div className="about__highlight-item">
                    <i className="bi bi-check-circle-fill"></i>
                    Foco em resultado e satisfação do cliente
                  </div>
                  <div className="about__highlight-item">
                    <i className="bi bi-check-circle-fill"></i>
                    Preços acessíveis sem abrir mão da qualidade
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Process ── */}
        <section className="section process" aria-labelledby="process-title">
          <div className="container">
            <div className="section-header reveal">
              <div className="section-chip">
                <i className="bi bi-arrow-repeat"></i>
                Como trabalhamos
              </div>
              <h2 id="process-title" className="section-title">
                Do briefing à entrega,{' '}
                <span className="gradient-text">sem complicação</span>
              </h2>
              <p className="section-subtitle">
                Um processo claro e transparente para que você saiba exatamente o que esperar
                em cada etapa do projeto.
              </p>
            </div>

            <div className="process__grid">
              {processSteps.map(({ num, icon, title, text }, index) => (
                <div
                  className="process-step reveal"
                  key={num}
                  style={{ '--i': index } as React.CSSProperties}
                >
                  <div className="process-step__num">{num}</div>
                  <div className="process-step__icon">
                    <i className={`bi ${icon}`}></i>
                  </div>
                  <h3 className="process-step__title">{title}</h3>
                  <p className="process-step__text">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Portfolio ── */}
        <section id="portfolio" className="section" aria-labelledby="portfolio-title">
          <div className="container">
            <div className="section-header reveal">
              <div className="section-chip">
                <i className="bi bi-collection-fill"></i>
                Portfólio
              </div>
              <h2 id="portfolio-title" className="section-title">
                Projetos que falam por si
              </h2>
              <p className="section-subtitle">
                Cada projeto é uma história de parceria, criatividade e tecnologia aplicada.
              </p>
            </div>

            <div className="portfolio__grid">
              {portfolio.map(({ img, alt, title, text, tag }, index) => (
                <div
                  className="portfolio-card reveal"
                  key={title}
                  style={{ '--i': index } as React.CSSProperties}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt={alt} className="portfolio-card__img" />
                  <div className="portfolio-card__overlay">
                    <p className="portfolio-card__tag">{tag}</p>
                    <h3 className="portfolio-card__title">{title}</h3>
                    <p className="portfolio-card__text">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA Strip ── */}
        <section className="cta-section" aria-labelledby="cta-title">
          <div className="cta-section__orb cta-section__orb--1" aria-hidden="true" />
          <div className="cta-section__orb cta-section__orb--2" aria-hidden="true" />
          <div className="container cta-section__inner">
            <h2 id="cta-title" className="cta-section__title">
              Pronto para transformar sua ideia?
            </h2>
            <p className="cta-section__subtitle">
              Vamos conversar sobre o seu projeto. Nossa equipe está pronta para criar a solução
              ideal — com agilidade, qualidade e preço justo.
            </p>
            <a href="#contact" className="btn btn-ghost btn-lg">
              <i className="bi bi-chat-dots-fill"></i>
              Fale com a gente agora
            </a>
          </div>
        </section>

        {/* ── Contact ── */}
        <section id="contact" className="section" aria-labelledby="contact-title">
          <div className="container">
            <div className="section-header reveal">
              <div className="section-chip">
                <i className="bi bi-envelope-fill"></i>
                Contato
              </div>
              <h2 id="contact-title" className="section-title">
                Entre em contato
              </h2>
              <p className="section-subtitle">
                Preencha o formulário ou escolha um de nossos canais de atendimento.
              </p>
            </div>

            <div className="contact__grid">
              {/* Info */}
              <div className="reveal">
                <h3 className="contact__info-title">Canais de atendimento</h3>
                <p className="contact__info-text">
                  Estamos prontos para atender você. Escolha a forma mais conveniente de entrar em
                  contato com nossa equipe.
                </p>
                <div className="contact__links">
                  <a
                    href="https://wa.me/35910010967"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact__link-item contact__link-item--whatsapp"
                    aria-label="Contato via WhatsApp"
                  >
                    <i className="bi bi-whatsapp"></i>
                    WhatsApp
                  </a>
                  <a
                    href="https://www.instagram.com/intech.jr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact__link-item contact__link-item--instagram"
                    aria-label="Perfil no Instagram"
                  >
                    <i className="bi bi-instagram"></i>
                    Instagram
                  </a>
                  <a
                    href="https://www.facebook.com/aajracam?locale=pt_BR"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact__link-item contact__link-item--facebook"
                    aria-label="Página no Facebook"
                  >
                    <i className="bi bi-facebook"></i>
                    Facebook
                  </a>
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
          <div className="footer__grid">
            {/* Brand col */}
            <div>
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
                  aria-label="Instagram"
                >
                  <i className="bi bi-instagram"></i>
                </a>
                <a
                  href="https://www.facebook.com/aajracam?locale=pt_BR"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__social-link"
                  aria-label="Facebook"
                >
                  <i className="bi bi-facebook"></i>
                </a>
                <a
                  href="https://wa.me/35910010967"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__social-link"
                  aria-label="WhatsApp"
                >
                  <i className="bi bi-whatsapp"></i>
                </a>
              </div>
            </div>

            {/* Nav col */}
            <div>
              <h4 className="footer__heading">Navegação</h4>
              <nav className="footer__links" aria-label="Links do rodapé">
                <a href="#services" className="footer__link">Serviços</a>
                <a href="#about" className="footer__link">Sobre nós</a>
                <a href="#portfolio" className="footer__link">Portfólio</a>
                <a href="#contact" className="footer__link">Contato</a>
              </nav>
            </div>

            {/* Services col */}
            <div>
              <h4 className="footer__heading">Serviços</h4>
              <nav className="footer__links" aria-label="Serviços oferecidos">
                <a href="#services" className="footer__link">Desenvolvimento Web</a>
                <a href="#services" className="footer__link">Design Gráfico</a>
                <a href="#services" className="footer__link">Marketing Digital</a>
              </nav>
            </div>
          </div>

          <div className="footer__bottom">
            <span>© 2026 Intech Jr. Todos os direitos reservados.</span>
            <span>Muzambinho — MG</span>
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
        <i className="bi bi-whatsapp"></i>
      </a>
    </>
  )
}
