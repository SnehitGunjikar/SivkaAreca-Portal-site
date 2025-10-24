import ScrollReveal from '../components/ScrollReveal'

export default function About() {
  return (
    <div className="space-y-8">
      <section>
        <ScrollReveal baseOpacity={0} enableBlur={true} baseRotation={5} blurStrength={10} textClassName="text-white">
          About Us
        </ScrollReveal>
        <ScrollReveal as="p" mode="text" textTag="span" useDefaultTextStyles={false} containerClassName="mt-2" textClassName="text-justify text-gray-300">
          Sivka Areca Enterprises is a dynamic and innovative steel structural project 
enterprise poised to revolutionize the construction industry with its cutting-edge 
solutions and exceptional service quality. Our company specializes in the design, 
fabrication, and installation of high-quality steel structures for a wide range of 
commercial, industrial, and residential projects. With a commitment to excellence 
and a customer-centric approach, Sivka Areca Enterprises is well-positioned to 
become a leader in the steel construction sector. 
Sivka Areca Enterprises brings together a team of skilled engineers, architects, and 
industry experts dedicated to delivering unparalleled steel structural solutions. Our 
company prides itself on its ability to provide tailored designs that meet the unique 
requirements of each project, ensuring both functionality and aesthetics. 
        </ScrollReveal>
      </section>

      <section>
        <ScrollReveal baseOpacity={0} enableBlur={true} baseRotation={5} blurStrength={10} textClassName="text-white">
          Vision
        </ScrollReveal>
        <ScrollReveal as="p" mode="text" textTag="span" useDefaultTextStyles={false} containerClassName="mt-2" textClassName="text-gray-300">Specializing in Structural Engineering, PEB Fabrication & Steel Fabrication. 
To supply high-quality steel structures, providing related services and solutions. 
Focused on continuous improvement at highest business standards & work ethics.</ScrollReveal>
      </section>

      <section>
        <ScrollReveal baseOpacity={0} enableBlur={true} baseRotation={5} blurStrength={10} textClassName="text-white">
          Quality Policy
        </ScrollReveal>
        <ScrollReveal as="p" mode="text" textTag="span" useDefaultTextStyles={false} containerClassName="mt-2" textClassName="text-gray-300"> We are at accurate manufacturing & systematic technology; Quality 
is the integral part of our commitment to providing excellent products & services 
that match or exceed customer's expectations. We adhere to stringent QA/QC across 
design, fabrication, and site work—complying with relevant codes, using certified 
materials, and maintaining documented inspections.
        </ScrollReveal>
      </section>

      <section>
        <ScrollReveal baseOpacity={0} enableBlur={true} baseRotation={5} blurStrength={10} textClassName="text-white">
          Market Opportunity
        </ScrollReveal>
        <ScrollReveal as="p" mode="text" textTag="span" useDefaultTextStyles={false} containerClassName="mt-2" textClassName="text-gray-300">The global construction industry is witnessing a growing 
demand for innovative and cost-effective building solutions. Steel structures offer 
numerous advantages, including faster construction times, enhanced durability, and 
design flexibility. Sivka Areca Enterprises aims to capitalize on this market 
opportunity by delivering exceptional steel structural solutions to clients across 
various sectors, including commercial, industrial, and residential projects. 
We understand the unique needs of each client and work closely with them to develop 
customized solutions that meet their specific requirements. Whether it's a large-scale 
infrared project or a small-scale residential construction, Sivka Areca Enterprises 
has the expertise and experience to deliver high-quality results on time and within 
budget.
        </ScrollReveal>
      </section>

      <section>
        <ScrollReveal baseOpacity={0} enableBlur={true} baseRotation={5} blurStrength={10} textClassName="text-white">
          Financial Outlook
        </ScrollReveal>
        <ScrollReveal as="p" mode="text" textTag="span" useDefaultTextStyles={false} containerClassName="mt-2" textClassName="text-gray-300">Sivka Areca Enterprises anticipates robust growth in revenue and 
profitability over the next several years. By expanding our client base, diversifying 
our project portfolio, and continuously improving our processes, we are confident 
in our ability to achieve sustainable financial success. With a strong focus on 
customer satisfaction and long-term relationships, Sivka Areca Enterprises is poised 
to become a leader in the steel construction industry for years to come.
        </ScrollReveal>
      </section>

      <section className="grid md:grid-cols-3 gap-4">
        <ScrollReveal as="div" mode="block" containerClassName="h-36 bg-white/10 rounded grid place-content-center text-gray-300 transition hover:ring-1 hover:ring-white/10">Fabrication Image</ScrollReveal>
        <ScrollReveal as="div" mode="block" containerClassName="h-36 bg-white/10 rounded grid place-content-center text-gray-300 transition hover:ring-1 hover:ring-white/10">Engineering Team</ScrollReveal>
        <ScrollReveal as="div" mode="block" containerClassName="h-36 bg-white/10 rounded grid place-content-center text-gray-300 transition hover:ring-1 hover:ring-white/10">Installation Crew</ScrollReveal>
      </section>
    </div>
  )
}