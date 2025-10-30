import { useParams, Link } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import { projects } from '../data/projects'
import ScrollReveal from '../components/ScrollReveal'
import SpotlightCard from '../components/SpotlightCard'
import { Button } from '../components/Button'
import { motion, useAnimation, useInView, AnimatePresence } from 'framer-motion'
import { 
  FaArrowLeft,
  FaCalendar,
  FaLocationDot,
  FaUser,
  FaIndustry,
  FaClock,
  FaCircleCheck,
  FaExpand,
  FaXmark,
  FaChevronLeft,
  FaChevronRight,
  FaAward,
  FaWrench,
  FaShield,
  FaRocket,
  FaPhone,
  FaEnvelope,
  FaDownload,
  FaShare,
  FaEye,
  FaThumbsUp,
  FaStar,
  FaQuoteLeft,
  FaPlay,
  FaPause,
  FaBuilding,
  FaGear
} from 'react-icons/fa6'

const resolveImage = (fileName) => new URL(`../assets/imagedata/products-image/${fileName}`, import.meta.url).href

// Auto-load images from per-project folders using Vite's import.meta.glob
const projectFolderGalleries = {
  'pre-engineered-building-peb': import.meta.glob('../assets/imagedata/products-image/peb/*', { eager: true, as: 'url' }),
  'customized-container': import.meta.glob('../assets/imagedata/products-image/containers/*', { eager: true, as: 'url' }),
  'sheet-metal-works-ntpc': import.meta.glob('../assets/imagedata/products-image/sheetmetal-works/*', { eager: true, as: 'url' }),
}

const projectFolderGalleriesWebp = {
  'pre-engineered-building-peb': import.meta.glob('../assets/imagedata/products-image/peb/*.webp', { eager: true, as: 'url' }),
  'customized-container': import.meta.glob('../assets/imagedata/products-image/containers/*.webp', { eager: true, as: 'url' }),
  'sheet-metal-works-ntpc': import.meta.glob('../assets/imagedata/products-image/sheetmetal-works/*.webp', { eager: true, as: 'url' }),
}

// Government Railway Projects: location-based galleries (prefer WebP)
const railwayLocationsWebp = {
  BAGALKOT: import.meta.glob('../assets/imagedata/products-image/govt-railways/BAGALKOT/*.webp', { eager: true, as: 'url' }),
  Channapatna: import.meta.glob('../assets/imagedata/products-image/govt-railways/Channapatna/*.webp', { eager: true, as: 'url' }),
  Ghataprabha: import.meta.glob('../assets/imagedata/products-image/govt-railways/Ghataprabha/*.webp', { eager: true, as: 'url' }),
  GUNJI: import.meta.glob('../assets/imagedata/products-image/govt-railways/GUNJI/*.webp', { eager: true, as: 'url' }),
  MANDYA: import.meta.glob('../assets/imagedata/products-image/govt-railways/MANDYA/*.webp', { eager: true, as: 'url' }),
  'SULDAL SULEBHAVI': import.meta.glob('../assets/imagedata/products-image/govt-railways/SULDAL SULEBHAVI/*.webp', { eager: true, as: 'url' }),
  UGAR: import.meta.glob('../assets/imagedata/products-image/govt-railways/UGAR/*.webp', { eager: true, as: 'url' }),
}
const railwayCommonWebp = import.meta.glob('../assets/imagedata/products-image/govt-railways/*', { eager: true, as: 'url' })

// Exhaust Towers: client/location-based galleries (prefer WebP)
const exhaustTowersClientsWebp = {
  'Aequs SEZ, Belgaum Karnataka': import.meta.glob('../assets/imagedata/products-image/exhaust-towers/AEQUS/*.webp', { eager: true, as: 'url' }),
  'Modern Hiring Service, Andaman and Nicobar Islands': import.meta.glob('../assets/imagedata/products-image/exhaust-towers/ModernHiringService-AN/*.webp', { eager: true, as: 'url' }),
  'Modern Hiring Service, Tiruchi Tamil Nadu': import.meta.glob('../assets/imagedata/products-image/exhaust-towers/ModernHiringService-Tiruchi/*.webp', { eager: true, as: 'url' }),
}
const exhaustTowersCommonWebp = import.meta.glob('../assets/imagedata/products-image/exhaust-towers/*', { eager: true, as: 'url' })

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

