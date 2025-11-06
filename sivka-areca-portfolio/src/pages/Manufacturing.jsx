import { useState, useEffect } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'
import { useRef } from 'react'
import ScrollReveal from '../components/ScrollReveal'
import SpotlightCard from '../components/SpotlightCard'
import { 
  FaUsers, 
  FaEye, 
  FaShieldHalved, 
  FaHeart,
  FaGears,
  FaWrench,
  FaIndustry,
  FaAward,
  FaRocket,
  FaChartLine,
  FaHandshake,
  FaStar,
  FaQuoteLeft,
  FaArrowRight,
  FaPlay,
  FaLocationDot,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaCircleCheck,
  FaLightbulb,
  FaCertificate,
  FaThumbsUp,
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa6'

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2, suffix = "" }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      let startTime = null
      const animate = (currentTime) => {
        if (startTime === null) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)
        setCount(Math.floor(progress * end))
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      requestAnimationFrame(animate)
    }
  }, [isInView, end, duration])

  return (
    <span ref={ref} className="font-bold text-3xl md:text-4xl text-brand-600">
      {count}{suffix}
    </span>
  )
}

// Interactive Process Step Component
const ProcessStep = ({ step, index, isActive, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onClick(index)}
      className={`cursor-pointer transition-all duration-300 rounded-2xl ${
        isActive ? 'ring-2 ring-offset-2 ring-offset-white ring-brand-500 shadow-lg' : ''
      }`}
    >
      <SpotlightCard
        className={`rounded-2xl border p-6 text-center shadow-md transition-all duration-300 ${
          isActive 
            ? 'border-transparent bg-brand-600 shadow-brand-600/30 text-white' 
            : 'border-gray-300 bg-white hover:bg-gray-50'
        }`}
        spotlightColor={isActive ? "rgba(232, 66, 32, 0.15)" : "rgba(0, 0, 0, 0.15)"}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className={`font-semibold ${
            isActive ? 'text-white' : 'text-gray-900'
          }`}>
            {step.title}
          </div>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-3 text-sm text-white/90"
            >
              {step.description}
            </motion.div>
          )}
        </motion.div>
      </SpotlightCard>
    </motion.div>
  )
}

export default function Manufacturing() {
  const [activeStep, setActiveStep] = useState(0)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  
  const steps = [
    {
      title: 'Conceptual Design',
      description: 'Initial consultation and design conceptualization based on client requirements and site conditions.'
    },
    {
      title: 'Drawing Proposal',
      description: 'Detailed technical drawings and 3D models with specifications and material requirements.'
    },
    {
      title: 'Quotation & Agreement',
      description: 'Comprehensive cost analysis, timeline planning, and formal work agreement execution.'
    },
    {
      title: 'Manufacture',
      description: 'Precision fabrication using advanced machinery and quality-controlled manufacturing processes.'
    },
    {
      title: 'Shipping & Erection',
      description: 'Safe transportation and professional on-site installation with final quality assurance.'
    },
  ]

  const capabilities = [
    { icon: FaIndustry, title: "6,000 sq. ft.", subtitle: "Fabrication Shop Area", color: "text-blue-600" },
    { icon: FaGears, title: "20,000 sq. ft.", subtitle: "Auxiliary Facility Area", color: "text-green-600" },
    { icon: FaUsers, title: "35+", subtitle: "Skilled Workforce", color: "text-purple-600" },
    { icon: FaCertificate, title: "100%", subtitle: "Quality Certified", color: "text-orange-600" },
  ]

  const strengths = [
    { icon: FaLightbulb, title: "In-house Design Validation", description: "Complete GA support and design optimization" },
    { icon: FaWrench, title: "Skilled Assembly Teams", description: "Expert welding and precision assembly capabilities" },
    { icon: FaShieldHalved, title: "ISO-Compliant Process", description: "Standardized fabrication following international norms" },
    { icon: FaRocket, title: "Timeline Adaptability", description: "Flexible scheduling to meet client deadlines" },
    { icon: FaCircleCheck, title: "Quality Traceability", description: "Transparent documentation and material tracking" },
    { icon: FaHandshake, title: "Government Certified", description: "Proven track record with official approvals" },
  ]

  const testimonials = [
    {
      quote: "Exceptional quality and timely delivery. Their attention to detail in our railway project was outstanding.",
      author: "Railway Project Engineer",
      project: "Railway Infrastructure Project"
    },
    {
      quote: "Professional team with excellent fabrication capabilities. Highly recommend for industrial projects.",
      author: "Industrial Client",
      project: "Manufacturing Facility"
    }
  ]

  // Auto-advance process steps
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [steps.length])

  // Auto-load hero slideshow images for Manufacturing page
