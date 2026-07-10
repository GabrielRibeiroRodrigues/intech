'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

function AnimatedLink({
  href,
  children,
  active,
  onClick,
}: {
  href: string
  children: string
  active?: boolean
  onClick?: () => void
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`nav-anim-link${active ? ' nav-anim-link--active' : ''}`}
    >
      <span className="nav-anim-link__base">{children}</span>
      <span className="nav-anim-link__fill" aria-hidden>
        {children}
      </span>
    </a>
  )
}

const navLinks = [
  { href: '/#services', label: 'Serviços', id: 'services' },
  { href: '/#about', label: 'Sobre', id: 'about' },
  { href: '/#portfolio', label: 'Portfólio', id: 'portfolio' },
  { href: '/#team', label: 'Equipe', id: 'team' },
  { href: '/#contact', label: 'Contato', id: 'contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [progress, setProgress] = useState(0)
  const [activeSection, setActiveSection] = useState('')
  const pathname = usePathname()

  useEffect(() => {
    if (pathname === '/olip') {
      setActiveSection('olip')
    }

    const handleScroll = () => {
      const scrollY = window.scrollY
      setScrolled(scrollY > 20)

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      setProgress(maxScroll > 0 ? (scrollY / maxScroll) * 100 : 0)

      if (pathname === '/olip') return

      const sectionIds = ['contact', 'team', 'portfolio', 'about', 'services']
      let found = ''
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= 120) {
          found = id
          break
        }
      }
      setActiveSection(found)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname])

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
              {navLinks.map(({ href, label, id }) => (
                <AnimatedLink
                  key={id}
                  href={href}
                  active={activeSection === id}
                >
                  {label}
                </AnimatedLink>
              ))}
            </nav>

            {/* Divider */}
            <div className="navbar__divider" aria-hidden="true" />

            {/* OLIP Link — Separated */}
            <a
              href="/olip"
              className={`navbar__olip-link${activeSection === 'olip' ? ' navbar__olip-link--active' : ''}`}
            >
              <span className="navbar__olip-label">15ª OLIP</span>
            </a>

            {/* Actions */}
            <div className="navbar__actions">
              <a href="/#contact" className="btn btn-primary btn-sm navbar__cta-desktop">
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

        {/* Scroll progress bar */}
        <div
          className="navbar__progress"
          style={{ width: `${progress}%` }}
          aria-hidden="true"
        />
      </nav>

      {/* Sidebar scrim */}
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
          {navLinks.map(({ href, label }) => (
            <a
              key={label}
              href={href}
              className="navbar__sidebar-link"
              onClick={closeSidebar}
            >
              {label}
            </a>
          ))}

          {/* Divider in sidebar */}
          <div className="navbar__sidebar-divider" aria-hidden="true" />

          {/* OLIP in sidebar */}
          <a
            href="/olip"
            className="navbar__sidebar-link navbar__sidebar-link--olip"
            onClick={closeSidebar}
          >
            15ª OLIP
          </a>
        </nav>

        <div className="navbar__sidebar-footer">
          <a href="/#contact" className="btn btn-primary" onClick={closeSidebar}>
            Fale Conosco
          </a>
        </div>
      </aside>
    </>
  )
}
