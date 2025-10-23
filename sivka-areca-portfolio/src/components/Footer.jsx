import { NavLink } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-black/60 backdrop-blur-sm border-t border-white/10 mt-16">
      <div className="container py-4 grid gap-4 md:grid-cols-3">
        <div>
          <h3 className="font-semibold mb-2 text-white">Sivka Areca Enterprises</h3>
          <p className="text-sm text-gray-400">Innovating Steel Structures with Precision & Excellence</p>
          <p className="mt-3 text-sm text-gray-400">
            G.P.C. No. 414/34, Shivaji Nagar, Khanapur - 591302, Belagavi, Karnataka
          </p>
          <p className="text-sm text-gray-400">GSTIN: 29FMNPP9114A1ZS</p>
          <p className="text-sm text-gray-400">Contact: +91 9686420150, +91 9591253590</p>
          <p className="text-sm text-gray-400">Email: sivkaareca@gmail.com</p>
        </div>
        <div>
          <h3 className="font-semibold mb-2 text-white">Navigation</h3>
          <div className="flex flex-col gap-1 text-sm text-gray-300">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/services">Services</NavLink>
            <NavLink to="/products">Products</NavLink>
            <NavLink to="/projects">Projects</NavLink>
            <NavLink to="/manufacturing">Manufacturing</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-2 text-white">Copyright</h3>
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} Sivka Areca Enterprises. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}