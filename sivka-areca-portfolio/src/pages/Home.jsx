import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'
import { Button, ButtonLink } from '../components/Button'
import ScrollReveal from '../components/ScrollReveal'
import SpotlightCard from '../components/SpotlightCard'
import homeUnsplashImg from '../assets/imagedata/home-unsplash.png'
import homeUnsplash2Img from '../assets/imagedata/home-unsplash2.jpg'

// Import Home-imgs slideshow images
import fob2Img from '../assets/imagedata/Home-imgs/FOB 2-640.webp'
import fobImg from '../assets/imagedata/Home-imgs/FOB-640.webp'
import img1 from '../assets/imagedata/Home-imgs/IMG-20231201-WA0003-640.webp'
import img2 from '../assets/imagedata/Home-imgs/IMG-20231201-WA0005-640.webp'
import img3 from '../assets/imagedata/Home-imgs/IMG-20220922-WA0044.webp'
import img4 from '../assets/imagedata/Home-imgs/IMG-20220922-WA0047.webp'
import img5 from '../assets/imagedata/Home-imgs/IMG-20220922-WA0058.webp'
import img6 from '../assets/imagedata/Home-imgs/IMG_20231226_113854648.webp'
import img7 from '../assets/imagedata/Home-imgs/IMG_20240117_112922663.webp'
import img8 from '../assets/imagedata/Home-imgs/IMG_20240210_175533773.webp'
import img9 from '../assets/imagedata/Home-imgs/IMG_20250724_101435093_HDR.webp'
import img10 from '../assets/imagedata/Home-imgs/IMG_20250724_102452756_HDR.webp'
import overheadShedImg from '../assets/imagedata/Home-imgs/OVERHEAD SHED.webp'
import ppf2Img from '../assets/imagedata/Home-imgs/PPF 2-640.webp'
import ppfImg from '../assets/imagedata/Home-imgs/PPF-640.webp'
import containerImg from '../assets/imagedata/Home-imgs/contairner-img-640.webp'
import pathwayImg from '../assets/imagedata/Home-imgs/pathway-640.webp'
import pebImg from '../assets/imagedata/Home-imgs/peb-image-640.webp'
import railwayImg from '../assets/imagedata/Home-imgs/railway-staircase-img-640.webp'
import staircaseImg from '../assets/imagedata/Home-imgs/staircase-640.webp'
import towerImg from '../assets/imagedata/Home-imgs/tower-img-640.webp'

import { services } from '../data/services'
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
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa6'

// Slideshow images array
const slideshowImages = [
  homeUnsplash2Img, // Keep the original as first image
  fob2Img,
  fobImg,
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  overheadShedImg,
  ppf2Img,
  ppfImg,
  containerImg,
  pathwayImg,
  pebImg,
  railwayImg,
  staircaseImg,
  towerImg
]

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2, suffix = "" }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (inView) {
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
  }, [inView, end, duration])

  return <span ref={ref}>{count}{suffix}</span>
}

// Floating Icon Component
const FloatingIcon = ({ icon: Icon, delay = 0, x = 0, y = 0 }) => (
  <motion.div
    className="absolute text-white/20"
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      x: [x, x + 20, x],
      y: [y, y - 30, y]
    }}
    transition={{
      duration: 4,
      delay,
      repeat: Infinity,
      repeatDelay: 2
    }}
  >
    <Icon size={24} />
  </motion.div>
)

