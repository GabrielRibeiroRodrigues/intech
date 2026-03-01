'use client'

import { useEffect, useRef, useState } from 'react'

function useCountUp(target: number, duration = 1800) {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const startTime = performance.now()
          const tick = (now: number) => {
            const elapsed = now - startTime
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setValue(Math.round(eased * target))
            if (progress < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.4 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [target, duration])

  return { value, ref }
}

const stats = [
  { target: 15, suffix: '+', label: 'Projetos entregues', delay: 0 },
  { target: 12, suffix: '+', label: 'Clientes atendidos', delay: 1 },
  { target: 3, suffix: '+', label: 'Anos de operação', delay: 2 },
  { target: 20, suffix: '+', label: 'Membros ativos', delay: 3 },
]

function StatItem({
  target,
  suffix,
  label,
  delay,
}: {
  target: number
  suffix: string
  label: string
  delay: number
}) {
  const { value, ref } = useCountUp(target)

  return (
    <div
      className="stat reveal"
      style={{ '--i': delay } as React.CSSProperties}
      ref={ref}
    >
      <div className="stat__number">
        {value}
        {suffix}
      </div>
      <div className="stat__label">{label}</div>
    </div>
  )
}

export default function StatsCounter() {
  return (
    <section className="stats" aria-label="Números da Intech Jr.">
      <div className="container">
        <div className="stats__grid">
          {stats.map((s) => (
            <StatItem key={s.label} {...s} />
          ))}
        </div>
      </div>
    </section>
  )
}
