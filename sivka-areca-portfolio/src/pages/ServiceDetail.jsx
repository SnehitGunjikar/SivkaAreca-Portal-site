import { useParams, Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { services } from '../data/services'
import {
  ArrowLeft,
  CheckCircle,
  Users,
  Award,
  Clock,
  Shield,
  Zap,
  Target,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Star,
  TrendingUp,
  Wrench,
  Cog,
  Building,
  Layers,
  Settings
} from 'lucide-react'

// Import service images
import designExpertiseImg from '../assets/imagedata/services/design-expertise.svg'
import fabricationExcellenceImg from '../assets/imagedata/services/fabrication-excellence.svg'
import installationMasteryImg from '../assets/imagedata/services/installation-mastery.svg'
import projectManagementImg from '../assets/imagedata/services/project-management.svg'
import serviceHeroImg from '../assets/imagedata/core-exp-homepg-img/core-exp-homepg.jpg'

// Map service slugs to their images
const serviceImages = {
  'design-expertise': designExpertiseImg,
  'fabrication-excellence': fabricationExcellenceImg,
  'installation-mastery': installationMasteryImg,
  'project-management': projectManagementImg,
}

// Service-specific data for enhanced content
const serviceEnhancements = {
  'design-expertise': {
    tagline: 'Precision-driven designs engineered for strength and elegance',
    highlights: [
      { icon: Building, title: '3D Structural Modeling', description: 'Advanced CAD modeling for precise visualization' },
      { icon: Shield, title: 'Safety-Compliant Designs', description: 'Meeting all international safety standards' },
      { icon: Target, title: 'Material Optimization', description: 'Cost-efficient material selection and usage' },
      { icon: CheckCircle, title: 'Code Compliance', description: 'Adherence to IS/BS/ASTM standards' }
    ],
    workflow: [
      { step: 1, title: 'Requirement Analysis', description: 'Understanding client specifications and site conditions' },
      { step: 2, title: '3D Modeling', description: 'Creating detailed structural models and simulations' },
      { step: 3, title: 'Design Review', description: 'Collaborative reviews and design iterations' },
      { step: 4, title: 'Final Approval', description: 'Documentation and approval for fabrication' }
    ]
  },
  'fabrication-excellence': {
    tagline: 'Precision fabrication with uncompromising quality standards',
    highlights: [
      { icon: Cog, title: 'CNC Precision', description: 'Advanced CNC cutting, bending, and drilling' },
      { icon: Zap, title: 'WPS-Compliant Welding', description: 'Certified welding procedures and operators' },
      { icon: CheckCircle, title: 'Quality Inspections', description: 'Dimensional checks and fit-up inspections' },
      { icon: Shield, title: 'Protective Coating', description: 'Durable finishes and protective treatments' }
    ],
    workflow: [
      { step: 1, title: 'Material Preparation', description: 'Quality material selection and preparation' },
      { step: 2, title: 'Precision Cutting', description: 'CNC cutting and shaping operations' },
      { step: 3, title: 'Expert Welding', description: 'Certified welding and assembly processes' },
      { step: 4, title: 'Quality Control', description: 'Final inspections and protective coating' }
    ]
  },
  'installation-mastery': {
    tagline: 'Safe, efficient erection and seamless on-site integration',
    highlights: [
      { icon: Shield, title: 'Safety First', description: 'Comprehensive risk assessments and safety protocols' },
      { icon: Target, title: 'Precision Alignment', description: 'Accurate on-site alignment and leveling' },
      { icon: Wrench, title: 'Expert Rigging', description: 'Professional rigging plans and lift executions' },
      { icon: CheckCircle, title: 'Complete Documentation', description: 'As-built documentation and commissioning' }
    ],
    workflow: [
      { step: 1, title: 'Site Assessment', description: 'Method statements and risk assessments' },
      { step: 2, title: 'Installation Planning', description: 'Rigging plans and equipment mobilization' },
      { step: 3, title: 'Erection Process', description: 'Safe and precise structural installation' },
      { step: 4, title: 'Commissioning', description: 'Final checks and handover documentation' }
    ]
  },
  'project-management': {
    tagline: 'End-to-end coordination ensuring seamless project delivery',
    highlights: [
      { icon: Clock, title: 'Timeline Management', description: 'Baseline schedules and progress tracking' },
      { icon: Users, title: 'Stakeholder Coordination', description: 'Vendor management and quality audits' },
      { icon: TrendingUp, title: 'Cost Control', description: 'Budget management and change control' },
      { icon: Award, title: 'Quality Delivery', description: 'Handover with complete documentation' }
    ],
    workflow: [
      { step: 1, title: 'Project Planning', description: 'Comprehensive planning and scheduling' },
      { step: 2, title: 'Resource Management', description: 'Vendor coordination and quality audits' },
      { step: 3, title: 'Progress Monitoring', description: 'Real-time tracking and cost control' },
      { step: 4, title: 'Project Handover', description: 'Complete documentation and training' }
    ]
  }
}

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
}

const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
}

const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } }
}

