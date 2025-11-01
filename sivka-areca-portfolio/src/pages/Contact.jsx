import { useState, useRef, useEffect } from 'react'
import { Button } from '../components/Button'
import ScrollReveal from '../components/ScrollReveal'
import SpotlightCard from '../components/SpotlightCard'
import { motion, useAnimation, useInView } from 'framer-motion'
import { 
  FaPhone, 
  FaEnvelope, 
  FaLocationDot, 
  FaClock, 
  FaUser, 
  FaPaperPlane,
  FaCircleCheck,
  FaTriangleExclamation,
  FaBuilding,
  FaIdCard,
  FaCalendar,
  FaHeadset,
  FaShield,
  FaArrowRight,
  FaGlobe,
  FaIndustry
} from 'react-icons/fa6'

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

// Floating Icon Component
function FloatingIcon({ icon: Icon, delay = 0, className = "" }) {
  return (
    <motion.div
      className={`absolute ${className}`}
      animate={{
        y: [0, -10, 0],
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <Icon className="text-brand-200/30 text-2xl" />
    </motion.div>
  )
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!form.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (form.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }
    
    if (!form.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    if (!form.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (form.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }
    
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setSubmitted(true)
    setIsSubmitting(false)
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <div className="space-y-16">
      {/* Enhanced Hero Section */}
      <motion.section
        className="relative overflow-hidden bg-gradient-to-br from-brand-50 via-white to-brand-50 py-8 sm:py-12 md:py-16 lg:py-20 px-3 sm:px-4 md:px-6 rounded-3xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23000000%22%20fill-opacity%3D%220.02%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
        
        {/* Floating Icons - Hidden on mobile for performance */}
        <div className="hidden lg:block">
          <FloatingIcon icon={FaPhone} delay={0} className="top-10 left-10" />
          <FloatingIcon icon={FaEnvelope} delay={1} className="top-20 right-20" />
          <FloatingIcon icon={FaLocationDot} delay={2} className="bottom-20 left-20" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <FaHeadset className="text-3xl sm:text-4xl md:text-5xl text-brand-600 mb-4 sm:mb-6 mx-auto" />
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
              Get In Touch
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-6 sm:mb-8 leading-relaxed">
              Ready to bring your steel fabrication project to life? Let's discuss your requirements and create something exceptional together.
            </p>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-brand-600 mb-1 sm:mb-2">
                <AnimatedCounter end={24} suffix="h" />
              </div>
              <p className="text-xs sm:text-sm text-gray-600">Response Time</p>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-brand-600 mb-1 sm:mb-2">
                <AnimatedCounter end={500} suffix="+" />
              </div>
              <p className="text-xs sm:text-sm text-gray-600">Projects Delivered</p>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-brand-600 mb-1 sm:mb-2">
                <AnimatedCounter end={15} suffix="+" />
              </div>
              <p className="text-xs sm:text-sm text-gray-600">Years Experience</p>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-brand-600 mb-1 sm:mb-2">
                <AnimatedCounter end={100} suffix="%" />
              </div>
              <p className="text-xs sm:text-sm text-gray-600">Client Satisfaction</p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Information Cards */}
      <motion.section
        className="grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SpotlightCard className="group h-full rounded-2xl border border-gray-300 bg-white p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300" spotlightColor="rgba(0, 0, 0, 0.15)">
            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="p-2 sm:p-3 bg-brand-100 rounded-xl group-hover:bg-brand-200 transition-colors">
                <FaBuilding className="text-lg sm:text-xl lg:text-2xl text-brand-600" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900">Company Information</h3>
                <p className="text-sm sm:text-base text-gray-600">Sivka Areca Enterprises</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <FaLocationDot className="text-brand-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">Address</p>
                  <p className="text-gray-700">G.P.C. No. 414/34, Shivaji Nagar</p>
                  <p className="text-gray-700">Khanapur - 591302, Belagavi, Karnataka</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <FaIdCard className="text-brand-600 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">GSTIN</p>
                  <p className="text-gray-700">29FMNPP9114A1ZS</p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <div className="space-y-3">
                  <motion.a 
                    href="tel:+919686420150" 
                    className="flex items-center gap-3 text-brand-600 hover:text-brand-700 transition-colors group/link"
                    whileHover={{ x: 5 }}
                  >
                    <FaPhone className="group-hover/link:scale-110 transition-transform" />
                    <span>+91 9686420150</span>
                  </motion.a>
                  <motion.a 
                    href="tel:+919591253590" 
                    className="flex items-center gap-3 text-brand-600 hover:text-brand-700 transition-colors group/link"
                    whileHover={{ x: 5 }}
                  >
                    <FaPhone className="group-hover/link:scale-110 transition-transform" />
                    <span>+91 9591253590</span>
                  </motion.a>
                  <motion.a 
                    href="mailto:sivkaareca@gmail.com" 
                    className="flex items-center gap-3 text-brand-600 hover:text-brand-700 transition-colors group/link"
                    whileHover={{ x: 5 }}
                  >
                    <FaEnvelope className="group-hover/link:scale-110 transition-transform" />
                    <span>sivkaareca@gmail.com</span>
                  </motion.a>
                </div>
              </div>
            </div>
          </SpotlightCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SpotlightCard className="group h-full rounded-2xl border border-gray-300 bg-white p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300" spotlightColor="rgba(0, 0, 0, 0.15)">
            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="p-2 sm:p-3 bg-brand-100 rounded-xl group-hover:bg-brand-200 transition-colors">
                <FaClock className="text-lg sm:text-xl lg:text-2xl text-brand-600" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900">Business Hours</h3>
                <p className="text-sm sm:text-base text-gray-600">When we're available</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-brand-50 rounded-lg">
                <span className="font-medium text-gray-900">Monday - Saturday</span>
                <span className="text-brand-600 font-semibold">8:00 AM - 5:00 PM</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-900">Sunday</span>
                <span className="text-gray-500">Closed</span>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <FaShield className="text-brand-600" />
                  <p className="font-medium text-gray-900">Response Guarantee</p>
                </div>
                <p className="text-gray-700">We aim to respond to all inquiries within 24 hours during business days.</p>
              </div>
            </div>
          </SpotlightCard>
        </motion.div>
      </motion.section>

      {/* Enhanced Contact Form */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <SpotlightCard className="rounded-2xl border border-gray-300 bg-white p-4 sm:p-6 lg:p-8 shadow-lg" spotlightColor="rgba(0, 0, 0, 0.15)">
          <div className="text-center mb-6 sm:mb-8">
            <FaPaperPlane className="text-2xl sm:text-3xl lg:text-4xl text-brand-600 mb-3 sm:mb-4 mx-auto" />
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Send us a message</h2>
            <p className="text-sm sm:text-base text-gray-600">Tell us about your project requirements and we'll get back to you promptly</p>
          </div>

          {submitted ? (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <FaCircleCheck className="text-2xl text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Message Sent Successfully!</h3>
              <p className="text-gray-600 mb-6">Thank you for reaching out. We'll get back to you within 24 hours.</p>
              <Button 
                onClick={() => setSubmitted(false)}
                className="bg-brand-600 hover:bg-brand-700 text-white"
              >
                Send Another Message
              </Button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Name Field */}
                <motion.div
                  className="relative group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 0.6 }}
                >
                  <div className="relative">
                    <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-brand-600 transition-colors" />
                    <input
                      name="name"
                      type="text"
                      placeholder="Your full name"
                      value={form.name}
                      onChange={handleChange}
                      className={`w-full pl-12 pr-4 py-4 border rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all ${
                        errors.name ? 'border-red-300 ring-2 ring-red-200' : 'border-gray-300'
                      }`}
                    />
                  </div>
                  {errors.name && (
                    <motion.div
                      className="flex items-center gap-2 mt-2 text-red-600 text-sm"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <FaTriangleExclamation size={12} />
                      {errors.name}
                    </motion.div>
                  )}
                </motion.div>

                {/* Email Field */}
                <motion.div
                  className="relative group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <div className="relative">
                    <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-brand-600 transition-colors" />
                    <input
                      name="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={form.email}
                      onChange={handleChange}
                      className={`w-full pl-12 pr-4 py-4 border rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all ${
                        errors.email ? 'border-red-300 ring-2 ring-red-200' : 'border-gray-300'
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <motion.div
                      className="flex items-center gap-2 mt-2 text-red-600 text-sm"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <FaTriangleExclamation size={12} />
                      {errors.email}
                    </motion.div>
                  )}
                </motion.div>
              </div>

              {/* Message Field */}
              <motion.div
                className="relative group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <textarea
                  name="message"
                  placeholder="Tell us about your project requirements, expected timeline, and any specific details..."
                  value={form.message}
                  onChange={handleChange}
                  rows={6}
                  className={`w-full px-4 py-4 border rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all resize-none ${
                    errors.message ? 'border-red-300 ring-2 ring-red-200' : 'border-gray-300'
                  }`}
                />
                {errors.message && (
                  <motion.div
                    className="flex items-center gap-2 mt-2 text-red-600 text-sm"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <FaTriangleExclamation size={12} />
                    {errors.message}
                  </motion.div>
                )}
                <p className="mt-2 text-xs text-gray-500">
                  Include project details, timeline, and any specific requirements to help us provide an accurate quote.
                </p>
              </motion.div>

              {/* Submit Button */}
              <motion.div
                className="flex flex-col sm:flex-row items-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full sm:w-auto bg-brand-600 hover:bg-brand-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Sending...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      Send Message
                      <FaPaperPlane className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  )}
                </Button>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <FaShield />
                  <span>We respect your privacy and will never share your details.</span>
                </div>
              </motion.div>
            </form>
          )}
        </SpotlightCard>
      </motion.section>

      {/* Location & Additional Info */}
      <motion.section
        className="bg-gradient-to-r from-brand-600 to-brand-700 text-white py-12 px-6 rounded-2xl"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <FaLocationDot className="text-4xl mb-4 mx-auto" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Visit Our Facility</h2>
            <p className="text-white/90">Located in the heart of Karnataka's industrial region</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              className="text-center p-6 rounded-xl bg-white/10 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              <FaIndustry className="text-3xl mb-4 mx-auto" />
              <h3 className="font-semibold mb-2">Modern Facility</h3>
              <p className="text-white/80 text-sm">State-of-the-art equipment and spacious workshop</p>
            </motion.div>
            
            <motion.div
              className="text-center p-6 rounded-xl bg-white/10 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <FaGlobe className="text-3xl mb-4 mx-auto" />
              <h3 className="font-semibold mb-2">Strategic Location</h3>
              <p className="text-white/80 text-sm">Easy access to major transportation networks</p>
            </motion.div>
            
            <motion.div
              className="text-center p-6 rounded-xl bg-white/10 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <FaCalendar className="text-3xl mb-4 mx-auto" />
              <h3 className="font-semibold mb-2">Schedule Visit</h3>
              <p className="text-white/80 text-sm">Contact us to arrange a facility tour</p>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  )
}