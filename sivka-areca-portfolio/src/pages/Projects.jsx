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
      <ScrollReveal baseOpacity={0} enableBlur={true} baseRotation={5} blurStrength={10} textClassName="text-gray-900">
        Projects
      </ScrollReveal>
      <ScrollReveal as="p" mode="text" textTag="span" useDefaultTextStyles={false} containerClassName="mt-2" textClassName="text-gray-800">Where vision meets precision—every project is a testament to craftsmanship, innovation, and relentless attention to detail.</ScrollReveal>
      <div className="mt-4 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((pr) => (
          <SpotlightCard key={pr.slug} className="relative rounded-2xl border border-gray-300 bg-white p-4 pb-16 transition hover:ring-1 hover:ring-gray-200" spotlightColor="rgba(0, 0, 0, 0.08)">
            <ScrollReveal as="div" mode="block" containerClassName="">
              <div className="h-32 bg-gray-100 rounded mb-3 grid place-content-center text-gray-600">Image</div>
              <h3 className="font-semibold text-gray-900">{pr.title}</h3>
              <p className="text-sm text-gray-700">{pr.description}</p>
            </ScrollReveal>
            {/* Pin View Details to bottom-left of the card, outside animated block */}
            <Button className="absolute bottom-4 left-4 z-10" onClick={() => setSelected(pr)}>View Details</Button>
          </SpotlightCard>
        ))}
      </div>
      {selected && (
         <Modal title={selected.title} onClose={() => setSelected(null)}>
           <div className="space-y-4">
             <p className="text-gray-800">{selected.description}</p>
             <div className="grid grid-cols-2 gap-3">
               <div className="h-24 bg-gray-100 rounded grid place-content-center text-gray-600">Image 1</div>
               <div className="h-24 bg-gray-100 rounded grid place-content-center text-gray-600">Image 2</div>
               <div className="h-24 bg-gray-100 rounded grid place-content-center text-gray-600">Image 3</div>
               <div className="h-24 bg-gray-100 rounded grid place-content-center text-gray-600">Image 4</div>
             </div>
           </div>
         </Modal>
      )}
    </div>
  )
}