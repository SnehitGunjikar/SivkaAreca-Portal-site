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
        <ScrollReveal baseOpacity={0} enableBlur={true} baseRotation={5} blurStrength={10} textClassName="text-gray-900">
          Manufacturing Setup
        </ScrollReveal>
        <ScrollReveal as="p" mode="text" textTag="span" useDefaultTextStyles={false} containerClassName="mt-2" textClassName="text-gray-800">We operate a robust facility tailored for end-to-end steel fabrication and finishing.</ScrollReveal>
        {/* <p className="mt-2 text-gray-300">We operate a robust facility tailored for end-to-end steel fabrication and finishing.</p> */}
        
        <ul className="mt-3 list-disc pl-5">
          <li>6,000 sq. ft fabrication area.</li>
          <li>20,000 sq. ft for coating, painting, and material storage</li>
        </ul>
      </section>

      <section>
        <ScrollReveal baseOpacity={0} enableBlur={true} baseRotation={5} blurStrength={10} textClassName="text-gray-900">
          Process Flow
        </ScrollReveal>
        <div className="mt-4 grid md:grid-cols-5 gap-4">
          {steps.map((s, idx) => (
            <SpotlightCard
              key={s}
              className="rounded-2xl border border-gray-300 bg-white p-4 text-center shadow-md shadow-brand-600/10 hover:bg-gray-50 transition-colors hover:ring-1 hover:ring-gray-200"
              spotlightColor="rgba(0, 0, 0, 0.08)"
            >
              <ScrollReveal as="div" mode="block" containerClassName="">
                <div className="text-3xl font-bold text-brand-600">{idx + 1}</div>
                <div className="mt-2 font-semibold text-gray-900">{s}</div>
              </ScrollReveal>
            </SpotlightCard>
          ))}
        </div>
      </section>
    </div>
  )
}