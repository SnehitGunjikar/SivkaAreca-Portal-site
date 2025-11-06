import { Link } from 'react-router-dom'
import { products } from '../data/products'
import { Button, ButtonLink } from '../components/Button'
import ScrollReveal from '../components/ScrollReveal'
import SpotlightCard from '../components/SpotlightCard'
import steelImg from '../assets/imagedata/core-expertise-image/steelstructure-fabrication-img.jpg'
import pebImg from '../assets/imagedata/core-expertise-image/peb-img.jpg'
import containerImg from '../assets/imagedata/core-expertise-image/container-img.jpg'
import towerImg from '../assets/imagedata/core-expertise-image/tower-img.jpg'
import sheetmetalImg from '../assets/imagedata/core-expertise-image/sheetmetal-img.jpg'

// WebP versions for better performance
import pebImgWebp from '../assets/imagedata/core-expertise-image/peb-img.webp'
import containerImgWebp from '../assets/imagedata/core-expertise-image/container-img.webp'
import towerImgWebp from '../assets/imagedata/core-expertise-image/tower-img.webp'
import sheetmetalImgWebp from '../assets/imagedata/core-expertise-image/sheetmetal-img.webp'
import { motion, useAnimation, useInView } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { 
  FaIndustry, 
  FaBuilding, 
  FaCube, 
  FaHammer,
  FaFilter,
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
  FaCircleCheck,
  FaStar,
  FaAward,
  FaShield
} from 'react-icons/fa6'

// Auto-load Core Expertise homepage slideshow images
const coreExpSlideshowGlob = import.meta.glob('../assets/imagedata/core-exp-homepg-img/*.{webp,jpg,jpeg,png}', { eager: true, as: 'url' })
const coreExpSlides = Object
  .entries(coreExpSlideshowGlob)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, url]) => url)

const productImages = {
  'structural-steel-fabrication': steelImg,
  'pre-engineered-buildings': pebImg,
  'modular-enclosures-containers': containerImg,
  'exhaust-support-towers': towerImg,
  'sheet-metal-fabrication': sheetmetalImg,
}

const productImagesWebp = {
  'pre-engineered-buildings': pebImgWebp,
  'modular-enclosures-containers': containerImgWebp,
  'exhaust-support-towers': towerImgWebp,
  'sheet-metal-fabrication': sheetmetalImgWebp,
}

const productIcons = {
  'structural-steel-fabrication': FaIndustry,
  'pre-engineered-buildings': FaBuilding,
  'modular-enclosures-containers': FaCube,
  'exhaust-support-towers': FaIndustry,
  'sheet-metal-fabrication': FaHammer,
}

// Animated Counter Component
function AnimatedCounter({ end, duration = 2000, suffix = "" }) {
  const [count, setCount] = useState(0)
  const countRef = useRef(null)
  const isInView = useInView(countRef, { once: true })

  useEffect(() => {
    if (!isInView) return

    let startTime = null
    const startCount = 0

    const updateCount = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      
      setCount(Math.floor(progress * (end - startCount) + startCount))
      
      if (progress < 1) {
        requestAnimationFrame(updateCount)
      }
    }

    requestAnimationFrame(updateCount)
  }, [isInView, end, duration])

  return <span ref={countRef}>{count}{suffix}</span>
}

function ProductCard({ product, imageSrc, index }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [loaded, setLoaded] = useState(false)
  const wrapperRef = useRef(null)
  const IconComponent = productIcons[product.slug] || FaIndustry

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
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
    >
      <SpotlightCard className="group relative h-full rounded-2xl border border-gray-300 bg-white p-6 flex flex-col transition-all duration-300 hover:ring-1 hover:ring-brand-200 hover:shadow-xl" spotlightColor="rgba(0, 0, 0, 0.15)">
        <ScrollReveal as="div" mode="block" containerClassName="flex-1 flex flex-col">
          <motion.div
            className="relative h-48 sm:h-52 lg:h-64 rounded-xl mb-4 overflow-hidden"
            style={{ rotateX: tilt.x, rotateY: tilt.y }}
            transition={{ type: 'spring', stiffness: 180, damping: 20 }}
          >
            <picture>
              <source srcSet={productImagesWebp[product.slug]} type="image/webp" />
              <img
                src={imageSrc}
                alt={`${product.title} image`}
                loading="lazy"
                onLoad={() => setLoaded(true)}
                className={`w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-105 ${loaded ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'}`}
                style={{ willChange: 'transform' }}
              />
            </picture>
            {!loaded && <div className="absolute inset-0 animate-pulse bg-gray-200" aria-hidden="true" />}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent" />
            
            {/* Icon overlay */}
            <div className="absolute top-4 left-4 p-3 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg group-hover:bg-brand-50 transition-colors">
              <IconComponent className="text-brand-600 text-xl" />
            </div>
            
            {/* Removed Premium badge */}
          </motion.div>
          
          <div className="flex items-center gap-3 mb-3">
            <h3 className="font-bold text-gray-900 text-lg group-hover:text-brand-700 transition-colors">{product.title}</h3>
          </div>
          
          <p className="text-gray-700 flex-1 mb-6 leading-relaxed">{product.features[0]}</p>
          
          {/* Removed feature chips */}
          
          <ButtonLink to={`/products/${product.slug}`} variant="primary" className="mt-auto group">
            Learn More
            <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </ButtonLink>
        </ScrollReveal>
      </SpotlightCard>
    </motion.div>
  )
}

