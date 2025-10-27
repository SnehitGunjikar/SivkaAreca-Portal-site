import ScrollReveal from '../components/ScrollReveal'
import engTeamImg from '../assets/imagedata/engg-team-about-us.jpg'
import fabricationImg from '../assets/imagedata/fabrication-image-About-Us.jpg'
import installationImg from '../assets/imagedata/installation-team-about-us.jpg'

import { FaUsers, FaEye, FaShieldHalved, FaChartBar, FaChartLine } from 'react-icons/fa6';
import SpotlightCard from '../components/SpotlightCard';
export default function About() {
  return (
    <div className="space-y-8">
      {/* About Us Card */}
<SpotlightCard className="rounded-2xl border border-gray-300 bg-white p-6" spotlightColor="rgba(0, 0, 0, 0.08)">
  <ScrollReveal as="div" mode="block" containerClassName="">
    <div className="flex items-center gap-3 mb-4">
      <span className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-gray-100 text-brand-700 ring-1 ring-gray-200">
        <FaUsers className="h-5 w-5" aria-hidden="true" />
      </span>
      <ScrollReveal baseOpacity={0} enableBlur={true} baseRotation={5} blurStrength={10} textClassName="text-gray-900 text-xl font-semibold">
        About Us
      </ScrollReveal>
    </div>
    <p className="text-gray-700 text-justify leading-relaxed">
      Sivka Areca Enterprises is a dynamic and innovative steel structural project
      enterprise poised to revolutionize the construction industry with its cutting-edge
      solutions and exceptional service quality. Our company specializes in the design,
      fabrication, and installation of high-quality steel structures for a wide range of
      commercial, industrial, and residential projects. With a commitment to excellence
      and a customer-centric approach, Sivka Areca Enterprises is well-positioned to
      become a leader in the steel construction sector.
      <br /><br />
      Sivka Areca Enterprises brings together a team of skilled engineers, architects, and
      industry experts dedicated to delivering unparalleled steel structural solutions. Our
      company prides itself on its ability to provide tailored designs that meet the unique
      requirements of each project, ensuring both functionality and aesthetics.
    </p>
  </ScrollReveal>
</SpotlightCard>

      {/* Vision Card */}
<SpotlightCard className="rounded-2xl border border-gray-300 bg-white p-6" spotlightColor="rgba(0, 0, 0, 0.08)">
  <ScrollReveal as="div" mode="block" containerClassName="">
    <div className="flex items-center gap-3 mb-4">
      <span className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-gray-100 text-brand-700 ring-1 ring-gray-200">
        <FaEye className="h-5 w-5" aria-hidden="true" />
      </span>
      <ScrollReveal baseOpacity={0} enableBlur={true} baseRotation={5} blurStrength={10} textClassName="text-gray-900 text-xl font-semibold">
        Our Vision
      </ScrollReveal>
    </div>
    <p className="text-gray-700 leading-relaxed">
      Specializing in Structural Engineering, PEB Fabrication & Steel Fabrication.
      To supply high-quality steel structures, providing related services and solutions.
      Focused on continuous improvement at highest business standards & work ethics.
    </p>
  </ScrollReveal>
</SpotlightCard>

      {/* Quality Policy Card */}
<SpotlightCard className="rounded-2xl border border-gray-300 bg-white p-6" spotlightColor="rgba(0, 0, 0, 0.08)">
  <ScrollReveal as="div" mode="block" containerClassName="">
    <div className="flex items-center gap-3 mb-4">
      <span className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-gray-100 text-brand-700 ring-1 ring-gray-200">
        <FaShieldHalved className="h-5 w-5" aria-hidden="true" />
      </span>
      <ScrollReveal baseOpacity={0} enableBlur={true} baseRotation={5} blurStrength={10} textClassName="text-gray-900 text-xl font-semibold">
        Our Quality Policy
      </ScrollReveal>
    </div>
    <p className="text-gray-700 leading-relaxed">
      We are at accurate manufacturing & systematic technology; Quality
      is the integral part of our commitment to providing excellent products & services
      that match or exceed customer's expectations. We adhere to stringent QA/QC across
      design, fabrication, and site work—complying with relevant codes, using certified
      materials, and maintaining documented inspections.
    </p>
  </ScrollReveal>
</SpotlightCard>

      {/* Market Opportunity Card */}
<SpotlightCard className="rounded-2xl border border-gray-300 bg-white p-6" spotlightColor="rgba(0, 0, 0, 0.08)">
  <ScrollReveal as="div" mode="block" containerClassName="">
        <div className="flex items-center gap-3 mb-4">
          <span className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-gray-100 text-brand-700 ring-1 ring-gray-200">
            <FaChartBar className="h-5 w-5" aria-hidden="true" />
          </span>
          <ScrollReveal baseOpacity={0} enableBlur={true} baseRotation={5} blurStrength={10} textClassName="text-gray-900 text-xl font-semibold">
            Market Opportunity
          </ScrollReveal>
        </div>
        <p className="text-gray-700 leading-relaxed">
          The global construction industry is witnessing a growing 
          demand for innovative and cost-effective building solutions. Steel structures offer 
          numerous advantages, including faster construction times, enhanced durability, and 
          design flexibility. Sivka Areca Enterprises aims to capitalize on this market 
          opportunity by delivering exceptional steel structural solutions to clients across 
          various sectors, including commercial, industrial, and residential projects.
          <br /><br />
          We understand the unique needs of each client and work closely with them to develop 
          customized solutions that meet their specific requirements. Whether it's a large-scale 
          infrared project or a small-scale residential construction, Sivka Areca Enterprises 
          has the expertise and experience to deliver high-quality results on time and within 
          budget.
        </p>
  </ScrollReveal>
</SpotlightCard>

      {/* Financial Outlook Card */}
<SpotlightCard className="rounded-2xl border border-gray-300 bg-white p-6" spotlightColor="rgba(0, 0, 0, 0.08)">
  <ScrollReveal as="div" mode="block" containerClassName="">
        <div className="flex items-center gap-3 mb-4">
          <span className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-gray-100 text-brand-700 ring-1 ring-gray-200">
            <FaChartLine className="h-5 w-5" aria-hidden="true" />
          </span>
          <ScrollReveal baseOpacity={0} enableBlur={true} baseRotation={5} blurStrength={10} textClassName="text-gray-900 text-xl font-semibold">
            Financial Outlook
          </ScrollReveal>
        </div>
        <p className="text-gray-700 leading-relaxed">
          Sivka Areca Enterprises anticipates robust growth in revenue and 
          profitability over the next several years. By expanding our client base, diversifying 
          our project portfolio, and continuously improving our processes, we are confident 
          in our ability to achieve sustainable financial success. With a strong focus on 
          customer satisfaction and long-term relationships, Sivka Areca Enterprises is poised 
          to become a leader in the steel construction industry for years to come.
        </p>
  </ScrollReveal>
</SpotlightCard>

      <section className="grid md:grid-cols-3 gap-4">
        <SpotlightCard className="rounded-2xl border border-gray-300 bg-white p-4" spotlightColor="rgba(0, 0, 0, 0.08)">
          <ScrollReveal as="div" mode="block" containerClassName="">
            <img src={fabricationImg} alt="Fabrication Team" className="w-full h-36 object-cover rounded-md" />
            <div className="mt-2 text-sm text-gray-700">Fabrication Team</div>
          </ScrollReveal>
        </SpotlightCard>
        <SpotlightCard className="rounded-2xl border border-gray-300 bg-white p-4" spotlightColor="rgba(0, 0, 0, 0.08)">
          <ScrollReveal as="div" mode="block" containerClassName="">
            <img src={engTeamImg} alt="Engineering Team" className="w-full h-36 object-cover rounded-md" />
            <div className="mt-2 text-sm text-gray-700">Engineering Team</div>
          </ScrollReveal>
        </SpotlightCard>
        <SpotlightCard className="rounded-2xl border border-gray-300 bg-white p-4" spotlightColor="rgba(0, 0, 0, 0.08)">
          <ScrollReveal as="div" mode="block" containerClassName="">
            <img src={installationImg} alt="Installation Crew" className="w-full h-36 object-cover rounded-md" />
            <div className="mt-2 text-sm text-gray-700">Installation Crew</div>
          </ScrollReveal>
        </SpotlightCard>
      </section>
    </div>
  )
}