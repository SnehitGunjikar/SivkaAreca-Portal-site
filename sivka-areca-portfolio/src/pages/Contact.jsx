import { useState } from 'react'
import { Button } from '../components/Button'
import ScrollReveal from '../components/ScrollReveal'
import SpotlightCard from '../components/SpotlightCard'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return alert('Please fill all fields.')
    setSubmitted(true)
  }

  return (
    <div className="space-y-10">
      {/* Header and contact info */}
      <section className="grid md:grid-cols-2 gap-6">
        <SpotlightCard className="rounded-2xl border border-gray-300 bg-white p-6 shadow-md shadow-brand-600/10" spotlightColor="rgba(0, 0, 0, 0.08)">
          <ScrollReveal baseOpacity={0} enableBlur={true} baseRotation={5} blurStrength={10} textClassName="text-gray-900">Contact Us</ScrollReveal>
          <p className="mt-2 text-gray-800">Sivka Areca Enterprises</p>
          <p className="text-gray-800">G.P.C. No. 414/34, Shivaji Nagar, Khanapur - 591302, Belagavi, Karnataka</p>
          <p className="text-gray-800">GSTIN: 29FMNPP9114A1ZS</p>
          <div className="mt-4 grid gap-2">
            <a href="tel:+919686420150" className="inline-flex items-center gap-2 text-brand-600 hover:text-brand-700 transition-colors">+91 9686420150</a>
            <a href="tel:+919591253590" className="inline-flex items-center gap-2 text-brand-600 hover:text-brand-700 transition-colors">+91 9591253590</a>
            <a href="mailto:sivkaareca@gmail.com" className="inline-flex items-center gap-2 text-brand-600 hover:text-brand-700 transition-colors">sivkaareca@gmail.com</a>
          </div>
        </SpotlightCard>
        <SpotlightCard className="rounded-2xl border border-gray-300 bg-white p-6 shadow-md shadow-brand-600/10" spotlightColor="rgba(0, 0, 0, 0.08)">
          <ScrollReveal as="div" mode="block" containerClassName="">
            <h3 className="text-gray-900">Business Hours</h3>
            <ul className="mt-2 space-y-1 text-gray-800">
              <li>Mon–Sat: 9:00 AM – 6:00 PM</li>
              <li>Sunday: Closed</li>
            </ul>
            <p className="mt-4 text-gray-700">We aim to respond within 24 hours.</p>
          </ScrollReveal>
        </SpotlightCard>
      </section>

      {/* Contact form */}
      <SpotlightCard className="rounded-2xl border border-gray-300 bg-white p-6 shadow-md shadow-brand-600/10" spotlightColor="rgba(0, 0, 0, 0.08)">
        <section>
          <ScrollReveal baseOpacity={0} enableBlur={true} baseRotation={5} blurStrength={10} textClassName="text-gray-900">Send us a message</ScrollReveal>
          {submitted ? (
            <div className="mt-4 p-4 rounded-lg border border-brand-600/30 bg-brand-600/10 text-brand-700">Thank you! We will get back to you soon.</div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-5 grid md:grid-cols-2 gap-4">
              {/* Name */}
              <div className="relative group">
                <input
                  name="name"
                  type="text"
                  placeholder=" "
                  value={form.name}
                  onChange={handleChange}
                  className="peer w-full rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-transparent px-3 py-3 focus:outline-none focus:ring-2 focus:ring-brand-600/50 focus:border-brand-600/40 transition"
                />
                <label className="absolute left-3 top-3 text-gray-600 transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-brand-600">Name</label>
              </div>

              {/* Email */}
              <div className="relative group">
                <input
                  name="email"
                  type="email"
                  placeholder=" "
                  value={form.email}
                  onChange={handleChange}
                  className="peer w-full rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-transparent px-3 py-3 focus:outline-none focus:ring-2 focus:ring-brand-600/50 focus:border-brand-600/40 transition"
                />
                <label className="absolute left-3 top-3 text-gray-600 transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-brand-600">Email</label>
              </div>

              {/* Message */}
              <div className="relative group md:col-span-2">
                <textarea
                  name="message"
                  placeholder=" "
                  value={form.message}
                  onChange={handleChange}
                  className="peer w-full rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-transparent px-3 py-3 h-32 focus:outline-none focus:ring-2 focus:ring-brand-600/50 focus:border-brand-600/40 transition"
                />
                <label className="absolute left-3 top-3 text-gray-600 transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-brand-600">Message</label>
                <p className="mt-2 text-xs text-gray-600">Tell us briefly about your requirement. Include expected timelines if known.</p>
              </div>

              <div className="md:col-span-2 flex items-center gap-3">
                <Button type="submit" className="shadow-sm shadow-brand-600/30">Submit</Button>
                <span className="text-xs text-gray-500">We respect your privacy and will never share your details.</span>
              </div>
            </form>
          )}
        </section>
      </SpotlightCard>
    </div>
  )
}