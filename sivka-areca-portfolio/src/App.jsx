import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { SkeletonPage } from './components/SkeletonLoader'

const Home = React.lazy(() => import('./pages/Home'))
const ServiceDetail = React.lazy(() => import('./pages/ServiceDetail'))
const Products = React.lazy(() => import('./pages/Products'))
const ProductDetail = React.lazy(() => import('./pages/ProductDetail'))
const Projects = React.lazy(() => import('./pages/Projects'))
const ProjectDetail = React.lazy(() => import('./pages/ProjectDetail'))
const Manufacturing = React.lazy(() => import('./pages/Manufacturing'))
const Contact = React.lazy(() => import('./pages/Contact'))
const TermsOfService = React.lazy(() => import('./pages/TermsOfService'))
const PrivacyPolicy = React.lazy(() => import('./pages/PrivacyPolicy'))

export default function App() {
  return (
    <div className="relative min-h-screen">
      {/* Global background grid pattern */}
      <div className="fixed inset-0 -z-10">
        <div className="relative h-full w-full bg-white">
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
        </div>
      </div>

      <Navbar />
      <main className="container py-8">
        <Suspense fallback={<SkeletonPage />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:slug" element={<ProductDetail />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="/manufacturing" element={<Manufacturing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
