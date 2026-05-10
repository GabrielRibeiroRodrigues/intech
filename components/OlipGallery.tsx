'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

interface GalleryImage {
  src: string
  alt: string
}

const galleryData: Record<number, GalleryImage[]> = {
  2025: [
    { src: 'https://muz.ifsuldeminas.edu.br/images/2025/06/OLIP/olip_entrada.jpg', alt: 'OLIP 2025 — entrada' },
    { src: 'https://muz.ifsuldeminas.edu.br/images/2025/06/OLIP/WhatsApp_Image_2025-07-07_at_08.33.34.jpeg', alt: 'OLIP 2025' },
    { src: 'https://muz.ifsuldeminas.edu.br/images/2025/06/OLIP/WhatsApp_Image_2025-07-07_at_08.33.34_11.jpeg', alt: 'OLIP 2025' },
    { src: 'https://muz.ifsuldeminas.edu.br/images/2025/06/OLIP/WhatsApp_Image_2025-07-07_at_08.33.34_22.jpeg', alt: 'OLIP 2025' },
  ],
  2023: [
    { src: 'https://muz.ifsuldeminas.edu.br/images/2023/06/OLIP/9Q6A6823.jpg', alt: 'OLIP 2023' },
    { src: 'https://muz.ifsuldeminas.edu.br/images/2023/06/OLIP/16.25.06.jpeg', alt: 'OLIP 2023' },
    { src: 'https://muz.ifsuldeminas.edu.br/images/2023/06/OLIP/16.25.06_1.jpeg', alt: 'OLIP 2023' },
    { src: 'https://muz.ifsuldeminas.edu.br/images/2023/06/OLIP/16.25.06_2.jpeg', alt: 'OLIP 2023' },
  ],
  2022: [
    { src: 'https://muz.ifsuldeminas.edu.br/images/2022/09/OLIP/3.jpeg', alt: 'OLIP 2022' },
    { src: 'https://muz.ifsuldeminas.edu.br/images/2022/09/OLIP/40.jpeg', alt: 'OLIP 2022' },
    { src: 'https://muz.ifsuldeminas.edu.br/images/2022/09/OLIP/8.jpeg', alt: 'OLIP 2022' },
    { src: 'https://muz.ifsuldeminas.edu.br/images/2022/09/OLIP/5.jpeg', alt: 'OLIP 2022' },
  ],
  2021: [
    { src: 'https://portal.ifsuldeminas.edu.br/images/mat%C3%A9rias_2021/Maio/OLIP_2021/superior_ouro.jpg', alt: 'OLIP 2021 — Campeão Superior' },
    { src: 'https://portal.ifsuldeminas.edu.br/images/mat%C3%A9rias_2021/Maio/OLIP_2021/tecnico_ouro.jpg', alt: 'OLIP 2021 — Campeão Técnico' },
    { src: 'https://portal.ifsuldeminas.edu.br/images/mat%C3%A9rias_2021/Maio/OLIP_2021/tecnico_prata.jpg', alt: 'OLIP 2021 — Prata Técnico' },
    { src: 'https://portal.ifsuldeminas.edu.br/images/mat%C3%A9rias_2021/Maio/OLIP_2021/superior_prata.jpg', alt: 'OLIP 2021 — Prata Superior' },
  ],
  2020: [
    { src: 'https://portal.ifsuldeminas.edu.br/images/mat%C3%A9rias_2020/Maio/OLIP2020/aracele.png', alt: 'OLIP 2020' },
    { src: 'https://portal.ifsuldeminas.edu.br/images/mat%C3%A9rias_2020/Maio/OLIP2020/ricardo_martins.png', alt: 'OLIP 2020' },
    { src: 'https://portal.ifsuldeminas.edu.br/images/mat%C3%A9rias_2020/Maio/OLIP2020/espi%C3%A3s_corte.png', alt: 'OLIP 2020' },
    { src: 'https://portal.ifsuldeminas.edu.br/images/mat%C3%A9rias_2020/Maio/OLIP2020/parabellum_CORTE.png', alt: 'OLIP 2020' },
  ],
  2019: [
    { src: 'https://muz.ifsuldeminas.edu.br/images/2019/06/01_capa_materia/olimp.jpg', alt: 'OLIP 2019' },
    { src: 'https://muz.ifsuldeminas.edu.br/images/2019/06/olip/bronzesuperior.jpg', alt: 'OLIP 2019 — Bronze Superior' },
    { src: 'https://muz.ifsuldeminas.edu.br/images/2019/06/olip/pratatecnico.jpg', alt: 'OLIP 2019 — Prata Técnico' },
    { src: 'https://muz.ifsuldeminas.edu.br/images/2019/06/olip/publico.jpg', alt: 'OLIP 2019 — Público' },
  ],
  2018: [
    { src: 'https://www2.muz.ifsuldeminas.edu.br/images/stories/2018/06/olip/DSC_0213.JPG', alt: 'OLIP 2018' },
    { src: 'https://www2.muz.ifsuldeminas.edu.br/images/stories/2018/06/olip/DSC_0096.JPG', alt: 'OLIP 2018' },
    { src: 'https://www2.muz.ifsuldeminas.edu.br/images/stories/2018/06/olip/DSC_0086.JPG', alt: 'OLIP 2018' },
    { src: 'https://www2.muz.ifsuldeminas.edu.br/images/stories/2018/06/olip/DSC_0138.JPG', alt: 'OLIP 2018' },
  ],
  2017: [
    { src: 'https://www2.muz.ifsuldeminas.edu.br/images/stories/2017/08/olip/A2.jpg', alt: 'OLIP 2017' },
    { src: 'https://www2.muz.ifsuldeminas.edu.br/images/stories/2017/08/olip/DSC_0027.JPG', alt: 'OLIP 2017' },
  ],
  2016: [
    { src: 'https://www2.muz.ifsuldeminas.edu.br/images/stories/2016/07/OLIP/6%C2%AA_Olip_1.jpg', alt: 'OLIP 2016' },
    { src: 'https://www2.muz.ifsuldeminas.edu.br/images/stories/2016/07/OLIP/6%C2%AA_Olip_10.jpg', alt: 'OLIP 2016' },
    { src: 'https://www2.muz.ifsuldeminas.edu.br/images/stories/2016/07/OLIP/6%C2%AA_Olip_2.jpg', alt: 'OLIP 2016' },
    { src: 'https://www2.muz.ifsuldeminas.edu.br/images/stories/2016/07/OLIP/6%C2%AA_Olip_23.jpg', alt: 'OLIP 2016' },
  ],
  2015: [
    { src: 'https://www2.muz.ifsuldeminas.edu.br/images/stories/2015/06/olip/DSC_0002.jpg', alt: 'OLIP 2015' },
    { src: 'https://www2.muz.ifsuldeminas.edu.br/images/stories/2015/06/olip/DSC_0018.jpg', alt: 'OLIP 2015' },
    { src: 'https://www2.muz.ifsuldeminas.edu.br/images/stories/2015/06/olip/DSC_0025.jpg', alt: 'OLIP 2015' },
    { src: 'https://www2.muz.ifsuldeminas.edu.br/images/stories/2015/06/olip/DSC_0094.jpg', alt: 'OLIP 2015' },
  ],
  2014: [
    { src: 'https://www2.muz.ifsuldeminas.edu.br/images/stories/2014/06/iv_olip/01.jpg', alt: 'OLIP 2014' },
    { src: 'https://www2.muz.ifsuldeminas.edu.br/images/stories/2014/06/iv_olip/06.jpg', alt: 'OLIP 2014' },
    { src: 'https://www2.muz.ifsuldeminas.edu.br/images/stories/2014/06/iv_olip/14.jpg', alt: 'OLIP 2014' },
    { src: 'https://www2.muz.ifsuldeminas.edu.br/images/stories/2014/06/iv_olip/13.jpg', alt: 'OLIP 2014' },
  ],
  2013: [
    { src: 'https://www2.muz.ifsuldeminas.edu.br/images/stories/2013/06/olip/03.jpg', alt: 'OLIP 2013' },
    { src: 'https://www2.muz.ifsuldeminas.edu.br/images/stories/2013/06/olip/04.jpg', alt: 'OLIP 2013' },
    { src: 'https://www2.muz.ifsuldeminas.edu.br/images/stories/2013/06/olip/10.jpg', alt: 'OLIP 2013' },
    { src: 'https://www2.muz.ifsuldeminas.edu.br/images/stories/2013/06/olip/08.jpg', alt: 'OLIP 2013' },
  ],
  2012: [
    { src: 'https://www2.muz.ifsuldeminas.edu.br/images/stories/2012/07/2OLIP/1%C2%BA_lugar_T%C3%A9cnico.jpg', alt: 'OLIP 2012 — 1º Lugar Técnico' },
    { src: 'https://www2.muz.ifsuldeminas.edu.br/images/stories/2012/07/2OLIP/18.jpg', alt: 'OLIP 2012' },
    { src: 'https://www2.muz.ifsuldeminas.edu.br/images/stories/2012/07/2OLIP/14.jpg', alt: 'OLIP 2012' },
    { src: 'https://www2.muz.ifsuldeminas.edu.br/images/stories/2012/07/2OLIP/16.jpg', alt: 'OLIP 2012' },
  ],
  2011: [
    { src: 'https://www2.muz.ifsuldeminas.edu.br/images/stories/2011/05/OLIP/DSC_0056.jpg', alt: 'OLIP 2011' },
    { src: 'https://www2.muz.ifsuldeminas.edu.br/images/stories/2011/05/OLIP/DSC_0033.jpg', alt: 'OLIP 2011' },
    { src: 'https://www2.muz.ifsuldeminas.edu.br/images/stories/2011/05/OLIP/DSC_0039.jpg', alt: 'OLIP 2011' },
    { src: 'https://www2.muz.ifsuldeminas.edu.br/images/stories/2011/05/OLIP/DSC_0036.jpg', alt: 'OLIP 2011' },
  ],
}

