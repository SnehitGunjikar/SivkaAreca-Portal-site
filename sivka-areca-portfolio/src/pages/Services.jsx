import { Link } from 'react-router-dom'
import { services } from '../data/services'
import { ButtonLink } from '../components/Button'

export default function Services() {
  return (
    <div>
      <h2>Our Services</h2>
      <p className="mt-2 text-gray-300">Discover the solutions that power your next big idea.</p>
      <div className="mt-4 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {services.map((s) => (
          <div key={s.slug} className="border border-white/10 bg-white/5 rounded-lg p-4 flex flex-col">
            <div className="h-28 bg-white/10 rounded mb-3 grid place-content-center text-gray-300">Image</div>
            <h3 className="font-semibold text-white">{s.title}</h3>
            <p className="text-sm text-gray-400 flex-1">{s.intro}</p>
            <ButtonLink to={`/services/${s.slug}`} className="mt-3">View Details</ButtonLink>
          </div>
        ))}
      </div>
    </div>
  )
}