import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import ServiceDetail from './pages/ServiceDetail'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Projects from './pages/Projects'
import Manufacturing from './pages/Manufacturing'
import Contact from './pages/Contact'
import PrismBackground from './components/PrismBackground'

export default function App() {
  return (
    <div className="relative min-h-screen text-gray-200">
      {/* Dark base background below prism */}
      <div className="fixed inset-0 -z-20 bg-neutral-950" />
      {/* Global Prism Background */}
      <PrismBackground 
        height={3.5}
        baseWidth={5.0}
        scale={3.8}
        glow={1.2}
        noise={0.25}
        colorFrequency={0.6}
        timeScale={0.15}
        hueShift={0.1}
        className="fixed inset-0 -z-10 pointer-events-none opacity-75"
      />
      <Navbar />
      <main className="container py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:slug" element={<ProductDetail />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/manufacturing" element={<Manufacturing />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
