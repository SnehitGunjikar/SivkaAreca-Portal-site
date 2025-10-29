import { Link } from 'react-router-dom'
import { products } from '../data/products'
import { ButtonLink } from '../components/Button'
import ScrollReveal from '../components/ScrollReveal'
import SpotlightCard from '../components/SpotlightCard'
import steelImg from '../assets/imagedata/core-expertise-image/steelstructure-fabrication-img.jpg'
import pebImg from '../assets/imagedata/core-expertise-image/peb-img.jpg'
import containerImg from '../assets/imagedata/core-expertise-image/container-img.jpg'
import towerImg from '../assets/imagedata/core-expertise-image/tower-img.jpg'
import sheetmetalImg from '../assets/imagedata/core-expertise-image/sheetmetal-img.jpg'
import { motion } from 'framer-motion'
import { useState, useRef } from 'react'

const productImages = {
  'structural-steel-fabrication': steelImg,
  'pre-engineered-buildings': pebImg,
  'modular-enclosures-containers': containerImg,
  'exhaust-support-towers': towerImg,
  'sheet-metal-fabrication': sheetmetalImg,
}

function ProductCard({ product, imageSrc }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [loaded, setLoaded] = useState(false)
  const wrapperRef = useRef(null)

  const handleMove = (e) => {
    const rect = wrapperRef.current?.getBoundingClientRect()
    if (!rect) return
    const dx = (e.clientX - rect.left) / rect.width - 0.5
    const dy = (e.clientY - rect.top) / rect.height - 0.5
    const max = 3 // degrees
    setTilt({ x: -(dy * max), y: dx * max })
  }
  const resetTilt = () => setTilt({ x: 0, y: 0 })

  return (
    <motion.div
      ref={wrapperRef}
      className="h-full"
      style={{ perspective: 800 }}
      onMouseMove={handleMove}
      onMouseLeave={resetTilt}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 220, damping: 20 }}
    >
      <SpotlightCard className="group relative h-full rounded-2xl border border-gray-300 bg-white p-5 pb-16 flex flex-col transition hover:ring-1 hover:ring-gray-200 hover:shadow-lg" spotlightColor="rgba(0, 0, 0, 0.08)">
        <ScrollReveal as="div" mode="block" containerClassName="flex-1 flex flex-col">
          <motion.div
            className="relative h-40 sm:h-48 lg:h-64 rounded-lg mb-3 overflow-hidden"
            style={{ rotateX: tilt.x, rotateY: tilt.y }}
            transition={{ type: 'spring', stiffness: 180, damping: 20 }}
          >
            <img
              src={imageSrc}
              alt={`${product.title} image`}
              loading="lazy"
              onLoad={() => setLoaded(true)}
              className={`w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-105 ${loaded ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'}`}
              style={{ willChange: 'transform' }}
            />
            {!loaded && <div className="absolute inset-0 animate-pulse bg-gray-200" aria-hidden="true" />}
            <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-black/5 to-transparent" />
          </motion.div>
          <h3 className="font-semibold text-gray-900">{product.title}</h3>
          <p className="text-sm text-gray-700">{product.features[0]}</p>
        </ScrollReveal>
        <ButtonLink to={`/products/${product.slug}`} className="absolute bottom-4 left-4 z-10">Read More</ButtonLink>
      </SpotlightCard>
    </motion.div>
  )
}

export default function Products() {
  return (
    <div>
      <ScrollReveal baseOpacity={0} enableBlur={true} baseRotation={5} blurStrength={10} textClassName="text-gray-900">
        Core Expertise
      </ScrollReveal>
      <ScrollReveal as="p" mode="text" textTag="span" useDefaultTextStyles={false} containerClassName="mt-2" textClassName="text-gray-800">Core expertise across structural fabrication, PEB, enclosures, towers, and sheet metal.</ScrollReveal>
      <div className="mt-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-stretch">
        {products.map((p) => (
          <ProductCard key={p.slug} product={p} imageSrc={productImages[p.slug]} />
        ))}
      </div>
    </div>
  )
}