const years = Object.keys(galleryData)
  .map(Number)
  .sort((a, b) => b - a)

export default function OlipGallery() {
  const [activeYear, setActiveYear] = useState(years[0])
  const [current, setCurrent] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const currentRef = useRef(0)
  const dirRef = useRef<1 | -1>(1)
  const totalRef = useRef(0)

  const images = galleryData[activeYear]
  const total = images.length
  totalRef.current = total

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      const count = totalRef.current
      const next = currentRef.current + dirRef.current
      const clamped = Math.max(0, Math.min(next, count - 1))
      if (clamped >= count - 1) dirRef.current = -1
      else if (clamped <= 0) dirRef.current = 1
      currentRef.current = clamped
      setCurrent(clamped)
    }, 4000)
  }, [])

  useEffect(() => {
    currentRef.current = 0
    dirRef.current = 1
    setCurrent(0)
    startTimer()
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [activeYear, startTimer])

  const handleYearChange = (year: number) => {
    setActiveYear(year)
  }

  const prev = () => {
    const val = Math.max(0, currentRef.current - 1)
    currentRef.current = val
    setCurrent(val)
    startTimer()
  }
  const next = () => {
    const val = Math.min(totalRef.current - 1, currentRef.current + 1)
    currentRef.current = val
    setCurrent(val)
    startTimer()
  }
  const goTo = (i: number) => {
    currentRef.current = i
    setCurrent(i)
    startTimer()
  }

  return (
    <div className="olip-gallery">
      {/* Year selector bar */}
      <div className="olip-gallery__years" role="tablist" aria-label="Selecionar ano da galeria">
        {years.map(year => (
          <button
            key={year}
            role="tab"
            aria-selected={activeYear === year}
            className={`olip-gallery__year-btn${activeYear === year ? ' active' : ''}`}
            onClick={() => handleYearChange(year)}
          >
            {year}
          </button>
        ))}
      </div>

      {/* Carousel */}
      <div className="pf-carousel olip-gallery__carousel">
        <div className="pf-carousel__viewport">
          <div
            className="pf-carousel__track"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {images.map((img, i) => (
              <article
                key={`${activeYear}-${i}`}
                className={`pf-carousel__slide${i === current ? ' active' : ''}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt={img.alt}
                  className="pf-carousel__img"
                  loading={i === 0 ? 'eager' : 'lazy'}
                />
                <div className="pf-carousel__overlay">
                  <span className="pf-carousel__tag olip-gallery__tag">{activeYear}</span>
                  <p className="pf-carousel__title">{img.alt}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="pf-carousel__controls">
          <button
            className="pf-carousel__arrow olip-gallery__arrow"
            onClick={prev}
            disabled={current === 0}
            aria-label="Foto anterior"
          >
            <i className="bi bi-arrow-left" />
          </button>

          <div className="pf-carousel__dots" role="tablist" aria-label="Fotos">
            {images.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === current}
                aria-label={`Ver foto ${i + 1}`}
                className={`pf-carousel__dot olip-gallery__dot${i === current ? ' active' : ''}`}
                onClick={() => goTo(i)}
              />
            ))}
          </div>

          <button
            className="pf-carousel__arrow olip-gallery__arrow"
            onClick={next}
            disabled={current === total - 1}
            aria-label="Próxima foto"
          >
            <i className="bi bi-arrow-right" />
          </button>
        </div>

        {/* Counter */}
        <p className="pf-carousel__counter" aria-live="polite">
          <span className="pf-carousel__counter-current olip-gallery__counter-current">
            {String(current + 1).padStart(2, '0')}
          </span>
          <span className="pf-carousel__counter-sep"> / </span>
          <span className="pf-carousel__counter-total">
            {String(total).padStart(2, '0')}
          </span>
        </p>
      </div>
    </div>
  )
}
