export default function About() {
  return (
    <div className="space-y-8">
      <section>
        <h2>About Us</h2>
        <p className="mt-2">
          Sivka Areca Enterprises delivers comprehensive steel solutions spanning design, fabrication, and installation. We collaborate closely with clients to translate concepts into durable, compliant, and cost-effective structures.
        </p>
      </section>

      <section>
        <h2>Vision</h2>
        <p className="mt-2">To be a trusted partner for engineered steel infrastructure, recognized for innovation, quality, and customer focus.</p>
      </section>

      <section>
        <h2>Quality Policy</h2>
        <p className="mt-2">We adhere to stringent QA/QC across design, fabrication, and site work—complying with relevant codes, using certified materials, and maintaining documented inspections.</p>
      </section>

      <section>
        <h2>Market Opportunity</h2>
        <p className="mt-2">Growing demand for steel-intensive projects across industrial facilities, public infrastructure, and private developments creates opportunities for reliable, fast-tracked delivery.</p>
      </section>

      <section>
        <h2>Financial Outlook</h2>
        <p className="mt-2">Sustainable growth through operational efficiency, optimized material utilization, and a diversified project portfolio.</p>
      </section>

      <section className="grid md:grid-cols-3 gap-4">
        <div className="h-36 bg-gray-100 rounded grid place-content-center text-gray-500">Fabrication Image</div>
        <div className="h-36 bg-gray-100 rounded grid place-content-center text-gray-500">Engineering Team</div>
        <div className="h-36 bg-gray-100 rounded grid place-content-center text-gray-500">Installation Crew</div>
      </section>
    </div>
  )
}