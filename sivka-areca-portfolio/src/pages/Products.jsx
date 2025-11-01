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
  FaMagnifyingGlass,
  FaArrowRight,
  FaCircleCheck,
  FaStar,
  FaAward,
  FaShield
} from 'react-icons/fa6'

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
            
            {/* Quality badge */}
            <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 bg-green-500/90 backdrop-blur-sm rounded-full text-white text-xs font-medium">
              <FaCircleCheck size={12} />
              Premium
            </div>
          </motion.div>
          
          <div className="flex items-center gap-3 mb-3">
            <h3 className="font-bold text-gray-900 text-lg group-hover:text-brand-700 transition-colors">{product.title}</h3>
          </div>
          
          <p className="text-gray-700 flex-1 mb-6 leading-relaxed">{product.features[0]}</p>
          
          {/* Features list */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {product.features.slice(1, 3).map((feature, idx) => (
                <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                  {feature.length > 20 ? feature.substring(0, 20) + '...' : feature}
                </span>
              ))}
            </div>
          </div>
          
          <ButtonLink to={`/products/${product.slug}`} className="mt-auto group bg-brand-600 hover:bg-brand-700 text-white">
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
  const [searchTerm, setSearchTerm] = useState('')

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.features.some(feature => feature.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesSearch
  })

  return (
    <div className="space-y-16">
      {/* Enhanced Hero Section */}
      <motion.section
        className="relative overflow-hidden bg-gradient-to-br from-brand-50 via-white to-brand-50 py-6 sm:py-8 md:py-12 lg:py-16 px-3 sm:px-4 md:px-6 rounded-3xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23000000%22%20fill-opacity%3D%220.02%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <FaIndustry className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-brand-600 mb-3 sm:mb-4 md:mb-6 mx-auto" />
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4 px-2 sm:px-4">
              Core Expertise
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-4 sm:mb-6 md:mb-8 px-2 sm:px-4 leading-relaxed">
              Comprehensive solutions across structural fabrication, PEB, enclosures, towers, and sheet metal
            </p>
          </motion.div>

          {/* Statistics */}
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6 md:mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="text-center">
              <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-brand-600 mb-1 sm:mb-2">
                <AnimatedCounter end={500} suffix="+" />
              </div>
              <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-tight">Projects Completed</p>
            </div>
            <div className="text-center">
              <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-brand-600 mb-1 sm:mb-2">
                <AnimatedCounter end={15} suffix="+" />
              </div>
              <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-tight">Years Experience</p>
            </div>
            <div className="text-center">
              <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-brand-600 mb-1 sm:mb-2">
                <AnimatedCounter end={50} suffix="+" />
              </div>
              <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-tight">Happy Clients</p>
            </div>
            <div className="text-center">
              <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-brand-600 mb-1 sm:mb-2">
                <AnimatedCounter end={99} suffix="%" />
              </div>
              <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-tight">Quality Assurance</p>
            </div>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            className="max-w-md mx-auto px-2 sm:px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="relative">
              <FaMagnifyingGlass className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm sm:text-base" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
              />
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Quality Assurance Section */}
      <motion.section
        className="bg-white py-8 sm:py-12 px-4 sm:px-6 rounded-2xl border border-gray-200"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <FaShield className="text-3xl sm:text-4xl text-brand-600 mb-3 sm:mb-4 mx-auto" />
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 px-4">Quality Assurance</h2>
            <p className="text-gray-600 text-sm sm:text-base px-4">Every product meets the highest industry standards</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <motion.div
              className="text-center p-4 sm:p-6 rounded-xl bg-brand-50"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              <FaAward className="text-2xl sm:text-3xl text-brand-600 mb-3 sm:mb-4 mx-auto" />
              <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Certified Excellence</h3>
              <p className="text-gray-600 text-xs sm:text-sm">ISO certified manufacturing processes</p>
            </motion.div>
            
            <motion.div
              className="text-center p-4 sm:p-6 rounded-xl bg-brand-50"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <FaStar className="text-2xl sm:text-3xl text-brand-600 mb-3 sm:mb-4 mx-auto" />
              <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Premium Materials</h3>
              <p className="text-gray-600 text-xs sm:text-sm">Only the finest steel and components</p>
            </motion.div>
            
            <motion.div
              className="text-center p-4 sm:p-6 rounded-xl bg-brand-50 sm:col-span-2 lg:col-span-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <FaCircleCheck className="text-2xl sm:text-3xl text-brand-600 mb-3 sm:mb-4 mx-auto" />
              <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Rigorous Testing</h3>
              <p className="text-gray-600 text-xs sm:text-sm">Comprehensive quality control checks</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

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
                className="bg-white text-brand-700 hover:bg-gray-100 group"
              >
                Get Custom Quote
                <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </ButtonLink>
              <ButtonLink 
                to="/projects" 
                variant="secondary"
                className="border-white text-white hover:bg-white hover:text-brand-700 group"
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