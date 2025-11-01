import { NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import GooeyNav from './GooeyNav'
import brandLogo from '../assets/imagedata/sivka-areca-name.png'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  
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
  
  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
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

  return (
    <header className="bg-neutral-900 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50">
      <div className="container flex items-center justify-between py-2 sm:py-3 md:py-4">
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Enhanced hamburger menu button */}
          <motion.button 
            className="md:hidden h-10 w-10 flex flex-col items-center justify-center border border-white/20 rounded-lg hover:bg-white/5 hover:border-white/30 transition-all duration-200" 
            onClick={() => setOpen(!open)} 
            aria-label="Toggle navigation"
            whileTap={{ scale: 0.95 }}
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
              className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto object-contain select-none brightness-110 contrast-110 saturate-110 drop-shadow-[0_1px_1px_rgba(255,255,255,0.35)]"
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
      
      {/* Enhanced mobile menu with animations */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            
            {/* Mobile menu */}
            <motion.div
              className="fixed top-[65px] sm:top-[69px] md:top-[73px] left-0 right-0 bg-neutral-900/95 backdrop-blur-md border-t border-white/10 z-50 md:hidden shadow-xl"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="container py-4 sm:py-6 space-y-1 sm:space-y-2 max-h-[calc(100vh-65px)] sm:max-h-[calc(100vh-69px)] md:max-h-[calc(100vh-73px)] overflow-y-auto">
                <NavLink to="/" className={linkClass} onClick={() => setOpen(false)}>
                  <motion.span
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="block py-1"
                  >
                    Home
                  </motion.span>
                </NavLink>
                <NavLink to="/products" className={linkClass} onClick={() => setOpen(false)}>
                  <motion.span
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.15 }}
                    className="block py-1"
                  >
                    Core Expertise
                  </motion.span>
                </NavLink>
                <NavLink to="/projects" className={linkClass} onClick={() => setOpen(false)}>
                  <motion.span
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="block py-1"
                  >
                    Projects
                  </motion.span>
                </NavLink>
                <NavLink to="/manufacturing" className={linkClass} onClick={() => setOpen(false)}>
                  <motion.span
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.25 }}
                    className="block py-1"
                  >
                    Manufacturing
                  </motion.span>
                </NavLink>
                <NavLink to="/contact" className={linkClass} onClick={() => setOpen(false)}>
                  <motion.span
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="block py-1"
                  >
                    Contact
                  </motion.span>
                </NavLink>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}