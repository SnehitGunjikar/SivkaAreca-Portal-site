import { projects } from '../data/projects'
import { ButtonLink } from '../components/Button'
import ScrollReveal from '../components/ScrollReveal'
import SpotlightCard from '../components/SpotlightCard'
import railwayImg from '../assets/imagedata/products-image/railway-staircase-img.JPG'
import pebImage from '../assets/imagedata/products-image/peb-image.PNG'
import containerImage from '../assets/imagedata/products-image/contairner-img.JPG'
import towerImage from '../assets/imagedata/products-image/tower-img.JPG'
import sheetmetalImage from '../assets/imagedata/products-image/sheetmetal-img.jpg'
import railwayImgWebp from '../assets/imagedata/products-image/railway-staircase-img.webp'
import pebImageWebp from '../assets/imagedata/products-image/peb-image.webp'
import containerImageWebp from '../assets/imagedata/products-image/contairner-img.webp'
import towerImageWebp from '../assets/imagedata/products-image/tower-img.webp'
import sheetmetalImageWebp from '../assets/imagedata/products-image/sheetmetal-img.webp'
import { motion, useAnimation, useInView } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { 
  FaDiagramProject, 
  FaTrain, 
  FaBuilding, 
  FaCube, 
  FaIndustry, 
  FaHammer,
  FaFilter,
  FaArrowRight,
  FaCircleCheck,
  FaClock,
  FaStar,
  FaAward,
  FaShield,
  FaCalendar,
  FaLocationDot,
  FaEye,
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa6'

const projectImages = {
  'government-railway-projects-swr': railwayImg,
  'pre-engineered-building-peb': pebImage,
  'customized-container': containerImage,
  'exhaust-towers': towerImage,
  'sheet-metal-works-ntpc': sheetmetalImage,
}
const projectImagesWebp = {
  'government-railway-projects-swr': railwayImgWebp,
  'pre-engineered-building-peb': pebImageWebp,
  'customized-container': containerImageWebp,
  'exhaust-towers': towerImageWebp,
  'sheet-metal-works-ntpc': sheetmetalImageWebp,
}

const projectIcons = {
  'government-railway-projects-swr': FaTrain,
  'pre-engineered-building-peb': FaBuilding,
  'customized-container': FaCube,
  'exhaust-towers': FaIndustry,
  'sheet-metal-works-ntpc': FaHammer,
}

const projectCategories = [
  { id: 'all', name: 'All Projects', icon: FaDiagramProject },
  { id: 'railway', name: 'Railway', icon: FaTrain },
  { id: 'building', name: 'Buildings', icon: FaBuilding },
  { id: 'container', name: 'Containers', icon: FaCube },
  { id: 'tower', name: 'Towers', icon: FaIndustry },
  { id: 'sheet-metal', name: 'Sheet Metal', icon: FaHammer },
]

// Auto-load hero slideshow images for Projects page
const projSlideshowGlob = import.meta.glob('../assets/imagedata/proj-homepg-img/*.{webp,jpg,jpeg,png}', { eager: true, as: 'url' })
const projSlides = Object
  .entries(projSlideshowGlob)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, url]) => url)

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

