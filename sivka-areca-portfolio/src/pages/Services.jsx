import { Link } from 'react-router-dom'
import { services } from '../data/services'
import { ButtonLink } from '../components/Button'
import ScrollReveal from '../components/ScrollReveal'
import SpotlightCard from '../components/SpotlightCard'

export default function Services() {
  return (
    <div>
      <ScrollReveal baseOpacity={0} enableBlur={true} baseRotation={5} blurStrength={10} textClassName="text-white">
        Our Services
      </ScrollReveal>
      <ScrollReveal as="p" mode="text" textTag="span" useDefaultTextStyles={false} containerClassName="mt-2" textClassName="text-gray-300">Discover the solutions that power your next big idea.</ScrollReveal>
      <div className="mt-4 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {services.map((s) => (
          <SpotlightCard key={s.slug} className="rounded-2xl border border-white/10 bg-white/5 p-4 flex flex-col transition hover:ring-1 hover:ring-white/10" spotlightColor="rgba(0, 229, 255, 0.2)">
            <ScrollReveal as="div" mode="block" containerClassName="">
              <div className="h-28 bg-white/10 rounded mb-3 grid place-content-center text-gray-300">Image</div>
              <h3 className="font-semibold text-white">{s.title}</h3>
              <p className="text-sm text-gray-400 flex-1">{s.intro}</p>
              <ButtonLink to={`/services/${s.slug}`} className="mt-3">View Details</ButtonLink>
            </ScrollReveal>
          </SpotlightCard>
        ))}
      </div>
    </div>
  )
}