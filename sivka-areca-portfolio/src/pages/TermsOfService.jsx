/* eslint-disable no-unused-vars */
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { FaFileContract } from 'react-icons/fa6'

export default function TermsOfService() {
  return (
    <>
      <Helmet>
        <title>Terms of Service | Sivka Areca Enterprises</title>
        <meta
          name="description"
          content="Terms of Service for Sivka Areca Enterprises. Understand the guidelines and rules for using our services."
        />
        <link rel="canonical" href="https://www.sivkaareca.com/terms" />
      </Helmet>
      <div className="space-y-10">
        {/* Hero Section */}
        <motion.section
          className="relative overflow-hidden bg-gradient-to-br from-brand-50 via-white to-brand-50 py-12 sm:py-16 px-4 sm:px-6 rounded-3xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23000000%22%20fill-opacity%3D%220.02%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <FaFileContract className="text-4xl text-brand-600 mb-4 mx-auto" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">Terms of Service</h1>
            <p className="text-gray-600">Effective: 2025</p>
          </div>
        </motion.section>

        <div className="max-w-4xl mx-auto space-y-8 px-4 sm:px-0 pb-12">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 border-l-4 border-brand-500 pl-4">Introduction</h2>
            <p className="text-gray-700 leading-relaxed text-justify">These terms govern your use of the Sivka Areca Enterprises website and services. By using our site, you agree to these terms.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 border-l-4 border-brand-500 pl-4">Use of Site</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li className="leading-relaxed">Do not misuse the site or attempt to disrupt operations.</li>
              <li className="leading-relaxed">Provide accurate information when submitting inquiries.</li>
              <li className="leading-relaxed">Comply with applicable laws and regulations.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 border-l-4 border-brand-500 pl-4">Services & Content</h2>
            <p className="text-gray-700 leading-relaxed text-justify">Information on the site is provided for general guidance. Final specifications and contracts are agreed separately. We may update or change content without notice.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 border-l-4 border-brand-500 pl-4">Intellectual Property</h2>
            <p className="text-gray-700 leading-relaxed text-justify">All trademarks, logos, and content on the site are the property of Sivka Areca Enterprises or licensors. You may not copy or redistribute without permission.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 border-l-4 border-brand-500 pl-4">Liability</h2>
            <p className="text-gray-700 leading-relaxed text-justify">To the fullest extent permitted by law, we are not liable for indirect or consequential losses arising from use of the site. This does not limit liability where prohibited by law.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 border-l-4 border-brand-500 pl-4">Governing Law</h2>
            <p className="text-gray-700 leading-relaxed text-justify">These terms are governed by the laws of India. Disputes will be subject to the jurisdiction of courts in Belagavi, Karnataka, India.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 border-l-4 border-brand-500 pl-4">Contact</h2>
            <p className="text-gray-700 leading-relaxed text-justify">For questions about these terms, contact <a href="mailto:info@sivkaareca.com" className="text-brand-700 hover:underline transition-colors">info@sivkaareca.com</a> or +91 8104478208 / +91 95912 53590.</p>
          </section>
        </div>
      </div>
    </>
  )
}