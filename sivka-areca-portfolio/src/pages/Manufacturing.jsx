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
        <h2>Manufacturing Setup</h2>
        <p className="mt-2 text-gray-700">We operate a robust facility tailored for end-to-end steel fabrication and finishing.</p>
        <ul className="mt-3 list-disc pl-5">
          <li>6,000 sq. ft fabrication area</li>
          <li>20,000 sq. ft for coating, painting, and material storage</li>
        </ul>
      </section>

      <section>
        <h2>Process Flow</h2>
        <div className="mt-4 grid md:grid-cols-5 gap-4">
          {steps.map((s, idx) => (
            <div key={s} className="border rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-brand-600">{idx + 1}</div>
              <div className="mt-2 font-semibold">{s}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}