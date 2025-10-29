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
          Manufacturing infrastructure
        </ScrollReveal>
        <ScrollReveal as="p" mode="text" textTag="span" useDefaultTextStyles={false} containerClassName="mt-2" textClassName="text-gray-800">Our production unit is equipped to handle complex fabrication requirements and high-volume manufacturing.</ScrollReveal>
        <ul className="mt-3 list-disc pl-5 space-y-1 text-gray-800">
          <li>Fabrication shop area: 6,000 sq. ft.</li>
          <li>Auxiliary facility area: 20,000 sq. ft. for job cleaning, protective coating, painting, and storage of raw/finished goods.</li>
          <li>Skilled workforce: 15+ experienced shop-floor personnel and 20+ trained site installation workers.</li>
          <li>Welding & inspection: Certified welders with client-supervised testing for every project.</li>
          <li>Quality assurance: All fabrication undergoes dimensional checks, welding inspections, and material traceability.</li>
          <li>Client approvals: Our works have been successfully tested and certified by Railway government officials and project engineers.</li>
        </ul>
      </section>

      <section>
        <ScrollReveal baseOpacity={0} enableBlur={true} baseRotation={5} blurStrength={10} textClassName="text-gray-900">
          Our strengths
        </ScrollReveal>
        <ul className="mt-3 list-disc pl-5 space-y-1 text-gray-800">
          <li>In-house design validation & GA support.</li>
          <li>Skilled welding and assembly teams.</li>
          <li>ISO-compliant fabrication process.</li>
          <li>Adaptability to client specifications & timelines.</li>
          <li>Transparent documentation and quality traceability.</li>
          <li>Strong track record with government and industrial clients.</li>
        </ul>
      </section>

      <section>
        <ScrollReveal baseOpacity={0} enableBlur={true} baseRotation={5} blurStrength={10} textClassName="text-gray-900">
          Process Flow
        </ScrollReveal>
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {steps.map((s, idx) => (
            <SpotlightCard
              key={s}
              className="rounded-2xl border border-gray-300 bg-white p-4 text-center shadow-md shadow-brand-600/10 hover:bg-gray-50 transition-colors hover:ring-1 hover:ring-gray-200"
              spotlightColor="rgba(0, 0, 0, 0.08)"
            >
              <ScrollReveal as="div" mode="block" containerClassName="">
                <div className="text-2xl sm:text-3xl font-bold text-brand-600">{idx + 1}</div>
                <div className="mt-2 font-semibold text-gray-900">{s}</div>
              </ScrollReveal>
            </SpotlightCard>
          ))}
        </div>
      </section>
    </div>
  )
}