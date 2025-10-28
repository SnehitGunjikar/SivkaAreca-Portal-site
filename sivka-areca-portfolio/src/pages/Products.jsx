import { Link } from 'react-router-dom'
import { products } from '../data/products'
import { ButtonLink } from '../components/Button'
import ScrollReveal from '../components/ScrollReveal'
import SpotlightCard from '../components/SpotlightCard'

export default function Products() {
  return (
    <div>
      <ScrollReveal baseOpacity={0} enableBlur={true} baseRotation={5} blurStrength={10} textClassName="text-gray-900">
        Core Expertise
      </ScrollReveal>
      <ScrollReveal as="p" mode="text" textTag="span" useDefaultTextStyles={false} containerClassName="mt-2" textClassName="text-gray-800">Steel solutions and components portfolio.</ScrollReveal>
      <div className="mt-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((p) => (
          <SpotlightCard key={p.slug} className="relative rounded-2xl border border-gray-300 bg-white p-4 pb-16 flex flex-col transition hover:ring-1 hover:ring-gray-200" spotlightColor="rgba(0, 0, 0, 0.08)">
            <ScrollReveal as="div" mode="block" containerClassName="">
              <div className="h-24 sm:h-28 lg:h-32 bg-gray-100 rounded mb-3 grid place-content-center text-gray-600">Image</div>
              <h3 className="font-semibold text-gray-900">{p.title}</h3>
              <ul className="text-sm text-gray-700 list-disc pl-5 flex-1">
                {p.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </ScrollReveal>
            {/* Pin Read More to bottom-left of the card, outside animated block */}
            <ButtonLink to={`/products/${p.slug}`} className="absolute bottom-4 left-4 z-10">Read More</ButtonLink>
          </SpotlightCard>
        ))}
      </div>
    </div>
  )
}