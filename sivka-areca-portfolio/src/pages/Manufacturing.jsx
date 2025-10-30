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
  FaThumbsUp
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
      className={`cursor-pointer transition-all duration-300 ${
        isActive ? 'ring-2 ring-brand-500 shadow-lg' : ''
      }`}
    >
      <SpotlightCard
        className={`rounded-2xl border p-6 text-center shadow-md transition-all duration-300 ${
          isActive 
            ? 'border-brand-300 bg-brand-50 shadow-brand-600/20' 
            : 'border-gray-300 bg-white hover:bg-gray-50'
        }`}
        spotlightColor={isActive ? "rgba(59, 130, 246, 0.15)" : "rgba(0, 0, 0, 0.15)"}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className={`text-2xl sm:text-3xl font-bold mb-2 ${
            isActive ? 'text-brand-600' : 'text-brand-500'
          }`}>
            {index + 1}
          </div>
          <div className={`font-semibold ${
            isActive ? 'text-brand-800' : 'text-gray-900'
          }`}>
            {step.title}
          </div>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-3 text-sm text-gray-600"
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

  return (
    <div className="space-y-16">
      {/* Hero Section with Animated Background */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative overflow-hidden bg-gradient-to-br from-brand-600 via-brand-700 to-brand-800 text-white py-16 px-6 rounded-3xl"
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <FaIndustry className="mx-auto text-6xl mb-6 text-white/90" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              World-Class Manufacturing Excellence
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              State-of-the-art production facilities equipped for complex fabrication requirements and high-volume manufacturing
            </p>
          </motion.div>
        </div>

        {/* Floating Animation Elements */}
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-10 text-white/20"
        >
          <FaGears className="text-4xl" />
        </motion.div>
        
        <motion.div
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-20 right-10 text-white/20"
        >
          <FaWrench className="text-5xl" />
        </motion.div>
      </motion.section>

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
                    backgroundColor: activeStep === index ? '#3B82F6' : '#E5E7EB'
                  }}
                  className="w-3 h-3 rounded-full"
                />
                {index < steps.length - 1 && (
                  <motion.div
                    animate={{ 
                      scaleX: activeStep > index ? 1 : 0.3,
                      backgroundColor: activeStep > index ? '#3B82F6' : '#E5E7EB'
                    }}
                    className="w-12 h-1 mx-2 origin-left"
                  />
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

      {/* Client Testimonials */}
      <section className="bg-gray-50 rounded-3xl p-8 md:p-12">
        <ScrollReveal baseOpacity={0} enableBlur={true} baseRotation={5} blurStrength={10} textClassName="text-gray-900 text-center text-3xl font-bold mb-12">
          Client Success Stories
        </ScrollReveal>
        
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg relative"
            >
              <FaQuoteLeft className="text-brand-200 text-3xl mb-4" />
              <blockquote className="text-gray-700 mb-6 italic leading-relaxed">
                "{testimonial.quote}"
              </blockquote>
              <div className="flex items-center justify-between">
                <div>
                  <cite className="font-semibold text-gray-900 not-italic">
                    {testimonial.author}
                  </cite>
                  <p className="text-sm text-brand-600 mt-1">
                    {testimonial.project}
                  </p>
                </div>
                <FaAward className="text-brand-500 text-2xl" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

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
        >
          Get Started Today
          <FaArrowRight className="ml-2" />
        </motion.button>
      </motion.section>
    </div>
  )
}