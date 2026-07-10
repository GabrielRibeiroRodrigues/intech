'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

interface Champion {
  category: string
  team: string
  members: string
  campus?: string
}

interface Edition {
  year: number
  edition: string
  champions: Champion[]
}

const editions: Edition[] = [
  {
    year: 2025,
    edition: '14ª OLIP',
    champions: [
      { category: 'Superior', team: 'Amigos do John', members: 'Eliezer Cardoso Alves, Ygor Ribeiro Costa', campus: 'Campus Muzambinho' },
      { category: 'Técnico', team: 'Os de Sempre', members: 'Jhonatan Henrique de Oliveira Ferreira, Samuel José da Silva', campus: 'Campus Muzambinho' },
    ],
  },
  {
    year: 2023,
    edition: '13ª OLIP',
    champions: [
      { category: 'Superior', team: 'A volta de Ricardo Martins', members: 'Eduardo Henrique da Silva, João Victor de Lima Oliveira, Julio Nunes Avelar' },
    ],
  },
  {
    year: 2022,
    edition: '12ª OLIP',
    champions: [
      { category: 'Superior', team: 'Fugere Urbem, Locus Amoenus', members: 'Ygor Ribeiro Costa', campus: 'Campus Muzambinho' },
    ],
  },
  {
    year: 2021,
    edition: '11ª OLIP',
    champions: [
      { category: 'Superior', team: 'Unidos da Aracele', members: 'Camila Bianca Silva Caldas, Jairo de Sousa Júnior, Ygor Ribeiro Costa', campus: 'Campus Muzambinho' },
    ],
  },
  {
    year: 2020,
    edition: '10ª OLIP',
    champions: [
      { category: 'Superior', team: 'Amigos da Aracele', members: 'Natanael Fabrício Dacioli Batista, Jairo de Sousa Júnior, Ygor Ribeiro Costa', campus: 'Campus Muzambinho' },
    ],
  },
  {
    year: 2019,
    edition: '9ª OLIP',
    champions: [
      { category: 'Superior', team: 'Flecha na Canela', members: 'Douglas Barbosa Martins da Costa, Jairo de Sousa Júnior, Ygor Ribeiro Costa', campus: 'Campus Muzambinho' },
    ],
  },
  {
    year: 2018,
    edition: '8ª OLIP',
    champions: [
      { category: 'Superior', team: 'Celso Portiolli', members: 'Andrês Rodrigues Oliveira', campus: 'UNICAMP' },
      { category: 'Técnico', team: 'return fenix;', members: 'Eliezer Cardoso Alves, John William Vicente, Ygor Ribeiro Costa', campus: 'Campus Muzambinho' },
    ],
  },
  {
    year: 2017,
    edition: '7ª OLIP',
    champions: [
      { category: 'Superior', team: 'Flecha no Joelho', members: 'Abner Samuel P. Palmeira, Aline Regina de Oliveira, Samuel Eduardo da Silva', campus: 'Campus Muzambinho' },
      { category: 'Técnico', team: 'A_FENIX;', members: 'Eliezer Cardoso Alves, John William Vicente, Ygor Ribeiro Costa', campus: 'Campus Muzambinho' },
    ],
  },
  {
    year: 2016,
    edition: '6ª OLIP',
    champions: [
      { category: 'Superior', team: 'Flecha no Joelho', members: 'Abner Samuel P. Palmeira, Aline Regina de Oliveira, Samuel Eduardo da Silva', campus: 'Campus Muzambinho' },
      { category: 'Técnico', team: 'Os MLK Dengoso', members: 'Andrês Rodrigues Oliveira, Natanael Fabrício Dacioli Batista, Haislan Wellington Gouveia dos Santos', campus: 'Campus Muzambinho' },
    ],
  },
  {
    year: 2015,
    edition: '5ª OLIP',
    champions: [
      { category: 'Superior', team: 'Flecha no Joelho!', members: 'Abner Samuel P. Palmeira, Aline Regina de Oliveira', campus: 'Campus Muzambinho' },
      { category: 'Técnico', team: 'The flies', members: 'Alysson Eduardo Estevam, Athus Wilke Souza, Felipe Oliveira Paulino', campus: 'Campus Passos' },
    ],
  },
  {
    year: 2014,
    edition: '4ª OLIP',
    champions: [
      { category: 'Superior', team: 'BitPlease', members: 'Vinícius Henrique Marangoni, Luís Ovídio Viana Podestá, Alex Santini', campus: 'Campus Muzambinho' },
      { category: 'Técnico', team: 'VisualChampz', members: 'Leonardo Said da Costa, João Pedro Silva, Luiz Guilherme Silva Moreira', campus: 'Campus Muzambinho' },
    ],
  },
  {
    year: 2013,
    edition: '3ª OLIP',
    champions: [
      { category: 'Superior', team: 'Encoders 01', members: 'João Cláudio Dias Araújo, Lilian Cristina de Paula, Emerson Dias do Prado', campus: 'Campus Muzambinho' },
      { category: 'Técnico', team: 'Experts', members: 'Maykon Filipe Dacioli Batista, Leonardo Augusto Azarias', campus: 'Campus Muzambinho' },
    ],
  },
  {
    year: 2012,
    edition: '2ª OLIP',
    champions: [
      { category: 'Superior', team: 'Encoders 01', members: 'João Cláudio Dias Araújo, Lilian Cristina de Paula, Emerson Dias do Prado', campus: 'Campus Muzambinho' },
      { category: 'Técnico', team: 'Infomaníacos', members: 'Lucas Alves dos Santos, Luis Henrique de Paula Oliveira', campus: 'Campus Passos' },
    ],
  },
  {
    year: 2011,
    edition: '1ª OLIP',
    champions: [
      { category: 'Superior', team: 'Programming Via Osmose', members: 'Reginaldo da Silva Alves, Guilherme Henrique Costa, João Cláudio Dias Araújo', campus: 'Campus Muzambinho' },
      { category: 'Técnico', team: 'Fenix', members: 'Mário Gobbo, Lucas Vilela Silva, Daniela de Assis Bócoli', campus: 'Campus Muzambinho' },
    ],
  },
]