export default function Products() {
  const [filter, setFilter] = useState('all')
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-advance slideshow
  useEffect(() => {
    if (!isAutoPlaying || coreExpSlides.length === 0) return
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % coreExpSlides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % coreExpSlides.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + coreExpSlides.length) % coreExpSlides.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const filteredProducts = products.filter(product => {
    return true // Show all products since search is removed
  })

  return (
    <div className="space-y-16">
      {/* Homepage-style Hero Section with Slideshow */}
      <motion.section 
        className="relative overflow-hidden h-[65vh] sm:h-[72vh] md:h-[80vh]"
        style={{ 
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          width: '100%',
          zIndex: 10
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="relative w-full h-full overflow-hidden">
          {/* Slideshow Background */}
          <div className="absolute inset-0">
            {coreExpSlides.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out bg-center md:bg-top bg-no-repeat bg-cover md:bg-fixed ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  backgroundImage: `url(${image})`
                }}
              />
            ))}
          </div>

          {/* Enhanced overlay for better text readability */}
          <div className="absolute inset-0 m-0 p-0 bg-gradient-to-r from-black/70 via-black/50 to-black/40"></div>

          {/* Navigation Buttons */}
          <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 flex space-x-2 z-20">
            <button
              onClick={prevSlide}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 sm:p-3 md:p-4 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
              aria-label="Previous image"
            >
              <FaChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 sm:p-3 md:p-4 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
              aria-label="Next image"
            >
              <FaChevronRight className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
            </button>
          </div>

          {/* Slide Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1 sm:space-x-2 z-20">
            {coreExpSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentSlide(index)
                  setIsAutoPlaying(false)
                  setTimeout(() => setIsAutoPlaying(true), 10000)
                }}
                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 shadow-lg ${
                  index === currentSlide 
                    ? 'bg-white scale-125' 
                    : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Content positioned at bottom left */}
          <div className="absolute bottom-0 left-0 z-10">
            <div className="p-6 sm:p-8 md:p-10 lg:p-12 max-w-2xl lg:max-w-3xl mb-6 sm:mb-8 md:mb-10">
              <div className="text-white text-left space-y-2 sm:space-y-3 md:space-y-4">
                {/* Main Heading */}
                <motion.div
                  initial={{ opacity: 0, x: -100, rotateX: 45 }}
                  animate={{ opacity: 1, x: 0, rotateX: 0 }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                  className="relative"
                >
                  <h2 className="font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight">
                    <span className="block bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent drop-shadow-2xl">
                      <motion.span
                        className="inline-block"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8, type: 'spring', bounce: 0.4 }}
                      >
                        Core Expertise
                      </motion.span>
                    </span>
                  </h2>
                  <motion.div
                    className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-brand-400 to-transparent rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '60%' }}
                    transition={{ delay: 1, duration: 1.5, ease: 'easeOut' }}
                  />
                </motion.div>
                {/* One-liner */}
                <motion.p 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0, duration: 0.8 }}
                  className="text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed text-white/90 drop-shadow-lg"
                >
                  Comprehensive expertise across structural fabrication, PEB, enclosures, towers, and sheet metal.
                </motion.p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Spacer to account for absolute positioned hero section (minus page spacing) */}
      <div className="h-[calc(65vh-6rem)] sm:h-[calc(72vh-7rem)] md:h-[calc(80vh-8rem)]"></div>

      {/* Quality Assurance Section removed */}

      {/* Products Grid */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-4">Our Products</h2>
          <p className="text-gray-600 text-base sm:text-lg px-4">Discover our comprehensive range of steel fabrication solutions</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 items-stretch">
          {filteredProducts.map((p, index) => (
            <ProductCard key={p.slug} product={p} imageSrc={productImages[p.slug]} index={index} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <motion.div
            className="text-center py-8 sm:py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <FaMagnifyingGlass className="text-3xl sm:text-4xl text-gray-400 mb-3 sm:mb-4 mx-auto" />
            <p className="text-gray-600 px-4">No products found matching your search.</p>
          </motion.div>
        )}
      </motion.section>

      {/* Call to Action */}
      <motion.section
        className="relative overflow-hidden bg-gradient-to-br from-brand-600 via-brand-700 to-brand-800 text-white py-16 px-6 rounded-3xl"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <FaIndustry className="text-5xl mb-6 mx-auto" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Need Custom Fabrication?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Let's discuss your specific requirements and create the perfect solution
            </p>
            <motion.div
              className="flex flex-wrap gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <ButtonLink 
                to="/contact" 
                variant="contrast-white"
                className="group"
              >
                Get Custom Quote
                <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </ButtonLink>
              <ButtonLink 
                to="/projects" 
                variant="contrast-outline"
                className="group"
              >
                View Our Projects
                <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </ButtonLink>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}