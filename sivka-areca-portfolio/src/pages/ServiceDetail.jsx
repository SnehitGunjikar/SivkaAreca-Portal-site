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
    <div className="space-y-4 sm:space-y-6 lg:space-y-8">
      <Link to="/" className="text-brand-400 text-sm sm:text-base hover:text-brand-600 transition-colors">← Back to Home</Link>
      <ScrollReveal 
        baseOpacity={0} 
        enableBlur={true} 
        baseRotation={5} 
        blurStrength={10} 
        textClassName="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900"
      >
        {service.title}
      </ScrollReveal>
      <ScrollReveal 
        as="p" 
        mode="text" 
        textTag="span" 
        useDefaultTextStyles={false} 
        textClassName="text-sm sm:text-base lg:text-lg text-gray-800 leading-relaxed"
      >
        {service.intro}
      </ScrollReveal>
      <ul className="list-disc pl-4 sm:pl-5 lg:pl-6 space-y-1 sm:space-y-2 text-sm sm:text-base text-gray-800">
        {service.details.map((d) => (
          <li key={d} className="leading-relaxed">{d}</li>
        ))}
      </ul>
      <ScrollReveal 
        as="div" 
        mode="block" 
        containerClassName="rounded-lg overflow-hidden bg-white border border-gray-200 shadow-sm"
      >
        <img 
          src={serviceImages[service.slug]} 
          alt={`${service.title} illustration`}
          className="w-full h-40 sm:h-48 md:h-64 lg:h-80 object-contain bg-gray-50"
        />
      </ScrollReveal>
    </div>
  )
}