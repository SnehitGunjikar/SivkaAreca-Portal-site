import { NavLink } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { FaLinkedin, FaInstagram, FaFacebook } from 'react-icons/fa6'
import brandLogo from '../assets/imagedata/sivka-areca-name.png'

export default function Footer() {
  const [visible, setVisible] = useState(false)
  const footerRef = useRef(null)

  useEffect(() => {
    const el = footerRef.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting)
    }, { threshold: 0.1 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-neutral-900 border-t border-neutral-800 mt-16 text-gray-300">
      <div
        ref={footerRef}
        className={`container transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
      >
        {/* Top grid */}
        <div className="py-8 md:py-16 grid gap-8 sm:grid-cols-1 md:grid-cols-3">
          {/* Company Info */}
          <section aria-labelledby="footer-company" className="space-y-3 md:flex md:flex-col md:justify-center">
            <h3 id="footer-company" className="sr-only">Sivka Areca Enterprises</h3>
            <img src={brandLogo} alt="Sivka Areca Enterprises" className="h-12 sm:h-14 md:h-16 lg:h-20 w-auto object-contain brightness-110 contrast-110 saturate-110 drop-shadow-sm" />
            <p className="text-sm md:text-[15px] text-gray-300 text-center">Innovating Steel Structures with Precision & Excellence</p>
          </section>

          {/* Navigation */}
          <nav aria-labelledby="footer-nav" className="space-y-3">
            <h3 id="footer-nav" className="text-base font-semibold text-white">Navigation</h3>
            <ul className="grid gap-2 text-sm md:text-[15px]">
              <li><NavLink className="hover:text-brand-400" to="/">Home</NavLink></li>
              <li><NavLink className="hover:text-brand-400" to="/products">Core Expertise</NavLink></li>
              <li><NavLink className="hover:text-brand-400" to="/projects">Projects</NavLink></li>
              <li><NavLink className="hover:text-brand-400" to="/manufacturing">Manufacturing</NavLink></li>
              <li><NavLink className="hover:text-brand-400" to="/contact">Contact</NavLink></li>
            </ul>
          </nav>

          {/* Social + Contact */}
          <section aria-labelledby="footer-social" className="space-y-3">
            <h3 id="footer-social" className="text-base font-semibold text-white">Social</h3>
            <div className="flex items-center gap-4">
              <a
                href="https://www.linkedin.com/company/sivkaareca"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-gray-300 hover:text-[#0A66C2] transition-colors"
              >
                <FaLinkedin className="h-6 w-6" />
              </a>
              <a
                href="https://www.instagram.com/sivkaarecaenterprises"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-gray-300 hover:text-[#E1306C] transition-colors"
              >
                <FaInstagram className="h-6 w-6" />
              </a>
              <a
                href="https://www.facebook.com/sivkaareca"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-gray-300 hover:text-[#1877F2] transition-colors"
              >
                <FaFacebook className="h-6 w-6" />
              </a>
            </div>

            <h3 className="text-base font-semibold text-white">Contact Us</h3>
            <address className="not-italic text-sm md:text-[15px] space-y-1 text-white">
              <p className="text-white">G.P.C. No. 414/34, Shivaji Nagar, Khanapur – 591302, Belagavi, Karnataka</p>
              <p className="text-white">GSTIN: 29FMNPP9114A1ZS</p>
              <p className="text-white">Contact: +91 96864 20150 / +91 95912 53590</p>
              <p className="text-white">Email: <a href="mailto:sivkaareca@gmail.com" className="text-white hover:text-brand-400">sivkaareca@gmail.com</a></p>
            </address>
          </section>
        </div>

        {/* Bottom legal row */}
        <div className="border-t border-neutral-800 pt-6 pb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-sm md:text-[15px] text-gray-300">Copyright © {new Date().getFullYear()} Sivka Areca Enterprises. All rights reserved.</p>
          <ul className="flex items-center gap-4 text-sm md:text-[15px]">
            <li><NavLink to="/privacy" className="hover:text-brand-400">Privacy Policy</NavLink></li>
            <li><NavLink to="/terms" className="hover:text-brand-400">Terms of Service</NavLink></li>
          </ul>
        </div>
      </div>

      {/* Fixed Back to Top button (icon-only) */}
      <button
        type="button"
        onClick={scrollTop}
        aria-label="Back to Top"
        title="Back to Top"
        className="fixed bottom-6 right-6 z-50 h-10 w-10 rounded-full bg-black/30 hover:bg-black/20 backdrop-blur-md border border-white/20 text-white shadow-lg grid place-content-center focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-neutral-900"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M12 5l-6 6h4v8h4v-8h4z"/></svg>
      </button>
    </footer>
  )
}