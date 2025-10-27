import { useParams, Link } from 'react-router-dom'
import { services } from '../data/services'
import ScrollReveal from '../components/ScrollReveal'

export default function ServiceDetail() {
  const { slug } = useParams()
  const service = services.find((s) => s.slug === slug)

  if (!service) {
    return (
      <div>
        <p>Service not found!</p>
        <Link to="/" className="text-brand-600">Back to Home</Link>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <Link to="/" className="text-brand-400">← Back to Home</Link>
      <ScrollReveal baseOpacity={0} enableBlur={true} baseRotation={5} blurStrength={10} textClassName="text-gray-900">{service.title}</ScrollReveal>
      <ScrollReveal as="p" mode="text" textTag="span" useDefaultTextStyles={false} textClassName="text-gray-800">{service.intro}</ScrollReveal>
      <ul className="list-disc pl-5 space-y-1 text-gray-800">
        {service.details.map((d) => (
          <li key={d}>{d}</li>
        ))}
      </ul>
      <ScrollReveal as="div" mode="block" containerClassName="h-40 bg-white/10 rounded grid place-content-center text-gray-600">Detail Image Placeholder</ScrollReveal>
    </div>
  )
}