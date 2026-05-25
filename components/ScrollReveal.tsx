'use client'

import { useEffect } from 'react'

export default function ScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('js-hidden')
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll('.reveal').forEach((el) => {
      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight && rect.bottom >= 0) {
        // Já visível na viewport: revelar imediatamente
        el.classList.add('visible')
      } else {
        // Fora da viewport: ocultar via JS e observar
        el.classList.add('js-hidden')
        observer.observe(el)
      }
    })

    return () => observer.disconnect()
  }, [])

  return null
}