export default function Home() {
  // Slideshow state
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  
  // Existing state
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  const scrollToKeyServices = () => {
    const element = document.getElementById('key-services');
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Statistics data
  const stats = [
    { icon: FaIndustry, value: 25, suffix: "+", label: "Projects Completed" },
    { icon: FaUsers, value: 25, suffix: "+", label: "Happy Clients" },
    { icon: FaAward, value: 15, suffix: "+", label: "Years Experience" },
    { icon: FaChartLine, value: 99, suffix: "%", label: "Success Rate" }
  ]

  // Testimonials data
  const testimonials = [
    {
      quote: "Exceptional quality and timely delivery. Their steel fabrication work exceeded our expectations.",
      author: "Rajesh Kumar",
      company: "Industrial Solutions Ltd",
      rating: 5
    },
    {
      quote: "Professional team with great attention to detail. Highly recommend for any steel structure project.",
      author: "Priya Sharma",
      company: "Construction Corp",
      rating: 5
    },
    {
      quote: "Outstanding service from design to installation. They truly understand client requirements.",
      author: "Amit Patel",
      company: "Engineering Works",
      rating: 5
    }
  ]

  // Auto-advance slideshow
  useEffect(() => {
    if (!isAutoPlaying) return
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideshowImages.length)
    }, 5000) // Change slide every 5 seconds
    
    return () => clearInterval(interval)
  }, [isAutoPlaying])

  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  // Navigation functions
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slideshowImages.length)
    setIsAutoPlaying(false) // Pause auto-play when user interacts
    setTimeout(() => setIsAutoPlaying(true), 10000) // Resume after 10 seconds
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slideshowImages.length) % slideshowImages.length)
    setIsAutoPlaying(false) // Pause auto-play when user interacts
    setTimeout(() => setIsAutoPlaying(true), 10000) // Resume after 10 seconds
  }

  return (
    <>
      {/* Enhanced Banner with Floating Elements - Full Screen */}
      <motion.section 
        className="relative overflow-hidden"
        style={{ 
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          width: '100vw',
          height: '100vh',
          zIndex: 10
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="relative w-full h-full overflow-hidden">
          {/* Slideshow Background */}
          <div className="absolute inset-0">
            {slideshowImages.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  backgroundImage: `url(${image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              />
            ))}
          </div>
          
          {/* Enhanced overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/40"></div>
          
          {/* Navigation Buttons - Responsive positioning */}
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
          
          {/* Slide Indicators - Responsive positioning */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1 sm:space-x-2 z-20">
            {slideshowImages.map((_, index) => (
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
          
          {/* Floating Icons - Hidden on mobile and tablet for better performance */}
          <div className="hidden xl:block">
            <FloatingIcon icon={FaGears} delay={0} x={100} y={50} />
            <FloatingIcon icon={FaWrench} delay={1} x={200} y={80} />
            <FloatingIcon icon={FaIndustry} delay={2} x={300} y={60} />
          </div>
          
          {/* Content positioned at bottom left */}
          <div className="absolute bottom-0 left-0 z-10">
            <div className="p-6 sm:p-8 md:p-10 lg:p-12 max-w-2xl lg:max-w-3xl mb-6 sm:mb-8 md:mb-10">
              <div className="text-white text-left space-y-2 sm:space-y-3 md:space-y-4">
              {/* Main Heading with Creative Typography */}
              <motion.div
                initial={{ opacity: 0, x: -100, rotateX: 45 }}
                animate={{ opacity: 1, x: 0, rotateX: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="relative"
              >
                <h2 className="font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight">
                  <span className="block bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent drop-shadow-2xl">
                    <motion.span
                      className="inline-block"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.8, type: "spring", bounce: 0.4 }}
                    >
                      SIVKA ARECA
                    </motion.span>
                  </span>
                  <span className="block bg-gradient-to-r from-brand-300 via-brand-200 to-white bg-clip-text text-transparent drop-shadow-2xl mt-1 sm:mt-2 md:mt-3">
                    <motion.span
                      className="inline-block"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.8, type: "spring", bounce: 0.4 }}
                    >
                      ENTERPRISES
                    </motion.span>
                   
                  </span>
                </h2>
                {/* Decorative line */}
                <motion.div
                  className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-brand-400 to-transparent rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "60%" }}
                  transition={{ delay: 1, duration: 1.5, ease: "easeOut" }}
                />
              </motion.div>

              {/* Company Motto with Enhanced Styling */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="relative"
              >
                <p className="font-bold text-xs sm:text-sm md:text-base lg:text-lg tracking-widest text-white/95 drop-shadow-lg">
                  <motion.span
                    className="inline-block border-l-4 border-brand-400 pl-3 sm:pl-4 md:pl-6"
                    initial={{ borderLeftWidth: 0 }}
                    animate={{ borderLeftWidth: "4px" }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                  >
                    PRECISION • TRUSTED • EXCELLENCE
                  </motion.span>
                  
                </p>
              </motion.div>

              {/* Description with Creative Animation */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="relative max-w-3xl"
              >
                <p className="text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed text-white/90 drop-shadow-lg font-light">
                  <motion.span
                    className="inline-block"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4, duration: 0.6 }}
                  >
                    From concept to commissioning—
                  </motion.span>
                  <motion.span
                    className="inline-block font-medium text-brand-200"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.6, duration: 0.6, type: "spring" }}
                  >
                    design, fabrication, installation,
                  </motion.span>
                  <motion.span
                    className="inline-block"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.8, duration: 0.6 }}
                  >
                    and project management under one roof.
                  </motion.span>
                </p>
              </motion.div>
              <motion.div 
                className="mt-4 sm:mt-6 md:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-start items-start sm:items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <Button 
                  onClick={scrollToKeyServices} 
                  variant="secondary" 
                  className="group w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-medium"
                >
                  <FaPlay className="mr-2 group-hover:translate-x-1 transition-transform" />
                  Our Services
                </Button>
                <ButtonLink 
                  to="/contact" 
                  className="group w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-medium"
                >
                  Get a Quote
                  <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </ButtonLink>
              </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Spacer to account for absolute positioned hero section */}
      <div className="h-screen"></div>

      {/* Rest of the content in container */}
      <div className="space-y-16">
        {/* Enhanced Introduction */}
        <motion.section 
          className="grid gap-4 sm:gap-6 md:gap-8 lg:grid-cols-2 items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <ScrollReveal
              baseOpacity={0}
              enableBlur={true}
              baseRotation={5}
              blurStrength={10}
              textClassName="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold"
            >
              Welcome to Sivka Areca Enterprises
            </ScrollReveal>
            <p className="mt-2 sm:mt-3 md:mt-4 text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg">
              We are an engineering and fabrication company delivering end-to-end steel structure solutions—from design to manufacturing and installation. Our customer-centric approach, focus on quality, and commitment to innovation enable reliable, cost-efficient results.
            </p>
            <motion.div
              className="mt-3 sm:mt-4 md:mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 md:gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className="flex items-center gap-2 text-brand-600">
                <FaAward className="text-sm sm:text-base" />
                <span className="font-medium text-sm sm:text-base">ISO Certified</span>
              </div>
              <div className="flex items-center gap-2 text-brand-600">
                <FaShieldHalved className="text-sm sm:text-base" />
                <span className="font-medium text-sm sm:text-base">Quality Assured</span>
              </div>
            </motion.div>
          </motion.div>
          <motion.div 
            className="h-40 sm:h-48 md:h-56 lg:h-64 xl:h-72 rounded-lg overflow-hidden group order-1 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.02 }}
          >
            <img 
              src={homeUnsplashImg} 
              alt="Sivka Areca Enterprises - Steel Structure Solutions" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </motion.div>
        </motion.section>

      


      

      {/* Enhanced Key Services */}
      <motion.section
        id="key-services"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Key Services</h2>
          <p className="text-gray-600 text-lg">Comprehensive steel fabrication solutions tailored to your needs</p>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {services.map((s, index) => (
            <motion.div
              key={s.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <SpotlightCard className="rounded-2xl border border-gray-300 bg-white p-6 flex flex-col h-full group hover:shadow-xl transition-all duration-300" spotlightColor="rgba(0, 0, 0, 0.15)">
                <ScrollReveal as="div" mode="block" containerClassName="flex-1 flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-brand-100 rounded-lg group-hover:bg-brand-200 transition-colors">
                      <FaGears className="text-brand-600" size={20} />
                    </div>
                    <h3 className="font-semibold text-gray-900 text-lg">{s.title}</h3>
                  </div>
                  <p className="text-gray-700 flex-1 mb-6 leading-relaxed">{s.intro}</p>
                  <ButtonLink to={`/services/${s.slug}`} className="mt-auto group">
                    Learn More
                    <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </ButtonLink>
                </ScrollReveal>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Call to Action Section */}
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
            <FaRocket className="text-5xl mb-6 mx-auto" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Transforming Vision into Structure.
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Delivering excellance from concepts to completion. 
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
                Contact Us
                <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </ButtonLink>
              <ButtonLink 
                to="/projects" 
                variant="contrast-outline"
                className="group"
              >
                View Our Work
                <FaEye className="ml-2 group-hover:scale-110 transition-transform" />
              </ButtonLink>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* About section blocks */}
      <section aria-labelledby="about-blocks">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Our Vision */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SpotlightCard className="rounded-2xl border border-gray-300 bg-white p-6 h-full group hover:shadow-xl transition-shadow" spotlightColor="rgba(0, 0, 0, 0.15)">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-brand-100 rounded-lg group-hover:bg-brand-200 transition-colors">
                  <FaEye className="text-brand-600" size={20} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Our Vision</h3>
              </div>
              <p className="text-gray-700 leading-relaxed text-justify">
              Specializing in Structural Engineering, peb fabrication & steel fabrication. To
supply High-Quality Steel Structures, providing related services and solutions. focused on
continuous improvement at Highest Business Standards & Work Ethics.
              </p>
              <div className="mt-4 flex items-center gap-2 text-brand-600">
                <FaRocket />
                <span className="text-sm font-medium">Innovation driven</span>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Our Mission */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <SpotlightCard className="rounded-2xl border border-gray-300 bg-white p-6 h-full group hover:shadow-xl transition-shadow" spotlightColor="rgba(0, 0, 0, 0.15)">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-brand-100 rounded-lg group-hover:bg-brand-200 transition-colors">
                  <FaShieldHalved className="text-brand-600" size={20} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Quality Policy</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                we are at accurate manufacturing &amp; systematic technology; quality is the
integral part of our commitment to providing excellent products &amp; services that match or
exceed customer&#39;s expectations.
              </p>
              <div className="mt-4 flex items-center gap-2 text-brand-600">
                <FaShieldHalved />
                <span className="text-sm font-medium">Safety first approach</span>
              </div>
            </SpotlightCard>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {/* Customer-Centric Approach */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <SpotlightCard className="rounded-2xl border border-gray-300 bg-white p-6 h-full group hover:shadow-xl transition-shadow" spotlightColor="rgba(0, 0, 0, 0.15)">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-brand-100 rounded-lg group-hover:bg-brand-200 transition-colors">
                  <FaUsers className="text-brand-600" size={20} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Customer-Centric Approach</h3>
              </div>
              <p className="text-gray-700 leading-relaxed text-justify">
                Customer-centric approach: client's needs are at the heart of our operations. We collaborate closely with clients to understand their Vision, tailoring our solutions to their specific requirements.
              </p>
              <div className="mt-4 flex items-center gap-2 text-brand-600">
                <FaStar />
                <span className="text-sm font-medium">Trusted by 50+ clients</span>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Our Values */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <SpotlightCard className="rounded-2xl border border-gray-300 bg-white p-6 h-full group hover:shadow-xl transition-shadow" spotlightColor="rgba(0, 0, 0, 0.15)">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-brand-100 rounded-lg group-hover:bg-brand-200 transition-colors">
                  <FaHeart className="text-brand-600" size={20} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Our Values</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Integrity, quality, innovation, and customer satisfaction form the cornerstone of our business. We believe in building long-term relationships through trust and exceptional service delivery.
              </p>
              <div className="mt-4 flex items-center gap-2 text-brand-600">
                <FaHandshake />
                <span className="text-sm font-medium">Trust & reliability</span>
              </div>
            </SpotlightCard>
          </motion.div>
        </div>
      </section>

      


      </div>
    </>
  )
}