import { useParams, Link } from 'react-router-dom'
import { services } from '../data/services'
import ScrollReveal from '../components/ScrollReveal'

// Import service images
import designExpertiseImg from '../assets/imagedata/services/design-expertise.svg'
import fabricationExcellenceImg from '../assets/imagedata/services/fabrication-excellence.svg'
import installationMasteryImg from '../assets/imagedata/services/installation-mastery.svg'
import projectManagementImg from '../assets/imagedata/services/project-management.svg'

// Map service slugs to their images
const serviceImages = {
  'design-expertise': designExpertiseImg,
  'fabrication-excellence': fabricationExcellenceImg,
  'installation-mastery': installationMasteryImg,
  'project-management': projectManagementImg,
}

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
      <ScrollReveal as="div" mode="block" containerClassName="rounded-lg overflow-hidden bg-white border border-gray-200 shadow-sm">
        <img 
          src={serviceImages[service.slug]} 
          alt={`${service.title} illustration`}
          className="w-full h-64 object-contain bg-gray-50"
        />
      </ScrollReveal>
    </div>
  )
}