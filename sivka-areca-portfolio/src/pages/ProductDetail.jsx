import { useParams, Link } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import { products } from '../data/products'
import ScrollReveal from '../components/ScrollReveal'
import SpotlightCard from '../components/SpotlightCard'
import { Button } from '../components/Button'
import steelImg from '../assets/imagedata/core-expertise-image/steelstructure-fabrication-img.jpg'
import pebImg from '../assets/imagedata/core-expertise-image/peb-img.jpg'
import containerImg from '../assets/imagedata/core-expertise-image/container-img.jpg'
import towerImg from '../assets/imagedata/core-expertise-image/tower-img.jpg'
import sheetmetalImg from '../assets/imagedata/core-expertise-image/sheetmetal-img.jpg'
import { motion, useAnimation, useInView, AnimatePresence } from 'framer-motion'
import { 
  FaArrowLeft,
  FaCheck,
  FaStar,
  FaQuoteLeft,
  FaExpand,
  FaXmark,
  FaChevronLeft,
  FaChevronRight,
  FaGear,
  FaShield,
  FaClock,
  FaAward,
  FaWrench,
  FaIndustry,
  FaRocket,
  FaPhone,
  FaEnvelope,
  FaDownload,
  FaShare,
  FaHeart,
  FaEye,
  FaThumbsUp
} from 'react-icons/fa6'

