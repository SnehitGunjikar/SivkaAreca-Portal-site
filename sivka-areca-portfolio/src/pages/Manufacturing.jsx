import ScrollReveal from '../components/ScrollReveal'
import SpotlightCard from '../components/SpotlightCard'

export default function Manufacturing() {
  const steps = [
    'Conceptual Design',
    'Drawing Proposal',
    'Quotation & Work Agreement',
    'Manufacture',
    'Shipping & Erection',
  ]

  return (
    <div className="space-y-8">
      <section>
        <ScrollReveal baseOpacity={0} enableBlur={true} baseRotation={5} blurStrength={10} textClassName="text-white">
          Manufacturing Setup
        </ScrollReveal>
        <ScrollReveal as="p" mode="text" textTag="span" useDefaultTextStyles={false} containerClassName="mt-2" textClassName="text-gray-300">We operate a robust facility tailored for end-to-end steel fabrication and finishing.</ScrollReveal>
        {/* <p className="mt-2 text-gray-300">We operate a robust facility tailored for end-to-end steel fabrication and finishing.</p> */}
        
        <ul className="mt-3 list-disc pl-5">
          <li>6,000 sq. ft fabrication area.</li>
          <li>20,000 sq. ft for coating, painting, and material storage</li>
        </ul>
      </section>

      <section>
        <ScrollReveal baseOpacity={0} enableBlur={true} baseRotation={5} blurStrength={10} textClassName="text-white">
          Process Flow
        </ScrollReveal>
        <div className="mt-4 grid md:grid-cols-5 gap-4">
          {steps.map((s, idx) => (
            <SpotlightCard
              key={s}
              className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center shadow-md shadow-brand-600/10 hover:bg-white/10 transition-colors hover:ring-1 hover:ring-white/10"
              spotlightColor="rgba(0, 229, 255, 0.2)"
            >
              <ScrollReveal as="div" mode="block" containerClassName="">
                <div className="text-3xl font-bold text-brand-600">{idx + 1}</div>
                <div className="mt-2 font-semibold text-white">{s}</div>
              </ScrollReveal>
            </SpotlightCard>
          ))}
        </div>
      </section>
    </div>
  )
}