function ProjectCard({ project, imageSrc, index }) {
  const [loaded, setLoaded] = useState(false)
  const IconComponent = projectIcons[project.slug] || FaDiagramProject

  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <SpotlightCard className="group relative h-full rounded-2xl border border-gray-300 bg-white p-6 flex flex-col transition-all duration-300 hover:ring-1 hover:ring-brand-200 hover:shadow-xl" spotlightColor="rgba(0, 0, 0, 0.15)">
        <ScrollReveal as="div" mode="block" containerClassName="flex-1 flex flex-col">
          <div className="relative w-full aspect-[4/3] rounded-xl mb-4 overflow-hidden">
            <picture>
              <source srcSet={projectImagesWebp[project.slug]} type="image/webp" />
              <img 
                src={imageSrc} 
                alt={project.title} 
                loading="lazy" 
                onLoad={() => setLoaded(true)}
                className={`w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-105 ${loaded ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'}`}
              />
            </picture>
            {!loaded && <div className="absolute inset-0 animate-pulse bg-gray-200" aria-hidden="true" />}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent" />
            
            {/* Icon overlay */}
            <div className="absolute top-4 left-4 p-3 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg group-hover:bg-brand-50 transition-colors">
              <IconComponent className="text-brand-600 text-xl" />
            </div>
            
            {/* Status badge */}
            <div className={`absolute top-4 right-4 flex items-center gap-1 px-2 py-1 ${project.status === 'Ongoing' ? 'bg-yellow-500/90' : 'bg-green-500/90'} backdrop-blur-sm rounded-full text-white text-xs font-medium`}>
              {project.status === 'Ongoing' ? <FaClock size={12} /> : <FaCircleCheck size={12} />}
              {project.status || 'Completed'}
            </div>
          </div>
          
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-bold text-gray-900 text-lg group-hover:text-brand-700 transition-colors flex-1" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {project.title}
            </h3>
          </div>
          
          <p className="text-gray-700 flex-1 mb-6 leading-relaxed" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {project.description}
          </p>
          
          {/* Project details */}
          <div className="mb-6 space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FaCalendar size={14} />
              <span>{project.duration || '—'}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FaLocationDot size={14} />
              <span>India</span>
            </div>
          </div>
          
          <ButtonLink to={`/projects/${project.slug}`} variant="primary" className="mt-auto group">
            View Details
            <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </ButtonLink>
        </ScrollReveal>
      </SpotlightCard>
    </motion.div>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState('all')
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-advance slideshow
  useEffect(() => {
    if (!isAutoPlaying || projSlides.length === 0) return
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % projSlides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, projSlides.length])

  const filteredProjects = projects.filter(project => {
    if (filter === 'all') return true
    
    // Map project slugs to categories
    const categoryMap = {
      'government-railway-projects-swr': 'railway',
      'pre-engineered-building-peb': 'building',
      'customized-container': 'container',
      'exhaust-towers': 'tower',
      'sheet-metal-works-ntpc': 'sheet-metal'
    }
    
    return categoryMap[project.slug] === filter
  })

  return (
    <div className="space-y-16">
      {/* Fullscreen Hero Section with Slideshow */}
      <motion.section 
        className="relative overflow-hidden"
        style={{ 
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          width: '100vw',
          height: '80vh',
          zIndex: 10
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="relative w-full h-full overflow-hidden">
          {/* Slideshow Background */}
          <div className="absolute inset-0">
            {projSlides.map((image, index) => (
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

          {/* Overlay */}
          <div className="absolute inset-0 m-0 p-0 bg-gradient-to-r from-black/70 via-black/50 to-black/40"></div>

          {/* Navigation Buttons */}
          <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 flex space-x-2 z-20">
            <button
              onClick={() => { setCurrentSlide((prev) => (prev - 1 + projSlides.length) % projSlides.length); setIsAutoPlaying(false); setTimeout(() => setIsAutoPlaying(true), 10000) }}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 sm:p-3 md:p-4 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
              aria-label="Previous image"
            >
              <FaChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
            </button>
            <button
              onClick={() => { setCurrentSlide((prev) => (prev + 1) % projSlides.length); setIsAutoPlaying(false); setTimeout(() => setIsAutoPlaying(true), 10000) }}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 sm:p-3 md:p-4 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
              aria-label="Next image"
            >
              <FaChevronRight className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
            </button>
          </div>

          {/* Slide Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1 sm:space-x-2 z-20">
            {projSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => { setCurrentSlide(index); setIsAutoPlaying(false); setTimeout(() => setIsAutoPlaying(true), 10000) }}
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
                        Our Projects
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
                <motion.p 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0, duration: 0.8 }}
                  className="text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed text-white/90 drop-shadow-lg"
                >
                  Where vision meets precision—every project is a testament to craftsmanship, innovation, and relentless attention to detail
                </motion.p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Spacer for absolute hero */}
      <div className="h-[calc(80vh-8rem)]"></div>

      {/* Project Categories removed */}

      {/* Projects Grid */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Projects</h2>
          <p className="text-gray-600 text-lg">Discover our portfolio of successful steel fabrication projects</p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {filteredProjects.map((pr, index) => (
            <ProjectCard key={pr.slug} project={pr} imageSrc={projectImages[pr.slug]} index={index} />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <FaMagnifyingGlass className="text-4xl text-gray-400 mb-4 mx-auto" />
            <p className="text-gray-600">No projects found matching your search.</p>
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
            <FaDiagramProject className="text-5xl mb-6 mx-auto" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Let's collaborate to bring your vision to life with our proven expertise
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
                variant="white-solid"
                className="group"
              >
                Start Your Project
                <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </ButtonLink>
              <ButtonLink 
                to="/products" 
                variant="white-outline"
                className="group"
              >
                View Our Products
                <FaEye className="ml-2 group-hover:scale-110 transition-transform" />
              </ButtonLink>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}