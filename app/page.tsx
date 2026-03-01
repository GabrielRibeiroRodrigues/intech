import Navbar from '@/components/Navbar'
import ContactForm from '@/components/ContactForm'

export default function Home() {
  return (
    <>
      <Navbar />

      {/* Vídeo institucional */}
      <section aria-label="Vídeo institucional">
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          className="d-block w-100"
          style={{ height: '400px', objectFit: 'cover' }}
          autoPlay
          muted
          loop
          playsInline
          poster="/images/web.jpg"
        >
          <source src="/videos/video.mp4" type="video/mp4" />
          Seu navegador não suporta vídeo.
        </video>
      </section>

      <main>
        {/* Hero */}
        <section className="bg-light text-center py-5" aria-labelledby="sobre-intech">
          <div className="container">
            <h1 id="sobre-intech" className="display-4 fw-bold">
              Sobre a Intech
            </h1>
            <p className="lead">
              A Empresa Júnior do curso de Ciência da Computação do IFSULDEMINAS Campus
              Muzambinho é uma associação gerida por estudantes que oferece soluções tecnológicas
              inovadoras, aplicando na prática o conhecimento adquirido durante a graduação.
            </p>
            <a href="#contact" className="btn btn-primary btn-lg mt-3">
              Fale com a gente
            </a>
          </div>
        </section>

        {/* Serviços */}
        <section id="services" className="py-5" aria-labelledby="nossos-servicos">
          <div className="container text-center">
            <h2 id="nossos-servicos" className="mb-4">
              Nossos Serviços
            </h2>
            <div className="row g-4">
              {[
                { img: '/images/web.jpg', alt: 'Desenvolvimento Web', title: 'Desenvolvimento Web', text: 'Criamos sites modernos, responsivos e otimizados.' },
                { img: '/images/design.jpg', alt: 'Design Gráfico', title: 'Design Gráfico', text: 'Identidade visual única e impactante para sua marca.' },
                { img: '/images/mktdigital.png', alt: 'Marketing Digital', title: 'Marketing Digital', text: 'Aumente sua presença online com estratégias eficazes.' },
              ].map(({ img, alt, title, text }) => (
                <div className="col-md-4" key={title}>
                  <div className="card h-100 shadow-sm">
                    <div className="card-body">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={img}
                        className="img-fluid rounded mb-3"
                        alt={alt}
                        style={{ height: '200px', objectFit: 'cover', width: '100%' }}
                      />
                      <h5 className="card-title">{title}</h5>
                      <p className="card-text">{text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Portfólio */}
        <section id="portfolio" className="bg-light py-5" aria-labelledby="portfolio-titulo">
          <div className="container text-center">
            <h2 id="portfolio-titulo" className="mb-5">
              Portfólio
            </h2>
            <div className="row g-4">
              {[
                { img: '/images/img.png', alt: 'Projeto AgitaJr', title: 'AgitaJr', text: 'Desenvolvimento de uma identidade visual para a AgitaJr.' },
                { img: '/images/CA.jpg', alt: 'Projeto Centro Acadêmico', title: 'Centro Acadêmico', text: 'Desenvolvimento de uma identidade visual para o centro acadêmico da Computação.' },
                { img: '/images/portifolio1.jpg', alt: 'Projeto Logo Ciência da Computação', title: 'Logo Ciência da Computação', text: 'Desenvolvimento da Logo do curso de Ciência da Computação.' },
              ].map(({ img, alt, title, text }) => (
                <div className="col-md-4" key={title}>
                  <div className="card h-100 border-0 shadow-sm">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img}
                      className="card-img-top"
                      alt={alt}
                      style={{ height: '250px', objectFit: 'cover' }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{title}</h5>
                      <p className="card-text">{text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contato */}
        <section id="contact" className="py-5" aria-labelledby="contato-titulo">
          <div className="container text-center">
            <h2 id="contato-titulo" className="mb-4">
              Entre em Contato
            </h2>
            <ContactForm />
          </div>
        </section>
      </main>

      {/* Rodapé */}
      <footer className="bg-dark text-white text-center py-3" role="contentinfo">
        <p className="mb-1">© 2025 - Intech Jr. Todos os direitos reservados.</p>
        <div>
          <a
            href="https://www.instagram.com/intech.jr/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            style={{ color: '#fff', margin: '0 8px' }}
          >
            <i className="bi bi-instagram"></i> Instagram
          </a>{' '}
          |{' '}
          <a
            href="https://www.facebook.com/aajracam?locale=pt_BR"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            style={{ color: '#fff', margin: '0 8px' }}
          >
            <i className="bi bi-facebook"></i> Facebook
          </a>{' '}
          |{' '}
          <a
            href="https://wa.me/35910010967"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            style={{ color: '#fff', margin: '0 8px' }}
          >
            <i className="bi bi-whatsapp"></i> WhatsApp
          </a>
        </div>
      </footer>

      {/* Botão flutuante WhatsApp */}
      <a
        href="https://wa.me/35910010967"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp Flutuante"
        style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 1050 }}
      >
        <button
          className="btn btn-success rounded-circle shadow"
          style={{ width: '56px', height: '56px', fontSize: '2rem' }}
        >
          <i className="bi bi-whatsapp"></i>
        </button>
      </a>
    </>
  )
}
