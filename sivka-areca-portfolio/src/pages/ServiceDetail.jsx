import { useParams, Link } from 'react-router-dom'
import { services } from '../data/services'

export default function ServiceDetail() {
  const { slug } = useParams()
  const service = services.find((s) => s.slug === slug)

  if (!service) {
    return (
      <div>
        <p>Service not found.</p>
        <Link to="/services" className="text-brand-600">Back to Services</Link>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <Link to="/services" className="text-brand-600">← Back to Services</Link>
      <h2>{service.title}</h2>
      <p className="text-gray-700">{service.intro}</p>
      <ul className="list-disc pl-5 space-y-1">
        {service.details.map((d) => (
          <li key={d}>{d}</li>
        ))}
      </ul>
      <div className="h-40 bg-gray-100 rounded grid place-content-center text-gray-500">Detail Image Placeholder</div>
    </div>
  )
}