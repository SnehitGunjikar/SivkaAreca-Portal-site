import { Link } from 'react-router-dom'
import { ButtonLink } from '../components/Button'
import ScrollReveal from '../components/ScrollReveal'
import SpotlightCard from '../components/SpotlightCard'
import { services } from '../data/services'
import { FaUsers, FaEye, FaShieldHalved, FaHeart } from 'react-icons/fa6'

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Banner */}
      <section className="relative overflow-hidden rounded-xl">
        <div className="relative min-h-56 sm:min-h-64 md:min-h-80 lg:min-h-[22rem] xl:min-h-[26rem] py-6 sm:py-8 md:py-10">
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
              {/* Company Motto */}
              <ScrollReveal
                as="p"
                mode="text"
                textTag="span"
                useDefaultTextStyles={false}
                containerClassName="mt-2"
                textClassName="tracking-wide text-white/90 text-xs sm:text-sm md:text-base"
              >
                PRECISION FABRICATION | TRUSTED EXECUTION | ENGINEERING EXCELLENCE
              </ScrollReveal>
              <ScrollReveal as="p" mode="text" textTag="span" useDefaultTextStyles={false} containerClassName="mt-3 max-w-2xl drop-shadow-md" textClassName="text-white">From concept to commissioning—design, fabrication, installation, and project management under one roof.</ScrollReveal>
              <div className="mt-5 flex flex-wrap gap-3 justify-center md:justify-start">
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

      {/* About section blocks */}
      <section aria-labelledby="about-blocks">
        <div className="grid md:grid-cols-2 gap-4">
          {/* About us */}
          <SpotlightCard className="rounded-2xl border border-gray-300 bg-white p-6" spotlightColor="rgba(0, 0, 0, 0.08)">
            <ScrollReveal as="div" mode="block" containerClassName="">
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-gray-100 text-brand-700 ring-1 ring-gray-200">
                  <FaUsers className="h-5 w-5" aria-hidden="true" />
                </span>
                <ScrollReveal baseOpacity={0} enableBlur={true} baseRotation={5} blurStrength={10} textClassName="text-gray-900 text-xl font-semibold">
                  About us
                </ScrollReveal>
              </div>
              <p className="text-gray-700 leading-relaxed text-justify">
                Sivka Areca Enterprises is well-equipped to deliver structural projects, producing pre-engineered buildings tailored to client requirements. We have executed diverse projects including PEB structures, foot-over bridges (FOB), and DG exhaust towers across multiple locations.
              </p>
              <p className="text-gray-700 leading-relaxed mt-3 text-justify">
                We work with predetermined technical specifications or assess client needs to fabricate customized parts. We handle:
              </p>
              <ul className="list-disc pl-5 mt-2 text-gray-700">
                <li>Precise cost assessment</li>
                <li>Design of customized parts and connections</li>
                <li>Structural drawings</li>
              </ul>
            </ScrollReveal>
          </SpotlightCard>

          {/* Our vision */}
          <SpotlightCard className="rounded-2xl border border-gray-300 bg-white p-6" spotlightColor="rgba(0, 0, 0, 0.08)">
            <ScrollReveal as="div" mode="block" containerClassName="">
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-gray-100 text-brand-700 ring-1 ring-gray-200">
                  <FaEye className="h-5 w-5" aria-hidden="true" />
                </span>
                <ScrollReveal baseOpacity={0} enableBlur={true} baseRotation={5} blurStrength={10} textClassName="text-gray-900 text-xl font-semibold">
                  Our vision
                </ScrollReveal>
              </div>
              <p className="text-gray-700 leading-relaxed text-justify">
                Specializing in structural engineering, PEB fabrication, and steel fabrication. We strive to supply high‑quality steel structures while providing related services and solutions—focused on continuous improvement, high business standards, and strong work ethics.
              </p>
            </ScrollReveal>
          </SpotlightCard>

          {/* Quality policy */}
          <SpotlightCard className="rounded-2xl border border-gray-300 bg-white p-6" spotlightColor="rgba(0, 0, 0, 0.08)">
            <ScrollReveal as="div" mode="block" containerClassName="">
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-gray-100 text-brand-700 ring-1 ring-gray-200">
                  <FaShieldHalved className="h-5 w-5" aria-hidden="true" />
                </span>
                <ScrollReveal baseOpacity={0} enableBlur={true} baseRotation={5} blurStrength={10} textClassName="text-gray-900 text-xl font-semibold">
                  Quality policy
                </ScrollReveal>
              </div>
              <p className="text-gray-700 leading-relaxed text-justify">
                We embrace accurate manufacturing and systematic technology. Quality is integral to our commitment to deliver excellent products and services that meet or exceed customer expectations across design, fabrication, and site work.
              </p>
            </ScrollReveal>
          </SpotlightCard>

          {/* Customer‑centric approach */}
          <SpotlightCard className="rounded-2xl border border-gray-300 bg-white p-6" spotlightColor="rgba(0, 0, 0, 0.08)">
            <ScrollReveal as="div" mode="block" containerClassName="">
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-gray-100 text-brand-700 ring-1 ring-gray-200">
                  <FaHeart className="h-5 w-5" aria-hidden="true" />
                </span>
                <ScrollReveal baseOpacity={0} enableBlur={true} baseRotation={5} blurStrength={10} textClassName="text-gray-900 text-xl font-semibold">
                  Customer‑centric approach
                </ScrollReveal>
              </div>
              <p className="text-gray-700 leading-relaxed text-justify">
                Clients’ needs are at the heart of our operations. We collaborate closely with stakeholders to understand their vision and tailor solutions to their specific requirements—ensuring clarity, reliability, and effective delivery.
              </p>
            </ScrollReveal>
          </SpotlightCard>
        </div>
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