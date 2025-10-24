import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import GooeyNav from './GooeyNav'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const linkClass = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-brand-600 text-white' : 'text-gray-200 hover:bg-white/10'}`

  const items = [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Services', to: '/services' },
    { label: 'Products', to: '/products' },
    { label: 'Projects', to: '/projects' },
    { label: 'Manufacturing', to: '/manufacturing' },
    { label: 'Contact', to: '/contact' },
  ]

  return (
    <header className="bg-black/40 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50">
      <div className="container flex items-center justify-between py-3">
        <div className="flex items-center gap-2">
          <button className="md:hidden h-8 w-8 grid place-content-center border border-white/10 rounded mr-2" onClick={() => setOpen(!open)} aria-label="Toggle navigation">
            <span className="block w-4 h-0.5 bg-gray-300 mb-1"></span>
            <span className="block w-4 h-0.5 bg-gray-300 mb-1"></span>
            <span className="block w-4 h-0.5 bg-gray-300"></span>
          </button>
          <div className="h-8 w-8 bg-brand-600 text-white grid place-content-center rounded">S</div>
          <span className="font-bold text-xl text-white">Sivka Areca Enterprises</span>
        </div>
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
      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-white/10 bg-black/60 backdrop-blur-sm">
          <div className="container py-2 grid gap-1">
            <NavLink to="/" className={linkClass} onClick={() => setOpen(false)}>Home</NavLink>
            <NavLink to="/about" className={linkClass} onClick={() => setOpen(false)}>About</NavLink>
            <NavLink to="/services" className={linkClass} onClick={() => setOpen(false)}>Services</NavLink>
            <NavLink to="/products" className={linkClass} onClick={() => setOpen(false)}>Products</NavLink>
            <NavLink to="/projects" className={linkClass} onClick={() => setOpen(false)}>Projects</NavLink>
            <NavLink to="/manufacturing" className={linkClass} onClick={() => setOpen(false)}>Manufacturing</NavLink>
            <NavLink to="/contact" className={linkClass} onClick={() => setOpen(false)}>Contact</NavLink>
          </div>
        </div>
      )}
    </header>
  )
}