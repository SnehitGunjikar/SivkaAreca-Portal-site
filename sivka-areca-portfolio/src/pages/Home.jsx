import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'
import { Button, ButtonLink } from '../components/Button'
import ScrollReveal from '../components/ScrollReveal'
import SpotlightCard from '../components/SpotlightCard'
import homeUnsplashImg from '../assets/imagedata/home-unsplash.png'
import homeUnsplash2Img from '../assets/imagedata/home-unsplash2.jpg'
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
  FaPlay
} from 'react-icons/fa6'

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
    { icon: FaIndustry, value: 500, suffix: "+", label: "Projects Completed" },
    { icon: FaUsers, value: 50, suffix: "+", label: "Happy Clients" },
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

  return (
    <div className="space-y-16">
      {/* Enhanced Banner with Floating Elements */}
      <motion.section 
        className="relative overflow-hidden rounded-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="relative min-h-[50vh] sm:min-h-[60vh] md:min-h-[70vh] lg:min-h-[80vh] xl:min-h-[85vh]">
          <div 
            className="absolute inset-0 bg-black/20 transition-all duration-300 hover:blur-sm"
            style={{
              backgroundImage: `url(${homeUnsplash2Img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          ></div>
          {/* Enhanced overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/40"></div>
          
          {/* Floating Icons - Hidden on mobile for better performance */}
          <div className="hidden lg:block">
            <FloatingIcon icon={FaGears} delay={0} x={100} y={50} />
            <FloatingIcon icon={FaWrench} delay={1} x={200} y={80} />
            <FloatingIcon icon={FaIndustry} delay={2} x={300} y={60} />
          </div>
          
          <div className="absolute inset-0 flex items-center justify-center z-10 p-3 sm:p-4 md:p-6 lg:p-8 xl:p-12">
            <div className="container">
              <div className="text-white text-center md:text-left max-w-6xl mx-auto md:mx-0">
              <ScrollReveal
                baseOpacity={0}
                enableBlur={true}
                baseRotation={5}
                blurStrength={10}
                textClassName="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold drop-shadow-2xl shadow-black text-gray-100 leading-tight"
              >
                Innovating Steel Structures with Precision & Excellence
              </ScrollReveal>
              {/* Company Motto */}
              <ScrollReveal
                as="p"
                mode="text"
                textTag="span"
                useDefaultTextStyles={false}
                containerClassName="mt-2 sm:mt-3 md:mt-4"
                textClassName="tracking-wide text-white/90 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl drop-shadow-lg"
              >
                PRECISION FABRICATION | TRUSTED EXECUTION | ENGINEERING EXCELLENCE
              </ScrollReveal>
              <ScrollReveal 
                as="p" 
                mode="text" 
                textTag="span" 
                useDefaultTextStyles={false} 
                containerClassName="mt-3 sm:mt-4 md:mt-6 max-w-4xl mx-auto md:mx-0 drop-shadow-lg" 
                textClassName="text-white/95 drop-shadow-lg text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed"
              >
                From concept to commissioning—design, fabrication, installation, and project management under one roof.
              </ScrollReveal>
              <motion.div 
                className="mt-4 sm:mt-6 md:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <Button 
                  onClick={scrollToKeyServices} 
                  variant="secondary" 
                  className="group w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-medium"
                >
                  <FaPlay className="mr-2 group-hover:translate-x-1 transition-transform" />
                  Our Services
                </Button>
                <ButtonLink 
                  to="/contact" 
                  className="group w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-medium"
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

      {/* Animated Statistics Section */}
      <motion.section
        className="relative overflow-hidden bg-gradient-to-br from-brand-50 to-brand-100 py-8 sm:py-12 md:py-16 px-4 sm:px-6 rounded-3xl"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23059669%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-8 sm:mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-800 mb-3 sm:mb-4">
              Our Achievements
            </h2>
            <p className="text-brand-600 text-base sm:text-lg px-4">
              Numbers that speak for our excellence and commitment
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-brand-600 text-white rounded-full mb-2 sm:mb-3 md:mb-4 group-hover:bg-brand-700 transition-colors">
                  <stat.icon className="text-sm sm:text-base md:text-lg lg:text-xl" />
                </div>
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-800 mb-1 sm:mb-2">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-brand-600 font-medium text-xs sm:text-sm md:text-base px-1 leading-tight">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

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

      {/* About section blocks */}
      <section aria-labelledby="about-blocks">
        <div className="grid md:grid-cols-2 gap-6">
          {/* About us */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SpotlightCard className="rounded-2xl border border-gray-300 bg-white p-6 h-full group hover:shadow-xl transition-shadow" spotlightColor="rgba(0, 0, 0, 0.15)">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-brand-100 rounded-lg group-hover:bg-brand-200 transition-colors">
                  <FaUsers className="text-brand-600" size={20} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">About Us</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Sivka Areca Enterprises is a trusted name in steel fabrication and engineering solutions. With over 15 years of experience, we have successfully delivered complex projects across various industries, maintaining the highest standards of quality and precision.
              </p>
              <div className="mt-4 flex items-center gap-2 text-brand-600">
                <FaStar />
                <span className="text-sm font-medium">Trusted by 50+ clients</span>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Our Vision */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <SpotlightCard className="rounded-2xl border border-gray-300 bg-white p-6 h-full group hover:shadow-xl transition-shadow" spotlightColor="rgba(0, 0, 0, 0.15)">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-brand-100 rounded-lg group-hover:bg-brand-200 transition-colors">
                  <FaEye className="text-brand-600" size={20} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Our Vision</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                To be the leading provider of innovative steel structure solutions, setting industry benchmarks through cutting-edge technology, sustainable practices, and unwavering commitment to excellence.
              </p>
              <div className="mt-4 flex items-center gap-2 text-brand-600">
                <FaRocket />
                <span className="text-sm font-medium">Innovation driven</span>
              </div>
            </SpotlightCard>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {/* Our Mission */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <SpotlightCard className="rounded-2xl border border-gray-300 bg-white p-6 h-full group hover:shadow-xl transition-shadow" spotlightColor="rgba(0, 0, 0, 0.15)">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-brand-100 rounded-lg group-hover:bg-brand-200 transition-colors">
                  <FaShieldHalved className="text-brand-600" size={20} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Our Mission</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                To deliver superior steel fabrication and engineering services that exceed client expectations while maintaining the highest safety standards and environmental responsibility.
              </p>
              <div className="mt-4 flex items-center gap-2 text-brand-600">
                <FaShieldHalved />
                <span className="text-sm font-medium">Safety first approach</span>
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

      {/* Client Testimonials Section */}
      <motion.section
        className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-6 rounded-3xl"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-gray-600 mb-12">
              Trusted by industry leaders across various sectors
            </p>
          </motion.div>

          <div className="relative">
            <motion.div
              key={activeTestimonial}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-8 rounded-2xl shadow-lg"
            >
              <FaQuoteLeft className="text-brand-600 text-3xl mb-6 mx-auto" />
              <p className="text-lg text-gray-700 mb-6 italic">
                "{testimonials[activeTestimonial].quote}"
              </p>
              <div className="flex items-center justify-center gap-2 mb-4">
                {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400" />
                ))}
              </div>
              <div>
                <p className="font-semibold text-gray-800">
                  {testimonials[activeTestimonial].author}
                </p>
                <p className="text-brand-600">
                  {testimonials[activeTestimonial].company}
                </p>
              </div>
            </motion.div>

            {/* Testimonial indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === activeTestimonial ? 'bg-brand-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
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
              Ready to Start Your Next Project?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Let's bring your vision to life with our expertise in steel fabrication and engineering
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
                variant="secondary"
                className="!bg-white !text-brand-700 !hover:bg-gray-100 !border-white group"
              >
                Get Quote Now
                <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </ButtonLink>
              <ButtonLink 
                to="/projects" 
                variant="outline"
                className="!border-white !text-white !bg-transparent hover:!bg-white hover:!text-brand-700 group"
              >
                View Our Work
                <FaEye className="ml-2 group-hover:scale-110 transition-transform" />
              </ButtonLink>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}