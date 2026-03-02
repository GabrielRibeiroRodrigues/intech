'use client'

import { useState } from 'react'

interface PortfolioItem {
  img: string
  alt: string
  title: string
  text: string
  tag: string
}

export default function PortfolioCarousel({ items }: { items: PortfolioItem[] }) {
  const [current, setCurrent] = useState(0)
  const total = items.length

  const prev = () => setCurrent(c => Math.max(0, c - 1))
  const next = () => setCurrent(c => Math.min(total - 1, c + 1))

  return (
    <div className="pf-carousel">
      {/* Viewport — clips the sliding track */}
      <div className="pf-carousel__viewport">
        <div
          className="pf-carousel__track"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {items.map((item, i) => (
            <article
              key={item.title}
              className={`pf-carousel__slide${i === current ? ' active' : ''}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.img}
                alt={item.alt}
                className="pf-carousel__img"
                loading={i === 0 ? 'eager' : 'lazy'}
              />
              <div className="pf-carousel__overlay">
                <span className="pf-carousel__tag">{item.tag}</span>
                <h3 className="pf-carousel__title">{item.title}</h3>
                <p className="pf-carousel__text">{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="pf-carousel__controls">
        <button
          className="pf-carousel__arrow"
          onClick={prev}
          disabled={current === 0}
          aria-label="Projeto anterior"
        >
          <i className="bi bi-arrow-left" />
        </button>

        <div className="pf-carousel__dots" role="tablist" aria-label="Navegação do portfólio">
          {items.map((item, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === current}
              aria-label={`Ver ${item.title}`}
              className={`pf-carousel__dot${i === current ? ' active' : ''}`}
              onClick={() => setCurrent(i)}
            />
          ))}
        </div>

        <button
          className="pf-carousel__arrow"
          onClick={next}
          disabled={current === total - 1}
          aria-label="Próximo projeto"
        >
          <i className="bi bi-arrow-right" />
        </button>
      </div>

      {/* Counter */}
      <p className="pf-carousel__counter" aria-live="polite">
        <span className="pf-carousel__counter-current">{String(current + 1).padStart(2, '0')}</span>
        <span className="pf-carousel__counter-sep"> / </span>
        <span className="pf-carousel__counter-total">{String(total).padStart(2, '0')}</span>
      </p>
    </div>
  )
}