// Counter animation hook
const useCounter = (end, duration = 2000) => {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (inView && !hasStarted) {
      setHasStarted(true)
      let startTime = null
      const animate = (currentTime) => {
        if (startTime === null) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / duration, 1)
        setCount(Math.floor(progress * end))
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      requestAnimationFrame(animate)
    }
  }, [inView, end, duration, hasStarted])

  return [count, ref]
}

export default function ServiceDetail() {
  const { slug } = useParams()
  const service = services.find((s) => s.slug === slug)
  const enhancement = serviceEnhancements[slug]

  if (!service || !enhancement) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-gray-900">Service not found!</h1>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-[65vh] sm:pt-[72vh] md:pt-[80vh]">
      {/* Themed Hero Section */}
      <motion.section
        className="relative overflow-hidden h-[65vh] sm:h-[72vh] md:h-[80vh]"
        style={{ position: 'absolute', top: '0', left: '0', right: '0', width: '100%', zIndex: 10 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="relative w-full h-full overflow-hidden">
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 bg-center md:bg-top bg-no-repeat bg-cover md:bg-fixed"
              style={{ backgroundImage: `url(${serviceHeroImg})` }}
            />
          </div>
          <div className="absolute inset-0 m-0 p-0 bg-gradient-to-r from-black/70 via-black/50 to-black/40"></div>
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
                        {service.title}
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
                {enhancement?.tagline && (
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
                        animate={{ borderLeftWidth: '4px' }}
                        transition={{ delay: 1.2, duration: 0.6 }}
                      >
                        {enhancement.tagline}
                      </motion.span>
                    </p>
                  </motion.div>
                )}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                  className="flex flex-wrap gap-3 sm:gap-4"
                >
                  <Link
                    to="/"
                    className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl transition-all duration-300"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Home
                  </Link>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl transition-all duration-300"
                  >
                    <Phone className="w-4 h-4" />
                    Get in Touch
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Overview Section */}
      <section id="overview" className="py-16 lg:py-24 bg-white">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                {service.title} Overview
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                {service.intro}
              </p>
              <div className="space-y-4">
                {service.details.map((detail, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="w-6 h-6 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{detail}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-blue-50 to-slate-50 rounded-2xl p-8 shadow-lg">
                <img
                  src={serviceImages[service.slug]}
                  alt={`${service.title} illustration`}
                  className="w-full h-64 md:h-80 object-contain"
                />
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center">
                  <Star className="w-12 h-12 text-white" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Highlights Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-screen-xl mx-auto px-6">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Core Highlights
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover what makes our {service.title.toLowerCase()} services exceptional
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {enhancement.highlights.map((highlight, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-brand-600 to-brand-700 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <highlight.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {highlight.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {highlight.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process/Workflow Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="rounded-3xl border border-gray-200 shadow-lg p-6 sm:p-8 lg:p-10 bg-white">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Process
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                A systematic approach ensuring quality and efficiency at every step
              </p>
            </motion.div>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-brand-600 to-brand-400 hidden lg:block"></div>

              <div className="space-y-12 lg:space-y-16">
                {enhancement.workflow.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    className={`flex flex-col lg:flex-row items-center gap-8 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                      }`}
                  >
                    <div className="flex-1 space-y-4">
                      <div className={index % 2 === 0 ? 'text-left lg:text-right' : 'text-right lg:text-left'}>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          {step.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>

                    {/* Step Number */}
                    <div className="relative z-10">
                      <div className="w-16 h-16 bg-gradient-to-br from-brand-600 to-brand-700 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-2xl font-bold text-white">{step.step}</span>
                      </div>
                    </div>

                    <div className="flex-1"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section (curved box) */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="text-center bg-gradient-to-r from-brand-600 to-brand-700 text-white p-8 sm:p-10 lg:p-12 rounded-3xl shadow-xl">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                Let's Build Something Extraordinary Together
              </h2>
              <p className="text-xl text-brand-100 max-w-2xl mx-auto">
                Ready to transform your vision into reality? Our expert team is here to deliver exceptional {service.title.toLowerCase()} solutions tailored to your needs.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/contact"
                    className="px-8 py-4 bg-white text-brand-600 font-semibold rounded-lg hover:bg-brand-50 transition-colors flex items-center gap-2 group"
                  >
                    <Phone className="w-5 h-5" />
                    Call Now: +91 8104478208 / +91 95912 53590
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/contact"
                    className="px-8 py-4 border-2 border-white/30 hover:border-white/50 text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
                  >
                    <Mail className="w-5 h-5" />
                    Send Email
                  </Link>
                </motion.div>
              </div>

              <div className="pt-8 flex items-center justify-center gap-2 text-blue-200">
                <MapPin className="w-5 h-5" />
                <span>Serving clients across India with premium steel fabrication solutions</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

// StatCard Component for animated counters
function StatCard({ icon: Icon, value, suffix, label }) {
  const [count, ref] = useCounter(value)

  return (
    <motion.div
      ref={ref}
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="text-center space-y-4 p-6 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
    >
      <Icon className="w-12 h-12 text-blue-300 mx-auto" />
      <div className="text-4xl font-bold text-white">
        {count}{suffix}
      </div>
      <div className="text-blue-200 font-medium">
        {label}
      </div>
    </motion.div>
  )
}