import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Banner */}
      <section className="relative overflow-hidden rounded-xl">
        <div className="h-56 md:h-72 bg-gradient-to-r from-brand-600 to-brand-400 grid place-content-center text-center text-white">
          <h1 className="text-2xl md:text-4xl font-bold">Innovating Steel Structures with Precision & Excellence</h1>
        </div>
      </section>

      {/* Introduction */}
      <section className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2>Welcome to Sivka Areca Enterprises</h2>
          <p className="mt-3">
            We are an engineering and fabrication company delivering end-to-end steel structure solutions—from design to manufacturing and installation. Our customer-centric approach, focus on quality, and commitment to innovation enable reliable, cost-efficient results.
          </p>
        </div>
        <div className="h-44 bg-gray-100 rounded-lg grid place-content-center text-gray-500">Banner Image Placeholder</div>
      </section>

      {/* Key Services */}
      <section>
        <h2>Key Services</h2>
        <div className="mt-4 grid md:grid-cols-4 gap-4">
          {[
            { title: 'Design Expertise', desc: 'Concept-to-detail engineering.' },
            { title: 'Fabrication Excellence', desc: 'Precision fabrication and QA.' },
            { title: 'Installation Mastery', desc: 'Safe, efficient erection.' },
            { title: 'Project Management', desc: 'End-to-end delivery.' },
          ].map((s) => (
            <div key={s.title} className="border rounded-lg p-4">
              <h3 className="font-semibold">{s.title}</h3>
              <p className="text-sm text-gray-600">{s.desc}</p>
              <Link to="/services" className="mt-3 inline-block bg-brand-600 text-white px-3 py-2 rounded">Learn More</Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}