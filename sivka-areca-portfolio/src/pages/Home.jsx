import { Link } from 'react-router-dom'
import { ButtonLink } from '../components/Button'
import ScrollReveal from '../components/ScrollReveal'

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Banner */}
      <section className="relative overflow-hidden rounded-xl">
        <div className="relative h-64 md:h-80">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="h-full container grid items-center relative z-10">
            <div className="text-white text-center md:text-left">
              <ScrollReveal
                baseOpacity={0}
                enableBlur={true}
                baseRotation={5}
                blurStrength={10}
                textClassName="text-3xl md:text-5xl font-bold drop-shadow-lg"
              >
                Innovating Steel Structures with Precision & Excellence
              </ScrollReveal>
              <ScrollReveal as="p" mode="text" textTag="span" useDefaultTextStyles={false} containerClassName="mt-3 max-w-2xl drop-shadow-md" textClassName="text-white">From concept to commissioning—design, fabrication, installation, and project management under one roof.</ScrollReveal>
              <div className="mt-5 flex gap-3 justify-center md:justify-start">
                <ButtonLink to="/services" variant="secondary">Our Services</ButtonLink>
                <ButtonLink to="/contact">Contact Us</ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="grid md:grid-cols-2 gap-8 items-center">
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
        <div className="h-44 bg-white/10 rounded-lg grid place-content-center text-gray-300">Banner Image Placeholder</div>
      </section>

      {/* Key Services */}
      <section>
        <h2>Key Services</h2>
        <div className="mt-4 grid md:grid-cols-4 gap-4">
          {[
            { title: 'Design Expertise', desc: 'Concept-to-detail engineering.' },
            { title: 'Fabrication Excellence', desc: 'Precision fabrication and QA.' },
            { title: 'Installation Mastery', desc: 'Safe, efficient erection.' },
            { title: 'Project Management', desc: 'End-to-end delivery.' },
          ].map((s) => (
            <ScrollReveal key={s.title} as="div" mode="block" containerClassName="border border-white/10 bg-white/5 rounded-lg p-4 transition hover:ring-1 hover:ring-white/10">
              <h3 className="font-semibold text-white">{s.title}</h3>
              <p className="text-sm text-gray-400">{s.desc}</p>
              <ButtonLink to="/services" className="mt-3">Learn More</ButtonLink>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  )
}