// Timeline Component
function ProjectTimeline({ project }) {
  const timelineSteps = [
    { phase: 'Planning', icon: FaGear, description: 'Project planning and design phase', status: 'completed' },
    { phase: 'Fabrication', icon: FaWrench, description: 'Manufacturing and fabrication process', status: 'completed' },
    { phase: 'Installation', icon: FaBuilding, description: 'On-site installation and assembly', status: 'completed' },
    { phase: 'Completion', icon: FaCircleCheck, description: 'Project completion and handover', status: 'completed' }
  ]

  return (
    <div className="relative">
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-brand-200"></div>
      {timelineSteps.map((step, index) => (
        <motion.div
          key={step.phase}
          className="relative flex items-center gap-6 pb-8"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.2, duration: 0.6 }}
        >
          <div className={`relative z-10 flex items-center justify-center w-16 h-16 rounded-full ${
            step.status === 'completed' ? 'bg-brand-600' : 'bg-gray-300'
          } text-white`}>
            <step.icon className="text-xl" />
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-semibold text-gray-900 mb-1">{step.phase}</h4>
            <p className="text-gray-600">{step.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

// Image Gallery Modal Component
function ImageGalleryModal({ images, currentIndex, onClose, onNext, onPrev, title }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose, onNext, onPrev])

  return (
    <motion.div
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="relative max-w-4xl max-h-full" onClick={(e) => e.stopPropagation()}>
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`${title} - Image ${currentIndex + 1}`}
          className="max-w-full max-h-full object-contain rounded-lg"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
        >
          <FaXmark />
        </button>
        
        {/* Navigation Buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={onPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={onNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
            >
              <FaChevronRight />
            </button>
          </>
        )}
        
        {/* Image Counter */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/50 text-white rounded-full text-sm">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </motion.div>
  )
}

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = projects.find((p) => p.slug === slug)
  const [viewerIndex, setViewerIndex] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [currentGallery, setCurrentGallery] = useState([])
  const [galleryTitle, setGalleryTitle] = useState('')

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Project not found</h1>
          <Link 
            to="/projects" 
            className="inline-flex items-center gap-2 text-brand-600 hover:text-brand-700 transition-colors"
          >
            <FaArrowLeft />
            Back to Projects
          </Link>
        </div>
      </div>
    )
  }

  // Gallery logic (simplified for this enhancement)
  const webpEntries = Object.entries(projectFolderGalleriesWebp[project.slug] || {})
  const folderGalleryWebp = webpEntries
    .filter(([key]) => !key.endsWith('-640.webp'))
    .map(([, url]) => url)

  const origEntries = Object.entries(projectFolderGalleries[project.slug] || {})
  const folderGallery = origEntries
    .filter(([key]) => !key.endsWith('.webp') && !key.endsWith('-640.webp'))
    .map(([, url]) => url)

  const fallbackGallery = (project.images || []).map(resolveImage)

  // Special handling for Government Railway Projects
  const isRailProject = project.slug === 'government-railway-projects-swr'
  let locationSections = null
  if (isRailProject) {
    const locOrder = ['BAGALKOT', 'Channapatna', 'Ghataprabha', 'GUNJI', 'MANDYA', 'SULDAL SULEBHAVI', 'UGAR']
    locationSections = locOrder.map((loc) => {
      const entries = Object.entries(railwayLocationsWebp[loc] || {})
      const images = entries
        .filter(([key]) => !key.endsWith('-640.webp'))
        .map(([, url]) => url)
      return { loc, images }
    }).filter((s) => s.images.length > 0)
  }

  // Special handling for Exhaust Towers
  const isExhaustProject = project.slug === 'exhaust-towers'
  let clientSections = null
  if (isExhaustProject) {
    const clientOrder = [
      'Aequs SEZ, Belgaum Karnataka',
      'Modern Hiring Service, Andaman and Nicobar Islands', 
      'Modern Hiring Service, Tiruchi Tamil Nadu'
    ]
    clientSections = clientOrder.map((client) => {
      const entries = Object.entries(exhaustTowersClientsWebp[client] || {})
      const images = entries
        .filter(([key]) => !key.endsWith('-640.webp'))
        .map(([, url]) => url)
      return { client, images }
    }).filter((s) => s.images.length > 0)
  }

  const commonRootImages = isRailProject
    ? Object.entries(railwayCommonWebp)
        .filter(([key]) => key.endsWith('.webp') && !key.endsWith('-640.webp'))
        .map(([, url]) => url)
    : isExhaustProject
    ? Object.entries(exhaustTowersCommonWebp)
        .filter(([key]) => key.endsWith('.webp') && !key.endsWith('-640.webp'))
        .map(([, url]) => url)
    : []

  const gallery = isRailProject
    ? (locationSections?.length > 0 ? locationSections[0].images : (commonRootImages.length ? commonRootImages : fallbackGallery))
    : isExhaustProject
    ? (clientSections?.length > 0 ? clientSections[0].images : (commonRootImages.length ? commonRootImages : fallbackGallery))
    : (folderGalleryWebp.length ? folderGalleryWebp : (folderGallery.length ? folderGallery : fallbackGallery))

  const bgImage = (gallery[0] || fallbackGallery[0])

  const openGallery = (images, title, index = 0) => {
    setCurrentGallery(images)
    setGalleryTitle(title)
    setViewerIndex(index)
  }

  const nextImage = () => {
    setViewerIndex((prev) => (prev + 1) % currentGallery.length)
  }

  const prevImage = () => {
    setViewerIndex((prev) => (prev - 1 + currentGallery.length) % currentGallery.length)
  }

  // Mock project details
  const projectDetails = {
    client: project.client || "Confidential Client",
    duration: project.duration || "6 months",
    location: project.location || "Karnataka, India",
    status: "Completed",
    team: "15+ Engineers"
  }

  // Mock testimonials
  const testimonials = [
    {
      name: "Project Manager",
      company: projectDetails.client,
      rating: 5,
      text: "Outstanding work quality and professional execution. The team delivered beyond our expectations."
    }
  ]

  return (
    <div className="space-y-12">
      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Link 
          to="/projects" 
          className="inline-flex items-center gap-2 text-brand-600 hover:text-brand-700 transition-colors group"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          Back to Projects
        </Link>
      </motion.div>

      {/* Hero Section */}
      <motion.section
        className="grid lg:grid-cols-2 gap-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Main Image */}
        <div className="space-y-4">
          <motion.div
            className="relative aspect-video rounded-2xl overflow-hidden cursor-pointer group"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            onClick={() => openGallery(gallery, project.title, 0)}
          >
            <img
              src={bgImage}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
              <FaExpand className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-2xl" />
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-white text-lg font-semibold drop-shadow mb-1">{project.title}</h3>
              <p className="text-white/90 text-sm">{projectDetails.status}</p>
            </div>
          </motion.div>
          
          {/* Thumbnail Gallery */}
          {gallery.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {gallery.slice(0, 6).map((img, index) => (
                <motion.button
                  key={index}
                  className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 border-gray-200 hover:border-brand-600 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => openGallery(gallery, project.title, index)}
                >
                  <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                </motion.button>
              ))}
              {gallery.length > 6 && (
                <button
                  className="flex-shrink-0 w-20 h-20 rounded-lg bg-gray-100 border-2 border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
                  onClick={() => openGallery(gallery, project.title, 6)}
                >
                  +{gallery.length - 6}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Project Info */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {project.title}
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              {project.description}
            </p>
          </motion.div>

          {/* Project Details */}
          <motion.div
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <FaUser className="text-brand-600" />
              <div>
                <p className="text-sm text-gray-600">Client</p>
                <p className="font-semibold text-gray-900">{projectDetails.client}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <FaClock className="text-brand-600" />
              <div>
                <p className="text-sm text-gray-600">Duration</p>
                <p className="font-semibold text-gray-900">{projectDetails.duration}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <FaLocationDot className="text-brand-600" />
              <div>
                <p className="text-sm text-gray-600">Location</p>
                <p className="font-semibold text-gray-900">{projectDetails.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <FaCircleCheck className="text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <p className="font-semibold text-green-600">{projectDetails.status}</p>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <Button className="bg-brand-600 hover:bg-brand-700 text-white flex items-center gap-2">
              <FaPhone />
              Contact Us
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <FaDownload />
              Download Report
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <FaShare />
              Share Project
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Tabs Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: FaEye },
              { id: 'timeline', label: 'Timeline', icon: FaCalendar },
              { id: 'gallery', label: 'Gallery', icon: FaExpand },
              { id: 'testimonials', label: 'Testimonials', icon: FaThumbsUp }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === id
                    ? 'border-brand-600 text-brand-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon />
                {label}
              </button>
            ))}
          </nav>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <SpotlightCard className="p-8 rounded-2xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Project Overview</h3>
                <p className="text-gray-700 mb-6">{project.description}</p>
                
                {project.highlights && project.highlights.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 mb-3">Key Highlights</h4>
                    <div className="grid md:grid-cols-2 gap-3">
                      {project.highlights.map((highlight, index) => (
                        <motion.div
                          key={highlight}
                          className="flex items-start gap-3"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.3 }}
                        >
                          <FaCircleCheck className="text-brand-600 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">{highlight}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </SpotlightCard>
            </motion.div>
          )}

          {activeTab === 'timeline' && (
            <motion.div
              key="timeline"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <SpotlightCard className="p-8 rounded-2xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-8">Project Timeline</h3>
                <ProjectTimeline project={project} />
              </SpotlightCard>
            </motion.div>
          )}

          {activeTab === 'gallery' && (
            <motion.div
              key="gallery"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Main Gallery */}
              {gallery.length > 0 && (
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">Project Photos</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {gallery.map((src, idx) => (
                      <motion.button
                        key={`main-${idx}`}
                        className="group relative aspect-square rounded-lg overflow-hidden"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => openGallery(gallery, project.title, idx)}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1, duration: 0.3 }}
                      >
                        <img 
                          src={src} 
                          alt={`${project.title} photo ${idx + 1}`} 
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                          <FaExpand className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Location-based galleries for railway projects */}
              {isRailProject && locationSections && locationSections.map((section) => (
                <div key={section.loc}>
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">{section.loc}</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {section.images.map((src, idx) => (
                      <motion.button
                        key={`${section.loc}-${idx}`}
                        className="group relative aspect-square rounded-lg overflow-hidden"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => openGallery(section.images, `${project.title} - ${section.loc}`, idx)}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1, duration: 0.3 }}
                      >
                        <img 
                          src={src} 
                          alt={`${section.loc} photo ${idx + 1}`} 
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                          <FaExpand className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              ))}

              {/* Client-based galleries for exhaust tower projects */}
              {isExhaustProject && clientSections && clientSections.map((section) => (
                <div key={section.client}>
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">{section.client}</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {section.images.map((src, idx) => (
                      <motion.button
                        key={`${section.client}-${idx}`}
                        className="group relative aspect-square rounded-lg overflow-hidden"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => openGallery(section.images, `${project.title} - ${section.client}`, idx)}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1, duration: 0.3 }}
                      >
                        <img 
                          src={src} 
                          alt={`${section.client} photo ${idx + 1}`} 
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                          <FaExpand className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'testimonials' && (
            <motion.div
              key="testimonials"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 gap-6"
            >
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.3 }}
                >
                  <SpotlightCard className="p-6 rounded-2xl h-full">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <FaStar key={i} className="text-yellow-400" />
                      ))}
                    </div>
                    <FaQuoteLeft className="text-brand-600 text-2xl mb-4" />
                    <p className="text-gray-700 mb-4">{testimonial.text}</p>
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-gray-600 text-sm">{testimonial.company}</p>
                    </div>
                  </SpotlightCard>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        className="bg-gradient-to-r from-brand-600 to-brand-700 text-white py-12 px-8 rounded-2xl text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <FaRocket className="text-4xl mb-4 mx-auto" />
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Start Your Next Project</h2>
        <p className="text-white/90 mb-6 max-w-2xl mx-auto">
          Ready to bring your vision to life? Contact our expert team for a consultation and detailed project proposal.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button className="bg-white text-brand-600 hover:bg-gray-100 flex items-center gap-2">
            <FaPhone />
            Get Quote
          </Button>
          <Button variant="outline" className="border-white text-white hover:bg-white hover:text-brand-600 flex items-center gap-2">
            <FaEnvelope />
            Send Message
          </Button>
        </div>
      </motion.section>

      {/* Image Gallery Modal */}
      <AnimatePresence>
        {viewerIndex !== null && currentGallery.length > 0 && (
          <ImageGalleryModal
            images={currentGallery}
            currentIndex={viewerIndex}
            onClose={() => setViewerIndex(null)}
            onNext={nextImage}
            onPrev={prevImage}
            title={galleryTitle}
          />
        )}
      </AnimatePresence>
    </div>
  )
}