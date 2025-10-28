import { Link } from 'react-router-dom'
import { ButtonLink } from '../components/Button'
import ScrollReveal from '../components/ScrollReveal'
import SpotlightCard from '../components/SpotlightCard'
import { services } from '../data/services'

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Banner */}
      <section className="relative overflow-hidden rounded-xl">
        <div className="relative h-48 sm:h-56 md:h-72 lg:h-80 xl:h-96">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="h-full container grid items-center relative z-10">
            <div className="text-white text-center md:text-left">
              <ScrollReveal
                baseOpacity={0}
                enableBlur={true}
                baseRotation={5}
                blurStrength={10}
                textClassName="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold drop-shadow-lg"
              >
                Innovating Steel Structures with Precision & Excellence
              </ScrollReveal>
              <ScrollReveal as="p" mode="text" textTag="span" useDefaultTextStyles={false} containerClassName="mt-3 max-w-2xl drop-shadow-md" textClassName="text-white">From concept to commissioning—design, fabrication, installation, and project management under one roof.</ScrollReveal>
              <div className="mt-5 flex gap-3 justify-center md:justify-start">
                <ButtonLink to={`/services/${services[0].slug}`} variant="secondary">Our Services</ButtonLink>
                <ButtonLink to="/contact">Contact Us</ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="grid gap-6 sm:gap-8 md:grid-cols-2 items-center">
        <div>
          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            baseRotation={5}
            blurStrength={10}
            textClassName="text-2xl md:text-3xl font-semibold"
          >
            Welcome to Sivka Areca Enterprises
          </ScrollReveal>
          <p className="mt-3">
            We are an engineering and fabrication company delivering end-to-end steel structure solutions—from design to manufacturing and installation. Our customer-centric approach, focus on quality, and commitment to innovation enable reliable, cost-efficient results.
          </p>
        </div>
        <div className="h-36 sm:h-44 md:h-52 lg:h-64 bg-gray-100 rounded-lg grid place-content-center text-gray-600">Banner Image Placeholder</div>
      </section>

      {/* Key Services */}
      <section>
        <h2>Key Services</h2>
        <div className="mt-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {services.map((s) => (
            <SpotlightCard key={s.slug} className="rounded-2xl border border-gray-300 bg-white p-4 transition hover:ring-1 hover:ring-gray-200" spotlightColor="rgba(0, 0, 0, 0.08)">
              <ScrollReveal as="div" mode="block" containerClassName="">
                <h3 className="font-semibold text-gray-900">{s.title}</h3>
                <p className="text-sm text-gray-700">{s.intro}</p>
                <ButtonLink to={`/services/${s.slug}`} className="mt-3">Learn More</ButtonLink>
              </ScrollReveal>
            </SpotlightCard>
          ))}
        </div>
      </section>
    </div>
  )
}