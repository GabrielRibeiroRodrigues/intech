'use client'

import { useState, useEffect } from 'react'

function AnimatedLink({
  href,
  children,
  onClick,
}: {
  href: string
  children: string
  onClick?: () => void
}) {
  return (
    <a href={href} onClick={onClick} className="nav-anim-link">
      <span className="nav-anim-link__base">{children}</span>
      <span className="nav-anim-link__fill" aria-hidden>
        {children}
      </span>
    </a>
  )
}

const mobileLinks = [
  { href: '#services', label: 'Serviços' },
  { href: '#about', label: 'Sobre Nós' },
  { href: '#portfolio', label: 'Portfólio' },
  { href: '#contact', label: 'Contato' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (typeof document === 'undefined') return
    document.body.style.overflow = sidebarOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [sidebarOpen])

  function closeSidebar() {
    setSidebarOpen(false)
  }

  return (
    <>
      <nav
        className={`navbar${scrolled ? ' scrolled' : ''}`}
        aria-label="Navegação principal"
      >
        <div className="container">
          <div className="navbar__inner">
            {/* Brand */}
            <a href="/" className="navbar__brand" aria-label="Página inicial">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/Logo.png" alt="Logo Intech Jr." className="navbar__logo" />
              <span className="navbar__name">Intech Jr.</span>
            </a>

            {/* Desktop nav links */}
            <nav className="navbar__nav" aria-label="Links principais">
              <AnimatedLink href="#services">Serviços</AnimatedLink>
              <AnimatedLink href="#about">Sobre</AnimatedLink>
              <AnimatedLink href="#portfolio">Portfólio</AnimatedLink>
              <AnimatedLink href="#contact">Contato</AnimatedLink>
            </nav>

            {/* Actions */}
            <div className="navbar__actions">
              <a href="#contact" className="btn btn-primary btn-sm navbar__cta-desktop">
                Fale Conosco
              </a>

              <button
                className={`navbar__hamburger${sidebarOpen ? ' open' : ''}`}
                onClick={() => setSidebarOpen((prev) => !prev)}
                aria-label={sidebarOpen ? 'Fechar menu' : 'Abrir menu'}
                aria-expanded={sidebarOpen}
              >
                <span className="navbar__bar" />
                <span className="navbar__bar navbar__bar--mid" />
                <span className="navbar__bar" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar scrim (overlay) */}
      <div
        className={`navbar__sidebar-scrim${sidebarOpen ? ' visible' : ''}`}
        onClick={closeSidebar}
        aria-hidden="true"
      />

      {/* Sidebar drawer */}
      <aside
        className={`navbar__sidebar${sidebarOpen ? ' open' : ''}`}
        aria-label="Menu de navegação"
        aria-hidden={!sidebarOpen}
      >
        <nav className="navbar__sidebar-nav">
          {mobileLinks.map(({ href, label }) => (
            <a
              key={label}
              href={href}
              className="navbar__sidebar-link"
              onClick={closeSidebar}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="navbar__sidebar-footer">
          <a href="#contact" className="btn btn-primary" onClick={closeSidebar}>
            Fale Conosco
          </a>
        </div>
      </aside>
    </>
  )
}