const manufGlob = import.meta.glob('../assets/imagedata/manufac-homepage-img/*.{webp,jpg,jpeg,png}', { eager: true, as: 'url' })
  const manufSlides = Object
    .entries(manufGlob)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, url]) => url)

  // Auto-advance slideshow
  useEffect(() => {
    if (!isAutoPlaying || manufSlides.length === 0) return
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % manufSlides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, manufSlides.length])

  return (
    <div className="space-y-16">
      {/* Fullscreen Hero Section with Slideshow */}
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
            {manufSlides.map((image, index) => (
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
              onClick={() => { setCurrentSlide((prev) => (prev - 1 + manufSlides.length) % manufSlides.length); setIsAutoPlaying(false); setTimeout(() => setIsAutoPlaying(true), 10000) }}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 sm:p-3 md:p-4 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
              aria-label="Previous image"
            >
              <FaChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
            </button>
            <button
              onClick={() => { setCurrentSlide((prev) => (prev + 1) % manufSlides.length); setIsAutoPlaying(false); setTimeout(() => setIsAutoPlaying(true), 10000) }}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 sm:p-3 md:p-4 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
              aria-label="Next image"
            >
              <FaChevronRight className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
            </button>
          </div>

          {/* Slide Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1 sm:space-x-2 z-20">
            {manufSlides.map((_, index) => (
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
                        World-Class Manufacturing Excellence
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
                  State-of-the-art production facilities equipped for complex fabrication requirements and high-volume manufacturing
                </motion.p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Spacer for absolute hero */}
      <div className="h-[calc(65vh-6rem)] sm:h-[calc(72vh-7rem)] md:h-[calc(80vh-8rem)]"></div>

      {/* Animated Statistics */}
      <section>
        <ScrollReveal baseOpacity={0} enableBlur={true} baseRotation={5} blurStrength={10} textClassName="text-gray-900 text-center text-3xl font-bold mb-12">
          Our Manufacturing Capabilities
        </ScrollReveal>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {capabilities.map((capability, index) => (
            <motion.div
              key={capability.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <capability.icon className={`mx-auto text-4xl mb-4 ${capability.color}`} />
              <AnimatedCounter end={parseInt(capability.title.replace(/[^0-9]/g, ''))} suffix={capability.title.replace(/[0-9]/g, '')} />
              <p className="text-gray-600 mt-2 font-medium">{capability.subtitle}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Interactive Process Timeline */}
      <section>
        <ScrollReveal baseOpacity={0} enableBlur={true} baseRotation={5} blurStrength={10} textClassName="text-gray-900 text-center text-3xl font-bold mb-4">
          Interactive Process Flow
        </ScrollReveal>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Click on any step to explore our comprehensive manufacturing process. Each phase is carefully planned and executed with precision.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {steps.map((step, index) => (
            <ProcessStep
              key={step.title}
              step={step}
              index={index}
              isActive={activeStep === index}
              onClick={setActiveStep}
            />
          ))}
        </div>

        {/* Process Flow Connector */}
        <div className="hidden lg:flex justify-center mt-8">
          <div className="flex items-center space-x-4">
            {steps.map((_, index) => (
              <div key={index} className="flex items-center">
                <motion.div
                  animate={{ 
                    scale: activeStep === index ? 1.2 : 1,
                    backgroundColor: activeStep === index ? '#E84220' : '#E5E7EB'
                  }}
                  className="w-3 h-3 rounded-full"
                />
                {index < steps.length - 1 && (
                  <div className="relative mx-2">
                    <motion.div
                    animate={{ 
                      scaleX: activeStep > index ? 1 : 0.3,
                      backgroundColor: activeStep > index ? '#E84220' : '#E5E7EB'
                    }}
                      className="w-12 h-1 origin-left"
                    />
                    <motion.div
                      className="connector-arrow"
                      style={{ '--arrow-color': activeStep > index ? '#E84220' : '#E5E7EB' }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: activeStep > index ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strengths with Hover Effects */}
      <section>
        <ScrollReveal baseOpacity={0} enableBlur={true} baseRotation={5} blurStrength={10} textClassName="text-gray-900 text-center text-3xl font-bold mb-12">
          Why Choose Our Manufacturing
        </ScrollReveal>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {strengths.map((strength, index) => (
            <motion.div
              key={strength.title}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              className="group p-6 bg-white rounded-2xl border border-gray-200 hover:border-brand-300 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center group-hover:bg-brand-200 transition-colors">
                    <strength.icon className="text-brand-600 text-xl" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-brand-700 transition-colors">
                    {strength.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {strength.description}
                  </p>
                </div>
              </div>
              
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                className="h-1 bg-gradient-to-r from-brand-500 to-brand-600 rounded-full mt-4"
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Client Testimonials removed */}

      {/* Call to Action */}
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="text-center bg-gradient-to-r from-brand-600 to-brand-700 text-white p-12 rounded-3xl"
      >
        <FaRocket className="mx-auto text-5xl mb-6" />
        <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Experience world-class manufacturing with our state-of-the-art facilities and expert team.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center px-8 py-4 bg-white text-brand-600 font-semibold rounded-xl hover:bg-gray-50 transition-colors shadow-lg"
          onClick={() => { window.location.href = '/contact' }}
        >
          Get Started Today
          <FaArrowRight className="ml-2" />
        </motion.button>
      </motion.section>
    </div>
  )
}