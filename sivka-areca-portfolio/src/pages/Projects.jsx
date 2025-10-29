import { projects } from '../data/projects'
import { ButtonLink } from '../components/Button'
import ScrollReveal from '../components/ScrollReveal'
import SpotlightCard from '../components/SpotlightCard'
import railwayImg from '../assets/imagedata/products-image/railway-staircase-img.JPG'
import pebImage from '../assets/imagedata/products-image/peb-image.PNG'
import containerImage from '../assets/imagedata/products-image/contairner-img.JPG'
import towerImage from '../assets/imagedata/products-image/tower-img.JPG'
import sheetmetalImage from '../assets/imagedata/products-image/sheetmetal-img.jpg'

const projectImages = {
  'government-railway-projects-swr': railwayImg,
  'pre-engineered-building-peb': pebImage,
  'customized-container': containerImage,
  'exhaust-towers': towerImage,
  'sheet-metal-works-ntpc': sheetmetalImage,
}

export default function Projects() {
  return (
    <div>
      <ScrollReveal baseOpacity={0} enableBlur={true} baseRotation={5} blurStrength={10} textClassName="text-gray-900">
        Projects
      </ScrollReveal>
      <ScrollReveal as="p" mode="text" textTag="span" useDefaultTextStyles={false} containerClassName="mt-2" textClassName="text-gray-800">Where vision meets precision—every project is a testament to craftsmanship, innovation, and relentless attention to detail.</ScrollReveal>
      <div className="mt-4 grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
        {projects.map((pr) => (
          <SpotlightCard key={pr.slug} className="relative rounded-2xl border border-gray-300 bg-white p-4 pb-16 h-full transition hover:ring-1 hover:ring-gray-200" spotlightColor="rgba(0, 0, 0, 0.08)">
            <ScrollReveal as="div" mode="block" containerClassName="">
              <div className="relative w-full aspect-[4/3] rounded mb-3 overflow-hidden">
                <img src={projectImages[pr.slug]} alt={pr.title} loading="lazy" className="w-full h-full object-cover brightness-[0.98] transition-transform duration-300 ease-out hover:scale-[1.02]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-black/5 to-transparent" />
              </div>
              <h3 className="font-semibold text-gray-900" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{pr.title}</h3>
              <p className="text-sm text-gray-700" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{pr.description}</p>
            </ScrollReveal>
            <ButtonLink to={`/projects/${pr.slug}`} className="absolute bottom-4 left-4 z-10">View Details</ButtonLink>
          </SpotlightCard>
        ))}
      </div>
    </div>
  )
}