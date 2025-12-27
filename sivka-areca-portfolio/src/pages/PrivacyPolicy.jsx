/* eslint-disable no-unused-vars */
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { FaShieldHalved } from 'react-icons/fa6'

export default function PrivacyPolicy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Sivka Areca Enterprises</title>
        <meta
          name="description"
          content="Privacy Policy for Sivka Areca Enterprises. Learn how we collect, use, and protect your information."
        />
        <link rel="canonical" href="https://www.sivkaareca.com/privacy" />
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
            <FaShieldHalved className="text-4xl text-brand-600 mb-4 mx-auto" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
            <p className="text-gray-600">Last updated: 2025</p>
          </div>
        </motion.section>

        <div className="max-w-4xl mx-auto space-y-8 px-4 sm:px-0">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 border-l-4 border-brand-500 pl-4">Introduction</h2>
            <p className="text-gray-700 leading-relaxed text-justify">Sivka Areca Enterprises (&quot;we&quot;, &quot;us&quot;) respects your privacy. This policy explains what information we collect, how we use it, and your rights.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 border-l-4 border-brand-500 pl-4">Information We Collect</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Contact details you provide (name, email, phone).</li>
              <li>Inquiry and message details submitted via forms or email.</li>
              <li>Basic usage data (pages visited, device, browser) via analytics.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 border-l-4 border-brand-500 pl-4">How We Use Information</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Respond to inquiries and provide requested services.</li>
              <li>Improve site performance and user experience.</li>
              <li>Maintain security and prevent misuse.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 border-l-4 border-brand-500 pl-4">Cookies</h2>
            <p className="text-gray-700 leading-relaxed text-justify">We may use necessary and analytics cookies to operate the site and understand usage patterns. You can control cookies through your browser settings.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 border-l-4 border-brand-500 pl-4">Data Sharing</h2>
            <p className="text-gray-700 leading-relaxed text-justify">We do not sell personal data. We may share limited data with trusted service providers strictly to operate our website and services, subject to confidentiality obligations and applicable law.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 border-l-4 border-brand-500 pl-4">Your Rights</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Access, correct, or delete your personal information.</li>
              <li>Opt-out of non-essential communications.</li>
              <li>Raise concerns or request details about data processing.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 border-l-4 border-brand-500 pl-4">Security</h2>
            <p className="text-gray-700 leading-relaxed text-justify">We take reasonable technical and organizational measures to protect data. However, no method of transmission or storage is 100% secure.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 border-l-4 border-brand-500 pl-4">Updates</h2>
            <p className="text-gray-700 leading-relaxed text-justify">We may update this policy from time to time. Changes will be posted on this page with an updated date.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 border-l-4 border-brand-500 pl-4">Contact</h2>
            <p className="text-gray-700">If you have questions, contact us at <a href="mailto:info@sivkaareca.com" className="text-brand-700 hover:underline">info@sivkaareca.com</a> or +91 8104478208 / +91 95912 53590.</p>
          </section>
        </div>
      </div>
    </>
  )
}