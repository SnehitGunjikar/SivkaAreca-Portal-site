import { projects } from '../data/projects'
import { useState } from 'react'
import { Button } from '../components/Button'
import Modal from '../components/Modal'

export default function Projects() {
  const [selected, setSelected] = useState(null)
  return (
    <div>
      <h2>Projects</h2>
      <p className="mt-2 text-gray-300">Where vision meets precision—every project is a testament to craftsmanship, innovation, and relentless attention to detail.</p>
      <div className="mt-4 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((pr) => (
          <div key={pr.slug} className="relative border border-white/10 bg-white/5 rounded-lg p-4 pb-16">
            <div className="h-32 bg-white/10 rounded mb-3 grid place-content-center text-gray-300">Image</div>
            <h3 className="font-semibold text-white">{pr.title}</h3>
            <p className="text-sm text-gray-400">{pr.description}</p>
            <Button className="absolute bottom-4 left-4" onClick={() => setSelected(pr)}>View Details</Button>
          </div>
        ))}
      </div>
      {selected && (
         <Modal title={selected.title} onClose={() => setSelected(null)}>
           <div className="space-y-4">
             <div className="h-48 bg-gray-100 rounded-lg grid place-content-center text-gray-500">
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