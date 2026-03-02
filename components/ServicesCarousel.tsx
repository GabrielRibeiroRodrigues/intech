'use client'

import { useState } from 'react'

const services = [
  {
    icon: 'bi-code-slash',
    img: '/images/web.jpg',
    title: 'Desenvolvimento Web',
    subtitle: 'Do MVP ao produto completo',
    text: 'Criamos aplicações web modernas, responsivas e de alta performance — planejadas para crescer junto com o seu negócio e converter visitantes em clientes.',
    bullets: [
      'Sites institucionais e landing pages',
      'Sistemas web e plataformas personalizadas',
      'Integração com APIs e serviços externos',
      'Performance, SEO e acessibilidade',
      'Manutenção e suporte técnico contínuo',
    ],
  },
  {
    icon: 'bi-palette2',
    img: '/images/design.jpg',
    title: 'Design Gráfico',
    subtitle: 'Identidade visual que comunica',
    text: 'Construímos marcas que ficam na memória — do logo à identidade completa, com consistência visual alinhada ao seu público e posicionamento.',
    bullets: [
      'Identidade visual e branding completo',
      'Criação de logotipos profissionais',
      'Material gráfico para redes sociais',
      'UI/UX para web e aplicativos',
      'Apresentações e materiais impressos',
    ],
  },
  {
    icon: 'bi-graph-up-arrow',
    img: '/images/mktdigital.png',
    title: 'Marketing Digital',
    subtitle: 'Estratégia que gera resultado',
    text: 'Amplificamos sua presença digital com estratégias orientadas a dados, focadas em engajamento real e conversão mensurável.',
    bullets: [
      'Gestão de redes sociais e criação de conteúdo',
      'Tráfego pago (Meta Ads e Google Ads)',
      'SEO on-page e crescimento orgânico',
      'E-mail marketing e automações',
      'Análise de métricas e relatórios mensais',
    ],
  },
]

export default function ServicesCarousel() {
  const [active, setActive] = useState(0)
  const [leaving, setLeaving] = useState(false)

  const handleChange = (i: number) => {
    if (i === active || leaving) return
    setLeaving(true)
    setTimeout(() => {
      setActive(i)
      setLeaving(false)
    }, 200)
  }

  const s = services[active]

  return (
    <div className="svc-tab">
      {/* Tab nav */}
      <div className="svc-tab__nav" role="tablist" aria-label="Categorias de serviço">
        {services.map((svc, i) => (
          <button
            key={svc.title}
            role="tab"
            aria-selected={active === i}
            aria-controls={`svc-panel-${i}`}
            className={`svc-tab__btn${active === i ? ' active' : ''}`}
            onClick={() => handleChange(i)}
          >
            <span className="svc-tab__btn-num">0{i + 1}</span>
            <span className="svc-tab__btn-icon" aria-hidden="true">
              <i className={`bi ${svc.icon}`} />
            </span>
            <span className="svc-tab__btn-label">{svc.title}</span>
          </button>
        ))}
        {/* Active indicator */}
        <div
          className="svc-tab__indicator"
          style={{ transform: `translateX(calc(${active} * 100%))` }}
          aria-hidden="true"
        />
      </div>

      {/* Panel */}
      <div
        id={`svc-panel-${active}`}
        role="tabpanel"
        className={`svc-tab__panel${leaving ? ' svc-tab__panel--leaving' : ''}`}
      >
        {/* Background image */}
        <div
          className="svc-tab__panel-bg"
          style={{ backgroundImage: `url(${s.img})` }}
          aria-hidden="true"
        />

        <div className="svc-tab__panel-inner">
          {/* Left: main content */}
          <div className="svc-tab__main">
            <div className="svc-tab__icon-wrap" aria-hidden="true">
              <i className={`bi ${s.icon}`} />
            </div>
            <p className="svc-tab__subtitle">{s.subtitle}</p>
            <h3 className="svc-tab__title">{s.title}</h3>
            <p className="svc-tab__text">{s.text}</p>
            <a href="#contact" className="btn btn-primary svc-tab__cta">
              <i className="bi bi-rocket-takeoff-fill" />
              Iniciar projeto
            </a>
          </div>

          {/* Right: bullet list */}
          <ul className="svc-tab__bullets" aria-label={`O que inclui ${s.title}`}>
            {s.bullets.map((b, i) => (
              <li
                key={b}
                className="svc-tab__bullet"
                style={{ '--bi': i } as React.CSSProperties}
              >
                <span className="svc-tab__bullet-check" aria-hidden="true">
                  <i className="bi bi-check2" />
                </span>
                {b}
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile swipe hint */}
        <div className="svc-tab__mobile-nav" aria-hidden="true">
          {services.map((_, i) => (
            <button
              key={i}
              className={`svc-tab__mobile-dot${i === active ? ' active' : ''}`}
              onClick={() => handleChange(i)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
