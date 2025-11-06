import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import GooeyNav from './GooeyNav'
import brandLogo from '../assets/imagedata/CompanyName.png'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  
  // Performance optimization: Reduce animations on slower devices
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const isSlowDevice = typeof navigator !== 'undefined' && navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4

  const animationConfig = {
    duration: prefersReducedMotion || isSlowDevice ? 0.2 : 0.4,
    type: prefersReducedMotion ? "tween" : "spring",
    stiffness: 100,
    damping: 15
  }

  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setOpen(false)
      }
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Scroll detection for transparent/translucent background
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Enhanced keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (open) {
        if (event.key === 'Escape') {
          setOpen(false)
        }
        // Trap focus within mobile menu
        if (event.key === 'Tab') {
          const focusableElements = document.querySelectorAll(
            '#mobile-navigation a, #mobile-navigation button'
          )
          const firstElement = focusableElements[0]
          const lastElement = focusableElements[focusableElements.length - 1]
          
          if (event.shiftKey && document.activeElement === firstElement) {
            event.preventDefault()
            lastElement.focus()
          } else if (!event.shiftKey && document.activeElement === lastElement) {
            event.preventDefault()
            firstElement.focus()
          }
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open])
  
  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      // Focus first navigation item when menu opens
      setTimeout(() => {
        const firstNavItem = document.querySelector('#mobile-navigation a')
        if (firstNavItem) firstNavItem.focus()
      }, 100)
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [open])
  
  const linkClass = ({ isActive }) =>
    `px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${isActive ? 'bg-brand-600 text-white shadow-lg' : 'text-gray-200 hover:bg-white/10 hover:text-white'}`

  const items = [
    { label: 'Home', to: '/' },
    // { label: 'About', to: '/about' },
    { label: 'Core Expertise', to: '/products' },
    { label: 'Projects', to: '/projects' },
    { label: 'Manufacturing', to: '/manufacturing' },
    { label: 'Contact', to: '/contact' },
  ]

  // Determine page for header behavior
  const isContactPage = location.pathname === '/contact'
  const isProjectDetailPage = location.pathname.startsWith('/projects/')
  
  // Make header transparent at top and translucent on scroll across pages,
  // except Contact page which remains always translucent
  const getHeaderStyle = () => {
    if (isContactPage) {
      return 'bg-neutral-900/90 backdrop-blur-md border-b border-white/20'
    }
    // On Project Detail pages, keep header translucent even at the top
    if (isProjectDetailPage) {
      return 'bg-neutral-900/80 backdrop-blur-md border-b border-white/20'
    }
    return isScrolled
      ? 'bg-neutral-900/80 backdrop-blur-md border-b border-white/20'
      : 'bg-transparent border-b border-transparent'
  }

  return (
    <header className={`${getHeaderStyle()} sticky top-0 z-50 transition-all duration-300`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between py-2 sm:py-3 md:py-4 pl-2 sm:pl-3 md:pl-4 pr-4 sm:pr-6 lg:pr-8">
        <div className="flex items-center gap-3 sm:gap-4 -ml-2 sm:-ml-3">
          {/* Enhanced hamburger menu button with accessibility */}
          <motion.button 
            className="md:hidden h-12 w-12 flex flex-col items-center justify-center border border-white/20 rounded-xl hover:bg-white/5 hover:border-white/30 focus:bg-white/10 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-neutral-900 transition-all duration-200 touch-manipulation" 
            onClick={() => setOpen(!open)} 
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-haspopup="true"
            whileTap={{ scale: 0.95 }}
            style={{ minHeight: '44px', minWidth: '44px' }}
          >
            <motion.span 
              className="block w-5 h-0.5 bg-gray-300 mb-1 transition-all duration-300"
              animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            />
            <motion.span 
              className="block w-5 h-0.5 bg-gray-300 mb-1 transition-all duration-300"
              animate={open ? { opacity: 0 } : { opacity: 1 }}
            />
            <motion.span 
              className="block w-5 h-0.5 bg-gray-300 transition-all duration-300"
              animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            />
          </motion.button>
          
          {/* Brand logo */}
          <NavLink to="/" className="inline-block">
            <motion.img
              src={brandLogo}
              alt="Sivka Areca Enterprises"
              className={`${isScrolled ? 'h-8 sm:h-10 md:h-12 lg:h-14' : 'h-12 sm:h-14 md:h-16 lg:h-20'} w-auto object-contain select-none brightness-110 contrast-110 saturate-110 drop-shadow-[0_1px_1px_rgba(255,255,255,0.35)] transition-all duration-300`}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
          </NavLink>
        </div>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-1">
          <GooeyNav
            items={items}
            animationTime={600}
            particleCount={21}
            timeVariance={1300}
            particleR={240}
          />
        </nav>
      </div>
      
      {/* Professional Mobile Menu with Enhanced UX */}
      <AnimatePresence>
        {open && (
          <>
            {/* Enhanced Backdrop with Gradient */}
            <motion.div
              className="fixed inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70 backdrop-blur-md z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={() => setOpen(false)}
            />
            
            {/* Professional Mobile Menu */}
            <motion.div
              id="mobile-navigation"
              role="navigation"
              aria-label="Mobile navigation menu"
              className="fixed top-[65px] sm:top-[69px] md:top-[73px] left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-200/50 z-50 md:hidden shadow-2xl"
              style={{ willChange: 'transform, opacity' }}
              initial={{ opacity: 0, y: -30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.95 }}
              transition={animationConfig}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.2}
              onDragEnd={(event, info) => {
                // Close menu if dragged up significantly
                if (info.offset.y < -50 || info.velocity.y < -500) {
                  setOpen(false)
                }
              }}
            >
                {/* Swipe Indicator */}
                <div className="flex justify-center py-2">
                  <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
                </div>
                
                {/* Menu Header with Brand Accent */}
              <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-brand-50 to-brand-100/50">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <motion.div 
                      className="w-8 h-8 bg-gradient-to-br from-brand-500 to-brand-600 rounded-lg flex items-center justify-center shadow-lg"
                      animate={{ 
                        rotate: [0, 5, -5, 0],
                        scale: [1, 1.05, 1]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 3
                      }}
                    >
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                      </svg>
                    </motion.div>
                    <div>
                      <motion.h3 
                        className="text-sm font-semibold text-gray-800"
                        animate={{ opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        Navigation
                      </motion.h3>
                      <motion.p 
                        className="text-xs text-gray-500"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        Explore our portfolio
                      </motion.p>
                    </div>
                  </div>
                  <motion.button
                    onClick={() => setOpen(false)}
                    className="p-2 rounded-lg hover:bg-white/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Close menu"
                  >
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </motion.div>
              </div>

              {/* Enhanced Navigation Links */}
              <div className="px-4 py-6 space-y-2 max-h-[calc(100vh-140px)] overflow-y-auto">
                {items.map((item, index) => (
                  <NavLink 
                     key={item.to}
                     to={item.to} 
                     className={({ isActive }) =>
                       `group relative flex items-center px-6 py-5 rounded-2xl text-base font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-white touch-manipulation ${
                         isActive 
                           ? 'bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-lg shadow-brand-500/25' 
                           : 'text-gray-700 hover:bg-gradient-to-r hover:from-brand-50 hover:to-brand-100 hover:text-brand-700 active:scale-[0.98] focus:bg-brand-50'
                       }`
                     }
                     onClick={() => setOpen(false)}
                     aria-current={location.pathname === item.to ? 'page' : undefined}
                     style={{ minHeight: '56px' }} // Enhanced touch target for mobile
                   >
                    <motion.div
                       initial={{ x: -30, opacity: 0 }}
                       animate={{ x: 0, opacity: 1 }}
                       transition={{ 
                         delay: 0.1 + (index * 0.08), 
                         duration: 0.5,
                         type: "spring",
                         stiffness: 100,
                         damping: 15
                       }}
                       className="flex items-center w-full"
                       style={{ willChange: 'transform' }}
                       whileHover={{ x: 8 }}
                       whileTap={{ scale: 0.98 }}
                     >
                      {/* Navigation Icon Indicator */}
                      <motion.div 
                        className={`w-2 h-2 rounded-full mr-4 transition-all duration-300 ${
                          location.pathname === item.to 
                            ? 'bg-white shadow-lg shadow-white/50' 
                            : 'bg-current opacity-60 group-hover:opacity-100 group-hover:scale-125'
                        }`}
                        animate={location.pathname === item.to ? {
                          scale: [1, 1.2, 1],
                          rotate: [0, 180, 360]
                        } : {}}
                        transition={{ 
                          duration: 0.6,
                          repeat: location.pathname === item.to ? Infinity : 0,
                          repeatDelay: 2
                        }}
                      />
                      
                      {/* Navigation Text with Enhanced Typography */}
                      <motion.span 
                        className="flex-1 text-left font-medium tracking-wide"
                        animate={location.pathname === item.to ? {
                          scale: [1, 1.02, 1]
                        } : {}}
                        transition={{ 
                          duration: 0.4,
                          repeat: location.pathname === item.to ? Infinity : 0,
                          repeatDelay: 3
                        }}
                      >
                        {item.label}
                      </motion.span>
                      
                      {/* Active State Arrow Indicator */}
                      {location.pathname === item.to && (
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="ml-auto"
                        >
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                          </svg>
                        </motion.div>
                      )}
                      
                      {/* Hover Arrow Indicator */}
                      <motion.div
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={false}
                        animate={{ x: 0 }}
                        whileHover={{ x: 4 }}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.div>
                    </motion.div>
                    
                    {/* Active State Indicator */}
                    <motion.div
                      className="absolute left-0 top-1/2 w-1 h-8 bg-white rounded-r-full transform -translate-y-1/2 opacity-0"
                      animate={{ 
                        opacity: location.pathname === item.to ? 1 : 0,
                        scale: location.pathname === item.to ? 1 : 0.8
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </NavLink>
                ))}
              </div>

              {/* Menu Footer with Contact CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="px-6 py-4 border-t border-gray-100 bg-gradient-to-r from-gray-50 to-gray-100/50"
              >
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">Ready to start your project?</p>
                  <motion.button
                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-brand-500 to-brand-600 text-white text-sm font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setOpen(false)
                      // Navigate to contact if not already there
                      if (location.pathname !== '/contact') {
                        navigate('/contact')
                      }
                    }}
                  >
                    Get Quote
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}