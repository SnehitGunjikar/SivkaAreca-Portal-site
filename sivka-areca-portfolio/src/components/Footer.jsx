import { NavLink } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t mt-16">
      <div className="container py-8 grid gap-6 md:grid-cols-3">
        <div>
          <h3 className="font-semibold mb-2">Sivka Areca Enterprises</h3>
          <p className="text-sm text-gray-600">Innovating Steel Structures with Precision & Excellence</p>
          <p className="mt-3 text-sm text-gray-600">
            G.P.C. No. 414/34, Shivaji Nagar, Khanapur - 591302, Belagavi, Karnataka
          </p>
          <p className="text-sm text-gray-600">GSTIN: 29FMNPP9114A1ZS</p>
          <p className="text-sm text-gray-600">Contact: +91 9686420150, +91 9591253590</p>
          <p className="text-sm text-gray-600">Email: sivkaareca@gmail.com</p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Navigation</h3>
          <div className="flex flex-col gap-1 text-sm">
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
          <h3 className="font-semibold mb-2">Copyright</h3>
          <p className="text-sm text-gray-600">© {new Date().getFullYear()} Sivka Areca Enterprises. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}