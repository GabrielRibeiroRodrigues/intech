'use client'

import { useState } from 'react'

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false)

  function toggleTheme() {
    document.body.classList.toggle('dark-theme')
    setDarkMode((prev) => !prev)
  }

  return (
    <nav
      className="navbar navbar-expand-lg bg-white shadow-sm sticky-top"
      aria-label="Navegação principal"
    >
      <div className="container px-4">
        <a
          className="navbar-brand logo d-flex align-items-center"
          href="/"
          aria-label="Página inicial"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/Logo.png" alt="Logo da Intech Jr." className="img_logo" />
          <span className="intech-dark-label ms-2 fw-bold" style={{ fontSize: '1.2rem' }}>
            Intech Jr
          </span>
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
          aria-label="Abrir menu de navegação"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-3">
            <li className="nav-item">
              <a className="nav-link fw-semibold" href="#services">
                Serviços
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link fw-semibold" href="#portfolio">
                Portfólio
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link fw-semibold" href="#contact">
                Contato
              </a>
            </li>
          </ul>
          <button
            className="btn btn-outline-secondary ms-3"
            type="button"
            aria-label="Trocar tema"
            onClick={toggleTheme}
          >
            <i className={`bi ${darkMode ? 'bi-sun' : 'bi-moon'}`}></i>
          </button>
        </div>
      </div>
    </nav>
  )
}
