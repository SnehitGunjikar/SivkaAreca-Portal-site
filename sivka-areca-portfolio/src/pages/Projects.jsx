import { projects } from '../data/projects'
import { useState } from 'react'
import { Button } from '../components/Button'
import Modal from '../components/Modal'
import ScrollReveal from '../components/ScrollReveal'
import SpotlightCard from '../components/SpotlightCard'

export default function Projects() {
  const [selected, setSelected] = useState(null)
  return (
    <div>
      <ScrollReveal baseOpacity={0} enableBlur={true} baseRotation={5} blurStrength={10} textClassName="text-white">
        Projects
      </ScrollReveal>
      <ScrollReveal as="p" mode="text" textTag="span" useDefaultTextStyles={false} containerClassName="mt-2" textClassName="text-gray-300">Where vision meets precision—every project is a testament to craftsmanship, innovation, and relentless attention to detail.</ScrollReveal>
      <div className="mt-4 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((pr) => (
          <SpotlightCard key={pr.slug} className="relative rounded-2xl border border-white/10 bg-white/5 p-4 pb-16 transition hover:ring-1 hover:ring-white/10" spotlightColor="rgba(0, 229, 255, 0.2)">
            <ScrollReveal as="div" mode="block" containerClassName="">
              <div className="h-32 bg-white/10 rounded mb-3 grid place-content-center text-gray-300">Image</div>
              <h3 className="font-semibold text-white">{pr.title}</h3>
              <p className="text-sm text-gray-400">{pr.description}</p>
              <Button className="absolute bottom-4 left-4" onClick={() => setSelected(pr)}>View Details</Button>
            </ScrollReveal>
          </SpotlightCard>
        ))}
      </div>
      {selected && (
         <Modal title={selected.title} onClose={() => setSelected(null)}>
           <div className="space-y-4">
             <div className="h-48 bg-white/10 rounded-lg grid place-content-center text-gray-300">
               Project Image Placeholder
             </div>
             <div>
               <h4 className="font-semibold text-lg mb-2">Project Overview</h4>
               <p className="text-gray-300">{selected.description}</p>
             </div>
             <div>
               <h4 className="font-semibold text-lg mb-2 text-white">Key Features</h4>
               <ul className="list-disc pl-5 space-y-1 text-gray-300">
                 <li>Custom engineering and design solutions</li>
                 <li>Quality fabrication with certified materials</li>
                 <li>Professional installation and commissioning</li>
                 <li>Compliance with industry standards</li>
               </ul>
             </div>
           </div>
         </Modal>
       )}
    </div>
  )
}