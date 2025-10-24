import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

export default function GooeyNav({
  items = [], // [{ label, to }]
  animationTime = 900,
  particleCount = 15,
  timeVariance = 500,
  particleR = 100,
  className = ''
}) {
  const navRef = useRef(null)
  const highlightRef = useRef(null)
  const itemRefs = useRef([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [particles, setParticles] = useState([])
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    // derive active index from current location
    const idx = items.findIndex(i => i.to === location.pathname)
    if (idx >= 0) setActiveIndex(idx)
  }, [location.pathname, items])

  useEffect(() => {
    // position highlight under active item
    const container = navRef.current
    const activeEl = itemRefs.current[activeIndex]
    const highlightEl = highlightRef.current
    if (!container || !activeEl || !highlightEl) return
    const containerRect = container.getBoundingClientRect()
    const rect = activeEl.getBoundingClientRect()
    const left = rect.left - containerRect.left
    const width = rect.width
    highlightEl.style.transform = `translateX(${left}px)`
    highlightEl.style.width = `${width}px`
  }, [activeIndex, items])

  useEffect(() => {
    // spawn particles for subtle animation
    const activeEl = itemRefs.current[activeIndex]
    const container = navRef.current
    if (!activeEl || !container) return
    const containerRect = container.getBoundingClientRect()
    const rect = activeEl.getBoundingClientRect()
    const originX = rect.left - containerRect.left + rect.width / 2
    const originY = rect.top - containerRect.top + rect.height / 2

    const count = particleCount
    const now = Date.now()
    const parts = Array.from({ length: count }).map((_, i) => {
      const angle = Math.random() * Math.PI * 2
      const dist = Math.random() * particleR
      const duration = animationTime + Math.floor(Math.random() * timeVariance)
      const x = Math.cos(angle) * dist
      const y = Math.sin(angle) * dist
      return {
        id: `${now}-${i}`,
        originX,
        originY,
        x,
        y,
        duration
      }
    })
    setParticles(parts)

    const t = setTimeout(() => setParticles([]), animationTime + timeVariance + 200)
    return () => clearTimeout(t)
  }, [activeIndex, animationTime, timeVariance, particleCount, particleR])

  const onClick = (idx, to) => {
    setActiveIndex(idx)
    navigate(to)
  }

  const filterId = useMemo(() => `gooey-filter-${Math.random().toString(36).slice(2)}`, [])

  return (
    <div className={`relative ${className}`}>
      {/* SVG filter for gooey effect */}
      <svg className="absolute -z-10 w-0 h-0" aria-hidden>
        <defs>
          <filter id={filterId}>
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      <div ref={navRef} className="relative flex items-center gap-1" style={{ filter: `url(#${filterId})` }}>
        {/* highlight bar */}
        <div ref={highlightRef} className="absolute inset-y-0 rounded-md bg-brand-600/60 transition-transform duration-300" />

        {/* nav items */}
        {items.map((item, idx) => (
          <button
            key={item.to}
            ref={el => itemRefs.current[idx] = el}
            onClick={() => onClick(idx, item.to)}
            className={`relative z-10 px-3 py-2 rounded-md text-sm font-medium ${idx === activeIndex ? 'text-white' : 'text-gray-200 hover:bg-white/10'}`}
          >
            {item.label}
          </button>
        ))}

        {/* particles */}
        <div className="absolute inset-0 pointer-events-none">
          {particles.map(p => (
            <span
              key={p.id}
              className="absolute rounded-full bg-brand-400/30"
              style={{
                left: p.originX,
                top: p.originY,
                width: 10,
                height: 10,
                transform: `translate(${p.x}px, ${p.y}px)`,
                transition: `transform ${p.duration}ms ease, opacity ${p.duration}ms ease`,
                opacity: 0.2
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}