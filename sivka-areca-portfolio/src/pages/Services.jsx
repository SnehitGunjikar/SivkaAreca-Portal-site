import { Link } from 'react-router-dom'
import { services } from '../data/services'

export default function Services() {
  return (
    <div>
      <h2>Our Services</h2>
      <p className="mt-2 text-gray-700">Explore our core competencies from SKA 13P.</p>
      <div className="mt-4 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {services.map((s) => (
          <div key={s.slug} className="border rounded-lg p-4 flex flex-col">
            <div className="h-28 bg-gray-100 rounded mb-3 grid place-content-center text-gray-500">Image</div>
            <h3 className="font-semibold">{s.title}</h3>
            <p className="text-sm text-gray-600 flex-1">{s.intro}</p>
            <Link to={`/services/${s.slug}`} className="mt-3 inline-block bg-brand-600 text-white px-3 py-2 rounded">View Details</Link>
          </div>
        ))}
      </div>
    </div>
  )
}