const TOTAL = editions.length

export default function OlipChampions() {
  const [current, setCurrent] = useState(0)
  const [dragging, setDragging] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const currentRef = useRef(0)
  const dirRef = useRef<1 | -1>(1)
  const dragStartX = useRef<number | null>(null)

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      const next = currentRef.current + dirRef.current
      const clamped = Math.max(0, Math.min(next, TOTAL - 1))
      if (clamped >= TOTAL - 1) dirRef.current = -1
      else if (clamped <= 0) dirRef.current = 1
      currentRef.current = clamped
      setCurrent(clamped)
    }, 5000)
  }, [])

  useEffect(() => {
    startTimer()
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [startTimer])

  const goTo = (idx: number) => {
    currentRef.current = idx
    setCurrent(idx)
    startTimer()
  }

  const advance = (dir: 1 | -1) => {
    const val = Math.max(0, Math.min(currentRef.current + dir, TOTAL - 1))
    currentRef.current = val
    setCurrent(val)
    startTimer()
  }

  // Mouse drag
  const onMouseDown = (e: React.MouseEvent) => {
    dragStartX.current = e.clientX
    setDragging(true)
  }
  const onMouseUp = (e: React.MouseEvent) => {
    if (dragStartX.current === null) return
    const delta = dragStartX.current - e.clientX
    if (Math.abs(delta) > 50) advance(delta > 0 ? 1 : -1)
    dragStartX.current = null
    setDragging(false)
  }
  const onMouseLeave = () => {
    dragStartX.current = null
    setDragging(false)
  }

  // Touch drag
  const onTouchStart = (e: React.TouchEvent) => {
    dragStartX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (dragStartX.current === null) return
    const delta = dragStartX.current - e.changedTouches[0].clientX
    if (Math.abs(delta) > 50) advance(delta > 0 ? 1 : -1)
    dragStartX.current = null
  }

  return (
    <div className="olip-champ">
      {/* Track */}
      <div
        className={`olip-champ__track-wrap${dragging ? ' olip-champ__track-wrap--grabbing' : ''}`}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="olip-champ__track"
          style={{
            transform: `translateX(calc(-${current} * (var(--champ-card-w) + var(--champ-card-gap))))`,
          }}
        >
          {editions.map((ed, i) => (
            <article
              key={ed.year}
              className={`olip-champ__card${i === current ? ' olip-champ__card--active' : ''}`}
              aria-label={`${ed.edition} — ${ed.year}`}
            >
              {/* Header */}
              <div className="olip-champ__card-header">
                <span className="olip-champ__year">{ed.year}</span>
                <span className="olip-champ__edition-badge">{ed.edition}</span>
              </div>

              {/* Champions */}
              <div className="olip-champ__card-body">
                {ed.champions.map(champ => (
                  <div key={champ.category} className="olip-champ__champion">
                    <div className="olip-champ__category">
                      <i
                        className={`bi ${champ.category === 'Superior' ? 'bi-trophy-fill' : 'bi-award-fill'}`}
                        aria-hidden="true"
                      />
                      <span>{champ.category}</span>
                    </div>
                    <p className="olip-champ__team">{champ.team}</p>
                    <p className="olip-champ__members">{champ.members}</p>
                    {champ.campus && (
                      <p className="olip-champ__campus">
                        <i className="bi bi-geo-alt" aria-hidden="true" />
                        {champ.campus}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="olip-champ__controls">
        <button
          className="olip-champ__arrow"
          onClick={() => advance(-1)}
          disabled={current === 0}
          aria-label="Edição anterior"
        >
          <i className="bi bi-arrow-left" />
        </button>

        <div className="olip-champ__dots" role="tablist" aria-label="Selecionar edição">
          {editions.map((ed, i) => (
            <button
              key={ed.year}
              role="tab"
              aria-selected={i === current}
              aria-label={`Ver ${ed.edition}`}
              className={`olip-champ__dot${i === current ? ' active' : ''}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>

        <button
          className="olip-champ__arrow"
          onClick={() => advance(1)}
          disabled={current === TOTAL - 1}
          aria-label="Próxima edição"
        >
          <i className="bi bi-arrow-right" />
        </button>
      </div>

      {/* Counter */}
      <p className="olip-champ__counter" aria-live="polite">
        <span className="olip-champ__counter-cur">
          {String(current + 1).padStart(2, '0')}
        </span>
        <span className="olip-champ__counter-sep"> / </span>
        <span className="olip-champ__counter-tot">
          {String(TOTAL).padStart(2, '0')}
        </span>
      </p>
    </div>
  )
}
