import { useState } from 'react'
import { Button } from '../components/Button'

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
    <div className="space-y-8">
      <section>
        <h2>Contact</h2>
        <p className="mt-2 text-gray-700">Sivka Areca Enterprises</p>
        <p className="text-gray-700">G.P.C. No. 414/34, Shivaji Nagar, Khanapur - 591302, Belagavi, Karnataka</p>
        <p className="text-gray-700">GSTIN: 29FMNPP9114A1ZS</p>
        <p className="text-gray-700">Contact: +91 9686420150, +91 9591253590</p>
        <p className="text-gray-700">Email: sivkaareca@gmail.com</p>
      </section>

      <section>
        <h2>Send us a message</h2>
        {submitted ? (
          <div className="p-4 border rounded bg-green-50 text-green-700">Thank you! We will get back to you soon.</div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-3 grid gap-3 max-w-lg">
            <input
              name="name"
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              className="border rounded px-3 py-2"
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="border rounded px-3 py-2"
            />
            <textarea
              name="message"
              placeholder="Message"
              value={form.message}
              onChange={handleChange}
              className="border rounded px-3 py-2 h-32"
            />
            <Button type="submit">Submit</Button>
          </form>
        )}
      </section>
    </div>
  )
}