const productImages = {
  'structural-steel-fabrication': [steelImg, steelImg, steelImg],
  'pre-engineered-buildings': [pebImg, pebImg, pebImg],
  'modular-enclosures-containers': [containerImg, containerImg, containerImg],
  'exhaust-support-towers': [towerImg, towerImg, towerImg],
  'sheet-metal-fabrication': [sheetmetalImg, sheetmetalImg, sheetmetalImg],
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

// Image Gallery Modal Component
function ImageGalleryModal({ images, currentIndex, onClose, onNext, onPrev }) {
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
          alt={`Gallery image ${currentIndex + 1}`}
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

export default function ProductDetail() {
  const { slug } = useParams()
  const product = products.find((p) => p.slug === slug)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h1>
          <Link 
            to="/products" 
            className="inline-flex items-center gap-2 text-brand-600 hover:text-brand-700 transition-colors"
          >
            <FaArrowLeft />
            Back to Products
          </Link>
        </div>
      </div>
    )
  }

  const images = productImages[product.slug] || [steelImg]

  const openGallery = (index) => {
    setSelectedImageIndex(index)
    setIsGalleryOpen(true)
  }

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  // Mock specifications data
  const specifications = {
    'structural-steel-fabrication': [
      { label: 'Material Grade', value: 'IS 2062, ASTM A36' },
      { label: 'Welding Standards', value: 'AWS D1.1, IS 816' },
      { label: 'Coating', value: 'Hot-dip galvanizing, Paint' },
      { label: 'Load Capacity', value: 'Up to 500 tons' },
      { label: 'Span Range', value: '10m - 100m' },
      { label: 'Height Range', value: '5m - 50m' }
    ],
    'pre-engineered-buildings': [
      { label: 'Building Width', value: '10m - 100m' },
      { label: 'Building Length', value: 'Unlimited' },
      { label: 'Eave Height', value: '3m - 20m' },
      { label: 'Wind Speed', value: 'Up to 250 kmph' },
      { label: 'Snow Load', value: 'As per local codes' },
      { label: 'Insulation', value: 'Thermal & Acoustic' }
    ],
    'modular-enclosures-containers': [
      { label: 'Standard Size', value: '20ft, 40ft containers' },
      { label: 'Custom Sizes', value: 'Available' },
      { label: 'Insulation', value: 'PUF, Rockwool' },
      { label: 'Electrical', value: 'Complete wiring' },
      { label: 'Plumbing', value: 'Optional' },
      { label: 'Certification', value: 'ISO, CE compliant' }
    ],
    'exhaust-support-towers': [
      { label: 'Height Range', value: '10m - 200m' },
      { label: 'Wind Load', value: 'As per IS 875' },
      { label: 'Foundation', value: 'RCC, Steel grillage' },
      { label: 'Maintenance', value: 'Ladder, platforms' },
      { label: 'Lightning', value: 'Protection system' },
      { label: 'Coating', value: 'Hot-dip galvanizing' }
    ],
    'sheet-metal-fabrication': [
      { label: 'Material', value: 'MS, SS, Aluminum' },
      { label: 'Thickness', value: '0.5mm - 25mm' },
      { label: 'Cutting', value: 'Laser, Plasma, Shearing' },
      { label: 'Forming', value: 'Press brake, Rolling' },
      { label: 'Welding', value: 'TIG, MIG, Arc' },
      { label: 'Finishing', value: 'Powder coating, Painting' }
    ]
  }

  const currentSpecs = specifications[product.slug] || []

  // Mock testimonials
  const testimonials = [
    {
      name: "Rajesh Kumar",
      company: "Industrial Solutions Ltd",
      rating: 5,
      text: "Exceptional quality and timely delivery. Their steel fabrication work exceeded our expectations."
    },
    {
      name: "Priya Sharma",
      company: "Construction Corp",
      rating: 5,
      text: "Professional team with great attention to detail. Highly recommend their services."
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
          to="/products" 
          className="inline-flex items-center gap-2 text-brand-600 hover:text-brand-700 transition-colors group"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          Back to Products
        </Link>
      </motion.div>

      {/* Hero Section */}
      <motion.section
        className="grid lg:grid-cols-2 gap-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Image Gallery */}
        <div className="space-y-4">
          <motion.div
            className="relative aspect-video rounded-2xl overflow-hidden cursor-pointer group"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            onClick={() => openGallery(selectedImageIndex)}
          >
            <img
              src={images[selectedImageIndex]}
              alt={product.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
              <FaExpand className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-2xl" />
            </div>
          </motion.div>
          
          {/* Thumbnail Gallery */}
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {images.map((img, index) => (
                <motion.button
                  key={index}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImageIndex === index ? 'border-brand-600' : 'border-gray-200'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                </motion.button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {product.title}
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              {product.description}
            </p>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="text-center p-4 bg-brand-50 rounded-xl">
              <div className="text-2xl font-bold text-brand-600 mb-1">
                <AnimatedCounter end={100} suffix="+" />
              </div>
              <p className="text-gray-600 text-sm">Projects Completed</p>
            </div>
            <div className="text-center p-4 bg-brand-50 rounded-xl">
              <div className="text-2xl font-bold text-brand-600 mb-1">
                <AnimatedCounter end={15} suffix="+" />
              </div>
              <p className="text-gray-600 text-sm">Years Experience</p>
            </div>
            <div className="text-center p-4 bg-brand-50 rounded-xl">
              <div className="text-2xl font-bold text-brand-600 mb-1">
                <AnimatedCounter end={24} suffix="h" />
              </div>
              <p className="text-gray-600 text-sm">Support Available</p>
            </div>
            <div className="text-center p-4 bg-brand-50 rounded-xl">
              <div className="text-2xl font-bold text-brand-600 mb-1">
                <AnimatedCounter end={99} suffix="%" />
              </div>
              <p className="text-gray-600 text-sm">Client Satisfaction</p>
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
              Get Quote
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <FaDownload />
              Download Brochure
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <FaShare />
              Share
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
              { id: 'specifications', label: 'Specifications', icon: FaGear },
              { id: 'features', label: 'Features', icon: FaAward },
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
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Product Overview</h3>
                <p className="text-gray-700 mb-6">{product.description}</p>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-brand-100 rounded-lg">
                      <FaShield className="text-brand-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Quality Assured</h4>
                      <p className="text-gray-600 text-sm">ISO certified processes</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-brand-100 rounded-lg">
                      <FaClock className="text-brand-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Timely Delivery</h4>
                      <p className="text-gray-600 text-sm">On-schedule completion</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-brand-100 rounded-lg">
                      <FaWrench className="text-brand-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Expert Craftsmanship</h4>
                      <p className="text-gray-600 text-sm">Skilled professionals</p>
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          )}

          {activeTab === 'specifications' && (
            <motion.div
              key="specifications"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <SpotlightCard className="p-8 rounded-2xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Technical Specifications</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {currentSpecs.map((spec, index) => (
                    <motion.div
                      key={spec.label}
                      className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                    >
                      <span className="font-medium text-gray-900">{spec.label}</span>
                      <span className="text-brand-600 font-semibold">{spec.value}</span>
                    </motion.div>
                  ))}
                </div>
              </SpotlightCard>
            </motion.div>
          )}

          {activeTab === 'features' && (
            <motion.div
              key="features"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <SpotlightCard className="p-8 rounded-2xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Features</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {product.features.map((feature, index) => (
                    <motion.div
                      key={feature}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                    >
                      <FaCheck className="text-brand-600 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </SpotlightCard>
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
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
        <p className="text-white/90 mb-6 max-w-2xl mx-auto">
          Get in touch with our experts to discuss your requirements and receive a customized quote.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button className="bg-white text-brand-600 hover:bg-gray-100 flex items-center gap-2">
            <FaPhone />
            Call Now
          </Button>
          <Button variant="outline" className="border-white text-white hover:bg-white hover:text-brand-600 flex items-center gap-2">
            <FaEnvelope />
            Send Inquiry
          </Button>
        </div>
      </motion.section>

      {/* Image Gallery Modal */}
      <AnimatePresence>
        {isGalleryOpen && (
          <ImageGalleryModal
            images={images}
            currentIndex={selectedImageIndex}
            onClose={() => setIsGalleryOpen(false)}
            onNext={nextImage}
            onPrev={prevImage}
          />
        )}
      </AnimatePresence>
    </div>
  )
}