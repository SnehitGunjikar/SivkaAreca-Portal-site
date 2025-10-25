import { Link } from 'react-router-dom'
import { products } from '../data/products'
import { ButtonLink } from '../components/Button'
import ScrollReveal from '../components/ScrollReveal'
import SpotlightCard from '../components/SpotlightCard'

export default function Products() {
  return (
    <div>
      <ScrollReveal baseOpacity={0} enableBlur={true} baseRotation={5} blurStrength={10} textClassName="text-white">
        Products
      </ScrollReveal>
      <ScrollReveal as="p" mode="text" textTag="span" useDefaultTextStyles={false} containerClassName="mt-2" textClassName="text-gray-300">Steel solutions and components portfolio.</ScrollReveal>
      <div className="mt-4 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((p) => (
          <SpotlightCard key={p.slug} className="relative rounded-2xl border border-white/10 bg-white/5 p-4 pb-16 flex flex-col transition hover:ring-1 hover:ring-white/10" spotlightColor="rgba(0, 229, 255, 0.2)">
            <ScrollReveal as="div" mode="block" containerClassName="">
              <div className="h-28 bg-white/10 rounded mb-3 grid place-content-center text-gray-300">Image</div>
              <h3 className="font-semibold text-white">{p.title}</h3>
              <ul className="text-sm text-gray-400 list-disc pl-5 flex-1">
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